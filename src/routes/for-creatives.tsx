import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Container, Section, Eyebrow } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Testimonials } from "@/components/site/Testimonials";
import { PartnerLogos } from "@/components/site/PartnerLogos";
import studio from "@/assets/studio.jpg";

export const Route = createFileRoute("/for-creatives")({
  head: () => ({
    meta: [
      { title: "For Creatives — Adorzia" },
      { name: "description", content: "For emerging designers: join the Adorzia coworking studio, list your collection on our marketplace, and apply to the Spotlight programme." },
      { property: "og:title", content: "For Creatives — Adorzia" },
      { property: "og:description", content: "Studio, marketplace, and Spotlight — the resources emerging designers need to launch." },
      { property: "og:image", content: studio },
    ],
  }),
  component: ForCreatives,
});

function ForCreatives() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="For creatives"
        title={<>Build your brand<br/>in a house that<br/>backs makers.</>}
        subtitle="Three programmes, one ecosystem. Apply to the one that fits where you are."
        image={studio}
        imageAlt="The Adorzia coworking studio"
      />

      <Section className="border-b border-hairline">
        <Container>
          <div className="space-y-24">
            {[
              {
                eyebrow: "01 — Coworking studio",
                title: "A working atelier in the city",
                body: "Members get 24/7 access to sewing stations, dress forms, the fabric library, finishing tools, and photography corners. Monthly memberships, with day passes available.",
                bullets: ["Industrial sewing + serging", "Dress forms in all sizes", "Curated fabric library", "Lookbook photo corners", "Member-only workshops"],
                cta: { to: "/contact", label: "Enquire about membership" },
              },
              {
                eyebrow: "02 — Marketplace placement",
                title: "Your collection, beautifully presented",
                body: "Curated designers receive a permanent profile on adorzia.com — a digital showroom where collectors, buyers, and editors can discover your work. We handle the photography, the writing, and the placement.",
                bullets: ["Editorial profile + lookbook", "Collection and product showcase", "Inquiry routing direct to you", "Editorial features"],
                cta: { to: "/marketplace", label: "See the marketplace" },
              },
              {
                eyebrow: "03 — Spotlight programme",
                title: "The annual open call",
                body: "Once a year we invite designers worldwide to submit a collection for review. Winners receive cash, investment introductions, a year of free studio access, and a permanent marketplace placement.",
                bullets: ["Cash prizes", "Investor introductions", "Free studio access (12 months)", "Marketplace placement"],
                cta: { to: "/spotlight", label: "Apply to Spotlight" },
              },
            ].map((p, i) => (
              <div key={p.eyebrow} className="grid md:grid-cols-12 gap-10">
                <div className="md:col-span-5">
                  <Eyebrow>{p.eyebrow}</Eyebrow>
                  <h2 className="mt-4 font-display text-4xl md:text-5xl leading-[1.05]">{p.title}</h2>
                </div>
                <div className="md:col-span-7">
                  <p className="text-ink-soft leading-relaxed text-lg">{p.body}</p>
                  <ul className="mt-8 grid sm:grid-cols-2 gap-y-3 gap-x-8 text-sm">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-2 inline-block h-px w-4 bg-gold" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link to={p.cta.to} className="mt-10 inline-flex items-center border border-ink px-7 py-4 text-[11px] uppercase tracking-[0.28em] hover:bg-ink hover:text-cream transition-colors">
                    {p.cta.label}
                  </Link>
                </div>
                {i < 2 && <div className="md:col-span-12 hairline mt-8" />}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-b border-hairline bg-bone">
        <Container>
          <Testimonials
            eyebrow="From our designers"
            title="Built by makers, for makers."
            items={[
              { quote: "I joined as a graduate with one capsule. A year later I had a stocked marketplace profile and three real wholesale accounts.", name: "Adaeze N.", role: "Resident designer" },
              { quote: "The studio runs like a small couture house. I learned more in six months here than in three years freelancing.", name: "Felix Brandt", role: "Resident designer" },
              { quote: "Adorzia treats designers like founders, not interns. The difference is everywhere.", name: "Mira Hassan", role: "Marketplace designer" },
            ]}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <PartnerLogos eyebrow="Stockists & press" title="Where our designers have been seen." />
        </Container>
      </Section>
    </SiteLayout>
  );
}
