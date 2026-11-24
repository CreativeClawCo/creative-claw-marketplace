---
name: creativeclaw-adapt-ad
description: "Make an ad like someone else's with Creative Claw: break a reference ad (a file, or a TikTok, Instagram or YouTube link) into its beats and remake it for the user's product. Use when the user says \"this but for my product\" or wants an ad in that style."
---

# Adapt a Reference Ad

**What comes out:** One original ad for the user's product, 8 to 45 seconds, that follows the structure of an ad they admire (beat order, timing, hook mechanism, shot sizes, pace) and uses none of its footage, words, people, music or brand.

**What it needs:** The reference ad (file or link) and a product photo or link. Optional: approved claims, a creator photo or saved Character, language, length.

## Steps

1. Take the brief
2. Read the reference
3. Write the beat breakdown
4. Map every beat to the user's product
5. Show the plan once
6. Produce with `ugc-ad`
7. Structure check, side by side

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "adapt-ad" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-adapt-ad`, `adapt-ad` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
