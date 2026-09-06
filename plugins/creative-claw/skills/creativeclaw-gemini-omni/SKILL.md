---
name: creativeclaw-gemini-omni
description: "Apply Gemini Omni prompting, reference, and editing techniques after Creative Claw selects that video model. Use when the user explicitly requests Gemini Omni or Google Omni, or when another Creative Claw workflow routes a clip to the default video/gemini-omni-flash model."
---

# Creative Claw — Gemini Omni

Use `video/gemini-omni-flash` as Creative Claw's default video model. It is the primary recommendation for fast multimodal video generation and source-video editing with native audio.

## Core workflow

1. Define one clip: purpose, duration, aspect ratio, subject, action, camera, audio, and protected visual details.
2. Search for reusable assets and import any ChatGPT attachments into Creative Claw before passing them to URL fields.
3. Prefer a storyboard-first workflow when appearance or continuity matters. Generate and approve a clean full-frame start image with `image/nano-banana-2`; generate an end frame when the shot needs a precise destination and the current Omni schema exposes end-frame control.
4. Call `get_model_params({ model: "video/gemini-omni-flash" })` immediately before generation. Treat its current schema as authoritative.
5. Explain the selected duration, ratio, references, and audio plan. Confirm only when the request is materially expensive or involves a batch.
6. Call `generate_video` with `model: "video/gemini-omni-flash"`.
7. Let the inline viewer monitor the job. Call `check_job` only when a later tool needs the completed URL or no viewer is monitoring.
8. Inspect motion, identity, physics, framing, audio, dialogue, and text artifacts before describing the clip as complete.

## Choose the input mode

| Intent | Inputs | Prompt emphasis |
| --- | --- | --- |
| Text-to-video | `prompt` only | Describe the complete visible scene and sound. |
| Animate a still | `image_url` | Describe what begins moving after the supplied first frame. |
| Reference-guided video | `image_urls` | Bind every reference to a role with `<IMAGE_REF_N>`. |
| Edit a source clip | one item in `video_urls` | Give one short change followed by “Keep everything else the same.” |

Do not combine modes casually. Use `image_url` when an image must be the literal first frame. Use `image_urls` when images should guide identity, product appearance, wardrobe, environment, or style without becoming the opening frame.

## Storyboard-first direction

For ads, branded content, character work, and multi-clip sequences:

1. Break the concept into short shots with one main action each.
2. Generate each clean start frame separately with Nano Banana 2. Do not pass a labeled grid, contact sheet, panels, captions, or prompt text to the video model.
3. Approve identity, wardrobe, product geometry, set design, lighting, composition, and ratio before animation.
4. Use the approved image as `image_url`.
5. When the next clip must continue the first, extract the last frame of clip N and use it as the start frame of clip N+1.

This reduces visual drift and makes revisions local to one shot.

## First and last frames

### Start frame

Pass the approved opening image as `image_url`. Treat it as frame zero. Describe the motion that follows rather than restating every visible detail.

Good:

```text
The woman turns toward the window as rain begins to trace the glass. Her coat,
face, and the room remain unchanged. Slow dolly-in, one continuous shot.
```

Weak:

```text
A woman wearing a red coat stands in a room by a window.
```

The weak version invites the model to reinterpret the already-approved frame.

### End frame

Google's underlying Omni model supports first-to-last interpolation, but Creative Claw's exposed fields can change. Pass `last_frame_url` only when `get_model_params` returns an end-frame field for the current route. Otherwise use Seedance 2.5 or MiniMax H3 Max for controlled first-to-last generation.

When supported, use two frames with the same ratio, subject identity, and plausible spatial continuity. Describe the transition, not two separate scenes:

```text
Begin exactly from the first frame. In one continuous orbital move, the camera
travels clockwise while the product lid opens and blue light grows from inside.
Arrive exactly at the supplied final frame. No cuts or teleporting objects.
```

## Reference syntax

Pass reference images in `image_urls`. Cite them with zero-based tokens:

```text
<IMAGE_REF_0> = exact product identity and geometry.
<IMAGE_REF_1> = lighting and material reference only.
<IMAGE_REF_2> = wardrobe reference for the actor.
```

Then direct the shot:

```text
Preserve the product from <IMAGE_REF_0> exactly. Borrow only the cool rim
lighting and glossy black environment from <IMAGE_REF_1>. The actor wears the
outfit from <IMAGE_REF_2>. She places the product on the pedestal as the camera
makes a slow 30-degree orbit. No cuts, no on-screen text, no geometry changes.
```

Set `agentic_prompting: false` whenever the prompt contains these tokens, exact dialogue, timecodes, or carefully authored constraints.

## Prompt formula

Order information by what the model must protect:

```text
Purpose: [ad, cinematic insert, product reveal, social clip].
References: [token → exact role; attributes to preserve].
Scene: [subject, environment, composition].
Action: [one filmable action with visible motion].
Camera: [framing + one intentional movement].
Look: [lighting, lens/medium, palette, texture].
Audio: [dialogue, ambience, effects, music, or explicit silence].
Timing: [optional natural beats or time ranges].
Constraints: [identity, product geometry, no cuts/text/subtitles/watermarks].
```

For reusable B-roll, use one subject, one action, and one camera idea. Say “single continuous shot, no scene cuts” when cuts would make the clip unusable.

## Timing and audio

Use the current runtime range discovered by `get_model_params`; the established Creative Claw route commonly supports 3–10 seconds and `16:9` or `9:16`.

Natural beats work well:

```text
[0–3s] Slow push toward the unopened bottle.
[3–6s] The cap lifts and cold vapor spills across the table.
[6–8s] Hold on the clean hero angle.
```

Describe native audio explicitly:

- “No dialogue. Quiet studio ambience and a soft mechanical click.”
- “Dialogue, exact line: ‘Ready when you are.’ Natural room tone, no music.”
- “At five seconds, the percussion enters as the product locks into place.”
- “Generate a silent clip; no music, speech, ambience, or sound effects.”

Keep spoken copy short enough to fit naturally. Quote exact lines and disable prompt rewriting.

## Source-video editing

Pass one source clip in `video_urls`. Use a concise delta:

```text
Replace the overcast sky with a warm sunset. Keep the people, timing, camera
motion, buildings, and every other detail unchanged.
```

Avoid redescribing the source. A long prompt increases unintended changes. Omni editing is best for one clear transformation per pass.

## Prompt examples

Product reveal:

```text
Premium ten-second product film. The matte-black headphones remain identical to
the approved first frame. They rotate slowly above a dark reflective plinth as a
thin ribbon of amber light travels across the ear cups. Macro commercial lens,
slow clockwise orbit, deep black background, crisp highlights. Sound design:
low electronic pulse and a soft magnetic click. Single continuous shot. No
people, text, captions, logo changes, or extra objects.
```

Character scene with references:

```text
<IMAGE_REF_0> is the exact character identity and face. <IMAGE_REF_1> is the
exact wardrobe. Preserve both. In a rain-soaked train station, she looks over
her shoulder and takes one step toward the arriving train. Medium close-up,
slow handheld push-in, cyan and amber practical lights. Natural rain, distant
train brakes, no dialogue. One shot; no face drift, wardrobe changes, text, or
extra people near camera.
```

Source edit:

```text
Transform the source video into a premium hand-painted anime look. Preserve the
exact motion, timing, people, composition, and camera path. Keep everything else
the same. No subtitles or added text.
```

## Quality and feedback

Reject static-subject pans when subject motion was requested, identity drift, product deformation, unexpected cuts, lip-sync mismatch, duplicate limbs, embedded text, and audio contradicting the prompt. Revise one failure at a time.

Use `submit_feedback` when Omni repeatedly violates a concrete instruction, produces a model-specific artifact, exposes an unclear parameter, or lacks a requested control. Include the model ID, mode, attempted task, and the observed quality gap.
