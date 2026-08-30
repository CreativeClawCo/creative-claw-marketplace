# Characters and Films

Characters preserve identity across image, video, and speech. Films organize approved scripts, storyboards, clips, audio, and assembly.

## Create a Character

1. Collect the Character's name, role, appearance, wardrobe, personality, and constraints.
2. Search for an existing approved reference image or generate one.
3. Create the Character with `manage_character({ title, description, image_url })`.
4. Optionally attach a cloned voice only after explicit consent.

### Reference image

Use a clear image or character sheet with consistent lighting and no labels. For a generated sheet, start with `image/nano-banana-pro` for complex multi-view direction or another current model better suited to the target identity/style.

```text
Character reference sheet for [name]: [description]. Front, three-quarter,
side, and back views; identical face, body, hair, wardrobe, materials, and
lighting in every view. Full body, neutral studio background. No text,
labels, borders, or extra people.
```

Use `agentic_prompting: false` for this exact multi-view instruction. Inspect facial identity and wardrobe consistency before saving.

### Voice

Import 30 seconds to a few minutes of clean solo speech. Confirm the user owns the voice or has permission, then call:

```text
manage_character({ id, audio_url, consent: true })
```

or `clone_voice({ character_id, audio_url, consent: true })`.

Use a quiet recording with no music or competing speaker. After cloning, `generate_speech({ character_id, text })` uses the Character voice.

## Use a Character

| Tool              | Effect                                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| `generate_image`  | Uses the Character reference and adds its description to prompt context.                                  |
| `generate_video`  | Uses the Character anchor unless a more specific compatible source is supplied; adds description context. |
| `generate_speech` | Uses the saved cloned voice and stops if a requested Character has no voice.                              |

Pass `character_id` instead of manually repeating the Character's image, description, and voice. Add shot-specific references only when the selected model supports them.

## Film approval pipeline

Use three user approval gates. Do not spend on later stages before the prior gate is approved.

### Gate 1: script

1. `create_film_project({ name, brief, character_ids, target_duration_s })`.
2. Draft a logline and shot list with narration/dialogue.
3. Keep each shot within the selected model's duration cap; do not assume every model caps at 15s.
4. Save with `update_film_project` and show the project.
5. Wait for explicit script approval.

### Gate 2: storyboards

1. Fetch each Character and the brand theme.
2. Generate one clean storyboard/keyframe per shot using an edit-capable image model that preserves the intended identity and style.
3. For real-person likeness, compare a leading edit model when uncertain instead of relying on a stale universal rule.
4. Use `size` for the target frame ratio.
5. Patch each shot with its `storyboardUrl`, show the project, and wait for look approval.

### Gate 3: clips, audio, and assembly

1. Generate narration/dialogue first so shot timing follows actual speech.
2. Call `list_models` and `get_model_params` for the chosen video model.
3. Generate each clip from its approved storyboard and Character/reference inputs.
4. For longer reference-heavy shots, consider `video/seedance-2.5`; for explicit multi-shot structure consider `video/kling-3.0-omni`; for general work start with `video/gemini-omni-flash`. Use the full picker in `video-gen.md`.
5. Resolve and inspect each clip before patching it into the project.
6. Use `extract_frames` to carry the last frame into the next shot when serial continuity is needed.
7. Call `assemble_film({ film_project_id })` only after clips and audio are approved.
8. Show the assembled Film and wait for final approval before marking it final.

## Shot rules

- Give each shot one clear dramatic purpose.
- Keep a stable identity/style line across prompts.
- Avoid impossible duplication of one Character within the same generated shot unless the selected model and reference method explicitly support it.
- Use exact dialogue in quotes and direct audio behavior explicitly.
- Preserve approved storyboards and clips as named assets; do not overwrite the anchors during revision.
- Explain cost before a multi-shot batch and do not silently swap models after failure.

## Tools

- Characters: `manage_character`, `clone_voice`, `list_characters`, `delete_character`.
- Films: `create_film_project`, `update_film_project`, `get_film_project`, `list_film_projects`, `assemble_film`.
- Media: `generate_image`, `generate_video`, `generate_speech`, `extract_frames`, `merge_media`, `check_job`.
