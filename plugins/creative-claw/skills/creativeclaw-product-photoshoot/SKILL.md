---
name: creativeclaw-product-photoshoot
description: "Create a coherent set of campaign-ready product images with Creative Claw. Use for packshots, ecommerce sets, lifestyle scenes, launch campaigns, or several images that must preserve the same product and brand."
---

# Product Photoshoot

**What comes out:** A matching set of 4 to 6 campaign-ready product images made from the user's own product photo, or one preset image such as a hero shot, a flat lay or a benefits card.

**What it needs:** A photo of the real product. Optional: which shots, the ratio, a brand theme, and the exact words for any card.

## Steps

1. Get the product photo
2. Write the product sentence
3. Choose the images
4. One look for the set
5. Generate
6. Check each image against the photo
7. Deliver

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "product-photoshoot" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-product-photoshoot`, `product-photoshoot` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
