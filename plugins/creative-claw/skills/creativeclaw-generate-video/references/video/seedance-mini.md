# Seedance Mini

Use `video/seedance-2.0-mini` when the user chooses an economical draft. Do not silently downgrade an explicit model, resolution or quality choice. Check get_model_params for this exact model; Mini does not inherit Seedance 2.5's larger limits.

Current local schema: 4 to 15 seconds or auto; 480p or 720p; up to 9 image, 3 video and 3 audio references, at most 12 files total. Each video/audio reference is 2 to 15 seconds, with at most 15 seconds combined per modality. Audio references require an image or video. Live tool validation is authoritative, including end-frame availability.

Read [input modes](reference-production.md). Use image_url for a literal opening or ordered image_urls/video_urls/audio_urls for references. Never mix these standard modes. Reference syntax is one-based: @Image1, @Video1, @Audio1. State each role and protected attributes.

Example: "@Image1 supplies the exact product geometry. @Video1 supplies only the slow orbit, not its subject or background. The bottle stands on a sunlit table as condensation rolls down its side. One continuous shot. No dialogue, no text, no packaging changes."

Write ordered action, camera motion, audio and the ending. Keep the scope plausible for the duration. Do not assume 2.5's edit/extend task controls or preservation guarantees apply to Mini. For exact source edits, inspect the current supported operations before promising a result. Read [Review handling](review.md) before generating.
