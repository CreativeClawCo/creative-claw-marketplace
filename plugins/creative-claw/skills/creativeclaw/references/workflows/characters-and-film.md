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
If the user wants a custom voice, brief them on recording best practices **before** they record — the quality of the sample is the #1 factor:

> **Recording tips to share with the user:**
>
> - **1–2 minutes is the sweet spot** — under 30s sounds noticeably worse, over 3min adds nothing
> - One clean take beats many mediocre clips (total runtime is what matters, not number of files)
> - Quiet room, no background music or noise, one speaker only
> - Phone mic in a quiet room is fine — natural conversational tone works best
> - The model copies everything it hears: pace, breathing, accent, inflections — so speak naturally

Two ways to get the audio URL once they have a recording:

- Ask them to use `import_media` (supports .m4a, .mp3, .wav)
- Or attach the file in chat → `upload_asset` to get an R2 URL

Then pass it directly to `manage_character` — no separate step:

```
manage_character({ id: "<character_id>", audio_url: "<r2_url>", consent: true })
```

The cloned voice is used automatically by `generate_speech` whenever `character_id` is passed. If `generate_speech` is called with a `character_id` that has no voice yet, the server stops and tells you to clone one first.

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

After script approval, generate one storyboard image per shot:

```
generate_image({
  model: "image/flux-2-pro",   // best likeness for real people
  image_url: character.imageUrl,
  prompt: "Cinematic vertical 9:16 storyboard frame. [shot description]. Keep the person's exact face and likeness.",
  agentic_prompting: false,
  aspect_ratio: "9:16"
})
```

**Model choice matters:** Use `image/flux-2-pro` for real people — it preserves facial likeness far better than Nano Banana Pro (Gemini), which reinterprets faces in its own style. Nano Banana is fine for stylised/illustrated characters.

Patch each shot: `update_film_project({ id, patch_shots: [{id: shot.id, storyboardUrl, status: "storyboard"}] })`

Once all shots have storyboards: set `status: "storyboard_ok"`, show preview, ask for approval.

### Gate 3 — Render & Assemble

After storyboard approval:

**Narration first:**

```
generate_speech({ text: full_narration_script, character_id })
→ update_film_project({ id, audio_url })
```

Use each shot's narration text to gauge `durationS` — word count ÷ ~2.5 words/sec is a rough guide.

**Generate video clips — Seedance 2.0 with dual reference:**

Use `video/seedance-2.0` (NOT Mini — Mini has weaker face consistency for real people).

Pass **both** reference mechanisms:

```
generate_video({
  model: "video/seedance-2.0",
  image_url: shot.storyboardUrl,         // scene anchor / first frame
  image_urls: [character.imageUrl],      // identity lock — keeps the person consistent
  prompt: "The person from @Image1 [action description]. [style line].",
  agentic_prompting: false,              // required — @Image1 must not be paraphrased
  duration: String(shot.durationS),
  aspect_ratio: "9:16"
})
```

- `image_url` = storyboard → tells Seedance where the scene starts
- `image_urls[0]` = character reference → locks the person's identity via `@Image1`
- Always mention `@Image1` in the prompt to activate the reference
- Always pass `agentic_prompting: false` when using `@ImageN` syntax

**Serial chain for continuity** (strongly recommended for narrative films):
After each clip is generated, `extract_frames({ url: clip.clipUrl, mode: "single", position: "last" })` and use the result as `image_url` for the next shot. This makes shot N+1 start exactly where shot N ended.

**Kling 3.0 Omni shortcut:** Use `multi_prompt` to render 2-3 shots in ONE generation — cuts video credits by ~40% and improves continuity since all shots are generated together.

Patch each shot with `clipUrl` and `status: "clip"`.

`assemble_film({ film_project_id: id })` → merges all clips + audio. Show preview, ask for final approval → `update_film_project({ id, status: "final" })`.

### Shot planning rules

- **≤15s per shot** — all models cap here
- **Never write a shot with two identical people in the same frame** — no video model can duplicate a person convincingly. Rewrite as two consecutive shots instead.
- **Keep a consistent style line** across every shot prompt (e.g. "Warm domestic lighting, realistic, handheld, 9:16") — copy-paste it verbatim into each prompt for visual cohesion.

### Tools

- `create_film_project` — start a project
- `update_film_project` — save script, patch shots (storyboard/clip URLs), advance status
- `get_film_project` — load and show the film preview UI
- `list_film_projects` — browse all projects
- `assemble_film` — merge clips + audio into final cut
