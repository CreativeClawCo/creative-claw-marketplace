# Nano Banana Pro (Gemini 3 Pro Image)

**Model ID:** `fal-ai/nano-banana-pro`
**Edit Model ID:** `fal-ai/nano-banana-pro/edit`

Google's Gemini 3 Pro image generation model, released November 2025. The highest-quality model in the Gemini family, built for complex reasoning and high-fidelity output. Uses a "Thinking" process that reasons through prompts before generating, producing intermediate thought images (not charged) before the final output. All outputs embed Google's imperceptible SynthID digital watermark.

## Prompting Strategy

### Use Natural Language, Not Tags

Like Nano Banana 2, this model uses multimodal reasoning (not diffusion). Write prompts as natural sentences, not comma-separated keyword lists.

**Do this:**
> A crystalline chess set where the pieces are made of freezing water and the board is lava, dramatic side lighting catching ice refractions against molten glow, close-up macro perspective, dark fantasy aesthetic.

**Not this:**
> crystal chess, ice pieces, lava board, dramatic lighting, fantasy, masterpiece, best quality, 8k, trending on artstation

- Avoid quality boosters like "masterpiece, best quality" -- they have no effect
- Skip weighted token syntax like `(subject:1.5)` -- the model ignores it
- 1-3 sentences is optimal for general images; longer prompts are fine for text-heavy or complex designs
- Provide context about intended use (e.g. "for a Brazilian high-end cookbook") to trigger appropriate styling decisions automatically

### Prompt Structure (Recommended Order)

**[Subject + Adjectives] doing [Action] in [Location/Context]. [Composition/Camera Angle]. [Lighting/Atmosphere]. [Style/Media]. [Specific Constraint/Text].**

1. **Subject** -- who or what is in the scene
2. **Composition** -- framing, camera angle, perspective
3. **Action** -- what's happening in the scene
4. **Location** -- setting and environment
5. **Style** -- artistic direction, mood, color palette

### Photographic Language

Camera terms map directly to visual treatments:
- "wide-angle shot" -> expansive perspective
- "85mm portrait lens" -> flattering compression, bokeh
- "shallow depth of field" -> blurred background
- "bird's eye view" -> top-down perspective
- "low-angle shot" -> dramatic, imposing

### Lighting and Camera Control

Use photographer's language for precise control:
- Specify lighting: "soft diffused window light", "dramatic rim lighting", "golden hour backlight", "three-point softbox setup"
- Specify lens: "shot on 85mm f/1.4", "macro lens close-up", "wide-angle 24mm"
- Specify mood: "high-key ethereal", "low-key moody", "studio lit on white seamless"

## Text Rendering

Nano Banana Pro renders text character-by-character with high accuracy, including long sentences and complex logos.

### Critical Rule: Wrap Text in Double Quotes

Always put text you want rendered in `"double quotes"` with individual style specifications:

> Create a minimalist movie poster for a thriller titled "THE SILENT ECHO" in large distressed sans-serif font at the top, shadowy figure standing in a rain-soaked alley, "COMING DECEMBER 2026" in small caps below, "FROM THE DIRECTOR OF NIGHTFALL" in thin serif at bottom, muted teal and black palette.

### Text Best Practices

- Keep text elements to **3-5 per image**
- Use **larger text** whenever possible -- small text at 1K resolution often blurs
- Stick to **short phrases** rather than full paragraphs
- Specify font style for each text element individually (e.g. "bold red serif", "thin sans-serif")
- Supports **multilingual rendering** (Japanese, Arabic, Chinese, Korean, etc.)
- For pixel-perfect accuracy on product labels or legal copy, generate the background with Nano Banana Pro and overlay text programmatically

## Parameters

| Parameter | Values | Notes |
|---|---|---|
| **Prompt** | string (max 50,000 chars) | Required. Natural language description |
| **Aspect Ratio** | auto, 21:9, 16:9, 3:2, 4:3, 5:4, 1:1, 4:5, 3:4, 2:3, 9:16 | Default: 1:1. "auto" analyzes prompt to pick optimal ratio |
| **Resolution** | 1K ($0.15), 2K ($0.15), 4K ($0.30) | Default: 1K. 4K charged at double rate |
| **Output Format** | PNG (default, lossless), JPEG, WebP | |
| **Batch Size** | 1-4 images per call | Default: 1. Each image priced separately |
| **Safety Tolerance** | 1-6 | Default: 4. 1 = strictest. Increase if creative prompts get blocked |
| **Web Search** | enable_web_search | Adds $0.015/gen. Use for real-world subjects and data visualizations only |
| **Seed** | any integer | For reproducible generations |
| **Sync Mode** | true/false | Default: false. Returns data URI if true |

## Advanced Capabilities

### Thinking / Reasoning Mode

Nano Banana Pro generates intermediate "thought images" (not charged) before producing the final output. This lets it reason through complex compositions, fix logic errors, and handle multi-step instructions that would trip up simpler models.

### Google Search Grounding

Enable `enable_web_search` to let the model verify facts via Google Search before generating. Useful for:
- Data visualizations and infographics with real-world data
- Current events or timely subjects
- Diagrams that need factual accuracy

Skip for fictional or purely creative content -- it adds $0.015/generation and can slow output.

**Limitation:** Real-time data visualizations sometimes mix information together. Always verify factual outputs independently.

### Character Consistency (Multi-Shot)

Upload 3-5 reference images to maintain character or brand consistency:
- Supports up to **6 high-fidelity object images** and **5 human images** per generation
- Explicitly state: "Keep the person's facial features exactly the same as Image 1"
- Maintain identity while varying expressions, angles, and distances

### Dimensional Translation (2D to 3D)

- Convert floor plans to interior renders
- Transform sketches and doodles into polished assets
- Upload wireframes or grids to force specific compositions

### Structural Control

Upload sketches, wireframes, or grids to control layout and composition. Perfect for UI mockups and grid-based designs.

## Editing Workflow

The edit model (`fal-ai/nano-banana-pro/edit`) requires no masking. Describe edits in plain English.

- **Background change:** "Change the background to a sunset beach. Keep the person exactly as they are."
- **Object removal:** "Remove the car from the left side and fill in naturally with the surrounding grass."
- **Style swap:** "Convert this photo to a watercolor painting style while keeping all subjects intact."
- **Text editing:** "Change the headline text to read 'SUMMER SALE' in the same font style."
- **Multi-image compositing:** Upload multiple source images and describe which elements from each to combine.

### Editing Tips

- **Edit, don't re-roll** -- make conversational adjustments rather than regenerating from scratch
- State both what to change AND what to preserve
- Use high-quality, clear source images
- Assign distinct descriptions to each reference image
- Make one change per prompt for complex scenes
- Accepts up to **14 reference images** in a single edit

### Conversational Workflow

Rather than crafting one perfect prompt, start with an 80% correct output, then iterate:
1. Generate initial image
2. "Change the lighting to sunset and make the text neon blue"
3. "Move the subject slightly to the left and add fog"

## Example Prompts

### Product Photography
> A frosted glass bottle on a slate surface, single dried chili beside it, late afternoon raking light from the right, soft neutral background fading to charcoal, editorial food photography aesthetic, shot on 85mm f/1.4.

### Typography Poster
> Create a minimalist movie poster for a thriller titled "THE SILENT ECHO" in large distressed sans-serif font at the top, shadowy figure standing in a rain-soaked alley, "COMING DECEMBER 2026" in small caps below, "FROM THE DIRECTOR OF NIGHTFALL" in thin serif at bottom, muted teal and black palette.

### Fact-Grounded Infographic (with web search)
> Generate a step-by-step infographic showing how to make Elaichi Chai. Use accurate ingredients and measurements, illustrated in a warm hand-drawn style with kraft paper texture background, each step numbered with "STEP 1" through "STEP 5" in clean sans-serif.

### Brand Consistency (Multi-Shot)
> Using the attached reference images of "Sneaker X", generate a lifestyle photography shot of the shoe on a rain-wet city sidewalk at dusk, maintaining exact logo placement and colorway from the references, dramatic reflection in puddle, urban streetwear aesthetic.

### Localized Campaign
> A bustling street market scene in Tokyo. Generate a billboard in the background saying "Fresh Start" in Japanese Kanji. Cyberpunk aesthetic, volumetric fog, neon reflections on wet pavement, wide-angle lens.

### Bilingual Content
> Tea house loyalty card with "TENTH CUP FREE" in clean bold English at top, Chinese equivalent in brush-style below, ten circle stamps with three filled, minimalist sage green and cream scheme, small teapot icon.

### Complex Reasoning Scene
> A crystalline chess set where the pieces are made of freezing water and the board is lava. Reason through the lighting interactions -- ice refractions catching the molten orange glow, steam rising where ice meets heat, dramatic chiaroscuro, dark fantasy aesthetic.

### Storyboard Frame
> Frame 3 of 6: the detective pushes open the warehouse door, flashlight beam cutting through dust motes, same trench coat and fedora as previous frames, noir cinematography, high contrast black and white, Dutch angle.

## When to Use Nano Banana Pro vs Other Models

- **Use Nano Banana Pro** when you need: highest fidelity, complex reasoning about spatial relationships, text-heavy designs, data visualizations with search grounding, multi-image compositing with many references, or thinking through complex compositions
- **Use Nano Banana 2 instead** when you need: faster generation, lower cost ($0.08 vs $0.15 per 1K image), rapid iteration, or the task is straightforward
- **Use FLUX models instead** when you need: pure photorealism without text, or the fastest possible generation (FLUX Schnell)
