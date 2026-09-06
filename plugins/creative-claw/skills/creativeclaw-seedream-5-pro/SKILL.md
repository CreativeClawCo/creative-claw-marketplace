---
name: creativeclaw-seedream-5-pro
description: "Apply Seedream 5 Pro prompting and reference techniques after Creative Claw selects that model. Use when the user explicitly requests Seedream 5 Pro, or when another Creative Claw workflow routes a premium commercial, product, fashion, or multi-reference job to image/seedream-5-pro."
---

# Creative Claw — Seedream 5 Pro

Use `image/seedream-5-pro` for premium product, fashion, portrait, editorial, and campaign work—especially when several references must become one coherent finished image. It is a focused flagship option after Nano Banana 2, not the default for every image.

## Core workflow

1. Define the commercial purpose, subject, desired finish, composition, exact copy, and protected product or identity details.
2. Search existing assets and import every source into Creative Claw.
3. Choose the primary canvas or most important source as `image_url`. Place remaining ordered references in `extras.image_urls`.
4. Write a numbered reference manifest describing exactly what each image contributes.
5. Call `get_model_params({ model: "image/seedream-5-pro" })` immediately before generation.
6. Set `agentic_prompting: false` for exact reference mappings, copy, colors, annotations, or a carefully structured edit.
7. Use 1K for iteration and 2K for approved campaign work. Generate multiple images only when alternatives are useful.
8. Inspect product geometry, faces, reference roles, materials, lighting, typography, hands, and the untouched parts of edited images.

## Current Creative Claw contract

| Control | Use |
| --- | --- |
| `model` | Always `image/seedream-5-pro`. |
| `image_url` | Primary source/canvas for editing; becomes Image 1. |
| `extras.image_urls` | Additional ordered edit references; become Image 2 onward. |
| `extras.resolution` | `1K` or `2K`; default `2K`. |
| `num_images` | 1–4. |
| `seed` | Reuse for controlled comparisons; references remain the real consistency anchors. |

The current route accepts no dedicated aspect-ratio field. For an edit, the primary source strongly anchors the canvas shape. For text-only generation, state the desired composition in the prompt and crop or scale afterward when exact dimensions matter. Do not claim that an unsupported `size` parameter will be honored.

## Reference order

Seedream 5 Pro accepts up to ten unique input images in total. Creative Claw sends `image_url` first, followed by deduplicated `extras.image_urls`.

Use plain one-based labels—`Image 1`, `Image 2`, and so on. Do not use video-model tokens such as `@Image1` or `<IMAGE_REF_0>`.

The most reliable order is:

1. Base scene, composition, or annotated edit canvas.
2. Exact product or primary person.
3. Secondary person, wardrobe, or product angle.
4. Lighting and palette.
5. Material, texture, location, or layout references.

Example manifest:

```text
Image 1 is the base scene and exact camera composition.
Image 2 is the exact perfume bottle, label, cap, and color.
Image 3 is a second product angle that clarifies the side profile.
Image 4 defines the wet black-stone material and reflections only.
Image 5 defines the cobalt and silver lighting palette only.
```

Then direct the composite:

```text
Edit Image 1. Replace its placeholder bottle with the product from Images 2
and 3, preserving exact silhouette, glass thickness, cap geometry, label, and
color. Apply the wet black-stone surface from Image 4 and only the cobalt and
silver lighting from Image 5. Preserve Image 1's camera, crop, background,
negative space, and shadow direction. Do not reproduce objects or text from
Images 4 or 5.
```

Avoid assigning conflicting identities or styles. If two product angles disagree, choose one as authoritative and explain why the other is included.

## Prompt structure

Seedream responds well when the edit operation and reference roles come before the aesthetic description:

```text
Task: [generate, replace, combine, restyle, remove, retouch, annotate].
References: [Image N → role, protected properties, exclusions].
Composition: [canvas, framing, subject positions, scale, negative space].
Subjects: [identity, pose, interaction, expression].
Product and materials: [geometry, finish, reflections, refraction, fabric].
Lighting and camera: [direction, softness, lens feel, focus, motion treatment].
Art direction: [campaign category, palette, texture, finish].
Visible text: [exact quoted strings, language, typography, placement].
Preserve: [non-edited people, objects, layout, environment, branding].
```

Describe physical appearance, not vague prestige words. “Black volcanic glass with a sharp white edge reflection” is stronger than “luxurious premium background.”

## Product and campaign prompting

Lock the commercial identity:

- Silhouette and proportions.
- Logo, label, typography, colorway, buttons, ports, closures, and seams.
- Material physics: gloss, roughness, translucency, refraction, metallic response.
- Contact behavior: believable weight, shadow, grip, clothing overlap, and surface reflection.
- Required empty space for campaign copy or cropping.

For several product references, say which view is authoritative for front, side, top, and small details. Do not ask Seedream to average contradictory designs.

## People and group composition

Give every person a source and position:

```text
Image 1 is the group-position blockout. Use the exact person from Image 2 at
left, Image 3 at center, and Image 4 at right. Preserve each face, age, skin
tone, hair, and body proportions. Match all three to one warm late-afternoon
light and one 50mm camera. Follow Image 1's spacing without reproducing its
placeholder faces or labels.
```

Inspect face mixing, duplicated people, hand interactions, scale, eye lines, and shared lighting. Reduce the cast or split the work if identity begins to drift.

## Annotation-guided editing

Seedream 5 Pro can use arrows, boxes, sketches, and handwritten notes as spatial guidance. Pass the annotated image as `image_url` and explain that annotations are instructions, not output content:

```text
Image 1 is an annotated edit map. Apply every requested change inside the
purple boxes at the indicated locations. Replace the marked wall with pale oak
panels, move the lamp to the arrow endpoint, and remove the circled chair.
Erase all boxes, arrows, handwriting, and guide marks from the finished image.
Preserve the room perspective, windows, floor, furniture not marked for change,
and natural daylight.
```

Prefer a small number of unambiguous annotations. If labels overlap the subject, provide an unmarked copy as Image 2 and identify it as the fidelity reference.

## Typography and localization

- Put all visible copy in double quotes and keep it exact.
- Specify language, reading direction, hierarchy, alignment, and placement.
- State “no additional text” for closed-copy designs.
- Generate one localized asset per language so line length and layout can adapt.
- Inspect each character; use deterministic overlay for legal, safety, pricing, or otherwise exact copy.

Seedream can produce text-rich graphics, but information correctness must be verified outside the image.

## Examples

Premium product campaign:

```json
{
  "model": "image/seedream-5-pro",
  "image_url": "<base-scene-url>",
  "prompt": "Image 1 is the exact campaign composition. Images 2 and 3 show the exact watch from front and side. Image 4 defines material and light only. Replace the placeholder watch in Image 1 with the product from Images 2 and 3, preserving case shape, crown, buttons, band attachment, graphite finish, and logo. Apply only the hard silver rim light and black volcanic surface from Image 4. Preserve the camera, crop, empty upper third, and background from Image 1. Photorealistic contact shadow and metal reflections; no additional objects or text.",
  "agentic_prompting": false,
  "num_images": 1,
  "extras": {
    "image_urls": ["<watch-front-url>", "<watch-side-url>", "<style-url>"],
    "resolution": "2K"
  }
}
```

Fashion editorial composite:

```text
Image 1 is the exact model identity and pose. Image 2 is the exact silver coat,
including cut, fabric, collar, and closures. Image 3 defines the brutalist
concrete location. Image 4 defines only the cool overcast lighting and muted
editorial grade. Dress the person from Image 1 in the coat from Image 2 and
place her naturally in Image 3. Preserve her face, hair, age, skin tone, body
proportions, and pose. Match contact shadows and fabric folds to the environment.
Do not copy people or clothing from Images 3 or 4.
```

Localized infographic:

```text
Create a vertical public-transit safety poster with the exact Arabic headline
"سلامتك أولاً" at the upper right and three numbered steps beneath it. Modern
wayfinding design, white background, safety yellow (#F6C900), black pictograms,
clear right-to-left hierarchy, large legible type, balanced grid, no additional
text or logos.
```

## Quality gate and feedback

Reject changed product geometry, corrupted labels, blended identities, inconsistent lighting, floating objects, weak contact shadows, copied content from style references, residual annotations, misspelled text, and changes outside the requested edit.

Revise the smallest failed component and reuse the best approved result as Image 1. Use `submit_feedback` for repeated Seedream-specific defects, reordered references, unexplained resolution behavior, or a missing spatial-edit control. Include the model ID, reference roles, resolution, and observed failure without sharing private media.
