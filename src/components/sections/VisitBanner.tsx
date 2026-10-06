import Link from "next/link";
import { RevealText } from "@/components/ui/RevealText";
export default function VisitBanner() {
  return (
    <section className="kg-visit kg-pad">
      <span className="kg-serif-label">Your next chapter</span>
      <RevealText as="h2" className="kg-display-serif">
        Some things are better experienced barefoot.
      </RevealText>
      <Link href="/contact">Come, walk the land ↗</Link>
    </section>
  );
}
