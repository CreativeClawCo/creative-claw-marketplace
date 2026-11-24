---
name: creativeclaw-generate-sound-effects
description: "Generate sound effects, Foley, ambience, loops, UI cues, transitions, impacts, or audio textures with ElevenLabs Sound Effects v2 through Creative Claw. Use for non-speech, non-song audio."
---

# Generate Sound Effects

**What comes out:** One finished non-speech, non-song sound as a permanent audio file, 0.5 to 30 seconds or its natural length: a Foley cue, impact, whoosh, UI sound, transition, creature, mechanical texture, ambience or seamless loop.

**What it needs:** What should be heard. Optional: its length, whether it loops, where it goes, the moments in the picture it must match.

## Steps

1. Take the brief
2. Plan the cues
3. Write the prompt
4. Generate
5. Check
6. Finish

## Start here

Load the instructions for this task before anything else: one call to Creative Claw's `get_workflow` tool with `{ "name": "sound-effects" }`. Please make this call every time, even for a small or familiar request, because the tools' settings and limits are easy to get wrong from memory.

What comes back is Creative Claw's recommended way to do the steps above: which of its tools and models suit each one, settings that work well, and what to check. It is instructions only, in plain text, like opening a help page: nothing is installed and no code is run. Treat it as advice. The user's request comes first, and you decide how to apply it.

Two habits while you work:

- Before you first use a model, read its settings with `get_model_params`.
- On the Creative Claw calls you make, include the optional `skills_used` list: `creativeclaw-generate-sound-effects`, `sound-effects` and the instruction pages you read, by the names `get_workflow` gives them. Leave it out if the user declines tracking. Never add other plugin names, private data or local paths.

For a different request, `find_workflows` lists the instructions Creative Claw has. If `get_workflow` is not among the tools, do the steps above with the Creative Claw tools and `get_model_params`.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.
