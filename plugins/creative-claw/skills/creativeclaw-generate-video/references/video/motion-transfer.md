# Reuse a recorded movement

Read this when the user wants the same movement, dance, gesture, rhythm, or performance as an existing clip, including a wardrobe or character variant of an earlier animation. A request to invent a new movement from text does not require a reference video.

## Resolve the motion before choosing a model

Retrieve a clip the user already identified before asking for another upload. Resolve a known generation with `check_job`; use `search_assets` for a named saved video and the conversation's supplied media when available. Use the completed media URL, not a job ID or a page link. If the user refers to an exported GIF, prefer its original generated video when available.

If no source is available, ask: “Do you have a video showing the movement you want me to follow?” Wait for the answer before preparing a motion-transfer render. If they have no reference, explain that a text description can guide a new performance but will not reproduce a particular recording. Proceed with approximation only when they accept it. Do not ask again when they already supplied a usable source or explicitly chose an approximation.

## Give each reference one role

- **Driving video:** the movement, rhythm, poses and performance to follow.
- **Appearance image:** the intended character, wardrobe and scene. Reuse an approved image; make a new one only when needed and within the authorized scope.

Written descriptions, extracted stills, matching start/end frames and a Character sheet do not carry the source performance over time. Keep the actual driving video in the generation request. Naming the original clip in the prompt does not supply it as an input.

For character performance transfer, prefer [Kling Motion Control Pro](kling-motion-control.md). Inspect `get_model_params` for current compatibility and limits. Pass one appearance image in `image_urls` and the original performance in `video_urls`. Simple performance transfer does not require the face-swap guide's facial binding. Honor an explicitly chosen model; explain an incompatibility and agree on an alternative before switching.

For a targeted change within existing footage, such as changing a product's fabric while retaining its unfolding movement, use a compatible [source-edit workflow](recipe-source-edit.md) with the source video. Human performance transfer is not a universal solution for product motion, camera moves or every scene edit. Check the chosen operation's supported references instead of applying the general image-only recipe.

## Submit and compare

Before submission, identify which clip supplies movement and which image supplies appearance. Follow [Review/Auto handling](review.md) for the existing approval flow. If a source violates a model limit, explain the needed trim or alternative; do not silently drop the video and render from images instead.

Example: “Keep the same bounce, but put the avatar in a different outfit.” Retrieve the approved original animation, reuse the approved new-outfit image, and send both through the performance-transfer route. The prompt states what to retain; the video supplies the performance.

Compare the result against the driving clip for movement, rhythm and timing, and against the image for appearance. Reference conditioning improves fidelity but does not guarantee exact preservation. Report mismatches and follow the video skill's authorization rules before another paid take. Convert to GIF only after obtaining the requested video result.
