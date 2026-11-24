---
name: creativeclaw-create-avatar
description: Create a reusable personal avatar or fictional Character from photos or a brief, generate and approve a consistent character sheet, save it in Characters, and optionally give it a voice (designed, cloned with consent, or stock).
---

# Create your avatar

**What comes out:** A saved Character (a name, a description and one approved character sheet, optionally a voice) made from the user's photos or a brief, that later images, videos and speech reuse by name; also inspects, updates or deletes a saved Character.

**What it needs:** A few clear photos of the person, or a brief for a fictional Character. Optional: an existing Character to update, a voice (designed, their own with consent, or stock).

## Steps

1. Pick the path
2. Look for an existing Character
3. Gather the inputs
4. Make the sheet
5. Check and approve
6. Save
7. Voice
8. Finish

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "character" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-create-avatar`, `character` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
