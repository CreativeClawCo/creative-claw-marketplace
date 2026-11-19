---
name: creativeclaw
description: "Route mixed, ambiguous, cross-modal, or workspace-management requests through Creative Claw. Use when the user asks to use Creative Claw generally, needs several media types, or asks about account balance and past charges, saved assets, brand themes, the curated examples catalog, or onboarding; prefer a focused skill for one clear outcome."
---

# Creative Claw

For each Creative Claw tool call that exposes it, pass the optional `skills_used` array with `creativeclaw`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.

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
5. **Respect the user’s requested scope and budget.** Use `estimate_generation` only when the user asks about cost, balance, affordability, or supplies a budget constraint. An estimate is information for the user: share it, then continue with the requested work when it fits what they said. Ask about material scope changes, missing essential choices, and whenever a tool result asks for confirmation.
6. **Treat queued work as unfinished.** The inline viewer may monitor a generation for the user. Call `check_job` when another tool needs the completed URL, or when no viewer is monitoring the job. Never claim completion from a job ID alone.
7. **Organize outputs.** Give assets meaningful metadata when the tool supports it; otherwise use `update_asset` after completion. Use stable tags across a project.
8. **Do not invent tools or parameters.** If a tool is absent on the current client, follow `references/platform-client.md`. Use the exposed tool schema for top-level fields and `get_model_params` for model-specific settings.
9. **Capture actionable feedback.** Use `submit_feedback` for bugs, missing features or models, confusing flows, generation-quality problems and praise that the user expresses or you observe. Say briefly that you reported it, and do not report when the user asks you not to. Keep reports specific and do not add refund requests. Read `references/workflows/feedback.md` before reporting.
10. **Match the user's language.** Conduct the workflow in the user's language, preserve supplied scripts and visible copy exactly, and verify the selected model supports the requested spoken or rendered language.
11. **Use the examples catalog only on request.** When the user asks to browse examples or prompt ideas, follow [examples guidance](references/workflows/examples.md). Do not search the catalog before every generation, and leave variations and user-supplied style references to the generation skill. For speech voices, use `get_model_params` and the voiceover workflow.
12. **Keep HTML and motion-graphics video explicit.** Use `creativeclaw-render-html` when the user explicitly asks for HTML/CSS, HyperFrames, or code-driven rendering, supplies HTML, accepts that method, or explicitly asks for a motion-graphics video: motion graphics, kinetic typography, animated text or titles, an animated infographic or explainer, or UI-style animation. A request for a video, an ad, or an explainer without those words stays with the video skills; when it is unclear whether the user wants filmed-looking footage or designed motion, ask one question. It also finds HTML-video examples. An exact text watermark for `overlay_images` may use `render_html_image` with a transparent background. Ordinary image or video requests stay with the generative skills.

## Route the request

| User wants | Primary route |
| --- | --- |
| Understand balance, past generation costs, or charges and refunds | `manage_account`, following [account guidance](references/workflows/account.md) |
| Track or report spend per client, job or production; budget projects | `creativeclaw-budget-projects` |
| Generate or edit one general image | `creativeclaw-generate-image` |
| Create a consistent product image set | `creativeclaw-product-photoshoot` |
| Make a character copy a recorded performance or retain movement across wardrobe variants | `creativeclaw-generate-video`, starting with [motion transfer](references/video/motion-transfer.md) to resolve the driving video and appearance image |
| Swap, replace or recast people in existing footage: face swaps, "put me in this video", several people at once | `creativeclaw-swap-characters` (`swap_video_characters`) |
| Generate, extend, reframe, or transform one video clip | `creativeclaw-generate-video` |
| Plan a script, shot list, or storyboard | `creativeclaw-plan-video` |
| Produce a complete multi-shot film | `creativeclaw-build-film` |
| Create a creator-style product ad | `creativeclaw-create-ugc-ad` |
| Make a set of ad variations from one product shot or existing ad (new hooks, voiceovers, voices or captions) | `creativeclaw-ad-variations` |
| Generate narration, dialogue, or speech | `creativeclaw-generate-voiceover` |
| Design a new synthetic voice from a description | `creativeclaw-generate-voiceover` (`design_voice`) |
| Generate a score, music bed, sting, jingle, theme, or song | `creativeclaw-generate-music` |
| Generate sound effects, ambience, Foley, loops, impacts, or UI cues | `creativeclaw-generate-sound-effects` |
| Clone a consented voice from a recording | `creativeclaw-clone-voice` |
| Browse or adapt curated examples when asked | [examples guidance](references/workflows/examples.md) |
| Explicitly render HTML/CSS as a PNG, or HTML/HyperFrames motion as video | `creativeclaw-render-html` |
| Motion graphics, kinetic typography, animated titles, or an animated explainer the user explicitly asks for | `creativeclaw-render-html` (the video agent) |
| Add or create an intro/outro around existing video | `creativeclaw-edit-media` |
| A downloadable mesh, textured GLB or rigged game character | `creativeclaw-create-3d-model` |
| Recast a person or replace a product inside the existing shot | `creativeclaw-swap-characters` with the corresponding person or object tool |
| Copy a dance into a new setting, or a camera move onto another product | `creativeclaw-generate-video`, using [motion transfer](references/video/motion-transfer.md) |
| Deliver a finished clip at a higher frame rate or in slow motion | `creativeclaw-edit-media` with `increase_frame_rate` |
| Extract song stems or replace the singing or backing | `creativeclaw-generate-music` with the existing song |
| Create a personal avatar from photos or a reusable identity sheet | `creativeclaw-create-avatar` |
| Save or reuse a favorite face, voice-only narrator or named Character | `creativeclaw-create-character` |
| Report product or quality feedback | `creativeclaw-submit-feedback` |
| Find, import, name, tag, reuse, or delete media | `references/workflows/asset-library.md` |
| Find reference images on the web (a place, object, style or look) | `search_images`; to see the results, `load_image` with its `search_id`, then `check_job`; import picks with `upload_asset` before using them |
| Create, inspect, edit, or apply a brand theme | `references/workflows/brand-theme.md` |
| Trim, resize, caption, transcribe, clean, or combine existing media | `creativeclaw-edit-media` |
| Lip-sync an existing video to a voice | `creativeclaw-edit-media` (`lip_sync_video`) |
| Burn a transparent logo or copyright image onto a finished video | `creativeclaw-edit-media`, using `overlay_images`; read [assembly guidance](references/media-assembly.md) |
| Make a video from existing timed images, optional video clips, and optional audio | `creativeclaw-edit-media`, using `stitch_clips` (never for new AI footage, which is `generate_video`); read [assembly guidance](references/media-assembly.md) |
| Select highlights from long footage and create vertical Reels | `creativeclaw-create-reels` |
| Cut, reorder, and reframe chosen video moments | `creativeclaw-edit-media` (`cut_and_reframe_video`) |
| Learn what Creative Claw can do | `references/workflows/onboard.md` |
| Run first-time setup, get started, or take a guided tour | `creativeclaw-setup` |

Use an explicit outcome over a generic modality. If the user names a model, keep the outcome skill in control and use the matching packaged model reference for prompt and reference details. Use this root skill for requests that span outcomes or do not have one clear owner. Read the matching workflow before calling a mutating or paid tool.

## Default model policy

- **Images:** default to `image/nano-banana-2` (Nano Banana 2) for most generation and editing, including targeted corrections that should preserve the existing scene. For the best quality or a result the user dislikes, recommend GPT Image 2.6 Sunburst for a focused revision with the original references. Use `image/gpt-image-2.6-flare` for fast OpenAI image work, and use `image/gpt-image-2.6-sunburst` for complex professional assets, typography, controlled edits, and layout corrections that move or scale existing text and logos. Use `image/seedream-5.5` for product and marketing imagery, transparent PNGs, and splitting an image into editable layers. Nano Banana Pro remains available when explicitly selected. After a model moderation refusal, Seedream may also be offered as the tool's suggested alternative, with user confirmation before another paid generation; it applies its own safety checks and may still reject the request. For a transparent background, use GPT Image 2.6 (Flare or Sunburst) with its transparent background option, or `remove_background`. Use other image models only when the user asks for them.
- **Video:** default to Gemini Omni 1.2 Flash (`video/gemini-omni-flash`) for scenes without audio input. For a scene with a recording or a saved Character voice, use Seedance reference mode with the prepared shot image and the actual line in `audio_urls`. Omni accepts no voice input. Recommend `video/seedance-2.5` as the premium cinematic model for native-audio, high-end, reference-rich, first/last-frame or long (up to 30 s) work; for a cheaper preview, a 480p request is a usable draft, and `extras.draft_job_id` can finalize an eligible native take at 1080p or requested 4K within 7 days according to the job's finishing options (720p starts a new take). Use `video/minimax-h3-max` for fast cinematic native-audio work, or `video/flux-3-max` for text, first/last frames or timed image keyframes (5 to 20 seconds at 720p/1080p). FLUX accepts no video/audio references; keep H3 Max or Seedance 2.5 for those. Both H3 Max and FLUX 3 Max are available before purchase and eligible for the free first video. Recommend `video/seedance-2.0-mini` (Seedance Mini) for cheap, fast drafts with native sound, including drafts that follow voice or audio input references; it is available before purchase and eligible for the free first video. Mini is the cheapest option; `video/minimax-h3-max-turbo` (H3 Max Fast) costs more and is only for when the H3 look is wanted. For existing footage, route through `references/workflows/edit-video.md` instead of applying this generation ranking; `video/minimax-h3-max-extend` is the default for extending a clip. Never recommend or proactively route to an LTX or DreamActor model. Use Wan only when explicitly requested; recommend Seedance 2.5 instead. For document or webpage briefs, read the content and prepare a Seedance prompt with supported media references; do not pass Wan's `file_url` or `web_url` fields to Seedance.
- **Speech:** default to `speech/elevenlabs-v4` for all non-cloned speech, including stock voices, expressive delivery, and dialogue. Speak a clone with its provider's model: a Cartesia clone with `speech/cartesia-sonic`; an ElevenLabs clone with `speech/elevenlabs-v2` for a steady read or `speech/elevenlabs-v4` for expressive delivery or dialogue. New clones use Cartesia unless the user chooses ElevenLabs. Designed voices speak with `speech/elevenlabs-v4` (ElevenLabs designs) or `speech/gemini-3.8-flash-tts` (Google designs). To change who is speaking in an existing recording, use `speech/cartesia-voice-changer`. ElevenLabs v3 is legacy; use it only when the user asks for it. Never clone without consent or silently switch providers. Honor explicitly requested supported models. Load `creativeclaw-generate-voiceover` for the selected model's reference and current settings. If the user says a word sounds wrong (the stress, an acronym, a homograph or a loanword), fix only that word as [pronunciation](references/voices/pronunciation.md) describes and regenerate before suggesting feedback.
- **Audio:** use `generate_sound_effect` with `sfx/elevenlabs-sound-v2` for sound effects, Foley, ambience, and loops. Use `generate_music` for scores, music beds, stings, jingles, and songs; `creativeclaw-generate-music` picks the music model. Do not pass non-speech model IDs to `generate_speech`.

Verify missing capabilities with runtime discovery, then reuse the selected schema for unchanged operations within the task.

For image prompting, load [the selected image model reference](references/images/index.md). Video outcome skills package their selected video model references. For speech, load creativeclaw-generate-voiceover and only its selected model guide. There are no standalone model skills; the outcome workflow owns authorization, execution and delivery.

## Shared production pattern

1. Clarify the deliverable, audience, duration or dimensions, and required references.
2. Search the asset library when saved media, project reuse, or continuity matters; skip the search for standalone generation. Import supplied references only when needed. Search curated examples only when the user asks for them, and load only the selected one.
3. Fetch the selected theme for branded work.
4. Inspect available models and the chosen model's parameters.
5. State consequential settings briefly; honor the approvals the user already gave and the review stages they asked for.
6. Generate or process the media.
7. Resolve any queued job needed by later steps.
8. Inspect the result, revise deliberately, and preserve approved anchors.
9. Name, tag, and describe the final assets.

## Default visual preparation for video

Prepare the actual opening frame of every new shot before generating motion. Use an existing ready shot frame or make one at the delivery ratio. For a recurring location, reuse or design one set image and establish where everyone stands or sits in a wide frame. Build each shot image from that set, the sheet of every visible recurring Character (create missing sheets), and the established positions. Change the camera angle while preserving eyelines, wardrobe, props and positions unless the action moves them. Send the finished shot image to video as a literal start frame or a model-supported visual reference. Follow [reference production](references/video/reference-production.md) for the exact fields, including the approved start/end-frame route. Honor an explicit text-only request or an existing-footage edit.

When the user likes a generated look or voice, offer once to save it as a named Character for future work. Check `list_characters` first. An explicit request to save the look or voice is agreement. Update the existing Character or create one when authorized with the approved image or selected voice. Reuse its ID for later shots or speech. A voice-only Character works for a narrator. If the voice card already saved the selection, reuse that record.

## References

- `references/tool-catalog.md` — current tool routing by purpose.
- `references/workflows/examples.md` — the curated examples catalog.
- `references/async-jobs.md` — queued-job handling.
- `references/platform-upload.md` — attachment, local-file, picker, and URL ingestion.
- `references/platform-client.md` — client capability and connection rules.
- `references/platform-dimensions.md` — common image and video sizes.
