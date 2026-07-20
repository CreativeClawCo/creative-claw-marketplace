# Code-driven branded video (HyperFrames + Creative Claw assets)

For kinetic typography, animated logos, branded title cards, data visualizations, lower thirds, end screens, and other deterministic frame-accurate video, the Creative Claw MCP does not render HTML compositions to video; its HTML rendering tools produce static images.

First read `../platform-client.md`. Only continue with a local composition workflow when the current client has filesystem/shell access and explicitly exposes the required companion. Never search for or invoke an absent HTML-video MCP tool.

## Local composition when supported

The composition contract, timeline rules, capture behavior, scene transitions, GSAP patterns, fonts, and rendering workflow live in the dedicated HyperFrames skills:

When the HyperFrames authoring and CLI skills are actually exposed, use them for authoring, `init`, `lint`, local preview, and rendering. Follow those skills as the source of truth. If they are absent, explain that deterministic HTML-video rendering is unavailable in the current client and offer `generate_video` for AI-generated motion instead.

## How Creative Claw fits into the pipeline

Use Creative Claw to create and organize the media that the HyperFrames composition consumes:

- **Static branded graphics and frame checks** → `render_html_image`
- **Photoreal hero images and backgrounds** → `generate_image` (for branded work, first call `get_theme` and provide a reference image via `image_url`)
- **Cinematic clips** → `generate_video`, then poll `check_job`
- **Voiceover** → `generate_speech`
- **Cutout product shots** → `generate_image`, then `remove_background`

Creative Claw outputs have permanent asset URLs that can be used in the local composition's `<img>`, `<video>`, and `<audio>` elements. Tag every generated asset with the project, scene, and role so `search_assets` can retrieve it later.

Pull the brand theme first with `get_theme` so asset generation uses the correct colors, fonts, logos, and photography style.

## Reusable layouts

Creative Claw's `create_template` and `render_template` tools support reusable static HTML-to-image layouts. They do not render video. For reusable motion compositions, keep the parameterized composition in the HyperFrames project and render variants through the HyperFrames CLI.

## When not to use this workflow

- **Photoreal motion of people, scenes, or products** → use `generate_video` with an AI video model.
- **Static branded image** → use `render_html_image` or `render_template`.
- **One-off edits to existing footage** → follow `edit-video.md`.
