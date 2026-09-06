---
name: creativeclaw-generate-video
description: "Generate, animate, extend, reframe, or transform one video clip with Creative Claw. Use for a clear single-clip request when the user has not asked for a storyboard, UGC ad, or complete multi-shot film."
---

# Generate Video

Create one controlled video clip from text, a start frame, an optional end frame, or other model-supported references. Use the planning, UGC, or film skills when the deliverable is a larger production.

## Workflow

1. Define the clip's purpose, aspect ratio, duration, subject, one primary action, camera move, visual continuity, dialogue or sound, and required end state.
2. Search existing assets before importing new references. A still is a start frame only when it should define the opening composition.
3. Call `list_models({ modality: "video" })`, choose by capability, then call `get_model_params` for supported durations, resolutions, operations, and references.
4. State the selected model and consequential settings. Confirm before an expensive or long generation.
5. Write one chronological prompt: opening frame, subject action, camera behavior, environmental motion, audio or dialogue, ending frame, and exclusions.
6. Call `generate_video`; use `check_job` only when another tool needs the completed URL or no inline viewer is monitoring the job.
7. Inspect identity, anatomy, product fidelity, timing, camera motion, dialogue sync, and ending continuity. Revise one variable at a time.

## Model routing

- Default to `video/gemini-omni-flash` for the best general balance of speed, quality, native audio, and reference-aware generation.
- Use `video/seedance-2.5` for premium cinematic or reference-rich clips and longer shots where supported.
- Use `video/seedance-2.0-mini`, presented to users as **Seedance Mini**, for economical drafts.
- Use `video/minimax-h3-max` for fast cinematic motion and native-audio work.
- Use `video/minimax-h3-max-turbo`, presented as **H3 Max Fast**, when speed and iteration cost matter most.
- Honor an explicit model request, and load that model's specialist skill for exact prompt and reference syntax.

## Reference rules

- `image_url` is the start frame. `last_frame_url` is the desired end frame when the selected model exposes it.
- `image_urls`, `video_urls`, and `audio_urls` are model-specific reference arrays. There is no universal three-reference requirement.
- A saved `character_id` supplies the Character image as the start frame only when no explicit `image_url` is provided. If a storyboard is the start frame and identity must also be referenced, add the Character image through a supported reference field.
- Preserve literal reference tokens such as `@image1`, exact dialogue, or timecodes by setting `agentic_prompting: false`.
- Use `operation` only for the exposed modes: `retake`, `extend`, `reframe`, `audio_to_video`, or `animate_character`.

## Prompt shape

Prefer one subject action and one camera idea per clip. Describe what happens over time, not a pile of adjectives. Include exact spoken words only when needed, and specify what must not change. For multi-shot continuity, first create a storyboard and clean reference frames with `creativeclaw-plan-video`.

Conduct the workflow in the user's language and preserve quoted dialogue exactly. Confirm the chosen model supports the requested spoken language before relying on native audio.
