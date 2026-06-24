# Characters & Film Pipeline

Two linked workflows: building reusable Characters, then using them in a multi-shot Film.

## Characters

A Character is a reusable persona that holds:

- **Reference image** — visual anchor used automatically when you pass `character_id` to `generate_image` or `generate_video`
- **Cloned voice** — ElevenLabs voice used automatically when you pass `character_id` to `generate_speech`
- **Description** — woven into prompt rewrites so every generation stays in-character

### Creating a Character

The full flow is conversational — no separate editor UI.

**Step 1 — Collect name + description**
Ask the user: character name, role (narrator, hero, brand mascot…), and a brief appearance description (age, hair, style, tone). Be specific — the description is baked into every prompt that uses this character.

**Step 2 — Generate the reference image (character sheet)**
Always generate a multi-angle character sheet first. This is the visual anchor that keeps every subsequent generation consistent.

Prompt template (pass verbatim, `agentic_prompting: false`):

```
Character reference sheet for [name]: [description]. Four views on a plain white background — front facing, 3/4 view, side profile, and back — same lighting, same outfit, same expression. Full body, head to toe. Clean studio style, no text or labels, no drop shadows.
```

Use `generate_image` with Nano Banana Pro or FLUX 2 Pro (high fidelity, consistent style). If the user already has a photo or asset, skip generation and use that URL directly.

**Step 3 — Save the character**

```
manage_character({
  title: "Mira",
  description: "calm narrator, silver bob hair, warm olive skin, late 30s, always wears navy linen",
  image_url: "<url from step 2>"
})
```

**Step 4 — Clone a voice (optional)**
If the user wants a custom voice, they need to provide an audio sample (~30s of clean speech):

- Ask them to attach a recording to the chat (Claude / Claude Desktop supports file attachments)
- Upload it with `upload_asset` to get a permanent R2 URL
- Call `clone_voice({ character_id, audio_url, consent: true })`

The cloned voice is then used automatically by `generate_speech` whenever `character_id` is passed.

### Using a Character

| Tool              | Effect of character_id                                                                                                 |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `generate_image`  | Character's image_url used as visual reference; description woven into prompt                                          |
| `generate_video`  | Character's image_url used as start frame (unless you pass image_url explicitly); description in prompt                |
| `generate_speech` | If character has a cloned voice → uses it via ElevenLabs directly (not fal). Falls back to default TTS model otherwise |

**Key rule:** always pass `character_id` rather than manually repeating `image_url` + `voice_id`. The server resolves both and keeps them in sync.

### List characters

`list_characters` — returns a thumbnail carousel; click a card to copy the character ID.

---

## Film Pipeline (3-Gate Workflow)

The film pipeline produces consistent multi-shot videos (up to ~60s) using Characters as the cast.

### Overview

```
create_film_project → [Gate 1: script] → generate storyboards → [Gate 2: look] → generate clips + narration → assemble_film → [Gate 3: final cut]
```

Each gate is a user approval checkpoint. **Never generate expensive assets (clips, narration) before the user approves the gate before them.**

### Gate 1 — Script

1. `create_film_project({ name, brief, character_ids, target_duration_s })` — creates the project shell, opens the film preview UI
2. Draft a logline + shot list (~1 shot per 10-12s of target duration, each ≤15s)
3. `update_film_project({ id, logline, shots: [{id, description, narration?}...], status: "script_ok" })`
4. Show the preview UI and ask the user to approve before proceeding

### Gate 2 — Storyboards

After script approval:

1. For each shot: `generate_image({ prompt: shot.description, character_id })` → patch the shot: `update_film_project({ id, patch_shots: [{id: shot.id, storyboardUrl, status: "storyboard"}] })`
2. Once all shots have storyboards: `update_film_project({ id, status: "storyboard_ok" })`
3. Show preview, ask for approval

**Model tip:** Use Nano Banana Pro for storyboard images — consistent style, fast, not too expensive.

### Gate 3 — Render & Assemble

After storyboard approval:

1. Generate narration: `generate_speech({ text: full_narration_script, character_id })` → `update_film_project({ id, audio_url })`
2. For each shot: `generate_video({ prompt: shot.prompt || shot.description, character_id, duration: shot.durationS })` → patch shot with `clipUrl` and `status: "clip"`
3. `assemble_film({ film_project_id: id })` — merges all clips + audio, uploads the assembled cut, sets status to `preview_ok`
4. Show preview, ask for final approval → `update_film_project({ id, status: "final" })`

### Long-video tips

- **≤15s per shot** — all models cap here; plan shots accordingly
- **Kling 3.0 Omni `multi_prompt`** — renders 2-3 shots in ONE generation, cutting total video credits by ~40% for multi-character scenes
- **Character consistency** — always pass `character_id`; the same reference image anchors every clip
- **Serial chain** — for maximum continuity, use the last frame of clip N as `image_url` for clip N+1

### Tools

- `create_film_project` — start a project
- `update_film_project` — save script, patch shots (storyboard/clip URLs), advance status
- `get_film_project` — load and show the film preview UI
- `list_film_projects` — browse all projects
- `assemble_film` — merge clips + audio into final cut
