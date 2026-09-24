# Music v2.5 prompting

Use this reference when translating a music brief into a `generate_music` prompt or diagnosing a weak result.

## Build the brief

A reliable prompt covers the decisions that affect the audible result:

1. **Purpose and placement:** score, underscore, music bed, sting, ident, jingle, theme, loop-like bed, or full song; foreground or under dialogue.
2. **Genre and era:** a concrete musical tradition and production period, without artist imitation.
3. **Mood and energy:** emotional state, intensity, and how energy changes over time.
4. **Tempo and harmony:** BPM or tempo feel, meter, key or mode when useful.
5. **Instrumentation:** lead, harmony, rhythm, bass, percussion, acoustic or electronic palette.
6. **Arrangement:** chronological sections, entries, transitions, peak, and ending.
7. **Production and mix:** room, microphone feel, saturation, reverb, stereo width, density, polish, and space for voiceover.
8. **Vocals:** instrumental, vocal texture, or song; singer character, language, delivery, harmonies, lyrical subject, and timing.
9. **Exclusions:** the most likely unwanted elements, kept short and specific.

Useful prompt shape:

> [Purpose and duration]. [Genre, era, tempo, key or meter]. [Instrument and production palette]. [Chronological arrangement]. [Vocal direction]. [Mix role and ending]. [Focused exclusions].

Do not turn the template into a checklist of contradictory adjectives. Decide what matters, constrain it, and leave the rest open.

## Control the composition

### Tempo, key, and meter

Music v2.5 can follow stated BPM and often follows key well enough for practical layering, but verify by listening before syncing other musical material. Use a range only when flexibility is acceptable. State unusual meter explicitly.

### Arrangement over time

Describe the track in playback order. Small sequencing words carry real control:

- “Start with solo felt piano and room tone.”
- “After four bars, introduce muted bass and brushed snare.”
- “At twelve seconds, lift into the main motif without adding vocals.”
- “Reserve the final two seconds for one resolved chord and a clean tail.”

If a section should remain sparse, say “only” or “just.” Otherwise the model may fill the space.

### Production vocabulary

Use terms that describe audible production decisions, not prestige:

- Space: dead room, close and dry, short chamber, wide hall, cavernous plate.
- Dynamics: compressed and punchy, open and dynamic, soft transient, hard limiter feel.
- Texture: tape saturation, vinyl dust, granular shimmer, clean digital, warm analog glue.
- Stereo and focus: mono-compatible center, wide pads, narrow rhythm section, foreground lead.
- Dialogue safety: sparse arrangement, restrained upper mids, no lead melody under narration.

When technical vocabulary is unnecessary, describe the physical impression, such as “recorded in a small carpeted room” or “distant ensemble in a large stone hall.”

## Instrumental music

Set `force_instrumental: true` and also make the prompt unambiguous. Exclude sung lyrics, spoken words, chants, and wordless vocal pads when those would be unwanted. For a dialogue bed, state which frequency and arrangement space should remain open.

Example:

> Thirty-second restrained product-film underscore. Minimal electronic soul at 96 BPM in A minor, warm analog bass, soft rim clicks, glassy two-note synth motif, and a low felt-piano pulse. Start nearly empty, add the bass after eight seconds, make one gentle harmonic lift at twenty-two seconds, then finish with a clean two-second resolved tail. Instrumental only, sparse dialogue-safe mix, no vocal textures, no trap hi-hat rolls, no trailer braams.

## Vocal songs

Set `force_instrumental: false`. Describe the voice as a performance, not as a famous singer: range, timbre, intimacy, intensity, articulation, language, harmony, and placement. If the user supplied lyrics, preserve them exactly inside the prompt and make their role clear. If the user supplied only a theme, state whether the model may write lyrics.

Use timing cues for vocal placement, for example “vocals enter after the eight-second intro” or “instrumental only after 1:45.” Dense lyrics, fast rap, stacked harmonies, and multilingual vocals are model strengths, but exact words and timing still require review.

Example:

> Forty-five-second contemporary soul song at 82 BPM, live drums, rounded electric bass, Rhodes chords, muted guitar, and subtle strings. Intimate low female lead vocal in Spanish, conversational verses and a soaring but controlled final refrain, with two soft harmony voices only on the refrain. Eight-second instrumental intro, vocals centered and close-mic'd, warm tape character, no ad-libs over the ending, finish on a held resolved chord.

## Short-form music

Short pieces need fewer ideas and a deliberate ending.

**Logo sting:**

> Three-second premium technology ident: one soft granular rise into a warm suspended synth chord, a precise glass accent on the resolve, modern and understated, wide stereo image, instrumental, no percussion, no vocals, clean final decay.

**Jingle:**

> Twelve-second bright acoustic-pop brand jingle at 118 BPM, handclaps, muted guitar, upright bass, and a three-note whistle hook. Four-bar setup, hook repeated once, crisp final button. Instrumental only, no crowd sounds, no long fade.

Do not overload a three-second sting with verse, build, drop, and outro instructions.

## Music for picture

Translate editorial needs into musical events before prompting:

- Set `music_length_ms` to the required asset duration.
- Record important cue points, then describe the musical change at each time.
- Decide whether the ending should resolve before the picture cuts or ring through it.
- Keep generated music as a separate asset until approved. `generate_music` does not inspect the video or synchronize itself to visible events.
- There is no true music-mixing or ducking control in generation. Ask for a dialogue-safe arrangement, then use an appropriate assembly workflow.

## Loop-like beds

`generate_music` has no seamless-loop switch. For a repeat-friendly bed, request a stable groove with no intro, no fill into a final cadence, consistent harmony, fixed BPM and key, and a clean bar-aligned boundary. Verify the seam in an editor before calling it seamless.

## Troubleshooting

| Audible problem | Prompt revision |
| --- | --- |
| Generic or bland | Specify genre, era, tempo, instruments, and one distinctive production choice. |
| Too many elements | Name the small allowed palette and say “only”; remove competing leads. |
| Wrong energy curve | Narrate entry points, build, peak, release, and ending in order. |
| Muddy under dialogue | Reduce midrange leads, dense pads, vocal textures, and heavy reverb; request a sparse dialogue-safe mix. |
| Unwanted vocals | Keep `force_instrumental: true`; exclude lyrics, speech, chants, and vocal pads. |
| Weak vocal identity | Add range, timbre, delivery, language, articulation, and harmony direction. |
| Abrupt or unusable ending | Reserve explicit time for a button, cadence, ring-out, or controlled fade. |
| Timing drift | Use exact `music_length_ms`, fewer sections, and clear chronological cues. |
| Style rejection | Remove artist, band, song, and copyrighted-lyric references; describe the musical traits instead. |

## Current Creative Claw boundary

ElevenLabs Music v2.5 also supports composition plans, audio references, section editing, and inpainting in its broader product. The current Creative Claw `generate_music` tool exposes prompt-based generation only. Do not promise or emulate unsupported controls by inventing parameters.

## Source basis

- [ElevenLabs Music v2.5 announcement](https://elevenlabs.io/blog/music-v2-5-model)
- [ElevenLabs music best practices](https://elevenlabs.io/docs/overview/capabilities/music/best-practices)
- [ElevenLabs Music overview](https://elevenlabs.io/docs/eleven-creative/products/music)
- [ElevenLabs compose API](https://elevenlabs.io/docs/api-reference/music/compose)
- [ElevenLabs music quickstart and content restrictions](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/music)
