#!/usr/bin/env node
// Build the OpenAI plugin directory ZIP (ChatGPT + Codex) from the marketplace plugin.
//
// The marketplace plugin (plugins/creative-claw) stays the default for Claude, Cursor,
// OpenClaw and Codex-from-git installs, on the general /mcp endpoint. The OpenAI package
// differs only where openai/ says so:
//   - openai/mcp.json            the ChatGPT surface (/mcp/chatgpt), without checkout tools
//   - openai/plugin.openai.json  version, keywords and the full extensions.com.openai
//                                (listing, onboarding skill, review cases, release notes)
//   - openai/assets/             icons referenced by the listing
// The reviewer demo URL is private: OPENAI_DEMO_RECORDING_URL, or
// local/submission/openai-private.json { "demo_recording_url": "..." }.
//
// Usage: node scripts/build-openai-plugin.mjs [--check]   (--check validates without zipping)
// Output: output/openai/creative-claw-openai-<version>.zip

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(repo, "plugins/creative-claw");
const openaiDir = path.join(repo, "openai");
const checkOnly = process.argv.includes("--check");

// Files that belong to other platforms and must not ship in the OpenAI package.
const EXCLUDE = new Set([
  ".claude-plugin",
  ".cursor-plugin",
  ".codex-plugin",
  ".mcp.json",
  "mcp.json",
  "openclaw.plugin.json",
  "index.mjs",
  "package.json",
  "CODEX.md",
  ".DS_Store",
]);

const errors = [];
const fail = (message) => errors.push(message);
const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const chars = (value) => Array.from(value ?? "").length;

// Keep shared skill references in sync before packaging them.
execFileSync("node", [path.join(repo, "scripts/sync-skill-references.mjs"), "--check"], { stdio: "inherit" });

const base = readJson(path.join(source, "plugin.json"));
const overlay = readJson(path.join(openaiDir, "plugin.openai.json"));
const mcp = readJson(path.join(openaiDir, "mcp.json"));

const privateFile = path.join(repo, "local/submission/openai-private.json");
const demoUrl =
  process.env.OPENAI_DEMO_RECORDING_URL ||
  (fs.existsSync(privateFile) ? readJson(privateFile).demo_recording_url : undefined);

const manifest = {
  ...base,
  // The portal only accepts an upload whose name is the published plugin's ID.
  name: overlay.name ?? base.name,
  version: overlay.version,
  keywords: overlay.keywords ?? base.keywords,
  extensions: { ...base.extensions, "com.openai": structuredClone(overlay.extensions["com.openai"]) },
};
const openai = manifest.extensions["com.openai"];
if (demoUrl) openai.review.demo_recording_url = demoUrl;

// ---- Validation against the documented submission limits ----
const httpsUrl = (value) => typeof value === "string" && /^https:\/\/[^\s@]+$/.test(value);
const ui = openai.interface ?? {};

if (!/^\d+\.\d+\.\d+$/.test(manifest.version ?? "")) fail("version must be semantic (x.y.z)");
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(manifest.name ?? "") || chars(manifest.name) > 64) fail("name must be lowercase-hyphenated, at most 64 characters");
if (chars(manifest.description) > 4000) fail("description exceeds 4000 characters");
if (!ui.displayName || chars(ui.displayName) > 30) fail("interface.displayName is required, at most 30 characters");
if (!ui.shortDescription || chars(ui.shortDescription) > 30 || /\n/.test(ui.shortDescription)) fail("interface.shortDescription is required, one line, at most 30 characters");
if (!ui.longDescription || chars(ui.longDescription) > 4000) fail("interface.longDescription is required, at most 4000 characters");
if (/\b(free trial|discount|promo(tion)?|\$\d)/i.test(`${ui.shortDescription} ${ui.longDescription}`)) fail("listing text must not advertise pricing, trials, discounts or promotions");
if (!ui.developerName || chars(ui.developerName) > 80) fail("interface.developerName is required, at most 80 characters");
if (!ui.category) fail("interface.category is required");
if (!Array.isArray(ui.capabilities) || ui.capabilities.length > 20 || ui.capabilities.some((c) => chars(c) > 120)) fail("interface.capabilities: at most 20 labels of at most 120 characters");
for (const field of ["websiteURL", "supportURL", "privacyPolicyURL", "termsOfServiceURL"]) {
  if (!httpsUrl(ui[field]) || chars(ui[field]) > 1024) fail(`interface.${field} must be an HTTPS URL (required for MCP review)`);
}
const prompts = Array.isArray(ui.defaultPrompt) ? ui.defaultPrompt : [ui.defaultPrompt].filter(Boolean);
if (prompts.length > 3 || new Set(prompts).size !== prompts.length || prompts.some((p) => chars(p) > 128 || p.includes("@"))) fail("defaultPrompt: up to 3 unique prompts, at most 128 characters, no @mentions");
for (const field of ["brandColor", "brandColorDark"]) {
  if (ui[field] !== undefined && !/^#[0-9A-Fa-f]{6}$/.test(ui[field])) fail(`interface.${field} must be #RRGGBB`);
}

// Icons: ./-relative, present, square PNG of at least 48px.
const iconFields = ["composerIcon", "composerIconDark", "logo", "logoDark"].filter((f) => ui[f]);
if (!ui.logo) fail("interface.logo (primary icon) is required for submission");
for (const field of iconFields) {
  const rel = ui[field];
  const file = path.join(openaiDir, rel);
  if (!rel.startsWith("./") || !fs.existsSync(file)) { fail(`interface.${field}: ${rel} not found under openai/`); continue; }
  const png = fs.readFileSync(file);
  if (png.readUInt32BE(12) !== 0x49484452) { fail(`interface.${field}: ${rel} is not a PNG`); continue; }
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  if (width !== height || width < 48 || width > 4096 || png.length > 5 * 1024 * 1024) fail(`interface.${field}: must be square, 48-4096 px, at most 5 MiB (got ${width}x${height})`);
}

if (openai.onboardingSkill && !fs.existsSync(path.join(source, openai.onboardingSkill))) fail(`onboardingSkill ${openai.onboardingSkill} is not an included skill`);

// Review: exactly five positive and three negative cases for the initial MCP review.
const cases = openai.review?.test_cases ?? {};
const positive = cases.positive ?? [];
const negative = cases.negative ?? [];
if (positive.length !== 5) fail(`review needs exactly 5 positive test cases (have ${positive.length})`);
if (negative.length !== 3) fail(`review needs exactly 3 negative test cases (have ${negative.length})`);
for (const [kind, list] of [["positive", positive], ["negative", negative]]) {
  list.forEach((c, i) => {
    if (!c.description || !c.prompt) fail(`${kind}[${i}] needs description and prompt`);
    if (kind === "positive" && (!c.tools_triggered || !c.expected_behavior)) fail(`positive[${i}] needs tools_triggered and expected_behavior`);
    if (kind === "positive" && chars(c.description) > 4000) fail(`positive[${i}] description exceeds 4000 characters`);
  });
}
if (typeof openai.review?.commerce !== "boolean") fail("review.commerce must be true or false");
if ("test_credentials" in (openai.review ?? {}) || "reviewer_instructions" in (openai.review ?? {})) fail("credentials and reviewer instructions belong in the dashboard, not the package");
if (!openai.publication?.release_notes) fail("publication.release_notes is required");

// Exactly one remote MCP server, on the ChatGPT surface.
const servers = Object.entries(mcp.mcpServers ?? {});
if (servers.length !== 1) fail("openai/mcp.json must declare exactly one MCP server");
for (const [, server] of servers) {
  if (server.url !== "https://app.creativeclaw.co/mcp/chatgpt") fail(`MCP URL must be the ChatGPT surface, got ${server.url}`);
}

const warnings = [];
if (!openai.review?.demo_recording_url) warnings.push("No demo recording URL: set OPENAI_DEMO_RECORDING_URL or local/submission/openai-private.json before submitting for review.");

// ---- Assemble the package ----
const staging = fs.mkdtempSync(path.join(os.tmpdir(), "creative-claw-openai-"));
const packageDir = path.join(staging, "creative-claw");
fs.cpSync(source, packageDir, {
  recursive: true,
  // Skip other platforms' top-level files, and .DS_Store anywhere.
  filter: (src) =>
    path.basename(src) !== ".DS_Store" &&
    !(path.dirname(src) === source && EXCLUDE.has(path.basename(src))),
});
// The OpenAI package serves ChatGPT and Codex, so the router skill carries the ChatGPT
// platform notes, exactly as build-skill-zips.sh packages it.
fs.cpSync(path.join(repo, "skill-variants/chatgpt"), path.join(packageDir, "skills/creativeclaw/references"), { recursive: true });
fs.writeFileSync(path.join(packageDir, "plugin.json"), JSON.stringify(manifest, null, 2) + "\n");
fs.writeFileSync(path.join(packageDir, "mcp.json"), JSON.stringify(mcp, null, 2) + "\n");
fs.cpSync(path.join(openaiDir, "assets"), path.join(packageDir, "assets"), { recursive: true });

for (const entry of fs.readdirSync(packageDir, { recursive: true })) {
  const name = path.basename(entry);
  if (name.endsWith(".app.json") || name === "hooks" || name === "hooks.json") fail(`package must not contain app references or lifecycle hooks: ${entry}`);
}
for (const skill of fs.readdirSync(path.join(packageDir, "skills"))) {
  const file = path.join(packageDir, "skills", skill, "SKILL.md");
  const head = fs.existsSync(file) ? fs.readFileSync(file, "utf8").split("\n---")[0] : "";
  if (!new RegExp(`^---[\\s\\S]*\\bname:\\s*${skill}\\b`).test(head) || !/\bdescription:\s*\S/.test(head)) fail(`skills/${skill}/SKILL.md needs name: ${skill} and a description`);
}

for (const warning of warnings) console.warn(`warning: ${warning}`);
if (errors.length) {
  console.error(errors.map((e) => `error: ${e}`).join("\n"));
  fs.rmSync(staging, { recursive: true, force: true });
  process.exit(1);
}

if (checkOnly) {
  console.log(`OpenAI package ${manifest.version} is valid (${positive.length}+${negative.length} review cases, ${manifest.keywords.length} keywords).`);
} else {
  const outDir = path.join(repo, "output/openai");
  fs.mkdirSync(outDir, { recursive: true });
  const zip = path.join(outDir, `creative-claw-openai-${manifest.version}.zip`);
  fs.rmSync(zip, { force: true });
  // Plugin files at the ZIP root, as the portal expects.
  execFileSync("zip", ["-qrX", zip, "."], { cwd: packageDir });
  console.log(`Built ${path.relative(repo, zip)}`);
}
fs.rmSync(staging, { recursive: true, force: true });
