---
name: creativeclaw-generate-voiceover
description: "Create narration, dialogue, or expressive speech with Creative Claw. Use for general text-to-speech and voiceover work; use the separate clone-voice skill when the user wants a new reusable custom voice."
---

# Generate Voiceover

Turn a script into performance-ready speech, normally with ElevenLabs v3. This skill owns casting, direction, generation, review, and delivery; model specialists contain deeper voice and performance guidance.

## Workflow

1. Confirm language, audience, speaker count, pronunciation, pace, mood, and target runtime.
2. Preserve the user's words. Ask before materially rewriting an approved script.
3. When the user asks for voice or audio examples, performance ideas, or a close starting point, use `creativeclaw-find-examples` with `output_type: "audio"`; load only the selected result. Do not search when the direction and script are already clear.
4. Call `list_models({ modality: "speech" })`, select `speech/elevenlabs-v3` by default, then call `get_model_params`.
5. Choose a stock `voice_id`, or pass a saved `character_id` whose consented ElevenLabs clone should speak.
6. Add ElevenLabs v3 performance tags and punctuation deliberately. Keep `agentic_prompting: false` when exact script wording or control tags must survive unchanged.
7. Call `generate_speech`. Generate each speaker separately so casting, pacing, and revisions stay controllable.
8. Audition the result for pronunciation, emotional arc, pacing, clipping, and consistency. Regenerate only the weak section when practical.
9. Use `merge_media` when approved segments must become a single audio track or be muxed with video.

Conduct casting and review in the user's language. Preserve the supplied script and its writing system, and verify model or voice language support instead of translating unless the user asks.

## Tool contract

- `text` is required and is limited by the current tool schema; split long scripts on scene or paragraph boundaries.
- `voice_id` selects a stock voice. `character_id` selects a saved Character's cloned ElevenLabs voice.
- `audio_url` is not a general reference for ElevenLabs speech; it is exposed only for models that support audio prompting.
- `emotion` is model-specific. ElevenLabs v3 and xAI TTS use their own documented in-text performance controls instead of a generic emotion value.
- Inspect runtime support before setting `speed`, `format`, `sample_rate`, `language_boost`, or other advanced options.

## Casting and direction

Use `creativeclaw-elevenlabs-v3` after routing to ElevenLabs for recommended voices, multilingual guidance, emotional tags, multi-speaker handling, and pronunciation strategy. Use `creativeclaw-xai-tts` after routing to xAI TTS for its 28 built-in voices, exact square-bracket events, wrapping delivery tags, language codes, and telephony formats. Keep a stable voice ID across a project. For a new custom voice, use `creativeclaw-clone-voice`; cloning requires explicit consent and a valid sample.

## Completion standard

Deliver or save the approved audio URL with useful metadata. For film work, keep each shot's narration asset addressable; do not claim that film assembly automatically mixes every per-shot audio file.
