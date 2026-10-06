/** Rebuild Retina delivery files from the best available original estate photos. */
const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

(async () => {
  const root = path.join(__dirname, "..");
  const files = JSON.parse(
    await fs.readFile(path.join(root, "source-assets/image-manifest.json"), "utf8"),
  );
  const manifest = [];
  const dimensions = {};
  for (const entry of files) {
    const name = entry.file;
    const input = path.join(root, entry.source);
    const metadata = await sharp(input).metadata();
    const scale = entry.longEdge / Math.max(metadata.width, metadata.height);
    const width = Math.round(metadata.width * scale);
    const height = Math.round(metadata.height * scale);
    let image = sharp(input).resize(width, height, { kernel: "lanczos3", fit: "fill" });
    image = name.endsWith(".png")
      ? image.png({ compressionLevel: 9 })
      : image.jpeg({ quality: 95, chromaSubsampling: "4:4:4" });
    const destination = path.join(root, "public/images", name);
    await image.toFile(destination);
    manifest.push({
      file: name,
      source: entry.source,
      url: entry.url,
      original: { width: metadata.width, height: metadata.height },
      output: { width, height },
      method: "Source-preserving Lanczos3 upscale",
      bytes: (await fs.stat(destination)).size,
    });
    dimensions[name] = { width, height };
  }
  await fs.writeFile(
    path.join(root, "docs/image-resolutions.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );
  await fs.writeFile(
    path.join(root, "src/content/image-dimensions.json"),
    JSON.stringify(dimensions, null, 2) + "\n",
  );
  console.log(`Rebuilt ${files.length} Retina assets; see docs/image-resolutions.json.`);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
