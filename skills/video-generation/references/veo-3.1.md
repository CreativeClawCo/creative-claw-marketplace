# Veo 3.1 (Google)

**Text-to-Video Model ID:** `fal-ai/veo3.1`
**Fast variant:** `fal-ai/veo3.1/fast`
**Image-to-Video Model ID:** `fal-ai/veo3.1/image-to-video`
**Fast I2V variant:** `fal-ai/veo3.1/fast/image-to-video`

Google's best video generation model. Up to 4K resolution at 24 FPS with native synchronized audio including dialogue, sound effects, and ambient sound -- all generated directly from the prompt.

## Key Strengths

- Best overall video quality available
- Up to 4K resolution, 24 FPS
- Native audio generation -- dialogue, sound effects, ambient sound, all synchronized to visuals
- Strong prompt adherence and narrative coherence
- Excellent motion, physics, and character consistency
- Understands professional cinematography language (dolly, crane, rack focus, etc.)

## Fast vs Standard Variants

**Use the fast variant (`/fast`) by default.** It delivers comparable quality at roughly half the cost and faster generation. Reserve the standard variant for final hero shots or when you need maximum fidelity.

| | Standard | Fast |
|---|---|---|
| Audio on | $0.40/sec | $0.15/sec |
| Audio off | $0.20/sec | $0.10/sec |
| 4K + audio | $0.60/sec | $0.35/sec |
| 4K no audio | $0.40/sec | $0.30/sec |

**Cost tip:** Disable audio (`generate_audio: false`) when you plan to add a custom soundtrack in post-production -- it cuts cost by 33-50%.

## Parameters

| Parameter | Values | Default | Notes |
|---|---|---|---|
| **prompt** | string (max 20,000 chars) | required | Describe visuals, action, audio, dialogue |
| **aspect_ratio** | 16:9, 9:16 | 16:9 | I2V also supports "auto" |
| **duration** | 4s, 6s, 8s | 8s | Keep clips short and focused |
| **resolution** | 720p, 1080p, 4k | 720p | Use 720p for iteration, 1080p+ for finals |
| **generate_audio** | true, false | true | Disable to save cost if adding audio later |
| **negative_prompt** | string | -- | Exclude unwanted elements: "no camera shake, no lens distortion" |
| **seed** | integer | random | Document successful seeds for series consistency |
| **auto_fix** | true, false | true (T2V), false (I2V) | Rewrites prompts that fail content policy |
| **safety_tolerance** | 1-6 | 4 | 1 = strictest, 6 = most permissive |

### Image-to-Video Additional Parameter

| Parameter | Notes |
|---|---|
| **image_url** | URL of input image. Must be 720p+ resolution, max 8 MB. 16:9 or 9:16 recommended (auto-crops otherwise). |

## Prompting Strategy

### Use Natural Language, Not Tags

Write prompts as directing instructions, not keyword lists. Veo 3.1 uses cross-modal attention and understands full sentences with narrative structure.

**Do this:**
> A medium shot frames a cartographer in a cluttered Victorian study. Warm lamplight illuminates ancient maps spread across a mahogany table. He traces a route with his finger and says, "According to this sea chart, the lost island exists. We sail at dawn."

**Not this:**
> cartographer, Victorian study, maps, warm light, dialogue, cinematic, 8k, masterpiece

### Five-Element Prompt Structure

For best results, include these elements in this order:

1. **Camera / Shot** -- framing and movement (medium shot, slow dolly forward, crane descending)
2. **Setting / Atmosphere** -- location, lighting, environmental mood
3. **Subject** -- distinctive visual details (clothing, features, accessories)
4. **Action** -- what happens, movement, progression over the clip duration
5. **Audio / Dialogue** (optional) -- spoken lines, sound effects, ambient sound

### Prompt Length

150-300 characters hits the sweet spot for most clips. Go longer for complex action sequences or detailed audio direction. Avoid under-specifying ("a person walks in a city") -- it produces generic results.

## Camera Movement Tips

Veo 3.1 responds to professional cinematography vocabulary. Use precise terms with speed modifiers:

| Term | Effect |
|---|---|
| slow dolly forward | Camera glides toward subject, draws viewer in |
| gentle pan left/right | Horizontal sweep revealing the scene |
| crane shot descending | High-to-low dramatic reveal |
| tracking shot | Camera follows subject laterally |
| handheld | Organic, slightly shaky documentary feel |
| POV shot | First-person perspective |
| aerial view | Bird's-eye establishing shot |
| rack focus | Shift focus between foreground and background |
| Dutch angle | Tilted frame for unease or stylization |
| parallel trucking | Camera runs alongside subject (chase/speed feel) |

Add modifiers: "slow," "fast," "gradual," "rapid," "smooth" (e.g., "slow pan left," "rapid tracking shot").

## Audio and Dialogue Direction

This is Veo 3.1's standout feature. The model generates synchronized dialogue, sound effects, and ambient audio directly from your prompt.

### Dialogue

- Put character speech in quotation marks: A woman says, "We have to leave now."
- Alternative format: Character says: [exact words] -- then add "(no subtitles)" to avoid text overlays
- Keep dialogue short -- clips max out at 8 seconds, so write lines that fit in one natural breath
- Specify tone: "whispers nervously," "shouts with excitement," "speaks in a calm monotone"

### Sound Effects and Ambient Audio

Add audio cues after or within your visual description:

> A bustling Tokyo street market at night: neon signs reflecting in rain-puddles, steam rising from food stalls, paper lanterns swaying in the breeze. A vendor calls out to passersby. Audio: sizzling woks, distant chatter, rain pattering on canvas awnings.

Use clear labels like "Audio:", "SFX:", or "Sound:" to separate audio direction from visual description when the prompt is complex.

### Multi-Sensory Detail

Sensory-rich prompts improve audio quality. Describe textures, temperatures, and physical sensations -- the model translates these into richer soundscapes.

## Supports Image Input

Yes -- use the `/image-to-video` variants. Pass `image_url` to animate a reference image.

### Image-to-Video Tips

- The prompt should describe the **motion and action**, not repeat visual details already in the image
- Source image must be 720p+ resolution and under 8 MB
- 16:9 or 9:16 aspect ratio recommended; other ratios get auto-cropped
- Aspect ratio defaults to "auto" (inferred from image) for I2V

## Common Pitfalls

| Issue | Fix |
|---|---|
| Generic, flat results | Add specific details: lighting, textures, character features |
| Characters shift appearance | Use distinctive visual markers (specific clothing, accessories, hair) |
| Objects appear/disappear | Reduce scene complexity or use shorter duration |
| Audio-lip sync off | Provide explicit audio cues; keep dialogue short |
| Internal contradictions | Avoid conflicting descriptions (e.g., "bright daylight" + "moonlit") |
| Temporal overloading | One scene/moment per clip -- do not attempt scene transitions |

## Production Workflow

1. Start with **`fal-ai/veo3.1/fast`** at **4s, 720p** for rapid prompt iteration
2. Refine the prompt until visuals and audio match your intent
3. Scale up to **8s, 1080p** (or 4K) on the fast variant for production output
4. Switch to **standard variant** only for final hero content where maximum fidelity matters
5. Use **seed** values to lock in a good generation and explore variations

## Example Prompts

### Cinematic Dialogue Scene
> A medium shot frames an old sailor in a dimly lit harborside pub. He wears a knitted blue sailor hat and has a thick grey beard. He removes a pipe from his mouth and says, "The sea doesn't forgive, but she always remembers." Rain patters against the window behind him. Audio: creaking wood, muffled wind, distant foghorn.

### Product Showcase
> Slow dolly forward toward a matte black perfume bottle on a marble pedestal. Soft volumetric light catches the gold lettering. A single drop of liquid falls from the nozzle in slow motion, catching the light as it descends. Audio: a resonant glass chime, then silence.

### Action Sequence
> Handheld tracking shot following a parkour runner across wet Tokyo rooftops at dusk. Neon signs blur in the background. He vaults over an AC unit, rolls, and leaps to the next building. SFX: sneakers slapping wet concrete, heavy breathing, wind rushing past the camera.

### Atmospheric / World-Building
> Aerial view of a bioluminescent forest at night. Glowing blue and green fungi pulse softly along twisted tree roots. A deer steps through a shallow stream, its hooves disturbing the luminous water. Camera slowly cranes down to eye level. Audio: distant owl call, water trickling, faint ethereal hum.

## When to Use Veo 3.1 vs Other Models

- **Use Veo 3.1** when you need: top-tier quality, native dialogue/audio, cinematic control, 4K output, or product showcases
- **Use Veo 3.1 Fast** for most work -- iteration, drafts, and production clips where cost matters
- **Use Veo 3.1 Standard** only for final hero shots requiring absolute maximum fidelity
- **Use other models** when you need: longer clips, specific style transfer, or lower-cost high-volume generation
