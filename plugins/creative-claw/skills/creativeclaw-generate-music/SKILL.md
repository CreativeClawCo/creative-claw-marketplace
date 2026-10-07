---
name: creativeclaw-generate-music
description: "Compose scores, beds, jingles, stings, themes, instrumentals, or vocal songs with Creative Claw (Lyria 3.5, ElevenLabs Music, MiniMax Music, or Mureka V9.5 when available). Use for new music, not speech or isolated non-musical sound effects."
---

# Generate Music

For each Creative Claw tool call that exposes it, pass the optional `skills_used` array with `creativeclaw-generate-music`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw-generate-music/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Create a finished music asset with `generate_music`. Route narration or dialogue to `creativeclaw-generate-voiceover`. Route Foley, ambience, impacts, transitions, UI cues, and other non-musical sounds to `creativeclaw-generate-sound-effects`.

## Pick the model

| Need | Model | Notes |
| --- | --- | --- |
| Most music: songs, instrumentals, beds, scores | `music/lyria-3.5` (default) | About 30 to 180 s; `music_length_ms` is guidance, not exact. Up to 10 `image_urls` as visual inspiration. `force_instrumental` defaults to true. |
| Exact length, or a sting under 30 s | `music/elevenlabs-music-v2.5` | Exact 3 s to 10 min via `music_length_ms` (default 30 s). Prompt up to 4,100 characters. `output_format` selectable. `force_instrumental` defaults to true. |
| Lyrics-led vocal song | `music/minimax-music-3` | Requires `lyrics` with section tags ([verse], [chorus], [bridge], [outro]…) each on its own line; text on the tag's line is dropped. Supports `seed` to reproduce or refine a take. No `force_instrumental`. `music_length_ms` is an upper bound (up to 5 min). |
| Mureka vocal song or instrumental | `music/mureka-v9.5` (when available) | One MP3, model chooses length. Instrumental or supplied lyrics: 30 credits; automatic lyrics and singing: 100 credits. Read [Mureka guidance](references/mureka.md) for modes, limits, and prompting. |

Honor an explicit model choice. Fetch `get_model_params` for the selected model when its schema is not already known. Confirm Mureka availability through live model discovery or its returned schema before using it; if unavailable, explain and offer an available model without silently substituting it.

## Workflow

1. Establish the track's purpose, duration, placement, genre, mood, tempo, instrumentation, energy arc, ending, and whether vocals are wanted. Ask only for missing choices that materially change the result.
2. Pick the model from the table. Read [music prompting](references/music-prompting.md) before writing the prompt. For Mureka, also read [its model reference](references/mureka.md). Keep quoted lyrics and required timing exactly.
3. Use `estimate_generation` with `operation: "audio"` only when the user asks about cost, balance, affordability, or supplies a budget. An estimate-only request does not authorize generation.
4. State consequential settings briefly, then call `generate_music`. One requested track authorizes one generation. Generate alternatives only when the user asks for a batch or another take. Resolve queued Lyria, MiniMax, and Mureka jobs with `check_job`.
5. Listen for genre fit, tempo, instrumentation, vocal presence, lyric accuracy, energy arc, mix density, ending, and clipping. A defect can justify a proposed revision, not an unrequested paid regeneration.
6. Return the permanent audio asset. To put it under a video, keep it separate until approved, then follow [media assembly](references/media-assembly.md): `merge_media` `merge_audio_video` with `audio_mode: "mix"` keeps the clip's sound (`added_volume` about 0.3 under speech).

## Tool contract

- Pass only the fields the selected model supports. Do not send sound-effect fields such as `duration_seconds`, `loop`, or `prompt_influence`.
- For instrumental work, keep `force_instrumental: true` (Lyria, ElevenLabs, Mureka) and say "instrumental, no vocals" in the prompt. For vocals, set it to `false` and describe the vocal role. For Mureka, choose supplied or automatic lyrics deliberately; their costs differ.
- Describe musical traits, never a named artist, band, song, or copyrighted lyrics.
- Upstream features that are not tool fields (composition plans, reference audio, inpainting, stems) are unavailable. Don't invent parameters for them.

## Completion standard

Return the permanent URL and identify the model, requested duration (or model-chosen length for Mureka), vocal or instrumental setting, and intended use. Mention any important mismatch found during review. When a merged video is requested, distinguish the approved music asset from the separately rendered video result.
