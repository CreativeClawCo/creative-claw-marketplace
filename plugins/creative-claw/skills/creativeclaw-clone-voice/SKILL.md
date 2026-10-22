---
name: creativeclaw-clone-voice
description: Guide recording, private upload, cloning, testing, and reuse of a consented personal voice with Cartesia or ElevenLabs. Use when someone asks to clone their voice, save it on a Character, or replace or audition a clone. Not for inventing a new voice from a description; use creativeclaw-generate-voiceover.
---

# Clone your voice

For each Creative Claw tool call that exposes it, pass the optional `skills_used` array with `creativeclaw-clone-voice`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw-clone-voice/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.

Read [shared execution guidance](references/workflow-basics.md) before tools and [recording, upload, consent and reuse](references/voices/cloning.md) for this workflow.

Clone only the user's own voice, or a voice whose speaker has given explicit permission. Do not clone a public figure or anyone else without their permission. Without a consented recording, offer design_voice instead ([voice design](references/voices/voice-design.md)).

## Default: the voice card

When the user wants to clone their voice and hasn't given you an audio file, call `clone_voice` without audio: `clone_voice({ consent: false })`, plus `language` when you know it and `character_id` when the voice belongs on an existing Character. Leave out `provider`. Its result is the voice card.

The card does the whole flow: the consent agreement, a one-minute reading script in the user's language (or an uploaded file), the clone on Cartesia, a test line, an optional blind comparison with ElevenLabs and Fish Audio, and saving the voice as a new Character or on one of the user's Characters. It also shows plan and voice-limit messages before anyone records.

- Don't ask for consent or a recording in chat first, and don't send the user to record with another app or a command line; the card collects both.
- Don't call `clone_voice` for a recording made in the card. Wait for the card's note, which gives the `character_id` and the model to use.
- Where the host gives the card no microphone, the card offers upload and recording on a phone or in the browser. Nothing to do in chat.
- If no card shows, the result is `status: "awaiting_sample"` (for example in a terminal) or, from a server without the card, `reason: "voice_sample_not_provided"`. Nothing was charged. Follow its `recoveryOptions` through the file route below.

## When the user already has a recording

For an attached file, a local file or a link:

1. Identify the intended delivery and an existing Character, if any. Reuse an avatar's Character instead of creating a duplicate.
2. Ask for consent once, up front: name the provider, quote the full consent statement with its terms and privacy links from [the reference](references/voices/cloning.md), and ask for the recording's language. One "I agree" plus the language covers both. Possessing a recording is not consent.
3. Import with purpose `voice_clone` to obtain a private `audio_asset_id`. Follow the reference for the current client's upload route.
4. As soon as the upload returns, call `clone_voice` with that asset, `consent: true`, the recording's `language` code (for example `he`; it defaults to `en`), and `provider: "cartesia"` (the default), or `provider: "elevenlabs"` when the user chooses ElevenLabs. Do not ask for consent or confirmation again. Use `character_id` for an existing Character or `character_name` for a new voice-only Character. The tool saves the clone automatically.
5. Audition using `generate_speech` and the returned `character_id`. Include a name, number and natural sentence in the intended language. Present the audio for approval before a longer production.

Reuse `character_id`, not the private source recording, for future speech. Never replace a saved voice merely to change speech models.

## Choose the synthesis model

Each clone saves its engine on the Character: the clone's own provider, or the one the user picked in the card. `generate_speech` with that `character_id` and no `model` uses it. Pass `model` only to override it, using the matching guide:

- [Cartesia Sonic](references/voices/cartesia.md): a Cartesia clone.
- [ElevenLabs v2](references/voices/elevenlabs-v2.md): an ElevenLabs clone, steady read in its supported languages.
- [ElevenLabs v4](references/voices/elevenlabs-v4.md): an ElevenLabs clone, expressive delivery or dialogue, and languages v2 lacks.
- [Language routing](references/voices/languages.md): read for non-English speech, dialect requests, or mixed-language scripts.

Only change provider when the user chooses it. A missing Cartesia clone can be created from the retained consented sample when Cartesia is selected. Replacing the source invalidates both providers' clones, so explain and confirm replacement first. Do not silently substitute a stock voice after a clone fails.

For a Fish clone, use `provider: "fish"` with the private recording and existing consent. Speak with `speech/fish-drama-3`. Read [Fish guidance](references/voices/fish.md) and current `get_model_params`. Selecting Fish for an existing consented Character can create a missing private Fish copy without replacing its other provider copies.
