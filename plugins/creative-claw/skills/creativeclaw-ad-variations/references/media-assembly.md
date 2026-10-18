# Complete audio and video assembly

## Choose a merge operation

`merge_media` accepts an `operation` string. The server supports `merge_audio_video`, `merge_videos`, `merge_audios`, `overlay_images`, and `compose_video`. Use direct Creative Claw asset URLs or other publicly downloadable media URLs. Resolve queued jobs with `check_job` before using their outputs. If a client still shows an older cached schema without a new operation or its fields, refresh the Creative Claw connection.

| Need | Operation | Main inputs |
| --- | --- | --- |
| Replace a video's audio, or layer a track over it | `merge_audio_video` | `video_url`, `audio_url`; optional `audio_mode` (`replace` default, or `mix`), `original_volume`, `added_volume`, `start_offset` |
| Concatenate full videos | `merge_videos` | Ordered `video_urls`; optional `video_fit`, `canvas_video_index`, `pad_color` |
| Concatenate audio sequentially | `merge_audios` | Ordered `audio_urls`; optional `audio_format` |
| Burn one or more fixed image watermarks onto a finished video | `overlay_images` | `video_url`, `overlays` |
| Make a video from ordered still images and video clips, with optional audio | `compose_video` | `clips`; optional `audio`, `content_fit` |

## Watermark a finished video

For a permanent logo or copyright mark on an existing video, use `merge_media` with `operation:"overlay_images"`. This creates a new MP4 with the marks burned into every frame and the source audio copied. Keep the original video as the unchanged master; do not regenerate it.

1. Prepare each overlay as a tightly cropped image with a transparent background. For a logo on a solid background, use `remove_background` with `type:"image"` first. For exact copyright text, use `render_html_image` with `transparent_background:true` to create a tightly cropped PNG.
2. Supply one to eight overlays as `{image_url,position,width_percent,margin_px?}`. The nine positions are `top_left`, `top_center`, `top_right`, `center_left`, `center`, `center_right`, `bottom_left`, `bottom_center`, and `bottom_right`. `width_percent` is the displayed image width as a percentage of the video width. `margin_px` is the edge inset and defaults to 48. Later images appear above earlier ones. Choose a width that also fits the overlay's height inside the frame.
3. Resolve the job with `check_job`, then inspect placement, duration, and audio.

```json
{"operation":"overlay_images","video_url":"https://example.com/master.mp4","overlays":[{"image_url":"https://example.com/logo.png","position":"bottom_right","width_percent":12,"margin_px":48}]}
```

## Make a video from images or clips with sound

For a slideshow or simple montage from existing images and optional video clips, use `merge_media` with `operation:"compose_video"`. It accepts one to 25 `clips` in playback order.

1. Each image needs `{type:"image",url,duration_seconds}`. Each video needs `{type:"video",url}` and plays for its full duration. Video source audio is included by default; set `include_audio:false` on a clip to omit it.
2. An optional soundtrack is `audio:{url,start_delay_seconds?}`. The delay defaults to zero. The soundtrack is layered at full level over enabled clip audio, with no volume control. `content_fit:"contain"` preserves the full image or frame with padding; `"cover"` fills the canvas by cropping.
3. The first video defines output width and height. If there are only images, the first image defines the canvas, capped near 1080p. The result lasts through the longer of the visual sequence and delayed soundtrack, holding the final frame if needed. Resolve with `check_job` and verify order, framing, audio, and duration.

```json
{"operation":"compose_video","clips":[{"type":"image","url":"https://example.com/title.png","duration_seconds":3},{"type":"video","url":"https://example.com/scene.mp4","include_audio":false},{"type":"image","url":"https://example.com/end.png","duration_seconds":4}],"audio":{"url":"https://example.com/music.mp3","start_delay_seconds":0},"content_fit":"contain"}
```

Use `merge_videos` for only full video clips with their original audio. Use `compose_video` when still images, per-clip audio control, or a final-frame hold are needed. The service checks source URLs before starting the render and reports a bad input URL by field.

## Timing before merging

For narration-driven work, generate or reuse the final speech before locking clip durations. Keep at most 2.5 spoken words per clip second, with about 0.5 s of air at each end, and lock durations from the audio's `wordTimings`, not word-count guesses. Native-dialogue video and edits of existing footage may use different timing anchors; do not generate redundant voiceover.

`merge_audio_video` has two modes:
- `audio_mode: "replace"` (default) discards the clip's audio, including dialogue and ambience, and ends at the shorter input. Check both durations; do not silently shorten the video to fit a voiceover.
- `audio_mode: "mix"` keeps the clip's own sound, layers the new track over it, and keeps the video's full length. `original_volume` and `added_volume` (0–1, default 1) set each track's gain; use about 0.3 for music under speech. `start_offset` delays the new track.

To let added audio run past the end of the clip, use `compose_video` with that one clip plus `audio:{url,start_delay_seconds}`; it layers at full level. There is no ducking or volume automation.

## More than five audio clips

`merge_audios` concatenates sequentially; it does not layer tracks.

1. Keep the full ordered list of intended segments.
2. Submit the merge and resolve its job through `check_job`.
3. If completion returns `continuationRequired: true`, submit `merge_media({ operation: "merge_audios", audio_urls: nextAudioUrls })` using the returned list exactly. It places the completed prefix first and the remaining original clips afterward.
4. Resolve the new job and repeat only while continuation is requested. Never resend the already merged original prefix alongside its merged output.
5. Verify all intended segments appear in order and the final duration covers the complete narration before delivery.

For eight segments, the first job combines 1–5; the second combines that result with 6–8. One completed job is therefore not necessarily the complete requested merge.

## Films and bookends

Use the current merge controls to fit clips without extra scale jobs solely for mismatched dimensions. For `merge_media` with `operation:"merge_videos"`, `canvas_video_index` is zero-based and chooses the output canvas. Select the main video's index, usually 1 for intro/main/outro or 0 for main/outro. Choose `video_fit:"pad"` to preserve all source content when framing differs, `"crop"` for an authorized fill-frame crop, or `"strict"` to reject mismatches. The `"auto"` default can crop, so do not rely on it when preserving the frame matters. `pad_color` accepts `black`, `white`, or `gray`. Normalize codec/frame rate only with tools that actually expose those controls.

For `assemble_film`, the first shot supplies the canvas; there is no `canvas_video_index`. Use `video_fit:"pad"` when content preservation matters, `"crop"` for authorized cropping, or `"strict"` for matching frames. Use `mode:"connect"` to preserve complete clips. Use `"cut_end"` only when truncating clips to planned shot durations is intended and authorized.

Store per-shot narration in `audioUrl`, add it to its clip with `merge_audio_video` (`mix` keeps the shot's sound; `replace` discards it), and save the resulting `clipUrl` with `update_film_project({ id, patch_shots: [...] })`. A project-wide narration track goes in the tool's top-level `audio_url` (returned as `audioUrl`). `assemble_film` narration replaces every shot's audio; set `with_narration: false` when shots carry dialogue, then layer narration or music over the cut with `audio_mode: "mix"`.

Call `assemble_film` only when every intended shot has its final `clipUrl`. Resolve the assembly job with `check_job`; completion saves `assembledUrl` and advances to `preview_ok`. Do not mark `final` before the applicable user review or prior completion instructions have been satisfied.

`merge_videos` and film assembly perform concatenation, not transitions or a full sound mix. Generated music/SFX are separate assets until assembled through a supported method. Do not claim narration, music, and effects were layered by `merge_audios`.

Check final playback order, duration, cut points, audio presence/sync, and caption timing with available inspection tools. Preserve source clips and completed intermediates so one failed stage can resume without regeneration.
