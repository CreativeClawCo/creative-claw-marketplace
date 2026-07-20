# Editing existing video footage

For end-to-end editing of existing footage — transcription, cut on word boundaries, color grading, burned-in subtitles, smart 9:16 reframing, multi-clip assembly — first read `../platform-client.md`.

If the current client explicitly exposes a dedicated video-editing workflow, use it as the orchestrator. Do not install, search for, or invoke one when it is absent. In that case, perform the edit with the Creative Claw MCP tools below.

## When to stay in Creative Claw instead

Use these tools directly for one-shot edits and for any client without a dedicated local editing workflow:

- `transcribe` — audio/video → text with word-level timestamps
- `trim_video` — cut a clip to a time range
- `scale_video` — resize (stretch / pad / crop)
- `add_subtitles` — burn karaoke-style subtitles
- `extract_frames` — pull frames as images
- `merge_media` — concatenate videos, add audio track, concatenate audio
- `remove_background` — remove background from video
- `upscale_media` — increase resolution
- `isolate_audio` — clean up audio
