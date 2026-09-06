---
name: creativeclaw
description: "Route mixed, ambiguous, cross-modal, or workspace-management requests through Creative Claw. Use when the user asks to use Creative Claw generally, needs several media types, or needs assets, themes, onboarding, or existing-media editing; prefer a focused skill for one clear outcome."
---

# Creative Claw

Use the Creative Claw MCP server as a media workspace: source durable assets, apply a brand theme, choose a model by capability, generate or process media, and save results for reuse.

## Operating rules

1. **Inspect before generating.** Use `search_assets` for likely reusable media and `get_theme` for branded work.
2. **Discover models at runtime.** Call `list_models` for the modality, choose by capability, then call `get_model_params` before using model-specific fields. The reference tables are recommendations, not a substitute for runtime schemas.
3. **Use durable references.** Read `references/platform-upload.md` before importing attached or local media. Pass Creative Claw URLs to generation and processing tools.
4. **Keep exact control syntax intact.** Set `agentic_prompting: false` for complete prompts containing reference tokens, exact dialogue, timecodes, or strict layout/shot instructions. Leave it enabled for short, loose requests that benefit from rewriting.
5. **Respect cost and approval boundaries.** Explain the selected model and material settings before an expensive batch, long clip, or multi-shot production. Use exposed credit tools when available.
6. **Treat queued work as unfinished.** The inline viewer may monitor a generation for the user. Call `check_job` when another tool needs the completed URL, or when no viewer is monitoring the job. Never claim completion from a job ID alone.
7. **Organize outputs.** Give assets meaningful metadata when the tool supports it; otherwise use `update_asset` after completion. Use stable tags across a project.
8. **Do not invent tools or parameters.** If a tool is absent on the current client, follow `references/platform-client.md`. If a field is not in `get_model_params`, do not send it.
9. **Capture actionable feedback.** Use `submit_feedback` for bugs, missing features or models, confusing flows, generation-quality problems, and explicit praise. Read `references/workflows/feedback.md` before reporting.
10. **Match the user's language.** Conduct the workflow in the user's language, preserve supplied scripts and visible copy exactly, and verify the selected model supports the requested spoken or rendered language.

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
| Clone a consented voice | `creativeclaw-clone-voice` |
| Create or update a reusable Character | `creativeclaw-create-character` |
| Report a bug, request, quality issue, or praise | `creativeclaw-submit-feedback` |
| Find, import, name, tag, reuse, or delete media | `references/workflows/asset-library.md` |
| Create, inspect, edit, or apply a brand theme | `references/workflows/brand-theme.md` |
| Edit existing footage or process audio | `references/workflows/edit-video.md` or `references/workflows/audio.md` |
| Learn what Creative Claw can do | `references/workflows/onboard.md` |

Use an explicit outcome over a generic modality. If the user names a model, keep the outcome skill in control and use the matching model specialist for prompt and reference details. Use this root skill for requests that span outcomes or do not have one clear owner. Read the matching workflow before calling a mutating or paid tool.

## Default model policy

- **Images:** default to `image/nano-banana-2` for most generation and editing. It is the primary cost-efficient recommendation because it offers the best overall balance of quality, speed, and cost. Escalate to `image/nano-banana-pro`, `image/gpt-image-2`, or `image/seedream-5-pro` only when their specialty materially improves the requested result. Do not proactively surface lower-tier or internal-route variants.
- **Video:** default to `video/gemini-omni-flash`. Recommend `video/seedance-2.5` for premium long or reference-rich work, `video/seedance-2.0-mini` as Seedance Mini for inexpensive drafts, `video/minimax-h3-max` for fast cinematic native-audio work, or `video/minimax-h3-max-turbo` for the faster lightweight H3 Max route.
- **Speech:** default to and strongly prefer `speech/elevenlabs-v3` for narration, dialogue, character lines, multilingual voiceovers, and expressive delivery. For a reusable custom voice, use the separate consent-gated `creativeclaw-clone-voice` workflow, which is powered by ElevenLabs Instant Voice Cloning.

Model catalogs change. Verify every recommendation with `list_models` and every nonstandard parameter with `get_model_params` immediately before use.

For detailed image prompting, use `creativeclaw-nano-banana-2`, `creativeclaw-nano-banana-pro`, `creativeclaw-gpt-image-2`, or `creativeclaw-seedream-5-pro` when that model is selected. For detailed video and speech prompting, use `creativeclaw-gemini-omni`, `creativeclaw-seedance-2-5`, `creativeclaw-minimax-h3-max`, or `creativeclaw-elevenlabs-v3`. Model specialists support a workflow; they do not replace its outcome and approval rules.

## Shared production pattern

1. Clarify the deliverable, audience, duration or dimensions, and required references.
2. Search the asset library and import only what is missing.
3. Fetch the selected theme for branded work.
4. Inspect available models and the chosen model's parameters.
5. State the model and consequential settings; obtain confirmation for costly batches or long generations.
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
