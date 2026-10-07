# Client capability routing

Do not assume every client exposes the same apps, tools, resources, commerce controls, filesystem, or shell.

- Creative Claw must be connected. If core tools such as `search_assets`, `get_theme`, `list_models`, or `generate_image` are missing, the plugin is installed but not connected: tell the user to open the plugin's Connectors tab in their app (or the MCP server list in a terminal client), connect Creative Claw, sign in, and ask again. Where the client has no plugin flow, connect `https://app.creativeclaw.co/mcp` directly.
- Read workflow references from this skill directly. Do not turn filenames into guessed slash commands or MCP prompts.
- Use only tools listed on the current surface. Do not repeatedly search for a capability the client does not expose.
- Use `estimate_generation` when present and the user asks about cost, current balance, affordability, or fitting a generation into a budget. Pass the same model and parameters planned for generation. Its answer is an estimate; the final cost is confirmed after generation finishes.
- Never name or instruct the user to call a tool that is absent from the current tool list. Purchases and plans are handled on the Creative Claw website, not in chat; share only an account link a tool returned.
- For media ingestion, read `platform-upload.md`; the correct path depends on where the bytes are available.
