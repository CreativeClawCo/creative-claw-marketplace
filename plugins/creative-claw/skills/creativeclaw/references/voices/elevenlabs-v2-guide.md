# Creative Claw , ElevenLabs Multilingual v2

Use `speech/elevenlabs-v2` for controlled, natural narration. Use an existing cloned Character voice, not a stock catalog voice. V3 is the default for stock speech; Cartesia is also recommended for clones. Selecting v2 does not create or upgrade a Professional Voice Clone (PVC); Instant Voice Cloning and PVC are separate voice-creation methods.

## Choose deliberately

| Need | Model |
| --- | --- |
| Stock corporate narration, explainer, e-learning or audiobook | v3 |
| Steady narration with an existing consented clone | v2 or Cartesia |
| Assess how well an existing clone preserves a speaker in ordinary narration | Start with v2; compare the same clone and script if another audition is requested |
| Acting, laughter, whispers, emotional performance tags | v3 |
| Hebrew or another language outside v2's supported set | v3 or another explicitly compatible model |

V2 is recommended only for cloned speech, not a provider guarantee of better similarity. If v2 is requested without a clone, explain the routing policy and offer v3 stock speech or consented cloning; do not silently change the request. Do not recreate a clone to change TTS models. Creating another clone can alter its sound even from identical source audio.

## Execute

1. Reuse the supplied script, speaker, language and delivery. Infer minor defaults without restarting the brief.
2. Call `get_model_params({ model: "speech/elevenlabs-v2" })` once for current settings, supported languages, a runnable example and the curated voice catalog. Use `list_models({ category: "speech" })` when selecting alternatives.
3. Reuse the requested `character_id` for an existing consented clone. For stock speech, use v3 instead. If cloning is needed, use `creativeclaw-clone-voice` with the speaker's permission. Do not silently substitute a stock voice.
4. Preserve approved words. Add only supported punctuation or permitted pronunciation edits. For a straightforward approved script, generate directly; do not require an extra audition. Audition first when evaluating clone identity or resolving material uncertainty.
5. Call `generate_speech` with the explicit model. Preserve the output URL and job ID. Listen with available tools; never claim listening from file metadata alone.
6. For another attempt, change one variable. Reuse the same voice, script and output format to make comparisons meaningful.

## Script and pause rules

V2 does **not** understand v3 square-bracket performance tags such as `[calm]`, `[excited]`, `[pause]`, `[whispers]`, or `[laughs]`. They may be spoken or misinterpreted. Do not add them. If approved input contains these, explain the incompatibility and adapt only with permission to edit the script; never silently remove meaningful bracketed text.

Use sentence structure, commas and full stops for natural rhythm. A sparse SSML pause such as `<break time="0.5s" />` is supported, up to 3 seconds. Too many breaks can produce artifacts. V3 supports its audio tags but does not support these SSML breaks. Neither model supports phoneme tags through this workflow.

Keep production direction outside spoken text: “warm, confident founder” belongs in casting decisions, not as a sentence the voice will read. V2's emotion comes mainly from the reference performance and textual context, not a generic `emotion` field.

## Settings that actually reach the model

Top level for this clone-only workflow: `model`, `text`, `character_id`, optional `speed`.
Inside `extras`: `voice_settings`, `output_format`, `seed`, `timestamps`, `apply_text_normalization`, `previous_text`, `next_text`.

| Setting inside extras.voice_settings | Starting value | Practical adjustment |
| --- | --- | --- |
| stability | 0.5 | Raise modestly for inconsistent delivery; lower for flat delivery. Range 0,1. |
| similarity_boost | 0.75 | Raise carefully when resemblance is weak; high values can reproduce source artifacts. Range 0,1. |
| style | 0 | Start here. Increasing exaggerates the source performance and may add latency or instability. Range 0,1. |
| use_speaker_boost | true | May help resemblance at additional latency. |
| speed | 1 | Adjust gently within 0.7,1.2. Extreme values can hurt quality. |

Legacy flat fields such as `extras.stability` still work. Prefer nested `extras.voice_settings`; nested values win over flat aliases, and explicit top-level `speed` wins over both. Do not duplicate fields unnecessarily. V3 only exposes stability and speed; legacy similarity, style and speaker boost fields are ignored there.

```json
{
  "model": "speech/elevenlabs-v2",
  "character_id": "<existing Character UUID>",
  "text": "Welcome to our annual conference. Today, we bring the industry together to discuss real projects, investment and delivery.",
  "extras": {
    "voice_settings": {
      "stability": 0.5,
      "similarity_boost": 0.75,
      "style": 0,
      "use_speaker_boost": true,
      "speed": 1
    },
    "output_format": "mp3_44100_128",
    "timestamps": true
  }
}
```

For a stock catalog voice, use v3 instead. Do not pass source `audio_url` to ElevenLabs TTS.

## Languages and pronunciation

V2 supports English, Japanese, Chinese, German, Hindi, French, Korean, Portuguese, Italian, Spanish, Indonesian, Dutch, Turkish, Filipino, Polish, Swedish, Bulgarian, Romanian, Arabic, Czech, Greek, Finnish, Croatian, Malay, Slovak, Danish, Tamil, Ukrainian and Russian. Check discovery for current support. Hebrew is not supported.

Write in the target language. The v2 API does not support `language_code`; language is inferred from the script. The source voice influences accent, so a model switch cannot guarantee a native accent.

For names and dates, use approved spoken spellings when needed: “twenty twenty-seven,” or letters separated with punctuation. Multilingual v2 does not support phoneme tags. Do not invent dictionary IDs or promise pronunciation dictionaries unless the runtime exposes that capability.

## Longer narration

Maximum request length is 10,000 characters. Split at paragraphs or sentences into manageable passages, keeping voice and settings fixed. `extras.previous_text` and `extras.next_text` may contain adjacent script context; these fields guide continuity without being spoken in the current output. Do not duplicate adjacent passages inside `text`.

Character alignment is requested by default. Use returned timings rather than guessed word timings. For assembly, follow the voiceover workflow's media-assembly guidance and verify joins, silence and total duration. Do not claim that stored audio is automatically mixed into a film.

## Diagnose before spending again

- Wrong words or names: adjust an approved spelling or punctuation.
- Flat read: lower stability modestly; assess whether the source performance is itself flat.
- Wavering identity: keep style at zero, keep the same clone, compare a small similarity change.
- Hiss, room sound or unnatural artifacts: inspect the source before increasing similarity.
- Good recording but poor resemblance: IVC has limitations; do not promise v2 fixes every voice.
- Needs laughter or acted emotional direction: offer v3 with the same Character and a suitable script.
- Provider failure: report the failure; do not silently switch models or voices.

For cloning guidance, recommend 1,2 minutes of consistent solo speech: recommended minimum 1 minute, recommended maximum 3 minutes. These are quality recommendations, not hard API duration limits. Preserve the source and the useful clone; replacement currently deletes the old voice.

## Sources

- [ElevenLabs models](https://elevenlabs.io/docs/overview/models)
- [Speech API contract](https://elevenlabs.io/docs/api-reference/text-to-speech/convert)
- [Speech prompting](https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices)
- [Instant Voice Cloning](https://elevenlabs.io/docs/eleven-creative/voices/voice-cloning/instant-voice-cloning)
