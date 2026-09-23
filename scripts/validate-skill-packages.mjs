import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { repoRoot, skillsRoot, skillNames, syncReferences } from './sync-skill-references.mjs';

function filesIn(directory, prefix = '') {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const relative = path.posix.join(prefix, entry.name);
    return entry.isDirectory() ? filesIn(path.join(directory, entry.name), relative) : [relative];
  }).sort();
}

syncReferences(true);
let filesChecked = 0;
for (const name of skillNames()) {
  const source = path.join(skillsRoot, name);
  const entries = filesIn(source);
  // Validate relative Markdown links in the source and every isolated package.
  for (const entry of entries.filter(entry => entry.endsWith('.md'))) {
    const body = fs.readFileSync(path.join(source, entry), 'utf8');
    for (const match of body.matchAll(/\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
      const target = match[1];
      if (/^[a-z][a-z0-9+.-]*:|^#/i.test(target)) continue;
      const resolved = path.resolve(source, path.dirname(entry), decodeURIComponent(target.split('#')[0]));
      if (!resolved.startsWith(source + path.sep) || !fs.existsSync(resolved)) {
        throw new Error(`${name}/${entry}: unresolved or external package reference ${target}`);
      }
    }
  }
  const archive = path.join(repoRoot, "output/chatgpt-skills", `${name}-chatgpt-skill.zip`);
  const actual = execFileSync('unzip', ['-Z1', archive], { encoding: 'utf8' }).trim().split('\n').sort();
  const expected = entries.map(entry => `${name}/${entry}`).sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`Archive entry mismatch: ${archive}`);
  for (const entry of entries) {
    let expectedSource = path.join(source, entry);
    const overlay = path.join(repoRoot, 'skill-variants/chatgpt', path.basename(entry));
    if (name === 'creativeclaw' && entry.startsWith('references/') && fs.existsSync(overlay)) expectedSource = overlay;
    const archived = execFileSync('unzip', ['-p', archive, `${name}/${entry}`], { maxBuffer: 8 * 1024 * 1024 });
    if (!archived.equals(fs.readFileSync(expectedSource))) throw new Error(`Stale archive content: ${name}/${entry}`);
    filesChecked++;
  }
}
console.log(`Verified ${skillNames().length} OpenAI ZIPs, ${filesChecked} packaged files, shared reference consistency, and relative Markdown links. This is static validation, not a behavioral evaluation.`);
