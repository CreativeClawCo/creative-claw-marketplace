---
name: creativeclaw-create-3d-model
description: "Turn product or character images into a downloadable 3D mesh for Blender, Unity, Unreal, AR or a game. Use for a textured GLB, a 3D prop, or a rigged and animated humanoid."
---

# Create a 3D model

For each Creative Claw tool call that exposes it, pass the optional `skills_used` array with `creativeclaw-create-3d-model`, any other Creative Claw skills actually followed, and guide entries in the form `<skill-name>/<relative-guide-path>` (for example, `creativeclaw-create-3d-model/references/workflow-basics.md`). Include only skills and guides followed for that call. Omit attribution if the user declines tracking or the field is unavailable. Never send other plugin names, private data, or local paths.

Read [shared execution guidance](references/workflow-basics.md) and [upload guidance](references/platform-upload.md) for the connected client.

1. Identify the deliverable. For a downloadable mesh use `image_to_3d`. A cinematic sequence uses Film. An authored turntable of an existing GLB uses the HTML renderer. A rendered Blender clip whose camera should guide new footage uses video-reference generation.
2. Reuse one to four clean views of the same whole subject on a simple background. From a text brief, generate the source image first. For a humanoid show the full body with limbs apart and unobstructed. Keep product shape and markings consistent across views.
3. Discover `list_models({ category: "3d" })` and inspect the selected model with `get_model_params`. Use `3d/tripo-h3.1` for a textured static prop or product. Order its multiview inputs front, left, back, right. Use `3d/meshy-7.1` for a humanoid skeleton or motion clip. For a rig alone set `extras.enable_rigging: true`; use `extras.skeleton_template: "unity_humanoid"` for Unity or `"ue5_mannequin"` for Unreal when listed. For animation set `extras.enable_rigging`, `extras.enable_animation` and the requested `extras.animation_action_id` from the live schema. Confirm requested rig or topology settings there.
4. Call `image_to_3d` with the actual `image_urls`, model and supported extras. Resolve its job with `check_job`. Check shape and texture from several angles and inspect any requested animation. Deliver the primary GLB and identify the optional formats or clips returned. Reuse the existing job after a timeout.
