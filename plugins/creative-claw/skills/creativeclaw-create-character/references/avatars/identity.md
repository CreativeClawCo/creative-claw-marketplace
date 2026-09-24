# Avatar and character-sheet production

## Input selection

Prefer clear, unfiltered images of the same person with visible facial detail and consistent age/state. A few complementary photos help: frontal or near-frontal face, three-quarter/side, and body/wardrobe if needed. Reject ambiguous identity mixtures, not ordinary phone-camera quality. Ask which person is intended in group photos and exclude other people from the reference role. Use fictional references when the user wants a fictional Character.

Import once and preserve durable source IDs. Select one authoritative face anchor and label the roles of the others. Do not average incompatible haircuts, age states or clothing into a new identity. Missing rear/clothing detail is a creative assumption to resolve if it matters.

## Sheet versus production frames

A sheet is an identity reference, not a cinematic scene. Start with one large clear face portrait plus readable front/body and side/back views as the task needs. Use neutral background, soft even light, consistent scale and one wardrobe/state. Avoid tiny competing faces, text, labels, borders and decorative panels. A conventional headed turnaround is appropriate for design review; do not universally require headless body crops.

Keep a clean high-detail face portrait as a separate asset for close-up or talking-avatar work. Keep front/body views for proportions and wardrobe. Do not feed a contact sheet as a literal opening video frame. To animate, generate a clean scene frame from the approved identity assets first.

## Example image prompt

Adapt roles to the chosen model's exact syntax and available images. For Nano Banana 2, inspect the current tool and model reference mapping before assigning Image 1 and Image 2; do not assume how a primary image combines with extras.

"Create a neutral identity sheet for the same person shown in the face reference. The face reference is authoritative for identity, hairline, natural asymmetry and skin detail. The body reference supplies only proportions and the approved navy jacket. Show one large three-quarter face portrait, a full-body front view and a side/back view with identical identity, wardrobe and proportions. Soft even studio light, plain neutral background, readable separated views, natural skin texture. No beautification, extra people, text, panel labels or cinematic scene. Preserve the supplied person's distinctive features."

Use generate_image with the selected model, a supported aspect ratio/resolution and ordered reference fields. Honor requested final resolution; do not add a paid draft batch automatically. One strong reference can be sufficient; more references must add useful evidence.

## Review and save

Inspect face/eye shape, hairline, skin tone/detail, body proportions, hands, clothing construction and agreement across views. Check that references did not leak another person or background into the sheet. If inspection is unavailable, state that and ask the user to review, not assert verified likeness.

Ask for approval of likeness and canonical state. Make requested corrections against the original identity anchors while preserving the approved master. Save the sheet with manage_character only after approval; keep the portrait and auxiliary views in the asset library with consistent names/tags.

The current Character API stores one canonical image URL, not a list of every reference. Do not invent fields such as reference_images. Keep auxiliary image IDs/URLs in the project or asset records, resolving them when a downstream task needs them. A Character is a reusable record, not a trained model. Voice is optional and has separate consent.

## Production continuity

Derive new poses/scenes from canonical anchors, not only from the last generated result. Keep identity facts stable; version material wardrobe/age/state changes as separate assets. Use character_id only when its implicit image behavior matches the selected operation. A video reference-only request may need explicit ordered identity images and no character_id.

Offer a small consistency test only when requested or agreed as useful, with a finite scope. A pleasing sheet is not proof that every video model will preserve identity.
