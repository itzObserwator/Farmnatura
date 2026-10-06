import { Photo, ButtonLink } from "@/components/ui/Primitives";
export default function PageHero({
  title,
  accent,
  label,
  description,
  image,
  alt,
  caption,
  action,
}: {
  title: string;
  accent: string;
  label: string;
  description: string;
  image: string;
  alt: string;
  caption?: string;
  action?: { href: string; label: string };
}) {
  return (
    <section className="kg-page-hero" data-parallax>
      <Photo src={image} alt={alt} eager sizes="100vw" />
      <div className="kg-hero-shade" />
      <div className="kg-page-title hero-enter">
        <span className="kg-serif-label">{label}</span>
        <h1>
          {title}
          <br />
          <em>{accent}</em>
        </h1>
      </div>
      <div className="kg-page-description hero-enter">
        <p>{description}</p>
        {action && (
          <ButtonLink href={action.href} light>
            {action.label}
          </ButtonLink>
        )}
        {caption && <span>{caption}</span>}
      </div>
    </section>
  );
}
