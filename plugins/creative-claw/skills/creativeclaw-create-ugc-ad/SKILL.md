---
name: creativeclaw-create-ugc-ad
description: "Create a scripted creator-style UGC product ad with Creative Claw. Use when the user wants a vertical testimonial, demo, unboxing, problem-solution ad, or social video combining a creator, product, speech, and several shots."
---

# Create UGC Ad

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Create a believable social ad with a clear commercial story while keeping product claims and creator identity accurate. This outcome skill coordinates Characters, planning, images, video, voice, and Film tools.

## Brief and script

1. Use known product, audience, platform, duration, ratio, offer, claims, creator style, and CTA details. Infer minor creative defaults; ask only for missing information that materially changes the ad, rather than presenting this list as a questionnaire.
2. Choose a structure that fits the brief: hook, problem, discovery, demonstration, proof, and CTA. Keep spoken lines conversational and short enough for the intended duration.
3. Treat unverified performance, health, financial, or testimonial claims as claims to remove or qualify, not creative facts.

Write and review the ad in the user's language. Preserve approved product wording, required disclosures, and spoken lines exactly unless the user requests a rewrite or translation.

## Creator and product anchors

- Use `creativeclaw-create-character` for a reusable creator. A new cloned voice requires explicit consent through `creativeclaw-clone-voice`; a stock ElevenLabs voice needs no cloning.
- Use approved product references. For supporting stills or packshots, follow `creativeclaw-product-photoshoot`.
- Maintain the same creator features, wardrobe, product geometry, location logic, and screen direction across shots.

## Plan and produce

1. Use `creativeclaw-plan-video` to approve the script, shot list, and clean storyboard frames before costly generation.
2. Use `create_film_project` for a multi-shot ad, persist shots with `update_film_project`, and honor the script and storyboard approval gates.
3. For separately voiced ads, prepare narration with `creativeclaw-generate-voiceover` first and use its timing to set durations. Then use `creativeclaw-generate-video` for each clip. Default to Gemini Omni; route to Seedance 2.5, Seedance Mini, H3 Max, or H3 Max Fast when their strengths better match the shot.
4. Reuse the prepared narration; use `creativeclaw-generate-music` for requested music and `creativeclaw-generate-sound-effects` for requested SFX. Read [media-assembly.md](references/media-assembly.md) for timing, continuations, and mixing limits.
5. Mux per-shot voice with `merge_media` before assembly when needed. `assemble_film` creates an ordered first cut and can add one project narration track; it does not add captions, transitions, or a full sound mix.

## Review

Check the first three seconds, natural delivery, product visibility, claim accuracy, continuity, audio intelligibility, pacing, safe text areas, and CTA clarity. Save multiple hooks as distinct assets only when requested. Set the Film to final only after approval.
