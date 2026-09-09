---
name: creativeclaw-xai-tts
description: "Apply xAI TTS voice casting, expressive speech-tag prompting, multilingual delivery, and telephony output after Creative Claw selects speech/xai-tts. Use when the user requests xAI speech or an xAI voice, or when a voiceover workflow routes to xAI TTS."
---

# Creative Claw — xAI TTS

Use this model specialist inside `creativeclaw-generate-voiceover`. It supplies casting and performance direction for `speech/xai-tts`; the outcome skill still owns the script, generation, review, and delivery.

xAI TTS is a strong fit for expressive narration, assistants, podcasts, long copy, and phone/IVR audio. Its distinctive control surface is markup inside `text`: square-bracket inline events create a sound or pause at one point, while angle-bracket wrapping tags change the delivery of a complete phrase.

## Core workflow

1. Identify the language, audience, use case, speaker character, emotional arc, pronunciation risks, output destination, and target duration.
2. Select `speech/xai-tts`, then call `get_model_params({ model: "speech/xai-tts" })` so runtime fields and voice availability remain authoritative.
3. Offer two fitting voices from the runtime catalog when the user wants to choose. Use Eve only when the brief gives no useful casting preference.
4. Preserve approved wording. Add supported speech tags only when they fit the requested performance.
5. Call `generate_speech` with `model`, `text`, and `voice_id`. Add language or output settings only when needed.
6. Audition pronunciation, pace, emotional fit, cue execution, tag leakage, clipping, and consistency. Revise punctuation or the smallest affected tagged span before recasting.
7. Generate separate speakers or independently editable sections in separate calls, then combine approved clips when required.

## Creative Claw call shape

```json
{
  "model": "speech/xai-tts",
  "voice_id": "eve",
  "text": "This is where everything changes. [pause] <emphasis>Ready?</emphasis>",
  "extras": {
    "language": "en"
  },
  "format": "mp3",
  "sample_rate": "24000"
}
```

- Creative Claw exposes the xAI voice as `voice_id`; the provider field is mapped internally.
- Put xAI performance markup directly in `text`. There is no separate tag array.
- `generate_speech` does not accept `agentic_prompting`; preserve the exact performed script yourself.
- Do not send a generic `emotion` value for xAI TTS. Through Creative Claw, shape emotion with casting, writing, punctuation, inline events, and wrapping styles.
- Use the runtime schema instead of copying parameters from xAI's direct API. Provider features are not necessarily exposed by the Creative Claw wrapper.

## Voice selection

Use `get_model_params({ model: "speech/xai-tts" })` for the complete voice catalog, tone labels, and exact language codes. Choose timbre by use case, set `extras.language`, and audition pronunciation when requested. The voices are cross-language characters; a name does not establish a native regional accent. Keep one ID per speaker across a project.

## Speech-tag grammar

xAI has two different tag systems. Preserve their exact spelling and delimiter style.

### Inline square-bracket events

An inline tag triggers an event at its position. It does not wrap words.

| Category            | Supported tags                               | Purpose                                       |
| ------------------- | -------------------------------------------- | --------------------------------------------- |
| Pauses              | `[pause]`, `[long-pause]`, `[hum-tune]`      | Short pause, dramatic pause, or a hummed tune |
| Laughter and crying | `[laugh]`, `[chuckle]`, `[giggle]`, `[cry]`  | Audible emotional reactions                   |
| Mouth sounds        | `[tsk]`, `[tongue-click]`, `[lip-smack]`     | Characterful conversational sounds            |
| Breathing           | `[breath]`, `[inhale]`, `[exhale]`, `[sigh]` | Breath and release cues                       |

Good:

```text
I opened the box and [pause] it was completely empty. [sigh] Of course it was.
```

Do not invent ElevenLabs-style variants such as `[laughs]`, `[whispers]`, `[excited]`, `[angry]`, or `[sarcastically]` for xAI. xAI's documented inline form is singular—`[laugh]`, not `[laughs]`—and whispering is a wrapping style.

### Wrapping angle-bracket styles

A wrapping tag changes how all enclosed text is performed. Close every tag and wrap a complete phrase when possible.

| Category             | Supported tags                                                               | Purpose                                              |
| -------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------- |
| Volume and intensity | `<soft>`, `<whisper>`, `<loud>`, `<build-intensity>`, `<decrease-intensity>` | Quiet, whispered, loud, rising, or falling intensity |
| Pitch and speed      | `<higher-pitch>`, `<lower-pitch>`, `<slow>`, `<fast>`                        | Local pitch or pace change                           |
| Vocal style          | `<sing-song>`, `<singing>`, `<emphasis>`                                     | Melodic, sung, or stressed delivery                  |

Good:

```text
I need to tell you something. <whisper>It was here the whole time.</whisper>
```

Good nested phrasing:

```text
<slow><soft>Take a breath. You have time.</soft></slow>
```

Avoid wrapping isolated syllables, leaving tags unclosed, or nesting contradictory controls such as `<fast><slow>…</slow></fast>`.

## Emotional direction

xAI TTS does not document arbitrary named emotion tags such as `[happy]` or `[angry]`. Build the emotion from compatible controls:

| Direction              | Casting and text treatment                                                                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Warm reassurance       | Carina, Luna, Celeste, Aurora, Liora, or Ara; natural pauses; a short `<soft>` phrase                                                                     |
| Excitement             | Eve, Helios, Helix, or Zenith; brisk sentences; selective `<fast>` or `<emphasis>`; one `[laugh]` only if natural                                         |
| Authority              | Leo, Atlas, Perseus, or Rex; firm punctuation; selective `<slow>` or `<emphasis>`                                                                         |
| Cinematic drama        | Zagan or Orion; `[long-pause]`; `<build-intensity>` across a full clause                                                                                  |
| Intimacy or secrecy    | Carina, Lux, Liora, or Sal; a short `<whisper>` or `<soft>` span                                                                                          |
| Playful comedy         | Sirius, Eve, or Castor; timing with `[pause]`, `[chuckle]`, or `[giggle]`                                                                                 |
| Sadness or resignation | A grounded voice such as Lux, Liora, Sal, or Carina; restrained prose; `[sigh]`, `[exhale]`, or `[cry]` only when the script warrants an audible reaction |

Use one meaningful control at a performance change. Punctuation and phrasing should carry most of the read. A cue every sentence usually sounds mannered.

## Tag discipline

- Place inline cues where the sound should occur: `Really? [laugh] That's incredible.`
- Wrap complete phrases: `<whisper>Keep this between us.</whisper>`.
- Combine tags with punctuation instead of stacking many events together.
- Nested wrapping styles can work when compatible, but keep nesting shallow and easy to audit.
- Treat reactions such as `[cry]`, `[lip-smack]`, and `[hum-tune]` as audible content, not invisible mood labels.
- If a tag is spoken aloud or skipped, first verify spelling and closure, then simplify nearby markup and regenerate the smallest segment.
- Never translate tag names. Keep the English control tokens even when the spoken text uses another language.

## Write for speech

- Use natural punctuation and sentence rhythm.
- Spell names, acronyms, numbers, dates, and URLs the way they should be spoken when automatic reading is risky.
- Use paragraphs to mark meaningful shifts in topic or delivery.
- Keep exact approved copy unchanged unless the user permits rewriting.
- The provider accepts up to 15,000 characters per request. Split long work at sentence or paragraph boundaries when local review, recasting, or revision matters.
- Generate each speaker separately; xAI TTS does not use Dia-style `[S1]` and `[S2]` speaker labels.

## Languages

Use `extras.language` with an exact supported BCP-47 code when the script is short, locale-specific, or likely to be misdetected. Use `auto` for genuinely mixed-language copy.

| Language              | Code    | Language             | Code    |
| --------------------- | ------- | -------------------- | ------- |
| English               | `en`    | Bengali              | `bn`    |
| Arabic (Egypt)        | `ar-EG` | Chinese (Simplified) | `zh`    |
| Arabic (Saudi Arabia) | `ar-SA` | French               | `fr`    |
| Arabic (UAE)          | `ar-AE` | German               | `de`    |
| Hindi                 | `hi`    | Indonesian           | `id`    |
| Italian               | `it`    | Japanese             | `ja`    |
| Korean                | `ko`    | Portuguese (Brazil)  | `pt-BR` |
| Portuguese (Portugal) | `pt-PT` | Russian              | `ru`    |
| Spanish (Mexico)      | `es-MX` | Spanish (Spain)      | `es-ES` |
| Turkish               | `tr`    | Vietnamese           | `vi`    |

The model may speak additional languages with varying accuracy, but do not promise support beyond the runtime catalog. Test names and locale-specific numbers before committing to a long generation.

## Output recipes

General voiceover:

```json
{
  "model": "speech/xai-tts",
  "voice_id": "sal",
  "text": "<soft>Some ideas arrive quietly.</soft> [pause] The important ones stay with us.",
  "extras": { "language": "en" },
  "format": "mp3",
  "sample_rate": "24000"
}
```

High-quality editing master:

```json
{
  "model": "speech/xai-tts",
  "voice_id": "orion",
  "text": "<build-intensity>What began as a signal became a movement.</build-intensity>",
  "extras": { "language": "en" },
  "format": "wav",
  "sample_rate": "48000"
}
```

Phone or IVR audio:

```json
{
  "model": "speech/xai-tts",
  "voice_id": "rex",
  "text": "Thanks for calling. [pause] Press one for sales, or two for support.",
  "extras": { "language": "en" },
  "format": "mulaw",
  "sample_rate": "8000"
}
```

Use `mulaw` for common North American and Japanese G.711 systems, `alaw` for many European telephony systems, `wav` for lossless editing, and `mp3` for ordinary delivery. Confirm the receiving platform's required codec and sample rate rather than assuming.

## Completion standard

Listen to the result. Check names, acronyms, numbers, locale, tag execution, emotional arc, unnatural pauses, abrupt starts or endings, clipped words, noise, and loudness changes between chunks. If the base timbre is wrong, recast; if one moment is wrong, adjust that moment's punctuation or tag and regenerate only that section.

Use `submit_feedback` for repeated provider failures, missing voices, schema mismatches, persistent tag leakage, or explicit user feedback. Include the model, voice ID, language, output format, exact failing tag pattern, and a concise description without exposing private script content unnecessarily.
