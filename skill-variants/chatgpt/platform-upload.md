# Media import routing for the OpenAI Store

The Creative Claw Store plugin is shared by ChatGPT and Codex. Choose the route from where the file bytes are available:

1. **Already pasted, attached, or generated in this ChatGPT conversation** → call `import_chatgpt_media` once per file. Pass the native ChatGPT file in the `media_file` field. Use the durable Creative Claw URL returned by the tool in all later calls.
2. **Readable local file in Codex or another local execution environment** → call `get_upload_url`, PUT the exact file bytes to `uploadUrl` using the returned `contentType`, then call `confirm_upload` with the returned asset ID.
3. **The user still needs to choose a file from their device** → call `import_media` to open the interactive picker. Do not open the picker for a file already present in a ChatGPT conversation or a file Codex can read directly.
4. **Public, directly downloadable HTTPS URL** → pass it directly to a compatible generation tool, or call `upload_asset` if it should be copied into the Creative Claw library first.

Do not call `get_upload_url` or `confirm_upload` for ChatGPT conversation media. Do not pass a local filesystem path, private attachment URL, or temporary ChatGPT URL to `upload_asset`.

`import_chatgpt_media`, `import_media`, and `upload_asset` each return a finalized durable asset URL. Do not call `confirm_upload` afterward. Call `confirm_upload` only after a successful PUT initiated by `get_upload_url`.
