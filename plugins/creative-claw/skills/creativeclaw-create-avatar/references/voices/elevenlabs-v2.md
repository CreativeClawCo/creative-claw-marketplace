# ElevenLabs Multilingual v2

Model: `speech/elevenlabs-v2`. Prefer for steady speech from an existing ElevenLabs Character clone. Use v3 for general stock narration by default.

Voice selection: use a saved cloned character_id for this workflow. V2 stock requests are not recommended; use v3 for stock voices. get_model_params supplies the current model settings and language support.

Write plain spoken text. Punctuation controls rhythm. Sparse `<break time="0.5s" />` pauses are supported up to three seconds. Do not use v3 square-bracket performance tags or phoneme tags. Use natural phonetic spelling only with the user's approval when it changes supplied text.

Starting settings in `extras.voice_settings`: stability 0.5, similarity_boost 0.75, style 0, use_speaker_boost true. Top-level speed 1.0, accepted range 0.7 to 1.2. Higher stability is steadier, lower may be more variable. Nested settings take precedence over legacy flat extras; top-level speed takes precedence over nested speed.

Language is inferred from text, not language_code. Maximum text is 10,000 characters per request. For authorized chunking use extras.previous_text and extras.next_text as continuity context.

Example text: "Welcome back. <break time=\"0.5s\" /> Today we begin a new chapter."

Check [language routing](languages.md): v2 does not support every v3 language, notably Hebrew, Persian and Urdu. Check current schema before submission.

Sources: current Creative Claw model schema and [ElevenLabs prompting](https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices). Voice browsing: [ElevenLabs Voice Library](https://elevenlabs.io/app/voice-library).

For detailed examples and prompting controls, read the [elevenlabs-v2 production guide](elevenlabs-v2-guide.md).
