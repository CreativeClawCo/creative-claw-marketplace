# Banners from Templates

You are building reusable, parameterized branded graphics — social posts, OG images, announcements, stat cards, quote cards — by saving an HTML layout once and rendering it many times with different data.

## When to use this workflow

- The user will produce **multiple variations of the same layout** (10 LinkedIn posts, weekly stat cards, an episode-card series)
- The user wants a **content team or another agent** to produce on-brand graphics without writing HTML
- The user wants **deterministic, repeatable output** with no AI randomness

If it's a **one-off** graphic, follow `html-image.md` directly — no template needed. If the visual is **photoreal** (a person, a product in a scene), follow `image-gen.md`.

## The two-step model

1. **Author once** with `create_template` — save the HTML, declare its parameters, set defaults.
2. **Render many times** with `render_template` — pass parameter values, get PNGs (or a single PDF).

The template is a saved HTML string with `{{parameter}}` placeholders. Each render substitutes the placeholders and runs the result through `render_html_image`'s pipeline (headless Chromium, fonts loaded, `inline_images` resolved, screenshot).

## Authoring workflow

### Step 1 — Pull the brand theme

`get_theme` first. Every template should bake in the brand's colors, fonts, logos, and shapes. If no theme, hand off to the brand-theme workflow before authoring — a template without a theme is technical debt.

### Step 2 — Sketch the layout in words

Describe the hero frame: where does the headline sit, where does the logo go, where does the accent shape land. Catch composition issues before writing HTML.

### Step 3 — Identify parameters

Anything that varies per render is a parameter:

- `headline` (string) — the big text
- `subhead` (string, optional) — supporting line
- `accent_word` (string, optional) — word to color in the accent
- `image_url` (string, optional) — hero photo
- `author` (string, optional) — quote attribution
- `stat_value` (string) — the number to show
- `stat_label` (string) — what it measures

Keep the parameter list tight — 3–7 is the sweet spot. More than that and you should split into multiple templates.

### Step 4 — Write the HTML with placeholders

Use `{{name}}` syntax for parameter substitution. For images, use `inline_images` (substituted as data URIs) — never raw `<img src="https://…">` for external assets.

```html
<!doctype html>
<html>
<head>
  <style>
    body { margin: 0; width: 1200px; height: 1200px;
           background: #0a0a0a; color: #fff;
           font-family: 'Inter', sans-serif;
           display: flex; flex-direction: column; justify-content: space-between;
           padding: 80px; box-sizing: border-box; }
    .quote { font-size: 64px; font-weight: 600; line-height: 1.15; }
    .accent { color: #ff5a00; }
    .footer { display: flex; justify-content: space-between; align-items: center; }
    .author { font-size: 24px; opacity: 0.8; }
    .logo { height: 40px; }
  </style>
</head>
<body>
  <div class="quote">{{quote}} <span class="accent">{{accent_word}}</span></div>
  <div class="footer">
    <div class="author">— {{author}}</div>
    <img class="logo" src="{{logo}}">
  </div>
</body>
</html>
```

### Step 5 — Save with `create_template`

```
create_template({
  name: "linkedin-quote-card",
  description: "1200×1200 LinkedIn quote card with accent word and brand logo",
  html: "<full HTML above>",
  width: 1200,
  height: 1200,
  parameters: [
    { name: "quote",       type: "string", description: "Main quote text" },
    { name: "accent_word", type: "string", description: "Word to color in brand accent", default: "" },
    { name: "author",      type: "string", description: "Attribution name" },
    { name: "logo",        type: "string", description: "Logo image URL", default: "<theme.logos.mark_on_dark>" }
  ],
  fonts: ["Inter"],
  tags: ["linkedin", "quote-card", "<brand>"]
})
```

Returns a template ID + name. Both work as identifiers in `render_template`.

### Step 6 — Render

One render at a time:
```
render_template({
  template_name: "linkedin-quote-card",
  parameters: { quote: "Most innovation is just removal.", accent_word: "removal.", author: "Itay" }
})
```

Or batch multiple renders in one call:
```
render_template({
  template_name: "linkedin-quote-card",
  batch: [
    { quote: "...", accent_word: "...", author: "Itay" },
    { quote: "...", accent_word: "...", author: "Itay" },
    { quote: "...", accent_word: "...", author: "Itay" }
  ]
})
```

Returns permanent PNG URLs (or a single PDF if `output: "pdf"`).

## Updating an existing template

`update_template` shallow-merges. Pass only the fields to change:

```
update_template({
  template_name: "linkedin-quote-card",
  html: "<updated HTML>",            // change the layout
  parameters: [...]                   // optional — only if param shape changed
})
```

Bumps the template version. Old renders keep their output URLs (assets are immutable); future renders use the new HTML.

## Discovering templates

```
list_templates()                      // all of the user's templates
list_templates({ tags: ["linkedin"] })// filter by tag
```

Use this before `render_template` if the user says "render the LinkedIn one" — you'll find the ID.

## When to split into multiple templates

If you find yourself adding a `variant: "dark" | "light"` parameter and branching CSS inside the template — split into two templates. Templates are cheap; per-template HTML stays simple.

## Common templates worth building first

For most brands, these four cover 80% of the work:

| Template | Size | Parameters |
|---|---|---|
| **OG image** | 1200×630 | `headline`, `subhead`, `image_url`, `logo` |
| **LinkedIn / IG square** | 1080×1080 | `headline`, `accent_word`, `author`, `logo` |
| **Story / Reel cover** | 1080×1920 | `headline`, `subhead`, `bg_image_url`, `logo` |
| **Stat card** | 1080×1080 | `stat_value`, `stat_label`, `context`, `logo` |

Build them once per brand, then never write HTML for that brand again unless the layout itself needs to change.

## Anti-patterns

- **Don't build a "universal" template** with 20 parameters and CSS branches. Make 4 small templates instead.
- **Don't bake URLs from external CDNs into the template HTML.** Use `inline_images` (passed at render time) or theme assets.
- **Don't skip the theme.** Every template should pull colors, fonts, and logos from `get_theme`.
- **Don't forget to tag.** `tags: ["linkedin", "quote", "<brand>"]` makes templates findable later.
- **Don't render one at a time when you have 10 to make.** Use `batch` — one round trip, lower latency.

## MCP tools used here

**Templates** — `create_template`, `update_template`, `list_templates`, `render_template`
**Brand** — `get_theme` (always first)
**Assets** — `update_asset` (rename/retag rendered output), `search_assets` (find prior renders)
