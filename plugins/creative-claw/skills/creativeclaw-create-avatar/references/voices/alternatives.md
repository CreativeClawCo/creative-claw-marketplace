# Other speech models

Use when explicitly requested or when the current voice/language catalog gives a better task match. Do not silently switch from a chosen provider.

## MiniMax Speech HD

Model: speech/minimax-hd. Retrieve get_model_params and choose an exact system voice_id with the desired language/accent. Do not promise compatibility with a saved ElevenLabs or Cartesia clone.

Language selection is top-level language_boost, with names from its enum: for example "Hebrew", "Persian" or "Chinese,Yue". "auto" is available. Language support does not imply a native voice exists in the current curated subset.

Start at speed 1. Use supported global emotion values from the schema rather than v3 tags. Pauses can use <#0.4#>; supported speech effects such as (sighs) should be sparse. Example: "Let's take a breath. <#0.4#> We can begin again." Preserve literal words for exact-script requests.

## xAI TTS

Model: speech/xai-tts. Choose a returned stock voice_id. Use extras.language, not language_code, with a supported value such as "en", "ar-EG", "es-MX" or "pt-BR".

Supported inline cues include [pause], [laugh] and [sigh]. Some delivery uses wrapping tags such as <whisper>Keep this quiet.</whisper>. Do not copy ElevenLabs [laughs] or stability settings. Check current Usage before adding a control.

This integration does not promise saved ElevenLabs/Cartesia Character-clone support. Hebrew, Persian and Urdu are absent from the current exposed xAI language enum.

Both guides are based on Creative Claw's current adapter contracts; refresh get_model_params before using provider-specific parameters.

For full model-specific syntax, read only the selected guide: [MiniMax](minimax-speech-guide.md), [xAI](xai-tts-guide.md), or [Chatterbox one-off matching](chatterbox-guide.md).
