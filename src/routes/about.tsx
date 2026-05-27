import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Container, Section, Eyebrow } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { TeamGrid } from "@/components/site/TeamGrid";
import { PartnerLogos } from "@/components/site/PartnerLogos";
import { Testimonials } from "@/components/site/Testimonials";
import craft from "@/assets/craft.jpg";
import studio from "@/assets/studio.jpg";
import d1 from "@/assets/designer-1.jpg";
import d2 from "@/assets/designer-2.jpg";
import d3 from "@/assets/designer-3.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Adorzia" },
      { name: "description", content: "Adorzia is a fashion incubator built to nurture the next generation of designers — a coworking studio, marketplace, and Spotlight programme under one roof." },
      { property: "og:title", content: "About Adorzia" },
      { property: "og:description", content: "A fashion incubator built to nurture the next generation of designers." },
      { property: "og:image", content: craft },
    ],
  }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Adorzia"
        title={<>A house for those building<br/>the houses of tomorrow.</>}
        subtitle="Adorzia exists to remove the barriers between vision and venture — between making a collection and building a brand."
        image={craft}
        imageAlt="Designer pinning fabric on a dress form"
      />

      <Section className="border-b border-hairline">
        <Container>
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4"><Eyebrow>Our story</Eyebrow></div>
            <div className="md:col-span-8 space-y-6 text-ink-soft leading-relaxed">
              <p className="font-display text-2xl md:text-3xl text-ink leading-[1.3]">
                Founded by a collective of designers, gallerists, and operators who watched too much talent get lost between graduation and a first proper collection.
              </p>
              <p>
                Adorzia is part workshop, part gallery, part business school. Our members work alongside one another in a shared atelier in the city; their collections are presented through our marketplace; and once a year, the most distinct voices among them — and from across the world — are recognised through Spotlight.
              </p>
              <p>
                We are not a label. We are infrastructure for labels — the resources, the audience, and the capital that emerging creatives need to take their work seriously and have it taken seriously.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Founder */}
      <Section className="border-b border-hairline bg-bone">
        <Container>
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <div className="aspect-[4/5] overflow-hidden bg-background">
                <img src={d1} alt="Founder portrait" loading="lazy" className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="md:col-span-7">
              <Eyebrow>Founder's note</Eyebrow>
              <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.05]">
                "Talent is everywhere. Infrastructure is not."
              </h2>
              <p className="mt-6 text-ink-soft leading-relaxed">
                I started Adorzia after a decade of working alongside designers who could imagine extraordinary
                things and were stopped by ordinary ones — patternmakers, photography, the price of fabric,
                the first investor meeting. Our promise is simple: a serious studio, a serious audience, and
                serious capital, all in one place.
              </p>
              <div className="mt-8">
                <div className="font-display text-2xl">Imani Okafor</div>
                <div className="eyebrow mt-1 text-gold">Founder &amp; Creative Director</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Core team */}
      <Section className="border-b border-hairline">
        <Container>
          <TeamGrid
            eyebrow="Core team"
            title="The people behind the house."
            intro="An operating team drawn from couture, retail, publishing, and venture — building the support system designers actually need."
            columns={3}
            members={[
              { name: "Imani Okafor", role: "Founder & Creative Director", image: d1, bio: "Formerly atelier director at a Paris couture house. Saint Martins alum." },
              { name: "Léo Marchetti", role: "Head of Studio", image: d2, bio: "Twenty years building production workflows for independent designers across Milan and London." },
              { name: "Saskia Hen", role: "Head of Curation", image: d3, bio: "Ex-buyer and gallerist. Curates the marketplace and Spotlight shortlist." },
              { name: "Noor Bakri", role: "Head of Partnerships", initials: "NB", bio: "Builds Adorzia's brand collaborations and corporate sponsorship programme." },
              { name: "Daniela Roux", role: "Head of Investment", initials: "DR", bio: "Connects designers with mission-aligned capital and revenue-share investors." },
              { name: "Theo Park", role: "Editorial Director", initials: "TP", bio: "Leads photography, lookbooks, and the Adorzia editorial voice across channels." },
            ]}
          />
        </Container>
      </Section>

      {/* Advisory board */}
      <Section className="border-b border-hairline">
        <Container>
          <TeamGrid
            eyebrow="Advisory board"
            title="Quiet counsel from across the industry."
            columns={4}
            members={[
              { name: "Hiroshi Tanabe", role: "Couturier, Tokyo", initials: "HT" },
              { name: "Mara Eliasson", role: "Retail Strategist", initials: "ME" },
              { name: "Olu Adebayo", role: "Venture Partner, Lagos", initials: "OA" },
              { name: "Catherine Vey", role: "Editor-in-Chief, Vey Quarterly", initials: "CV" },
              { name: "Rohan Mehta", role: "Textile Innovation, Mumbai", initials: "RM" },
              { name: "Anaïs Gallien", role: "Sustainability Counsel", initials: "AG" },
              { name: "Bruno Costa", role: "Production, São Paulo", initials: "BC" },
              { name: "Yuna Sato", role: "PR & Communications", initials: "YS" },
            ]}
          />
        </Container>
      </Section>

      <Section className="border-b border-hairline">
        <Container>
          <Eyebrow>Our values</Eyebrow>
          <div className="mt-12 grid md:grid-cols-3 gap-12">
            {[
              { n: "01", t: "Craft above all", b: "We believe in the slow practice of making things well. Patternmaking, draping, finishing — the discipline that separates a garment from clothing." },
              { n: "02", t: "Distinct voices", b: "We back designers with a perspective. Not the next iteration of last season — the start of something." },
              { n: "03", t: "Sustainable practice", b: "Small runs. Considered materials. Real economics. A model that respects the people and the planet behind every stitch." },
            ].map((v) => (
              <div key={v.n}>
                <div className="font-display text-5xl text-gold">{v.n}</div>
                <h3 className="mt-4 font-display text-2xl">{v.t}</h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{v.b}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-b border-hairline">
        <Container>
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-5">
              <img src={studio} alt="The Adorzia studio" loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </div>
            <div className="md:col-span-7">
              <Eyebrow>The studio</Eyebrow>
              <h2 className="mt-6 font-display text-4xl md:text-5xl">A working atelier, not a co-working desk.</h2>
              <p className="mt-6 text-ink-soft leading-relaxed">
                Our space is built for makers — industrial sewing stations, a full fabric library, dress forms for every body, a finishing room, and dedicated photography corners for lookbooks. Open to members 24/7, with private workshops and salons throughout the year.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-b border-hairline">
        <Container>
          <Testimonials
            eyebrow="In their words"
            title="What designers say about Adorzia."
            items={[
              { quote: "Adorzia gave my first collection a stage and the discipline to finish it. The studio runs like a small couture house.", name: "Adaeze N.", role: "Spotlight 2024 Winner" },
              { quote: "The introductions Adorzia made changed the trajectory of my brand. Real buyers, real editors, real capital.", name: "Tomás Vinheiro", role: "Marketplace designer" },
              { quote: "It is the closest thing to an MFA I've taken without paying tuition — except the critique comes from the industry itself.", name: "Mira Hassan", role: "Resident designer" },
            ]}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <PartnerLogos />
        </Container>
      </Section>
    </SiteLayout>
  );
}
