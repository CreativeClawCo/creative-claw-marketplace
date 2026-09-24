---
name: creativeclaw-create-ugc-ad
description: "Create a scripted creator-style UGC product ad with Creative Claw. Use when the user wants a vertical testimonial, demo, unboxing, problem-solution ad, or social video combining a creator, product, speech, and several shots."
---

# Create UGC Ad

Read [video model selection](references/video/index.md), then only the selected model's guide. Model families are covered locally, with live-schema guidance for additional models; do not load every guide or require a sibling model skill. Read [reference production](references/video/reference-production.md) before preparing media and [Review/Auto handling](references/video/review.md) before submission.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Create a believable social ad with a clear commercial story while keeping product claims and creator identity accurate. This outcome skill coordinates Characters, planning, images, video, voice, and Film tools.

## Reference-first production

Strongly recommend image preparation before video: reuse the user's media, develop shot-appropriate references with creativeclaw-generate-image, and prefer at least three complementary images where the video model supports them. Read [image model selection](references/images/index.md) and only the chosen image guide, plus [the reference-first workflow](references/video/reference-production.md) for approval, Character sheets, audio-first control and cross-shot continuity. Existing references count; do not force extra paid assets, exceed model limits or ignore an explicit direct-generation request.

Use the video's Review card as the single approval of its exact references and settings, without a duplicate chat approval. Honor separately requested earlier checkpoints and consent requirements. Review does not gate earlier image/audio charges. For connected clips, reuse stable visual/audio anchors and request dialogue, ambience and effects without independently generated music per shot.

## Choose a production path

Read [UGC production paths](references/video/ugc-paths.md) and choose product-only narration, a visible speaking presenter, or a hands-on demonstration/unboxing. Do not treat these as interchangeable. Use the [product-ad recipe](references/video/recipe-product-ad.md) for an end-to-end example, and use creativeclaw-create-avatar for guided presenter identity creation.

## Brief and script

1. Use known product, audience, platform, duration, ratio, offer, claims, creator style, and CTA details. Infer minor creative defaults; ask only for missing information that materially changes the ad, rather than presenting this list as a questionnaire.
2. Choose a structure that fits the brief: hook, problem, discovery, demonstration, proof, and CTA. Keep spoken lines conversational and short enough for the intended duration.
3. Treat unverified performance, health, financial, or testimonial claims as claims to remove or qualify, not creative facts.

Write and review the ad in the user's language. Preserve approved product wording, required disclosures, and spoken lines exactly unless the user requests a rewrite or translation.

## Creator and product anchors

- Strongly recommend `creativeclaw-create-avatar` and its Character sheet for a new recurring creator; use `creativeclaw-create-character` to maintain an existing identity. A new cloned voice requires explicit consent through `creativeclaw-clone-voice`; a stock ElevenLabs voice needs no cloning.
- Use approved product references. For supporting stills or packshots, follow `creativeclaw-product-photoshoot`.
- Maintain the same creator features, wardrobe, product geometry, location logic, and screen direction across shots.

## Plan and produce

1. Use `creativeclaw-plan-video` to approve the script, shot list, and clean storyboard frames before costly generation.
2. Use `create_film_project` for a multi-shot ad, persist shots with `update_film_project`, and honor the script and storyboard approval gates.
3. For separately voiced ads, prepare narration with `creativeclaw-generate-voiceover` first and use its timing to set durations. Then read the selected local video-model guide and use `generate_video` for each clip, following the packaged input-mode and Review rules. Default to Gemini Omni; route to Seedance 2.5, Seedance Mini, H3 Max, or H3 Max Fast when their strengths better match the shot.
4. Reuse the prepared narration; avoid per-clip generated music and use `creativeclaw-generate-music` only for a requested continuous project-level track and `creativeclaw-generate-sound-effects` for requested SFX. Read [media-assembly.md](references/media-assembly.md) for timing, continuations, and mixing limits.
5. Mux per-shot voice with `merge_media` before assembly when needed. `assemble_film` creates an ordered first cut and can add one project narration track; it does not add captions, transitions, or a full sound mix.

## Review

Check the first three seconds, natural delivery, product visibility, claim accuracy, continuity, audio intelligibility, pacing, safe text areas, and CTA clarity. Save multiple hooks as distinct assets only when requested. Set the Film to final only after approval.
