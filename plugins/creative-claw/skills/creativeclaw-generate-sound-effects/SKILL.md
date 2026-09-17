---
name: creativeclaw-generate-sound-effects
description: "Generate sound effects, Foley, ambience, loops, UI cues, transitions, impacts, or audio textures with ElevenLabs Sound Effects v2 through Creative Claw. Use for non-speech, non-song audio."
---

# Generate Sound Effects

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Create one finished non-speech sound asset with `generate_sound_effect` and `sfx/elevenlabs-sound-v2`. Route full music, scores, jingles, and songs to `creativeclaw-generate-music`. Route narration, dialogue, and character performance to `creativeclaw-generate-voiceover`.

## What Sound Effects v2 does well

The model generates cinematic effects, game audio, Foley, environmental ambience, UI feedback, impacts, whooshes, drones, glitches, and short musical components. It understands natural-language descriptions and audio terminology, can infer a natural duration, can target 0.5 to 30 seconds, and can generate a seamless loop. Prompt influence controls the tradeoff between literal adherence and variation.

Use the Music model for a complete musical track even though Sound Effects v2 can make drum loops, stabs, bass lines, and pads.

## Workflow

1. Identify the audible event or environment, its use, required duration, whether it must loop, and whether it must match picture. Ask only for missing choices that materially change the result.
2. Use `get_model_params({ model: "sfx/elevenlabs-sound-v2" })` when the live schema is not already known. Use `list_models({ category: "audio" })` only when discovery is needed.
3. Read [sound-effect prompting](references/sound-effect-prompting.md). Describe the source, action, material, timing, acoustic space, perspective, texture, intensity, decay, and focused exclusions that matter.
4. Use `estimate_generation` with `operation: "audio"` only when the user asks about cost, balance, affordability, or sets a budget. An estimate-only request does not authorize generation.
5. State consequential settings briefly, then call `generate_sound_effect`. Generate separate effects separately unless the requested output is genuinely one chronological sequence.
6. Listen for source accuracy, timing, perspective, room character, transient shape, unwanted speech or music, clipping, noise, decay, and loop seams. Propose a focused revision when needed, but do not create an unrequested paid take.
7. Return the permanent audio asset. Keep it separate until approved before adding it to video or another edit. Follow [media assembly](references/media-assembly.md) for supported combinations.

## Tool contract

Call `generate_sound_effect` with:

- `model`: `sfx/elevenlabs-sound-v2`.
- `prompt`: 1 to 450 characters. Concise, concrete audible direction is usually more effective than a long visual narrative.
- `duration_seconds`: optional, 0.5 to 30. Omit it when the natural event length matters more than exact timing. Set it for sync cues, UI sounds, loops, or a fixed editorial slot.
- `loop`: optional. Set `true` only for a stable sound field intended to repeat without a perceptible beginning or end.
- `prompt_influence`: optional, 0 to 1, default 0.3. Raise it for literal source and timing adherence with less variation. Lower it when a broader, more inventive interpretation is acceptable.
- `output_format`: optional. Supported values are `mp3_44100_128`, `mp3_44100_192`, `mp3_48000_192`, `pcm_44100`, and `pcm_48000`. The normal sound-effect default is `mp3_44100_128`.

Do not send music fields such as `music_length_ms` or `force_instrumental`. Do not send the SFX model to `generate_music` or `generate_speech`.

## Prompting principles

- Describe what should be heard, not what a camera sees. Convert visual events into sources, motion, materials, impacts, rhythm, distance, and room response.
- Lead with the main source and action. Add only the details that distinguish the intended sound.
- Control time with onset, sequence, pauses, repetitions, impact, sustain, decay, and ending.
- Control space with close or distant perspective, interior or exterior, room size, reflections, occlusion, reverb, and stereo movement.
- Control texture and intensity with terms such as brittle, heavy, soft, wet, metallic, clean, distorted, restrained, explosive, sub-heavy, or high-frequency.
- State likely unwanted elements: no speech, no music, no crowd, no alarm, no hiss, or no tonal layer.
- For complex scenes, generate clean components separately and assemble them later. One overloaded prompt often reduces control over timing and balance.

## Looping

For a seamless loop, set `loop: true` and describe a stable environment or texture. Avoid unique attacks, arrivals, one-time events, dramatic builds, and resolved endings. Ask for consistent density across the clip and no obvious beginning or endpoint. Generate up to 30 seconds and repeat the approved asset downstream.

Do not set `loop: true` for a door slam, gunshot, notification click, logo hit, or another one-shot unless the user specifically wants that event repeated as a rhythmic texture.

## Prompt influence

Start with the default 0.3 unless the brief requires stricter control.

- Raise it when a specific material, action, sequence, or exclusion keeps drifting.
- Lower it when the result is too rigid, synthetic, repetitive, or narrow and the user welcomes variation.
- Change prompt influence only after improving an ambiguous prompt. It cannot resolve contradictory instructions.

## Revision strategy

- Wrong source: name the object, material, action, and contact surface more precisely.
- Wrong perspective: specify distance, microphone position, occlusion, and environment.
- Timing mismatch: set `duration_seconds` and narrate onset, sequence, and decay.
- Too reverberant: request close perspective, dry recording, short room, and restrained tail.
- Too tonal or musical: exclude pitch, melody, harmony, music, and synth layers where appropriate.
- Loop seam: remove unique events and ending cues; request constant density and no perceptible boundary.
- Too many fused events: split the scene into individual generated assets.

## Completion standard

Return the permanent URL and identify the model, duration choice, loop setting, prompt influence when non-default, and intended use. Mention any audible mismatch found during review. When synchronized or merged media is requested, distinguish the approved sound asset from the separately rendered result.
