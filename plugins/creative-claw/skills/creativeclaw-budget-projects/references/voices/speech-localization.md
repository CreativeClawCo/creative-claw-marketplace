# Speech localization and pronunciation

Apply this guidance to text that will actually be spoken by `generate_speech`, each `extras.dialogue[].text`, and the audition `text` of `design_voice`. It also applies to short clone tests and narration prepared for a video. Audio-only voice conversion has no text to vocalize.

## Hebrew: full niqqud on every spoken word

Always fully vocalize every spoken Hebrew word before sending text to any speech provider. This is the Creative Claw workflow requirement for Hebrew, including ElevenLabs, Cartesia, Google, Fish, MiniMax and HeyGen whenever the selected model supports Hebrew. It is not limited to Fish or to difficult words. Ordinary sentence punctuation does not replace niqqud.

- Add contextually correct vowel points throughout the entire Hebrew passage, including names, short words and attached prefixes. Preserve supplied niqqud and explicit pronunciation directions; resolve conflicts with the intended reading before generation.
- Keep the user's words, spelling, word order and meaning. Adding niqqud is speech preparation and needs no separate approval. Do not translate, paraphrase or replace the text with transliteration to avoid vocalizing it.
- Resolve readings from sentence context, grammatical gender, number and the requested dialect. If a name or word still has materially different plausible pronunciations, ask one focused pronunciation question before submitting that passage. Do not silently invent a reading.
- Apply the same rule to every Hebrew span in mixed-language text and to every dialogue turn or chunk. Keep non-Hebrew words in their original script unless the user supplied a different spoken form.
- Use natural sentence punctuation for pauses and intonation as well as niqqud. Preserve question and exclamation meaning. Add delivery tags only in the selected model's supported syntax; keep non-spoken directions separate from the Hebrew words.

Example of preparing the same words for speech:

```text
Original: שלום, תודה שבאתם.
Speech text: שָׁלוֹם, תּוֹדָה שֶׁבָּאתֶם.
```

Before calling a tool, inspect the final payload itself: every Hebrew word in `text`, each dialogue turn and each audition must be fully vowelized. A language code, a prompt asking for correct pronunciation or a few pointed sample words does not fulfill this requirement.

Pass only the selected model's exposed settings. For Fish, retain `extras.normalize: false` when sending fully vowelized Hebrew. Do not copy that setting to other providers unless their current schema supports it. Niqqud does not add Hebrew support to a model that lacks it. If a route rejects the vowelized text, explain the incompatibility and offer a verified compatible route; do not silently strip the marks or switch the user's chosen model.

Niqqud is for the speech payload. Keep captions, transcripts and other displayed copy in the form the user requested. Do not claim vowel points guarantee a native accent or perfect pronunciation. Review the actual audio when inspection is available; another paid take still needs the user's request.

## Other languages and mixed scripts

Use the intended spoken language and regional accent, independently of the chat language. Preserve native spelling, accents and pronunciation-bearing diacritics. Keep requested romanization intact. Do not apply Hebrew niqqud to other scripts or invent a universal rule requiring optional vowel marks in every language.

Resolve names, abbreviations, dates and numbers according to the requested locale and context. Ask about materially ambiguous readings rather than changing approved wording. Use phonemes, pronunciation dictionaries or language selectors only when the selected model's current schema exposes them, with that model's own syntax. A language label alone does not establish a native accent.
