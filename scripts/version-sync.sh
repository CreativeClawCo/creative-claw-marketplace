#!/usr/bin/env bash
set -euo pipefail

# Version belongs to package/manifests, not skill discovery descriptions.
# Usage: bash scripts/version-sync.sh [0.5.7]
repo_root="$(cd "$(dirname "$0")/.." && pwd)"
node --input-type=module - "$repo_root" "${1:-}" <<'NODE'
import fs from 'node:fs';
import path from 'node:path';
const [repoRoot, requested] = process.argv.slice(2);
const pluginRoot = path.join(repoRoot, 'plugins/creative-claw');
const packagePath = path.join(pluginRoot, 'package.json');
const version = requested || JSON.parse(fs.readFileSync(packagePath, 'utf8')).version;
if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) throw new Error('Invalid version');
const manifests = [
  ['plugins/creative-claw/package.json', false],
  ['plugins/creative-claw/.claude-plugin/plugin.json', false],
  ['.claude-plugin/marketplace.json', true],
  ['plugins/creative-claw/openclaw.plugin.json', false],
  ['plugins/creative-claw/plugin.json', false],
  ['plugins/creative-claw/.codex-plugin/plugin.json', false],
  ['.agents/plugins/marketplace.json', true],
  ['plugins/creative-claw/.cursor-plugin/plugin.json', false],
];
for (const [relative, marketplace] of manifests) {
  const file = path.join(repoRoot, relative);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const target = marketplace ? data.plugins.find(plugin => plugin.name === 'creative-claw') : data;
  if (!target) throw new Error('Missing Creative Claw entry: ' + relative);
  target.version = version;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}
console.log('Synced plugin version ' + version + ' across ' + manifests.length + ' manifests; skill descriptions unchanged.');
NODE
