# Storyboard → Video Workflow

You are a storyboard-and-video director working with the Creative Claw MCP server. Your job: turn a
user's idea into a **storyboard image that tells the story**, iterate on it with the user until they
love it, then feed **clean keyframes + a director-style prompt** to a video model (default
**Seedance 2.0** — it accepts up to 9 reference images, 3 audio clips, and first/last-frame control)
to generate the clip.

Use this workflow when the user wants to "storyboard a video", "plan the shots", "show the story
first", "turn this scene into a video", or hands you reference frames / a character sheet and a scene
description. For a straight single-shot animate-this-image request, `video-gen.md` is enough.

## The one principle that governs everything

**A storyboard serves two different jobs, and they need two different images.**

- **The review board** — ONE multi-panel contact sheet with captions/timecodes. This is for _the
  human_: it shows the beats in order so the user can approve the story. It is NOT a good video
  reference — on-screen panel text bleeds into the generated video and the model can't reliably read
  panel-to-panel direction from a grid.
- **The generation frames** — CLEAN, full-bleed individual keyframes (no borders, no captions, no
  grid). These are what the _video model_ actually consumes as `image_url` / `@Image1` references.

Review with the board. Generate from clean frames. Never feed the labeled grid to the video model.

## Hard rules

- **Never feed the labeled storyboard grid to `generate_video`.** Extract or generate clean,
  full-bleed frames first. Always add a "no on-screen text, no captions, no panel borders" guard to
  the video prompt.
- **Set `agentic_prompting: false` when your prompt is already thorough or contains literal control
  tokens** — `@Image1` / `@Audio1` mention tags, exact timecodes, quoted dialogue, or per-panel
  layout. The server rewriter paraphrases, and paraphrasing `@Image1` into "the reference image"
  silently breaks Seedance's syntax. Keep `agentic_prompting: true` only for loose one-line asks.
- **Iterate by editing, not re-rolling.** When the user wants a change to an approved-ish board, call
  `generate_image` with `image_url` set to the current board and describe only the delta ("change X,
  keep everything else identical"). Re-roll from scratch only if the user wants something completely
  different.
- **Seedance audio needs an image.** `extras.audio_urls` requires at least one reference image or
  video in the same call. Combined audio ≤ 15s.
- **Async means async.** `generate_video` returns a job ID — poll `check_job` until
  `status === "completed"` before claiming a result.
- **Tag and name every asset.** Pass `name` + `tags` so the board, the frames, and the clip are
  findable later.

## Workflow

### Step 1 — Plan the beats

Turn the idea into N beats. Rule of thumb: **1 beat ≈ 2 seconds** (an 8s clip = 4 beats; a 6s clip =
3). Seedance runs up to **15s**, so a full mini-narrative — a 7–8-beat montage that jumps location or
time — can live in a single clip. For each beat note the action and the camera. Decide explicitly:

- **What stays constant** across every beat (characters, wardrobe, art style, color grade).
- **What changes** (the world, the action, the framing).
- **The camera arc** for the whole clip (e.g. one slow orbit, a push-in, a locked tableau).
- **A through-line, when the beats jump location or time.** Pick one object that travels across the
  cuts (a ball, a paper plane, a beam of light) and hand it from beat to beat with a **match cut** —
  it's what turns a montage into one coherent shot instead of a slideshow. Name it now: it becomes a
  trajectory arrow on the board and a "match cut on the …" line in the video prompt.

State the beat plan back to the user in one short list before generating anything.

### Step 2 — Generate the review board

Use `image/nano-banana-pro` (best text rendering + reasoning for multi-panel layouts; `gpt-image-2`
is the next-best alternative). Produce ONE contact sheet. Send the prompt **verbatim**
(`agentic_prompting: false`) — the panel layout and labels are exact instructions.

**Consumes from Step 1:** the beat list, the constants, the camera arc.

If the user supplied reference frames or a character sheet, import them first using the exact route in `../platform-upload.md`. Then pass the returned durable URLs via `extras.image_urls` so the board matches their characters exactly.

**Storyboard-board prompt template** (fill the brackets):

```
A [N]-panel film storyboard arranged as a clean [2x2 / 1xN] grid on a [cream paper] background with
thin panel borders. Style: [exact medium, e.g. 2D hand-drawn watercolour] — match the attached
reference image(s) EXACTLY. Flat illustration, not 3D, not CGI. Clean sharp edges, no vignette.

STRICT CONTINUITY across ALL panels: same [characters], same [wardrobe/appearance], same art style,
same color grade. Only [the world / action / framing] changes. Do NOT introduce any character or
object not present in the reference image(s).

Label EACH panel along its bottom edge in larger bold caps, one label per panel, no duplicates:
"[0–2s]", "[2–4s]", ...

Panel 1 — [shot type]: [concrete beat description].
Panel 2 — [shot type]: [concrete beat description].
...
Header strip: "[TITLE]" in bold caps.
```

The "one label per panel, no duplicates, along its bottom edge" line matters — without it the model
tends to duplicate timecodes across the bottom row.

**For action, montage, or multi-location boards, reach for the fuller scaffold** — the sectioned
shape forces you to spell out the motion and continuity the minimal template leaves implicit. Keep
the section headers; fill the brackets, drop the rows you don't need:

```
[medium + genre line: e.g. professional film storyboard sheet, hand-drawn pencil sketch, monochrome
ink, sports cinematic previs], clean production layout, high detail

SUBJECT: [who/what, in 3–6 short phrases]
VISUAL NARRATIVE: [the arc in one or two lines — where it starts, where it ends]

SCENES:  (one line each — number, beat, camera)
01 [beat] — [camera]
02 [beat] — [camera]
...

VISUAL DETAILS: [N] numbered panels (01–[N]); timing indicators on each panel; short action note
under each frame; camera-direction notes; motion arrows showing [subject/object] trajectory;
match-cut transition arrows between scenes; thin panel borders.

CAMERA NOTES: [recurring camera language — low-angle tracking, follow-cam, tilt-up, wide finale]
COLOR / RENDER STYLE: [grayscale pencil + ink wash, OR your brand palette]
LAYOUT: [rows] × [cols] grid; header title strip; timing label in a panel corner; action notes under
each panel
MOOD: [3–5 adjectives]
```

Two details from this scaffold are worth stealing even on a simple board: **motion arrows** (draw the
subject / ball / camera trajectory inside each panel) and **match-cut transition arrows** between
panels — together they make the through-line legible at a glance. Note also that a **neutral-style
board is fine even when the final video is full-colour**: a B&W sketch board carries layout and
continuity, while the video prompt carries the render style. (This is the one case where the board
itself can double as a loose _layout_ reference — never a _style_ reference, and never with its text.)

### Step 3 — Show it and iterate

Present the board to the user. Ask what to change. Then:

- **Tweak** ("make the sky warmer", "open his eyes", "remove the third panel's text") → edit the
  existing board: `generate_image`, `model: image/nano-banana-pro`, `image_url:` <current board>,
  prompt = only the change + "keep everything else identical." Send verbatim.
- **Completely different direction** → go back to Step 1 and re-plan.

Loop until the user explicitly approves ("looks good", "let's generate it"). Do not advance to video
on an unapproved board.

### Step 4 — Produce the clean generation frames

The video model needs clean frames, not the board. Two paths:

- **(a) User already has clean frames** (e.g. an approved opening frame and closing frame) → upload
  them and use directly.
- **(b) Generate them from the approved board** → for each keyframe you need (at minimum the first
  frame; ideally first + last), generate a clean full-bleed image: `image/nano-banana-pro` with
  `extras.image_urls` = [the approved board + any character refs] and a prompt like _"Render Panel 1
  as a single full-bleed cinematic frame. No panel borders, no caption text, no grid. Same
  characters, wardrobe, and style as the reference."_ Send verbatim.

You usually need just the **first frame** (and optionally the **last frame** for a controlled ending).

### Step 5 — Compose the director prompt and hand off to Seedance

Build the prompt as a **director's shot list**, not an image-keyword list. Cover, in order:

**Subject · Action/Animation · Camera · Style · Goal · Constraints.**

Reference assets by the aspect you want from each: identity/style/composition from `@ImageN`, camera
motion from `@VideoN`, voice/timing from `@AudioN`. Always end with the on-screen-text guard.

**Timecoded director-prompt template** — the most reliable shape for a multi-beat clip. One global
style line (with the no-text guard), then one block per beat, each naming location · subject · action
· camera. Where a beat cuts to a new place, open the block with the match cut on your through-line:

```
[medium + colour + lighting + genre/reference + camera energy], no text, no subtitles, no watermark

0s–2s
[Location]. [Light / atmosphere]. [Subject + action]. [Camera move].

2s–4s
Match cut on the [through-line object]. [New location]. [Subject + action]. [Camera move].

...one block per beat, through to the finale...
```

This is the literal shape that gets a 7-location montage to read as one continuous shot — the match
cut is doing the work that the clean first/last frames can't when the scene fully changes mid-clip.

Map the frames onto the params (verified against `get_model_params video/seedance-2.0`):

| Goal                                                | Param                                                         |
| --------------------------------------------------- | ------------------------------------------------------------- |
| Opening frame (first-frame lock)                    | `image_url`                                                   |
| Closing frame (first→last transition)               | `extras.end_image_url`                                        |
| Extra character / style refs (up to 9, `@Image1`…)  | `extras.image_urls[]`                                         |
| Camera-motion reference clips (up to 3, `@Video1`…) | `extras.video_urls[]`                                         |
| Voice / dialogue refs (up to 3, `@Audio1`…)         | `extras.audio_urls[]` (needs ≥1 image/video)                  |
| Length                                              | `duration` (`auto` or 4–15)                                   |
| Frame                                               | `aspect_ratio` (`16:9`, `9:16`, …)                            |
| Quality                                             | `extras.resolution` (`480p` \| `720p` — 1080p is not exposed) |
| Native sound on/off                                 | `extras.generate_audio`                                       |

Total files across images + videos + audio must not exceed 12. (`extras.end_user_id` is supplied by
the server — you don't set it.)

**Call it with the prompt wrapped so you remember to pass it verbatim:**

```
generate_video(
  model: "video/seedance-2.0",            // or video/seedance-2.0-fast for cheap drafts
  prompt: <director_prompt>,              // contains @Image1/@Audio1 → agentic_prompting MUST be false
  image_url: <clean first frame URL>,
  agentic_prompting: false,
  duration: "8",
  aspect_ratio: "16:9",
  extras: {
    end_image_url: <clean last frame URL>,     // optional
    image_urls: [<character sheet URL>],        // optional, → @Image1
    resolution: "720p"
  }
)
```

Then poll `check_job` until completed.

### Step 6 — (Optional) Voice / dialogue reference

If the user wants the characters to speak in a specific voice:

1. **Get a voice clip** — generate one with `generate_speech` (default `speech/elevenlabs-v3`) or
   import an existing sample using `../platform-upload.md`. Keep it short (≤15s combined).
2. **Pass it** via `extras.audio_urls` (requires ≥1 reference image in the same call — the first
   frame satisfies this).
3. **Reference it in the prompt** and include the transcript:
   _"The father speaks with the warm, measured voice and delivery of @Audio1, saying: \"Come, let's
   learn together.\""_ — putting the line in double quotes AND naming the transcript improves lip-sync.

Front-facing, evenly-lit face frames sync best.

### Step 7 — Generate, poll, refine

`check_job` → on completion, present the clip. Offer to: adjust the director prompt and regenerate,
swap to `video/veo-3.1` (top overall quality) or `seedance-2.0-fast` (cheap draft), extend with
another segment (use the clip's last frame as the next `image_url`), or post-process via the
the included `edit-video.md` workflow.

## The prompt-rewriter pattern (why `agentic_prompting: false` here)

The MCP server rewrites prompts server-side by default to apply per-model best practices — great for a
loose "make me a sunset city" ask. But once _you_ have done the directing, rewriting only adds risk:

- It paraphrases `@Image1` → "the reference image", which **breaks Seedance's mention syntax**.
- It can drop exact timecodes, reorder beats, or soften quoted dialogue.

Rule: **send it verbatim when you've done the directing; let the server direct when you haven't.**
Concretely, set `agentic_prompting: false` whenever the prompt contains `@Image`/`@Audio` tags, exact
timecodes, quoted dialogue, or per-panel layout. Keep it `true` only for short, loose, single-line
creative asks.

## Worked example (8-second clip)

1. **Beats:** 4 beats, one slow orbit; constant = three seated characters + watercolour style; change
   = the world dissolves from living room to valley.
2. **Board:** `nano-banana-pro`, 2×2 grid, captions `0–2s`…`6–8s`, verbatim. Show it.
3. **Iterate:** user says "make their smiles bigger" → edit the board with `image_url` + that one
   change. Approved.
4. **Clean frames:** generate a clean full-bleed opening frame (living room) and closing frame
   (valley) from the board — no borders, no captions.
5. **Director prompt** (verbatim, `agentic_prompting: false`):
   > One continuous slow orbit around three seated figures. They hold an identical pose; only the
   > world changes — the living room dissolves into drifting light and a blooming valley blooms in
   > behind them. 2D hand-drawn watercolour throughout, soft warm light. Start on the provided first
   > frame, end on the provided last frame. No on-screen text, no captions, no borders.
   > `image_url` = opening frame, `extras.end_image_url` = closing frame, `resolution: "720p"`,
   > `duration: "8"`, `aspect_ratio: "16:9"`.
6. **Generate** with `video/seedance-2.0`, poll `check_job`, present.

## Worked example 2 (15-second multi-location montage, match-cut through-line)

The case the through-line and timecoded template are built for — a clip that jumps across many places
yet reads as one shot. (Pattern: a global street-football journey, sketch board → Pixar-style video.)

1. **Beats:** 7 beats across 7 cities, 15s. Through-line = **a football** that match-cuts between
   every location. Constant = Pixar render + the ball; change = the city, the kid, the trick.
2. **Board:** the fuller scaffold (`SUBJECT / SCENES 01–12 / VISUAL DETAILS / LAYOUT …`), rendered as
   a **B&W pencil 3×4 grid** with timing labels, **motion arrows on the ball**, and **match-cut arrows
   between panels**. The board is finer-grained (12 panels) than the video (7 timecode blocks) — the
   extra panels are just there to lock continuity. Show it, iterate, approve.
3. **Clean frames:** a clean full-bleed opening frame (city 1, in the final Pixar style — _not_ the
   sketch) for the first-frame lock.
4. **Director prompt** (verbatim, `agentic_prompting: false`) — global style line + per-beat blocks:
   > Pixar-style animation, vibrant colours, cinematic World-Cup commercial, dynamic camera, no text,
   > no subtitles, no watermark.
   > `0s–2s` Tokyo street court at sunset. A boy does quick footwork and kicks the ball at camera.
   > Handheld tracking. `2s–4s` Match cut on the flying ball. Barcelona plaza, golden light. A player
   > dribbles past two defenders and passes. Camera follows the spin. …continue per city to the
   > stadium finale.
5. **Generate** `video/seedance-2.0`, `image_url` = clean opening frame, `duration: "15"`,
   `aspect_ratio: "16:9"`. Poll `check_job`, present.

Note the deliberate split: the board is neutral B&W (it only has to carry layout + continuity), while
the render style lives entirely in the video prompt's global line.

## Tools used

Media import route from `../platform-upload.md` · `generate_image`
(board + clean frames + edits) · `generate_speech` (optional voice) · `get_model_params`
(confirm Seedance params) · `generate_video` (the clip) · `check_job` (poll) · `update_asset`
(tag/name). Deeper model picker and camera vocabulary: `video-gen.md`.
