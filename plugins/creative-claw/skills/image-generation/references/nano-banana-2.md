# Nano Banana 2 (Gemini 3.1 Flash Image)

**Model ID:** `fal-ai/nano-banana-2`
**Edit Model ID:** `fal-ai/nano-banana-2/edit`

Google's Gemini 3.1 Flash image generation model. Uses multimodal reasoning (not diffusion) — it processes images as visual tokens predicted autoregressively through the same reasoning pipeline that handles text. This makes it exceptional at understanding complex instructions and rendering text.

## Prompting Strategy

### Use Natural Language, Not Tags

Nano Banana 2 understands plain English. Write prompts as sentences, not comma-separated keyword lists.

**Do this:**
> A frosted glass bottle on a slate surface, single dried chili beside it, late afternoon raking light, soft neutral background fading to charcoal, editorial food photography aesthetic.

**Not this:**
> frosted glass bottle, slate surface, chili, golden hour, dark background, editorial, masterpiece, best quality, 8k

- Avoid quality boosters like "masterpiece, best quality" — they do nothing
- Skip weighted token syntax like `(subject:1.5)` — the model ignores it
- 1-3 sentences is optimal for general images; longer prompts are fine for text-heavy designs

### Prompt Structure (Google's Recommended Order)

1. **Subject** — who or what
2. **Composition** — framing, angle, camera position
3. **Action** — what's happening
4. **Location** — setting, environment
5. **Style** — artistic direction, mood

### Photographic Language

Camera terms map directly to visual treatments:
- "wide-angle shot" → expansive perspective
- "85mm portrait lens" → flattering compression, bokeh
- "shallow depth of field" → blurred background
- "bird's eye view" → top-down perspective
- "low-angle shot" → dramatic, imposing

## Text Rendering

This is Nano Banana 2's headline feature. It validates text character-by-character before rendering.

### Critical Rule: Wrap Text in Double Quotes

Always put text you want rendered in `"double quotes"` with individual style specifications:

> Concert poster titled "MIDNIGHT BRASS" in tall condensed serif at top, saxophone player silhouetted against smoky amber spotlight, "JUNE 14-16" in small caps below, "BROOKLYN ARTS CENTER" in thin sans-serif at bottom, deep navy and warm gold palette.

### Text Best Practices

- Keep text elements to **3-5 per image**
- Use **larger text** whenever possible — small text at 1K resolution often blurs
- Stick to **short phrases** rather than full paragraphs
- Supports **multilingual rendering** (Japanese, Arabic, Chinese, Korean, etc.)
- For pixel-perfect accuracy on product labels or legal copy, generate the background with Nano Banana 2 and overlay text programmatically

## Parameters

| Parameter | Values | Notes |
|---|---|---|
| **Aspect Ratio** | auto, 21:9, 16:9, 3:2, 4:3, 5:4, 1:1, 4:5, 3:4, 2:3, 9:16, 4:1, 1:4, 8:1, 1:8 | "auto" analyzes prompt to pick optimal ratio |
| **Resolution** | 0.5K ($0.06), 1K ($0.08), 2K ($0.12), 4K ($0.16) | Default: 1K |
| **Output Format** | PNG (default, lossless), JPEG, WebP | |
| **Batch Size** | 1-4 images per call | Each image priced separately |
| **Safety Tolerance** | 1-6 | Default: 4. Increase if creative prompts get blocked |
| **Web Search** | enable_web_search | Adds $0.015/gen. Use for real-world subjects only |

## Editing Workflow

The edit model (`fal-ai/nano-banana-2/edit`) requires no masking. Describe edits in plain English.

- **Background change:** "Change the background to a sunset beach. Keep the person exactly as they are."
- **Object removal:** "Remove the car from the left side and fill in naturally with the surrounding grass."
- **Multi-image compositing:** Upload multiple source images and describe which elements from each to combine.

### Editing Tips

- State both what to change AND what to preserve
- Use high-quality, clear source images
- Assign distinct descriptions to each reference image
- Make one change per prompt for complex scenes
- Accepts up to **14 reference images** in a single edit

## Example Prompts

### Product Photography
> A frosted glass bottle on slate surface, single dried chili beside it, late afternoon raking light, soft neutral background fading to charcoal, editorial food photography aesthetic.

### Typography Poster
> Concert poster titled "MIDNIGHT BRASS" in tall condensed serif at top, saxophone player silhouetted against smoky amber spotlight, "JUNE 14-16" in small caps below, "BROOKLYN ARTS CENTER" in thin sans-serif at bottom, deep navy and warm gold palette.

### Infographic
> Vertical coffee brewing methods chart with four sections: "POUR OVER" (V60 illustration), "FRENCH PRESS" (plunger diagram), "ESPRESSO" (portafilter sketch), "COLD BREW" (mason jar), with brew time and grind size in clean sans-serif, kraft texture background, muted earth tones.

### Bilingual Content
> Tea house loyalty card with "TENTH CUP FREE" in clean bold English at top, Chinese equivalent in brush-style below, ten circle stamps with three filled, minimalist sage green and cream scheme, small teapot icon.

## When to Use Nano Banana 2 vs Other Models

- **Use Nano Banana 2** when you need: fast generation, text in images, multilingual content, infographics, posters, UI mockups, or rapid iteration at low cost
- **Use Nano Banana Pro instead** when you need: higher fidelity, more complex reasoning, or the absolute best quality from the Gemini family
- **Use FLUX models instead** when you need: pure photorealism without text, or the fastest possible generation (FLUX Schnell)
