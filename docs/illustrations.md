# Farm Natura graphite studies

Created on 6 October 2026 with the built-in `image_gen` tool. These are AI-generated illustrations in a hand-drawn graphite style, based on real estate photographs. They do not replace the actual photographs or represent a surveyed estate plan. No Kononenko artwork was used as a generation input.

| Study     | Composition reference                | Preserved master                                   | Website asset                                |
| --------- | ------------------------------------ | -------------------------------------------------- | -------------------------------------------- |
| Orchard   | `public/images/orchard-retina.jpg`   | `source-assets/illustrations/orchard-pencil.png`   | `public/illustrations/orchard-pencil.webp`   |
| Farmhouse | `public/images/farmhouse-retina.jpg` | `source-assets/illustrations/farmhouse-pencil.png` | `public/illustrations/farmhouse-pencil.webp` |

Both generated masters are 1774 × 887 pixels. Sharp resizes and encodes the delivery files at 3840 × 1920, quality 95 WebP. Upscaling provides delivery dimensions, not additional native pencil detail. The WebGL scene loads these files directly; the HTML fallback uses Next.js image optimization.

## Final orchard prompt

Input: the real orchard photograph, used as a composition reference.

> Use case: style-transfer. Asset type: full width interactive website illustration for Farm Natura. Create a finely detailed HAND DRAWN GRAPHITE PENCIL illustration of the actual orchard photograph provided. Preserve the camera perspective and composition of this photo, tree row locations, foreground mango tree left, leafy mango and banana plants right, converging orchard aisle toward center horizon. Must look drawn by a skilled landscape architect by hand: irregular gestural pencil strokes, subtly doubled contour lines, botanical leaves, trunk texture, dry soil stippling and restrained cross-hatched shadows. Monochrome warm gray graphite on a PURE WHITE #FFFFFF background with no paper texture. Light airy sketch, darker detailed outlines and delicate midtone foliage, not photorealistic, no geometric diagram, no repeated clipart trees, no vector-clean edges. Landscape 2:1 composition, full orchard vista centered with drawing fading gently into white at the outer margins. No text, no annotations, no logo, no color. Highest possible resolution, suitable for a 5K iMac website. The source photograph is a subject/composition reference, not an image to retain photorealistically.

## Final farmhouse prompt

Inputs: the real farmhouse photograph as the subject/composition reference, followed by the generated orchard study as a style reference.

> Use case: style-transfer. Asset type: detailed hand drawn graphite illustration for a full width Farm Natura interactive website. Image 1 subject and exact composition reference: the REAL Farm Natura stone farmhouse with pitched corrugated veranda roof left, flat stone living block right, steps and garden lawn, palms and leafy trees right. Image 2 is style reference only. Translate image 1 into the same light airy refined architectural hand sketch as image 2. Preserve the farmhouse architecture and photo perspective precisely, not a generic building or wireframe. Skilled hand-drawn pencil lines with subtly imperfect doubled contours, fine cross-hatching in the shaded veranda, masonry block texture, roof rib lines, detailed palm fronds, organic garden grass and foliage. Monochrome warm graphite gray on PURE WHITE #FFFFFF backdrop, no paper texture. Emphasize visible pencil craft and restrained shadow, not a photoreal grayscale photo, no vector geometric diagram. Landscape 2:1 full scene composition with gentle fade to white at perimeter and generous white sky. No labels, no text, no logo, no color, no invented structures. Highest possible resolution suitable for a 5K iMac website.

## Rebuild delivery assets

Run from the project root:

```sh
node -e 'const sharp=require("sharp"); Promise.all(["orchard","farmhouse"].map(name=>sharp(`source-assets/illustrations/${name}-pencil.png`).resize({width:3840}).webp({quality:95}).toFile(`public/illustrations/${name}-pencil.webp`)))'
```

To replace a study, keep the filename or update `FarmSketch.tsx`. Its reference photograph must use the same camera composition for the lens transition to align. The image-generation process is separate from the runtime: the website never calls an image API.
