---
name: creativeclaw-generate-voiceover
description: "Create narration, dialogue, or expressive speech with Creative Claw. Use for general text-to-speech and voiceover work; use the separate clone-voice skill when the user wants a new reusable custom voice."
---

# Generate Voiceover

Turn a script into performance-ready speech, normally with ElevenLabs v3. This skill owns casting, direction, generation, review, and delivery; the ElevenLabs specialist contains deeper voice and emotion guidance.

## Workflow

1. Confirm language, audience, speaker count, pronunciation, pace, mood, and target runtime.
2. Preserve the user's words. Ask before materially rewriting an approved script.
3. Call `list_models({ modality: "speech" })`, select `speech/elevenlabs-v3` by default, then call `get_model_params`.
4. Choose a stock `voice_id`, or pass a saved `character_id` whose consented ElevenLabs clone should speak.
5. Add ElevenLabs v3 performance tags and punctuation deliberately. Keep `agentic_prompting: false` when exact script wording or control tags must survive unchanged.
6. Call `generate_speech`. Generate each speaker separately so casting, pacing, and revisions stay controllable.
7. Audition the result for pronunciation, emotional arc, pacing, clipping, and consistency. Regenerate only the weak section when practical.
8. Use `merge_media` when approved segments must become a single audio track or be muxed with video.

Conduct casting and review in the user's language. Preserve the supplied script and its writing system, and verify model or voice language support instead of translating unless the user asks.

## Tool contract

- `text` is required and is limited by the current tool schema; split long scripts on scene or paragraph boundaries.
- `voice_id` selects a stock voice. `character_id` selects a saved Character's cloned ElevenLabs voice.
- `audio_url` is not a general reference for ElevenLabs speech; it is exposed only for models that support audio prompting.
- `emotion` is model-specific and is not the primary ElevenLabs v3 control. Use natural script structure and supported audio tags instead.
- Inspect runtime support before setting `speed`, `format`, `sample_rate`, `language_boost`, or other advanced options.

## Casting and direction

Use `creativeclaw-elevenlabs-v3` after routing to ElevenLabs for recommended voices, multilingual guidance, emotional tags, multi-speaker handling, and pronunciation strategy. Keep a stable voice ID across a project. For a new custom voice, use `creativeclaw-clone-voice`; cloning requires explicit consent and a valid sample.

## Completion standard

Deliver or save the approved audio URL with useful metadata. For film work, keep each shot's narration asset addressable; do not claim that film assembly automatically mixes every per-shot audio file.
