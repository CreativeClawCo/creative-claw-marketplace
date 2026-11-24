---
name: creativeclaw-budget-projects
description: "Track Creative Claw spend per client, job or production with budget projects: create or pick one, count every paid generation toward it, assign past work, and show its total cost and generations. Use when the user mentions a client, a project budget, billing or invoicing work, or asks what something cost."
---

# Budget Projects

**What comes out:** Creative Claw spend tracked per client, job or production: a named budget project that every paid generation for that work counts toward, past work moved into it, and its total cost, who spent what and its generations shown on request.

**What it needs:** The client or job name. Optional: notes such as the client or a purchase order, past work to assign, the dates it was made.

## Steps

1. Start or pick a project
2. Count every paid generation
3. Keep one project across chats
4. Assign past work
5. Report costs
6. Rename, note or archive

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "budget-projects" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-budget-projects`, `budget-projects` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
