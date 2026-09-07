---
name: creativeclaw-render-html-image
description: "Render a deterministic HTML/CSS layout to a PNG with Creative Claw. Use only when the user explicitly asks for HTML/CSS image rendering, supplies HTML, or explicitly requests a code-based layout; do not activate for ordinary image, poster, banner, or social-card requests."
---

# Render HTML Image

Use `render_html_image` for a pixel-controlled PNG assembled with browser HTML and CSS. This is an explicit-only route. A request for a poster, banner, social card, or branded image by itself is not permission to choose HTML rendering; use `creativeclaw-generate-image` unless the user asks for HTML/CSS or a deterministic code-based layout.

## Good uses

- A brand or theme reference board with exact fonts, color swatches, logo placement, and sample copy.
- A deterministic OG image, quote card, title card, badge, comparison graphic, or UI mockup.
- A reusable layout whose text and image slots need exact placement.
- A code-rendered reference image that the user wants to approve before using it as `image_url` for later image or video generation.

For a live preview rather than a PNG asset, use `render_html`. For a reusable parameterized layout, use `create_template` and `render_template`.

## Workflow

1. Confirm the final pixel dimensions, exact visible copy, and whether the user supplied HTML or wants you to author it.
2. For branded work, call `get_theme`; use `search_assets` for approved logos and images. Import local or attached media before referencing it.
3. Write a complete, fixed-size layout. Set `html, body` margins to zero, hide overflow, and declare fonts explicitly. Tailwind utilities work without adding a CDN, and ordinary `<style>` blocks work as in Chromium.
4. Pass public images or fonts through `inline_images` and reference each token as `{{token}}`. URLs must be publicly reachable at render time.
5. Optionally show the layout with `render_html`, then call `render_html_image` with `html`, `width`, `height`, a useful `name`, and stable `tags`.
6. Inspect the returned PNG for font loading, text fit, crop, contrast, and logo fidelity. The image render completes synchronously; do not call `check_job` for it.

## Example: theme reference board

After `get_theme`, substitute its approved values and the durable logo URL:

```text
render_html_image({
  width: 1600,
  height: 900,
  name: "acme-theme-reference-v1",
  tags: ["acme", "theme", "reference"],
  inline_images: [{ token: "logo", url: "https://<durable-logo-url>" }],
  html: `<!doctype html>
  <html><head><style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
    *{box-sizing:border-box} html,body{margin:0;width:100%;height:100%;overflow:hidden}
    body{font-family:Inter,sans-serif;background:#0B1020;color:#F7F4ED;padding:72px}
    .swatches{display:flex;gap:20px}.swatch{width:180px;height:180px;border-radius:24px;padding:18px;display:flex;align-items:flex-end;font-weight:700}
  </style></head><body>
    <img src="{{logo}}" alt="" style="width:220px;height:80px;object-fit:contain;object-position:left center">
    <h1 style="font-size:92px;line-height:.95;max-width:1100px">Build the remarkable.</h1>
    <div class="swatches">
      <div class="swatch" style="background:#FF6B35">#FF6B35</div>
      <div class="swatch" style="background:#4CC9F0;color:#0B1020">#4CC9F0</div>
      <div class="swatch" style="background:#F7F4ED;color:#0B1020">#F7F4ED</div>
    </div>
  </body></html>`
})
```

## Example: deterministic social card

```text
render_html_image({
  width: 1200,
  height: 630,
  name: "launch-announcement-card",
  html: `<main style="width:1200px;height:630px;display:grid;place-items:center;background:linear-gradient(135deg,#111827,#312e81);color:white;font:800 72px/1.05 Inter,sans-serif;text-align:center;padding:90px">Version 2.0<br>ships today</main>`
})
```

## Gotchas

- Do not use this tool when the user names an image model; the explicit model choice wins.
- Set the exact canvas size in the tool call and make the layout fill it. Avoid content whose height depends on the browser viewport or unbounded text.
- No default font is injected. Load a web font or provide a durable font URL through `inline_images`; always include a sensible fallback.
- Remote images and fonts must be reachable over HTTP(S). Do not use local paths, blob URLs, or inaccessible signed URLs.
- HTML rendering preserves logo pixels and copy placement, but a later generative model may not. If the PNG becomes a generation reference, repeat the exact brand and text constraints in that generation prompt.
