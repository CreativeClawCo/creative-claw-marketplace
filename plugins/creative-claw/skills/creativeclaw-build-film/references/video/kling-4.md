# Kling 4.0 Omni: prompting and production

Use `video/kling-4.0-omni` for general Kling video requests. Read this guide when the selected outcome skill commits to Kling 4, then call `get_model_params({ model: "video/kling-4.0-omni" })` for the current schema, Usage, language support and pricing. Follow the outcome skill's existing authorization, imports and Review/Auto rules. Reading a guide or requesting an estimate does not authorize generation or additional takes.

This is a model reference inside the video, film, planning and ad skills. It does not change the general video default. For an appearance image copying a recorded performance through the separate Motion Control model, read [motion transfer](motion-transfer.md).

## Build the prompt

Kling's official guidance favors specific visible details, named reference roles, chronological beats and a separate audio direction. Use positive descriptions. Keep necessary exclusions such as no subtitles or no background music in the prompt, not an unsupported negative-prompt parameter. For source edits, explicitly write `Edit @Video1` and specify what stays. Longer prompts are not automatically better. [Official prompting guide](https://kling.ai/quickstart/kling-4-model-user-guide)

Our working template:

```text
Purpose: [one shot or a deliberately requested sequence, total duration].
References: [each exact @id, what it controls, and the details to retain].
Look: [location, light direction, materials, color and framing].
Action: [subject's action, physical contact and emotional progression].
Camera: [starting distance/angle, movement and ending composition].
Timing: [opening, change and ending, with seconds when useful].
Sound: [speaker, language, exact words, delivery, ambience and effects].
Preserve: [identity, wardrobe, object details or source features that matter].
```

Omit empty sections. For a straightforward shot, two or three sentences are enough. For a longer brief, use the structure to resolve ambiguity instead of adding adjectives.

Practical authoring choices:

- Describe a visible result. Replace “luxury cinematic product shot” with a material, light source, surface and camera move, for example brushed copper on dark slate, a soft strip reflection, and a slow push toward the engraving.
- Separate subject movement from camera movement. “The cyclist passes the window; the camera tracks parallel at handlebar height” is easier to assess than “dynamic fast camera.”
- For a continuous take, request one uninterrupted shot and describe how it ends. For requested cuts, specify each shot and the cut. Avoid conflicting continuous-shot and montage instructions.
- Give physical actions room to finish: reach, grasp, lift, then place. Mention contact points and an ending state when they matter. Reduce simultaneous actions when the shot becomes crowded.
- Keep named people, wardrobe, screen direction, props and lighting consistent across beats. State any intentional change at the point where it occurs.
- Keep timing realistic. Do not pack a long spoken paragraph, several camera moves and a product demonstration into five seconds. Shorten the action or use an explicitly authorized longer clip.

## Choose inputs and reference roles

Import supplied media first. Reuse suitable existing assets and approved keyframes; preparing extra images is separate work under the outcome skill's authorization. These mappings are Creative Claw's integration contract, not Kling website upload controls.

| Intent | Tool inputs | Prompt direction |
| --- | --- | --- |
| Text-to-video | `prompt`, duration, resolution and ratio | Establish the shot, action, camera, look and sound. |
| Animate an exact opening | `image_url` | Describe what moves next, what remains fixed, and the ending. The opening image is literal. |
| Reach a specific ending | `image_url` plus `last_frame_url` | Describe a plausible transition between the supplied images. |
| Appearance, product or style references | Ordered `image_urls` | Cite `@Image1`, `@Image2`, etc. and state each one's role. |
| Borrow motion or camera behavior | Ordered `video_urls`, reference mode | Cite `@Video1` and state exactly which motion, framing or pacing to borrow. |
| Edit existing footage | `video_urls` plus `extras.video_mode: "edit"` | Start with `Edit @Video1`, name the change, and list source details to retain. |
| Swap people in footage | `swap_video_characters` with `video_model: "video/kling-4.0-omni"` | Use the dedicated free-preview workflow described below. |

Numbered image handles refer to `image_urls`, not to a literal `image_url`. Do not call a literal opening frame `@Image1` unless that handle is also bound to an actual reference. A saved `character_id` appends its image after existing image references; account for the resulting order before writing numbered handles. A saved Character's visual image does not automatically supply its voice.

Assign scope to each input. For example, an identity portrait supplies facial features and hair; a room image supplies layout and lighting; a product photo supplies shape, finish and logo position. Say which source provides wardrobe. If a portrait is identity-only, explicitly preserve the source outfit and setting so the portrait's clothes or room do not become unintended instructions.

For storyboard sheets, identify the panels as shot-planning references and ask for finished full-frame footage. A storyboard grid or its annotations should not become the rendered scene. For video reference work, choose footage whose pacing and camera behavior fit the requested result, then distinguish features to borrow from features to replace. Kling describes multimodal reference and editing as separate creative uses; the supplied source is not automatically an exact edit. [Kling model overview](https://kling.ai/blog/kling-4-ai-video-model)

### Literal frames and advanced inputs

A literal opening or ending image needs no invented reference handle. Example motion prompt: “From the supplied closed-box opening frame, the lid lifts slowly and the silver watch becomes visible. Push in gently and finish on the supplied open-box ending frame. Soft hinge movement and room tone. No subtitles or background music.”

`extras.contents` supports the exact shapes returned by `get_model_params`: ordered `middle_frame` images, image elements with a frontal view plus 1 to 3 additional views, video elements, preset elements and known voice IDs. Preserve unique custom `id` handles and every `@id` verbatim. A Creative Claw Character ID or ElevenLabs/Cartesia voice ID is not a Kling library ID.

The Kling website's Keyframes workspace has controls that this integration does not expose. Here, middle frames are ordered references with no numeric per-frame timestamp field. Describe intended beat timing in the prompt; do not invent `at_s`, `timestamp`, `keyframes`, `multi_prompt` or a Smart Storyboard toggle. Inspect the live schema before combining literal frames with other inputs. [Current operation contract](https://dev.pika.art/llms/kling/kling-4.0/omni-video)

## Original worked examples

These examples are authored for Creative Claw. They are starting briefs, not generated results or quality guarantees. Replace example media URLs with imported, accessible assets, and keep the actual array order aligned with the prompt.

### Product reveal with an appearance reference

```json
{
  "model": "video/kling-4.0-omni",
  "duration": "10",
  "resolution": "720p",
  "aspect_ratio": "9:16",
  "image_urls": ["https://example.com/imported-copper-bottle.png"],
  "prompt": "@Image1 defines the copper bottle: retain its silhouette, cap, brushed finish and label placement. A single uninterrupted tabletop shot on dark slate beside a window. 0 to 3s: begin in a tight side view as a narrow soft reflection crosses the metal. 3 to 8s: slowly orbit toward the front while the bottle remains upright and still. 8 to 10s: settle into a centered front view with the entire label visible. Warm window light from camera left, soft shadows, dark neutral background. Quiet room tone and a light cloth rustle. No dialogue, subtitles or background music."
}
```

This is a reference-composed opening. If the user requires the supplied photo as frame zero, use `image_url` instead and describe only the subsequent movement. Check fine label text and add exact campaign typography in an editing step when necessary.

### Different roles for identity, location and camera

```text
@Image1 defines the courier's face and short curly hair.
@Image2 defines the tiled station hall and its window light.
Borrow only the low parallel tracking movement from @Video1.
The courier wears a green rain jacket and carries a small canvas parcel.
In one continuous 8-second shot, she walks across the hall, pauses beside
an empty bench, and places the parcel on it. Track beside her at waist
height, then come to a gentle stop as her hand releases the parcel.
Keep the face, jacket and parcel consistent throughout.
Sound: footsteps on tile, cloth movement and distant station ambience.
No dialogue, subtitles or background music.
```

Use two `image_urls` and one `video_urls` input, duration `8`, with ordinary reference mode. The video contributes camera behavior; it is not the base scene being edited. Check the reference-video estimate because it differs from text/image-only billing.

### Dialogue with two visible speakers

```text
@Image1 defines the baker; @Image2 defines the customer.
One continuous 12-second medium two-shot across a bakery counter.
Warm overhead light, flour on the wooden worktop, eye-level locked camera.
0 to 4s: the baker places a paper bag on the counter and says in English,
with a gentle, conversational British accent: "Still warm. Take the first bite."
4 to 7s: the customer takes a small bite, then smiles and exhales softly.
7 to 10s: the customer answers in English, quietly: "That's the one."
10 to 12s: hold their shared smile as the baker folds the bag closed.
Each line belongs only to its named speaker; the other person listens.
Soft paper movement and quiet bakery ambience under the speech.
No subtitles or background music.
```

Use only the referenced speakers, give each line one owner, and leave room for reactions. Retrieve the exact model's documented spoken languages from `get_model_params`. Unverified languages, including Hebrew, use the [spoken-language workflow](spoken-languages.md) when precise delivery matters. A voice reference guides a new performance; it does not supply an exact recorded soundtrack. A single talking face within limits stays one shot unless the user requested several.

### A requested three-shot sequence

```text
A 15-second, three-shot miniature adventure. @Image1 defines the same
red toy submarine in every shot. Handcrafted painted wood, visible grain,
soft aquarium light, teal water and suspended bubbles throughout.
0 to 5s, shot 1: wide side view as the submarine passes a small stone arch.
5 to 10s, cut to shot 2: close tracking view beside the circular window
as a trail of bubbles rises past it; maintain left-to-right travel.
10 to 15s, cut to shot 3: wide view from behind as the submarine approaches
a small warm lamp beneath an overhang, slows, and settles beside it.
Sound: a gentle motor hum, bubbles and muted underwater ambience.
No dialogue, subtitles or background music.
```

Put the sequence in one `prompt` with duration `15`. Timing is direction, not a frame-accurate edit decision list. Do not create several paid generations merely because this example contains cuts. For separately requested shots needing precise editorial control, follow the film/planning skill and its approved shot count.

### Edit a source while retaining its performance

```json
{
  "model": "video/kling-4.0-omni",
  "duration": "8",
  "resolution": "720p",
  "video_urls": ["https://example.com/imported-source.mp4"],
  "extras": { "video_mode": "edit" },
  "prompt": "Edit @Video1. Change only the performer's jacket from brown to deep navy, retaining the same material, seams and fit. Preserve the performer's face, hair, trousers, hands and movement, the room, other people, camera path, lighting and shot order. Retain the source's action timing throughout the entire eight seconds. Quiet room ambience, no added dialogue, subtitles or background music."
}
```

Match output duration to the intended source interval when timing matters. Unlike the dedicated Swap workflow, general `generate_video` editing does not restore the source soundtrack. Asking to preserve it does not guarantee exact audio, pixels, duration or lip timing. Use media editing for an unchanged supplied soundtrack and review the actual result before authorizing another take.

## Current integration limits

These are integration limits, not every feature of Kling's website. Refresh them from `get_model_params` before committing settings.

- Output: 3 to 30 whole seconds, default 5; 720p default or 1080p. No 480p draft or native draft completion.
- Ratios: 21:9, 16:9, 9:16, 1:1, adaptive. `auto` is an adaptive alias.
- Up to 15 combined assets, with overlapping caps of 10 image materials/keyframes, five input videos and seven subject elements. At most three elements may be video-based. These limits are not additive allowances.
- Every input video, including nested video elements, shares the 30-second input budget. Regular input clips must be at least 3 seconds. Select the useful interval before submission; normal cuts can shorten long footage, but cannot repair too-short footage.
- Video elements must show a realistic person: MP4/MOV, 3 to 8 seconds, 1920×1080 or 1080×1920, up to 200 MB. Recorded speech can guide vocal identity.
- Element photos: JPG/PNG, up to 10 MB each, at least 300 pixels on each side, aspect ratio 0.4 to 2.5; a frontal view plus 1 to 3 additional views.
- Prompt: up to 26,000 characters, also subject to the model's 8,000-token limit. Preserve reference handles when shortening a prompt.
- Native audio is always generated. No `generate_audio` switch, standalone `audio_urls`, seed, negative-prompt field, CFG, `multi_prompt`, 4K/HDR, Flash selector or extension control. Quiet sound requested in text is not an audio-off guarantee.

The website's advertised resolution, default duration, voice-upload and timeline controls do not override this route's schema. [Operation specification](https://dev.pika.art/llms/kling/kling-4.0/omni-video)

## Estimate with the actual inputs

Text/image inputs: 31.4 credits per output second at 720p or 47 at 1080p, rounded up once per job. Five seconds is 157/235 credits. Requires a first credit purchase.

With video inputs, reserve billed seconds = output + max(output, measured combined input-video seconds), counting every video element after cuts. Rate: 18.8 credits per billed second at 720p or 28.2 at 1080p. Use `estimate_generation` with the same inputs and cuts as generation. Do not quote the text/image-only rate for video-reference work. Final credits follow settled usage within the approved reserve. Credit purchase prices vary; do not convert them to a fixed dollar cost.

Pricing and availability are live facts. These numbers are a snapshot, not a replacement for the tools.

## Swapping people in existing footage

Use `swap_video_characters` with `video_model: "video/kling-4.0-omni"` for a Kling swap, with the source and photo/Character references. Describe who becomes whom and which clothing or visual details should change. Preserve source outfits unless the user requests a wardrobe change. Do not submit a separate `generate_video` for the same swap.

Swap supports 4 to 30 whole seconds, 720p (default) or 1080p, and up to seven combined photo/Character references. Three free scene previews guide the edit, with the normal Review/Auto flow. Long or fractional sources are cut without changing speed. There is no 480p or native draft completion. Source audio is restored by default, and silent sources stay silent. Request a free estimate with `estimate_generation`, operation `swap_video_characters`, using the same model, source and resolution. Review the final identity, motion and camera behavior.

## Review and revise within authorization

| Issue | Prompt/input correction for an authorized next attempt |
| --- | --- |
| Wrong subject, outfit or setting | Check reference order and spell out each image's role and which source supplies clothing and environment. |
| Unwanted cuts | Request one uninterrupted take, remove conflicting shot changes and simplify the action. |
| A reference video is loosely recreated instead of edited | Use edit mode and start the prompt with `Edit @Video1`; specify the edit and preserved source features. |
| Invented subtitles or music | Include no subtitles and no background music in `prompt`; do not invent control fields. |
| Dialogue is rushed or assigned to the wrong person | Shorten the script, identify the speaker for each quoted line and allocate time for listening and reactions. |
| Fine text, identity or physics is inconsistent | Inspect the relevant frames and choose a targeted repair; do not promise a prompt can guarantee exact pixels or typography. |
| Speech or soundtrack must be exact | Use finished speech and an audio-driven lip-sync/avatar route, or a non-generative soundtrack edit. Native audio is a new performance. |

A failed attempt or a quality complaint does not authorize another paid generation. Explain the proposed correction and use the outcome skill's existing approval rules.

## Sources and maintenance

Checked October 24, 2026. Prompting principles and model-level distinctions: [Kling 4 user guide](https://kling.ai/quickstart/kling-4-model-user-guide), especially effective prompts, reference roles, editing, audio and keyframes; [Kling 4 overview](https://kling.ai/blog/kling-4-ai-video-model). Integration field names, limits and defaults: [current operation specification](https://dev.pika.art/llms/kling/kling-4.0/omni-video) and the existing `get_model_params` schema/Usage. The worked examples and troubleshooting are Creative Claw authoring guidance, not vendor examples or generation benchmarks. Recheck live fields before adopting newly advertised website features.
