---
name: creativeclaw-chatterbox
description: "Create a one-off Chatterbox voice match from consented reference audio, with safe reference handling and model-specific expressive controls. Use after a voiceover workflow selects speech/chatterbox; use clone-voice instead for a reusable saved Character voice."
---

# Creative Claw — Chatterbox

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Use this specialist inside `creativeclaw-generate-voiceover` for one-off reference-audio voice matching. Chatterbox is not a reusable Character voice: choose `creativeclaw-clone-voice` when the user wants to save and reuse a voice through ElevenLabs.

## Consent boundary

Use a reference only when the user owns the voice or the speaker authorized this use. Do not infer consent from a public URL, interview, film, song, celebrity clip, or uploaded third-party recording. If authorization is unclear, stop before generation and ask for it.

## Workflow

1. Preserve the user's script and confirm the supplied recording is authorized for voice matching.
2. Prefer a clean 5–30 second sample with one speaker, natural speech, little room echo, and no music or effects. A sample close to the target emotion and pace usually transfers better.
3. Import the sample through [platform upload guidance](references/platform-upload.md) so `audio_url` is a permanent, publicly retrievable Creative Claw URL.
4. Call `get_model_params({ model: "speech/chatterbox" })`; the current route is the original reference-audio TTS endpoint, not the separately documented multilingual or Turbo endpoints.
5. Call `generate_speech` with `model: "speech/chatterbox"`, `text`, `audio_url`, and only runtime-supported settings.
6. Audition speaker similarity, pronunciation, pace, emotion, artifacts, hallucinated sounds, and clipped boundaries. Regenerate the smallest weak section.

## Text and expressive tags

The supported cues are `<laugh>`, `<chuckle>`, `<sigh>`, `<cough>`, `<sniffle>`, `<groan>`, `<yawn>`, and `<gasp>`.

- Keep cues sparse and place them where the sound should occur.
- Do not send ElevenLabs `[bracketed]` delivery tags or xAI wrapping tags. Creative Claw converts known compatible bracketed reactions and removes known incompatible delivery tags, but the submitted script should already use Chatterbox syntax.
- Use punctuation and sentence boundaries for pauses; `[pause]` is converted to an ellipsis by the server.
- Keep each call below 5,000 characters and split long scripts at natural boundaries.

## Tuning

- Start with `exaggeration: 0.25`, `temperature: 0.7`, and `cfg: 0.5` unless the runtime schema changes.
- Raise exaggeration gradually for a more animated read. High values can speed up or destabilize delivery.
- Lower `cfg` toward `0.3` when the transferred pace is too fast or when a more deliberate read is needed.
- Keep a fixed `seed` while comparing one setting at a time; use `0` or omit it when variation is wanted.

```json
{
  "model": "speech/chatterbox",
  "text": "I thought we had more time. <sigh> But the doors are already closing.",
  "audio_url": "https://cdn.example.com/authorized-reference.wav",
  "extras": {
    "exaggeration": 0.35,
    "temperature": 0.7,
    "cfg": 0.45,
    "seed": 42
  }
}
```

## Completion standard

Return the permanent generated audio and identify that it is a one-off voice match. Do not claim that Chatterbox created a reusable clone or Character. When the reference language differs from the script, warn that accent transfer may be unreliable on the current endpoint and recommend a native ElevenLabs or MiniMax voice instead.
