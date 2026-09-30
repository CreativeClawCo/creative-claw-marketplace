---
name: creativeclaw
description: "Route mixed, ambiguous, cross-modal, or workspace-management requests through Creative Claw. Use when the user asks to use Creative Claw generally, needs several media types, or asks about account balance and past charges, saved assets, brand themes, the curated examples catalog, or onboarding; prefer a focused skill for one clear outcome."
---

# Creative Claw

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Use the Creative Claw MCP server as a media workspace: source durable assets, apply a brand theme, choose a model by capability, generate or process media, and save results for reuse.

## Account and billing questions

Use `manage_account` for the current balance and for recent generations with their recorded charges and refunds. Read [account and cost guidance](references/workflows/account.md) before interpreting charges. Use `estimate_generation` for future quotes, not the cost of a past generation. Do not submit feedback automatically for an account question.

Purchases and plans are handled on the Creative Claw website, not in chat. Do not start, price, or recommend a purchase; if asked, say so and share only an account link a tool returned.

## Operating rules

1. **Reuse assets when relevant.** Use `search_assets` when the request refers to saved media, an existing project, or identity/product continuity. Skip asset searches for standalone generation with no reuse requirement. Use `get_theme` for branded work.
2. **Discover only what is missing.** Use `list_models({ category })` when choosing or checking availability; use `get_model_params` for a known selected model. Reuse current-task schemas until a model/operation changes or an error indicates they need refreshing.
3. **Use durable references.** Read `references/platform-upload.md` before importing attached or local media. Pass Creative Claw URLs to generation and processing tools.
4. **Keep exact control syntax intact.** Preserve approved references, dialogue, timecodes, and layout instructions. Speech receives the exact performed script in `text`.
5. **Respect the user’s requested scope and budget.** Use `estimate_generation` only when the user asks about cost, balance, affordability, or supplies a budget constraint. An estimate does not add an approval gate: proceed with requested work that fits the constraints. Do not ask routine cost or permission questions. Clarify only material scope changes, missing essential choices, or explicit tool confirmation requirements.
6. **Treat queued work as unfinished.** The inline viewer may monitor a generation for the user. Call `check_job` when another tool needs the completed URL, or when no viewer is monitoring the job. Never claim completion from a job ID alone.
7. **Organize outputs.** Give assets meaningful metadata when the tool supports it; otherwise use `update_asset` after completion. Use stable tags across a project.
8. **Do not invent tools or parameters.** If a tool is absent on the current client, follow `references/platform-client.md`. Use the exposed tool schema for top-level fields and `get_model_params` for model-specific settings.
9. **Capture actionable feedback.** Use `submit_feedback` for bugs, missing features or models, confusing flows, generation-quality problems and praise only when the user asks or approves sending it. A complaint alone is not permission to contact the team. Read `references/workflows/feedback.md` before reporting.
10. **Match the user's language.** Conduct the workflow in the user's language, preserve supplied scripts and visible copy exactly, and verify the selected model supports the requested spoken or rendered language.
11. **Use the examples catalog only on request.** When the user asks to browse examples or prompt ideas, follow [examples guidance](references/workflows/examples.md). Do not search the catalog before every generation, and leave variations and user-supplied style references to the generation skill. For speech voices, use `get_model_params` and the voiceover workflow.
12. **Keep HTML rendering explicit.** Use `creativeclaw-render-html` when the user explicitly asks for HTML/CSS, HyperFrames, or code-driven rendering, supplies HTML, or accepts that method. It also finds HTML-video examples. An exact text watermark for `merge_media` `overlay_images` may use `render_html_image` with a transparent background. Ordinary image or video requests stay with the generative skills.

## Route the request

| User wants | Primary route |
| --- | --- |
| Understand balance, past generation costs, or charges and refunds | `manage_account`, following [account guidance](references/workflows/account.md) |
| Generate or edit one general image | `creativeclaw-generate-image` |
| Create a consistent product image set | `creativeclaw-product-photoshoot` |
| Generate, extend, reframe, or transform one video clip | `creativeclaw-generate-video` |
| Plan a script, shot list, or storyboard | `creativeclaw-plan-video` |
| Produce a complete multi-shot film | `creativeclaw-build-film` |
| Create a creator-style product ad | `creativeclaw-create-ugc-ad` |
| Generate narration, dialogue, or speech | `creativeclaw-generate-voiceover` |
| Design a new synthetic voice from a description | `creativeclaw-generate-voiceover` (`design_voice`) |
| Generate a score, music bed, sting, jingle, theme, or song | `creativeclaw-generate-music` |
| Generate sound effects, ambience, Foley, loops, impacts, or UI cues | `creativeclaw-generate-sound-effects` |
| Clone a consented voice from a recording | `creativeclaw-clone-voice` |
| Browse or adapt curated examples when asked | [examples guidance](references/workflows/examples.md) |
| Explicitly render HTML/CSS as a PNG, or HTML/HyperFrames motion as video | `creativeclaw-render-html` |
| Add or create an intro/outro around existing video | `creativeclaw-edit-media` |
| Create a personal avatar from photos or a reusable identity sheet | `creativeclaw-create-avatar` |
| Create or update a reusable Character | `creativeclaw-create-character` |
| Send feedback the user asked for or approved | `creativeclaw-submit-feedback` |
| Find, import, name, tag, reuse, or delete media | `references/workflows/asset-library.md` |
| Create, inspect, edit, or apply a brand theme | `references/workflows/brand-theme.md` |
| Trim, resize, caption, transcribe, clean, or combine existing media | `creativeclaw-edit-media` |
| Burn a transparent logo or copyright image onto a finished video | `creativeclaw-edit-media`, using `merge_media` with `operation:"overlay_images"`; read [assembly guidance](references/media-assembly.md) |
| Make a video from timed images, optional video clips, and optional audio | `creativeclaw-edit-media`, using `merge_media` with `operation:"compose_video"`; read [assembly guidance](references/media-assembly.md) |
| Select highlights from long footage and create vertical Reels | `creativeclaw-create-reels` |
| Cut, reorder, and reframe chosen video moments | `creativeclaw-edit-media` (`cut_and_reframe_video`) |
| Learn what Creative Claw can do | `references/workflows/onboard.md` |

Use an explicit outcome over a generic modality. If the user names a model, keep the outcome skill in control and use the matching packaged model reference for prompt and reference details. Use this root skill for requests that span outcomes or do not have one clear owner. Read the matching workflow before calling a mutating or paid tool.

## Default model policy

- **Images:** default to `image/nano-banana-2` for most generation and editing. It is the primary cost-efficient recommendation because it offers the best overall balance of quality, speed, and cost. Use `image/gpt-image-2.5-flare` for fast OpenAI image work, and escalate to `image/nano-banana-pro`, `image/gpt-image-2.5-sunburst`, or `image/seedream-5-pro` when their specialty materially improves the requested result. Do not proactively surface lower-tier or internal-route variants.
- **Video:** default to `video/gemini-omni-flash`. Recommend `video/seedance-2.5` for premium long or reference-rich work, `video/seedance-2.0-mini` as Seedance Mini for inexpensive drafts, `video/minimax-h3-max` for fast cinematic native-audio work, or `video/minimax-h3-max-turbo` for the faster lightweight H3 Max route. For existing footage, route through `references/workflows/edit-video.md` instead of applying this generation ranking. Never recommend or proactively route to an LTX or DreamActor model.
- **Speech:** default to `speech/elevenlabs-v4` for all non-cloned speech, including stock voices, expressive delivery, and dialogue. For cloned voices, recommend `speech/cartesia-sonic` or `speech/elevenlabs-v2`, respecting the saved clone provider and explicit user choice. Do not recommend v3 or v4 for clones by default. Designed voices speak with `speech/elevenlabs-v4` (ElevenLabs designs) or `speech/gemini-3.8-flash-tts` (Google designs). Never clone without consent or silently switch providers. Honor explicitly requested supported models. Load `creativeclaw-generate-voiceover` for the selected model's reference and current settings.
- **Audio:** use `generate_sound_effect` with `sfx/elevenlabs-sound-v2` for sound effects, Foley, ambience, and loops. Use `generate_music` for scores, music beds, stings, jingles, and songs; `creativeclaw-generate-music` picks the music model. Do not pass non-speech model IDs to `generate_speech`.

Verify missing capabilities with runtime discovery, then reuse the selected schema for unchanged operations within the task.

For image prompting, load [the selected image model reference](references/images/index.md). Video outcome skills package their selected video model references. For speech, load creativeclaw-generate-voiceover and only its selected model guide. There are no standalone model skills; the outcome workflow owns authorization, execution and delivery.

## Shared production pattern

1. Clarify the deliverable, audience, duration or dimensions, and required references.
2. Search the asset library when saved media, project reuse, or continuity matters; skip the search for standalone generation. Import supplied references only when needed. Search curated examples only when the user asks for them, and load only the selected one.
3. Fetch the selected theme for branded work.
4. Inspect available models and the chosen model's parameters.
5. State consequential settings briefly; honor existing authorization and user-requested review stages without asking again.
6. Generate or process the media.
7. Resolve any queued job needed by later steps.
8. Inspect the result, revise deliberately, and preserve approved anchors.
9. Name, tag, and describe the final assets.

## Default visual preparation for video

For new generative video, follow the selected video skill's reference-first workflow: one clean keyframe per shot with `generate_image` at the video's aspect ratio, built from approved identity, product, or location anchors, then pass it to the video model. A video request covers these keyframes; say so rather than asking. Skip them only when the user asks for direct text-to-video, supplies a ready shot image, or is editing footage.

## References

- `references/tool-catalog.md` — current tool routing by purpose.
- `references/workflows/examples.md` — the curated examples catalog.
- `references/async-jobs.md` — queued-job handling.
- `references/platform-upload.md` — attachment, local-file, picker, and URL ingestion.
- `references/platform-client.md` — client capability and connection rules.
- `references/platform-dimensions.md` — common image and video sizes.
