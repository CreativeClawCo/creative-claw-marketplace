# Creative Claw: Wan 3.0

Read [input modes and reference production](reference-production.md) before preparing media and [Review/Auto handling](review.md) before submission. These shared contracts take precedence over a storyboard recipe below. Never combine literal frames with reference arrays on standard routes. Load only this selected model guide, not every guide in the package.

Use `video/wan-3.0` for cost-efficient native-audio clips, 2 to 30 second single-pass storytelling, first-to-last-frame animation, mixed references, source-video transformations, or a public document or webpage used as the creative brief.

## Core workflow

1. Define the clip purpose, duration, ratio, shot structure, subject, action, camera, look, audio, and final state.
2. Search for existing Creative Claw assets before importing new references.
3. Call `get_model_params({ model: "video/wan-3.0" })` immediately before generation. Treat the runtime schema as authoritative.
4. Choose exactly one input mode: text only, literal first/last frames, ordered image/video/audio references, one public document, or one public webpage.
5. For references, preserve their order and assign each a precise role with `Image 1`, `Video 1`, or `Audio 1`.
6. Preserve exact reference identifiers, quoted dialogue, timestamps, and the approved shot plan.
7. Honor the requested resolution; use lower-resolution drafts only when the user requests that iteration workflow.
8. Inspect identity, anatomy, product fidelity, motion, continuity, dialogue, audio, and the ending before calling the result final.

## Current Creative Claw contract

| Field | Use |
| --- | --- |
| `duration` | `auto` or any whole second from 2 through 30. |
| `aspect_ratio` | `auto`, `16:9`, `4:3`, `1:1`, `3:4`, or `9:16`. `auto` maps to Wan's adaptive mode. |
| `resolution` | `480p`, `720p`, or `1080p`. Creative Claw defaults to `720p`. |
| `image_url` | Literal first frame. |
| `last_frame_url` | Optional literal last frame used with `image_url`. |
| `image_urls` | Up to 10 ordered reference images. |
| `video_urls` | Up to 5 ordered reference videos, each at most 15 seconds. This input limit is separate from the 2 to 30 second output duration. |
| `audio_urls` | Up to 5 ordered reference audio clips. |
| `extras.generate_audio` | Generate synchronized dialogue, effects, ambience, and music. Defaults to `true`. |
| `extras.seed` | Optional integer from 0 through 2147483647. |
| `extras.file_url` | One public HTTPS PDF, DOC/DOCX, or XLS/XLSX brief. |
| `extras.web_url` | One public HTTPS webpage brief that does not require authentication. |

Wan accepts at most 20 ordered references total. A document or webpage is an alternative input mode and must not be mixed with literal frames or reference arrays.

If a source video is longer than 15 seconds, use `trim_video` for the exact excerpt needed, wait for the completed URL with `check_job`, then use that trimmed video as the reference. Do not retry the original long URL.

## Choose the input mode

| Intent | Creative Claw inputs | Direction |
| --- | --- | --- |
| Text-to-video | `prompt` | Describe the complete visible and audible sequence. |
| Animate a still | `image_url` | Describe motion beginning after the supplied frame. Prefer `aspect_ratio: "auto"`. |
| First-to-last frame | `image_url`, `last_frame_url` | Describe the continuous physical path between compatible endpoints. |
| Omni reference | `image_urls`, `video_urls`, and/or `audio_urls` | Bind every reference to a role using one-based identifiers. |
| Edit source footage | `video_urls` plus optional image/audio references | Start with `Edit Video 1:` and state the exact delta and protected details. Use `aspect_ratio: "auto"` and normally `duration: "auto"`. |
| Extend source footage | `video_urls` | Say whether to continue forward or backward and describe only the added action. Use adaptive framing. |
| Document-to-video | `extras.file_url` | Tell Wan what story or deliverable to derive from the document. |
| Webpage-to-video | `extras.web_url` | Tell Wan what to extract from the public page and what not to invent. |

Do not combine `image_url` or `last_frame_url` with the reference arrays. Do not combine `file_url` or `web_url` with any media input. For preservation-sensitive edits, trim the smallest interval that needs a change, edit that interval, and merge it between untouched spans.

## Reference language

Wan uses one-based identifiers. Image, video, and audio numbering are separate:

```text
Image 1 is the exact protagonist identity.
Image 2 is the exact product geometry and packaging.
Video 1 supplies body movement and camera cadence only.
Audio 1 supplies voice timbre and delivery timing.
```

State what each reference contributes and what it must not contribute:

```text
Preserve the person from Image 1 and the product from Image 2. Follow only the
walking rhythm and low tracking camera from Video 1, not its actor, wardrobe,
or location. Use the voice timbre and pauses from Audio 1 for the quoted line.
```

Use `Image 1`, `Video 1`, and `Audio 1`, with a space before the number. Do not use Seedance `@Image1` syntax or Gemini `<IMAGE_REF_0>` syntax.

## Prompt construction

For a short single shot:

```text
Generate a single shot.
Subject and scene: [who or what, where, opening composition].
Motion: [one primary action and environmental motion].
Camera: [shot size, angle, lens feel, one intentional move].
Look: [lighting, palette, texture, medium].
Audio: [quoted dialogue, ambience, effects, music, or explicit silence].
Ending: [final composition or state].
Preserve: [identity, wardrobe, product, environment].
Avoid: [specific unwanted changes, cuts, text, artifacts].
```

For 10 to 30 seconds, give the sequence a simple arc and timestamped beats:

```text
Overall: [theme, narrative style, emotion, and continuity rules].
Shot 1 [0-8s]: [framing, action, camera, sound].
Shot 2 [8-19s]: [transition, action, camera, sound].
Shot 3 [19-30s]: [payoff, landing composition, audio resolution].
```

Use one continuous-shot prompt when temporal and visual continuity matter more than coverage. Use a named multi-shot plan when the concept requires clear cuts. Keep the time ranges within the requested duration.

## Audio direction

Wan generates audio unless disabled. Direct voice, effects, and music separately:

- Quote exact dialogue and identify the speaker, emotion, tone, pace, timbre, and accent.
- Describe effects by source, action, and environment.
- Describe music by function and style, including when it begins or changes.
- Write `No dialogue.` when no one should speak.
- Write `No background music.` when the result should contain only dialogue, effects, or ambience.
- Disable `extras.generate_audio` only when the requested output must be silent.

Keep dialogue short enough to fit naturally. Do not depend on generated speech for exact legal, numerical, or branded copy without review.

## First and last frames

Use boundary frames with the same ratio, identity, environment, and plausible geometry. Prompt the transition rather than redescribing two unrelated images:

```text
Begin exactly at the supplied first frame and arrive at the supplied last
frame. Over twelve seconds, the closed package unfolds mechanically while the
camera makes one slow clockwise orbit. All panels stay attached and move
continuously. Native audio: paper folds, magnetic clicks, and a restrained bass
swell. No cuts, teleportation, logo changes, or extra components.
```

If the two frames imply an impossible transformation, fix the frames before generation instead of asking the model to hide the mismatch.

## Editing and continuation

Wan infers editing and extension intent from the prompt, so make the operation explicit:

```text
Edit Video 1: replace only the overcast sky with a warm sunset. Preserve the
people, faces, timing, camera motion, buildings, dialogue, and every other
detail. No new objects or text.
```

```text
Continue Video 1 forward from its final frame. The cyclist exits the tunnel
into morning sunlight and slows beside the lake. Preserve the rider, bicycle,
wardrobe, direction of travel, camera height, and sound perspective.
```

When the original must remain untouched with new footage added, generate only the continuation from a short boundary segment and concatenate it with the original. Generative editing cannot guarantee pixel-perfect preservation of logos, labels, faces, or text.

## Quality checks

Check the requested duration and ratio, reference-role adherence, character and product consistency, physical continuity, camera path, unintended cuts, dialogue accuracy, lip sync, sound perspective, ending state, duplicate limbs, warped hands, embedded text, and watermark behavior. Revise the smallest failed part rather than broadening the prompt indiscriminately.

Send feedback only when the user requests it; include concrete model-specific failures without exposing private media.
