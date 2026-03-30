# MiniMax Hailuo 2.3 Fast

**Standard Model ID:** `fal-ai/minimax/hailuo-2.3-fast/standard/image-to-video`
**Pro Model ID:** `fal-ai/minimax/hailuo-2.3-fast/pro/image-to-video`

MiniMax's fastest and cheapest video model in the Hailuo 2.3 family. An image-to-video model that animates a source image into a 6- or 10-second clip at up to 50% lower cost than the standard Hailuo 2.3. Built on the same architecture as Hailuo 2.3 (enhanced physics, micro-expressions, stylization) but optimized for speed and batch efficiency.

## Supports Image Input

Yes -- this is an **image-to-video only** model. It requires an input image as the first frame. For text-to-video, use `fal-ai/minimax/hailuo-2.3/standard/text-to-video` or `fal-ai/minimax/hailuo-2.3/pro/text-to-video` instead.

## Key Strengths

- **Up to 50% cheaper** than standard Hailuo 2.3 for batch creation
- **Faster generation** -- optimized inference for quick turnaround
- **Micro-expressions** -- natural facial performances with subtle emotional nuance; avoids the morphing artifacts of older models
- **Physics simulation** -- realistic fluid dynamics, object trajectories, suspension, and material interactions
- **Product consistency** -- maintains text legibility and geometric stability during camera movement (strong for e-commerce)
- **Stylization** -- supports anime, illustration, ink-wash painting, and game-CG art styles
- **Prompt adherence** -- accurately interprets complex lighting, lens, and camera instructions

## Parameters

| Parameter | Type | Required | Default | Values | Notes |
|---|---|---|---|---|---|
| **prompt** | string | Yes | -- | -- | Describe the motion and transformation you want |
| **image_url** | string | Yes | -- | URL or base64 data URI | The source image used as the first frame |
| **duration** | string | No | "6" | "6", "10" | Standard (768p) supports both; Pro (1080p) is 6s only |
| **prompt_optimizer** | boolean | No | true | true, false | Model's built-in prompt enhancement; disable for precise control |

### Resolution Tiers

| Tier | Resolution | Duration Options | Cost (6s) | Cost (10s) |
|---|---|---|---|---|
| **Standard** | 768p | 6s, 10s | $0.19 | $0.32 |
| **Pro** | 1080p | 6s only | -- | -- |

## Prompting Strategy

### The Golden Rule: Prompt for Motion, Not Static Description

Hailuo 2.3 Fast already "sees" your input image. Describing static elements wastes tokens and confuses the motion generator. Only prompt for what **changes** -- the motion, transformation, and camera work.

**Do this:**
> Her hair blows dramatically in strong wind as she gazes toward the horizon. Clouds move rapidly across the sky.

**Not this:**
> A woman stands on a cliff overlooking mountains with a sunset in the background, wearing a red dress.

### Use Narrative Flow, Not Tag Lists

Hailuo uses an LLM backbone that understands narrative structure. Write prompts as sentences with cause-and-effect, not comma-separated keywords.

**Do this:**
> A cyberpunk samurai sprints through a rainy Neo-Tokyo market, knocking over stalls as neon lights reflect off the wet pavement.

**Not this:**
> cyberpunk city, rain, neon, 4k, running, masterpiece, best quality

### Choose Strong Motion Verbs

The verbs you choose directly shape motion quality. Weak verbs produce weak motion.

- "aggressively accelerates" and "careening around the corner" >> "drives fast"
- "whips around to face the camera" >> "turns around"
- "slowly raises their right arm, hand open and reaching toward the light" >> "moves arm up"

### Use Cinematic Camera Language

Professional film terminology maps directly to camera behavior:

- **Tracking shot** -- camera follows the subject laterally
- **Dolly in/out** -- camera pushes toward or pulls away from subject
- **Rack focus** -- shift focus between foreground and background
- **Crane shot** -- camera rises or descends vertically
- **POV** -- first-person perspective
- **Pan left/right** -- camera rotates on its axis

Example: "A tracking shot follows the runner through dense forest, rack focusing from leaves in the foreground to her determined expression."

### Guide Temporal Progression

Use transitional markers to establish sequence within the clip:

> Camera starts focused on a raindrop on the windowpane, then gradually pulls back to reveal a stormy cityscape beyond.

Words like "then," "meanwhile," "as," "gradually," and "suddenly" help the model understand timing.

### Anchor Your Subject

Use brief subject references followed by specific actions to prevent the model from swapping your subject for a generic one:

> The red-haired woman [reference] turns her head slowly to face the camera [action], a faint smile forming [emotion].

### Handle Multi-Stage Actions

For complex sequences, use clear sequential structure:

> She reads the letter with growing concern, tears well up, then she crumples the paper angrily and throws it aside.

The model will intelligently fill in intermediate steps (opening a door implies reaching for the handle, grasping, pulling).

## Common Pitfalls and Fixes

| Problem | Cause | Fix |
|---|---|---|
| Morphing / shape-shifting | Conflicting instructions or too many subject changes | Simplify action; anchor subject at prompt start |
| Static video, no motion | Too many static descriptors, not enough action verbs | Add camera movement or environmental dynamics |
| Oversaturated / deep-fried look | Quality boosters like "8k," "masterpiece," "best quality" | Remove them; use natural descriptive language |
| Jerky or too-fast motion | Default motion intensity too high for the action | Add "slowly," "gently," "gradually," or "cinematic slow motion" |
| Contradicts source image | Prompted for actions incompatible with the framing | If source is a close-up face, don't prompt "stands up and walks away" |

## Example Prompts

### Product Animation (E-Commerce)
> The perfume bottle rotates slowly on a marble surface, light catching the facets of the glass. A soft mist drifts behind it, backlit with warm golden light.

### Character Emotion
> Her expression shifts from curiosity to quiet surprise as she reads the handwritten note, eyebrows lifting slightly, the faintest smile appearing at the corner of her mouth.

### Action Sequence
> The motorcycle aggressively accelerates down the rain-soaked highway, water spraying from the rear tire. Camera tracks alongside at wheel level, capturing reflections of city lights on wet asphalt.

### Anime Style
> The samurai unsheathes her katana in a fluid arc, cherry blossoms swirling around the blade. Camera dollies in on her focused expression as wind catches her hair. Anime style with dramatic speed lines.

### Environmental / Landscape
> Dawn light creeps across the mountain valley, mist rolling slowly through pine trees. A bird takes flight from a branch, silhouetted against the brightening sky. Crane shot rising above the canopy.

## When to Use Hailuo 2.3 Fast vs Other Models

- **Use Hailuo 2.3 Fast** when you need: rapid iteration on image-to-video animations, batch processing at low cost, product videos, character micro-expression work, or testing motion concepts before committing to a premium model
- **Use Hailuo 2.3 Standard/Pro** when you need: text-to-video (no source image), maximum quality from the 2.3 family, or the full 10s duration at 1080p
- **Use Hailuo 02** when you need: last-frame conditioning (controlling how the video ends), or physics-heavy scenes where 2.0's extreme physics simulation excels
- **Use Veo or Sora** when you need: the highest cinematic fidelity regardless of cost, or longer-form video generation
- **Use Kling** when you need: human choreography or precise body movement control
