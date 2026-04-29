import { mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const sourceDir = "creations";
const outputDir = "/tmp/meraki-arts-53-contact-sheets";
const files = readdirSync(sourceDir)
  .filter((file) => /\.(jpe?g|png|webp|heic|tiff?)$/i.test(file))
  .sort();

const perSheet = 30;
const thumbW = 220;
const thumbH = 180;
const labelH = 44;
const cols = 5;
const gap = 18;

const escapeXml = (value) =>
  String(value).replace(/[&<>]/g, (match) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };
    return entities[match];
  });

mkdirSync(outputDir, { recursive: true });

for (let sheetIndex = 0; sheetIndex < Math.ceil(files.length / perSheet); sheetIndex++) {
  const batch = files.slice(sheetIndex * perSheet, (sheetIndex + 1) * perSheet);
  const rows = Math.ceil(batch.length / cols);
  const width = cols * thumbW + (cols + 1) * gap;
  const height = rows * (thumbH + labelH) + (rows + 1) * gap;
  const composites = [];

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`;
  svg += `<rect width="100%" height="100%" fill="#f7f4ef"/>`;

  for (let index = 0; index < batch.length; index++) {
    const file = batch[index];
    const x = gap + (index % cols) * (thumbW + gap);
    const y = gap + Math.floor(index / cols) * (thumbH + labelH + gap);
    const input = await sharp(path.join(sourceDir, file))
      .rotate()
      .resize(thumbW, thumbH, { fit: "cover" })
      .jpeg({ quality: 82 })
      .toBuffer();

    composites.push({ input, left: x, top: y });
    svg += `<rect x="${x}" y="${y}" width="${thumbW}" height="${thumbH}" fill="#fff" rx="8"/>`;
    svg += `<text x="${x + 6}" y="${y + thumbH + 17}" font-family="Arial" font-size="12" fill="#222">${escapeXml(file)}</text>`;
    svg += `<text x="${x + 6}" y="${y + thumbH + 34}" font-family="Arial" font-size="11" fill="#777">#${sheetIndex * perSheet + index + 1}</text>`;
  }

  svg += "</svg>";

  const base = await sharp(Buffer.from(svg)).png().toBuffer();
  await sharp(base)
    .composite(composites)
    .png()
    .toFile(path.join(outputDir, `sheet-${String(sheetIndex + 1).padStart(2, "0")}.png`));
}

console.log(
  JSON.stringify(
    {
      count: files.length,
      sheets: Math.ceil(files.length / perSheet),
      outputDir
    },
    null,
    2
  )
);
