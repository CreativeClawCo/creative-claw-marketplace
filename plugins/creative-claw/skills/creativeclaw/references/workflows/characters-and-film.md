# Characters and Films

Characters preserve visual identity across images and video and can carry a consented ElevenLabs voice clone. Films organize approved scripts, storyboards, clips, audio, and assembly.

## Create a Character

1. Collect the Character's name, role, appearance, wardrobe, personality, and constraints.
2. Search for an existing approved reference image or generate one.
3. Create the Character with `manage_character({ title, description, image_url })`.
4. When the user wants a reusable custom voice, use the separate `creativeclaw-clone-voice` skill. Do not clone or replace a voice without explicit consent.

### Reference image

Use a clear image or character sheet with consistent lighting and no labels. For a generated sheet, start with `image/nano-banana-pro` for complex multi-view direction or another current model better suited to the target identity/style.

```text
Character reference sheet for [name]: [description]. Front, three-quarter,
side, and back views; identical face, body, hair, wardrobe, materials, and
lighting in every view. Full body, neutral studio background. No text,
labels, borders, or extra people.
```

Use `agentic_prompting: false` for this exact multi-view instruction. Inspect facial identity and wardrobe consistency before saving.

## Use a Character

| Tool              | Effect                                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| `generate_image`  | Adds Character description context and uses its image only when no primary `image_url` is supplied.        |
| `generate_video`  | Adds Character description context and uses its image as the start frame only when `image_url` is absent.  |
| `generate_speech` | Uses the Character's consented ElevenLabs voice clone when one is attached.                               |

Pass `character_id` for saved identity context. When a storyboard or edit canvas already occupies `image_url`, add the Character image separately through a reference field supported by the selected model; it is not inserted automatically as a second reference.

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

1. Generate narration/dialogue first with a curated or consented cloned ElevenLabs voice so shot timing follows actual speech.
2. Call `list_models` and `get_model_params` for the chosen video model.
3. Generate each clip from its approved storyboard and Character/reference inputs.
4. Start with `video/gemini-omni-flash`; use `video/seedance-2.5` for longer reference-heavy shots or `video/minimax-h3-max` for fast cinematic work with optional boundary frames. Use the curated picker in `video-gen.md`.
5. Resolve and inspect each clip before patching it into the project.
6. Use `extract_frames` to carry the last frame into the next shot when serial continuity is needed.
7. Mux per-shot audio into its clip with `merge_media`, or save one approved full narration track as the project's `audio_url`.
8. Call `assemble_film({ id })` only after every intended shot has an approved `clipUrl`.
9. Treat the result as an assembled first cut. Show it and wait for final approval before marking it final; assembly does not add transitions, captions, per-shot audio, or a full sound mix.

## Shot rules

- Give each shot one clear dramatic purpose.
- Keep a stable identity/style line across prompts.
- Avoid impossible duplication of one Character within the same generated shot unless the selected model and reference method explicitly support it.
- Use exact dialogue in quotes and direct audio behavior explicitly.
- Preserve approved storyboards and clips as named assets; do not overwrite the anchors during revision.
- Explain cost before a multi-shot batch and do not silently swap models after failure.

## Tools

- Characters: `manage_character`, `list_characters`, `delete_character`.
- Films: `create_film_project`, `update_film_project`, `get_film_project`, `list_film_projects`, `assemble_film`.
- Media: `generate_image`, `generate_video`, `generate_speech`, `clone_voice`, `extract_frames`, `merge_media`, `check_job`.
