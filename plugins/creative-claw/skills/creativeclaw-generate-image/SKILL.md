---
name: creativeclaw-generate-image
description: "Generate or edit a single image with Creative Claw and route it to the best image model. Use for broad image requests when the user has not chosen a model or a more specific outcome such as a product photoshoot."
---

# Generate Image

Turn a brief and optional references into a finished image. This is the primary skill for a clear, general image-generation or image-editing request; model-specific skills supply deeper prompting advice after routing.

## Workflow

1. Establish the subject, intended use, aspect ratio, style, text requirements, and which details must remain exact.
2. Use `search_assets` for likely reusable references. Import attachments or local files with the platform upload flow before generation.
3. For branded work, call `get_theme` and carry the relevant colors, typography, logo treatment, and visual rules into the prompt.
4. Call `list_models({ modality: "image" })`, select a model, then call `get_model_params` before sending model-specific fields.
5. Explain the model choice before a costly batch. Generate one direction first unless the user explicitly wants several.
6. Call `generate_image`. If a downstream tool needs a queued result URL, use `check_job`; otherwise let the inline viewer monitor it.
7. Inspect the result against the non-negotiables, revise the smallest failing element, and tag the approved asset.

## Model routing

- Default to `image/nano-banana-2`. It is the cost-efficient recommendation for most generation and editing.
- Use `image/nano-banana-pro` when maximum fidelity, demanding typography, or a complex composite justifies the premium.
- Use `image/gpt-image-2` for instruction-heavy editing, precise transformations, or strong world knowledge.
- Use `image/seedream-5-pro` for polished commercial imagery and premium product or fashion aesthetics.
- Honor an explicit model choice. Use the corresponding model specialist skill for exact prompting and reference syntax.

Do not proactively recommend lower-tier or internal-route variants.

## Prompt and reference contract

Build prompts in this order: deliverable and subject; composition; must-preserve facts; environment; lighting and camera; material detail; aesthetic; required text; exclusions.

Work in the user's language. Keep supplied visible copy verbatim, including spelling, punctuation, and script direction; verify the selected model's typography and language support when text accuracy matters.

- `image_url` is the primary reference. Additional reference support is model-specific, so inspect `get_model_params` instead of assuming a fixed count.
- Use a `character_id` for a saved Character. If both an explicit `image_url` and the Character's visual identity must influence the result, do not assume the Character image is automatically added as another reference; supply supported references deliberately.
- Set `agentic_prompting: false` for a complete prompt containing exact reference labels, quoted copy, strict layout, or other literal control syntax.
- Never invent unsupported parameters. Use only fields returned by the tool schema and selected model.

## Completion standard

Confirm that subject identity or product geometry, composition, text, crop, and brand rules match the brief. A job ID is not a finished image. Name and tag approved outputs so later video or campaign work can retrieve them.
