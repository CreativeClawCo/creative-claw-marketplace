---
name: creativeclaw-setup
description: "Guided first run for Creative Claw: introduce what it can do, ask what the user wants to make, collect their photos, logo or brand references, then walk them to a preview image, a first video, a designed voice, a saved Character or brand theme, and Studio. Use when the user runs plugin setup, has just installed or connected Creative Claw, or asks to get started or for a tour. For a specific media request, use the matching outcome skill instead."
---

# Set up Creative Claw

For each Creative Claw tool call that exposes it, pass the optional `skills_used` array with `creativeclaw-setup`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw-setup/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and tell the user to open the plugin's Connectors tab in their app (or the MCP server list in a terminal client), connect Creative Claw, sign in, and ask again. Do not substitute other tools or describe a result that was not generated.

Read [shared execution guidance](references/workflow-basics.md) and [upload routing](references/platform-upload.md) once before using tools.

Setup is a short guided first run: learn what the user wants, make it look like them or their brand, and end with a first video worth sharing. The outcome skills take over afterwards.

## How to run it

- One step per message and one question at a time, in the user's language. Never paste this outline or name tools to the user.
- Every step is optional. Offer it once; when the user skips it, move on.
- Running setup is not a request to generate. Before each step that makes media, say in one line what it will make, and make it when the user agrees. An approval already given for that step counts.
- Keep the first run small: one image of each kind, one short clip, one round of voice auditions. No variations, comparisons or retakes unless the user asks for them.
- The moment the user asks for something specific, do that with the matching skill. Return to setup only if they ask.
- Reuse before creating. At the step that would create a Character, theme or asset, check for an existing one first (`list_characters`, `list_themes`, `search_assets`) and skip what is already there. For a user who already has work here, skip the introduction and offer only the steps they have not done.

## Account limits

A new account can make a limited amount of media before it needs to be configured further. Do not predict, announce or explain this ahead of time, and do not bring up the account or its settings unless the user asks.

A tool result may say that a step is not available on the account as it is, and return a link. When that happens:

1. Relay the tool's message and its link as given. Add nothing about what the link leads to.
2. If the result offers an alternative that works, let the user choose it. Otherwise pause that step; do not retry it.
3. Offer a setup step that still works, or stop there if the user prefers.

Answer a direct account question with `manage_account` and what it returns.

## 1. Welcome and ask

Send one short message with no tool calls:

- Two or three sentences on what Creative Claw makes from a chat: images and product shots; video clips, ads and multi-shot films; voiceovers, designed voices, music and sound effects; a reusable Character of the user or an invented one; a brand theme that keeps everything on-brand; and edits such as captions, cuts and merges. Lead with what fits the user; do not recite a catalog.
- Then ask what they want to make first, and invite references in the same message: photos of themselves, a product photo, a logo, or their brand's website. Say references are optional and make the result look like theirs.

If they have no idea yet, offer three starting points: a clip starring them, a clip for their brand or product, or a surprise. For a surprise, invent one striking subject and scene, not a generic one.

## 2. Turn references into anchors

Prepare only what the first video needs; leave the rest for step 6.

- **Photos of themselves:** import them, make one Character sheet, and save it as a Character once they approve the likeness. Follow [avatar and character-sheet production](references/avatars/identity.md); `creativeclaw-create-avatar` is the full workflow.
- **Logo, brand files or a website:** import the logo and save a brand theme with it, plus the colors, fonts and notes the user gave or confirmed. Follow [brand themes](references/workflows/brand-theme.md). Do not invent brand values; show anything that is a guess and ask before saving. Keep the exact logo as a source asset.
- **Product photo:** import it and use it as the product anchor as it is.
- **Nothing supplied:** skip this step and build the look from their brief.

## 3. Show how it will look

Before any video, make the preview image: one clean keyframe at the video's aspect ratio with `image/nano-banana-2`, built from the anchors above. Follow [reference-first production](references/video/reference-production.md) and the [image model index](references/images/index.md). Tell the user first that this is the one image the video will be made from.

Show it and ask whether it looks right. Apply one targeted fix when they ask for a change. The video waits until they are happy with the image.

## 4. First video

Use `video/minimax-h3-max` for the first video unless the user names another model. Read [MiniMax H3 Max](references/video/minimax-h3-max.md) and [Review/Auto handling](references/video/review.md), and take limits from `get_model_params`.

- One shot, 5 seconds, the model's default resolution; 9:16 for social, otherwise 16:9, unless the brief says more.
- People or several subjects: the keyframe and the identity anchor go in `image_urls`. An exact opening such as a product hero or a logo reveal: the keyframe goes in `image_url` alone.
- One subject action, one camera move, ambience and effects, no music, and no spoken lines unless the user asked for speech.

Before submitting, tell the user how it starts: in Review mode a card shows the prompt, references and settings, and the video starts only when they press Generate; in Auto it starts right away. Never press Generate for them or resubmit while the card is waiting. One request is one attempt; another take needs their ask.

## 5. A voice, while the video renders

Offer to design a voice for their narrator, brand or Character with `design_voice` (ElevenLabs, the default provider): three auditions from a short description, spoken over a line from their project. Follow [voice design](references/voices/voice-design.md). They pick one, and it is saved to their Character or to a new voice-only Character. In ChatGPT the Voice Studio card saves the pick; read it back with `list_characters` instead of saving again.

Once the clip and the voice both exist, offer one use of it: a short line spoken over the clip, mixed in as described in [media assembly](references/media-assembly.md).

## 6. What they have not set up yet

Offer, once each, whichever of these is still missing:

- **Appear in their own videos:** a few clear photos of themselves become a Character sheet and a saved Character (step 2).
- **Their own voice:** it can be cloned from a recording they make, with their explicit consent. Say that this one needs some account configuration first, and start it only when they ask; `creativeclaw-clone-voice` is the workflow.
- **Brand theme:** logo, colors and fonts saved once and applied to later work (step 2).

## 7. Finish in Studio

Close with what now exists (the clip, and any Character, voice or theme saved) and that later requests can name them.

When `open_studio` is available, open Studio as the last step of setup; the user started setup, so do not ask again. Use `page: "home"`, or `page: "explore"` when they asked for examples. In the same message, say that Studio shows everything they generate, their Characters and voices, videos waiting for their review, and examples they can start from, and suggest pinning Creative Claw in the desktop app's sidebar so Studio and their generations are one click away. Skip opening it only if the user declined Studio or it is already open.

Where `open_studio` is not available, do not mention Studio or pinning; offer to browse examples with `search_examples` instead.

End with two or three next ideas that fit what they said they want, each a sentence they can send as it is: a longer multi-shot film, a creator-style ad, a product photo set, captions on a clip, a music bed.
