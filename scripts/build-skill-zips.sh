#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
skill_source="$repo_root/plugins/creative-claw/skills/creativeclaw"
chatgpt_overlay_root="$repo_root/skill-variants/chatgpt"
temp_root="$(mktemp -d "${TMPDIR:-/tmp}/creativeclaw-skills.XXXXXX")"

cleanup() {
  rm -rf "$temp_root"
}
trap cleanup EXIT

if [[ ! -f "$skill_source/SKILL.md" || ! -d "$chatgpt_overlay_root" ]]; then
  echo "Missing canonical skill or ChatGPT overlay." >&2
  exit 1
fi

mkdir -p "$temp_root/general" "$temp_root/chatgpt"
cp -R "$skill_source/." "$temp_root/general/"
cp -R "$skill_source/." "$temp_root/chatgpt/"
cp "$chatgpt_overlay_root"/*.md "$temp_root/chatgpt/references/"

for variant in general chatgpt; do
  variant_root="$temp_root/$variant"

  if rg -n "render_html_video|kind:[[:space:]]*html_video" "$variant_root"; then
    echo "Deprecated HTML-video guidance found in the $variant skill." >&2
    exit 1
  fi

  if [[ ! -f "$variant_root/references/platform-upload.md" || ! -f "$variant_root/references/platform-client.md" ]]; then
    echo "The $variant skill is missing platform guidance." >&2
    exit 1
  fi

  # Normalize copied-file mtimes so repeated builds produce stable archives.
  find "$variant_root" -type f -exec touch -t 202601010000 {} +
  (
    cd "$variant_root"
    find SKILL.md references assets -type f -print | LC_ALL=C sort |
      zip -X -q "$temp_root/creativeclaw-$variant.zip" -@
  )
done

mv -f "$temp_root/creativeclaw-general.zip" "$repo_root/creativeclaw-skill.zip"
mv -f "$temp_root/creativeclaw-chatgpt.zip" "$repo_root/creativeclaw-chatgpt-skill.zip"

echo "Built:"
shasum -a 256 \
  "$repo_root/creativeclaw-skill.zip" \
  "$repo_root/creativeclaw-chatgpt-skill.zip"
