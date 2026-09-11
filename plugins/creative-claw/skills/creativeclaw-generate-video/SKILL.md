---
name: creativeclaw-generate-video
description: "Generate, animate, extend, reframe, or transform one video clip with Creative Claw. Use for a clear single-clip request when the user has not asked for a storyboard, UGC ad, or complete multi-shot film."
---

# Generate Video

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Create one controlled video clip from text, a start frame, an optional end frame, or other model-supported references. Use the planning, UGC, or film skills when the deliverable is a larger production. Use `creativeclaw-render-html-video` only when the user explicitly requests HTML/HyperFrames/code-driven rendering; use `creativeclaw-add-video-intro-outro` for video bookends.

## Workflow

1. Define the clip's purpose, aspect ratio, duration, subject, one primary action, camera move, visual continuity, dialogue or sound, and required end state.
2. Search existing assets before importing new references. A still is a start frame only when it should define the opening composition.
3. When the user asks for examples, references, styles, or similar concepts—or an open brief would materially benefit from choosing among concrete directions—use `creativeclaw-find-examples`. Filter by `output_type: "video"`, then load only the selected result. Do not search before every clip.
4. Use `list_models({ category: "video" })` when choosing a model; for a known selection, use `get_model_params` directly. Reuse its current-task durations, resolutions, operations, and reference contract.
5. Use `estimate_generation` with `operation: "video"` only when the user asks about cost, balance, affordability, or sets a budget. Treat returned alternatives as options; preserve explicitly chosen models, durations, and quality. Estimate-only requests do not authorize generation.
6. State consequential settings briefly and proceed within the requested scope. Do not ask again when the user already requested the generation or approved that production stage.
7. Write one chronological prompt: opening frame, subject action, camera behavior, environmental motion, audio or dialogue, ending frame, and exclusions.
8. Call `generate_video`; use `check_job` only when another tool needs the completed URL or no inline viewer is monitoring the job.
9. Inspect identity, anatomy, product fidelity, timing, camera motion, dialogue sync, and ending continuity. Revise one variable at a time.

## Model routing

- Default to `video/gemini-omni-flash` for the best general balance of speed, quality, native audio, and reference-aware generation.
- Use `video/seedance-2.5` for premium cinematic or reference-rich clips and longer shots where supported.
- Use `video/seedance-2.0-mini`, presented to users as **Seedance Mini**, for economical drafts.
- Use `video/minimax-h3-max` for fast cinematic motion and native-audio work.
- Use `video/minimax-h3-max-turbo`, presented as **H3 Max Fast**, when speed and iteration cost matter most.
- Honor an explicit model request, and load that model's specialist skill for exact prompt and reference syntax.

## Reference rules

- `image_url` is only the literal start frame. It selects image-to-video and makes the supplied image frame zero. `last_frame_url` is the desired end frame when the selected model exposes it.
- `image_urls`, `video_urls`, and `audio_urls` are model-specific reference arrays. If a supplied image should guide identity, style, character, product, or composition instead of becoming frame zero, use `image_urls`, even for exactly one image. There is no universal three-reference requirement.
- A saved `character_id` supplies the Character image as the start frame only when no explicit `image_url` is provided. If a storyboard is the start frame and identity must also be referenced, add the Character image through a supported reference field.
- Preserve literal reference tokens such as Seedance `@Image1`, exact dialogue, or timecodes by setting `agentic_prompting: false`.
- Use `operation` only for the exposed modes: `retake`, `extend`, `reframe`, `audio_to_video`, or `animate_character`.

## Prompt shape

Prefer one subject action and one camera idea per clip. Describe what happens over time, not a pile of adjectives. Include exact spoken words only when needed, and specify what must not change. For multi-shot continuity, first create a storyboard and clean reference frames with `creativeclaw-plan-video`.

Conduct the workflow in the user's language and preserve quoted dialogue exactly. Confirm the chosen model supports the requested spoken language before relying on native audio.
