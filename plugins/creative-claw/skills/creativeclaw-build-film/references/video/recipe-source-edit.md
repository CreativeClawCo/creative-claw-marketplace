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

Keep the original unchanged. Take the smallest supported boundary segment as context and use a supported continuation model, such as Seedance 2.5 when available. Example:

"Extend @Video1 forward from its ending. Over five seconds, the cyclist continues along the same road and slows beside the lake. Preserve rider identity, bicycle, wardrobe, direction of travel, camera height and ambient sound perspective. Show only the new continuation, not a replay of the original."

Use the model's explicit extend mode and numeric continuation duration. Check returned content to avoid concatenating duplicate source footage. Merge the new extension with the original, leaving the original pixels/audio untouched.

## Follow-ups and approval

"Make the ending warmer" is an edit request, not authorization to regenerate every shot. State whether the proposed change is deterministic editing or another paid generation if ambiguous. Preserve unchanged settings, source IDs and references. Follow [Review/Auto](review.md); a price-only or inspection request submits nothing.
