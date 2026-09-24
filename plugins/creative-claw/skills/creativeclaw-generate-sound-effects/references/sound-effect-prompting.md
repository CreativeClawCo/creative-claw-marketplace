# Sound Effects v2 prompting

Use this reference when translating an audible brief into a `generate_sound_effect` prompt or diagnosing a weak result.

## Build the prompt

Prioritize audible information in this order:

1. **Source and action:** what produces the sound and what it does.
2. **Material and contact:** metal on concrete, leather movement, wet gravel, hollow plastic, glass on tile.
3. **Temporal shape:** immediate or gradual onset, rhythm, sequence, pauses, repetitions, sustain, decay, and ending.
4. **Perspective:** close, medium, distant, behind a wall, above, below, moving left to right.
5. **Acoustic space:** interior or exterior, room size, surface reflections, open air, reverb, echo, occlusion.
6. **Texture and intensity:** soft, sharp, brittle, heavy, clean, distorted, wet, airy, restrained, explosive.
7. **Exclusions:** a short list of likely unwanted elements.

Useful prompt shape:

> [Primary source and action], [material/contact], [timing and sequence], [perspective and space], [texture/intensity], [decay or loop behavior], [focused exclusions].

The tool accepts 450 characters. Prefer one clear sound design decision over several competing metaphors.

## Choose one-shot, sequence, or ambience

### One-shot

Describe the attack, body, and tail. Set an exact short duration when the cue must fit a UI or edit slot.

> Heavy steel vault latch releasing: tight pneumatic hiss, one dense metallic clunk, short low-frequency body, close perspective in a dry concrete chamber, controlled half-second decay, no voices, no music.

### Foley

Name the performer or object, contact material, pace, weight, and recording perspective.

> Three slow leather boot steps on damp gravel, heavy adult weight, individual stones shifting under each heel, close Foley microphone, outdoor night air, no cloth rustle, no traffic, clean ending.

### Chronological sequence

Use ordering words and keep the number of events small.

> A ceramic mug slides across a wooden desk, pauses, tips over, then hits the floor and breaks into several small pieces; close indoor perspective, short room reflection, no voices, no music.

For precise editorial control over several distinct events, generate them separately. ElevenLabs also recommends separating complex effects when individual timing matters.

### Ambience

Describe a sound field, not a story. Control density and frequency of intermittent events.

> Quiet predawn city rooftop ambience: distant low traffic wash, soft ventilation hum, occasional far-off bird, open-air perspective, cool spacious stereo field, restrained dynamics, no nearby footsteps, no speech, no music.

## Synchronize to picture

`generate_sound_effect` does not inspect a video. Translate visible action into an audible timeline before generation:

- Record the cue's start, event order, and available duration.
- Set `duration_seconds` to the editorial slot.
- Describe onset, pauses, impact, and decay in chronological order.
- Keep the generated sound as a separate asset until it has been checked against picture.
- When frame-accurate timing matters, generate clean individual cues and place them in an editor rather than asking one prompt to score an entire scene.

Example:

> Two-second sci-fi panel interaction: at the start, one soft capacitive tap; after a brief pause, a rising digital confirmation chirp; finish with a tiny relay click and clean silence. Close dry perspective, sleek and restrained, no voice, no musical bed.

## Seamless loops

Set `loop: true`. A strong loop prompt describes a steady texture with no unique event that reveals the seam:

> Seamless spaceship engine-room ambience: constant low reactor hum, soft ventilation, sparse quiet relay ticks with even density, enclosed metallic room, restrained sub-bass vibration, no alarms, no speech, no music, no obvious beginning or ending.

Avoid phrases such as “starts,” “arrives,” “builds to,” “one loud hit,” “fades out,” or “ends.” Ask for constant density and stable energy. For an ambience longer than 30 seconds, generate the best 10 to 30 second loop and repeat it downstream.

## Prompt influence

The default is 0.3.

- **0.2 to 0.4:** good starting range for natural ambience and creative texture.
- **0.5 to 0.7:** useful when materials, sequence, or exclusions need firmer adherence.
- **0.8 to 1.0:** reserve for highly literal cues; expect less variation and potentially more rigid results.

These ranges are practical guidance, not provider guarantees. Improve the wording before pushing the value upward.

## Audio terminology

- **Impact:** collision or contact with a defined attack and body.
- **Whoosh:** movement-through-air transition, from soft and airy to fast and aggressive.
- **Ambience:** environmental background that establishes place and atmosphere.
- **One-shot:** a single non-repeating event.
- **Loop:** a repeatable segment without a perceptible boundary.
- **Stem:** an isolated component intended for later mixing.
- **Braam:** a large low brassy cinematic hit.
- **Glitch:** erratic digital malfunction or jitter texture.
- **Drone:** sustained tonal or textured atmosphere.

Use terminology only when it conveys an audible property. “Cinematic” alone is too broad; “cinematic low-metal impact with a short sub tail” is actionable.

## Common prompt patterns

**UI notification:**

> Soft premium notification chime, two clean glassy notes rising a minor third, precise transient, very short warm tail, close and dry, no bass hit, no voice, no ambience.

**Transition:**

> Fast airy whoosh moving left to right, smooth high-frequency sweep with a subtle low pulse at the midpoint, polished and modern, half-second clean decay, no impact hit, no music.

**Creature:**

> Large reptilian creature exhaling through a narrow throat, wet granular rasp, heavy chest resonance, close but slightly below the listener, one slow breath with an uneven tail, no roar, no speech, no music.

**Mechanical texture:**

> Old elevator machinery starting under load: motor hum catches twice, belts strain, then settle into an uneven rotating rhythm, recorded through a metal service door, industrial basement reflections, no alarm, no voices.

**Short musical component:**

> Four-bar 90 BPM dusty boom-bap drum loop, swung kick and snare, closed hi-hat, subtle vinyl texture, drums only, no melody, no bass, stable energy, seamless boundary.

Use `creativeclaw-generate-music` instead when the user wants a complete musical composition.

## Troubleshooting

| Audible problem | Prompt or parameter revision |
| --- | --- |
| Generic result | Add source, material, action, perspective, and one distinctive texture. |
| Wrong length | Set `duration_seconds`; simplify the number of events to fit. |
| Sequence out of order | Use explicit ordering and pauses; split into separate cues if timing is critical. |
| Too much reverb | Ask for close, dry recording and a short or dead room. |
| Too little space | Name the room or outdoor environment, distance, reflections, and tail. |
| Unwanted speech or music | Explicitly exclude voices, words, crowd, melody, harmony, and music. |
| Too tonal | Request noise-based, non-pitched texture and exclude melody or sustained pitch. |
| Loop clicks or obvious seam | Use `loop: true`; remove unique attacks and endings; request stable density. |
| Too rigid | Lower `prompt_influence` after removing over-specific constraints. |
| Too inaccurate | Clarify the prompt, then raise `prompt_influence` moderately. |

## Source basis

- [ElevenLabs Sound Effects overview and prompting guide](https://elevenlabs.io/docs/overview/capabilities/sound-effects)
- [ElevenLabs Sound Effects product guide](https://elevenlabs.io/docs/eleven-creative/playground/sound-effects)
- [ElevenLabs sound-effect API reference](https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert)
- [Official ElevenLabs sound-effects skill](https://github.com/elevenlabs/skills/blob/main/sound-effects/SKILL.md)
