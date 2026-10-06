/** Check the active Retina masters. Browser delivery remains responsive. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

(async () => {
  const directory = path.join(__dirname, "../public/images");
  const files = JSON.parse(
    await fs.readFile(path.join(__dirname, "../source-assets/image-manifest.json"), "utf8"),
  );
  for (const { file, longEdge } of files) {
    const metadata = await sharp(path.join(directory, file)).metadata();
    assert.equal(Math.max(metadata.width, metadata.height), longEdge, `${file}: Retina long edge`);
    if (file === "farm-collage.png") assert.equal(metadata.hasAlpha, true, "Transparent collage");
    console.log(`${file}: ${metadata.width} × ${metadata.height}`);
  }
  console.log(`All ${files.length} active raster images have a verified Retina master.`);
  for (const name of ["orchard", "farmhouse"]) {
    const illustration = path.join(__dirname, `../public/illustrations/${name}-pencil.webp`);
    const metadata = await sharp(illustration).metadata();
    assert.equal(metadata.width, 3840, `${name}: illustration delivery width`);
    assert.equal(metadata.height, 1920, `${name}: illustration delivery height`);
    console.log(`${name} graphite study: ${metadata.width} × ${metadata.height}`);
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
