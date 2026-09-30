# Tool catalog

Use this as routing guidance. Tool availability varies by client; never recite the catalog to the user or invent a missing tool.

Older clients may still show retired tools. Use `search_examples({ id })` instead of `get_example`, `manage_character({ id, delete: true })` instead of `delete_character`, and `generate_music` or `generate_sound_effect` instead of `generate_audio`.

## Models and generation

| Tool               | Use                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `list_models`      | Discover current image, video, speech, and audio models. Filter by category.                                              |
| `get_model_params` | Read the chosen model's actual schema, defaults, enums, and extra fields.                                                 |
| `generate_image`   | Generate an image or edit a source supplied as `image_url`. Additional model-specific references normally go in `extras`. |
| `generate_video`   | Generate, animate, extend, retake, reframe, edit, or drive video according to model capability and `operation`.           |
| `generate_speech`  | Generate speech. Supports model-specific voices, delivery controls, reference audio, and Characters.                      |
| `generate_music`   | Generate scores, music beds, stings, jingles, themes, or songs. `creativeclaw-generate-music` picks the model.            |
| `generate_sound_effect` | Generate sound effects, ambience, Foley, transitions, impacts, or textures with ElevenLabs.                         |

Use `list_models` before relying on a remembered model ID. Use `get_model_params` before sending `extras`, reference arrays, resolution, duration, or operation-specific fields. Route speech to `generate_speech`, music to `generate_music`, and sound effects to `generate_sound_effect`.

For a model comparison, call `generate_image` once per selected model with the same prompt and settings, then present the results together.

## Curated examples

| Tool              | Use                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| `search_examples` | Browse summaries by query, output type, exact model ID, tags, and cursor. Pass `id` (id or slug) to load one example in full. |

Search only when the user asks for examples, prompt ideas, or the catalog; see [examples guidance](workflows/examples.md). Do not search before every generation. Variations and user-supplied style references stay with the generation skill.

## Deterministic HTML rendering

| Tool                | Use                                                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| `render_html_image` | Render a deterministic HTML/CSS layout to a PNG via Chromium.                                                  |
| `render_html_video` | Queue a HyperFrames-backed HTML/CSS/JS motion render; resolve the final video URL with `check_job`.            |
| `list_templates`    | Find saved reusable layouts by name.                                                                           |
| `create_template` / `update_template` | Save or change a reusable parameterized layout.                                              |
| `render_template`   | Render a saved template with provided values.                                                                 |

The image and video renderers are explicit-only choices. Use them when the user asks for HTML/CSS, HyperFrames, code-driven rendering, supplies HTML, or explicitly accepts the method. `render_html_image` can also make an exact text watermark graphic with a transparent background for `merge_media` `overlay_images`. A generic poster, social card, overlay, intro, or outro request is not sufficient by itself.

## Themes

| Tool           | Use                                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| `list_themes`  | Discover theme names and the default theme.                                                           |
| `get_theme`    | Fetch the default or named theme, including structured data and reference images.                     |
| `update_theme` | Open the visual editor with `interactive: true`, or directly create/update data and reference images. |

For conversational setup or edits, prefer `update_theme({ interactive: true })`. For exact programmatic changes, fetch first and send the smallest direct update. Theme `data` shallow-merges; `images` replaces the full reference-image array.

## Assets and imports

| Tool                                | Use                                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `search_assets`                     | Find recent or matching media by type, query, tags, exact name, or source.                             |
| `update_asset`                      | Set a unique name, replace tags, or update a description.                                              |
| `delete_asset`                      | Permanently delete an asset; it cannot be restored. Only when explicitly requested.                    |
| `load_image`                        | Display an image URL inline when exposed.                                                              |
| `import_chatgpt_media`              | Convert one native ChatGPT attachment into a durable Creative Claw asset when exposed.                 |
| `import_media`                      | Open the picker when the user still needs to choose a file.                                            |
| `get_upload_url` + `confirm_upload` | Upload local bytes from clients that can perform an HTTP PUT.                                          |
| `upload_asset`                      | Copy a public, directly downloadable URL into the library. Requires `url`, `content_type`, and `type`. |

Read `platform-upload.md` before choosing an import route.

## Characters, voices, and films

| Tool                                      | Use                                                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `manage_character`                        | Create or update a Character (description, reference image, stock voice). `delete: true` with `id` permanently deletes it and its saved voices, only on explicit request. |
| `list_characters`                         | Find reusable Characters, their IDs, and saved voice options.                                     |
| `design_voice`                            | Create a new synthetic voice from a description, no recording needed. ElevenLabs by default; `provider: "google"` for Google. Returns three auditions. Save the pick with `design_voice({ action: "save", preview_id, character_id \| character_name })`. At the saved-voice limit, pass `replace_voice_option_id` to replace an existing designed voice. |
| `clone_voice`                             | Clone a consenting speaker's recording with ElevenLabs (default) or Cartesia. Attaches to `character_id`, or creates a voice-only Character when none is given. |
| `create_film_project`                     | Create a multi-shot Film project.                                                                 |
| `update_film_project`                     | Save script, shots, storyboards, clips, audio, and approval state.                                |
| `get_film_project` / `list_film_projects` | Inspect Film projects.                                                                            |
| `assemble_film`                           | Concatenate every approved shot clip into a first cut and optionally overlay one project narration track. |

## Media processing

| Tool                    | Use                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| `remove_background`     | Remove an image or video background.                                                      |
| `upscale_media`         | Upscale image or video.                                                                   |
| `trim_video`            | Cut one time range.                                                                       |
| `cut_and_reframe_video` | Cut and reorder several chosen ranges of a workspace video in one render, reframe each for any output size, and optionally burn source-timed captions. Does not pick highlights or track faces. |
| `scale_video`           | Resize, crop, or pad video.                                                               |
| `add_subtitles`         | Burn captions into video.                                                                 |
| `extract_frames`        | Extract one or more still frames from video.                                              |
| `merge_media`           | Concatenate media, put audio on a video, burn transparent image watermarks onto finished video (`overlay_images`), or compose timed images and clips with optional audio (`compose_video`). See [assembly guidance](media-assembly.md). |
| `transcribe`            | Timed transcript from `audio_url` or `video_url`. `video_url` also accepts YouTube, Google Drive, and public video pages (TikTok, Instagram, X/Twitter, Facebook, Vimeo, Twitch, Dailymotion, Loom, Reddit), best effort; import the file if a page cannot be fetched. |
| `isolate_audio`         | Remove noise, music, and reverb from a voice recording. Queued; resolve with `check_job`. |

Audio on video:

- `merge_media` `merge_audio_video` replaces the clip's audio by default and ends at the shorter input.
- With `audio_mode: "mix"` it keeps the clip's sound and layers the new track over it at the video's length. `original_volume` and `added_volume` (0–1) set each level; about 0.3 keeps music under speech.
- `compose_video` layers one audio track over the clips at full level, and the result can run past the last clip.

## Account and billing

Use `manage_account` to view the connected account, balance, recent generations, and credit activity, including charges and refunds. Open `overview` for the balance, `activity` for a specific generation's recorded cost, or `settings` for generation preferences. The tool is read-only.

Purchases and plans are handled on the Creative Claw website, not in chat. Do not start, price, or recommend a purchase; if asked, say so and share only an account link a tool returned.

Read [account guidance](workflows/account.md) to match jobs to charges, distinguish gross charges/refunds/net cost, and handle missing or older records. Use `estimate_generation` for future quotes, not proof of what a past generation cost. A balance question alone is not a feedback submission request.

## Jobs and estimates

| Tool                  | Use                                                                  |
| --------------------- | -------------------------------------------------------------------- |
| `check_job`           | Resolve queued work by `job_id` when a completed result is required. |
| `estimate_generation` | Estimate one planned generation, check the current balance, and return affordable H3 alternatives when needed. The final cost is confirmed after generation finishes. |
| `get_credits_balance` | Check the balance when exposed.                                      |

## Product feedback

| Tool              | Use                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `submit_feedback` | Report a bug, missing feature or model, confusing flow, generation-quality issue, or explicit user praise. |

Use `source: "agent"` for friction observed during a task and `source: "user"` when relaying the user's own feedback. Send one concise, specific report only when the user asks or approves; a complaint or account question alone is not authorization. Completed playable video generations are charged even if the user is disappointed. Feedback helps improve future generations and does not itself trigger a refund. For critical issues, users can also contact support@creativeclaw.co. Read [feedback guidance](workflows/feedback.md) before reporting.

## Metadata conventions

- Use concise unique names such as `acme-launch-hero-v2`.
- Use lowercase stable tags such as `acme`, `launch-2026`, `approved`, `reference`, `character-mira`.
- `update_asset.tags` replaces the current tag array; include every tag that should remain.
- Search before generating a duplicate and before assigning a name that must be unique.
