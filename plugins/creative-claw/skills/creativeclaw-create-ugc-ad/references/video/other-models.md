# Additional video models

Use this guide for an explicitly selected model outside the primary guides. Always fetch get_model_params for that exact model; the notes below describe the local integration, not every upstream capability. Read [reference production](reference-production.md) and [Review handling](review.md). Do not infer capability from a similar model name or transplant its reference tokens.

| Model | Input and prompting guidance |
| --- | --- |
| video/veo-3.1, video/veo-3.1-fast | Text, literal first frame or supported first/last frames. Describe visible action and native dialogue/ambience separately. Check duration/resolution combinations and generate_audio in the live schema. Do not invent multimodal reference arrays. |
| video/grok-imagine-1.5 | Literal first frame or image references, not both. Reference images use zero-based <IMAGE_0>, <IMAGE_1> tokens. Current route accepts up to seven images, not video/audio reference arrays. State identity and composition roles separately. |
| video/flux-3 | Images are ordered or timed keyframes, not generic identity references. extras.keyframes entries contain image_url and optional at_s; either timestamp every entry or omit all timestamps. Do not mix extras.keyframes with separate frame/reference fields. One video_urls source selects extension. Describe motion between compatible anchors. |
| video/sora-2-pro | Text or literal first-frame generation. Check duration and resolution. Provider character_ids are not interchangeable with Creative Claw character_id; never invent or substitute identifiers. Describe short chronological action and explicit audio. |
| video/kling-v3-pro, video/kling-3.0-omni | Use current extras.elements structure and @Element1 tokens for Characters/objects, not generic reference arrays. Inspect multi_prompt structure and its relationship to prompt before making a multi-shot request. Native speech is currently Chinese/English; other languages may translate into English. Do not promise exact other-language dialogue. |
| video/minimax-h3 | This is not H3 Max. Read its current schema and Usage for provider-normalized image/video/audio citations, resolution and reference limits. Separate literal frames from references. Assign each reference a role; do not borrow Max's pricing or resolution values. |
| video/hailuo-02-pro | Text or supported first/last-frame animation. Describe subject motion, camera and physical continuity. Do not assume native audio or arbitrary reference arrays. |
| video/hailuo-2.3-fast | Requires an opening image. Describe what moves after that image; do not promise text-only or end-frame support. |
| video/happyhorse-1.0 | Literal first frame or ordered image references, not both. Current reference syntax is character1 through character9, matching array order. Check spoken-language support and do not treat visual references as voice cloning. |
| video/heygen-avatar-4 | Talking photo: a clear face in image_url. Model-specific audio_url overrides prompt/voice; otherwise select a HeyGen voice from its own catalog. Do not pass an ElevenLabs voice ID as a HeyGen voice name. Fetch exact field placement and use consented finished speech, not a private cloning source. |
| video/heygen-agent | Prompt-led presenter workflow with model-specific config. Read current config structure, voice/avatar options and output behavior before submission; do not apply Avatar 4 fields by analogy. |

## Explicit-request-only routes

Do not proactively recommend or route to LTX or DreamActor. If explicitly requested and currently available:
- video/ltx-2.3-fast: inspect extras.operation for retake, extend, reframe or audio_to_video. Do not invent a top-level operation selector. Validate the driving source, timing and operation-specific media combination.
- video/dreamactor-v2: motion transfer uses a Character image and one driving video for body motion, facial expression and lip movement. It is not a generic reference-based text-to-video model. Inspect the current driving-video mapping and limits.

For a newly available or explicitly requested legacy model not listed here, use the live model schema and Usage. Do not substitute a recommended model silently or revive hidden models in discovery recommendations.
