import type { Metadata } from "next";
import { Sprout, Heart, Sun } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import VisitBanner from "@/components/sections/VisitBanner";
import { Label, Photo, TextLink } from "@/components/ui/Primitives";
export const metadata: Metadata = {
  title: "Our story",
  description:
    "Meet Farm Natura by Planet Green Infra: a natural-farming estate built around land, family, and a lasting connection to nature.",
};
export default function AboutPage() {
  return (
    <>
      <PageHero
        label="Our story"
        title="A life rooted"
        accent="in something real."
        description="Farm Natura began with a simple belief: our relationship with the earth deserves a place in our everyday lives."
        image="farm-care-retina.jpg"
        alt="Farm Natura’s team caring for the fields"
        caption="A place for slower mornings and meaningful connections."
      />
      <section className="editorial-split section-space paper-section">
        <Photo src="orchard-retina.jpg" alt="Farm Natura estate plots and countryside" />
        <div data-reveal>
          <Label>Our vision</Label>
          <h2>
            To grow a farm.
            <br />
            <em>And a way of life.</em>
          </h2>
          <p>
            At Farm Natura, land is something to care for, learn from, and pass on. We bring
            together natural farming and managed farmland so families can enjoy a connection to the
            earth alongside their lives in the city.
          </p>
          <p>
            Created by Planet Green Infra in Kandukur, near Hyderabad, our estate makes room for
            soil, seasons, and community. You own your land. Our team helps care for its everyday
            cultivation.
          </p>
          <TextLink href="/farm-lands-for-sale-in-hyderabad">Get to know the estate</TextLink>
        </div>
      </section>
      <section className="section-space">
        <div className="centered-heading" data-reveal>
          <Label>The things we believe in</Label>
          <h2>
            Indulge. Involve.
            <br />
            <em>Impact nature.</em>
          </h2>
          <p>
            Three ideas that guide our relationship with the farm and the people who become part of
            it.
          </p>
        </div>
        <div className="principles">
          {[
            {
              icon: Sun,
              title: "Indulge",
              copy: "Enjoy the everyday gifts of the land: open skies, time outside, and the quiet pleasure of a slower pace.",
            },
            {
              icon: Heart,
              title: "Involve",
              copy: "Make the farm part of your family’s life. Get to know what grows here and the people who help it thrive.",
            },
            {
              icon: Sprout,
              title: "Impact nature",
              copy: "Choose a relationship with land that values fertile soil, thoughtful cultivation, and the generations who follow.",
            },
          ].map((item) => (
            <article className="principle" key={item.title} data-reveal>
              <item.icon size={35} strokeWidth={1} />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="wide-photo" data-parallax>
        <Photo
          src="farmhouse-retina.jpg"
          alt="Farm Natura’s stone farmhouse, veranda, and lawn"
          sizes="100vw"
        />
        <span className="wide-caption">
          A place to belong.
          <br />A legacy to grow.
        </span>
      </section>
      <VisitBanner />
    </>
  );
}
