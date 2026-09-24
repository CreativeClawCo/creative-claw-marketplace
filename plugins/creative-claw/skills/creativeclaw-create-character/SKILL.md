---
name: creativeclaw-create-character
description: Save, inspect or update an existing reusable Creative Claw Character and its visual identity. Use creativeclaw-create-avatar for guided photo-to-avatar and character-sheet creation.
---

# Manage a reusable Character

For guided avatar creation from photos, use $creativeclaw-create-avatar when available. For an existing approved visual or a direct Character update, use this workflow. Read [identity guidance](references/avatars/identity.md) when preparing a new sheet.

1. Find the intended Character with list_characters. Reuse its ID rather than creating a duplicate.
2. Save an approved image with manage_character({ title, description, image_url }); use id plus only changed fields when updating.
3. Keep stable identity in description and temporary scene actions in generation prompts. The record stores one canonical image; retain auxiliary face/body/wardrobe views as named assets.
4. A sheet grid is an identity reference, not a literal video opening. Generate a clean scene frame from approved anchors first, or use ordered model-supported references without conflicting frame fields/character_id.
5. For an optional real voice, use creativeclaw-clone-voice with explicit consent. ElevenLabs and Cartesia clones are supported. Use v2 only for clones, v3 for stock voices, and consider Cartesia for cloned speech. Visual identity does not automatically control native video audio.
6. Replace an existing visual/voice only as requested. Delete a Character only on explicit direction, after identifying the exact record. Verify a requested update with list_characters when useful.

An approved Character is reusable reference data, not a newly trained visual model or guaranteed identity lock.
