import { mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const sourceDir = "creations";
const outputRoot = "public/images";

const files = readdirSync(sourceDir)
  .filter((file) => /\.(jpe?g|png|webp|heic|tiff?)$/i.test(file))
  .sort();

const categoryConfig = {
  mehendi: {
    prefix: "mehendi-design"
  },
  "chenille-craft": {
    prefix: "chenille-floral"
  },
  "outline-art": {
    prefix: "golden-bloom-outline"
  },
  "rida-design": {
    prefix: "rida-design-study"
  },
  lamasa: {
    prefix: "lamasa-decor"
  },
  terrazzo: {
    prefix: "terrazzo-decor"
  },
  paintings: {
    prefix: "hand-painted-artwork"
  },
  "customized-gifts": {
    prefix: "customized-gift-detail"
  }
};

const range = (start, end, category) =>
  Array.from({ length: end - start + 1 }, (_, index) => [start + index, category]);

const assignments = new Map([
  ...range(1, 5, "paintings"),
  ...range(6, 23, "customized-gifts"),
  ...range(24, 26, "mehendi"),
  [27, "customized-gifts"],
  [28, "lamasa"],
  [29, "customized-gifts"],
  ...range(30, 47, "paintings"),
  [48, "customized-gifts"],
  ...range(49, 54, "paintings"),
  [55, "customized-gifts"],
  ...range(56, 121, "mehendi"),
  ...range(122, 124, "customized-gifts"),
  [125, "paintings"],
  ...range(126, 127, "mehendi"),
  ...range(128, 131, "lamasa"),
  ...range(132, 134, "mehendi"),
  ...range(135, 140, "lamasa"),
  ...range(141, 143, "mehendi"),
  ...range(144, 148, "customized-gifts"),
  ...range(149, 150, "rida-design"),
  ...range(151, 157, "mehendi"),
  [158, "outline-art"],
  ...range(159, 162, "mehendi"),
  [163, "terrazzo"],
  ...range(164, 166, "rida-design"),
  ...range(167, 171, "mehendi"),
  [172, "chenille-craft"]
]);

const archivedSourceIndexes = new Set([144, 145, 146, 147]);

const ordinal = (value) => String(value).padStart(2, "0");

const counts = Object.fromEntries(Object.keys(categoryConfig).map((category) => [category, 0]));
const failures = [];
let archived = 0;
let processed = 0;

for (const [zeroBasedIndex, file] of files.entries()) {
  const oneBasedIndex = zeroBasedIndex + 1;

  if (archivedSourceIndexes.has(oneBasedIndex)) {
    archived += 1;
    continue;
  }

  const category = assignments.get(oneBasedIndex);

  if (!category) {
    failures.push({ file, reason: `No category assignment for #${oneBasedIndex}` });
    continue;
  }

  counts[category] += 1;

  const config = categoryConfig[category];
  const inputPath = path.join(sourceDir, file);
  const outputDir = path.join(outputRoot, category);
  const outputPath = path.join(outputDir, `${config.prefix}-${ordinal(counts[category])}.webp`);

  mkdirSync(outputDir, { recursive: true });

  try {
    await sharp(inputPath)
      .rotate()
      .resize({
        width: 1800,
        height: 1800,
        fit: "inside",
        withoutEnlargement: true
      })
      .webp({ quality: 92, effort: 5 })
      .toFile(outputPath);
    processed += 1;
  } catch (error) {
    failures.push({
      file,
      outputPath,
      reason: error instanceof Error ? error.message : String(error)
    });
  }
}

console.log(
  JSON.stringify(
    {
      processed,
      archived,
      total: files.length,
      counts,
      failures
    },
    null,
    2
  )
);

if (failures.length > 0) {
  process.exitCode = 1;
}
