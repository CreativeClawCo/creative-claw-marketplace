// The ChatGPT and Codex layer: the OpenAI package and the ChatGPT skill ZIPs give every skill
// skill-variants/openai/chatgpt-and-codex.md and a ChatGPT connect step. The general plugin
// (Claude, Cursor, OpenClaw) ships the skills without it.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const NOTE_FILE = "references/chatgpt-and-codex.md";
export const noteSource = path.join(path.dirname(fileURLToPath(import.meta.url)), "../skill-variants/openai/chatgpt-and-codex.md");

const CONNECT =
  "**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, Creative Claw is not connected. Stop and ask the user to connect Creative Claw and sign in where they added it (ChatGPT's apps settings, or the plugin's settings in Codex), then ask again. Do not substitute other tools or describe a result that was not generated.";
const NOTE_LINE = `**In ChatGPT or Codex:** read [the ChatGPT and Codex notes](${NOTE_FILE}) before importing a file or checking a job.`;

/** A skill's text as the OpenAI package ships it: the ChatGPT connect step, then the notes link. */
export function withOpenAINote(text) {
  const swapped = text.replace(/^\*\*Not connected yet\?\*\*.*$/m, CONNECT);
  if (swapped === text) throw new Error("skill has no connect step to replace");
  return swapped.replace(/\n*$/, "\n") + "\n" + NOTE_LINE + "\n";
}

/** Apply the layer to every skill folder in a skills directory. */
export function addOpenAINotes(skillsDir) {
  for (const skill of fs.readdirSync(skillsDir)) {
    const file = path.join(skillsDir, skill, "SKILL.md");
    if (!fs.existsSync(file)) continue;
    fs.mkdirSync(path.join(skillsDir, skill, "references"), { recursive: true });
    fs.copyFileSync(noteSource, path.join(skillsDir, skill, NOTE_FILE));
    fs.writeFileSync(file, withOpenAINote(fs.readFileSync(file, "utf8")));
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) addOpenAINotes(process.argv[2]);
