# Video generation and transformation

Match the model to the shot, reference structure, duration, resolution, audio needs, and transformation operation.

## Workflow

1. Define the deliverable: single shot or sequence, duration, ratio, subject, action, camera, audio, and continuity requirements.
2. Search for existing reference assets. For branded work, fetch the theme. For a reusable persona, use `character_id`.
3. Use a first-frame image when visual control or identity matters. Do not force this step for a loose text-to-video experiment where exploration is the goal.
4. Call `list_models({ category: "video" })`, choose by capability, and call `get_model_params` for that exact model.
5. State the chosen model, duration, resolution, audio setting, reference count, and expected cost when exposed. Confirm expensive batches or long clips.
6. Call `generate_video`. Preserve literal reference tokens and timecodes with `agentic_prompting: false`.
7. Resolve the job only when needed, inspect the result, and reject false motion, identity drift, broken physics, unwanted cuts, text artifacts, or bad audio.
8. Use focused processing tools for trim, scale, subtitles, frames, merging, isolation, or upscaling.

## Model picker

Runtime discovery is authoritative. Start here:

| Need                                                      | Model                     | Current specialty                                                                                         |
| --------------------------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------- |
| General text/image/reference video or source-video edit   | `video/gemini-omni-flash` | Default; multimodal 3–10s 720p generation/edit with native audio.                                         |
| Identity preservation and prompt adherence                | `video/grok-imagine-1.5`  | Native synchronized audio, 1–15s, 480p–1080p, up to 7 image references.                                   |
| 5–20s keyframed video or source-video extension           | `video/flux-3`            | Native audio, 720p/1080p, up to 10 ordered/timestamped keyframes; `operation: "extend"` for continuation. |
| Fast low-cost draft                                       | `video/minimax-h3-max`    | 5–15s at 480p/768p with native audio and optional boundary frames.                                        |
| 2K or mixed image/video/audio references                  | `video/minimax-h3`        | 5–15s, native stereo audio, up to 12 mixed references.                                                    |
| Long premium reference workflow                           | `video/seedance-2.5`      | 4–30s, 480p/720p, native audio, first/last frames, up to 50 mixed references.                             |
| True 4K or controlled Veo interpolation                   | `video/veo-3.1`           | Premium 4K/native-audio option; direct Veo accepts 4/6/8s and first/last interpolation at 8s.             |
| Faster Veo option                                         | `video/veo-3.1-fast`      | Lower-cost/faster Veo path.                                                                               |
| Long OpenAI clip                                          | `video/sora-2-pro`        | Up to 25s with native audio and character support.                                                        |
| Multi-shot cinematic generation                           | `video/kling-v3-pro`      | Cinematic visuals and native audio.                                                                       |
| Multi-beat sequence with explicit cuts/elements           | `video/kling-3.0-omni`    | `multi_prompt`, `@ElementN` references, first/last frames, native audio.                                  |
| Dialogue or talking scene with character references       | `video/happyhorse-1.0`    | Joint audio/video, lip-sync, up to nine character image references.                                       |
| Physics and camera direction                              | `video/hailuo-02-pro`     | Strong movement and director-style camera control.                                                        |
| Cheap reference-image animation                           | `video/hailuo-2.3-fast`   | Image-to-video only.                                                                                      |
| Retake, reframe, audio-driven video, or generic extension | `video/ltx-2.3-fast`      | Use the matching `operation`; source media is required.                                                   |
| Talking avatar                                            | `video/heygen-avatar-4`   | Photo plus speech/audio lip-sync.                                                                         |
| Budget text-driven presenter                              | `video/heygen-agent`      | Text-to-video presenter.                                                                                  |
| Performance transfer                                      | `video/dreamactor-v2`     | `operation: "animate_character"` with character image and driving video.                                  |

Use `video/seedance-2.0`, Fast, or Mini only when the runtime catalog or cost target makes them preferable to 2.5.

## Reference rules

- `image_url` is the primary start/source image for image-to-video.
- `last_frame_url` or the model's discovered boundary-frame field controls the end only on compatible models.
- `image_urls`, `video_urls`, and `audio_urls` are top-level video-tool reference arrays when supported. Do not move them into `extras` unless `get_model_params` explicitly says so.
- `character_id` supplies the saved Character anchor and description.
- Use the exact token syntax required by the model. Examples include Seedance `@Image1`/`@Video1`/`@Audio1`, Kling `@Element1`, HappyHorse `@character1`, and Grok `<IMAGE_0>`. Verify the current schema and pass the prompt verbatim.
- Do not feed a labeled storyboard grid to a video model. Use clean, full-bleed generation frames.

## Model-specific guardrails

### Seedance 2.5

- Duration: whole seconds from 4 through 30, or `auto`.
- References: up to 30 images, 10 videos, 10 audio clips, 50 total.
- Audio references require at least one image or video reference.
- Use the named `@` reference tokens and disable prompt rewriting.

### MiniMax H3

- Duration: 5–15s; prompt length is limited to 2000 characters on the current hosted route.
- References: up to 9 images, 3 videos, 3 audio clips, 12 total.
- Audio references require at least one image or video reference.

### Grok Imagine 1.5

- Duration: 1–15s.
- Reference mode accepts up to 7 images, not reference video/audio.
- Reference-to-video currently tops out at 720p; use another mode for 1080p.

### FLUX 3

- Duration: whole seconds from 5 through 20, or `auto`.
- Accepts up to 10 keyframe images; describe desired sound in the prompt.
- Source-video continuation requires `operation: "extend"` and exactly one `video_urls` item. Do not combine extension with image keyframes.

### LTX and DreamActor

- `retake`, `extend`, and `reframe` require one source in `video_urls`.
- `audio_to_video` requires one 2–20s audio source; add `image_url` or a descriptive prompt.
- `animate_character` requires `image_url` or `character_id`, plus one driving video in `video_urls`.

## Prompt structure

```text
[0s–Xs] Subject, action, environment, and framing.
Camera: one intentional movement.
Look: lighting, lens/medium, palette, texture.
Audio: dialogue in quotes, ambience, effects, music direction, or explicit silence.
Continuity: identity, wardrobe, product geometry, and protected references.
Constraints: single shot or named cuts; no unwanted text, captions, or watermark.
```

Give each short shot one main action and one camera idea. Use time blocks for multiple beats. If the output only pans across a still when subject motion was required, revise the action verbs or select a model better suited to physical motion.

## Multi-clip strategies

- **Parallel montage:** independent shots, generated together after approval.
- **Serial continuity:** extract the last frame of clip N and use it as the start of clip N+1.
- **Shared anchor:** reuse one approved Character/product/style image across shots.
- **Single-call multi-shot:** use a model with a native multi-shot structure, such as Kling 3 Omni, when its schema fits the sequence.

Use `merge_media` only after individual clips are approved. Use `extract_frames` to create continuity anchors and `generate_speech` before timing narration-driven shots.
