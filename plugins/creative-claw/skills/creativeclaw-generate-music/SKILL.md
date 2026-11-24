---
name: creativeclaw-generate-music
description: "Compose songs and instrumentals with Mureka V9.5, background or image-inspired music with Lyria 3.5, or exact-duration music with ElevenLabs. Also remix songs or replace selected lyrics. Use for music, not speech or sound effects."
---

# Generate Music

**What comes out:** One finished music track as a permanent audio file, from a three-second logo sting to a full-length vocal song: a score, background bed, jingle, theme, instrumental, or a song with the user's lyrics or lyrics the model writes. Also remixes, lyric fixes, stems and new vocals or backing for an existing song.

**What it needs:** What the music is for, or its style. Optional: length, lyrics, vocals or instrumental, images or a reference song for the style, the video it goes under, the existing song to change.

## Steps

1. Take the brief
2. New music, or a change to a song
3. Write the prompt
4. Generate
5. Check
6. Finish

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "music" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-generate-music`, `music` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
