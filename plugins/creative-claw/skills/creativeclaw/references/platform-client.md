# Client capability routing

Do not assume every client exposes the same apps, tools, resources, commerce controls, filesystem, or shell.

- Creative Claw must be connected. If core tools such as `search_assets`, `get_theme`, `list_models`, or `generate_image` are missing, use the client's normal plugin/app installation flow when available, or connect `https://app.creativeclaw.co/mcp` directly.
- Read workflow references from this skill directly. Do not turn filenames into guessed slash commands or MCP prompts.
- Use only tools listed on the current surface. Do not repeatedly search for a capability the client does not expose.
- Use `get_credits_balance` and `get_credits_link` only when present. Otherwise direct the user to the Creative Claw dashboard.
- For media ingestion, read `platform-upload.md`; the correct path depends on where the bytes are available.
