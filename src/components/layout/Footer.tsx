import Link from "next/link";
import { navigation, contact, site } from "@/content/site";
export default function Footer() {
  return (
    <footer className="kg-footer kg-pad">
      <Link className="kg-brand" href="/">
        Farm Natura
        <br />
        Natural Farming
        <br />
        <em>Estate</em>
      </Link>
      <div>
        <p className="kg-muted">Navigation</p>
        <nav>
          <Link href="/">Index</Link>
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.title}
            </Link>
          ))}
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
      <div>
        <p className="kg-muted">Conversation</p>
        <a href={contact.phoneHref}>{site.phone}</a>
        <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer">
          WhatsApp ↗
        </a>
        <a href={contact.directions} target="_blank" rel="noopener noreferrer">
          Directions ↗
        </a>
      </div>
      <div>
        <p className="kg-muted">The estate</p>
        <p>
          Kandukur, Srisailam Highway
          <br />
          Near Hyderabad, Telangana
        </p>
        <p className="kg-muted">Hyderabad office</p>
        <p>{contact.office}</p>
      </div>
      <div className="kg-footer-bottom">
        <span>© {new Date().getFullYear()} Farm Natura</span>
        <span>By Planet Green Infra</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
