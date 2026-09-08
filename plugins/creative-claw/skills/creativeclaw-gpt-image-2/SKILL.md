---
name: creativeclaw-gpt-image-2
description: "Apply GPT Image 2.5 Sunburst and Flare prompting and editing techniques. Use when the user requests GPT Image 2.5, GPT Image 2, or OpenAI image generation and editing."
---

# Creative Claw — GPT Image 2.5

Choose the explicit variant that matches the job:

- `image/gpt-image-2.5-flare` for fast, high-quality everyday generation and editing.
- `image/gpt-image-2.5-sunburst` for maximum editing precision, typography, transparency, intricate detail, and controlled production work.
- `image/gpt-image-2` only when the user explicitly wants GPT Image 2 or the Pika-backed route. GPT Image 2.5 is currently delivered through fal, not Pika.

## Core workflow

1. Define the final use, canvas shape, hierarchy, exact visible copy, transparency requirement, and protected details.
2. Search or import durable Creative Claw references.
3. Choose generation or edit mode. Any `image_url` or `extras.image_urls` makes the request an edit/composition.
4. Choose Flare or Sunburst explicitly, then call `get_model_params` with that exact model ID before generation when not already fetched for this task; the live route may expose different optional controls.
5. Put the principal source or canvas in `image_url`. Put additional ordered references in `extras.image_urls`.
6. Set `agentic_prompting: false` for exact copy, reference-number mappings, masks, identity locks, hex colors, or a finished production prompt.
7. Honor requested quality directly. Use low or medium for requested exploration, high for a final result, and `xhigh` or `max` only when the user's final-detail requirements justify the extra latency and cost; do not add an unsolicited draft pass. Request several images only when the user wants alternatives.
8. Inspect text, identity, reference roles, masked boundaries, transparency, anatomy, product geometry, and composition.

## Current Creative Claw contract

| Control | Use |
| --- | --- |
| `model` | `image/gpt-image-2.5-flare` or `image/gpt-image-2.5-sunburst`. |
| `image_url` | Primary source image; becomes Image 1. |
| `extras.image_urls` | Additional ordered inputs; become Image 2 onward. |
| `size` | Preferred Creative Claw ratios: `1:1`, `4:5`, `5:4`, `9:16`, or `16:9`; the wrapper normalizes these for GPT Image 2.5. |
| `extras.image_size` | Use a current native preset, `auto`, or valid custom dimensions when direct control is preferable. |
| `extras.quality` | `auto`, `low`, `medium`, `high`, `xhigh`, or `max`; default `high`. |
| `extras.background` | `auto`, `transparent`, or `opaque`. Use PNG or WebP for transparency. |
| `extras.mask_url` | Optional edit-region mask. It applies to the first input image. |
| `extras.output_compression` | Integer `0`–`100`; use only with JPEG or WebP. |
| `num_images` | 1–4. |
| `output_format` | Prefer `png` for transparency/text and `jpeg` for ordinary photographic delivery. |

Do not invent an `ultra` quality value or unsupported output size. Runtime discovery is authoritative.

## Reference ordering

Creative Claw sends the principal `image_url` first, followed by the unique URLs in `extras.image_urls`. GPT Image 2.5 accepts up to 16 images on the current edit route. Every reference must be a public, directly fetchable URL or a durable Creative Claw URL.

Use one-based labels in the prompt:

```text
Image 1 is the base composition and must remain the canvas.
Image 2 is the exact product identity and packaging.
Image 3 is the exact model identity and skin tone.
Image 4 defines wardrobe only.
Image 5 defines lighting, palette, and photographic finish only.
```

Then specify the transformation:

```text
Edit Image 1. Replace its placeholder package with Image 2 and preserve the
package dimensions, label, cap, colors, and logo. Use the person from Image 3
without changing her face, age, skin tone, or body proportions. Dress her in
the garment from Image 4. Apply only the soft daylight and muted sage palette
from Image 5; do not copy its people, location, or objects. Preserve the camera,
pose, hands, furniture, and background from Image 1.
```

State what every source contributes and what it must not contribute. Put the base canvas first; do not rely on the model to guess which image is primary.

## Prompt structure

GPT Image 2.5 responds well to concrete, layered natural language:

```text
Outcome: [what finished image should accomplish].
Canvas and hierarchy: [ratio, placements, scale, empty space].
Scene: [environment, subject, action, objects].
References: [Image N → role and exact protected details].
Camera and lighting: [angle, lens feel, light direction and quality].
Materials and style: [surface behavior, texture, medium, palette].
Visible text: [exact quoted strings with type treatment and location].
Change: [for edits, the smallest explicit delta].
Preserve: [identity, pose, geometry, composition, non-edited pixels].
Output: [transparent/opaque background, edge behavior, format].
```

Avoid comma-separated diffusion tags, weighted tokens, and empty quality words. Describe observable detail: “soft contact shadow beneath brushed aluminum” is better than “ultra high quality.”

## Typography and multilingual assets

- Put each visible phrase in double quotes.
- Specify its placement, hierarchy, alignment, color, and typographic character.
- Add “no additional text” when the design has a closed copy set.
- Preserve brand names, punctuation, prices, dates, and capitalization exactly.
- Generate one image per locale so the layout can adapt to translation length and reading direction.
- Explicitly request right-to-left hierarchy for Arabic and Hebrew.
- Inspect every character. Overlay legal, safety, pricing, or other exact copy deterministically if one wrong character is unacceptable.

For dense text, finalize the words first. Then create the visual around the approved copy instead of asking the model to invent and render content simultaneously.

## Transparent assets

Use transparent PNG for isolated products, characters, icons, stickers, and foreground elements:

```json
{
  "model": "image/gpt-image-2.5-sunburst",
  "prompt": "A single translucent cobalt glass perfume bottle, front three-quarter view, accurate refraction and clean studio rim light, centered with complete object visible and clean antialiased edges. No floor, shadow, text, border, or additional objects.",
  "size": "1:1",
  "output_format": "png",
  "extras": {
    "background": "transparent",
    "quality": "high"
  }
}
```

Inspect the alpha edge and interior transparent materials. If transparent generation produces halos or a false checkerboard, regenerate once or use `remove_background` on an opaque clean-background result.

## Masked and regional editing

Pass the base as `image_url` and the mask URL as `extras.mask_url`. Describe both the selected change and the untouched surroundings:

```json
{
  "model": "image/gpt-image-2.5-sunburst",
  "image_url": "<room-url>",
  "prompt": "Inside the masked wall region only, replace the blank paint with warm vertical walnut slats. Match the room perspective, soft daylight, and contact shadows. Preserve the people, furniture, floor, windows, ceiling, camera, crop, and every unmasked region exactly.",
  "agentic_prompting": false,
  "extras": {
    "mask_url": "<mask-url>",
    "quality": "high"
  }
}
```

Verify the result rather than assuming the mask was followed exactly. If the mask is ignored, use a more explicit spatial instruction and report the route behavior through `submit_feedback`.

## Multi-reference examples

Identity-preserving campaign edit:

```json
{
  "model": "image/gpt-image-2.5-sunburst",
  "image_url": "<layout-url>",
  "prompt": "Image 1 is the approved layout. Image 2 is the exact person identity. Image 3 is the exact headset. Image 4 is style only. Render the final 16:9 campaign image following Image 1's framing. Preserve the person's exact face, skin tone, hair, body proportions, and pose from Image 2. Preserve the headset shape, materials, buttons, and logo from Image 3. Apply only the dramatic red rim light and deep black finish from Image 4. No additional text or objects.",
  "size": "16:9",
  "agentic_prompting": false,
  "extras": {
    "image_urls": ["<person-url>", "<headset-url>", "<style-url>"],
    "quality": "high"
  }
}
```

Text-rich infographic:

```text
Create a clean 4:5 infographic titled "IMAGE PRODUCTION WORKFLOW" in bold
navy sans-serif at the top. Four equal horizontal stages: "1. BRIEF" with a
document icon, "2. REFERENCES" with an image stack, "3. GENERATE" with a
spark icon, and "4. REVIEW" with a checkmark. Warm white background, navy
(#102A43), cyan (#22C7E8), crisp grid, generous spacing, no additional text.
```

## Iteration and quality gate

Repeat critical preservation requirements on every edit; “same as before” is weaker than an explicit lock. Make one conceptual change per pass when a face, product, or layout must remain stable.

Reject altered identity, extra text, misspellings, incorrect transparency, mask spill, reference-role leakage, warped anatomy, changed logos, product deformation, and unintended global edits. Use `submit_feedback` when a supported mask is ignored, references are reordered, or quality repeatedly misses a concrete requirement.
