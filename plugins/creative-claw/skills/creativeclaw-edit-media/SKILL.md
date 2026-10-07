---
name: creativeclaw-edit-media
description: "Edit existing video or audio with Creative Claw without regenerating it: trim, cut and reorder chosen moments, resize or reframe, caption, transcribe, clean speech, extract frames, add or mix audio, burn a logo watermark, compose images and clips, or add an intro/outro. Use when the source footage should be kept; use generation skills for invented or transformed footage and create-reels to pick highlights."
---

# Edit Existing Media

For each Creative Claw tool call that exposes it, pass the optional `skills_used` array with `creativeclaw-edit-media`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw-edit-media/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and tell the user to open the plugin's Connectors tab in their app (or the MCP server list in a terminal client), connect Creative Claw, sign in, and ask again. Do not substitute other tools or describe a result that was not generated.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Turn supplied footage or audio into a finished derivative. Apply the requested edits with sensible defaults and no settings questionnaire. Keep the original asset unchanged.

## Pick only the operations you need

| Requested change | Tool and key limits |
| --- | --- |
| Shorten a video to one range | `trim_video`: set `start_time` explicitly, including zero, and either `end_time` or `duration`. |
| Cut, reorder, or reframe several chosen moments | `cut_and_reframe_video`: see [Multi-cut edits](#multi-cut-edits). |
| Resize or make a vertical version | `scale_video`: even dimensions and an explicit `mode`. `crop` is a center crop, `pad` keeps the full frame, `stretch` distorts. No subject tracking. |
| Burn automatic captions | `add_subtitles`: transcribes the current video itself. Set the spoken `language`; do not translate unless asked. |
| Get a transcript or find a passage | `transcribe`: exactly one of `audio_url` or `video_url`. |
| Clean a noisy recording | `isolate_audio`: keep and compare the original; cleanup can change speech. |
| Get still frames | `extract_frames`: check the schema for first/last/sampling controls. |
| Put narration or music on a clip | `merge_media` `merge_audio_video`: see [Audio](#audio). |
| Join clips or audio files in order | `merge_media` `merge_videos` or `merge_audios`. |
| Burn a logo or copyright mark onto a finished video | `merge_media` `overlay_images` with a transparent image. `remove_background` can prepare a logo. |
| Build a video from timed images, clips, and optional audio | `merge_media` `compose_video`. |
| Add an intro, outro, or both | See [Intros and outros](#intros-and-outros). |
| Upscale or remove a background | `upscale_media` or `remove_background`, for the media type and parameters they support. |

Read [assembly guidance](references/media-assembly.md) before any `merge_media` call.

Route elsewhere: `creativeclaw-generate-video` for invented footage or a generative change to the source; `creativeclaw-create-reels` when the agent must pick highlights from long footage; `creativeclaw-render-html` only when the user explicitly wants HTML or HyperFrames rendering. A caption request alone does not select HTML. For an exact text watermark, `render_html_image` with `transparent_background: true` can make the PNG for `overlay_images`.

## Workflow

1. Reuse the known asset or import the source through [platform-upload.md](references/platform-upload.md). Establish duration, aspect ratio, audio, and burned-in text from metadata and playback; do not invent measurements.
2. Run the smallest edit chain. Trim a user-given range directly. Transcribe first only if text or timing is needed to choose cuts.
3. Finish cuts and merges first, then resize to the final framing, then burn captions. Use a center crop only when the subject stays visible; otherwise pad or ask about the framing tradeoff.
4. Resolve each queued job with `check_job` before passing its result on. On failure, follow [job-recovery.md](references/job-recovery.md) and resume from the last completed derivative.
5. `add_subtitles` takes style and language settings, not an edited transcript or SRT. Do not promise corrected or translated captions through fields it lacks.
6. Check final length, framing, speech, caption sync and safe areas, and audio. Name and tag the result, and state any check you could not do.

For "make this a captioned vertical clip": reuse the footage, trim only if a shorter clip was asked for, resize with an explicit mode, then add captions. No model discovery or generation is needed.

## Multi-cut edits

Use `cut_and_reframe_video` when the user has chosen the moments (or `creativeclaw-create-reels` has) and wants them cut, reordered, or reframed in one render. It does not pick highlights, transcribe, or track faces. If the tool is missing or returns "not configured", say so. Do not fake an exact multi-cut edit with a chain of lossy trims.

Read [the cut-and-reframe contract](references/edit-contract.md) before building input.

1. The source must be a video asset in this workspace. Keep an unchanged source URL and a source-timed transcript. Inspect metadata and frames; do not invent sizes, word times, or coordinates.
2. Choose safe boundaries. Listen around each edge when you can. Avoid clipped consonants, breaths, and cut-off reactions. Prefer a natural gap, keep enough lead-in and tail, and end on a short release without entering the next word. The renderer does not extend ranges. Do not remove every pause or change what someone meant.
3. Set the requested width and height (1080×1920 is only the default). Use `pad` when position is uncertain. Use `center_crop` only after checking the subject stays in frame. For `crop`, give an even rectangle at the output aspect ratio, with static coordinates or keyframes set from real observations. If a speaker leaves the crop, revise the path or pad; never stretch or guess.
4. Captions are optional. Pass real source-timed words; the tool remaps them after the cuts and burns them last. With only sentence timing, render the cuts first and run `add_subtitles` on the result. Never fabricate word alignment. Use plain captions for overlapping speakers or right-to-left text unless you can review karaoke visually.
5. Submit one call per output. Save the job ID and the exact edit plan. After a timeout, poll the existing job; do not resubmit blindly.
6. Check every splice with about 1.5 seconds of context on each side, the first and last words, crop continuity, caption spelling and sync, and audio. Technical checks do not prove the edit reads well. Fix only identified faults; do not rerender speculatively.

## Intros and outros

Get the bookend segments, then concatenate them around the main video.

- **Supplied clips:** import and use them.
- **HTML title cards:** only when the user asks for HTML, HyperFrames, or code-rendered cards, or accepts that option when you offer it for exact text, fonts, and logos. Render them with `creativeclaw-render-html`. An intro/outro request alone does not authorize `render_html_video`.
- **Generated cinematic bookend:** use `creativeclaw-generate-video`. To match the look, `extract_frames` from the main video and pass the frame as a style reference.

1. Establish the main video's URL, size, aspect ratio, frame rate, audio, and platform.
2. Use the requested copy, logo, duration, and audio. Ask only about missing copy; do not invent a slogan or call to action. Keep bookends short.
3. Make segments at the main video's size and frame rate. Resolve and inspect each one.
4. Merge in playback order. Set `canvas_video_index` to the main video's zero-based index and `video_fit: "pad"` to keep mismatched frames whole, unless cropping is authorized.

```text
merge_media({
  operation: "merge_videos",
  video_urls: ["<intro-url>", "<main-video-url>", "<outro-url>"],
  canvas_video_index: 1,
  video_fit: "pad",
  pad_color: "black"
})
```

Omit a bookend that was not requested. `merge_videos` is a hard cut: no dissolves, crossfades, or audio carried across the join. If the main audio must continue under a bookend or fade across a cut, say so before making segments.

## Audio

- `merge_audio_video` replaces the clip's audio by default and ends at the shorter input. Check both durations first; do not silently shorten the video to fit a voiceover.
- `audio_mode: "mix"` keeps the clip's own sound and layers the new track over it, at the video's full length. Set `original_volume` and `added_volume` (0–1); about 0.3 keeps music under speech.
- `compose_video` layers one audio track over the clips at full level, and the output can run past the last clip. Use it when the added audio should extend beyond the picture.
- `merge_audios` joins files end to end; it does not layer them.
- There is no ducking, volume automation, or crossfade. Say which operation is missing before creating assets that cannot be assembled as asked.

## Limits

- A public YouTube, Google Drive, or social video page can go straight to `transcribe` as `video_url`. It is not a source for trimming, resizing, or subtitles; import the actual file for those.
- `add_subtitles` already transcribes. Add a separate `transcribe` job only for a transcript the user wants or for choosing cuts.
- `estimate_generation` does not cover these processing operations. Discuss cost only when it matters to the request, and do not present a partial estimate as the total.
