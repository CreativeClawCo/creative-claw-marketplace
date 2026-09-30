---
name: creativeclaw-plan-video
description: "Plan a video as an approved script, shot list, and storyboard with clean generation references. Use before costly multi-shot work, when continuity matters, or when the user asks to storyboard without producing a final film yet."
---

# Plan Video

Read [video model selection](references/video/index.md) when choosing shot models. Load a specific model guide only when planning its timing, references or controls. These references are packaged locally; no sibling model skill is required. Planning alone does not authorize video generation.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Convert a concept into an execution-ready video plan before spending on clips. This skill stops at an approved plan or storyboard unless the user also asks for production.

For worked production flows, read only the relevant recipe: [product ad](references/video/recipe-product-ad.md), [consistent Character scene](references/video/recipe-character-scene.md), or [source edit and extension](references/video/recipe-source-edit.md). These explain asset preparation, shot prompting, assembly and output checks, without authorizing extra paid drafts.

## Reference-first pipeline

Unless the user asked for direct text-to-video, supplied a ready shot image, or is editing footage, follow this before `generate_video`. Planning stops after step 5 unless production was requested. A video request authorizes one keyframe per shot: say so, don't ask.

1. Anchors, reuse first: `search_assets`, `list_characters`, `get_theme`. Person: Character sheet + face portrait (real person: also their best original photo). Product: real photo or packshot, plus a label/logo close-up when text matters. A recurring person or product with no anchor: create it first (creativeclaw-create-avatar, creativeclaw-product-photoshoot).
2. Look line: one sentence (palette, light, lens, medium), pasted into every keyframe and video prompt.
3. Keyframe per shot: `generate_image` with the same image model all project (default `image/nano-banana-2`), `aspect_ratio` = the video's ratio, main anchor in `image_url`, others in `extras.image_urls`, roles named. One clean full-bleed frame; no text, grid or labels.
4. Compare it to the anchors (face, label, logo, colors); fix with one targeted edit.
5. Show keyframes and the plan (model, duration, ratio) in one message. Review mode: call `generate_video` now; the card is the approval. Auto: ask once unless the user said go.
6. One mode per shot. People, several subjects or big motion: `image_urls` = [keyframe, identity anchor, product anchor], 2–4 total; `character_id` is fine here. Exact opening (product hero, logo reveal): `image_url` = keyframe, no `image_urls` or `character_id`.
7. Next shot: same anchors and look line. A previous clip's last frame is only an extra composition cue.

Details: [reference production](references/video/reference-production.md). Image prompting: [image model index](references/images/index.md) and only the chosen guide.

## Plan the story

1. Define objective, audience, channel, aspect ratio, target runtime, brand, required Characters or products, audio approach, and call to action. Give each speaking shot a voice path (native dialogue, speech first, or voiceover) from [voice in video](references/video/voice-in-video.md), and note whose voice it is.
2. Write a concise beat outline and script. Prefer a clear opening hook, progression, payoff, and ending.
3. Break the piece into shots. Each shot gets one primary action, one camera idea, a start state, end state, dialogue or narration, and a model-supported duration. Keep speech to at most 2.5 spoken words per clip second, with about 0.5 s of air at each end; lock durations from the audio's `wordTimings`.
4. Choose likely models with `list_models` and inspect them with `get_model_params`. Duration and reference limits are per model; never impose a universal clip length.

Write the plan in the user's language and preserve approved dialogue or on-screen copy exactly.

## Build the storyboard

For a visual storyboard request, create the needed artifacts with `creativeclaw-generate-image`. A text-only plan does not require images; reuse approved frames and skip duplicate review boards when unnecessary:

- A review board or contact sheet for fast approval of composition, pacing, and continuity, only when useful.
- One clean, text-free keyframe per shot, made as in the pipeline above. Never feed a labeled grid to a video model.

Preserve Character identity, product geometry, wardrobe, palette, screen direction, time of day, and recurring locations across frames. Use one image model for the whole project, Nano Banana 2 by default.

## Optional Film project

If the user intends to continue into production, call `create_film_project` and persist the approved shots with `update_film_project`. Use stable shot IDs and the actual tool fields: `description`, `prompt`, `narration`, `storyboardUrl`, `durationS`, `model`, and `status`. Set the project to `script_ok` only after script approval and `storyboard_ok` only after storyboard approval.

## Approval gate

Present the requested plan/storyboard and honor review stages and existing approval. Planning alone does not authorize video generation. When production is also requested and its applicable stage is approved, continue with `creativeclaw-build-film` without asking the same question again.
