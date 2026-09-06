---
name: creativeclaw-create-character
description: "Create or update a reusable Creative Claw Character with a visual reference and optional consented ElevenLabs voice. Use when the user wants consistent identity across future images, videos, or speech."
---

# Create Character

Create a durable identity record that can be reused across Creative Claw generation. A Character stores a description, one canonical image, and optionally a consented ElevenLabs cloned voice; it is not a newly trained visual model.

## Workflow

1. Check `list_characters` for an existing match before creating a duplicate.
2. Define the identity sheet: name, role, age range, face, hair, build, wardrobe anchors, distinctive details, speaking style, and traits that must not drift.
3. Obtain a clean canonical portrait. Use a supplied reference, or generate and approve one with `creativeclaw-generate-image` before saving it.
4. Call `manage_character({ title, description, image_url })`. Omit `id` to create; keep the description visual and stable rather than scene-specific.
5. If the user wants a reusable custom voice, route to `creativeclaw-clone-voice`. Require explicit consent and a suitable voice sample before calling `clone_voice`.
6. Run a low-cost image or voice audition if the Character will anchor a larger production. Update the record only with approved changes.

## Visual consistency

- Use the canonical Character image for identity and create separate wardrobe, pose, or environment references as ordinary assets.
- Passing `character_id` to `generate_image` or `generate_video` uses the saved visual when no primary image is supplied. When a storyboard or product shot already occupies `image_url`, do not assume the Character image is also included; pass it through a supported reference array when the selected model allows it.
- Keep identity facts constant and put scene actions, camera, lighting, and temporary wardrobe in the generation prompt.

## Voice consistency and consent

A Character may use a stock voice without cloning. If cloning is requested, explain that Creative Claw uses ElevenLabs Instant Voice Cloning, confirm the speaker's permission, and use only the provided consented sample. Never infer consent from possession of a recording.

## Update and delete

Use `manage_character({ id, ...fields })` for deliberate identity changes. Use `delete_character` only on an explicit deletion request, after confirming the exact Character. Use `list_characters` after mutation when verification is useful.
