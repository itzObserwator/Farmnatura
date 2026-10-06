import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const blend = (a: number, b: number, amount: number) => a + (b - a) * amount;
const staggeredBlend = (progress: number, index: number, count: number, spread: number) => {
  const delay = count > 1 ? (index / (count - 1)) * spread : 0;
  const value = clamp((progress - delay) / (1 - spread));
  return value * value * (3 - 2 * value);
};

/** Three reference phases: curved conveyor → full ring → left-hand ring beside the records. */
export function photoOrbitMotion(root: Element) {
  const photos = Array.from(root.querySelectorAll<HTMLElement>(".kg-orbit-photo"));
  const intro = root.querySelector<HTMLElement>(".kg-people");
  const feature = root.querySelector<HTMLElement>(".kg-orbit-feature");
  const records = root.querySelector<HTMLElement>(".kg-stat-list");
  if (!intro || !feature || !records || !photos.length) return () => {};
  const state = { travel: 0, ring: 0, left: 0 };
  const travelTo = gsap.quickTo(state, "travel", { duration: 0.5, ease: "power4.out" });
  const ringTo = gsap.quickTo(state, "ring", { duration: 0.5, ease: "power2.out" });
  const leftTo = gsap.quickTo(state, "left", { duration: 0.5, ease: "power2.out" });
  const setters = photos.map((photo) => ({
    x: gsap.quickSetter(photo, "x", "px"),
    y: gsap.quickSetter(photo, "y", "px"),
    rotation: gsap.quickSetter(photo, "rotation", "deg"),
    scale: gsap.quickSetter(photo, "scale"),
  }));
  const mobile = matchMedia("(max-width: 760px)");
  let active = false;
  gsap.set(photos, {
    xPercent: -50,
    yPercent: -50,
    x: 0,
    y: 0,
    rotation: 0,
    transformOrigin: "50% 50%",
  });
  const triggers = [
    ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => {
        active = self.isActive;
      },
      onUpdate: (self) => travelTo(self.progress),
    }),
    ScrollTrigger.create({
      trigger: feature,
      start: "top-=50% bottom",
      end: "+=30%",
      onUpdate: (self) => ringTo(self.progress),
    }),
    ScrollTrigger.create({
      trigger: records,
      start: "top-=10% bottom",
      end: "+=70%",
      onUpdate: (self) => leftTo(self.progress),
    }),
  ];
  const protectedFeature = Array.from(feature.querySelectorAll<HTMLElement>(".kg-feature-line, p"));
  const tick = () => {
    if (document.hidden || !active) return;
    const rootBox = root.getBoundingClientRect();
    const introBox = intro.getBoundingClientRect();
    const featureBox = feature.getBoundingClientRect();
    const recordBox = records.getBoundingClientRect();
    const headingBox = feature.querySelector("h2")!.getBoundingClientRect();
    const width = rootBox.width,
      viewportHeight = innerHeight;
    const baseSize = photos[0].offsetWidth;
    const featureCenterY = headingBox.top + headingBox.height / 2 - rootBox.top;
    const recordCenterY = recordBox.top + recordBox.height / 2 - rootBox.top;
    const recordLeft = recordBox.left - rootBox.left;
    const featureBoxes = protectedFeature.map((el) => el.getBoundingClientRect());
    const count = photos.length;
    const circleExtent = Math.min(width, viewportHeight) * 0.9 - Math.max(24, width * 0.025);
    const ringSize = Math.min(baseSize, (Math.PI * 2 * circleExtent) / (count * 1.5 + Math.PI));
    const fullRadius = Math.max(0, circleExtent - ringSize / 2);
    // A rotated square must clear the entire statistics column, not only its center point.
    const leftRadius = Math.max(0, Math.min(fullRadius, recordLeft - ringSize * Math.SQRT1_2 - 40));
    const rotation = state.travel * Math.PI * 2;
    photos.forEach((photo, index) => {
      if (mobile.matches) {
        const visible = index % 2 === 0;
        photo.style.visibility = visible ? "visible" : "hidden";
        const n = Math.ceil(count / 2),
          radius = width * 0.43;
        const size = Math.min(width * 0.17, (Math.PI * 2 * radius) / (n * 1.5 + Math.PI));
        const angle = (Math.floor(index / 2) / n) * Math.PI * 2 - Math.PI / 2;
        setters[index].x(width / 2 + Math.cos(angle) * radius);
        setters[index].y(featureCenterY + Math.sin(angle) * radius);
        setters[index].rotation(0);
        setters[index].scale(size / baseSize);
        return;
      }
      photo.style.visibility = "visible";
      // The incoming strip follows a wide sloping parabola and wraps instead of jumping back.
      const span = width * 3.8;
      const cycle = index / count - state.travel;
      const position = ((cycle % 1) + 1) % 1;
      const u = (position * count) / (count - 1);
      let x = -width * 1.4 + u * span;
      const sag = (width * 3000) / 1920,
        tilt = (-width * 2000) / 1920;
      const introCenterY = introBox.top + introBox.height / 2 - rootBox.top;
      let y = introCenterY + tilt * (u - 0.5) + sag * (4 * u * (1 - u) - 1);
      let angle = Math.atan2(tilt + sag * 4 * (1 - 2 * u), span);
      const ringAngle = (index / count) * Math.PI * 2 - Math.PI / 2 - rotation * (1 - state.left);
      const full = staggeredBlend(state.ring, index, count, 0.12);
      const left = staggeredBlend(state.left, index, count, 0.35);
      x = blend(x, width / 2 + Math.cos(ringAngle) * fullRadius, full);
      y = blend(y, featureCenterY + Math.sin(ringAngle) * fullRadius, full);
      angle = blend(angle, ringAngle + Math.PI / 2, full);
      let size = blend(baseSize, ringSize, full);
      const leftAngle = (index / count) * Math.PI * 2 - Math.PI / 2 - rotation;
      x = blend(x, Math.cos(leftAngle) * leftRadius, left);
      y = blend(y, recordCenterY + Math.sin(leftAngle) * fullRadius, left);
      angle = blend(angle, leftAngle + Math.PI / 2, left);
      size = blend(size, ringSize, left);
      const diagonal = (size * (Math.abs(Math.cos(angle)) + Math.abs(Math.sin(angle)))) / 2;
      // Clearance also protects the staggered handover, before every photo reaches the left ring.
      const top = y - diagonal + rootBox.top,
        bottom = y + diagonal + rootBox.top;
      if (bottom > recordBox.top - 32 && top < recordBox.bottom + 32) {
        x = Math.min(x, recordLeft - diagonal - 32);
      }
      if (
        full < 0.9 &&
        bottom > introBox.top &&
        top < introBox.bottom &&
        x + diagonal > 0 &&
        x - diagonal < width
      ) {
        y = Math.max(y, introBox.bottom - rootBox.top + diagonal + 32);
      }
      for (const box of featureBoxes) {
        const globalTop = y - diagonal + rootBox.top,
          globalBottom = y + diagonal + rootBox.top;
        const globalLeft = x - diagonal + rootBox.left,
          globalRight = x + diagonal + rootBox.left;
        if (
          globalBottom > box.top - 24 &&
          globalTop < box.bottom + 24 &&
          globalRight > box.left - 24 &&
          globalLeft < box.right + 24
        ) {
          x =
            x < width / 2
              ? box.left - rootBox.left - diagonal - 24
              : box.right - rootBox.left + diagonal + 24;
        }
      }
      setters[index].x(x);
      setters[index].y(y);
      setters[index].rotation((angle * 180) / Math.PI);
      setters[index].scale(size / baseSize);
    });
  };
  gsap.ticker.add(tick);
  return () => {
    triggers.forEach((trigger) => trigger.kill());
    [travelTo, ringTo, leftTo].forEach((tween) => tween.tween.kill());
    gsap.ticker.remove(tick);
    gsap.set(photos, { clearProps: "transform,visibility" });
  };
}
