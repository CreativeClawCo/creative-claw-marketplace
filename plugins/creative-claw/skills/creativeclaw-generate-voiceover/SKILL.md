---
name: creativeclaw-generate-voiceover
description: "Create narration, dialogue, or expressive speech with Creative Claw. Use for general text-to-speech and voiceover work; use the separate clone-voice skill when the user wants a new reusable custom voice."
---

# Generate Voiceover

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Turn a script into performance-ready speech, with Multilingual v2 for steady professional narration or v3 for expressive performance. This skill owns casting, direction, generation, review, and delivery; model specialists contain deeper voice and performance guidance.

## Workflow

1. Use supplied script, language, speaker, and delivery choices. Infer minor defaults; ask only for a missing choice that materially changes the performance.
2. Preserve the user's words. Ask before materially rewriting an approved script.
3. Call `get_model_params` for the selected speech model and choose from its supported voice catalog by script language, regional accent, and delivery. Offer two suitable voices when the user wants a choice. Do not use `search_examples` or `get_example` for voice selection. Generate short auditions only when requested.
4. Choose `speech/elevenlabs-v2` for steady narration and identity-focused existing clones in supported languages; choose `speech/elevenlabs-v3` for audio tags, acted dialogue, or languages outside v2 and fetch missing settings with `get_model_params`. Use `list_models({ category: "speech" })` only when discovering alternatives. Estimate with `operation: "speech"` only for user-requested cost/budget help.
5. Choose a stock `voice_id`, or pass a saved `character_id` whose consented ElevenLabs clone should speak.
6. Preserve exact wording in `text`; add performance tags only when consistent with the requested delivery. `generate_speech` does not expose `agentic_prompting`; do not send it.
7. Call `generate_speech`. Generate each speaker separately so casting, pacing, and revisions stay controllable.
8. Audition the result for pronunciation, emotional arc, pacing, clipping, and consistency. Regenerate only the weak section when practical.
9. Before using `merge_media`, read [media-assembly.md](references/media-assembly.md). Follow every continuation for more than five segments and check audio/video durations before muxing.

Conduct casting and review in the user's language. Preserve the supplied script and its writing system, and verify model or voice language support instead of translating unless the user asks.

## Tool contract

- `text` is required and is limited by the current tool schema; split long scripts on scene or paragraph boundaries.
- `voice_id` selects a stock voice. `character_id` selects a saved Character's cloned ElevenLabs voice.
- `audio_url` is not a general reference for ElevenLabs speech; it is exposed for reference-driven models such as Chatterbox. Confirm voice-use authorization before passing a person's recording.
- `emotion` is model-specific. ElevenLabs v3 and xAI TTS use their own documented in-text performance controls instead of a generic emotion value.
- Inspect runtime support before setting `speed`, `format`, `sample_rate`, `language_boost`, or other advanced options.

## Casting and direction

Use `creativeclaw-elevenlabs-v2` for steady professional narration, clone auditions, v2 settings, pauses and continuity. Use `creativeclaw-elevenlabs-v3` after routing specifically to v3 for curated native-language voices, emotional tags, multi-speaker handling, and pronunciation strategy. Use `creativeclaw-minimax-speech` for native multilingual system voices plus global emotion, pitch, and pacing. Use `creativeclaw-xai-tts` for its 28 built-in voices, exact square-bracket events, wrapping delivery tags, language codes, and telephony formats. Use `creativeclaw-chatterbox` for a one-off match from an authorized reference recording. Keep a stable voice ID across a project. For a reusable custom voice, use `creativeclaw-clone-voice`; cloning requires explicit consent and a valid sample.

## Completion standard

Deliver or save the approved audio URL with useful metadata. For film work, keep each shot's narration asset addressable; do not claim that film assembly automatically mixes every per-shot audio file.

## V2 and v3 contract

Select the model explicitly; the omitted-model API default remains v3 for compatibility. Switching models reuses the same `character_id` without re-cloning. Multilingual v2 is a TTS model, not Professional Voice Cloning. V2 detects language from text and does not support Hebrew or `language_code`. Use discovery for all 29 supported languages.

Pass settings in `extras.voice_settings`. V2 supports stability, similarity_boost, style, use_speaker_boost and speed; v3 supports stability (0, 0.5, 1) and speed. Legacy unsupported v3 knobs remain accepted but ignored. For both models speed is 0.7–1.2. Prefer v2 for a controlled corporate read, v3 for expressive `[audio tags]`. Do not promise either model guarantees likeness.
