---
name: creativeclaw-generate-music
description: "Compose scores, beds, jingles, themes, instrumentals, or vocal songs with ElevenLabs Music v2.5 through Creative Claw. Use for new music, not speech or isolated non-musical sound effects."
---

# Generate Music

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Create a finished music asset with `generate_music` and `music/elevenlabs-music-v2.5`. Route narration or dialogue to `creativeclaw-generate-voiceover`. Route Foley, ambience, impacts, transitions, UI cues, and other non-musical sounds to `creativeclaw-generate-sound-effects`.

## Why Music v2.5

Music v2.5 is ElevenLabs' highest-quality music model. It improves prompt adherence, instrumental realism, layered arrangement, movement, and long-range coherence over earlier Music generations. It is particularly strong for vocal-led material, acoustic-heavy genres, rock and metal, orchestral work, and cinematic scores. It also inherits Music v2's strengths in multilingual vocals, complex delivery, section changes, and genre transitions.

Creative Claw currently exposes prompt-based composition. ElevenLabs also offers composition plans, audio references, inpainting, and other workflows upstream, but they are not fields on `generate_music`. Never invent or pass `composition_plan`, `seed`, reference-audio, inpainting, stem, or finetune fields unless the live tool schema later exposes them.

## Workflow

1. Establish the track's purpose, duration, placement, genre, mood, tempo, instrumentation, energy arc, ending, and whether vocals are wanted. Ask only for missing choices that materially change the result.
2. Use `get_model_params({ model: "music/elevenlabs-music-v2.5" })` when the current schema is not already known. Use `list_models({ category: "audio" })` only when model discovery is actually needed.
3. Read [music prompting](references/music-prompting.md) before writing the generation prompt. Convert the user's creative brief into musical and production decisions without changing quoted lyrics or required timing.
4. Use `estimate_generation` with `operation: "audio"` only when the user asks about cost, balance, affordability, or supplies a budget constraint. An estimate-only request does not authorize generation.
5. State consequential settings briefly, then call `generate_music`. One requested track authorizes one generation. Generate alternatives only when the user requests a batch or another take.
6. Listen for genre fit, tempo, instrumentation, vocal presence, lyric accuracy, energy arc, mix density, ending, clipping, and suitability for the intended use. A defect can justify a proposed revision, but not an unrequested paid regeneration.
7. Return the permanent audio asset. If it must accompany video, keep it separate until approved, then follow [media assembly](references/media-assembly.md).

## Tool contract

Call `generate_music` with:

- `model`: `music/elevenlabs-music-v2.5`. The legacy `music/elevenlabs-music-v1` ID is accepted only through compatibility paths and resolves to v2.5. Do not select it for new work.
- `prompt`: 1 to 4,100 characters. Describe the music itself, its progression, production, and intended use.
- `music_length_ms`: optional, 3,000 to 600,000. Creative Claw defaults to 30,000 ms. Set it explicitly for picture, ads, stings, loops, or any time-bound deliverable.
- `force_instrumental`: optional and effectively `true` by default in Creative Claw. Set `false` only when vocals are wanted, and make the vocal role explicit in the prompt.
- `output_format`: optional. Supported values are `mp3_44100_128`, `mp3_44100_192`, `mp3_48000_192`, `pcm_44100`, and `pcm_48000`. The normal music default is `mp3_48000_192`.

Do not send sound-effect fields such as `duration_seconds`, `loop`, or `prompt_influence`. Do not send music models to `generate_speech` or `generate_sound_effect`.

## Prompting principles

- Decide the five high-impact dimensions: genre, mood, instrumentation, tempo, and production era. Unspecified dimensions are chosen by the model and tend toward conventional defaults.
- Use studio language when it matters: close-mic'd, bone-dry, sidechained, tape-saturated, wide stereo, plate reverb, sparse low end, or dialogue-safe mix.
- Describe arrangement chronologically with cues such as “start with,” “after eight bars,” “then,” “build into,” and “finish with.” State intentional silence or sparseness explicitly.
- For instrumental work, combine `force_instrumental: true` with an explicit “instrumental, no vocals” instruction. For vocals, set it to `false` and specify language, singer character, delivery, lyrical subject, harmonies, and where vocals enter or stop.
- Use exact BPM, key, meter, bar count, and timing only when they serve the deliverable. The model responds well to these controls, but the result still needs listening verification.
- Name the desired ending: clean button, resolved tail, ring-out, fade, or loop-friendly cadence. There is no seamless-loop parameter on `generate_music`.
- Describe stylistic traits rather than naming an artist, band, song, or copyrighted lyrics. If the provider rejects a prompt, use its safe suggestion when available and preserve the user's underlying musical intent.

## Revision strategy

Diagnose one audible problem at a time. Preserve the successful parts of the brief and change the smallest useful control:

- Wrong genre or era: replace vague adjectives with genre, era, rhythm, and production vocabulary.
- Weak structure: narrate the order, entry points, build, peak, and ending.
- Too busy under dialogue: request fewer lead elements, restrained percussion, a narrower midrange, and no foreground vocal.
- Unwanted vocals: keep `force_instrumental: true` and explicitly exclude vocals, chants, spoken words, and vocal textures.
- Vocal mismatch: state singer range, timbre, delivery, language, harmony, and the exact role of the vocal.
- Poor ending: reserve the last seconds for a cadence, button, or controlled tail instead of asking only for a mood.

## Completion standard

Return the permanent URL and identify the model, requested duration, vocal or instrumental setting, and intended use. Mention any important mismatch found during review. When a merged video is requested, distinguish the approved music asset from the separately rendered video result.
