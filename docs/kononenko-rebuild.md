# Kononenko reference rebuild — 6 October 2026

This is the current design direction. The Sandy Shore study and components in `backups/sandyshore/` record the previous version.

## Reference analysis

The reference was inspected in Chrome at 1440 × 1000 and 390 × 844, including Index, Work, About, and Contact. Screenshots, computed font measurements, and section research are saved in `research/kononenko/`. These research files are not shipped to visitors.

The opening is a full-viewport photograph with small fixed corner navigation and a bottom-left two-line identity. A centered sans-serif statement follows, with two small gray descriptions and a full-width panoramic photograph. The body combines a twelve-column grid, small factual labels, serif editorial paragraphs, oversized indented serif statements, thin table rules, drawing-based process sections, and asymmetrically arranged project photographs.

The radial diagram rotates while a pinned section changes from white to black. The lower page combines black-background editorial type, an orbit of photographs moving with scroll, oversized statistics, and a large central serif closing statement surrounded by circular badges. The footer returns to a sparse white grid. The Work page offers Grid, List, and Gallery layouts; About opens with a full-screen team photograph; Contact begins with a large serif introduction and oversized contact links.

## Farm Natura mapping

| Reference section                     | Farm Natura section                                                          |
| ------------------------------------- | ---------------------------------------------------------------------------- |
| Architectural bureau photo opening    | Actual Farm Natura farmhouse and natural-farming estate identity             |
| Systematic clarity statement          | Naturally rooted and connected                                               |
| Studio facts and achievements         | Estate facts, farming care, ownership, and maintenance                       |
| Office table                          | Actual location connectivity and approximate travel times                    |
| Sketch-to-strategy process            | Living soil, cultivation, and farm care                                      |
| Selected architecture projects        | Six estate, farming, farmhouse, and community experiences                    |
| Radial approach                       | Rooted and real; simplicity and care through the seasons                     |
| People, foundation, studio statistics | Farm community, 110+ acres, soil revitalisation, maintenance, airport travel |
| Client brands                         | Farm Natura’s values; no invented client brands or awards                    |
| Work views                            | Farm Natura gallery views, filters, and keyboard lightbox                    |

## Implementation

- `src/content/home.ts`: homepage copy, facts, connectivity, and experience links.
- `src/components/sections/HomePage.tsx`: ordered reference section layout.
- `src/components/sections/FarmSketch.tsx`: detailed graphite-style artwork based on the actual orchard and farmhouse, with lazy WebGL enhancement and an accessible photograph toggle.
- `src/lib/animation/createSketchScene.ts` and `sketchShaders.ts`: custom Three.js scene, density-based ink development, smoothed pointer lens, and expanding photograph reveal.
- `src/lib/animation/radialMotion.ts`: flexible SVG spokes that react to scrolling speed, lagging number positions, and reversible masked headline changes.
- `src/lib/animation/photoOrbitMotion.ts` and `valueOrbit.ts`: the estate photo ring spreading into a curved stream and continuously revolving value badges with depth.
- `src/components/sections/ApproachDiagram.tsx`: numbered radial geometry.
- `src/components/layout/Motion.tsx`: GSAP/ScrollTrigger animation ownership, Lenis scrolling, word reveals, parallax, pinning, rotating photo orbit, and route curtain. Cleanup runs on every route change.
- `src/components/ui/RevealText.tsx`: accessible word masks.
- `src/styles/globals.css`: one active stylesheet, grouped by section, with responsive and reduced-motion rules.
- `src/components/ui/PhotoImage.tsx`: Retina source selection that accounts for frame cropping and parallax. Hidden frames keep their original responsive sizes until measurable.

All eight original routes, contact links, visit-form validation, FAQs, location information, gallery filters, and keyboard controls remain available. Reduced motion keeps content readable, skips WebGL animation, and preserves ordinary scrolling and navigation. Touch devices use native scrolling and can tap the graphite study to reveal its photograph.

## Fonts and practical differences

Reference font metadata identifies PP Neue Montreal (Pangram Pangram) and Hedvig Letters Serif 24pt (Kanon Foundry, SIL OFL). The rebuild uses the same open-licensed Hedvig family from Fontsource and Inter as the sans-serif substitute. Exact PP Neue Montreal requires the appropriate licensed webfont files.

The animation sequence is implemented independently with Framer Motion, GSAP, and custom Three.js WebGL shaders. Farm Natura estate photographs replace architecture renders; source-detail limits remain documented in `assets.md`. The illustrations are generated graphite-style interpretations of the actual photos, with their provenance and full prompts in `illustrations.md`. No architecture awards, office locations, invented teams, or client endorsements are imported from the reference.

## Second animation study

The live site was inspected again in Chrome, including its WebGL canvas, drawing hover and click behavior, radial movement, lower photo sequence, and route changes. The published client bundles were read for timing and behavior research only; they are not imported into the Farm Natura application. Evidence is saved under `research/kononenko/animation-*.png` and `route-*.png`.

| Observed behavior                                                                                 | Farm Natura implementation                                                                                  |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Hero image begins at 1.1× scale and settles over 2.4 seconds                                      | Same scale and duration on hero photo frames                                                                |
| Drawing develops according to ink density and grain while scrolling from top/bottom to bottom/top | Original density/grain fragment shader, scrubbed over the same viewport interval                            |
| Pointer follows with damping of 8; hover transitions over 0.3 seconds                             | Frame-rate-independent exponential damping and a 0.3-second GSAP uniform tween                              |
| Lens radius approximately 0.15 of the drawing height with a feathered edge                        | Shader lens with 0.11–0.16 height transition and irregular grain edge                                       |
| Click expands from the pointer over 0.6 seconds; reclick collapses over 0.5 seconds               | Aspect-aware radius expansion over 0.6 seconds using power2.out; collapse over 0.5 seconds using power3.out |
| Eight spokes rotate through 180° with velocity-driven bending; numbers lag                        | Original sampled SVG curves driven by scroll progress and damped velocity                                   |
| Radial headline exits through a line mask at the midpoint and reverses upward                     | Reversible GSAP line timeline, synchronized with the monochrome background change                           |
| Photo ring spreads into a sweeping stream; statistics highlight near the viewport center          | Natural-scroll ring/arc morph with center-based statistic highlighting                                      |
| Closing marks revolve with depth, scale, and front/back overlap                                   | Continuously revolving perspective orbit of Farm Natura values                                              |
| Work layouts change with animated image positions                                                 | Framer Motion layout animation for Grid/List/Gallery and filtering                                          |
| Outgoing page remains visible during incoming image/text entrance                                 | Snapshot clip/translation route transition, with a GSAP fallback                                            |

Artwork, copy lengths, responsive compositions, and gallery contents differ from the reference. These are observed-behavior recreations rather than a claim of pixel-for-pixel identical animation frames.

Following the requested color correction, the radial section now keeps black headlines on a white background through both animation states. Its title layers have transparent backgrounds so the incoming masked headline cannot hide the current text.

## Packages and validation

Latest stable npm versions were checked and installed on 6 October 2026. The project uses Next.js, React, TypeScript, GSAP, Lenis, Lucide, Fontsource, Sharp, Playwright, and Prettier. The lockfile records exact versions. npm reported zero known vulnerabilities at installation.

Run `npm run build`, `npm run verify:browser`, `npm run verify:retina`, and `npm run images:verify`. Browser checks cover every route at desktop, tablet, and phone widths; gallery filtering and view modes; keyboard lightbox; menu; FAQ; visit validation; natural scrolling; drawing interaction; the pinned radial transition; and animated route navigation. They never send an enquiry.

The first rebuild passed the production build, formatting checks, all eight routes at 1440, 768, 390, and 320 pixels, and its interaction checks. The updated browser checks additionally compare actual WebGL output pixels before hover and after expansion, check keyboard activation, verify the masked radial headline, and confirm canvas removal on navigation. Retina checks use 2560 CSS pixels with a device pixel ratio of 2.

The second rebuild passed the production build, full browser regression, and Retina checks. Additional Chrome checks confirmed continuous badge rotation and WebGL expansion on a 390-pixel touch viewport without horizontal overflow. Both illustration scenes rendered without uncaught JavaScript errors. Screenshots are saved in `artifacts/motion/` and `artifacts/`.
