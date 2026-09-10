---
name: creativeclaw
description: "Route mixed, ambiguous, cross-modal, or workspace-management requests through Creative Claw. Use when the user asks to use Creative Claw generally, needs several media types, or needs assets, themes, onboarding, or existing-media editing; prefer a focused skill for one clear outcome."
---

# Creative Claw

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Use the Creative Claw MCP server as a media workspace: source durable assets, apply a brand theme, choose a model by capability, generate or process media, and save results for reuse.

## Operating rules

1. **Inspect before generating.** Use `search_assets` for likely reusable media and `get_theme` for branded work.
2. **Discover only what is missing.** Use `list_models({ category })` when choosing or checking availability; use `get_model_params` for a known selected model. Reuse current-task schemas until a model/operation changes or an error indicates they need refreshing.
3. **Use durable references.** Read `references/platform-upload.md` before importing attached or local media. Pass Creative Claw URLs to generation and processing tools.
4. **Keep exact control syntax intact.** For image/video tools exposing `agentic_prompting`, disable it for exact references, dialogue, timecodes, or layout instructions. Speech preserves supplied `text` and does not accept that field.
5. **Respect the user’s requested scope and budget.** Use `estimate_generation` only when the user asks about cost, balance, affordability, or supplies a budget constraint. An estimate does not add an approval gate: proceed with requested work that fits the constraints. Do not ask routine cost or permission questions. Clarify only material scope changes, missing essential choices, or explicit tool confirmation requirements.
6. **Treat queued work as unfinished.** The inline viewer may monitor a generation for the user. Call `check_job` when another tool needs the completed URL, or when no viewer is monitoring the job. Never claim completion from a job ID alone.
7. **Organize outputs.** Give assets meaningful metadata when the tool supports it; otherwise use `update_asset` after completion. Use stable tags across a project.
8. **Do not invent tools or parameters.** If a tool is absent on the current client, follow `references/platform-client.md`. Use the exposed tool schema for top-level fields and `get_model_params` for model-specific settings.
9. **Capture actionable feedback.** Use `submit_feedback` for bugs, missing features or models, confusing flows, generation-quality problems, and explicit praise. Read `references/workflows/feedback.md` before reporting.
10. **Match the user's language.** Conduct the workflow in the user's language, preserve supplied scripts and visible copy exactly, and verify the selected model supports the requested spoken or rendered language.
11. **Use examples deliberately.** For speech voice selection, use `get_model_params` and the voiceover workflow. For other media, route requests for examples, inspiration, styles, or a close starting point to `creativeclaw-find-examples`. Do not search the catalog before every generation.
12. **Keep HTML rendering explicit.** Use `creativeclaw-render-html-image` or `creativeclaw-render-html-video` only when the user explicitly requests HTML/CSS, HyperFrames, code-driven rendering, or accepts that proposed method. Ordinary image or video requests stay with the generative skills.

## Route the request

| User wants | Primary route |
| --- | --- |
| Generate or edit one general image | `creativeclaw-generate-image` |
| Create a consistent product image set | `creativeclaw-product-photoshoot` |
| Generate, extend, reframe, or transform one video clip | `creativeclaw-generate-video` |
| Plan a script, shot list, or storyboard | `creativeclaw-plan-video` |
| Produce a complete multi-shot film | `creativeclaw-build-film` |
| Create a creator-style product ad | `creativeclaw-create-ugc-ad` |
| Generate narration, dialogue, or speech | `creativeclaw-generate-voiceover` |
| Generate sound effects, ambience, Foley, or music | `creativeclaw-generate-audio` |
| Clone a consented voice | `creativeclaw-clone-voice` |
| Browse, filter, load, or adapt curated examples | `creativeclaw-find-examples` |
| Explicitly render HTML/CSS as a PNG | `creativeclaw-render-html-image` |
| Explicitly render HTML/HyperFrames motion as video | `creativeclaw-render-html-video` |
| Add or create an intro/outro around existing video | `creativeclaw-add-video-intro-outro` |
| Create or update a reusable Character | `creativeclaw-create-character` |
| Report a bug, request, quality issue, or praise | `creativeclaw-submit-feedback` |
| Find, import, name, tag, reuse, or delete media | `references/workflows/asset-library.md` |
| Create, inspect, edit, or apply a brand theme | `references/workflows/brand-theme.md` |
| Trim, resize, caption, transcribe, clean, or combine existing media | `creativeclaw-edit-media` |
| Select highlights from long footage and create vertical Reels | `creativeclaw-create-reels` |
| Cut, reorder, and reframe chosen video moments | `creativeclaw-cut-and-reframe-video` |
| Learn what Creative Claw can do | `references/workflows/onboard.md` |

Use an explicit outcome over a generic modality. If the user names a model, keep the outcome skill in control and use the matching model specialist for prompt and reference details. Use this root skill for requests that span outcomes or do not have one clear owner. Read the matching workflow before calling a mutating or paid tool.

## Default model policy

- **Images:** default to `image/nano-banana-2` for most generation and editing. It is the primary cost-efficient recommendation because it offers the best overall balance of quality, speed, and cost. Use `image/gpt-image-2.5-flare` for fast OpenAI image work, and escalate to `image/nano-banana-pro`, `image/gpt-image-2.5-sunburst`, or `image/seedream-5-pro` when their specialty materially improves the requested result. Do not proactively surface lower-tier or internal-route variants.
- **Video:** default to `video/gemini-omni-flash`. Recommend `video/seedance-2.5` for premium long or reference-rich work, `video/seedance-2.0-mini` as Seedance Mini for inexpensive drafts, `video/minimax-h3-max` for fast cinematic native-audio work, or `video/minimax-h3-max-turbo` for the faster lightweight H3 Max route.
- **Speech:** prefer `speech/elevenlabs-v2` for steady professional narration and existing clones in supported languages; prefer `speech/elevenlabs-v3` for expressive acting, audio tags and broader language coverage. For a reusable custom voice, use the separate consent-gated `creativeclaw-clone-voice` workflow, which is powered by ElevenLabs Instant Voice Cloning.
- **Audio:** use `sfx/elevenlabs-sound-v2` for sound effects, Foley, ambience, and loops. Use `music/elevenlabs-music-v1` for score, music beds, stings, jingles, and songs. Keep non-speech audio in `generate_audio` rather than passing these model IDs to `generate_speech`.

Verify missing capabilities with runtime discovery, then reuse the selected schema for unchanged operations within the task.

For detailed image prompting, use `creativeclaw-nano-banana-2`, `creativeclaw-nano-banana-pro`, `creativeclaw-gpt-image-2`, or `creativeclaw-seedream-5-pro` when that model is selected. For detailed video and speech prompting, use `creativeclaw-gemini-omni`, `creativeclaw-seedance-2-5`, `creativeclaw-minimax-h3-max`, `creativeclaw-elevenlabs-v2`, `creativeclaw-elevenlabs-v3`, `creativeclaw-minimax-speech`, `creativeclaw-xai-tts`, or `creativeclaw-chatterbox`. Model specialists support a workflow; they do not replace its outcome and approval rules.

## Shared production pattern

1. Clarify the deliverable, audience, duration or dimensions, and required references.
2. Search the asset library and import only what is missing. When the user wants inspiration or a starting point, search curated examples and load only the selected example.
3. Fetch the selected theme for branded work.
4. Inspect available models and the chosen model's parameters.
5. State consequential settings briefly; honor existing authorization and user-requested review stages without asking again.
6. Generate or process the media.
7. Resolve any queued job needed by later steps.
8. Inspect the result, revise deliberately, and preserve approved anchors.
9. Name, tag, and describe the final assets.

## References

- `references/tool-catalog.md` — current tool routing by purpose.
- `references/async-jobs.md` — queued-job handling.
- `references/platform-upload.md` — attachment, local-file, picker, and URL ingestion.
- `references/platform-client.md` — client capability and connection rules.
- `references/platform-dimensions.md` — common image and video sizes.

## ElevenLabs model routing

Use `creativeclaw-elevenlabs-v2` with `speech/elevenlabs-v2` for steady corporate narration, explainers, e-learning and existing clone auditions in supported languages. Use `creativeclaw-elevenlabs-v3` for expressive audio tags, acting, and broader language support. V2 does not support v3 square-bracket tags or `language_code`; v3 does not support SSML breaks. Use `creativeclaw-generate-voiceover` for general speech requests, then the selected specialist.
