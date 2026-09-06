#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
skill_source="$repo_root/plugins/creative-claw/skills/creativeclaw"
focused_skill_names=(
  creativeclaw-generate-image
  creativeclaw-generate-video
  creativeclaw-generate-voiceover
  creativeclaw-create-character
  creativeclaw-plan-video
  creativeclaw-build-film
  creativeclaw-product-photoshoot
  creativeclaw-create-ugc-ad
  creativeclaw-submit-feedback
  creativeclaw-nano-banana-2
  creativeclaw-nano-banana-pro
  creativeclaw-gpt-image-2
  creativeclaw-seedream-5-pro
  creativeclaw-gemini-omni
  creativeclaw-seedance-2-5
  creativeclaw-minimax-h3-max
  creativeclaw-elevenlabs-v3
  creativeclaw-clone-voice
)
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

bash "$repo_root/scripts/validate-skill-architecture.sh"

mkdir -p "$temp_root/general/creativeclaw" "$temp_root/chatgpt/creativeclaw"
cp -R "$skill_source/." "$temp_root/general/creativeclaw/"
cp -R "$skill_source/." "$temp_root/chatgpt/creativeclaw/"
cp "$chatgpt_overlay_root"/*.md "$temp_root/chatgpt/creativeclaw/references/"

for variant in general chatgpt; do
  package_root="$temp_root/$variant"
  variant_root="$package_root/creativeclaw"

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
    cd "$package_root"
    find creativeclaw -type f -print | LC_ALL=C sort |
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
  find "$focused_package_root/$focused_skill_name" -type f -exec touch -t 202601010000 {} +
  (
    cd "$focused_package_root"
    find "$focused_skill_name" -type f -print | LC_ALL=C sort |
      zip -X -q "$temp_root/$focused_skill_name-chatgpt.zip" -@
  )
done

mv -f "$temp_root/creativeclaw-general.zip" "$repo_root/creativeclaw-skill.zip"
mv -f "$temp_root/creativeclaw-chatgpt.zip" "$repo_root/creativeclaw-chatgpt-skill.zip"

for focused_skill_name in "${focused_skill_names[@]}"; do
  mv -f \
    "$temp_root/$focused_skill_name-chatgpt.zip" \
    "$repo_root/$focused_skill_name-chatgpt-skill.zip"
done

echo "Built:"
archive_paths=(
  "$repo_root/creativeclaw-skill.zip"
  "$repo_root/creativeclaw-chatgpt-skill.zip"
)
for focused_skill_name in "${focused_skill_names[@]}"; do
  archive_paths+=("$repo_root/$focused_skill_name-chatgpt-skill.zip")
done
shasum -a 256 "${archive_paths[@]}"
