---
name: creativeclaw-swap-characters
description: "Swap, replace or recast the people in an existing video with Creative Claw: put yourself, a saved Character or a photo into a TikTok, Reel, movie scene or ad while the original motion, camera, cuts and audio stay. Use for character swaps, face swaps, recasting an actor, \"put me in this video\", \"replace her with my grandma\" and multi-person swaps. Not for copying a performance into a new scene (motion transfer) or for new footage."
---

# Swap Characters

For each Creative Claw tool call that exposes it, pass the optional `skills_used` array with `creativeclaw-swap-characters`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw-swap-characters/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools, and [job recovery](references/job-recovery.md) if a call times out.

`swap_video_characters` replaces people inside footage that already exists. The new person takes over the original person's place, pose, movement, expression and framing; the scene, camera, cuts, other people, captions and soundtrack stay. It renders with Seedance 2.5 after three free scene previews.

## When to use it

| The user wants | Route |
| --- | --- |
| Replace one or more people in a video, recast an actor, a face swap, "me in this scene", a trend video with their own Character | This skill |
| Keep the original clothes and change only who the person is | This skill; say "keep their original outfit" in the instructions |
| A Character copying a recorded performance in a new scene, or the same movement in another outfit or place | `creativeclaw-generate-video`, motion transfer with Kling Motion Control Pro |
| New dialogue or a dub on the swapped video | Swap first, then `creativeclaw-generate-voiceover` and lip-sync on the finished clip |
| Cut, trim, reframe or join existing clips | `creativeclaw-edit-media` |

Swap in only people who agreed to it: the user, people who gave permission, or fictional Characters.

## Workflow

1. **The video.** `video_url` must be a direct video file of at least 4 seconds. Import a TikTok, Instagram, YouTube, X or other social link with `upload_asset({ url })` first, then use the URL from `check_job`. A local file goes through the upload picker (`import_media`). Only the first 30 seconds are swapped; the card says when a longer clip was cut. For a longer piece, cut it into parts of up to 30 seconds and swap each.
2. **The new people.** Prefer saved Characters: `list_characters`, then `character_ids`. A plain photo goes in `image_urls` after importing it. The identity comes from the Character's sheet image; a sheet with a clear, front-facing face and visible hair works best. A sheet without the top of the head can come out with the wrong hair, and a Character description that describes the person's look helps more than one about their voice.
3. **The instructions.** Required with several people or several references. One line per swap, naming the person by position and look and the Character by name: "The woman on the left in the black top becomes Savta Rivka. The man on the right in the dark suit becomes Itay." Name anyone who must stay as they are. By default each new person is replaced head to toe with their own face, hair, body and clothes from the reference; ask for "keep their original outfit" when only the person should change.
4. **Start it once.** Call `swap_video_characters` with `video_url`, `character_ids` or `image_urls`, and `instructions`. Leave `resolution` at the default 480p draft unless the user asks for 720p or 1080p directly. Pass `review: true` only when the user wants to check previews even though their account renders in Auto mode. Never call `generate_video` for the same swap.
5. **Previews.** The swap picks three frames where each target's face is clear and shows the new people in each, free of charge. A frame that shows only some of the people gets only those Characters. Check identity, hair, clothes, placement, and whether the people look filmed in the shot rather than pasted in.
6. **Adjust a preview (free).** In the card, "Adjust this preview"; or `update_video_workflow({ session_id, preview_index, changes, expected_version })` with the version from the latest result. Describe the change concretely: "his own short dark hair, not curly", "white T-shirt from his reference", "match the warm light and the motion blur". The workflow waits for approval again afterwards.
7. **Render.** In Review mode the card shows the price and waits for the user to press **Generate video**; when the card is not shown, give the user the review link (`approvalUrl`). Never open the link or approve for the user. In Auto mode the render starts once the previews are ready. A 480p draft can be rendered at 1080p later from the card; the result states both prices.
8. **Status.** The session ID is the swap's job ID: `check_job({ job_id: <session ID> })` returns the state, previews and the finished video. Do not poll while the card is showing progress.

## Fixing problems

| What the user sees | Cause and fix |
| --- | --- |
| "The source character could not be identified confidently" | The frame picker could not tell who maps to whom. Start again with one line per person naming position and look, and one Character per person. |
| "The swap could not pick frames from your video" or another "This swap stopped" message | Nothing is still running and no video was charged. Check the inputs with `check_job`, then start a corrected swap. The card's **Fix it in chat** button sends exactly this request. |
| A preview has the wrong hair, the original clothes, or a pasted-in look | Adjust that preview (free) with a specific change. A recurring hair problem usually comes from the Character sheet; a better sheet fixes every future swap. |
| A person's face is tiny, cropped or turned away in every frame | The swap cannot show an identity on a face that never appears. Use a clip where each target's face is visible at least once. |
| The video swapped one person but not the other | Check that the previews show both and the instructions name both, then render again (a new paid render). |
| The render was blocked under the provider's content rules (for example copyrighted audio) | No credits were charged. Rendering the same clip unchanged is likely to be blocked again; try a clip without the protected soundtrack. |
| The clip is longer than 30 seconds | Only the first 30 seconds are swapped. Cut the clip into parts and swap each. |

Describe what went wrong in plain words and offer the next step. A failed swap, a refund or an unused budget does not authorize another paid render; adjusting previews is free, a new render needs the user's go-ahead or their press of Generate video.

## Voice after the swap

The swap keeps the original soundtrack. To make a swapped person with a cloned voice also sound like their Character, isolate the clip's speech with `isolate_audio`, change it with `generate_speech` (`speech/cartesia-voice-changer`, the speech in `extras.audio_url`, the Character's `character_id`, no text), then put it back with `add_audio_to_video`. For new lines, use `creativeclaw-generate-voiceover` and lip-sync on the finished clip.

Conduct the workflow in the user's language.
