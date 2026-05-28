import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { SiteLayout, Container, Section, Eyebrow } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { submitSpotlightApplication } from "@/lib/inquiries.functions";
import spotlight from "@/assets/spotlight.jpg";
import studio from "@/assets/studio.jpg";
import craft from "@/assets/craft.jpg";

export const Route = createFileRoute("/spotlight")({
  head: () => ({
    meta: [
      { title: "Adorzia Spotlight 2026 — The Emerging Designer Accelerator Launchpad" },
      { name: "description", content: "The premier platform manufacturing the next-generation fashion houses. Creative capital, sample production, global press execution, and permanent luxury marketplace placement." },
      { name: "keywords", content: "fashion accelerator, emerging designers, raw luxury, structural support, design infrastructure, fashion house manufacturing, adorzia spotlight 2026" },
      { property: "og:title", content: "Adorzia Spotlight 2026 — Apply Now" },
      { property: "og:description", content: "Dismantling barriers. Providing capital, technical infrastructure, and market insertion for exceptional voices." },
      { property: "og:image", content: spotlight },
      { property: "og:url", content: "https://adorzia.com/spotlight" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Adorzia Spotlight 2026 — Apply Now" },
      { name: "twitter:description", content: "Dismantling barriers. Providing capital, technical infrastructure, and market insertion." },
      { rel: "canonical", href: "https://adorzia.com/spotlight" } as never,
    ],
  }),
  component: Spotlight,
});

function Spotlight() {
  const submit = useServerFn(submitSpotlightApplication);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", brand_name: "", location: "", instagram: "", portfolio_url: "", concept_statement: "",
  });

  const m = useMutation({
    mutationFn: () => submit({ data: { ...form, lookbook_urls: [] } }),
    onSuccess: () => {
      toast.success("Application received into the archive. Expect evaluation updates via secure mail.");
      setForm({ name: "", email: "", phone: "", brand_name: "", location: "", instagram: "", portfolio_url: "", concept_statement: "" });
    },
    onError: (e: Error) => toast.error(e.message || "Submission vector blocked. Check network parameters."),
  });

  const [daysLeft, setDaysLeft] = useState(0);
  useEffect(() => {
    const target = new Date("2026-05-31T23:59:59").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;
      setDaysLeft(Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SiteLayout>
      {/* Structural Top Urgency Grid */}
      <div className="w-full bg-[#bb9457] text-black font-mono text-[10px] tracking-[0.3em] uppercase py-2.5 px-4 sticky top-0 z-50 flex justify-between items-center border-b border-black/10 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="inline-block w-2 h-2 rounded-full bg-black animate-pulse" />
          <span>Application Portfolio Dossier Open</span>
        </div>
        <div className="font-bold flex gap-4">
          <span>{daysLeft} Days Remaining</span>
          <button onClick={() => scrollToSection("apply-gateway")} className="underline hover:opacity-80 transition-opacity">Skip to Entry</button>
        </div>
      </div>

      <PageHero
        eyebrow="Spotlight 2026 — Engineering the Avant-Garde"
        title={<>Manufacturing<br/>the future of<br/>luxury houses.</>}
        subtitle="We do not award design talent. We build independent commercial infrastructure for the next generation of distinct fashion voices."
        image={spotlight}
        imageAlt="A model standing still under razor sharp industrial lighting, clad in high-contrast architectural drapery"
      />

     

      {/* 1. WHY SPOTLIGHT EXISTS — MANIFESTO SECTION */}
      <section id="manifesto" className="bg-black text-white border-b border-neutral-900 relative py-24">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <div className="text-[#bb9457]"><Eyebrow>Strategic Foundation</Eyebrow></div>
              <h2 className="mt-4 font-display text-3xl md:text-5xl uppercase tracking-tight leading-none text-white">
                The Structural <br /><span className="text-[#bb9457]">Impasse</span>
              </h2>
            </div>
            <div className="lg:col-span-8 font-light text-neutral-400 space-y-6 text-base md:text-lg leading-relaxed max-w-2xl">
              <p>
                Every year, exceptional design talent graduates with absolute vision from regional institutions, only to confront a fragmented system. Without industrial sample development pipelines, heritage craftsmanship integration, and a clear path to market, distinct creative capital is forced into commercial anonymity.
              </p>
              <p className="border-l border-[#bb9457] pl-6 text-neutral-200 font-serif italic">
                "Without access to industrial sample development, systemic supply chains, capital allocation, and a direct digital retail path, exceptional perspective is forced into stagnation or corporate anonymity."
              </p>
              <p>
                Adorzia created the Spotlight ecosystem to permanently dismantle this cycle. We do not operate a simple seasonal talent showcase or academic competition. We operate a highly structured commercial launchpad engineered to fund, produce, execute, and scale raw luxury houses into viable global market leaders.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* REWARDS SECTION */}
      <section id="rewards" className="relative overflow-hidden border-b border-gray-200 bg-white text-neutral-900 py-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src={craft} alt="" className="w-full h-full object-cover opacity-[0.04]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
        </div>
        
        {/* Subtle gold accent glow */}
        <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-[#bb9457]/8 blur-[140px] rounded-full pointer-events-none" />

        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-3 border border-gray-200 bg-white px-5 py-2 rounded-full shadow-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#bb9457] animate-pulse" />
              <div className="text-xs uppercase tracking-[0.25em] text-[#432818] font-medium"><Eyebrow>Systemic Resource Provision</Eyebrow></div>
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight uppercase text-[#432818]">
              Tangible Assets For
              <br />
              <span className="text-[#bb9457]">Unyielding Innovation</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                n: "300,000", 
                t: "Capital Liquidity", 
                b: "An equity-free, unrestricted cash grant deployed directly to support independent supply line development.",
                icon: "✦"
              },
              { 
                n: "Institutional", 
                t: "Investor Curations", 
                b: "Direct access panels with fashion-focused capital allocators, angel funds, and high-net-worth commercial patrons.",
                icon: "◈"
              },
              { 
                n: "12 Months", 
                t: "Atelier Sovereignty", 
                b: "Continuous access to the Adorzia industrial studio workspace, high-grade machinery, and digital design suites.",
                icon: "◉"
              },
              { 
                n: "Permanent", 
                t: "Marketplace Infrastructure", 
                b: "Full integration into the Adorzia digital retail ecosystem with zero initial technical listing or hosting overhead.",
                icon: "◆"
              },
            ].map((x) => (
              <div 
                key={x.t} 
                className="group relative p-10 rounded-3xl border border-gray-200 bg-white hover:border-[#bb9457]/40 hover:shadow-lg transition-all duration-300"
              >
                {/* Subtle corner accents */}
                <div className="absolute top-6 left-6 w-2 h-2 border-t border-l border-gray-200 group-hover:border-[#bb9457]/50 transition-colors" />
                <div className="absolute bottom-6 right-6 w-2 h-2 border-b border-r border-gray-200 group-hover:border-[#bb9457]/50 transition-colors" />
                
                <div className="relative z-10">
                  <div className="font-mono text-xs text-[#bb9457] mb-6 tracking-widest">{x.icon} SYSTEM</div>
                  <div className="font-display text-3xl text-[#432818] font-light tracking-tight group-hover:text-[#bb9457] transition-colors">
                    {x.n}
                  </div>
                  <h3 className="mt-2 font-display text-lg uppercase tracking-wide text-neutral-700">
                    {x.t}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed font-light">
                    {x.b}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 2. WHAT HAPPENS AFTER WINNING? — THE LIFECYCLE ACCELERATOR */}
      <section id="accelerator" className="border-b border-neutral-900 bg-black text-white py-24">
        <Container>
          <div className="max-w-3xl mb-16">
            <div className="text-[#bb9457]"><Eyebrow>Operational Continuum</Eyebrow></div>
            <h2 className="mt-4 font-display text-3xl md:text-5xl uppercase tracking-tight text-white">
              The Sustained Growth <span className="text-[#bb9457]">Framework</span>
            </h2>
            <p className="mt-4 text-neutral-400 text-sm md:text-base font-light">
              We do not present a prize and sever the connection. Winning Spotlight initiates a systematic, long-term commercial integration process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              {
                phase: "Phase 01",
                title: "Onboarding & DNA Blueprinting",
                duration: "Month 1",
                desc: "Translation of raw design language into structured technical specifications. Finalizing identity components, supply chain logistics, and core raw material architecture."
              },
              {
                phase: "Phase 02",
                title: "Industrial Sample Engineering",
                duration: "Months 2 — 3",
                desc: "Adorzia completely absorbs the financial overhead of sample production. Dedicated pattern makers, seamstresses, and heritage craftsmen construct the signature collection looks."
              },
              {
                phase: "Phase 03",
                title: "Global Press & Retail Deployment",
                duration: "Month 4 onward",
                desc: "High-resolution lookbook production, runway campaign editing, direct integration into our luxury digital storefront, and systematic presentation to luxury buyers."
              }
            ].map((p, idx) => (
              <div key={idx} className="border border-neutral-900 p-6 bg-neutral-950 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-baseline font-mono text-[10px] uppercase tracking-widest border-b border-neutral-900 pb-4 mb-6">
                    <span className="text-[#bb9457]">{p.phase}</span>
                    <span className="text-neutral-500">{p.duration}</span>
                  </div>
                  <h3 className="font-display text-xl uppercase tracking-wide text-white mb-4">{p.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">{p.desc}</p>
                </div>
                <div className="mt-8 h-[2px] bg-neutral-900 w-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-[#bb9457] w-1/3" style={{ transform: `translateX(${idx * 100}%)` }} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TRUE CAPITAL EQUITY */}
      <Section className="border-b border-gray-200 bg-white text-[#432818] relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src={studio} alt="" className="w-full h-full object-cover opacity-[0.03]" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/98 to-transparent" />
        </div>
        
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="text-[#bb9457]"><Eyebrow>True Capital Equity</Eyebrow></div>
              <h2 className="mt-4 font-display text-3xl md:text-5xl uppercase tracking-tight leading-none text-white">
                Deep Commercial <br/><span className="text-[#bb9457]">Investment</span>
              </h2>
              <p className="mt-6 text-neutral-400 text-sm font-light leading-relaxed">
                Our economic incentives are completely tied to your structural and commercial longevity as an independent label.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-6">
                {[
                  { title: "The Grand Prize Grant", desc: "The highest-performing designer receives an equity-free cash grant of PKR 300,000 to directly fund their independent brand requirements." },
                  { title: "100% Funded Sample Production", desc: "All 10 finalists bypass sample costs entirely. Adorzia fully covers raw material sourcing, pattern development, industrial labor, and logistics." },
                  { title: "Premium Invitation-Only Exposure", desc: "Present a finished capsule of 3–5 runway-quality looks to an exclusive audience of 200–300 curated VIPs, commercial buyers, media editors, and angel investors." },
                  { title: "The Content Suite", desc: "Walk away with fully formatted digital lookbooks, high-resolution runway photography/videography, behind-the-scenes production documentaries, and capsule storytelling content built for global press." },
                ].map((item) => (
                  <div key={item.title} className="border-t border-gray-200 pt-6 group hover:border-[#bb9457]/30 transition-colors">
                    <h3 className="font-display text-lg uppercase text-[#432818] group-hover:text-[#bb9457] transition-colors">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. VISUAL EVALUATION MATRIX SECTION */}
      <section id="matrix" className="border-b border-neutral-900 bg-black text-white py-24">
        <Container>
          <div className="max-w-3xl mb-16">
            <div className="text-[#bb9457]"><Eyebrow>Objective Calibration</Eyebrow></div>
            <h2 className="mt-4 font-display text-3xl md:text-5xl uppercase tracking-tight text-white">
              Evaluation & Weight <span className="text-[#bb9457]">Matrices</span>
            </h2>
            <p className="mt-4 text-neutral-400 text-sm font-light">
              To guarantee mathematical equity, portfolios are scored across five core operational metrics.
            </p>
          </div>

          <div className="overflow-x-auto border border-neutral-900">
            <table className="w-full text-left font-mono text-xs text-neutral-400">
              <thead className="bg-neutral-950 text-white border-b border-neutral-900 text-[10px] tracking-wider uppercase">
                <tr>
                  <th className="p-6">Evaluation Domain</th>
                  <th className="p-6 text-center">Weight</th>
                  <th className="p-6">Structural Target Parameters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {[
                  { domain: "Conceptual Originality", weight: "30%", desc: "Strength of visual narrative, clarity of form development, differentiation within the current global landscape." },
                  { domain: "Technical Execution Precision", weight: "25%", desc: "Pattern integrity, construction complexity, fabric manipulation awareness, textile structural performance." },
                  { domain: "Brand Longevity & Vision", weight: "20%", desc: "Strategic positioning, scalability of aesthetic codes, definition of target global demographic archetypes." },
                  { domain: "Commercial Market Viability", weight: "15%", desc: "Adaptability to physical production lines, margin health, wearable translation without compromising core ethos." },
                  { domain: "Authentic Heritage Integration", weight: "10%", desc: "Ethical interaction with artisan techniques (e.g., Kamdani, Ajrak) synthesized into global modern silhouettes." }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-neutral-950 transition-colors">
                    <td className="p-6 font-display text-sm text-white uppercase tracking-wider">{row.domain}</td>
                    <td className="p-6 text-center text-[#bb9457] font-bold text-sm">{row.weight}</td>
                    <td className="p-6 text-neutral-400 font-light leading-relaxed">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>
      
      {/* GOVERNANCE & EVALUATION */}
      <Section className="border-b border-gray-200 bg-[#fffcf7] text-[#432818] relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src={spotlight} alt="" className="w-full h-full object-cover opacity-[0.02]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#fffcf7] via-[#fffcf7]/98 to-white" />
        </div>
        
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="text-[#bb9457]"><Eyebrow>The Jury Ecosystem</Eyebrow></div>
              <h2 className="mt-4 font-display text-3xl md:text-5xl uppercase tracking-tight leading-none text-white">
                Governance & <br/><span className="text-[#bb9457]">Evaluation</span>
              </h2>
              <p className="mt-6 text-neutral-400 text-sm font-light leading-relaxed">
                The strategic selection framework for Fall 2026 is maintained by an uncompromised multi-disciplinary panel.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { title: "International Industry Representatives", desc: "Senior figures providing global market context from luxury houses, international publications, and global retail channels." },
                  { title: "Pakistani Design Leadership", desc: "Prominent established designers and top academic educators guiding technical and cultural execution." },
                  { title: "Retail & Commercial Operations Experts", desc: "Head buyers and corporate brand strategists scoring collections on immediate marketplace viability." },
                  { title: "Craft & Heritage Specialists", desc: "Scholars and preservation experts ensuring authentic, ethical interaction with local artisan communities." },
                ].map((item) => (
                  <div key={item.title} className="border-t border-gray-200 pt-6 group hover:border-[#bb9457]/30 transition-colors">
                    <h3 className="font-display text-base uppercase text-[#432818] group-hover:text-[#bb9457] transition-colors">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. THE SPOTLIGHT EXPERIENCE — CINEMATIC ENVIRONMENT DESCRIPTOR */}
      <section id="experience" className="border-b border-neutral-900 bg-black text-white relative py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-neutral-950 z-10" />
        <Container className="relative z-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="text-[#bb9457]"><Eyebrow>Sensory Atmosphere</Eyebrow></div>
              <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tighter text-white leading-none">
                The Live <br /><span className="text-[#bb9457]">Theater</span>
              </h2>
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                Spotlight culminates in a starkly curated physical showcase in mid-September. This is not an ordinary industrial trade show—it is an elevated spatial experience engineered to focus attention purely on technical form and narrative power.
              </p>
              <div className="space-y-4 font-mono text-[11px] text-neutral-300">
                <div className="flex items-center gap-3"><span className="text-[#bb9457]">■</span> Monochromatic Brutalist Runway Landscape</div>
                <div className="flex items-center gap-3"><span className="text-[#bb9457]">■</span> Real-Time Backstage Documentarian Archiving</div>
                <div className="flex items-center gap-3"><span className="text-[#bb9457]">■</span> Direct Engagement with 300+ Curated Global Stakeholders</div>
              </div>
            </div>
            <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-neutral-600">LIVE FEED ARCHIVE</div>
              <h3 className="font-serif italic text-2xl text-neutral-200 mb-6 max-w-lg">
                "The air is heavy with industrial scent, cold stone, and high-intensity structural lighting. Every stitch, texture variance, and architectural silhouette is exposed to sharp critique."
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                We foster an environment of creative tension where emerging fashion models execute precision choreography to highlight the raw reality of the textile forms. Your work is mounted as architecture.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. TOP 10 SYSTEMIC BENEFITS FOR ALL SHORTLISTED CANDIDATES */}
      <section className="border-b border-gray-200 bg-white text-[#432818] py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src={craft} alt="" className="w-full h-full object-cover opacity-[0.03]" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/97 to-white" />
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-3xl mb-16">
            <div className="text-[#bb9457]"><Eyebrow>The Candidate Premium</Eyebrow></div>
            <h2 className="mt-4 font-display text-3xl md:text-5xl uppercase tracking-tight text-white">
              The Comprehensive <span className="text-[#bb9457]">Shortlist Value</span>
            </h2>
            <p className="mt-4 text-neutral-400 text-sm font-light">
              We understand the computational psychology of applying: you expect zero returns unless you secure the apex rank. We engineered the ecosystem so that passing the initial selection stage fundamentally accelerates your operation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { idx: "01", title: "Marketplace Indexing", desc: "Immediate profile reservation and showcase privileges across our elite digital channels." },
              { idx: "02", title: "Jury Advisory Exposure", desc: "Direct, uncensored critique documentation from our global evaluation collective." },
              { idx: "03", title: "Asset Content Suite", desc: "Production of professional digital content assets, sketches, and casting captures." },
              { idx: "04", title: "Ecosystem Access", desc: "Automatic invitation criteria for ongoing Adorzia masterclasses and factory tours." },
              { idx: "05", title: "Industrial Network", desc: "Peer-to-peer alignment loops within our unified digital channels." },
              { idx: "06", title: "Material Access Pools", desc: "Pre-negotiated access paradigms with premium regional textile mills." },
              { idx: "07", title: "Atelier Affiliation", desc: "Subsidized allocation tiers for workspace use post-program." },
              { idx: "08", title: "Direct Investor Logs", desc: "Inclusion of your brand prospectus in the annual buyer briefing binder." },
              { idx: "09", title: "Media Placement Priority", desc: "Consideration across editorial features produced via our media channels." },
              { idx: "10", title: "Permanent Archive Allocation", desc: "An immortalized reference point within the digital directory of Pakistani design pioneers." },
            ].map((b) => (
              <div key={b.idx} className="border border-gray-200 p-6 bg-white flex flex-col justify-between hover:border-[#bb9457]/40 hover:shadow-md transition-all duration-300 rounded-2xl">
                <div className="font-mono text-xs text-[#bb9457] mb-4">{b.idx}</div>
                <div>
                  <h3 className="font-display text-sm uppercase tracking-wider text-[#432818] mb-2">{b.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ELIGIBILITY GATEWAY */}
      <section id="gatekeeping" className="border-b border-neutral-900 bg-black text-white py-24">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="text-[#bb9457]"><Eyebrow>Strict Meritocracy</Eyebrow></div>
              <h2 className="mt-4 font-display text-3xl md:text-5xl uppercase tracking-tight leading-none text-white">
                Application <br/><span className="text-[#bb9457]">Gateway</span>
              </h2>
              <p className="mt-6 text-neutral-400 text-sm font-light leading-relaxed">
                We have dismantled the traditional barriers of nepotism, institutional bureaucracy, and legacy capital constraints. If you possess an uncompromised creative thesis, you belong here.
              </p>
              
              {/* 6. WHO SHOULD NOT APPLY — POSITIONING PSYCHOLOGY */}
              <div className="mt-8 border border-red-950/40 bg-red-950/10 p-6 rounded-none">
                <h4 className="font-mono text-[10px] text-red-400 uppercase tracking-widest mb-2">⚠ Negative Evaluation Threshold</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                  Spotlight is <span className="text-neutral-200 font-medium">not built</span> for trend-replication labels, fast-fashion distributors, mass-market white-label catalog brands, or creators unwilling to engage in rigorous technical sample iteration. We focus exclusively on intentional design infrastructure.
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "Final-Year Fashion Students: Visionaries completing thesis or graduation collections who require an immediate runway-to-market commercial launchpad.",
                    "Recent Fashion Alumni: Graduates (within 5 years) looking to establish independent commercial labels with structured corporate backing.",
                    "Independent & Self-Taught Talents: Maverick creators across Pakistan possessing an original visual signature and technical grit.",
                    "Existing Micro-Brands: Fashion entrepreneurs running small operations who are prepared to scale production and reach new audiences.",
                  ].map((text) => (
                    <div key={text.slice(0, 30)} className="border-t border-neutral-900 pt-6">
                      <p className="text-xs text-neutral-400 leading-relaxed font-light">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TIMELINE */}
      <section className="border-b border-gray-200 bg-[#fffcf7] text-[#432818] py-24">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4"><div className="text-[#bb9457]"><Eyebrow>The Cadence Roadmap</Eyebrow></div></div>
            <div className="lg:col-span-8">
              <ol className="space-y-6">
                {[
                  ["Applications Window Open", "Now — May 31, 2026"],
                  ["Jury Evaluation Protocol", "June 2026"],
                  ["The Selection Slate Announced", "Early July 2026"],
                  ["Runway Finale Showcase + Apex Selection", "September 14, 2026"],
                ].map(([t, d]) => (
                  <li key={t} className="grid grid-cols-12 items-baseline gap-6 border-b border-gray-200 pb-6 group hover:border-[#bb9457]/30 transition-colors">
                    <div className="col-span-7 font-display text-xl uppercase tracking-wide text-[#432818] group-hover:text-[#bb9457] transition-colors">{t}</div>
                    <div className="col-span-5 text-right font-mono text-xs text-[#bb9457]">{d}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>
      
      {/* 7. FAQ SECTION */}
      <section id="faq" className="border-b border-neutral-900 bg-black text-white py-24">
        <Container>
          <div className="max-w-3xl mb-16">
            <div className="text-[#bb9457]"><Eyebrow>Operational Protocols</Eyebrow></div>
            <h2 className="mt-4 font-display text-3xl md:text-5xl uppercase tracking-tight text-white">
              Frequently Asked <span className="text-[#bb9457]">Queries</span>
            </h2>
          </div>

          <div className="max-w-4xl space-y-4">
            {[
              { q: "Is there an application fee required for verification?", a: "No. Adorzia enforces an absolute meritocracy. There are zero entry fees or processing costs at any stage of submission." },
              { q: "Can current final-semester design students submit portfolios?", a: "Yes. Visionaries in their final semester completing thesis collections are highly encouraged to apply to construct a direct commercial trajectory upon graduation." },
              { q: "Do I need to possess an entirely completed physical collection to apply?", a: "No. You may submit coherent structural digital renders, detailed creative design illustrations, technical packages, or samples from prior single-look prototypes." },
              { q: "Who retains ownership of Intellectual Property and design patterns?", a: "The designer maintains 100% intellectual property ownership. Adorzia secures exclusive promotional rights and rights of first refusal for ongoing manufacturing partnerships, governed strictly by transparent legal agreements." },
              { q: "Are collaborative design teams or duos eligible to submit unified applications?", a: "Yes. Multi-disciplinary design alliances may submit a combined portfolio. The structural capital distribution and access parameters remain fixed per entry." }
            ].map((faq, index) => (
              <div key={index} className="border border-neutral-900 bg-neutral-950/50">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center text-sm uppercase tracking-wide font-display text-white hover:text-[#bb9457] transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="font-mono text-base text-[#bb9457]">{activeFaq === index ? "−" : "+"}</span>
                </button>
                {activeFaq === index && (
                  <div className="p-6 pt-0 border-t border-neutral-900 font-mono text-xs text-neutral-400 leading-relaxed font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. LEGAL & TRANSPARENCY NOTICE */}
      <Section className="bg-[#fffcf7] text-gray-600 border-b border-gray-200 py-12 font-mono text-[10px] tracking-wide leading-relaxed">
        <Container>
          <div className="max-w-4xl border-l border-neutral-800 pl-6 space-y-2">
            <p className="text-neutral-400 uppercase font-bold text-[11px] tracking-widest text-[#bb9457]">Regulatory Intellectual Protocol</p>
            <p>All submission vectors are evaluated anonymously across initial screening arrays. Adorzia guarantees that no creative concepts, structural sketches, or text formulations submitted within this interface will be duplicated, distributed, or commercialized outside the explicit perimeter of the Spotlight accelerator program context.</p>
            <p>Finalists selected for physical sample production will enter into a formalized, clear Strategic Advisory Agreement guaranteeing complete IP preservation to the originating creator.</p>
          </div>
        </Container>
      </Section>

      {/* APPLICATION ENTRY FORM */}
      <section id="apply-gateway" className="border-t border-neutral-900 bg-black text-white py-24">
        <Container>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="text-[#bb9457]"><Eyebrow>Ecosystem Entry</Eyebrow></div>
              <h2 className="mt-4 font-display text-3xl md:text-5xl uppercase tracking-tight text-white">
                Initiate <br/>Submission.
              </h2>
              <p className="mt-6 text-neutral-400 text-sm font-light leading-relaxed">
                Provide comprehensive data regarding your current creative direction. Every dossier is scrutinized with meticulous technical focus.
              </p>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); m.mutate(); }}
              className="lg:col-span-8 space-y-8 bg-neutral-950 p-8 border border-neutral-900"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <F label="Legal Full Name" v={form.name} on={(v) => setForm({ ...form, name: v })} required />
                <F label="Secure Communication Email" type="email" v={form.email} on={(v) => setForm({ ...form, email: v })} required />
                <F label="Brand / Label Identity" v={form.brand_name} on={(v) => setForm({ ...form, brand_name: v })} />
                <F label="Operational Headquarters Location" v={form.location} on={(v) => setForm({ ...form, location: v })} />
                <F label="Digital Archive / Instagram Handle" v={form.instagram} on={(v) => setForm({ ...form, instagram: v })} />
                <F label="Active Portfolio / Dossier URL" v={form.portfolio_url} on={(v) => setForm({ ...form, portfolio_url: v })} />
                <F label="Primary Communication Node (Optional)" v={form.phone} on={(v) => setForm({ ...form, phone: v })} />
              </div>
              <div className="border-t border-neutral-900 pt-6">
                <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 block mb-3">Concept Manifesto Statement (Minimum 50 words required)</label>
                <textarea
                  required
                  rows={6}
                  value={form.concept_statement}
                  onChange={(e) => setForm({ ...form, concept_statement: e.target.value })}
                  placeholder="Articulate the structural vision, structural aesthetics, cultural references, and systemic motivations defining your brand's core visual architecture..."
                  className="w-full border border-neutral-900 bg-black text-white text-xs font-mono p-4 outline-none focus:border-[#bb9457] resize-none placeholder:text-neutral-700"
                />
              </div>
              <button
                disabled={m.isPending}
                className="w-full md:w-auto inline-flex items-center justify-center border border-[#bb9457] bg-[#bb9457] text-black px-8 py-4 text-[11px] font-mono uppercase tracking-[0.25em] font-bold hover:bg-transparent hover:text-[#bb9457] transition-all disabled:opacity-30"
              >
                {m.isPending ? "Transmitting Dossier…" : "Transmit Application Profile"}
              </button>
            </form>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}

function F({ label, v, on, type = "text", required }: { label: string; v: string; on: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">{label}</label>
      <input 
        type={type} 
        required={required} 
        value={v} 
        onChange={(e) => on(e.target.value)} 
        className="w-full border border-neutral-900 bg-black text-white font-mono text-xs p-3 outline-none focus:border-[#bb9457] transition-colors" 
      />
    </div>
  );
}