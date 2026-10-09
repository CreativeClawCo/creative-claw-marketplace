# Kling 3.0 Motion Control Pro

## Face/person swap workflow

Prefer this model for a face/person swap or transferring a recorded performance. It generates a new video from an appearance image and driving performance, so exact preservation is not guaranteed. Honor an explicit model choice; H3 Max Recast remains an alternative for requested multi-person or multi-shot recasting.

1. Inspect the source and choose a clear frame of the intended person. Prefer a continuous shot with one unobstructed performer. If other people take the foreground, the model may follow the wrong person, change clothing or remove someone. Do not promise that a prompt alone selects a face reliably.
2. Prepare an appearance image from that source frame, replacing only the target face with the supplied identity while retaining hair, clothing, body, other people, background and framing. Reuse an approved suitable image when available. Include any paid image preparation in the authorized scope. A portrait alone also supplies its clothing and background, so it is insufficient when the wedding scene or original outfit should stay.
3. Pass that prepared scene image as the single `image_urls` reference and the source clip as the single `video_urls` reference. The image defines appearance and scene, not a literal first frame. Alternatively pass `image_url` alone or a saved `character_id` with a suitable scene photo. Do not combine those alternatives.
4. Use `extras.character_orientation: "video"`, `extras.keep_original_sound: true`, and one `extras.elements` facial binding. Supply **both** `frontal_image_url` (a clear replacement face) and `reference_image_urls` (1 to 3 references). Prefer complementary views of the same face. An existing prepared scene image can be reused as an additional reference; do not require extra paid images solely to fill the array.
5. Identify the intended person by clothing and position as `@Element1` in the prompt. Describe following only that person's performance and explicitly list the hair, outfit, body, other people and scene details that should stay.
6. Inspect the output against the source and face reference. Check the intended target, other people, clothing, body, setting, camera, audio and delivered duration. Output may be shorter than the source. Do not automatically submit another paid take or switch models.

The facial element is optional for simple performance transfer; use `prompt: ""` to follow the references when no targeted instructions are needed.

```json
{
  "model": "video/kling-3.0-motion-control-pro",
  "prompt": "The person in the white dress on the left is @Element1. Follow only their source performance. Keep their hair, clothing, body, the other people and setting unchanged.",
  "image_urls": ["<prepared source-scene image with the target face replaced>"],
  "video_urls": ["<3 to 30 second source performance URL>"],
  "extras": {
    "character_orientation": "video",
    "keep_original_sound": true,
    "elements": [{
      "frontal_image_url": "<replacement frontal face image URL>",
      "reference_image_urls": ["<additional face view or prepared scene image URL>"]
    }]
  }
}
```

## Controls and cost

Inspect `get_model_params` for the current contract and availability. Controls belong in `extras`. `character_orientation: "video"` follows the driving orientation and accepts 3 to 30 seconds with facial binding. `"image"` follows image orientation and camera movement, accepts 3 to 10 seconds, and does not support facial binding. `keep_original_sound` defaults to true; false gives silent output. At most one facial element is supported, referenced as `@Element1`. Both image fields are required when an element is supplied. This requirement was verified against a provider validation response on October 7, 2026, although the published schema labels the nested fields optional.

There is no duration, resolution, aspect ratio, last frame or separate audio control. Pro quality is selected by the model. Measure source duration before quoting or charging, and trim an overlong source first. The source soundtrack is retained rather than translated or regenerated; plan any speech change separately.

Snapshot pricing: **33.6 credits per second**, rounded once for the whole job, with final output-duration reconciliation. A 10-second output is 336 credits. Live estimates are authoritative. Use `estimate_generation` with the same inputs, then `generate_video`; use `check_job` when another step needs the completed URL or no inline viewer monitors the job. Never switch models or create extra paid takes without authorization.
