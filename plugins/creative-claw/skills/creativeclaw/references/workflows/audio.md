# Speech and audio workflow

Creative Claw generates speech, sound effects, ambience, Foley, and music; creates consented ElevenLabs voice clones; transcribes media; isolates voice recordings; and combines one finished audio track with video.

## Route the request

- New narration, dialogue, or character voice → `generate_speech`.
- Sound effect, Foley, transition, impact, ambience, or loop → use `creativeclaw-generate-audio` with `sfx/elevenlabs-sound-v2`.
- Music, score, bed, sting, jingle, or song → use `creativeclaw-generate-audio` with `music/elevenlabs-music-v1`.
- Reusable custom voice from a recording → use the separate `creativeclaw-clone-voice` skill.
- Transcript and timings → `transcribe`.
- Remove noise, music, or reverb from speech → `isolate_audio`.
- Add an existing voice/music track to video or concatenate audio → `merge_media`.

`generate_speech` cannot produce music or sound effects by changing its model ID; those outputs use the separate `generate_audio` contract. `merge_audios` concatenates clips and does not layer them into a mix.

Import source audio through `../platform-upload.md` first.

## Speech model picker

Call `list_models({ category: "speech" })` and `get_model_params` before generation.

| Need                                                            | Model                  | Use                                                                                           |
| --------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| General narration, multilingual speech, expressive delivery     | `speech/elevenlabs-v3` | Default; natural speech, curated voices, inline audio tags, and timestamps.                   |
| Broad voice and language selection with global emotion controls | `speech/minimax-hd`    | 300+ voices and 30+ languages. Use `creativeclaw-minimax-speech`.                              |
| Two-speaker dialogue in one call                                | `speech/dia-tts`       | Use `[S1]` and `[S2]` plus supported nonverbal cues.                                          |
| Emotive performance tags                                        | `speech/orpheus`       | Supports cues such as `<laugh>`, `<sigh>`, and `<gasp>`.                                      |
| Expressive or telephony-ready output                            | `speech/xai-tts`       | 28 voices, inline/wrapping tags, multilingual and G.711 formats. Use `creativeclaw-xai-tts`.  |
| Cheap clean draft                                               | `speech/kokoro`        | Fast low-cost testing.                                                                        |

For one-off matching from an authorized reference recording, use `speech/chatterbox` with `creativeclaw-chatterbox`. Keep reusable Character voices in the consent-gated ElevenLabs clone workflow.

## ElevenLabs v3

- Use a suitable `voice_id`; omitting it uses the server default.
- Add sparse supported tags such as `[whispers]`, `[excited]`, `[laughs]`, `[sighs]`, or `[pause]`. Do not stack tags or invent them.
- Use `extras.voice_settings` to adjust stability, similarity, and speed. Lower stability is more expressive; higher stability is more consistent but may flatten tags.
- For long copy, split at natural paragraph boundaries and use discovered continuity fields such as `previous_text`/`next_text` only when supported by the schema.

## ElevenLabs voice cloning

Use `creativeclaw-clone-voice` for the complete consent, recording, import, replacement, cloning, and audition workflow. Creative Claw uses ElevenLabs Instant Voice Cloning through `clone_voice`, attaches the resulting voice to a Character, and reuses it with `generate_speech({ character_id, model: "speech/elevenlabs-v3", text })`.

Never set `consent: true` unless the user explicitly confirms that the voice is their own or the speaker authorized cloning and use. Do not silently replace an existing Character voice.

## xAI TTS

Use `creativeclaw-xai-tts` for its complete voice catalog and exact tag grammar. Square-bracket tags such as `[pause]`, `[laugh]`, and `[sigh]` insert an event; angle-bracket tags such as `<whisper>…</whisper>` and `<build-intensity>…</build-intensity>` style a span. Do not reuse ElevenLabs forms such as `[laughs]`, `[whispers]`, or `[excited]` with xAI.

## Transcription and cleanup

1. Import the source audio/video.
2. Use `isolate_audio` first only when noise, music, or reverb will materially hurt transcription.
3. Resolve its queued job with `check_job({ job_id })` when the cleaned URL is required.
4. Use `transcribe` for text and word-level timing.
5. Preserve the original asset and save the cleaned/transcribed derivative with clear metadata.

## Quality gate

Listen for pronunciation, clipped words, unnatural pauses, incorrect language/accent, tag leakage, background artifacts, and loudness changes between chunks. Regenerate only the bad segment when possible, then join approved audio with `merge_media`.
