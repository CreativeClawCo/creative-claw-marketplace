---
name: creativeclaw-depth-graphics
description: "Put titles, logos and graphics behind the person in the user's own video with Creative Claw: the person is cut out and the graphics sit between the layers, timed to the speech. Use for promos, ads and edits with cuts and movement."
---

# Graphics Behind the Person

**What comes out:** The user's own video, up to 300 seconds with any number of shots, with the person cut out so titles, logos and cards sit behind them and the lines that must read sit in front, timed to the speech, with the footage and sound untouched.

**What it needs:** The video with a person in it. Optional: the words, logos and colours to show, a style, which moments.

## Steps

1. Get the video and read it
2. Plan the graphics
3. Show the plan
4. Make the cut-out and fit it
5. Hand it to the video agent
6. Check the result
7. Finish

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "depth-graphics" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-depth-graphics`, `depth-graphics` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
