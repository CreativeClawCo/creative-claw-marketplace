---
name: creativeclaw-plan-video
description: "Plan a video as an approved script, shot list, and storyboard with clean generation references. Use before costly multi-shot work, when continuity matters, or when the user asks to storyboard without producing a final film yet."
---

# Plan Video

Convert a concept into an execution-ready video plan before spending on clips. This skill stops at an approved plan or storyboard unless the user also asks for production.

## Plan the story

1. Define objective, audience, channel, aspect ratio, target runtime, brand, required Characters or products, audio approach, and call to action.
2. Write a concise beat outline and script. Prefer a clear opening hook, progression, payoff, and ending.
3. Break the piece into shots. Each shot gets one primary action, one camera idea, a start state, end state, dialogue or narration, and a model-supported duration.
4. Choose likely models with `list_models` and inspect them with `get_model_params`. Duration and reference limits are per model; never impose a universal clip length.

Write the plan in the user's language and preserve approved dialogue or on-screen copy exactly.

## Build the storyboard

Create two artifacts with `creativeclaw-generate-image`:

- A review board or contact sheet for fast approval of composition, pacing, and continuity.
- One clean, text-free image per approved shot for use as a video start frame. Do not feed a labeled grid or multi-panel board to a video model as the shot reference.

Preserve Character identity, product geometry, wardrobe, palette, screen direction, time of day, and recurring locations across frames. Use Nano Banana 2 by default because it is the cost-efficient image model for most storyboard work.

## Optional Film project

If the user intends to continue into production, call `create_film_project` and persist the approved shots with `update_film_project`. Use stable shot IDs and the actual tool fields: `description`, `prompt`, `narration`, `storyboardUrl`, `durationS`, `model`, and `status`. Set the project to `script_ok` only after script approval and `storyboard_ok` only after storyboard approval.

## Approval gate

Present the script, shot order, estimated duration, model plan, and storyboard for approval before generating paid video clips. When the user approves and wants production, hand off to `creativeclaw-build-film`.
