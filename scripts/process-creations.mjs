import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const sourceDir = "creations";
const outputRoot = "public/images";
const contentPath = "data/content.json";
const canvas = { width: 1600, height: 1200 };

const files = readdirSync(sourceDir)
  .filter((file) => /\.(jpe?g|png|webp|heic|tiff?)$/i.test(file))
  .sort();

const categoryConfig = {
  mehendi: {
    referenceCode: "MEH",
    prefix: "mehendi-design",
    caption: "Mehendi design"
  },
  "chenille-craft": {
    referenceCode: "CHN",
    prefix: "chenille-floral",
    caption: "Chenille floral craft"
  },
  embroidery: {
    referenceCode: "EMB",
    prefix: "embroidered-floral-detail",
    caption: "Embroidered floral detail"
  },
  "rida-design": {
    referenceCode: "RDA",
    prefix: "rida-design-study",
    caption: "Textile motif study"
  },
  lamasa: {
    referenceCode: "LAM",
    prefix: "lamasa-decor",
    caption: "Lamasa decor"
  },
  terrazzo: {
    referenceCode: "TRZ",
    prefix: "terrazzo-decor",
    caption: "Terrazzo decor"
  },
  paintings: {
    referenceCode: "PNT",
    prefix: "hand-painted-artwork",
    caption: "Hand-painted artwork"
  },
  "customized-gifts": {
    referenceCode: "GFT",
    prefix: "customized-gift-detail",
    caption: "Customized gift detail"
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
  [158, "embroidery"],
  ...range(159, 162, "mehendi"),
  [163, "terrazzo"],
  ...range(164, 166, "rida-design"),
  ...range(167, 171, "mehendi"),
  [172, "chenille-craft"]
]);

const counts = Object.fromEntries(Object.keys(categoryConfig).map((category) => [category, 0]));
const galleryByCategory = Object.fromEntries(
  Object.keys(categoryConfig).map((category) => [category, []])
);

const ordinal = (value) => String(value).padStart(2, "0");
const referenceOrdinal = (value) => String(value).padStart(3, "0");

function getReferenceId(category, count) {
  return `MA53-${categoryConfig[category].referenceCode}-${referenceOrdinal(count)}`;
}

function titleFromFilename(file, fallback, count) {
  const baseName = path
    .basename(file, path.extname(file))
    .replace(/\b(img|dsc|wa)\b/gi, "")
    .replace(/\bwa\d+\b/gi, "")
    .replace(/\b\d{6,}\b/g, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!baseName || baseName.length < 4) {
    return `${fallback} ${count}`;
  }

  return baseName
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

async function makePresentableImage(inputPath, outputPath) {
  const foreground = await sharp(inputPath)
    .rotate()
    .resize({
      width: canvas.width - 120,
      height: canvas.height - 120,
      fit: "inside",
      withoutEnlargement: true
    })
    .modulate({ brightness: 1.03, saturation: 1.06 })
    .sharpen({ sigma: 0.6, m1: 0.6, m2: 0.35 })
    .toBuffer();

  const foregroundMetadata = await sharp(foreground).metadata();
  const background = await sharp(inputPath)
    .rotate()
    .resize(canvas.width, canvas.height, { fit: "cover" })
    .blur(26)
    .modulate({ brightness: 1.08, saturation: 0.72 })
    .linear(0.9, 14)
    .toBuffer();

  const left = Math.round((canvas.width - foregroundMetadata.width) / 2);
  const top = Math.round((canvas.height - foregroundMetadata.height) / 2);

  await sharp(background)
    .composite([
      {
        input: Buffer.from(
          `<svg width="${canvas.width}" height="${canvas.height}">
            <rect width="100%" height="100%" fill="rgba(250,249,246,0.28)"/>
          </svg>`
        ),
        left: 0,
        top: 0
      },
      { input: foreground, left, top }
    ])
    .webp({ quality: 84, effort: 5 })
    .toFile(outputPath);
}

for (const [zeroBasedIndex, file] of files.entries()) {
  const oneBasedIndex = zeroBasedIndex + 1;
  const category = assignments.get(oneBasedIndex);

  if (!category) {
    throw new Error(`No category assignment for #${oneBasedIndex}: ${file}`);
  }

  counts[category] += 1;
  const config = categoryConfig[category];
  const fileName = `${config.prefix}-${ordinal(counts[category])}.webp`;
  const outputDir = path.join(outputRoot, category);
  const outputPath = path.join(outputDir, fileName);
  const publicPath = `/images/${category}/${fileName}`;

  mkdirSync(outputDir, { recursive: true });
  await makePresentableImage(path.join(sourceDir, file), outputPath);

  galleryByCategory[category].push({
    id: getReferenceId(category, counts[category]),
    image: publicPath,
    caption: titleFromFilename(file, config.caption, counts[category])
  });
}

const content = JSON.parse(readFileSync(contentPath, "utf8"));

content.artForms = content.artForms.map((artForm) => {
  const gallery = galleryByCategory[artForm.id] ?? [];

  return {
    ...artForm,
    coverImage: gallery[0]?.image ?? artForm.coverImage,
    gallery
  };
});

writeFileSync(contentPath, `${JSON.stringify(content, null, 2)}\n`);

console.log(
  JSON.stringify(
    {
      processed: files.length,
      counts,
      contentPath
    },
    null,
    2
  )
);
