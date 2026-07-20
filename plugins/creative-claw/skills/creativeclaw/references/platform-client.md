# Client capability routing

Do not assume that every client exposes the same plugins, skills, commerce tools, filesystem, or shell.

- The Creative Claw MCP must be connected. If its core tools are missing, use the current client's normal plugin/app installation flow when one exists, or connect `https://app.creativeclaw.co/mcp` directly.
- The workflow files inside this skill are always available as references. Read them directly; do not turn their names into guessed slash commands.
- Suggest HyperFrames or another local composition/editing companion only when the current client explicitly exposes it and provides local filesystem/shell access. Never search for or call a missing companion tool.
- The Creative Claw MCP's HTML tools render static images, not video. If no local composition environment is available, offer `generate_video` for AI motion and explain the limitation.
- Use `get_credits_balance` and `get_credits_link` only when those tools are listed on the current surface. Otherwise send the user to the Creative Claw dashboard or pricing page.

For media files, also read `platform-upload.md`; upload routing depends on where the bytes are available.
