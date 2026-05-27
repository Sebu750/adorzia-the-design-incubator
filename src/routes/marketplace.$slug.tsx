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
  const [latest, ...previous] = collections;
  const latestItems = latest ? products.filter((p) => p.collection_id === latest.id) : [];

  return (
    <SiteLayout>
      {/* Cover */}
      <section className="border-b border-hairline">
        {designer.cover_url && (
          <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-bone">
            <img src={designer.cover_url} alt={designer.name} className="h-full w-full object-cover" />
          </div>
        )}
        <Container className="py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-8">
              <Eyebrow>{designer.location || "Designer"}</Eyebrow>
              <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[0.98]">{designer.name}</h1>
              {designer.tagline && <p className="mt-5 text-lg text-ink-soft">{designer.tagline}</p>}
            </div>
            <div className="md:col-span-4 flex flex-wrap gap-6 eyebrow md:justify-end">
              {designer.instagram && <a href={`https://instagram.com/${designer.instagram.replace("@","")}`} target="_blank" rel="noreferrer" className="border-b border-ink pb-1 hover:text-gold hover:border-gold">Instagram</a>}
              {designer.website && <a href={designer.website} target="_blank" rel="noreferrer" className="border-b border-ink pb-1 hover:text-gold hover:border-gold">Website</a>}
              <Link to="/contact" className="border-b border-ink pb-1 hover:text-gold hover:border-gold">Inquire</Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats strip */}
      <section className="border-b border-hairline bg-bone">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-hairline">
            {[
              { k: "Based in", v: designer.location || "—" },
              { k: "Collections", v: String(collections.length || "—") },
              { k: "Pieces shown", v: String(products.length || "—") },
              { k: "Status", v: designer.featured ? "Featured" : "Marketplace" },
            ].map((s, i) => (
              <div key={i} className="py-10 px-6 first:pl-0 last:pr-0">
                <div className="eyebrow text-gold">{s.k}</div>
                <div className="mt-3 font-display text-2xl md:text-3xl">{s.v}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* About the designer */}
      <Section className="border-b border-hairline">
        <Container>
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              {designer.portrait_url ? (
                <div className="aspect-[4/5] overflow-hidden bg-bone">
                  <img src={designer.portrait_url} alt={designer.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="aspect-[4/5] bg-bone flex items-center justify-center font-display text-7xl text-ink/30">
                  {designer.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
              )}
            </div>
            <div className="md:col-span-7">
              <Eyebrow>About the designer</Eyebrow>
              <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.05]">
                {designer.tagline ?? `Inside the practice of ${designer.name}.`}
              </h2>
              {designer.bio ? (
                <p className="mt-8 text-ink-soft leading-relaxed text-lg">{designer.bio}</p>
              ) : (
                <p className="mt-8 text-ink-soft leading-relaxed text-lg">
                  {designer.name} is part of the Adorzia marketplace — a curated roster of emerging
                  designers building serious houses on their own terms. Inquiries and stockist requests
                  are welcomed through the studio.
                </p>
              )}

              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-hairline pt-8">
                <div>
                  <div className="eyebrow text-ink-soft">Discipline</div>
                  <div className="mt-2 font-display text-xl">Couture &amp; ready-to-wear</div>
                </div>
                <div>
                  <div className="eyebrow text-ink-soft">Production</div>
                  <div className="mt-2 font-display text-xl">Small-batch</div>
                </div>
                <div>
                  <div className="eyebrow text-ink-soft">Joined</div>
                  <div className="mt-2 font-display text-xl">Adorzia roster</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Latest collection — featured */}
      {latest && (
        <Section className="border-b border-hairline">
          <Container>
            <div className="grid md:grid-cols-12 gap-10 mb-12 items-end">
              <div className="md:col-span-7">
                <Eyebrow>Latest collection{latest.year ? ` · ${latest.year}` : ""}</Eyebrow>
                <h2 className="mt-4 font-display text-5xl md:text-6xl leading-[1]">{latest.title}</h2>
                {latest.description && <p className="mt-6 max-w-2xl text-ink-soft leading-relaxed text-lg">{latest.description}</p>}
              </div>
              {latest.cover_url && (
                <div className="md:col-span-5">
                  <img src={latest.cover_url} alt={latest.title} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                </div>
              )}
            </div>
            {latestItems.length > 0 && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                {latestItems.map((p) => (
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
            )}
          </Container>
        </Section>
      )}

      {/* Previous collections */}
      {previous.length > 0 && (
        <Section className="border-b border-hairline bg-bone">
          <Container>
            <div className="grid md:grid-cols-12 gap-10 mb-12">
              <div className="md:col-span-4">
                <Eyebrow>Archive</Eyebrow>
                <h2 className="mt-4 font-display text-4xl md:text-5xl leading-[1.05]">Previous collections</h2>
              </div>
              <p className="md:col-span-7 md:col-start-6 text-ink-soft leading-relaxed self-end">
                Earlier work from {designer.name}, presented as part of the Adorzia archive.
              </p>
            </div>
            <div className="space-y-16">
              {previous.map((c) => {
                const items = products.filter((p) => p.collection_id === c.id);
                return (
                  <div key={c.id} className="grid md:grid-cols-12 gap-10 border-t border-hairline pt-12">
                    <div className="md:col-span-4">
                      <Eyebrow>{c.year ? `Collection · ${c.year}` : "Collection"}</Eyebrow>
                      <h3 className="mt-3 font-display text-3xl md:text-4xl">{c.title}</h3>
                      {c.description && <p className="mt-4 text-ink-soft leading-relaxed">{c.description}</p>}
                    </div>
                    <div className="md:col-span-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {c.cover_url && !items.length && (
                        <div className="aspect-[3/4] bg-background overflow-hidden col-span-2 md:col-span-1">
                          <img src={c.cover_url} alt={c.title} loading="lazy" className="h-full w-full object-cover" />
                        </div>
                      )}
                      {items.map((p) => (
                        <div key={p.id}>
                          {p.images?.[0] && (
                            <div className="aspect-[3/4] bg-background overflow-hidden">
                              <img src={p.images[0]} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                            </div>
                          )}
                          <div className="mt-3 font-display text-lg">{p.name}</div>
                          {p.price_display && <div className="eyebrow text-ink-soft">{p.price_display}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* Inquire CTA */}
      <Section className="border-b border-hairline">
        <Container>
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <Eyebrow>Stockists, press &amp; commissions</Eyebrow>
              <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.05]">
                Interested in working with {designer.name}?
              </h2>
              <p className="mt-6 text-ink-soft leading-relaxed max-w-xl">
                Inquiries are routed through the Adorzia studio. We'll connect you directly with the designer
                for wholesale, press, or commission requests.
              </p>
            </div>
            <div className="md:col-span-5 md:text-right">
              <Link to="/contact" className="inline-flex items-center border border-ink bg-ink text-cream px-7 py-4 text-[11px] uppercase tracking-[0.28em] hover:bg-cream hover:text-ink transition-colors">
                Start an inquiry
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Link to="/marketplace" className="eyebrow border-b border-ink pb-1 hover:text-gold hover:border-gold">← Back to marketplace</Link>
        </Container>
      </Section>
    </SiteLayout>
  );
}
