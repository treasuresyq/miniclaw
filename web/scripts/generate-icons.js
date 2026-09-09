#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'fs';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public', 'icons');
const electronAssetsDir = join(__dirname, '..', '..', 'electron', 'assets');

const sizes = [48, 72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  // The SVG is the canonical brand source so generated icons stay in sync.
  const faviconPath = join(__dirname, '..', 'public', 'favicon.svg');
  const sourcePath = faviconPath;

  console.log(`Using source: ${sourcePath}`);
  const sourceBuffer = readFileSync(sourcePath);

  // Generate standard icons
  for (const size of sizes) {
    const pngPath = join(publicDir, `icon-${size}.png`);
    console.log(`Generating ${pngPath}...`);

    await sharp(sourceBuffer)
      .resize(size, size)
      .png()
      .toFile(pngPath);

    console.log(`✓ Generated ${pngPath}`);
  }

  // Generate maskable icon (512x512 with 20% padding)
  const maskablePath = join(publicDir, 'icon-512-maskable.png');
  console.log(`Generating ${maskablePath}...`);

  const innerSize = Math.floor(512 * 0.6); // 60% of 512
  const padding = Math.floor((512 - innerSize) / 2);

  const maskableBuffer = await sharp(sourceBuffer)
    .resize(innerSize, innerSize)
    .toBuffer();

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: maskableBuffer, top: padding, left: padding }])
    .png()
    .toFile(maskablePath);

  console.log(`✓ Generated ${maskablePath}`);

  // Generate Apple Touch Icon (180x180)
  const appleTouchIconPath = join(publicDir, 'apple-touch-icon-180.png');
  console.log(`Generating ${appleTouchIconPath}...`);

  await sharp(sourceBuffer)
    .resize(180, 180)
    .png()
    .toFile(appleTouchIconPath);

  console.log(`✓ Generated ${appleTouchIconPath}`);

  // Keep the Electron window and installer branding in sync with the web app.
  const desktopIconPath = join(electronAssetsDir, 'miniclaw-icon.png');
  console.log(`Generating ${desktopIconPath}...`);

  await sharp(sourceBuffer)
    .resize(1024, 1024)
    .png()
    .toFile(desktopIconPath);

  console.log(`✓ Generated ${desktopIconPath}`);

  const icnsTypes = [
    { type: 'ic07', size: 128 },
    { type: 'ic08', size: 256 },
    { type: 'ic09', size: 512 },
    { type: 'ic10', size: 1024 },
    { type: 'ic11', size: 32 },
    { type: 'ic12', size: 64 },
    { type: 'ic13', size: 256 },
    { type: 'ic14', size: 512 },
  ];
  const icnsEntries = [];
  for (const { type, size } of icnsTypes) {
    const png = await sharp(sourceBuffer).resize(size, size).png().toBuffer();
    const entry = Buffer.alloc(8 + png.length);
    entry.write(type, 0, 'ascii');
    entry.writeUInt32BE(entry.length, 4);
    png.copy(entry, 8);
    icnsEntries.push(entry);
  }

  const icnsLength = 8 + icnsEntries.reduce((total, entry) => total + entry.length, 0);
  const icns = Buffer.alloc(icnsLength);
  icns.write('icns', 0, 'ascii');
  icns.writeUInt32BE(icnsLength, 4);
  let offset = 8;
  for (const entry of icnsEntries) {
    entry.copy(icns, offset);
    offset += entry.length;
  }

  const icnsPath = join(electronAssetsDir, 'miniclaw.icns');
  console.log(`Generating ${icnsPath}...`);
  writeFileSync(icnsPath, icns);

  console.log(`✓ Generated ${icnsPath}`);

  console.log('\n✅ All icons generated successfully!');
}

generateIcons().catch((error) => {
  console.error('❌ Error generating icons:', error);
  process.exit(1);
});
