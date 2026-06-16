#!/usr/bin/env bash
set -euo pipefail

# Syncs the version from package.json to all manifests and skill descriptions.
# Usage: pnpm version-sync
#   or:  pnpm version-sync 0.3.0  (to set a specific version)

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PLUGIN_DIR="$REPO_ROOT/plugins/creative-claw"
PKG="$PLUGIN_DIR/package.json"

if [ -n "${1:-}" ]; then
  # Set version in package.json first
  NEW_VERSION="$1"
  # Use node to update package.json cleanly
  node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('$PKG', 'utf-8'));
    pkg.version = '$NEW_VERSION';
    fs.writeFileSync('$PKG', JSON.stringify(pkg, null, 2) + '\n');
  "
  echo "Set package.json version to $NEW_VERSION"
fi

# Read version from package.json (single source of truth)
VERSION=$(node -e "console.log(JSON.parse(require('fs').readFileSync('$PKG', 'utf-8')).version)")

echo "Syncing version $VERSION across all files..."

# 1. plugin.json
node -e "
  const fs = require('fs');
  const f = '$PLUGIN_DIR/.claude-plugin/plugin.json';
  const d = JSON.parse(fs.readFileSync(f, 'utf-8'));
  d.version = '$VERSION';
  fs.writeFileSync(f, JSON.stringify(d, null, 2) + '\n');
"
echo "  plugin.json → $VERSION"

# 2. marketplace.json (plugin entry version)
node -e "
  const fs = require('fs');
  const f = '$REPO_ROOT/.claude-plugin/marketplace.json';
  const d = JSON.parse(fs.readFileSync(f, 'utf-8'));
  d.plugins[0].version = '$VERSION';
  fs.writeFileSync(f, JSON.stringify(d, null, 2) + '\n');
"
echo "  marketplace.json → $VERSION"

# 3. openclaw.plugin.json
node -e "
  const fs = require('fs');
  const f = '$PLUGIN_DIR/openclaw.plugin.json';
  const d = JSON.parse(fs.readFileSync(f, 'utf-8'));
  d.version = '$VERSION';
  fs.writeFileSync(f, JSON.stringify(d, null, 2) + '\n');
"
echo "  openclaw.plugin.json → $VERSION"

# 3b. Codex plugin manifest (.codex-plugin/plugin.json)
node -e "
  const fs = require('fs');
  const f = '$PLUGIN_DIR/.codex-plugin/plugin.json';
  const d = JSON.parse(fs.readFileSync(f, 'utf-8'));
  d.version = '$VERSION';
  fs.writeFileSync(f, JSON.stringify(d, null, 2) + '\n');
"
echo "  .codex-plugin/plugin.json → $VERSION"

# 3c. Codex marketplace manifest (.agents/plugins/marketplace.json)
node -e "
  const fs = require('fs');
  const f = '$REPO_ROOT/.agents/plugins/marketplace.json';
  const d = JSON.parse(fs.readFileSync(f, 'utf-8'));
  d.plugins[0].version = '$VERSION';
  fs.writeFileSync(f, JSON.stringify(d, null, 2) + '\n');
"
echo "  .agents/plugins/marketplace.json → $VERSION"

# 4. Stamp version into all SKILL.md descriptions
# Replaces existing (vX.Y.Z) or appends it after the description text
for skill_file in "$PLUGIN_DIR"/skills/*/SKILL.md; do
  skill_name=$(basename "$(dirname "$skill_file")")

  # Use node for reliable YAML frontmatter editing
  node -e "
    const fs = require('fs');
    const content = fs.readFileSync('$skill_file', 'utf-8');
    const vTag = '(v$VERSION)';
    const vPattern = /\(v\d+\.\d+\.\d+\)/;

    // Find the description line in frontmatter
    const lines = content.split('\n');
    let changed = false;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('description:')) {
        if (vPattern.test(lines[i])) {
          // Replace existing version tag
          lines[i] = lines[i].replace(vPattern, vTag);
        } else {
          // Append version tag before closing quote or at end
          // Handle both quoted and unquoted descriptions
          const line = lines[i];
          if (line.endsWith('\"')) {
            lines[i] = line.slice(0, -1) + ' ' + vTag + '\"';
          } else if (line.endsWith(\"'\")) {
            lines[i] = line.slice(0, -1) + ' ' + vTag + \"'\";
          } else {
            // Check if description continues on next lines (long descriptions)
            // Find the last line of the description (before next frontmatter key or ---)
            let lastDescLine = i;
            for (let j = i + 1; j < lines.length; j++) {
              if (lines[j].match(/^[a-z_]+:/) || lines[j] === '---') break;
              lastDescLine = j;
            }
            if (vPattern.test(lines[lastDescLine])) {
              lines[lastDescLine] = lines[lastDescLine].replace(vPattern, vTag);
            } else {
              lines[lastDescLine] = lines[lastDescLine].trimEnd() + ' ' + vTag;
            }
          }
        }
        changed = true;
        break;
      }
    }
    if (changed) {
      fs.writeFileSync('$skill_file', lines.join('\n'));
    }
  "
  echo "  $skill_name/SKILL.md → $VERSION"
done

echo ""
echo "Done! Version $VERSION synced to all files."
echo ""
echo "Next steps:"
echo "  1. Update LATEST_SKILLS_VERSION in imagine-mcp server.ts"
echo "  2. Commit and push both repos"
