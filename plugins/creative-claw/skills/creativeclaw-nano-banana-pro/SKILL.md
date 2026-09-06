---
name: creativeclaw-nano-banana-pro
description: "Apply Nano Banana Pro prompting and reference techniques after Creative Claw selects that model. Use when the user explicitly requests Nano Banana Pro or Gemini 3 Pro Image, or when another Creative Claw workflow routes a demanding job to image/nano-banana-pro."
---

# Creative Claw — Nano Banana Pro

Use `image/nano-banana-pro` when a brief is too complex or high-stakes for the default image route: many independently defined references, demanding spatial relationships, professional campaign layouts, or precise multilingual typography. Use Nano Banana 2 for ordinary work and faster iteration.

## Core workflow

1. Define the output, audience, ratio, hierarchy, exact copy, and the details that must survive generation unchanged.
2. Search existing assets and import every reference into Creative Claw.
3. Build a reference manifest before prompting. Give each image one principal role and identify the attributes to preserve.
4. Call `get_model_params({ model: "image/nano-banana-pro" })` immediately before use.
5. Use `agentic_prompting: false` for exact text, hex colors, legal copy, reference-number mappings, annotated layouts, or a finished professional prompt.
6. Generate at 1K or 2K while resolving composition. Use 4K only for an approved final that benefits from the added detail.
7. Inspect reference fidelity, faces, product geometry, text, layout, materials, lighting logic, and localization.
8. Revise with a targeted edit. Do not re-roll a nearly approved asset from scratch.

## Current Creative Claw contract

| Control | Use |
| --- | --- |
| `model` | Always `image/nano-banana-pro`. |
| `image_url` | Primary scene, canvas, or identity reference; becomes Image 1. |
| `extras.image_urls` | Additional ordered references; become Image 2 onward. |
| `size` | Preferred common ratios: `1:1`, `4:5`, `5:4`, `9:16`, or `16:9`. |
| `extras.aspect_ratio` | `auto`, `21:9`, `16:9`, `3:2`, `4:3`, `5:4`, `1:1`, `4:5`, `3:4`, `2:3`, or `9:16`. |
| `extras.resolution` | `1K`, `2K`, or `4K`; default `1K`. |
| `extras.enable_web_search` | Use only when the image depends on current external information. |
| `num_images` | 1–4; use one for a locked design and several for real concept exploration. |
| `output_format` | Prefer `png` for design/text and `jpeg` for photographic delivery. |
| `seed` | Useful for controlled comparisons, not a substitute for references. |

The underlying model reasons through complex prompts automatically; the current Creative Claw schema does not expose a `thinking_level` field for Pro. Do not invent it.

## Reference architecture

Pass the principal edit source through `image_url`. Pass the rest through `extras.image_urls`. Reference them in that exact order using `Image 1`, `Image 2`, and so on.

Google supports up to 14 references for Gemini 3 Pro Image, with practical high-fidelity allocations of up to six object images, five human images, and three style images. Treat those as category ceilings, not targets.

Use references deliberately:

| Reference role | What to say |
| --- | --- |
| Base canvas | “Edit Image 1 and preserve its framing, perspective, and layout.” |
| Person | “Image 2 is the exact face, hair, age, skin tone, and body identity.” |
| Product | “Image 3 defines exact geometry, material, colorway, controls, and logo placement.” |
| Wardrobe | “Image 4 supplies only the jacket, fabric, fit, and accessories.” |
| Style | “Image 5 supplies lighting, palette, grain, and art direction only.” |
| Layout sketch | “Image 6 defines placement and scale; do not reproduce its labels or sketch texture.” |
| Color swatch | “Image 7 is the exact palette; do not reproduce the swatch card.” |

Then describe the desired output:

```text
Edit Image 1. Preserve its architectural perspective and camera position.
Use the person from Image 2 with exact facial identity. Replace the placeholder
device with Image 3, preserving its geometry and logo. Use only the jacket from
Image 4. Apply the low-key amber and cyan lighting from Image 5 without copying
its people, location, or objects. Follow the placement blockout in Image 6 but
render a finished photograph with no annotations.
```

Do not describe every reference as “style inspiration.” Distinguish identity, geometry, wardrobe, placement, lighting, palette, and texture so attributes do not leak between sources.

## Prompt structure

For complex work, use short labeled sections:

```text
Deliverable: [campaign hero, packaging key art, poster, diagram, storyboard].
Primary scene: [subject, action, setting, time].
Composition: [ratio, angle, hierarchy, placements, empty space].
Reference manifest: [Image N → role, inherit, exclude].
Lighting and materials: [direction, softness, reflections, textures].
Typography: [exact quoted copy, script, style, size, color, position].
Brand system: [exact names, colors, logos, required visual behavior].
Preserve: [identity, geometry, layout, non-edited areas].
Finish: [photography or medium, detail level, edge behavior].
```

Use natural language rather than comma-separated tags, weighted syntax, or words such as “masterpiece.” Replace vague praise with visible specifications: lens, lighting direction, material, placement, scale, and texture.

## Typography and localization

- Put every visible string in double quotes and preserve it verbatim.
- Specify font character, hierarchy, size, color, alignment, and position for each string.
- Keep brand names, product names, dates, prices, punctuation, and hex codes exact.
- Pair important hex codes with plain-language color names.
- Generate separate assets per locale so the model can rebalance line length and reading direction.
- Explicitly state right-to-left hierarchy for Arabic or Hebrew.
- Inspect every character before approval. Use a later deterministic text overlay for legal or pixel-critical copy.

For text-heavy work, first finalize the exact copy, then ask the model to create the image around it. Avoid changing both the copy and the visual concept in the same revision.

## Complex generation examples

Multi-reference campaign:

```json
{
  "model": "image/nano-banana-pro",
  "image_url": "<approved-layout-url>",
  "prompt": "Image 1 is the exact composition blockout. Image 2 is the exact athlete identity. Image 3 is the exact shoe. Image 4 is lighting and color only. Render a finished 4:5 luxury sports campaign following Image 1's placement and negative space. Preserve the athlete's face, body proportions, and pose from Image 2. Preserve the shoe silhouette, sole geometry, materials, colorway, and logo from Image 3. Apply only the silver-blue rim light and wet asphalt palette from Image 4. Photorealistic materials, crisp subject, subtle rain, no annotations or additional text.",
  "size": "4:5",
  "agentic_prompting": false,
  "extras": {
    "image_urls": ["<athlete-url>", "<shoe-url>", "<lighting-url>"],
    "resolution": "2K"
  }
}
```

Localized product poster:

```text
Premium 9:16 launch poster for a black titanium watch. The exact headline
"הזמן שלך. מדויק יותר." appears at the upper right in large modern Hebrew
lettering, right aligned. The exact line "סדרה 8" appears below in small caps.
Watch centered in the lower half, hard silver rim light, deep charcoal
(#101114), cool silver (#C9CDD3), restrained luxury layout, crisp legible text,
no additional copy.
```

Reasoned technical visual:

```text
Create a clean exploded-view technical illustration of a compact espresso
machine. Show six numbered components in correct assembly order with thin
leader lines: "1. WATER TANK", "2. PUMP", "3. BOILER", "4. GROUP HEAD",
"5. PORTAFILTER", "6. DRIP TRAY". White background, graphite line work,
selective copper accents, generous spacing, mechanically plausible connections.
```

## Search grounding and factual images

Set `extras.enable_web_search: true` only when the image depends on current information. Independently verify dates, quantities, labels, maps, and charts; visual plausibility is not factual verification. Do not use grounding merely to improve a fictional scene.

## Editing discipline

State the delta first and the locks second:

```text
Change only the lighting to soft sunrise from camera left. Preserve the exact
face, expression, body, clothing, product, logo, camera, crop, architecture,
text, and palette. Do not add or remove objects.
```

Make one conceptual change per pass when identity or layout is fragile. Keep the best approved image as the next `image_url`; do not keep referencing an early draft after later corrections.

Use `submit_feedback` for repeated identity drift, reference-role leakage, text corruption, layout failures, or a missing Pro control. Include the model ID, reference roles, resolution, and observed defect without sharing private media.
