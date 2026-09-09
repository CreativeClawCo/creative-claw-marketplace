---
name: creativeclaw-generate-image
description: "Generate or edit a single image with Creative Claw and route it to the best image model. Use for broad image requests when the user has not chosen a model or a more specific outcome such as a product photoshoot."
---

# Generate Image

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Turn a brief and optional references into a finished image. This is the primary skill for a clear, general image-generation or image-editing request; model-specific skills supply deeper prompting advice after routing. If the user explicitly requests HTML/CSS rendering or a deterministic code-based PNG, use `creativeclaw-render-html-image` instead.

## Workflow

1. Establish the subject, intended use, aspect ratio, style, text requirements, and which details must remain exact.
2. Use `search_assets` for likely reusable references. Import attachments or local files with the platform upload flow before generation.
3. When the user asks for examples, inspiration, styles, or a close starting point—or an open brief would materially benefit from concrete choices—use `creativeclaw-find-examples`. Search a small filtered set, then load only the chosen example with `get_example`. Do not search automatically for an already precise brief.
4. For branded work, call `get_theme` and carry the relevant colors, typography, logo treatment, and visual rules into the prompt.
5. Use `list_models({ category: "image" })` when selection is unresolved; for a known choice, use `get_model_params` directly and reuse its current-task schema.
6. Generate one direction unless several were requested. Estimate with `operation: "image"` only for user-requested cost/budget help; this does not require another confirmation for authorized work.
7. Call `generate_image`. If a downstream tool needs a queued result URL, use `check_job`; otherwise let the inline viewer monitor it.
8. Inspect the result against the non-negotiables, revise the smallest failing element, and tag the approved asset.

## Model routing

- Default to `image/nano-banana-2`. It is the cost-efficient recommendation for most generation and editing.
- Use `image/nano-banana-pro` when maximum fidelity, demanding typography, or a complex composite justifies the premium.
- Use `image/gpt-image-2.5-flare` for fast, high-quality everyday OpenAI image generation and editing.
- Use `image/gpt-image-2.5-sunburst` for instruction-heavy editing, precise transformations, typography, or strong world knowledge.
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
