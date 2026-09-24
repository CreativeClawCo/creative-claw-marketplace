# Reference-first video production

Strongly recommend preparing and reviewing images before any generative video job, including an initial text-to-video brief. Explain that still images usually offer faster, lower-cost iteration on identity, product fidelity and composition than repeated video takes; this is a workflow recommendation, not a price or quality guarantee. Offer this path clearly, but honor an explicit request to skip stills, reuse ready assets or stay within a budget.

## Prepare the visual reference set

1. Inspect and import media the user refers to, including supplied photos, saved assets and relevant frames from existing video. Use that media as a source/reference for generate_image when adapting it into a shot-appropriate reference. Preserve its intended identity, product, setting or style instead of generating an unrelated replacement. Reuse suitable approved references unchanged.
2. Follow creativeclaw-generate-image when available. For a standalone video package, read the [image model index](../images/index.md), load only the selected guide, inspect get_model_params, and call generate_image with explicit source roles and preservation instructions.
3. Prefer at least three complementary images per video request when the selected model and operation support them: for example an identity/product anchor, environment/composition, and a second useful angle or detail. These may include existing assets; three references does not mean three newly paid images. Do not duplicate images to reach a count or exceed a model's limit. For fewer supported references, select the strongest set and explain the constraint.
4. Start with one proposed visual direction, then derive complementary views from the SAME canonical anchors and chosen look. Avoid chains where each generation inherits only the preceding generated frame. Keep an ordered manifest of asset IDs/URLs, roles, shot and model tokens.
5. Strongly recommend a reusable Character sheet when identity recurs. Reuse an approved sheet or follow creativeclaw-create-avatar to create and save one. Use a readable face and useful body/wardrobe views. Feed the sheet as identity guidance into image generation and supported reference-guided video; do not treat its grid as a literal opening frame.
6. Inspect face, proportions, wardrobe, product geometry, lighting, geography and planned state changes. Keep clean individual shot images separate from labeled storyboard grids.

Before paid image preparation, make the proposed scope clear and ensure the extra assets are authorized. A request for video does not automatically authorize unlimited supporting images. Review mode for video does not gate or make earlier image/audio generation free. Keep image iteration bounded; planning-only, advice-only and estimate-only requests do not authorize paid references.

## Review the references once

Show the proposed references and their roles before video submission. In Review mode, the video's request card is the approval checkpoint for the exact included references, prompt and settings. Do not also require a chat confirmation of the same set. Prepare the request and pause on approval_required until the user presses Generate. Do not call references approved before that action.

If the user explicitly asks to approve the first image before making more, honor that earlier checkpoint. Character likeness approval before saving an identity and voice-cloning consent are separate decisions, not replaced by video Review. In Auto mode, obtain reference approval unless those references are already approved or the user explicitly authorized proceeding without that checkpoint. Do not change the user's render mode.

## Prefer reference conditioning, not accidental frame zero

- Default to ordered image_urls for identity, product, wardrobe, environment, style or composition references, even with one image. The field is image_urls, not images_url.
- Use image_url only when the supplied image really must be the literal opening frame. Bake the approved identity and product into that clean frame. Use last_frame_url only if supported and needed.
- For standard generation, do not mix literal frame fields with reference arrays. A reference-only request should omit character_id when it would inject an implicit start frame. Use a mixed-input exception only when the current exposed operation explicitly supports it.
- Use video_urls deliberately for source editing, motion/camera guidance or continuity. Identify what to borrow and what to preserve. A source edit may not support extra image references: do not force an incompatible three-image recipe or replace original footage to satisfy it.

A saved character_id does not automatically add identity beside an explicit start frame or select its saved voice for native video audio. Resolve the canonical image and use it in the supported input route.

## Audio-first control and continuity

When voice identity, exact speech, pronunciation, delivery or timing matters, strongly recommend generating or reusing the intended audio BEFORE video. Use creativeclaw-generate-voiceover and its selected model guide when available; otherwise inspect the speech model's current parameters. Use v3 for stock speech, v2 only for saved clones, and recommend Cartesia for clones too. Cloning requires its own explicit consent.

When a requested musical performance or music-led single clip needs audio conditioning, prepare or reuse the intended music first. Pass audio_urls only where the selected video operation supports it, with explicit timing/delivery roles. Match audio length and reference limits to that operation. Audio conditioning does not guarantee exact words, clone identity or lip sync. For exact delivery, prefer a supported audio-driven presenter or preserve the prepared track through a supported final audio assembly.

For multiple clips intended to connect, require a shared continuity plan and consistent approved reference anchors before rendering. Reuse the same Character/product/location references for recurring elements, with explicit planned state changes. Reuse the same voice, recording settings and ambience reference where supported. Do not force an audio input into a model that does not accept one.

Avoid independently generated background music in each shot. Prompt for only the required dialogue, ambience and sound effects, explicitly excluding music. Do not create a music track merely because the deliverable is a film. If the user wants a score or song, reuse or create ONE continuous project-level track and add it during supported assembly, rather than generating a different score in every clip. Preserve supplied music when requested. Inspect audio boundaries and disclose mixing limits.

## Prompt and deliver

Load the selected video model guide for exact tokens. Preserve reference order, quoted dialogue and approved constraints. Describe chronological action, one main camera move, environmental motion, required audio and a plausible ending. Fetch current get_model_params for limits and field placement.

After applicable reference approval, use generate_video within the authorized shot count. Follow [Review/Auto](review.md). Inspect output and continuity before assembly; do not claim to have watched unavailable media. Another paid take needs authorization, even after a failed or refunded job.
