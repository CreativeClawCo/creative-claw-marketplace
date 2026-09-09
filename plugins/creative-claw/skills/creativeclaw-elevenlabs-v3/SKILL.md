---
name: creativeclaw-elevenlabs-v3
description: "Apply ElevenLabs v3 voice casting, prompting, emotion, and performance techniques after Creative Claw selects that speech model. Use when the user explicitly requests v3 or expressive ElevenLabs audio tags, or when another Creative Claw workflow routes narration or dialogue to speech/elevenlabs-v3."
---

# Creative Claw — ElevenLabs v3

Use `speech/elevenlabs-v3` for expressive acting, audio tags, and languages outside Multilingual v2. Prefer `speech/elevenlabs-v2` for steady professional narration and identity-focused clone auditions in supported languages. Choose a voice that already resembles the requested age, energy, accent, and performance; inline tags shape delivery but cannot completely transform an incompatible voice.

## Core workflow

1. Identify language, audience, format, speaker profile, energy, pronunciation risks, and target duration.
2. Reuse the requested voice or select a fitting default (Hale only for an unspecified English brief). Present choices only when the user wants to choose or the casting decision is material.
3. Rewrite written copy into natural spoken language only when the user permits copy edits. Preserve exact approved wording otherwise.
4. Add sparse inline `[audio tags]` at performance changes.
5. Call `get_model_params({ model: "speech/elevenlabs-v3" })` and use current voice IDs and fields.
6. Call `generate_speech` with `model: "speech/elevenlabs-v3"`, the selected `voice_id`, and the performed script.
7. Listen for pronunciation, emotion, pacing, clipped words, tag leakage, and unwanted accent shifts. Regenerate only the affected segment when possible.
8. Use returned timestamps for subtitles, captions, or lip-sync alignment.

## Voice selection

Call `get_model_params({ model: "speech/elevenlabs-v3" })` for current curated IDs and language/accent labels. Match the script language and regional accent first, then tone and speaker profile. Offer at most two fitting choices unless the user asks to browse. A voice speaking another language may retain its original accent; setting `extras.language_code` does not change its native accent.

Use only catalog IDs or the user's saved Character. For Hebrew, the catalog includes Noam, a workspace-designed Israeli Hebrew voice; do not describe an English or MiniMax voice as a second native Hebrew option without evidence. For a reusable custom voice from a recording, use `creativeclaw-clone-voice`, then generate with its `character_id`.

## Write for speech

ElevenLabs v3 is sensitive to text structure:

- Use natural punctuation and sentence rhythm.
- Write numbers, acronyms, dates, and brand names the way they should be spoken when pronunciation matters.
- Prefer scripts above roughly 250 characters when the task allows; very short prompts can be less consistent. For a short line, use clear punctuation and enough emotional context.
- Keep each generation below about 3,000 characters for reliable iteration, even if the tool accepts more.
- Split long scripts at paragraph or sentence boundaries and merge approved clips afterward.
- Use em dashes for interruption, ellipses for hesitation, and exclamation marks sparingly for intensity.

Pronunciation examples:

- `F. B. I.` or `F-B-I` for letter-by-letter speech.
- `X dot A I` when a brand abbreviation is misread.
- Write `twenty twenty-six` when that reading is required.

## Audio tags

Place stage directions inline in square brackets. They are performed rather than spoken.

### Emotion and attitude

`[excited]`, `[curious]`, `[sad]`, `[crying]`, `[angry]`, `[annoyed]`, `[nervous]`, `[panicking]`, `[sarcastic]`, `[sarcastically]`, `[mischievously]`, `[casual]`, `[flustered]`, `[hysterical]`, `[wickedly]`

### Vocal delivery

`[whispers]`, `[shouting]`, `[slowly]`, `[fast-paced]`, `[drawn out]`, `[hesitates]`, `[pause]`, `[starting to speak]`, `[interrupting]`, `[overlapping]`, `[cuts in]`

### Human reactions

`[laughs]`, `[laughs harder]`, `[starts laughing]`, `[chuckles]`, `[giggles]`, `[wheezing]`, `[sighs]`, `[exhales]`, `[gasps]`, `[clears throat]`, `[coughs]`, `[snorts]`, `[swallows]`, `[gulps]`

### Experimental transformations

`[deep voice]`, `[childlike tone]`, `[robotic tone]`, `[pirate voice]`, `[strong French accent]`, `[sings]`

Replace the accent name only when the selected voice can plausibly support it. Experimental tags vary by voice.

### Experimental sound events

`[applause]`, `[clapping]`, `[door slam]`, `[gunshot]`, `[explosion]`

Use these sparingly. They can help shape performance but are less predictable than dedicated sound design.

## Tag discipline

Use about one tag per one to three sentences. Place a tag immediately before the phrase it should affect.

Good:

```text
[curious] What if the fastest way forward was already in your hands?
[pause] [excited] Meet the tool that turns one idea into an entire campaign.
```

Good:

```text
I thought we had more time— [whispers] but the doors are already closing.
```

Avoid stacked tags such as `[whispers][angry]`. Avoid changing emotion on every word. Do not rely on invented tags. Match the tag to the chosen voice: a calm documentary voice may not deliver extreme shouting convincingly.

## Voice settings

Pass delivery settings through `extras.voice_settings` when supported:

| Setting | Guidance |
| --- | --- |
| `stability` | Use `0` for Creative/emotive, `0.5` for Natural/balanced, `1` for Robust/consistent. High values may weaken tags. |
| `speed` | Start at `1.0`; use about `0.95` for intimate narration or `1.05` for energetic ads. |

Useful presets:

```json
{ "voice_settings": { "stability": 0.5, "speed": 0.95 } }
```

Calm documentary or premium narration.

```json
{ "voice_settings": { "stability": 0.5, "speed": 1.05 } }
```

Expressive advertisement or launch read.

```json
{ "voice_settings": { "stability": 0.5, "speed": 0.95 } }
```

Intimate UGC or close-mic delivery.

Use `extras.output_format: "mp3_44100_128"` by default. Use a higher-bitrate MP3 or PCM only when downstream production requires it.

## Multilingual speech

Write the script in the target language and pass `extras.language_code` when the runtime exposes it. The current Creative Claw schema includes English, Hebrew, Spanish, French, German, Italian, Portuguese, Arabic, Hindi, Mandarin, Japanese, and Korean.

The selected voice's accent can carry into another language. Test names, numbers, and brand terms before generating a long script. Do not promise native pronunciation from an American voice without listening.

## Multi-speaker dialogue

Generate one line per call with a distinct voice ID, then combine the approved audio in sequence. Make each turn self-contained:

```text
Sia: [starting to speak] So I was thinking we could—
Christopher: [interrupting] —launch it tonight?
Sia: [sighs] That is exactly what I was afraid you would say.
```

Use three `generate_speech` calls, then merge or place them on the timeline. Keep punctuation, pauses, and emotional cues in each line.

## Complete examples

Energetic launch:

```json
{
  "model": "speech/elevenlabs-v3",
  "voice_id": "qTRV75fy2dUja4REMifv",
  "text": "[curious] What if one idea could become an image, a film, and a voice? [pause] [excited] Meet Creative Claw — your AI media studio inside ChatGPT.",
  "extras": {
    "voice_settings": { "stability": 0.5, "speed": 1.05 },
    "language_code": "en",
    "output_format": "mp3_44100_128"
  }
}
```

Cinematic narration:

```json
{
  "model": "speech/elevenlabs-v3",
  "voice_id": "5MzdXfNI3TSWsCPwZFrB",
  "text": "[slowly] Every object carries the mark of the hands that shaped it. [pause] And every mark tells a story.",
  "extras": {
    "voice_settings": { "stability": 0.5, "speed": 0.94 }
  }
}
```

Hebrew commercial:

```json
{
  "model": "speech/elevenlabs-v3",
  "voice_id": "qSpyK5dRmXMRXTjrQTQA",
  "text": "[curious] מה אם הרעיון הבא שלכם כבר מוכן להפוך לסרט? [pause] [excited] מתחילים עכשיו.",
  "extras": {
    "language_code": "he",
    "voice_settings": { "stability": 0.5, "speed": 1.0 }
  }
}
```

## Quality and feedback

Listen for names, acronyms, numbers, language, accent, tag leakage, emotional fit, abrupt starts or endings, clipped words, volume jumps, and pace. Revise punctuation or one local tag before changing the voice. Keep a seed when comparing small prompt changes if the runtime supports it.

Use `submit_feedback` for repeated pronunciation failures, quality degradation, unavailable voices, missing language support, confusing parameters, or explicit voice requests. Include the voice name/ID, language, settings, and concrete issue without sharing private recordings.

## Model-specific compatibility

V3 supports `extras.voice_settings.stability` (0 Creative, 0.5 Natural, 1 Robust) and speed (0.7–1.2). Old continuous stability values map to the closest mode. `similarity_boost`, `style`, and `use_speaker_boost` are accepted for legacy compatibility but ignored; do not recommend them for v3. Flat legacy extras still work for supported settings; nested fields win and top-level speed takes precedence.

Square-bracket audio tags apply to v3, not Multilingual v2. V3 does not support SSML breaks or phoneme tags. V2 supports sparse SSML breaks up to 3 seconds and provides similarity/style controls for steady narration. Use the same Character to compare models without re-cloning; selecting v2 is not Professional Voice Cloning.
