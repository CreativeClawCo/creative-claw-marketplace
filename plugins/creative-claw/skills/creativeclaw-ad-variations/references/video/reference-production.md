# Reference-first video production

For a request to preserve or copy an existing movement, use [motion transfer](motion-transfer.md) first. Keep the driving video as a separate reference alongside the appearance image; the image pipeline below does not replace it.

## Prepare the scene before video

1. Make a clean still of the actual opening moment of **each new shot**, at the video's aspect ratio. Use `generate_image`, or Film's storyboard renderer. A ready scene frame supplied by the user serves the same purpose. Generate from text alone only when the user explicitly asks for it: without a picture the model invents the look, so every attempt differs and each correction costs a whole clip. To change existing footage, edit a frame of it first ([source edit](recipe-source-edit.md)). For an extension or recorded performance, keep the driving footage and make a still of any new person, object or place it introduces. Planning and estimating alone do not start paid work.
2. For each recurring location, reuse or generate one empty establishing image that fixes the doors, furniture, landmarks, props and light. For each recurring person, find their saved Character and approved sheet or make the missing sheet before drawing shots. Include real product photos and label details when applicable. Edit incorrect lettering, logos or designs on the source image before using it as an anchor.
3. Establish the cast's positions in the first occupied wide frame. Record who sits by which landmark, relative height, facing, eyelines and who holds each prop. For example, Maya is on the window bench with the mug in her right hand and Leo stands beside the till. A reverse angle changes their positions on screen while their places in the room stay consistent. Change those places only when the action moves someone.
4. For **every** shot in that location, supply the set image and each visible recurring person's sheet as actual image-generation inputs. On models exposing it, use top-level `character_ids` for saved sheets, `image_url` for the set and `extras.image_urls` for the occupied wide frame or other references. Name each person's placement and action, the shot size, angle, wardrobe and lighting. Include the previous approved frame for a continuous action. For a new location create a new set and reuse the cast. One full-bleed image per shot, with no grid or labels.
5. Resolve the finished frame and compare it with the set and sheets for likeness, blocking, props and framing. Keep the same image model across a sequence by default. Nano Banana 2 is the everyday choice. For demanding likeness, layout or a result the user dislikes, recommend GPT Image 2.6 Sunburst for the affected frame. Reuse good frames and anchors. A complaint alone does not authorize a paid retry.
6. **Send the finished frame URL to the video model.** For reference mode, put the shot frame first in `image_urls`, then include the applicable cast and scene references within the model's limit. Identify each role with that model's tokens. Supply a speaking Character's finished line in `audio_urls` on a compatible Seedance model. For a literal opening use `image_url` and optionally `last_frame_url` where supported. Bake the set and cast into those frames and omit the reference arrays and Character selectors. This applies to Omni even when several people are already visible. A sheet or contact sheet belongs in preparation, never at frame zero.
7. Keep the shot-to-frame and reference mapping with the plan. Make dependent frames in order. Reuse the existing review mode and any checkpoint the user requested. Tell the user how many new frames and shared assets will be made before starting them.
8. **Show the frames before the video.** Present the finished frames and get the user's go-ahead or changes before any paid video: the look, likeness and props are fixed on the still, where a redo is cheap. Skip this stop only when the user already approved these frames or asked to go straight to video.

The individual video call below applies outside Film. In a Film project, put the cast, blocking and scene references into the plan and use the storyboard and clip batch actions. One Review approval covers the selected clip batch.

If the user names a real location, architectural style, lighting setup or object and lacks a reference, use `search_images` to ground the shot. Search for a visible feature and choose an appropriate orientation. To inspect a shortlist, use `load_image` with the search ID and selected result indices, then `check_job` for the numbered contact sheet. Import the selected result's full `image_url` with `upload_asset` and use the returned workspace URL to design an original set or shot frame. Reuse that approved frame across the scene. Use supplied product photos and Character sheets for identity.

## Review the references once

In Review mode, the video's request card is where the user approves the exact references, prompt and settings. Don't call references approved before the user presses Generate. The card does not approve image or audio charges made before it.

Honor an earlier checkpoint the user asked for (for example "show me the first image first"). Character likeness approval and voice-cloning consent are separate decisions. Don't change the user's render mode.

## Input fields

- `image_urls` carries identity, product, wardrobe, environment, style or composition references, even for one image. The field is `image_urls`, not `images_url`.
- `image_url` is the literal opening frame. Bake the approved identity and product into that frame. Use `last_frame_url` only when the model supports it and the shot needs a destination.
- Don't mix literal frame fields with reference arrays unless the current model contract explicitly allows it.
- `character_id` appends the saved image to `image_urls` as a reference, never a start frame. Use it in reference mode; omit it with `image_url`/`last_frame_url` (the server rejects that mix). It never selects the Character's voice for native video audio.
- Use `video_urls` for source edits, motion or camera guidance, and continuity. Say what to borrow and what to keep. In a source edit, put the edited frame in `image_urls` beside the clip when the model's schema takes both (Gemini Omni edit, Seedance 2.5 and Flash edit).

## Voice, audio and continuity

Check the requested spoken language in the selected model's `get_model_params` Usage. When native dialogue is unsupported or unverified, follow [spoken languages](spoken-languages.md). Its dedicated image-plus-audio route uses a clean literal shot image rather than the generic multi-reference video pattern above; the shared character references belong in image preparation. Keep one shot for one requested talking face and use multiple consistent images only for requested multiple shots.

For dialogue, narration or an exact voice, pick one path per speaking shot: read [voice in video](voice-in-video.md). Check the speech's `wordTimings` against the planned clip length before paying for video. Cloning needs its own explicit consent.

For connected clips, reuse the same Character, product and location anchors, with planned state changes named. Reuse the same voice and speech settings.

When a Character speaks in more than one clip, make the voice before the first speaking shot: settle it, save it on the Character, generate every line with it, and send each line as the audio reference for its shot ([voice in video](voice-in-video.md)). Native dialogue invents a new voice in every clip, so it never carries a recurring speaker.

Don't let each shot invent its own music or background. Every clip makes up its own wind, rain, room tone or score, so they change at every cut and the joins become audible. Prompt each connected clip only for sound that must match its picture: quoted dialogue, footsteps, a door, a key. End its audio line with "no music, no background ambience, no room tone, no transition sounds". A clip with nothing to sync is a silent clip. Make continuous sound once, after the clips: one ambience bed per scene and one music track for the film, laid under the assembled cut as [media assembly](../media-assembly.md) describes. `add_audio_to_video` with `audio_mode: "mix"` keeps the clips' sound; the default `audio_mode: "replace"` discards clip audio and ends at the shorter input. `assemble_film` narration also replaces every shot's audio; set `with_narration: false` when shots carry dialogue.

## Prompt and deliver

Load the selected video model guide for exact tokens. Keep reference order, quoted dialogue and approved constraints. Describe chronological action, one main camera move, environmental motion, required audio and a plausible ending. Fetch `get_model_params` for limits and field placement.

Generate only the authorized shots. Follow [Review/Auto](review.md). Inspect output and continuity before assembly; don't claim to have watched media you couldn't inspect. Another paid take needs authorization, even after a failed or refunded job.
