import type { Metadata } from "next";
import { Sprout, Leaf, Sun } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import VisitBanner from "@/components/sections/VisitBanner";
import { Label, Photo, TextLink } from "@/components/ui/Primitives";
export const metadata: Metadata = {
  title: "Natural farming",
  description:
    "Discover Farm Natura’s natural-farming approach: years of soil care, indigenous seeds, seasonal cultivation, and managed farmland near Hyderabad.",
};
export default function FarmingPage() {
  return (
    <>
      <PageHero
        label="Natural farming"
        title="It all begins"
        accent="with living soil."
        description="A healthy farm starts below the surface. Our natural-farming approach cares for the soil, follows the seasons, and grows with the land."
        image="farm-care-retina.jpg"
        alt="Planted farm plots at Farm Natura"
        caption="Thoughtful cultivation, season after season."
      />
      <section className="editorial-split section-space paper-section">
        <Photo
          src="orchard-retina.jpg"
          alt="Farm plots showing the soil and greenery of the estate"
        />
        <div data-reveal>
          <Label>Six-plus years of soil care</Label>
          <h2>
            Good soil takes time.
            <br />
            <em>We give it that.</em>
          </h2>
          <p>
            Farm Natura has spent years revitalising its soil through natural farming. The estate’s
            approach values soil health and its living biology, with ongoing attention from the
            agronomy team.
          </p>
          <p>
            Our farming practices bring together indigenous seeds, seasonal cultivation, and care
            for the growing environment. The goal is fertile land that remains alive for the
            families who inherit it.
          </p>
          <TextLink href="/contact">Meet the farming team</TextLink>
        </div>
      </section>
      <section className="section-space">
        <div className="centered-heading" data-reveal>
          <Label>A relationship with the whole farm</Label>
          <h2>
            From the ground
            <br />
            <em>to what grows.</em>
          </h2>
        </div>
        <div className="principles">
          {[
            {
              icon: Leaf,
              title: "Nurture the soil",
              copy: "We pay attention to soil wellness and microbiology, building a foundation for the farm’s ongoing health.",
            },
            {
              icon: Sprout,
              title: "Choose native seeds",
              copy: "Indigenous and heirloom seeds connect our growing practices to the local climate and farming heritage.",
            },
            {
              icon: Sun,
              title: "Grow with the seasons",
              copy: "Seasonal crops and fruit-bearing trees bring a changing rhythm to the farm, with daily care from our team.",
            },
          ].map((item) => (
            <article className="principle" key={item.title} data-reveal>
              <item.icon size={38} strokeWidth={1} />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="farming-story">
        <div className="farming-photo" data-parallax>
          <Photo src="goshala-retina.jpg" alt="Cattle inside Farm Natura’s circular goshala" />
        </div>
        <div className="farming-copy" data-reveal>
          <Label>The people behind the farm</Label>
          <h2>
            You enjoy
            <br />
            the connection.
            <br />
            <em>We tend the land.</em>
          </h2>
          <p>
            Our dedicated team manages the day-to-day operations that a living farm needs. Come to
            the estate, ask questions, and see the cultivation and care for yourself.
          </p>
          <div style={{ marginTop: 35 }}>
            <TextLink href="/farm-lands-for-sale-in-hyderabad">
              Understand managed farmland
            </TextLink>
          </div>
        </div>
      </section>
      <VisitBanner />
    </>
  );
}
