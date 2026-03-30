# Sora 2 Pro (OpenAI)

**Text-to-Video Model ID:** `fal-ai/sora-2/text-to-video/pro`
**Image-to-Video Model ID:** `fal-ai/sora-2/image-to-video/pro`

OpenAI's Sora 2 Pro. Generates up to 20 seconds of video per clip with native audio, character ID consistency across clips, and strong cinematic understanding. Treats prompts like storyboard directions -- detailed, video-centric prompts significantly outperform simple inputs.

## Key Strengths

- Longest single-clip duration among top models -- up to 20 seconds
- Native audio generation synced with visuals (ambient sound, dialogue, effects)
- Character IDs for multi-clip visual consistency (up to 2 characters per generation)
- Strong cinematography literacy -- responds to professional filmmaking terminology
- Physics-aware motion (cloth dynamics, fluid, lighting shifts)
- Image-to-video mode anchors the first frame from a reference image

## Prompting Strategy

### Think Like a Cinematographer

Treat every prompt as a storyboard brief. Detailed prompts give control and consistency; lighter prompts encourage creative freedom. Structure prompts around three questions:

1. **What is the shot?** (camera angle and movement)
2. **How is it framed?** (composition and depth)
3. **What is the visual style?** (aesthetic and mood)

### Use Specific, Concrete Language

Replace vague descriptions with precise visual detail.

**Do this:**
> Wet asphalt, zebra crosswalk, neon signs reflecting in puddles, teal and orange color grading

**Not this:**
> A beautiful street at night

**Do this:**
> Cyclist pedals three times, brakes, and stops at crosswalk

**Not this:**
> Person moves quickly

### Recommended Prompt Template

```
[Scene description: characters, costumes, setting, weather]

Cinematography:
Camera shot: [framing, angle, movement]
Mood: [tone, color palette]

Actions:
- [Specific beat 1]
- [Specific beat 2]

Dialogue:
SPEAKER_NAME: "Line of dialogue"

Background Sound:
[Ambient audio cues, music direction]
```

### Establish Style First

Style is one of the most powerful levers. Set the aesthetic lens before describing action:
- Film stock references: "Kodak Vision3 500T film stock with natural grain"
- Equipment references: "Shot on Arri Alexa with anamorphic lenses" or "16mm documentary style"
- Lighting setups: "Rembrandt lighting with strong key light from left" or "soft diffused window light with warm lamp fill"

### Cinematographic Controls

Camera terms map directly to visual output:
- **Tracking shot** -- lateral following movement
- **Dolly zoom** -- simultaneous zoom and dolly for dramatic effect
- **Crane shot** -- vertical sweeping movement
- **Handheld** -- documentary texture and urgency
- **Steadicam** -- smooth cinematic glide
- **Low-angle shot** -- dramatic, imposing
- **Shallow depth of field** -- subject sharp, background bokeh
- **Deep focus** -- foreground and background both sharp

Specify "static shot" or "locked-off camera" explicitly when you want no camera motion -- the model defaults to adding movement.

### Motion and Action

- Limit each shot to **one clear camera move** and **one clear subject action** for best adherence
- Describe movement in beats: "takes four steps, pauses, pulls curtain aside"
- Use precise verbs: "sprinting," "strolling," "tiptoeing" over generic "moving"
- Use temporal modifiers: "slowly," "gradually," "sudden" to control pacing
- The model follows instructions more reliably in shorter clips -- consider stitching two 4-second clips rather than generating one 8-second clip

### Dialogue and Audio

- Place dialogue in a **distinct block below prose** so the model separates visual from spoken content
- Label speakers consistently: `MAYA: "Let's go."` then `JAKE: "Right behind you."`
- Keep lines concise and natural -- a 4-second clip fits 1-2 exchanges; 8 seconds supports more
- Long complex speeches are unlikely to sync well
- For ambient audio, be explicit: "rain pattering on tin roof, distant thunder, muffled jazz from next room"

### Lighting Consistency

Instead of "brightly lit room," specify the full setup:
> Soft window light from camera-left with warm lamp fill, cool rim light from hallway, color anchors in amber and walnut brown

## Supports Image Input

Yes -- use `fal-ai/sora-2/image-to-video/pro`. Pass `image_url` (publicly accessible URL or base64 data URI) to anchor the first frame. The text prompt then defines subsequent action. The image should match your target resolution for best results. Supports JPEG, PNG, and WebP.

## Character IDs

Sora 2 Pro supports persistent character identities across unlimited generations. Characters are created once and referenced by ID for visual consistency in multi-clip projects.

### Creating Characters

Two methods:
1. **From a video URL** -- POST to the characters endpoint with a video URL and timestamp range ("start,end" in seconds). Best with 1-3 second ranges.
2. **From a previous generation** -- Reference a prior Sora task ID directly using `from_task`. Faster (5-15 seconds vs 10-30 seconds).

### Source Requirements for Character Extraction

- Even, natural lighting -- avoid heavy shadows or backlighting
- Full face and body visible
- Minimal movement -- avoid motion blur
- Front-facing or 3/4 view preferred
- MP4, MOV, or WebM at up to 1080p

### Referencing Characters in Prompts

Pass character IDs in the `character_ids` array parameter (max 2). Refer to characters by name in the prompt text:

> @Maya stands at the window looking out at the rain. She turns and smiles.

For two characters:

> @Maya and @Jake sit across from each other at a small cafe table. Maya laughs, Jake gestures with his coffee cup.

### Character ID Notes

- Character IDs persist indefinitely -- no expiration
- IDs are scoped to your API account
- Profiles are immutable once created; variations require new extractions
- When `character_ids` is set, only the OpenAI provider is used
- Document which source video and timestamps you used for each character -- helps troubleshoot consistency issues
- Test a character with a single generation before batch processing

## Parameters

| Parameter | Type | Values | Default | Notes |
|---|---|---|---|---|
| **prompt** | string | 1-5000 chars | (required) | Scene description, dialogue, audio direction |
| **duration** | integer | 4, 8, 12, 16, 20 | 4 | Seconds. Shorter clips = better prompt adherence |
| **aspect_ratio** | string | 16:9, 9:16 | 16:9 | Image-to-video also supports "auto" |
| **resolution** | string | 720p, 1080p, true_1080p | 1080p | Image-to-video also supports "auto" |
| **character_ids** | array | Up to 2 string IDs | null | Forces OpenAI provider when set |
| **image_url** | string | URL or data URI | (i2v only) | First-frame anchor for image-to-video |
| **model** | string | sora-2, sora-2-2025-12-08, sora-2-2025-10-06 | sora-2 | "sora-2" uses the latest snapshot |
| **delete_video** | boolean | true/false | true | Deletes video after generation for privacy |
| **detect_and_block_ip** | boolean | true/false | false | Blocks prompts referencing known IP |

## Limitations and Workarounds

| Limitation | Workaround |
|---|---|
| Physics inconsistency with complex interactions | Simplify: "silk scarf in gentle breeze" over complex collisions |
| Text rendering is unreliable | Add text in post-production |
| Temporal drift in longer clips (10+ seconds) | Generate shorter clips and composite them |
| Default camera motion added | Explicitly state "static shot" or "locked-off camera" |
| Generic output | Add film stock or equipment references over vague style terms |
| Subject morphing | Reduce prompt complexity; composite simpler shots |

## Example Prompts

### Cinematic Narrative Shot
> A woman in a dark green wool coat walks through a misty forest trail at dawn. Shallow depth of field, 85mm lens. She pauses, looks up at light breaking through the canopy. Soft ambient birdsong, her footsteps crunching on wet leaves. Shot on Arri Alexa, desaturated cool tones with warm highlights.

### Product Commercial
> Smooth 360-degree rotating shot of black wireless headphones on white pedestal, studio lighting with soft shadows, minimal background, commercial photography style. Clean electronic ambient tone.

### Dialogue Scene
> Interior coffee shop, warm afternoon light through large windows. Medium two-shot.
>
> Actions:
> - Maya sets down her cup and leans forward
> - Jake looks up from his phone, surprised
>
> Dialogue:
> MAYA: "I got the callback."
> JAKE: "Wait -- seriously?"
>
> Background Sound: Quiet cafe ambience, espresso machine hissing, soft indie music.

### Urban Atmosphere
> Wide-angle shot slowly pushing forward down rain-soaked Tokyo street at night. Neon signs reflecting in puddles, bokeh from car headlights, teal and orange color grading, handheld documentary texture. Sound of rain, distant traffic, muffled pop music from a storefront.

## When to Use Sora 2 Pro vs Other Models

- **Use Sora 2 Pro** when you need: clips longer than 10 seconds, native audio/dialogue, character consistency across multiple clips, cinematic quality with professional camera control, narrative storytelling and short films
- **Use Kling 2.1 instead** when you need: faster generation, lower cost per clip, or better physics for specific action sequences
- **Use Minimax Video instead** when you need: the fastest turnaround time or budget-friendly batch generation
- **Use Wan 2.1 instead** when you need: strong stylized/animated content or open-source flexibility
