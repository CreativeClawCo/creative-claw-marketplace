---
name: creativeclaw-faceless-video
description: "Make a faceless narrated video with Creative Claw: an explainer, history piece, story or what-if short with a voiceover in a drawn look such as whiteboard, stickman, paper cut-out or storybook. Use for faceless channel videos."
---

# Faceless Narrated Video

**What comes out:** A video with no presenter on camera where a narrator speaks and drawn pictures carry the idea: one to three minutes, 16:9 or 9:16, in one illustrated style, or a vertical 45 to 60 second short that answers one "what if…" or "why does…" question with every frame drawn in code.

**What it needs:** A topic, a question or a finished script. Optional: length, ratio, style, narrator voice, language, captions, music, facts or sources to use.

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "faceless-video" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do this task: which of its tools and models suit it, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-faceless-video`, `faceless-video` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the task with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
