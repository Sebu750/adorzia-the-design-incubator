import { createFileRoute, Link } from "@tanstack/react-router";
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
      { title: "About Adorzia — Fashion Incubator & Designer Studio" },
      { name: "description", content: "Adorzia is a fashion incubator built to nurture the next generation of designers — a coworking studio, marketplace, and Spotlight programme under one roof." },
      { name: "keywords", content: "about adorzia, fashion incubator, designer studio, fashion education, emerging designers, fashion mentorship" },
      { property: "og:title", content: "About Adorzia — Fashion Incubator" },
      { property: "og:description", content: "A fashion incubator built to nurture the next generation of designers." },
      { property: "og:image", content: craft },
      { property: "og:url", content: "https://adorzia.com/about" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Adorzia — Fashion Incubator" },
      { name: "twitter:description", content: "A fashion incubator built to nurture the next generation of designers." },
      { rel: "canonical", href: "https://adorzia.com/about" } as never,
    ],
  }),
  component: About,
});

function About() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Reusable CSS Grid Line pattern matching brand codes
  const geometricStyles = {
    backgroundImage: `
      linear-gradient(30deg, #432818 12%, transparent 12.5%, transparent 87%, #432818 87.5%, #432818),
      linear-gradient(150deg, #432818 12%, transparent 12.5%, transparent 87%, #432818 87.5%, #432818),
      linear-gradient(30deg, #432818 12%, transparent 12.5%, transparent 87%, #432818 87.5%, #432818),
      linear-gradient(150deg, #432818 12%, transparent 12.5%, transparent 87%, #432818 87.5%, #432818),
      linear-gradient(60deg, rgba(153, 88, 42, 0.12) 25%, transparent 25.5%, transparent 75%, rgba(153, 88, 42, 0.12) 75.5%, rgba(153, 88, 42, 0.12)),
      linear-gradient(60deg, rgba(153, 88, 42, 0.12) 25%, transparent 25.5%, transparent 75%, rgba(153, 88, 42, 0.12) 75.5%, rgba(153, 88, 42, 0.12))
    `,
    backgroundSize: "80px 140px",
    backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px"
  };

  return (
    <SiteLayout>
     {/* --- HERO SECTION START --- */}
<section className="relative min-h-screen flex items-center overflow-hidden text-white">

  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <img
      src={craft}
      alt="Designer pinning fabric on a dress form"
      className="w-full h-full object-cover scale-105"
    />

    {/* Cinematic Overlay System */}
    <div className="absolute inset-0 bg-black/60" />
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(187,148,87,0.15),transparent_60%)]" />
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-5xl px-6 md:px-12 lg:px-20">

    <span className="inline-flex items-center gap-2 text-[#bb9457] uppercase tracking-[0.3em] text-xs font-semibold">
      <span className="w-2 h-2 bg-[#bb9457] rounded-full animate-pulse"></span>
      About Adorzia
    </span>

    <h1 className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-white tracking-tight">
      A house for those building<br />
      the houses of tomorrow.
    </h1>

    <p className="mt-6 max-w-2xl text-white/70 text-base md:text-lg leading-relaxed font-light">
      Adorzia exists to remove the barriers between vision and venture — between making a collection and building a brand.
    </p>

    <div className="mt-10 flex flex-wrap gap-4">

      <a
        href="/spotlight"
        className="px-8 py-3 bg-[#bb9457] text-black font-semibold uppercase tracking-[0.25em] text-xs rounded-full hover:bg-white hover:scale-105 transition-all duration-300"
      >
        Explore Spotlight
      </a>

      <a
        href="/marketplace"
        className="px-8 py-3 border border-[#bb9457] text-[#bb9457] font-semibold uppercase tracking-[0.25em] text-xs rounded-full hover:bg-[#bb9457] hover:text-black hover:scale-105 transition-all duration-300"
      >
        Enter Marketplace
      </a>

    </div>

  </div>

</section>
{/* --- HERO SECTION END --- */}

     {/* --- SECTION 1: THE MANIFESTO / FOUNDATION --- */}
<Section className="relative overflow-hidden border-b border-white/10 bg-black py-24 md:py-32 text-[#ffe6a7]">

  {/* Cinematic Background Image Layer */}
  <div className="absolute inset-0 z-0">
    <img
      src="/your-cinematic-image.jpg"
      alt=""
      className="w-full h-full object-cover opacity-40 scale-105"
    />

    {/* Premium Dark Overlays */}
    <div className="absolute inset-0 bg-black/70" />
    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(187,148,87,0.12),transparent_55%)]" />
  </div>

  {/* Existing Pattern Overlay */}
  <div className="absolute inset-0 opacity-[0.08] pointer-events-none z-10 mix-blend-screen">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="story-elegant-lines" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="#bb9457" strokeWidth="0.5" />
          <path d="M 40 6 L 74 40 L 40 74 L 6 40 Z" fill="none" stroke="#bb9457" strokeWidth="0.25" strokeOpacity="0.5" />
          <line x1="40" y1="0" x2="40" y2="80" stroke="#bb9457" strokeWidth="0.25" strokeOpacity="0.3" />
          <line x1="0" y1="40" x2="80" y2="40" stroke="#bb9457" strokeWidth="0.25" strokeOpacity="0.3" />
          <circle cx="40" cy="40" r="1" fill="#bb9457" opacity="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#story-elegant-lines)" />
    </svg>
  </div>

  {/* Glow Element */}
  <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-[#bb9457]/10 blur-[150px] rounded-full pointer-events-none z-10" />

  <Container className="relative z-20">
    <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start">

      <div className="md:col-span-4 flex flex-col items-start">
        <div className="inline-flex items-center gap-3 border border-white/10 bg-white/[0.03] backdrop-blur-md px-5 py-2 rounded-full shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#bb9457] animate-pulse" />
          <Eyebrow className="text-xs uppercase tracking-[0.25em] text-white font-medium">
            Our story
          </Eyebrow>
        </div>

        <div className="hidden md:block w-[1px] h-32 bg-gradient-to-b from-[#bb9457]/30 to-transparent mt-8 ml-5" />
      </div>

      <div className="md:col-span-8 space-y-8 text-[#ffe6a7]/80 leading-relaxed font-light text-base md:text-lg">
        <p className="font-display text-2xl md:text-4xl text-white leading-[1.25] tracking-wide font-normal border-l-2 border-[#bb9457]/40 pl-6 md:pl-8">
          Founded by a collective of software engineers, legacy operators, and textile specialists who refused to watch raw regional talent get lost between academic graduation and high-end market viability.
        </p>

        <div className="space-y-6 pl-6 md:pl-8">
          <p>
            Adorzia operates as a unified environment. Our members establish high-end production lineages directly beside one another inside specialized technical ateliers; launch curated visual lookbooks using our customized internal infrastructure; and scale via our continuous marketplace applications.
          </p>

          <p className="pt-2">
            We reject superficial styling trends. We construct{" "}
            <span className="text-[#bb9457] font-normal">
              independent structural ecosystem channels
            </span>
            —supplying the specialized machinery, legal venture frameworks, and global distribution pathways necessary to turn singular designers into generational fashion houses.
          </p>
        </div>
      </div>

    </div>
  </Container>
</Section>

      {/* --- SECTION 2: PROBLEM VS SOLUTION CRISIS BREAK --- */}
      <Section className="bg-white text-[#432818] border-b border-hairline py-24">
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
              { n: "01", t: "Craft Above All", b: "We believe in the slow practice of making things well. Patternmaking, draping, finishing — the discipline that separates an archival garment from disposable clothing." },
              { n: "02", t: "Distinct Dialects", b: "We back designers with an uncompromised structural perspective. We do not fund minor iterations of last season; we finance original independent brand languages." },
              { n: "03", t: "Sustainable Unit Economics", b: "Small capsule runs. Transparent vendor integrations. Real mathematical economics. A fiscal layout that ensures independent designers retain true equity ownership." },
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