# ChatGPT and Codex

This plugin works the same way in ChatGPT and Codex, on the same Creative Claw account. These notes cover what differs there.

## Media the user gives you

The user's photos, videos and audio reach Creative Claw by one of four routes. Choose by where the file is:

1. **Media pasted, attached or generated in this ChatGPT conversation:** call `import_chatgpt_media` once per file, with the native file in `media_file`. Use the Creative Claw URL it returns in every later call.
2. **A local media file Codex can read** (an image, video or audio file): call `get_upload_url`, send the file's bytes to the returned `uploadUrl` with an HTTP PUT and the returned `contentType`, then call `confirm_upload` with the returned asset ID.
3. **The user still has to pick a file from their device:** `import_media` opens the picker. Never use it for a file already in the conversation or one Codex can read.
4. **A public link to a media file:** use it as it is, or save the media to the user's Creative Claw library with `upload_asset`. A social post link goes through `upload_asset`, then `check_job`.

Never use `get_upload_url` for a ChatGPT attachment: ChatGPT cannot reach the upload host, while Creative Claw imports the native file itself. Never give `upload_asset` a local path, a private attachment URL or a temporary ChatGPT URL. `import_chatgpt_media`, `import_media` and `upload_asset` finish the upload themselves; call `confirm_upload` only after your own PUT.

## Tools and jobs

- Use only the Creative Claw tools the app exposes, and do not search again for one that is missing. If `find_workflows` or `get_workflow` is not among the tools, work directly with the tools, reading `get_model_params` for each model.
- In ChatGPT the media card follows image and video jobs. Call `check_job` only when a next step needs the finished URL, the user asks for status, or nothing on screen follows the job.
- Use `estimate_generation` only when the user asks about cost, their balance or a budget.

## Cards

- **Video approval:** in Review mode a video call shows a card and nothing renders until the user presses Generate on it. Say how many cards to expect, then stop. Never ask for approval in chat as well.
- **Voice Studio card:** after `design_voice`, the card plays the auditions and saves the user's pick itself. Read the saved voice back with `list_characters` instead of saving it again.
- **Film card:** a film project shows as a card with its shots, takes and timeline. The user can make storyboards and clips, choose takes and export from the card.

## Studio

Where `open_studio` is available, Creative Claw Studio is the user's visual workspace, in the sidebar and beside the chat. Open it only when the user asks to open, see, browse or pick from something there:

| The user wants | `page` |
|---|---|
| Everything they made | `library` |
| Their Characters, or one of them | `characters` (with `id` for one) |
| Their films, or one of them | `films` (with `id` for one) |
| To pick a voice or a music track | `voices`, `music` |
| The videos waiting for their approval | `approvals` |
| Examples to start from | `explore` |
| A person swapped in a video | `swap` |
| What a client or job has used | `projects` (with the project's slug as `id`) |
| Their settings | `settings` |

Leave `page` out for Home. Do not open Studio as a step in making media, and do not open it again while it is open. What the user picks in Studio arrives as their next message. Where `open_studio` is missing, do not mention Studio.
