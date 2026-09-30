# ElevenLabs v4

Model: `speech/elevenlabs-v4`. This is the default for ElevenLabs stock narration, expressive speech, designed voices, and dialogue with more than one speaker. For an ElevenLabs clone, use v4 for expressive delivery or dialogue and v2 for a steady read. A Cartesia clone speaks with Cartesia Sonic. Read the [v4 production guide](elevenlabs-v4-guide.md) for scripts and runnable examples.

Call `get_model_params({ model: "speech/elevenlabs-v4" })` for the current voice catalog, language list, settings, and pricing before generation. The same public ElevenLabs voice IDs and consented saved Character voices work with v4. Choose a voice that already suits the language and delivery. V4 can preserve cloned voice identity more faithfully, including flaws in the source recording, so audition important output. A model switch does not create or retrain a clone.

For one speaker, pass `text` and either a public `voice_id` or a saved `character_id`. Use concise `[whispers]`, `[laughs]`, `[long pause]`, or similar audible directions when useful. V4 supports Stability and Similarity inside `extras.voice_settings`. Do not pass speed, style, speaker boost, or SSML.

For multiple speakers in one run, pass `extras.dialogue` as ordered turns with `speaker`, `text`, and either `voice_id` or `character_id` per turn. Omit top-level voice selectors. Omit top-level `text`, or pass `text: ""` if a client with a cached schema requires it. Creative Claw supports 2 to 40 turns and at most 10 voices. ElevenLabs recommends no more than 2,000 total turn characters for reliable dialogue, but this is not a Creative Claw hard cap for v4. Longer requests up to the model's 10,000-character request limit may end early or be rejected by ElevenLabs. One job returns one audio file with speaker timing segments. Google Flash and Flash-Lite TTS also support two-speaker dialogue; inspect their current parameters before using them.

V3 is legacy; use it only when the user asks for it. V2 gives a steadier read from an ElevenLabs clone. Preserve a requested model.
