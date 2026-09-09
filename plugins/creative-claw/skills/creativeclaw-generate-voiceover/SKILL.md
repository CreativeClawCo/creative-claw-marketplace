---
name: creativeclaw-generate-voiceover
description: "Create narration, dialogue, or expressive speech with Creative Claw. Use for general text-to-speech and voiceover work; use the separate clone-voice skill when the user wants a new reusable custom voice."
---

# Generate Voiceover

Turn a script into performance-ready speech, normally with ElevenLabs v3. This skill owns casting, direction, generation, review, and delivery; model specialists contain deeper voice and performance guidance.

## Workflow

1. Use supplied script, language, speaker, and delivery choices. Infer minor defaults; ask only for a missing choice that materially changes the performance.
2. Preserve the user's words. Ask before materially rewriting an approved script.
3. Call `get_model_params` for the selected speech model and choose from its supported voice catalog by script language, regional accent, and delivery. Offer two suitable voices when the user wants a choice. Do not use `search_examples` or `get_example` for voice selection. Generate short auditions only when requested.
4. Default to `speech/elevenlabs-v3` and fetch missing settings with `get_model_params`. Use `list_models({ category: "speech" })` only when discovering alternatives. Estimate with `operation: "speech"` only for user-requested cost/budget help.
5. Choose a stock `voice_id`, or pass a saved `character_id` whose consented ElevenLabs clone should speak.
6. Preserve exact wording in `text`; add performance tags only when consistent with the requested delivery. `generate_speech` does not expose `agentic_prompting`; do not send it.
7. Call `generate_speech`. Generate each speaker separately so casting, pacing, and revisions stay controllable.
8. Audition the result for pronunciation, emotional arc, pacing, clipping, and consistency. Regenerate only the weak section when practical.
9. Use `merge_media` when approved segments must become a single audio track or be muxed with video.

Conduct casting and review in the user's language. Preserve the supplied script and its writing system, and verify model or voice language support instead of translating unless the user asks.

## Tool contract

- `text` is required and is limited by the current tool schema; split long scripts on scene or paragraph boundaries.
- `voice_id` selects a stock voice. `character_id` selects a saved Character's cloned ElevenLabs voice.
- `audio_url` is not a general reference for ElevenLabs speech; it is exposed for reference-driven models such as Chatterbox. Confirm voice-use authorization before passing a person's recording.
- `emotion` is model-specific. ElevenLabs v3 and xAI TTS use their own documented in-text performance controls instead of a generic emotion value.
- Inspect runtime support before setting `speed`, `format`, `sample_rate`, `language_boost`, or other advanced options.

## Casting and direction

Use `creativeclaw-elevenlabs-v3` after routing to ElevenLabs for curated native-language voices, emotional tags, multi-speaker handling, and pronunciation strategy. Use `creativeclaw-minimax-speech` for native multilingual system voices plus global emotion, pitch, and pacing. Use `creativeclaw-xai-tts` for its 28 built-in voices, exact square-bracket events, wrapping delivery tags, language codes, and telephony formats. Use `creativeclaw-chatterbox` for a one-off match from an authorized reference recording. Keep a stable voice ID across a project. For a reusable custom voice, use `creativeclaw-clone-voice`; cloning requires explicit consent and a valid sample.

## Completion standard

Deliver or save the approved audio URL with useful metadata. For film work, keep each shot's narration asset addressable; do not claim that film assembly automatically mixes every per-shot audio file.
