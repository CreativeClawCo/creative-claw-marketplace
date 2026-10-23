# Kling 4.0 Omni

Use `video/kling-4.0-omni` for new general Kling requests. It replaces Kling v3 Pro and Kling 3.0 Omni in recommendations. Honor explicitly requested legacy models and keep Kling 3.0 Motion Control Pro as a separate performance-transfer option. Gemini Omni remains the general video default; this guide does not change that default.

Read `get_model_params` before committing inputs or pricing. Inspect its Usage and schema together. Generate only when the user has requested production, and follow the existing Review/Auto approval rules.

## Direct a scene

Use subject + action + setting + camera + lighting + pacing + sound. Give every reference a role: identity, product, location, style, motion or camera. Write longer scenes as chronological beats in one prompt, keeping cast, wardrobe and visual style consistent. Name the speaker and language, quote exact dialogue, and describe tone and performance. Fit speech and action to the duration.

- `image_url` is a literal opening frame, not a soft reference. Optional `last_frame_url` defines the destination.
- `image_urls` are ordered appearance/style references, cited as `@Image1`, `@Image2`.
- `video_urls` are ordered motion/camera/pacing references, cited as `@Video1`, `@Video2`. State what to borrow and what comes from the image references.
- `extras.video_mode: "edit"` makes the first video the primary source. Describe the exact change and what should remain. Review identity, timeline and sound; editing does not guarantee unchanged pixels or original audio.
- Advanced `extras.contents` entries use the exact discovered shapes: `element` (frontal image plus 1 to 3 additional views), `video_element`, `preset_element`, `voice`, or ordered `middle_frame` images. Preserve unique custom `id` handles and every `@id` verbatim. A saved Creative Claw Character or ElevenLabs voice ID is not a Kling provider library ID.
- Put middle frames in chronological order and describe timing in the prompt. There is no numeric per-frame timestamp field.

Example: "Keep the runner and outfit from @Image1. Borrow only the tracking-camera motion from @Video1. The runner crosses a sunlit plaza, then turns toward camera and says in English, warmly: 'We made it.' Natural footsteps and plaza ambience, no music."

## Current limits

- Output: 3 to 30 whole seconds, default 5; 720p default or 1080p.
- Ratios: 21:9, 16:9, 9:16, 1:1, adaptive. `auto` is an adaptive alias.
- Up to 15 combined assets, with overlapping caps of 10 image materials/keyframes, five input videos and seven subject elements. At most three elements may be video-based. These limits are not additive allowances.
- All input videos, including nested video elements, share a 30-second duration budget. Select the useful interval and use the normal video cuts flow before submission when a source is too long.
- A video element must show a realistic person: MP4/MOV, 3 to 8 seconds, 1920×1080 or 1080×1920, up to 200 MB. Its recorded speech can guide vocal identity.
- Element photos: JPG/PNG, up to 10 MB per image, at least 300 pixels on each side, aspect ratio 0.4 to 2.5. A frontal view plus 1 to 3 additional views.
- Prompt: up to 26,000 characters; also observe the model's 8,000-token limit.
- Native audio is always generated. No `generate_audio` switch, standalone `audio_urls`, seed, negative prompt, CFG, `multi_prompt`, 4K/HDR or extension control. Do not borrow those fields from older Kling models or the Kling website.

Native speech is documented for Chinese, English, Japanese, Korean, Spanish, Portuguese, German, French and Hindi. Hebrew and other unverified languages need the [spoken-language workflow](spoken-languages.md) when exact speech matters. Known Kling voice IDs or speaking video elements guide identity; they are not supplied-audio lip sync.

## Estimate with the actual inputs

Text/image inputs: 31.4 credits per output second at 720p or 47 at 1080p, rounded up once per job. Five seconds is 157/235 credits. Requires a first credit purchase.

Video inputs use different billing. Reserve billed seconds = output + max(output, measured combined input-video seconds), counting every video element after cuts. Rate: 18.8 credits per billed second at 720p or 28.2 at 1080p. Final credits follow settled usage within the approved reserve. Use `estimate_generation` with the same inputs and cuts as generation; do not quote the text-only rate for a video-reference request.

Pricing and availability are live facts. Refresh through tools instead of relying on this snapshot.
