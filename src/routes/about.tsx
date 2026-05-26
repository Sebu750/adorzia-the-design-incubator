import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Container, Section, Eyebrow } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import craft from "@/assets/craft.jpg";
import studio from "@/assets/studio.jpg";

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

      <Section>
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
    </SiteLayout>
  );
}
