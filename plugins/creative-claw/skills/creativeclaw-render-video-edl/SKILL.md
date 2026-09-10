---
name: creativeclaw-render-video-edl
description: "Execute an explicit video edit decision list with Creative Claw: ordered cuts, original audio, vertical padding or static/moving crop paths, and source-timed captions. Use for precise multi-cut edits or as the rendering specialist under create-reels; it does not choose highlights or automatically track faces."
---

# Render a video edit decision list

Read [shared execution guidance](references/workflow-basics.md) once per task. Use this skill for the mechanics of an already chosen edit. Use `creativeclaw-create-reels` when the agent must choose the moments first. No HTML rendering or generative-video model is needed.

## Confirm supported inputs

Discover `render_video_edl` on the current connection. This is a pilot: if missing or not configured, say so; never claim a deployed test worker makes it available on production. Simple single trims can use existing editing tools; do not silently substitute a lossy multi-job approximation for an exact EDL.

Import the actual source file using [platform-upload.md](references/platform-upload.md). The tool requires a finalized video asset in the current workspace, not a webpage, local path, or arbitrary download URL. A transcript URL alone is not source footage. Inspect source metadata and representative frames; do not invent dimensions, word times, or coordinates.

Read [the EDL contract and examples](references/edl-contract.md) before building input. The runtime schema is authoritative.

## Compile and execute

1. Keep an immutable source URL and source-timed transcript. Ranges are half-open `[start,end)` seconds, in output order. Each range is at least 150ms; ranges must not overlap. Maximum 40 ranges and 300 output seconds per job. Reordering is allowed; duplication, speed changes, B-roll, music beds and independent audio/video timelines are not supported.
2. Choose safe boundaries before rendering. Listen around the edges if possible. Avoid clipped consonants, breaths and unfinished reactions. Favor a natural gap; preserve enough lead-in and tail for the specific speech. The renderer does not extend ranges automatically. Include a short final release when available without entering the next word. Do not remove every pause or imply a different meaning.
3. Set the requested output width and height; 1080×1920 is only the default. Portrait, landscape, square and custom even dimensions from 128–1920 are supported regardless of source orientation. Choose `pad` when full-frame content matters or position is uncertain. Choose `center_crop` only after verifying the subject stays visible. For `crop`, provide an even source-pixel rectangle matching the chosen output aspect ratio. Static coordinates or explicit keyframes are supported, not both. Keyframes start at zero relative to that segment; positions remain inside the display-oriented source. Smooth interpolation is not automatic face tracking. If a speaker leaves the crop, revise the path or pad; never stretch footage or guess where a face is.
4. Captions are optional: omit `captions` for a clean render. Burned-in source captions remain part of the video pixels, while selectable subtitle streams are not carried into the output. When adding captions, pass real source-timed words; the tool remaps them after cuts and burns them last. It rejects cuts through supplied words. Caption text is verbatim unless correction/translation is requested; corrected text keeps verified timings. For only coarse sentence timestamps, obtain word timing or render the cuts first and use `add_subtitles` on the completed output. Never fabricate word alignment. Karaoke for overlapping speakers or RTL text needs visual review; use plain captions when uncertain.
5. Default `audio_fade_ms: 30` applies short edge fades at discontinuities; this suppresses clicks, not bad sentence cuts. Original audio remains in sync. Contiguous ranges do not receive a join fade. `normalize_audio` is opt-in whole-output loudness normalization; not denoising or music ducking.
6. Submit one `render_video_edl` call per output. Save job IDs and the exact EDL. Follow [job-recovery.md](references/job-recovery.md); poll the existing job after timeouts, never blindly resubmit.
7. Inspect the final encoded video, contact sheet and report. Verify every splice with roughly 1.5 seconds of context on each side, first/final spoken sounds, crop continuity, caption placement/spelling/sync and original audio. Technical decode/geometry/duration checks do not establish editorial or perceptual correctness. Intentional black/silence can be warnings. State any playback limitation honestly. Revise only identified faults within authorization and budget; do not repeatedly rerender speculatively.

Deliver the new asset and preserve the original. Report remaining issues instead of describing a technically valid file as fully reviewed.
