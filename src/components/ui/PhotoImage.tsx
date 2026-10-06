"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import dimensions from "@/content/image-dimensions.json";

/** Account for object-fit cropping and parallax before choosing a Retina variant. */
export default function PhotoImage({
  src,
  alt,
  sizes,
  eager,
}: {
  src: string;
  alt: string;
  sizes: string;
  eager: boolean;
}) {
  const image = useRef<HTMLImageElement>(null);
  const [measuredSizes, setMeasuredSizes] = useState<string>();
  useEffect(() => {
    const container = image.current?.parentElement;
    const metadata = dimensions[src as keyof typeof dimensions];
    if (!container || !metadata) return;
    const update = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      // A wide source in a tall frame needs a larger file than its visible width.
      const coveredWidth = Math.max(width, height * (metadata.width / metadata.height));
      const zoom = container.closest("[data-parallax]") ? 1.12 : 1;
      setMeasuredSizes(`${Math.ceil(coveredWidth * zoom)}px`);
    };
    const observer = new ResizeObserver(update);
    observer.observe(container);
    update();
    return () => observer.disconnect();
  }, [src]);
  return (
    <Image
      ref={image}
      src={`/images/${src}`}
      alt={alt}
      fill
      sizes={measuredSizes ?? sizes}
      quality={95}
      loading={eager ? "eager" : "lazy"}
    />
  );
}
