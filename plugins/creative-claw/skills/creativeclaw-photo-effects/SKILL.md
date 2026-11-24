---
name: creativeclaw-photo-effects
description: "Turn a photo of the user into a short effect video with Creative Claw: holiday, New Year and filter-style presets such as snow globe or northern lights. Use when the user asks for an effect clip from their photo."
---

# Photo Effect Video

**What comes out:** A short vertical effect video, 6 to 8 seconds, made from one photo of a person: they appear in a seasonal or fantasy scene and a transformation happens around them. Includes a winter holiday pack of eight presets.

**What it needs:** One clear photo of an adult, who is the user or someone who agreed. Optional: which preset, the length, silent or with ambience.

## Steps

1. The photo
2. The start frame
3. The video
4. Check and deliver

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "photo-effects" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-photo-effects`, `photo-effects` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
