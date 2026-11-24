---
name: creativeclaw-generate-voiceover
description: "Generate narration, dialogue, or expressive speech with Creative Claw, or design a new custom synthetic voice from a description. Use for finding voices by accent, previewing stock voices, repairing pronunciation, or speaking in a saved Character voice. To copy a real person's voice from a recording, use creativeclaw-clone-voice."
---

# Generate voiceover

**What comes out:** Spoken audio from a script, one file per take: a narration, a character line, a dialogue of up to 10 voices in one file, or a new synthetic voice designed from a description and saved on a Character.

**What it needs:** The words to speak, or what they should say. Optional: language and accent, a voice (a saved Character, a stock pick or a description), delivery, pace.

## Steps

1. Take the brief
2. Choose the voice
3. Prepare the script
4. Generate
5. Check
6. Deliver

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "voiceover" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-generate-voiceover`, `voiceover` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
