# Edit existing footage

Preserve the original and create clearly named derivatives. Distinguish deterministic editing, generative source-video editing, and continuation before choosing a model. Do not regenerate untouched footage merely because a generative model is involved.

## Route the operation

| Need                                               | Tool or model path                                 |
| -------------------------------------------------- | -------------------------------------------------- |
| Cut a time range                                   | `trim_video`                                       |
| Resize, crop, or pad                               | `scale_video`                                      |
| Burn captions                                      | `add_subtitles`                                    |
| Extract first, middle, last, or regularly spaced frames | `extract_frames`                             |
| Replace a person in a clip                         | `video/minimax-h3-max-recast`, or edited frames as references: [source edit recipe](../video/recipe-source-edit.md) |
| Concatenate clips or audio; add audio to video     | `merge_media`                                      |
| Burn a fixed logo or copyright image onto a finished video | `merge_media` with `operation:"overlay_images"`; see [assembly guidance](../media-assembly.md) |
| Make a video from timed images, full clips, and optional audio | `merge_media` with `operation:"compose_video"`; see [assembly guidance](../media-assembly.md) |
| Remove a background                                | `remove_background`                                |
| Upscale                                            | `upscale_media`                                    |
| Transcribe with timings                            | `transcribe`                                       |
| Clean a voice track                                | `isolate_audio`                                    |
| Generative source-video edit                       | `generate_video` with a compatible source-edit mode |
| Add new footage after a clip                       | `generate_video` with `video/minimax-h3-max-extend` |
| Replace an interval of a clip with new footage     | `generate_video` with `video/minimax-h3-max-insert` |
| Add new footage before a clip                      | Generate only the new footage, then `merge_media`   |

## Generative edit routing

Call `list_models({ category: "video" })` and `get_model_params` before choosing or submitting a generative edit. Runtime capability and limits are authoritative.

- For a source clip up to 10 seconds, default to `video/gemini-omni-flash`. It is the best-value Creative Claw route for one targeted natural-language change while retaining the source timeline. Use one clear change followed by an explicit preservation sentence.
- To extend a clip, default to `video/minimax-h3-max-extend`. Pass one source of 1.625–60 seconds in `video_urls`, a `duration` of 5–15 seconds for the new footage, and `aspect_ratio: "auto"`. Describe only what happens next. `extras.output: "extended"` (the default) returns the source plus the new footage; `"continuation"` returns only the new segment.
- To replace an interval inside a clip with new footage, use `video/minimax-h3-max-insert`. Pass one source in `video_urls`, `extras.start_time` where the new scene begins and `extras.resume_time` where the original resumes (both on the source timeline), and `duration` for the new scene's length. Describe the entry and return transitions. Optional identity or product images go in `image_urls`.
- For a 4–30 second source edit or a reference-rich transformation, use `video/seedance-2.5` with `extras.omni_reference_task_type: "edit"`. Use its `extend` mode only for heavy references or a long continuation. Use `aspect_ratio: "auto"` and the duration contract returned by `get_model_params`.

Use other models, such as FLUX 3 or Seedance Mini, only when the user asks for them. Never recommend or proactively route to an LTX or DreamActor model. If the user explicitly requests one, preserve their choice but do not present it as a recommended route.

## Preservation-first continuation

When the user says to leave the original video unchanged and add something before or after it:

1. Keep the complete original video untouched.
2. For a new ending, pass the source to `video/minimax-h3-max-extend` with `extras.output: "continuation"`. If the source exceeds the model's limit, or for a new beginning, trim only the smallest useful head or tail context.
3. Generate one continuation.
4. Concatenate the untouched original and the approved continuation with `merge_media`.
5. Preserve the original audio on the original span. Add or mix audio only for the new span unless the user requested a broader audio change.

This is a continuation job, not a full-source edit. Do not spend credits regenerating the original timeline. For an original clip longer than the model's source limit, trimming context is expected and does not require splitting the untouched portion into generative segments.

## Long edits and exact details

- If only one interval needs a generative change, trim that interval, edit it, and merge it back between untouched source spans. Do not process the entire source through the model.
- If multiple separated intervals need changes, propose the exact intervals and number of paid generations before submitting them.
- A model rejection, duration-limit failure, insufficient balance, or estimate does not authorize switching models or creating another take. Report the constraint and the best compatible route.
- Treat exact logos, jersey numbers, readable text, scoreboards, and brand marks as deterministic compositing or VFX requirements when they must remain exact. Generative preservation language reduces drift but cannot guarantee pixel-accurate details.

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
