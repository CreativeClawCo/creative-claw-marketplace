# Characters and Films

Characters preserve visual identity across images and video and can carry voices: a Cartesia or ElevenLabs clone (with consent), a designed voice, or a saved stock voice. Cloning or designing without a Character creates a voice-only one. Films organize approved scripts, storyboards, clips, audio, and assembly.

## Create a Character

1. Collect the Character's name, role, appearance, wardrobe, personality, and constraints.
2. Search for an existing approved reference image or generate one.
3. Create the Character with `manage_character({ title, description, image_url })`.
4. For a reusable voice: consenting speaker's recording → `creativeclaw-clone-voice`; description → `design_voice`; stock → `manage_character` with `voice_model`/`voice_id`. Do not clone or replace a voice without explicit consent.

### Reference image

Use a clear image or character sheet with consistent lighting and no labels. For a generated sheet, start with `image/nano-banana-pro` for complex multi-view direction or another current model better suited to the target identity/style.

```text
Character reference sheet for [name]: [description]. Front, three-quarter,
side, and back views; identical face, body, hair, wardrobe, materials, and
lighting in every view. Full body, neutral studio background. No text,
labels, borders, or extra people.
```

Preserve this exact multi-view instruction. Inspect facial identity and wardrobe consistency before saving.

## Use a Character

| Tool              | Effect                                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| `generate_image`  | Adds Character description context and uses its image only when no primary `image_url` is supplied.        |
| `generate_video`  | Appends the saved image to `image_urls` as a reference, never a start frame. Use it in reference mode; omit it with `image_url`/`last_frame_url` (the server rejects that mix). |
| `generate_speech` | Uses the Character's saved voice for the chosen model: designed ElevenLabs → v4; Google-designed → `speech/gemini-3.8-flash-tts`; Cartesia clone → `speech/cartesia-sonic`; ElevenLabs clone → v2 (steady) or v4 (expressive, dialogue); stock → its saved model. |

Pass `character_id` for saved identity context. For `generate_image`, when a keyframe or edit canvas already occupies `image_url`, add the Character image yourself in `extras.image_urls`; it is not inserted automatically.

## Film approval pipeline

Honor the requested script, storyboard, and final review stages. Reuse approval already given, including explicit instructions to continue through stages; do not ask the same question again. Follow [shared execution guidance](../workflow-basics.md).

### Gate 1: script

1. `create_film_project({ name, brief, character_ids, target_duration_s })`.
2. Draft a logline and shot list with narration/dialogue.
3. Keep each shot within the selected model's duration cap; do not assume every model caps at 15s.
4. Save with `update_film_project` and show the project.
5. Obtain script approval if it has not already been given and the user has not authorized continuing through this stage.

### Gate 2: storyboards

1. Fetch each Character and the brand theme.
2. Generate one clean keyframe per shot from the shared anchors, with the same image model for the whole project ([reference production](../video/reference-production.md)).
3. For real-person likeness, compare a leading edit model when uncertain instead of relying on a stale universal rule.
4. Set `aspect_ratio` to the video's ratio.
5. Patch each shot with its `storyboardUrl`, show the project, and honor the applicable look-review stage without repeating existing approval.

### Gate 3: clips, audio, and assembly

1. Pick a voice path per speaking shot ([voice in video](../video/voice-in-video.md)). Generate narration or dialogue first with the Character's saved voice and matching model, and lock shot lengths from its `wordTimings`.
2. Call `list_models` and `get_model_params` for the chosen video model.
3. Generate each clip from its approved storyboard and Character/reference inputs.
4. Start with `video/gemini-omni-flash`; use `video/seedance-2.5` for longer reference-heavy shots or `video/minimax-h3-max` for fast cinematic work with optional boundary frames. Use the curated picker in `video-gen.md`.
5. Resolve and inspect each clip before patching it into the project.
6. Keep every shot built from the same anchors; a previous clip's last frame (`extract_frames`) is only an extra composition cue.
7. Add per-shot audio with `merge_media` `merge_audio_video` (`audio_mode: "mix"` keeps the shot's sound; the default `replace` discards it and ends at the shorter input), or save one approved narration track as the project's `audio_url`. `assemble_film` narration replaces every shot's audio; set `with_narration: false` when shots carry dialogue.
8. Call `assemble_film({ id })` only after every intended shot has an approved `clipUrl`.
9. Resolve the assembly job with `check_job` before delivering the first cut. Read [media-assembly.md](../media-assembly.md) for duration matching, merge continuations, and track handling. Honor the applicable final review before marking it final; assembly does not add transitions, captions, per-shot audio, or a full sound mix.

## Shot rules

- Give each shot one clear dramatic purpose.
- Keep a stable identity/style line across prompts.
- Avoid impossible duplication of one Character within the same generated shot unless the selected model and reference method explicitly support it.
- Use exact dialogue in quotes and direct audio behavior explicitly.
- Preserve approved storyboards and clips as named assets; do not overwrite the anchors during revision.
- Discuss estimates when the user asks about cost or supplies a budget; do not silently swap models after failure.

## Tools

- Characters: `manage_character` (delete with `{ id, delete: true }`), `list_characters`, `design_voice`.
- Films: `create_film_project`, `update_film_project`, `get_film_project`, `list_film_projects`, `assemble_film`.
- Media: `generate_image`, `generate_video`, `generate_speech`, `clone_voice`, `extract_frames`, `merge_media`, `check_job`.
