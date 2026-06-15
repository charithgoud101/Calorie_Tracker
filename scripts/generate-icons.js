import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.join(__dirname, '../public/icons');

mkdirSync(iconsDir, { recursive: true });

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// SVG icon: green background with white "CT" leaf motif
function makeSVG(size) {
  const pad = size * 0.12;
  const r = (size / 2) * 0.9;
  const fontSize = size * 0.28;
  const leafSize = size * 0.18;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1B4332;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2D6A4F;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="url(#bg)"/>
  <!-- Leaf circle -->
  <circle cx="${size * 0.65}" cy="${size * 0.35}" r="${leafSize}" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="${size * 0.025}"/>
  <!-- CT text -->
  <text x="50%" y="57%"
    font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
    font-weight="800" font-size="${fontSize}"
    fill="white" text-anchor="middle" dominant-baseline="middle"
    letter-spacing="-1">CT</text>
  <!-- Small leaf accent -->
  <path d="M${size*0.62} ${size*0.28} Q${size*0.72} ${size*0.22} ${size*0.72} ${size*0.35} Q${size*0.62} ${size*0.35} ${size*0.62} ${size*0.28}Z"
    fill="rgba(255,255,255,0.5)"/>
</svg>`;
}

async function generateAll() {
  console.log('Generating PWA icons...');
  for (const size of sizes) {
    const svg = Buffer.from(makeSVG(size));
    const outPath = path.join(iconsDir, `icon-${size}x${size}.png`);
    await sharp(svg).resize(size, size).png().toFile(outPath);
    console.log(`  ✓ icon-${size}x${size}.png`);
  }
  console.log('All icons generated successfully!');
}

generateAll().catch(console.error);
