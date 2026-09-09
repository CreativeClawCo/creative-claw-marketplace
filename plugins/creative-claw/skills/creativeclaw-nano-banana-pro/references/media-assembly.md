# Complete audio and video assembly

## Timing before merging

For narration-driven work, generate or reuse the final speech before locking clip durations. Use returned speech timestamps/alignment or inspected media duration, not word-count guesses. Native-dialogue video and edits of existing footage may use different timing anchors; do not generate redundant voiceover.

`merge_audio_video` produces a result limited to the shorter input. Check both durations before submitting. To preserve a full video, provide an audio track covering its complete duration; trim excess only as needed. Do not silently shorten the video to fit a voiceover. If silence padding, looping, volume automation, or mixing is needed, use an available explicitly authorized editing method, or identify the missing capability before spending on a merge.

## More than five audio clips

`merge_audios` concatenates sequentially; it does not layer tracks.

1. Keep the full ordered list of intended segments.
2. Submit the merge and resolve its job through `check_job`.
3. If completion returns `continuationRequired: true`, submit `merge_media({ operation: "merge_audios", audio_urls: nextAudioUrls })` using the returned list exactly. It places the completed prefix first and the remaining original clips afterward.
4. Resolve the new job and repeat only while continuation is requested. Never resend the already merged original prefix alongside its merged output.
5. Verify all intended segments appear in order and the final duration covers the complete narration before delivery.

For eight segments, the first job combines 1–5; the second combines that result with 6–8. One completed job is therefore not necessarily the complete requested merge.

## Films and bookends

Match clip dimensions and aspect ratios before concatenation. Avoid stretching subjects; use an appropriate crop or padding choice. Normalize codec/frame rate only with tools that actually expose those controls.

Store per-shot narration in `audioUrl`, then mux it into each appropriate clip and save the resulting `clipUrl` with `update_film_project({ id, patch_shots: [...] })`. If using one project-wide narration track instead, set the tool's top-level `audio_url`; the returned project represents it as `audioUrl`.

Call `assemble_film` only when every intended shot has its final `clipUrl`. Resolve the assembly job with `check_job`; completion saves `assembledUrl` and advances to `preview_ok`. Do not mark `final` before the applicable user review or prior completion instructions have been satisfied.

`merge_videos` and film assembly perform concatenation, not transitions or a full sound mix. Generated music/SFX are separate assets until assembled through a supported method. Do not claim narration, music, and effects were layered by `merge_audios`.

Check final playback order, duration, cut points, audio presence/sync, and caption timing with available inspection tools. Preserve source clips and completed intermediates so one failed stage can resume without regeneration.
