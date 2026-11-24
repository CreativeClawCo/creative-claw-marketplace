---
name: creativeclaw-talking-head-effects
description: "Add timed graphics to the user's own talking-head clip with Creative Claw: key words behind the head, kinetic words, freeze-frame name tags and number callouts. Use when the user wants their reel to look edited."
---

# Talking-Head Effects

**What comes out:** The user's own talking-head video, up to about 90 seconds, with graphics timed to the speech (key words behind the speaker's head, words popping in as spoken, freeze-frame name tags, number callouts) and the footage and sound untouched underneath.

**What it needs:** The video of one speaker. Optional: which effect, the words or numbers to show, a colour or font, where in the clip.

## Steps

1. Get the video and read it
2. Pick the effect and the moments
3. Show the plan
4. Make the cutout
5. Hand it to the video agent
6. Check every moment
7. Finish

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "talking-head-effects" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-talking-head-effects`, `talking-head-effects` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
