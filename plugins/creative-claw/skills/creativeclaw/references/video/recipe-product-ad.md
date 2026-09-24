# Recipe: product photo to a short ad

Proposed workflow example, not a measured quality guarantee. Use for a requested product ad, not every image-animation task. Read the selected model guide and [reference production](reference-production.md).

## Request and plan

Example request: "Make a 15-second vertical ad for this reusable bottle, with narration and captions." Identify the approved product claim and CTA, avoiding invented testimonials or performance claims. Plan three five-second shots: hero reveal, one real use, closing packshot. If the user only wants a single clip, skip this multi-shot plan.

## Assets and reference generation

Import the supplied product photo once. Treat it as the canonical packaging/geometry reference. If needed, use generate_image to produce one proposed hero frame at 9:16:

"Use the supplied bottle as the exact product reference: preserve its silhouette, cap, label, materials and proportions. Place it upright on a pale stone counter in soft morning side light. Medium product shot with room around the bottle for a later caption. No additional labels, invented markings or decorative text."

Use current image-model reference fields. After creative approval, derive a use frame and closing packshot from the SAME product anchor and approved look. Do not derive every image solely from the previous generated image. Reuse suitable uploaded frames instead of generating extras. Inspect label accuracy and whether the cap/mechanism actually match the product.

For separate narration, generate the approved script first with v3 for stock speech, or v2/Cartesia for a saved clone. Use actual audio duration to adjust the plan. Do not squeeze excessive copy into 15 seconds.

## Video request

Example first-shot prompt for an approved literal start frame:

"Five-second vertical product shot beginning at the supplied frame. The bottle stays upright and unchanged as condensation slowly gathers. A gentle 20-degree camera orbit reveals the existing cap. Soft daylight remains from camera left. Finish on a clean hero angle with a short hold. Quiet room ambience, no speech or music. Preserve product geometry, label and materials. No hands, cuts or new objects."

Use image_url for this literal frame and omit reference arrays/character_id. For a reference-only model route instead, assign product and composition roles using its exact tokens and do not claim an exact first frame. Fetch duration/resolution support before submitting. Follow [Review/Auto](review.md) for each requested shot.

## Finish and inspect

Resolve submitted shots, preserve their IDs and URLs, and assemble only completed clips. Add the approved narration, captions and CTA through supported editing tools; native generation is not a reliable way to render exact small text. Check caption timing, product fidelity, first-three-second clarity and final hold. Report limitations honestly. Offer a focused correction, but do not create additional paid takes without authorization.
