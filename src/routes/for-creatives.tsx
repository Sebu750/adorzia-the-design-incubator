import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, Container, Section, Eyebrow } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { useState } from "react";
import studio from "@/assets/studio.jpg";
import lahore from "@/assets/studio.jpg";
import islamabad from "@/assets/studio.jpg";
import karachi from "@/assets/studio.jpg";
import marketplaceHero from "@/assets/studio.jpg";
import fundedDesigner from "@/assets/studio.jpg";
import selfFunded from "@/assets/studio.jpg";

export const Route = createFileRoute("/for-creatives")({
  head: () => ({
    meta: [
      { title: "For Creatives — Adorzia Designer Programs & Resources" },
      { name: "description", content: "For emerging designers: join the Adorzia coworking studio, list your collection on our marketplace, and apply to the Spotlight programme." },
      { name: "keywords", content: "fashion designers, emerging designer programs, fashion coworking studio, designer marketplace, fashion resources, creative entrepreneurship" },
      { property: "og:title", content: "For Creatives — Adorzia" },
      { property: "og:description", content: "Studio, marketplace, and Spotlight — the resources emerging designers need to launch." },
      { property: "og:image", content: studio },
      { property: "og:url", content: "https://adorzia.com/for-creatives" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "For Creatives — Adorzia" },
      { rel: "canonical", href: "https://adorzia.com/for-creatives" } as never,
    ],
  }),
  component: ForCreatives,
});

function ForCreatives() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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
<section className="relative min-h-screen flex items-center overflow-hidden text-[#432818]">

  {/* Full Background Image */}
  <div className="absolute inset-0 z-0">
    <img
      src={studio}
      alt="The Adorzia coworking studio"
      className="w-full h-full object-cover scale-105"
    />

    {/* Soft White Luxury Overlay */}
    <div className="absolute inset-0 bg-white/60" />
    <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/80" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(187,148,87,0.12),transparent_60%)]" />
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-5xl px-6 md:px-12 lg:px-20">

    <span className="inline-flex items-center gap-2 text-[#bb9457] uppercase tracking-[0.3em] text-xs font-semibold">
      <span className="w-2 h-2 bg-[#bb9457] rounded-full animate-pulse"></span>
      For creatives
    </span>

    <h1 className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] text-[#432818] tracking-tight">
      Build your brand<br />
      in a house that<br />
      backs makers.
    </h1>

    <p className="mt-6 max-w-2xl text-[#432818]/70 text-base md:text-lg leading-relaxed font-light">
      Three distinct pathways, one unified structural environment. Transition from design concept to an established, independent fashion house.
    </p>

    <div className="mt-10 flex flex-wrap gap-4">

      <a
        href="/spotlight"
        className="px-8 py-3 bg-[#bb9457] text-[#432818] font-semibold uppercase tracking-[0.25em] text-xs rounded-full hover:bg-[#ffe6a7] hover:scale-105 transition-all duration-300"
      >
        Explore Pathways
      </a>

      <a
        href="/marketplace"
        className="px-8 py-3 border border-[#bb9457] text-[#bb9457] font-semibold uppercase tracking-[0.25em] text-xs rounded-full hover:bg-[#bb9457] hover:text-[#432818] hover:scale-105 transition-all duration-300"
      >
        Enter Ecosystem
      </a>

    </div>

  </div>

</section>
{/* --- HERO SECTION END --- */}

      {/* --- SECTION 1: SYSTEMIC CORE POSITIONING --- */}
      <Section className="bg-white text-[#432818] py-20 border-b border-hairline">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <Eyebrow className="text-[#99582a]">The Workspace Mandate</Eyebrow>
              <h2 className="font-display text-4xl md:text-5xl leading-tight font-light text-[#432818]">Beyond Shared Desks</h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-base md:text-lg text-[#432818]/90 font-light leading-relaxed border-l-2 border-[#6f1d1b] pl-6 md:pl-8">
                Adorzia is not a simple co-working office. We provide heavy industrial production infrastructure, continuous multi-regional showcase distribution, and direct seed-equity channels designed explicitly for independent fashionpreneurs ready to build self-sustained brands.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* --- SECTION 2: THE HOUSES PROGRAM THREE-PART STRUCTURE --- */}
<Section className="border-b border-white/10 bg-[#0b0b0b] py-28">
  <Container>

    {/* Header */}
    <div className="max-w-2xl mb-20">
      <Eyebrow className="text-[#bb9457]">The Houses Program</Eyebrow>
      <h2 className="font-display text-4xl md:text-5xl mt-4 text-white leading-tight">
        A structured ecosystem for building fashion houses
      </h2>
    </div>

    {/* 3 Premium Cards */}
    <div className="grid md:grid-cols-3 gap-8">

      {[
        {
          eyebrow: "01 — Coworking Studio Nodes",
          title: "Physical Production Ateliers",
          image: "/hero-banner.jpg",
          body: "24/7 access to industrial-grade ateliers designed for precision garment construction and high-end lookbook production.",
          bullets: [
            "Industrial stitching & finishing systems",
            "Professional mannequins & drafting tables",
            "Curated textile & material library",
          ],
        },
        {
          eyebrow: "02 — Marketplace Indexing",
          title: "Curated Permanent Showrooms",
          image: "/marketplace.jpg",
          body: "Direct-to-market digital showrooms connecting designers with verified buyers and global retail ecosystems.",
          bullets: [
            "Brand indexing & digital lookbooks",
            "Integrated order & logistics system",
            "Buyer discovery & curation pipeline",
          ],
        },
        {
          eyebrow: "03 — The Spotlight Initiative",
          title: "Annual Talent Acceleration",
          image: "/hero-banner.jpg",
          body: "A national platform for emerging designers to launch, fund, and scale their first collections into real brands.",
          bullets: [
            "Funding & prototyping grants",
            "Investor & advisory access",
            "Guaranteed marketplace onboarding",
          ],
        },
      ].map((p) => (
        <div
          key={p.eyebrow}
          className="group relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#0f0f0f] hover:border-[#bb9457]/50 transition-all duration-500"
        >

          {/* Image */}
          <div className="relative h-72 overflow-hidden">
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8">

            <span className="text-[10px] uppercase tracking-[0.3em] text-[#bb9457] font-semibold">
              {p.eyebrow}
            </span>

            <h3 className="mt-3 font-display text-2xl text-white leading-tight">
              {p.title}
            </h3>

            <p className="mt-4 text-white/70 text-sm leading-relaxed">
              {p.body}
            </p>

            {/* Bullets */}
            <div className="mt-6 space-y-2">
              {p.bullets.map((b) => (
                <div key={b} className="flex items-start gap-3 text-white/60 text-xs">
                  <span className="w-1.5 h-1.5 mt-1 rounded-full bg-[#bb9457]" />
                  {b}
                </div>
              ))}
            </div>

          </div>

          {/* Hover Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top,rgba(187,148,87,0.12),transparent_60%)] pointer-events-none" />
        </div>
      ))}

    </div>

  </Container>
</Section>

     {/* =========================
   SECTION 3 START: METRIC / DESIGN COHORT MATRICES
========================= */}
<Section className="bg-white text-[#1a1a1a] py-28 border-b border-gray-100">

  <Container>

    {/* Header */}
    <div className="text-center max-w-2xl mx-auto mb-16">

      <Eyebrow className="text-[#bb9457] tracking-[0.25em]">
        Ecosystem Scale
      </Eyebrow>

      <h3 className="font-display text-3xl md:text-5xl text-[#432818] mt-3 leading-[1.1]">
        Built For the Next Wave of Independent Brands
      </h3>

      <p className="mt-5 text-sm text-gray-500 leading-relaxed">
        A structured entry system designed to support creative talent across education, experimentation, and commercial scaling.
      </p>

    </div>

    {/* Grid */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

      {[
        {
          target: "Fashion Students",
          context: "Finalizing graduation collections",
          extra: "Access to final-year production support and portfolio refinement labs"
        },
        {
          target: "Emerging Ateliers",
          context: "Seeking luxury infrastructure",
          extra: "Early-stage studios scaling toward commercial brand identity"
        },
        {
          target: "Streetwear Labels",
          context: "Transitioning to small capsule scales",
          extra: "Production-ready sampling + controlled batch manufacturing systems"
        },
        {
          target: "Textile Innovators",
          context: "Deploying raw regional craft heritage",
          extra: "Material experimentation with heritage craft integration programs"
        }
      ].map((item, idx) => (
        <div
          key={idx}
          className="p-7 border border-gray-200 rounded-2xl hover:border-[#bb9457]/40 transition-colors duration-300 bg-white"
        >

          <div className="font-display text-xl text-[#432818] font-medium mb-2">
            {item.target}
          </div>

          <div className="text-xs text-gray-600 leading-relaxed font-light mb-3">
            {item.context}
          </div>

          <div className="text-[11px] text-gray-400 leading-relaxed">
            {item.extra}
          </div>

        </div>
      ))}

    </div>

  </Container>
</Section>


{/* =========================
   SECTION 4 START: BRAND PIPELINE JOURNEY
========================= */}
<Section className="bg-[#fafafa] text-[#1a1a1a] py-28 border-b border-gray-100">

  <Container>

    {/* Header */}
    <div className="text-center max-w-3xl mx-auto mb-20">

      <Eyebrow className="text-[#bb9457] tracking-[0.25em]">
        The Brand Pipeline
      </Eyebrow>

      <h2 className="font-display text-4xl md:text-6xl text-[#432818] mt-3 leading-[1.05]">
        The Transformation Framework
      </h2>

      <p className="mt-6 text-sm text-gray-500 leading-relaxed">
        A four-stage production system that converts conceptual design into scalable, market-ready fashion brands.
      </p>

    </div>

    {/* Steps */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

      {[
        {
          step: "01",
          name: "Technical Drafting",
          text: "Refine sketches, select textiles, and develop structured pattern blocks within guided studio environments."
        },
        {
          step: "02",
          name: "Sample Verification",
          text: "Construct production-grade samples using industrial machinery and technical supervision frameworks."
        },
        {
          step: "03",
          name: "Editorial Capture",
          text: "Produce high-end visual identity assets including lookbooks, campaign visuals, and brand narratives."
        },
        {
          step: "04",
          name: "Marketplace Launch",
          text: "Deploy finalized collections into digital marketplace channels with immediate buyer access and visibility."
        }
      ].map((flow, i) => (
        <div
          key={i}
          className="relative p-8 bg-white border border-gray-200 rounded-2xl hover:border-[#bb9457]/40 transition-all duration-300"
        >

          {/* step number */}
          <div className="text-6xl font-display text-[#bb9457]/20 absolute top-5 right-6 font-bold">
            {flow.step}
          </div>

          <h4 className="font-display text-xl text-[#432818] font-medium mb-4">
            {flow.name}
          </h4>

          <p className="text-sm text-gray-600 leading-relaxed">
            {flow.text}
          </p>

        </div>
      ))}

    </div>

  </Container>
</Section>

{/* =========================
   SECTION 4 END
   SECTION 3 END
========================= */}

      {/* --- SECTION 5: COMPREHENSIVE PLATFORM COMPARISON --- */}
      <Section className="bg-white text-[#432818] py-24 border-b border-hairline">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-16">
            <Eyebrow className="text-[#99582a]">Market Realities</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl font-light text-[#432818] mt-2">Diverging from Traditional Systems</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#432818]/20 text-xs uppercase tracking-wider text-[#99582a]">
                  <th className="pb-4 font-mono">Structural Needs</th>
                  <th className="pb-4 font-mono">Standard Academic Models</th>
                  <th className="pb-4 font-mono text-[#6f1d1b]">The Adorzia Framework</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-[#432818]/10 font-light">
                {[
                  { metric: "Heavy Production Access", old: "Terminates completely at graduation dates", new: "Continuous 24/7 access to physical industrial sewing ateliers" },
                  { metric: "Initial Capital Pools", old: "Self-financed risk or isolated design grants", new: "Venture seed routes and clear prototyping funding structures" },
                  { metric: "Distribution Channels", old: "Fragmented third-party retail or complex standalone web builds", new: "Instant layout indexing via integrated premium e-commerce marketplace" },
                  { metric: "Brand Sourcing Support", old: "Independent and complex supplier negotiations", new: "Directly linked raw regional textile and factory networks" }
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-[#ffe6a7]/20 transition-colors">
                    <td className="py-4 font-medium text-[#432818]">{row.metric}</td>
                    <td className="py-4 text-[#432818]/70">{row.old}</td>
                    <td className="py-4 text-[#6f1d1b] font-medium">{row.new}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

     {/* =========================
   SECTION 6 START: PHYSICAL STUDIO LOCATION MATRIX
========================= */}
<Section className="bg-white text-[#1a1a1a] py-28 border-b border-gray-100 relative overflow-hidden">

  {/* subtle background geometry */}
  <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="studios-light-grid" width="90" height="90" patternUnits="userSpaceOnUse">
          <circle cx="45" cy="45" r="1.2" fill="#bb9457" />
          <path d="M45 0V90M0 45H90" stroke="#bb9457" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#studios-light-grid)" />
    </svg>
  </div>

  <Container className="relative z-10">

    {/* Header */}
    <div className="max-w-2xl mx-auto text-center mb-20">

      <div className="inline-flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-[#bb9457]" />
        <Eyebrow className="text-[#bb9457] tracking-[0.25em]">
          Upcoming Atelier Network
        </Eyebrow>
      </div>

      <h2 className="font-display text-4xl md:text-6xl font-light leading-[1.05] text-[#432818]">
        Expanding Physical Nodes Across Pakistan
      </h2>

      <p className="mt-5 text-sm text-gray-500 leading-relaxed">
        A distributed ecosystem of studios designed for production, collaboration, and creative scaling.
      </p>

    </div>

    {/* Grid */}
    <div className="grid md:grid-cols-3 gap-10">

      {[
        { city: "Lahore Node", image: lahore, spaces: "2-Floor Industrial Atelier" },
        { city: "Islamabad Node", image: islamabad, spaces: "Creative Co-working Hub" },
        { city: "Karachi Node", image: karachi, spaces: "Heavy Sampling Production Center" },
      ].map((location) => (
        <div key={location.city} className="group">

          {/* image */}
          <div className="relative overflow-hidden rounded-2xl mb-6 bg-gray-100">
            <img
              src={location.image}
              alt={`${location.city} studio`}
              className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />

            {/* soft overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>

          {/* content */}
          <div className="pl-1">

            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#bb9457]" />
              <h3 className="font-display text-xl md:text-2xl text-[#432818] group-hover:text-[#bb9457] transition-colors">
                {location.city}
              </h3>
            </div>

            <p className="mt-2 text-sm text-gray-500 pl-3">
              {location.spaces}
            </p>

          </div>

        </div>
      ))}

    </div>

  </Container>
</Section>

{/* =========================
   SECTION 6 END
========================= */}

     {/* =========================
   SECTION 7 START: FIXED INFRASTRUCTURE CHECKLIST
========================= */}
<Section className="relative overflow-hidden border-b border-white/10 bg-[#0b0b0b] py-28 text-white">

  {/* cinematic background depth */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(187,148,87,0.08),transparent_60%)]" />
  <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0b0b0b] to-black opacity-90" />

  <Container className="relative z-10">

    <div className="grid md:grid-cols-12 gap-16 items-start">

      {/* LEFT: Sticky Title */}
      <div className="md:col-span-5 md:sticky md:top-28">

        <div className="inline-flex items-center gap-3 border border-white/10 bg-white/5 backdrop-blur-md px-5 py-2 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#bb9457] animate-pulse" />
          <Eyebrow className="text-xs uppercase tracking-[0.25em] text-white/80 font-medium">
            Atelier Inventory
          </Eyebrow>
        </div>

        <h2 className="font-display text-4xl md:text-6xl font-light leading-[1.05] text-white">
          Platform Provisions
        </h2>

        <p className="mt-5 text-sm text-white/50 leading-relaxed max-w-sm">
          Core infrastructure elements that support design, production, and scale within the Adorzia ecosystem.
        </p>

      </div>

      {/* RIGHT: Checklist */}
      <div className="md:col-span-7">

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-1">

          {[
            "Design & Production Studios",
            "Advanced Micro-Sampling Support",
            "Garment Construction Machinery",
            "Editorial Photography Bays",
            "Strategic Brand Mentorship",
            "Financial Roadmap Direction",
            "Industry Sourcing Connections",
            "Small-Batch Textile Channels",
            "Collaborative Creative Network"
          ].map((service) => (
            <div
              key={service}
              className="group flex items-start gap-4 py-5 border-b border-white/10"
            >

              {/* accent line */}
              <div className="mt-2 h-px w-5 bg-[#bb9457]/70 flex-shrink-0 group-hover:w-8 transition-all duration-300" />

              {/* text */}
              <span className="text-sm md:text-[15px] leading-relaxed text-white/70 group-hover:text-white transition-colors duration-300 font-light">
                {service}
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>

  </Container>
</Section>

{/* =========================
   SECTION 7 END
========================= */}

      {/* --- SECTION 8: CURATED MARKETPLACE ENVIRONMENT --- */}
      <Section className="border-b border-hairline bg-white text-[#432818]">
        <Container>
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-6 space-y-6">
              <Eyebrow className="text-[#99582a]">Digital Showrooms</Eyebrow>
              <h2 className="font-display text-4xl md:text-5xl leading-[1.05] font-light text-[#432818]">Built for Fashion Visionaries</h2>
              <p className="text-sm text-[#432818]/80 leading-relaxed font-light">
                The Adorzia Marketplace runs strictly as an invite-only environment where vetted program cohorts list, exhibit, and distribute seasonal collections. Brands undergo deep review based on pure conceptual execution, structural finishing standards, and clear overarching vision.
              </p>
              <p className="text-sm text-[#432818]/80 leading-relaxed font-light">
                By contextualizing clean minimalist design through rich regional history, we bridge localized artisanal techniques directly into upscale global buyer channels.
              </p>
            </div>
            <div className="md:col-span-6">
              <img src={marketplaceHero} alt="Adorzia Marketplace" className="w-full aspect-[4/3] object-cover rounded-3xl shadow-xl" loading="lazy" />
            </div>
          </div>
        </Container>
      </Section>

     {/* =========================
   SECTION 9 START: TWO PATHWAYS (FUNDED VS INDEPENDENT)
========================= */}
<Section className="bg-[#0b0b0b] text-[#f5f5f5] py-28 relative overflow-hidden">

  {/* subtle cinematic glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(187,148,87,0.08),transparent_55%)]" />

  <Container className="relative z-10">

    {/* Header */}
    <div className="text-center max-w-2xl mx-auto mb-20">
      <Eyebrow className="text-[#bb9457] tracking-widest">
        Brand Pathways
      </Eyebrow>

      <h2 className="font-display text-4xl md:text-6xl font-light leading-[1.05] mt-3 text-white">
        Financing Capital Alignments
      </h2>

      <p className="mt-5 text-sm text-white/50 leading-relaxed">
        Two structured routes for emerging and independent designers to scale within the Adorzia ecosystem.
      </p>
    </div>

    {/* Split Grid */}
    <div className="grid md:grid-cols-2 gap-14">

      {/* LEFT: FUNDED */}
      <div className="group">

        <div className="relative overflow-hidden rounded-2xl mb-8">
          <img
            src={fundedDesigner}
            alt="Adorzia-Funded Designers"
            className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>

        <h4 className="font-display text-2xl md:text-3xl text-white font-light">
          Adorzia-Funded Startups
        </h4>

        <p className="mt-4 text-sm text-white/60 leading-relaxed">
          Selected through precise portfolio sweeps, early brands receive advanced sampling tools and full production backing without upfront investment pressure.
        </p>

        <ul className="mt-7 space-y-3 text-sm text-white/60">
          {[
            "Complete pattern finishing assistance",
            "Raw textile and factory logistics",
            "Artistic branding & presentation layout",
            "Integrated onboarding into public showrooms"
          ].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#bb9457]" />
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-8 pt-6 border-t border-white/10 text-[11px] uppercase tracking-[0.2em] text-[#bb9457]/80">
          Structured shared success model up to 50% profit alignment
        </p>
      </div>

      {/* RIGHT: INDEPENDENT */}
      <div className="group">

        <div className="relative overflow-hidden rounded-2xl mb-8">
          <img
            src={selfFunded}
            alt="Self-Funded Designers"
            className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>

        <h4 className="font-display text-2xl md:text-3xl text-white font-light">
          Independent Creators
        </h4>

        <p className="mt-4 text-sm text-white/60 leading-relaxed">
          Established independent labels scale through our infrastructure networks while preserving full creative and financial autonomy.
        </p>

        <ul className="mt-7 space-y-3 text-sm text-white/60">
          {[
            "Targeted luxury client visibility",
            "Collaborative design communities",
            "Premium brand positioning contexts",
            "Continuous enterprise growth planning"
          ].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6f1d1b]" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Link
            to="/marketplace"
            className="inline-flex items-center justify-center border border-white/20 px-7 py-3 rounded-full font-mono text-[11px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
          >
            Explore Marketplace Systems
          </Link>
        </div>
      </div>

    </div>

  </Container>
</Section>

{/* =========================
   SECTION 9 END
========================= */}
      {/* --- SECTION 10: APPLICATION ROADMAP STEPS --- */}
      <Section className="bg-white text-[#432818] py-24 border-b border-hairline">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-16">
            <Eyebrow className="text-[#99582a]">The Intake Path</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl text-[#432818] font-light mt-2">The Admissions Process</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", name: "Portfolio File", desc: "Submit complete digital lookbooks, mood boards, or technical capsule blueprints." },
              { step: "02", name: "Technical Review", desc: "Our creative board analyzes pattern construction, design logic, and structural stability." },
              { step: "03", name: "Creative Interview", desc: "Discuss long-term enterprise ambitions and alignment with our shared infrastructure." },
              { step: "04", name: "Atelier Intake", desc: "Secure studio access parameters, allocate space benches, and initiate production builds." }
            ].map((proc, i) => (
              <div key={i} className="space-y-3 border-l border-[#432818]/20 pl-6">
                <div className="font-mono text-xs text-[#99582a] font-bold uppercase">Step {proc.step}</div>
                <h4 className="font-display text-lg font-medium text-[#432818]">{proc.name}</h4>
                <p className="text-xs text-[#432818]/70 leading-relaxed font-light">{proc.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

     {/* --- SECTION 11: PROGRAM ACCESSIBILITY FAQ --- */}
<Section className="bg-white text-[#1a1a1a] py-24">
  <Container className="max-w-3xl mx-auto">

    {/* Header */}
    <div className="text-center mb-14">
      <Eyebrow className="text-[#bb9457]">Operational Answers</Eyebrow>
      <h2 className="font-display text-3xl md:text-5xl text-[#432818] mt-2">
        Frequently Asked Questions
      </h2>
    </div>

    {/* FAQ List */}
    <div className="space-y-2">
      {[
        {
          q: "Is formal academic training mandatory for entry?",
          a: "No. While we focus heavily on design graduates, independent artisans exhibiting deep technical pattern mastery and coherent collections are highly encouraged to apply."
        },
        {
          q: "How do the profit-sharing startup structures function?",
          a: "For brands accepted into the Adorzia-funded track, we provide raw fabric stock, machinery access, and digital showroom assets. Returns operate on a shared profit-split layout up to 50% as commercial orders scale."
        },
        {
          q: "Can designers maintain control over their creative vision?",
          a: "Absolutely. Adorzia provides structural support and operational channels. Creative control and individual brand identity remain completely in the hands of the designer."
        },
        {
          q: "When do applications open for the Spotlight cycle?",
          a: "The national Spotlight talent sweep accepts digital portfolio submissions annually, opening pathways toward comprehensive grant distribution and workspace placements."
        }
      ].map((faq, i) => (
        <div key={i} className="border-b border-gray-200">

          <button
            onClick={() => setActiveFaq(activeFaq === i ? null : i)}
            className="w-full flex justify-between items-center py-5 text-left group"
          >
            <span className="font-medium text-[#432818] group-hover:text-[#bb9457] transition-colors">
              {faq.q}
            </span>
            <span className="text-xl text-[#bb9457]">
              {activeFaq === i ? "−" : "+"}
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              activeFaq === i ? "max-h-40 opacity-100 pb-4" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-sm text-gray-600 leading-relaxed">
              {faq.a}
            </p>
          </div>

        </div>
      ))}
    </div>

  </Container>
</Section>

     {/* --- SECTION 12: LUXURY CTA SECTION --- */}
<Section className="relative bg-white text-[#432818] py-32 text-center overflow-hidden">

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(187,148,87,0.10),transparent_60%)] z-0" />

  <div className="relative z-10 max-w-2xl mx-auto space-y-6">

    <h2 className="font-display text-4xl md:text-5xl text-[#432818] font-light tracking-tight">
      Launch Your Independent Fashion House
    </h2>

    <p className="text-xs md:text-sm text-[#432818]/70 max-w-md mx-auto font-light leading-relaxed">
      Connect with heavy sampling platforms, establish high-end production lineages, and access global luxury markets.
    </p>

    <div className="flex flex-wrap justify-center gap-4 pt-4">

      <Link
        to="/contact"
        className="px-8 py-3 bg-[#bb9457] text-[#432818] font-mono text-xs uppercase tracking-widest font-bold rounded-full hover:bg-[#ffe6a7] transition-all duration-300"
      >
        Apply for Membership
      </Link>

      <Link
        to="/spotlight"
        className="px-8 py-3 border border-[#bb9457] text-[#bb9457] font-mono text-xs uppercase tracking-widest font-bold rounded-full hover:bg-[#bb9457] hover:text-[#432818] transition-all duration-300"
      >
        Submit Portfolio
      </Link>

    </div>

  </div>

</Section>
    </SiteLayout>
  );
}