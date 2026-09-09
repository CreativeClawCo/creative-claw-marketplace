---
name: creativeclaw-build-film
description: "Produce a complete multi-shot Creative Claw film from planning through an assembled first cut. Use for ads, explainers, music videos, or stories that require several coordinated clips, narration, and approval gates."
---

# Build Film

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Run a stateful, multi-shot production with explicit approvals. Use `creativeclaw-generate-video` for a single clip and `creativeclaw-plan-video` when the user wants planning only.

## 1. Create and plan

1. Use `list_film_projects` and `get_film_project` to resume an existing project when appropriate; otherwise call `create_film_project` with the name, brief, Character IDs, theme, and target duration.
2. Follow `creativeclaw-plan-video` to create the script, shot list, model plan, and storyboard.
3. Save stable shot IDs and patch the project with `update_film_project`. Do not replace approved fields accidentally.
4. Honor script and storyboard review stages, including approval already given or explicit instructions to proceed through them. Advance `drafting`, `script_ok`, and `storyboard_ok` truthfully; do not repeat approval questions.

## 2. Establish timing and audio

For narration-driven production, generate or reuse speech with `creativeclaw-generate-voiceover` before locking shot durations. Use returned alignment/timestamps or inspected duration. Do not add separate narration to native-dialogue clips unless requested. For requested music, ambience, or effects, use `creativeclaw-generate-audio` and establish a supported assembly method before creating tracks that need layering.

When the user asks about cost or supplies a budget, estimate supported planned generations and total them; identify processing costs excluded by `estimate_generation`. Do not add another approval gate for authorized production.

## 3. Generate shots

1. Mark the project `rendering` only after storyboard approval.
2. For each shot, call `creativeclaw-generate-video` with the clean storyboard frame as `image_url`, the approved chronological prompt, the selected model, and a duration supported by that model.
3. Maintain Character and product continuity. When an explicit storyboard is the start frame, add identity references separately if the chosen model supports them; `character_id` does not automatically add a second visual reference.
4. Resolve queued jobs needed for assembly with `check_job`, inspect every clip, and write each approved `clipUrl` back to its shot.

## 4. Combine audio and clips

Use the narration prepared for timing. Read [media-assembly.md](references/media-assembly.md) before combining tracks or clips. The film assembler can optionally overlay one project-level `audioUrl`; it does not automatically mix every shot's `audioUrl`.

When per-shot narration or dialogue is required, use `merge_media({ operation: "merge_audio_video" })` to mux the approved audio into each shot clip before saving that final `clipUrl`. Alternatively, merge an approved full-length narration track and set it with `update_film_project({ id, audio_url })` before assembly. Preserve individual shot updates with `patch_shots`.

## 5. Assemble and approve

1. Verify that every intended shot has an approved `clipUrl` in order.
2. Call `assemble_film`, then resolve its queued job with `check_job`. Only the completed URL is the first cut; completion saves `assembledUrl` and `preview_ok`. Verify playback order, full duration, and audio.
3. When the user requests opening or closing bookends, use `creativeclaw-add-video-intro-outro` after the first cut exists. That workflow may offer HTML-rendered cards, but it must not call `render_html_video` unless the user explicitly chooses HTML/HyperFrames/code-driven rendering.
4. Do not imply that assembly adds transitions, captions, sound design, or per-shot audio mixing. If those are required, create the needed processed clips with exposed tools before assembly.
5. Set `preview_ok` when the first cut exists. Set `final` only after the user has reviewed and approved it.

## Recovery

Resume from saved project state rather than regenerating approved media. If one shot fails, repair that shot and patch its URL; do not restart the full film. Never claim completion from queued job IDs.
