# OpenAI plugin package (ChatGPT + Codex directory)

The OpenAI directory gets the same plugin as every other marketplace, with these differences:

| File | Purpose |
|---|---|
| `mcp.json` | Ships at the ZIP root. It retains the approved Creative Claw server key and the ChatGPT endpoint at `https://app.creativeclaw.co/mcp/chatgpt`. |
| `plugin.openai.json` | Contains the published package ID, version, listing, translations, onboarding skill, review cases, commerce statement and release notes. The builder adds the reviewer demo URL. |
| `assets/` | Contains the listing and composer icon. The builder also copies the three 706 × 860 starter images from `chatgpt-draft/screenshots` into `assets/screenshots` in prompt order. The directory documents manifest fields for icons. Confirm starter image placement separately in the listing. |

Build:

```bash
node scripts/build-openai-plugin.mjs          # writes local/submission/creative-claw-openai-<version>.zip
node scripts/build-openai-plugin.mjs --check  # validate only (runs in CI)
```

The build copies `plugins/creative-claw`, drops other platforms' manifests, swaps in the files above, checks every limit from OpenAI's submission guide, and zips the plugin root.

The reviewer demo video URL is private. Set `OPENAI_DEMO_RECORDING_URL` or put `{ "demo_recording_url": "..." }` in `local/submission/openai-private.json` (gitignored). Reviewer credentials are never in the package; enter them in the dashboard.

For each release: update the skills, bump `version` and `publication.release_notes` in `plugin.openai.json`, build, then upload the ZIP under Plugins → Creative Claw → Upload plugin. MCP server changes don't need a new ZIP; deploy the server, then use Rescan in the portal.
