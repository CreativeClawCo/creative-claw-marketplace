---
name: creativeclaw-generate-audio
description: "Generate sound effects, ambience, Foley, or music with Creative Claw. Use for non-speech audio; use the voiceover skill for narration, dialogue, or a speaking character. (v0.5.6)"
---

# Generate Audio

Create a finished sound effect, ambience bed, Foley cue, or music track with ElevenLabs through Creative Claw. Keep speech in `creativeclaw-generate-voiceover`; `generate_speech` and `generate_audio` use different provider endpoints and parameter contracts.

## Route the request

| Requested result | Tool and model |
| --- | --- |
| Narration, dialogue, or a speaking character | Use `creativeclaw-generate-voiceover` and `generate_speech` |
| Sound effect, Foley, transition, impact, texture, or ambience | `generate_audio` with `sfx/elevenlabs-sound-v2` |
| Music, score, bed, sting, jingle, or song | `generate_audio` with `music/elevenlabs-music-v1` |
| Add one finished audio track to video | `merge_media` with `operation: "merge_audio_video"` |
| Join audio clips one after another | `merge_media` with `operation: "merge_audios"` |

Do not send a sound-effect or music model to `generate_speech`. Do not describe concatenation as mixing: `merge_audios` joins clips sequentially and does not layer narration, music, and effects.

## Workflow

1. Identify the result as speech, sound effect, ambience, or music. Clarify duration and whether the audio must loop, end cleanly, contain vocals, or match picture.
2. Call `list_models({ category: "audio" })`, choose the exact model, and call `get_model_params` before using model-specific fields.
3. Write a production prompt. Read [references/prompting.md](references/prompting.md) for the relevant sound-effect or music pattern.
4. State the model, duration, and consequential settings before a long music track or batch.
5. Call `generate_audio`. Keep each requested variation as a separate generation so the user can audition it independently.
6. Listen for timing, unwanted voices, clipping, noise, loop seams, weak endings, and whether the sound matches the described space and intensity. Revise the prompt based on the audible defect.
7. Preserve the approved permanent audio URL. Name and tag the asset when useful for a larger project.
8. If the audio must accompany video, first make one final audio track, then use `merge_media({ operation: "merge_audio_video", video_url, audio_url })`. Resolve queued merge work with `check_job`.

## Sound-effect contract

Use `model: "sfx/elevenlabs-sound-v2"`.

- `prompt` describes the audible event or environment.
- `duration_seconds` is optional and accepts 0.5–30. Omit it when the natural event length is more important than exact timing.
- `loop: true` requests a seamless ambience or texture loop. Avoid one-shot attacks and resolved endings in a loop prompt.
- `prompt_influence` accepts 0–1. Higher values follow the wording more literally; lower values allow more variation. Start with the model default unless the result drifts from a specific cue.
- Use a supported `output_format` returned by `get_model_params`; the normal default is MP3.

## Music contract

Use `model: "music/elevenlabs-music-v1"`.

- `prompt` describes the musical result and is limited to 4,100 characters.
- `music_length_ms` accepts 3,000–600,000. Creative Claw defaults to 30,000 ms when omitted. Set it explicitly when the music must fit a video or edit.
- `force_instrumental` defaults to `true` in Creative Claw. Set it to `false` only when vocals are wanted, and describe the vocal role in the prompt.
- Prompt-only music can specify structure in prose. Do not invent a `composition_plan` field; it is not exposed by the current MCP tool.

## Completion standard

Return the permanent audio asset and identify what was generated, the model, duration setting, and whether it loops or contains vocals. When pairing with video, distinguish the generated audio asset from the separately merged video result.
