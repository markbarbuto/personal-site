import sharp from "sharp";
import { stat } from "node:fs/promises";
import { resolve } from "node:path";

const images = [
  ["profile/mark-barbuto-linkedin.jpg", 400],
  ["about-assets/utoronto-coa.png", 540],
  ["about-assets/dotnet-3d-faded.png", 540],
  ["about-assets/mobile-phone.png", 540],
  ["fun-assets/travel/travel-globe-3d.png", 600],
  ["fun-assets/music/music-record-3d.png", 600],
  ["fun-assets/905-gunners/crest-3d-angled.png", 600],
  ["project-assets/vitae-ai-icon.png", 320],
  ["project-assets/path-to-recovery-icon.png", 320],
  ["project-assets/indigenous-supports-khp.png", 320],
  ["project-assets/vitae-ai-header.png", 1600],
  ["project-assets/path-to-recovery-wordmark.png", 1600],
  ["project-assets/indigenous-supports-khp/header.png", 1600],
  ["project-assets/handwritten-digit-classifier/card.png", 320],
  ["project-assets/handwritten-digit-classifier/header.png", 1600],
];

let before = 0;
let after = 0;
for (const [asset, width] of images) {
  const input = resolve("public", asset);
  const output = input.replace(/\.(png|jpe?g)$/, ".webp");
  await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 85, effort: 5 }).toFile(output);
  const originalBytes = (await stat(input)).size;
  const optimizedBytes = (await stat(output)).size;
  before += originalBytes;
  after += optimizedBytes;
  console.log(`${asset}: ${originalBytes} -> ${optimizedBytes} bytes`);
}
console.log(`Generated ${images.length} WebP images. Source ${before} bytes, output ${after} bytes.`);
