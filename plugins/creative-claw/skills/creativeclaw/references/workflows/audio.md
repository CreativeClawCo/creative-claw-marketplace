# Speech and audio workflow

Creative Claw generates speech, clones consented voices, transcribes media, isolates voice recordings, and combines audio with video. The current generation tool is speech-focused; do not invent a separate music or sound-effect generator when one is not exposed.

## Route the request

- New narration, dialogue, or character voice → `generate_speech`.
- Reusable voice identity → create/update a Character with consented sample audio, or use `clone_voice`.
- Transcript and timings → `transcribe`.
- Remove noise, music, or reverb from speech → `isolate_audio`.
- Add an existing voice/music track to video or concatenate audio → `merge_media`.

Import source audio through `../platform-upload.md` first.

## Speech model picker

Call `list_models({ category: "speech" })` and `get_model_params` before generation.

| Need                                                            | Model                  | Use                                                                                           |
| --------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| General narration, multilingual speech, expressive delivery     | `speech/elevenlabs-v3` | Default; natural speech, curated voices, inline audio tags, timestamps, and Character voices. |
| Broad voice and language selection with global emotion controls | `speech/minimax-hd`    | 300+ voices and 30+ languages.                                                                |
| Two-speaker dialogue in one call                                | `speech/dia-tts`       | Use `[S1]` and `[S2]` plus supported nonverbal cues.                                          |
| Clone from a reference sample within one generation             | `speech/chatterbox`    | Pass `audio_url`; use its supported angle-bracket cues, not ElevenLabs tags.                  |
| Emotive performance tags                                        | `speech/orpheus`       | Supports cues such as `<laugh>`, `<sigh>`, and `<gasp>`.                                      |
| Expressive or telephony-ready output                            | `speech/xai-tts`       | Five voices, inline/wrapping tags, multilingual and G.711 formats.                            |
| Cheap clean draft                                               | `speech/kokoro`        | Fast low-cost testing.                                                                        |

## ElevenLabs v3

- Use a suitable `voice_id`; omitting it uses the server default.
- Add sparse supported tags such as `[whispers]`, `[excited]`, `[laughs]`, `[sighs]`, or `[pause]`. Do not stack tags or invent them.
- Use `extras.voice_settings` to adjust stability, similarity, and speed. Lower stability is more expressive; higher stability is more consistent but may flatten tags.
- For long copy, split at natural paragraph boundaries and use discovered continuity fields such as `previous_text`/`next_text` only when supported by the schema.
- For a saved Character with a cloned voice, pass `character_id`; do not also select an unrelated voice.

## Voice cloning

Only clone a voice after the user confirms they own it or have the speaker's permission. Set `consent: true` only after that confirmation.

Use 30 seconds to a few minutes of one clean speaker, with no music, little reverb, and natural delivery. Import the sample, then either:

```text
manage_character({ id, audio_url, consent: true })
```

or:

```text
clone_voice({ character_id, audio_url, consent: true })
```

Afterward, `generate_speech({ character_id, text })` uses the saved cloned voice.

## Transcription and cleanup

1. Import the source audio/video.
2. Use `isolate_audio` first only when noise, music, or reverb will materially hurt transcription or cloning.
3. Resolve its queued job with `check_job({ job_id })` when the cleaned URL is required.
4. Use `transcribe` for text and word-level timing.
5. Preserve the original asset and save the cleaned/transcribed derivative with clear metadata.

## Quality gate

Listen for pronunciation, clipped words, unnatural pauses, incorrect language/accent, tag leakage, background artifacts, and loudness changes between chunks. Regenerate only the bad segment when possible, then join approved audio with `merge_media`.
