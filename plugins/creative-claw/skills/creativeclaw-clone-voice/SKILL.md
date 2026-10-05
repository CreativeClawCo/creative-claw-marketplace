---
name: creativeclaw-clone-voice
description: Guide recording, private upload, cloning, testing, and reuse of a consented personal voice with Cartesia or ElevenLabs. Use when someone asks to clone their voice, save it on a Character, or replace or audition a clone. Not for inventing a new voice from a description; use creativeclaw-generate-voiceover.
---

# Clone your voice

Read [shared execution guidance](references/workflow-basics.md) before tools and [recording, upload, consent and reuse](references/voices/cloning.md) for this workflow.

Ask the user for a recording of at least one minute of clean solo speech, upload it privately, clone it, audition a short sample, and reuse the saved Character. One to two minutes is our onboarding recommendation, not a universal provider API minimum.

Without a consented recording, offer design_voice instead ([voice design](references/voices/voice-design.md)).

1. Identify the intended language, delivery and an existing Character, if any. Reuse an avatar's Character instead of creating a duplicate.
2. Explain the selected provider and confirm ownership or speaker permission before sending the sample for cloning. Possessing a recording is not consent.
3. Import with purpose `voice_clone` to obtain a private `audio_asset_id`. Follow the reference for the current client's upload route.
4. After the user confirms, call `clone_voice` with that asset, the recording's `language` code (for example `he`; it defaults to `en`), and `provider: "cartesia"` (the default), or `provider: "elevenlabs"` when the user chooses ElevenLabs. The `consent` input is ignored, so the confirmation in step 2 is what matters. Use `character_id` for an existing Character or `character_name` for a new voice-only Character. The tool saves the clone automatically.
5. Audition using `generate_speech` and the returned `character_id`. Read the selected model reference below. Include a name, number and natural sentence in the intended language. Present the audio for approval before a longer production.
6. Reuse `character_id`, not the private source recording, for future speech. Never replace a saved voice merely to change speech models.

## Choose the synthesis model

Speak a clone with its provider's model, and pass the model explicitly.

- [Cartesia Sonic](references/voices/cartesia.md): a Cartesia clone.
- [ElevenLabs v2](references/voices/elevenlabs-v2.md): an ElevenLabs clone, steady read in its supported languages.
- [ElevenLabs v4](references/voices/elevenlabs-v4.md): an ElevenLabs clone, expressive delivery or dialogue, and languages v2 lacks.
- [Language routing](references/voices/languages.md): read for non-English speech, dialect requests, or mixed-language scripts.

Only change provider when the user chooses it. A missing Cartesia clone can be created from the retained consented sample when Cartesia is selected. Replacing the source invalidates both providers' clones, so explain and confirm replacement first. Do not silently substitute a stock voice after a clone fails.
