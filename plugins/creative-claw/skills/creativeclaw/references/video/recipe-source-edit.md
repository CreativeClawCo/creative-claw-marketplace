# Recipe: edit or extend existing footage

Proposed workflow example. Determine whether the user wants changes INSIDE the source or new footage AFTER/BEFORE it. Read [reference production](reference-production.md) and the selected model guide.

## Targeted edit

Example request: "Change the sky in seconds 8 to 13 to sunset; leave the rest alone."

Inspect source duration and identify the exact interval. Preserve the original. Use trim_video to extract the five-second interval, then pass it through a currently supported source-edit route. Do not regenerate the whole video. For Gemini Omni, a concise prompt is:

"Replace only the overcast sky with a warm sunset. Keep the people, faces, clothing, camera movement, action timing, buildings and ground unchanged. Preserve the original scene structure. No new objects, text or cuts."

Use video_urls for the source with the selected model's exact input contract. For Seedance 2.5, use its explicit edit task mode, auto aspect ratio and source-locked duration as documented. Do not apply those fields to Omni.

To replace the interval with a new scene instead of changing it, use `video/minimax-h3-max-insert` on the full source: `extras.start_time` where the new scene begins, `extras.resume_time` where the original resumes, and `duration` for the new scene. It returns the source with the new scene in place.

Resolve the edited interval and concatenate it between untouched spans. Inspect boundary cuts, total duration, identity and color continuity. Preserve original audio unless replacement was requested; if generation altered it, put the original track back with `merge_audio_video` (default replace mode). Generative edits cannot guarantee pixel-perfect logos, numbers or faces; use deterministic edits where exact preservation is essential.

## Replace a person

Example request: "Replace the actor in this clip with my Character."

Choose the route by what has to stay.

**Face/person swap:** prefer `video/kling-3.0-motion-control-pro`. Follow [Kling Motion Control Pro](kling-motion-control.md): prepare a source-scene image with only the target face replaced, pass it in `image_urls` with one 3 to 30 second source in `video_urls`, use video orientation and one facial element with both image fields, and identify the intended target as `@Element1`. Inspect other people, clothing and output duration; exact preservation is not guaranteed. Use H3 Max Recast only when explicitly selected for multi-person or multi-shot recasting, following its [guide](h3-max-recast.md).

**The look changes too** (outfit, setting, style), or the clip is outside those limits: make the new look as images before any video.

1. Find the shots with `extract_frames` in timeline mode and view the result with `load_image`. For each shot the person appears in, get one clean frame: `trim_video` to that shot, then `extract_frames` with `mode: "single"`.
2. Edit that exact frame with `generate_image`: `image_url` = the extracted frame, `extras.image_urls` = the Character sheet and face portrait, roles named. Ask for one change, for example: "Replace only the person in Image 1 with the person in Image 2. Keep the pose, framing, lighting, background and every other detail unchanged."
3. When editing the next frame, add the first edited frame as a reference so the person and outfit are identical in every shot.
4. Show the edited frames and get the user's approval of the new look.
5. Generate the video with a model that takes a source clip and reference images together. For Seedance 2.5, put the source in `video_urls` for motion, camera and timing, and the edited frames plus the Character sheet in `image_urls`, each cited with its token; read its guide for the task mode.
6. Put the original audio back with `merge_audio_video` if the generation changed it.

Use only photos of a person the user has the right to use.

## New ending

Example request: "Keep this video exactly as it is and add five seconds after the end."

When the source is 1.625–60 seconds and continuity of its characters, setting, motion, and look matters, use `video/minimax-h3-max-extend` with the source in `video_urls`. It returns the full extended video by default. Set `extras.output` to `continuation` when only the new footage is needed. Example:

"The cyclist continues along the same road and slows beside the lake. Preserve rider identity, bicycle, wardrobe, direction of travel, camera height and ambient sound perspective. One continuous camera move with no cut."

Use a whole-number `duration` of 5–15 seconds for the new footage. Leave `aspect_ratio` on `auto` unless a crop was requested. With `extras.output: "extended"`, inspect the returned stitched video directly and do not merge the source again. With `"continuation"`, merge the new segment with the original when a full result is needed. For a source over 60 seconds, extend a short tail excerpt and merge the continuation with the original. Use Seedance 2.5 `extend` only for heavy references or a long continuation; inspect its returned content before merging.

## Follow-ups and approval

"Make the ending warmer" is an edit request, not authorization to regenerate every shot. State whether the proposed change is deterministic editing or another paid generation if ambiguous. Preserve unchanged settings, source IDs and references. Follow [Review/Auto](review.md); a price-only or inspection request submits nothing.
