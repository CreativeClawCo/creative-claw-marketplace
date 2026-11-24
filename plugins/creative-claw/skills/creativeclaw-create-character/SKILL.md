---
name: creativeclaw-create-character
description: "Save or reuse an approved face, Character sheet, stock or designed voice, or voice-only narrator in Characters. Use to create, inspect or update a named Character and reuse its identity or voice across shots and projects."
---

# Manage a reusable Character

The steps for this live on the Creative Claw server as the `character` workflow, so they stay current in every app.

1. Call `get_workflow` with `{ "name": "character" }` and follow the workflow it returns, step by step. It says which tools and models to use, how to prompt them and what to check. Read a guide it lists only when the workflow sends you to it.
2. Read `get_model_params` for each model before you first use it.
3. On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-create-character`, `character` and the guides you followed, as `get_workflow` names them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

To save, inspect, update or delete a Character that already exists, the workflow has a shorter path for that.

If the request turns out to be something else, call `find_workflows` with the user's goal and read the workflow that fits. If `get_workflow` is missing while other Creative Claw tools are there, the app still has an older tool list: work directly with the tools, reading `get_model_params` for each model.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
