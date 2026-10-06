# Earlier reference analysis and design direction

This document records the initial blended-reference design. The current Sandy Shore-led rebuild supersedes it; see [sandyshore-rebuild.md](sandyshore-rebuild.md) for the implemented direction.

Prepared 5 October 2026. The reference findings informed the completed eight-page implementation. The design choices below are recorded for future edits.

## References inspected

- [Sandy Shore](https://sandyshore.ca/): homepage content, rendered desktop view, public CSS, and its layered hero styling.
- [Delfino Farms](https://delfinofarms.com/): homepage content, rendered desktop view, public CSS, and public interaction scripts.
- [Farm Natura](https://www.farmnatura.in/): current homepage content, rendered desktop view, navigation, imagery, and contact information.

The observations below combine public source inspection with browser inspection. Do not interpret a screenshot of an animation’s intermediate frame as its final design.

## Sandy Shore

The visual system pairs a pale beige canvas and thin rules with expressive, oversized serif lettering. Its CSS identifies NordicPavilion, Seryph, and Roboto Mono. The grid moves from six mobile columns to twelve desktop columns. Accent colors include yellow and red.

The hero styles describe a circular mask and separately positioned sky, mountains, water, sun, and foreground imagery. This is a staged landscape composition rather than a single static background. Route-transition styling and letter treatments give motion a strong role in the identity.

For Farm Natura: use generous spacing, selective oversized typography, and a landscape reveal based on its own land. Keep essential information visible without waiting for a long entrance sequence. Develop an original composition and use properly licensed fonts rather than copying reference font files.

## Delfino Farms

Large farm photography establishes the setting. Warm cream, dark brown, and ochre support a rustic editorial identity. The public stylesheet includes Gotham and Barlow families. Photography and text alternate through split layouts.

Its script initializes Scrollax parallax, paired image/content sliders, a header that changes after scrolling, and a menu whose images change on link hover. Lottie animates the hero logo and scroll prompt. Slider transitions are approximately one second on desktop, with shorter mobile transitions. A newsletter overlay appears soon after loading.

For Farm Natura: use authentic estate photographs, alternating layouts, a clear sticky navigation treatment, and restrained parallax. An animated illustration or logo does not require a Lottie dependency unless an approved animation asset is supplied. Avoid adding an interrupting newsletter popup to the proposed visit-booking journey.

## Current Farm Natura

The tree-and-sun logo, light background, green accents, and nature-led imagery provide a starting brand vocabulary. The homepage holds a large amount of information that can be distributed across dedicated pages. The primary visitor action should be arranging a visit.

Preserve useful existing route paths where possible. Make important facts easier to scan and organize related information around one subject per page. Keep copy specific to Farm Natura and avoid bringing the references’ produce, winery, bakery, or event business into this website.

## Proposed visual system

**Direction:** an editorial journey through a living estate near Hyderabad, combining spacious typography, real land photography, and gentle nature-inspired motion.

| Element            | Starting direction                                                                      |
| ------------------ | --------------------------------------------------------------------------------------- |
| Palette            | Forest `#233d2c`, cream `#f5f0e5`, soil `#76543c`, leaf `#73805b`, sun `#d6b565`        |
| Display typography | An open-license expressive serif; select the final family during design implementation  |
| Body typography    | A clean, readable sans serif, at least 16px                                             |
| Layout             | Broad editorial sections, asymmetric image/text pairings, full-width landscape moments  |
| Imagery            | Approved Farm Natura estate, soil, planting, harvest, farmhouse, and family photography |
| Graphic motif      | Original tree, sun, and contour-line details derived from Farm Natura’s own identity    |
| Navigation         | Shared header, visible visit CTA, accessible mobile menu, meaningful active-page states |

The implemented CSS uses these color tokens with locally served DM Serif Display and DM Sans. System fonts remain as fallbacks. The layout includes an arched estate image, staggered editorial cards, split farming sections, and responsive page layouts.

## Motion plan

| Moment             | Proposed behavior                                 | Implementation                                                            |
| ------------------ | ------------------------------------------------- | ------------------------------------------------------------------------- |
| First visit        | Short headline and landscape reveal               | GSAP timeline; content visible without JavaScript                         |
| Reading            | Subtle text and image entrances                   | GSAP ScrollTrigger with scoped cleanup                                    |
| Landscape sections | Small image movement inside a stable frame        | Desktop-only parallax, no forced scroll capture                           |
| Farm practices     | Story progression through soil, seed, and harvest | One selective scroll-driven sequence with a static mobile fallback        |
| Gallery            | Calm image transitions with explicit controls     | CSS/GSAP; keyboard and touch support                                      |
| Navigation         | Brief menu entrance and page-content transition   | CSS/GSAP, preserving native URLs and history                              |
| Scrolling          | Optional smooth wheel scrolling                   | Lenis connected to GSAP’s clock; native touch and reduced-motion fallback |

Target roughly 200–350ms for controls and 600–900ms for larger image reveals. Treat these as starting values to tune against actual content. Keep motion focused; do not animate every paragraph.

## Implementation guardrails

- Use server-rendered content and small client components for animation.
- Reserve image dimensions to prevent layout shifts; optimize real assets with Next Image.
- Respect reduced motion, keyboard focus, browser history, and normal touch scrolling.
- Keep visible text readable during animation and when JavaScript is disabled.
- Do not present generated or unrelated stock images as photographs of the actual estate.
- Verify desktop, tablet, and mobile layouts before delivery.
