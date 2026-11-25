---
name: creativeclaw-generate-video
description: "Generate, animate, extend, reframe, or transform a video of up to 30 seconds with Creative Claw, from one shot to a short scene, story or ad with several cuts in one place, made from approved frames. Use for any video of 30 seconds or less, unless it is a UGC ad."
---

# Generate Video

**What comes out:** One generated video of 3 to 30 seconds, one shot or several cuts in one place, made from approved frames: a new shot, a short scene or story, an animated photo, a person saying given lines, or an edit or extension of an existing clip.

**What it needs:** What the clip shows, or the photo or clip to start from. Optional: ratio, length, spoken lines and voice, a saved Character, product photos, a model.

## Steps

1. Take the brief
2. Pick the job
3. Make the frames first
4. Make the speech first
5. Write the prompt
6. Settings
7. Submit
8. Check
9. Finish

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "video-clip" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-generate-video`, `video-clip` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
