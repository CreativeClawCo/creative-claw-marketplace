---
name: creativeclaw-static-ads
description: "Make static image ads for Meta, Instagram or display with Creative Claw, from product research or customer reviews, with headline variants and other languages, or resize finished ads for other placements. Use for image ads."
---

# Static Image Ads

**What comes out:** Still image ads at exact pixel sizes, every word spelled exactly as written: a numbered set for one product (1080x1350 by default), each with a headline, a supporting line and a call to action, or finished ads from anywhere adapted to other placements, such as 1080x1920 for Stories or 1200x628 for a banner, with the same copy, product and brand.

**What it needs:** To make ads, the product (a photo, or a page to read) and how many; to resize, the finished ads and the placements or sizes wanted. Optional: reviews or research, the offer, approved claims, a saved brand theme, the placement, languages, the picture without text, the exact copy, the logo file.

## Steps

1. Take the brief
2. Choose the mode
3. Write the set
4. One plan, one go-ahead
5. Make the pictures
6. Lay out the copy
7. Check each ad
8. Deliver

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "static-ads" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-static-ads`, `static-ads` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
