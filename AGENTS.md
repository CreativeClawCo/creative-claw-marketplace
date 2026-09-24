# Creative Claw Marketplace

Marketplace repo for the Creative Claw plugin: an AI media studio that runs inside Claude (Code, Desktop, web, Cowork) via MCP.

**Website:** https://creativeclaw.co
**MCP endpoint:** https://app.creativeclaw.co/mcp (declared once, in `plugins/creative-claw/.mcp.json`)
**GitHub:** https://github.com/CreativeClawCo/creative-claw-marketplace

## Skill architecture

Skills are **outcome-based** (`creativeclaw-generate-video`, `creativeclaw-build-film`, `creativeclaw-create-ugc-ad`, ...). There are no per-model skills; model guides (Nano Banana, Seedance, ElevenLabs, Cartesia, ...) are references embedded in the outcome skills that need them. `creativeclaw` is the router skill.

## Shared references

Every skill must work on its own (plugin install, single claude.ai upload, ZIP), so each skill carries real copies of the references it needs. The copies are generated; one folder is the source of truth.

### Source of truth

`plugins/creative-claw/skills/creativeclaw/references/`, the router skill's references:

| Path | What it is |
|---|---|
| `workflow-basics.md`, `platform-upload.md`, `job-recovery.md`, `media-assembly.md` | Shared by every skill |
| `images/` | Image model guides (Nano Banana, GPT Image 2, Seedream, ...) |
| `video/` | Video model guides and recipes (Gemini Omni, Seedance, MiniMax H3, ...) |
| `voices/` | Speech model guides (ElevenLabs v2/v3, Cartesia Sonic, languages, cloning, ...) |
| `avatars/identity.md` | Character identity guidance |

### Who gets what

`scripts/skill-references.json`:

- `shared`: files copied into every skill except `creativeclaw`.
- `groups`: a folder (every `.md` inside it) or a single file, mapped to the skills that receive it. Example: `"voices": ["creativeclaw-clone-voice", "creativeclaw-generate-voiceover", "creativeclaw-create-avatar"]` copies `references/voices/*.md` into those three skills.

To give a skill a new group, add its name to that group's list and run the sync.

### How copying works

```bash
node scripts/sync-skill-references.mjs          # copy canonical files into each skill
node scripts/sync-skill-references.mjs --check  # fail if any copy differs (used by CI)
```

The script writes each mapped file to `skills/<skill>/references/<same path>`, skipping copies that are already identical. `scripts/build-skill-zips.sh` runs the sync before packaging.

### Rules

1. Edit only the canonical file under `skills/creativeclaw/references/`. Never edit a copy inside another skill; the next sync overwrites it and CI rejects the drift.
2. After editing, run the sync and commit the canonical file and all updated copies together.
3. Do not replace copies with symlinks; plugin installs and claude.ai uploads do not preserve them reliably.
4. Skill-specific references (for example `creativeclaw-generate-music/references/music-prompting.md`) are not shared and live only in their own skill.
5. The sync never deletes. If you remove a canonical file or take a skill out of a group, delete the orphaned copies by hand; `--check` does not detect them.

### CI

`.github/workflows/validate.yml` runs on every push and PR: the sync `--check`, `scripts/validate-skill-architecture.sh`, and `claude plugin validate` for the marketplace and the plugin.

## Repo structure

```
.claude-plugin/marketplace.json          # Marketplace manifest (Claude reads this)
plugins/creative-claw/
  .claude-plugin/plugin.json             # Claude plugin manifest
  .mcp.json                              # MCP server (only place it is declared for Claude)
  skills/<skill>/SKILL.md                # 21 outcome skills
  skills/<skill>/references/             # synced copies + skill-specific references
  openclaw.plugin.json, plugin.json, mcp.json, .codex-plugin/, .cursor-plugin/   # other agent platforms
scripts/                                 # sync, validate, version-sync, build-skill-zips
```

## Important conventions

- Names must be kebab-case (marketplace, plugin, MCP server keys). Claude.ai marketplace sync rejects others.
- Skill files are `SKILL.md`; frontmatter `name` must equal the folder name.
- Paths in marketplace.json are relative to the repo root.
- Keep `openclaw.plugin.json`'s `skills` array in sync when adding or removing skills.

## Publishing a new version

1. Edit skills / canonical references, then `node scripts/sync-skill-references.mjs`.
2. `bash scripts/version-sync.sh X.Y.Z` (updates all manifests; skill descriptions are not stamped).
3. `claude plugin validate .` and `claude plugin validate plugins/creative-claw`.
4. Commit and push. Without a version bump, installed users will not receive changes.

## Claude Code Plugin Docs Reference

Official documentation for building and distributing plugins:

- **Discover & install plugins:** https://code.claude.com/docs/en/discover-plugins
- **Create & distribute marketplaces:** https://code.claude.com/docs/en/plugin-marketplaces
- **Plugins reference (full schema):** https://code.claude.com/docs/en/plugins-reference
- **Create plugins:** https://code.claude.com/docs/en/plugins
- **Skills:** https://code.claude.com/docs/en/skills
- **Hooks:** https://code.claude.com/docs/en/hooks
- **MCP servers:** https://code.claude.com/docs/en/mcp

### Quick Reference

- Marketplace manifest: `.claude-plugin/marketplace.json` (required fields: `name`, `owner`, `plugins`)
- Plugin manifest: `.claude-plugin/plugin.json` (required field: `name`)
- Skills: `skills/<name>/SKILL.md` with YAML frontmatter
- Plugin names: kebab-case only (e.g. `creative-claw`, not `Creative Claw`)
- User installs via: `/plugin marketplace add CreativeClawCo/creative-claw-marketplace`
- Plugin install via: `/plugin install creative-claw@creative-claw-marketplace`
- Validate with: `claude plugin validate .` or `/plugin validate .`
- Reload after changes: `/reload-plugins`
