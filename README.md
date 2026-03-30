# Creative Claw

**Generate on-brand media, inside Claude.**

Creative Claw is an MCP plugin that brings a full AI media studio into Claude Code and Claude Desktop. Generate images, videos, speech, 3D models — all from natural language, all through one account. No API keys. No platform switching. Just describe what you need.

> [creativeclaw.co](https://creativeclaw.co) | [Join the Beta](https://creativeclaw.co)

---

## What You Get

### MCP Server (auto-connected)

One connection to Creative Claw's MCP server gives you 18+ tools for media generation, editing, and asset management:

| Category | Tools |
|---|---|
| **Image** | `generate_image`, `edit_image`, `generate_image_variants`, `load_image` |
| **Video** | `generate_video`, `check_video_job`, `remove_video_background` |
| **Speech** | `generate_speech` |
| **3D** | `generate_3d_model`, `check_3d_model_job` |
| **Models** | `list_models`, `get_model_params` |
| **Assets** | `search_assets`, `update_asset`, `upload_asset`, `delete_asset`, `confirm_upload`, `get_upload_url` |
| **Branding** | `get_theme`, `list_themes`, `update_theme`, `delete_theme` |

Access 1,000+ production-ready AI models — FLUX, Gemini, Veo, Sora, Kling, Hailuo, Recraft, ElevenLabs, and more — through a single unified account with usage-based pricing.

### Skills (Creative Workflows)

Skills are prompt-based workflows that teach Claude *how* to use the tools effectively — model selection, prompt engineering, multi-step production pipelines.

| Skill | What It Does |
|---|---|
| **image-generation** | Helps you pick the right model, craft effective prompts, and generate or edit images. Covers 6 recommended models with detailed reference guides. |
| **video-generation** | Guides you through model selection, reference image generation, camera direction, and multi-segment video production. Covers 5 recommended models with detailed reference guides. |

Each skill includes per-model reference files with prompting best practices, parameter tables, example prompts, and comparison guidance.

---

## Supported Models

### Image Generation

| Model | ID | Highlights |
|---|---|---|
| GPT Image 1.5 | `fal-ai/gpt-image-1.5` | Production-quality, strong prompt adherence, fine detail |
| Gemini 3 Pro | `fal-ai/nano-banana-pro` | Complex reasoning, semantic understanding, text in images |
| Gemini 3.1 Flash | `fal-ai/nano-banana-2` | Fast, high-fidelity, excellent text rendering, multilingual |
| FLUX.2 Pro | `fal-ai/flux-2-pro` | Zero-config professional quality, HEX color precision |
| Recraft V3 | `fal-ai/recraft/v3/text-to-image` | #1 on benchmarks, design and illustration |
| FLUX Schnell | `fal-ai/flux/schnell` | Fastest (~0.5s), cheapest, great for drafts |

### Image Editing

| Model | ID | Highlights |
|---|---|---|
| GPT Image 1.5 | `fal-ai/gpt-image-1.5/edit` | Strong prompt adherence, identity preservation |
| Gemini 3 Pro | `fal-ai/nano-banana-pro/edit` | Semantic edit instructions, 14 reference images |
| FLUX Kontext Max | `fal-ai/flux-pro/kontext/max` | Typography, consistency, precise edits |
| Gemini 3.1 Flash | `fal-ai/nano-banana-2/edit` | Fast, no masking required |

### Video Generation

| Model | ID | Audio | Image Input |
|---|---|---|---|
| Veo 3.1 | `fal-ai/veo3.1` | Native dialogue + SFX | Yes (`/image-to-video`) |
| Veo 3.1 Fast | `fal-ai/veo3.1/fast` | Native dialogue + SFX | Yes (`/fast/image-to-video`) |
| Sora 2 Pro | `fal-ai/sora-2/text-to-video/pro` | Native audio | Yes (`/image-to-video/pro`) |
| Kling v3 Pro | `fal-ai/kling-video/v3/pro/text-to-video` | Native audio + lip-sync | Yes (`/image-to-video`) |
| Hailuo-02 Pro | `fal-ai/minimax/hailuo-02/pro/text-to-video` | Yes | Yes (`/image-to-video`) |
| Hailuo 2.3 Fast | `fal-ai/minimax/hailuo-2.3-fast/standard/image-to-video` | No | Yes (I2V only) |

These are our top picks. Use `list_models` to browse 100+ more across all categories.

---

## Install

### Claude Code

```bash
claude plugin install creative-claw
```

Or install from source:

```bash
git clone https://github.com/CreativeClawCo/creative-claw-marketplace.git
cd creative-claw-marketplace
claude plugin install .
```

### Claude Desktop

Add to your MCP config (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "creative-claw": {
      "type": "http",
      "url": "https://app.creativeclaw.co/mcp"
    }
  }
}
```

No API keys needed — auth is handled via Clerk OAuth on first connection.

---

## Quick Start

Just talk to Claude naturally:

```
"Generate a product photo of my headphones on a marble surface, golden hour lighting"
  -> image-generation skill picks the best model, crafts the prompt, generates

"Make a 15-second cinematic video of coffee being poured in slow motion"
  -> video-generation skill recommends Hailuo-02 Pro for physics, generates reference image, then video

"Edit this image — change the background to a beach sunset, keep the person unchanged"
  -> routes to an edit model, preserves identity, swaps background

"I need a TikTok-style product video for this shoe" [attach image]
  -> generates reference frames, picks an I2V model, produces the clip
```

---

## Architecture

```
You -> Claude + Skills (model selection, prompt engineering, creative direction)
              |
         MCP Tools (generate_image, generate_video, edit_image, ...)
              |
       Creative Claw Server (fal.ai + R2 storage + Clerk auth)
              |
       Permanent media URLs (never expire)
```

**No API keys.** No CLI wrappers. No expiring URLs. Just skills + MCP.

---

## Project Structure

```
.claude-plugin/
  plugin.json            # Claude Code plugin manifest
openclaw.plugin.json     # OpenClaw plugin manifest
skills/
  image-generation/
    skill.md             # Image generation workflow + model guide
    references/
      gpt-image-1.5.md   # Detailed prompting guide
      nano-banana-pro.md  # Gemini 3 Pro guide
      nano-banana-2.md    # Gemini 3.1 Flash guide
      flux-2-pro.md       # FLUX.2 Pro guide
      recraft-v3.md       # Recraft V3 guide
      flux-schnell.md     # FLUX Schnell guide
  video-generation/
    skill.md             # Video generation workflow + model guide
    references/
      veo-3.1.md          # Google Veo 3.1 guide
      sora-2-pro.md       # OpenAI Sora 2 Pro guide
      kling-v3-pro.md     # Kling v3 Pro guide
      hailuo-02-pro.md    # MiniMax Hailuo-02 Pro guide
      hailuo-2.3-fast.md  # MiniMax Hailuo 2.3 Fast guide
```

---

## Pricing

Usage-based — pay only for what you generate. No subscriptions, no commitments. Check [creativeclaw.co](https://creativeclaw.co) for current rates.

---

## Compatibility

- **Claude Code** — via `.claude-plugin/plugin.json`
- **Claude Desktop** — via MCP server config
- **OpenClaw** — via `openclaw.plugin.json`

All use the same skills and connect to the same MCP server.

---

## License

Apache-2.0

---

Built by [Creative Claw Co.](https://creativeclaw.co)
