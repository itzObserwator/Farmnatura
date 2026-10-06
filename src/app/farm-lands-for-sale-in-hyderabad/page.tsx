import type { Metadata } from "next";
import { Map, Sprout, ShieldCheck } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import VisitBanner from "@/components/sections/VisitBanner";
import Faq from "@/components/ui/Faq";
import { Label, Photo, TextLink } from "@/components/ui/Primitives";
export const metadata: Metadata = {
  title: "Managed farmland near Hyderabad",
  description:
    "Explore Farm Natura’s 110+ acre managed natural-farming estate in Kandukur, near Hyderabad. Learn about ownership, farm care, and visiting the land.",
};
export default function EstatePage() {
  return (
    <>
      <PageHero
        label="The estate"
        title="Your own land."
        accent="A lasting connection."
        description="110+ acres of managed farmland in Kandukur. A place to nurture your roots, grow with the seasons, and make memories on land of your own."
        image="orchard-retina.jpg"
        alt="Cultivated orchard trees at Farm Natura"
        action={{ href: "/contact", label: "Explore the land with us" }}
      />
      <section className="section-space paper-section">
        <div className="section-heading" data-reveal>
          <div>
            <Label>Ownership with everyday care</Label>
            <h2>
              A real farm.
              <br />
              <em>A team by your side.</em>
            </h2>
          </div>
          <p>
            Bring your connection to the land.
            <br />
            We bring the care it needs.
          </p>
        </div>
        <div className="principles">
          {[
            {
              icon: Map,
              title: "A place of your own",
              copy: "Explore individually owned agricultural land, with plot boundaries and ownership documentation to review with the team.",
            },
            {
              icon: Sprout,
              title: "Managed farming",
              copy: "Dedicated agronomy staff look after everyday farming operations, seasonal crops, and the growing landscape.",
            },
            {
              icon: ShieldCheck,
              title: "Care that continues",
              copy: "The estate offers four years of managed maintenance. Ask our team for the scope, inclusions, and agreement for your plot.",
            },
          ].map((item) => (
            <article className="principle" data-reveal key={item.title}>
              <item.icon size={34} strokeWidth={1} />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="editorial-split section-space">
        <div data-reveal>
          <Label>Know the land you choose</Label>
          <h2>
            Clarity, from
            <br />
            <em>the ground up.</em>
          </h2>
          <p>
            Walk the estate, understand the farming model, and ask for the documents that relate to
            your plot. Farm Natura’s team can guide you through ownership and the managed
            maintenance agreement.
          </p>
          <p>
            Review title documents, survey details, boundary demarcation, and registration
            information with your independent legal advisor before making a decision.
          </p>
          <TextLink href="/contact">Ask for the documentation</TextLink>
        </div>
        <Photo src="farm-care-retina.jpg" alt="Farm Natura’s team tending the planted fields" />
      </section>
      <section className="section-space paper-section">
        <Label>Your journey to farm ownership</Label>
        <h2 style={{ marginTop: 24 }}>
          Start with <em>a walk.</em>
        </h2>
        <div className="steps">
          {[
            {
              title: "Visit the estate",
              copy: "Experience the setting and meet the people who care for the farm.",
            },
            {
              title: "Find your plot",
              copy: "Discuss current availability, sizes, and the land that fits your needs.",
            },
            {
              title: "Review the details",
              copy: "Understand ownership, documentation, and maintenance terms.",
            },
            {
              title: "Make it your own",
              copy: "Work with the team on registration and the next chapter of your farm life.",
            },
          ].map((step, i) => (
            <article className="step" key={step.title} data-reveal>
              <span>0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="faq-section section-space">
        <div data-reveal>
          <Label>A little more clarity</Label>
          <h2>
            Good questions.
            <br />
            <em>Thoughtful answers.</em>
          </h2>
          <p>Our team can help you understand the estate and the options available today.</p>
          <TextLink href="/contact">Speak with the farm team</TextLink>
        </div>
        <Faq
          items={[
            {
              question: "What plot sizes are available?",
              answer:
                "Availability and plot sizes can change. Contact the Farm Natura team for the current layout, available plots, and pricing.",
            },
            {
              question: "Who looks after the farm?",
              answer:
                "Dedicated agronomy staff manage everyday farming operations. The estate offers four years of managed maintenance; confirm the inclusions and terms for your plot with the team.",
            },
            {
              question: "Can I review the ownership documents?",
              answer:
                "Ask the team for the documentation for your selected plot, including title information, survey details, and registration documents. You can have these independently reviewed by your legal advisor.",
            },
            {
              question: "Can I build a farmhouse?",
              answer:
                "Discuss your selected plot, the applicable permissions, and farmhouse options with the team before planning construction.",
            },
            {
              question: "How can I visit?",
              answer:
                "Use the visit page to prepare an enquiry in WhatsApp, or call +91 95795 55666. The team will confirm a suitable visit time.",
            },
          ]}
        />
      </section>
      <VisitBanner />
    </>
  );
}
