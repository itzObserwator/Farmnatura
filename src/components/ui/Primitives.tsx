import PhotoImage from "./PhotoImage";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ButtonLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link href={href} className={`button${light ? " button-light" : ""}`}>
      <span>{children}</span>
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}
export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-link">
      <span>{children}</span>
      <ArrowUpRight size={19} aria-hidden="true" />
    </Link>
  );
}
export function Photo({
  src,
  alt,
  className = "",
  eager = false,
  sizes = "(max-width: 760px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <PhotoImage src={src} alt={alt} sizes={sizes} eager={eager} />
    </div>
  );
}
export function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg className={`sprig ${className}`} viewBox="0 0 140 240" fill="none" aria-hidden="true">
      <path
        d="M69 235C66 180 83 108 96 8M71 202L27 160M75 173L119 132M82 135L45 89M88 99L125 55M94 59L68 26"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M28 160C-1 158 5 126 5 126S36 126 28 160ZM119 132C116 104 139 96 139 96S145 131 119 132ZM45 89C20 91 18 61 18 61S49 61 45 89ZM125 55C119 34 138 18 138 18S146 52 125 55ZM68 26C46 29 45 2 45 2S74 0 68 26Z"
        fill="currentColor"
        fillOpacity=".12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span className="label-dot" />
      {children}
    </p>
  );
}
