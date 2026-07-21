# OpenAI Store client rules

This skill is running through the Creative Claw app installed from the shared OpenAI Store in ChatGPT or Codex.

- Do not recommend another installation of Creative Claw. Use the tools and workflow references included with the installed Store plugin.
- Use the workflow references included in this bundle and call the Creative Claw MCP tools directly.
- In ChatGPT, do not search for or invoke local companion skills that are not exposed by the installed app. In Codex, use a local companion only when it is actually installed and relevant.
- Creative Claw does not expose an HTML-to-video MCP tool on the Store surface. Do not search for or recommend one. Use `render_html_image` / `render_template` for static graphics, or `generate_video` for AI-generated motion.
- The Store surface does not expose Creative Claw credit balance or checkout tools. If the user asks about balance or credits, direct them to the Creative Claw dashboard or pricing page; do not invent missing tool names.
- If core Creative Claw tools are missing, tell the user to reconnect or refresh the installed app and begin a new ChatGPT chat or Codex task so the client reloads the tool descriptors.

For every pasted, attached, generated, or device-local file, also follow `platform-upload.md` exactly.
