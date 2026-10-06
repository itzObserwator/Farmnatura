"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { navigation, contact, site } from "@/content/site";
export default function Header() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const close = () => {
    dialog.current?.close();
    setOpen(false);
    trigger.current?.focus();
  };
  useEffect(() => {
    dialog.current?.close();
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  return (
    <>
      <header className="kg-header">
        <Link href="/" className="kg-brand" aria-label="Farm Natura home">
          Farm Natura
          <br />
          Natural Farming
          <br />
          <em>Estate</em>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
            Index,
          </Link>
          <Link
            href="/farm-lands-for-sale-in-hyderabad"
            aria-current={pathname === "/farm-lands-for-sale-in-hyderabad" ? "page" : undefined}
          >
            Estate,
          </Link>
          <Link href="/about-us" aria-current={pathname === "/about-us" ? "page" : undefined}>
            About,
          </Link>
          <Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>
            Contact
          </Link>
          <button
            ref={trigger}
            className="kg-menu-button"
            aria-label="Open navigation"
            aria-haspopup="dialog"
            aria-expanded={open}
            onClick={() => {
              dialog.current?.showModal();
              setOpen(true);
            }}
          >
            Menu +
          </button>
        </nav>
      </header>
      <dialog
        ref={dialog}
        className="menu-dialog kg-menu"
        aria-label="Site navigation"
        onClose={() => setOpen(false)}
      >
        <div className="kg-menu-top">
          <span>
            Farm Natura
            <br />
            Natural Farming Estate
          </span>
          <button onClick={close} aria-label="Close navigation">
            Close ×
          </button>
        </div>
        <motion.nav
          aria-label="Expanded navigation"
          initial={false}
          animate={open ? "open" : "closed"}
          variants={{
            open: { transition: { staggerChildren: reducedMotion ? 0 : 0.045 } },
            closed: {},
          }}
        >
          <Link href="/" onClick={close}>
            <motion.span
              className="kg-menu-entry"
              variants={{
                open: { y: 0, opacity: 1 },
                closed: { y: reducedMotion ? 0 : 40, opacity: 0 },
              }}
              transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>00</span>Index
            </motion.span>
          </Link>
          {navigation.map((item, i) => (
            <Link href={item.href} key={item.href} onClick={close}>
              <motion.span
                className="kg-menu-entry"
                variants={{
                  open: { y: 0, opacity: 1 },
                  closed: { y: reducedMotion ? 0 : 40, opacity: 0 },
                }}
                transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {item.title}
              </motion.span>
            </Link>
          ))}
          <Link href="/contact" onClick={close}>
            <motion.span
              className="kg-menu-entry"
              variants={{
                open: { y: 0, opacity: 1 },
                closed: { y: reducedMotion ? 0 : 40, opacity: 0 },
              }}
              transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span>07</span>Visit the farm
            </motion.span>
          </Link>
        </motion.nav>
        <div className="kg-menu-bottom">
          <a href={contact.phoneHref}>{site.phone}</a>
          <span>Kandukur, Hyderabad</span>
        </div>
      </dialog>
    </>
  );
}
