import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout, Container, Section, Eyebrow } from "@/components/site/SiteLayout";
import { listDesigners } from "@/lib/public-data.functions";
import d1 from "@/assets/designer-1.jpg";
import d2 from "@/assets/designer-2.jpg";
import d3 from "@/assets/designer-3.jpg";

const FALLBACK = [
  { id: "f1", slug: "atelier-noir", name: "Atelier Noir", tagline: "Tailored couture", portrait_url: d1, cover_url: d1, location: "Paris" },
  { id: "f2", slug: "house-of-vellum", name: "House of Vellum", tagline: "Sculptural menswear", portrait_url: d2, cover_url: d2, location: "Milan" },
  { id: "f3", slug: "studio-iris", name: "Studio Iris", tagline: "Avant-garde drapery", portrait_url: d3, cover_url: d3, location: "London" },
];

const qo = queryOptions({ queryKey: ["designers", "all"], queryFn: () => listDesigners() });

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — Adorzia" },
      { name: "description", content: "Discover designers and collections from the Adorzia marketplace — a curated digital showroom for the next generation of fashion houses." },
      { property: "og:title", content: "Adorzia Marketplace" },
      { property: "og:description", content: "A curated digital showroom for emerging designers." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(qo),
  component: Marketplace,
});

function Marketplace() {
  const designers = useSuspenseQuery(qo).data;
  const list = designers.length ? designers : FALLBACK;
  return (
    <SiteLayout>
      <section className="border-b border-hairline">
        <Container className="py-20 md:py-28">
          <Eyebrow>Marketplace</Eyebrow>
          <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[1.02] max-w-3xl">A curated showroom of emerging houses.</h1>
        </Container>
      </section>
      <Section>
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
            {list.map((d) => (
              <Link key={d.id} to="/marketplace/$slug" params={{ slug: d.slug }} className="group">
                <div className="aspect-[3/4] overflow-hidden bg-bone">
                  <img src={d.portrait_url || d.cover_url || d1} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <div>
                    <h2 className="font-display text-2xl">{d.name}</h2>
                    {d.tagline && <p className="text-xs text-ink-soft mt-1">{d.tagline}</p>}
                  </div>
                  {d.location && <span className="eyebrow">{d.location}</span>}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
}
