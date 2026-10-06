"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { galleryImages } from "@/content/gallery";
import { Photo } from "@/components/ui/Primitives";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";

export default function Gallery() {
  const [filter, setFilter] = useState("All moments");
  const [view, setView] = useState("Grid");
  const [active, setActive] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const visible = galleryImages.filter(
    (image) => filter === "All moments" || image.category === filter,
  );
  const selected = active === null ? null : visible[active];
  const move = (direction: number) =>
    setActive((index) =>
      index === null ? null : (index + direction + visible.length) % visible.length,
    );
  const close = () => {
    dialog.current?.close();
    setActive(null);
    opener.current?.focus();
  };
  useEffect(() => {
    if (active === null) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [active]);
  return (
    <section className={`gallery-section gallery-mode-${view.toLowerCase()}`}>
      <div className="gallery-mode-switch" aria-label="Gallery layout">
        {["Grid", "List", "Gallery"].map((mode) => (
          <button key={mode} aria-pressed={view === mode} onClick={() => setView(mode)}>
            {mode}
          </button>
        ))}
      </div>
      <div className="gallery-filters" aria-label="Filter gallery">
        {["All moments", "The land", "Farm living"].map((category) => (
          <button
            key={category}
            className="filter-button"
            aria-pressed={category === filter}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="visually-hidden" role="status">
        {visible.length} photographs shown
      </p>
      <LayoutGroup id="estate-gallery">
        <motion.div
          className="gallery-grid"
          layout
          transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence initial={false}>
            {visible.map((image, index) => (
              <motion.button
                key={image.src}
                layout={!reducedMotion}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
                transition={{ duration: reducedMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="gallery-item"
                aria-label={`View ${image.title}`}
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setActive(index);
                  dialog.current?.showModal();
                }}
              >
                <Photo
                  src={image.src}
                  alt={image.alt}
                  sizes="(max-width: 390px) 90vw, (max-width: 760px) 45vw, 30vw"
                />
                <span>
                  {image.title}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
      <dialog
        ref={dialog}
        className="gallery-lightbox"
        aria-label="Farm Natura photograph viewer"
        onClose={() => {
          setActive(null);
          opener.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            move(1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            move(-1);
          }
        }}
      >
        {selected && (
          <>
            <div className="lightbox-top">
              <h2>{selected.title}</h2>
              <button className="icon-button" aria-label="Close photograph" onClick={close}>
                <X size={22} />
              </button>
            </div>
            <motion.div
              key={selected.src}
              className="lightbox-photo"
              initial={{ opacity: reducedMotion ? 1 : 0, scale: reducedMotion ? 1 : 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={`/images/${selected.src}`}
                alt={selected.alt}
                fill
                sizes="90vw"
                quality={95}
              />
            </motion.div>
            <div className="lightbox-bottom">
              <span aria-live="polite">
                {(active ?? 0) + 1} / {visible.length} · {selected.category}
              </span>
              <div className="lightbox-controls">
                <button
                  className="icon-button"
                  aria-label="Previous photograph"
                  onClick={() => move(-1)}
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  className="icon-button"
                  aria-label="Next photograph"
                  onClick={() => move(1)}
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
