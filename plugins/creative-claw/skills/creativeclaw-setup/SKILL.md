---
name: creativeclaw-setup
description: "Guided first run for Creative Claw: introduce what it can do, ask what the user wants to make, collect their photos, logo or brand references, then walk them to a preview image, a first video, a designed voice, a saved Character or brand theme, and Studio. Use when the user runs plugin setup, has just installed or connected Creative Claw, or asks to get started or for a tour. For a specific media request, use the matching outcome skill instead."
---

# Set up Creative Claw

**What comes out:** A short guided first run that ends in a first 5-second video: what Creative Claw makes, the user's photos, product or brand turned into reusable anchors, one approved preview image, the video, an optional designed voice, and ideas for what to make next.

**What it needs:** Nothing. Optional: photos of themselves, a product photo, a logo or brand website, an idea of what to make.

## Steps

1. Welcome and ask
2. Turn references into anchors
3. Show how it will look
4. First video
5. A voice, while the video renders
6. What they have not set up yet
7. Finish

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "getting-started" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-setup`, `getting-started` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
