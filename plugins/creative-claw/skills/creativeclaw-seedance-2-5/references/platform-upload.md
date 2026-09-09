# Media import routing

Choose the route from where the file bytes are currently available. Do not substitute one route for another.

1. **Already pasted, attached, or generated in ChatGPT** → call `import_chatgpt_media` once per file. Pass the native ChatGPT file in `media_file`. Use the durable Creative Claw URL returned by the tool.
2. **Readable local file in Codex, Claude Code, or another execution environment that can make an HTTP PUT** → call `get_upload_url`, PUT the exact file bytes to `uploadUrl` using the returned `contentType`, then call `confirm_upload` with the returned asset ID.
3. **The user still needs to choose a file from their device** → call `import_media` to open the interactive picker. Do not call it for a file already attached to the conversation.
4. **Public, directly downloadable HTTPS URL** → pass it directly to a compatible generation tool, or call `upload_asset` if it should be copied into the Creative Claw library first.

Never pass a local filesystem path or private conversation URL to `upload_asset`. Never call `confirm_upload` after `import_chatgpt_media`, `import_media`, or `upload_asset`; those routes already finalize the asset.

In ChatGPT, do not use `get_upload_url` for conversation attachments. The ChatGPT execution environment may be unable to resolve or reach the presigned R2 hostname even though Creative Claw itself can import the native file.
