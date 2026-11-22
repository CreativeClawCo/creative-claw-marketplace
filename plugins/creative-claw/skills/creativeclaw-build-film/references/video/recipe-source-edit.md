# Recipe: edit or extend existing footage

Proposed workflow example. Determine whether the user wants changes INSIDE the source or new footage AFTER/BEFORE it. Read [reference production](reference-production.md) and the selected model guide.

## Targeted edit

Example request: "Change the sky in seconds 8 to 13 to sunset; leave the rest alone."

Never send the clip with only a text instruction. A video model redraws every frame from the words, so faces, props and places drift, and each correction costs a whole clip. Settle the change on a still first, where a retry costs a fraction of that.

1. **Find the interval.** Inspect the source duration and the exact seconds that change. Preserve the original and use `trim_video` to cut out only that interval. Do not regenerate the whole video.
2. **Get the frame.** If the clip was generated from a still (earlier in the conversation, or a start image in its generation record), use that still. Otherwise `extract_frames` in timeline mode finds the moment, then `mode: "single"` or `timestamps` returns the frame where the change shows best.
3. **Edit the frame** with `generate_image`: `image_url` = the frame, at the clip's aspect ratio. Ask for one change and name what stays. Image models can redraw the whole picture, so compare faces, framing and background with the original frame. For a small change in a wide frame, edit a crop around the subject; where code execution is available, paste back only the changed pixels.
4. **Show the edited frame** and get the user's go-ahead or changes before any video.
5. **Make the video from the frame.**
   - Clip generated from a still: animate the edited still as `image_url` with the same model, settings and prompt, adding only the change. This keeps the look most faithfully and costs one ordinary generation.
   - Real or long footage: a source edit with the interval in `video_urls` and the edited frame in `image_urls` as the look to match. Gemini Omni (up to 10 seconds) cites it as `<IMAGE_REF_0>`. Seedance 2.5 or Flash cites it as `@Image1` with `extras.omni_reference_task_type: "edit"`, auto aspect ratio and source-locked duration; do not apply those fields to Omni.

For Gemini Omni, a concise prompt is:

"Replace only the overcast sky with the warm sunset sky shown in <IMAGE_REF_0>. Keep the people, faces, clothing, camera movement, action timing, buildings and ground unchanged. No new objects, text or cuts."

To replace the interval with a new scene instead of changing it, use `video/minimax-h3-max-insert` on the full source: `extras.start_time` where the new scene begins, `extras.resume_time` where the original resumes, and `duration` for the new scene. It returns the source with the new scene in place.

Resolve the edited interval and concatenate it between untouched spans. Inspect boundary cuts, total duration, identity and color continuity. Preserve original audio unless replacement was requested; if generation altered it, put the original track back with `add_audio_to_video` (default replace mode). Generative edits cannot guarantee pixel-perfect logos, numbers or faces; use deterministic edits where exact preservation is essential.

## Replace a person

Example request: "Replace the actor in this clip with my Character."

**Swap the person, keep the scene** (one or several people, whole character or face only): call `swap_video_characters`. It picks frames, shows the new people in three or six free previews, waits for approval in Review mode, and renders with Seedance 2.5 Flash by default, or explicitly selected Pro, Lite or Kling. It aims to keep motion, camera and cuts, and restores source audio by default. Kling accepts 4 to 30 whole seconds at 720p or 1080p with up to eight combined identity references and no native draft completion. Name who becomes whom in `instructions`; source outfits stay unless the user explicitly requests a wardrobe change. Use Kling Motion Control Pro or H3 Max Recast for a swap only when the user names that model.

**The setting or style changes too**, beyond the people: make the new look as images before any video.

1. Find the shots with `extract_frames` in timeline mode and view the result with `load_image`. For each shot the person appears in, get one clean frame: `trim_video` to that shot, then `extract_frames` with `mode: "single"`.
2. Edit that exact frame with `generate_image`: `image_url` = the extracted frame, `extras.image_urls` = the Character sheet and face portrait, roles named. Ask for one change, for example: "Replace only the person in Image 1 with the person in Image 2. Keep the pose, framing, lighting, background and every other detail unchanged."
3. When editing the next frame, add the first edited frame as a reference so the person and outfit are identical in every shot.
4. Show the edited frames and get the user's approval of the new look.
5. Generate the video with a model that takes a source clip and reference images together. For Seedance 2.5, put the source in `video_urls` for motion, camera and timing, and the edited frames plus the Character sheet in `image_urls`, each cited with its token; read its guide for the task mode.
6. Put the original audio back with `add_audio_to_video` if the generation changed it.

Use only photos of a person the user has the right to use.

## New ending

Example request: "Keep this video exactly as it is and add five seconds after the end."

When the source is 1.625–60 seconds and continuity of its characters, setting, motion, and look matters, use `video/minimax-h3-max-extend` with the source in `video_urls`. It returns the full extended video by default. Set `extras.output` to `continuation` when only the new footage is needed. Example:

"The cyclist continues along the same road and slows beside the lake. Preserve rider identity, bicycle, wardrobe, direction of travel, camera height and ambient sound perspective. One continuous camera move with no cut."

Use a whole-number `duration` of 5–15 seconds for the new footage. Leave `aspect_ratio` on `auto` unless a crop was requested. With `extras.output: "extended"`, inspect the returned stitched video directly and do not merge the source again. With `"continuation"`, merge the new segment with the original when a full result is needed. For a source over 60 seconds, extend a short tail excerpt and merge the continuation with the original. Use Seedance 2.5 `extend` only for heavy references or a long continuation; inspect its returned content before merging.

## Follow-ups and approval

"Make the ending warmer" is an edit request, not authorization to regenerate every shot. State whether the proposed change is deterministic editing or another paid generation if ambiguous. Preserve unchanged settings, source IDs and references. Follow [Review/Auto](review.md); a price-only or inspection request submits nothing.
