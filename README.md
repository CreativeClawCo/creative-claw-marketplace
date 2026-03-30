# Creative Claw Plugin

AI media studio for Claude Code and OpenClaw. Generate images, videos, speech, 3D models, and full productions — powered by Creative Claw's MCP server.

## Install

```bash
# Claude Code
claude plugin install creative-claw

# Or clone and install locally
claude plugin install ./plugin
```

The plugin automatically connects to Creative Claw's MCP server. No API keys or configuration needed — auth is handled via Clerk OAuth.

## What You Get

### MCP Tools (auto-connected)

18 tools for media generation, editing, and asset management:

- `generate_image` / `edit_image` / `generate_image_variants`
- `generate_video` / `check_video_job`
- `generate_speech`
- `generate_3d_model` / `check_3d_model_job`
- `remove_video_background`
- `list_models` / `get_model_params`
- `search_assets` / `update_asset` / `upload_asset` / `delete_asset`

### Skills (creative workflows)

| Skill                      | What it does                                                                                              |
| -------------------------- | --------------------------------------------------------------------------------------------------------- |
| **director**               | Creative director — entry point for all media requests. Proposes style directions, routes to specialists. |
| **image-maker**            | Image generation expert. Prompt engineering, model selection, variants, editing, background removal.      |
| **video-maker**            | Video generation expert. Storyboard prompts, camera movements, multi-segment workflows.                   |
| **voice-maker**            | Speech/TTS expert. Emotion, multi-speaker dialogue, voiceover scripts, narration.                         |
| **tiktok-content-maker**   | E-commerce 15s video specialist. Product analysis, dialogue scripts, TikTok/Reels optimization.           |
| **short-film-editor**      | Multi-clip narrative films. Character bibles, continuity, beat sync, batch generation.                    |
| **scene-generate**         | Background/environment image generation. No people, pure scenes.                                          |
| **product-sheet-generate** | Multi-angle product design sheets for visual consistency.                                                 |
| **3d-maker**               | 3D model generation from text or images.                                                                  |

## Quick Start

Just ask Claude naturally:

```
"Generate a cinematic product video of my headphones"
→ Director skill activates, proposes styles, generates video

"Make me a 45-second short film about a mystery package"
→ Routes to short-film-editor, builds character bible, generates clips

"Create a TikTok ad for this product" [attach image]
→ Routes to tiktok-content-maker, writes script + generates video

"Generate speech for this narration with emotion"
→ Routes to voice-maker, handles TTS with emotion control
```

## Compatibility

- **Claude Code** — via `.claude-plugin/plugin.json`
- **OpenClaw** — via `openclaw.plugin.json`

Both use the same skills and auto-connect to the same MCP server.

## Architecture

```
User → Claude + Skills (creative direction, prompt engineering)
                  ↓
            MCP Tools (direct calls, no CLI)
                  ↓
        Creative Claw Server (fal.ai + R2 storage)
                  ↓
        Permanent media URLs (never expire)
```

No API keys. No CLI wrappers. No expiring URLs. Just skills + MCP.
