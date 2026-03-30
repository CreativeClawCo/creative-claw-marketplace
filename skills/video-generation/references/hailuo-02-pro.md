# MiniMax Hailuo-02 Pro

**Text-to-Video Model ID:** `fal-ai/minimax/hailuo-02/pro/text-to-video`
**Image-to-Video Model ID:** `fal-ai/minimax/hailuo-02/pro/image-to-video`

MiniMax's flagship video generation model. Built on a Noise-aware Compute Redistribution (NCR) framework with 3x more parameters and 4x more training data than its predecessor. Scores 92.1 overall and 94/100 on physics on the Artificial Analysis benchmark, making it one of the most physically accurate AI video models available.

## Key Strengths

- **Best-in-class physics simulation** — three specialized physics engines (rigid body, cloth dynamics, fluid simulation) trained on 120k+ labeled clips
- **Director-level camera control** — bracketed camera instructions parsed by a domain-finetuned language model into learned motion vectors
- **Native 1080p resolution** at 24-30 FPS
- **End-frame conditioning** (image-to-video) — specify both start and end frames for precise motion control
- **Strong cost-to-quality ratio** — $0.08/second (~$0.48 for a 6s clip), competitive with top-tier models

## Supports Image Input

Yes — use `fal-ai/minimax/hailuo-02/pro/image-to-video`. Pass `image_url` to animate a reference image. Optionally pass `end_image_url` to define the final frame, giving precise control over the motion arc.

## Physics Simulation

Hailuo-02 Pro's headline differentiator. Three specialized physics critics evaluate and guide generation:

| Physics Engine | Method | Strength |
|---|---|---|
| **Rigid Body** | PyBullet integration | Gravity, collisions, bouncing, falling objects |
| **Cloth Dynamics** | Custom soft-body solver | Fabric folds, draping, fashion/textile movement |
| **Fluid Simulation** | Lattice-Boltzmann method | Water splashes, pouring liquids, rain, fog |

Materials deform and react according to type — fabric folds realistically, hair flows with inertia, particles follow physically correct trajectories derived from image lighting and spatial geometry.

## Prompting Strategy

### Prompt Structure

Follow this formula for best results:

**[Camera Shot + Motion] + [Subject + Description] + [Action] + [Scene + Description] + [Lighting] + [Style/Mood]**

### Use Natural Cinematic Language

Write prompts as clear, descriptive sentences. Be specific about actions and break complex motions into short, direct steps.

**Do this:**
> A frosted glass bottle tips over on a marble countertop, amber liquid pouring out in slow motion, camera dollies in from a low angle, warm golden hour light streaming through a window, editorial product photography aesthetic.

**Not this:**
> bottle falling, liquid pouring, cinematic, 8k, masterpiece

### Keep It Modular

Avoid excessive storytelling in one sentence. Break complex scenes into clear components:
- One subject with specific physical details
- One primary action described step-by-step
- One camera movement instruction
- Scene and lighting context

1-3 sentences is the sweet spot. Maximum prompt length is 1500 characters.

### Camera Controls

Use bracketed instructions for precise camera movement. Up to 3 combined movements per prompt.

**Movement controls:**
- `[Truck left]` / `[Truck right]` — lateral camera slide
- `[Pan left]` / `[Pan right]` — horizontal rotation
- `[Push in]` / `[Pull out]` — move toward/away from subject
- `[Pedestal up]` / `[Pedestal down]` — vertical camera rise/lower
- `[Tilt up]` / `[Tilt down]` — vertical rotation
- `[Zoom in]` / `[Zoom out]` — focal length change
- `[Shake]` — handheld shake effect
- `[Tracking shot]` — follow a moving subject
- `[Static shot]` — locked camera, no movement

**Advanced cinematic terms** also work naturally in the prompt text (not bracketed):
- Orbit (180/360), dolly-zoom, steadicam
- Low-angle, high-angle, bird's eye view, Dutch angle
- Rack focus, match cut, crane shot, POV
- "Camera tracks behind," "camera pulls back to reveal"

**Example with combined controls:**
> [Truck left, Tilt up, Zoom in] A dancer in a red silk dress spins on a rain-soaked rooftop at night, city lights blurred in the background, dramatic spotlight from above.

### Prompt Optimizer

The `prompt_optimizer` parameter (default: `true`) automatically enhances your prompt for better results. Leave it on for general use. Turn it off (`false`) when you want exact control over every word, or when your prompt is already highly refined.

## Parameters

### Text-to-Video (`fal-ai/minimax/hailuo-02/pro/text-to-video`)

| Parameter | Type | Required | Default | Notes |
|---|---|---|---|---|
| **prompt** | string | Yes | — | Max 1500 characters. Supports `[camera]` bracket syntax |
| **prompt_optimizer** | boolean | No | true | Auto-enhances prompt for better output |

### Image-to-Video (`fal-ai/minimax/hailuo-02/pro/image-to-video`)

| Parameter | Type | Required | Default | Notes |
|---|---|---|---|---|
| **prompt** | string | Yes | — | Describe the desired motion/action |
| **image_url** | string | Yes | — | Starting frame image URL |
| **prompt_optimizer** | boolean | No | true | Auto-enhances prompt |
| **end_image_url** | string | No | — | Final frame image URL for motion arc control |

### Output Specs

- **Resolution:** 1080p (1920x1080)
- **Frame rate:** 24-30 FPS
- **Duration:** Up to 6 seconds at 1080p, up to 10 seconds at 768p
- **Cost:** $0.08 per second of generated video

## Example Prompts

### Physics — Liquid Pour
> [Push in] A barista pours steamed milk into a ceramic latte cup, milk swirling into a rosetta pattern on the coffee surface, close-up shot, soft diffused cafe lighting, warm earth tones.

### Physics — Fabric and Wind
> [Static shot] A woman in a flowing white linen dress stands on a clifftop overlooking the ocean, wind catching the fabric and her hair, golden hour backlighting, cinematic wide shot.

### Product Showcase
> [Truck right, Zoom in] A sleek midnight-blue electric scooter on a rain-slicked neon-lit street, water droplets on the chrome handlebars catching reflections, slow cinematic dolly, cyberpunk atmosphere.

### Atmospheric Scene
> [Pan left] An abandoned futuristic gas station at sunset, flickering neon signs reflecting in rain puddles, light fog rolling across cracked asphalt, camera pans slowly revealing the full scene, post-apocalyptic mood.

### Dynamic Action
> [Tracking shot] A cat leaps from a bookshelf, slow-motion mid-air with fur rippling, lands on a cushion that compresses realistically, orbit camera following the arc, soft natural window light.

### Image-to-Video with End Frame
Use `image_url` for the starting composition and `end_image_url` for the final frame. The model interpolates natural motion between them — ideal for product reveals, transformations, and before/after sequences.

## When to Use Hailuo-02 Pro vs Other Models

- **Use Hailuo-02 Pro** when you need: realistic physics (pouring liquids, fabric draping, particle effects, collisions), precise camera direction with bracketed controls, product videos with physical interactions, or scenes where material behavior matters
- **Use Kling v3 Pro instead** when you need: multi-shot scene transitions within a single clip, or native audio generation
- **Use Veo 3.1 instead** when you need: the highest possible visual fidelity, longer clips, or Google ecosystem integration
- **Use Hailuo 2.3 Fast instead** when you need: faster generation at lower cost with good-enough quality, anime/illustration styles, or budget-conscious batch generation
