#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
skills_root="$repo_root/plugins/creative-claw/skills"
root_skill="$skills_root/creativeclaw/SKILL.md"

skill_names=(
  creativeclaw
  creativeclaw-generate-image
  creativeclaw-generate-video
  creativeclaw-generate-voiceover
  creativeclaw-generate-music
  creativeclaw-generate-sound-effects
  creativeclaw-edit-media
  creativeclaw-cut-and-reframe-video
  creativeclaw-create-reels
  creativeclaw-create-character
  creativeclaw-create-avatar
  creativeclaw-plan-video
  creativeclaw-build-film
  creativeclaw-product-photoshoot
  creativeclaw-create-ugc-ad
  creativeclaw-submit-feedback
  creativeclaw-clone-voice
  creativeclaw-find-examples
  creativeclaw-render-html-image
  creativeclaw-render-html-video
  creativeclaw-add-video-intro-outro
)

for skill_name in "${skill_names[@]}"; do
  skill_dir="$skills_root/$skill_name"
  skill_file="$skill_dir/SKILL.md"
  ui_file="$skill_dir/agents/openai.yaml"

  if [[ ! -f "$skill_file" || ! -f "$ui_file" ]]; then
    echo "Missing SKILL.md or agents/openai.yaml for $skill_name." >&2
    exit 1
  fi

  declared_name="$(sed -n '2s/^name: *//p' "$skill_file")"
  if [[ "$declared_name" != "$skill_name" ]]; then
    echo "Skill directory/name mismatch for $skill_name: $declared_name" >&2
    exit 1
  fi

  if rg -n '\[TODO|TODO:' "$skill_dir"; then
    echo "Unresolved TODO found in $skill_name." >&2
    exit 1
  fi

  if ! rg -q 'value: "creative-claw"' "$ui_file" ||
    ! rg -q 'url: "https://app\.creativeclaw\.co/mcp/chatgpt"' "$ui_file"; then
    echo "$skill_name is not explicitly connected to the Creative Claw MCP server." >&2
    exit 1
  fi

  if ! rg -Fq "\$$skill_name" "$ui_file"; then
    echo "$skill_name default_prompt must mention \$$skill_name." >&2
    exit 1
  fi

  short_description="$(sed -n 's/^  short_description: "\(.*\)"$/\1/p' "$ui_file")"
  if (( ${#short_description} < 25 || ${#short_description} > 64 )); then
    echo "$skill_name short_description must be 25-64 characters." >&2
    exit 1
  fi
done

routes=(
  creativeclaw-cut-and-reframe-video
  creativeclaw-create-reels
  creativeclaw-generate-image
  creativeclaw-generate-video
  creativeclaw-generate-voiceover
  creativeclaw-generate-music
  creativeclaw-generate-sound-effects
  creativeclaw-edit-media
  creativeclaw-create-character
  creativeclaw-plan-video
  creativeclaw-build-film
  creativeclaw-product-photoshoot
  creativeclaw-create-ugc-ad
  creativeclaw-submit-feedback
  creativeclaw-find-examples
  creativeclaw-render-html-image
  creativeclaw-render-html-video
  creativeclaw-add-video-intro-outro
)
for route in "${routes[@]}"; do
  if ! rg -q "$route" "$root_skill"; then
    echo "Root skill does not route to $route." >&2
    exit 1
  fi
done

for explicit_route_skill in creativeclaw-render-html-image creativeclaw-render-html-video; do
  explicit_skill_file="$skills_root/$explicit_route_skill/SKILL.md"
  if ! rg -q 'Use only when the user explicitly' "$explicit_skill_file"; then
    echo "$explicit_route_skill must preserve the explicit-request routing boundary." >&2
    exit 1
  fi
done

if rg -n 'image/(nano-banana-lite|gpt-image-direct|flux-dev)|video/veo-3\.1-lite|video/seedance-2\.0-fast|video/seedance-2\.0([^a-zA-Z0-9_-]|$)' "$skills_root" --glob '*.md'; then
  echo "A deprecated or intentionally hidden recommendation appears in skill copy." >&2
  exit 1
fi

scenario_count="$(awk 'BEGIN { count = 0 } /^\| [0-9]+ / { count += 1 } END { print count }' "$repo_root/evals/skill-routing-scenarios.md")"
if (( scenario_count < 24 )); then
  echo "Routing eval suite needs at least 24 scenarios; found $scenario_count." >&2
  exit 1
fi

if rg -n 'agentic_prompting|prompt_expansion_mode' "$skills_root" --glob '*.md'; then
  echo "Skill copy must leave internal prompt-rewriting controls to the backend." >&2
  exit 1
fi

clone_voice_skill="$skills_root/creativeclaw-clone-voice/SKILL.md"
if ! rg -q 'audio_asset_id' "$clone_voice_skill"; then
  echo "Voice cloning must use the private audio_asset_id contract." >&2
  exit 1
fi
if rg -n 'durable public `audio_url`|audio_url: "<durable Creative Claw audio URL>"' "$clone_voice_skill"; then
  echo "Voice cloning skill still advertises the retired public audio_url contract." >&2
  exit 1
fi

node "$repo_root/scripts/sync-skill-references.mjs" --check

# Video-model guidance must stay in outcome references, not discovery entries.
for retired in creativeclaw-nano-banana-2 creativeclaw-nano-banana-pro creativeclaw-gpt-image-2 creativeclaw-seedream-5-pro creativeclaw-elevenlabs-v2 creativeclaw-elevenlabs-v3 creativeclaw-cartesia-sonic creativeclaw-minimax-speech creativeclaw-xai-tts creativeclaw-chatterbox creativeclaw-gemini-omni creativeclaw-seedance-2-5 creativeclaw-minimax-h3-max creativeclaw-wan-3; do
  if [[ -f "$skills_root/$retired/SKILL.md" ]] ||
    rg -l -F "$retired" "$skills_root" --glob '*.md' --glob '*.yaml' ||
    rg -l -F "skills/$retired" "$repo_root/plugins/creative-claw/openclaw.plugin.json"; then
    echo "Retired video-model skill or stale route found: $retired" >&2
    exit 1
  fi
done

actual_skill_count="$(find "$skills_root" -mindepth 2 -maxdepth 2 -name SKILL.md | wc -l | tr -d ' ')"
if (( actual_skill_count != ${#skill_names[@]} )); then
  echo "The skill inventory and validator list disagree." >&2
  exit 1
fi

echo "Validated structure for ${#skill_names[@]} Creative Claw skills; $scenario_count behavioral scenarios are documented, not executed."
