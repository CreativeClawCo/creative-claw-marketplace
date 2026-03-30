# GPT Image 1.5

**Model ID:** `fal-ai/gpt-image-1.5`
**Edit Model ID:** `fal-ai/gpt-image-1.5/edit`

OpenAI's latest image generation model (released December 2025). Up to 4x faster than its predecessor with significantly improved prompt adherence, text rendering, and editing precision. Uses a language-model backbone (not diffusion), so it understands natural language context, world knowledge, and spatial relationships natively.

## Key Strengths

- **Exceptional prompt adherence** -- interprets complex, multi-part natural language instructions with high fidelity
- **Strong text rendering** -- handles small, dense, and complex text for infographics, posters, and UI mockups
- **World knowledge** -- infers era-appropriate details, geographic context, and historical references automatically (e.g., "Bethel, NY, August 1969" produces Woodstock-accurate imagery)
- **Editing precision** -- preserves identity, lighting, and composition during targeted edits without unwanted global changes
- **Photorealistic materials** -- excels at fabric behavior, skin textures, contact shadows, and natural lighting
- **Speed** -- generates up to 4x faster than gpt-image-1, enabling rapid iteration

## Prompting Strategy

### Use Natural Language with Structure

Write prompts as descriptive sentences, organized in layers:

**Scene/Background -> Subject -> Key Details -> Style -> Constraints**

Use line breaks or labels for complex requests to reduce ambiguity.

**Do this:**
> A weathered fishing boat docked at a New England harbor during golden hour, with lobster traps stacked on the deck, seagulls perched on the mast, and warm sunlight creating long shadows across wooden planks. Shot with a 35mm lens, shallow depth of field.

**Not this:**
> fishing boat, harbor, golden hour, lobster traps, seagulls, warm light, 35mm, bokeh, masterpiece, 8k

- Avoid diffusion-style quality boosters ("masterpiece, best quality, 8k") -- they do nothing
- Skip weighted token syntax like `(subject:1.5)` -- the model ignores it
- Use concrete material descriptions and photography terminology instead of generic quality words

### Photographic Language

Camera and lighting terms map directly to visual treatments:
- "50mm lens, soft daylight, shallow depth of field" -> natural portrait look
- "wide-angle shot" -> expansive perspective
- "85mm portrait lens" -> flattering compression with bokeh
- "bird's eye view" -> top-down perspective
- "rim lighting from behind" -> dramatic backlighting
- "soft box lighting" -> even, shadow-free illumination
- "diffused overcast light" -> gentle, even tones

### Medium References

Include medium references to guide rendering approach:
- "professional studio photography" -> clean commercial look
- "cinematic composition" -> dramatic framing and color grading
- "documentary photography style" -> candid, authentic feel
- "technical illustration" -> precise, informational rendering

## Text Rendering

GPT Image 1.5 is strong at in-image text. Follow these rules for best results:

### Wrap Text in Quotes or ALL CAPS

Always put text you want rendered in `"double quotes"` with typography specifications:

> A clean infographic titled "AI CONTENT WORKFLOW" in bold sans-serif at top, four horizontal panels each with an icon and short description, minimal flat design, professional color palette.

### Text Best Practices

- Specify font style, size, color, and placement explicitly
- For tricky brand names, spell letter-by-letter: "O-P-E-N-A-I"
- Add "no extra characters" to prevent hallucinated text
- Keep text elements manageable -- 3-5 per image is reliable
- Use `quality: "high"` for dense text layouts
- For pixel-perfect accuracy on product labels or legal copy, generate the image and overlay text programmatically

## Parameters

| Parameter | Values | Default | Notes |
|---|---|---|---|
| **Image Size** | 1024x1024, 1536x1024, 1024x1536 | 1024x1024 | Square for social media, landscape for scenes, portrait for characters |
| **Quality** | low, medium, high | high | Low for rapid prototyping ($0.009-0.013/img), medium for iteration ($0.034-0.051/img), high for production ($0.133-0.200/img) |
| **Background** | auto, transparent, opaque | auto | Transparent for design compositing; auto lets the model decide |
| **Output Format** | PNG, JPEG, WebP | PNG | PNG for lossless + transparency; JPEG for smaller files; WebP for balanced compression |
| **Batch Size** | 1-4 images per call | 1 | Each image priced separately; useful for exploring variations |
| **Prompt Length** | Up to 32,000 characters | -- | Supports very detailed prompts |

### Edit-Specific Parameters

| Parameter | Values | Default | Notes |
|---|---|---|---|
| **input_fidelity** | low, high | high | High preserves composition; low enables creative reinterpretation |
| **mask_image_url** | URL or null | null | Optional mask to specify edit region |
| **image_urls** | Array of URLs | Required | Reference images for editing |

## Editing Workflow

The edit model (`fal-ai/gpt-image-1.5/edit`) supports targeted edits with strong identity and composition preservation.

### Identity Preservation (Critical)

When editing people, explicitly lock down unchanged elements:
> "Do not change her face, facial features, skin tone, body shape, pose, or identity in any way."

### Constraint Repetition

Re-specify critical preservation details on each iteration to prevent drift across multi-step workflows.

### Editing Use Cases

- **Style transfer:** "Apply the pixelated retro style from Image 1 to a modern electric car. Preserve geometry, change only texture."
- **Lighting change:** "Same scene, same composition, but change to warm sunset lighting with long shadows."
- **Object manipulation:** "Same workers, same beam, same lunch boxes, but they're all on their phones now."
- **Virtual try-on:** Upload person + garment images, describe the fit with strict identity locks
- **Sketch to render:** Upload a sketch and describe the finished rendering style

### Editing Tips

- State both what to change AND what to preserve
- Make one change per prompt for complex scenes
- Use high `input_fidelity` to keep composition; low to allow creative reinterpretation
- Provide a mask image for region-specific edits when needed

## Iterative Refinement Strategy

Don't cram everything into one prompt. Build up:

1. **Foundation:** Generate base image with core subject and scene
2. **Atmosphere:** Refine lighting, mood, and environmental details
3. **Polish:** Add human elements, specific interactions, fine details

Use single-change follow-ups: "Make the lighting warmer, keep the subject unchanged." Reuse context cues like "same style as before," but re-specify critical details if they begin to drift.

## Example Prompts

### Product Photography
> A premium wireless headphone on a minimalist white surface with subtle gradient lighting from upper left, creating soft shadows. Metallic accents catching highlights. Professional studio photography, ultra-clean background.

### Historical Recreation
> A Victorian-era London street on a foggy evening, gas lamps creating pools of amber light, horse-drawn carriages on cobblestones, people in period clothing hurrying past shop windows displaying vintage goods. Atmospheric and cinematic.

### Conceptual / Surreal
> An impossible library where bookshelves extend infinitely in all directions including up and down, with readers sitting on floating chairs at various orientations, warm reading lights creating intimate spaces throughout, Escher-inspired architecture.

### Infographic with Text
> A clean infographic showing "AI CONTENT WORKFLOW" in bold sans-serif at top, four horizontal panels each with an icon and short description: "RESEARCH" with magnifying glass, "DRAFT" with pencil, "REVIEW" with checklist, "PUBLISH" with rocket. Minimal flat design, muted blue palette.

### Documentary Portrait
> A street musician performing in a bustling Tokyo subway station under fluorescent lighting with motion blur on passing commuters. Documentary photography style, 35mm lens, natural grain.

## Common Mistakes to Avoid

- **Contradictory objectives:** Don't request "photorealistic cartoon" -- choose a clear direction, or explicitly describe how styles should merge
- **Missing context:** "A red sports car" differs dramatically from "A red sports car on an empty desert highway with mountains in the distance"
- **Ignoring format:** Use PNG for transparency/design work, JPEG for web delivery, WebP for balanced compression
- **Underusing edits:** The edit endpoint preserves composition while enabling transformations impossible with text-to-image alone
- **Quality overkill:** Use `low` quality for rapid prototyping -- it still delivers superior results to older models and costs 10-15x less than `high`

## When to Use GPT Image 1.5 vs Other Models

- **Use GPT Image 1.5** when you need: production-quality images with reliable prompt adherence, text in images, identity-preserving edits, historical/contextual accuracy, or complex multi-element compositions
- **Use Nano Banana 2 instead** when you need: fastest generation at lowest cost, multilingual text rendering, or rapid iteration on text-heavy designs
- **Use FLUX Pro instead** when you need: pure photorealism without text, artistic style diversity, or maximum creative range
- **Use Recraft V3 instead** when you need: brand-consistent design assets, vector-style illustrations, or precise color palette control
