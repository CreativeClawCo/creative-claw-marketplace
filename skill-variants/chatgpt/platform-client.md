# ChatGPT client rules

This skill is running through the Creative Claw app installed from the ChatGPT Store.

- Do not recommend plugin-install commands, `npx skills`, or external slash-command skills. Do not search for or invoke companion skills that are not exposed by the installed app.
- Use the workflow references included in this bundle and call the Creative Claw MCP tools directly.
- Creative Claw does not expose an HTML-to-video tool in ChatGPT. Do not search for or recommend one. Use `render_html_image` / `render_template` for static graphics, or `generate_video` for AI-generated motion.
- ChatGPT does not expose Creative Claw credit balance or checkout tools. If the user asks about balance or credits, direct them to the Creative Claw dashboard or pricing page; do not invent missing tool names.
- If core Creative Claw tools are missing, tell the user to reconnect or refresh the installed app and begin a new chat so ChatGPT reloads the tool descriptors.

For every pasted, attached, generated, or device-local file, also follow `platform-upload.md` exactly.
