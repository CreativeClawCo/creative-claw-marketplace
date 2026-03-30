# FLUX.2 Pro

**Model ID:** `fal-ai/flux-2-pro`

Black Forest Labs' professional-grade image generation model built on a 32-billion parameter architecture (nearly 3x FLUX.1's 12B). Combines a Mistral-3 24B vision-language model with a rectified flow transformer for direct text-to-image mapping. Zero-config quality -- produces great results without parameter tuning, 6x faster than FLUX.1 Pro.

## Key Strengths

- **Photorealism**: Best-in-class realism with natural light falloff, convincing material textures, and rich tonal ranges
- **Text rendering**: 92% accuracy on complex text layouts -- handles headlines, body copy, captions, and even barcodes
- **HEX color precision**: Exact color matching via HEX codes for brand-consistent output
- **Multi-reference editing**: Process up to 8 reference images simultaneously (at 1MP output) for compositing, style transfer, and character consistency
- **Natural language understanding**: VLM-powered architecture eliminates the need for prompt engineering tricks -- just describe what you want
- **JSON structured prompting**: Accepts JSON objects for complex multi-subject scenes with precise control over each element

## Prompting Strategy

### Use Natural Language, Not Tags

FLUX.2 Pro understands plain English. Write prompts as descriptive sentences, not keyword lists.

**Do this:**
> Professional model, mid-30s, holding Armani fragrance bottle at chest height, natural smile, soft studio lighting, cream background, shot on 85mm lens at f/2.8.

**Not this:**
> model, fragrance, studio, professional, masterpiece, best quality, 8k, ultra detailed

- No negative prompts -- describe what you want, never what to exclude
- No weight syntax like `(subject:1.5)` -- the model ignores it
- No quality boosters like "masterpiece, best quality" -- they do nothing
- 30-80 words is the sweet spot for most images; shorter for quick concepts, longer for complex scenes

### Prompt Structure (Word Order Matters)

The model prioritizes earlier elements. Follow this order:

1. **Subject** -- main focus (person, object, character)
2. **Action** -- what the subject is doing, pose, or state
3. **Style** -- artistic approach, medium, aesthetic
4. **Context** -- setting, lighting, time of day, mood, atmosphere

### Photographic Language

Camera-specific terms produce dramatically better results than generic descriptors:

| Technique | Example Terms |
|---|---|
| **Camera + lens** | "Shot on Hasselblad X2D, 80mm lens, f/2.8" |
| **Film stock** | "Shot on Kodak Portra 400, natural grain, organic colors" |
| **Modern digital** | "Shot on Sony A7IV, clean sharp, high dynamic range" |
| **Vintage look** | "Early digital camera, slight noise, flash photography, candid" |
| **Depth of field** | f/1.4-f/2.8 (shallow blur), f/4-f/5.6 (moderate), f/8-f/16 (deep focus) |
| **Lens focal length** | 14-24mm (wide/dramatic), 35-50mm (natural), 70-85mm (portrait), 100mm+ (telephoto) |

### Text Rendering

FLUX.2 Pro handles text well. Follow these rules for best results:

- **Wrap text in quotes**: "The text 'OPEN' appears in red neon letters"
- **Specify placement**: Describe position relative to other elements
- **Describe typography**: "elegant serif," "bold industrial lettering," "handwritten script"
- **Indicate size**: "large headline text," "small body copy," "medium subheading"
- Keep to 3-5 text elements per image for reliability
- Larger text renders more accurately than small text

> Concert poster titled "MIDNIGHT BRASS" in tall condensed serif at top, saxophone player silhouetted against smoky amber spotlight, "JUNE 14-16" in small caps below, "BROOKLYN ARTS CENTER" in thin sans-serif at bottom, deep navy and warm gold palette.

### HEX Color Precision

Use the keyword "color" or "hex" followed by the code, and describe the color alongside it:

- **Single object**: "apple in color #0047AB"
- **Multiple objects**: "walls in hex #C4725A terracotta, sofa in #1B6B6F teal"
- **Gradients**: "gradient starting with #02eb3c green and finishing with #edfa3c yellow"
- **Brand colors**: "Product photography of running shoe, primary color #FF6B35, secondary accents #004E89"

Always associate HEX codes with specific objects -- vague references like "use #FF0000 somewhere" produce inconsistent results.

### JSON Structured Prompting

For complex multi-subject scenes or production automation, JSON delivers superior consistency:

```json
{
  "scene": "Modern minimalist kitchen",
  "subjects": [
    {
      "description": "matte black ceramic coffee mug, gold interior, steam rising",
      "position": "foreground center"
    }
  ],
  "style": "lifestyle photography",
  "color_palette": ["#1A1A1A", "#D4A574", "#FFFFFF"],
  "lighting": "soft morning sunlight from left",
  "mood": "calm and sophisticated",
  "camera": { "angle": "slightly low", "lens": "50mm", "f-number": "f/2.8" }
}
```

Use JSON for production workflows and automation. Use natural language for quick iterations and creative exploration.

### Multi-Language Prompting

Prompting in the subject's native language produces more culturally authentic results -- local markets, architecture, and atmosphere render with greater accuracy.

## Parameters

| Parameter | Values | Notes |
|---|---|---|
| **image_size** | square_hd, square, portrait_4_3, portrait_16_9, landscape_4_3, landscape_16_9 | Default: landscape_4_3. Also accepts custom `{width, height}` (max 14142px per side, must be multiples of 16, max 4MP total) |
| **output_format** | jpeg, png | Default: jpeg |
| **seed** | integer | For reproducible generations |
| **safety_tolerance** | 1-5 | Default: 2. Higher = more permissive |
| **enable_safety_checker** | boolean | Default: true |
| **sync_mode** | boolean | Default: false. Returns image as data URI when true |

### Aspect Ratio Guidelines

| Ratio | Use Case |
|---|---|
| 1:1 (square, square_hd) | Social media posts, product shots |
| 4:3 / 3:4 (landscape_4_3, portrait_4_3) | Magazines, presentations, general-purpose |
| 16:9 / 9:16 (landscape_16_9, portrait_16_9) | Cinematic scenes, mobile content, stories |

## Common Mistakes to Avoid

- **Contradictory descriptors**: "Bright sunny day with moody dramatic shadows" confuses the model
- **Burying critical info**: Place primary requirements at the start, not the end
- **Vague aesthetics**: "Make it look good" provides no direction -- specify the photographic style
- **Keyword stacking**: Tag-heavy prompts from Stable Diffusion workflows do not transfer well
- **Negative instructions**: "No people in the background" does not work -- describe an empty background instead

## Example Prompts

### Product Photography
> Frosted glass perfume bottle on polished marble surface, single orchid petal beside it, soft directional studio lighting from upper left, neutral gradient background fading to charcoal, shot on Hasselblad X2D with 80mm lens at f/4, editorial beauty photography aesthetic.

### Brand-Consistent Design
> Product photography of a modern running shoe, primary body in color #FF6B35 vibrant orange, accent details in #004E89 deep blue, clean white cyclorama background, overhead softbox lighting with subtle shadow, 45-degree angle view showing sole profile.

### Typography Poster
> Music festival poster titled "SIGNAL FEST" in bold condensed sans-serif at top, abstract waveform visualization in neon cyan and magenta across center, "AUGUST 15-17" in clean small caps below, "BROOKLYN WATERFRONT" in thin serif at bottom, dark navy background with subtle grain texture.

### Cinematic Scene
> A lone astronaut standing on a rust-red Martian ridge at golden hour, Earth visible as a pale blue dot in the amber sky, dust particles catching the low sunlight, shot on ARRI Alexa with anamorphic 40mm lens, wide cinematic composition, atmospheric haze in the valley below.

## When to Use FLUX.2 Pro vs Other Models

- **Use FLUX.2 Pro** when you need: photorealism, brand-accurate colors via HEX codes, text in images, multi-reference compositing, or consistent professional quality without parameter tuning
- **Use Nano Banana 2 instead** when you need: complex multi-language text rendering, infographics, UI mockups, or maximum text accuracy with Gemini-level reasoning
- **Use FLUX Schnell instead** when you need: the fastest possible generation and quality is secondary
- **Use Nano Banana Pro instead** when you need: the highest-fidelity output from the Gemini family with stronger compositional reasoning
