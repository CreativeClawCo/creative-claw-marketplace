# Sound-effect and music prompting

Read only the section that matches the selected audio model.

## Sound effects and ambience

Describe what should be heard rather than what should be seen. A useful prompt usually specifies:

1. **Source and action:** the object, material, creature, machine, or environment producing sound.
2. **Timing:** onset, sequence, rhythm, pauses, decay, and ending.
3. **Space:** close or distant, indoor or outdoor, room size, reflections, reverb, or open-air diffusion.
4. **Texture and intensity:** soft, brittle, heavy, metallic, wet, distorted, clean, restrained, or explosive.
5. **Exclusions:** no speech, no music, no crowd, no hiss, or another likely unwanted element.

For a short synchronized cue, describe the timeline directly:

> A heavy steel vault door releases with a tight pneumatic hiss, swings open with two slow metallic groans, then lands on a deep mechanical stop. Close perspective inside a concrete chamber, short dark reverb, no voices, no music, clean ending.

For a loop, describe a stable sound field without a unique beginning or final hit:

> Seamless nighttime spaceship-engine-room ambience: low reactor hum, faint ventilation, intermittent soft relay clicks, restrained sub-bass vibration, enclosed metallic room, no alarms, no speech, no music, no obvious beginning or ending.

If the first result is wrong, name the audible defect in the revision: shorten the decay, remove a tonal layer, move the source farther away, reduce reverb, soften the transient, or make the loop less eventful.

## Music

Specify the musical decisions that affect the output:

- **Purpose:** underscore, trailer cue, product bed, ident, jingle, theme, or full song.
- **Genre and era:** use concrete musical language rather than artist imitation.
- **Tempo and meter:** approximate BPM and rhythmic feel when important.
- **Mood and energy arc:** opening state, build, peak, and ending.
- **Instrumentation:** lead, harmony, rhythm, bass, percussion, and texture.
- **Structure:** sections and approximate timing for picture-matched work.
- **Mix:** sparse or dense, dry or spacious, foreground or under dialogue.
- **Vocals:** instrumental, wordless vocal texture, or a vocal song. Use `force_instrumental` consistently with the prompt.

Example instrumental bed:

> Thirty-second cinematic science-fiction underscore at 92 BPM. Begin with a quiet analog drone and distant glassy pulses; introduce a restrained low synth ostinato after eight seconds; build gentle tension without becoming heroic; one warm harmonic lift at twenty-two seconds; finish with a clean two-second resolved tail. Spacious but controlled mix, no vocals, no trailer braams, leave room for dialogue.

Example short sting:

> Three-second premium technology logo sting: one soft granular rise into a warm suspended synth chord, a precise glass accent on the resolve, modern and understated, wide stereo image, no percussion, no vocals, clean final decay.

Avoid relying only on vague adjectives such as “epic” or “cinematic.” Pair mood with tempo, instrumentation, structure, and the intended use.

## Matching picture

Translate visible events into audible timing before generation. Record cue points from the clip, then request an audio duration that fits. `generate_audio` creates a standalone asset; it does not inspect a video or automatically synchronize events. Use `merge_media` only after the timing has been approved.
