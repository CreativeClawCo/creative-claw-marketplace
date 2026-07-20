# Media import routing for ChatGPT

Use only the route that matches the user's media:

1. **Already pasted, attached, or generated in this ChatGPT conversation** → call `import_chatgpt_media` once per file. Pass the native ChatGPT file in the `media_file` field. Use the durable Creative Claw URL returned by the tool in all later calls.
2. **Not attached yet and the user needs to choose a local file** → call `import_media` to open the interactive picker. Do not open the picker for a file already present in the conversation.
3. **Public, directly downloadable HTTPS URL** → pass it directly to a compatible generation tool, or call `upload_asset` if it should be copied into the Creative Claw library first.

Do not call `get_upload_url` or `confirm_upload` for ChatGPT conversation media. Do not pass a local filesystem path, private attachment URL, or temporary ChatGPT URL to `upload_asset`.

`import_chatgpt_media`, `import_media`, and `upload_asset` each return a finalized durable asset URL. Do not call `confirm_upload` afterward.
