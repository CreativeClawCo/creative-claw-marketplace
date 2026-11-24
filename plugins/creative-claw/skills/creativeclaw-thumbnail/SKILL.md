---
name: creativeclaw-thumbnail
description: "Make a YouTube thumbnail or a cover for a Reel, Short or TikTok with Creative Claw, with a headline and the user's photo. Use when the user wants a click-worthy title image for a video."
---

# Thumbnail

**What comes out:** One YouTube thumbnail (16:9, 1280x720) or reel cover (9:16, 1080x1920) that reads at small size, with a large subject, one clear emotion and a headline of 2 to 5 words spelled exactly.

**What it needs:** The video's topic or title. Optional: a photo of the person in it or a saved Character, a frame or product from the video, the headline words, the channel's brand theme.

## Steps

1. Take the brief
2. Offer directions
3. Lock the headline
4. Make the picture
5. Add the headline
6. Check it small
7. Deliver

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "thumbnail" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-thumbnail`, `thumbnail` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
