---
name: creativeclaw-build-film
description: "Produce a complete multi-shot Creative Claw film from planning through an assembled first cut. Use for ads, explainers, music videos, or stories that require several coordinated clips, narration, and approval gates."
---

# Build Film

Read [video model selection](references/video/index.md), then only the selected model's guide. Model families are covered locally, with live-schema guidance for additional models; do not load every guide or require a sibling model skill. Read [Review/Auto handling](references/video/review.md) before submission.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Run a stateful, multi-shot production with explicit approvals. Use `creativeclaw-generate-video` for a single clip and `creativeclaw-plan-video` when the user wants planning only.

For worked production flows, read only the relevant recipe: [product ad](references/video/recipe-product-ad.md), [consistent Character scene](references/video/recipe-character-scene.md), or [source edit and extension](references/video/recipe-source-edit.md). These explain asset preparation, shot prompting, assembly and output checks, without authorizing extra paid drafts.

## Reference-first pipeline

Unless the user asked for direct text-to-video, supplied a ready shot image, or is editing footage, follow this before `generate_video`. A video request authorizes one keyframe per shot: say so, don't ask.

1. Anchors, reuse first: `search_assets`, `list_characters`, `get_theme`. Person: Character sheet + face portrait (real person: also their best original photo). Product: real photo or packshot, plus a label/logo close-up when text matters. A recurring person or product with no anchor: create it first (creativeclaw-create-avatar, creativeclaw-product-photoshoot).
2. Look line: one sentence (palette, light, lens, medium), pasted into every keyframe and video prompt.
3. Keyframe per shot: `generate_image` with the same image model all project (default `image/nano-banana-2`), `aspect_ratio` = the video's ratio, main anchor in `image_url`, others in `extras.image_urls`, roles named. One clean full-bleed frame; no text, grid or labels.
4. Compare it to the anchors (face, label, logo, colors); fix with one targeted edit.
5. Show keyframes and the plan (model, duration, ratio) in one message. Review mode: call `generate_video` now; the card is the approval. Auto: ask once unless the user said go.
6. One mode per shot. People, several subjects or big motion: `image_urls` = [keyframe, identity anchor, product anchor], 2–4 total; `character_id` is fine here. Exact opening (product hero, logo reveal): `image_url` = keyframe, no `image_urls` or `character_id`.
7. Next shot: same anchors and look line. A previous clip's last frame is only an extra composition cue.

Details: [reference production](references/video/reference-production.md). Image prompting: [image model index](references/images/index.md) and only the chosen guide.

## 1. Create and plan

1. Use `list_film_projects` and `get_film_project` to resume an existing project when appropriate; otherwise call `create_film_project` with the name, brief, Character IDs, theme, and target duration.
2. Follow `creativeclaw-plan-video` to create the script, shot list, model plan, and storyboard.
3. Save stable shot IDs and patch the project with `update_film_project`. Do not replace approved fields accidentally.
4. Honor script and storyboard review stages, including approval already given or explicit instructions to proceed through them. Advance `drafting`, `script_ok`, and `storyboard_ok` truthfully; do not repeat approval questions.

## 2. Establish timing and audio

When a Character speaks and the voice is unknown, ask one question: design a new voice from a description (`design_voice`, three auditions), use your own voice (recording plus consent, creativeclaw-clone-voice), or pick a stock voice. If the voice doesn't matter, pick a stock voice and name it. Design auditions use the Character's real lines. In ChatGPT the Voice Studio card saves the choice; read it back from `list_characters` rather than saving again.

Pick one voice path per speaking shot from [voice in video](references/video/voice-in-video.md). Gemini Omni, the default, accepts no audio: native dialogue there, or route exact-voice shots to an audio-capable model or `video/sync-3`. Generate or reuse speech with `creativeclaw-generate-voiceover` before locking shot durations: at most 2.5 words per clip second, about 0.5 s of air at each end, lengths from the audio's `wordTimings`. Do not add separate narration to native-dialogue clips unless requested.

Prompt shots for dialogue, ambience and effects only, with no music. Use `creativeclaw-generate-music` once for a requested project score or song and `creativeclaw-generate-sound-effects` for ambience, Foley, and effects.

When the user asks about cost or supplies a budget, estimate supported planned generations and total them; identify processing costs excluded by `estimate_generation`. Do not add another approval gate for authorized production.

## 3. Generate shots

1. Keep approval state truthful. In Review mode, a shot is rendering only after the user submits its card. Honor a separately requested storyboard checkpoint.
2. For each shot, read the selected local model guide, check current parameters, and call `generate_video` with the approved prompt, model and duration, in one input mode (pipeline step 6).
3. Maintain Character and product continuity through the same anchors. `character_id` appends the saved image to `image_urls` as a reference, never a start frame. Use it in reference mode; omit it with `image_url`/`last_frame_url` (the server rejects that mix).
4. On `approval_required`, retain the Recovery Job ID and pause that shot until the user submits it. Resolve submitted jobs needed for assembly with `check_job`, inspect every clip, and write each approved `clipUrl` back to its shot.

## 4. Combine audio and clips

Use the narration prepared for timing. Read [media-assembly.md](references/media-assembly.md) before combining tracks or clips.

- Per-shot audio: `merge_media` `merge_audio_video` with `audio_mode: "mix"` keeps the shot's own sound and layers the new track at the clip's length (`original_volume`, `added_volume` 0–1; about 0.3 for music under speech). The default `audio_mode: "replace"` discards the shot's audio and ends at the shorter input. Save the result as the shot's `clipUrl` with `patch_shots`.
- Project narration: set it with `update_film_project({ id, audio_url })`. `assemble_film` narration replaces every shot's audio; use `with_narration: false` when shots carry dialogue, then layer narration or music over the cut with `audio_mode: "mix"`.

## 5. Assemble and approve

1. Verify that every intended shot has an approved `clipUrl` in order.
2. Call `assemble_film` with `mode: "connect"` by default. It preserves every clip and reports target-duration overage as a warning. Use `mode: "cut_end"` only when the user wants the fully assembled output trimmed at `targetDurationS`.
3. Resolve the queued job with `check_job`. Only the completed URL is the first cut; completion saves `assembledUrl` and `preview_ok`. Verify playback order, full duration, and audio.
4. When the user requests opening or closing bookends, use `creativeclaw-edit-media` after the first cut exists. That workflow may offer HTML-rendered cards, but it must not call `render_html_video` unless the user explicitly chooses HTML/HyperFrames/code-driven rendering.
5. Assembly adds no transitions, captions or sound design; make those with the editing tools.
6. Set `preview_ok` when the first cut exists. Set `final` only after the user has reviewed and approved it.

## Recovery

Resume from saved project state rather than regenerating approved media. If a shot fails or has a quality issue, report the problem and propose a repair. Require explicit authorization before another generation attempt for that shot; approval of the film or storyboard alone does not authorize replacement takes. After an authorized replacement succeeds, patch only that shot's URL. Do not restart the full film. Never claim completion from queued job IDs.
