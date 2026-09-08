# Client capability routing

Do not assume every client exposes the same apps, tools, resources, commerce controls, filesystem, or shell.

- Creative Claw must be connected. If core tools such as `search_assets`, `get_theme`, `list_models`, or `generate_image` are missing, use the client's normal plugin/app installation flow when available, or connect `https://app.creativeclaw.co/mcp` directly.
- Read workflow references from this skill directly. Do not turn filenames into guessed slash commands or MCP prompts.
- Use only tools listed on the current surface. Do not repeatedly search for a capability the client does not expose.
- Use `estimate_generation` when present and the user asks about cost, current balance, affordability, or fitting a generation into a budget. Pass the same model and parameters planned for generation. Its answer is an estimate; the final cost is confirmed after generation finishes.
- Use `get_credits_balance` and `get_credits_link` only when present. Never name or instruct the user to call a tool that is absent. When account management is needed, use the account URL returned by `estimate_generation` or direct the user to the Creative Claw dashboard.
- For media ingestion, read `platform-upload.md`; the correct path depends on where the bytes are available.
