---
name: creativeclaw-generate-video
description: "Generate, animate, extend, reframe, or transform one video clip with Creative Claw. Use for a clear single-clip request when the user has not asked for a storyboard, UGC ad, or complete multi-shot film."
---

# Generate Video

Read [video model selection](references/video/index.md), then only the selected model's guide. Model families are covered locally, with live-schema guidance for additional models; do not load every guide or require a sibling model skill. Read [Review/Auto handling](references/video/review.md) before submission.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Create one controlled video clip from text, a start frame, an optional end frame, or other model-supported references. Use the planning, UGC, or film skills when the deliverable is a larger production. Use `creativeclaw-render-html` only when the user explicitly requests HTML/HyperFrames/code-driven rendering; use `creativeclaw-edit-media` for video bookends.

For a permanent watermark on a finished video or a sequence assembled from existing images, video clips, and optional audio, use `merge_media` through `creativeclaw-edit-media`. Read [assembly guidance](references/media-assembly.md) for `overlay_images` and `compose_video`. Preserve the existing media instead of generating replacement footage.

For worked production flows, read only the relevant recipe: [product ad](references/video/recipe-product-ad.md), [consistent Character scene](references/video/recipe-character-scene.md), or [source edit and extension](references/video/recipe-source-edit.md). These explain asset preparation, shot prompting, assembly and output checks, without authorizing extra paid drafts.

## Reference-first pipeline

Unless the user asked for direct text-to-video, supplied a ready shot image, or is editing footage, follow this before `generate_video`. A video request authorizes one keyframe per shot: say so, don't ask.

1. Anchors, reuse first: `search_assets`, `list_characters`, `get_theme`. Person: Character sheet + face portrait (real person: also their best original photo). Product: real photo or packshot, plus a label/logo close-up when text matters. A recurring person or product with no anchor: create it first (creativeclaw-create-avatar, creativeclaw-product-photoshoot).
2. Look line: one sentence (palette, light, lens, medium), pasted into every keyframe and video prompt.
3. Keyframe per shot: `generate_image` with the same image model all project (default `image/nano-banana-2`), `aspect_ratio` = the video's ratio, main anchor in `image_url`, others in `extras.image_urls`, roles named. One clean full-bleed frame; no text, grid or labels.
4. Compare it to the anchors (face, label, logo, colors); fix with one targeted edit.
5. Show keyframes and the plan (model, duration, ratio) in one message. Review mode: call `generate_video` now; the card is the approval. Auto: ask once unless the user said go.
6. One mode per shot. People, several subjects or big motion: `image_urls` = [keyframe, identity anchor, product anchor], 2–4 total; `character_id` is fine here. Exact opening (product hero, logo reveal): `image_url` = keyframe, no `image_urls` or `character_id`.
7. Next shot: same anchors and look line. A previous clip's last frame is only an extra composition cue.

Details: [reference production](references/video/reference-production.md). Image prompting: [image model index](references/images/index.md) and only the chosen guide.

## Voices

When a Character speaks and the voice is unknown, ask one question: design a new voice from a description (`design_voice`, three auditions), use your own voice (recording plus consent, creativeclaw-clone-voice), or pick a stock voice. If the voice doesn't matter, pick a stock voice and name it. Design auditions use the Character's real lines. In ChatGPT the Voice Studio card saves the choice; read it back from `list_characters` rather than saving again.

Then pick one path per speaking shot from [voice in video](references/video/voice-in-video.md): native dialogue for a one-off, or speech first for an exact or recurring voice (an audio-capable model, or `video/sync-3` on a finished clip). Gemini Omni, the default, accepts no audio: don't make speech first for an Omni shot. Keep lines to at most 2.5 words per clip second.

## Workflow

1. Define the clip's purpose, aspect ratio, duration, subject, one primary action, camera move, visual continuity, dialogue or sound, and required end state.
2. Unless the user asked for direct text-to-video, supplied a ready shot image, or is editing footage, follow the reference-first pipeline above before `generate_video`. Import media the user referred to first.
3. When the user asks for examples, styles, or similar concepts, or an open brief would benefit from concrete directions, call `search_examples` with `output_type: "video"`, then load only the chosen result with `search_examples({ id })`. Do not search before every clip.
4. Use `list_models({ category: "video" })` when choosing a model; for a known selection, use `get_model_params` directly. Reuse its current-task durations, resolutions, operations, and reference contract.
5. Use `estimate_generation` with `operation: "video"` only when the user asks about cost, balance, affordability, or sets a budget. Treat returned alternatives as options; preserve explicitly chosen models, durations, and quality. Estimate-only requests do not authorize generation.
6. State consequential settings briefly and proceed within the requested scope. Do not ask again when the user already requested the generation or approved that production stage.
7. Write one chronological prompt: opening frame, subject action, camera behavior, environmental motion, audio or dialogue, ending frame, and exclusions.
8. Call `generate_video`; use `check_job` only when another tool needs the completed URL or no inline viewer is monitoring the job.
9. Inspect identity, anatomy, product fidelity, timing, camera motion, dialogue sync, and ending continuity. Deliver the result and describe any shortcomings. Suggest a focused revision, but do not generate another take without an explicit user request for that additional generation.

## Authorization for additional videos

A request for one video authorizes one generation attempt, not repeated attempts until the agent considers it good enough. For an explicitly requested batch or approved film shot list, generate only the requested number of clips, once each.

Before another take, replacement, model comparison, extension, or generative repair, require an explicit request for that additional video. A complaint, a request to inspect or diagnose a problem, or the agent noticing a defect does not authorize generation. If "fix it" could mean editing existing footage or generating again, explain the proposed repair and ask before generating again. An unused budget, a failed job, a refund, or `retryable: true` does not grant permission for another attempt.

An explicit "generate another version" or "retry once" is sufficient authorization for that scope; do not ask redundantly. For "keep trying until perfect," agree on a finite attempt limit before starting further generations. Stop when the requested attempts finish and let the user decide what comes next.

Continue status checks, retrieval, inspection, and drafting revised prompts without creating another video. Correct and resubmit a rejected input only when it is confirmed that no generation job was accepted or started and no credits were charged. For timeouts or uncertain submissions, follow [job recovery](references/job-recovery.md) before considering any replacement.

## Model routing

- Default to `video/gemini-omni-flash` for the best general balance of speed, quality, native audio, and reference-aware generation.
- Use `video/seedance-2.5`, the premium cinematic model, for high-end, reference-rich or long clips (up to 30 s). For a cheaper preview, draft at `resolution: "480p"`, then render the approved version at 720p or 1080p.
- Use `video/minimax-h3-max` for fast cinematic motion and native-audio work.
- Use `video/minimax-h3-max-turbo`, presented as **H3 Max Fast**, for cheap, fast drafts and iteration.
- Use `video/wan-3.0` for native-audio clips of 2–30 s in one pass, or when a document or webpage drives the video.
- Use Seedance Mini only when the user asks for it.
- Honor an explicit model request, and load its local guide from the model-selection index for exact prompt and reference syntax.

For existing footage, do not apply the general generation ranking blindly:

- To extend a clip, default to `video/minimax-h3-max-extend`; it keeps the source's characters, setting, motion, and look. Use one source of 1.625–60 seconds in `video_urls`, a `duration` of 5–15 seconds for the new footage, keep `aspect_ratio: "auto"` unless cropping was requested, and describe what happens next. Its default `extras.output: "extended"` returns the source plus new footage; `"continuation"` returns only the new segment. Use `video/seedance-2.5` `extend` only for heavy references or a long continuation.
- To replace an interval inside a clip with new footage, use `video/minimax-h3-max-insert`: one source in `video_urls`, `extras.start_time` where the new scene begins and `extras.resume_time` where the original resumes, both on the source timeline. `duration` sets the new scene's length.
- Up to 10 seconds, prefer `video/gemini-omni-flash` for a targeted source edit.
- From 4–30 seconds, prefer `video/seedance-2.5` for a full source edit.
- When the user wants the original left unchanged with new footage added, generate only the new continuation (with H3 Max Extend, `extras.output: "continuation"`) and merge it with the untouched original.
- Never recommend or proactively route to an LTX or DreamActor model.

## Reference rules

- `image_url` is only the literal start frame. It selects image-to-video and makes the supplied image frame zero. `last_frame_url` is the desired end frame when the selected model exposes it.
- `image_urls`, `video_urls`, and `audio_urls` are model-specific reference arrays. If a supplied image should guide identity, style, character, product, or composition instead of becoming frame zero, use `image_urls`, even for exactly one image. Use 2–4 strong references; more is not better.
- `character_id` appends the saved image to `image_urls` as a reference, never a start frame. Use it in reference mode; omit it with `image_url`/`last_frame_url` (the server rejects that mix). For literal-frame animation, build identity into the approved frame and omit reference arrays.
- Preserve exact quoted copy, reference labels, dialogue, timecodes, colors, and approved layout or edit constraints in the prompt.
- Discover transformation support on the selected model and connected tool schema. Do not assume a generic top-level `operation` selector exists; use only currently exposed fields and model-supported `extras` controls. Never silently switch an explicitly chosen model to obtain a transformation.

## Prompt shape

Prefer one subject action and one camera idea per clip. Describe what happens over time, not a pile of adjectives. Include exact spoken words only when needed, and specify what must not change. For a multi-shot piece, plan it with `creativeclaw-plan-video`.

Conduct the workflow in the user's language and preserve quoted dialogue exactly. Confirm the chosen model supports the requested spoken language before relying on native audio.
