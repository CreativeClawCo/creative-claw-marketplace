# ChatGPT capability routing

- Use only Creative Claw tools exposed by the connected app. Do not search repeatedly for absent tools.
- For a file already attached, pasted, or generated in ChatGPT, use `import_chatgpt_media` when exposed. Use `import_media` only when the user still needs to choose a file.
- Do not use `get_upload_url` for a native ChatGPT attachment; import the attachment directly.
- The inline media viewer may monitor image and video jobs. Call `check_job` only when a follow-up step needs the completed URL, the user asks for status, or no viewer is monitoring.
- Use `estimate_generation` only when the user asks about cost, balance, affordability, or supplies a budget constraint. Pass the exact planned model and parameters for a supported operation. Answer estimate-only requests without generating. If generation is already requested and fits the constraints, proceed without another approval question. Do not invent estimates for processing operations it does not cover.
- Use account tools or links only when exposed and relevant to the user's account question. Do not turn ordinary media requests into billing or account-management conversations.
- Read workflow references from this skill directly. Do not turn filenames into guessed commands or prompts.
