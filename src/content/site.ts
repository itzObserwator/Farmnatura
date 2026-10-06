/** Shared brand details. Edit content here instead of searching through components. */
export const site = {
  name: "Farm Natura",
  description:
    "Managed natural-farming estate in Kandukur, near Hyderabad. Explore the land, natural farming, and life close to nature.",
  developer: "Planet Green Infra",
  phone: "+91 95795 55666",
  location: "Kandukur, Srisailam Highway, near Hyderabad",
  existingWebsite: "https://www.farmnatura.in",
};

/** Shared navigation and page structure. */
export const plannedPages = [
  {
    href: "/",
    title: "Home",
    purpose: "Introduce the estate and invite visitors to walk the land.",
  },
  {
    href: "/about-us",
    title: "Our story",
    purpose: "Explain Farm Natura’s vision and Planet Green Infra.",
  },
  {
    href: "/farm-lands-for-sale-in-hyderabad",
    title: "The estate",
    purpose: "Explain managed farmland, ownership, and documentation.",
  },
  {
    href: "/natural-farming",
    title: "Natural farming",
    purpose: "Explain soil health, indigenous seeds, and everyday farm care.",
  },
  {
    href: "/farmhouses-for-sale-in-hyderabad",
    title: "Farm living",
    purpose: "Show farmhouse stays, family experiences, and community life.",
  },
  { href: "/gallery", title: "Gallery", purpose: "Explore authentic photographs of Farm Natura." },
  {
    href: "/farmland-near-kandukur",
    title: "Location",
    purpose: "Present location, directions, and approximate travel times.",
  },
  {
    href: "/contact",
    title: "Visit the farm",
    purpose: "Help visitors contact the team and arrange a site visit.",
  },
] as const;

export const navigation = plannedPages.filter(
  (page) => page.href !== "/" && page.href !== "/contact",
);
export const contact = {
  phoneHref: "tel:+919579555666",
  whatsapp: "https://wa.me/919579555666",
  directions: "https://www.google.com/maps/search/?api=1&query=Farm+Natura+Kandukur+Hyderabad",
  office: "Above Hyundai Showroom, Q-City Road, Financial District, Gowlidoddi, Hyderabad",
};
