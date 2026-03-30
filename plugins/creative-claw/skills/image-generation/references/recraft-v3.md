# Recraft V3

**Model ID:** `fal-ai/recraft/v3/text-to-image`

Recraft V3 is a design-first image generation model that ranked #1 on Hugging Face's Text-to-Image Leaderboard (ELO 1172). Unlike photorealism-focused competitors, it excels at graphic design, illustration, and vector work. It produces clean, intentional outputs ideal for branding, UI assets, icons, posters, and styled artwork. It also has strong text rendering capabilities, supporting long text passages with precise positioning.

## Key Strengths and Differentiators

- **#1 benchmark performance** on Hugging Face Text-to-Image Leaderboard
- **Design-first philosophy** -- optimized for graphic, illustration, and vector output rather than photorealism
- **Best-in-class vector generation** -- produces clean vector illustrations, icons, logos, and line art
- **Advanced text integration** -- generates legible, aesthetically integrated text in images (supports long text, not just one or two words)
- **Style consistency** -- 70+ professional styles across realistic, illustration, and vector categories enable batch design with visual uniformity
- **Color palette control** -- accepts explicit RGB color arrays to enforce brand colors
- **Custom style references** -- supports style_id for referencing previously created custom styles

## Prompting Strategy

### Recommended Prompt Structure

Follow this order for best results:

> A **<image style>** of **<main content>**. **<detailed description>**. **<background description>**. **<style description>**.

Elements to specify:
1. **Subject** -- person, animal, object, character, or scene
2. **Medium** -- illustration, vector, photo, painting, doodle
3. **Environment** -- indoors, outdoors, urban, nature, abstract
4. **Lighting** -- soft, ambient, neon, studio, overcast, hard flash
5. **Color** -- vibrant, muted, pastel, monochromatic, specific palette
6. **Mood** -- calm, energetic, dramatic, nostalgic, playful
7. **Composition** -- portrait, closeup, bird's-eye, wide shot, isometric

### Prompting Best Practices

- **Be specific and descriptive** -- write clear sentences, not vague keyword lists
- **Use synonyms for ambiguous words** -- "flying bat in night sky" not just "bat" (could be baseball bat)
- **Use specific quantities** -- "three cats" rather than "cats"
- **Never say what you DON'T want** -- omit unwanted elements instead of saying "no cake" or "without text"
- **Progress broad to specific** -- establish the scene, then add details
- **Keep vector prompts concise** -- too many tiny details can break the clean vector look
- **Lower Artistic level if adherence is poor** -- reduces creative variance, improves prompt following
- **Switch to a general style if struggling** -- if a niche substyle misinterprets your prompt, try the base `realistic_image`, `digital_illustration`, or `vector_illustration` style

### Text in Images

Recraft V3 is one of the few models that can generate images with long, legible text (not just one or two words). For best results:

- Describe text content, font style, and placement in the prompt
- For rigid logo text, use a negative prompt to "avoid text in prompt" for more dynamic layouts
- Minor spelling errors may occur -- verify rendered text

## Parameters

| Parameter | Type | Values | Notes |
|---|---|---|---|
| **prompt** | string | 1-1,000 chars (fal.ai) / up to 4,000 chars | Required |
| **image_size** | string or object | `square_hd` (default), `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`, `landscape_16_9` | Or custom `{width, height}` in 64-1536px range, multiples of 32 |
| **style** | string | `realistic_image` (default), `digital_illustration`, `vector_illustration`, `any` | See substyles below. Vector images cost 2x |
| **substyle** | string | See tables below | Append to style as `style/substyle` |
| **colors** | array | `[{r, g, b}, ...]` with values 0-255 | Enforce specific color palette |
| **style_id** | string (UUID4) | Custom style reference | Reference a previously created custom style |
| **enable_safety_checker** | boolean | `true` / `false` (default) | Content safety filtering |

### Realistic Image Substyles

| Substyle | Description |
|---|---|
| `b_and_w` | Black and white photography |
| `enterprise` | Corporate, professional look |
| `evening_light` | Warm evening/golden hour lighting |
| `faded_nostalgia` | Faded, nostalgic film tones |
| `forest_life` | Natural forest settings |
| `hard_flash` | Direct flash photography |
| `hdr` | High dynamic range |
| `motion_blur` | Motion blur effect |
| `mystic_naturalism` | Mystical natural scenes |
| `natural_light` | Natural daylight |
| `natural_tones` | Earthy, natural color palette |
| `organic_calm` | Film-inspired, soft lighting, faded colors -- good for blogs and social media |
| `real_life_glow` | Warm, glowing real-life feel |
| `retro_realism` | Retro photographic style |
| `retro_snapshot` | Vintage aesthetic with bold flash, nostalgic charm -- good for editorial |
| `studio_portrait` | Professional studio portrait |
| `urban_drama` | Dramatic urban scenes |
| `village_realism` | Rural, village settings |
| `warm_folk` | Warm folk-inspired tones |

### Digital Illustration Substyles (via fal.ai API)

| Substyle | Description |
|---|---|
| `2d_art_poster` | Bold 2D poster art |
| `2d_art_poster_2` | Alternative 2D poster style |
| `engraving_color` | Colored engraving style |
| `grain` | Textured grain illustration |
| `hand_drawn` | Hand-drawn sketch look |
| `hand_drawn_outline` | Hand-drawn with outline emphasis |
| `handmade_3d` | Handmade 3D-style illustration |
| `infantile_sketch` | Childlike sketch style |
| `pixel_art` | Pixel art |

Additional substyles available on recraft.ai platform: Bold Sketch, Pencil sketch, Retro Pop, Clay, Risograph, Cover, Crosshatch, Digital engraving, Expressionism, Freehand details, Grain 2.0, Graphic intensity, Hard Comics, Long shadow, Modern Folk, Multicolor, Neon Calm, Noir, Nostalgic pastel, Outline details, Pastel gradient, Pastel sketch, Pop art, Pop renaissance, Street art, Tablet sketch, Urban Glow, Urban sketching, Young adult book, Young adult book 2, Seamless Digital, and more.

### Vector Illustration Substyles (via fal.ai API)

| Substyle | Description |
|---|---|
| `engraving` | Engraved vector style |
| `line_art` | Clean line art |
| `line_circuit` | Circuit-board inspired line art |
| `linocut` | Linocut print style |

Additional substyles on recraft.ai platform: Bold stroke, Chemistry, Colored stencil, Cosmics, Cutout, Depressive, Editorial, Emotional flat, Marker outline, Mosaic, Naivector, Roundish flat, Segmented Colors, Sharp contrast, Thin, Vector Photo, Vivid shapes, Seamless Vector, and more.

## Example Prompts

### Corporate Vector Illustration
> A polished corporate-style vector illustration depicting a diverse team collaborating around a glass table. Flat design principles with consistent stroke weights, professional color palette of navy blue and warm coral, clean white background.

*Style: `vector_illustration`*

### Product Photography
> A realistic product photo of a matte black coffee tumbler on a dark slate surface. Single green leaf beside it, soft studio lighting from the left, shallow depth of field, clean enterprise aesthetic.

*Style: `realistic_image/enterprise`*

### Vintage Poster Design
> A digital illustration poster for a jazz festival. Bold typography reading "BLUE NOTE SESSIONS" at the top in condensed serif, saxophone player silhouetted in amber spotlight, art deco geometric borders, deep navy and gold palette, grain texture overlay.

*Style: `digital_illustration/grain`*

### Icon Set
> A unified line icon set with consistent 2px stroke weight, uniform corner radii, grid-aligned geometry. Icons for: home, search, settings, user profile, notifications. Minimal detail, monochrome black on white.

*Style: `vector_illustration/line_art`*

### Brand Logo
> A minimal abstract logo using geometric reduction, strong negative space, symmetrical balance. Modern sans-serif lettermark for the letter "K". Gradient from teal to deep blue, clean vector edges.

*Style: `vector_illustration`*
*Colors: `[{r: 0, g: 180, b: 180}, {r: 0, g: 50, b: 130}]`*

### Nostalgic Social Media Image
> A warm photograph of a small bookshop interior, afternoon sunlight streaming through dusty windows, vintage wooden shelves overflowing with books, a cat sleeping on a reading chair. Soft faded tones, film grain aesthetic.

*Style: `realistic_image/organic_calm`*

## When to Use Recraft V3 vs Other Models

- **Use Recraft V3** when you need: vector illustrations, icons, logos, branded design assets, stylized illustrations, text-heavy designs (posters, banners), batch designs with consistent style, or graphic design elements
- **Use FLUX models instead** when you need: pure photorealism, fastest generation speed (FLUX Schnell), or LoRA-based fine-tuning
- **Use Nano Banana 2 instead** when you need: multilingual text rendering, complex multi-element infographics, fast cheap iteration, or natural-language editing without masks
- **Avoid Recraft V3** for: highly abstract/surreal concepts, photorealistic portraits where realism is paramount, or when you need more than 1 image per API call

## Tips and Troubleshooting

- **Distorted small details (faces, hands):** Apply Creative Upscale to improve fidelity
- **Elements bleeding to image edges:** Use outpainting to expand the composition
- **Complex surface mockups:** Use "Convert to mockup" for design placement on 3D surfaces
- **Flat surface placement:** Use prompt-based editing for fixed designs (phone screens, banners)
- **Vector images cost 2x** compared to raster styles -- factor this into budget
- **Only 1 image per API call** -- unlike some models, batch generation is not supported via fal.ai
