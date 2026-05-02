import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import sharp from "sharp";

const sourceDir = "creations";
const outputRoot = "public/images";
const cutoutBinary = "/tmp/meraki-arts-53-vision-cutout";
const tempRoot = "/tmp/meraki-arts-53-studio-cutouts";
const canvas = { width: 1600, height: 1200 };

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

function studioBackground() {
  return Buffer.from(`
    <svg width="${canvas.width}" height="${canvas.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="surface" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#c9bfb0"/>
          <stop offset="0.52" stop-color="#b7aa9b"/>
          <stop offset="1" stop-color="#a89c8e"/>
        </linearGradient>
        <filter id="paperNoise" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" seed="19"/>
          <feColorMatrix type="saturate" values="0"/>
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.07"/>
          </feComponentTransfer>
        </filter>
        <radialGradient id="light" cx="34%" cy="20%" r="74%">
          <stop offset="0" stop-color="#fff7ea" stop-opacity="0.34"/>
          <stop offset="0.52" stop-color="#ffffff" stop-opacity="0.08"/>
          <stop offset="1" stop-color="#4b4138" stop-opacity="0.2"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#surface)"/>
      <rect width="100%" height="100%" filter="url(#paperNoise)"/>
      <rect width="100%" height="100%" fill="url(#light)"/>
    </svg>
  `);
}

async function composeStudioImage(cutoutPath, outputPath) {
  const trimResult = await sharp(cutoutPath)
    .ensureAlpha()
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 8 })
    .png()
    .toBuffer({ resolveWithObject: true });

  const subject = await sharp(trimResult.data)
    .resize({
      width: 1280,
      height: 1000,
      fit: "inside",
      withoutEnlargement: false
    })
    .png()
    .toBuffer();

  const subjectMeta = await sharp(subject).metadata();
  const left = Math.round((canvas.width - subjectMeta.width) / 2);
  const top = Math.round((canvas.height - subjectMeta.height) / 2);

  const shadowAlpha = await sharp(subject)
    .ensureAlpha()
    .extractChannel("alpha")
    .blur(20)
    .linear(0.34, 0)
    .toBuffer();

  const shadow = await sharp({
    create: {
      width: subjectMeta.width,
      height: subjectMeta.height,
      channels: 3,
      background: "#302a24"
    }
  })
    .joinChannel(shadowAlpha)
    .png()
    .toBuffer();

  await sharp(studioBackground())
    .resize(canvas.width, canvas.height)
    .composite([
      {
        input: shadow,
        left: Math.min(canvas.width - subjectMeta.width, left + 22),
        top: Math.min(canvas.height - subjectMeta.height, top + 24)
      },
      {
        input: subject,
        left,
        top
      }
    ])
    .webp({ quality: 88, effort: 5 })
    .toFile(outputPath);
}

if (!existsSync(cutoutBinary)) {
  throw new Error(
    `${cutoutBinary} was not found. Compile it with: xcrun swiftc -module-cache-path /tmp/meraki-arts-53-swift-cache scripts/vision-cutout.swift -O -o ${cutoutBinary}`
  );
}

mkdirSync(tempRoot, { recursive: true });

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

  const inputPath = path.join(sourceDir, file);
  const config = categoryConfig[category];
  const fileName = `${config.prefix}-${ordinal(counts[category])}.webp`;
  const outputDir = path.join(outputRoot, category);
  const outputPath = path.join(outputDir, fileName);
  const cutoutPath = path.join(tempRoot, `${oneBasedIndex}-${path.parse(file).name}.png`);

  mkdirSync(outputDir, { recursive: true });

  const result = spawnSync(cutoutBinary, [inputPath, cutoutPath], {
    encoding: "utf8",
    maxBuffer: 1024 * 1024 * 8
  });

  if (result.status !== 0 || !existsSync(cutoutPath)) {
    failures.push({
      file,
      outputPath,
      reason: result.stderr?.trim() || `cutout exited with ${result.status}`
    });
    continue;
  }

  try {
    await composeStudioImage(cutoutPath, outputPath);
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
