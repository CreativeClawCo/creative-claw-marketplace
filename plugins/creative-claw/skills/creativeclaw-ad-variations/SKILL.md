---
name: creativeclaw-ad-variations
description: "Turn one product shot, one model or one existing ad into a numbered set of video ad variations: each variation is generated with its own hook visuals and line, or gets a new generated opening spliced onto the existing ad, or (cheapest) keeps the same footage with a new voiceover or captions. One estimate for the set. Use for hook tests, A/B ad variants for Meta, Instagram or TikTok, or 'N versions of my ad'."
---

# Ad Variations

**What comes out:** A numbered set of versions of one ad, each changing one thing (the hook, the person, the product, the setting, the voiceover or the captions) so they can be tested against each other. One plan and one total for the set.

**What it needs:** The source: an ad video, a product shot, or a model photo with the product. Optional: how many, what should differ, reference photos for a new person or product.

## Steps

1. Get the source and read it
2. Choose the mode
3. Write the set
4. One plan, one go-ahead
5. Produce
6. Check and deliver

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "ad-variations" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-ad-variations`, `ad-variations` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
