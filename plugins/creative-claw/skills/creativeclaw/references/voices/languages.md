# Language and dialect routing

This is a routing snapshot from Creative Claw's exposed schemas on 2026-09-22, not a promise of every upstream provider capability. get_model_params is authoritative for the current supported languages, selector names and voice IDs.

Choose language capability first, then a native-accent voice, then delivery. A multilingual model can speak a language without every voice sounding native. Cloned voices can carry the sample's original accent into other languages.

| Request | Starting choice and configuration |
| --- | --- |
| Hebrew | Cartesia with extras.language_code "he" and a Hebrew voice, or v3 with "he". Not v2. |
| Urdu | v3 with extras.language_code "ur" and a native Urdu voice. For requested Roman Urdu, preserve romanization and audition. Haseeb is a useful energetic candidate if returned by the current catalog. Not v2 or current Cartesia. |
| Persian | v3 with "fa"; MiniMax can use top-level language_boost "Persian". Not v2 or current Cartesia. |
| Bengali, Gujarati, Kannada, Malayalam, Marathi, Punjabi, Telugu | Check v3 or Cartesia with the exact returned language code and native voice. Do not choose v2 simply because it supports Hindi. |
| Cantonese | Check MiniMax with top-level language_boost "Chinese,Yue" and a matching voice. |
| Regional Arabic, Spanish or Portuguese | xAI exposes regional codes through extras.language, such as ar-EG, es-MX and pt-BR. Match the requested dialect; otherwise compare the native voice catalog of the selected provider without generating unsolicited paid samples. |
| Mixed languages | Check the selected model's automatic-language behavior. Audition a representative switch and proper names; a forced single-language code may hurt the second language. |

V2's current 29-language set: English, Japanese, Chinese, German, Hindi, French, Korean, Portuguese, Italian, Spanish, Indonesian, Dutch, Turkish, Filipino, Polish, Swedish, Bulgarian, Romanian, Arabic, Czech, Greek, Finnish, Croatian, Malay, Slovak, Danish, Tamil, Ukrainian and Russian.

Language selector differences matter:
- ElevenLabs v2: automatic detection from text, no language_code.
- ElevenLabs v3 and Cartesia: extras.language_code using their own supported codes. Filipino is tl in Cartesia; never assume the enums are identical.
- MiniMax: top-level language_boost with names such as "Hebrew" or "Persian", not ISO codes.
- xAI: extras.language, including regional codes. Current exposed set does not include Hebrew, Persian or Urdu.

Use native script unless the user requests romanization. Preserve approved wording, and audition names, numbers and acronyms. Ask before phonetic rewrites. For an unsupported language, explain the limitation and offer a verified alternative rather than guessing a code.
