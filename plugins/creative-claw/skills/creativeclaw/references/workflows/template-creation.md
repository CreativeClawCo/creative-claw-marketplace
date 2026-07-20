# Creating Templates

You are guiding the user through building a **reusable template** they can render again and again with different inputs. There are two flavors — pick the right one before doing anything else.

| Flavor | Output engine | When to use |
|---|---|---|
| **HTML template** | `render_html_image` (deterministic Chromium render) | Layout-driven graphics: social cards, OG images, quote cards, stat cards, episode covers, banners, posters. Text + logos + shapes + the occasional AI background image. |
| **AI-image template** | `generate_image` with reference-image anchors + a parameterized prompt | Photoreal, illustrated, or stylistic content where the *look* must stay consistent across renders: product hero shots, character portraits, lifestyle scenes, branded illustration series. |

If the user is unsure which they want, decide by what varies per render:
- **Text/data varies, look is fixed** → HTML template.
- **Subject/scene varies, style is fixed** → AI-image template.

If they want **a single one-off render and never again** → no template. Follow `html-image.md` or `image-gen.md` directly.

---

## Universal first steps (both flavors)

1. **`get_theme` first.** A template without a brand theme is technical debt. If no theme exists, hand off to the brand-theme workflow before authoring.
2. **Understand the use case in one sentence.** "Weekly LinkedIn quote card." "Product hero shot for the new shoe line." Write it down — it becomes the template description.
3. **Decide on parameters before writing anything.** Aim for **3–7 params, minimum viable**. Every extra param is a future user paralysis point. If you find yourself wanting 10, split into two templates.

---

# Flavor A — HTML template

## The iteration contract

You are not "writing HTML and saving it." You are running this loop until the user signs off:

```
ref image (or generated mock) → write HTML → render_html_image → load_image → ask user → adjust → re-render
```

Never call `create_template` until the user has seen at least one rendered PNG and approved the look.

## Step 1 — Get a visual reference

The user must give you a target to aim at. **Ask for one of:**

- **A reference image they already have** (screenshot of a competitor card, a Figma export, a Pinterest pin, an old post they liked)
- **A description detailed enough to mock** ("centered headline, brand orange accent on the last word, small logo bottom-right, dark gradient background")

If they give you only vague direction ("make it look nice"), generate a mood board first: render two or three quick HTML mocks in different directions and ask which one to develop. Do not guess silently.

## Step 2 — Sketch the layout in words

Before any HTML, describe the hero frame back to the user:
> "1080×1080. Headline top-third, 64px Inter Bold. Brand orange accent on the last word. Logo 40px, bottom-right. Dark gradient background, slight grain. Sound right?"

Catches composition mistakes in seconds instead of after a render.

## Step 3 — Identify parameters

Anything that varies per render is a parameter. Anything that's fixed across the whole template is hardcoded (theme color, logo position, font choice).

Typical HTML-template params:

- `headline` (string) — main text
- `subhead` (string, optional)
- `accent_word` (string, optional) — word to color in the brand accent
- `image_url` (string, optional) — hero photo (passed via `inline_images`)
- `bg_image_url` (string, optional) — background image (passed via `inline_images`)
- `author` (string, optional) — quote attribution
- `stat_value` / `stat_label` — for stat cards

**3–7 params. No more.** If you reach for `variant: "dark" | "light"` and a CSS branch, split into two templates.

## Step 4 — Write the HTML

Write the first draft. Hard rules:
- Use `{{name}}` for parameter substitution.
- **Never** put raw external URLs in `<img src>` or `background-image: url()`. Always pass them via `inline_images` at render time — the helper substitutes them as data URIs through the SSRF-guarded cache. CORS, redirects, and expired CDN URLs are the #1 cause of broken renders.
- Pull theme values (colors, fonts, logo URL) from `get_theme` and bake them in.
- Set explicit `width` / `height` on `body` matching the target render size.

See `banner-from-template.md` for a full HTML example and the `create_template` call shape.

## Step 5 — Render and load

Call `render_html_image` (NOT `create_template` yet) with sample data, then `load_image` the result so the user can see it in the conversation. Now iterate:

- "Headline too tight to the edge" → bump padding → re-render.
- "Accent color looks muted" → check it's pulling from `theme.colors.accent`, not a hardcoded hex.
- "Logo wrong position" → adjust → re-render.

Two to four iterations is typical. Stop when the user says it looks right.

## Step 6 — Save with `create_template`

Once approved, save it. Pass `name`, `description`, `html`, `width`, `height`, `parameters`, `fonts`, and `tags`. Then immediately do a final render via `render_template` to confirm the saved version renders identically.

See `banner-from-template.md` for the full `create_template` parameter shape and update flow.

## HTML templates that need AI-generated background images

Some HTML templates use an AI-generated image as the background or hero element (e.g., "weekly LinkedIn post with a moody abstract backdrop that matches the brand"). Two ways to handle this:

### Option 1 — Background as a parameter
The template takes `bg_image_url` as a parameter, passed in via `inline_images` at render time. Each render, the user (or you) generates a fresh background with `generate_image`, then passes the resulting URL.

**This is the right default for most cases.** The template stays a pure render; image generation is a separate step the user does first.

### Option 2 — Background baked into the template, regenerated when the look needs to change
A single saved background URL is hardcoded in the template HTML. Cheaper to render but less variety per post.

### Either way: write a "background-image prompt guide" alongside the template

When the AI-generated background is part of the template's identity, you must save a **prompt recipe** so future renders (or other agents, or the user) can regenerate on-brand backgrounds. Document it in the template's `description` field or as a short companion note:

```
Background prompt recipe (FLUX 2 Pro, 1080×1080):
  "moody abstract flow field, deep navy and brand orange #ff5a00,
   soft grain, cinematic lighting, no text, no people"
  reference_image: <theme.photography.style_reference_url>
  guidance: 4.5, steps: 28
```

This is the part templates usually get wrong — the HTML survives but the look drifts because nobody documented how to make matching imagery. Always include the recipe.

---

# Flavor B — AI-image template

This is a saved **prompt + reference-image set + parameter spec** that produces visually consistent AI-generated images with minimal user input each render.

There is no dedicated `create_image_template` MCP tool. You build the template as:
1. A set of tagged reference images in the asset library (`upload_asset` / `import_media` + `update_asset` to tag).
2. A documented prompt with `{{param}}` placeholders.
3. A documented model + parameter set (model name, guidance, steps, aspect ratio).

Save the prompt + params as a note in the asset library (upload as a tagged text asset) or hand it to the user to keep in their project. When they want to render, you reload the references, substitute params, and call `generate_image`.

## Step 1 — Collect reference images

References are non-negotiable for AI-image templates. They are how you keep the look consistent across renders. **Branded AI generation without references will drift no matter how good the prompt is.**

Ask the user for references one of three ways:

### Path A — User points you to existing files
> "I have the references in `/Users/me/brand/refs/` — point me at them."

Import each reference using the exact route in `../platform-upload.md`. Do not pass a local filesystem path to `upload_asset`. Tag imported assets with `template:<name>` and `role:reference`.

### Path B — User has them online
The user shares URLs (Notion, Drive, Pinterest, an existing brand site). Use `upload_asset` with the URL, same tagging.

### Path C — User has them locally but has not attached them — use `import_media`
> "I'll open the import picker. Drop all your reference images in there."

Call `import_media` — this opens an interactive UI where the user drops files directly. After the import completes, the assets land in the library; tag them with `update_asset`.

**If the user has zero references**, you cannot just barrel ahead. Either:
- Ask them to find one or two (a competitor's, an existing photo of theirs, a mood-board pin), OR
- Generate a candidate look with `generate_image` from the brand theme description, show it via `load_image`, and ask "does this match what you want? we'll use it as the anchor for the template" — if yes, that becomes the reference.

## Step 2 — Analyze the references

Look at every image. Out loud, summarize:

- **Subject pattern** — "all are single-subject product shots on neutral background"
- **Lighting** — "soft, slightly overhead, warm key with cool fill"
- **Composition** — "centered, ~70% frame fill, generous top space for text overlay"
- **Color palette** — "muted earth tones, single brand-orange accent prop"
- **Photographic style** — "shallow depth of field, 50mm-equivalent perspective, slight film grain"
- **What is consistent** vs. **what varies** across the references

The consistent stuff goes in the prompt. The varying stuff becomes parameters.

## Step 3 — Recommend usage to the user

Explicitly tell the user how you read the references and how you'll use them:

> "These all share warm-key product lighting on a neutral concrete surface, centered, 70% frame fill. I'll use the three best ones as `image_url` anchors in `generate_image` — Nano Banana Pro handles multi-image conditioning well. The product itself becomes a parameter; the lighting/surface/framing stay locked in the prompt. Sound right?"

Wait for the user's confirmation or correction before writing the prompt — they often know what to keep loose vs. lock down.

## Step 4 — Write the prompt with minimal dynamic params

Aim for **2–4 params**, max 5. The prompt is mostly fixed; params are the smallest set that the user has to supply per render.

**Default model: `image/gpt-image`** (pass exactly as `image/gpt-image` to `generate_image` — that's the actual model ID, not `gpt-image-2`). It handles multi-image conditioning, in-prompt image callouts, and text rendering better than the alternatives, which makes it the right default for AI-image templates that depend on multiple references playing distinct roles. Override only when there's a specific reason (FLUX 2 Pro for photoreal hero shots without strong reference leaning, Nano Banana Pro for fast iteration, Recraft for vector/illustration). See `references/models/image/gpt-image-2.md` for prompting specifics.

**Always explicitly call out each reference image inside the prompt itself**, with a one-line role for each. Without that, the model averages all references into mush.

Format: `Image N: <one line — what it is and what to take from it>`. Keep each line tight — the *role* of the image, not a description of every pixel.

```
Prompt template:
  "Studio product photo of {{subject}}, centered on a brushed concrete
   surface, soft warm key from upper left with cool ambient fill, 50mm
   perspective, shallow depth of field, slight film grain, brand-orange
   {{accent_prop}} resting in the lower-right corner of the frame,
   muted earth-tone palette, no text, no people.

   Image 1: lighting and surface reference — match the warm key direction
            and the brushed concrete texture exactly.
   Image 2: composition reference — match centered framing, ~70% frame fill,
            generous top space.
   Image 3: color and grading reference — match the muted earth-tone palette
            and slight film grain; ignore the subject."

Params:
  - subject       (string) — what to photograph (required)
  - accent_prop   (string, default: "leather strap") — the small orange object

Model:        image/gpt-image   # default for AI-image templates
Aspect:       1:1
References:   <asset urls tagged template:product-hero, role:reference>
              (passed to generate_image in the same order as Image 1/2/3 above)
Guidance:     baked-in via reference images
```

The reference URL order passed to `generate_image` **must** match the `Image 1 / Image 2 / Image 3` numbering in the prompt. Document the order alongside the prompt so future renders don't shuffle them.

Save the prompt block as a tagged text asset (`upload_asset` with the markdown above) so the user — and future you — can find it via `search_assets({ tags: ["template:product-hero"] })`.

## Step 5 — Save and offer to render now

Once the prompt + references are documented and tagged, **immediately ask if they want to generate one right now** to validate the template:

> "Template is saved. Want to try it now? I'd suggest starting with `subject: \"the new running shoe in the brand-orange colorway\"` to stress-test that the lighting and composition transfer."

Recommend a **specific first render** — don't ask "what do you want to generate?" in the abstract. Pick something representative of the template's intended use and propose it.

If the result looks off, iterate the **prompt or reference set**, not the params. Then re-render. When it looks right, the template is locked in.

---

## Iteration rules (both flavors)

- **Always show the user a render before declaring the template done.** Use `load_image`.
- **Iterate the template, not the renders.** If a render looks wrong, ask whether the *template* is wrong or just this *one render*. Fix at the right level.
- **Tag everything.** Template renders, reference images, prompt notes — all should share a `template:<name>` tag so `search_assets` finds them as a set.
- **Name everything.** Pass `name` to every `generate_*` / `render_*` call. "linkedin-quote-2026-05-05-removal" beats `image_a8f3.png` six months from now.

## Anti-patterns

- **Saving a template before any render has been approved.** You will save broken HTML or a drifting prompt.
- **More than 7 parameters.** Split the template.
- **Putting branching logic (`variant: "dark"`) inside one template.** Make two templates instead.
- **AI-image template with zero reference images.** Will drift on every render. Force-collect references first.
- **Passing reference images without naming them in the prompt.** Always include `Image 1: …`, `Image 2: …` lines so the model knows which image plays which role. Reference URL order at call time must match the numbering.
- **HTML template using raw external `<img src="https://...">`.** Use `inline_images` always.
- **Skipping the background-image prompt recipe** when an HTML template uses an AI-generated background. The HTML will outlive everyone's memory of how to regenerate matching backgrounds.
- **Asking the user "what do you want to generate?" after saving the template.** Recommend a specific first render instead — they hired you for taste, not a blank prompt box.

## MCP tools used here

**HTML flavor** — `get_theme`, `render_html_image`, `load_image`, `create_template`, `update_template`, `render_template`, `list_templates`
**Image flavor** — `get_theme`, `upload_asset`, `import_media`, `update_asset`, `search_assets`, `generate_image`, `load_image`, `list_models`, `get_model_params`
**Both** — `update_asset` (tag/name everything), `search_assets` (find prior work)

## See also

- `banner-from-template.md` — deeper HTML template mechanics (full HTML example, `create_template` parameter shape, batch rendering, the four templates worth building first for any brand)
- `html-image.md` — `render_html_image` deep dive (CSS surface, fonts, `inline_images`)
- `image-gen.md` — model selection and prompting per AI image model
- `brand-theme.md` — pull/build the theme that templates should bake in
