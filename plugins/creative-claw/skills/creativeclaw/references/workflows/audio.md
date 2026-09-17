# Speech and audio workflow

Creative Claw generates speech, sound effects, ambience, Foley, and music; creates consented reusable voice clones; transcribes media; isolates voice recordings; and combines one finished audio track with video.

## Route the request

- New narration, dialogue, or character voice → `generate_speech`.
- Sound effect, Foley, transition, impact, ambience, or loop → use `creativeclaw-generate-sound-effects` and `generate_sound_effect` with `sfx/elevenlabs-sound-v2`.
- Music, score, bed, sting, jingle, or song → use `creativeclaw-generate-music` and `generate_music` with `music/elevenlabs-music-v2.5`.
- Reusable custom voice from a recording → use the separate `creativeclaw-clone-voice` skill.
- Transcript and timings from audio, video, or a public YouTube URL → `transcribe`.
- Remove noise, music, or reverb from speech → `isolate_audio`.
- Add an existing voice/music track to video or concatenate audio → `merge_media`.

`generate_speech` cannot produce music or sound effects by changing its model ID. Use `generate_music` for music and `generate_sound_effect` for sound effects. The retired combined `generate_audio` tool remains callable only for cached legacy clients. `merge_audios` concatenates clips and does not layer them into a mix.

Import source audio through `../platform-upload.md` first.

## Speech model picker

Call `list_models({ category: "speech" })` and `get_model_params` before generation.

| Need                                                            | Model                  | Use                                                                                           |
| --------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| Steady professional narration and existing voice clones | `speech/elevenlabs-v2` | 29 languages; punctuation and sparse SSML breaks, no square-bracket performance tags. |
| Expressive acting, audio tags, broader language coverage | `speech/elevenlabs-v3` | Emotional delivery and reactions; no SSML breaks. |
| Fast natural stock or Character speech | `speech/cartesia-sonic` | Public Voice Library IDs or private Character voices, with direct emotion, speed, and volume controls. Use `creativeclaw-cartesia-sonic`. |
| Broad voice and language selection with global emotion controls | `speech/minimax-hd`    | 300+ voices and 30+ languages. Use `creativeclaw-minimax-speech`.                              |
| Two-speaker dialogue in one call                                | `speech/dia-tts`       | Use `[S1]` and `[S2]` plus supported nonverbal cues.                                          |
| Emotive performance tags                                        | `speech/orpheus`       | Supports cues such as `<laugh>`, `<sigh>`, and `<gasp>`.                                      |
| Expressive or telephony-ready output                            | `speech/xai-tts`       | 28 voices, inline/wrapping tags, multilingual and G.711 formats. Use `creativeclaw-xai-tts`.  |
| Cheap clean draft                                               | `speech/kokoro`        | Fast low-cost testing.                                                                        |

For one-off matching from an authorized reference recording, use `speech/chatterbox` with `creativeclaw-chatterbox`. Keep reusable Character voices in the consent-gated clone workflow.

## Cartesia Sonic

Use `creativeclaw-cartesia-sonic` for the full stock and Character voice workflow. Call `get_model_params({ model: "speech/cartesia-sonic" })` for the curated Featured shortlist and exact IDs. Any other exact public Cartesia Voice Library ID is also supported. Pass `voice_id` for stock speech or `character_id` for a private clone, never both.

## ElevenLabs Multilingual v2

Use `creativeclaw-elevenlabs-v2` for the full professional narration workflow. Reuse a saved Character or supported stock voice. Language is detected from text; no `language_code`. Pass `extras.voice_settings` with stability, similarity_boost, style, use_speaker_boost and speed. V2 supports `extras.previous_text`/`next_text` for continuity. It is a TTS model, not PVC. Recommend 1–2 minute recordings when creating IVC: 1 minute minimum recommended, 3 minutes maximum recommended; these are quality guidelines.

## ElevenLabs v3

- Use a suitable `voice_id`; omitting it uses the server default.
- Add sparse supported tags such as `[whispers]`, `[excited]`, `[laughs]`, `[sighs]`, or `[pause]`. Do not stack tags or invent them.
- Use `extras.voice_settings` to adjust stability (0, 0.5, 1) and speed (0.7–1.2); legacy similarity/style/speaker boost are ignored for v3. Lower stability is more expressive; higher stability is more consistent but may flatten tags.
- For long copy, split at natural paragraph boundaries and use discovered continuity fields such as `previous_text`/`next_text` only when supported by the schema.

## ElevenLabs voice cloning

Use `creativeclaw-clone-voice` for the complete consent, recording, import, replacement, cloning, and audition workflow. Creative Claw uses ElevenLabs Instant Voice Cloning through `clone_voice`, attaches the resulting voice to a Character, and reuses it with `generate_speech({ character_id, model: "speech/elevenlabs-v2", text })`.

Never set `consent: true` unless the user explicitly confirms that the voice is their own or the speaker authorized cloning and use. Do not silently replace an existing Character voice.

## xAI TTS

Use `creativeclaw-xai-tts` for its complete voice catalog and exact tag grammar. Square-bracket tags such as `[pause]`, `[laugh]`, and `[sigh]` insert an event; angle-bracket tags such as `<whisper>…</whisper>` and `<build-intensity>…</build-intensity>` style a span. Do not reuse ElevenLabs forms such as `[laughs]`, `[whispers]`, or `[excited]` with xAI.

## Transcription and cleanup

1. For a public YouTube video, pass its watch or short URL directly to `transcribe({ video_url })`. For other media, import the source audio/video first.
2. Use `isolate_audio` first only when noise, music, or reverb will materially hurt transcription.
3. Resolve its queued job with `check_job({ job_id })` when the cleaned URL is required.
4. Use `transcribe` for text and timing. Public YouTube URLs are sent directly to ElevenLabs Scribe, like other supported direct media, and provide word-level timing and speaker diarization.
5. Preserve the original asset and save the cleaned/transcribed derivative with clear metadata.

## Quality gate

Listen for pronunciation, clipped words, unnatural pauses, incorrect language/accent, tag leakage, background artifacts, and loudness changes between chunks. Regenerate only the bad segment when possible, then join approved audio with `merge_media`.
