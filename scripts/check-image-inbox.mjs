import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const contentPath = path.join(root, "data", "content.json");
const inboxRoot = path.join(root, "creations", "_inbox");
const existingRoot = path.join(inboxRoot, "existing");
const newRoot = path.join(inboxRoot, "new");
const imageExt = /\.(avif|heic|heif|jpe?g|png|webp)$/i;

const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
const knownArtForms = new Map(
  (content.artForms ?? []).map((artForm) => [artForm.slug, artForm.title]),
);

function listDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("_"))
    .map((entry) => entry.name)
    .sort();
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort();
}

function scanBucket(rootDir, mode) {
  return listDirs(rootDir).map((slug) => {
    const dir = path.join(rootDir, slug);
    const files = listFiles(dir);
    const images = files.filter((file) => imageExt.test(file));
    const ignored = files.filter((file) => !imageExt.test(file));

    return {
      mode,
      slug,
      title: knownArtForms.get(slug) ?? null,
      images,
      ignored,
      isKnown: knownArtForms.has(slug),
    };
  });
}

const existing = scanBucket(existingRoot, "existing");
const proposed = scanBucket(newRoot, "new");
const rows = [...existing, ...proposed];
const totalImages = rows.reduce((total, row) => total + row.images.length, 0);

console.log("Meraki Arts 53 image inbox");
console.log(`Inbox: ${path.relative(root, inboxRoot)}`);
console.log(`Total image files waiting: ${totalImages}`);
console.log("");

if (!rows.length) {
  console.log("No category folders found yet.");
  console.log("Use creations/_inbox/existing/<category-slug>/ or creations/_inbox/new/<new-slug>/.");
  process.exit(0);
}

for (const row of rows) {
  const label = row.title ? `${row.slug} (${row.title})` : row.slug;
  const status =
    row.mode === "existing"
      ? row.isKnown
        ? "known category"
        : "unknown existing category"
      : row.isKnown
        ? "already exists"
        : "new category proposal";

  console.log(`${row.mode}/${label}`);
  console.log(`  status: ${status}`);
  console.log(`  images: ${row.images.length}`);

  for (const image of row.images) {
    console.log(`  - ${image}`);
  }

  if (row.ignored.length) {
    console.log(`  ignored non-images: ${row.ignored.join(", ")}`);
  }

  console.log("");
}

const problems = rows.filter((row) => row.mode === "existing" && !row.isKnown);
if (problems.length) {
  console.log("Fix needed:");
  for (const problem of problems) {
    console.log(`- existing/${problem.slug} does not match a current art form slug.`);
  }
  process.exitCode = 1;
}
