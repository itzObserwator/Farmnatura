import type { Metadata } from "next";
import Gallery from "@/components/sections/Gallery";
import VisitBanner from "@/components/sections/VisitBanner";
import { Label } from "@/components/ui/Primitives";
export const metadata: Metadata = {
  title: "A glimpse of the farm",
  description:
    "Explore photographs of Farm Natura’s farmland, farmhouses, goshala, and the estate in Kandukur near Hyderabad.",
};
export default function GalleryPage() {
  return (
    <>
      <section className="gallery-intro">
        <div className="centered-heading hero-enter">
          <Label>A glimpse of life here</Label>
          <h1>
            The farm, <em>in moments.</em>
          </h1>
          <p>
            A walk through the land and the places that make Farm Natura feel like home. Look
            around. Picture your own story here.
          </p>
        </div>
      </section>
      <Gallery />
      <VisitBanner />
    </>
  );
}
