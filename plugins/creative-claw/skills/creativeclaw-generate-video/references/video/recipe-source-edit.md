# Recipe: edit or extend existing footage

Proposed workflow example. Determine whether the user wants changes INSIDE the source or new footage AFTER/BEFORE it. Read [reference production](reference-production.md) and the selected model guide.

## Targeted edit

Example request: "Change the sky in seconds 8 to 13 to sunset; leave the rest alone."

Inspect source duration and identify the exact interval. Preserve the original. Use trim_video to extract the five-second interval, then pass it through a currently supported source-edit route. Do not regenerate the whole video. For Gemini Omni, a concise prompt is:

"Replace only the overcast sky with a warm sunset. Keep the people, faces, clothing, camera movement, action timing, buildings and ground unchanged. Preserve the original scene structure. No new objects, text or cuts."

Use video_urls for the source with the selected model's exact input contract. For Seedance 2.5, use its explicit edit task mode, auto aspect ratio and source-locked duration as documented. Do not apply those fields to Omni.

Resolve the edited interval and concatenate it between untouched spans. Inspect boundary cuts, total duration, identity and color continuity. Preserve original audio unless replacement was requested and use supported muxing if generation altered it. Generative edits cannot guarantee pixel-perfect logos, numbers or faces; use deterministic edits where exact preservation is essential.

## New ending

Example request: "Keep this video exactly as it is and add five seconds after the end."

When the source is 1.625–60 seconds and continuity of its characters, setting, motion, and look matters, use `video/minimax-h3-max-extend` with the source in `video_urls`. It returns the full extended video by default. Set `extras.output` to `continuation` when only the new footage is needed. Example:

"The cyclist continues along the same road and slows beside the lake. Preserve rider identity, bicycle, wardrobe, direction of travel, camera height and ambient sound perspective. One continuous camera move with no cut."

Use a whole-number `duration` of 5–15 seconds for the new footage. Leave `aspect_ratio` on `auto` unless a crop was requested. With `extras.output: "extended"`, inspect the returned stitched video directly and do not merge the source again. With `"continuation"`, merge the new segment with the original when a full result is needed. If the source exceeds the limit or another model fits the task better, use a supported continuation route and inspect its returned content before merging.

## Follow-ups and approval

"Make the ending warmer" is an edit request, not authorization to regenerate every shot. State whether the proposed change is deterministic editing or another paid generation if ambiguous. Preserve unchanged settings, source IDs and references. Follow [Review/Auto](review.md); a price-only or inspection request submits nothing.
