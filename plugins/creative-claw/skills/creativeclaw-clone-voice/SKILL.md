---
name: creativeclaw-clone-voice
description: Guide recording, private upload, cloning, testing, and reuse of a consented personal voice with Cartesia or ElevenLabs. Use when someone asks to clone their voice, save it on a Character, or replace or audition a clone. Not for inventing a new voice from a description; use creativeclaw-generate-voiceover.
---

# Clone your voice

**What comes out:** A private clone of the user's own voice, or of a speaker who gave explicit permission, saved on a Character and tested with a short audition, ready to speak any later script.

**What it needs:** The speaker's consent. Optional: an existing recording (about 1 to 2 minutes of clean solo speech), its language, the Character it belongs on, a provider choice.

## Steps

1. Whose voice, and where it goes
2. No recording yet: the voice card
3. A recording file
4. Audition
5. Check
6. Finish

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "voice-clone" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-clone-voice`, `voice-clone` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
