---
name: creativeclaw-cartesia-sonic
description: "Generate fast, natural stock or cloned Character speech with Cartesia Sonic in Creative Claw. Use when the user requests Cartesia, wants direct emotion, speed, or volume controls, or wants to compare voice providers."
---

# Creative Claw Cartesia Sonic

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers model discovery, optional cost checks, imports, and recovery.

Use `speech/cartesia-sonic` for fast, natural speech from a public stock voice or a saved consented Character voice. The Creative Claw model ID stays stable while the underlying Cartesia Sonic version can be upgraded.

## Choose deliberately

Cartesia is a strong first choice for low latency, direct primary emotion control, and simple speed or volume adjustments. ElevenLabs v2 is a strong first choice for steady professional narration. ElevenLabs v3 is a strong first choice for acted delivery with inline audio tags.

Honor an explicit model choice. Never switch providers silently. When the first result misses the intended voice or performance, offer a controlled comparison using the same text, language, pacing, and output format.

## Choose a voice

Call `get_model_params({ model: "speech/cartesia-sonic" })` before generation. It returns the current curated Featured catalog with exact IDs, language, locale, gender, description, use cases, and the full Cartesia Voice Library URL.

Use exactly one selector:

- `voice_id` selects a stock voice. Any exact public Cartesia Voice Library ID is supported, not only the curated shortlist.
- `character_id` selects a private cloned Character voice. If the Character has a retained consented source but no Cartesia provider copy, Creative Claw creates it lazily and stores it for reuse.

Do not combine `voice_id` and `character_id`. Choose by target language and regional accent first, then by use case and delivery. Prefer the runtime curated shortlist when the user does not request a specific library voice.

The current shortlist covers:

- English: Skylar, Daniel, Gemma, Parker, Archie, Jacqueline, Lauren, Jameson
- Arabic: Hassan, Raed, Reem, Rania
- Hindi: Siya, Rohan, Anuj, Neha
- Hebrew: Ayala, Noam, Yarden, Gil
- Spanish: Ximena, Ramon, Adriana, Rafael
- French: Inès, Mathis, Henri, Jade
- German: Sebastian, Moritz, Marlene, Vreni
- Portuguese: Helena, Tiago, Eloá
- Japanese: Yuto, Naoki, Aiko
- Chinese: Feng, Jing

Names are discovery aids, not selectors. Always use the exact `voice_id` returned by `get_model_params` or copied from the public Cartesia library.

## Generate

1. Preserve the user's script and requested language.
2. Choose a public `voice_id` or private `character_id`.
3. Keep performance direction in punctuation and model controls, not as bracketed text that may be spoken.
4. Call `generate_speech` with `model: "speech/cartesia-sonic"`.
5. Listen for identity, accent, pronunciation, emotional fit, pace, clipping, and artifacts.
6. For another audition, change one control at a time. Do not silently change the voice or provider.

Required top-level fields:

- `model: "speech/cartesia-sonic"`
- `text`

Optional top-level fields:

- `voice_id` or `character_id`
- `emotion`: `neutral`, `angry`, `excited`, `content`, `sad`, or `scared`
- `speed`: `0.6` to `1.5`, starting at `1.0`
- `format`: `wav`, `mp3`, or `pcm`
- `sample_rate`: use a value returned by `get_model_params`

Optional fields inside `extras`:

- `volume`: `0.5` to `2.0`, starting at `1.0`
- `language_code`: use a value returned by `get_model_params`, especially for short, ambiguous, or multilingual text

Do not pass ElevenLabs `voice_settings`, v3 square-bracket audio tags, `audio_url`, or `language_boost` to Cartesia.

## Starting points

- Neutral narration: `emotion: "neutral"`, `speed: 1`, `extras.volume: 1`
- Energetic advertisement: `emotion: "excited"`, `speed: 1.05`
- Warm delivery: `emotion: "content"`, `speed: 0.96`
- Tense dialogue: `emotion: "scared"` or `"angry"`, supported by natural punctuation

Emotion is guidance, not a strict transformation. Split the script when its emotional direction changes materially. Use SSML only after checking current runtime guidance, and keep it sparse.

Stock voice example:

```json
{
  "model": "speech/cartesia-sonic",
  "voice_id": "<public Cartesia voice ID from get_model_params>",
  "text": "Welcome. Today we will show you how to get started.",
  "emotion": "neutral",
  "speed": 1,
  "format": "mp3",
  "sample_rate": "44100",
  "extras": {
    "volume": 1,
    "language_code": "en"
  }
}
```

Private Character example:

```json
{
  "model": "speech/cartesia-sonic",
  "character_id": "<Character UUID>",
  "text": "Ready to turn one idea into your next campaign?",
  "emotion": "excited",
  "speed": 1.05,
  "format": "mp3",
  "extras": {
    "volume": 1.05,
    "language_code": "en"
  }
}
```

## Sources

- [Cartesia TTS bytes API](https://docs.cartesia.ai/api-reference/tts/bytes)
- [Cartesia voice controls](https://docs.cartesia.ai/build-with-cartesia/capability-guides/volume-speed-emotion)
- [Cartesia SSML guidance](https://docs.cartesia.ai/build-with-cartesia/capability-guides/ssml-tags)
