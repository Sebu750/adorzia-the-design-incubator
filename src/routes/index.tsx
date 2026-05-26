import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout, Container, Section, Eyebrow } from "@/components/site/SiteLayout";
import {
  getSiteSettings,
  listFeaturedDesigners,
} from "@/lib/public-data.functions";
import heroHome from "@/assets/hero-home.jpg";
import studio from "@/assets/studio.jpg";
import spotlight from "@/assets/spotlight.jpg";
import craft from "@/assets/craft.jpg";
import d1 from "@/assets/designer-1.jpg";
import d2 from "@/assets/designer-2.jpg";
import d3 from "@/assets/designer-3.jpg";

const settingsQO = queryOptions({
  queryKey: ["site_settings"],
  queryFn: () => getSiteSettings(),
});
const featuredQO = queryOptions({
  queryKey: ["designers", "featured"],
  queryFn: () => listFeaturedDesigners(),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Adorzia — Fashion Incubation & Creative Entrepreneurship" },
      {
        name: "description",
        content:
          "Adorzia is a fashion incubator: coworking studio, curated marketplace, and global Spotlight programme for emerging designers.",
      },
      { property: "og:title", content: "Adorzia — Where emerging designers become houses" },
      {
        property: "og:description",
        content: "Studio. Marketplace. Spotlight. Built for the next generation of fashion.",
      },
      { property: "og:image", content: heroHome },
      { rel: "canonical", href: "/" } as never,
    ],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(settingsQO),
      context.queryClient.ensureQueryData(featuredQO),
    ]),
  component: Home,
});

const FALLBACK_DESIGNERS = [
  { id: "f1", slug: "atelier-noir", name: "Atelier Noir", tagline: "Tailored couture, Paris", portrait_url: d1, cover_url: d1, location: "Paris" },
  { id: "f2", slug: "house-of-vellum", name: "House of Vellum", tagline: "Sculptural menswear", portrait_url: d2, cover_url: d2, location: "Milan" },
  { id: "f3", slug: "studio-iris", name: "Studio Iris", tagline: "Avant-garde drapery", portrait_url: d3, cover_url: d3, location: "London" },
] as const;

function Home() {
  const settings = useSuspenseQuery(settingsQO).data;
  const featured = useSuspenseQuery(featuredQO).data;
  const designers = featured.length ? featured : FALLBACK_DESIGNERS;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="border-b border-hairline">
        <Container className="grid lg:grid-cols-12 gap-12 lg:gap-20 py-16 lg:py-28 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <Eyebrow>{settings?.hero_eyebrow ?? "Fashion incubation studio"}</Eyebrow>
            <h1 className="mt-8 font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.98] tracking-[-0.02em]">
              {settings?.hero_title ?? "Where emerging designers become the houses of tomorrow."}
            </h1>
            <p className="mt-8 max-w-xl text-base md:text-lg text-ink-soft leading-relaxed">
              {settings?.hero_subtitle ??
                "Adorzia is a coworking studio, a curated marketplace, and a global Spotlight — built for the next generation of fashion."}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/spotlight"
                className="inline-flex items-center border border-ink bg-ink text-cream px-7 py-4 text-[11px] uppercase tracking-[0.28em] hover:bg-cream hover:text-ink transition-colors"
              >
                Apply to Spotlight
              </Link>
              <Link
                to="/marketplace"
                className="inline-flex items-center border border-ink px-7 py-4 text-[11px] uppercase tracking-[0.28em] hover:bg-ink hover:text-cream transition-colors"
              >
                Discover the Marketplace
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="aspect-[3/4] overflow-hidden bg-bone">
              <img src={heroHome} alt="Editorial fashion portrait" className="h-full w-full object-cover" />
            </div>
          </div>
        </Container>
      </section>

      {/* Mission strip */}
      <Section className="border-b border-hairline">
        <Container>
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4"><Eyebrow>The Adorzia philosophy</Eyebrow></div>
            <p className="md:col-span-8 font-display text-2xl md:text-4xl leading-[1.25] tracking-[-0.01em]">
              We believe the future of fashion belongs to the makers — those willing to challenge convention,
              build a vocabulary of their own, and operate as both artist and entrepreneur.
            </p>
          </div>
        </Container>
      </Section>

      {/* Three pillars */}
      <Section className="border-b border-hairline">
        <Container>
          <div className="flex items-end justify-between mb-16">
            <Eyebrow>Three pillars</Eyebrow>
            <div className="hidden md:block font-display text-3xl">A complete ecosystem</div>
          </div>
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {[
              { img: studio, eyebrow: "01 — Studio", title: "Fashion Coworking", body: "A working atelier with mannequins, sewing stations, fabric library, and shared resources for emerging brands.", to: "/for-creatives" },
              { img: craft, eyebrow: "02 — Marketplace", title: "Curated Commerce", body: "A digital showroom for our designers — profiles, collections, and signature pieces presented with editorial care.", to: "/marketplace" },
              { img: spotlight, eyebrow: "03 — Spotlight", title: "Annual Programme", body: "Submit your collection. Compete for cash prizes, investment, free studio time, and a marketplace placement.", to: "/spotlight" },
            ].map((p) => (
              <Link key={p.title} to={p.to} className="group">
                <div className="aspect-[4/5] overflow-hidden bg-bone mb-6">
                  <img src={p.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <Eyebrow>{p.eyebrow}</Eyebrow>
                <h3 className="mt-4 font-display text-3xl">{p.title}</h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{p.body}</p>
                <div className="mt-5 text-[11px] uppercase tracking-[0.28em] border-b border-ink inline-block pb-1 group-hover:text-gold group-hover:border-gold transition-colors">Discover →</div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured designers */}
      <Section className="border-b border-hairline">
        <Container>
          <div className="flex items-end justify-between mb-16">
            <div>
              <Eyebrow>Featured designers</Eyebrow>
              <h2 className="mt-4 font-display text-4xl md:text-5xl">From our marketplace</h2>
            </div>
            <Link to="/marketplace" className="hidden md:inline-block text-[11px] uppercase tracking-[0.28em] border-b border-ink pb-1 hover:text-gold hover:border-gold">View all</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {designers.slice(0, 3).map((d) => (
              <Link key={d.id} to="/marketplace/$slug" params={{ slug: d.slug }} className="group">
                <div className="aspect-[3/4] overflow-hidden bg-bone">
                  <img src={d.portrait_url || d.cover_url || d1} alt={d.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <div>
                    <h3 className="font-display text-2xl">{d.name}</h3>
                    {d.tagline && <p className="text-xs text-ink-soft mt-1">{d.tagline}</p>}
                  </div>
                  {d.location && <span className="eyebrow">{d.location}</span>}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Spotlight CTA */}
      <Section className="bg-bone">
        <Container>
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <Eyebrow>Spotlight 2026 — applications open</Eyebrow>
              <h2 className="mt-6 font-display text-4xl md:text-6xl leading-[1.05]">
                Submit your collection.<br/>Be discovered.
              </h2>
              <p className="mt-6 max-w-xl text-ink-soft">
                Our jury reviews every submission. Winners receive cash prizes, investment introductions,
                a year of free studio access, and a permanent marketplace placement.
              </p>
              <Link to="/spotlight" className="mt-8 inline-flex items-center border border-ink bg-ink text-cream px-7 py-4 text-[11px] uppercase tracking-[0.28em] hover:bg-cream hover:text-ink transition-colors">
                Apply now
              </Link>
            </div>
            <div className="md:col-span-5">
              <img src={spotlight} alt="" loading="lazy" className="w-full aspect-[4/5] object-cover" />
            </div>
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
}
