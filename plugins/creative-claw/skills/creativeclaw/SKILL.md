---
name: creativeclaw
description: Create and manage AI images, videos, audio, brand themes, reusable assets, Characters, and multi-shot Films with Creative Claw. Use for media generation, editing, and production workflows.
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

## Route the request

| User wants                                                 | Read first                                    |
| ---------------------------------------------------------- | --------------------------------------------- |
| Find, import, name, tag, reuse, or delete media            | `references/workflows/asset-library.md`       |
| Create, inspect, edit, or apply a brand theme              | `references/workflows/brand-theme.md`         |
| Generate or edit an image                                  | `references/workflows/image-gen.md`           |
| Generate, extend, transform, or assemble video             | `references/workflows/video-gen.md`           |
| Plan shots before generating video                         | `references/workflows/storyboard-to-video.md` |
| Generate speech, clone a voice, clean audio, or transcribe | `references/workflows/audio.md`               |
| Create a reusable Character or multi-shot Film             | `references/workflows/characters-and-film.md` |
| Edit existing footage                                      | `references/workflows/edit-video.md`          |
| Learn what Creative Claw can do                            | `references/workflows/onboard.md`             |

Read the matching workflow before calling a mutating or paid tool.

## Default model policy

- **Images:** start with `image/nano-banana-2`. Use Pro, Lite, Seedream, GPT Image, Grok, FLUX, or Recraft only when their specialty matches the request.
- **Video:** start with `video/gemini-omni-flash`. Choose another model for longer duration, higher resolution, richer references, first/last frames, dialogue, multi-shot structure, or a transformation operation.
- **Speech:** start with `speech/elevenlabs-v3`. Choose Dia for two-speaker dialogue, Chatterbox for sample-based cloning, MiniMax for voice/language breadth, xAI for expressive or telephony output, Orpheus for emotive tags, or Kokoro for cheap drafts.

Model catalogs change. Verify every recommendation with `list_models` and every nonstandard parameter with `get_model_params` immediately before use.

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
