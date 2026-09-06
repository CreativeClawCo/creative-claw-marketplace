---
name: creativeclaw-seedance-2-5
description: "Apply Seedance 2.5 prompting, storyboard, and reference techniques after Creative Claw selects that model. Use when the user explicitly requests Seedance 2.5, or when another Creative Claw workflow routes a premium, long, cinematic, or reference-rich clip to video/seedance-2.5."
---

# Creative Claw — Seedance 2.5

Use `video/seedance-2.5` for long, premium, reference-rich generation with native synchronized audio. Prefer it when the clip needs more references, more duration, a controlled destination frame, or richer scene direction than the default video route.

## Core workflow

1. Define the deliverable, duration, ratio, shot count, subjects, continuity, audio, and reference roles.
2. Search for existing assets and import every external image, video, or audio file into Creative Claw.
3. Build and approve a storyboard before a polished generation. Create separate full-frame start images for each shot with `image/nano-banana-2`; use Nano Banana Pro only when the visual brief is unusually complex.
4. Create an end frame when the clip needs a precise landing pose, transition, loop, reveal, or match cut.
5. Call `get_model_params({ model: "video/seedance-2.5" })`. Runtime values override remembered limits.
6. Assign every reference a written role and cite it with the exact `@ImageN`, `@VideoN`, or `@AudioN` token.
7. Set `agentic_prompting: false` for authored tokens, exact dialogue, timecodes, or precise shot plans.
8. Generate a 480p or 720p proof first when iteration is expected. Use 1080p after the shot is approved.
9. Inspect the output before merging it into a sequence.

## Current model contract

| Field | Current use |
| --- | --- |
| `duration` | `auto` or a whole second from 4 through 30. |
| `aspect_ratio` | `auto`, `21:9`, `16:9`, `4:3`, `1:1`, `3:4`, or `9:16`. |
| `image_url` | Literal first frame. Image-to-video follows its framing. |
| `last_frame_url` | Optional final frame; the model creates the transition. |
| `image_urls` | Up to 30 reference images, cited as `@Image1`, `@Image2`, and so on. |
| `video_urls` | Up to 10 reference clips, cited as `@Video1`, `@Video2`, and so on. |
| `audio_urls` | Up to 10 audio references, cited as `@Audio1`, `@Audio2`, and so on. |
| `resolution` | `480p`, `720p`, or `1080p`; pass it through the top-level Creative Claw field. |
| `extras.generate_audio` | Enable synchronized dialogue, ambience, music, and effects. |

Reference limits belong to this model, not to `generate_video` globally. Current video and audio references may each be 2–30 seconds, with no more than 30 seconds combined per modality. Audio references require at least one image or video reference. Verify this at runtime.

## Storyboard-first production

Use storyboards aggressively:

1. Write the shot's dramatic purpose and one visible action.
2. Generate a clean start frame with the exact target ratio. Keep it full bleed and free of labels, panels, captions, arrows, or UI.
3. Approve the character face, product geometry, wardrobe, environment, and lighting.
4. Generate a compatible end frame if the motion must arrive somewhere specific.
5. Collect separate reference images for identity, wardrobe, product details, location, and visual style.
6. Use motion video references only for movement, camera cadence, blocking, or choreography.
7. Use audio references only for cadence, atmosphere, dialogue timing, or sound character.

Do not make one image do every job. A start frame controls the opening composition; reference images control identity or style; an end frame controls the destination.

## First and last frames

### Start frame only

Pass the approved image as `image_url`. Describe what changes after that frame:

```text
Starting from the supplied frame, the runner accelerates toward camera while
rain splashes outward from each footfall. Her face, jacket, street layout, and
lighting remain unchanged. Low tracking camera, one continuous shot.
```

### Start and end frames

Pass the opening image as `image_url` and the destination as `last_frame_url`. Make both frames share the same aspect ratio and a believable identity, environment, and spatial layout.

Prompt the path between them:

```text
Begin exactly at the first frame and end exactly at the supplied last frame.
Across ten seconds, the closed package unfolds into the finished display while
the camera makes one slow clockwise orbit. Every panel moves mechanically and
continuously; no cuts, teleportation, logo changes, or new objects.
```

Use end frames for product transformations, pose-to-pose action, match cuts, looping compositions, and multi-clip continuity. Avoid impossible geometry changes between endpoints.

## Reference-token language

Seedance tokens are one-based and include `@`:

```text
@Image1 = exact face and body identity.
@Image2 = exact wardrobe.
@Image3 = product geometry and packaging.
@Video1 = body movement and camera cadence only.
@Audio1 = dialogue timing and vocal energy.
```

State what to copy and what not to copy:

```text
Preserve the identity from @Image1 and wardrobe from @Image2. Preserve the
product geometry, materials, colors, and logo placement from @Image3. Follow
only the motion rhythm and low tracking camera from @Video1; do not copy its
actor, clothing, or location. Use @Audio1 for timing and delivery. The actor
crosses the neon station in one continuous shot and sets the product on the
bench as the final word lands.
```

Never write `<IMAGE_REF_0>` or `Image 1` for Seedance. Use its exact `@Image1`, `@Video1`, and `@Audio1` syntax.

## Prompt formula

```text
References: [token → role; exact protected attributes].
Format: [duration, ratio, one shot or named sequence].
Opening: [starting composition or supplied first frame].
Action beats: [ordered visible events with timing].
Camera: [framing, lens feel, movement, transition behavior].
Look: [lighting, palette, texture, medium].
Audio: [quoted dialogue, ambience, effects, music, or silence].
Ending: [final composition or supplied end frame].
Continuity: [identity, wardrobe, product, environment].
Avoid: [specific artifacts, text, unwanted cuts, additions].
```

For 4–10 seconds, keep one action and one camera move. For 10–30 seconds, use two to five timed beats. Do not compress an entire commercial into a single chaotic sentence.

## Prompt examples

Reference-rich character scene:

```text
@Image1 is the exact protagonist identity. @Image2 is her exact silver coat.
@Video1 supplies only the measured walking cadence and sideways tracking camera.
@Audio1 supplies the spoken line and timing. Fifteen-second continuous shot in
a rain-soaked metro station. She walks beside the train, looks toward camera,
and says exactly, “The future arrives quietly.” Cyan platform light reflects in
the wet floor. Preserve face, body proportions, coat, and lip timing. No cuts,
extra people near camera, subtitles, on-screen text, or wardrobe drift.
```

First-to-last product transformation:

```text
Start exactly from the supplied closed-box frame and finish exactly at the
supplied assembled-display frame. Over twelve seconds, the box opens in a
physically plausible sequence; the product rises, rotates once, and locks into
the final position. Slow clockwise camera orbit, black studio, warm rim light,
precise logo and packaging geometry. Synchronized folds, magnetic clicks, and a
subtle bass swell. One seamless shot; no cuts or extra components.
```

Audio-led scene:

```text
@Image1 is the exact performer identity and wardrobe. @Audio1 controls dialogue
timing, pauses, and emotional rise. The performer stands in a dark rehearsal
room as a single spotlight brightens. Medium close-up, gentle handheld drift.
Match mouth movement to @Audio1 and let the light peak on the final phrase.
Preserve identity and room layout. No music, captions, extra speakers, or cuts.
```

## Quality and feedback

Check reference-role adherence, endpoint accuracy, identity, lip-sync, audio timing, unwanted subject copying from style references, implausible transitions, extra cuts, flicker, warped hands, and embedded text. Regenerate the failed shot rather than the entire sequence.

Use `submit_feedback` for repeated Seedance-specific artifacts, missing controls, unclear reference behavior, or model requests. Include the exact tokens, reference types, duration, resolution, and observed failure without sharing private media.
