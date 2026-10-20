---
name: creativeclaw-generate-music
description: "Compose songs and instrumentals with Mureka V9.5, background or image-inspired music with Lyria 3.5, or exact-duration music with ElevenLabs. Also remix songs or replace selected lyrics. Use for music, not speech or sound effects."
---

# Generate Music

For each Creative Claw tool call that exposes it, pass the optional `skills_used` array with `creativeclaw-generate-music`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw-generate-music/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Create a finished music asset with `generate_music`. Route narration or dialogue to `creativeclaw-generate-voiceover`. Route Foley, ambience, impacts, transitions, UI cues, and other non-musical sounds to `creativeclaw-generate-sound-effects`.

## Pick the model

| Need | Model | Notes |
| --- | --- | --- |
| Full-length vocal songs, expressive musical performances, custom or automatic lyrics, instrumentals | `music/mureka-v9.5` | One MP3, model chooses length. Instrumental or supplied lyrics: 30 credits; automatic lyrics and singing: 100 credits. Optional audio style reference. Read [Mureka guidance](references/mureka.md). |
| Background beds, scores, or image-inspired tracks | `music/lyria-3.5` (omitted-model default) | About 30 to 180 s; `music_length_ms` is guidance, not exact. Up to 10 `image_urls` as visual inspiration. `force_instrumental` defaults to true. |
| Exact length, or a sting under 30 s | `music/elevenlabs-music-v2.5` | Exact 3 s to 10 min via `music_length_ms` (default 30 s). Prompt up to 4,100 characters. `output_format` selectable. `force_instrumental` defaults to true. |
| Remix an existing song or sung vocal recording | `music/mureka-remix` | Supply `audio_url` with detectable musical tempo, not ordinary speech. Read its current schema. |
| Replace lyrics in a selected source time range | `music/mureka-region-edit` | Supply `audio_url`, replacement lyrics, and the millisecond edit range from its current schema. |
| Explicit MiniMax choice or a requirement for its seed/quality controls | `music/minimax-music-3` | Requires `lyrics` with section tags on separate lines. No `force_instrumental`. `music_length_ms` is an upper bound (up to 5 min). |

Use Mureka V9.5 for full-length songs and expressive musical performances, Lyria for background or image-inspired tracks, and ElevenLabs for exact duration or format. Honor an explicit model choice. Fetch `get_model_params` for the selected model when its schema is not already known; if unavailable, explain and offer an available model without silently substituting it.

## Workflow

1. Establish the track's purpose, duration, placement, genre, mood, tempo, instrumentation, energy arc, ending, and whether vocals are wanted. Ask only for missing choices that materially change the result.
2. Pick the model from the table. Read [music prompting](references/music-prompting.md) before writing the prompt. For Mureka, also read [its model reference](references/mureka.md). Keep quoted lyrics and required timing exactly.
3. Use `estimate_generation` with `operation: "audio"` only when the user asks about cost, balance, affordability, or supplies a budget. An estimate-only request does not authorize generation.
4. State consequential settings briefly, then call `generate_music`. One requested track authorizes one generation. Generate alternatives only when the user asks for a batch or another take. Resolve queued Lyria, MiniMax, and Mureka jobs with `check_job`.
5. Listen for genre fit, tempo, instrumentation, vocal presence, lyric accuracy, energy arc, mix density, ending, and clipping. A defect can justify a proposed revision, not an unrequested paid regeneration.
6. Return the permanent audio asset. To put it under a video, keep it separate until approved, then follow [media assembly](references/media-assembly.md): `add_audio_to_video` with `audio_mode: "mix"` keeps the clip's sound (`added_volume` about 0.3 under speech).

## Tool contract

- Pass only the fields the selected model supports. Do not send sound-effect fields such as `duration_seconds`, `loop`, or `prompt_influence`.
- For instrumental work, keep `force_instrumental: true` (Lyria, ElevenLabs, Mureka) and say "instrumental, no vocals" in the prompt. For vocals, set it to `false` and describe the vocal role. For Mureka, choose supplied or automatic lyrics deliberately; their costs differ.
- Describe musical traits, never a named artist, band, song, or copyrighted lyrics.
- For Mureka style inspiration, pass `audio_url` or `extras.reference_audio_url` as documented by the live schema. Longer references are cut to their first 30 seconds, and the reference replaces the style prompt. Use the separate Remix and Region Edit models for those operations. Do not invent upstream composition-plan, stem, voice-cloning, or extension parameters.

## Completion standard

Return the permanent URL and identify the model, requested duration (or model-chosen length for Mureka), vocal or instrumental setting, and intended use. Mention any important mismatch found during review. When a merged video is requested, distinguish the approved music asset from the separately rendered video result.
