# Tool catalog

Use this as routing guidance. Tool availability varies by client; never recite the catalog to the user or invent a missing tool.

## Models and generation

| Tool               | Use                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `list_models`      | Discover current image, video, and speech models. Filter by category.                                                     |
| `get_model_params` | Read the chosen model's actual schema, defaults, enums, and extra fields.                                                 |
| `generate_image`   | Generate an image or edit a source supplied as `image_url`. Additional model-specific references normally go in `extras`. |
| `compare_models`   | Run one image prompt through two to four generation-capable image models.                                                 |
| `generate_video`   | Generate, animate, extend, retake, reframe, edit, or drive video according to model capability and `operation`.           |
| `generate_speech`  | Generate speech. Supports model-specific voices, delivery controls, reference audio, and Characters.                      |

Use `list_models` before relying on a remembered model ID. Use `get_model_params` before sending `extras`, reference arrays, resolution, duration, or operation-specific fields.

## Themes

| Tool           | Use                                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| `list_themes`  | Discover theme names and the default theme.                                                           |
| `get_theme`    | Fetch the default or named theme, including structured data and reference images.                     |
| `update_theme` | Open the visual editor with `interactive: true`, or directly create/update data and reference images. |
| `delete_theme` | Remove a theme only when explicitly requested.                                                        |

For conversational setup or edits, prefer `update_theme({ interactive: true })`. For exact programmatic changes, fetch first and send the smallest direct update. Theme `data` shallow-merges; `images` replaces the full reference-image array.

## Assets and imports

| Tool                                | Use                                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `search_assets`                     | Find recent or matching media by type, query, tags, exact name, or source.                             |
| `update_asset`                      | Set a unique name, replace tags, or update a description.                                              |
| `delete_asset`                      | Soft-delete an asset only when explicitly requested.                                                   |
| `load_image`                        | Display an image URL inline when exposed.                                                              |
| `import_chatgpt_media`              | Convert one native ChatGPT attachment into a durable Creative Claw asset when exposed.                 |
| `import_media`                      | Open the picker when the user still needs to choose a file.                                            |
| `get_upload_url` + `confirm_upload` | Upload local bytes from clients that can perform an HTTP PUT.                                          |
| `upload_asset`                      | Copy a public, directly downloadable URL into the library. Requires `url`, `content_type`, and `type`. |

Read `platform-upload.md` before choosing an import route.

## Characters and films

| Tool                                      | Use                                                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `manage_character`                        | Create/update a persona with a description, reference image, and optional consented cloned voice. |
| `clone_voice`                             | Attach or replace a consented voice clone on an existing Character.                               |
| `list_characters`                         | Find reusable Characters and IDs.                                                                 |
| `delete_character`                        | Remove a Character only when explicitly requested.                                                |
| `create_film_project`                     | Create a multi-shot Film project.                                                                 |
| `update_film_project`                     | Save script, shots, storyboards, clips, audio, and approval state.                                |
| `get_film_project` / `list_film_projects` | Inspect Film projects.                                                                            |
| `assemble_film`                           | Merge approved clips and audio into the final Film.                                               |

## Media processing

| Tool                | Use                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------- |
| `remove_background` | Remove an image or video background.                                                      |
| `upscale_media`     | Upscale image or video.                                                                   |
| `trim_video`        | Cut a time range.                                                                         |
| `scale_video`       | Resize, crop, or pad video.                                                               |
| `add_subtitles`     | Burn captions into video.                                                                 |
| `extract_frames`    | Extract one or more still frames from video.                                              |
| `merge_media`       | Concatenate videos or audio, or combine an audio track with video.                        |
| `transcribe`        | Produce a transcript with timing data from audio or video.                                |
| `isolate_audio`     | Remove noise, music, and reverb from a voice recording. Queued; resolve with `check_job`. |

## Jobs and credits

| Tool                  | Use                                                                  |
| --------------------- | -------------------------------------------------------------------- |
| `check_job`           | Resolve queued work by `job_id` when a completed result is required. |
| `get_credits_balance` | Check balance and usage when exposed.                                |
| `get_credits_link`    | Return a user-operated top-up link when exposed.                     |

## Metadata conventions

- Use concise unique names such as `acme-launch-hero-v2`.
- Use lowercase stable tags such as `acme`, `launch-2026`, `approved`, `reference`, `character-mira`.
- `update_asset.tags` replaces the current tag array; include every tag that should remain.
- Search before generating a duplicate and before assigning a name that must be unique.
