import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const skillsRoot = path.join(repoRoot, 'plugins/creative-claw/skills');
export const sharedReferences = ['workflow-basics.md', 'platform-upload.md', 'job-recovery.md', 'media-assembly.md'];
export function skillNames() {
  return fs.readdirSync(skillsRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && fs.existsSync(path.join(skillsRoot, entry.name, 'SKILL.md')))
    .map(entry => entry.name).sort();
}

export function syncReferences(checkOnly = false) {
  const stale = [];
  for (const name of skillNames().filter(name => name !== 'creativeclaw')) {
    const imageReferences = ['creativeclaw-generate-image', 'creativeclaw-product-photoshoot', 'creativeclaw-create-avatar', 'creativeclaw-create-character', 'creativeclaw-plan-video', 'creativeclaw-build-film', 'creativeclaw-create-ugc-ad', 'creativeclaw-generate-video'].includes(name)
      ? fs.readdirSync(path.join(skillsRoot, 'creativeclaw/references/images')).filter(file => file.endsWith('.md')).map(file => `images/${file}`)
      : [];
    const voiceReferences = ['creativeclaw-clone-voice', 'creativeclaw-generate-voiceover', 'creativeclaw-create-avatar'].includes(name)
      ? fs.readdirSync(path.join(skillsRoot, 'creativeclaw/references/voices')).filter(file => file.endsWith('.md')).map(file => `voices/${file}`)
      : [];
    const videoReferences = ['creativeclaw-generate-video', 'creativeclaw-build-film', 'creativeclaw-create-ugc-ad', 'creativeclaw-plan-video'].includes(name)
      ? fs.readdirSync(path.join(skillsRoot, 'creativeclaw/references/video')).filter(file => file.endsWith('.md')).map(file => `video/${file}`)
      : [];
    const avatarReferences = ['creativeclaw-create-avatar', 'creativeclaw-create-character'].includes(name)
      ? ['avatars/identity.md'] : [];
    for (const reference of [...sharedReferences, ...imageReferences, ...voiceReferences, ...videoReferences, ...avatarReferences]) {
      const source = fs.readFileSync(path.join(skillsRoot, 'creativeclaw/references', reference));
      const destination = path.join(skillsRoot, name, 'references', reference);
      if (fs.existsSync(destination) && fs.readFileSync(destination).equals(source)) continue;
      stale.push(path.relative(repoRoot, destination));
      if (!checkOnly) {
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        fs.writeFileSync(destination, source);
      }
    }
  }
  if (checkOnly && stale.length) throw new Error(`Shared references need synchronization:\n${stale.join('\n')}`);
  return stale;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const stale = syncReferences(process.argv.includes('--check'));
  console.log(`Shared references ${process.argv.includes('--check') ? 'verified' : 'synchronized'} for ${skillNames().length} skills (${stale.length} updated copies).`);
}
