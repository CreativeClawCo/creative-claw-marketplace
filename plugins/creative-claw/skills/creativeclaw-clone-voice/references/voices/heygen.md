# HeyGen Voice

Use `speech/heygen-voice-1` when the user requests HeyGen speech. Read its current `get_model_params` before generation. Choose a curated public `voice_id` or an existing consented HeyGen instant clone by `character_id`.

## Choose and audition

`get_model_params` contains 40 curated public voices with delivery descriptions and preview links. Set `include_voice_catalog: true` for a longer selection. Browse [HeyGen voices](https://creativeclaw.co/voices/heygen/) or read the [agent catalog](https://creativeclaw.co/voices/heygen.md). Other exact public Orca IDs are accepted after public-library verification. A provider voice ID alone never authorizes a private clone.

HeyGen's curated stock collection includes Lucian (conversational), Elowen (soothing), Cecily (friendly), Ewan (energetic), Jonah (professional), Simon (gentle), Soren (measured), Meredith (serious), and Vincent (thoughtful). These labels describe intended delivery, not a universal quality ranking. Match language, accent and purpose, then audition a short passage.

## Delivery controls

| Voice selection | Controls | Script |
| --- | --- | --- |
| Public stock `voice_id` | `extras.speed` from 0.5 to 2, default 1. Optional `extras.language`. | Plain prose. Only `<break time="0.5s"/>` pause tags, and only when the voice reports `supportPause: true`. |
| Existing instant-clone `character_id` | `extras.expressiveness_boost` from 0 to 1, default 0.5. Optional `extras.language`. | Plain prose without SSML or acting tags. |

For instant clones, 0.5 is HeyGen's recommendation for speaker likeness. Try 0.8 or 1 for stronger expressiveness, then compare. Speed, pitch and seed do not work with instant clones. Public stock voices do not accept expressiveness boost. Use punctuation and an appropriate stock voice to shape delivery. Do not copy ElevenLabs square-bracket tags into HeyGen text.

Text accepts 1 to 5,000 Unicode characters. Write the exact words in the target language. `extras.language` uses a base code such as `en`, `he` or `es`; regional tags normalize to the base language. Availability depends on the stock voice. A multilingual label does not guarantee a native accent in every language.

```json
{"model": "speech/heygen-voice-1", "voice_id": "049413e41c334753984c294d694afb5c", "text": "Welcome. <break time=\"0.5s\"/> Let us begin.", "extras": {"speed": 1, "language": "en"}}
```

```json
{"model":"speech/heygen-voice-1","character_id":"<existing HeyGen-cloned Character UUID>","text":"Welcome. Let us begin.","extras":{"expressiveness_boost":0.5,"language":"en"}}
```

## Scope and results

Professional clone pitch, speed and seed controls, streaming, multi-speaker dialogue, new HeyGen clone creation and novel voice design are not connected by this model. Another provider's Character is not automatically copied into HeyGen. Use an existing HeyGen-cloned Character or a public stock voice.

`generate_speech` returns a queued job. Use the native player to listen, or `check_job` when the completed audio is needed by another step. The output is saved in the workspace media library. Do not submit the same request again while it is running. For an avatar performance, generate speech first and pass the completed audio URL as `extras.audio_url` to `video/heygen-avatar-4`, with a face `image_url`. Keep voice expression and avatar motion controls separate.

[HeyGen stock speech guidance](https://developers.heygen.com/docs/voices/speech), [instant clone speech controls](https://developers.heygen.com/docs/voices/heygen-voice-speech).
