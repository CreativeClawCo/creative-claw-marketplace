# Reference-first video production

## Reference-first video pipeline

Default for every new generative clip. A video request authorizes one keyframe per planned shot: say so, don't ask. Skip only if the user asks for direct text-to-video, supplies a ready shot image, or is editing footage.

1. **Anchors (reuse first):** `search_assets`, `list_characters`, `get_theme`.
   - Person: Character sheet + clean face portrait; real person: also their best original photo.
   - Product: real photo or approved packshot; add a label/logo close-up when text matters.
   - Look: theme reference image or the first approved keyframe.
   - A recurring person or product with no anchor: create it first (creativeclaw-create-avatar, creativeclaw-product-photoshoot).
2. **Look line:** one sentence (palette, light, lens, medium). Paste it verbatim into every keyframe and video prompt.
3. **Keyframe per shot:** `generate_image` with the SAME image model all project (default `image/nano-banana-2`), `aspect_ratio` = the video's ratio, `image_url` = main anchor, `extras.image_urls` = other anchors, roles named ("Image 1 = exact face…"). One clean full-bleed frame: no text, grid or labels. Build from the anchors, never only from the previous keyframe.
4. **Check:** `check_job` for the URL; compare to the anchors (face, label, logo, colors); fix with one targeted edit.
5. **Show** keyframes plus the plan (model, duration, ratio) in one message. Review mode: call `generate_video` now; the card is the approval. Auto: ask once unless the user said go.
6. **`generate_video`, one mode per shot:**
   - People, several subjects or big motion: `image_urls` = [keyframe, identity anchor, product anchor] (2–4 total), cited with the model's tokens. `character_id` is fine here (appended last).
   - Exact opening (product hero, logo reveal): `image_url` = keyframe (+ `last_frame_url` if supported); no `image_urls`, no `character_id`.
7. **Next shot:** same anchors + look line. A previous clip's last frame is only an extra composition cue.
8. **Keep a list** (shot → keyframe → anchor URLs, roles, tokens). Save it in the Film project when one exists.

Use 2–4 strong references; more is not better. Existing assets count, so don't pay for extra images to reach a number or exceed a model's limit. For image prompting, read the [image model index](../images/index.md) and only the selected guide. Pass the actual image URLs in the video request; naming them in prose does not condition the model. Keep iteration bounded: planning-only, advice-only and estimate-only requests do not authorize paid images.

A Character sheet is identity guidance, never a literal opening frame. Reuse an approved sheet, or create one with creativeclaw-create-avatar when identity recurs.

## Review the references once

In Review mode, the video's request card approves the exact references, prompt and settings. Don't also ask for a chat approval of the same set, and don't call references approved before the user presses Generate. The card does not approve image or audio charges made before it.

Honor an earlier checkpoint the user asked for (for example "show me the first image first"). Character likeness approval and voice-cloning consent are separate decisions. Don't change the user's render mode.

## Input fields

- `image_urls` carries identity, product, wardrobe, environment, style or composition references, even for one image. The field is `image_urls`, not `images_url`.
- `image_url` is the literal opening frame. Bake the approved identity and product into that frame. Use `last_frame_url` only when the model supports it and the shot needs a destination.
- Don't mix literal frame fields with reference arrays unless the current model contract explicitly allows it.
- `character_id` appends the saved image to `image_urls` as a reference, never a start frame. Use it in reference mode; omit it with `image_url`/`last_frame_url` (the server rejects that mix). It never selects the Character's voice for native video audio.
- Use `video_urls` for source edits, motion or camera guidance, and continuity. Say what to borrow and what to keep. A source edit may not accept extra image references; don't force them.

## Voice, audio and continuity

For dialogue, narration or an exact voice, pick one path per speaking shot: read [voice in video](voice-in-video.md). Check the speech's `wordTimings` against the planned clip length before paying for video. Cloning needs its own explicit consent.

For connected clips, reuse the same Character, product and location anchors, with planned state changes named. Reuse the same voice and speech settings.

Don't let each shot invent its own background music. Prompt for dialogue, ambience and effects only, and say "no music". If the user wants a score or song, make ONE project-level track and layer it after assembly: `merge_media` `merge_audio_video` with `audio_mode: "mix"` keeps the clips' sound (`added_volume` about 0.3 under speech). The default `audio_mode: "replace"` discards clip audio and ends at the shorter input. `assemble_film` narration also replaces every shot's audio; set `with_narration: false` when shots carry dialogue.

## Prompt and deliver

Load the selected video model guide for exact tokens. Keep reference order, quoted dialogue and approved constraints. Describe chronological action, one main camera move, environmental motion, required audio and a plausible ending. Fetch `get_model_params` for limits and field placement.

Generate only the authorized shots. Follow [Review/Auto](review.md). Inspect output and continuity before assembly; don't claim to have watched media you couldn't inspect. Another paid take needs authorization, even after a failed or refunded job.
