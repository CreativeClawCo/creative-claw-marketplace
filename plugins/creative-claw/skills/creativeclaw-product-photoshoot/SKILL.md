---
name: creativeclaw-product-photoshoot
description: "Create a coherent set of campaign-ready product images with Creative Claw. Use for packshots, ecommerce sets, lifestyle scenes, launch campaigns, or several images that must preserve the same product and brand."
---

# Product Photoshoot

Produce a consistent image set, not a collection of unrelated prompts. The product's geometry, label, color, materials, and brand treatment are the locked anchors.

## Prepare

1. Confirm the channel, audience, aspect ratios, number of deliverables, background requirements, required copy, and product details that must be exact.
2. Use `search_assets` to find existing product references, logos, and campaign assets. Import missing references with the platform upload flow.
3. Call `get_theme` for branded work and identify the usable palette, typography, tone, and logo rules.
4. Write a compact shot list, such as hero, clean packshot, detail macro, in-use lifestyle, scale/context, and campaign variation. Include only shots the user needs.

Conduct the workflow in the user's language and preserve all approved product and campaign copy exactly.

## Generate

1. Default to `image/nano-banana-2` because it is the cost-efficient recommendation for most product work.
2. Escalate to `image/nano-banana-pro`, `image/gpt-image-2`, or `image/seedream-5-pro` only when exact typography, difficult editing, or premium commercial styling materially benefits.
3. Call `list_models({ modality: "image" })` and `get_model_params` before model-specific references or settings.
4. Generate the hero direction first. After approval, derive the rest of the set while repeating the locked product facts and using the approved image as a reference where supported.
5. Use `agentic_prompting: false` for exact label copy, reference tokens, strict placement, or locked campaign instructions.

## Quality control

Compare every image against the source product for silhouette, proportions, cap or closure, logo, label text, materials, colors, and reflections. Also check shadows, contact with surfaces, crop safety, and consistency across the set. Reject attractive images that misrepresent the product.

Tag approved assets consistently with product, campaign, shot type, aspect ratio, and status so video and UGC workflows can reuse them.
