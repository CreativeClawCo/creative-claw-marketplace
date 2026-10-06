# UGC production paths

Choose by what the user wants on screen. These are references within Create UGC Ad, not separate tools. Preserve approved claims and disclosures; never invent customer experience or testimonials.

## Product-only with off-camera narration

Use when no visible speaker is needed. Start with approved product images, then follow [product-ad recipe](recipe-product-ad.md). Generate speech first when it determines pacing, with the model that matches the voice: stock → its saved model (v4 by default), designed ElevenLabs → v4, Google-designed → `speech/gemini-3.8-flash-tts`, Cartesia clone → `speech/cartesia-sonic`, ElevenLabs clone → v2 (steady) or v4 (expressive, dialogue). Match product visibility and demonstrations to the words. Add captions through editing, not generated label text. There is no lip-sync requirement.

## Visible speaking presenter

Check the requested spoken language in `get_model_params` before selecting native dialogue. For unsupported or unverified languages, use [spoken languages](spoken-languages.md), preserving the user's requested single-shot or multi-shot scope. Documented languages retain the normal voice paths below.

First establish or reuse an approved avatar. Use a clean face image, not a labeled character-sheet grid as literal frame zero. Pick the voice path per speaking shot from [voice in video](voice-in-video.md):
- Native dialogue (path A): quick one-offs. Quote the exact short line and name the speaker. The model invents the voice; a saved Character visual does not bring its voice.
- Exact or recurring voice (path B): speech first from the saved Character voice, then a supported audio-reference model with output review, `video/sync-3` on a finished clip, or H3 Max Lip Sync / HeyGen Avatar 4 for a single talking head. Never pass a private cloning sample as final narration.
- Voiceover with no visible speech (path C): laying audio over talking footage does not create lip-sync.

Read the selected model's guide for face/audio inputs and reference-mode exceptions. Keep speech to at most 2.5 words per clip second. Inspect lip movement, pronunciation, expression and likeness. If the model cannot support the intended voice/language, explain and propose a supported path before spending.

## Demonstration or unboxing

Establish actual product construction, packaging, opening mechanism and hand interaction from supplied evidence. Ask for a useful detail photo or source video when a missing mechanism would otherwise be invented. Prefer short concrete steps: intact package, opening, removal, use. Maintain the same product and hand/wardrobe references across stages.

Prompt each action with physical contact and an end state: "The right hand grips the existing pull tab, lifts the lid on its rear hinge, and stops with the lid open; the product remains in its insert." Do not use cinematic adjectives as a substitute for mechanics. A driving video may teach motion without transferring its actor or product; state reference roles explicitly.

Use off-camera narration unless visible speech is requested. Check finger count, grasp/contact, product scale, packaging continuity and truthful claims. No extra product pieces, impossible assembly or invented results. If a step fails, propose a local correction, not an automatic full rerender.
