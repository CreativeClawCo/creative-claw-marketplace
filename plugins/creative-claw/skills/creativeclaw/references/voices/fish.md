# Fish Audio Drama 3

## Fish Drama 3: direct the performance

Select speech/fish-drama-3 explicitly. Put the actual words and any performance directions in text. Brief the voice like an actor: describe emotion, intention, pace and who is listening. Bracketed directions guide a passage; paired tags limit a delivery to selected words. Choose a voice that suits the role before adjusting controls.

### Start here

1. Choose a voice whose provider language label and preview match the script and intended delivery.
2. Start with a short plain-text audition at the defaults, then add only the direction the performance needs.
3. For an existing clone, get its actual UUID from list_characters. To clone a new recording, use the private upload and clone_voice consent workflow with provider fish.
4. Submit generate_speech once. Follow its queued job with check_job until a permanent audio URL is available for another tool.

Single speaker: model, text, and voice_id OR character_id at the top level. Dialogue: extras.dialogue contains speaker, text and exactly one voice_id or character_id per turn; omit top-level voice selectors and text. If a cached client requires text, send text: "". All delivery and output controls go in extras. Do not pass provider reference_id, raw recordings, language_code or a separate emotion field.

Use a public voice_id from the language-balanced shortlist or extended Fish catalog. Use character_id for a private workspace clone. Selecting Fish for a Character with retained consented source audio can create its missing private copy; The Fish copy is reused without replacing other providers' copies.
Catalog language codes: ar, bn, cs, de, en, es, fa, fr, he, hi, id, it, ja, ko, nl, no, pl, pt, ro, ru, sv, ta, tl, tr, ur, vi, zh.

### Prompting

**directions**: Place concise natural-language directions in square brackets immediately before the affected words. Describe a playable intention, not only an emotion: [trying to reassure a worried friend, quietly, with a small smile]. A new bracket direction can change the delivery later in the same text.

**sounds And Pauses**: Place sounds and pauses exactly where they should occur, for example [sigh], [laugh], [breath] and [short pause]. They are performed model directions, not exact-duration audio edits. Use punctuation for normal rhythm and avoid adding an effect to every sentence.

**multilingual Directions**: Directions may be written in a different language from the spoken script. Keep the actual spoken words in the target script. This differs from switching spoken language within a sentence.

**language Switching**: Experimental: wrap only the changing phrase in a language tag such as <french>...</french>. Prefer a consented recording from a speaker fluent in both languages. Availability and accuracy vary by language and voice; this is not guaranteed dubbing or accent conversion.

**pronunciation**: Preserve the target script and niqqud. English phoneme tags use CMU ARPABET with stress digits (1 is primary stress, 0 is unstressed); Chinese uses pinyin and Japanese uses romaji. Write <|phoneme_start|>B EY1 S<|phoneme_end|> in text to pin English bass as the instrument. Do not pass IPA or Hebrew niqqud as ARPABET.

**dictionaries**: extras.pronunciation_dictionary accepts up to 3 inline dictionaries, each with up to 5000 items: {key,value,case_sensitive?}. Keys are 1 to 256 characters and values 1 to 1024. Values contain phonemes without wrapper tags. Matching is substring-based, leftmost-longest and case-insensitive by default. Account-managed dictionary IDs are not exposed.

**hebrew**: Fish Official has Hebrew stock voices, including Noa and Itai. Our Hebrew workflow uses full niqqud on every spoken word and extras.normalize: false. Preserve the approved wording while adding vowel points, including names and short words; punctuation alone is not niqqud. Keep acting directions in English to avoid unvocalized Hebrew inside instructions. Provider language labels and niqqud do not guarantee a native accent or perfect pronunciation. Audition the fully vowelized script before a longer take.

### Scope a delivery to selected words

Close every paired tag. These are Drama 3 delivery tags, not arbitrary SSML.

- `<whisper>`: Quiet speech limited to the wrapped words. Example: `This is <whisper>our little secret</whisper>.`
- `<emphasis>`: Highlight a phrase. Example: `Please keep the <emphasis>original file</emphasis>.`
- `<soft>`: Softer delivery within a passage. Example: `<soft>Take a slow breath.</soft> Then continue.`
- `<fast>`: A faster phrase within otherwise normal pacing. Example: `<fast>Keys, wallet, phone.</fast> We're ready.`
- `<slow>`: Slow down selected words. Example: `<slow>One step at a time.</slow>`
- `<stress>`: Stress a particular word. Example: `We need it <stress>today</stress>.`
- `<forceful>`: A forceful phrase without changing the whole passage. Example: `<forceful>Stop the engine.</forceful> Then wait.`

### Dialogue

Keep each speaker's name and voice selector stable across turns. Directions go inside each turn's text. Public voices and consented Character voices can appear in the same scene. Creative Claw generates the speaker tags and voice ordering; do not hand-write <|speaker:N|> tags.
Creative Claw limits: 16 speakers and 100 turns.

### Controls

**speed**: 0.5 to 2, default 1. A global playback/speaking-rate adjustment. Use Drama 3 paired <fast>/<slow> tags for phrase-level intent.

**volume**: extras.volume is decibels, default 0. It is not Cartesia's volume multiplier. normalize_loudness defaults true.

**variation**: temperature and top_p each range from 0 to 1, default 0.7. Lower temperature can reduce variation; it does not guarantee identical audio or speaker identity. No seed control is exposed.

**normalize**: Text normalization defaults true and targets English/Chinese normalization. False preserves the supplied script without that normalization. It is separate from audio loudness normalization.

**output**: MP3: 32000 or 44100 Hz, 64/128/192 kbps. WAV: mono 16-bit at 8000, 16000, 24000, 32000 or 44100 Hz. Defaults are MP3, 44100 Hz and 128 kbps. mp3_bitrate requires MP3.

**latencyAndChunks**: Use latency normal for quality, balanced or low when latency matters. chunk_length is 100 to 300, default 300; min_chunk_length is 0 to 100, default 50. Keep advanced token, repetition and chunk-context controls at their defaults initially.

**qualityGuard**: Optional extras.features: ["quality-guard"] requests Fish's backend quality guard. Availability is backend-dependent and does not guarantee a perfect performance.

### Copyable generate_speech examples

Replace the Character placeholder with an actual UUID from list_characters or clone_voice. Public stock examples use exact verified IDs. Performance examples are recipes, not claims that every voice produces identical results.

**stock**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "bf322df2096a46f18c579d0baa36f41d",
  "text": "Welcome back. We have a good story to share today."
}
```

**commercial**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "c70cfb98867a4bfb9ae20d2401257b92",
  "text": "[confident, friendly, speaking to one person rather than an audience] Make room for the ideas you have been putting off. Start something small today."
}
```

**reassuring**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "f3a2b90078d54a65af4b95f63bc7798e",
  "text": "[quiet and reassuring, helping a worried friend, without sounding sleepy] Take your time. We can work through this together."
}
```

**emotional Arc**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "bf322df2096a46f18c579d0baa36f41d",
  "text": "[nervous, trying to sound composed] I thought the message was gone. [relieved, a small smile in the voice] But you kept a copy. [excited] We can still finish this!"
}
```

**sounds And Pauses**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "c70cfb98867a4bfb9ae20d2401257b92",
  "text": "[sigh] That was a long day. [short pause] Still, we made it. [gentle laugh] Let's get some rest."
}
```

**whisper**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "bf322df2096a46f18c579d0baa36f41d",
  "text": "The lights are still on. <whisper>Someone is waiting inside.</whisper> Let's walk slowly."
}
```

**emphasis**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "bf322df2096a46f18c579d0baa36f41d",
  "text": "We need the <emphasis>original recording</emphasis>, before any effects were added."
}
```

**soft**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "c70cfb98867a4bfb9ae20d2401257b92",
  "text": "You have done enough for today. <soft>Let the room grow quiet.</soft> We will start again tomorrow."
}
```

**fast**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "f3a2b90078d54a65af4b95f63bc7798e",
  "text": "Here is the normal introduction. <fast>Tickets, keys, phone, and we're ready.</fast> Now we can leave."
}
```

**slow**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "bf322df2096a46f18c579d0baa36f41d",
  "text": "Before we continue, remember this: <slow>one step at a time.</slow> There is no rush."
}
```

**stress**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "bf322df2096a46f18c579d0baa36f41d",
  "text": "I said we should call <stress>today</stress>, while the team is still here."
}
```

**forceful**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "bf322df2096a46f18c579d0baa36f41d",
  "text": "The conversation was calm until he said, <forceful>Stop the engine. Right now.</forceful> Then the room went silent."
}
```

**three Speaker Dialogue**

```json
{
  "model": "speech/fish-drama-3",
  "extras": {
    "dialogue": [
      {
        "speaker": "Narrator",
        "voice_id": "c70cfb98867a4bfb9ae20d2401257b92",
        "text": "[measured storyteller] The lighthouse went dark just before sunrise."
      },
      {
        "speaker": "Keeper",
        "voice_id": "bf322df2096a46f18c579d0baa36f41d",
        "text": "[tired but composed] Check the backup power."
      },
      {
        "speaker": "Engineer",
        "voice_id": "f3a2b90078d54a65af4b95f63bc7798e",
        "text": "[fast, concerned] I checked it twice. [short pause] The cable is gone."
      },
      {
        "speaker": "Keeper",
        "voice_id": "bf322df2096a46f18c579d0baa36f41d",
        "text": "[quiet, controlled] Then we find another way."
      }
    ]
  }
}
```

**private Clone**

```json
{
  "model": "speech/fish-drama-3",
  "character_id": "<character UUID from list_characters or clone_voice>",
  "text": "[warm and conversational] Hello. This is my saved voice, reading a new line."
}
```

**cloned And Stock Dialogue**

```json
{
  "model": "speech/fish-drama-3",
  "extras": {
    "dialogue": [
      {
        "speaker": "Host",
        "character_id": "<character UUID from list_characters or clone_voice>",
        "text": "[curious] What should we try first?"
      },
      {
        "speaker": "Guest",
        "voice_id": "c70cfb98867a4bfb9ae20d2401257b92",
        "text": "[bright, enthusiastic] Let's tell a short story."
      },
      {
        "speaker": "Host",
        "character_id": "<character UUID from list_characters or clone_voice>",
        "text": "[amused] All right. You start."
      }
    ]
  }
}
```

**hebrew Stock**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "bacebd1545c74295a5705edeb8999822",
  "text": "[warm and conversational] שָׁלוֹם, אֵיזֶה כֵּיף שֶׁהִצְטָרַפְתֶּם. הַיּוֹם נַתְחִיל בְּרַעְיוֹן קָטָן וְנִרְאֶה לְאָן הוּא לוֹקֵחַ אוֹתָנוּ.",
  "extras": {
    "normalize": false
  }
}
```

**hebrew Niqqud**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "bacebd1545c74295a5705edeb8999822",
  "text": "[calm and friendly] שָׁלוֹם, אֵיזֶה כֵּיף שֶׁהִצְטָרַפְתֶּם. בּוֹאוּ נַתְחִיל בְּרַעְיוֹן קָטָן.",
  "extras": {
    "normalize": false
  }
}
```

**direction In Another Language**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "c70cfb98867a4bfb9ae20d2401257b92",
  "text": "[avec douceur, comme si vous rassuriez un ami] You have plenty of time. We can figure it out together."
}
```

**experimental Language Switch (experimental)**

```json
{
  "model": "speech/fish-drama-3",
  "character_id": "<character UUID from list_characters or clone_voice>",
  "text": "Our guest smiled and said, <french>merci beaucoup</french>. Then we continued in English."
}
```

**english Phonemes**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "bf322df2096a46f18c579d0baa36f41d",
  "text": "Turn up the <|phoneme_start|>B EY1 S<|phoneme_end|> a little, then listen again."
}
```

**inline Pronunciation Dictionary**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "bf322df2096a46f18c579d0baa36f41d",
  "text": "Please turn down the bass before we start recording.",
  "extras": {
    "pronunciation_dictionary": [
      {
        "items": [
          {
            "key": "bass",
            "value": "B EY1 S",
            "case_sensitive": false
          }
        ]
      }
    ]
  }
}
```

**wav For Editing**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "bf322df2096a46f18c579d0baa36f41d",
  "text": "[clear, measured narration] This is the clean narration track for the edit.",
  "extras": {
    "format": "wav",
    "sample_rate": "24000",
    "speed": 0.95
  }
}
```

**lower Variation**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "bf322df2096a46f18c579d0baa36f41d",
  "text": "[calm, professional] Your appointment is confirmed for tomorrow morning.",
  "extras": {
    "temperature": 0.4,
    "top_p": 0.7
  }
}
```

**quality Guard**

```json
{
  "model": "speech/fish-drama-3",
  "voice_id": "bf322df2096a46f18c579d0baa36f41d",
  "text": "[natural, friendly] A small idea is a good place to begin.",
  "extras": {
    "features": [
      "quality-guard"
    ]
  }
}
```

### Pricing and limits

UTF-8 bytes, including inline directions and generated speaker tags, are prorated and rounded up to whole credits. Hebrew, niqqud and other non-ASCII scripts use multiple bytes per character. Estimate the finished request with estimate_generation before a long production.
Request limit: 50,000 UTF-8 bytes.

### Troubleshooting

- If an instruction sounds spoken or is ignored, shorten the bracket direction, place it next to the affected words, and audition a more suitable voice.
- If the output adds words, repeats or continues past the script, review it before delivery. Consider a shorter passage, a simpler direction, lower variation, quality guard or another chosen voice. A new take is a new paid generation; do not automatically resubmit an ambiguous failure.
- For a name or ambiguous word, adjust spelling or a supported phoneme/dictionary entry before replacing a good clone source.
- A language label or matching ASR transcript does not prove native accent, voice identity or a human listening review.

Not exposed: Raw reference audio in generate_speech (use clone_voice); PCM and Opus delivery (MP3 and WAV only); Provider-account pronunciation dictionary references; Streaming playback (finished audio includes native word timestamps when Fish provides valid alignment); Invite-only interactive revision and audio inpainting.

References: https://docs.fish.audio/features/text-to-speech/drama-3 https://docs.fish.audio/api-reference/endpoint/openapi-v1/text-to-speech

## Native word timestamps

Drama 3 uses Fish's timestamped TTS stream. Creative Claw assembles the audio and returns native word timings in the finished result. The audio player highlights words, including right-to-left Hebrew. Fish Hebrew subword fragments are grouped into the original fully vowelized script words using their native time boundaries; no timing is interpolated. If the alignment does not match the script, timing is marked unavailable. No second transcription request is required. Missing or invalid provider alignment leaves the audio playable with `wordTimingsStatus: unavailable`. This is finished-file playback, with no live streaming playback.

## Design or clone a private voice

For a fictional voice, call `design_voice` with `provider: "fish"`, a description of accent, age, timbre, pace and personality, and an audition script of up to 150 characters. Three candidates cost 2 credits total. Start with `guidance_scale: 2`, `instruct_guidance_scale: 0`, `speed: 1`, `num_step: 32`. Add `language_code: "he-IL"` for a fully vowelized Hebrew audition.

```json
{"provider":"fish","prompt":"A warm Israeli woman in her thirties, clear modern Hebrew, relaxed pace and a lightly smiling conversational delivery.","text":"שָׁלוֹם, אֵיזֶה כֵּיף שֶׁאַתֶּם כָּאן. בּוֹאוּ נַתְחִיל בְּסִפּוּר קָטָן.","language_code":"he-IL"}
```

Save the chosen `preview_id` through `manage_character({title, voice_preview_id})`, or use `id` for an existing Character. Fish candidate IDs are temporary, not voice IDs. The saved voice is private and model-specific to `speech/fish-drama-3`, and the Character keeps its other voice options.

For a consenting real speaker, use `clone_voice` with `provider: "fish"` and a private `audio_asset_id`, then speak using the returned `character_id`. Never supply a raw recording URL to `generate_speech`.
