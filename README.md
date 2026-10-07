# Creative Claw

**Generate on-brand media inside ChatGPT, Codex, Claude, Cursor, Grok Bot, Hermes, and OpenClaw.**

Creative Claw is an MCP plugin that brings a full AI media studio into Grok Bot, Hermes Agent, OpenClaw, Cursor, Claude Code, Claude Desktop, ChatGPT, and Codex. Generate images, video, and expressive speech; reuse Characters and brand assets; and produce product campaigns, UGC ads, and multi-shot Films through one account. No API keys and no platform switching.

> [creativeclaw.co](https://creativeclaw.co) | [Install in ChatGPT](https://chatgpt.com/plugins/creativeclaw) | [ChatGPT guides](https://creativeclaw.co/chatgpt/) | [Pricing](https://creativeclaw.co/pricing/) | [![Smithery](https://smithery.ai/badge/itay/creativeclaw)](https://smithery.ai/servers/itay/creativeclaw)

---

## Use it in ChatGPT

ChatGPT has no built-in video generation since OpenAI discontinued Sora. Creative Claw adds it back as a plugin: install it from the [ChatGPT plugin directory](https://chatgpt.com/plugins/creativeclaw), sign in, and ask for what you need in plain language. It renders video with **Seedance 2.5, Gemini Omni, and MiniMax H3 Max**, images with **Nano Banana 2**, and voiceovers with **ElevenLabs or Cartesia**, including a clone of your own voice.

What people make with it, with real costs from our published examples:

| What | Cost | Guide |
| --- | --- | --- |
| Animate a still image into a 5-second 1080p clip | 146 credits ($1.46) | [Animate an image](https://creativeclaw.co/chatgpt/animate-an-image/) |
| 15-second vertical product ad with 3 shots, voiceover, and captions | 461 credits ($4.61) | [Product video ads](https://creativeclaw.co/chatgpt/product-video-ads/) |
| UGC-style ad with a talking presenter holding your product | 294 credits ($2.94) | [UGC video ads](https://creativeclaw.co/chatgpt/ugc-video-ads/) |
| Four-scene short film with the same character in every scene | 569 credits ($5.69) | [Multi-scene films](https://creativeclaw.co/chatgpt/multi-scene-films/) |
| On-brand Instagram posts, Story, and an 8-second Reel | 288 credits ($2.88) | [Social media content](https://creativeclaw.co/chatgpt/social-media-content/) |
| Product photo set plus a product video from one image | 288 credits ($2.88) | [Product photos](https://creativeclaw.co/chatgpt/product-photos/) |
| Clone your voice and narrate in 40+ languages | Clone is free; a 15-second voiceover is a few credits | [Clone your voice](https://creativeclaw.co/chatgpt/clone-your-voice/) |
| Weekly posts and a Reel from a ChatGPT dot | 256 credits ($2.56) a week | [ChatGPT dots](https://creativeclaw.co/chatgpt/dots/) |

Short video walkthroughs of each are on [YouTube](https://www.youtube.com/@CreativeClawCo).

---

## What You Get

### MCP Server

One connection to Creative Claw's MCP server gives the skills live model discovery plus media generation, editing, brand, asset, Character, Film, and feedback tools:

| Category          | Tools                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Image**         | `generate_image` (generate, edit, or repeat across models for comparison), `load_image`                             |
| **Video**         | `generate_video`, `check_job`                                                                                       |
| **Speech**        | `generate_speech`, `design_voice`, `clone_voice`, `transcribe`, `isolate_audio`                                     |
| **Media editing** | `remove_background`, `upscale_media`, `trim_video`, `cut_and_reframe_video`, `scale_video`, `add_subtitles`, `extract_frames`, `merge_media` |
| **Models**        | `list_models`, `get_model_params`, `search_examples`                                                                |
| **Assets**        | `search_assets`, `update_asset`, `delete_asset`, `upload_asset`, `import_media`, `get_upload_url`, `confirm_upload` |
| **Brand themes**  | `get_theme`, `list_themes`, `update_theme`                                                                          |
| **Characters**    | `manage_character`, `list_characters`                                                                               |
| **Films**         | `create_film_project`, `update_film_project`, `get_film_project`, `list_film_projects`, `assemble_film`             |
| **Feedback**      | `submit_feedback`                                                                                                   |
| **Cost and account** | `estimate_generation`, `manage_account`; `get_credits_balance` where the client exposes it                        |

Current image, video, speech, music, and sound-effect models (Nano Banana 2, GPT Image 2.5, Seedream 5 Pro, Seedance 2.5, Gemini Omni, MiniMax H3 Max, ElevenLabs, Cartesia, and more) through one account with pay-as-you-go pricing. The live catalog comes from `list_models`.

### Skills (Creative Workflows)

The **creativeclaw** root skill routes mixed or unclear requests, account questions, and the curated examples catalog. Sixteen focused outcome skills own image, video, voice, music, and sound-effect generation; Characters and avatars; planning, Films, product photoshoots, and UGC ads; editing existing media (cuts, reframing, captions, audio, intros and outros); long-video Reels; explicit HTML rendering; and feedback. Model guides are packaged as references inside the outcome skills that use them; there are no per-model skills.

Every OpenAI skill declares the ChatGPT MCP dependency at `https://app.creativeclaw.co/mcp/chatgpt`, matching the endpoint configured in the plugin draft. A focused skill can therefore activate directly without losing access to Creative Claw's tools.

---

## Supported Models

### Recommended image models

Default to **Gemini 3.1 Flash (Nano Banana 2)** for most image generation and editing. It is the most cost-efficient recommendation overall, balancing quality, speed, and cost; use a specialist model only when its specific strength matters.

| Model | Creative Claw ID | Best use |
| --- | --- | --- |
| Nano Banana 2 | `image/nano-banana-2` | Default and cost-efficient choice for most generation and editing |
| Nano Banana Pro | `image/nano-banana-pro` | Complex professional layouts, typography, and demanding composites |
| GPT Image 2.5 Flare | `image/gpt-image-2.5-flare` | Fast, high-quality everyday OpenAI image generation and editing |
| GPT Image 2.5 Sunburst | `image/gpt-image-2.5-sunburst` | Precision-focused generation, transparency, and tightly controlled edits |
| Seedream 5 Pro | `image/seedream-5-pro` | Premium product, fashion, and commercial imagery |

### Recommended video models

| Model | Creative Claw ID | Best use |
| --- | --- | --- |
| Gemini Omni | `video/gemini-omni-flash` | Default general video, native audio, references, and source-video work |
| Seedance 2.5 | `video/seedance-2.5` | Premium cinematic, longer, reference-rich work; 480p for cheaper previews |
| MiniMax H3 Max | `video/minimax-h3-max` | Fast cinematic native-audio clips and multimodal references |
| H3 Max Fast | `video/minimax-h3-max-turbo` | Cheap, fast drafts and iteration |

### Recommended speech

Use `speech/elevenlabs-v4` by default for narration, dialogue, emotional delivery, and multilingual speech. Use `speech/xai-tts` when its 28 built-in voices, exact inline/wrapping performance tags, or G.711 telephony output are the better fit. Creative Claw can also design a new synthetic voice from a description, or clone a consenting speaker's voice onto a Character (Cartesia by default, ElevenLabs on request). Change the voice in an existing recording with `speech/cartesia-voice-changer`.

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

### Glama / Directory Introspection

The `glama-mcp/` directory provides a lightweight stdio MCP wrapper for Glama.ai directory compatibility. This wrapper exposes 9 core tool descriptions for discovery (`how_to_connect`, `generate_image`, `generate_video`, `generate_speech`, `list_models`, `get_model_params`, `check_job`, `list_characters`, `get_credits_balance`) that guide users to connect to the full production MCP server at `https://app.creativeclaw.co/mcp`.

The Glama wrapper does not perform actual generation—it serves as a directory entry point. To use Creative Claw's full generation capabilities, connect to the production HTTP MCP server as described above.

**Run locally:**

```bash
cd glama-mcp && npm install && npm start
```

**Build Docker image:**

```bash
docker build -t creative-claw-glama .
docker run -i creative-claw-glama
```

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
      creativeclaw-*/      # outcome skills with packaged model references
skill-variants/
  chatgpt/
    platform-upload.md     # OpenAI Store routing for ChatGPT attachments and Codex local files
scripts/
  build-openai-plugin.mjs  # builds the OpenAI plugin ZIP into output/openai/
  build-skill-zips.sh      # builds the Claude skill download and per-skill archives for local evals
output/                    # local generated ZIPs, ignored by Git
evals/skill-routing-scenarios.md   # activation and workflow regression suite
```

### Maintaining the two distributions

Edit the canonical skill once under `plugins/creative-claw/skills/creativeclaw`. Put only ChatGPT-specific routing differences in `skill-variants/chatgpt/`, then build the OpenAI package:

```bash
node scripts/build-openai-plugin.mjs
```

That writes one plugin ZIP under the Git-ignored `output/openai/` folder, which is what the OpenAI portal takes. `./scripts/build-skill-zips.sh` still builds the Claude skill download (`creativeclaw-skill.zip`) and the per-skill archives used by local evals, under `output/chatgpt-skills/`. The marketplace source stays focused on direct installs, and generated ZIPs stay local. Nothing in the build publishes or submits a plugin draft.

---

## Pricing

Pay as you go, no subscription: **$10 buys 1,000 credits**, and new accounts get **100 free credits**. You can ask for an estimate before generating.

| Generation | Credits |
| --- | --- |
| Image, Nano Banana 2 | 16 ($0.16) |
| 5-second clip, MiniMax H3 Max Fast (768p) | 40 ($0.40) |
| 5-second clip, Gemini Omni Flash (720p or 1080p) | 130 ($1.30) |
| 5-second clip, Seedance 2.5 (720p) | 267 ($2.67) |
| 15-second multi-scene clip, MiniMax H3 Max (768p) | 240 ($2.40) |
| 10–15 second voiceover, ElevenLabs v3 | 4 ($0.04) |

Current rates: [creativeclaw.co/pricing](https://creativeclaw.co/pricing/). Model-by-model prices inside ChatGPT: [creativeclaw.co/chatgpt/pricing](https://creativeclaw.co/chatgpt/pricing/).

---

## FAQ

**Can ChatGPT make videos?**
Not on its own since Sora was discontinued. With the Creative Claw plugin, ChatGPT can generate video with Seedance 2.5, Gemini Omni, and MiniMax H3 Max. A 5-second clip starts at 40 credits ($0.40).

**How much does Creative Claw cost?**
There is no subscription. $10 buys 1,000 credits, new accounts get 100 free credits, an image costs 16 credits, and a 15-second product ad with voiceover and captions cost 461 credits ($4.61) in our example.

**Can Creative Claw clone my voice?**
Yes. Record or upload a short sample of your own voice (or one you have permission to use), and Creative Claw saves it as a reusable Character with Cartesia or ElevenLabs. Use it to narrate videos in 40+ languages.

**How is it different from Runway or HeyGen in ChatGPT?**
Creative Claw is one pay-as-you-go account for several providers' models (Seedance, Gemini Omni, MiniMax, Nano Banana, ElevenLabs, Cartesia) rather than one vendor's models, and it includes brand themes, reusable Characters, voice cloning, and multi-shot assembly. There is no monthly plan to buy first.

**Does it work with ChatGPT dots?**
Dots use the plugins you connect in their Customize → Plugins settings. If Creative Claw is listed for your account, connect it there and give your dot recurring jobs such as weekly posts and a Reel. See the [dots guide](https://creativeclaw.co/chatgpt/dots/).

**Which clients does it support?**
ChatGPT, Codex, Claude (Code, Desktop, and web), Cursor, Grok Bot, Hermes Agent, and OpenClaw, all through the same account and MCP server at `https://app.creativeclaw.co/mcp`.

---

## Compatibility

- **Grok Bot** — via the Cursor marketplace plugin and hosted MCP server
- **Cursor** — via `.cursor-plugin/plugin.json`
- **Claude Code** — via `.claude-plugin/plugin.json`
- **Claude Desktop** — via MCP server config
- **Codex and other skill-directory clients** — via the canonical `creativeclaw` skill
- **OpenAI Store (ChatGPT + Codex)** — build one plugin ZIP with `node scripts/build-openai-plugin.mjs` and upload `output/openai/creative-claw-openai-<version>.zip`
- **Hermes Agent** — via OAuth MCP setup and portable Agent Plugins v1 manifests
- **OpenClaw** — via `openclaw.plugin.json` and ClawHub-ready package metadata

All use the same skills and connect to the same MCP server.

---

## License

Apache-2.0

---

Built by [Creative Claw Co.](https://creativeclaw.co)
