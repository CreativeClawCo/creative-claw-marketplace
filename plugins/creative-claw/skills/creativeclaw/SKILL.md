---
name: creativeclaw
description: "Route mixed, ambiguous, cross-modal, or workspace-management requests through Creative Claw. Use when the user asks to use Creative Claw generally, needs several media types, or asks about account balance and past charges, saved assets, brand themes, the curated examples catalog, or onboarding; prefer a focused skill for one clear outcome."
---

# Creative Claw

Creative Claw makes and edits images, video, speech, music and sound effects. The production steps live on the Creative Claw server as workflows, so they stay current in every app.

## Making something

1. Call `find_workflows` with the user's goal (`outcome_goal`), the kind of result (`outcome_media`) and its languages (`output_languages`). It lists every workflow, the likely fits first.
2. Read the one that fits with `get_workflow` and follow it, step by step. Read `get_model_params` for each model before you first use it.
3. On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw`, the workflow and the guides you followed, as `get_workflow` names them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

A request for several kinds of media follows one workflow per part. Each focused skill opens one workflow directly:

| Skill | Workflow |
|---|---|
| `creativeclaw-ad-variations` | `ad-variations` |
| `creativeclaw-adapt-ad` | `adapt-ad` |
| `creativeclaw-brand-kit` | `brand-kit` |
| `creativeclaw-budget-projects` | `budget-projects` |
| `creativeclaw-build-film` | `film` |
| `creativeclaw-captions` | `captions` |
| `creativeclaw-clone-voice` | `voice-clone` |
| `creativeclaw-create-3d-model` | `3d-model` |
| `creativeclaw-create-avatar` | `character` |
| `creativeclaw-create-character` | `character` |
| `creativeclaw-create-reels` | `highlight-clips` |
| `creativeclaw-create-ugc-ad` | `ugc-ad` |
| `creativeclaw-depth-graphics` | `depth-graphics` |
| `creativeclaw-dub-video` | `dub-video` |
| `creativeclaw-edit-media` | `edit-video` |
| `creativeclaw-faceless-video` | `faceless-video` |
| `creativeclaw-generate-image` | `image` |
| `creativeclaw-generate-music` | `music` |
| `creativeclaw-generate-sound-effects` | `sound-effects` |
| `creativeclaw-generate-video` | `video-clip` |
| `creativeclaw-generate-voiceover` | `voiceover` |
| `creativeclaw-motion-transfer` | `motion-transfer` |
| `creativeclaw-music-video` | `music-video` |
| `creativeclaw-photo-effects` | `photo-effects` |
| `creativeclaw-plan-video` | `film` |
| `creativeclaw-product-photoshoot` | `product-photoshoot` |
| `creativeclaw-product-video` | `product-video` |
| `creativeclaw-render-html` | `motion-graphics` |
| `creativeclaw-restyle-video` | `restyle-video` |
| `creativeclaw-setup` | `getting-started` |
| `creativeclaw-static-ads` | `static-ads` |
| `creativeclaw-swap-characters` | `video-swap` |
| `creativeclaw-talking-head-effects` | `talking-head-effects` |
| `creativeclaw-talking-head-reel` | `talking-head-reel` |
| `creativeclaw-thumbnail` | `thumbnail` |

## Account and workspace

- Balance, plan and past charges: `get_credits_balance` and `manage_account`.
- Saved media: `search_assets`. Saved Characters: `list_characters`.
- Brand themes: `list_themes` and `get_theme`; setting one up is the `brand-kit` workflow.
- Examples to start from: `search_examples`.
- A first run, or "what can you do": the `getting-started` workflow.
- Feedback for the Creative Claw team: `creativeclaw-submit-feedback`.

If `find_workflows` or `get_workflow` is missing while other Creative Claw tools are there, the app still has an older tool list: work directly with the tools, reading `get_model_params` for each model.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
