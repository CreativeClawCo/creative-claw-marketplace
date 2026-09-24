---
name: creativeclaw-generate-voiceover
description: Generate narration, dialogue, expressive speech, or a new synthetic voice with Creative Claw. Use for spoken audio, a saved Character voice, or voice selection. For cloning a personal voice from a recording, load creativeclaw-clone-voice.
---

# Generate voiceover

Read [shared execution guidance](references/workflow-basics.md) before tools. The speech tool is `generate_speech`.

## Personal voice or stock voice

- "Clone my voice", "use my recording", or an unsaved personal voice: load $creativeclaw-clone-voice when available. If this skill is installed alone, read [the complete cloning workflow](references/voices/cloning.md). Obtain explicit consent, import privately, clone, test and save a reusable Character. Do not send source audio directly to ElevenLabs or Cartesia speech generation as a substitute for cloning.
- Existing clone: find the intended Character and pass `character_id`. Do not clone again.
- Stock voice: fetch the selected model's current `get_model_params` voice catalog and use its exact `voice_id`. For more Cartesia or ElevenLabs choices, call `get_model_params` again with `include_voice_catalog: true`, or read the public Markdown catalog linked in `voiceCatalog.extendedCatalogMarkdownUrl`. Never pass both selectors.
- Designing a new synthetic voice is different from cloning a person. Use the available voice-design capability and current schema when that is what the user requests.

## Choose and load one model guide

| Need | Recommended starting point |
| --- | --- |
| General stock narration, expressive speech, broad language coverage | [ElevenLabs v3](references/voices/elevenlabs-v3.md) |
| Steady narration from an existing clone | [ElevenLabs v2](references/voices/elevenlabs-v2.md) |
| Fast natural stock or cloned speech | [Cartesia Sonic](references/voices/cartesia.md) |
| A named alternative or a specific dialect/voice match | [MiniMax and xAI](references/voices/alternatives.md) |

These are task-based defaults, not a universal quality ranking. V2 can use public stock IDs, but v3 remains the default stock choice. If a user explicitly requests v2 stock speech, use a compatible public `voice_id` instead of silently switching. Do not automatically route stock corporate or long-form narration to v2.

For non-English, mixed-language or less common languages, read [language routing](references/voices/languages.md) before selecting a voice. A model supporting a language does not guarantee every stock voice has a native accent.

## Execute and deliver

1. Establish text, target language/accent and delivery. Preserve supplied words unless rewriting is requested.
2. Read the selected model's reference and current `get_model_params`. Reuse a current schema already loaded in this task. Use `list_models({ category: "speech" })` only when discovering alternatives.
3. Select a language-appropriate stock voice or saved Character and only settings accepted by that model. Never copy prompting tags across models.
4. Generate the requested take. For a new clone or uncertain pronunciation, offer a short audition before a long production, not an unrequested paid model sweep.
5. Follow queued results with `check_job` as directed by [job recovery](references/job-recovery.md). Show the completed audio through the available native preview.
6. Keep the Character ID and voice/model choice available for the requested continuation. Speech added to a video is an audio overlay, not automatic lip synchronization. A video's Character reference does not automatically select the saved clone for native video audio.
