---
name: creativeclaw-generate-video
description: "Generate, animate, extend, reframe, or transform one video clip with Creative Claw. Use for a clear single-clip request when the user has not asked for a storyboard, UGC ad, or complete multi-shot film."
---

# Generate Video

Read [video model selection](references/video/index.md), then only the selected model's guide. Model families are covered locally, with live-schema guidance for additional models; do not load every guide or require a sibling model skill. Read [reference production](references/video/reference-production.md) before preparing media and [Review/Auto handling](references/video/review.md) before submission.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Create one controlled video clip from text, a start frame, an optional end frame, or other model-supported references. Use the planning, UGC, or film skills when the deliverable is a larger production. Use `creativeclaw-render-html-video` only when the user explicitly requests HTML/HyperFrames/code-driven rendering; use `creativeclaw-add-video-intro-outro` for video bookends.

For worked production flows, read only the relevant recipe: [product ad](references/video/recipe-product-ad.md), [consistent Character scene](references/video/recipe-character-scene.md), or [source edit and extension](references/video/recipe-source-edit.md). These explain asset preparation, shot prompting, assembly and output checks, without authorizing extra paid drafts.

## Reference-first production

Strongly recommend image preparation before video: reuse the user's media, develop shot-appropriate references with creativeclaw-generate-image, and prefer at least three complementary images where the video model supports them. Read [image model selection](references/images/index.md) and only the chosen image guide, plus [the reference-first workflow](references/video/reference-production.md) for approval, Character sheets, audio-first control and cross-shot continuity. Existing references count; do not force extra paid assets, exceed model limits or ignore an explicit direct-generation request.

Use the video's Review card as the single approval of its exact references and settings, without a duplicate chat approval. Honor separately requested earlier checkpoints and consent requirements. Review does not gate earlier image/audio charges. For connected clips, reuse stable visual/audio anchors and request dialogue, ambience and effects without independently generated music per shot.

## Workflow

1. Define the clip's purpose, aspect ratio, duration, subject, one primary action, camera move, visual continuity, dialogue or sound, and required end state.
2. Search and inspect the media the user referenced. Recommend a bounded reference-image preparation stage, using those sources to generate appropriate shot references when needed. Prefer reference conditioning; a still is a start frame only when it should define the exact opening composition.
3. When the user asks for examples, references, styles, or similar concepts—or an open brief would materially benefit from choosing among concrete directions—use `creativeclaw-find-examples`. Filter by `output_type: "video"`, then load only the selected result. Do not search before every clip.
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
- Use `video/seedance-2.5` for premium cinematic or reference-rich clips and longer shots where supported.
- Use `video/seedance-2.0-mini`, presented to users as **Seedance Mini**, for economical drafts.
- Use `video/minimax-h3-max` for fast cinematic motion and native-audio work.
- Use `video/minimax-h3-max-extend` when adding footage to an existing clip and preserving its characters, setting, motion, and visual characteristics matters. It accepts one source video of 1.625–60 seconds and adds 5–15 seconds of new footage.
- Use `video/minimax-h3-max-turbo`, presented as **H3 Max Fast**, when speed and iteration cost matter most.
- Honor an explicit model request, and load its local guide from the model-selection index for exact prompt and reference syntax.

For existing footage, do not apply the general generation ranking blindly:

- For a new continuation that should retain the source video's characters, environment, camera motion, and visual style, prefer `video/minimax-h3-max-extend`. Use one source in `video_urls`, keep `aspect_ratio: "auto"` unless cropping was requested, and describe what happens next. Its default `extras.output: "extended"` returns the source plus new footage; `"continuation"` returns only the new segment.
- Up to 10 seconds, prefer `video/gemini-omni-flash` for a targeted source edit.
- From 4–30 seconds, prefer `video/seedance-2.5` for a full source edit or continuation.
- When the user wants the original left unchanged with new footage added, generate only the new continuation from a short boundary segment and merge it with the untouched original.
- Use Seedance Mini only for an explicitly cost-sensitive draft, not for exact source preservation.
- Never recommend or proactively route to an LTX or DreamActor model.

## Reference rules

- `image_url` is only the literal start frame. It selects image-to-video and makes the supplied image frame zero. `last_frame_url` is the desired end frame when the selected model exposes it.
- `image_urls`, `video_urls`, and `audio_urls` are model-specific reference arrays. If a supplied image should guide identity, style, character, product, or composition instead of becoming frame zero, use `image_urls`, even for exactly one image. Prefer at least three complementary images when supported, reusing existing assets and respecting model limits; this is a quality recommendation, not a minimum enforced by every model.
- A saved `character_id` supplies the Character image as the start frame only when no explicit `image_url` is provided. For literal-frame animation, build identity into the approved frame and omit reference arrays. For reference-guided composition, use ordered references and omit literal frames and `character_id`. Do not mix these modes unless the current model contract explicitly supports it.
- Preserve exact quoted copy, reference labels, dialogue, timecodes, colors, and approved layout or edit constraints in the prompt.
- Discover transformation support on the selected model and connected tool schema. Do not assume a generic top-level `operation` selector exists; use only currently exposed fields and model-supported `extras` controls. Never silently switch an explicitly chosen model to obtain a transformation.

## Prompt shape

Prefer one subject action and one camera idea per clip. Describe what happens over time, not a pile of adjectives. Include exact spoken words only when needed, and specify what must not change. For multi-shot continuity, first create a storyboard and clean reference frames with `creativeclaw-plan-video`.

Conduct the workflow in the user's language and preserve quoted dialogue exactly. Confirm the chosen model supports the requested spoken language before relying on native audio.
