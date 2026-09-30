import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// The portable manifest owns OpenAI listing metadata, including starter prompts.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../plugins/creative-claw');
const portable = JSON.parse(fs.readFileSync(path.join(root, 'plugin.json'), 'utf8'));
const file = path.join(root, '.codex-plugin/plugin.json');
const compatibility = JSON.parse(fs.readFileSync(file, 'utf8'));
const presentation = portable.extensions?.['com.openai']?.interface;
if (!presentation) throw new Error('Missing portable OpenAI interface metadata');
if (Array.from(presentation.shortDescription ?? '').length > 30) {
  throw new Error('OpenAI listing subtitle exceeds 30 characters');
}
const prompts = presentation.defaultPrompt;
if (!(typeof prompts === 'string' || (Array.isArray(prompts) && prompts.length >= 1 && prompts.length <= 3 && prompts.every(p => typeof p === 'string')))) {
  throw new Error('defaultPrompt must be a string or one to three strings');
}
if (process.argv.includes('--check')) {
  if (JSON.stringify(compatibility.interface) !== JSON.stringify(presentation)) {
    throw new Error('OpenAI interface metadata drift. Run node scripts/sync-openai-interface.mjs');
  }
  console.log('OpenAI interface metadata matches the portable manifest.');
} else {
  compatibility.interface = presentation;
  fs.writeFileSync(file, JSON.stringify(compatibility, null, 2) + '\n');
  console.log('Synced OpenAI interface metadata from the portable manifest.');
}
