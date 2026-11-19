---
name: creativeclaw-swap-characters
description: "Swap, replace or recast the people in an existing video with Creative Claw: put yourself, a saved Character or a photo into a TikTok, Reel, movie scene or ad while the original motion, camera, cuts and audio stay. Use for character swaps, face swaps, recasting an actor, \"put me in this video\", \"replace her with my grandma\" and multi-person swaps, and for swapping a product, prop, garment or sign in a video (swap_video_objects). Not for copying a performance into a new scene (motion transfer) or for new footage."
---

# Swap Characters

For each Creative Claw tool call that exposes it, pass the optional `skills_used` array with `creativeclaw-swap-characters`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw-swap-characters/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

**Not connected yet?** If no Creative Claw tools (such as `list_models` or `generate_image`) are available, the plugin is installed but the server is not connected. Stop and give the user the click path: open the [Creative Claw plugin page](https://claude.ai/customize/plugins/id/3b9e3067-1092-46a5-b613-f52ddf9476ca%40anthropic-plugin-directory/connectors) in Claude, then the **Connectors** tab, press **Connect**, press **Add** if an "Add custom connector" dialog opens, and sign in. In Claude Code they run `/mcp` instead. Then they ask again. Do not substitute other tools or describe a result that was not generated.

Read [shared execution guidance](references/workflow-basics.md) once per task before using tools, and [job recovery](references/job-recovery.md) if a call times out.

Use `swap_video_characters` to recast people in existing footage. The replacement follows the source pose, action, framing and soundtrack. Flash is the default. Compare the free preview frames with the brief and check the finished clip during turns, occlusion and cuts.

## When to use it

| The user wants | Route |
| --- | --- |
| Replace one or more people in a video, recast an actor, a face swap, "me in this scene", a trend video with their own Character | This skill |
| Replace a product, prop, garment, sign or label in a video, not a person | `swap_video_objects`; see "Object swaps" below |
| Keep the original clothes and change only who the person is | This skill; say "keep their original outfit" in the instructions |
| A Character copying a recorded performance in a new scene, or the same movement in another outfit or place | `creativeclaw-generate-video`, motion transfer with Kling Motion Control Pro |
| New dialogue or a dub on the swapped video | Swap first, then `creativeclaw-generate-voiceover` and `lip_sync_video` on the finished clip |
| Cut, trim, reframe or join existing clips | `creativeclaw-edit-media` |

Swap in only people who agreed to it: the user, people who gave permission, or fictional Characters.

## Workflow

1. **The video.** `video_url` must be a direct video file of at least 4 seconds. Import a TikTok, Instagram, YouTube, X or other social link with `upload_asset({ url })` first, then use the URL from `check_job`. A local file goes through the upload picker (`import_media`). Seedance and Kling use up to the first 30 seconds; Kling prepares whole output seconds. Swap Lite uses up to 15 seconds and prepares whole output seconds without changing playback speed. The card says when a clip was cut. For a longer piece, select an excerpt or use Standard for up to 30 seconds.
2. **The new people.** Prefer saved Characters: `list_characters`, then `character_ids`. A plain photo goes in `image_urls` after importing it. Swap accepts eight combined reference photos or Characters; Lite accepts seven to leave space for the scene previews. The identity comes from the Character's sheet image; a sheet with a clear, front-facing face and visible hair works best. A sheet without the top of the head can come out with the wrong hair, and a Character description that describes the person's look helps more than one about their voice.
3. **The instructions.** Required with several people or several references. One line per swap, naming the person by position and look and the Character by name: "The woman on the left in the black top becomes Savta Rivka. The man on the right in the dark suit becomes Itay." Name anyone who must stay as they are. By default replace the face and hair while preserving the source outfit, scene, pose and timing. Explicit instructions can change the outfit or broaden the edit scope; reference clothes alone do not request a wardrobe change.
4. **Choose the engine and start once.** Omit `video_model` for Seedance 2.5 Flash. Its 480p and 720p outputs are finished videos. Choose Pro explicitly with `video_model: "video/seedance-2.5"` for a native 480p draft or a direct 1080p Seedance swap. Kling 4.0 Omni supports 720p and 1080p. Use Wan 3.0 for an explicitly requested Lite swap. Set `review: true` when the user asks to inspect previews even in Auto. Use the swap tool for the entire job.
5. **Check the free previews.** The tool selects three or six scene frames. Check the number and positions of people, identity, hair, wardrobe, grip and lighting. A group photo can supply several replacements. Map each source person to a specific person in that photo and name anyone to preserve.
6. **Adjust a preview (free).** In the card, "Adjust this preview"; or `update_video_workflow({ session_id, preview_index, changes, expected_version })` with the version from the latest result. Describe the change concretely: "his own short dark hair, not curly", "white T-shirt from his reference", "match the warm light and the motion blur". The workflow waits for approval again afterwards.
7. **Render.** In Review the user presses Generate video on the card or follows the returned `approvalUrl`. In Auto the render starts once previews are ready. Read the actual swap's finishing choices and quote before a paid finish. Flash, Lite and Kling results have no native draft finish.
8. **Status.** The session ID is the swap's job ID: `check_job({ job_id: <session ID> })` returns the state, previews and the finished video. Do not poll while the card is showing progress.

## Object swaps

`swap_video_objects` is the same workflow and card for things instead of people: the people, motion, camera, cuts and audio stay, and only the named object changes. Call it with `video_url`, `image_urls` (photos of the new object; several angles help it keep its shape and label) and `instructions` naming which object becomes which, for example "Replace the red soda can in her right hand with the bottle in Image 1. Leave the green can on the table." Name look-alike objects that must stay, and any printed text or logo to keep exact. It takes no `character_ids`. Previews, adjusting with `update_video_workflow`, Review or Auto, engines, resolutions and `check_job` all work as above. Use only product images and footage the user has the right to use.

## Kling 4.0 option

Use `swap_video_characters`, not a separate `generate_video`, when the user asks for a Kling 4 swap. It edits the original clip and uses the approved scene previews plus up to eight identity references; each person's photos are bound as one face element. The prepared source and output are 4 to 30 whole seconds at 720p or 1080p. A longer or fractional source is cut without changing speed. The general model's 3-second minimum does not lower Swap's 4-second minimum.

Ask `estimate_generation({ operation: "swap_video_characters", model: "video/kling-4.0-omni", params: { video_url, resolution: "720p" } })` for a free estimate. The price scales with the input length and resolution. Use the estimate for the actual inputs and report the final cost returned for the job. The scene previews are free.

Kling generates audio, so Swap replaces it with the source soundtrack by default and explicitly mutes silent sources. Timing is checked before delivery, but generative edits can still change motion, identity, camera or cuts. Review the finished result before requesting more. Never switch an existing paid attempt to another engine automatically.

## Fixing problems

| What the user sees | Cause and fix |
| --- | --- |
| "The source character could not be identified confidently" | The frame picker could not tell who maps to whom. Start again with one line per person naming position and look, and one Character per person. |
| "The swap could not pick frames from your video" or another "This swap stopped" message | Nothing is still running and no video was charged. Check the inputs with `check_job`, then start a corrected swap. The card's **Fix it in chat** button sends exactly this request. |
| A preview has the wrong hair, the original clothes, or a pasted-in look | Adjust that preview (free) with a specific change. A recurring hair problem usually comes from the Character sheet; a better sheet fixes every future swap. |
| A person's face is tiny, cropped or turned away in every frame | The swap cannot show an identity on a face that never appears. Use a clip where each target's face is visible at least once. |
| The video swapped one person but not the other | Check that the previews show both and the instructions name both, then inspect where identity breaks during motion. If it is confined to one shot, offer to repair that interval and rejoin the approved footage with its original audio. A new paid render needs authorization. |
| The render was blocked under the provider's content rules (for example copyrighted audio) | Check the job result for any charge. Rendering the same clip unchanged is likely to be blocked again; try a clip without the protected soundtrack. |
| The clip is longer than 30 seconds | Only the first 30 seconds are swapped. Cut the clip into parts and swap each. |

Describe what went wrong in plain words and offer the next step. A failed swap, a refund or an unused budget does not authorize another paid render; adjusting previews is free, a new render needs the user's go-ahead or their press of Generate video.

## Voice after the swap

The swap keeps the original soundtrack. To make a swapped person with a cloned voice also sound like their Character, isolate the clip's speech with `isolate_audio`, change it with `generate_speech` (`speech/cartesia-voice-changer`, the speech in `extras.audio_url`, the Character's `character_id`, no text), then put it back with `add_audio_to_video`. For new lines, use `creativeclaw-generate-voiceover` and `lip_sync_video` on the finished clip.

Conduct the workflow in the user's language.
