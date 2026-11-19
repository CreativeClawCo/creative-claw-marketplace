---
name: creativeclaw-create-character
description: "Save or reuse an approved face, Character sheet, stock or designed voice, or voice-only narrator in Characters. Use to create, inspect or update a named Character and reuse its identity or voice across shots and projects."
---

# Manage a reusable Character

For each Creative Claw tool call that exposes it, pass the optional `skills_used` array with `creativeclaw-create-character`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw-create-character/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.

For guided avatar creation from photos, use creativeclaw-create-avatar when available. For an existing approved visual or a direct Character update, use this workflow. Read [identity guidance](references/avatars/identity.md) when preparing a new sheet.

1. Find the intended Character with list_characters. Reuse its ID rather than creating a duplicate.
2. Save an approved image with `create_character({ title, description, image_url })`; update an existing Character with `update_character` and `id` plus only changed fields.
3. Keep stable identity in description and temporary scene actions in generation prompts. The record stores one canonical image; retain auxiliary face/body/wardrobe views as named assets.
4. A sheet grid is an identity reference, not a literal video opening. Generate a clean keyframe from approved anchors first. In video, `character_id` appends the saved image to `image_urls` as a reference, never a start frame. Use it in reference mode; omit it with `image_url`/`last_frame_url` (the server rejects that mix).
5. For a voice: consenting speaker's recording → creativeclaw-clone-voice (Cartesia by default, or ElevenLabs); description → `design_voice` (three auditions, saved to the same Character); stock → `update_character({ id, voice_model, voice_id })`. Designed ElevenLabs voices speak with v4, Google-designed with `speech/gemini-3.8-flash-tts`, Cartesia clones with Cartesia Sonic, ElevenLabs clones with v2 (steady) or v4 (expressive, dialogue), stock with their saved model. Visual identity does not control native video audio; for speech in video, see [voice in video](references/video/voice-in-video.md).
6. Replace an existing visual/voice only as requested. Delete a Character (`delete_character({ id, confirm: true })`, permanent) only on explicit direction, after identifying the exact record. Older clients without `create_character` or `delete_character`: `manage_character` without `id` creates, and `manage_character({ id, delete: true })` deletes. Verify a requested update with list_characters when useful.

An approved Character is reusable reference data, not a newly trained visual model or guaranteed identity lock.

When the user likes a generated look or voice, offer once to save it as a named Character for future work. Check `list_characters` first. An explicit request to save the look or voice is agreement. Update the existing Character or create one when authorized with the approved image or selected voice. Reuse its ID for later shots or speech. A voice-only Character works for a narrator. If the voice card already saved the selection, reuse that record.
