---
name: creativeclaw
description: Creative Claw AI media studio — the unified creative pipeline for AI-generated and code-driven media. Use when the user wants to (1) generate or edit an AI image (FLUX, Nano Banana, GPT Image, Recraft), (2) generate or edit an AI video clip (Veo, Sora, Kling, Hailuo, Seedance, HeyGen avatars), (3) generate speech, voiceover, or voice-cloned audio, (4) render a branded HTML graphic to PNG (social cards, OG images, quote cards, stat cards, announcements, banners), (5) render a branded code-driven video to MP4 via HyperFrames + GSAP (kinetic typography, animated logos, data viz, branded title cards, content series), (6) build, save, list, or render reusable templates with parameters (repeatable LinkedIn / IG / OG / story posts), (7) create, extract from a website, update, or apply a brand theme (colors, fonts, logos, shapes, photography style), (8) edit existing video footage end-to-end — transcribe, cut on word boundaries, color grade, burn subtitles, reframe vertical, merge clips, smart 9:16 reframe, (9) onboard a new user to the studio, or (10) manage assets (search, tag, upload, import). Routes to deep references in this skill and calls the Creative Claw MCP server's tools (generate_image, generate_video, generate_speech, render_html_image, render_html_video, render_template, get_theme, transcribe, check_job, search_assets, plus ~30 more). Requires the Creative Claw MCP server to be connected. (v0.4.3)
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
5. **HyperFrames: no `repeat: -1`, no async timeline construction.** See `references/hyperframes-primer.md` for the full rule list.
6. **Edit-video: subtitles last in the filter chain.** Overlays applied first, subtitles last — otherwise overlays hide captions.
7. **Edit-video: cache transcripts per source.** Same source file → same JSON. Never re-transcribe.
8. **Edit-video: cut only on word boundaries** from the transcript. Pad cut edges 30–200 ms.
9. **Tag and name assets at generation time.** Pass `name` and `tags` to every `generate_*` / `render_*` call. Use `update_asset` after if you forgot.
10. **Don't quote pricing from memory.** Use `get_credits_balance` for the user's balance. Hand them `get_credits_link` for top-up — you cannot complete checkout for them.
11. **Never use the elicitation form / visualize widget when a question requires an image upload.** Ask in plain chat instead so the user can attach the image directly to the conversation. The elicitation form is fine for everything else (text inputs, choices, parameter pickers) — this rule applies only when image upload is involved.

## Routing

| User wants… | Read first |
|---|---|
| Orientation / "what can this do?" | `references/workflows/onboard.md` |
| Generate or edit an AI image | `references/workflows/image-gen.md` + `references/models/image/<model>.md` |
| Generate or edit an AI video | `references/workflows/video-gen.md` + `references/models/video/<model>.md` |
| Voiceover / TTS / voice cloning | `references/workflows/video-gen.md` (audio section) + `references/models/speech/<model>.md` |
| Branded HTML → PNG (one-off banner / OG / card) | `references/workflows/html-image.md` + `references/platform-dimensions.md` |
| **Create a new template** (HTML or AI-image, with refs + iteration loop) | `references/workflows/template-creation.md` |
| Reusable banner template (deeper HTML template mechanics) | `references/workflows/banner-from-template.md` |
| Code-driven branded video (HyperFrames) | `references/workflows/code-video-hyperframes.md` + `references/hyperframes-primer.md` |
| Brand theme (create / extract / update / apply) | `references/workflows/brand-theme.md` |
| Edit existing footage (cut / grade / subtitle / reframe) | `references/workflows/edit-video.md` (uses `helpers/`) |

When the user's request matches a row, **read that file before doing anything**. The workflow files contain the model selection, prompting strategies, parameter sets, and anti-patterns that aren't reproduced here.

## References index

### Workflows (`references/workflows/`)
- **onboard.md** — first-time tour. The mission, four playful first-generations, the brand-theme unlock, recipes per goal.
- **image-gen.md** — AI image generation. Model selection (Nano Banana, FLUX, GPT Image, Recraft), prompting per model, editing vs. generating, branded vs. unbranded.
- **video-gen.md** — AI video generation. Model selection (Veo, Sora, Kling, Hailuo, Seedance, HeyGen), reference-image-first rule, async polling, multi-segment planning.
- **html-image.md** — `render_html_image` deep dive. Full CSS surface, `inline_images`, fonts, dimensions, theme integration, when to use vs. AI gen.
- **template-creation.md** — Create a new template (both flavors: HTML render-templates AND AI-image prompt templates). Reference-image collection (existing files, URLs, or `import_media` drop-in), analysis, minimal dynamic params, render → load → iterate loop, prompt recipes for AI-generated background images inside HTML templates, "render one now" handoff.
- **banner-from-template.md** — Deeper HTML template mechanics: full HTML example, `create_template` parameter shape, batch rendering, the four templates worth building first.
- **code-video-hyperframes.md** — `render_html_video` workflow. Asset gen → composition → render → iterate. Common patterns (branded series, AI clip + chrome overlay, data viz, talking avatar, product demo).
- **brand-theme.md** — full theme lifecycle. Website extraction, local folders, URL lists, generating from scratch, updating, applying in generation.
- **edit-video.md** — edit existing footage end-to-end. Transcribe via Creative Claw, cut on word boundaries, color grade, burn subtitles, smart 9:16 reframe. Uses Python helpers in `helpers/` and the EDL artifact in `assets/edl-schema.json`.

### Model guides (`references/models/`)
Per-model prompting guides — read **before** crafting any `generate_image` / `generate_video` / `generate_speech` prompt:
- **image/** — flux-2-pro, flux-schnell, gpt-image-2, nano-banana-2, nano-banana-pro, recraft-v3
- **video/** — hailuo-02-pro, hailuo-2.3-fast, heygen-avatar-4, kling-v3-pro, seedance-2.0, sora-2-pro, veo-3.1
- **speech/** — xai-tts

### Cross-cutting (`references/`)
- **hyperframes-primer.md** — minimum HyperFrames knowledge. Capture contract, hard rules, layout-before-animation, scene transitions, fonts.
- **tool-catalog.md** — all 40 MCP tools, grouped (generation, templates, themes, assets, editing, models, jobs, credits).
- **async-jobs.md** — `check_job` polling pattern, parallel jobs, failure modes, timeouts.
- **platform-dimensions.md** — IG, LI, X, YT, TikTok, OG sizes + safe zones. Machine-readable copy at `assets/platform-dimensions.json`.

### Assets (`assets/`)
- **platform-dimensions.json** — JSON copy of dimensions table.
- **edl-schema.json** — JSON schema for the Edit Decision List (edit-video workflow).

### Helpers (`helpers/`)
Python scripts for the edit-video workflow:
- **prepare_audio.py** — extract mono 16 kHz WAV from a video for the Creative Claw `transcribe` tool. Cached against the transcript file.
- **pack_transcripts.py** — Scribe JSONs → `takes_packed.md` (phrase-level reading view).
- **timeline_view.py** — filmstrip + waveform PNG for a time range. Use at decision points only.
- **render.py** — full render pipeline (per-segment extract → concat → overlays → subtitles). Reads `edl.json`.
- **grade.py** — color grade via ffmpeg filter chain. Auto mode by default; presets and raw filters available.
- **smart_vertical.py** — face-tracked 16:9 → 1080×1920 reframe.

## Tool catalog quick reference

Full details and grouping in `references/tool-catalog.md`. Common ones:

**Generate** — `generate_image`, `generate_video`, `generate_speech`, `render_html_image`, `render_html_video`, `render_template`, `compare_models`
**Edit** — `remove_background`, `upscale_media`, `trim_video`, `scale_video`, `add_subtitles`, `extract_frames`, `merge_media`, `transcribe`
**Brand** — `get_theme`, `list_themes`, `update_theme`
**Templates** — `create_template`, `render_template`, `list_templates`, `update_template`
**Assets** — `search_assets`, `update_asset`, `upload_asset`, `import_media`, `load_image`
**Jobs** — `check_job` (poll all async generations)
**Credits** — `get_credits_balance`, `get_credits_link`
