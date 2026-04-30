# Image Intake Workflow

Use this when adding new Meraki Arts 53 pictures. Raw files stay local in `creations/`, which is ignored by git. Only finished web-ready assets go into `public/images` and `data/content.json`.

## Folder Layout

Drop new raw images here:

```text
creations/_inbox/
  existing/
    lamasa/
    texture-art/
    paintings/
  new/
    resin-art/
    clay-miniatures/
```

Use `existing/<slug>/` when the category already exists in `data/content.json`.
Use `new/<slug>/` when the category does not exist yet.

Current category slugs:

```text
chenille-craft
customized-gifts
embroidery
lamasa
mehendi
paintings
rida-design
terrazzo
texture-art
```

## Naming Convention

Folder decides the category. Filename should describe the item because it becomes the starting point for the public display name. Each finished gallery entry also gets a stable `MA53-<category>-<number>` picture ID for customer reference.

Preferred format:

```text
<short-description>-<sequence>.<extension>
```

Examples:

```text
creations/_inbox/existing/texture-art/floral-relief-canvas-01.jpg
creations/_inbox/existing/lamasa/moon-bowl-decor-01.jpeg
creations/_inbox/new/clay-miniatures/tea-set-miniature-01.png
```

Avoid generic camera names such as `IMG_1234.jpg` when possible. If a photo needs a more creative public name, inspect the finished image and update the gallery `caption` while keeping the generated picture `id` stable.

Any common image extension is fine: `.jpg`, `.jpeg`, `.png`, `.webp`, `.heic`, `.heif`, `.avif`.

## Quick Check

After adding files, run:

```bash
npm run images:check-inbox
```

This verifies category folders and lists everything waiting to be processed.

## What Codex Will Do When You Say “Process The Inbox”

1. Read `creations/_inbox`.
2. Confirm whether each folder maps to an existing category or a new category.
3. Back up originals before editing.
4. Edit/crop/enhance selected images without changing the main artwork.
5. Export optimized `.webp` files into `public/images/<category>/`.
6. Update `data/content.json` gallery entries, cover image, visibility, picture IDs, descriptive captions, and category metadata.
7. Copy originals into `creations/segregated/<category>/` and update the local manifest.
8. Run build/type checks.
9. Commit and push only when requested.

## Simple Instruction To Use Later

After you drop files into the inbox, tell Codex:

```text
Process the image inbox. Add existing category images, create new categories where needed, update content.json, and keep originals organized.
```
