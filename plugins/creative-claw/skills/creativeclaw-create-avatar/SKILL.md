---
name: creativeclaw-create-avatar
description: Create a reusable personal avatar or fictional Character from photos or a brief, generate and approve a consistent character sheet, save it in Characters, and optionally attach a consented cloned voice.
---

# Create your avatar

Use this for a reusable identity, not an ordinary one-off portrait. Read [shared execution guidance](references/workflow-basics.md), [upload routing](references/platform-upload.md), and [avatar and character-sheet production](references/avatars/identity.md).

## Create and save

1. Search list_characters for an existing match. Reuse its ID when updating the same avatar; do not create duplicates.
2. For a personal avatar, ask for a few clear photos, ideally a front face, three-quarter/side view and useful body/wardrobe view. Use available photos if sufficient; do not demand a fixed count or invent unseen personal details. For a fictional Character, use the approved brief instead.
3. Import attached/local photos using the appropriate client route. Choose the strongest face anchor and assign other photos explicit identity, proportions or wardrobe roles.
4. Use generate_image and current model parameters to create one consistent character-sheet direction. The identity reference explains layout and prompting. Preserve approved likeness rather than beautifying or redesigning the person.
5. Show the completed sheet and ask for likeness/canonical-state approval before saving it as the Character visual. Honor approval already given for that exact result.
6. Save using manage_character({ title, description, image_url }) or id plus changed fields for an existing Character. The description records stable appearance, not a temporary scene. Save the approved sheet as the canonical image and retain a clean face portrait and other views as named assets for downstream use.
7. Return the saved Character ID/name and explain that future requests can name it. State what was saved and any likeness limitations. Do not claim a trained visual identity model or guaranteed consistency.

## Optional voice

If the user also wants their voice, load $creativeclaw-clone-voice when available or use the packaged [complete cloning workflow](references/voices/cloning.md). Guide at least one minute of clean recording, private upload, explicit speaker consent, cloning and a short audition. Attach it to the SAME character_id.

Recommend ElevenLabs v2 only for cloned speech in its supported languages, or Cartesia for fast natural cloned speech. Use v3 for stock voices and for an existing ElevenLabs clone needing expression or broader language support. Read the selected [v2](references/voices/elevenlabs-v2.md), [v3](references/voices/elevenlabs-v3.md), or [Cartesia](references/voices/cartesia.md) guide and [language routing](references/voices/languages.md).

Cloning saves the voice automatically. Replacing a source invalidates existing provider copies and requires explicit replacement direction. Never infer voice-cloning permission from photos, uploads or avatar creation.

## Reuse

For identity-guided images, resolve the sheet/portrait into the selected model's supported reference fields. For video, build approved identity into clean shot frames, or use a supported reference-only route. A sheet grid must not accidentally become literal frame zero. character_id may supply an implicit start image, so omit it when using reference arrays on incompatible routes.

Visual and voice reuse are separate: a Character ID does not guarantee native video dialogue in the saved voice. Use a supported audio-driven presenter route or separate narration when required.
