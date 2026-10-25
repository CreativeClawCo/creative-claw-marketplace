# Fixing a mispronounced word

IPA and phoneme spelling are a repair tool, not a default. Never add them to a script up front, and never to a whole line.

## The order to work in

1. **Write the script normally.** Give every Hebrew word full niqqud, as [speech localization](speech-localization.md) requires. Keep acronyms, brands and English words in Latin letters as they are normally written: "AI", not אֵיי-אַיי (v4 read that as "aa").
2. **Generate and check.** Run `transcribe` on the take (see Check the take below). Ask the user to listen when stress or accent matters.
3. **Only if a word comes out wrong, fix that word.** Try spelling first: correct the niqqud (מִסּוֹכֵן fixed מסוכן being read as "dangerous"). If that is not enough, replace only that word with the selected model's phonetic syntax from the table below. If the model has no phonetic input, respell the word, or speak that line with ElevenLabs v4.
4. **Keep a fix that worked.** Once the user approves it by ear, offer to save it as a saved pronunciation (below) so every later take uses it automatically. Otherwise reuse the same spelling of that word for the rest of the project, on the same model and voice.

Use IPA up front only when the user asks for it or supplies it, and only on a model that decodes it.

## What phonetic spelling can fix

- **An acronym read as a word or as the wrong letters.**
- **Stress on the wrong syllable.** Niqqud cannot mark stress, so a colloquial first-syllable stress such as SAF-ta for סַבְתָּא may come out as saf-TA.
- **A homograph read with the wrong meaning** after its niqqud was corrected.
- **A loanword, brand or name** read with the wrong language's rules.

## Syntax per speech model

| Model | Phonetic input | Syntax | Fallback |
| --- | --- | --- | --- |
| `speech/elevenlabs-v4` | Inline IPA, documented | `/ˈtʃɒklət/` between slashes, inside any language's text. Use ˈ (primary) and ˌ (secondary) stress marks. | Niqqud, then a phonetic respelling. |
| `speech/elevenlabs-v3` (legacy) | Inline IPA, documented but weaker | Same slashes. | Move to v4. |
| `speech/elevenlabs-v2` | None | Slashed IPA is read out as letters. SSML `<phoneme>` is not supported on Multilingual v2 and is rejected here. | Respell the word as it sounds, or speak that line with v4. |
| `speech/cartesia-sonic` | Cartesia phonemes, documented | Double angle brackets, symbols separated by bars (example below). English (General American) symbols only. Slashed IPA does not work. Inside Hebrew, a word approximated with English symbols (שוקולד) sounded right, but AI came out as "AY". | Respell the word. For an acronym in a Hebrew line, use v4. |
| `speech/fish-drama-3` | Fish phoneme tags, documented | English: CMU ARPABET in phoneme tags (example below). Chinese uses pinyin and Japanese uses romaji. | Respell, or use `extras.pronunciation_dictionary` for a recurring word. |
| `speech/gemini-3.8-flash-tts` | Not documented | Slashed IPA was decoded in English and inside Hebrew in testing and sounded right by ear, but Google documents no phoneme input. | Respell, or use extras.style to describe the reading. |
| `speech/heygen-voice-1` | None | Slashed IPA is read aloud ("slash…"). Never send IPA. | Respell the word as it sounds. |

Exact syntax, copied as written:

```text
ElevenLabs v4:  The secret ingredient is /ˈtʃɒklət/.
Cartesia Sonic: The secret ingredient is <<ˈ|tʃ|ɑ|k|l|ə|t>>.
Fish Drama 3:   The secret ingredient is <|phoneme_start|>CH AA1 K L AH0 T<|phoneme_end|>.
```

Cartesia: one `<< >>` block per word, every symbol separated by a bar, and one ˈ in every word, placed before the stressed syllable's first consonant. Diphthongs and affricates (eɪ, aɪ, oʊ, tʃ, dʒ) count as one symbol. Only its 41 English symbols are valid: p b t d k ɡ tʃ dʒ f v θ ð s z ʃ ʒ h m n ŋ l ɹ j w, i ɪ ɛ æ ɑ ɔ ʊ u ə ɝ eɪ aɪ ɔɪ aʊ oʊ, ˈ ˌ. Any other symbol (Hebrew χ or ʁ, plain r or g) invalidates the pronunciation. Fish: one word per tag, stress digits 1 (primary), 2 (secondary), 0 (unstressed).

Fish also decoded slashed IPA in English and Hebrew testing, and the Hebrew take sounded right by ear. Fish documents that IPA is not supported, so use ARPABET for English and treat slashes as untested in production.

## How to write the IPA

- Transcribe the intended spoken form, not the spelling. For Israeli Hebrew, ח and כ without dagesh are /χ/ and ר is /ʁ/. Examples: סַבְתָּא `/ˈsafta/`, שׁוֹקוֹלָד `/ʃokoˈlad/`, חָבֵר `/χaˈveʁ/`.
- Put one primary stress mark before the stressed syllable. Moving it changes the read: in a v4 A/B listening test, the stress was heard on exactly the syllable the mark preceded.
- Write a failing acronym letter by letter: AI is `/eɪ aɪ/`. Plain Latin capitals ("AI", "A.I.") already work on v4, so try them first.
- Keep Hebrew prefixes in Hebrew and put only the word in IPA: `וְהַ/eɪ aɪ/`.
- Use the same transcription every time the word repeats.

## Saved pronunciations

A saved pronunciation is a workspace rule: every later `generate_speech` call on that engine family swaps the word for the approved fix before generating. Save only a fix the user approved after hearing it, never an experiment.

- Save: `add_speech_pronunciations({ entries: [{ family, language, term, replacement, variants }] })`. `family` is the engine the fix was tested on: `elevenlabs` covers v2, v3 and v4, and `cartesia`, `fish` and `google` are separate. `term` is the word or phrase as the user normally writes it. `replacement` is exactly the text that worked, in that model's syntax from the table above. Saving the same term again replaces it.
- Hebrew: save the term without niqqud. It then matches the word with any niqqud, so the fully vowelized script still triggers it. A prefixed form is a different word: add והדקו or שהדקו as `variants` if the script uses them. Save a pointed term only to keep a homograph apart; it matches only that pointing and beats the plain rule.
- Rules never cross families. An ElevenLabs IPA rule does nothing on Cartesia; save a separate Cartesia `<< >>` rule only after testing it there.
- Rules apply automatically, so do not also write the fix into the script. To hear the model without saved rules, for example to retest a word, set top-level `apply_saved_pronunciations: false`.
- The result's `pronunciationReplacements` lists every swap made. The transcript, word timings and captions keep the original words. Tell the user when a saved rule was used.
- Inspect with `list_speech_pronunciations({ family, language })` and remove with `delete_speech_pronunciations({ ids })`. Past recordings keep the rules they were made with. If a saved rule misreads the word in a new context, offer to delete it or bypass it for that take.

## Check the take

Transcribe with `transcribe` and the right `language_code`. If you see "slash", spelled-out symbols or a nonsense word, the model did not decode the IPA. Remove it and use the fallback. A clean transcript proves the word was recognized, not that the stress or accent is right. In a 22-take review, the listener agreed with Scribe on every word it caught or missed, so trust a Scribe miss without a second listen; the ear was needed only for stress. Ask the user to judge stress, homographs and accent by ear. IPA is probabilistic and can vary by voice, so audition before a long script.

For sung lyrics, read the music skill's pronunciation guidance. No music model documents IPA input.
