# Storyboard to video

Use this workflow when the user wants to plan or approve the story before paid video generation.

## Two different artifacts

- **Review board:** one labeled multi-panel image for the user to approve.
- **Generation frames:** clean, full-bleed images with no grid, labels, timecodes, arrows, or notes.

Never feed the labeled review board to `generate_video`. Text and panel boundaries can leak into the clip, and panel order is ambiguous to the model.

## 1. Plan beats

For each beat, define:

- Time range and duration.
- Subject and action.
- Framing and camera movement.
- Location, lighting, and audio.
- Identity, wardrobe, product, and style elements that remain fixed.
- Match-cut object or continuity handoff when location/time changes.

Use one main action and one camera idea per short beat. For a multi-shot Film project, use the approval gates in `characters-and-film.md`.

## 2. Create the review board

Use `image/nano-banana-pro` for a complex labeled contact sheet. Consider `image/gpt-image-2` when exact text is the dominant risk. Verify both at runtime.

Pass exact panel instructions with `agentic_prompting: false`:

```text
[N]-panel production storyboard in a clean [rows × columns] grid.
STRICT CONTINUITY: [characters, wardrobe, product, palette, medium].
One panel per beat, in reading order. Thin borders.
Each panel has exactly one bold timecode and one short action note.

Panel 1 — [time]: [shot, action, camera].
Panel 2 — [time]: [shot, action, camera].
...
```

When reference images are needed, import them first and use the chosen image model's discovered multi-reference field. Name and tag the board.

## 3. Review and revise

Show the board and wait for explicit approval. For a local change, edit the current board with `generate_image({ image_url, ... })` and say exactly what to change and preserve. Regenerate from scratch only when the user rejects the direction.

## 4. Produce clean frames

Generate or crop the approved opening, closing, character, product, and location anchors as separate full-bleed images. A frame-generation prompt should say:

```text
Render Panel [N] as one full-bleed cinematic frame. Preserve the approved
character, wardrobe, environment, palette, and composition. No labels, no
timecodes, no panel borders, no arrows, no notes, no watermark.
```

Inspect each frame before using it. For first/last interpolation, both frames must share the exact output ratio and plausible continuity.

## 5. Choose the video model

Call `list_models({ category: "video" })` and `get_model_params`.

- General approved first-frame animation → `video/gemini-omni-flash`.
- 4–30s with many image/video/audio references → `video/seedance-2.5`.
- Up to ten ordered/timestamped image keyframes → `video/flux-3`.
- Mixed references up to 12 and optional 2K → `video/minimax-h3`.
- Explicit multi-shot prompts and reusable elements → `video/kling-3.0-omni`.
- Dialogue/character scene → `video/happyhorse-1.0` or another runtime-listed dialogue specialist.
- True 4K or Veo first/last control → `video/veo-3.1`.

Do not default every storyboard to one model. Match the approved board's structure to the model's actual input contract.

## 6. Compose the director prompt

```text
Global look, lighting, lens/medium, energy, and audio policy.
No on-screen text, subtitles, panel borders, labels, or watermark.

[0s–2s] Location. Subject and action. Camera movement. Sound.
[2s–4s] Match cut on [object]. New action. Camera movement. Sound.
...

Continuity: preserve [identity, wardrobe, product geometry, palette].
```

Reference every numbered/tokenized input explicitly and state what it controls. Disable prompt rewriting when using exact tokens, timecodes, or dialogue.

### Seedance 2.5 reference contract

- `image_url`: primary opening/source image.
- `last_frame_url` or discovered boundary field: closing frame when supported.
- `image_urls`: up to 30 image references.
- `video_urls`: up to 10 motion/video references.
- `audio_urls`: up to 10 audio references and requires at least one image/video reference.
- Total references: up to 50.
- Duration: 4–30 whole seconds or `auto`.

Use `@ImageN`, `@VideoN`, and `@AudioN` exactly as the current model guide/schema requires.

## 7. Generate and inspect

Explain the selected model and consequential settings, confirm expensive work, then call `generate_video`. Resolve the queued job when the completed URL is needed.

Reject and revise when:

- The result shows the storyboard grid or text.
- Identity, wardrobe, product, or palette drifts.
- Only the camera moves when subject animation was required.
- Cuts happen at the wrong times.
- Dialogue or sound contradicts the prompt.
- The last frame does not plausibly connect to the next shot.

Save approved clips and extracted continuity frames with consistent names and tags.
