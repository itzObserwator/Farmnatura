import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import VisitBanner from "@/components/sections/VisitBanner";
import LocationMap from "@/components/sections/LocationMap";
import { Label, TextLink } from "@/components/ui/Primitives";
import { contact } from "@/content/site";
export const metadata: Metadata = {
  title: "Find us in Kandukur",
  description:
    "Plan your journey to Farm Natura in Kandukur, along the Srisailam Highway corridor near Hyderabad and Rajiv Gandhi International Airport.",
};
export default function LocationPage() {
  return (
    <>
      <PageHero
        label="Our location"
        title="A quieter world."
        accent="An easy return."
        description="In Kandukur, along the Srisailam Highway corridor, Farm Natura offers a connection to nature within reach of Hyderabad."
        image="orchard-retina.jpg"
        alt="The Farm Natura estate in the Kandukur countryside"
        action={{ href: "/contact", label: "Plan the journey with us" }}
      />
      <section className="editorial-split section-space paper-section">
        <div data-reveal>
          <Label>Close enough for a weekend</Label>
          <h2>
            More time here.
            <br />
            <em>Less time getting here.</em>
          </h2>
          <p>
            The estate is connected to the city through the Srisailam Highway and Tukkuguda ORR
            corridor, with access to Rajiv Gandhi International Airport.
          </p>
          <p>
            Contact the team before you set off. They can share the latest directions, meeting
            point, and details for your visit.
          </p>
          <TextLink href={contact.directions}>Find Farm Natura on Google Maps</TextLink>
        </div>
        <LocationMap />
      </section>
      <section className="section-space">
        <Label>The journey at a glance</Label>
        <h2 style={{ marginTop: 24 }}>
          Closer than <em>you think.</em>
        </h2>
        <table className="travel-table">
          <thead>
            <tr>
              <th scope="col">Starting point</th>
              <th scope="col">Connection</th>
              <th scope="col">Approx. drive</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Rajiv Gandhi International Airport</td>
              <td>Airport approach / Srisailam Highway</td>
              <td>25 minutes</td>
            </tr>
            <tr>
              <td>Tukkuguda ORR Exit</td>
              <td>Outer Ring Road corridor</td>
              <td>20 minutes</td>
            </tr>
            <tr>
              <td>Maheshwaram</td>
              <td>Srisailam Highway link road</td>
              <td>15 minutes</td>
            </tr>
            <tr>
              <td>Adibatla</td>
              <td>Southern Hyderabad corridor</td>
              <td>30 minutes</td>
            </tr>
          </tbody>
        </table>
        <p className="location-disclaimer">
          Travel times are approximate and depend on traffic, route, and starting location. Confirm
          directions with the team.
        </p>
      </section>
      <VisitBanner />
    </>
  );
}
