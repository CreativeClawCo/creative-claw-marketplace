---
name: creativeclaw-build-film
description: "Produce a complete multi-shot Creative Claw film: a full plan the user can review, storyboards and clips with one batch approval, take and scene versioning, and an exported cut. Use for ads, explainers, music videos, or stories that require several coordinated clips."
---

# Build Film

For each Creative Claw tool call that exposes it, pass the optional `skills_used` array with `creativeclaw-build-film`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw-build-film/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.

Read [video model selection](references/video/index.md), then only the selected model's guide. Model families are covered locally, with live-schema guidance for additional models; do not load every guide or require a sibling model skill. Read [Review/Auto handling](references/video/review.md) before submission.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools. It covers existing authorization, model discovery, optional cost checks, imports, and recovery.

Run a stateful, multi-shot production with explicit approvals. Use `creativeclaw-generate-video` for a single clip and `creativeclaw-plan-video` when the user wants planning only. When the user explicitly asks for motion graphics, kinetic typography or an animated explainer instead of filmed-looking footage, use `creativeclaw-render-html`.

For worked production flows, read only the relevant recipe: [product ad](references/video/recipe-product-ad.md), [consistent Character scene](references/video/recipe-character-scene.md), or [source edit, person replacement and extension](references/video/recipe-source-edit.md). These explain asset preparation, shot prompting, assembly and output checks, without authorizing extra paid drafts.

## Reference-first pipeline

Unless the user asked for direct text-to-video, supplied a ready shot image, or is editing footage, follow this before `generate_video`. New clips start from one keyframe image per shot, so the video model animates images the user has seen instead of inventing the face, product, outfit or location: tell the user how many images that is before making them.

1. Anchors, reuse first: `search_assets`, `list_characters`, `get_theme`. Person: Character sheet + face portrait (real person: also their best original photo). Product: real photo or packshot, plus a label/logo close-up when text matters. A recurring person or product with no anchor: create it first (creativeclaw-create-avatar, creativeclaw-product-photoshoot).
2. Look line: one sentence (palette, light, lens, medium), pasted into every keyframe and video prompt.
3. Keyframe per shot: in a film plan, `render_film_shots` makes these with the film's own storyboard model, so leave `defaults.image_model` unset unless the user names an image model. For a one-off keyframe outside the plan: `generate_image` with the same image model all project (default `image/nano-banana-2`), `aspect_ratio` = the video's ratio, main anchor in `image_url`, others in `extras.image_urls`, roles named. From shot 2 on, add the first approved keyframe (and the previous one when the scene continues) as a look reference alongside the anchors. Earlier keyframes set the look and place only: name this shot's own shot size and angle in the prompt, or the image copies their framing. One clean full-bleed frame; no text, grid or labels.
4. Compare it to the anchors (face, label, logo, colors); fix with one targeted edit.
5. Show keyframes and the plan (model, duration, ratio) in one message. Review mode: call `generate_video` now; the card is the approval. Auto: ask once unless the user said go.
6. One mode per shot. People, several subjects or big motion: `image_urls` = [keyframe, identity anchor, product anchor], 2–4 total; `character_id` is fine here. Exact opening (product hero, logo reveal): `image_url` = keyframe, no `image_urls` or `character_id`.
7. Next shot: same anchors and look line, plus the earlier keyframes as references. A previous clip's last frame is only an extra composition cue.

Details: [reference production](references/video/reference-production.md). Image prompting: [image model index](references/images/index.md) and only the chosen guide.

## 1. Create and plan

1. Use `list_film_projects` and `get_film_project` to resume an existing project when appropriate.
2. Follow `creativeclaw-plan-video` for the script, shot list and model plan, then save the whole plan in one `create_film_project` call: `defaults` (model, resolution, aspect_ratio, duration, style_refs), `scenes` (id, name), and `shots` with stable ids, `scene`, `prompt`, and `inputs` (`start_frame: "storyboard"`, `image_refs` with URLs or `"shot:<id>"`, `character_ids`, `video_ref`, `audio` lines with `type`, `text` and the speaking `character_id`). When the user asked for the film to be made (not only planned, reviewed first or priced), settle every speaker's voice (section 2) and add `make_storyboards: true`: the same call starts the storyboards and voices the lines, and the film view opens rendering them. Otherwise leave it out and the user reads the complete film in the film view before anything is charged. Give every cut inside a scene a new shot size or angle, and start each shot's `prompt` with them ("High wide shot: …"). Two clips from the same framing back to back jump; make that action one longer or extended clip instead.
3. Edit the plan with `update_film_project` (`patch_shots` by id, or `shots` to insert, delete or reorder). Every edit keeps the previous plan as a version. Edits don't show the film: call `get_film_project` when the user should see it, once after a set of edits rather than after each one.
4. `status` is an optional label; progress is tracked from the shot takes, so there are no stages to advance.

## 2. Establish timing and audio

Read each selected model's spoken-language guidance in `get_model_params({ model })`. For unsupported or unverified dialogue languages, follow [spoken languages](references/video/spoken-languages.md): build each requested camera view from the same character references, lip-sync its image to its speech segment, then concatenate while keeping the clip audio. A single talking face remains one generation within duration limits. Documented languages keep the normal workflow.

When a Character speaks and the voice is unknown, ask one question: design a new voice from a description (`design_voice`, three auditions), use your own voice (recording plus consent, creativeclaw-clone-voice), or pick a stock voice. If the voice doesn't matter, pick a stock voice and name it. Design auditions use the Character's real lines. In ChatGPT the Voice Studio card saves the choice; read it back from `list_characters` rather than saving again.

Pick one voice path per speaking shot from [voice in video](references/video/voice-in-video.md). Gemini Omni, the default, accepts no audio: native dialogue there, or route exact-voice shots elsewhere. A shot where one person says exact lines goes to `video/minimax-h3-max-lip-sync` with its shot image and the finished line; other exact-voice shots go to an audio-capable model with a check of the delivered words, or to `lip_sync_video` on a finished clip. Preserve an explicit model choice. When a person speaks across shots, save them with their voice as a Character before the first speaking shot. Generate or reuse speech with `creativeclaw-generate-voiceover` before locking shot durations: at most 2.5 words per clip second, about 0.5 s of air at each end, lengths from the audio's `wordTimings`. Do not add separate narration to native-dialogue clips unless requested.

In a film plan, give each spoken line its speaker (`character_id`) in the shot's `inputs.audio`; for a conversation, set each line's `at` (seconds into the shot) so the speakers take turns. `render_film_shots({ id, what: "storyboards" })` also makes every line in its speaker's saved voice as a dialogue track on the film timeline, which the film card plays with the shot; `what: "audio"` voices lines added later. Unless `create_film_project` started them, the film view shows what the storyboards and lines will cost before the user starts them; when the balance can't cover a step, nothing starts and the result gives the amount and a purchase link to share, after which the same step continues. Render the clips after that: a model with audio references (Seedance, H3 Max) then speaks the lines in those voices; any other model gets them over the clip, without matching mouths. Relay the warnings `render_film_shots` returns, and offer a model with audio references when matching mouths matter.

Keep continuous sound out of the clips, or every join is audible: each clip invents its own wind, room tone or score. Prompt shots only for dialogue and sounds tied to the picture (footsteps, a door, a key), ending with "no music, no background ambience, no room tone, no transition sounds"; a shot with nothing to sync is silent. Plan `sound` lines are written into each clip's prompt, so keep them to those synced effects; never save wind, rain, crowd or room tone as a shot's sound line. Make one ambience bed per scene with `creativeclaw-generate-sound-effects` (a seamless loop) and, when requested, one score or song for the film with `creativeclaw-generate-music`; both go on the film's timeline as audio tracks (step 4).

When the user asks about cost or supplies a budget, estimate supported planned generations and total them; identify processing costs excluded by `estimate_generation`. Share the total, then continue with the production the user approved.

## 3. Generate shots

1. Storyboards: unless `make_storyboards` already started them, `render_film_shots({ id, what: "storyboards" })` makes the missing keyframes from each shot's prompt, references and cast (pipeline steps 3–4 still apply to what the plan says). Show them in the film view.
2. Clips: `render_film_shots({ id, what: "clips" })` builds every request from the saved plan (the storyboard as start frame unless `start_frame` says otherwise, dialogue lines written into the prompt). In Review mode the clips wait for one approval of the whole batch in the film view; tell the user, and never submit them yourself. In Auto they start at once.
3. Every result saves to its shot as a new take by itself. Do not write clip or storyboard URLs back. For a one-off shot outside the batch, call `generate_video` (or `generate_image`, `generate_speech`) with `film_shot: { film_id, shot_id }` so it lands on that shot too.
4. Resolve finished work with `get_film_project` or `check_job`, inspect each clip, and report problems per shot.

## Iterate and version

- A scene: `render_film_shots({ id, what: "clips", scene, redo: true, direction })`. It saves what the scene used before the redo as a scene version, adds `direction` to every prompt in the batch, and asks for one approval for just those shots. Use `shot_ids` to redo only some shots.
- A shot: the newest take is used unless one is picked. `update_film_project({ id, use_take: { take_id } })` picks an older take; `use_take: { shot_id, kind, newest: true }` goes back to the newest.
- Going back: `update_film_project({ id, use_version: { version_id } })` restores a scene version, an exported cut's takes, or an earlier plan. `get_film_project` lists versions.
- A clip made without `film_shot` appears in the film view as unsorted; attach it with `update_film_project({ id, add_take: { shot_id, job_id } })`.

## 4. Combine audio and clips

Use the narration prepared for timing. Read [media-assembly.md](references/media-assembly.md) before combining tracks or clips.

- Per-shot audio: `add_audio_to_video` with `audio_mode: "mix"` keeps the shot's own sound and layers the new track at the clip's length (`original_volume`, `added_volume` 0–1; about 0.3 for music under speech). The default `audio_mode: "replace"` discards the shot's audio and ends at the shorter input. Attach the result to its shot with `add_take` (`url` set to the mixed clip).
- Project narration: set it with `update_film_project({ id, audio_url })`. `assemble_film` narration replaces every shot's audio; use `with_narration: false` when shots carry dialogue, then layer narration or music over the cut with `audio_mode: "mix"`.
- Ambience, music, narration and timed effects: put each on the film's timeline as an audio track, not into a clip. Call the generator with `film_track: { film_id, kind, label, start or at: { shot_id, offset_s }, volume, loop, duck }` and the result lands on the timeline by itself; attach audio you already have with `update_film_project` `add_tracks`. One looping bed per location (`loop: true`, about 0.3, `duck: true`), music at about 0.2 under speech, effects `at` the shot they belong to so they follow redos. The user hears the mix in the film card before export, and `assemble_film` renders the same mix. Read [media-assembly.md](references/media-assembly.md) under seamless sound. Listen to every join; a background that changes at a cut means a clip still carries its own bed.

## 5. Watch and export

1. The film view plays the chosen takes back to back for free, with storyboards in the gaps. Let the user watch and fix shots before exporting.
2. When every intended shot has a clip, call `assemble_film` with `mode: "connect"` by default; `mode: "cut_end"` only when the user wants the output trimmed at `targetDurationS`.
3. Resolve the queued job with `check_job`. Only the completed URL is the cut; each export is kept as its own cut version. Verify playback order, full duration and audio.
4. When the user requests opening or closing bookends, use `creativeclaw-edit-media` after the cut exists. That workflow may offer HTML-rendered cards, but it must not call `render_html_video` unless the user explicitly chooses HTML/HyperFrames/code-driven rendering.
5. Assembly adds no transitions, captions or sound design; make those with the editing tools.

## Recovery

Resume from saved project state rather than regenerating approved media. If a shot fails or has a quality issue, report the problem and propose a repair. Require explicit authorization before another generation attempt for that shot; approval of the film or storyboard alone does not authorize replacement takes. Redo only that shot or scene with `render_film_shots`; earlier takes stay available. Do not restart the full film. Never claim completion from queued job IDs.
