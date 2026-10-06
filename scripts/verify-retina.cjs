/** Run against a preview: PREVIEW_URL=http://localhost:3001 npm run verify:retina */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const { chromium } = require("@playwright/test");
const base = process.env.PREVIEW_URL || "http://localhost:3001";

(async () => {
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: true,
  });
  try {
    await fs.mkdir("artifacts/retina", { recursive: true });
    const page = await browser.newPage({
      viewport: { width: 2560, height: 1440 },
      deviceScaleFactor: 2,
      reducedMotion: "no-preference",
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(base, { waitUntil: "networkidle" });
    await page.waitForTimeout(1600);
    for (const [selector, name] of [
      ["#land-film", "orchard"],
      [".kg-project-grid", "estate"],
      [".kg-hero", "farmhouse"],
    ]) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(1500);
      await page
        .locator(`${selector} img`)
        .evaluateAll((images) => Promise.all(images.map((image) => image.decode())));
      const images = await page.locator(`${selector} img`).evaluateAll((nodes) =>
        nodes.map((image) => ({
          url: image.currentSrc,
          width: image.getBoundingClientRect().width,
          density: window.devicePixelRatio,
        })),
      );
      for (const image of images) {
        const url = new URL(image.url);
        assert.ok(Number(url.searchParams.get("w")) >= image.width * image.density);
        assert.equal(url.searchParams.get("q"), "95");
        assert.ok(url.searchParams.get("url").includes("retina"));
      }
      await page.locator(selector).screenshot({ path: `artifacts/retina/${name}-5k.png` });
      console.log(`${name}: Retina delivery passes`);
    }
    assert.deepEqual(errors, []);

    // A browser retains an already downloaded larger image after a resize.
    // Use a fresh mobile visit to check the file it actually downloads.
    const mobile = await browser.newPage({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      reducedMotion: "reduce",
    });
    await mobile.goto(base, { waitUntil: "networkidle" });
    await mobile.locator("#land-film").scrollIntoViewIfNeeded();
    await mobile.locator("#land-film img").evaluate((image) => image.decode());
    const url = await mobile.locator("#land-film img").evaluate((image) => image.currentSrc);
    assert.ok(Number(new URL(url).searchParams.get("w")) < 5760);
    console.log("Mobile delivery passes; screenshots saved in artifacts/retina.");
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
