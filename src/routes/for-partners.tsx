import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout, Container, Section, Eyebrow } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { submitPartnerInquiry } from "@/lib/inquiries.functions";
import spotlight from "@/assets/spotlight.jpg";
import lahore from "@/assets/studio.jpg";
import islamabad from "@/assets/studio.jpg";
import karachi from "@/assets/studio.jpg";

export const Route = createFileRoute("/for-partners")({
  head: () => ({
    meta: [
      { title: "For Partners — Sponsor & Invest in Emerging Fashion Designers" },
      { name: "description", content: "Sponsorship, investment, and brand collaboration with Adorzia — supporting the next generation of fashion houses." },
      { name: "keywords", content: "fashion partnership, sponsor designers, fashion investment, brand collaboration, fashion incubator partnership" },
      { property: "og:title", content: "For Partners — Adorzia" },
      { property: "og:description", content: "Sponsor, invest, or collaborate with the next generation of fashion houses." },
      { property: "og:image", content: spotlight },
      { property: "og:url", content: "https://adorzia.com/for-partners" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "For Partners — Adorzia" },
      { rel: "canonical", href: "https://adorzia.com/for-partners" } as never,
    ],
  }),
  component: ForPartners,
});

function ForPartners() {
  const submit = useServerFn(submitPartnerInquiry);
  const [form, setForm] = useState({
    company: "",
    contact_name: "",
    email: "",
    phone: "",
    interest_type: "Sponsorship",
    message: "",
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const m = useMutation({
    mutationFn: () => submit({ data: form }),
    onSuccess: () => {
      toast.success("Inquiry sent. We'll respond within 3 business days.");
      setForm({ company: "", contact_name: "", email: "", phone: "", interest_type: "Sponsorship", message: "" });
    },
    onError: (e: Error) => toast.error(e.message || "Could not submit"),
  });

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
      <PageHero
        eyebrow="For partners"
        title={<>Sponsor, invest,<br/>or build with the<br/>next generation.</>}
        subtitle="Adorzia partners with brands, foundations, and investors who want to shape the future of independent fashion infrastructure — not just spectate it."
        image={spotlight}
        imageAlt="The Spotlight runway"
      />

      {/* --- SECTION 1: SYSTEMIC MANIFESTO --- */}
      <Section className="bg-white text-[#432818] py-24 border-b border-hairline">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
              <div className="text-[#99582a]"><Eyebrow>The Macro Thesis</Eyebrow></div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight font-light text-[#432818]">Why Fashion Infrastructure Matters</h2>
              <div className="w-16 h-px bg-[#6f1d1b]/30 pt-4" />
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg md:text-xl text-[#432818]/90 font-light leading-relaxed border-l-2 border-[#6f1d1b] pl-6 md:pl-8">
                Pakistan stands as one of the largest global textile economies, yet thousands of exceptional fashion design graduates vanish from the market every year due to a complete absence of structural support. Adorzia bridges raw talent with elite commercial execution, converting individual design vision into independent, scalable fashion houses.
              </p>
            </div>
          </div>
        </Container>
      </Section>

     {/* =========================
   SECTION 2 START: WAYS TO PARTNER MATRIX
========================= */}
<Section className="relative overflow-hidden border-b border-gray-100 bg-white py-28 md:py-36">

  {/* Background Image Layer */}
  <div className="absolute inset-0">
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 opacity-60" />
    <div className="absolute inset-0 bg-white/80" />
  </div>

  {/* Soft accent glow */}
  <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-[#bb9457]/10 blur-[140px] rounded-full pointer-events-none" />

  <Container className="relative z-10">

    {/* Header */}
    <div className="flex flex-col items-center text-center mb-20">

      <div className="inline-flex items-center gap-3 border border-gray-200 bg-white px-5 py-2 rounded-full shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#bb9457] animate-pulse" />
        <div className="text-xs uppercase tracking-[0.25em] text-[#432818] font-medium"><Eyebrow>Ways to Partner</Eyebrow></div>
      </div>

      <h2 className="font-display text-4xl md:text-6xl text-[#432818] mt-6 leading-[1.05] font-light">
        Strategic Collaboration Models
      </h2>

      <p className="mt-5 text-sm text-gray-500 max-w-xl leading-relaxed">
        Structured entry points for institutions, investors, and brands to participate in Pakistan’s emerging fashion infrastructure.
      </p>

    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-3 gap-10">

      {[
        {
          t: "Sponsorship",
          b: "Underwrite Spotlight runways, atelier infrastructure, and category funding. Gain integration across editorial showcases and launch platforms."
        },
        {
          t: "Investment",
          b: "Access curated design pipelines, structured revenue-share opportunities, and early-stage equity participation in emerging labels."
        },
        {
          t: "Brand Collaboration",
          b: "Co-create capsule collections with resident designers through textile residencies, production access, and editorial campaigns."
        }
      ].map((p) => (
        <div
          key={p.t}
          className="group relative p-10 rounded-3xl border border-gray-200 bg-white hover:border-[#bb9457]/40 hover:shadow-sm transition-all duration-300"
        >

          {/* subtle corner accent */}
          <div className="absolute top-6 left-6 w-2 h-2 border-t border-l border-gray-200 group-hover:border-[#bb9457]/50 transition-colors" />
          <div className="absolute bottom-6 right-6 w-2 h-2 border-b border-r border-gray-200 group-hover:border-[#bb9457]/50 transition-colors" />

          <h3 className="font-display text-2xl md:text-3xl text-[#432818] font-light group-hover:text-[#bb9457] transition-colors">
            {p.t}
          </h3>

          <p className="mt-5 text-sm text-gray-600 leading-relaxed font-light">
            {p.b}
          </p>

        </div>
      ))}

    </div>

  </Container>
</Section>

{/* =========================
   SECTION 2 END
========================= */}
     {/* =========================
   SECTION 3 START: SPONSORSHIP DIRECT BENEFITS
========================= */}
<Section className="bg-white text-[#1a1a1a] py-28 border-b border-gray-100">

  <Container>

    {/* Header */}
    <div className="text-center max-w-2xl mx-auto mb-16">

      <div className="text-[#bb9457] tracking-[0.25em]"><Eyebrow>Sponsor Architecture</Eyebrow></div>

      <h2 className="font-display text-4xl md:text-5xl text-[#432818] font-light mt-3 leading-[1.1]">
        Measurable Strategic Returns
      </h2>

      <p className="mt-5 text-sm text-gray-500 leading-relaxed">
        A structured sponsorship model designed to generate cultural, commercial, and long-term brand equity outcomes.
      </p>

    </div>

    {/* Grid */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

      {[
        {
          t: "Pre-Market Scouting",
          d: "Early access to curated designer capsules before public launch, enabling strategic collaboration and exclusive rights positioning.",
          meta: "Early-stage advantage"
        },
        {
          t: "Multi-Node Visibility",
          d: "Integrated presence across Lahore, Islamabad, and Karachi studio ecosystems for continuous brand exposure.",
          meta: "Physical + digital reach"
        },
        {
          t: "Cultural Leadership",
          d: "Association with preservation and modernization of regional craftsmanship within globally relevant fashion systems.",
          meta: "Heritage alignment"
        },
        {
          t: "Content Co-Creation",
          d: "Direct participation in editorial production pipelines including campaigns, lookbooks, and visual storytelling assets.",
          meta: "Creative production access"
        },
        {
          t: "Targeted Audience Reach",
          d: "Direct access to high-value fashion consumers including collectors, stylists, and emerging luxury buyers.",
          meta: "Commercial exposure"
        },
        {
          t: "Sustained CSR Alignment",
          d: "Verifiable social impact through funding zero-upfront creative infrastructure for emerging designers.",
          meta: "Impact-driven investment"
        }
      ].map((ben, idx) => (
        <div
          key={idx}
          className="p-8 border border-gray-200 rounded-2xl bg-white hover:border-[#bb9457]/40 hover:shadow-sm transition-all duration-300"
        >

          {/* small accent */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bb9457]" />
            <span className="text-[10px] uppercase tracking-widest text-gray-400">
              {ben.meta}
            </span>
          </div>

          <h4 className="font-display text-xl text-[#432818] font-medium mb-3">
            {ben.t}
          </h4>

          <p className="text-sm text-gray-600 leading-relaxed font-light">
            {ben.d}
          </p>

        </div>
      ))}

    </div>

  </Container>
</Section>

{/* =========================
   SECTION 3 END
========================= */}

      {/* --- SECTION 4: PARTNERSHIP GEOGRAPHIC GRID NODE VISUALS --- */}
      <Section className="bg-[#432818] text-white py-24 border-b border-white/10">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="text-[#bb9457]"><Eyebrow>Ecosystem Distribution</Eyebrow></div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#ffe6a7] mt-2">Active Multi-Regional Infrastructure</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { node: "Lahore Node Ateliers", img: lahore, desc: "Sponsor direct workspace expansions in Punjab's primary cultural core." },
              { node: "Islamabad Node Hubs", img: islamabad, desc: "Underwrite creative innovation channels and student digital classrooms." },
              { node: "Karachi Node Facilities", img: karachi, desc: "Connect with large-scale heavy prototyping and shipping environments." }
            ].map((node, i) => (
              <div key={i} className="group overflow-hidden rounded-3xl bg-white/[0.02] border border-white/10 transition-colors duration-500 hover:border-[#bb9457]/30">
                <div className="aspect-[4/3] overflow-hidden bg-black/20 relative">
                  <img 
                    src={node.img} 
                    alt={node.node}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#432818] via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-6 space-y-2">
                  <h4 className="font-display text-xl text-[#ffe6a7] font-light">{node.node}</h4>
                  <p className="text-xs text-white/60 font-light leading-relaxed">{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- SECTION 5: STRUCTURAL INVESTMENT THESIS --- */}
      <section style={geometricStyles} className="bg-[#432818] text-white py-24 border-b border-white/10">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="text-[#bb9457]"><Eyebrow>The Investment Frame</Eyebrow></div>
              <h2 className="font-display text-3xl md:text-5xl font-light text-[#ffe6a7] leading-tight">The Commercial Arbitrage</h2>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              <div className="p-8 bg-[#432818]/90 border border-white/10 rounded-2xl backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
                <h4 className="font-display text-base text-[#bb9457] font-medium mb-2">Asymmetric Sourcing Asset</h4>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  Leveraging deep localized manufacturing cost efficiencies alongside high-end, minimalist creative architecture to supply premium digital showrooms.
                </p>
              </div>
              <div className="p-8 bg-[#432818]/90 border border-white/10 rounded-2xl backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1">
                <h4 className="font-display text-base text-[#bb9457] font-medium mb-2">The Shared Success Engine</h4>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  Capital injections scale actual physical machinery, raw inputs, and global logistics, generating transparent revenue loops via active profit splits up to 50%.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --- SECTION 6: HIGH-VALUE CONVERSION PIPELINE DECK --- */}
      <Section className="bg-white text-[#432818] py-24 border-b border-hairline">
        <Container className="max-w-4xl mx-auto text-center space-y-6 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-[#99582a]/30 to-transparent" />
          <div className="text-[#99582a]"><Eyebrow>Institutional Briefing</Eyebrow></div>
          <h2 className="font-display text-3xl md:text-4xl text-[#432818] font-light">Access The Partnership Prospectus</h2>
          <p className="text-sm text-[#432818]/70 max-w-xl mx-auto font-light leading-relaxed">
            Review detailed historical cohort allocations, specific sponsorship packages for Spotlight, multi-city workspace construction layout plans, and comprehensive financial partnership tiers.
          </p>
          <div className="pt-4">
            <a 
              href="/prospectus.pdf" 
              download
              className="inline-flex items-center justify-center border border-[#6f1d1b] text-[#6f1d1b] font-mono text-xs uppercase tracking-[0.25em] px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#6f1d1b] hover:text-white hover:scale-105 shadow-sm"
            >
              Download Prospectus Folder
            </a>
          </div>
        </Container>
      </Section>

      {/* --- SECTION 7: FIXED INTERACTION CONTEXTS (FAQ) --- */}
      <Section className="bg-[#432818] text-white py-24 border-b border-white/10">
        <Container className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[#bb9457]"><Eyebrow>Strategic Alignment</Eyebrow></div>
            <h2 className="font-display text-3xl md:text-4xl text-[#ffe6a7] mt-2">Partnership Operations</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "How are sponsorship allocations deployed within the ateliers?", a: "Sponsorship funds directly underwrite heavy machine procuring, student scholarship pipelines, raw material bank expansion, or editorial launch infrastructure across our Lahore, Islamabad, and Karachi nodes." },
              { q: "What parameters govern the investment selection matrix?", a: "Our internal creative board conducts technical reviews monitoring pattern construction reliability, long-term brand narrative, and consistency prior to granting seed-equity exposure." },
              { q: "Are international brand collaborations operationally viable?", a: "Yes. Adorzia acts as the direct logistical and infrastructural intermediary, translating global design spec sheets into precise local artisanal and manufacturing executions." },
              { q: "Can corporate sponsors underwrite bespoke Spotlight awards?", a: "Absolutely. Strategic partners can formalize distinct prize categories tailored around specific disciplines such as material sustainability, textile innovation, or minimalist streetwear execution." }
            ].map((faq, i) => (
              <div key={i} className="border-b border-white/10 pb-4">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left flex justify-between items-center py-4 font-display text-lg text-[#ffe6a7] hover:text-[#bb9457] transition-colors duration-300"
                >
                  <span>{faq.q}</span>
                  <span className={`text-xl font-mono transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`}>{activeFaq === i ? "−" : "+"}</span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === i ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                  <p className="text-xs text-white/70 leading-relaxed bg-white/[0.02] p-4 rounded-xl">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* --- SECTION 8: CONVERSATION HUB & PREMIUM INQUIRY FORM --- */}
      <Section className="bg-white text-[#432818] py-24">
        <Container>
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5 space-y-6 md:sticky md:top-28">
              <div className="text-[#99582a]"><Eyebrow>Start a conversation</Eyebrow></div>
              <h2 className="font-display text-4xl md:text-5xl font-light text-[#432818] leading-[1.1]">Tell us what you have in mind.</h2>
              <p className="text-sm text-[#432818]/80 leading-relaxed font-light">
                Whether you're scoping a sponsorship configuration, evaluating our underlying investment thesis, or constructing a custom capsule residency — our advisory team will respond within three business days.
              </p>
              <div className="p-6 bg-[#ffe6a7]/20 border border-[#432818]/10 rounded-2xl transition-all duration-300 hover:bg-[#ffe6a7]/30">
                <p className="text-xs italic text-[#432818]/90 font-light leading-relaxed">
                  "Adorzia is not simply supporting fashion brands — we are establishing the physical and digital infrastructure that allows an independent creative economy to scale."
                </p>
              </div>
            </div>
            
            <div className="md:col-span-7 bg-[#ffe6a7]/10 border border-[#432818]/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-md shadow-sm">
              <form
                onSubmit={(e) => { e.preventDefault(); m.mutate(); }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Company / Institution" value={form.company} onChange={(v) => setForm({ ...form, company: v })} required />
                  <Field label="Contact Name" value={form.contact_name} onChange={(v) => setForm({ ...form, contact_name: v })} required />
                  <Field label="Email Address" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                  <Field label="Phone Number (Optional)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-[#99582a] block mb-3">Partnership Track</label>
                  <select
                    value={form.interest_type}
                    onChange={(e) => setForm({ ...form, interest_type: e.target.value })}
                    className="w-full border-b border-[#432818]/20 bg-transparent py-3 outline-none focus:border-[#6f1d1b] text-sm font-light transition-colors duration-300 text-[#432818]"
                  >
                    {["Sponsorship", "Investment", "Brand Collaboration", "Other"].map((o) => <option key={o} className="text-[#432818] bg-[#fffcf7]">{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-[#99582a] block mb-3">Strategic Intent</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border-b border-[#432818]/20 bg-transparent py-3 outline-none focus:border-[#6f1d1b] text-sm font-light resize-none transition-colors duration-300 placeholder-[#432818]/40"
                    placeholder="Describe your collaborative targets..."
                  />
                </div>
                <div className="pt-4">
                  <button
                    disabled={m.isPending}
                    className="w-full md:w-auto inline-flex items-center justify-center border border-[#6f1d1b] bg-[#6f1d1b] text-cream px-10 py-4 text-xs font-mono uppercase tracking-widest rounded-full hover:bg-transparent hover:text-[#6f1d1b] transition-all duration-500 disabled:opacity-50 shadow-sm hover:shadow-md"
                  >
                    {m.isPending ? "Sending Inquiry..." : "Submit Proposal"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div className="group">
      <label className="font-mono text-xs uppercase tracking-wider text-[#99582a] block mb-2 transition-colors group-focus-within:text-[#6f1d1b]">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-[#432818]/20 bg-transparent py-3 outline-none focus:border-[#6f1d1b] text-sm font-light transition-colors duration-300"
      />
    </div>
  );
}