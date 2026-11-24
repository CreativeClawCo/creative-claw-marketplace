---
name: creativeclaw-render-html
description: "Render an exact HTML/CSS layout to a PNG, or make a motion-graphics video as a HyperFrames HTML/CSS/JS composition, with Creative Claw. Use only when the user explicitly asks for HTML, CSS, HyperFrames, or code-based rendering, supplies HTML, accepts that method, or explicitly asks for motion graphics, kinetic typography, animated titles, or an animated explainer; not for ordinary images, posters, social cards, or filmed-looking AI video."
---

# Render HTML

**What comes out:** A motion-graphics video up to 300 seconds (kinetic type, animated titles, charts, UI motion, words and cards over footage), or an exact layout rendered to a PNG at a set pixel size; both are built in HTML and rendered.

**What it needs:** The exact words, the size and, for video, the length. Optional: HTML or a project ZIP, footage, images, audio, logos, a brand theme, a script.

## Steps

1. Is this the route
2. Gather the inputs
3. Pick the tool
4. A video by the agent
5. A video from your own HTML
6. Check
7. Finish

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "motion-graphics" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-render-html`, `motion-graphics` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
