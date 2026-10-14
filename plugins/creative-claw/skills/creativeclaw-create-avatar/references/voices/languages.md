# Language and dialect routing

This is a routing snapshot from Creative Claw's exposed schemas on 2026-09-22, not a promise of every upstream provider capability. get_model_params is authoritative for the current supported languages, selector names and voice IDs.

Choose language capability first, then a native-accent voice, then delivery. A multilingual model can speak a language without every voice sounding native. Cloned voices can carry the sample's original accent into other languages.

| Request | Starting choice and configuration |
| --- | --- |
| Hebrew | Stock speech: v4 with extras.language_code "he" and a native Hebrew voice. A Cartesia clone: Cartesia Sonic with "he". An ElevenLabs clone: v4 with "he". Not v2. |
| Urdu | v4 with extras.language_code "ur" and a native Urdu voice. For requested Roman Urdu, preserve romanization and audition. Haseeb is a useful energetic candidate if returned by the current catalog. Not v2 or current Cartesia. |
| Persian | v4 with "fa"; MiniMax can use extras.language_boost "Persian". Not v2 or current Cartesia. |
| Bengali, Gujarati, Kannada, Malayalam, Marathi, Punjabi, Telugu | Check v4 or Cartesia with the exact returned language code and native voice. Do not choose v2 simply because it supports Hindi. |
| Cantonese | Check MiniMax with extras.language_boost "Chinese,Yue" and a matching voice. |
| Regional Arabic, Spanish or Portuguese | xAI exposes regional codes through extras.language, such as ar-EG, es-MX and pt-BR. Match the requested dialect; otherwise compare the native voice catalog of the selected provider without generating unsolicited paid samples. |
| Mixed languages | Check the selected model's automatic-language behavior. Audition a representative switch and proper names; a forced single-language code may hurt the second language. |

V2's current 29-language set: English, Japanese, Chinese, German, Hindi, French, Korean, Portuguese, Italian, Spanish, Indonesian, Dutch, Turkish, Filipino, Polish, Swedish, Bulgarian, Romanian, Arabic, Czech, Greek, Finnish, Croatian, Malay, Slovak, Danish, Tamil, Ukrainian and Russian.

Language selector differences matter:
- ElevenLabs v2: automatic detection from text, no language_code.
- ElevenLabs v4 and Cartesia: extras.language_code using their own supported codes. Filipino is tl in Cartesia; never assume the enums are identical.
- MiniMax: extras.language_boost with names such as "Hebrew" or "Persian", not ISO codes.
- xAI: extras.language, including regional codes. Current exposed set does not include Hebrew, Persian or Urdu.

Use native script unless the user requests romanization. Preserve approved wording, and audition names, numbers and acronyms. Ask before phonetic rewrites. For an unsupported language, explain the limitation and offer a verified alternative rather than guessing a code.

Fish Drama 3 detects language from the transcript. The public Fish catalog has 326 public voices (267 official and 59 pinned community voices) across all 27 catalog languages, including Hebrew stock voices Noa and Itai. `get_model_params` offers a 120-voice shortlist with masculine and feminine choices in each language. Provider language labels do not establish a verified native accent. Use a suitable public voice or a consented clone and audition the target script, using full niqqud on every spoken Hebrew word and `extras.normalize: false`. Preserve the approved wording when adding vowel points. Language-switch tags are experimental on Drama 3. Fish preserves the supplied script and exposes `extras.normalize: false` when needed. Read [Fish guidance](fish.md), with 24 Drama 3 recipes, and current `get_model_params`. Do not send `extras.language` or `extras.language_code`.
