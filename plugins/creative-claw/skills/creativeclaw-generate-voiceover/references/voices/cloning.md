# Record, upload, clone, audition and reuse

## Recording and consent

Without a consented recording, offer a designed voice instead ([voice design](voice-design.md)).

Ask for at least 60 seconds, preferably 1 to 2 minutes, of natural solo speech. This is Creative Claw's quality recommendation, not a hard minimum shared by all providers. Use a quiet room, a consistent microphone position and a normal speaking voice. Include varied sentences, names and numbers in the intended language. Avoid music, other speakers, echo, clipping, heavy filters and long silences. A clean phone recording is fine.

Ask for consent once, up front, in the same message as the recording request. Name the provider that will process it (Cartesia by default, or ElevenLabs or Fish when the user chooses it), quote this statement in full, and ask for the recording's language:

> I own this recording or have permission to use it, and this is my voice or I have the speaker's explicit permission to clone it and generate speech in this workspace. I authorize Creative Claw and the supported voice providers I select through Creative Claw to process it for this purpose, and accept the [voice-cloning terms](https://creativeclaw.co/terms/#voice-cloning) and [privacy notice](https://creativeclaw.co/privacy/#voice-cloning).

For example: "Reply 'I agree' and tell me the recording's language." One reply that agrees and names the language covers both. Skip the language question when the user already named it. If the recording is already attached, ask the same single question before cloning.

Do not infer permission from an uploaded file. Never call `clone_voice` or set `consent: true` before that agreement. Once given, it is the explicit consent the upload results and `clone_voice` ask for: do not ask again after the upload, and do not ask separately whether it is the user's voice. Ask again only for a different speaker or recording, or when the user hesitates or withdraws.

## Private upload

- ChatGPT attachment: `import_chatgpt_media({ media_file: <actual attachment>, purpose: "voice_clone" })`.
- Upload picker, for a recording the user already has on their device: `import_media({ purpose: "voice_clone" })`.
- Local file with byte-upload capability: `get_upload_url({ type: "audio", content_type: <MIME>, purpose: "voice_clone" })`, upload bytes, then `confirm_upload`.

Use the resulting private `audio_asset_id`; do not ask the user to copy an ID already returned. Never publish a private sample to obtain a public URL. A user-supplied direct downloadable `audio_url` is accepted by clone_voice and copied privately, but prefer an already imported asset.

The original is retained privately. Creative Claw prepares a mono MP3 capped at two minutes for the provider. Do not ask the user to re-upload solely because the original is oversized.

## Clone and save

Find an existing Character with `list_characters` when the user names one. Reuse the avatar Character to keep its image and voice together.

```json
{
  "character_name": "My narration voice",
  "audio_asset_id": "<private asset ID>",
  "consent": true,
  "language": "<recording language code, for example he>",
  "provider": "cartesia"
}
```

Call `clone_voice` with these arguments as soon as the upload returns the asset, with no message in between. Set `language` to the recording's language: it defaults to `en`, and Cartesia uses it right away. For an existing Character, use `character_id` instead of creating a new one. Cartesia is the default provider; pass `provider: "elevenlabs"` for an ElevenLabs clone, or `provider: "fish"` for a private Fish clone. The result is saved on the Character automatically, including for a new voice-only Character. No extra save operation is required.

Cloning depends on the workspace's plan and clone capacity. If a tool reports a plan limit, relay its message and link. Replacing a Character's source invalidates its existing provider clones. Identify the Character and obtain explicit replacement direction first.

## Test and reuse

A Fish clone speaks with `speech/fish-drama-3`, using its private provider copy. Read [Fish guidance](fish.md) and current `get_model_params` before submitting.

A clone speaks with its provider's model: a Cartesia clone with Cartesia Sonic; an ElevenLabs clone with ElevenLabs v2 for a steady read or v4 for expressive delivery or dialogue. Read [language routing](languages.md) and the selected [Cartesia](cartesia.md), [v2](elevenlabs-v2.md) or [v4](elevenlabs-v4.md) guide. Generate a short audition using the returned character_id, never both character_id and voice_id. Include the user's names, numbers and target-language sentence.

Ask the user to assess identity, accent, clarity and pacing. Do not claim to have listened unless audio inspection was actually available. Adjust text/pronunciation/settings before replacing a good source. Noise or a consistently wrong identity usually merits a cleaner recording, not repeated paid synthesis.

Reuse character_id for future generate_speech calls. ElevenLabs v2 and v4 reuse the same ElevenLabs clone. When the user selects Cartesia, a missing Cartesia clone can be created from the retained consented source. Selecting Fish can also create its missing private provider copy from the retained consented recording. Do not re-clone simply to switch models. Never silently substitute providers or stock voices after a failure.

A Character may contain both images and a voice. Its visual use in generated images/videos does not bring its voice into native video audio. For visible speech, make the speech first and use an audio-driven route. For an existing clip, recommend `video/sync-3` with supplied or embedded audio and automatic or manual speaker selection; keep HeyGen Lipsync as an alternative when explicitly selected; overlaying speech is not lip-sync. Do not expose private samples.

Recording guidance: [ElevenLabs instant cloning](https://elevenlabs.io/docs/eleven-creative/voices/voice-cloning/instant-voice-cloning).
