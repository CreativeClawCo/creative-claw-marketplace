---
name: creativeclaw-build-film
description: "Produce a complete multi-shot Creative Claw film from planning through an assembled first cut. Use for ads, explainers, music videos, or stories that require several coordinated clips, narration, and approval gates."
---

# Build Film

Read [video model selection](references/video/index.md), then only the selected model's guide. Model families are covered locally, with live-schema guidance for additional models; do not load every guide or require a sibling model skill. Read [reference production](references/video/reference-production.md) before preparing media and [Review/Auto handling](references/video/review.md) before submission.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Run a stateful, multi-shot production with explicit approvals. Use `creativeclaw-generate-video` for a single clip and `creativeclaw-plan-video` when the user wants planning only.

For worked production flows, read only the relevant recipe: [product ad](references/video/recipe-product-ad.md), [consistent Character scene](references/video/recipe-character-scene.md), or [source edit and extension](references/video/recipe-source-edit.md). These explain asset preparation, shot prompting, assembly and output checks, without authorizing extra paid drafts.

## Reference-first production

Strongly recommend image preparation before video: reuse the user's media, develop shot-appropriate references with creativeclaw-generate-image, and prefer at least three complementary images where the video model supports them. Read [image model selection](references/images/index.md) and only the chosen image guide, plus [the reference-first workflow](references/video/reference-production.md) for approval, Character sheets, audio-first control and cross-shot continuity. Existing references count; do not force extra paid assets, exceed model limits or ignore an explicit direct-generation request.

Use the video's Review card as the single approval of its exact references and settings, without a duplicate chat approval. Honor separately requested earlier checkpoints and consent requirements. Review does not gate earlier image/audio charges. For connected clips, reuse stable visual/audio anchors and request dialogue, ambience and effects without independently generated music per shot.

## 1. Create and plan

1. Use `list_film_projects` and `get_film_project` to resume an existing project when appropriate; otherwise call `create_film_project` with the name, brief, Character IDs, theme, and target duration.
2. Follow `creativeclaw-plan-video` to create the script, shot list, model plan, and storyboard.
3. Save stable shot IDs and patch the project with `update_film_project`. Do not replace approved fields accidentally.
4. Honor script and storyboard review stages, including approval already given or explicit instructions to proceed through them. Advance `drafting`, `script_ok`, and `storyboard_ok` truthfully; do not repeat approval questions.

## 2. Establish timing and audio

For narration-driven production, generate or reuse speech with `creativeclaw-generate-voiceover` before locking shot durations. Use returned alignment/timestamps or inspected duration. Do not add separate narration to native-dialogue clips unless requested. Avoid music generated independently inside each clip. Require a consistent shared voice/ambience plan and reference anchors for connected shots. Use `creativeclaw-generate-music` once for a requested continuous project score or song and `creativeclaw-generate-sound-effects` for ambience, Foley, and effects. Establish a supported assembly method before creating tracks that need layering.

When the user asks about cost or supplies a budget, estimate supported planned generations and total them; identify processing costs excluded by `estimate_generation`. Do not add another approval gate for authorized production.

## 3. Generate shots

1. Keep storyboard and reference approval state truthful. In Review mode, prepare each shot request for approval without claiming it is rendering; mark rendering only after the applicable approval and actual submission. Honor a separately requested storyboard checkpoint.
2. For each shot, read the selected local model guide, check current parameters, and call `generate_video` with the approved prompt, model and duration. Use a clean `image_url` for literal-frame animation or ordered references for reference-guided composition, not both.
3. Maintain Character and product continuity through approved canonical anchors. Build identity into literal start frames before animation, or bind identity in a supported reference-only request. `character_id` does not automatically add a second visual reference.
4. On `approval_required`, retain the Recovery Job ID and pause that shot until the user submits it. Resolve submitted jobs needed for assembly with `check_job`, inspect every clip, and write each approved `clipUrl` back to its shot.

## 4. Combine audio and clips

Use the narration prepared for timing. Read [media-assembly.md](references/media-assembly.md) before combining tracks or clips. The film assembler can optionally overlay one project-level `audioUrl`; it does not automatically mix every shot's `audioUrl`.

When per-shot narration or dialogue is required, use `merge_media({ operation: "merge_audio_video" })` to mux the approved audio into each shot clip before saving that final `clipUrl`. Alternatively, merge an approved full-length narration track and set it with `update_film_project({ id, audio_url })` before assembly. Preserve individual shot updates with `patch_shots`.

## 5. Assemble and approve

1. Verify that every intended shot has an approved `clipUrl` in order.
2. Call `assemble_film` with `mode: "connect"` by default. It preserves every clip and reports target-duration overage as a warning. Use `mode: "cut_end"` only when the user wants the fully assembled output trimmed at `targetDurationS`.
3. Resolve the queued job with `check_job`. Only the completed URL is the first cut; completion saves `assembledUrl` and `preview_ok`. Verify playback order, full duration, and audio.
4. When the user requests opening or closing bookends, use `creativeclaw-add-video-intro-outro` after the first cut exists. That workflow may offer HTML-rendered cards, but it must not call `render_html_video` unless the user explicitly chooses HTML/HyperFrames/code-driven rendering.
5. Do not imply that assembly adds transitions, captions, sound design, or per-shot audio mixing. If those are required, create the needed processed clips with exposed tools before assembly.
6. Set `preview_ok` when the first cut exists. Set `final` only after the user has reviewed and approved it.

## Recovery

Resume from saved project state rather than regenerating approved media. If a shot fails or has a quality issue, report the problem and propose a repair. Require explicit authorization before another generation attempt for that shot; approval of the film or storyboard alone does not authorize replacement takes. After an authorized replacement succeeds, patch only that shot's URL. Do not restart the full film. Never claim completion from queued job IDs.
