---
name: creativeclaw-generate-voiceover
description: "Generate narration, dialogue, or expressive speech with Creative Claw, or design a new custom synthetic voice from a description. Use for spoken audio, voice selection, a saved Character voice, or 'make me a new voice'. To copy a real person's voice from a recording, use creativeclaw-clone-voice."
---

# Generate voiceover

Read [shared execution guidance](references/workflow-basics.md) before tools. The speech tool is `generate_speech`.

## Which voice

- "Clone my voice", "use my recording", or an unsaved personal voice: load creativeclaw-clone-voice when available. If this skill is installed alone, read [the complete cloning workflow](references/voices/cloning.md). Obtain explicit consent, import privately, clone, test and save a reusable Character. Do not send source audio directly to ElevenLabs or Cartesia speech generation as a substitute for cloning.
- Existing Character voice (cloned, designed or stock): find the Character with `list_characters` and pass `character_id`. Do not clone or design again.
- Stock voice: fetch the selected model's current `get_model_params` voice catalog and use its exact `voice_id`. For more Cartesia or ElevenLabs choices, call `get_model_params` again with `include_voice_catalog: true`, or read the public Markdown catalog linked in `voiceCatalog.extendedCatalogMarkdownUrl`. Never pass both selectors.
- New voice from a description (no recording): call `design_voice({ prompt })` with age, accent, timbre, pace and attitude, never a real person's identity. It returns three auditions; after the user picks, `design_voice({ action: "save", preview_id, character_id | character_name })`. Speak with `generate_speech({ character_id })` using `speech/elevenlabs-v4`, or `speech/gemini-3.8-flash-tts` for `provider: "google"`. If the save hits the limit, offer `replace_voice_option_id`; never quote plan prices. For a stock voice use `manage_character({ id, voice_model, voice_id })`. Details: [voice design](references/voices/voice-design.md).

## Choose and load one model guide

| Need | Recommended starting point |
| --- | --- |
| Stock narration, designed ElevenLabs voices, expressive speech, broad language coverage, and dialogue | [ElevenLabs v4](references/voices/elevenlabs-v4.md) |
| Google-designed voice | `speech/gemini-3.8-flash-tts` (read its `get_model_params`) |
| A clone, steady read | [ElevenLabs v2](references/voices/elevenlabs-v2.md) |
| A clone, fast natural speech | [Cartesia Sonic](references/voices/cartesia.md) |
| An explicitly requested v3 workflow | [ElevenLabs v3](references/voices/elevenlabs-v3.md) |
| A named alternative or a specific dialect/voice match | [MiniMax and xAI](references/voices/alternatives.md) |

Default to ElevenLabs v4 for stock and designed ElevenLabs voices. A clone works with v2, v4 or Cartesia: pass the selected model explicitly rather than relying on the omitted-model v4 default, and keep it for the whole project. V3 remains available for explicit legacy requests. V2 can use public stock IDs, but v4 is the stock choice. If a user explicitly requests v2 stock speech, use a compatible public `voice_id` instead of silently switching. Do not automatically route stock corporate or long-form narration to v2.

## Multiple speakers in one run

ElevenLabs v4 supports up to 10 voices in one `generate_speech` request through `extras.dialogue`. Pass ordered turns with `speaker`, `text`, and either `voice_id` or a saved Character voice (cloned or designed) `character_id` for each turn. Google Flash and Flash-Lite TTS also support two-speaker dialogue. Read the selected model's current schema and [v4 dialogue examples](references/voices/elevenlabs-v4-guide.md) before submission. Omit top-level voice selectors and `text` for dialogue. If a cached OpenAI tool schema still requires `text`, pass `text: ""`.

For non-English, mixed-language or less common languages, read [language routing](references/voices/languages.md) before selecting a voice. A model supporting a language does not guarantee every stock voice has a native accent.

## Execute and deliver

1. Establish text, target language/accent and delivery. Preserve supplied words unless rewriting is requested.
2. Read the selected model's reference and current `get_model_params`. Reuse a current schema already loaded in this task. Use `list_models({ category: "speech" })` only when discovering alternatives.
3. Select a language-appropriate stock voice or saved Character and only settings accepted by that model. Never copy prompting tags across models.
4. Generate the requested take. For a new clone or uncertain pronunciation, offer a short audition before a long production, not an unrequested paid model sweep.
5. Follow queued results with `check_job` as directed by [job recovery](references/job-recovery.md). Show the completed audio through the available native preview.
6. Keep the Character ID and voice/model choice available for the requested continuation. Speech added to a video is an audio overlay, not lip-sync, and a video's Character reference does not bring its voice into native video audio. For speech in video, read [voice in video](references/video/voice-in-video.md).
