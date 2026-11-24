#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
skill_source="$repo_root/plugins/creative-claw/skills/creativeclaw"
# Every focused skill in the plugin, so a new skill is packaged without editing this list.
focused_skill_names=()
while IFS= read -r skill_dir; do
  focused_skill_names+=("$(basename "$skill_dir")")
done < <(find "$repo_root/plugins/creative-claw/skills" -mindepth 1 -maxdepth 1 -type d -name 'creativeclaw-*' | LC_ALL=C sort)
output_dir="$repo_root/output/chatgpt-skills"
temp_root="$(mktemp -d "${TMPDIR:-/tmp}/creativeclaw-skills.XXXXXX")"

cleanup() {
  rm -rf "$temp_root"
}
trap cleanup EXIT

if [[ ! -f "$skill_source/SKILL.md" ]]; then
  echo "Missing the router skill." >&2
  exit 1
fi

# Package only committed skills: another session's uncommitted edits must not ship.
if [[ -z "${ALLOW_DIRTY:-}" && -n "$(git -C "$repo_root" status --porcelain -- plugins/creative-claw/skills skill-variants 2>/dev/null)" ]]; then
  echo "Uncommitted skill changes; commit them first, or set ALLOW_DIRTY=1 to package the working tree." >&2
  exit 1
fi

node "$repo_root/scripts/sync-skill-references.mjs"
bash "$repo_root/scripts/validate-skill-architecture.sh"

mkdir -p "$temp_root/general/creativeclaw" "$temp_root/chatgpt/creativeclaw"
cp -R "$skill_source/." "$temp_root/general/creativeclaw/"
cp -R "$skill_source/." "$temp_root/chatgpt/creativeclaw/"
# The ChatGPT archives carry the ChatGPT and Codex layer; the general one does not.
node "$repo_root/scripts/openai-skill-notes.mjs" "$temp_root/chatgpt"

for variant in general chatgpt; do
  package_root="$temp_root/$variant"
  variant_root="$package_root/creativeclaw"

  # Normalize copied-file mtimes so repeated builds produce stable archives.
  find "$variant_root" -exec touch -t 202601010000 {} +
  # Uploaders expect one named skill folder at the archive root.
  (
    cd "$package_root"
    find creativeclaw -print | LC_ALL=C sort |
      zip -X -q "$temp_root/creativeclaw-$variant.zip" -@
  )
done

for focused_skill_name in "${focused_skill_names[@]}"; do
  focused_skill_source="$repo_root/plugins/creative-claw/skills/$focused_skill_name"
  focused_package_root="$temp_root/focused/$focused_skill_name"

  if [[ ! -f "$focused_skill_source/SKILL.md" || ! -f "$focused_skill_source/agents/openai.yaml" ]]; then
    echo "Missing focused skill files for $focused_skill_name." >&2
    exit 1
  fi

  mkdir -p "$focused_package_root/$focused_skill_name"
  cp -R "$focused_skill_source/." "$focused_package_root/$focused_skill_name/"
  node "$repo_root/scripts/openai-skill-notes.mjs" "$focused_package_root"
  find "$focused_package_root/$focused_skill_name" -exec touch -t 202601010000 {} +
  (
    cd "$focused_package_root"
    find "$focused_skill_name" -print | LC_ALL=C sort |
      zip -X -q "$temp_root/$focused_skill_name-chatgpt.zip" -@
  )
done

# One archive with every ChatGPT skill, for uploaders that take a directory of skill roots.
bundle_root="$temp_root/bundle/creativeclaw-skills"
mkdir -p "$bundle_root"
cp -R "$temp_root/chatgpt/creativeclaw" "$bundle_root/"
for focused_skill_name in "${focused_skill_names[@]}"; do
  cp -R "$temp_root/focused/$focused_skill_name/$focused_skill_name" "$bundle_root/"
done
find "$bundle_root" -exec touch -t 202601010000 {} +
(
  cd "$temp_root/bundle"
  find creativeclaw-skills -print | LC_ALL=C sort |
    zip -X -q "$temp_root/creativeclaw-all-chatgpt-skills.zip" -@
)

mkdir -p "$output_dir"
mv -f "$temp_root/creativeclaw-all-chatgpt-skills.zip" "$output_dir/creativeclaw-all-chatgpt-skills.zip"
mv -f "$temp_root/creativeclaw-general.zip" "$output_dir/creativeclaw-skill.zip"
mv -f "$temp_root/creativeclaw-chatgpt.zip" "$output_dir/creativeclaw-chatgpt-skill.zip"

for focused_skill_name in "${focused_skill_names[@]}"; do
  mv -f \
    "$temp_root/$focused_skill_name-chatgpt.zip" \
    "$output_dir/$focused_skill_name-chatgpt-skill.zip"
done

echo "Built local skill archives in $output_dir:"
archive_paths=(
  "$output_dir/creativeclaw-skill.zip"
  "$output_dir/creativeclaw-chatgpt-skill.zip"
)
for focused_skill_name in "${focused_skill_names[@]}"; do
  archive_paths+=("$output_dir/$focused_skill_name-chatgpt-skill.zip")
done
shasum -a 256 "${archive_paths[@]}"

node "$repo_root/scripts/validate-skill-packages.mjs"
