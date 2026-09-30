# Design a new voice

Use `design_voice` when the user wants a new synthetic voice from a description and has no recording to clone: "make me a new voice", "give my character a voice", a fictional narrator. It is not cloning, so no speaker recording or cloning consent is needed. Never design a voice to imitate a real person.

## Where each voice comes from

- A consenting speaker's recording → `clone_voice` (creativeclaw-clone-voice).
- A description → `design_voice`.
- A stock catalog voice → `manage_character({ id, voice_model, voice_id })`. This saves the choice on the Character without generating anything.

## Preview

Call `design_voice({ prompt, text, provider, character_id })`:
- `prompt` (20–1,000 characters): age, accent, timbre, pace, attitude and use. Describe the sound, never a real person's name or identity.
- `text` (100–1,000 characters): one or two of the Character's real lines, about 200 characters. Omit it only when no script exists yet.
- `provider`: `"elevenlabs"` (default) or `"google"`. For Google, add `language_code`, such as `"he-IL"`.
- `character_id`: the Character that should get the voice, when known.

Every preview returns three auditions. Let the user pick one. In ChatGPT the Voice Studio card plays them and saves the choice; read it back with `list_characters` rather than saving again.

## Save

- Existing Character: `design_voice({ action: "save", preview_id, character_id })`. For an avatar, use the SAME `character_id` so its image and voice stay together.
- New voice-only Character: `design_voice({ action: "save", preview_id, character_name })`.

A save keeps the Character's other voices and makes this one preferred for its speech model. If the save hits the limit, relay the tool's message and link, and offer `replace_voice_option_id` to replace a saved designed voice from the same provider. Never quote plan prices.

## Speak

Call `generate_speech({ character_id, model, text })`:
- ElevenLabs design → `speech/elevenlabs-v4`.
- Google design → `speech/gemini-3.8-flash-tts`.

Pass `voice_option_id` to pick a saved voice that is not the preferred one; `list_characters` shows the options. Keep the same Character, model and settings for every line of a project.
