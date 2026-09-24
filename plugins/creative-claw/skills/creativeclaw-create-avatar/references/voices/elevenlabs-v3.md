# ElevenLabs v3

Model: `speech/elevenlabs-v3`. Default for general stock narration, expressive speech and many less common languages.

Find voices with get_model_params for this model, matching native language/accent and delivery labels before selecting the exact voice_id. The default English voice is not a universal language recommendation. Public [ElevenLabs Voice Library](https://elevenlabs.io/app/voice-library) IDs are another option when verified. Saved ElevenLabs clones use character_id and do not need cloning again.

Use readable spoken sentences and sparse supported audio tags, for example "[excited] We finally made it!" Tags affect performance, not guaranteed exact timing. Avoid unrelated stage directions that could be spoken. V3 does not support SSML break or phoneme tags. Inline /IPA/ pronunciation can help but is probabilistic; audition important names.

Set extras.language_code to a supported code for the intended language, especially short or ambiguous text. Prefer native script unless romanization is explicitly requested. See [language routing](languages.md).

Use extras.voice_settings.stability: 0 for Creative, 0.5 for Natural, 1 for Robust. Start at 0.5; 0 can improve expressiveness with more variation. Top-level speed ranges 0.7 to 1.2, start at 1. Old v2 similarity/style/speaker-boost controls are not useful v3 controls.

Preserve supplied words and punctuation where possible. Get permission before rewriting pronunciation. Do not add tags to an exact-text request if the user forbids them.

Sources: current Creative Claw schema and [ElevenLabs prompting](https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices).

For detailed examples and prompting controls, read the [elevenlabs-v3 production guide](elevenlabs-v3-guide.md).
