# Kling v3 Pro

**Text-to-Video Model ID:** `fal-ai/kling-video/v3/pro/text-to-video`
**Image-to-Video Model ID:** `fal-ai/kling-video/v3/pro/image-to-video`

Kling's v3 Pro model (launched February 2026). Cinematic video generation with native multi-shot sequencing, dialogue with lip-sync, and up to 15-second narrative clips. Think of it as a virtual Director of Photography -- it understands cinematic language, physics, and audio direction natively.

## Key Strengths

- **Multi-shot narrative** -- up to 6 distinct shots in a single generation, with automatic scene transitions
- **Native audio and dialogue** -- lip-synced speech with per-character voice/tone control (Chinese and English)
- **15-second continuous output** -- long enough for full narrative arcs without stitching
- **Physics-aware motion** -- gravity, inertia, cloth/hair dynamics, realistic weight transfer
- **Character consistency** -- Elements 3.0 locks character traits via reference images across shots
- **Text stability in motion** -- can keep on-screen text legible during camera movement when prompted correctly
- **Image-to-video with start/end frames** -- animate between two keyframe images

## Supports Image Input

Yes -- use `fal-ai/kling-video/v3/pro/image-to-video`. Pass `start_image_url` to animate from a reference image. Optionally pass `end_image_url` to define the final frame, creating controlled A-to-B transitions.

Treat the input image as an anchor. Focus the prompt on how the scene evolves from that image: subtle movements, camera motion, or environmental changes. The model preserves text, signage, and visual details from the original image.

## Prompting Strategy

### Think Like a Director, Not a Photographer

Kling v3 Pro understands cinematic intent. Write prompts as scene direction, not visual descriptions. Describe how things **move**, not just how they look.

**Do this:**
> Handheld shoulder-cam drifts behind the subject with subtle sway as she walks through a rain-soaked alley at twilight. Each step lands heel-first with visible weight transfer. Flickering neon signs cast magenta and cyan reflections on wet asphalt.

**Not this:**
> A woman walking in a rainy alley, cinematic lighting, neon signs, realistic, 8k, masterpiece

### Prompt Structure (Recommended Order)

1. **Camera movement** -- how the camera behaves (tracking, dolly, FPV drone, handheld)
2. **Subject and action physics** -- who/what, with precise motion mechanics
3. **Environment and lighting** -- setting with specific light sources and atmosphere
4. **Texture and details** -- physical materials, film grain, condensation, fabric creases
5. **Audio and emotion** -- dialogue, ambient sound, music, mood

### Camera Movement Commands

The model responds to cinematic camera language:

| Command | Effect |
|---|---|
| Tracking shot | Camera follows subject movement laterally |
| Dolly push-in / pull-out | Camera physically moves toward or away from subject |
| Handheld shoulder-cam with subtle sway | Naturalistic, slightly unstable handheld feel |
| FPV drone shot | First-person aerial perspective with rolls and whips |
| Crane shot | Swooping vertical movement for grandeur and scale |
| Arc motion / orbit | Camera circles around the subject |
| Macro dolly-in | Slow close-up push-in on small details |
| Low-angle tracking shot | Ground-level dramatic perspective |
| Over-the-shoulder shot | Character framing from behind |
| Wide establishing shot | Scene-setting perspective |
| Shot-reverse-shot | Alternating between two characters in dialogue |

### Multi-Shot Generation

Use `multi_prompt` (passed via extras) to divide the video into sequential shots. Each element specifies a prompt and duration for that shot segment. Alternatively, label shots explicitly in a single prompt:

> Shot 1: Wide establishing shot of a desolate Mars colony greenhouse during a red dust storm. Shot 2: Cut to a macro close-up of a small green sprout. A botanist's gloved hand gently touches the leaf. Shot 3: Over-the-shoulder shot. The botanist stands up, looking out the reinforced glass window at the storm. Audio: Low hum of life-support systems, muffled howling wind outside. Cold blue interior lighting.

Set `shot_type` to `"customize"` (default) for explicit shot control, or `"intelligent"` to let the model decide transitions automatically.

### Native Audio and Dialogue

Audio is enabled by default (`generate_audio: true`). For dialogue scenes:

- Use structured character labels: `[Character A: Older CEO, deep gravelly authoritative voice]: "We are not selling the company."`
- Bind dialogue to physical actions: `[Character B: Young Rival, sharp fast-paced angry tone] stands up abruptly and points: "Then you are sinking this ship!"`
- Use temporal linking words ("Immediately," "Then," "After a pause") to control pacing
- For English speech, use lowercase; for acronyms or proper nouns, use uppercase
- Other languages are automatically translated to English for audio output

### Element References (Image-to-Video)

For character/object consistency, pass `elements` in extras with frontal + reference images. Reference them in the prompt as `@Element1`, `@Element2`, etc. This locks in character appearance across shots.

### Text in Video

To keep on-screen text stable during motion:
> Slowly rotating perfume bottle with clearly embossed label reading "ETTREAL" in elegant gold serif. The text "ETTREAL" remains perfectly stable and readable throughout the motion.

Explicitly request that text stays "stable and readable throughout the motion" to prevent morphing.

## Fixing Common Artifacts

| Problem | Fix |
|---|---|
| Floating/sliding feet | Specify ground contact: "Each step lands heel-first, rolling forward with visible weight transfer" |
| Morphing hands/fingers | Anchor hands to objects: "Her fingers firmly grip the edge of the ceramic coffee cup" |
| Plastic/over-smoothed skin | Add physical texture cues: "film grain, skin pores, visible breath in cold air, fabric creases" |
| Text morphing during motion | Repeat the text and add "remains stable and readable throughout" |
| Generic smiling faces | Add to negative prompt: "smiling, cartoonish, 3D render, smooth plastic skin" |

## Negative Prompt Tips

Default: `"blur, distort, and low quality"`

For more control, try: `"smiling, cartoonish, 3D render, smooth plastic skin, floating limbs, sliding feet, text morphing"`

## Parameters

### Text-to-Video

| Parameter | Type | Values | Default | Notes |
|---|---|---|---|---|
| **prompt** | string | -- | required | Use natural cinematic language. Either prompt or multi_prompt, not both |
| **duration** | enum | 3-15 seconds | "5" | Longer durations benefit from multi-shot or detailed temporal descriptions |
| **aspect_ratio** | enum | 16:9, 9:16, 1:1 | "16:9" | 9:16 for vertical/mobile, 1:1 for social |
| **negative_prompt** | string | -- | "blur, distort, and low quality" | Add artifact-specific terms as needed |
| **cfg_scale** | float | 0-1 | 0.5 | Higher = stricter prompt adherence. Keep at 0.5 for balanced results |
| **generate_audio** | boolean | true/false | true | Native audio with lip-sync support |
| **shot_type** | enum | customize, intelligent | "customize" | "intelligent" lets model auto-sequence shots |
| **multi_prompt** | array | objects with prompt + duration | -- | Pass via extras. Up to 6 shots in a single generation |

### Image-to-Video (additional parameters)

| Parameter | Type | Default | Notes |
|---|---|---|---|
| **start_image_url** | string | required | URL of the starting frame image |
| **end_image_url** | string | -- | Optional ending frame for A-to-B transitions |
| **elements** | array | -- | Character/object reference images for consistency. Use @Element1 in prompt |

Note: Image-to-video does not have an `aspect_ratio` parameter -- it inherits from the input image.

## Example Prompts

### Realistic Human Motion
> Low-angle tracking shot at street level. A woman in a beige trench coat walks through a rainy city street at twilight. Steady pace. Arms swing naturally at her sides. Each step lands heel-first, then rolls forward with visible weight transfer. The pavement is wet, reflecting blurred neon streetlights. Shot on 35mm film, shallow depth of field, realistic cinematic movement.

### High-Speed Action
> Dynamic FPV drone shot chasing a matte black futuristic motorcycle through a Tokyo highway tunnel at night. The camera whips and rolls 360 degrees as it follows the bike. The bike leans dangerously low into a curve, sparks flying brightly from the footpegs grazing the asphalt. High contrast, motion blur on the background, rider remains in sharp focus.

### Dialogue Scene
> A tense corporate boardroom. Alternating medium shots focusing on the speakers. [Character A: Older CEO, deep gravelly authoritative voice]: "We are not selling the company. Not today, not ever." Immediately, [Character B: Young Rival, sharp fast-paced angry tone] stands up abruptly and points: "Then you are sinking this ship with everyone on board!"

### Product Video with Text
> Slow macro dolly-in shot of a luxury crystal perfume bottle on a velvet pedestal. Clearly embossed on the glass label is the word "ETTREAL" in an elegant gold serif font. Soft golden hour lighting creates refractive caustics on the velvet. The bottle slowly rotates 45 degrees, ensuring the text "ETTREAL" remains perfectly stable and readable throughout the motion.

### Multi-Shot Narrative (15s)
> Shot 1: Wide establishing shot of a desolate Mars colony greenhouse during a red dust storm. Shot 2: Cut to a macro close-up of a small green sprout. A botanist's gloved hand gently touches the leaf. Shot 3: Over-the-shoulder shot. The botanist stands up, looking out the reinforced glass window at the storm. Audio: Low hum of life-support systems, muffled howling wind outside. Cold blue interior lighting.

## When to Use Kling v3 Pro

- **Use Kling v3 Pro** when you need: cinematic multi-shot narratives, dialogue with lip-sync, product videos with stable text, scenes requiring precise camera choreography, or 10-15 second continuous clips
- **Use Kling v3 Pro over simpler models** when: the brief calls for multiple camera angles, character dialogue, native audio, or physics-heavy motion (action, sports, dance)
- **Consider other models** when: you need pure abstract/artistic motion (try Wan/Hunyuan), maximum speed at low cost for simple clips, or photorealistic stills animated with minimal motion (lighter models may suffice)
