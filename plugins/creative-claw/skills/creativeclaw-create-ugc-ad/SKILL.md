---
name: creativeclaw-create-ugc-ad
description: "Create a scripted creator-style UGC product ad with Creative Claw. Use when the user wants a vertical testimonial, demo, unboxing, problem-solution ad, or social video combining a creator, product, speech, and several shots."
---

# Create UGC Ad

Read [video model selection](references/video/index.md), then only the selected model's guide. Model families are covered locally, with live-schema guidance for additional models; do not load every guide or require a sibling model skill. Read [Review/Auto handling](references/video/review.md) before submission.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Create a believable social ad with a clear commercial story while keeping product claims and creator identity accurate. This outcome skill coordinates Characters, planning, images, video, voice, and Film tools.

## Reference-first pipeline

Unless the user asked for direct text-to-video, supplied a ready shot image, or is editing footage, follow this before `generate_video`. New clips start from one keyframe image per shot: tell the user how many images that is before making them.

1. Anchors, reuse first: `search_assets`, `list_characters`, `get_theme`. Person: Character sheet + face portrait (real person: also their best original photo). Product: real photo or packshot, plus a label/logo close-up when text matters. A recurring person or product with no anchor: create it first (creativeclaw-create-avatar, creativeclaw-product-photoshoot).
2. Look line: one sentence (palette, light, lens, medium), pasted into every keyframe and video prompt.
3. Keyframe per shot: `generate_image` with the same image model all project (default `image/nano-banana-2`), `aspect_ratio` = the video's ratio, main anchor in `image_url`, others in `extras.image_urls`, roles named. One clean full-bleed frame; no text, grid or labels.
4. Compare it to the anchors (face, label, logo, colors); fix with one targeted edit.
5. Show keyframes and the plan (model, duration, ratio) in one message. Review mode: call `generate_video` now; the card is the approval. Auto: ask once unless the user said go.
6. One mode per shot. People, several subjects or big motion: `image_urls` = [keyframe, identity anchor, product anchor], 2–4 total; `character_id` is fine here. Exact opening (product hero, logo reveal): `image_url` = keyframe, no `image_urls` or `character_id`.
7. Next shot: same anchors and look line. A previous clip's last frame is only an extra composition cue.

Details: [reference production](references/video/reference-production.md). Image prompting: [image model index](references/images/index.md) and only the chosen guide.

## Choose a production path

Read [UGC production paths](references/video/ugc-paths.md) and choose product-only narration, a visible speaking presenter, or a hands-on demonstration/unboxing. Do not treat these as interchangeable. Use the [product-ad recipe](references/video/recipe-product-ad.md) for an end-to-end example, and use creativeclaw-create-avatar for guided presenter identity creation.

## Brief and script

1. Use known product, audience, platform, duration, ratio, offer, claims, creator style, and CTA details. Infer minor creative defaults; ask only for missing information that materially changes the ad, rather than presenting this list as a questionnaire.
2. Choose a structure that fits the brief: hook, problem, discovery, demonstration, proof, and CTA. Keep spoken lines conversational: at most 2.5 words per clip second, with about 0.5 s of air at each end.
3. Treat unverified performance, health, financial, or testimonial claims as claims to remove or qualify, not creative facts.

Write and review the ad in the user's language. Preserve approved product wording, required disclosures, and spoken lines exactly unless the user requests a rewrite or translation.

## Creator and product anchors

- Strongly recommend `creativeclaw-create-avatar` and its Character sheet for a new recurring creator; use `creativeclaw-create-character` to maintain an existing identity.
- When a Character speaks and the voice is unknown, ask one question: design a new voice from a description (`design_voice`, three auditions), use your own voice (recording plus consent, creativeclaw-clone-voice), or pick a stock voice. If the voice doesn't matter, pick a stock voice and name it. Design auditions use the Character's real lines. In ChatGPT the Voice Studio card saves the choice; read it back from `list_characters` rather than saving again.
- Use approved product references. For supporting stills or packshots, follow `creativeclaw-product-photoshoot`.
- Maintain the same creator features, wardrobe, product geometry, location logic, and screen direction across shots.

## Plan and produce

1. Use `creativeclaw-plan-video` to approve the script, shot list, and clean storyboard frames before costly generation.
2. Use `create_film_project` for a multi-shot ad, persist shots with `update_film_project`, and honor the script and storyboard approval gates.
3. Pick one voice path per speaking shot from [voice in video](references/video/voice-in-video.md): native dialogue for a quick one-off; speech first when the creator recurs or the script is exact. Make speech with `creativeclaw-generate-voiceover` and lock durations from its `wordTimings`. Then read the selected local video-model guide and call `generate_video` for each clip. Default to Gemini Omni, which accepts no audio; for exact-voice lip-sync use Seedance 2.5, H3 Max or `video/sync-3`.
4. Reuse the prepared speech. Prompt clips with no music; use `creativeclaw-generate-music` only for a requested project track and `creativeclaw-generate-sound-effects` for requested SFX. Read [media-assembly.md](references/media-assembly.md).
5. Add per-shot voice or music with `merge_media` `merge_audio_video`: `audio_mode: "mix"` keeps the clip's sound (`added_volume` about 0.3 for music under speech); the default `replace` discards it and ends at the shorter input. `assemble_film` narration replaces every shot's audio; set `with_narration: false` when shots speak. Assembly adds no captions, transitions, or full sound mix.

## Review

Check the first three seconds, natural delivery, product visibility, claim accuracy, continuity, audio intelligibility, pacing, safe text areas, and CTA clarity. Save multiple hooks as distinct assets only when requested. Set the Film to final only after approval.
