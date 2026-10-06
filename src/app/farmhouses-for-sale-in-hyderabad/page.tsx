import type { Metadata } from "next";
import { House, Heart, TreePine } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import VisitBanner from "@/components/sections/VisitBanner";
import { Label, Photo, TextLink } from "@/components/ui/Primitives";
export const metadata: Metadata = {
  title: "Farmhouses & farm living",
  description:
    "Explore farmhouse retreats, slower weekends, and family life in nature at Farm Natura’s managed estate in Kandukur, near Hyderabad.",
};
export default function LivingPage() {
  return (
    <>
      <PageHero
        label="Farm living"
        title="Less on your list."
        accent="More in your life."
        description="Make space for a morning outdoors, an unhurried meal, and time with the people you love. This is the rhythm of life at Farm Natura."
        image="farmhouse-garden-retina.jpg"
        alt="A farmhouse and its garden at Farm Natura"
        action={{ href: "/contact", label: "Experience a day at the farm" }}
      />
      <section className="editorial-split section-space paper-section">
        <div data-reveal>
          <Label>Your place to pause</Label>
          <h2>
            Open the door
            <br />
            <em>to a slower day.</em>
          </h2>
          <p>
            A farmhouse retreat gives your family a place to return to. Enjoy the greenery of the
            estate, spend time on the veranda, and watch your connection to the land grow.
          </p>
          <p>
            Farm Natura’s existing farmhouse spaces offer a glimpse of the experience. Speak with
            our team about current stay arrangements, farmhouse options, and what is available for
            your plot.
          </p>
          <TextLink href="/gallery">Look around the estate</TextLink>
        </div>
        <Photo
          src="pavilion-retina.jpg"
          alt="Farm Natura’s open-sided pavilion and shaded seating area"
        />
      </section>
      <section className="section-space">
        <div className="centered-heading" data-reveal>
          <Label>Small moments. A richer life.</Label>
          <h2>
            Room for everyone
            <br />
            <em>to feel at home.</em>
          </h2>
        </div>
        <div className="principles">
          {[
            {
              icon: House,
              title: "A weekend retreat",
              copy: "Leave the city’s pace behind and return to a landscape with space to breathe and time to notice.",
            },
            {
              icon: Heart,
              title: "Time together",
              copy: "Give your family a shared place for walks, conversations, and getting to know the growing seasons.",
            },
            {
              icon: TreePine,
              title: "A familiar landscape",
              copy: "Build a lasting relationship with your land, the farm team, and a community that values nature.",
            },
          ].map((item) => (
            <article className="principle" key={item.title} data-reveal>
              <item.icon size={37} strokeWidth={1} />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="wide-photo" data-parallax>
        <Photo
          src="home-retina.jpg"
          alt="A Farm Natura farmhouse lit up in the evening"
          sizes="100vw"
        />
        <span className="wide-caption">
          Stay a little longer.
          <br />
          Feel a little more at home.
        </span>
      </section>
      <VisitBanner />
    </>
  );
}
