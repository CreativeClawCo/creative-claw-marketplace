---
name: creativeclaw-create-reels
description: "Turn existing long-form video into coherent social clips in the requested aspect ratio, with optional captions. Use when the agent should transcribe, select standalone highlights, choose speech-safe cuts and framing, then render and review. User-selected moments override AI selection; invented footage belongs to video-generation skills."
---

# Long video to Reels

**What comes out:** Short standalone clips cut from the user's long video, each one complete moment with its original sound, framed for the requested shape (1080x1920 vertical and about 30 to 60 seconds by default), with captions when the source has none.

**What it needs:** The long video. Optional: how many clips, their length, the output shape, the audience or goal, moments the user already chose, captions on or off.

## Steps

1. Take the brief
2. Get the video and look at it
3. Transcribe
4. Choose the moments
5. Place the cuts
6. Frame and caption
7. Render
8. Review each reel
9. Deliver

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "highlight-clips" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-create-reels`, `highlight-clips` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
