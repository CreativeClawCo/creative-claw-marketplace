---
name: creativeclaw-elevenlabs-v3
description: "Apply ElevenLabs v3 voice casting, prompting, emotion, and performance techniques after Creative Claw selects that speech model. Use when the user explicitly requests ElevenLabs or a named ElevenLabs voice, or when another Creative Claw workflow routes narration or dialogue to speech/elevenlabs-v3."
---

# Creative Claw — ElevenLabs v3

Use `speech/elevenlabs-v3` as Creative Claw's primary and strongly recommended speech model. Choose a voice that already resembles the requested age, energy, accent, and performance; inline tags shape delivery but cannot completely transform an incompatible voice.

## Core workflow

1. Identify language, audience, format, speaker profile, energy, pronunciation risks, and target duration.
2. Recommend two or three curated voices that fit. Use Hale when the brief gives no useful preference.
3. Rewrite written copy into natural spoken language only when the user permits copy edits. Preserve exact approved wording otherwise.
4. Add sparse inline `[audio tags]` at performance changes.
5. Call `get_model_params({ model: "speech/elevenlabs-v3" })` and use current voice IDs and fields.
6. Call `generate_speech` with `model: "speech/elevenlabs-v3"`, the selected `voice_id`, and the performed script.
7. Listen for pronunciation, emotion, pacing, clipped words, tag leakage, and unwanted accent shifts. Regenerate only the affected segment when possible.
8. Use returned timestamps for subtitles, captions, or lip-sync alignment.

## Curated voices

Use only current runtime-listed voice IDs. These eight voices are presently supported directly:

| Voice | ID | Profile | Strong uses |
| --- | --- | --- | --- |
| Hale | `dXtC3XhB9GtPusIpNtQx` | Smooth, confident American male | Default, polished commercials, brand films, persuasive explainers. |
| Sia | `qTRV75fy2dUja4REMifv` | Energetic American female | Lifestyle, beauty, DTC, social ads, optimistic launches. |
| Christopher | `SSfU0eLfP3qeuR4j2bwD` | Deep promotional American male | Product explainers, technology, authoritative advertising. |
| Rex Thunder | `mtrellq69YZsNwzUSyXh` | Intense cinematic American male | Sports, action, horror, dramatic trailers, high-impact hype. |
| Foley | `YkHbp3e8G9cEwq8igiKg` | Mature documentary American male | Documentary, storytelling, grounded editorial narration. |
| Silas | `5MzdXfNI3TSWsCPwZFrB` | Premium cinematic American male | Luxury, emotional brand films, slow dramatic narration. |
| Marv | `3HVqMrtg7gWyWkIQWUAC` | Older trustworthy American male | Testimonials, heritage brands, finance, insurance, wise narrator. |
| John | `lXyLz3Gu0YqdG8RfvIyZ` | High-energy American male | Launches, live-event promos, trailers, upbeat commercial reads. |

Suggested pairs for dialogue:

- Hale + Sia: warm, polished commercial conversation.
- Christopher + Sia: authoritative explainer with energetic response.
- Silas + Marv: cinematic narrator and experienced interviewee.
- John + Foley: hype voice contrasted with grounded documentary delivery.

Do not invent a voice ID. If the requested accent or profile is absent, explain the closest available curated option and suggest a short audition before producing the full script. If the user wants a reusable custom voice from a recording, use `creativeclaw-clone-voice`; after cloning, return here and generate speech with its `character_id`.

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
| `stability` | About `0.3` for Creative/emotive, `0.5` for Natural/balanced, `0.8` for Robust/consistent. High values may weaken tags. |
| `similarity_boost` | Start near `0.75`; raise carefully when timbre consistency matters. |
| `speed` | Start at `1.0`; use about `0.95` for intimate narration or `1.05` for energetic ads. |
| `use_speaker_boost` | Leave enabled when exposed. |

Useful presets:

```json
{ "voice_settings": { "stability": 0.5, "similarity_boost": 0.75, "speed": 0.95 } }
```

Calm documentary or premium narration.

```json
{ "voice_settings": { "stability": 0.3, "similarity_boost": 0.7, "speed": 1.05 } }
```

Expressive advertisement or launch read.

```json
{ "voice_settings": { "stability": 0.4, "similarity_boost": 0.85, "speed": 0.95 } }
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
    "voice_settings": { "stability": 0.3, "similarity_boost": 0.7, "speed": 1.05 },
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
    "voice_settings": { "stability": 0.5, "similarity_boost": 0.8, "speed": 0.94 }
  }
}
```

Hebrew commercial:

```json
{
  "model": "speech/elevenlabs-v3",
  "voice_id": "dXtC3XhB9GtPusIpNtQx",
  "text": "[curious] מה אם הרעיון הבא שלכם כבר מוכן להפוך לסרט? [pause] [excited] מתחילים עכשיו.",
  "extras": {
    "language_code": "he",
    "voice_settings": { "stability": 0.4, "similarity_boost": 0.75, "speed": 1.0 }
  }
}
```

## Quality and feedback

Listen for names, acronyms, numbers, language, accent, tag leakage, emotional fit, abrupt starts or endings, clipped words, volume jumps, and pace. Revise punctuation or one local tag before changing the voice. Keep a seed when comparing small prompt changes if the runtime supports it.

Use `submit_feedback` for repeated pronunciation failures, quality degradation, unavailable voices, missing language support, confusing parameters, or explicit voice requests. Include the voice name/ID, language, settings, and concrete issue without sharing private recordings.
