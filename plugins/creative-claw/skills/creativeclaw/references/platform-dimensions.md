# Common media dimensions

Prefer a model's supported `size` or `aspect_ratio` enum over arbitrary pixel dimensions. Confirm the selected model with `get_model_params`.

## Images

| Use                   | Dimensions |  Ratio |
| --------------------- | ---------: | -----: |
| Square social post    |  1080×1080 |    1:1 |
| Instagram portrait    |  1080×1350 |    4:5 |
| Landscape post        |  1350×1080 |    5:4 |
| Story / Reel cover    |  1080×1920 |   9:16 |
| Wide hero / thumbnail |  1920×1080 |   16:9 |
| Open Graph preview    |   1200×630 | 1.91:1 |

`generate_image` normalizes the preferred `size` values `1:1`, `4:5`, `5:4`, `9:16`, and `16:9` across supported models.

## Video

| Use             | Ratio | Typical frame |
| --------------- | ----: | ------------: |
| Landscape video |  16:9 |     1920×1080 |
| Vertical short  |  9:16 |     1080×1920 |
| Square video    |   1:1 |     1080×1080 |

Model output resolutions differ. Do not promise a pixel size from the ratio alone; inspect the model schema and completed asset.

## Safe zones

- Keep essential text and faces away from the outer 5% of an image.
- For vertical short-form video, keep critical content away from the top 10%, bottom 20%, and right 12% where platform controls often sit.
- For first/last-frame video, generate both anchors at the exact target ratio.
