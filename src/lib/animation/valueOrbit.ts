import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Continuously revolving sphere, with perspective and front/back occlusion around the headline. */
export function valueOrbit(root: Element) {
  const ring = root.querySelector<HTMLElement>(".kg-closing-orbit");
  const badges = Array.from(root.querySelectorAll<HTMLElement>(".kg-closing-orbit > span"));
  if (!ring) return () => {};
  let active = false,
    elapsed = 0,
    scroll = 0;
  const setters = badges.map((el) => ({
    x: gsap.quickSetter(el, "x", "px"),
    y: gsap.quickSetter(el, "y", "px"),
    scale: gsap.quickSetter(el, "scale"),
    opacity: gsap.quickSetter(el, "opacity"),
  }));
  const trigger = ScrollTrigger.create({
    trigger: root,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      active = self.isActive;
    },
    onUpdate: (self) => {
      scroll = self.progress;
    },
  });
  const tick = () => {
    if (!active || document.hidden) return;
    elapsed += gsap.ticker.deltaRatio() / 60;
    const width = ring.offsetWidth,
      height = ring.offsetHeight;
    badges.forEach((badge, index) => {
      const angle = (index / badges.length) * Math.PI * 2 + elapsed * 0.16 + scroll * 0.6;
      const depth = Math.sin(angle),
        perspective = 0.72 + (depth + 1) * 0.2;
      const x = Math.cos(angle) * width * 0.46 * perspective;
      const y = (Math.sin(angle) * height * 0.31 + Math.cos(angle) * height * 0.14) * perspective;
      setters[index].x(x);
      setters[index].y(y);
      setters[index].scale(perspective);
      setters[index].opacity(0.45 + (depth + 1) * 0.275);
      badge.style.zIndex = depth > 0.15 ? "3" : "1";
    });
  };
  gsap.set(badges, { xPercent: -50, yPercent: -50, rotation: 0 });
  gsap.ticker.add(tick);
  return () => {
    trigger.kill();
    gsap.ticker.remove(tick);
    gsap.set(badges, { clearProps: "all" });
  };
}
