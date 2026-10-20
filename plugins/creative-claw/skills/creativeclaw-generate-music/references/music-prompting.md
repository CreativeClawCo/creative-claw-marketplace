# Music prompting

Use this reference when translating a music brief into a `generate_music` prompt or diagnosing a weak result. It applies across the supported music models; model-specific notes are at the end. For Mureka, also read [its model reference](mureka.md).

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

The models can follow stated BPM and often follow key well enough for practical layering, but verify by listening before syncing other musical material. Use a range only when flexibility is acceptable. State unusual meter explicitly.

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

Set `force_instrumental: true` (Lyria, ElevenLabs, Mureka) and also make the prompt unambiguous. Exclude sung lyrics, spoken words, chants, and wordless vocal pads when those would be unwanted. For a dialogue bed, state which frequency and arrangement space should remain open.

Example:

> Thirty-second restrained product-film underscore. Minimal electronic soul at 96 BPM in A minor, warm analog bass, soft rim clicks, glassy two-note synth motif, and a low felt-piano pulse. Start nearly empty, add the bass after eight seconds, make one gentle harmonic lift at twenty-two seconds, then finish with a clean two-second resolved tail. Instrumental only, sparse dialogue-safe mix, no vocal textures, no trap hi-hat rolls, no trailer braams.

## Vocal songs

Set `force_instrumental: false` (Lyria, ElevenLabs, Mureka; MiniMax always sings its `lyrics`). Describe the voice as a performance, not as a famous singer: range, timbre, intimacy, intensity, articulation, language, harmony, and placement. If the user supplied lyrics, preserve them exactly in the selected model's supported lyrics field (MiniMax, Mureka) or inside the prompt (Lyria, ElevenLabs), and make their role clear. If the user supplied only a theme, state whether the model may write lyrics.

Use timing cues for vocal placement, for example “vocals enter after the eight-second intro” or “instrumental only after 1:45.” Exact words and timing still require review.

Example:

> Forty-five-second contemporary soul song at 82 BPM, live drums, rounded electric bass, Rhodes chords, muted guitar, and subtle strings. Intimate low female lead vocal in Spanish, conversational verses and a soaring but controlled final refrain, with two soft harmony voices only on the refrain. Eight-second instrumental intro, vocals centered and close-mic'd, warm tape character, no ad-libs over the ending, finish on a held resolved chord.

### Pronunciation in sung lyrics

Work in this order:

1. **Write the lyrics normally.** Give every Hebrew word full niqqud (for example שׁוֹקוֹלָד). Avoid geresh letters (ג׳, צ׳) and English loanwords in Hebrew lyrics. Write acronyms in English lyrics as "A.I." or as they sound ("ay-eye"); Mureka sang both as "AI".
2. **Generate and check.** Run `transcribe` (Scribe) with the sung language's `language_code`. A transcript confirms the words were recognized; the user judges by ear whether they sound native.
3. **Only if a word is sung wrong, fix that word.** Respell only that word in the lyric's own script, by syllable if needed, and keep the respelling identical in every repeat. You can also say how to sing it in plain words in the prompt, for example "sing AI as the two letters A-I"; Mureka's own guide recommends stating pronunciation in the prompt, but it is untested here. Latin letters inside Hebrew lyrics are a last resort: Mureka sang Latin "AI" in a Hebrew line as a Hebrew word.

Never put IPA or phoneme spellings in lyrics. No music model documents phonetic input, here or elsewhere (Suno, Udio and ElevenLabs Music included). In testing, acronyms in IPA failed on every model ("AA", "i-i-i"), Lyria sang the symbols as nonsense, and Mureka garbled Hebrew lyrics containing IPA and skipped the chorus that held it. There is no stress control either: move the word to where the melody stresses it, or swap in a word whose stress fits the line.

## Short-form music

Short pieces need fewer ideas and a deliberate ending. Use `music/elevenlabs-music-v2.5` for anything under 30 seconds.

**Logo sting:**

> Three-second premium technology ident: one soft granular rise into a warm suspended synth chord, a precise glass accent on the resolve, modern and understated, wide stereo image, instrumental, no percussion, no vocals, clean final decay.

**Jingle:**

> Twelve-second bright acoustic-pop brand jingle at 118 BPM, handclaps, muted guitar, upright bass, and a three-note whistle hook. Four-bar setup, hook repeated once, crisp final button. Instrumental only, no crowd sounds, no long fade.

Do not overload a three-second sting with verse, build, drop, and outro instructions.

## Music for picture

Translate editorial needs into musical events before prompting:

- Set `music_length_ms` only when supported. ElevenLabs Music makes that length exactly; Lyria treats it as guidance and MiniMax as an upper bound. Mureka chooses length and does not accept this field.
- Record important cue points, then describe the musical change at each time.
- Decide whether the ending should resolve before the picture cuts or ring through it.
- Keep generated music as a separate asset until approved. `generate_music` does not inspect the video or synchronize itself to visible events.
- There is no ducking control in generation. Ask for a dialogue-safe arrangement, then layer it with `add_audio_to_video` and `audio_mode: "mix"` (`added_volume` about 0.3 under speech).

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
| Timing drift | Use ElevenLabs Music for exact `music_length_ms`; otherwise simplify sections and clarify chronological cues without promising exact timing. |
| A word sung wrong | Respell only that word (niqqud for Hebrew, "A.I." or "ay-eye" for acronyms); never IPA. See Pronunciation in sung lyrics. |
| Style rejection | Remove artist, band, song, and copyrighted-lyric references; describe the musical traits instead. |

## Model notes

- **Lyria 3.5 (default):** accepts long prompts with section labels and timestamps. Up to 10 `image_urls` can set the mood; say what to take from them. Length is approximate within about 30 to 180 s.
- **ElevenLabs Music v2.5:** prompt up to 4,100 characters; exact length from 3 s to 10 min, so use it for stings, idents and picture-locked cues. Strong on vocal-led material, acoustic genres, rock, orchestral and cinematic scores.
- **MiniMax Music 3:** the `prompt` is the production brief (genre, BPM, key, vocals, instrumentation, mix); the words go in `lyrics`, one section tag per line. Reuse the returned `seed` with the same prompt and lyrics to reproduce or refine a take.
- **Mureka V9.5:** use for full-length vocal songs, expressive musical performances, supplied or automatic lyrics, and instrumentals. Read [Mureka guidance](mureka.md). One MP3 with model-chosen length; instrumental or supplied lyrics cost 30 credits, automatic lyrics and singing cost 100. An audio style reference replaces the style prompt; no duration or seed controls. Use separate Mureka Remix or Region Edit models for those operations.

Upstream features that are not `generate_music` fields (composition plans, audio references, section editing, inpainting) are unavailable. Do not promise or emulate them by inventing parameters.

## Source basis

- [ElevenLabs Music v2.5 announcement](https://elevenlabs.io/blog/music-v2-5-model)
- [ElevenLabs music best practices](https://elevenlabs.io/docs/overview/capabilities/music/best-practices)
- [ElevenLabs Music overview](https://elevenlabs.io/docs/eleven-creative/products/music)
- [ElevenLabs compose API](https://elevenlabs.io/docs/api-reference/music/compose)
- [ElevenLabs music quickstart and content restrictions](https://elevenlabs.io/docs/eleven-api/guides/cookbooks/music)
