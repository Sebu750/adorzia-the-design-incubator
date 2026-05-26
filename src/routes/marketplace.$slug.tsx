import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout, Container, Section, Eyebrow } from "@/components/site/SiteLayout";
import { getDesignerBySlug } from "@/lib/public-data.functions";

const qo = (slug: string) =>
  queryOptions({
    queryKey: ["designer", slug],
    queryFn: () => getDesignerBySlug({ data: { slug } }),
  });

export const Route = createFileRoute("/marketplace/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(qo(params.slug));
    if (!data) throw notFound();
    return data;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.designer.name} — Adorzia` },
          { name: "description", content: loaderData.designer.tagline ?? `Discover ${loaderData.designer.name} on Adorzia.` },
          { property: "og:title", content: `${loaderData.designer.name} — Adorzia` },
          { property: "og:image", content: loaderData.designer.cover_url ?? loaderData.designer.portrait_url ?? "" },
        ]
      : [{ title: "Designer — Adorzia" }],
  }),
  component: DesignerPage,
  notFoundComponent: () => (
    <SiteLayout>
      <Section>
        <Container>
          <h1 className="font-display text-4xl">Designer not found</h1>
          <Link to="/marketplace" className="mt-6 inline-block eyebrow border-b border-ink pb-1">Back to marketplace</Link>
        </Container>
      </Section>
    </SiteLayout>
  ),
});

function DesignerPage() {
  const data = useSuspenseQuery(qo(Route.useParams().slug)).data!;
  const { designer, collections, products } = data;
  return (
    <SiteLayout>
      <section className="border-b border-hairline">
        {designer.cover_url && (
          <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-bone">
            <img src={designer.cover_url} alt={designer.name} className="h-full w-full object-cover" />
          </div>
        )}
        <Container className="py-16 md:py-24">
          <Eyebrow>{designer.location || "Designer"}</Eyebrow>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">{designer.name}</h1>
          {designer.tagline && <p className="mt-4 text-lg text-ink-soft">{designer.tagline}</p>}
          {designer.bio && <p className="mt-8 max-w-2xl text-ink-soft leading-relaxed">{designer.bio}</p>}
          <div className="mt-8 flex flex-wrap gap-6 eyebrow">
            {designer.instagram && <a href={`https://instagram.com/${designer.instagram.replace("@","")}`} target="_blank" rel="noreferrer" className="border-b border-ink pb-1 hover:text-gold hover:border-gold">Instagram</a>}
            {designer.website && <a href={designer.website} target="_blank" rel="noreferrer" className="border-b border-ink pb-1 hover:text-gold hover:border-gold">Website</a>}
          </div>
        </Container>
      </section>

      {collections.map((c) => {
        const items = products.filter((p) => p.collection_id === c.id);
        return (
          <Section key={c.id} className="border-b border-hairline">
            <Container>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <Eyebrow>{c.year ? `Collection · ${c.year}` : "Collection"}</Eyebrow>
                  <h2 className="mt-3 font-display text-4xl md:text-5xl">{c.title}</h2>
                  {c.description && <p className="mt-4 max-w-2xl text-ink-soft">{c.description}</p>}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                {items.map((p) => (
                  <div key={p.id}>
                    {p.images?.[0] && (
                      <div className="aspect-[3/4] bg-bone overflow-hidden">
                        <img src={p.images[0]} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                      </div>
                    )}
                    <div className="mt-4 flex items-baseline justify-between">
                      <h3 className="font-display text-xl">{p.name}</h3>
                      {p.price_display && <span className="eyebrow">{p.price_display}</span>}
                    </div>
                    {p.description && <p className="mt-2 text-sm text-ink-soft">{p.description}</p>}
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        );
      })}

      <Section>
        <Container>
          <Link to="/marketplace" className="eyebrow border-b border-ink pb-1 hover:text-gold hover:border-gold">← Back to marketplace</Link>
        </Container>
      </Section>
    </SiteLayout>
  );
}
