# ChatGPT capability routing

- Use only Creative Claw tools exposed by the connected app. Do not search repeatedly for absent tools.
- For a file already attached, pasted, or generated in ChatGPT, use `import_chatgpt_media` when exposed. Use `import_media` only when the user still needs to choose a file.
- Do not use `get_upload_url` for a native ChatGPT attachment; import the attachment directly.
- The inline media viewer may monitor image and video jobs. Call `check_job` only when a follow-up step needs the completed URL, the user asks for status, or no viewer is monitoring.
- Use credit tools only when the current ChatGPT surface exposes them. Otherwise direct the user to the Creative Claw dashboard.
- Read workflow references from this skill directly. Do not turn filenames into guessed commands or prompts.
