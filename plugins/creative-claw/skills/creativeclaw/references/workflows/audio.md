# Speech and audio workflow

Creative Claw generates speech, sound effects, ambience, Foley, and music; designs new synthetic voices; creates consented reusable voice clones; transcribes media; isolates voice recordings; and combines one finished audio track with video.

## Route the request

- New narration, dialogue, or character voice → `generate_speech`.
- Change who is speaking in an existing speech recording while keeping the performance → `generate_speech` with `model: "speech/cartesia-voice-changer"`, `audio_url` = the workspace speech audio, and a Cartesia `voice_id` or a Character's `character_id`. Pass no `text`.
- Sound effect, Foley, transition, impact, ambience, or loop → use `creativeclaw-generate-sound-effects` and `generate_sound_effect` with `sfx/elevenlabs-sound-v2`.
- Music, score, bed, sting, jingle, or song → use `creativeclaw-generate-music` and `generate_music`: `music/lyria-3.5` by default, `music/elevenlabs-music-v2.5` for exact length or stings under 30 s, `music/minimax-music-3` for lyrics-led songs.
- New reusable voice: consenting speaker's recording → `creativeclaw-clone-voice`; description → `design_voice` (`creativeclaw-generate-voiceover`); stock → `manage_character` with `voice_model`/`voice_id`.
- Transcript and timings from audio, video, or a public YouTube URL → `transcribe`.
- Remove noise, music, or reverb from speech → `isolate_audio`.
- Add an existing voice/music track to video or concatenate audio → `merge_media`. `merge_audio_video` replaces the clip's audio by default; `audio_mode: "mix"` keeps it and layers the new track.
- Build a video from timed images or clips with optional soundtrack → `merge_media` with `operation:"compose_video"`; see [assembly guidance](../media-assembly.md).

`generate_speech` cannot produce music or sound effects by changing its model ID. Use `generate_music` for music and `generate_sound_effect` for sound effects. The retired combined `generate_audio` tool remains callable only for cached legacy clients. `merge_audios` concatenates clips and does not layer them into a mix.

Import source audio through `../platform-upload.md` first.

## Speech model picker

Call `list_models({ category: "speech" })` and `get_model_params` before generation.

| Need                                                            | Model                  | Use                                                                                           |
| --------------------------------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------- |
| Steady read from an ElevenLabs clone | `speech/elevenlabs-v2` | 29 languages; punctuation and sparse SSML breaks, no square-bracket performance tags. |
| Default for stock speech, audio tags, broad language coverage, multi-speaker dialogue, or expressive delivery from an ElevenLabs clone | `speech/elevenlabs-v4` | Contextual delivery and reactions; up to 10 voices through `extras.dialogue`. |
| Cartesia clones, or fast natural stock speech | `speech/cartesia-sonic` | Public Voice Library IDs or private Character voices, with direct emotion, speed, and volume controls. Use cartesia-sonic model reference. |
| Change the voice in an existing speech recording | `speech/cartesia-voice-changer` | `audio_url` plus a Cartesia `voice_id` or a Character's `character_id`; no `text`. Keeps the original performance. |
| Broad voice and language selection with global emotion controls | `speech/minimax-hd`    | 300+ voices and 30+ languages. Use minimax-speech model reference.                              |
| Alternative two-speaker dialogue in one call | Google Flash or Flash-Lite TTS | Read `get_model_params` for that model's dialogue schema and stock voices. |
| Emotive performance tags                                        | `speech/orpheus`       | Supports cues such as `<laugh>`, `<sigh>`, and `<gasp>`.                                      |
| Expressive or telephony-ready output                            | `speech/xai-tts`       | 28 voices, inline/wrapping tags, multilingual and G.711 formats. Use xai-tts model reference.  |

For one-off matching from an authorized reference recording, use `speech/chatterbox` with chatterbox model reference. Keep reusable Character voices in the consent-gated clone workflow.

## Cartesia Sonic

Use cartesia-sonic model reference for the full stock and Character voice workflow. Call `get_model_params({ model: "speech/cartesia-sonic" })` for the curated Featured shortlist and exact IDs. Any other exact public Cartesia Voice Library ID is also supported. Pass `voice_id` for stock speech or `character_id` for a private clone, never both.

## ElevenLabs Multilingual v2

Use the elevenlabs-v2 model reference for a steady read from an ElevenLabs clone. Use v4 for stock voices and general professional narration, and Cartesia Sonic for a Cartesia clone. V2 detects language from text and has no `language_code`. Pass `extras.voice_settings` with stability, similarity_boost, style, use_speaker_boost and speed. V2 supports `extras.previous_text` and `next_text` for continuity. It is a TTS model, not PVC. Recommend 1 to 2 minute recordings when creating IVC: 1 minute minimum recommended, 3 minutes maximum recommended; these are quality guidelines.

## ElevenLabs v4

- Read [the v4 guide](../voices/elevenlabs-v4-guide.md) and choose a suitable public `voice_id` or saved `character_id`. Omitting both uses the server's stock default.
- Use sparse audible tags such as `[whispers]`, `[excited]`, `[laughs]`, or `[long pause]`. Test sound effects and pronunciation.
- V4 supports Stability and Similarity in `extras.voice_settings`; it does not support speed, style, speaker boost, or SSML in this route.
- For one request with several speakers, pass `extras.dialogue` as ordered turns, each with a voice selector. Omit top-level `text`, or pass `text: ""` if a cached client schema requires it.
- V3 is legacy. Use it only when the user asks for it, with its [legacy guide](../voices/elevenlabs-v3.md) for its distinct settings.

## Voice cloning and design

Use `creativeclaw-clone-voice` for the complete consent, recording, import, replacement, cloning, and audition workflow. `clone_voice` makes a Cartesia clone by default, or an ElevenLabs clone with `provider: "elevenlabs"`, and saves it on a Character; without `character_id` it creates a voice-only Character. Reuse it with `generate_speech({ character_id, model, text })` on its provider's model: Cartesia Sonic for a Cartesia clone; ElevenLabs v2 (steady) or v4 (expressive, dialogue) for an ElevenLabs clone.

For a new voice from a description, use `design_voice` (see `creativeclaw-generate-voiceover`): three auditions, then save the pick to a Character. Designed ElevenLabs voices speak with v4; Google-designed voices with `speech/gemini-3.8-flash-tts`.

Call `clone_voice` only after the user explicitly confirms that the voice is their own or the speaker authorized cloning and use; the `consent` input is ignored. Do not silently replace an existing Character voice.

## xAI TTS

Use xai-tts model reference for its complete voice catalog and exact tag grammar. Square-bracket tags such as `[pause]`, `[laugh]`, and `[sigh]` insert an event; angle-bracket tags such as `<whisper>…</whisper>` and `<build-intensity>…</build-intensity>` style a span. Do not reuse ElevenLabs forms such as `[laughs]`, `[whispers]`, or `[excited]` with xAI.

## Transcription and cleanup

1. Pass a public video page (YouTube, TikTok, Instagram, X, Facebook, Vimeo), a public Google Drive share link, or a public media file URL directly to `transcribe({ video_url })`. Import the file first only when it is attached, local, or the page is private.
2. Use `isolate_audio` first only when noise, music, or reverb will materially hurt transcription.
3. Resolve its queued job with `check_job({ job_id })` when the cleaned URL is required.
4. Use `transcribe` for text and timing. YouTube links return the video's existing captions with segment timing only, with no word timing or speakers. Other sources use ElevenLabs Scribe with word-level timing and speaker diarization. For word-level timing on a YouTube video, or when it has no captions, import the file and transcribe that.
5. Preserve the original asset and save the cleaned/transcribed derivative with clear metadata.

## Quality gate

Listen for pronunciation, clipped words, unnatural pauses, incorrect language/accent, tag leakage, background artifacts, and loudness changes between chunks. Regenerate only the bad segment when possible, then join approved audio with `merge_media`.
