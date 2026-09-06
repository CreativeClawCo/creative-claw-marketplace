# Video generation and transformation

Match the model to the shot, reference structure, duration, resolution, audio needs, and transformation operation.

## Workflow

1. Define the deliverable: single shot or sequence, duration, ratio, subject, action, camera, audio, and continuity requirements.
2. Search for existing reference assets. For branded work, fetch the theme. For a reusable persona, use `character_id`.
3. Use a first-frame image when visual control or identity matters. Do not force this step for a loose text-to-video experiment where exploration is the goal.
4. Call `list_models({ category: "video" })`, choose by capability, and call `get_model_params` for that exact model.
5. State the chosen model, duration, resolution, audio setting, supplied references, and expected cost when exposed. Confirm expensive batches or long clips.
6. Call `generate_video`. Preserve literal reference tokens and timecodes with `agentic_prompting: false`.
7. Resolve the job only when needed, inspect the result, and reject false motion, identity drift, broken physics, unwanted cuts, text artifacts, or bad audio.
8. Use focused processing tools for trim, scale, subtitles, frames, merging, isolation, or upscaling.

## Model picker

Runtime discovery is authoritative. Start here:

| Need                                            | Model                        | Current specialty                                                                                |
| ----------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------ |
| General generation, references, or source edit  | `video/gemini-omni-flash`    | Default; fast multimodal 3–10s generation/edit with native audio.                                |
| Premium long or reference-rich video            | `video/seedance-2.5`         | 4–30s, native audio, optional first/last frames, and large mixed-reference sets.                  |
| Inexpensive Seedance draft                      | `video/seedance-2.0-mini`    | Present as Seedance Mini; lowest-cost Seedance path for quick native-audio reference experiments. |
| Fast cinematic generation with strong adherence | `video/minimax-h3-max`       | 5–15s, 480p/768p, native audio, optional first/last frames, and multimodal references.            |
| Faster lightweight H3 Max route                 | `video/minimax-h3-max-turbo` | Use when latency and cost matter more than reference-to-video capability.                         |

Recommend these models first. Use another runtime-listed model only when the user explicitly requests it or the five recommended choices cannot perform the operation.

## Reference rules

- There is no universal reference-count requirement or cap. A request may use zero, one, or many references according to the selected model and operation.
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

### MiniMax H3 Max

- Duration: 5–15s; the current hosted route accepts prompts up to 50,000 characters.
- Reference limits are model- and route-specific. Inspect `get_model_params({ model: "video/minimax-h3-max" })` instead of applying a global reference rule.
- Audio references require at least one image or video reference.

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
- **Single-call multi-shot:** use a runtime model with native multi-shot structure only when its discovered schema fits the sequence.

Use `merge_media` only after individual clips are approved. Use `extract_frames` to create continuity anchors and `generate_speech` before timing narration-driven shots.
