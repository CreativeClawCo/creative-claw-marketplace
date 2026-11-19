import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(repo, file), "utf8"));

test("OpenAI release ZIP retains the MCP connection and review material", () => {
  execFileSync(process.execPath, ["scripts/build-openai-plugin.mjs"], { cwd: repo, stdio: "pipe" });
  const overlay = readJson("openai/plugin.openai.json");
  const archive = path.join(repo, "local/submission", `creative-claw-openai-${overlay.version}.zip`);
  const entries = execFileSync("unzip", ["-Z1", archive], { encoding: "utf8" }).trim().split("\n");
  const archivedJson = (entry) => JSON.parse(execFileSync("unzip", ["-p", archive, entry], { encoding: "utf8" }));
  const manifest = archivedJson("plugin.json");
  const mcp = archivedJson("mcp.json");

  assert.equal(manifest.name, overlay.name);
  assert.equal(manifest.version, overlay.version);
  assert.deepEqual(mcp, readJson("openai/mcp.json"));
  assert.deepEqual(Object.keys(mcp.mcpServers), ["creative-claw"]);
  assert.equal(mcp.mcpServers["creative-claw"].url, "https://app.creativeclaw.co/mcp/chatgpt");
  assert.equal(mcp.mcpServers["creative-claw"].type, "streamable-http");
  assert.deepEqual(manifest.extensions["com.openai"].review.test_cases, overlay.extensions["com.openai"].review.test_cases);

  const listing = manifest.extensions["com.openai"];
  assert.deepEqual(listing.publication.translations, overlay.extensions["com.openai"].publication.translations);
  assert.ok(Object.keys(listing.publication.translations).length >= 63);
  const gallery = entries.filter(entry => /^assets\/screenshots\/prompt-\d-.*\.png$/.test(entry)).sort();
  assert.equal(gallery.length, listing.interface.defaultPrompt.length);
  for (const [index, entry] of gallery.entries()) {
    assert.ok(entry.startsWith(`assets/screenshots/prompt-${index + 1}-`));
    const png = execFileSync("unzip", ["-p", archive, entry]);
    assert.equal(png.readUInt32BE(16), 706);
    assert.equal(png.readUInt32BE(20), 860);
  }

  const privateFile = path.join(repo, "local/submission/openai-private.json");
  const demoUrl = process.env.OPENAI_DEMO_RECORDING_URL ||
    (fs.existsSync(privateFile) ? JSON.parse(fs.readFileSync(privateFile, "utf8")).demo_recording_url : undefined);
  assert.equal(manifest.extensions["com.openai"].review.demo_recording_url,
    demoUrl || overlay.extensions["com.openai"].review.demo_recording_url);
  assert.ok(!entries.some((entry) => /(^|\/)(?:\.app\.json|\.mcp\.json|\.codex-plugin|\.claude-plugin|\.cursor-plugin|local|node_modules)(?:\/|$)/.test(entry)));
  assert.ok(!("apps" in manifest) && !("apps" in manifest.extensions["com.openai"]));
  const sourceSkills = fs.readdirSync(path.join(repo, "plugins/creative-claw/skills")).sort();
  const archivedSkills = entries.filter((entry) => /^skills\/[^/]+\/SKILL\.md$/.test(entry)).map((entry) => entry.split("/")[1]).sort();
  assert.deepEqual(archivedSkills, sourceSkills);
  assert.ok(archivedSkills.includes("creativeclaw-setup"));

  const extracted = fs.mkdtempSync(path.join(repo, "local/submission/package-test-"));
  try {
    execFileSync("unzip", ["-q", archive, "-d", extracted]);
    for (const entry of entries.filter((entry) => entry.endsWith(".md"))) {
      const body = fs.readFileSync(path.join(extracted, entry), "utf8");
      for (const match of body.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
        const target = match[1];
        if (/^[a-z][a-z0-9+.-]*:|^#/i.test(target)) continue;
        const resolved = path.resolve(extracted, path.dirname(entry), decodeURIComponent(target.split("#")[0]));
        assert.ok(resolved.startsWith(extracted + path.sep) && fs.existsSync(resolved), `${entry}: missing packaged reference ${target}`);
      }
    }
  } finally {
    fs.rmSync(extracted, { recursive: true, force: true });
  }
});
