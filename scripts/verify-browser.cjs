/** Run against a running server: node scripts/verify-browser.cjs
 * CHROME_PATH is optional when Playwright's Chromium is installed.
 * This verifies real routes and interactions without sending any enquiries.
 */
const { chromium } = require("@playwright/test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const sharp = require("sharp");
const base = process.env.PREVIEW_URL || "http://localhost:3001";
const chrome =
  process.env.CHROME_PATH ||
  (fs.existsSync("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
    ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    : undefined);
const routes = [
  "/",
  "/about-us",
  "/farm-lands-for-sale-in-hyderabad",
  "/natural-farming",
  "/farmhouses-for-sale-in-hyderabad",
  "/gallery",
  "/farmland-near-kandukur",
  "/contact",
];

(async () => {
  const browser = await chromium.launch({
    executablePath: chrome,
    headless: true,
    args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  });
  const errors = [];
  try {
    const page = await browser.newPage({ reducedMotion: "reduce" });
    page.on("pageerror", (error) => errors.push(error.message));
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const route of routes) {
        const response = await page.goto(base + route, { waitUntil: "networkidle" });
        assert.equal(response.status(), 200, route);
        assert.equal(await page.locator("h1").count(), 1, `One heading on ${route}`);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth + 1,
        );
        assert.equal(overflow, false, `No overflow on ${route} at ${width}px`);
        const broken = await page
          .locator("img")
          .evaluateAll((images) =>
            images
              .filter(
                (image) =>
                  image.getClientRects().length > 0 && image.complete && image.naturalWidth === 0,
              )
              .map((image) => image.src),
          );
        assert.deepEqual(broken, [], `Images on ${route}`);
      }
      console.log(`All eight pages: ${width}px, no overflow or broken images`);
    }
    await page.goto(base + "/gallery", { waitUntil: "networkidle" });
    assert.equal(await page.locator(".gallery-item").count(), 7);
    await page.getByRole("button", { name: "The land", exact: true }).click();
    await page.waitForFunction(() => document.querySelectorAll(".gallery-item").length === 3);
    assert.equal(await page.locator(".gallery-item").count(), 3);
    const firstPhoto = page.locator(".gallery-item").first();
    await firstPhoto.click();
    assert.equal(await page.locator(".gallery-lightbox").evaluate((node) => node.open), true);
    const firstTitle = await page.locator(".lightbox-top h2").textContent();
    await page.keyboard.press("ArrowRight");
    assert.notEqual(await page.locator(".lightbox-top h2").textContent(), firstTitle);
    await page.keyboard.press("Escape");
    assert.equal(await page.locator(".gallery-lightbox").evaluate((node) => node.open), false);
    assert.equal(await firstPhoto.evaluate((node) => node === document.activeElement), true);
    console.log("Gallery filtering, keyboard navigation, Escape, and focus restoration pass");

    await page.getByRole("button", { name: "Open navigation", exact: true }).click();
    assert.equal(await page.locator(".menu-dialog").evaluate((node) => node.open), true);
    await page
      .locator(".menu-dialog")
      .getByRole("link", { name: /Natural farming/ })
      .click();
    await page.waitForURL("**/natural-farming");
    assert.equal(await page.locator(".menu-dialog").evaluate((node) => node.open), false);
    assert.equal(await page.evaluate(() => document.body.style.overflow), "");
    console.log("Mobile menu and route navigation pass");

    await page.goto(base + "/farm-lands-for-sale-in-hyderabad", { waitUntil: "networkidle" });
    const faq = page.locator("details").first();
    await faq.locator("summary").click();
    assert.equal(await faq.getAttribute("open"), "");
    console.log("Estate FAQ disclosure passes");

    await page.goto(base + "/contact", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Prepare my visit enquiry" }).click();
    assert.equal(await page.locator(".prepared-request").count(), 0);
    await page.getByLabel("Your name").fill("Browser Verification");
    await page.getByLabel("Phone number").fill("123");
    await page.getByRole("button", { name: "Prepare my visit enquiry" }).click();
    assert.equal(await page.locator(".prepared-request").count(), 0);
    await page.getByLabel("Phone number").fill("+91 98765 43210");
    await page.getByRole("button", { name: "Prepare my visit enquiry" }).click();
    const url = await page.getByRole("link", { name: "Continue in WhatsApp" }).getAttribute("href");
    assert.ok(url.startsWith("https://wa.me/919579555666?text="));
    assert.ok(decodeURIComponent(url).includes("Browser Verification"));
    await page.getByLabel("Your name").fill("Changed Name");
    assert.equal(await page.locator(".prepared-request").count(), 0);
    console.log("Form validation and prepared WhatsApp message pass; nothing sent");

    const animatedPage = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: "no-preference",
    });
    animatedPage.on("pageerror", (error) => errors.push(error.message));
    await animatedPage.goto(base, { waitUntil: "networkidle" });
    await animatedPage.waitForTimeout(1500);
    await animatedPage.mouse.move(720, 400);
    await animatedPage.mouse.wheel(0, 600);
    await animatedPage.waitForTimeout(1500);
    assert.ok(await animatedPage.evaluate(() => window.scrollY > 100), "Natural scrolling works");
    const sketch = animatedPage.locator(".kg-sketch").first();
    await sketch.scrollIntoViewIfNeeded();
    await animatedPage.waitForFunction(
      () => document.querySelector(".kg-sketch")?.dataset.renderer === "webgl",
    );
    const canvas = sketch.locator("canvas");
    await animatedPage.mouse.move(10, 10);
    await animatedPage.waitForTimeout(600);
    fs.mkdirSync("artifacts/motion", { recursive: true });
    const before = await canvas.screenshot({ path: "artifacts/motion/drawing.png" });
    await sketch.hover();
    assert.ok((await sketch.getAttribute("class")).includes("is-hovered"));
    await animatedPage.waitForTimeout(750);
    const hover = await canvas.screenshot({ path: "artifacts/motion/pointer-lens.png" });
    const pixelDifference = async (a, b) => {
      const first = await sharp(a).resize(256, 128).removeAlpha().raw().toBuffer();
      const second = await sharp(b).resize(256, 128).removeAlpha().raw().toBuffer();
      return first.reduce((sum, value, i) => sum + Math.abs(value - second[i]), 0) / first.length;
    };
    assert.ok(
      (await pixelDifference(before, hover)) > 0.5,
      "WebGL pointer changes the rendered pixels",
    );
    await sketch.click();
    await animatedPage.mouse.move(10, 10);
    await animatedPage.waitForTimeout(800);
    const expanded = await canvas.screenshot({ path: "artifacts/motion/photograph.png" });
    assert.equal(await sketch.getAttribute("aria-pressed"), "true");
    assert.ok(
      (await pixelDifference(before, expanded)) > 10,
      "Click opens the actual photograph in WebGL",
    );
    await sketch.focus();
    await animatedPage.keyboard.press("Enter");
    assert.equal(await sketch.getAttribute("aria-pressed"), "false");
    const approach = animatedPage.locator(".kg-approach");
    const approachTop = await approach.evaluate(
      (node) => node.getBoundingClientRect().top + window.scrollY,
    );
    await animatedPage.evaluate((y) => window.scrollTo(0, y), approachTop + 50);
    await animatedPage.waitForTimeout(1800);
    assert.ok(
      Math.abs(
        await animatedPage
          .locator(".kg-approach-second .kg-approach-line > span")
          .first()
          .evaluate((node) => new DOMMatrix(getComputedStyle(node).transform).m42),
      ) < 1,
      "Radial headline completes its masked transition",
    );
    assert.equal(
      await animatedPage
        .locator(".kg-approach-stage")
        .evaluate((node) => getComputedStyle(node).backgroundColor),
      "rgb(255, 255, 255)",
    );
    console.log(
      "WebGL ink drawing, pointer lens, click expansion, keyboard control, and elastic radial transition pass",
    );
    await animatedPage.getByRole("link", { name: "About,", exact: true }).click();
    await animatedPage.waitForURL("**/about-us");
    await animatedPage.waitForTimeout(1200);
    assert.equal(await animatedPage.locator("h1").count(), 1);
    assert.equal(
      await animatedPage.locator(".kg-sketch-canvas").count(),
      0,
      "WebGL canvases are removed on navigation",
    );
    console.log("Animated client navigation passes");
    await animatedPage.goto(base + "/gallery", { waitUntil: "networkidle" });
    for (const mode of ["List", "Gallery", "Grid"]) {
      await animatedPage.getByRole("button", { name: mode, exact: true }).click();
      assert.equal(
        await animatedPage
          .getByRole("button", { name: mode, exact: true })
          .getAttribute("aria-pressed"),
        "true",
      );
    }
    console.log("Portfolio Grid, List, and Gallery views pass");
    assert.deepEqual(errors, []);
    console.log("Browser verification passed with no uncaught JavaScript errors");
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
