# Mureka V9.5

Read when selecting or prompting `music/mureka-v9.5`. This reference adapts Skywork's [Mureka music-maker skill](https://github.com/SkyworkAI/Skywork-Skills/blob/main/skywork-music-maker/SKILL.md) and [prompt guide](https://github.com/SkyworkAI/Skywork-Skills/blob/main/skywork-music-maker/references/prompt_guide.md) to Creative Claw's `generate_music` contract. Sources checked 2026-10-05.

## Availability and controls

Use Mureka V9.5 for full-length vocal songs, expressive performances, custom or automatic lyrics, and instrumentals. Use Lyria 3.5 for background or image-inspired music; it remains the tool's omitted-model default. Fetch `get_model_params({ model: "music/mureka-v9.5" })` when its schema is missing from the task. If unavailable, explain and offer available alternatives.

Use Creative Claw tools and account credits. The upstream CLI, API-key setup, Mureka 8 recommendation, multi-choice defaults, and automatic generation retries do not apply here. No customer Mureka API key or separate installation is needed.

Provide `model`, `prompt`, `lyrics`, and `force_instrumental` directly to `generate_music`, not in `extras`. The live tool and model schemas govern supported inputs.

| Desired output | Inputs | Prompt limit | Credits per track |
| --- | --- | --- | --- |
| Instrumental | Omit `lyrics`; set `force_instrumental: true` (also the default without lyrics) | 1,024 characters | 30 |
| Song with supplied lyrics | Nonempty `lyrics`, up to 5,000 characters; omit `force_instrumental` or set `false` | 1,024 characters | 30 |
| Model writes and sings the lyrics | Omit `lyrics`; set `force_instrumental: false` | 2,000 characters | 100 |

All modes require a nonempty `prompt` and produce one MP3. The model chooses length, up to 4 minutes 30 seconds for instrumentals or 5 minutes 30 seconds for vocal songs. Timing described in prose is a creative request, not a duration guarantee. Use ElevenLabs Music for exact duration or short stings.

`lyrics` together with `force_instrumental: true` is invalid. Do not provide `music_length_ms`, `output_format`, `seed`, `n`, image references, vocal or melody IDs, or inference controls. Singing voice cloning, stems and extension are not exposed here. For remixing or replacing lyrics in a time range, use the separate `music/mureka-remix` or `music/mureka-region-edit` model and its current schema.

For style inspiration, supply `audio_url` or `extras.reference_audio_url` (extras wins when both are supplied). The source must be at least 30 seconds; longer recordings are cut to their first 30 seconds, with a prepared excerpt up to 10 MB. The reference guides style instead of the style prompt and does not guarantee identical melody or voice. Keep the required prompt for context and supplied lyrics in `lyrics`. The mode price is unchanged. Let Creative Claw manage provider uploads.

## Write the musical brief

Describe audible traits: specific genre, tempo, instruments, mood, and vocal delivery. Use compact descriptions. Map musical descriptions to clear English terms while preserving cultural detail and the intended sung language. Plan an energy arc: quiet opening, fuller chorus, sparse bridge, final lift. Keep exclusions focused and avoid artist imitation.

For supplied lyrics, put the production brief in `prompt` and performed words in `lyrics`. For automatic lyrics, add the theme, sung language, and structure to `prompt`. For instrumentals, explicitly exclude vocals.

Instrumental example:

```json
{
  "model": "music/mureka-v9.5",
  "prompt": "Warm acoustic folk, relaxed 86 BPM, fingerpicked guitar, felt piano and soft brushed drums. Quiet opening, gradual harmonic lift, gentle resolved ending. Sparse background bed for a travel film, instrumental only, no vocals or chants.",
  "force_instrumental": true
}
```

## Lyrics and vocal songs

For newly written lyrics, use separate section tags, short singable lines, balanced syllables, deliberate rhymes, and a simple repeated chorus hook. Preserve supplied words; propose edits if delivery needs improvement. Never silently shorten, translate, or omit the user's lyrics. Mureka has no phonetic input: do not put IPA or phoneme spellings in `lyrics`. Fix a mispronounced word by spelling, as described in [music prompting](music-prompting.md#pronunciation-in-sung-lyrics). This also applies to `music/mureka-remix` lyrics, and to `music/mureka-region-edit` when the live model list includes it.

Supplied-lyrics example:

```json
{
  "model": "music/mureka-v9.5",
  "prompt": "Indie soul, warm and hopeful, 92 BPM, Rhodes piano, rounded bass and brushed drums. Intimate English alto lead, restrained verse growing into an open chorus, clear diction, gentle resolved ending.",
  "lyrics": "[Verse]\nMorning spills across the floor\nFootsteps find an open door\n[Chorus]\nLet the daylight carry me\nLet the daylight carry me",
  "force_instrumental": false
}
```

To have Mureka write and sing a song, omit `lyrics`, set `force_instrumental: false`, and specify the theme and sung language in `prompt`. This is the 100-credit mode. If the user asks the assistant to draft lyrics first, write them as text and use the supplied-lyrics mode when generation is authorized. Do not switch modes merely to reduce cost when the user explicitly chose automatic lyrics.

## Completion and revision

Resolve the returned Creative Claw job ID with `check_job`; do not submit again because a job is pending or polling is interrupted. Return the permanent Creative Claw asset.

Review the audible result against the brief and required lyrics. Returned lyric text or job success does not prove every line was sung. State any inspection limitation. Report missing words, early endings, or other mismatches without claiming a complete song. Do not stitch unrelated generations to simulate completion unless the user requested that edit.

When another take is requested, change the smallest relevant part of the brief and preserve the rest. One requested track authorizes one generation. Vendor suggestions to generate several choices or retry failures do not authorize extra paid calls. Follow [job recovery](job-recovery.md) for uncertain or failed jobs.

## Upstream attribution

Prompting and lyric techniques adapted from Skywork Music Maker, MIT licensed. The linked upstream skill describes broader vendor capabilities and an older model; the live Creative Claw schemas govern execution.

Copyright (c) 2026 Skywork

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
