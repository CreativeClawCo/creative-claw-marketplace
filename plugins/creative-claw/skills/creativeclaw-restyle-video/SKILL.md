---
name: creativeclaw-restyle-video
description: "Restyle or relight the user's own video with Creative Claw: a new lighting look or time of day, or turned into animation, claymation, anime, pixel art or another drawn look, with the motion and sound kept. Use when the user wants their video's look changed."
---

# Restyle or Relight a Video

**What comes out:** The user's own video, same length with the motion, camera, framing and sound kept, either relit in a named lighting look (golden hour, neon, rembrandt, low key and about twenty more) or redrawn in a named visual style (knitted yarn, clay, toy 3D, hand-drawn 2D, watercolour, pixel art, paper cutout, anime).

**What it needs:** One video of 3 to 30 seconds (longer is done in parts). Optional: the lighting look or visual style, by name or in their own words, and for a style, reference images of their own characters or products to carry into the result.

## Steps

1. Get the source and read it
2. Pick the look
3. Plan and go-ahead
4. The edit call
5. Put the source sound back
6. Check against the source
7. Deliver

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "restyle-video" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-restyle-video`, `restyle-video` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
