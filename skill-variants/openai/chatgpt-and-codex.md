# ChatGPT and Codex

This plugin works the same way in ChatGPT and Codex, on the same Creative Claw account. These notes cover what differs there.

## Files the user gives you

Choose the route from where the file is:

1. **Pasted, attached or generated in this ChatGPT conversation:** call `import_chatgpt_media` once per file, with the native file in `media_file`. Use the Creative Claw URL it returns in every later call.
2. **A local file Codex can read:** call `get_upload_url`, PUT the exact bytes to `uploadUrl` with the returned `contentType`, then call `confirm_upload` with the returned asset ID.
3. **The user still has to pick a file from their device:** `import_media` opens the picker. Never use it for a file already in the conversation or one Codex can read.
4. **A public, directly downloadable HTTPS URL:** use it as it is, or copy it into the library with `upload_asset`. A social post link goes through `upload_asset`, then `check_job`.

Never use `get_upload_url` for a ChatGPT attachment: ChatGPT cannot reach the upload host, while Creative Claw imports the native file itself. Never give `upload_asset` a local path, a private attachment URL or a temporary ChatGPT URL. `import_chatgpt_media`, `import_media` and `upload_asset` finish the upload themselves; call `confirm_upload` only after your own PUT.

## Tools and jobs

- Use only the Creative Claw tools the app exposes, and do not search again for one that is missing. If `find_workflows` or `get_workflow` is missing, the app has not loaded them yet: work directly with the tools, reading `get_model_params` for each model.
- In ChatGPT the media card follows image and video jobs. Call `check_job` only when a next step needs the finished URL, the user asks for status, or nothing on screen follows the job.
- Use `estimate_generation` only when the user asks about cost, their balance or a budget.
