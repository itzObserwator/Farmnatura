# Sandy Shore reproduction study

The new request replaces the earlier blended-reference design with a Sandy Shore-led rebuild. All eight Farm Natura routes remain.

## Measurements from the public reference

Studied https://sandyshore.ca/ in Chrome at 1440 × 1000, including rendered sections, computed typography, public styles, and interaction timing.

- Header: 60px high, centered serif wordmark, left monospace tagline, three right navigation groups.
- Frame: 40px side rails on desktop, 15px on mobile; thin dark borders. Yellow progress fills from the bottom.
- Palette: beige `#f6ebe6`, ink `#181715`, yellow `#fbe24f`, brown `#b49e81`.
- Fonts: proprietary NordicPavilion and Seryph, plus Roboto Mono. The project uses licensed open fonts Bodoni Moda and Roboto Mono; exact proprietary font metrics are not claimed.
- Hero: viewport-height, four illustrated chapters, central three-line display title, small copy at lower right, yellow pill CTA, chapter count at bottom. The reference intercepts wheel/swipe gestures for chapter changes, then releases normal scrolling.
- Scene timing: roughly 0.6–1.5 seconds with power and elastic easing. Text and artwork transition separately.
- Image feature: broad cinematic media followed by a narrow monospace caption.
- Tabs: three controls over the right half; left text/right image. One-second transition with a rotating diamond indicator and sliding images.
- Story: centered large serif paragraph followed by a portrait image surrounded by yellow graphic cutouts.
- Split section: two equal photographs and centered mono paragraphs below.
- Values: oversized stacked headings, progressive letter fills while scrolling, smaller right-side explanations.
- End: broad media, large scrolling sentence, yellow visit section, nav/contact information, a brown footer landscape.

## Farm Natura mapping

Hero chapters: more than a farm → natural growers → rooted neighbours → future dreamers. Tabs: managed farmland → natural farming → farm living. Values: living soil → indigenous seeds → managed with care → rooted communities.

All sales, cultivation, contact, and ownership copy remains about Farm Natura. The reference’s crops, certifications, location, history, and proprietary artwork are not represented as Farm Natura facts.

## Assets and limits

The hero farm collage is an original generated illustration, explicitly identified as such in accessible text. Estate images are from Farm Natura’s existing site. Cinematic sections use these still images with scroll movement because no verified Farm Natura film was supplied. Exact sprite animations and proprietary display fonts need their licensed originals to reproduce literally.

## Code map

`HomeStory.tsx`: four-chapter wheel/swipe and button navigation, scoped timelines, reduced-motion fallback.
`EstateTabs.tsx`: three Farm Natura themes, paired panels, keyboard tabs, rotating indicator.
`HomePage.tsx`: ordered homepage sections and business content.
`Motion.tsx`: scrolling, reveal timelines, value letter fills, side progress, route transitions.
`reference.css`: reference-specific visual rules applied across the existing site.
