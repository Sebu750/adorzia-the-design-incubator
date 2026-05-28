import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout, Container, Section, Eyebrow } from "@/components/site/SiteLayout";
import { getDesignerBySlug } from "@/lib/public-data.functions";
import designer1 from "@/assets/designer-1.jpg";
import designer2 from "@/assets/designer-2.jpg";
import designer3 from "@/assets/designer-3.jpg";

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
          { title: `${loaderData.designer.name} — Adorzia Designer` },
          { name: "description", content: loaderData.designer.tagline ?? `Discover ${loaderData.designer.name} on Adorzia.` },
          { name: "keywords", content: `${loaderData.designer.name}, fashion designer, emerging designer, designer collection` },
          { property: "og:title", content: `${loaderData.designer.name} — Adorzia` },
          { property: "og:description", content: loaderData.designer.tagline ?? `Discover ${loaderData.designer.name} on Adorzia.` },
          { property: "og:image", content: loaderData.designer.cover_url ?? loaderData.designer.portrait_url ?? "" },
          { property: "og:url", content: `https://adorzia.com/marketplace/${loaderData.designer.slug}` },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:title", content: `${loaderData.designer.name} — Adorzia` },
          { rel: "canonical", href: `https://adorzia.com/marketplace/${loaderData.designer.slug}` } as never,
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
  const slug = Route.useParams().slug;
  
  // Static brand pages
  if (slug === "atelier-noir") {
    return <AtelierNoirPage />;
  }
  if (slug === "house-of-vellum") {
    return <HouseOfVellumPage />;
  }
  if (slug === "studio-iris") {
    return <StudioIrisPage />;
  }
  
  const data = useSuspenseQuery(qo(slug)).data!;
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

// Static brand page for Atelier Noir
function AtelierNoirPage() {
  const brand = {
    name: "Atelier Noir",
    tagline: "Where darkness meets elegance — sculptural couture for the modern era.",
    bio: "Founded in 2019, Atelier Noir is a Paris-based fashion house that redefines the boundaries between darkness and sophistication. Designer Marie Laurent creates pieces that celebrate the beauty of shadows, using innovative draping techniques and sustainable fabrics to craft garments that are both architectural and deeply feminine. Each collection is a meditation on contrast — light against dark, structure against fluidity, tradition against rebellion.",
    location: "Paris, France",
    instagram: "@ateliernoir.official",
    website: "https://ateliernoir.com",
    email: "contact@ateliernoir.com",
    coverImage: designer1,
    logoImage: designer1,
    founder: "Marie Laurent",
    founded: "2019",
    education: "Parsons School of Design, MFA Fashion Design",
    specialties: ["Sculptural Couture", "Sustainable Fabrics", "Innovative Draping", "Monochromatic Palettes"],
  };

  const latestCollection = {
    title: "Ombres Éternelles",
    year: 2026,
    description: "The latest collection explores the poetry of shadows — 18 pieces crafted from recycled silk, organic wool, and hand-dyed cotton. Each garment tells a story of transformation, where darkness becomes a canvas for intricate detail and unexpected beauty.",
    pieces: [
      { name: "Midnight Cascade Gown", price: "€3,200", description: "Flowing silk gown with hand-pleated bodice", image: designer1 },
      { name: "Shadow Sculpture Blazer", price: "€1,850", description: "Structured wool blazer with asymmetric lapels", image: designer2 },
      { name: "Noir Draped Midi", price: "€1,400", description: "Organic cotton dress with origami-inspired folds", image: designer3 },
      { name: "Eclipse Tailored Trousers", price: "€890", description: "High-waisted trousers with concealed pleats", image: designer1 },
      { name: "Velvet Abyss Coat", price: "€2,600", description: "Floor-length coat in hand-woven velvet", image: designer2 },
      { name: "Phantom Lace Blouse", price: "€980", description: "Sheer blouse with laser-cut lace detailing", image: designer3 },
    ],
  };

  const previousCollections = [
    {
      title: "Lumière Noire",
      year: 2025,
      description: "A exploration of hidden light within darkness, featuring 24 pieces in monochromatic palettes with subtle metallic accents.",
      image: designer2,
    },
    {
      title: "Silhouettes de Minuit",
      year: 2024,
      description: "Midnight-inspired collection celebrating the mystery and power of after-dark elegance.",
      image: designer3,
    },
    {
      title: "Contraste Absolu",
      year: 2023,
      description: "Debut collection establishing the house's signature aesthetic of bold contrasts and sculptural forms.",
      image: designer1,
    },
  ];

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="border-b border-hairline">
        <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-bone">
          <img src={brand.coverImage} alt={brand.name} className="h-full w-full object-cover" />
        </div>
        <Container className="py-16 md:py-24">
          <Eyebrow>{brand.location}</Eyebrow>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">{brand.name}</h1>
          <p className="mt-4 text-lg text-ink-soft">{brand.tagline}</p>
          <p className="mt-8 max-w-2xl text-ink-soft leading-relaxed">{brand.bio}</p>
          <div className="mt-8 flex flex-wrap gap-6 eyebrow">
            {brand.instagram && (
              <a
                href={`https://instagram.com/${brand.instagram.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className="border-b border-ink pb-1 hover:text-gold hover:border-gold"
              >
                Instagram
              </a>
            )}
            {brand.website && (
              <a
                href={brand.website}
                target="_blank"
                rel="noreferrer"
                className="border-b border-ink pb-1 hover:text-gold hover:border-gold"
              >
                Website
              </a>
            )}
            {brand.email && (
              <a
                href={`mailto:${brand.email}`}
                className="border-b border-ink pb-1 hover:text-gold hover:border-gold"
              >
                Email
              </a>
            )}
          </div>
        </Container>
      </section>

      {/* Designer Background */}
      <Section className="border-b border-hairline bg-bone">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Eyebrow>Founder</Eyebrow>
              <h2 className="mt-3 font-display text-3xl">{brand.founder}</h2>
              <div className="mt-6 space-y-4 text-ink-soft">
                <div>
                  <div className="eyebrow text-xs">Education</div>
                  <div className="mt-1">{brand.education}</div>
                </div>
                <div>
                  <div className="eyebrow text-xs">Founded</div>
                  <div className="mt-1">{brand.founded}</div>
                </div>
                <div>
                  <div className="eyebrow text-xs">Location</div>
                  <div className="mt-1">{brand.location}</div>
                </div>
              </div>
            </div>
            <div>
              <Eyebrow>Specialties</Eyebrow>
              <div className="mt-6 flex flex-wrap gap-3">
                {brand.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-4 py-2 border border-ink/20 text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Latest Collection */}
      <Section className="border-b border-hairline">
        <Container>
          <div className="mb-12">
            <Eyebrow>{latestCollection.year ? `Latest Collection · ${latestCollection.year}` : "Latest Collection"}</Eyebrow>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">{latestCollection.title}</h2>
            <p className="mt-6 max-w-3xl text-ink-soft leading-relaxed">{latestCollection.description}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestCollection.pieces.map((piece, idx) => (
              <div key={idx} className="group">
                <div className="aspect-[3/4] bg-bone overflow-hidden">
                  <img
                    src={piece.image}
                    alt={piece.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <h3 className="font-display text-xl">{piece.name}</h3>
                  <span className="eyebrow">{piece.price}</span>
                </div>
                <p className="mt-2 text-sm text-ink-soft">{piece.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Previous Collections */}
      <Section>
        <Container>
          <Eyebrow>Archive</Eyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Previous Collections</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-10">
            {previousCollections.map((collection, idx) => (
              <div key={idx} className="group">
                <div className="aspect-[4/5] bg-bone overflow-hidden mb-6">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="eyebrow text-gold">{collection.year}</div>
                <h3 className="mt-2 font-display text-2xl">{collection.title}</h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{collection.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Back to Marketplace */}
      <Section className="border-t border-hairline">
        <Container>
          <Link to="/marketplace" className="eyebrow border-b border-ink pb-1 hover:text-gold hover:border-gold">
            ← Back to marketplace
          </Link>
        </Container>
      </Section>
    </SiteLayout>
  );
}

// Static brand page for House of Vellum
function HouseOfVellumPage() {
  const brand = {
    name: "House of Vellum",
    tagline: "Sculptural menswear reimagined for the contemporary gentleman.",
    bio: "Founded in 2020 by Alessandro Moretti, House of Vellum represents a new era of Italian menswear — where architectural precision meets wearable art. Based in Milan's historic fashion district, the house specializes in structured silhouettes that challenge traditional menswear conventions. Each piece is handcrafted using time-honored Italian tailoring techniques combined with innovative fabric manipulation, creating garments that are both powerful and refined.",
    location: "Milan, Italy",
    instagram: "@houseofvellum",
    website: "https://houseofvellum.it",
    email: "info@houseofvellum.it",
    coverImage: designer2,
    logoImage: designer2,
    founder: "Alessandro Moretti",
    founded: "2020",
    education: "Central Saint Martins, BA Fashion Design; Istituto Marangoni, Masters in Menswear",
    specialties: ["Architectural Tailoring", "Italian Craftsmanship", "Structured Silhouettes", "Premium Fabrics"],
  };

  const latestCollection = {
    title: "Architettura Maschile",
    year: 2026,
    description: "A masterclass in modern menswear — 22 pieces exploring the intersection of architecture and clothing. Sharp lines meet fluid movement in this collection crafted from premium Italian wools, technical cottons, and hand-selected leathers.",
    pieces: [
      { name: "Duomo Structured Coat", price: "€2,800", description: "Double-breasted wool coat with architectural shoulders", image: designer2 },
      { name: "Colonna Tailored Suit", price: "€3,400", description: "Three-piece suit with sculpted lapels", image: designer1 },
      { name: "Volta Leather Jacket", price: "€1,950", description: "Hand-stitched leather with geometric paneling", image: designer3 },
      { name: "Piazza Cotton Shirt", price: "€680", description: "Egyptian cotton with asymmetric collar", image: designer2 },
      { name: "Foro Pleated Trousers", price: "€890", description: "High-waisted trousers with knife pleats", image: designer1 },
      { name: "Obelisk Overcoat", price: "€3,200", description: "Floor-length cashmere overcoat", image: designer3 },
    ],
  };

  const previousCollections = [
    {
      title: "Forma e Funzione",
      year: 2025,
      description: "Exploring the balance between form and function in contemporary menswear through minimalist design.",
      image: designer1,
    },
    {
      title: "Il Gentiluomo Moderno",
      year: 2024,
      description: "A reimagining of the classic Italian gentleman for the modern age.",
      image: designer3,
    },
    {
      title: "Strutture",
      year: 2023,
      description: "Debut collection establishing the house's architectural design philosophy.",
      image: designer2,
    },
  ];

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="border-b border-hairline">
        <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-bone">
          <img src={brand.coverImage} alt={brand.name} className="h-full w-full object-cover" />
        </div>
        <Container className="py-16 md:py-24">
          <Eyebrow>{brand.location}</Eyebrow>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">{brand.name}</h1>
          <p className="mt-4 text-lg text-ink-soft">{brand.tagline}</p>
          <p className="mt-8 max-w-2xl text-ink-soft leading-relaxed">{brand.bio}</p>
          <div className="mt-8 flex flex-wrap gap-6 eyebrow">
            {brand.instagram && (
              <a
                href={`https://instagram.com/${brand.instagram.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className="border-b border-ink pb-1 hover:text-gold hover:border-gold"
              >
                Instagram
              </a>
            )}
            {brand.website && (
              <a
                href={brand.website}
                target="_blank"
                rel="noreferrer"
                className="border-b border-ink pb-1 hover:text-gold hover:border-gold"
              >
                Website
              </a>
            )}
            {brand.email && (
              <a
                href={`mailto:${brand.email}`}
                className="border-b border-ink pb-1 hover:text-gold hover:border-gold"
              >
                Email
              </a>
            )}
          </div>
        </Container>
      </section>

      {/* Designer Background */}
      <Section className="border-b border-hairline bg-bone">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Eyebrow>Founder</Eyebrow>
              <h2 className="mt-3 font-display text-3xl">{brand.founder}</h2>
              <div className="mt-6 space-y-4 text-ink-soft">
                <div>
                  <div className="eyebrow text-xs">Education</div>
                  <div className="mt-1">{brand.education}</div>
                </div>
                <div>
                  <div className="eyebrow text-xs">Founded</div>
                  <div className="mt-1">{brand.founded}</div>
                </div>
                <div>
                  <div className="eyebrow text-xs">Location</div>
                  <div className="mt-1">{brand.location}</div>
                </div>
              </div>
            </div>
            <div>
              <Eyebrow>Specialties</Eyebrow>
              <div className="mt-6 flex flex-wrap gap-3">
                {brand.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-4 py-2 border border-ink/20 text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Latest Collection */}
      <Section className="border-b border-hairline">
        <Container>
          <div className="mb-12">
            <Eyebrow>{latestCollection.year ? `Latest Collection · ${latestCollection.year}` : "Latest Collection"}</Eyebrow>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">{latestCollection.title}</h2>
            <p className="mt-6 max-w-3xl text-ink-soft leading-relaxed">{latestCollection.description}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestCollection.pieces.map((piece, idx) => (
              <div key={idx} className="group">
                <div className="aspect-[3/4] bg-bone overflow-hidden">
                  <img
                    src={piece.image}
                    alt={piece.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <h3 className="font-display text-xl">{piece.name}</h3>
                  <span className="eyebrow">{piece.price}</span>
                </div>
                <p className="mt-2 text-sm text-ink-soft">{piece.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Previous Collections */}
      <Section>
        <Container>
          <Eyebrow>Archive</Eyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Previous Collections</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-10">
            {previousCollections.map((collection, idx) => (
              <div key={idx} className="group">
                <div className="aspect-[4/5] bg-bone overflow-hidden mb-6">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="eyebrow text-gold">{collection.year}</div>
                <h3 className="mt-2 font-display text-2xl">{collection.title}</h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{collection.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Back to Marketplace */}
      <Section className="border-t border-hairline">
        <Container>
          <Link to="/marketplace" className="eyebrow border-b border-ink pb-1 hover:text-gold hover:border-gold">
            ← Back to marketplace
          </Link>
        </Container>
      </Section>
    </SiteLayout>
  );
}

// Static brand page for Studio Iris
function StudioIrisPage() {
  const brand = {
    name: "Studio Iris",
    tagline: "Avant-garde drapery that defies convention.",
    bio: "Studio Iris is London's most experimental fashion house, founded in 2018 by designer Elara Chen. Working at the intersection of art and fashion, the studio creates garments that challenge everything we know about clothing construction. Using radical draping techniques, unconventional materials, and a fearless approach to form, Studio Iris produces pieces that are as much sculpture as they are fashion. Each collection is a provocation — questioning norms, pushing boundaries, and redefining what clothing can be.",
    location: "London, UK",
    instagram: "@studioiris.london",
    website: "https://studioiris.co.uk",
    email: "hello@studioiris.co.uk",
    coverImage: designer3,
    logoImage: designer3,
    founder: "Elara Chen",
    founded: "2018",
    education: "Royal College of Art, MA Fashion; Central Saint Martins, BA Fashion Print",
    specialties: ["Avant-Garde Draping", "Experimental Construction", "Sustainable Innovation", "Artistic Expression"],
  };

  const latestCollection = {
    title: "Fluid Dynamics",
    year: 2026,
    description: "An exploration of movement and stillness — 20 pieces that exist in perpetual motion. Created from silk jersey, technical meshes, and hand-dyed organic fabrics, this collection captures the beauty of fabric in motion.",
    pieces: [
      { name: "Vortex Draped Gown", price: "€2,400", description: "Spiral-draped silk gown with raw edges", image: designer3 },
      { name: "Cascade Asymmetric Top", price: "€980", description: "Flowing top with waterfall draping", image: designer1 },
      { name: "Ripple Pleated Skirt", price: "€1,200", description: "Accordion-pleated skirt with irregular hem", image: designer2 },
      { name: "Tension Wrap Dress", price: "€1,650", description: "Zero-waste wrapped construction", image: designer3 },
      { name: "Current Flow Trousers", price: "€890", description: "Wide-leg trousers with fluid drape", image: designer1 },
      { name: "Eddy Sculptural Jacket", price: "€2,100", description: "Three-dimensional constructed jacket", image: designer2 },
    ],
  };

  const previousCollections = [
    {
      title: "Deconstructed Nature",
      year: 2025,
      description: "Organic forms meet deconstruction in this nature-inspired collection.",
      image: designer2,
    },
    {
      title: "Anti-Structure",
      year: 2024,
      description: "Rejecting traditional construction methods entirely.",
      image: designer1,
    },
    {
      title: "Raw Edges",
      year: 2023,
      description: "Celebrating imperfection and the beauty of unfinished forms.",
      image: designer3,
    },
    {
      title: "First Principles",
      year: 2022,
      description: "Foundational collection exploring basic draping techniques.",
      image: designer2,
    },
  ];

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="border-b border-hairline">
        <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-bone">
          <img src={brand.coverImage} alt={brand.name} className="h-full w-full object-cover" />
        </div>
        <Container className="py-16 md:py-24">
          <Eyebrow>{brand.location}</Eyebrow>
          <h1 className="mt-4 font-display text-5xl md:text-7xl">{brand.name}</h1>
          <p className="mt-4 text-lg text-ink-soft">{brand.tagline}</p>
          <p className="mt-8 max-w-2xl text-ink-soft leading-relaxed">{brand.bio}</p>
          <div className="mt-8 flex flex-wrap gap-6 eyebrow">
            {brand.instagram && (
              <a
                href={`https://instagram.com/${brand.instagram.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className="border-b border-ink pb-1 hover:text-gold hover:border-gold"
              >
                Instagram
              </a>
            )}
            {brand.website && (
              <a
                href={brand.website}
                target="_blank"
                rel="noreferrer"
                className="border-b border-ink pb-1 hover:text-gold hover:border-gold"
              >
                Website
              </a>
            )}
            {brand.email && (
              <a
                href={`mailto:${brand.email}`}
                className="border-b border-ink pb-1 hover:text-gold hover:border-gold"
              >
                Email
              </a>
            )}
          </div>
        </Container>
      </section>

      {/* Designer Background */}
      <Section className="border-b border-hairline bg-bone">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Eyebrow>Founder</Eyebrow>
              <h2 className="mt-3 font-display text-3xl">{brand.founder}</h2>
              <div className="mt-6 space-y-4 text-ink-soft">
                <div>
                  <div className="eyebrow text-xs">Education</div>
                  <div className="mt-1">{brand.education}</div>
                </div>
                <div>
                  <div className="eyebrow text-xs">Founded</div>
                  <div className="mt-1">{brand.founded}</div>
                </div>
                <div>
                  <div className="eyebrow text-xs">Location</div>
                  <div className="mt-1">{brand.location}</div>
                </div>
              </div>
            </div>
            <div>
              <Eyebrow>Specialties</Eyebrow>
              <div className="mt-6 flex flex-wrap gap-3">
                {brand.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-4 py-2 border border-ink/20 text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Latest Collection */}
      <Section className="border-b border-hairline">
        <Container>
          <div className="mb-12">
            <Eyebrow>{latestCollection.year ? `Latest Collection · ${latestCollection.year}` : "Latest Collection"}</Eyebrow>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">{latestCollection.title}</h2>
            <p className="mt-6 max-w-3xl text-ink-soft leading-relaxed">{latestCollection.description}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestCollection.pieces.map((piece, idx) => (
              <div key={idx} className="group">
                <div className="aspect-[3/4] bg-bone overflow-hidden">
                  <img
                    src={piece.image}
                    alt={piece.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <h3 className="font-display text-xl">{piece.name}</h3>
                  <span className="eyebrow">{piece.price}</span>
                </div>
                <p className="mt-2 text-sm text-ink-soft">{piece.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Previous Collections */}
      <Section>
        <Container>
          <Eyebrow>Archive</Eyebrow>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Previous Collections</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-10">
            {previousCollections.map((collection, idx) => (
              <div key={idx} className="group">
                <div className="aspect-[4/5] bg-bone overflow-hidden mb-6">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="eyebrow text-gold">{collection.year}</div>
                <h3 className="mt-2 font-display text-2xl">{collection.title}</h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{collection.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Back to Marketplace */}
      <Section className="border-t border-hairline">
        <Container>
          <Link to="/marketplace" className="eyebrow border-b border-ink pb-1 hover:text-gold hover:border-gold">
            ← Back to marketplace
          </Link>
        </Container>
      </Section>
    </SiteLayout>
  );
}