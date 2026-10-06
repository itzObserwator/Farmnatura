# Brand and asset sources

Images are stored locally so the website does not depend on the old site at runtime. These assets come from the existing Farm Natura website and are used in its requested revamp.

| Local file                           | Original source                                             |
| ------------------------------------ | ----------------------------------------------------------- |
| `public/images/logo.svg`             | https://www.farmnatura.in/images/highlights/logo.svg        |
| `public/images/farm.jpg`             | https://www.farmnatura.in/images/gallery/farm.jpg           |
| `public/images/dining.jpg`           | https://www.farmnatura.in/images/gallery/dining.jpg         |
| `public/images/farmhouse.jpg`        | https://www.farmnatura.in/images/gallery/farmhouse.jpg      |
| `public/images/farmhouse-garden.jpg` | https://www.farmnatura.in/images/gallery/farmhouse2.jpg     |
| `public/images/goshala.jpg`          | https://www.farmnatura.in/images/gallery/goshala.jpg        |
| `public/images/goshala-aerial.jpg`   | https://www.farmnatura.in/images/gallery/goshalatopview.jpg |
| `public/images/home.jpg`             | https://www.farmnatura.in/home/building1.jpg                |

DM Sans and DM Serif Display are served locally from `public/fonts/`. Font files were retrieved through Google Fonts. Their SIL Open Font License files are included alongside them.

The botanical sprig and connectivity diagram are original SVG artwork in the components. The connectivity diagram is labeled as illustrative and not to scale. Navigation directions use Google Maps search for Farm Natura in Kandukur.

Sandy Shore and Delfino Farms influenced the editorial design and motion direction. Their photographs, logos, proprietary fonts, scripts, and business content are not included in this website.

## Sandy Shore-led rebuild assets

`public/images/farm-collage.png` is an original generated transparent illustration of an imagined natural farm, not a photo or exact rendering of the actual estate. Seed and botanical graphics are native SVG components.

Locally served Bodoni Moda and Roboto Mono were obtained through Google Fonts. Official SIL Open Font License files are included in `public/fonts/`. Bodoni Moda substitutes for the reference’s proprietary display fonts; Roboto Mono matches its body font family.

## Retina image correction

The initial six estate photographs came from 487 × 480 gallery thumbnails. Resizing those thumbnails to 4K increased file dimensions without recovering source detail. They have now been replaced by larger photographs of the actual estate, published on Farm Natura’s gallery page. The imagery changes are reflected in captions and alternative text. Original brand watermarks in the published photographs are retained.

| Active file                 | Source                                                          | Native source size |
| --------------------------- | --------------------------------------------------------------- | ------------------ |
| orchard-retina.jpg          | https://www.farmnatura.in/images/gallery/fnsi2.jpeg             | 1600 × 720         |
| farm-care-retina.jpg        | https://www.farmnatura.in/images/gallery/fnsi3.jpeg             | 1600 × 720         |
| pavilion-retina.jpg         | https://www.farmnatura.in/images/gallery/fnsi5.jpeg             | 1600 × 1067        |
| farmhouse-garden-retina.jpg | https://www.farmnatura.in/images/gallery/fnsi6.jpg              | 1920 × 1080        |
| goshala-retina.jpg          | https://www.farmnatura.in/images/gallery/fnsi1.jpeg             | 1280 × 853         |
| farmhouse-retina.jpg        | Embedded PNG in https://www.farmnatura.in/svg/highlight-img.svg | 2400 × 1200        |
| home-retina.jpg             | https://www.farmnatura.in/home/building1.jpg                    | 1293 × 862         |

The seven photographs have 5760-pixel delivery files, providing headroom for a 5120-pixel-wide Retina display and the 12% parallax zoom. The transparent collage remains 3840 × 3840. Delivery file sizes do not imply native 5K capture: these photographs retain the detail present in the native sources. Original camera/drone masters are still needed for full native Retina detail, particularly for the dusk photograph.

The source manifest is `source-assets/image-manifest.json`. Original downloads are stored in `source-assets/retina/`; the earlier thumbnails are retained in `source-assets/images/` for rollback. Run `npm run images:upscale` to rebuild delivery files and the dimension map, and `npm run images:verify` to validate their dimensions. `docs/image-resolutions.json` records native dimensions, delivery dimensions, URLs, and file sizes.

`PhotoImage.tsx` measures the visible frame and accounts for the source aspect ratio, object-fit cropping, and parallax scaling when setting the image’s responsive size. Next.js serves quality-95 variants up to 5760 pixels, while mobile screens select smaller files. Versioned filenames avoid reusing the image optimizer’s old thumbnail cache.

No AI-restored property photographs are used. Earlier generated variants were rejected because small property details changed. Native SVG components remain resolution independent; the archived unused `logo.svg` contains an embedded raster image.

## Kononenko-led typography

The current rebuild serves Hedvig Letters Serif and Inter through their latest Fontsource packages. SIL Open Font License copies are included in `public/fonts/`. Hedvig matches the reference’s serif family; Inter substitutes for PP Neue Montreal. The radial diagram is original SVG artwork. The earlier collage remains an available asset but is not displayed on the current homepage. See `kononenko-rebuild.md` for the current section and motion mapping.

## Graphite illustrations

The orchard and farmhouse studies in `public/illustrations/` replace the previous schematic SVG drawings. They were created with the built-in image-generation tool using the actual estate photographs as composition references. They are illustrations, not surveyed plans or replacements for the real property photographs. Masters are preserved under `source-assets/illustrations/`; generated dimensions are 1774 × 887 and delivery dimensions are 3840 × 1920. WebGL combines each graphite study with its real photograph. Full prompts and provenance are in `illustrations.md`.
