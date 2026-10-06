import type { Metadata } from "next";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import VisitForm from "@/components/sections/VisitForm";
import { Label, Photo } from "@/components/ui/Primitives";
import { site, contact } from "@/content/site";
import { RevealText } from "@/components/ui/RevealText";
export const metadata: Metadata = {
  title: "Visit the farm",
  description:
    "Arrange a visit to Farm Natura in Kandukur, near Hyderabad. Contact the farm team or prepare a visit enquiry through WhatsApp.",
};
export default function ContactPage() {
  return (
    <>
      <section className="kg-contact-lead kg-pad">
        <RevealText as="h1" className="kg-display-serif">
          Farm Natura is a natural-farming estate shaped by living soil, everyday care, and a life
          closer to nature. Come, walk the land.
        </RevealText>
        <div className="kg-contact-lines">
          <span className="kg-serif-label">A conversation</span>
          <a href={contact.phoneHref}>{site.phone}</a>
          <span className="kg-serif-label">Your visit</span>
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
            Start on WhatsApp ↗
          </a>
        </div>
      </section>
      <section className="contact-layout">
        <div className="contact-copy hero-enter">
          <Label>A warm welcome awaits</Label>
          <h2>
            Come, walk
            <br />
            <em>the land.</em>
          </h2>
          <p className="intro">
            The best way to understand Farm Natura is to experience it. Meet our team, see the
            estate, and ask everything you’ve been wondering.
          </p>
          <div className="contact-details">
            <div className="contact-detail">
              <Phone size={20} />
              <div>
                <span>Call the farm team</span>
                <a href={contact.phoneHref}>{site.phone}</a>
              </div>
            </div>
            <div className="contact-detail">
              <MessageCircle size={20} />
              <div>
                <span>Prefer a conversation?</span>
                <a
                  href={`${contact.whatsapp}?text=${encodeURIComponent("Hello Farm Natura! I would like to know more about the estate.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Talk to us on WhatsApp ↗
                </a>
              </div>
            </div>
            <div className="contact-detail">
              <MapPin size={21} />
              <div>
                <span>The estate</span>
                <p>
                  Kandukur, Srisailam Highway corridor
                  <br />
                  Near Hyderabad, Telangana
                </p>
                <a href={contact.directions} target="_blank" rel="noopener noreferrer">
                  View on Google Maps ↗
                </a>
              </div>
            </div>
            <div className="contact-detail">
              <MapPin size={21} />
              <div>
                <span>Our Hyderabad office</span>
                <p>{contact.office}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-enter">
          <VisitForm />
        </div>
      </section>
      <section className="wide-photo" data-parallax>
        <Photo
          src="farmhouse-retina.jpg"
          alt="The farmhouses and green pathways of Farm Natura"
          sizes="100vw"
        />
        <span className="wide-caption">
          Your first visit.
          <br />
          The start of something rooted.
        </span>
      </section>
    </>
  );
}
