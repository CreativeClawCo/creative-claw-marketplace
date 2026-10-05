# OpenAI plugin package (ChatGPT + Codex directory)

The OpenAI directory gets the same plugin as every other marketplace, with these differences:

| File | Purpose |
|---|---|
| `mcp.json` | Not shipped. The published plugin's MCP server is set in the portal and an upload cannot add, remove or replace it; this file records which one it is and the build checks it. The ChatGPT surface, `https://app.creativeclaw.co/mcp/chatgpt`. It hides checkout tools. The marketplace plugin keeps the general `/mcp` endpoint for Claude, Cursor, OpenClaw and Codex-from-git installs. |
| `plugin.openai.json` | The plugin `name`, which must be the published plugin's ID (`app-6a25…`) or the portal rejects the upload. Directory version (must be above the last published OpenAI version), discovery keywords, and the full `extensions.com.openai`: listing, onboarding skill, review test cases, commerce statement and release notes. |
| `assets/` | Icons referenced by the listing. |

Build:

```bash
node scripts/build-openai-plugin.mjs          # writes output/openai/creative-claw-openai-<version>.zip
node scripts/build-openai-plugin.mjs --check  # validate only (runs in CI)
```

The build copies `plugins/creative-claw`, drops other platforms' manifests, swaps in the files above, checks every limit from OpenAI's submission guide, and zips the plugin root.

The reviewer demo video URL is private. Set `OPENAI_DEMO_RECORDING_URL` or put `{ "demo_recording_url": "..." }` in `local/submission/openai-private.json` (gitignored). Reviewer credentials are never in the package; enter them in the dashboard.

For each release: update the skills, bump `version` and `publication.release_notes` in `plugin.openai.json`, build, then upload the ZIP under Plugins → Creative Claw → Upload plugin. MCP server changes don't need a new ZIP; deploy the server, then use Rescan in the portal.
