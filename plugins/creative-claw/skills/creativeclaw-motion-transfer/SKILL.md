---
name: creativeclaw-motion-transfer
description: "Make the subject of an image do the same dance, gesture, performance or camera move as in a video, with Creative Claw. Use when the user has a video with a movement and an image of someone or something else."
---

# Motion Transfer

**What comes out:** A new video of 3 to 30 seconds in which the person or character from the user's image performs the movement of a driving video (a dance, a gesture, a camera move), in the look and setting of the image.

**What it needs:** One driving video and one or more images of the subject, both of which the user has the right to use. Optional: the setting, whether to keep the driving video's sound.

## Steps

1. Read both inputs
2. Prepare the appearance image
3. Plan and go-ahead
4. Generate
5. Sound
6. Check
7. Deliver

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "motion-transfer" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-motion-transfer`, `motion-transfer` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
