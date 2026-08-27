# Creative Claw

**Generate on-brand media inside Grok Bot, Hermes, OpenClaw, Cursor, Claude, and Codex.**

Creative Claw is an MCP plugin that brings a full AI media studio into Grok Bot, Hermes Agent, OpenClaw, Cursor, Claude Code, Claude Desktop, and Codex. Generate on-brand images, videos, speech, and HTML-rendered branded graphics — all from natural language, all through one account. Save your brand once and every future visual stays on-brand automatically. No API keys. No platform switching. Just describe what you need.

> [creativeclaw.co](https://creativeclaw.co) | [Join the Beta](https://creativeclaw.co)

---

## What You Get

### MCP Server (auto-connected)

One connection to Creative Claw's MCP server gives you 30+ tools for media generation, editing, layout rendering, branding, and asset management:

| Category          | Tools                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Image**         | `generate_image` (generate + edit), `compare_models`, `load_image`                                                  |
| **Video**         | `generate_video`, `check_job`                                                                                       |
| **Speech**        | `generate_speech`                                                                                                   |
| **HTML → media**  | `render_html_image`, `render_template`                                                                              |
| **Media editing** | `remove_background`, `upscale_media`, `trim_video`, `scale_video`, `add_subtitles`, `extract_frames`, `merge_media` |
| **Models**        | `list_models`, `get_model_params`                                                                                   |
| **Assets**        | `search_assets`, `update_asset`, `delete_asset`, `upload_asset`, `import_media`, `get_upload_url`, `confirm_upload` |
| **Brand themes**  | `get_theme`, `list_themes`, `update_theme`, `delete_theme`                                                          |
| **Templates**     | `create_template`, `update_template`, `list_templates`, `render_template`                                           |
| **Credits**       | `get_credits_balance`, `get_credits_link`                                                                           |

Access 1,000+ production-ready AI models — FLUX, Gemini, Veo, Sora, Kling, Seedance, Hailuo, HeyGen, Recraft, ElevenLabs, and more — through a single unified account with usage-based pricing.

### Skill (Creative Workflows)

The consolidated **creativeclaw** skill teaches an agent how to use the tools effectively: onboarding, model selection, prompt engineering, media import, brand themes, image/video/speech generation, templates, editing, characters, films, and asset management. It routes internally to focused reference files instead of assuming separate slash-command skills are installed.

---

## Supported Models

### Image Generation

| Model            | ID                                | Highlights                                                  |
| ---------------- | --------------------------------- | ----------------------------------------------------------- |
| GPT Image 1.5    | `fal-ai/gpt-image-1.5`            | Production-quality, strong prompt adherence, fine detail    |
| Gemini 3 Pro     | `fal-ai/nano-banana-pro`          | Complex reasoning, semantic understanding, text in images   |
| Gemini 3.1 Flash | `fal-ai/nano-banana-2`            | Fast, high-fidelity, excellent text rendering, multilingual |
| FLUX.2 Pro       | `fal-ai/flux-2-pro`               | Zero-config professional quality, HEX color precision       |
| Recraft V3       | `fal-ai/recraft/v3/text-to-image` | #1 on benchmarks, design and illustration                   |
| FLUX Schnell     | `fal-ai/flux/schnell`             | Fastest (~0.5s), cheapest, great for drafts                 |

### Image Editing

| Model            | ID                            | Highlights                                      |
| ---------------- | ----------------------------- | ----------------------------------------------- |
| GPT Image 1.5    | `fal-ai/gpt-image-1.5/edit`   | Strong prompt adherence, identity preservation  |
| Gemini 3 Pro     | `fal-ai/nano-banana-pro/edit` | Semantic edit instructions, 14 reference images |
| FLUX Kontext Max | `fal-ai/flux-pro/kontext/max` | Typography, consistency, precise edits          |
| Gemini 3.1 Flash | `fal-ai/nano-banana-2/edit`   | Fast, no masking required                       |

### Video Generation

| Model             | ID                                                       | Audio                   | Image Input                  |
| ----------------- | -------------------------------------------------------- | ----------------------- | ---------------------------- |
| Veo 3.1           | `fal-ai/veo3.1`                                          | Native dialogue + SFX   | Yes (`/image-to-video`)      |
| Veo 3.1 Fast      | `fal-ai/veo3.1/fast`                                     | Native dialogue + SFX   | Yes (`/fast/image-to-video`) |
| Sora 2 Pro        | `fal-ai/sora-2/text-to-video/pro`                        | Native audio            | Yes (`/image-to-video/pro`)  |
| Kling v3 Pro      | `fal-ai/kling-video/v3/pro/text-to-video`                | Native audio + lip-sync | Yes (`/image-to-video`)      |
| Seedance 2.0      | `fal-ai/bytedance/seedance-2.0/text-to-video`            | Native audio            | Yes (`/image-to-video`)      |
| Seedance 2.0 Fast | `fal-ai/bytedance/seedance-2.0/fast/text-to-video`       | Native audio            | Yes (`/image-to-video`)      |
| Hailuo-02 Pro     | `fal-ai/minimax/hailuo-02/pro/text-to-video`             | Yes                     | Yes (`/image-to-video`)      |
| Hailuo 2.3 Fast   | `fal-ai/minimax/hailuo-2.3-fast/standard/image-to-video` | No                      | Yes (I2V only)               |

### Talking Avatars

| Model              | ID                                     | Highlights                                                    |
| ------------------ | -------------------------------------- | ------------------------------------------------------------- |
| HeyGen Avatar 4    | `fal-ai/heygen/avatar4/image-to-video` | Photo → talking avatar with lip-sync, 400+ poses, 100+ voices |
| HeyGen Video Agent | `fal-ai/heygen/v2/video-agent`         | Budget talking avatar from text (~$2/min)                     |

These are our top picks. Use `list_models` to browse 100+ more across all categories.

---

## Install

### Grok Bot and Cursor

Creative Claw is packaged for the Cursor Marketplace used by Grok Bot's plugin system. After marketplace approval, open **Settings → Plugins → Marketplace** in Grok Bot or **Customize → Plugins** in Cursor, search for **Creative Claw**, install it, and complete browser authentication on the first tool call.

For local Cursor testing before publication, symlink the plugin directory and reload Cursor:

```bash
ln -s /path/to/creative-claw-marketplace/plugins/creative-claw ~/.cursor/plugins/local/creative-claw
```

### Hermes Agent

Hermes supports the Creative Claw hosted MCP directly. Run:

```bash
hermes mcp add creative-claw --url https://app.creativeclaw.co/mcp --auth oauth
hermes mcp login creative-claw
```

Or use the one-click [Add to Hermes](hermes://mcp/install?name=creative-claw&config=eyJ1cmwiOiJodHRwczovL2FwcC5jcmVhdGl2ZWNsYXcuY28vbWNwIiwiYXV0aCI6Im9hdXRoIn0) link on a machine with Hermes installed. The portable `plugin.json` and `mcp.json` in the plugin root also make the package compatible with Agent Plugins v1 clients. Until Hermes supports OAuth login for plugin-supplied MCP entries, the two `hermes mcp` commands above are the reliable installation path.

### OpenClaw

Creative Claw includes a native OpenClaw manifest, the consolidated skill, and ClawHub package metadata. Once the package is published to ClawHub, install it with:

```bash
openclaw plugins install clawhub:@creativeclaw/plugin
openclaw plugins enable creative-claw
openclaw mcp login creative-claw
openclaw gateway restart
```

The first login opens Creative Claw's OAuth flow; no API key needs to be copied into a config file.

### Agent skills (`npx skills`)

The canonical cross-client skill remains in the standard repository layout, so skill-directory users can install it directly:

```bash
npx skills add CreativeClawCo/creative-claw-marketplace
```

The OpenAI Store installs the shared ChatGPT/Codex plugin and skill bundle separately; Store users do not need this command.

### Claude Code

```bash
# 1. Add the marketplace
claude plugin marketplace add CreativeClawCo/creative-claw-marketplace

# 2. Install the plugin
claude plugin install creative-claw@creative-claw-marketplace

# 3. Authenticate — on first use, the MCP server will prompt you to sign in via Clerk OAuth
```

That's it. The plugin connects to Creative Claw's MCP server and installs the consolidated `creativeclaw` workflow skill.

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
  -> creativeclaw routes to its image workflow, picks the model, and generates

"Make a 15-second cinematic video of coffee being poured in slow motion"
  -> creativeclaw routes to its video workflow, generates a reference image, then the video

"Edit this image — change the background to a beach sunset, keep the person unchanged"
  -> creativeclaw routes to an edit model, preserves identity, swaps background

"Make me a LinkedIn quote card with our brand colors"
  -> creativeclaw writes the HTML, pulls the saved theme, and renders via headless Chromium

"Set up our brand — here's our website"
  -> creativeclaw extracts colors/fonts/logos, uploads the assets, and saves a reusable theme

"I need a TikTok-style product video for this shoe" [attach image]
  -> creativeclaw imports the attachment, generates reference frames, picks an I2V model, and produces the clip
```

---

## Architecture

```
You -> Claude + Skills (model selection, prompt engineering, creative direction, brand-aware rendering)
              |
         MCP Tools (generate_image, generate_video, render_html_image, update_theme, ...)
              |
       Creative Claw Server (fal.ai + headless Chromium + R2 storage + Clerk auth)
              |
       Permanent media URLs (never expire)
```

**No API keys.** No CLI wrappers. No expiring URLs. Just skills + MCP.

---

## Project Structure

This repo is a **marketplace** — it contains one or more installable plugins.

```
.claude-plugin/
  marketplace.json         # Marketplace manifest (required for Claude Code marketplace sync)
  plugin.json              # Root plugin metadata
.cursor-plugin/
  marketplace.json         # Cursor/Grok Bot marketplace manifest
plugins/
  creative-claw/
    .cursor-plugin/
      plugin.json          # Cursor/Grok Bot plugin manifest
    .claude-plugin/
      plugin.json          # Plugin manifest (MCP server config)
    .mcp.json              # Grok Build/Codex MCP server config
    plugin.json            # Portable Agent Plugins v1 manifest (Hermes-compatible)
    mcp.json               # Portable Agent Plugins v1 MCP config
    openclaw.plugin.json   # Native OpenClaw manifest
    skills/
      creativeclaw/
        SKILL.md           # canonical cross-client skill; discoverable by npx skills
        references/        # shared workflows and cross-client upload routing
skill-variants/
  chatgpt/
    platform-upload.md     # OpenAI Store routing for ChatGPT attachments and Codex local files
scripts/
  build-skill-zips.sh      # builds both upload-ready skill archives
creativeclaw-skill.zip             # cross-client archive
creativeclaw-chatgpt-skill.zip     # OpenAI Store archive for ChatGPT and Codex
```

### Maintaining the two distributions

Edit the canonical skill once under `plugins/creative-claw/skills/creativeclaw`. Put only ChatGPT-specific routing differences in `skill-variants/chatgpt/platform-upload.md`, then run:

```bash
./scripts/build-skill-zips.sh
```

The OpenAI Store archive contains only `SKILL.md`, `references/`, and `assets/`, matching the Store upload shape for both ChatGPT and Codex. The general archive and repository skill retain the cross-client instructions used by `npx skills`, Claude Code, and other skill-directory clients.

---

## Pricing

Usage-based — pay only for what you generate. No subscriptions, no commitments. Check [creativeclaw.co](https://creativeclaw.co) for current rates.

---

## Compatibility

- **Grok Bot** — via the Cursor marketplace plugin and hosted MCP server
- **Cursor** — via `.cursor-plugin/plugin.json`
- **Claude Code** — via `.claude-plugin/plugin.json`
- **Claude Desktop** — via MCP server config
- **Codex and other skill-directory clients** — via the canonical `creativeclaw` skill
- **OpenAI Store (ChatGPT + Codex)** — via `creativeclaw-chatgpt-skill.zip`
- **Hermes Agent** — via OAuth MCP setup and portable Agent Plugins v1 manifests
- **OpenClaw** — via `openclaw.plugin.json` and ClawHub-ready package metadata

All use the same skills and connect to the same MCP server.

---

## License

Apache-2.0

---

Built by [Creative Claw Co.](https://creativeclaw.co)
