# Meraki Arts 53 Raw Image Inbox

Drop raw images into:

```text
existing/<category-slug>/
new/<new-category-slug>/
```

Examples:

```text
existing/texture-art/floral-relief-canvas-01.jpg
existing/lamasa/moon-bowl-decor-01.jpeg
new/clay-miniatures/tea-set-miniature-01.png
```

Then run this from the project root:

```bash
npm run images:check-inbox
```

This folder is ignored by git, so raw images stay local.
