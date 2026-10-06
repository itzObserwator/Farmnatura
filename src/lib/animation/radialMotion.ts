import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Scroll rotation with elastic, velocity-dependent spokes and delayed number positions. */
export function radialMotion(root: Element) {
  const paths = Array.from(root.querySelectorAll<SVGPathElement>(".kg-spoke"));
  const labels = Array.from(root.querySelectorAll<SVGTextElement>(".kg-spoke-label"));
  let angle = 0,
    labelAngle = 0,
    target = 0,
    bend = 0,
    velocity = 0,
    active = false;
  const rotation = ScrollTrigger.create({
    trigger: root,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => {
      active = self.isActive;
    },
    onUpdate: (self) => {
      target = self.progress * Math.PI;
      velocity = Math.max(-1, Math.min(1, self.getVelocity() / 3500)) * 0.25;
    },
  });
  const titles = gsap.timeline({ paused: true });
  titles
    .to(
      root.querySelectorAll(".kg-approach-first .kg-approach-line > span"),
      { yPercent: -105, stagger: 0.055, duration: 0.8, ease: "expo.inOut" },
      0,
    )
    .fromTo(
      root.querySelectorAll(".kg-approach-second .kg-approach-line > span"),
      { y: 0, yPercent: 105 },
      { y: 0, yPercent: 0, stagger: 0.055, duration: 0.8, ease: "expo.inOut" },
      0.12,
    );
  const swap = ScrollTrigger.create({
    trigger: root,
    start: "center center",
    onEnter: () => titles.play(),
    onLeaveBack: () => titles.reverse(),
  });
  const tick = () => {
    if (
      document.hidden ||
      (!active && Math.abs(target - angle) < 0.0001 && Math.abs(bend) < 0.0001)
    )
      return;
    const dt = gsap.ticker.deltaRatio();
    angle += (target - angle) * (1 - Math.pow(0.9, dt));
    labelAngle += (angle - labelAngle) * (1 - Math.pow(0.83, dt));
    bend += ((active ? velocity : 0) - bend) * (1 - Math.pow(0.87, dt));
    velocity *= 0.92;
    paths.forEach((path, index) => {
      const direction = (index * Math.PI) / 4 + angle;
      const cos = Math.cos(direction),
        sin = Math.sin(direction);
      let d = "M500 500";
      for (let step = 1; step <= 36; step++) {
        const t = step / 36,
          radius = t * 440,
          deflection = Math.sin(t * t * t * Math.PI) * bend * 440;
        d += `L${(500 + cos * radius - sin * deflection).toFixed(2)} ${(500 + sin * radius + cos * deflection).toFixed(2)}`;
      }
      path.setAttribute("d", d);
      const labelDirection = (index * Math.PI) / 4 + labelAngle;
      labels[index]?.setAttribute("x", String(500 + Math.cos(labelDirection) * 470));
      labels[index]?.setAttribute("y", String(500 + Math.sin(labelDirection) * 470));
    });
  };
  gsap.ticker.add(tick);
  return () => {
    gsap.ticker.remove(tick);
    rotation.kill();
    swap.kill();
    titles.revert();
  };
}
