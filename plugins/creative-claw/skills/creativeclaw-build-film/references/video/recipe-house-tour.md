# Recipe: property photos to a house tour

Proposed workflow example, not a measured quality guarantee. Use when someone wants a house tour, listing video or room-by-room video from real photos of a home. Read the selected model guide and [reference production](reference-production.md).

## Sort the photos before any prompt

Import every photo the user supplied, including a floor plan or a listing screenshot of one. Look at each photo and note which room it shows and which way the camera faces. Name rooms only from what is visible, never from upload order, file names or a guessed sequence. A bathroom photo prompted as "the balcony" makes the model invent a balcony.

Place the photos on the floor plan when there is one. Without a plan, list the rooms in walking order and ask the user to confirm it. Several photos of one room are angles of the same space; keep them together.

Before any video, tell the user which views the tour needs but the photos lack. Usually these are the entrance seen from the front door, the doorways between rooms, the other side of a room, and the balcony itself rather than only its view. Ask for those photos, or offer to generate them (Path B, step 2).

## Why one photo per clip breaks a tour

An image-to-video clip made from one photo knows that room from one angle, not the home. A camera that turns a corner, goes through a door or circles the room has to invent what the photo does not show, so walls move, windows appear and rooms connect in impossible ways. Do not build a continuous tour as a chain of single-photo clips with large camera moves. Choose Path A or Path B.

## Path A: one clip per room

Each clip uses one room photo as the literal start frame in `image_url`, lasts 4–6 seconds and makes one gentle move that stays inside what the photo shows: a slow push-in, a short slide or a slight pan. Nothing turns a corner or goes through a door. Assemble the clips in walking order with plain cuts or short dissolves ([assembly guidance](../media-assembly.md)).

Example prompt:

"Animate only what is visible in this photo of the living room. The camera pushes in slowly at eye level for five seconds. Keep every wall, window, door, floor and fixture exactly as photographed. No new rooms, openings, furniture or decorations. No people. Soft natural daylight stays constant."

## Path B: one guided tour

1. **Overview image.** With GPT Image Sunburst (current model ID in [GPT Image](../images/gpt-image-2.md)), make a flat top-down plan of the home. Use the floor plan as the source image and the room photos as references, up to the model's reference limit. Ask for room labels, floors coloured like the photos, and a numbered camera path that passes only through real door openings, with a camera icon at each stop showing its view direction. The user checks the layout and the path before anything else.
2. **Missing views.** For each stop or doorway on the path that has no real photo, generate a still from the nearest real photos of the same rooms, keeping their finishes and fixtures. The user approves each generated view before it is used. Say which views are generated.
3. **Video.** Use `video/seedance-2.5` in reference mode: the overview image plus every real and approved photo in `image_urls` (up to 30), with `extras.omni_reference_task_type: "reference"`, cited as `@Image1`, `@Image2` and so on in walking order. Make one shot of up to 30 seconds. For a longer tour, split it into two shots at a doorway, the second starting where the first ends. Set `extras.generate_audio: false` when music or narration will be added afterwards. Start with a 480p draft and finish the approved take ([Seedance 2.5](seedance-2-5.md)).

Example prompt:

"A smooth 25-second eye-level walk through the apartment, following the numbered path in @Image1. Start just inside the front door in the hall (@Image2), looking in. Walk forward into the kitchen and dining area (@Image3, @Image4) and pause on the kitchenette (@Image5). Turn right through the lower door into the second bedroom (@Image6), then go back and through the upper door into the main bedroom (@Image7, @Image8). End on the balcony looking out at the view (@Image9). Every room must match its reference photos exactly: same walls, windows, doors, floors and fixtures. Do not invent rooms, openings or furniture. No people. Steady natural daylight."

## Honest listing video

- Never change permanent features: walls, windows, doors, floors and fixtures.
- Label staged or generated views as such, for example "Virtually staged", and keep the original photos.
- A tour made from photos is a visualization. If it looks like a drone or gimbal shot, say that no drone footage was captured.

## Finish and inspect

Before assembly, compare each clip with its photos: walls, windows, door positions and fixtures. Point out any invented space to the user and offer a focused correction. Do not create additional paid takes without authorization.
