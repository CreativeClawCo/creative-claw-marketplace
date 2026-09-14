---
name: creativeclaw-clone-voice
description: Create, replace, audition, and reuse a consented ElevenLabs Instant Voice Clone through Creative Claw. Use when the user asks to clone their voice, create a custom AI voice from a recording, attach a voice to a Character, replace a Character's voice, or generate speech in a previously cloned Character voice. Requires explicit ownership or speaker-permission confirmation before any cloning call.
---

# Creative Claw — ElevenLabs Voice Cloning

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Create a reusable voice with ElevenLabs Instant Voice Cloning, attach it to a Creative Claw Character, and use that Character with `speech/elevenlabs-v2`. Keep this workflow separate from `creativeclaw-elevenlabs-v2`, which handles steady professional narration and settings. Use creativeclaw-elevenlabs-v3 for expressive audio tags or languages outside v2. Changing the TTS model does not require a new clone and does not upgrade IVC to PVC.

## Core workflow

1. Explain that Creative Claw sends the recording to ElevenLabs to create an Instant Voice Clone and stores the resulting voice on a reusable Character.
2. Confirm the speaker owns the voice or has given the user explicit permission to clone and use it. Never infer consent from possession of a recording.
3. Select an existing Character with `list_characters`, or create one with `manage_character({ title, description, image_url? })`.
4. Collect a clean 1–2 minute solo recording. Import it with `purpose: "voice_clone"` and obtain the private `audio_asset_id`, or provide a publicly downloadable audio link as `audio_url`. Creative Claw copies URL inputs into private voice storage before continuing.
5. If the Character already has a voice, explain that cloning again replaces it and obtain confirmation before continuing.
6. Call `clone_voice({ character_id, audio_asset_id, consent: true })` only after the explicit confirmation.
7. Generate a short audition with `generate_speech({ model: "speech/elevenlabs-v2", character_id, text })`.
8. Listen for identity, accent, tone, pacing, noise, pronunciation, and emotional range. Approve the clone before using it for a long script or Film.
9. Use `character_id` for future speech in that voice. Use `creativeclaw-elevenlabs-v2` for detailed script performance, supported pauses, and delivery settings.

## Consent and misuse boundary

Proceed only when the user explicitly confirms one of these conditions:

- “This is my voice and I authorize Creative Claw and ElevenLabs to clone it.”
- “The speaker gave me permission to clone and use this voice.”
- The user has a clear license or agreement authorizing voice cloning and synthesis.

Do not set `consent: true` on the user's behalf without that confirmation. Do not clone a celebrity, politician, public figure, colleague, family member, customer, or any other person merely because a recording is available. Do not help use a clone deceptively, fraudulently, or to imply a real endorsement or statement the speaker did not authorize.

If consent is unclear, pause before the cloning call and ask for a direct confirmation. This pause applies only to cloning; non-mutating recording advice may continue.

## Recording the source sample

The clone reproduces what it hears: timbre, accent, cadence, breath, energy, room sound, and artifacts. Recording quality matters more than file size or the number of clips.

Recommended source:

- Sweet spot: 1–2 minutes of continuous clear speech; recommended minimum 1 minute and recommended maximum 3 minutes. These are quality guidelines, not enforced duration limits. Shorter samples can work, but audition them carefully.
- One speaker, one microphone position, one acoustic environment.
- MP3 at 192 kbps or better when possible; a clean WAV is also accepted by Creative Claw.
- No music, other speakers, echo, reverb, fan noise, traffic, clipping, mouth clicks, or heavy processing.
- Consistent volume, distance, tone, accent, and delivery.
- Natural sentences with varied phonemes and punctuation, without long silent gaps.
- A performance that resembles the intended output. Use an energetic sample for an energetic brand voice and a calm sample for a calm narrator.
- Creative Claw privately retains the unchanged original, automatically creates the provider submission as a mono MP3 capped at 2 minutes, and retains that exact prepared version as a second linked private asset. Oversized uploads are accepted, so do not ask the user to trim, compress, re-export, or re-upload solely because the original exceeds ElevenLabs' byte limit.

When meters are available, aim roughly for -23 to -18 dB RMS and a true peak near -3 dB. Do not reject a clean phone recording solely because it lacks studio equipment.

Use `isolate_audio` only when light cleanup materially improves an otherwise good recording. Preserve the original and audition the cleaned result; aggressive isolation can alter vocal identity.

## Create or select the Character

Search first:

```text
list_characters({})
```

Create a Character when no suitable one exists:

```text
manage_character({
  title: "Maya — Brand Voice",
  description: "Warm, confident founder voice for product narration and launch videos."
})
```

The Character may also have a visual reference, but an image is not required for voice cloning. Use a clear title because cloned voices remain reusable and must be easy to distinguish.

## Import the recording

Prefer a private voice-sample asset. A direct public audio link is also accepted and is copied into private storage immediately. Do not use a temporary local path:

- Native ChatGPT attachment: call `import_chatgpt_media({ media_file: <attached file>, purpose: "voice_clone" })` when exposed.
- Local file in a client that can upload bytes: call `get_upload_url({ type: "audio", content_type, purpose: "voice_clone" })`, upload the bytes, then call `confirm_upload`.
- If the client cannot upload directly, call `import_media({ purpose: "voice_clone" })` and let the user record or choose the file.

Do not send private media to an arbitrary third-party URL merely to make it accessible.
Each route returns a private `audio_asset_id`. The interactive picker sends that ID back into Claude or ChatGPT and asks the host to continue. Do not ask the user to copy an ID already present in the upload result or repeat the upload.

URL import: a host may pass any publicly downloadable audio link as `audio_url`. The server safely downloads it, blocks private-network targets and non-audio files, copies the original bytes into the workspace's dedicated private voice bucket, creates a private asset ID, and continues through the normal private workflow. The source URL itself is not retained in asset metadata. Its SHA-256 fingerprint is retained only to reuse an existing private copy of the exact same URL.

## Clone the voice

After consent and import:

```text
clone_voice({
  character_id: "<character UUID>",
  audio_asset_id: "<private voice sample asset UUID>",
  consent: true
})
```

When starting from a link, pass `audio_url` instead of `audio_asset_id`. Prefer `audio_asset_id` when the recording has already been imported privately.

This calls ElevenLabs Instant Voice Cloning. It creates a reusable provider voice and attaches its ID to the Character. It is not a one-off reference-audio effect, and it does not train a downloadable standalone model.

`clone_voice` replaces any existing voice attached to the Character. Treat replacement as destructive: identify the Character, disclose the replacement, and obtain confirmation first.

## Audition before production

Use a short script that covers neutral speech, energy, pauses, names, and any target language:

```json
{
  "model": "speech/elevenlabs-v2",
  "character_id": "<character UUID>",
  "text": "Here is a quick voice check. This is the neutral delivery. I look forward to welcoming you to our annual conference.",
  "extras": {
    "voice_settings": {
      "stability": 0.5,
      "similarity_boost": 0.75,
      "speed": 1.0
    }
  }
}
```

For multilingual use, include names, numbers, and a short sentence in each important language. The source accent normally carries into generated languages, so listen before promising native pronunciation.

Do not pass both `character_id` and an unrelated curated `voice_id`. Do not pass the source `audio_url` to `speech/elevenlabs-v2`; the reusable Character is the voice selector.

## Diagnose a weak clone

| Problem | Likely cause | Best correction |
| --- | --- | --- |
| Background hiss, music, or echo persists | It exists in the sample | Record again in a quieter, drier room; use light isolation only if needed. |
| Accent or cadence is wrong | The sample demonstrates the wrong performance | Replace it with a sample using the desired natural accent and cadence. |
| Output is flat | The sample is monotone or stability is too high | Record a more representative performance; lower ElevenLabs stability carefully. |
| Output varies too much | Source tone, volume, or microphone position changes | Use one consistent take and remove extreme performance shifts. |
| Names or acronyms are wrong | Script pronunciation, not clone identity | Spell the phrase phonetically or write letters separately. |
| Clone sounds unlike the speaker | Source is short, noisy, compressed, or atypical | Record a new 1–2 minute sample; do not keep resynthesizing the same weak clone. |

If direct ElevenLabs service is unavailable for a private cloned voice, fail closed. Do not silently substitute another provider or curated voice.

## Reuse and feedback

For future requests, call `generate_speech` with the saved `character_id`, then apply the prompting techniques from `creativeclaw-elevenlabs-v2`. Use the same Character in Film narration when continuity matters.

Use `submit_feedback` when cloning fails despite a compliant sample, the result repeatedly misses a specific accent or identity trait, replacement behavior is unclear, or the user requests a stronger cloning model or control. Include the Character ID and concrete quality issue, but do not paste private transcripts or expose the source recording.

Before replacing a good source, audition the existing clone with an appropriate TTS model and settings. V2 does not support v3 square-bracket audio tags; use plain text. Switching to v3 for expression reuses the same Character. Cloning again currently deletes the old voice, so retain the source and do not replace merely to compare v2 and v3.
