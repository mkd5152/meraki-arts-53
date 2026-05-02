import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const rawRoot = path.join(root, "creations", "segregated");
const publicRoot = path.join(root, "public", "images");
const manifestPath = path.join(rawRoot, "manifest.json");
const rawImageExt = /\.(avif|heic|heif|jpe?g|png|webp)$/i;
const publicImageExt = /\.(avif|jpe?g|png|webp)$/i;

function listCategoryDirs(folder) {
  if (!fs.existsSync(folder)) return [];

  return fs
    .readdirSync(folder, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => entry.name)
    .sort();
}

function listImageFiles(folder, matcher) {
  if (!fs.existsSync(folder)) return [];

  return fs
    .readdirSync(folder, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        !entry.name.startsWith(".") &&
        matcher.test(entry.name)
    )
    .map((entry) => entry.name)
    .sort();
}

function basenameWithoutExtension(filePath) {
  return path.basename(filePath, path.extname(filePath));
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const activeMappings = new Map();

for (const item of manifest.items ?? []) {
  if (!item.copiedFile || item.copiedFile.startsWith("_archived/")) continue;
  if (!item.publicImage) continue;

  activeMappings.set(item.copiedFile, item.publicImage);
}

const rawCategories = listCategoryDirs(rawRoot);
const publicCategories = listCategoryDirs(publicRoot);
const categories = Array.from(new Set([...rawCategories, ...publicCategories])).sort();
const problems = [];
const activeRawFiles = [];
const publicFiles = [];

console.log("Meraki Arts 53 image parity");
console.log("Raw folder: creations/segregated");
console.log("Edited folder: public/images");
console.log("");

for (const category of categories) {
  const rawFiles = listImageFiles(
    path.join(rawRoot, category),
    rawImageExt
  ).map((file) => `${category}/${file}`);
  const editedFiles = listImageFiles(
    path.join(publicRoot, category),
    publicImageExt
  ).map((file) => `public/images/${category}/${file}`);

  activeRawFiles.push(...rawFiles);
  publicFiles.push(...editedFiles);

  const status = rawFiles.length === editedFiles.length ? "OK" : "MISMATCH";
  console.log(
    `${status} ${category.padEnd(18)} raw ${String(rawFiles.length).padStart(
      3
    )} public ${String(editedFiles.length).padStart(3)}`
  );

  if (rawFiles.length !== editedFiles.length) {
    problems.push(
      `${category}: raw count ${rawFiles.length} does not match public count ${editedFiles.length}`
    );
  }
}

const publicToRaw = new Map();

for (const rawFile of activeRawFiles) {
  const publicImage = activeMappings.get(rawFile);
  const rawPath = path.join(rawRoot, rawFile);

  if (!publicImage) {
    problems.push(`Raw file has no manifest public image: ${rawFile}`);
    continue;
  }

  if (!fs.existsSync(path.join(root, publicImage))) {
    problems.push(`Raw file maps to missing public image: ${rawFile} -> ${publicImage}`);
    continue;
  }

  const rawBase = basenameWithoutExtension(rawFile);
  const publicBase = basenameWithoutExtension(publicImage);

  if (rawBase !== publicBase) {
    problems.push(`Basename mismatch: ${rawFile} -> ${publicImage}`);
  }

  if (!fs.existsSync(rawPath)) {
    problems.push(`Manifest raw file is missing: ${rawFile}`);
  }

  const existingRaw = publicToRaw.get(publicImage);
  if (existingRaw) {
    problems.push(`Public image has multiple raw files: ${publicImage}`);
  } else {
    publicToRaw.set(publicImage, rawFile);
  }
}

for (const publicFile of publicFiles) {
  if (!publicToRaw.has(publicFile)) {
    problems.push(`Public image has no active raw source: ${publicFile}`);
  }
}

console.log("");
console.log(`Active raw images: ${activeRawFiles.length}`);
console.log(`Edited public images: ${publicFiles.length}`);
console.log(`Active manifest mappings: ${activeMappings.size}`);

if (problems.length) {
  console.log("");
  console.log("Problems:");
  for (const problem of problems) {
    console.log(`- ${problem}`);
  }
  process.exitCode = 1;
} else {
  console.log("");
  console.log("OK: raw and public image sets are in one-to-one parity.");
}
