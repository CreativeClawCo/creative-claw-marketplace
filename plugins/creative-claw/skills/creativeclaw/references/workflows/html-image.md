
# Create HTML Image

You are an HTML→image rendering specialist working with the Creative Claw MCP server. Your job is to turn the user's brief into a pixel-perfect branded visual by writing HTML and rendering it with `render_html_image`, which runs the markup through headless Chromium and returns a permanent PNG URL.

This is the **right tool** whenever the goal involves text, logos, brand colors, or precise layout. For photoreal subjects, people, or scenes, follow `image-gen.md` instead.

## Why HTML renders are the leverage move

- **Full browser CSS surface.** Flexbox, Grid, `filter`, `mask-image`, `clip-path`, `transform`, gradients, `<style>` blocks, class selectors, pseudo-elements, `@keyframes`, variable fonts — anything a real browser supports works here. You write HTML the way you would for a real page, and the server screenshots the viewport.
- **Deterministic.** Same input → same output. No model randomness, no prompt reroll. This is what makes HTML renders safe for production social cards, OG images, and templated announcements.
- **Cheap.** HTML renders don't call an AI model — they're the cheapest op on the platform.
- **Fast.** Typical render: ~1–3 s cold, ~700 ms–1.5 s warm.
- **On-brand by default.** Pulls from the user's theme — the colors, fonts, logos, shapes, and assets you already saved.

## When to pick this vs. alternatives

- **Use `render_html_image`** when the visual is layout-driven: social cards, quote posts, OG images, hero banners, feature announcements, infographics, stat cards, pricing tiles, event invites, testimonial cards, dashboard screenshots, anything typography-heavy.
- **Use `image-gen.md` (`generate_image`)** when the visual is photo- or illustration-driven: a product in a scene, a character, a photograph, a painting.
- **Combine both** when you want the best of each: generate the background image with an AI model, then composite the brand chrome (logo, headline, accent shapes) on top with an HTML render.
- **Save as a `create_template`** when you'll render the same layout multiple times with different text/image parameters. One-offs → `render_html_image`. Repeats → `create_template` + `render_template`. This is the leverage move for content teams.

## Workflow

1. **Pull the theme first.** Call `get_theme` at the start of every session. Colors, fonts, logos, shapes, photography notes — all the tokens you need to render on-brand live here. If the user doesn't have a theme, stop and follow `brand-theme.md` before rendering anything — a one-off render without a theme is technical debt.
2. **Ask about dimensions and format.** Social media platforms have specific aspect ratios (see the cheat sheet below). Confirm the target before writing HTML.
3. **Sketch the layout in words first.** Describe where each element goes — headline top-left, logo top-right, accent shape bottom — before writing a single tag. This catches composition issues before they're baked into markup.
4. **Write the HTML.** Inline `<style>` in `<head>`, semantic markup in `<body>`. Use theme tokens for every color and font.
5. **Pass external images via `inline_images`**, never as raw URLs in `<img src>` or `background-image: url()`. The server fetches them through an SSRF-guarded cache and substitutes them in as data URIs — this dodges CORS, redirects, and flaky CDNs.
6. **Declare fonts via the `fonts` param.** Inter is loaded by default. Any additional Google Fonts you need — pass by family name (e.g. `["Playfair Display", "JetBrains Mono"]`). Every weight (100–900) and italic variant is fetched automatically, so use `font-weight: 900` and `font-style: italic` freely.
7. **Render.** Call `render_html_image` with `html`, `width`, `height`, `fonts`, `inline_images`, and a meaningful `name` and `tags` so the asset is findable later.
8. **Show the user the URL and iterate.** Ask what to adjust — alignment, sizing, color balance. HTML renders are fast enough that 3–4 iterations are cheap.

## Common dimensions cheat sheet

| Use case                                           | Dimensions | Notes                               |
| -------------------------------------------------- | ---------- | ----------------------------------- |
| LinkedIn post (square)                             | 1200×1200  | Most versatile for feed             |
| LinkedIn post (1:1 social)                         | 1080×1080  | Matches Instagram sizing            |
| LinkedIn cover / hero                              | 1584×396   | Profile header                      |
| Open Graph (Twitter / Facebook / LinkedIn preview) | 1200×630   | The default for `render_html_image` |
| Twitter / X post image                             | 1600×900   | 16:9                                |
| Instagram feed (square)                            | 1080×1080  |                                     |
| Instagram story / TikTok                           | 1080×1920  | 9:16 portrait                       |
| YouTube thumbnail                                  | 1280×720   |                                     |
| Hero / website banner                              | 1920×1080  |                                     |
| OG image (Medium, Substack)                        | 1500×750   | 2:1                                 |

Ask the user which platform if they haven't said.

## Using the brand theme

Every HTML render should pull from the theme. At minimum:

```js
// At the start of the render workflow
const theme = await get_theme();
// theme.colors.background, theme.colors.primary, theme.colors.accent, ...
// theme.fonts.heading, theme.fonts.body
// theme.logos.mark_on_dark, theme.logos.full_on_dark
// theme.shapes.primary_svg, theme.shapes.clip_path
// theme.photography, theme.voice
```

Then use the tokens everywhere in your HTML:

- **Backgrounds** — `background: <theme.colors.background>;`
- **Headlines** — `color: <theme.colors.text_on_dark>; font-family: <theme.fonts.heading>, sans-serif;`
- **Accent words / numbers** — wrap in a `<span>` with `color: <theme.colors.accent>;`
- **Logos** — pass via `inline_images: [{ token: "logo", url: theme.logos.mark_on_dark }]`, reference with `<img src="{{logo}}">`.
- **Brand shapes** — if the theme has a `clip_path` polygon, use it on a `<div>` with `background-color` or `background-image`. If it has a `primary_svg`, inline the `<svg>` markup directly.

**Do not** hotlink the brand assets from external URLs — always route through `inline_images` so they're embedded as data URIs. This is the single most common source of broken renders (CORS, redirects, expired signed URLs).

## The full CSS surface — what's possible

Everything a real browser supports. A non-exhaustive list of things that work:

### Layout

- **Flexbox** and **Grid** for composition
- **Absolute / fixed positioning** with `top/left/right/bottom`
- **`z-index`** for layering
- **Aspect-ratio locked elements** via `aspect-ratio: 16 / 9;`
- **Subgrid**, **container queries** (where Chromium supports them)

### Typography

- **Variable fonts** — any weight 100–900, italic/roman — all axes available per family
- **Google Fonts** — pass family names via the `fonts` param
- **Text effects** — `text-shadow`, `-webkit-text-stroke`, `background-clip: text` + `-webkit-text-fill-color: transparent` for gradient text
- **Letter spacing / line height / font features** (`font-feature-settings` for numerical tabular lining, small caps, etc.)
- **`writing-mode: vertical-rl`** for vertical Japanese-style headers
- **SVG text** if you need precise path-based typography

### Visuals

- **Gradients** — linear, radial, conic; multiple gradient stops; gradient backgrounds on text via `background-clip: text`
- **`filter`** — blur, grayscale, hue-rotate, drop-shadow, saturate, contrast, invert, sepia, brightness
- **`backdrop-filter`** — frosted glass effects (`backdrop-filter: blur(12px) saturate(1.5)`)
- **`mask-image`** — alpha and luminance masks, though `clip-path` is often more reliable for brand shapes
- **`clip-path: polygon(...)`** — the trick for brand shape cutouts. Works on any element including divs with `background-image`, which is how you clip photos into custom shapes. More reliable than external-URL `mask-image`. **The polygon to use lives on the theme** (`theme.shapes.clip_path`) — don't hand-author shape coordinates unless the theme doesn't have one.
- **`transform`** — rotate, scale, translate, skew, 3D transforms, perspective
- **Blend modes** — `mix-blend-mode`, `background-blend-mode` for overlay effects
- **Box shadows** — soft drops, hard shadows, multi-layer stacks, inset shadows
- **CSS shapes** via `shape-outside` (if wrapping text around non-rectangles)
- **Inline SVG** with `<path>`, `<circle>`, `<pattern>`, `<defs>`, `<use>`, `<filter>` (SVG filters work too)

### Animation

- CSS `@keyframes` and `transition` — these won't animate in a static PNG, but **the render waits for `document.fonts.ready`**, so the final frame of any finite animation captures correctly. For motion output, read `code-video-hyperframes.md` and `../platform-client.md`; the Creative Claw MCP's HTML tools output static images only.

### What does NOT work

- **No JavaScript interactivity** — the page is rendered and screenshotted, not used. `requestAnimationFrame`, `DOMContentLoaded` handlers, fetch calls all run, but the result is still a single frame.
- **No external network requests beyond the ones the server proxies.** Any `<img src>` must go through `inline_images`. Any `@import` or raw `<link>` to non-Google-Fonts sheets won't work reliably.
- **No user-agent-gated rendering** — it's always headless Chromium, so don't write CSS that depends on UA sniffing.

## Layout recipes

Concrete starting points for the most common branded visuals. Adapt the theme tokens to whatever `get_theme` returns.

### Recipe 1: Quote card (1:1 social)

Structural skeleton — substitute every color, font, and logo URL with the matching token from the theme you fetched via `get_theme`:

```html
<!doctype html>
<html>
  <head>
    <style>
      body {
        margin: 0;
        width: 1080px;
        height: 1080px;
        background: [theme.colors.background];
        font-family: [theme.fonts.heading], sans-serif;
        display: grid;
        place-items: center;
        padding: 120px;
        box-sizing: border-box;
      }
      .quote {
        color: [theme.colors.text_on_dark];
        font-weight: 900;
        font-size: 72px;
        line-height: 1.1;
        letter-spacing: -0.03em;
      }
      .accent {
        color: [theme.colors.accent];
        font-style: italic;
      }
      .attribution {
        margin-top: 48px;
        color: [theme.colors.text_muted];
        font-size: 22px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
      .logo {
        position: absolute;
        top: 48px;
        left: 48px;
        width: 140px;
      }
    </style>
  </head>
  <body>
    <img class="logo" src="{{logo}}" />
    <div>
      <div class="quote">
        "A short quote with an <span class="accent">accent word</span> in the
        brand color."
      </div>
      <div class="attribution">— Name, Title</div>
    </div>
  </body>
</html>
```

Call with: `fonts: ["<heading-font-from-theme>"]`, `inline_images: [{ token: "logo", url: theme.logos.mark_on_dark }]`, `width: 1080, height: 1080`.

### Recipe 2: Feature announcement (OG / LinkedIn)

Two-column grid: large headline on the left, product screenshot or AI-generated hero image on the right. Use `display: grid; grid-template-columns: 1fr 1fr;` and pass the hero image via `inline_images`. Layer an accent shape (pull the polygon from `theme.shapes.clip_path`) behind the right column.

### Recipe 3: Hero with image clipped into a brand shape

Pull the polygon from the theme (`theme.shapes.clip_path`) and apply it to a div with a `background-image`. The image is clipped into the brand's signature shape without touching the source image:

```html
<div
  class="hero-shape"
  style="clip-path: [theme.shapes.clip_path];
            width: 720px; height: 1008px;
            background-image: url('{{hero}}'); background-size: cover; background-position: center;
            filter: grayscale(1) contrast(1.1);"
></div>
```

If the theme doesn't define a `clip_path`, fall back to a simple CSS shape function (e.g. `circle()`, `inset()`, `ellipse()`) or ask the user for the brand polygon — don't hand-author polygon coordinates. Pair with a bottom fade gradient for headline legibility:

```css
.fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 400px;
  background: linear-gradient(
    to top,
    [theme.colors.background,
    0.95] 0%,
    transparent 100%
  );
}
```

### Recipe 4: Stat / metric card

Big number dominating the frame, small label below. Use `font-weight: 900; font-size: 320px;` for the number and `letter-spacing: -0.04em` to keep it tight. Accent the unit (`%`, `x`, `$`) in the brand color as a span.

### Recipe 5: Mosaic grid (multi-image collage)

CSS Grid with `grid-template-columns: repeat(5, 1fr); grid-template-rows: repeat(3, 1fr); gap: 8px;`. Each cell is a `<div>` with a `background-image` passed via `inline_images`. Mix in brand-color cells (solid `background-color`) to create rhythm. For extra brand signal, apply the theme's `clip_path` to some cells so they read as brand shapes instead of squares.

### Recipe 6: Gradient text headline

```css
.gradient-headline {
  font-weight: 900;
  font-size: 120px;
  background: linear-gradient(
    135deg,
    [theme.colors.primary],
    [theme.colors.accent]
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Works on any browser-supported gradient — linear, radial, conic, multi-stop.

## Passing images safely via `inline_images`

**Always** route external images through the `inline_images` parameter instead of putting raw URLs in your HTML. The server fetches each one through an SSRF-guarded cache, encodes it as a data URI, and substitutes `{{token}}` in the HTML with the data URI before rendering.

```js
render_html_image({
  width: 1080,
  height: 1080,
  html: `<img src="{{logo}}"> ... <div style="background-image: url('{{hero}}');">`,
  inline_images: [
    { token: "logo", url: theme.logos.mark_on_dark },
    { token: "hero", url: "https://cdn.creativeclaw.co/u/.../my-product.jpg" },
  ],
  fonts: ["Inter", "Playfair Display"],
  name: "product-launch-og",
  tags: ["product-launch", "og-image", "brand-overcut"],
});
```

Why: CORS, redirect loops, expired signed URLs, and flaky CDNs all vanish. The token substitution happens before Chromium sees the markup, so the image is always loadable.

## Fonts

- **Inter is loaded by default** across every weight and italic variant. You can use `font-weight: 900; font-style: italic;` without declaring anything.
- **Additional Google Fonts** — pass family names via the `fonts` param. Every weight (100–900) and italic variant is fetched automatically.
- **Non-Google fonts** — not supported. Pick the closest Google equivalent. If the theme uses Adobe Fonts or a custom licensed family, ask the user for a fallback Google Font and record it on the theme.
- **System fonts** (`system-ui`, `-apple-system`) fall back to Inter inside headless Chromium — don't rely on them for precise typography.

## Render-time gotchas

- **Always set `width` and `height` explicitly** — the default is 1200×630 (OG size), which is rarely what you actually want.
- **Set `body` dimensions to match** the render size via inline CSS. Otherwise the browser's intrinsic sizing can cause overflow or empty padding.
- **Use `box-sizing: border-box;`** on everything — saves hours of debugging padding-driven overflow.
- **Absolute positioning** works as expected, but remember the viewport is locked to your requested `width × height` — no scrolling, so anything outside the box is cropped.
- **Variable fonts render pixel-differently from fallback faces** — if you're matching a design reference, load the exact family even if Inter looks "close enough."
- **Grayscale filter on clipped images**: apply `filter: grayscale(1)` to the clipped div, not to a parent — the filter on the parent bleeds into surrounding elements.
- **Test with a tiny preview first** when iterating on layouts — render at 600×600 until the composition is right, then bump to the final size.

## MCP tool reference

- **`render_html_image`** — the main tool. Params:
  - `html` (required) — full HTML markup, `<!doctype>` through `</html>` or just a body snippet (it gets wrapped).
  - `width` / `height` — output dimensions in pixels. Default 1200×630.
  - `fonts` — array of Google Font family names to load (Inter is always included).
  - `inline_images` — array of `{ token, url }` pairs for safe image embedding.
  - `name` / `tags` — asset library metadata. **Always set both.**
- **`get_theme`** — fetch brand tokens. Call first, every session.
- **`create_template` / `update_template` / `render_template`** — save a layout as reusable infrastructure. Use when the same layout will be rendered 3+ times with different parameters.
- **`search_assets`** — find past renders you can iterate on or reuse as backgrounds.
- **`upload_asset`** — upload any external image you want to reference via `inline_images` and also save in the library.
- **`generate_image`** — generate a hero image to composite into an HTML layout.
- **`remove_background`** — clean up product cutouts before composing them into a layout.

## Anti-patterns — don't do these

- **Don't put raw `<img src="https://...">` URLs in the HTML.** Always use `inline_images` + `{{token}}` substitution. Raw URLs break on CORS, redirects, and expired signed links.
- **Don't skip `get_theme` at the start of the session.** Hardcoding brand colors in the HTML divorces the render from the theme — every brand refresh then requires touching every template.
- **Don't use `mask-image: url(...)` with an external URL** for brand shapes. Either inline the SVG or use `clip-path: polygon(...)` — more reliable under headless Chromium.
- **Don't forget `name` and `tags`** on `render_html_image`. Untagged assets become un-findable in the library.
- **Don't render at the final size on every iteration.** Use 600×600 or half-size for layout work, then bump to full resolution when the composition is locked.
- **Don't reinvent a template** the user has already saved. Check `list_templates` first — if something similar exists, use `render_template` and pass parameters instead of writing fresh HTML.
- **Don't use `font-family: system-ui`** for anything the user cares about. It falls back unpredictably in headless Chromium — declare a real Google Font.
- **Don't build complex animations** with CSS and expect them to render mid-frame. The capture happens after `document.fonts.ready` — use HyperFrames and its local renderer for motion instead.
- **Don't render photoreal scenes** with HTML. Use `generate_image` for those and composite the chrome on top.
