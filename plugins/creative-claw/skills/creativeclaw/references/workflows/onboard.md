# Onboarding

Explain Creative Claw as a shared media workspace, then help the user complete one useful action.

## What it does

- Organizes durable image, video, audio, and source assets.
- Stores brand themes with colors, fonts, logos, notes, and visual references.
- Generates and edits images across specialized models.
- Generates, transforms, and assembles video with text, image, video, audio, and Character references.
- Generates speech, creates consented ElevenLabs voice clones on Characters, transcribes media, and cleans recordings.
- Saves reusable Characters and multi-shot Film projects.
- Processes media with background removal, upscaling, trimming, scaling, subtitles, frames, and merging.

## First conversation

1. Ask what the user wants to make or organize.
2. If they have existing media, search or import it.
3. If they need branded output, fetch or create a theme.
4. Show the recommended model and important settings for the requested modality.
5. Generate one modest example or organize one real asset before proposing a larger batch.

## Good first tasks

- “Find and organize my existing brand assets.”
- “Create a brand theme from these files.”
- “Generate an on-brand product image.”
- “Animate this approved image into a five-second clip.”
- “Generate a narration and add it to this video.”
- “Create a Character from this reference photo.”

## Model discovery message

Do not overwhelm the user with the entire catalog. Offer one recommended model and one meaningful alternative, based on current `list_models` and `get_model_params` results.

For example:

```text
I recommend Nano Banana 2 for this image because it is the most cost-efficient
default for most cases, with the best overall quality, speed, and cost balance.
If exact typography is the priority, GPT Image 2 is the stronger
alternative. I can generate one candidate or compare both.
```

For video, state duration, ratio, resolution, audio behavior, and references before submission. For speech, state the ElevenLabs voice, language, and delivery style. For voice cloning, explain the ElevenLabs workflow and obtain explicit consent before any mutation.

## Asset habit

After a useful result, explain that it is now a durable asset and give it a searchable name, project/brand tags, and a short description. This is the core compounding benefit of the workspace.
