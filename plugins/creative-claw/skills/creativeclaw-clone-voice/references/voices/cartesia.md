# Cartesia Sonic

Model: `speech/cartesia-sonic`. Use for fast natural speech from stock voices or a saved Character clone.

Get model params first. Match the returned voice catalog's language, accent and delivery labels; use the exact voice_id. Verified public IDs from [Cartesia's voice library](https://play.cartesia.ai/voices) can also be used. Do not apply an ElevenLabs voice ID to Cartesia. A personal clone uses character_id instead of voice_id.

Set extras.language_code to a code accepted by the current schema. Use native-script text, natural punctuation and the current schema's delivery controls. Read its Usage and emotion/speed options before adding settings; do not transplant ElevenLabs stability knobs, SSML or v3 performance tags. Start with neutral settings and adjust one delivery dimension after auditioning.

Current controls: top-level emotion is neutral, angry, excited, content, sad or scared. Top-level speed is 0.6 to 1.5. Start with emotion "neutral" and speed 1.0; try "excited" with 1.05 for an energetic ad, or "content" with 0.96 for a warm read. extras.volume accepts 0.5 to 2.0 and defaults to 1.8; omit it unless a volume override is wanted. Recheck the schema before use.

For Hebrew, the current catalog includes Ayala, Noam, Yarden and Gil; resolve their IDs at runtime and use he. Do not treat Cartesia as supporting Persian or Urdu unless the live schema adds them.

When Cartesia is selected for a Character that only has an ElevenLabs clone, the backend can create the Cartesia provider clone from the retained consented source. Do not replace the Character or re-upload without a concrete source problem. If this fails, report it rather than silently switching provider.

Example approach: choose a native-language narrator, write "Welcome back. Here's what changed today.", set the supported language code, then use an exposed emotion control for a warmer second take only if requested.

Sources: current Creative Claw schema and [Cartesia delivery controls](https://docs.cartesia.ai/build-with-cartesia/capability-guides/volume-speed-emotion).

For detailed examples and prompting controls, read the [cartesia production guide](cartesia-sonic-guide.md).
