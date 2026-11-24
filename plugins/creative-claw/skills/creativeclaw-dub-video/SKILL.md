---
name: creativeclaw-dub-video
description: "Dub a finished video or ad into other languages with Creative Claw: a translated script, voices, timing and optional lip sync. Use when the user wants a video dubbed, translated or localized."
---

# Dub a Video

**What comes out:** The same finished video speaking another language, one copy per language. Translated speech in a matching voice, lips matched where a speaker is on camera, music and effects kept, captions in the new language, picture otherwise untouched.

**What it needs:** The video file and the target language or languages. Optional: an approved translation, a voice (a saved Character or the user's own cloned voice), whether to add captions, terms that must stay untranslated.

## Steps

1. Take the brief
2. Read the source
3. Choose the path
4. Translate and fit
5. Choose the voices
6. One plan, one go-ahead
7. Produce
8. Check each language
9. Deliver

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "dub-video" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-dub-video`, `dub-video` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
