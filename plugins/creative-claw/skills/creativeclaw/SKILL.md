---
name: creativeclaw
description: Creative Claw AI media studio. Use to generate or edit AI images (FLUX, Nano Banana, GPT Image, Recraft), AI videos (Veo, Sora, Kling, Hailuo, Seedance, HeyGen avatars), and speech/voiceover; render branded HTML graphics to PNG (social cards, OG images, quote cards, banners); render code-driven branded videos to MP4 in the cloud via HyperFrames; build and render reusable templates with parameters; create, extract, update, or apply brand themes (colors, fonts, logos, photography style); edit existing video footage (transcribe, cut on word boundaries, color grade, burn subtitles, 9:16 reframe, merge); onboard new users; and manage the asset library. Routes to deeper workflow guides and recommends companion skills (/hyperframes, /video-use) where appropriate. Requires the Creative Claw MCP server. (v0.5.1)
---

# Creative Claw

The unified AI media studio. Generates images, videos, speech, and branded graphics through one MCP server with 40 tools and one shared asset library. This skill is the **single source of truth** for every workflow — the MCP server provides the tools, this skill provides the knowledge.

## Prerequisite

The **Creative Claw MCP server** must be connected. If `generate_image`, `render_html_image`, `get_theme` etc. aren't available, install:

```
/plugin install creative-claw@creative-claw-marketplace
```

Or connect the MCP directly: `https://app.creativeclaw.co/mcp`

## Principles

1. **Theme-first.** If the user has a brand, every generation pulls from it. Call `get_theme` before any branded work. No theme + branded request → run the brand-theme workflow before generating.
2. **The right engine for the job.** Layout-driven content (text, logos, repeatable cards) → HTML render or template. Photoreal content (people, scenes, products) → AI model with a reference image. Code-driven motion (kinetic type, branded animation) → HyperFrames. Existing footage (cut, grade, subtitle) → edit-video workflow.
3. **Reference images keep AI on-brand.** Never run `generate_image` or `generate_video` for branded work without an `image_url` anchor — without it, models drift off-brand regardless of prompt quality.
4. **Async means async.** `generate_video` and `render_html_video` return job IDs. Always poll `check_job`. Never claim a result without `status === "completed"`.
5. **Assets are forever.** Every result lives at a permanent R2 URL. Tag and name everything (`update_asset`) so future-you can find it (`search_assets`).

## Hard rules (non-negotiable)

1. **Always `get_theme` first** for any branded generation. Skip only if the user has explicitly said "ignore my brand."
2. **Always generate a reference image before any AI video.** Even text-to-video. The starting frame controls quality and on-brandness.
3. **`render_html_image`: never raw external URLs in `<img src>` or `background-image: url()`.** Always use `inline_images` — substituted as data URIs through the SSRF-guarded cache. CORS, redirects, and expired CDN URLs are the #1 cause of broken renders.
4. **Async tools require `check_job`.** `generate_video`, `render_html_video`, `generate_3d_model`, `transcribe` all return `{ jobId, status: "queued" }`. Poll until completion. See `references/async-jobs.md`.
5. **HyperFrames knowledge lives in the `/hyperframes` skill.** For any code-driven video composition, install and invoke `/hyperframes` (and `/hyperframes-cli` for local commands). Creative Claw provides the cloud renderer (`render_html_video`) and reusable templates (`create_template` / `render_template`) — the composition rules are owned by the HyperFrames skill.
6. **Editing existing footage lives in the `/video-use` skill.** Transcribe / cut on word boundaries / color grade / burn subtitles / 9:16 reframe — install and invoke `/video-use`. Use individual MCP tools (`transcribe`, `trim_video`, `add_subtitles`, etc.) only for one-shot ops.
7. **Tag and name assets at generation time.** Pass `name` and `tags` to every `generate_*` / `render_*` call. Use `update_asset` after if you forgot.
8. **Don't quote pricing from memory.** Use `get_credits_balance` for the user's balance. Hand them `get_credits_link` for top-up — you cannot complete checkout for them.
9. **Never use the elicitation form / visualize widget when a question requires an image upload.** Ask in plain chat instead so the user can attach the image directly to the conversation. The elicitation form is fine for everything else (text inputs, choices, parameter pickers) — this rule applies only when image upload is involved.
10. **Pass thorough prompts verbatim — set `agentic_prompting: false`.** `generate_image` / `generate_video` rewrite prompts server-side by default. When your prompt already contains literal control tokens (`@Image1` / `@Audio1` mention tags, exact timecodes, quoted dialogue, per-panel layout), disable the rewriter — paraphrasing `@Image1` into "the reference image" silently breaks the model's syntax. Keep it on only for short, loose, single-line creative asks. Send it verbatim when you've done the directing; let the server direct when you haven't.

## Routing

| User wants…                                                              | Read first                                                                 |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Orientation / "what can this do?"                                        | `references/workflows/onboard.md`                                          |
| Generate or edit an AI image                                             | `references/workflows/image-gen.md`                                        |
| Generate or edit an AI video                                             | `references/workflows/video-gen.md`                                        |
| **Storyboard a video, then generate it** (board → iterate → Seedance)    | `references/workflows/storyboard-to-video.md`                              |
| Voiceover / TTS / voice cloning                                          | `references/workflows/video-gen.md` (audio section)                        |
| Branded HTML → PNG (one-off banner / OG / card)                          | `references/workflows/html-image.md` + `references/platform-dimensions.md` |
| **Create a new template** (HTML or AI-image, with refs + iteration loop) | `references/workflows/template-creation.md`                                |
| Reusable banner template (deeper HTML template mechanics)                | `references/workflows/banner-from-template.md`                             |
| Code-driven branded video (HyperFrames)                                  | `references/workflows/code-video-hyperframes.md` → install `/hyperframes`  |
| Brand theme (create / extract / update / apply)                          | `references/workflows/brand-theme.md`                                      |
| Edit existing footage (cut / grade / subtitle / reframe)                 | `references/workflows/edit-video.md` → install `/video-use`                |

When the user's request matches a row, **read that file before doing anything**. The workflow files contain the model selection, prompting strategies, parameter sets, and anti-patterns that aren't reproduced here.

## References index

### Workflows (`references/workflows/`)

- **onboard.md** — first-time tour. The mission, four playful first-generations, the brand-theme unlock, recipes per goal.
- **image-gen.md** — AI image generation. Model selection picker (Nano Banana, FLUX, GPT Image, Recraft), editing vs. generating, branded vs. unbranded. The MCP server tailors prompts per model server-side.
- **video-gen.md** — AI video generation. Model selection picker (Veo, Sora, Kling, Hailuo, Seedance, HeyGen), reference-image-first rule, async polling, multi-segment planning, talking-avatar guidance, speech models list.
- **storyboard-to-video.md** — storyboard-first pipeline. Plan beats → generate a multi-panel review board (`nano-banana-pro`) → iterate by editing → extract CLEAN keyframes → hand off to Seedance 2.0 (`@Image`/`@Audio` refs, first/last frame, optional voice reference). Includes the "review board vs. generation frames" rule and when to disable the prompt rewriter.
- **html-image.md** — `render_html_image` deep dive. Full CSS surface, `inline_images`, fonts, dimensions, theme integration, when to use vs. AI gen.
- **template-creation.md** — Create a new template (both flavors: HTML render-templates AND AI-image prompt templates). Reference-image collection (existing files, URLs, or `import_media` drop-in), analysis, minimal dynamic params, render → load → iterate loop, prompt recipes for AI-generated background images inside HTML templates, "render one now" handoff.
- **banner-from-template.md** — Deeper HTML template mechanics: full HTML example, `create_template` parameter shape, batch rendering, the four templates worth building first.
- **code-video-hyperframes.md** — how Creative Claw's `render_html_video` and templates fit into a HyperFrames pipeline. Composition rules themselves live in the `/hyperframes` skill — install it before authoring.
- **brand-theme.md** — full theme lifecycle. Website extraction, local folders, URL lists, generating from scratch, updating, applying in generation.
- **edit-video.md** — pointer to the `/video-use` skill plus a list of the MCP tools available for one-shot edits (`transcribe`, `trim_video`, `add_subtitles`, etc.).

### Model selection

Per-modality picker tables live inside the workflow files (`image-gen.md`, `video-gen.md`). The MCP server enhances user prompts server-side using per-model knowledge — write clear creative direction and the server tailors it for the chosen model. Use `list_models` and `get_model_params` at runtime to discover model IDs and extras.

### Cross-cutting (`references/`)

- **tool-catalog.md** — MCP tools grouped (generation, templates, themes, assets, editing, models, jobs, credits).
- **async-jobs.md** — `check_job` polling pattern, parallel jobs, failure modes, timeouts.
- **platform-dimensions.md** — IG, LI, X, YT, TikTok, OG sizes + safe zones. Machine-readable copy at `assets/platform-dimensions.json`.

### Assets (`assets/`)

- **platform-dimensions.json** — JSON copy of dimensions table.

## Tool catalog quick reference

Full details and grouping in `references/tool-catalog.md`. Common ones:

**Generate** — `generate_image`, `generate_video`, `generate_speech`, `render_html_image`, `render_html_video`, `render_template`, `compare_models`
**Edit** — `remove_background`, `upscale_media`, `trim_video`, `scale_video`, `add_subtitles`, `extract_frames`, `merge_media`, `transcribe`
**Brand** — `get_theme`, `list_themes`, `update_theme`
**Templates** — `create_template`, `render_template`, `list_templates`, `update_template`
**Assets** — `search_assets`, `update_asset`, `upload_asset`, `import_media`, `load_image`
**Jobs** — `check_job` (poll all async generations)
**Credits** — `get_credits_balance`, `get_credits_link`
