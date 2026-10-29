---
name: creativeclaw-budget-projects
description: "Track Creative Claw spend per client, job or production with budget projects: create or pick one, count every paid generation toward it, assign past work, and show its total cost and generations. Use when the user mentions a client, a project budget, billing or invoicing work, or asks what something cost."
---

# Budget Projects

For each Creative Claw tool call that exposes it, set the optional `skills_used` array with `creativeclaw-budget-projects`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw-budget-projects/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools.

A budget project is a cost-tracking label for client work, separate from film projects. Each has a display name ("Papercraft Tarot") and a kebab-case slug (`papercraft-tarot`), both unique in the workspace. A generation's cost counts toward the project named on its paid call. Costs are kept in credits; dollar figures are shown at list price, or the member rate for members.

## Start or pick a project

1. Call `list_budget_projects` first to see existing projects and their slugs.
2. If the work belongs to one of them, use its slug. If it is new client work, call `create_budget_project({ name })` and use the slug it returns. Create returns the existing project (status `exists`) when the name or slug is taken, so it is safe to call again.
3. Confirm the project in one short line ("Counting this toward papercraft-tarot.") and continue with the user's request.

## Count every paid generation

- Set `budget_project` to the slug on every paid call for that work: images, videos, speech, music, edits, upscales, renders, film assembly. The result ends with the project's running total.
- A budget project never stops a generation. If the slug is not found, the generation still runs but is not counted, and the result ends with a warning (and a "Did you mean" suggestion when one is close): tell the user, then find the right slug with `list_budget_projects`, or create the project with `create_budget_project` if it is new, and move the generation in with `assign_to_budget_project`. An archived project still counts. Use the exact slug from `list_budget_projects`.
- Films: set `budget_project` on `create_film_project` (or later on `update_film_project`) to tie a film to a project; several films can share one. Shot clips saved to that film count toward it.
- On Claude, suggest adding one line to the Claude Project's instructions so every chat in it uses the same project, for example: `Creative Claw budget project: papercraft-tarot`. ChatGPT Projects work the same way.
- Swaps (`swap_video_characters`), character videos and the video agent charge outside the call; assign their results afterwards.

## Assign past work

1. Find it with `search_assets`: `budget_project: "none"` lists generated work in no project; combine with `created_from`, `created_to`, `query` or `type`. Each result shows its asset ID and job ID.
2. Confirm the set with the user when it is not obvious, then call `assign_to_budget_project({ budget_project, job_ids })` (asset IDs also work). A batch moves together; edits such as upscales are separate generations and move separately.
3. Use `budget_project: null` to take generations out of a project.

## Report costs

- For a quick answer, use `list_budget_projects` (all projects with totals) or `list_budget_projects({ budget_project })` (that project's latest generations with cost and output URLs).
- When the user wants to see it, call `show_budget_project({ budget_project })`. It opens full screen with the total in credits and dollars, who spent what, a row per charged generation (processing work updates live, failed work shows no cost), a media grid, and videos waiting for the user's approval, which they can approve there. Use `tab: "media"` for finished outputs, `tab: "approvals"` for videos waiting for approval, or omit `budget_project` for all projects.
- Rename, change notes, or archive a finished project with `update_budget_project`. Changing a slug breaks saved references to the old one, so ask first.
- Only Creative Claw generations are tracked. Chat or LLM costs are not recorded; never estimate or invent them.
