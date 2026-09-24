---
name: creativeclaw-clone-voice
description: Guide recording, private upload, cloning, testing, and reuse of a consented personal voice with ElevenLabs or Cartesia. Use when someone asks to clone their voice, save it on a Character, or replace or audition a clone.
---

# Clone your voice

Read [shared execution guidance](references/workflow-basics.md) before tools and [recording, upload, consent and reuse](references/voices/cloning.md) for this workflow.

Help the user record at least one minute of clean solo speech, upload it privately, clone it, audition a short sample, and reuse the saved Character. One to two minutes is our onboarding recommendation, not a universal provider API minimum.

1. Identify the intended language, delivery and an existing Character, if any. Reuse an avatar's Character instead of creating a duplicate.
2. Explain the selected provider and confirm ownership or speaker permission before sending the sample for cloning. Possessing a recording is not consent.
3. Import with purpose `voice_clone` to obtain a private `audio_asset_id`. Follow the reference for the current client's upload route.
4. Call `clone_voice` with that asset, `consent: true`, and provider `elevenlabs` or `cartesia`. Use `character_id` for an existing Character or `character_name` for a new voice-only Character. The tool saves the clone automatically.
5. Audition using `generate_speech` and the returned `character_id`. Read the selected model reference below. Include a name, number and natural sentence in the intended language. Present the audio for approval before a longer production.
6. Reuse `character_id`, not the private source recording, for future speech. Never replace a saved voice merely to change speech models.

## Choose the synthesis model

- [ElevenLabs v2](references/voices/elevenlabs-v2.md): steady cloned narration in its supported languages.
- [Cartesia Sonic](references/voices/cartesia.md): fast, natural cloned speech and supported delivery controls.
- [ElevenLabs v3](references/voices/elevenlabs-v3.md): expressive performance or languages outside v2, reusing the ElevenLabs clone.
- [Language routing](references/voices/languages.md): read for non-English speech, dialect requests, or mixed-language scripts.

Only change provider when the user chooses it. A missing Cartesia clone can be created from the retained consented sample when Cartesia is selected. Replacing the source invalidates both providers' clones, so explain and confirm replacement first. Do not silently substitute a stock voice after a clone fails.
