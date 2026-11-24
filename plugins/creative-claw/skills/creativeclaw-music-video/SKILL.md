---
name: creativeclaw-music-video
description: "Make a music video, performance video or visualizer for a song with Creative Claw, with the user, a band or a Character singing it and the song kept as recorded. Use for music videos."
---

# Music Video

**What comes out:** A music video as long as the song (up to 10 minutes): the singer performs it on camera between b-roll shots, cut on the song's own sections, from storyboards to clips, exported with the song itself as the only soundtrack; or only its shot plan and storyboards.

**What it needs:** The song (a file, a link, a recording, or a brief to make one). Optional: photos of the singer or a saved Character, band members, places and looks, the channel or ratio, a part of the song, a budget.

## Steps

1. Take the brief
2. The song
3. Cast and looks
4. Save the film
5. Plan the shots
6. Storyboards
7. Clips
8. Check every clip
9. Export
10. Check and deliver

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "music-video" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-music-video`, `music-video` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
