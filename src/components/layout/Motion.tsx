"use client";
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { radialMotion } from "@/lib/animation/radialMotion";
import { valueOrbit } from "@/lib/animation/valueOrbit";
import { photoOrbitMotion } from "@/lib/animation/photoOrbitMotion";
/** One animation owner per route. Every timeline is reverted on navigation. */
export default function Motion() {
  const pathname = usePathname();
  const router = useRouter();
  const curtain = useRef<HTMLDivElement>(null);
  const navigating = useRef(false);
  const commitNavigation = useRef<(() => void) | null>(null);
  useEffect(() => {
    commitNavigation.current?.();
    commitNavigation.current = null;
    gsap.registerPlugin(ScrollTrigger);
    let alive = true;
    let lenis: Lenis | undefined;
    let tick: ((time: number) => void) | undefined;
    const media = gsap.matchMedia();
    const revealCurtain = gsap.to(curtain.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut",
      onComplete: () => {
        navigating.current = false;
      },
    });
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const cleanup: (() => void)[] = [];
      gsap.from(".kg-hero > .photo, .kg-page-hero > .photo", {
        scale: 1.1,
        duration: 2.4,
        ease: "expo.out",
        clearProps: "transform",
      });
      gsap.from(".hero-enter", {
        y: 70,
        opacity: 0,
        stagger: 0.12,
        duration: 1.15,
        ease: "power3.out",
        clearProps: "all",
      });
      gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((el) =>
        gsap.from(el.querySelectorAll(".word-inner"), {
          yPercent: 101,
          duration: 1.2,
          stagger: 0.02,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          clearProps: "transform",
        }),
      );
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) =>
        gsap.from(el, {
          y: 45,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          clearProps: "all",
        }),
      );
      gsap.utils.toArray<HTMLElement>("[data-parallax] img").forEach((el) =>
        gsap.fromTo(
          el,
          { yPercent: -4, scale: 1.12 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("[data-parallax]"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        ),
      );
      gsap.utils.toArray<HTMLElement>(".kg-row").forEach((row, index) => {
        gsap.from(row, {
          "--rule-scale": 0,
          duration: 1.2,
          delay: index * 0.04,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 90%", once: true },
        });
      });
      const approach = document.querySelector(".kg-approach");
      if (approach) cleanup.push(radialMotion(approach));
      const orbit = document.querySelector(".kg-people-sequence");
      if (orbit) {
        cleanup.push(photoOrbitMotion(orbit));
        gsap.utils.toArray<HTMLElement>(".kg-stat").forEach((el) =>
          ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => el.classList.toggle("is-current", self.isActive),
          }),
        );
      }
      const closing = document.querySelector(".kg-closing");
      if (closing) cleanup.push(valueOrbit(closing));
      if (matchMedia("(pointer: fine)").matches) {
        lenis = new Lenis({
          duration: 1.15,
          smoothWheel: true,
          anchors: true,
          prevent: (node) => !!node.closest("dialog"),
        });
        lenis.on("scroll", ScrollTrigger.update);
        tick = (time) => lenis?.raf(time * 1000);
        gsap.ticker.add(tick);
      }
      return () => {
        cleanup.forEach((dispose) => dispose());
        if (tick) gsap.ticker.remove(tick);
        lenis?.destroy();
      };
    });
    const refresh = () => {
      if (alive) ScrollTrigger.refresh();
    };
    document.fonts.ready.then(refresh);
    const timer = setTimeout(refresh, 350);
    window.addEventListener("load", refresh);
    const click = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || url.pathname === pathname || url.hash) return;
      event.preventDefault();
      event.stopPropagation();
      if (navigating.current) return;
      navigating.current = true;
      if (document.startViewTransition) {
        const transition = document.startViewTransition(
          () =>
            new Promise<void>((resolve) => {
              commitNavigation.current = resolve;
              router.push(url.pathname + url.search);
            }),
        );
        transition.finished.finally(() => {
          navigating.current = false;
        });
        return;
      }
      gsap.fromTo(
        curtain.current,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.55,
          ease: "power4.inOut",
          onComplete: () => router.push(url.pathname + url.search),
        },
      );
    };
    document.addEventListener("click", click, true);
    return () => {
      alive = false;
      clearTimeout(timer);
      media.revert();
      revealCurtain.kill();
      window.removeEventListener("load", refresh);
      document.removeEventListener("click", click, true);
    };
  }, [pathname, router]);
  return (
    <div ref={curtain} className="route-curtain" aria-hidden="true">
      <span>
        Farm Natura
        <br />
        <em>Natural Farming Estate</em>
      </span>
    </div>
  );
}
