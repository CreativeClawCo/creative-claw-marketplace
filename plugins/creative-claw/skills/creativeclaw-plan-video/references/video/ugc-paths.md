# UGC production paths

Choose by what the user wants on screen. These are references within Create UGC Ad, not separate tools. Preserve approved claims and disclosures; never invent customer experience or testimonials.

## Product-only with off-camera narration

Use when no visible speaker is needed. Start with approved product images, then follow [product-ad recipe](recipe-product-ad.md). Generate speech first when it determines pacing: v3 for stock voices, v2 only for a saved clone, or Cartesia as a recommended clone option. Match product visibility and demonstrations to the words. Add captions through editing, not generated label text. There is no lip-sync requirement.

## Visible speaking presenter

First establish or reuse an approved avatar. Use a clean face image, not a labeled character-sheet grid as literal frame zero. Separate three choices:
- Native model dialogue: verify language and audio support; quote the exact short line and identify the speaker. A saved Character visual does not automatically activate its voice.
- Finished cloned speech driving a talking avatar: generate approved audio with the saved character_id, then use a video model that explicitly accepts that audio. For HeyGen Avatar 4, consult current get_model_params for the model-specific audio_url placement; it overrides its prompt/voice synthesis. Do not pass a private cloning sample as final narration.
- Speech used only as a background voiceover: suitable when the presenter is not visibly speaking. Muxing audio onto talking footage does not create lip-sync.

Read the selected model's guide for face/audio inputs and reference-mode exceptions. Keep speech short enough for natural timing. Inspect lip movement, pronunciation, expression and likeness. If the model cannot support the intended voice/language, explain and propose a supported path before spending.

## Demonstration or unboxing

Establish actual product construction, packaging, opening mechanism and hand interaction from supplied evidence. Ask for a useful detail photo or source video when a missing mechanism would otherwise be invented. Prefer short concrete steps: intact package, opening, removal, use. Maintain the same product and hand/wardrobe references across stages.

Prompt each action with physical contact and an end state: "The right hand grips the existing pull tab, lifts the lid on its rear hinge, and stops with the lid open; the product remains in its insert." Do not use cinematic adjectives as a substitute for mechanics. A driving video may teach motion without transferring its actor or product; state reference roles explicitly.

Use off-camera narration unless visible speech is requested. Check finger count, grasp/contact, product scale, packaging continuity and truthful claims. No extra product pieces, impossible assembly or invented results. If a step fails, propose a local correction, not an automatic full rerender.
