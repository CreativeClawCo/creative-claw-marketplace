# Creative Claw , MiniMax Speech 2.8 HD

Read [shared execution guidance](../workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Use this model reference inside `creativeclaw-generate-voiceover`. MiniMax is the strongest alternative when a native system voice, broad multilingual catalog, or global emotion/pitch controls matter more than ElevenLabs v3's line-level delivery tags.

## Workflow

1. Identify the script language and regional variant, speaker profile, use case, emotion, pronunciation risks, and target pace.
2. Choose a native system `voice_id` from `get_model_params`. Use `Wise_Woman` only for an unspecified English brief; do not carry that default into another language.
3. Call `get_model_params({ model: "speech/minimax-hd" })` and treat its voice IDs, `language_boost` values, and parameter ranges as authoritative.
4. Preserve approved wording. Use MiniMax pause and interjection syntax only; do not copy ElevenLabs or xAI tags.
5. Call `generate_speech` with `model`, `text`, `voice_id`, and the exact `language_boost`. Add the top-level `emotion` or `speed` only when useful; put pitch, volume, format, and pronunciation controls in the current runtime-supported fields.
6. Audition pronunciation, regional accent, emotion, pace, cue leakage, clipping, and loudness. Fix the smallest affected section before recasting the whole script.

## Voice selection

Use `get_model_params({ model: "speech/minimax-hd" })` for current system voice IDs, language labels, and provider-supported controls. Match the script language before delivery style. Offer two suitable voices when the user asks to choose. Keep one voice ID per speaker across a project.

The curated catalog includes English, Mandarin, Spanish, Portuguese, French, German, Italian, Arabic, Hindi, Japanese, and Korean system voices. Hebrew language support does not imply a Hebrew-native voice: the current curated subset has none. Do not promise a native accent without auditioning it.

## Performance controls

- Pauses use `<#x#>`, where `x` is 0.01,99.99 seconds: `Take a breath.<#0.4#>Now begin.`
- Supported interjections include `(laughs)`, `(sighs)`, `(coughs)`, `(clears throat)`, `(gasps)`, `(sniffs)`, `(groans)`, and `(yawns)`.
- `emotion` is global. Use only values returned by `get_model_params` for the active provider; Pika and fal expose different emotion sets. Omit it for a neutral read.
- Use punctuation for local phrasing. Do not invent `[excited]`, `<whisper>…</whisper>`, or other provider-specific tags.
- Start with `speed: 1`. Prefer about `0.9,0.97` for reflective narration and `1.03,1.1` for energetic ads; stay within the runtime range.
- Use a pronunciation dictionary for recurring names or brands when the runtime exposes it. Write a name phonetically in the script for a one-off correction.

## Call example

```json
{
  "model": "speech/minimax-hd",
  "voice_id": "Spanish_Narrator",
  "text": "Hoy empieza una nueva etapa.<#0.4#>(sighs) Y esta vez, vamos preparados.",
  "language_boost": "Spanish",
  "speed": 0.96
}
```

## Completion standard

Keep one voice ID per speaker across a project. For alternate languages, recast with a native system voice rather than assuming one source voice will retain a native accent. Use `get_model_params` to discover additional supported voices. Do not use example search for voice selection.
