# Creative Claw — Codex plugin

This plugin also targets [OpenAI Codex](https://developers.openai.com/codex/plugins) (app, CLI, and IDE extension), in addition to Claude Code and OpenClaw. It bundles the same `creativeclaw` skill plus the Creative Claw MCP server.

## Files

| File                                     | Purpose                                                      |
| ---------------------------------------- | ------------------------------------------------------------ |
| `.codex-plugin/plugin.json`              | Codex plugin manifest (name, version, skills, `mcpServers`)  |
| `.codex-plugin/mcp.json`                 | MCP server map referenced by the manifest                    |
| `skills/creativeclaw/SKILL.md`           | Shared skill — same format Codex and Claude both read        |
| `../../.agents/plugins/marketplace.json` | Codex marketplace source (for `plugins/`-based distribution) |

> **Why `mcp.json` lives under `.codex-plugin/` (not the plugin root):** Claude Code auto-loads a root `.mcp.json` _in addition to_ the inline `mcpServers` in `.claude-plugin/plugin.json`, which would double-register the same MCP server in Claude. Keeping it inside `.codex-plugin/` (a dir Claude's loader ignores) isolates the Codex config. The manifest references it as `"mcpServers": "./.codex-plugin/mcp.json"` (path is plugin-root-relative, matching OpenAI's `"./.mcp.json"` example — **verify** Codex doesn't resolve it relative to the manifest's own dir instead).

Version is synced across all manifests (Claude, OpenClaw, Codex) by `scripts/version-sync.sh` — `package.json` remains the single source of truth.

## Install (today, via this marketplace source)

Until OpenAI opens self-serve publishing to the official Plugin Directory, distribute through a marketplace source:

- **Repo-local:** clone this repo; Codex reads plugins under `plugins/` via `.agents/plugins/marketplace.json`.
- **Personal:** copy `plugins/creative-claw` into `~/.codex/plugins/` with a `~/.agents/plugins/marketplace.json`.

Then open the Codex Plugins directory (`/plugins` in the CLI, or the Plugins screen in the app/IDE), install **Creative Claw**, and authenticate (Gmail / Clerk OAuth).

## Open verification items

1. **Remote HTTP + OAuth MCP in a plugin.** `.codex-plugin/mcp.json` uses the streamable-HTTP form (`type: http`, `url`). OpenAI's build-doc example shows a stdio server; if a plugin's MCP map only accepts stdio, switch to the bridge:
   ```json
   {
     "creative-claw": {
       "command": "npx",
       "args": ["-y", "mcp-remote", "https://app.creativeclaw.co/mcp"]
     }
   }
   ```
   `mcp-remote` performs the OAuth browser flow.
2. **Skill `references/` progressive disclosure.** Confirm Codex lazy-loads the skill's `references/**` sub-files the way Claude does; if not, the skill may need flattening for Codex.

## Official directory

Self-serve publishing + official Plugin Directory listing were "coming soon" as of June 2026 (launch was curated/partner-only). Build is ready; pursue partner placement with OpenAI when self-serve opens.
