# Creative Claw : Seedance 2.5 Flash

Read [input modes and reference production](reference-production.md) before preparing media and [Review/Auto handling](review.md) before submission. These shared contracts take precedence over any recipe below. Never combine literal frames with reference arrays on standard routes. Load only this selected model guide, not every guide in the package.

Use the outcome skill's execution guidance for authorization, imports and job recovery.

Use `video/seedance-2.5-flash` for most Seedance work up to 720p. It is ByteDance's speed-optimized Seedance 2.5: same prompt format, reference tokens and edit/extend modes, native synchronized audio, about a third cheaper. It renders 480p or 720p only and has no native draft mode. It is the default engine for `swap_video_characters` and `swap_video_objects`.

Choose [Seedance 2.5](seedance-2-5.md) instead for 1080p, more than 10 image or 5 video/audio references, or a 480p draft that may be finished as the same take at 1080p. Choose [Seedance Mini](seedance-mini.md) for the cheapest short drafts up to 15 seconds.

## Core workflow

Check spoken-language support in `get_model_params` before choosing native dialogue. Flash has no separately verified language list; for languages that are not documented there, use the dedicated route in [spoken languages](spoken-languages.md).

1. Define the deliverable, duration, ratio, shot count, subjects, continuity, audio, and reference roles.
2. Search for existing assets and import every external image, video, or audio file into Creative Claw.
3. Follow the reference-first pipeline in [reference production](reference-production.md); skip keyframes only on explicit direct-generation requests. Reuse supplied and approved references.
4. Call `get_model_params({ model: "video/seedance-2.5-flash" })`. Runtime values override remembered limits. For reference-to-video, choose `extras.omni_reference_task_type` deliberately rather than relying on prompt inference for edits or extensions.
5. Assign every reference a written role and cite it with the exact `@ImageN`, `@VideoN`, or `@AudioN` token.
6. Preserve exact quoted copy, reference labels, dialogue, timecodes, colors, and approved layout or edit constraints in the prompt.
7. Follow the persisted render mode.
8. Inspect the output before merging it into a sequence.

## Current model contract

| Field | Current use |
| --- | --- |
| `duration` | `auto` or a whole second from 4 through 30. Edit: omit or use `auto` to preserve the source timeline. Extend: a whole-number continuation from 4 through 30. |
| `aspect_ratio` | `auto`, `21:9`, `16:9`, `4:3`, `1:1`, `3:4`, or `9:16`. |
| `image_url` | Literal first frame. Image-to-video follows its framing. |
| `last_frame_url` | Optional final frame; the model creates the transition. |
| `image_urls` | Up to 10 reference images, cited as `@Image1`, `@Image2`, and so on. |
| `video_urls` | Up to 5 reference clips, cited as `@Video1`, `@Video2`, and so on. |
| `audio_urls` | Up to 5 audio references, cited as `@Audio1`, `@Audio2`, and so on. |
| `resolution` | `480p` or `720p` (default). Both are finished videos. No 1080p. |
| `extras.generate_audio` | Synchronized dialogue, ambience, music, and effects; on by default. |
| `extras.omni_reference_task_type` | `auto`, `reference`, `edit`, or `extend`. |

Reference videos and audio may each be 2-30 seconds, with no more than 30 seconds combined per modality. Audio references require at least one image or video reference. `extras.draft` and `extras.draft_job_id` are not supported. Verify limits at runtime.

## Iterating without drafts

A 480p Flash video is complete; it cannot be finalized at 1080p. A 720p request after a 480p take is a new generation and may differ. To explore cheaply: render short 480p takes, change one variable per take (camera move, action, or lighting), then keep the prompt and references and render the chosen version at 720p. Any extra take is a paid generation and needs the user's instruction. When the user needs 1080p, use Seedance 2.5.

## Prompt formula

ByteDance's own guidance for the Seedance 2.5 family, which Flash follows:

```text
References: [token → role; what to copy and what not to copy].
Summary: [one sentence: subject, place, event, style, main camera movement].
Beats: [timed beats with continuous whole-second ranges, e.g. 0-4s, 4-9s].
Camera: [shot size, angle, one movement per beat, named transitions with their time].
Look: [lighting, palette, texture, lens feel].
Audio: [Speaker (emotion): "line"; ambience; key effects; or no music].
Consistency: [face, wardrobe, product geometry, location layout that must not change].
Exclusions: [no subtitles/captions/on-screen text; no background music; no cuts — only what matters].
```

- **Length.** 4-8 seconds: one action and one camera move, no timestamps. 9-15 seconds: two or three beats. 16-30 seconds: three to five beats with continuous ranges and no gaps; without ranges the model tends to rush the action into the opening seconds.
- **References.** Upload subjects in the order they first appear, and give each one a role. Do not rely on names printed inside an image. Four or five well-labeled references usually beat the maximum count. To reproduce a reference exactly, say to follow it rather than re-describing it.
- **Dialogue.** Quote the line and tag speaker and emotion. Keep each line in one language. Write negatives only where needed: subtitles, music, or audio. If stray music appears, state the music exclusion at both the start and the end.
- **Wording.** Concrete nouns and visible actions beat quality adjectives. One clear action at a time; do not stack many movements or scene changes into a short clip.

Seedance tokens are one-based and include `@`. Never write `<IMAGE_REF_0>` or bare `Image 1`; use `@Image1`, `@Video1`, and `@Audio1`.

## Edits and extensions

Choose the mode from the intended relationship to the source video:

| Mode | Use when | Ratio and duration |
| --- | --- | --- |
| `reference` | Creating a new video guided by reference images, video, or audio. | A fixed ratio and explicit duration are allowed. |
| `edit` | Changing content inside a source video while keeping its timeline. | `aspect_ratio: "auto"`, duration omitted or `auto`. Every candidate source must be 4-30 seconds. The output can be a few tenths of a second shorter than the source. |
| `extend` | Continuing before or after a source video boundary. | `aspect_ratio: "auto"` and a numeric 4-30 second continuation. |
| `auto` | Letting Seedance infer the task from the prompt. | Only with `aspect_ratio: "auto"`; set `edit` explicitly for edit-style prompts. |

Start the prompt with the operation and cite the source, for example `Edit @Video1: change the red jacket to the navy rain shell shown in @Image1…` or `Extend @Video1 forward by 6 seconds: …`. For an edit, make the edited frame first and put it in `image_urls` ([source edit](recipe-source-edit.md)); never edit from text alone. Describe changes as from A to B, with timestamps for a change in part of the clip. For people or objects replaced across existing footage, use `swap_video_characters` or `swap_video_objects` instead; they prepare approved scene previews and use Flash by default.

For preservation-first edits and extensions (untouched original plus a new boundary, or one interval changed), follow the trim, edit, and `merge_media` approach in the [Seedance 2.5 guide](seedance-2-5.md); the same rules apply on Flash.

## Prompt examples

Presenter product clip:

```text
@Image1 is the exact presenter: face, hair and green jacket. @Image2 is the
exact serum bottle: shape, label and cap color. A presenter introduces the
serum in a sunlit bathroom, handheld social-video style.
0-3s: medium close-up, she lifts the bottle beside her face and smiles.
3-7s: slow push in as she turns the label to camera and says (bright, casual):
"This is the one I keep coming back to."
7-10s: she taps one drop onto her wrist; soft water-drip sound.
Keep her face, jacket and the label unchanged. No subtitles, no on-screen
text, no background music.
```

Twenty-second continuous scene:

```text
@Image1 is the exact courier identity and yellow raincoat. One continuous
handheld tracking shot through a night market in light rain.
0-5s: wide shot, the courier weaves between stalls toward camera.
5-11s: the camera swings beside her as she checks a phone, steam rising
from food stalls behind.
11-16s: she stops at a noodle stand and hands over a paper bag.
16-20s: slow pull back as she jogs away into the crowd.
Warm lantern light, wet reflections, shallow depth of field. Ambience:
rain on awnings, sizzling woks, distant chatter. Keep the raincoat and face
consistent. No cuts, no subtitles, no music.
```

Source edit:

```text
Edit @Video1: change the cyclist's red jacket to the navy rain shell shown in
@Image1 for the whole clip. Keep the rider's face, bicycle, route, camera
movement, timing and the original street unchanged. Add nothing else.
```

## Quality and feedback

Check reference-role adherence, identity, lip-sync, audio timing, unwanted subject copying from style references, extra cuts, flicker, warped hands, and embedded text. Report defects and propose a focused correction. Regenerate only when the user explicitly requests the additional attempt.

When you report a quality issue with `submit_feedback`, include concrete model-specific failures without exposing private media.
