# Recipe: saved Character to consistent shots

Proposed workflow example. Read [reference production](reference-production.md) and the selected model guide.

Example request: "Use my saved avatar in three shots entering a cafe, sitting down and picking up a cup."

## Reuse identity and prepare the shots

Find the intended Character with list_characters. Resolve its canonical visual and any approved face/body/wardrobe assets; ask which Character only when the match is ambiguous. If none exists, suggest creating a reusable avatar when worthwhile. Do not require a new character sheet for a one-off request with adequate references.

Lock identity, wardrobe, cup design, cafe layout, time of day and screen direction. Create only missing frames. Example image direction:

"Use the approved face portrait as the exact identity and the body view as the exact wardrobe/proportions. Show the same person entering the supplied cafe from the left, wearing the approved jacket. Eye-level medium-wide framing, soft window light from the right. Keep facial asymmetry, hairline and cup design unchanged. One clean frame, no text or collage."

After approval, derive the seated and cup-lift views from the SAME canonical references. Use the previous frame only as a composition cue. Inspect face, hands, sleeve details, cafe geography and physical continuity.

## Choose the video route

For a literal opening, bake identity into each approved frame; pass only image_url and any supported last_frame_url. Do not append identity reference arrays.

For a reference-only Seedance 2.5 shot, keep array order stable. Example mapping: @Image1 identity, @Image2 wardrobe, @Image3 cafe composition. Omit character_id and literal frame fields. Example prompt:

"@Image1 is the exact face and body identity. @Image2 supplies only the jacket and clothing. @Image3 supplies the cafe layout and daylight direction. Five-second continuous medium shot: the same person settles into the chair, reaches for the existing cup and lifts it slightly. Gentle push-in. Preserve face, hair, jacket, cup and background layout. Quiet cafe ambience, no speech. End with the cup held steadily. No cuts, extra people near camera or wardrobe changes."

A composition reference does not guarantee the first frame. For another model, replace the tokens with its syntax, not by changing array order.

## Continuity and voice

Check every shot against canonical anchors, not only against the preceding clip. Watch screen direction and hand/object contact. Separate wardrobe changes into named states rather than overwriting identity.

A Character's voice is not automatically used by native video generation. If speaking is required, choose a supported talking-avatar or audio-reference route; otherwise use the saved clone for separate narration. An audio overlay alone does not synchronize lips. Follow [Review/Auto](review.md), retain per-shot recovery IDs, and revise only the authorized failed portion.
