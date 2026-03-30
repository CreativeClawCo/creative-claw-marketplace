# FLUX.1 [schnell]

**Model ID:** `fal-ai/flux/schnell`

Black Forest Labs' fastest image generation model. A 12-billion-parameter rectified flow transformer trained with latent adversarial diffusion distillation, generating high-quality images in only 1-4 inference steps. "Schnell" means "fast" in German -- and it delivers, producing images in roughly 0.5 seconds at the lowest cost of any model on the platform.

## Key Strengths

- **Speed:** Generates images in 1-4 steps (~0.5s), making it the fastest option available
- **Cost:** $0.003 per megapixel -- the cheapest model on the platform
- **No cold starts:** Runs on serverless GPU-H100 infrastructure with zero cold-start latency
- **Commercial use:** Fully permitted for personal and commercial applications
- **Text rendering:** Inherits the FLUX family's ability to render legible text in images (use double quotes around target text)
- **No white-background bug:** Unlike FLUX.1 [dev], Schnell does not produce fuzzy outputs when "white background" appears in prompts
- **Rapid iteration:** Generate 4 images per call for fast comparison and refinement

## Prompting Strategy

### Use Natural Language, Not Keyword Lists

FLUX uses dual text encoders (CLIP + T5-XXL) that understand full sentences, not keyword soup. Write prompts as natural descriptions.

**Do this:**
> Portrait of an elderly Japanese woman with deep smile lines, silver hair loosely pulled back, wearing indigo linen, soft window light from the left, shot on Fujifilm GFX100S, 110mm f/2, shallow depth of field.

**Not this:**
> elderly japanese woman, silver hair, indigo clothes, soft light, portrait, masterpiece, best quality, 8k

### Prompt Structure (Priority Order)

FLUX weighs earlier tokens more heavily. Place the most important elements first:

1. **Subject** -- who or what (the main focus)
2. **Action / Pose** -- what's happening
3. **Environment** -- setting, location, background
4. **Lighting** -- how light behaves, direction, quality
5. **Style / Technical** -- artistic direction, camera specs, mood

### Prompt Length

- **Short (10-30 words):** Quick concept exploration. FLUX internally expands very short prompts.
- **Medium (30-50 words):** The sweet spot for most use cases.
- **Long (50-80 words):** Complex, multi-element scenes. Beyond ~80 words the model starts summarizing, potentially losing details.

### Photographic Language

Camera terms map directly to visual treatments and produce more authentic results than generic quality descriptors:

- "Shot on Canon EOS R5, 85mm lens at f/2.8" -- shallow depth of field, specific rendering
- "Shot on iPhone 16" -- casual, candid aesthetic
- "Shot on Fujifilm X-T5, 35mm f/1.4" -- characteristic color science
- "wide-angle 24mm" -- expansive perspective
- "bird's eye view" -- top-down composition
- Aperture: f/1.4 for background blur, f/8 for edge-to-edge sharpness

### Lighting Descriptions

Describe how light *behaves*, not just its name:

> warm golden sunset light streaming through windows, casting long shadows across hardwood floors

This outperforms the generic "golden hour lighting" because it specifies direction, quality, and surface interaction.

### Text in Images

FLUX can render legible typography. For best results:

- Wrap target text in double quotes: `"OPEN" in red neon letters above the door`
- Specify font style, size, color, and placement
- Keep text short (2-5 words renders most reliably)
- ALL CAPS in the prompt produces ALL CAPS in the output

### Layered Compositions

Organize complex scenes hierarchically -- describe foreground, then middle ground, then background. For transparent materials (glass, ice, plastic), explicitly state spatial relationships: "object A in the front, object B visible behind it."

## What NOT to Do

- **No negative prompts:** FLUX does not support them. Instead of "no blur," say "sharp focus throughout." Instead of "no crowds," say "peaceful solitude."
- **No prompt weights:** Syntax like `(subject:1.5)` or `(text)++` is ignored. Use phrases like "with emphasis on" or "prominently featuring" instead.
- **No quality boosters:** "masterpiece, best quality, 8k" do nothing -- skip them entirely.
- **Don't bury the subject:** Putting the main subject at the end of a long description causes FLUX to deprioritize it.
- **Don't use chaotic keyword ordering:** "sign, green, vibrant" is ambiguous. Write "sign with green text, vibrant colors" instead.

## Parameters

| Parameter | Type | Default | Range / Options | Notes |
|---|---|---|---|---|
| **prompt** | string | (required) | -- | Natural language image description |
| **image_size** | enum | landscape_4_3 | square_hd, square, portrait_4_3, portrait_16_9, landscape_4_3, landscape_16_9 | Pass via extras |
| **num_inference_steps** | integer | 4 | 1-12 | 4 is optimal for Schnell; more steps rarely improve quality |
| **guidance_scale** | float | 3.5 | 1-20 | Controls prompt adherence; 3.5 works well for most cases |
| **num_images** | integer | 1 | 1-4 | Each image billed separately |
| **seed** | integer | null | -- | Same seed + same prompt = identical output |
| **output_format** | enum | jpeg | jpeg, png | PNG for lossless, JPEG for smaller files |
| **acceleration** | enum | none | none, regular, high | Higher = faster generation. Pass via extras |
| **enable_safety_checker** | boolean | true | -- | Toggle content safety filtering. Pass via extras |
| **sync_mode** | boolean | false | -- | Returns image as data URI instead of URL. Pass via extras |

**Pricing:** $0.003 per megapixel (billed by rounding up to the nearest megapixel).

## Example Prompts

### Product Photography
> A matte black coffee tumbler on a marble countertop, single espresso bean beside it, soft directional morning light from the right, clean white background fading to light gray, editorial product photography.

### Wildlife / Nature
> Red fox sitting alert in tall grass, wildlife documentary photography, misty dawn light filtering through birch trees, shallow depth of field, shot on Canon EOS R5 with 400mm telephoto lens.

### Portrait
> Portrait of a young woman with freckles and curly auburn hair, laughing candidly, wearing a cream knit sweater, soft overcast natural light, 85mm f/1.8 lens compression, warm tones.

### Architectural
> Modern glass and steel skyscraper reflecting sunset clouds, low-angle shot emphasizing height, warm golden hour light contrasting with cool blue shadows, urban skyline in background, architectural photography.

### Signage with Text
> Vintage neon sign reading "HOTEL & BAR" glowing in warm amber against a dark rainy night, wet pavement reflecting the light, cinematic noir atmosphere, shot on 35mm film.

## When to Use FLUX Schnell vs Other Models

- **Use FLUX Schnell** when you need: fastest possible generation, rapid prototyping and iteration, budget-conscious generation at scale, quick drafts before committing to a premium model, or batch generation of many images
- **Use FLUX.1 [dev]** when you need: higher fidelity from more inference steps (20-50), community LoRA support, or maximum quality from the FLUX 1.x family
- **Use FLUX.2 [pro/max]** when you need: the latest generation quality, JSON-structured prompts for complex multi-subject scenes, HEX color precision, or image reference support
- **Use Nano Banana 2** when you need: accurate text rendering in images, multilingual content, infographics, or posters with multiple text elements
