---
name: creativeclaw-nano-banana-2
description: "Apply Nano Banana 2 prompting and reference techniques after Creative Claw selects that model. Use when the user explicitly requests Nano Banana 2 or Gemini 3.1 Flash Image, or when another Creative Claw workflow routes a job to image/nano-banana-2; use the outcome skill as primary for generic image or product-shoot requests."
---

# Creative Claw — Nano Banana 2

Use `image/nano-banana-2` as Creative Claw's default for most image generation and editing. It is the primary cost-efficient recommendation, offering the best general balance of visual quality, instruction understanding, speed, output resolution, and iteration cost.

## Core workflow

1. Define the deliverable, intended placement, aspect ratio, subject, composition, required text, style, and protected brand details.
2. Search the Creative Claw asset library before creating replacements. Import any ChatGPT attachments or external references into durable Creative Claw URLs.
3. If references are supplied, assign one explicit role to each: base scene, identity, product, wardrobe, logo, palette, layout, or style.
4. Call `get_model_params({ model: "image/nano-banana-2" })` immediately before generation. Its current schema overrides remembered limits.
5. Use `agentic_prompting: false` when the prompt contains exact quoted copy, hex colors, reference-number mappings, or a carefully authored edit instruction.
6. Generate one image for a specific direction or up to four for genuine visual exploration. Start at 1K; move to 2K or 4K after approving the direction.
7. Inspect text, identity, hands, product geometry, logos, reference roles, composition, and localized copy before calling the result finished.
8. Prefer a focused edit of the selected result over restarting from text when only one element is wrong.

## Current Creative Claw contract

| Control | Use |
| --- | --- |
| `model` | Always `image/nano-banana-2`. |
| `image_url` | Primary edit source or most important reference; becomes Image 1. |
| `extras.image_urls` | Additional ordered references; become Image 2 onward. |
| `size` | Preferred common ratios: `1:1`, `4:5`, `5:4`, `9:16`, or `16:9`. |
| `extras.aspect_ratio` | Use for model-specific ratios such as `21:9`, `3:2`, `4:3`, `5:4`, `3:4`, `2:3`, `4:1`, `1:4`, `8:1`, or `1:8`. |
| `extras.resolution` | `0.5K`, `1K`, `2K`, or `4K`; default `1K`. |
| `extras.thinking_level` | `minimal` or `high`; omit for ordinary work. |
| `extras.enable_web_search` | Enable only when current real-world information is genuinely needed. |
| `num_images` | 1–4. |
| `output_format` | Use `png` for text/design and `jpeg` for ordinary photographic delivery. |
| `seed` | Reuse only for controlled comparisons; a seed does not guarantee identity. |

Keep `extras.limit_generations: true` unless there is a tested reason to expose intermediate outputs. Never loosen safety settings merely to bypass a refusal.

## Reference order and roles

All reference-guided calls are image-edit operations in Creative Claw:

- Pass the base image, layout, or most important visual anchor as `image_url`.
- Pass additional references in `extras.image_urls` in deliberate order.
- Refer to them in the prompt as `Image 1`, `Image 2`, `Image 3`, and so on.
- The wrapper removes duplicate URLs while preserving first occurrence order.

Nano Banana 2 supports up to 14 reference images in a workflow. For high-fidelity guidance, keep within the model's practical specialization of up to ten object references and four character references. More references are not automatically better.

Write the role map before the edit:

```text
Image 1 is the base composition and room geometry.
Image 2 is the exact product identity, proportions, materials, and logo.
Image 3 is the lighting and color reference only.
Image 4 is the exact character face and hair.

Edit Image 1. Replace the object on the table with the product from Image 2.
Preserve its geometry and logo exactly. Apply only the cool rim lighting and
deep-blue palette from Image 3. Use the face and hair from Image 4 while keeping
the pose from Image 1. Preserve everything else in Image 1.
```

Say both what to inherit and what not to inherit. A style reference should not silently contribute its people, objects, text, or layout.

For a saved Character, pass `character_id`; its image becomes the visual anchor when no explicit `image_url` is supplied. Add other references only when they provide a distinct role.

## Prompt structure

Use natural sentences, not diffusion keywords, weighted tokens, or generic quality boosters.

```text
Purpose: [where and how the image will be used].
Subject and action: [specific visible content].
Environment: [location, surfaces, surrounding objects].
Composition: [shot size, angle, subject placement, negative space].
Lighting and camera: [light direction/quality, lens or medium].
Visual language: [palette, materials, era, texture, art medium].
Text: [exact quoted copy, language, typography, placement].
References: [Image N → role and protected details].
Preserve: [identity, geometry, logo, layout, colors].
Output: [ratio, clean edge behavior, transparency if processed later].
```

One to three rich sentences are usually enough for a photograph or illustration. Use labeled sections for infographics, multilingual layouts, or many references.

## Text, brands, and localization

- Put every visible string in double quotes and preserve spelling, capitalization, punctuation, and language exactly.
- Describe typography and placement separately for each string.
- Keep visible copy to three to five short elements when possible.
- Preserve every supplied brand name and hex color verbatim. Pair critical hex values with a color name.
- For exact palette matching, include a clean color swatch as its own reference and label its role.
- Generate one locale per image. Do not ask one asset to contain every translation unless the design genuinely requires it.
- Inspect non-Latin text character by character. Regenerate or overlay legal, pricing, and other accuracy-critical text when exactness is mandatory.

Phrase desired results positively. Replace “no blur” with “crisp focus throughout” and “no crowd” with “an empty plaza.” Use explicit preservation clauses for edits.

## Generation examples

General campaign image:

```json
{
  "model": "image/nano-banana-2",
  "size": "4:5",
  "num_images": 2,
  "prompt": "Premium editorial photograph for a skincare launch. A translucent cobalt serum bottle stands on wet black stone, centered slightly below the upper third with clean negative space above. Soft white key light from the left and a narrow blue rim light reveal the glass thickness and condensation. Refined, quiet, tactile, realistic materials; pristine frame.",
  "extras": { "resolution": "1K" }
}
```

Reference-guided product scene:

```json
{
  "model": "image/nano-banana-2",
  "image_url": "<base-scene-url>",
  "prompt": "Image 1 is the base scene. Image 2 is the exact product. Image 3 is lighting only. Replace the placeholder in Image 1 with the product from Image 2, preserving its proportions, materials, colors, button placement, and logo. Apply only the soft amber edge light from Image 3. Preserve the camera, hands, tabletop, and background from Image 1.",
  "agentic_prompting": false,
  "extras": {
    "image_urls": ["<product-url>", "<lighting-url>"],
    "resolution": "2K"
  }
}
```

Localized poster:

```text
Vertical cultural festival poster with the exact headline "לילה של יצירה" in
large cream display lettering at the top and "12 בספטמבר · תל אביב" in a clean
sans-serif below. Midnight blue (#07152E), warm cream (#FFF3D6), and coral
(#FF6B5E). Abstract paper-cut waves with generous spacing, right-to-left visual
hierarchy, crisp legible Hebrew, no additional text.
```

## Grounded and technical visuals

Enable `extras.enable_web_search: true` only for current facts, real-world landmarks, timely diagrams, or data-led imagery. Verify factual labels independently; image generation is not a source of record.

Use `extras.thinking_level: "high"` for dense diagrams, spatial reasoning, complex multilingual layouts, or several reference roles. Omit it for simple product shots and portraits.

## Iteration and quality gate

When an output is close, make one bounded edit:

```text
Keep the subject, camera, composition, colors, typography, and every other
element unchanged. Move the bottle 8% lower and increase the empty space above
it. Do not add new objects or text.
```

Reject misspelled copy, changed logos, identity drift, reference-role leakage, extra objects, warped anatomy, contradictory shadows, incorrect aspect ratio, and smeared fine detail. Use `submit_feedback` for repeated model-specific failures or unclear controls, including the model ID, reference count, attempted task, and concrete defect.
