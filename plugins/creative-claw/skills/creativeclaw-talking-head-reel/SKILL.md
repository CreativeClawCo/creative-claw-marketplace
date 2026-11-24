---
name: creativeclaw-talking-head-reel
description: "Make a talking-head reel, Short or TikTok with Creative Claw from a topic, an article, notes or a script: a presenter, takes, cutaways and music. Use for a reel that explains, argues or tells one thing."
---

# Talking-Head Reel

**What comes out:** A finished vertical reel, 30 seconds to about two minutes, in which one consistent presenter talks to camera about a topic, with captions, a few cutaways and on-screen graphics.

**What it needs:** A topic, source text or script. Optional: a presenter photo or saved Character, a voice, length, language, their own pictures or clips to show, a brand look.

## Steps

1. Take the brief
2. Lock the presenter, the room and the voice
3. Write the script and cut it into takes
4. Show the plan
5. Generate the takes
6. Check each draft
7. Edit
8. Music
9. Check and deliver

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "talking-head-reel" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-talking-head-reel`, `talking-head-reel` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
