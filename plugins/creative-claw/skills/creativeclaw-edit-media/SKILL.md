---
name: creativeclaw-edit-media
description: "Edit existing video or audio with Creative Claw: trim clips, resize for social formats, add automatic captions, transcribe, clean speech, extract frames, or combine finished media. Use when the source footage or recording should be preserved; route invented scenes and generative transformations to generation skills."
---

# Edit Existing Media

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Turn supplied footage or audio into a finished derivative. Use the user's requested edits and sensible defaults without a settings questionnaire. Preserve the original asset.

## Select only necessary operations

| Requested change | Tool and important boundary |
| --- | --- |
| Shorten a video | `trim_video`: set `start_time` explicitly, including zero, and either `end_time` or `duration`. |
| Resize or make a vertical version | `scale_video`: set even dimensions and an explicit `mode`. `crop` is center crop; `pad` preserves the full frame; `stretch` distorts it. This is not subject tracking or AI enhancement. |
| Burn automatic captions | `add_subtitles`: operates on the current video and transcribes automatically. Set the known spoken `language`; do not translate unless requested. |
| Get a transcript or find a spoken passage | `transcribe`: pass exactly one of `audio_url` or `video_url`; reuse existing timing when available. |
| Clean a noisy recording | `isolate_audio`: preserve and compare the original; cleanup can alter speech. |
| Get still frames | `extract_frames`: discover the current tool schema for first/last/sampling controls. |
| Combine clips or add one finished audio track | `merge_media`: read [assembly guidance](references/media-assembly.md). |
| Enhance resolution or remove a background | `upscale_media` or `remove_background`, only for the requested media type and supported parameters. |

Use `creativeclaw-generate-video` for invented footage or a generative source-video transformation. Use `creativeclaw-add-video-intro-outro` for bookends. HTML rendering requires the user's explicit choice; a captions request alone does not select that route.

Use `creativeclaw-create-reels` when selecting highlights from long footage, or `creativeclaw-cut-and-reframe-video` for explicit multi-cut edits, moving crop paths and source-timed word captions. Both require `cut_and_reframe_video` to be available and configured.

## Workflow

1. Reuse the known asset or import the missing source through [platform-upload.md](references/platform-upload.md). Use available metadata/playback to establish duration, aspect ratio, audio, and protected content; do not invent measurements.
2. Apply the smallest requested edit chain. For a user-specified range, trim directly. Transcribe first only if text or timing is needed to choose cuts. For a clip selection request, use the transcript to choose a coherent section and verify visual relevance when possible.
3. Finish cuts and merges before captions. Resize to the final framing before burning text. For vertical delivery, use center crop only when the subject remains visible; otherwise use padding or ask about a material framing tradeoff. Do not claim automatic face tracking.
4. Resolve each queued operation with `check_job` before passing its result into the next. On failure, follow [job-recovery.md](references/job-recovery.md) and resume from the latest completed derivative.
5. Add automatic subtitles to the final edited video if requested. The current tool accepts style/language settings, not an edited transcript or SRT payload. Do not promise verbatim corrected or translated captions through unsupported fields.
6. Inspect final length, framing, spoken content, caption sync/safe areas, and audio using available capabilities. Name/tag the result with the project and edit role; provide the finished asset and any material inspection limitation.

For “make this a captioned vertical clip,” reuse the supplied footage, trim only if a shorter clip was requested, resize with a suitable explicit mode, then add captions. Skip model discovery and generation when all requested changes are supported processing operations.

## Limits that change the plan

- A public YouTube URL can go directly to `transcribe`, yielding caption segments. It is not a directly downloadable source for trimming, resizing, or subtitle rendering; obtain the actual video asset for those steps.
- Automatic subtitles already transcribe. Do not add a separate transcription job unless the user also needs a transcript or it guides clip selection.
- Mixing narration with music, ducking, crossfades, or exact caption-file rendering require additional capabilities. Explicit moving crops and source-timed word captions are supported by `cut_and_reframe_video` when available; automatic face tracking is not. State the specific missing operation before creating assets that cannot be assembled as requested.
- `estimate_generation` does not estimate these processing operations. Only discuss cost when relevant to the user's request, and do not label a partial generation estimate as the total edit cost.
