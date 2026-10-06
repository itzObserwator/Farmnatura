import Link from "next/link";
import { Photo } from "@/components/ui/Primitives";
import { galleryImages } from "@/content/gallery";
import { contact } from "@/content/site";
import FarmSketch from "./FarmSketch";
import ApproachDiagram from "./ApproachDiagram";
import { RevealText } from "@/components/ui/RevealText";
import { homeContent, experiences } from "@/content/home";

/** Reference section sequence; all copy and imagery belong to Farm Natura. */
export default function HomePage() {
  return (
    <div className="kg-home">
      <section className="kg-hero" data-parallax>
        <Photo
          src="farmhouse-retina.jpg"
          alt="Farm Natura’s stone farmhouse, veranda, and lawn"
          sizes="100vw"
          eager
        />
        <div className="kg-hero-shade" />
        <h1 className="kg-hero-title hero-enter">
          <span>Farm Natura</span>
          <br />
          Natural Farming <em>Estate</em>
        </h1>
        <span className="kg-hero-location">
          Kandukur, Hyderabad
          <br />
          By Planet Green Infra
        </span>
      </section>
      <section className="kg-manifesto kg-pad">
        <RevealText as="h2" className="kg-xl">
          {"Naturally\nRooted & Connected"}
        </RevealText>
        <div className="kg-small-pair">
          <p>
            Living soil, indigenous seeds, seasonal cultivation,
            <br />
            and care that grows with the land.
          </p>
          <p>
            Your own farmland, a place to come home to,
            <br />
            and a family story for generations.
          </p>
        </div>
      </section>
      <section id="land-film" className="kg-panorama" data-parallax>
        <Photo
          src="orchard-retina.jpg"
          alt="Fruit trees and cultivated soil in Farm Natura’s orchard"
          sizes="100vw"
        />
      </section>
      <section className="kg-info kg-pad">
        <dl className="kg-facts">
          <div>
            <dt>Location</dt>
            <dd>Kandukur, Hyderabad</dd>
          </div>
          <div>
            <dt>Developer</dt>
            <dd>Planet Green Infra</dd>
          </div>
          <div>
            <dt>The estate</dt>
            <dd>
              110+ acres of managed farmland, natural farming, farmhouse stays, and a rooted
              community.
            </dd>
          </div>
        </dl>
        <RevealText as="p" className="kg-serif-copy">
          {homeContent.introduction}
        </RevealText>
      </section>
      <section className="kg-proof kg-pad">
        <span className="kg-serif-label">What makes us different</span>
        <div>
          <span className="kg-serif-label">The land</span>
          <p>6+ years of soil revitalisation</p>
          <p className="kg-muted">A foundation of living, chemical-free soil</p>
          <p>Indigenous & heirloom seeds</p>
          <p className="kg-muted">Growing in rhythm with the seasons</p>
          <p>Dedicated farm care</p>
          <p className="kg-muted">Everyday attention from our agronomy team</p>
        </div>
        <div>
          <span className="kg-serif-label">Your ownership</span>
          <p>Individual land titles</p>
          <p className="kg-muted">Documents available for independent review</p>
          <p>4 years of managed maintenance</p>
          <p className="kg-muted">Ask the team for plot-specific terms</p>
          <p>Farmhouse & community life</p>
          <p className="kg-muted">A place to return to, together</p>
        </div>
      </section>
      <section className="kg-pad kg-statement">
        <RevealText as="h2" className="kg-display-serif">
          Own your land. Grow your food. Find your place in a life closer to nature.
        </RevealText>
      </section>
      <section className="kg-locations kg-pad">
        <span className="kg-serif-label">Connected to your everyday</span>
        <div>
          {homeContent.connections.map((item) => (
            <Link className="kg-row" key={item.title} href="/farmland-near-kandukur">
              <span>{item.title}</span>
              <span>{item.route}</span>
              <span>{item.time}</span>
              <span>↗</span>
            </Link>
          ))}
          <p className="kg-muted kg-disclaimer">
            Approximate travel times; allow for traffic and route conditions.
          </p>
        </div>
      </section>
      <section className="kg-process">
        <RevealText as="h2" className="kg-section-title">
          {"From Living Soil\nto Lasting Roots"}
        </RevealText>
        <FarmSketch variant="land" />
        <div className="kg-pad">
          <RevealText as="p" className="kg-display-serif">
            The story begins beneath your feet. Healthy soil, thoughtful cultivation, and everyday
            care.
          </RevealText>
          <div className="kg-process-copy">
            <span className="kg-serif-label">
              From Living Soil
              <br />
              to Lasting Roots
            </span>
            <p className="kg-serif-copy">{homeContent.soil}</p>
          </div>
        </div>
      </section>
      <section className="kg-process">
        <RevealText as="h2" className="kg-section-title">
          {"Care in\nEvery Season"}
        </RevealText>
        <FarmSketch variant="home" />
        <div className="kg-process-copy reverse kg-pad">
          <p className="kg-serif-copy" data-reveal>
            {homeContent.care}
          </p>
          <span className="kg-serif-label">
            Managed farmland
            <br />A personal connection
          </span>
        </div>
      </section>
      <section className="kg-selected kg-pad">
        <RevealText as="h2" className="kg-section-title left">
          {"Discover\nFarm Natura (6)"}
        </RevealText>
        <div className="kg-project-grid">
          {experiences.map((item, i) => (
            <Link href={item.href} className={`kg-project project-${i}`} key={item.title}>
              <div className="kg-project-image" data-reveal data-parallax>
                <Photo src={item.image} alt={item.alt} />
              </div>
              <div className="kg-project-caption">
                <span>{item.title}</span>
                <span className="kg-serif-label">{item.detail}</span>
              </div>
              <span className="kg-project-visit">Explore ↗</span>
            </Link>
          ))}
        </div>
        <Link className="kg-see-all" href="/gallery">
          See all moments
        </Link>
      </section>
      <ApproachDiagram />
      <section className="kg-dark">
        <div className="kg-people-sequence">
          <div className="kg-orbit-ring" aria-hidden="true">
            {[...galleryImages, ...galleryImages].map((item, i) => (
              <div className="kg-orbit-photo" key={i}>
                <Photo src={item.src} alt="" sizes="20vw" />
              </div>
            ))}
          </div>
          <div className="kg-people kg-pad">
            <span className="kg-serif-label">People & Place</span>
            <RevealText as="h2" className="kg-display-serif">
              A community shaped by living soil, shared care, and a closer connection to nature.
            </RevealText>
          </div>
          <section className="kg-orbit">
            <div className="kg-orbit-stage">
              <div className="kg-orbit-copy">
                <div className="kg-orbit-feature">
                  <h2>
                    <span className="kg-feature-line">110+ Acres</span>
                    <span className="kg-feature-line">of Possibility</span>
                  </h2>
                  <div className="kg-small-pair">
                    <p>
                      Natural farming grounded in living soil,
                      <br />
                      indigenous seeds, and everyday stewardship.
                    </p>
                    <p>
                      A place for family time, seasonal harvests,
                      <br />
                      and a legacy that keeps growing.
                    </p>
                  </div>
                </div>
                <div className="kg-stat-list">
                  {homeContent.statistics.map((item) => (
                    <div className="kg-stat" key={item.value}>
                      <span>{item.value}</span>
                      <p>{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="kg-closing">
          <div className="kg-closing-orbit" aria-hidden="true">
            {homeContent.values.map((value, i) => (
              <span key={value} style={{ "--angle": `${i * 45}deg` } as React.CSSProperties}>
                {value}
              </span>
            ))}
          </div>
          <RevealText as="h2" className="kg-closing-title">
            {"A Place\nto Grow\nA Life\nto Return To"}
          </RevealText>
          <Link href="/contact" className="kg-dark-link">
            Come, walk the land ↗
          </Link>
        </section>
      </section>
      <section className="kg-home-contact kg-pad">
        <p>Start a conversation</p>
        <a href={contact.phoneHref}>+91 95795 55666 ↗</a>
      </section>
    </div>
  );
}
