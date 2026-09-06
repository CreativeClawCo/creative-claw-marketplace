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
  creativeclaw-generate-image
  creativeclaw-generate-video
  creativeclaw-generate-voiceover
  creativeclaw-create-character
  creativeclaw-plan-video
  creativeclaw-build-film
  creativeclaw-product-photoshoot
  creativeclaw-create-ugc-ad
  creativeclaw-submit-feedback
)
for route in "${routes[@]}"; do
  if ! rg -q "$route" "$root_skill"; then
    echo "Root skill does not route to $route." >&2
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

echo "Validated ${#skill_names[@]} Creative Claw skills and $scenario_count routing scenarios."
