---
name: creativeclaw-swap-characters
description: "Swap, replace or recast the people in an existing video with Creative Claw: put yourself, a saved Character or a photo into a TikTok, Reel, movie scene or ad while the original motion, camera, cuts and audio stay. Use for character swaps, face swaps, recasting an actor, \"put me in this video\", \"replace her with my grandma\" and multi-person swaps, and for swapping a product, prop, garment or sign in a video (swap_video_objects). Not for copying a performance into a new scene (motion transfer) or for new footage."
---

# Swap Characters

**What comes out:** The user's existing video (4 to 30 seconds are swapped) with one or more people, or a product, prop, garment or sign, replaced by someone or something new, keeping the original motion, camera, cuts and sound; free image previews come before the paid render.

**What it needs:** The video (a file or a social link) and a photo or saved Character for each new person, or photos of the new object. Optional: who stays unchanged, an outfit change, an engine or resolution.

## Steps

1. Route the request
2. Get the video
3. The new people
4. Write the instructions
5. Start once
6. Check the free previews
7. Render and status
8. Check and finish

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "video-swap" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-swap-characters`, `video-swap` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
