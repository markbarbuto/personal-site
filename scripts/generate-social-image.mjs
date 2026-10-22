import sharp from "sharp";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const portrait = await sharp(fileURLToPath(new URL("public/profile/mark-barbuto-linkedin.jpg", root)))
  .resize(260, 260, { fit: "cover" })
  .png()
  .toBuffer();
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#f5f5f7"/>
  <rect x="56" y="56" width="1088" height="518" rx="32" fill="#ffffff"/>
  <text x="100" y="210" fill="#0071e3" font-family="Arial, sans-serif" font-size="24">markbarbuto.com</text>
  <text x="100" y="292" fill="#1d1d1f" font-family="Arial, sans-serif" font-size="62" font-weight="700">Mark Barbuto</text>
  <text x="100" y="350" fill="#1d1d1f" font-family="Arial, sans-serif" font-size="32">Full-Stack Software Developer</text>
  <text x="100" y="420" fill="#55555d" font-family="Arial, sans-serif" font-size="24">.NET · Azure · React · SQL Server</text>
</svg>`);
await sharp(svg)
  .composite([{ input: portrait, left: 840, top: 180 }])
  .png()
  .toFile(fileURLToPath(new URL("public/og-image.png", root)));
console.log("Generated public/og-image.png at 1200 x 630.");
