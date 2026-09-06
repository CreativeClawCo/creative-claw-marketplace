# Edit existing footage

Preserve the original and create clearly named derivatives.

## Route the operation

| Need                                               | Tool or model path                                 |
| -------------------------------------------------- | -------------------------------------------------- |
| Cut a time range                                   | `trim_video`                                       |
| Resize, crop, or pad                               | `scale_video`                                      |
| Burn captions                                      | `add_subtitles`                                    |
| Extract first, middle, last, or timestamped frames | `extract_frames`                                   |
| Concatenate clips or audio; add audio to video     | `merge_media`                                      |
| Remove a background                                | `remove_background`                                |
| Upscale                                            | `upscale_media`                                    |
| Transcribe with timings                            | `transcribe`                                       |
| Clean a voice track                                | `isolate_audio`                                    |
| Generative source-video edit                       | `generate_video` with a compatible model/operation |

For generative edits, call `list_models({ category: "video" })` and `get_model_params` first. Current choices include:

- `video/gemini-omni-flash` for general source-video editing/reference transformation.
- `video/flux-3` with `operation: "extend"` and one source in `video_urls`.
- `video/ltx-2.3-fast` for `retake`, `extend`, `reframe`, or `audio_to_video`.
- `video/dreamactor-v2` with `operation: "animate_character"` for performance transfer.

## Transcript-driven cut

1. Import the source through `../platform-upload.md`.
2. Use `transcribe` and resolve the job when word timings are required.
3. Select cut points on word or sentence boundaries.
4. Use `trim_video` for approved ranges.
5. Scale/reframe, then add subtitles only after timing is locked.
6. Merge approved clips and audio.

## Audio polish

Use `isolate_audio` before transcription or final assembly when the recording contains material noise, music, or reverb. Keep the untouched source. Resolve the queued result before passing it downstream.

## Quality gate

Check cut boundaries, audio sync, subtitle timing and safe zones, crop on faces/products, resolution, duration, and continuity between merged clips. Give every derivative a name and tags that distinguish it from its source.
