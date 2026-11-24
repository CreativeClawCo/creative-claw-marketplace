---
name: creativeclaw-edit-media
description: "Edit existing video or audio with Creative Claw without regenerating it: trim, cut and reorder chosen moments, resize or reframe, caption, transcribe, clean speech, lip-sync a video to a voice, extract frames, add or mix audio, burn a logo watermark, compose images and clips, or add an intro/outro. Use when the source footage should be kept; use generation skills for invented or transformed footage and create-reels to pick highlights."
---

# Edit Existing Media

**What comes out:** The user's own video or audio turned into a finished copy without regenerating it - trimmed, cut and reordered, resized or reframed, joined, with music, narration, a logo, an intro or an outro added, cleaned, lip-synced, transcribed or captioned - while the original stays unchanged.

**What it needs:** The video or audio file and what should change. Optional: exact times, the output size, the audio or logo to add, intro and outro copy.

## Steps

1. Get the source and read it
2. Pick only the operations you need
3. Order the chain
4. Several chosen moments in one render
5. Captions
6. Check
7. Finish

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "edit-video" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-edit-media`, `edit-video` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
