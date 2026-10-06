"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { SketchController } from "@/lib/animation/createSketchScene";

/** Hand-drawn artwork; WebGL loads only when a drawing approaches the viewport. */
export default function FarmSketch({ variant }: { variant: "land" | "home" }) {
  const root = useRef<HTMLButtonElement>(null);
  const controller = useRef<SketchController | null>(null);
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useReducedMotion();
  const name = variant === "land" ? "orchard" : "farmhouse";
  useEffect(() => {
    const host = root.current;
    if (!host || reducedMotion) return;
    let cancelled = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        import("@/lib/animation/createSketchScene")
          .then(({ createSketchScene }) => {
            if (cancelled) return;
            try {
              controller.current = createSketchScene(host, {
                sketchUrl: `/illustrations/${name}-pencil.webp`,
                photoUrl: `/images/${name}-retina.jpg`,
                onExpanded: setExpanded,
              });
            } catch {
              host.dataset.renderer = "fallback";
            }
          })
          .catch(() => {
            host.dataset.renderer = "fallback";
          });
      },
      { rootMargin: "500px" },
    );
    observer.observe(host);
    return () => {
      cancelled = true;
      observer.disconnect();
      controller.current?.dispose();
      controller.current = null;
    };
  }, [name, reducedMotion]);
  return (
    <motion.button
      ref={root}
      type="button"
      className={`kg-sketch${expanded ? " is-expanded" : ""}`}
      aria-label={`Explore the ${name} illustration and photograph`}
      aria-pressed={expanded}
      onClick={() => {
        if (controller.current) controller.current.toggle();
        else setExpanded((value) => !value);
      }}
    >
      <Image
        className="kg-sketch-art"
        src={`/illustrations/${name}-pencil.webp`}
        alt={`Hand-drawn graphite study of Farm Natura’s ${name}`}
        fill
        sizes="100vw"
        quality={95}
      />
      <div className="kg-sketch-photo" aria-hidden="true">
        <Image src={`/images/${name}-retina.jpg`} alt="" fill sizes="100vw" quality={95} />
      </div>
      <motion.span
        className="kg-sketch-note"
        animate={{ opacity: expanded ? 0.7 : 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.3 }}
      >
        Graphite study /{" "}
        {expanded ? "Click to return to the drawing" : "Move to explore · Click to reveal"}
      </motion.span>
    </motion.button>
  );
}
