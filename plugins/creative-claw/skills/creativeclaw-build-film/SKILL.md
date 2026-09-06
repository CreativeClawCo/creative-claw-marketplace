---
name: creativeclaw-build-film
description: "Produce a complete multi-shot Creative Claw film from planning through an assembled first cut. Use for ads, explainers, music videos, or stories that require several coordinated clips, narration, and approval gates."
---

# Build Film

Run a stateful, multi-shot production with explicit approvals. Use `creativeclaw-generate-video` for a single clip and `creativeclaw-plan-video` when the user wants planning only.

## 1. Create and plan

1. Use `list_film_projects` and `get_film_project` to resume an existing project when appropriate; otherwise call `create_film_project` with the name, brief, Character IDs, theme, and target duration.
2. Follow `creativeclaw-plan-video` to create the script, shot list, model plan, and storyboard.
3. Save stable shot IDs and patch the project with `update_film_project`. Do not replace approved fields accidentally.
4. Obtain approval for the script and then for the storyboard. Advance status through `drafting`, `script_ok`, and `storyboard_ok` only when each gate is actually approved.

## 2. Generate shots

1. Mark the project `rendering` only after storyboard approval.
2. For each shot, call `creativeclaw-generate-video` with the clean storyboard frame as `image_url`, the approved chronological prompt, the selected model, and a duration supported by that model.
3. Maintain Character and product continuity. When an explicit storyboard is the start frame, add identity references separately if the chosen model supports them; `character_id` does not automatically add a second visual reference.
4. Resolve queued jobs needed for assembly with `check_job`, inspect every clip, and write each approved `clipUrl` back to its shot.

## 3. Produce audio

Use `creativeclaw-generate-voiceover` for narration and dialogue. Generate by speaker or shot so revisions remain local. The film assembler can optionally overlay one project-level `audioUrl`; it does not automatically mix every shot's `audioUrl`.

When per-shot narration or dialogue is required, use `merge_media({ operation: "merge_audio_video" })` to mux the approved audio into each shot clip before saving that final `clipUrl`. Alternatively, merge an approved full-length narration track and store it as the project's `audioUrl` before assembly.

## 4. Assemble and approve

1. Verify that every intended shot has an approved `clipUrl` in order.
2. Call `assemble_film`. Treat its result as an assembled first cut: ordered clips plus an optional single project-level narration track.
3. Do not imply that assembly adds transitions, captions, sound design, or per-shot audio mixing. If those are required, create the needed processed clips with exposed tools before assembly.
4. Set `preview_ok` when the first cut exists. Set `final` only after the user has reviewed and approved it.

## Recovery

Resume from saved project state rather than regenerating approved media. If one shot fails, repair that shot and patch its URL; do not restart the full film. Never claim completion from queued job IDs.
