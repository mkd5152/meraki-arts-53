import sharp from "sharp";

const canvas = { width: 1600, height: 1200 };

const targets = [
  {
    input: "creations/IMG-20220525-WA0010.jpg",
    output: "public/images/paintings/hand-painted-artwork-06.webp",
    mode: "frame",
    crop: null
  },
  {
    input: "creations/IMG-20220626-WA0008.jpg",
    output: "public/images/customized-gifts/customized-gift-detail-03.webp",
    mode: "coloredDecor"
  },
  {
    input: "creations/IMG-20220626-WA0011.jpg",
    output: "public/images/customized-gifts/customized-gift-detail-06.webp",
    mode: "coloredDecor"
  },
  {
    input: "creations/IMG-20231125-WA0001.jpg",
    output: "public/images/customized-gifts/customized-gift-detail-19.webp",
    mode: "banner"
  },
  {
    input: "creations/IMG-20260309-WA0001.jpg",
    output: "public/images/mehendi/mehendi-design-92.webp",
    mode: "mehendiHand"
  }
];

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

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function saturation(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max === 0 ? 0 : (max - min) / max;
}

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function dilate(mask, width, height, radius) {
  const output = new Uint8Array(mask.length);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let hit = false;
      for (let dy = -radius; dy <= radius && !hit; dy += 1) {
        const yy = y + dy;
        if (yy < 0 || yy >= height) continue;
        for (let dx = -radius; dx <= radius; dx += 1) {
          const xx = x + dx;
          if (xx < 0 || xx >= width) continue;
          if (mask[yy * width + xx] > 0) {
            hit = true;
            break;
          }
        }
      }
      output[y * width + x] = hit ? 255 : 0;
    }
  }
  return output;
}

function erode(mask, width, height, radius) {
  const output = new Uint8Array(mask.length);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let keep = true;
      for (let dy = -radius; dy <= radius && keep; dy += 1) {
        const yy = y + dy;
        if (yy < 0 || yy >= height) {
          keep = false;
          break;
        }
        for (let dx = -radius; dx <= radius; dx += 1) {
          const xx = x + dx;
          if (xx < 0 || xx >= width || mask[yy * width + xx] === 0) {
            keep = false;
            break;
          }
        }
      }
      output[y * width + x] = keep ? 255 : 0;
    }
  }
  return output;
}

function closeMask(mask, width, height, radius) {
  return erode(dilate(mask, width, height, radius), width, height, radius);
}

function fillHoles(mask, width, height) {
  const visited = new Uint8Array(mask.length);
  const queue = [];

  const pushIfBackground = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const index = y * width + x;
    if (visited[index] || mask[index] > 0) return;
    visited[index] = 1;
    queue.push(index);
  };

  for (let x = 0; x < width; x += 1) {
    pushIfBackground(x, 0);
    pushIfBackground(x, height - 1);
  }

  for (let y = 0; y < height; y += 1) {
    pushIfBackground(0, y);
    pushIfBackground(width - 1, y);
  }

  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const index = queue[cursor];
    const x = index % width;
    const y = Math.floor(index / width);
    pushIfBackground(x + 1, y);
    pushIfBackground(x - 1, y);
    pushIfBackground(x, y + 1);
    pushIfBackground(x, y - 1);
  }

  const output = new Uint8Array(mask);
  for (let index = 0; index < mask.length; index += 1) {
    if (mask[index] === 0 && visited[index] === 0) output[index] = 255;
  }
  return output;
}

function keepComponents(mask, width, height, options = {}) {
  const {
    minArea = 120,
    maxArea = Number.POSITIVE_INFINITY,
    keepLargest = false,
    ignoreTouchingEdge = false
  } = options;
  const visited = new Uint8Array(mask.length);
  const components = [];

  for (let index = 0; index < mask.length; index += 1) {
    if (mask[index] === 0 || visited[index]) continue;

    const queue = [index];
    const pixels = [];
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;
    let touchesEdge = false;
    visited[index] = 1;

    for (let cursor = 0; cursor < queue.length; cursor += 1) {
      const current = queue[cursor];
      pixels.push(current);
      const x = current % width;
      const y = Math.floor(current / width);
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
      touchesEdge ||= x === 0 || y === 0 || x === width - 1 || y === height - 1;

      const neighbors = [current - 1, current + 1, current - width, current + width];
      for (const next of neighbors) {
        if (next < 0 || next >= mask.length || visited[next] || mask[next] === 0) continue;
        const nx = next % width;
        const ny = Math.floor(next / width);
        if (Math.abs(nx - x) + Math.abs(ny - y) !== 1) continue;
        visited[next] = 1;
        queue.push(next);
      }
    }

    const area = pixels.length;
    if (area >= minArea && area <= maxArea && !(ignoreTouchingEdge && touchesEdge)) {
      components.push({ pixels, area, minX, minY, maxX, maxY });
    }
  }

  const selected = keepLargest
    ? components.sort((a, b) => b.area - a.area).slice(0, 1)
    : components;
  const output = new Uint8Array(mask.length);

  for (const component of selected) {
    for (const index of component.pixels) output[index] = 255;
  }

  return output;
}

function expandMask(mask, width, height, pixels) {
  return dilate(mask, width, height, pixels);
}

async function createMask(input, predicate, options = {}) {
  const { data, info } = await sharp(input)
    .rotate()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const mask = new Uint8Array(info.width * info.height);

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const pixel = y * info.width + x;
      const offset = pixel * info.channels;
      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];
      const a = data[offset + 3];
      mask[pixel] = predicate({ r, g, b, a, x, y, width: info.width, height: info.height })
        ? 255
        : 0;
    }
  }

  let output = mask;
  if (options.closeRadius) output = closeMask(output, info.width, info.height, options.closeRadius);
  if (options.dilateBeforeFill) {
    output = expandMask(output, info.width, info.height, options.dilateBeforeFill);
  }
  if (options.componentFilter) {
    output = keepComponents(output, info.width, info.height, options.componentFilter);
  }
  if (options.secondaryPredicate) {
    const searchArea = expandMask(output, info.width, info.height, options.secondaryRadius ?? 18);
    for (let y = 0; y < info.height; y += 1) {
      for (let x = 0; x < info.width; x += 1) {
        const pixel = y * info.width + x;
        if (searchArea[pixel] === 0) continue;
        const offset = pixel * info.channels;
        const r = data[offset];
        const g = data[offset + 1];
        const b = data[offset + 2];
        const a = data[offset + 3];
        if (options.secondaryPredicate({ r, g, b, a, x, y, width: info.width, height: info.height })) {
          output[pixel] = 255;
        }
      }
    }
  }
  if (options.fillHoles) output = fillHoles(output, info.width, info.height);
  if (options.expand) output = expandMask(output, info.width, info.height, options.expand);
  if (options.erode) output = erode(output, info.width, info.height, options.erode);

  return { mask: output, width: info.width, height: info.height };
}

async function composeCutout(input, output, maskSpec) {
  const { mask, width, height } = await createMask(input, maskSpec.predicate, maskSpec.options);
  if (process.env.DEBUG_STUDIO_MASKS) {
    const opaque = mask.reduce((sum, value) => sum + (value > 0 ? 1 : 0), 0);
    console.log(`${output} mask ${(opaque / mask.length).toFixed(4)}`);
  }
  const { data: alpha, info: alphaInfo } = await sharp(Buffer.from(mask), {
    raw: { width, height, channels: 1 }
  })
    .blur(maskSpec.blur ?? 0.55)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = await sharp(input)
    .rotate()
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(width * height * 4);

  for (let index = 0; index < width * height; index += 1) {
    const sourceOffset = index * info.channels;
    const outputOffset = index * 4;
    const rawAlpha = Math.min(data[sourceOffset + 3] ?? 255, alpha[index * alphaInfo.channels]);
    const cleanAlpha = rawAlpha < 28 ? 0 : rawAlpha > 235 ? 255 : rawAlpha;
    rgba[outputOffset] = cleanAlpha === 0 ? 0 : data[sourceOffset];
    rgba[outputOffset + 1] = cleanAlpha === 0 ? 0 : data[sourceOffset + 1];
    rgba[outputOffset + 2] = cleanAlpha === 0 ? 0 : data[sourceOffset + 2];
    rgba[outputOffset + 3] = cleanAlpha;
  }

  const cutout = await sharp(rgba, {
    raw: { width, height, channels: 4 }
  })
    .png()
    .toBuffer();

  await composeStudioImage(cutout, output, maskSpec.fit ?? { width: 1260, height: 980 });
}

async function composeStudioImage(cutout, output, fit = { width: 1280, height: 1000 }) {
  const trimResult = await sharp(cutout)
    .ensureAlpha()
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 6 })
    .png()
    .toBuffer({ resolveWithObject: true });

  const resizedSubject = await sharp(trimResult.data)
    .resize({
      ...fit,
      fit: "inside",
      withoutEnlargement: false
    })
    .sharpen({ sigma: 0.45 })
    .png()
    .toBuffer();
  const subject = await cleanAlpha(resizedSubject, 168);

  const subjectMeta = await sharp(subject).metadata();
  const left = Math.round((canvas.width - subjectMeta.width) / 2);
  const top = Math.round((canvas.height - subjectMeta.height) / 2);

  await sharp(studioBackground())
    .resize(canvas.width, canvas.height)
    .composite([{ input: subject, left, top }])
    .webp({ quality: 88, effort: 5 })
    .toFile(output);
}

async function cleanAlpha(input, threshold) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const cleaned = Buffer.alloc(info.width * info.height * 4);

  for (let index = 0; index < info.width * info.height; index += 1) {
    const offset = index * info.channels;
    const target = index * 4;
    const alpha = data[offset + 3];
    const cleanAlpha = alpha < threshold ? 0 : alpha > 236 ? 255 : alpha;
    cleaned[target] = cleanAlpha === 0 ? 0 : data[offset];
    cleaned[target + 1] = cleanAlpha === 0 ? 0 : data[offset + 1];
    cleaned[target + 2] = cleanAlpha === 0 ? 0 : data[offset + 2];
    cleaned[target + 3] = cleanAlpha;
  }

  return sharp(cleaned, {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .png()
    .toBuffer();
}

async function composeFramedImage(input, output, crop) {
  const source = sharp(input).rotate();
  const prepared = crop ? source.extract(crop) : source;
  const card = await prepared
    .resize({ width: 980, height: 1040, fit: "inside", withoutEnlargement: false })
    .modulate({ brightness: 1.04, saturation: 1.06 })
    .sharpen({ sigma: 0.45 })
    .webp({ quality: 90 })
    .toBuffer();
  const meta = await sharp(card).metadata();
  const left = Math.round((canvas.width - meta.width) / 2);
  const top = Math.round((canvas.height - meta.height) / 2);
  const shadow = Buffer.from(`
    <svg width="${meta.width + 70}" height="${meta.height + 70}" xmlns="http://www.w3.org/2000/svg">
      <filter id="s" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="18" dy="24" stdDeviation="18" flood-color="#302a24" flood-opacity="0.28"/>
      </filter>
      <rect x="20" y="16" width="${meta.width}" height="${meta.height}" rx="6" fill="#fff" filter="url(#s)"/>
    </svg>
  `);

  await sharp(studioBackground())
    .resize(canvas.width, canvas.height)
    .composite([
      { input: shadow, left: left - 20, top: top - 16 },
      { input: card, left, top }
    ])
    .webp({ quality: 88, effort: 5 })
    .toFile(output);
}

function decorPredicate({ r, g, b }) {
  const sat = saturation(r, g, b);
  const redPink = r > 105 && r > g * 1.2 && r > b * 1.1 && sat > 0.28;
  const yellow = r > 115 && g > 80 && b < 100 && sat > 0.22;
  const blue = b > 90 && g > 75 && r < 105 && sat > 0.18;
  return redPink || yellow || blue;
}

function bannerPredicate({ r, g, b, y }) {
  if (y < 88) return false;
  const sat = saturation(r, g, b);
  const light = luminance(r, g, b);
  const pastelPaper = light > 145 && sat > 0.08;
  const saturatedEdge = sat > 0.22 && light > 75;
  return pastelPaper || saturatedEdge;
}

function yellowLamasaPredicate({ r, g, b }) {
  const sat = saturation(r, g, b);
  const yellow = r > 145 && g > 105 && b < 95 && sat > 0.25;
  const warmCenter = r > 90 && g > 55 && b < 70 && sat > 0.28;
  return yellow || warmCenter;
}

function mehendiHandPredicate({ r, g, b, x, y }) {
  const light = luminance(r, g, b);
  const sat = saturation(r, g, b);
  const skin =
    r > 75 &&
    g > 42 &&
    b > 30 &&
    r > g * 0.95 &&
    r > b * 1.12 &&
    light > 52 &&
    sat > 0.16;
  const nail = r > 90 && g < 90 && b < 85 && r > g * 1.18;
  return skin || nail;
}

function mehendiDarkPredicate({ r, g, b, x, y }) {
  const light = luminance(r, g, b);
  const likelyHandArea = x > 18 && x < 830 && y > 70 && y < 1545;
  return (
    likelyHandArea &&
    light < 92 &&
    Math.max(r, g, b) < 125 &&
    r > 18 &&
    g > 14 &&
    b > 10
  );
}

const maskSpecs = {
  coloredDecor: {
    predicate: decorPredicate,
    options: {
      closeRadius: 2,
      fillHoles: true,
      componentFilter: { minArea: 38, ignoreTouchingEdge: true },
      expand: 1
    },
    blur: 0.45,
    fit: { width: 1280, height: 860 }
  },
  banner: {
    predicate: bannerPredicate,
    options: {
      closeRadius: 2,
      fillHoles: true,
      componentFilter: { minArea: 420 },
      expand: 2
    },
    blur: 0.5,
    fit: { width: 1380, height: 540 }
  },
  yellowLamasa: {
    predicate: yellowLamasaPredicate,
    options: {
      closeRadius: 3,
      fillHoles: true,
      componentFilter: { minArea: 220 },
      expand: 2
    },
    blur: 0.45,
    fit: { width: 980, height: 980 }
  },
  mehendiHand: {
    predicate: mehendiHandPredicate,
    options: {
      closeRadius: 5,
      dilateBeforeFill: 3,
      componentFilter: { minArea: 9000, keepLargest: true },
      secondaryPredicate: mehendiDarkPredicate,
      secondaryRadius: 22,
      fillHoles: true,
      expand: 4,
      erode: 1
    },
    blur: 0.75,
    fit: { width: 900, height: 1080 }
  }
};

for (const target of targets) {
  if (target.mode === "frame") {
    await composeFramedImage(target.input, target.output, target.crop);
  } else {
    await composeCutout(target.input, target.output, maskSpecs[target.mode]);
  }
  console.log(`updated ${target.output}`);
}
