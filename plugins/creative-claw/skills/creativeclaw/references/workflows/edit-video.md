# Editing existing video footage

For end-to-end editing of existing footage — transcription, cut on word boundaries, color grading, burned-in subtitles, smart 9:16 reframing, multi-clip assembly — **use the `/video-use` skill**. It's the source of truth for that workflow.

```
/plugin install video-use
```

Then invoke `/video-use` and describe what you want done with the footage.

## When to stay in Creative Claw instead

`/video-use` orchestrates the pipeline, but the actual operations call Creative Claw MCP tools. Use these directly for one-shot edits without invoking the whole skill:

- `transcribe` — audio/video → text with word-level timestamps
- `trim_video` — cut a clip to a time range
- `scale_video` — resize (stretch / pad / crop)
- `add_subtitles` — burn karaoke-style subtitles
- `extract_frames` — pull frames as images
- `merge_media` — concatenate videos, add audio track, concatenate audio
- `remove_background` — remove background from video
- `upscale_media` — increase resolution
- `isolate_audio` — clean up audio
