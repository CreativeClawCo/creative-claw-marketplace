---
name: creativeclaw-generate-sound-effects
description: "Generate sound effects, Foley, ambience, loops, UI cues, transitions, impacts, or audio textures with ElevenLabs Sound Effects v2 through Creative Claw. Use for non-speech, non-song audio."
---

# Generate Sound Effects

For each Creative Claw tool call that exposes it, pass the optional `skills_used` array with `creativeclaw-generate-sound-effects`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw-generate-sound-effects/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and tell the user to open the plugin's Connectors tab in their app (or the MCP server list in a terminal client), connect Creative Claw, sign in, and ask again. Do not substitute other tools or describe a result that was not generated.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Create one finished non-speech sound asset with `generate_sound_effect` and `sfx/elevenlabs-sound-v2`. Route full music, scores, jingles, and songs to `creativeclaw-generate-music`. Route narration, dialogue, and character performance to `creativeclaw-generate-voiceover`.

## What Sound Effects v2 does well

The model generates cinematic effects, game audio, Foley, environmental ambience, UI feedback, impacts, whooshes, drones, glitches, and short musical components. It understands natural-language descriptions and audio terminology, can infer a natural duration, can target 0.5 to 30 seconds, and can generate a seamless loop. Prompt influence controls the tradeoff between literal adherence and variation.

Use the Music model for a complete musical track even though Sound Effects v2 can make drum loops, stabs, bass lines, and pads.

## Workflow

1. Identify the audible event or environment, its use, required duration, whether it must loop, and whether it must match picture. Ask only for missing choices that materially change the result.
2. Use `get_model_params({ model: "sfx/elevenlabs-sound-v2" })` when the live schema is not already known. Use `list_models({ category: "audio" })` only when discovery is needed.
3. Write the prompt as described under Prompting below.
4. Use `estimate_generation` with `operation: "audio"` only when the user asks about cost, balance, affordability, or sets a budget. An estimate-only request does not authorize generation.
5. State consequential settings briefly, then call `generate_sound_effect`. Generate separate effects separately unless the requested output is genuinely one chronological sequence.
6. Listen for source accuracy, timing, perspective, room character, transient shape, unwanted speech or music, clipping, noise, decay, and loop seams. Propose a focused revision when needed, but do not create an unrequested paid take.
7. Return the permanent audio asset. Keep it separate until approved before adding it to video or another edit. Follow [media assembly](references/media-assembly.md): `merge_media` `merge_audio_video` with `audio_mode: "mix"` keeps the clip's own sound; the default `replace` discards it.

## Tool contract

Call `generate_sound_effect` with:

- `model`: `sfx/elevenlabs-sound-v2`.
- `prompt`: 1 to 450 characters. Concise, concrete audible direction is usually more effective than a long visual narrative.
- `duration_seconds`: optional, 0.5 to 30. Omit it when the natural event length matters more than exact timing. Set it for sync cues, UI sounds, loops, or a fixed editorial slot.
- `loop`: optional. Set `true` only for a stable sound field intended to repeat without a perceptible beginning or end.
- `prompt_influence`: optional, 0 to 1, default 0.3. Raise it for literal source and timing adherence with less variation. Lower it when a broader, more inventive interpretation is acceptable.
- `output_format`: optional. Supported values are `mp3_44100_128`, `mp3_44100_192`, `pcm_44100`, and `pcm_48000`. The normal sound-effect default is `mp3_44100_128`.

Do not send music fields such as `music_length_ms` or `force_instrumental`. Do not send the SFX model to `generate_music` or `generate_speech`.

## Prompting

Read [sound-effect prompting](references/sound-effect-prompting.md) for prompt shape, one-shots, Foley, ambience, loops, prompt influence and troubleshooting. In short:
- Describe what is heard, not what a camera sees: source, action, material, timing, perspective, space, texture, and a few focused exclusions ("no speech, no music").
- Generate complex scenes as separate clean cues and assemble them later.
- Set `loop: true` only for a steady texture with no unique events; never for a one-shot.
- Improve an ambiguous prompt before changing `prompt_influence`.

## Completion standard

Return the permanent URL and identify the model, duration choice, loop setting, prompt influence when non-default, and intended use. Mention any audible mismatch found during review. When synchronized or merged media is requested, distinguish the approved sound asset from the separately rendered result.
