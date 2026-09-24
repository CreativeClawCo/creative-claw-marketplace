---
name: creativeclaw-plan-video
description: "Plan a video as an approved script, shot list, and storyboard with clean generation references. Use before costly multi-shot work, when continuity matters, or when the user asks to storyboard without producing a final film yet."
---

# Plan Video

Read [video model selection](references/video/index.md) when choosing shot models. Load a specific model guide only when planning its timing, references or controls. These references are packaged locally; no sibling model skill is required. Planning alone does not authorize video generation.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Convert a concept into an execution-ready video plan before spending on clips. This skill stops at an approved plan or storyboard unless the user also asks for production.

For worked production flows, read only the relevant recipe: [product ad](references/video/recipe-product-ad.md), [consistent Character scene](references/video/recipe-character-scene.md), or [source edit and extension](references/video/recipe-source-edit.md). These explain asset preparation, shot prompting, assembly and output checks, without authorizing extra paid drafts.

## Reference-first production

Strongly recommend image preparation before video: reuse the user's media, develop shot-appropriate references with creativeclaw-generate-image, and prefer at least three complementary images where the video model supports them. Read [image model selection](references/images/index.md) and only the chosen image guide, plus [the reference-first workflow](references/video/reference-production.md) for approval, Character sheets, audio-first control and cross-shot continuity. Existing references count; do not force extra paid assets, exceed model limits or ignore an explicit direct-generation request.

Use the video's Review card as the single approval of its exact references and settings, without a duplicate chat approval. Honor separately requested earlier checkpoints and consent requirements. Review does not gate earlier image/audio charges. For connected clips, reuse stable visual/audio anchors and request dialogue, ambience and effects without independently generated music per shot.

## Plan the story

1. Define objective, audience, channel, aspect ratio, target runtime, brand, required Characters or products, audio approach, and call to action.
2. Write a concise beat outline and script. Prefer a clear opening hook, progression, payoff, and ending.
3. Break the piece into shots. Each shot gets one primary action, one camera idea, a start state, end state, dialogue or narration, and a model-supported duration.
4. Choose likely models with `list_models` and inspect them with `get_model_params`. Duration and reference limits are per model; never impose a universal clip length.

Write the plan in the user's language and preserve approved dialogue or on-screen copy exactly.

## Build the storyboard

For a visual storyboard request, create the needed artifacts with `creativeclaw-generate-image`. A text-only plan does not require images; reuse approved frames and skip duplicate review boards when unnecessary:

- A review board or contact sheet for fast approval of composition, pacing, and continuity.
- Clean, text-free shot images for the selected input mode. A literal start frame and a composition reference are different. Follow [reference production](references/video/reference-production.md); do not feed a labeled grid as frame zero.

Preserve Character identity, product geometry, wardrobe, palette, screen direction, time of day, and recurring locations across frames. Use Nano Banana 2 by default because it is the cost-efficient image model for most storyboard work.

## Optional Film project

If the user intends to continue into production, call `create_film_project` and persist the approved shots with `update_film_project`. Use stable shot IDs and the actual tool fields: `description`, `prompt`, `narration`, `storyboardUrl`, `durationS`, `model`, and `status`. Set the project to `script_ok` only after script approval and `storyboard_ok` only after storyboard approval.

## Approval gate

Present the requested plan/storyboard and honor review stages and existing approval. Planning alone does not authorize video generation. When production is also requested and its applicable stage is approved, continue with `creativeclaw-build-film` without asking the same question again.
