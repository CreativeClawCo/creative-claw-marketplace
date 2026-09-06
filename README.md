# Creative Claw

**Generate on-brand media inside ChatGPT, Codex, Claude, Cursor, Grok Bot, Hermes, and OpenClaw.**

Creative Claw is an MCP plugin that brings a full AI media studio into Grok Bot, Hermes Agent, OpenClaw, Cursor, Claude Code, Claude Desktop, ChatGPT, and Codex. Generate images, video, and expressive speech; reuse Characters and brand assets; and produce product campaigns, UGC ads, and multi-shot Films through one account. No API keys and no platform switching.

> [creativeclaw.co](https://creativeclaw.co) | [Join the Beta](https://creativeclaw.co) | [![Smithery](https://smithery.ai/badge/itay/creativeclaw)](https://smithery.ai/servers/itay/creativeclaw)

---

## What You Get

### MCP Server

One connection to Creative Claw's MCP server gives the skills live model discovery plus media generation, editing, brand, asset, Character, Film, and feedback tools:

| Category          | Tools                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Image**         | `generate_image` (generate, edit, or repeat across models for comparison), `load_image`                             |
| **Video**         | `generate_video`, `check_job`                                                                                       |
| **Speech**        | `generate_speech`                                                                                                   |
| **Media editing** | `remove_background`, `upscale_media`, `trim_video`, `scale_video`, `add_subtitles`, `extract_frames`, `merge_media` |
| **Models**        | `list_models`, `get_model_params`                                                                                   |
| **Assets**        | `search_assets`, `update_asset`, `delete_asset`, `upload_asset`, `import_media`, `get_upload_url`, `confirm_upload` |
| **Brand themes**  | `get_theme`, `list_themes`, `update_theme`, `delete_theme`                                                          |
| **Characters**    | `manage_character`, `list_characters`, `clone_voice`, `delete_character`                                            |
| **Films**         | `create_film_project`, `update_film_project`, `get_film_project`, `list_film_projects`, `assemble_film`             |
| **Feedback**      | `submit_feedback`                                                                                                   |
| **Credits**       | `get_credits_balance`, `get_credits_link`                                                                           |

Access 1,000+ production-ready AI models — FLUX, Gemini, Veo, Sora, Kling, Seedance, Hailuo, HeyGen, Recraft, ElevenLabs, and more — through a single unified account with usage-based pricing.

### Skills (Creative Workflows)

The **creativeclaw** root skill routes mixed or unclear requests. Focused outcome skills own general image, video, and voice work plus Characters, planning, Films, product photoshoots, UGC ads, and feedback. Model specialists add exact prompting and reference guidance only after an outcome chooses Nano Banana 2, Nano Banana Pro, GPT Image 2, Seedream 5 Pro, Gemini Omni, Seedance 2.5, H3 Max, or ElevenLabs v3.

Every OpenAI skill declares the ChatGPT MCP dependency at `https://app.creativeclaw.co/mcp/chatgpt`, matching the endpoint configured in the plugin draft. A focused skill can therefore activate directly without losing access to Creative Claw's tools.

---

## Supported Models

### Recommended image models

Default to **Gemini 3.1 Flash (Nano Banana 2)** for most image generation and editing. It is the most cost-efficient recommendation overall, balancing quality, speed, and cost; use a specialist model only when its specific strength matters.

| Model | Creative Claw ID | Best use |
| --- | --- | --- |
| Nano Banana 2 | `image/nano-banana-2` | Default and cost-efficient choice for most generation and editing |
| Nano Banana Pro | `image/nano-banana-pro` | Complex professional layouts, typography, and demanding composites |
| GPT Image 2 | `image/gpt-image-2` | Instruction-heavy generation, transparency, and precise edits |
| Seedream 5 Pro | `image/seedream-5-pro` | Premium product, fashion, and commercial imagery |

### Recommended video models

| Model | Creative Claw ID | Best use |
| --- | --- | --- |
| Gemini Omni | `video/gemini-omni-flash` | Default general video, native audio, references, and source-video work |
| Seedance 2.5 | `video/seedance-2.5` | Premium, longer, reference-rich cinematic work |
| Seedance Mini | Discover with `list_models` | Economical drafts and iteration |
| MiniMax H3 Max | `video/minimax-h3-max` | Fast cinematic native-audio clips and multimodal references |
| H3 Max Fast | `video/minimax-h3-max-turbo` | Faster, lighter H3 Max iteration |

### Recommended speech

Use `speech/elevenlabs-v3` for narration, dialogue, emotional delivery, and multilingual speech. Creative Claw also supports consent-gated ElevenLabs Instant Voice Cloning as a separate Character workflow.

Use `list_models` and `get_model_params` at runtime rather than assuming a fixed catalog or reference limit.

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

Talk to the host naturally:

```
"Generate a product photo of my headphones on a marble surface, golden hour lighting"
  -> creativeclaw routes to its image workflow, picks the model, and generates

"Make a 15-second cinematic video of coffee being poured in slow motion"
  -> creativeclaw routes to its video workflow, generates a reference image, then the video

"Edit this image — change the background to a beach sunset, keep the person unchanged"
  -> creativeclaw routes to an edit model, preserves identity, swaps background

"Set up our brand — here's our website"
  -> creativeclaw extracts colors/fonts/logos, uploads the assets, and saves a reusable theme

"I need a TikTok-style product video for this shoe" [attach image]
  -> the UGC workflow plans the ad, creates reference frames, selects video and voice models, and assembles a first cut

"Create a reusable presenter from this portrait and clone my voice; I confirm it is mine"
  -> the Character and consent-gated ElevenLabs voice-cloning workflows create and audition the reusable identity

"The video tool ignored my end frame—please report it"
  -> the feedback workflow submits one actionable bug report with the attempted task and tool
```

---

## Architecture

```
You -> Host + outcome skill (goal, approvals, creative direction)
              |
      Model specialist (prompt and reference details when selected)
              |
         MCP Tools (generation, assets, Characters, Films, feedback)
              |
       Creative Claw Server (model providers + R2 storage + Clerk auth)
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
        SKILL.md           # thin router for mixed and workspace requests
        references/        # shared asset, theme, upload, and editing workflows
      creativeclaw-*/      # outcome and recommended-model specialist skills
skill-variants/
  chatgpt/
    platform-upload.md     # OpenAI Store routing for ChatGPT attachments and Codex local files
scripts/
  build-skill-zips.sh      # builds both upload-ready skill archives
creativeclaw-skill.zip             # cross-client archive
creativeclaw-chatgpt-skill.zip     # OpenAI Store root-skill archive
creativeclaw-*-chatgpt-skill.zip   # focused OpenAI skill archives
evals/skill-routing-scenarios.md   # activation and workflow regression suite
```

### Maintaining the two distributions

Edit the canonical skill once under `plugins/creative-claw/skills/creativeclaw`. Put only ChatGPT-specific routing differences in `skill-variants/chatgpt/platform-upload.md`, then run:

```bash
./scripts/build-skill-zips.sh
```

The build validates every skill's metadata and MCP dependency, checks routing coverage and the regression suite, and creates deterministic upload archives. Nothing in the build publishes or submits a plugin draft.

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
