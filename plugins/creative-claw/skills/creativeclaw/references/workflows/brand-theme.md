# Brand themes

A theme is the reusable brand context for media generation: structured colors, fonts, logos, notes, and visual reference images.

## Theme data contract

Use the current structured shape:

```json
{
  "notes": "Audience, tone, visual direction, do/don't guidance in Markdown.",
  "referenceImageUrl": "https://...",
  "fonts": [
    { "name": "Inter", "source": "google", "role": "heading" },
    {
      "name": "Acme Sans",
      "source": "custom",
      "role": "body",
      "files": [
        {
          "url": "https://.../acme-regular.woff2",
          "weight": 400,
          "style": "normal",
          "format": "woff2"
        }
      ]
    }
  ],
  "colors": [
    { "name": "Brand blue", "hex": "#2563EB", "role": "primary" },
    { "name": "Ink", "hex": "#111827", "role": "fg" }
  ],
  "logos": [
    {
      "name": "Primary mark",
      "url": "https://.../logo.svg",
      "variant": "color",
      "hasBackground": false
    }
  ]
}
```

Valid font roles: `heading`, `body`, `mono`, `accent`. Valid color roles: `primary`, `secondary`, `accent`, `bg`, `fg`, `muted`. Valid logo variants: `light`, `dark`, `mono`, `color`.

`update_theme.data` shallow-merges top-level keys. Supplying `colors`, `fonts`, or `logos` replaces that entire top-level collection. `images` always replaces the full theme reference-image array, and its first item becomes the thumbnail.

## Create or edit interactively

For requests such as “set up my brand,” “create a theme,” or “edit my theme,” prefer the visual editor:

```text
update_theme({ interactive: true })
update_theme({ name: "Acme", interactive: true })
```

The user selects exact values and saves them. Do not duplicate the editor with a long interrogation unless the client cannot display it.

## Direct workflow

Use direct updates when the user provides exact data or asks for a narrow programmatic change.

1. Call `list_themes` and `get_theme({ name })` to inspect the current state.
2. Import logos, font files, product images, and style references through `../platform-upload.md`.
3. Organize imported media with names and stable tags.
4. Build the smallest exact `data` patch and, if needed, the complete new `images` array.
5. Call `update_theme`.
6. Fetch the theme again and verify every URL and intended role.

Use `override: true` only when the user explicitly asks to replace the whole theme. Use `set_default: true` only when they explicitly ask to make it default.

## What to capture

- Exact colors with semantic roles.
- Font family, source, role, and files for custom fonts.
- Logo variants with transparent backgrounds when appropriate.
- One to several reference images showing the desired photographic or illustrative language.
- Notes covering audience, mood, composition, lighting, materials, typography character, prohibited treatments, and tone of voice.

Do not invent brand values. If a website or source material is ambiguous, present what was found and ask the user to confirm before saving.

## Extract from a website or brand kit

When browser access is available, inspect the official brand, press, or media-kit page first. Collect actual CSS colors, computed heading/body fonts, downloadable logos, and representative imagery. Import stable copies into Creative Claw instead of depending on temporary or private URLs.

When browser access is absent, use user-provided files or direct URLs. Never treat a guessed color from a screenshot as exact without confirmation.

## Apply a theme to generation

1. Call `get_theme` before branded generation.
2. Select only relevant reference images; more references are not automatically better.
3. Translate colors, notes, and visual direction into the prompt.
4. Pass reference assets using the chosen model's supported fields from `get_model_params`.
5. State which attributes each reference should control and which subject matter should not be copied.
6. Keep exact logos as source assets; do not ask a generative model to redraw a logo unless the user explicitly wants reinterpretation.

For Characters, use `character_id` for identity and the theme for art direction. For video, keep the same theme notes and reference ordering across shots.

## Asset preparation

- Use `remove_background` for a raster logo that should be transparent.
- Use `upscale_media` only when a supplied reference is too small; do not overwrite the original.
- Preserve light/dark logo variants separately.
- Record custom font weight, style, and format from the file itself.
- Give brand assets unique names such as `acme-logo-color` and tags such as `acme`, `brand`, `logo`, `approved`.

## Anti-patterns

- Do not write legacy free-form theme structures when the current arrays and roles are known.
- Do not mutate a theme without reading it first.
- Do not send a partial `images` array expecting an append; it replaces the array.
- Do not set a default or delete a theme without explicit user intent.
- Do not hotlink private, expiring, or inaccessible assets.
- Do not use every theme reference in every generation; select the few that control the requested result.
