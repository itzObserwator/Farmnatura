import { ButtonLink, Label } from "@/components/ui/Primitives";
export default function NotFound() {
  return (
    <section className="not-found">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Label>A small detour</Label>
      </div>
      <h1>
        Let’s find <em>your way.</em>
      </h1>
      <p>This page isn’t here. There’s plenty of the farm left to explore.</p>
      <ButtonLink href="/">Back to Farm Natura</ButtonLink>
    </section>
  );
}
