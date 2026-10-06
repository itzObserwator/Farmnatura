# Farm Natura

An eight-page Farm Natura website redesigned around Kononenko Group’s photographic opening, monochrome editorial layouts, mixed sans-serif/serif typography, drawing reveals, asymmetric portfolio, rotating radial section, and black-background photo orbit. All copy, estate photographs, location information, and enquiries belong to Farm Natura.

## Run the project

Use Node.js 22 or newer and npm:

```sh
npm ci
npm run dev -- --port 3001
```

Open http://localhost:3001. Port 3000 may be occupied by another project. For production:

```sh
npm run build
npm start -- --port 3001
```

Stop and restart an existing production server after rebuilding so its page scripts match the new build.

## Where to edit

| Location                                      | Purpose                                                          |
| --------------------------------------------- | ---------------------------------------------------------------- |
| `src/content/home.ts`                         | Homepage copy, facts, experiences, and connectivity              |
| `src/content/site.ts`                         | Brand information, navigation, phone, and directions             |
| `src/content/gallery.ts`                      | Gallery photos, categories, and descriptions                     |
| `src/app/`                                    | Eight separate pages and their metadata                          |
| `src/components/sections/HomePage.tsx`        | Homepage section sequence                                        |
| `src/components/layout/Motion.tsx`            | Route-scoped scrolling, reveals, and navigation transitions      |
| `src/components/sections/FarmSketch.tsx`      | Hand-drawn artwork and lazy WebGL scene                          |
| `src/lib/animation/`                          | Graphite shader, pointer lens, flexible spokes, and photo orbits |
| `src/components/sections/ApproachDiagram.tsx` | Rotating radial geometry                                         |
| `src/components/ui/PhotoImage.tsx`            | Retina image selection and crop sizing                           |
| `src/styles/globals.css`                      | The single active stylesheet, grouped by section                 |
| `public/images/`                              | Locally served estate photos                                     |
| `public/illustrations/`                       | Graphite-style orchard and farmhouse studies                     |
| `docs/illustrations.md`                       | Illustration sources, generation prompts, and sizes              |
| `source-assets/image-manifest.json`           | Source-image provenance and delivery sizes                       |
| `docs/kononenko-rebuild.md`                   | Reference analysis, section mapping, and differences             |
| `backups/sandyshore/`                         | Archived earlier design, excluded from the build                 |

Shared components handle navigation, photo delivery, FAQs, the gallery, and the visit form. Edit shared content before searching through page markup. Keep animations scoped and cleaned up, and preserve the reduced-motion and mobile rules.

## Packages

Latest stable packages were checked and installed on 6 October 2026. Use `npm ci` to reproduce the exact lockfile versions. Next.js and React provide routes and image optimization; GSAP/ScrollTrigger and Lenis handle scroll choreography; Framer Motion handles menu staggering, gallery layout changes, and lightbox entrances; Three.js renders the custom WebGL drawing shader. Fontsource serves Hedvig Letters Serif and Inter locally; Lucide supplies icons; Sharp prepares image files; Playwright checks the browser; TypeScript and Prettier keep the project readable.

The reference’s serif family is matched. Inter substitutes for its proprietary PP Neue Montreal sans-serif. Drawing reveals now use original WebGL shaders and detailed graphite artwork derived from estate photographs. The implementation reproduces the observed interactions independently; it does not copy the reference’s application code. See `docs/kononenko-rebuild.md` for the timing study and mapping.

## Images

Estate photos use larger original Farm Natura images. Seven photographs have 5760-pixel delivery files. The two new graphite studies have 3840 × 1920 WebP delivery files; their generated masters are 1774 × 887. These dimensions do not imply native 4K or 5K capture: available detail is documented in `docs/assets.md` and `docs/illustrations.md`. Cropping and parallax are included in responsive photo selection.

```sh
npm run images:upscale
npm run images:verify
```

## Verification

With a preview running on port 3001:

```sh
npm run typecheck
npm run format:check
PREVIEW_URL=http://localhost:3001 npm run verify:browser
PREVIEW_URL=http://localhost:3001 npm run verify:retina
```

The browser checks eight pages at 1440, 768, 390, and 320 pixels and verifies navigation, gallery views and filters, keyboard controls, FAQs, form validation, WebGL pointer pixels, click expansion, GPU cleanup, and radial transitions. Motion screenshots are saved to `artifacts/motion/`. Retina checks use 2560 CSS pixels at 2× density and a separate mobile visit; screenshots are saved to `artifacts/retina/`. Set `CHROME_PATH` if Chrome is installed elsewhere.

WebGL loads near the viewport and renders only when visible and changed. Every scene disposes its textures, geometry, materials, renderer, listeners, and ticker on navigation. Reduced motion shows the artwork immediately; the button still switches to the real photograph. Browsers without WebGL use that same HTML fallback. Touch devices retain native scrolling. Chromium uses snapshot route transitions; other browsers use the GSAP curtain fallback.

## Enquiries

The visit form validates details and prepares a WhatsApp message. The visitor chooses whether to open WhatsApp and send it. No enquiry is automatically sent or saved, and visits are confirmed by the farm team. No CMS, backend, or public hosting service is configured.
# Farmnatura
