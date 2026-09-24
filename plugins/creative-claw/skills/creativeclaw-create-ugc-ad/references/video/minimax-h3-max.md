# Creative Claw : MiniMax H3 Max

Read [input modes and reference production](reference-production.md) before preparing media and [Review/Auto handling](review.md) before submission. These shared contracts take precedence over a storyboard recipe below. Never combine literal frames with reference arrays on standard routes. Load only this selected model guide, not every guide in the package.

Use the outcome skill's execution guidance for authorization, imports and job recovery.

Use `video/minimax-h3-max` for fast, aesthetically strong 480P, 768P, or Full HD (1080P) video with native synchronized audio, optional first/last frames, and multimodal references. Use `video/minimax-h3-max-turbo` when the user prioritizes lower latency and lower-cost text or first-frame generation. Turbo reference requests are supported and route through fal's shared H3 Max reference-to-video endpoint, so they use reference-mode pricing rather than Turbo text/image pricing.

Use `video/minimax-h3-max-extend` for a text-guided continuation of an existing video when its characters, setting, camera motion, and visual style should carry into the new footage. This is a separate fal route from H3 Max reference-to-video. Pass exactly one source in `video_urls` and a prompt describing only what happens next. The source must be 1.625–60 seconds, at most 50 MB, with aspect ratio 0.4–2.5. It adds 5–15 whole seconds at 480P, 768P, 1080P, or 2K. Call `get_model_params` for its current contract and `estimate_generation` for a source-aware credit estimate before an expensive extension.

Do not invent an `h3-max-lite` model ID. The current faster lightweight route is `video/minimax-h3-max-turbo`.

## Core workflow

1. Define one shot: duration, ratio, subject, action, camera, audio, and continuity anchors.
2. Search or import source assets.
3. Reuse a supplied opening image. Generate a storyboard only when requested or unresolved appearance/continuity needs it; a clear text-to-video request can proceed directly. Create missing boundary frames only when the requested transition needs them.
4. Fetch missing settings with `get_model_params` for the exact selected H3 Max or Turbo model; reuse its schema for unchanged shots.
5. Choose text, first-frame, first-to-last, or reference mode deliberately.
6. Assign every reference a role using H3 Max's one-based `Image 1`, `Video 1`, and `Audio 1` language.
7. Preserve exact quoted copy, reference labels, dialogue, timecodes, colors, and approved layout or edit constraints in the prompt.
8. Honor the requested resolution. Offer lower-resolution motion tests only within an authorized draft workflow; do not add paid tests automatically.
9. Inspect visible motion and synchronized audio before reuse.

## Choose the route

| Need | Model and inputs |
| --- | --- |
| Fast text-to-video | H3 Max with `prompt`. |
| Animate an approved opening | H3 Max with `image_url`. |
| Controlled first-to-last motion | H3 Max with `image_url` and `last_frame_url`. |
| Identity, style, motion, or audio references | H3 Max or Turbo with `image_urls`, `video_urls`, and/or `audio_urls`. |
| Continue an existing clip with its look and characters intact | H3 Max Extend with one source in `video_urls` and `duration` for the new footage. |
| Fastest lower-cost text/image draft | H3 Max Turbo; its reference mode uses the shared H3 Max route. |

H3 Max reference video conditions a new result. It is not a precise source-video editor.

For H3 Max Extend, `aspect_ratio: "auto"` preserves the source framing. A fixed ratio crops it. The default `extras.output: "extended"` returns the source followed by new footage; `extras.output: "continuation"` returns only the new portion. `extras.enable_prompt_expansion` defaults to true so fal can use the source to refine continuity, and `extras.seed` can be set for repeatability. Pricing is based on newly generated seconds plus source-video input tokens above fal's included allowance, even when output is continuation-only.

## Current H3 Max contract

| Field | Current use |
| --- | --- |
| `duration` | Whole seconds from 5 through 15; default 5. |
| `aspect_ratio` | `21:9`, `16:9`, `4:3`, `1:1`, `3:4`, `9:16`; `adaptive` for reference mode. |
| `image_url` | Literal first frame only. |
| `last_frame_url` | Optional literal destination frame. |
| `image_urls` | Up to 9 references, cited as `Image 1` through `Image 9`. |
| `video_urls` | Up to 3 clips, cited as `Video 1` onward. |
| `audio_urls` | Up to 3 clips, cited as `Audio 1` onward; requires an image or video reference. |
| `resolution` | `480P`, `768P` (default), or `1080P` for Full HD; pass it through the top-level Creative Claw field. |

Current limits are model-specific: up to 12 total reference files; reference video and audio clips are commonly 2-15 seconds with no more than 15 seconds combined per modality. Recheck the runtime schema rather than applying these limits to another model.

If a supplied image should guide identity, style, character, product, or composition instead of becoming frame zero, put it in `image_urls`, even when there is exactly one image. Use singular `image_url` only when the requested result must begin on that exact image.

## Storyboard-first direction

H3 Max responds well when the opening composition is already solved:

1. Turn the brief into two to four filmable beats.
2. Generate an approved start frame at the final ratio.
3. Use a separate character/product reference if the start frame does not show every protected detail clearly.
4. Generate a compatible end frame when pose, camera destination, product state, or continuity matters.
5. Use motion video only to teach movement or camera rhythm; say which parts must not transfer.
6. Use audio only to teach timing, speech, music, or sound texture.

Do not upload a storyboard grid. Use individual clean frames and individual reference files.

## First and last frames

### First frame

Pass the approved opening as `image_url`. Prompt the change after frame zero:

```text
From the supplied first frame, the motorcycle launches forward and wet gravel
sprays behind the rear tire. The rider, bike geometry, road, and dusk lighting
remain unchanged. Low tracking camera, no cuts.
```

### First and last frame

Pass both `image_url` and `last_frame_url`. Match aspect ratio and visual continuity between them. Describe a single temporal bridge:

```text
Begin exactly at the first frame and reach the supplied last frame at second 10.
The camera cranes upward while the crowd parts and the performer walks into the
spotlight. Continuous natural movement; preserve face, clothing, stage layout,
and lighting direction. No cuts or sudden pose morphs.
```

If the endpoints differ too much in identity, geometry, perspective, or environment, revise the images first rather than asking the video model to hide an impossible transition.

## Reference language

H3 Max uses one-based words without `@`:

```text
Image 1 = exact character identity and wardrobe.
Image 2 = exact product shape and materials.
Video 1 = body choreography and camera rhythm only.
Audio 1 = dialogue timing and voice energy.
```

Then direct the result:

```text
Use Image 1 as the locked character identity and wardrobe. Use Image 2 as the
locked product geometry. Follow only the body choreography and lateral camera
rhythm of Video 1; do not copy its performer, set, or clothing. Use Audio 1 for
speech timing and emotional cadence. The character crosses the workshop and
places the product beneath the inspection light. Preserve identity and product
details. One continuous shot; no captions, duplicated objects, or extra limbs.
```

Do not use Seedance `@Image1` or Omni `<IMAGE_REF_0>` syntax here.

## Prompt structure

```text
References: [Image/Video/Audio N → role and protected attributes].
Shot: [duration, ratio, single shot or explicit beats].
Subject and environment: [concrete visible facts].
Action: [two to four ordered filmable beats].
Camera: [framing, angle, one principal movement].
Look: [lighting, lens feel, texture, palette].
Audio: [quoted dialogue, synchronized effects, ambience, music, or silence].
Continuity: [identity, wardrobe, geometry, location].
Avoid: [specific failure modes, text, cuts, additions].
```

Bind sounds to visible actions: “The latch clicks as the lid reaches ninety degrees.” Keep dialogue short and quote it. Describe what the camera sees, not abstract marketing goals.

## Prompt examples

Cinematic product shot:

```text
Eight-second single shot. A graphite smartwatch rests on black volcanic stone.
Condensation rolls across the glass as the display wakes and one silver droplet
slides down the edge. Extreme macro, slow clockwise orbit, hard white rim light
with a subtle red reflection. Precise watch shape and button placement. Audio:
low room tone, tiny electrical pulse, crisp droplet impact. No hands, text,
watermark, extra buttons, cuts, or product deformation.
```

Reference-guided action:

```text
Image 1 is the exact athlete identity and uniform. Video 1 supplies only the
sprinting gait and low follow-camera rhythm. Audio 1 supplies breath cadence and
shoe impacts. Ten-second continuous shot on a wet night track. Preserve the face,
body proportions, uniform, and lane markings. The athlete accelerates through
the bend as the camera tracks beside them, then eases ahead for the final two
seconds. Stadium ambience and synchronized footsteps. No copied performer from
Video 1, no cuts, text, or identity drift.
```

First-to-last transition:

```text
Start exactly at the empty-stage frame and end exactly at the supplied full-stage
frame. Across twelve seconds, practical lights ignite from back to front while
the band enters naturally and takes position. One slow crane down toward the
lead singer. Preserve stage architecture, instruments, people, and final pose.
Native crowd murmur grows into applause. No cuts, teleportation, or duplicate
performers.
```

## Quality and feedback

Check identity, reference roles, endpoint accuracy, physical continuity, subject motion, camera smoothness, audio synchronization, lip movement, unwanted cuts, and duplicated anatomy. If motion is too weak, replace static adjectives with visible verbs and reduce competing actions.

Send feedback only when the user requests it; include concrete model-specific failures without exposing private media.
