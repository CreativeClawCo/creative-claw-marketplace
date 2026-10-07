---
name: creativeclaw-create-character
description: Save, inspect or update an existing reusable Creative Claw Character and its visual identity. Use creativeclaw-create-avatar for guided photo-to-avatar and character-sheet creation.
---

# Manage a reusable Character

For each Creative Claw tool call that exposes it, pass the optional `skills_used` array with `creativeclaw-create-character`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw-create-character/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

For guided avatar creation from photos, use creativeclaw-create-avatar when available. For an existing approved visual or a direct Character update, use this workflow. Read [identity guidance](references/avatars/identity.md) when preparing a new sheet.

1. Find the intended Character with list_characters. Reuse its ID rather than creating a duplicate.
2. Save an approved image with manage_character({ title, description, image_url }); use id plus only changed fields when updating.
3. Keep stable identity in description and temporary scene actions in generation prompts. The record stores one canonical image; retain auxiliary face/body/wardrobe views as named assets.
4. A sheet grid is an identity reference, not a literal video opening. Generate a clean keyframe from approved anchors first. In video, `character_id` appends the saved image to `image_urls` as a reference, never a start frame. Use it in reference mode; omit it with `image_url`/`last_frame_url` (the server rejects that mix).
5. For a voice: consenting speaker's recording → creativeclaw-clone-voice (Cartesia by default, or ElevenLabs); description → `design_voice` (three auditions, saved to the same Character); stock → `manage_character({ id, voice_model, voice_id })`. Designed ElevenLabs voices speak with v4, Google-designed with `speech/gemini-3.8-flash-tts`, Cartesia clones with Cartesia Sonic, ElevenLabs clones with v2 (steady) or v4 (expressive, dialogue), stock with their saved model. Visual identity does not control native video audio; for speech in video, see [voice in video](references/video/voice-in-video.md).
6. Replace an existing visual/voice only as requested. Delete a Character (`manage_character({ id, delete: true })`, permanent) only on explicit direction, after identifying the exact record. Verify a requested update with list_characters when useful.

An approved Character is reusable reference data, not a newly trained visual model or guaranteed identity lock.
