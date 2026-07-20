# MCP Tool Catalog

Creative Claw MCP tools grouped by purpose. Use this as a reference, not a recital list — never dump it on the user.

## Generation

| Tool                | Purpose                                | Notes                                                                                         |
| ------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------- |
| `generate_image`    | AI image gen / edit                    | Pass `image_url` for editing. Async on some models — poll `check_job`.                        |
| `generate_video`    | AI video gen                           | **Always async.** Returns `jobId`. Poll `check_job`. Always generate a reference image first. |
| `generate_speech`   | Text-to-speech, voice cloning          | Returns permanent audio URL. Some models accept a reference audio for voice cloning.          |
| `generate_3d_model` | Image → 3D model                       | Async.                                                                                        |
| `render_html_image` | HTML → PNG via headless Chromium       | Use `inline_images` for external assets. Loads Google Fonts via `fonts` param.                |
| `render_html`       | Bare interactive HTML display endpoint | For live previews; use `render_html_image` for PNG output.                                    |
| `render_template`   | Render a saved template with params    | Single or `batch`. Returns PNGs (or one PDF if `output: "pdf"`).                              |
| `compare_models`    | Same prompt against multiple models    | Side-by-side comparison.                                                                      |

## Templates (banner authoring)

| Tool              | Purpose                                             |
| ----------------- | --------------------------------------------------- |
| `create_template` | Save HTML + parameter spec for repeatable rendering |
| `update_template` | Shallow-merge edits to an existing template         |
| `list_templates`  | Discover templates by name / tag                    |
| `render_template` | Render a template (see above)                       |

## Themes (brand)

| Tool           | Purpose                                                                   |
| -------------- | ------------------------------------------------------------------------- |
| `get_theme`    | Pull the active brand theme — call at the start of every branded workflow |
| `list_themes`  | List all themes for the user                                              |
| `update_theme` | Shallow-merge edits                                                       |
| `delete_theme` | Remove a theme                                                            |

## Assets

| Tool             | Purpose                                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| `search_assets`  | Filter by type / query / tags / name. Newest-first.                                                              |
| `update_asset`   | Rename, retag, add description — call after generation                                                           |
| `delete_asset`   | Soft-delete                                                                                                      |
| `load_image`     | Display an image inline in the conversation                                                                      |
| `upload_asset`   | Import a publicly reachable file URL into the asset library                                                      |
| `import_chatgpt_media` | When exposed: copy one native conversation attachment and return a durable URL                                 |
| `import_media`   | Open the interactive picker when the user still needs to choose/upload files from their device                  |
| `get_upload_url` | Pre-signed PUT URL for callers that hold file bytes and can make the PUT request                                 |
| `confirm_upload` | Finalize an upload started via `get_upload_url`                                                                  |

Read `platform-upload.md` before selecting an import tool. The correct route depends on the client and where the file bytes are available.

## Editing / processing

| Tool                | Purpose                                                                                                                                                                                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `remove_background` | Cheaper than a full model call for product cutouts                                                                                                                                                                                                                                       |
| `upscale_media`     | Image and video upscaling                                                                                                                                                                                                                                                                |
| `trim_video`        | Cut a range out of a video                                                                                                                                                                                                                                                               |
| `scale_video`       | Resize / re-encode                                                                                                                                                                                                                                                                       |
| `add_subtitles`     | Burn captions into a video                                                                                                                                                                                                                                                               |
| `extract_frames`    | Pull stills from a video at specific timestamps                                                                                                                                                                                                                                          |
| `merge_media`       | Concatenate clips, overlay audio, combine media                                                                                                                                                                                                                                          |
| `transcribe`        | Audio → word-level transcript JSON (Scribe). Used by `edit-video` workflow.                                                                                                                                                                                                              |
| `isolate_audio`     | Strip background noise, music, and reverb from a voice track via ElevenLabs Voice Isolator. Takes `audio_url` (must be a public URL — upload local files first). **Async.** Returns `jobId`; poll `check_job` for the cleaned audio URL. Used as the final audio polish in `edit-video`. |

## Models

| Tool                 | Purpose                                              |
| -------------------- | ---------------------------------------------------- |
| `list_models`        | Discover available image/video/speech/3D models      |
| `get_model_params`   | Get model-specific parameters for `generate_*` calls |
| `plan_video_request` | (Helper) Plan a video generation request structure   |

## Jobs

| Tool        | Purpose                                                                                         |
| ----------- | ----------------------------------------------------------------------------------------------- |
| `check_job` | Poll an async generation job by ID. Returns `{ status, result?, error? }`. See `async-jobs.md`. |

## Credits / billing

Use these tools only when they are present on the current client; otherwise direct the user to the Creative Claw dashboard.

| Tool                  | Purpose                                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `get_credits_balance` | Current credit balance + usage. Check early if user is generating a lot.                                                  |
| `get_credits_link`    | Returns a hosted checkout URL for the user to top up. **You cannot complete checkout** — always hand the URL to the user. |

## Naming conventions

- All async generation tools return `{ jobId, status: "queued" }`. Sync tools return the result directly.
- All `generate_*` and `render_*` accept optional `name` and `tags`. Always set them.
- Asset URLs are permanent (R2-hosted) — safe to reference in HTML, store in code, share with users.
