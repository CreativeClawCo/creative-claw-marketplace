# DOM typography and product motion

Use DOM/CSS/SVG for exact copy, captions, UI cards, charts, lower thirds, logos, and title cards. Build the readable settled frame first, then add entrance, useful hold, and exit beats. Use brand theme values from `get_theme` when exposed, or the supplied brand assets and specifications.

## Typography and captions

- Load the actual font before measuring line breaks. Specify fallbacks; verify which font rendered. Give transformed spans `display:inline-block`; constrain text width and line height. Use natural wrapping for body text; deliberate short title lines may have explicit breaks.
- Animate lines or words with short stagger and one focal reveal. Check the last word's arrival plus reading hold fits before the exit. Preserve exact copy and reading direction; avoid splitting combining characters or disrupting RTL shaping.
- For typewriters/counters, derive displayed text directly from time or a numeric proxy. Do not append characters incrementally. For a sparse typing sequence, select the latest `{time, text}` state at or before the requested time, including the initial empty state when seeking backward. Use the canvas reference's setter driver if callback behavior is uncertain.
- For captions over footage, use actual transcript timing, readable phrase groups, and consistent safe margins. Leave a contrast plate or shadow where moving footage can reduce contrast. Do not invent speech that is absent from the source.

## Product demos and charts

Use screenshots or supplied UI assets for fidelity, and DOM reconstructions for elements that need independent movement. Separate the crop wrapper from the animated inner screen. Compute cursor targets after layout once; animate the cursor to the target, press/release, then show a ripple or state change at explicit times. Simulated interaction must work without real clicks, scrolling, or hover.

For bars, use `scaleX`/`scaleY` and an explicit transform origin; keep labels legible and values accurate. For SVG paths, derive stroke length during setup and tween the dash offset. Keep numeric label widths stable. Spatial overshoot needs clearance at its largest size, not only the resting pose.

Example choreography inside an already-sized root (selectors must exist):

```js
const tl = gsap.timeline({paused: true});
tl.fromTo('#headline', {y: 32, opacity: 0},
  {y: 0, opacity: 1, duration: .55, ease: 'power3.out'}, .15);
tl.fromTo('#product', {scale: .94, opacity: 0},
  {scale: 1, opacity: 1, duration: .7, ease: 'power2.out'}, .4);
tl.fromTo('#cta', {y: 20, opacity: 0},
  {y: 0, opacity: 1, duration: .4}, 3.8);
window.__timelines = window.__timelines || {};
window.__timelines.main = tl; // root data-composition-id="main"
```

For a title card, omit footage and use a background, logo, headline, and subtitle. Match the next shot's intended final cut color. For a lower third, hold the footage full-frame, enter the panel around 1s and exit around 4.5s, adjusted to the actual brief. Roughly 5–10% margins are a starting point, not a substitute for checking the delivery crop and platform controls.
