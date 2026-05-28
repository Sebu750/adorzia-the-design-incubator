import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { SiteLayout, Container, Section, Eyebrow } from "@/components/site/SiteLayout";
import { listDesigners } from "@/lib/public-data.functions";
import d1 from "@/assets/designer-1.jpg";
import d2 from "@/assets/designer-2.jpg";
import d3 from "@/assets/designer-3.jpg";

type DesignerPreview = {
  id: string;
  slug: string;
  name: string;
  tagline?: string | null;
  bio?: string | null;
  portrait_url?: string | null;
  cover_url?: string | null;
  location?: string | null;
  collectionCount?: number;
  instagram?: string | null;
};

const FALLBACK: DesignerPreview[] = [
  { 
    id: "f1", 
    slug: "atelier-noir", 
    name: "Atelier Noir", 
    tagline: "Where darkness meets elegance — sculptural couture for the modern era.", 
    bio: "Paris-based fashion house redefining boundaries between darkness and sophistication through innovative draping and sustainable fabrics.",
    portrait_url: d1, 
    cover_url: d1, 
    location: "Paris, France",
    collectionCount: 4,
    instagram: "@ateliernoir.official",
  },
  { 
    id: "f2", 
    slug: "house-of-vellum", 
    name: "House of Vellum", 
    tagline: "Sculptural menswear reimagined for the contemporary gentleman.", 
    bio: "Milan's answer to architectural menswear — structured silhouettes meet Italian craftsmanship.",
    portrait_url: d2, 
    cover_url: d2, 
    location: "Milan, Italy",
    collectionCount: 3,
    instagram: "@houseofvellum",
  },
  { 
    id: "f3", 
    slug: "studio-iris", 
    name: "Studio Iris", 
    tagline: "Avant-garde drapery that defies convention.", 
    bio: "London-based studio pushing the boundaries of experimental fashion through radical draping techniques.",
    portrait_url: d3, 
    cover_url: d3, 
    location: "London, UK",
    collectionCount: 5,
    instagram: "@studioiris.london",
  },
];

const qo = queryOptions({ queryKey: ["designers", "all"], queryFn: () => listDesigners() });

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Adorzia Marketplace — Curated Luxury Showroom" },
      { name: "description", content: "Discover designers and collections from the Adorzia marketplace — a curated digital showroom for the next generation of fashion houses." },
      { name: "keywords", content: "fashion marketplace, emerging designers, designer collections, luxury fashion" },
      { property: "og:title", content: "Adorzia Marketplace" },
      { property: "og:description", content: "A curated digital showroom for emerging designers." },
      { property: "og:url", content: "https://adorzia.com/marketplace" },
      { name: "twitter:card", content: "summary_large_image" },
      { rel: "canonical", href: "https://adorzia.com/marketplace" } as never,
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(qo),
  component: Marketplace,
});

function Marketplace() {
  const designers = useSuspenseQuery(qo).data;
  const list = (designers.length ? designers : FALLBACK) as DesignerPreview[];

  // Countdown State for Launch Timer
  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 14, minutes: 32, seconds: 45 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToWaitlist = () => {
    document.getElementById("waitlist-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SiteLayout>
      {/* Floating Ambient Noise Grain Overlay & Parallax Glow */}
      <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjRkZGIi8+Cjwvc3ZnPg==')] bg-repeat" />
      <div className="pointer-events-none fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />

      {/* Sticky Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
        <button 
          onClick={scrollToWaitlist}
          className="bg-black text-white hover:bg-gold hover:text-black border border-white/20 transition-all duration-500 font-medium uppercase tracking-widest text-[10px] py-3.5 px-6 backdrop-blur-md shadow-2xl tracking-[0.2em]"
        >
          Join Early Access
        </button>
      </div>

      {/* Cinematic Hero Banner */}
      <section className="relative h-screen min-h-[650px] w-full flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 z-10" />
        <img 
          src={d1} 
          alt="Luxury Editorial Cinematic Banner" 
          className="absolute inset-0 h-full w-full object-cover opacity-60 scale-105 animate-[subtle-zoom_20s_infinite_alternate] pointer-events-none filter brightness-[0.85] contrast-[1.05]" 
        />
        <Container className="relative z-20 text-center flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.4em] text-gold font-medium mb-4 animate-fade-in">Adorzia Digital Showroom</span>
          <h1 className="font-display text-5xl md:text-8xl text-white leading-none max-w-5xl tracking-tight uppercase mb-2">
            Marketplace <br/><span className="italic font-light tracking-wide text-white/90">Launching Soon</span>
          </h1>
          <p className="text-white/60 text-sm md:text-base font-light tracking-wide max-w-xl mt-4 mb-10 mix-blend-plus-lighter">
            A radical departure from algorithmic commerce. Experience curated collections directly from the vanguard of global design talent.
          </p>
          <button 
            onClick={scrollToWaitlist}
            className="group relative border border-white/30 text-white hover:border-gold hover:text-black hover:bg-gold transition-all duration-500 font-medium uppercase tracking-[0.3em] text-xs py-4 px-10 overflow-hidden"
          >
            <span className="relative z-10">Request Invitation</span>
          </button>
        </Container>
      </section>

      {/* Brand Philosophy Strip */}
      <section className="bg-black text-white border-y border-white/10 py-12 relative overflow-hidden">
        <Container className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="w-12 h-[1px] bg-gold hidden md:block" />
          <p className="font-display text-xl md:text-2xl leading-relaxed max-w-4xl tracking-wide font-light">
            "Adorzia stands at the intersection of cultural legacy and global vision. We strip away marketplace noise to celebrate pure heritage craftsmanship, structured silhouettes, and uncompromised design expression."
          </p>
          <span className="text-[10px] font-mono tracking-[0.2em] text-gold uppercase whitespace-nowrap">Editorial Vol. I</span>
        </Container>
      </section>

      {/* Featured Designer Preview (Locked Showcase) */}
      <Section className="bg-bone/40">
        <Container>
          <div className="mb-14">
            <Eyebrow>Preview Portfolio</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl mt-2 tracking-tight">The Inaugural Cohort</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
            {list.map((d) => (
              <div key={d.id} className="group block relative cursor-not-allowed">
                {/* Image Wrap Container with Locked Overlay */}
                <div className="aspect-[3/4] overflow-hidden bg-bone relative">
                  <img 
                    src={d.portrait_url || d1} 
                    alt={d.name} 
                    loading="lazy" 
                    className="h-full w-full object-cover transition-transform duration-1000 scale-100 blur-[4px] group-hover:scale-[1.02]" 
                  />
                  {/* Constant Subtle Overlay + Hover Accent */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500 flex flex-col items-center justify-center p-6 text-center" />
                  
                  {/* Coming Soon Graphic Asset */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                    <span className="text-[10px] uppercase font-mono tracking-[0.4em] text-gold bg-black/80 px-4 py-2 border border-gold/30 backdrop-blur-sm shadow-xl transition-transform duration-500 group-hover:scale-105">
                      Coming Soon
                    </span>
                  </div>
                </div>
                
                {/* Designer Text Info */}
                <div className="mt-5 space-y-2 opacity-60 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-2xl text-black">{d.name}</h3>
                    {d.location && <span className="eyebrow text-[11px] text-ink-soft">{d.location}</span>}
                  </div>
                  {d.tagline && <p className="text-xs text-ink-soft leading-relaxed line-clamp-1 italic">{d.tagline}</p>}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Marketplace Experience Showcase (Bento Grid) */}
      <Section className="border-t border-hairline bg-white">
        <Container>
          <div className="mb-16 text-center max-w-xl mx-auto">
            <Eyebrow>Digital Flagship</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl mt-2">The Marketplace Experience</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px] md:auto-rows-[280px]">
            {/* Bento Block 1: Storefronts */}
            <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden bg-bone flex flex-col justify-end p-8 border border-hairline">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img src={d2} alt="Storefront interface presentation" className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 transition-transform duration-1000 ease-out" />
              <div className="relative z-20 text-white">
                <span className="text-[10px] font-mono tracking-widest text-gold uppercase mb-2 block">Immersive Modules</span>
                <h3 className="font-display text-3xl mb-2">Designer Storefronts</h3>
                <p className="text-white/60 text-xs max-w-md font-light leading-relaxed">Each house controls a bespoke, non-templated digital window showing their absolute creative vision and raw identity.</p>
              </div>
            </div>

            {/* Bento Block 2: Editorial Collections */}
            <div className="group relative overflow-hidden bg-black flex flex-col justify-end p-6 border border-white/10">
              <div className="absolute inset-0 bg-black/40 z-10" />
              <div className="relative z-20 text-white">
                <span className="text-[10px] font-mono tracking-widest text-gold uppercase mb-1 block">Curated Focus</span>
                <h3 className="font-display text-xl mb-1">Editorial Collections</h3>
                <p className="text-white/50 text-[11px] font-light leading-relaxed">No generic item grids. Items are compiled into structured seasonal thematic lookbooks.</p>
              </div>
            </div>

            {/* Bento Block 3: Product Storytelling */}
            <div className="group relative overflow-hidden bg-bone flex flex-col justify-end p-6 border border-hairline">
              <div className="absolute inset-0 bg-gradient-to-t from-bone via-bone/60 to-transparent z-10" />
              <div className="relative z-20 text-black">
                <span className="text-[10px] font-mono tracking-widest text-ink-soft uppercase mb-1 block">Traceability</span>
                <h3 className="font-display text-xl mb-1">Product Storytelling</h3>
                <p className="text-ink-soft/70 text-[11px] leading-relaxed">Deep visibility into textiles, stitch construction methodologies, and the specific artisans involved.</p>
              </div>
            </div>

            {/* Bento Block 4: Luxury Shopping */}
            <div className="md:col-span-3 group relative overflow-hidden bg-black text-white h-48 md:h-auto flex items-center p-8 md:p-12 border border-white/10">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 mix-blend-luminosity hidden md:block">
                <img src={d3} alt="Abstract fabric texture close up" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-20 max-w-xl">
                <span className="text-[10px] font-mono tracking-widest text-gold uppercase mb-2 block">The Standard</span>
                <h3 className="font-display text-2xl md:text-4xl mb-3">Uncompromised Luxury Shopping</h3>
                <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed">
                  White-glove digital distribution, end-to-end authentication parameters, global duty management, and ultra-premium sustainable packaging execution.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Why Adorzia Marketplace */}
      <Section className="bg-black text-white border-y border-white/10">
        <Container>
          <div className="mb-16">
            <Eyebrow className="text-gold">Strategic Architecture</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl mt-2 text-white">Why Adorzia Marketplace?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Verified Designers Only", desc: "Rigorous vetting. Admission requires advanced pattern proficiency, absolute material authenticity, and ethical production practices." },
              { title: "Curated Luxury Fashion", desc: "A sanctuary free from consumerism clutter. We limit available designers and drops to ensure absolute high-tier artistic value." },
              { title: "Emerging Fashion Houses", desc: "The direct access point to tomorrow's global heritage icons before they intersect traditional institutional gatekeepers." },
              { title: "Global Exposure", desc: "Direct distribution pipelines linking local Eastern craftsmanship studios seamlessly with luxury buyers across international metropolises." },
              { title: "Heritage Craftsmanship", desc: "Honoring traditional specialized skills through contemporary luxury frameworks, Western silhouettes, and modern technology structures." },
              { title: "Investment-backed Creatives", desc: "Supported directly by Adorzia's overarching incubation ecosystem, capital resources, and real physical coworking spaces." }
            ].map((item, i) => (
              <div key={i} className="border border-white/10 p-8 hover:border-gold/50 transition-colors duration-500 flex flex-col justify-between bg-white/[0.02]">
                <div>
                  <span className="text-xs font-mono text-gold mb-6 block">0{i+1} //</span>
                  <h3 className="font-display text-xl text-white mb-3 tracking-wide">{item.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Fashion Categories Preview */}
      <Section className="overflow-hidden bg-white">
        <Container>
          <div className="mb-12 flex justify-between items-end">
            <div>
              <Eyebrow>The Collections</Eyebrow>
              <h2 className="font-display text-4xl md:text-5xl mt-2">Design Verticals</h2>
            </div>
            <span className="text-xs font-mono text-ink-soft hidden md:block">Scroll Matrix →</span>
          </div>
          
          {/* Horizontal Grid Row */}
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
            {[
              { title: "Womenswear", img: d1 },
              { title: "Menswear", img: d2 },
              { title: "Couture", img: d3 },
              { title: "Streetwear", img: d1 },
              { title: "Accessories", img: d2 },
              { title: "Artisan Craft", img: d3 }
            ].map((cat, idx) => (
              <div key={idx} className="min-w-[260px] md:min-w-[320px] aspect-[4/5] bg-bone relative snap-start group overflow-hidden border border-hairline">
                <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter grayscale contrast-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-display text-2xl text-white uppercase tracking-wide">{cat.title}</h3>
                  <span className="text-[10px] font-mono text-gold tracking-widest uppercase block mt-1">Explore Spectrum</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Interactive Product Showcase */}
      <Section className="bg-bone/30 border-t border-hairline">
        <Container>
          <div className="mb-14 text-center">
            <Eyebrow>Anatomy of Product</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl mt-2">Bespoke Editorial Previews</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Display Visual Card */}
            <div className="relative aspect-[3/4] bg-black overflow-hidden group border border-hairline shadow-xl">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img src={d3} alt="Editorial luxury garment feature showcase" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]" />
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-white/10 z-20">
                <span className="text-[9px] font-mono tracking-widest text-gold uppercase">Focus Blueprint 014</span>
              </div>
            </div>

            {/* Content Interactive Details */}
            <div className="space-y-8 p-4">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-gold">Featured Technical Highlight</span>
                <h3 className="font-display text-3xl md:text-4xl mt-2 tracking-tight">Sculptural Draping & Raw Silk Fusion</h3>
                <p className="text-ink-soft text-sm font-light leading-relaxed mt-4">
                  Experience true tactile premium detailing. Our marketplace interface implements highly refined micro-interactions, giving collectors rich multi-angle documentation, real production tech pack transparency, and uncompressed fiber analysis before committing to an acquisition.
                </p>
              </div>

              <div className="border-t border-hairline pt-6 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-medium block text-black">Silhouette Focus</span>
                  <span className="text-ink-soft/80 font-light mt-1 block">Structured Western/Asymmetric</span>
                </div>
                <div>
                  <span className="font-medium block text-black">Artisan Intersect</span>
                  <span className="text-ink-soft/80 font-light mt-1 block">Zardozi Motif Crafting</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* "Built for Designers" Section */}
      <Section className="bg-black text-white">
        <Container className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <Eyebrow className="text-gold">The Creative Code</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl mt-2 text-white leading-tight uppercase">Built For <br/>Designers.</h2>
          </div>
          <div className="md:col-span-7 space-y-6 md:pl-8 border-l border-white/10">
            <div>
              <h3 className="text-md font-medium text-gold tracking-wider uppercase">No Traditional Marketplace Clutter</h3>
              <p className="text-xs text-white/60 font-light mt-1 leading-relaxed">We eliminate invasive ads, banner popups, aggressive promotions, or race-to-the-bottom discounts. Your work breathing space is sacred.</p>
            </div>
            <div>
              <h3 className="text-md font-medium text-gold tracking-wider uppercase">Editorial Presentation</h3>
              <p className="text-xs text-white/60 font-light mt-1 leading-relaxed">Collections are displayed identically to high-tier independent digital lookbooks, preserving creative integrity over standard catalog parameters.</p>
            </div>
            <div>
              <h3 className="text-md font-medium text-gold tracking-wider uppercase">Brand-First Experience</h3>
              <p className="text-xs text-white/60 font-light mt-1 leading-relaxed">The algorithm doesn't govern visibility. Each designer commands complete control over their voice, storytelling, price matrix, and narrative parameters.</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Marketplace Features Grid */}
      <Section className="bg-white">
        <Container>
          <div className="mb-14 text-center max-w-xl mx-auto">
            <Eyebrow>Infrastructure Matrix</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl mt-2">Engineered Architecture</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Designer Profiles", desc: "Complete aesthetic nodes detailing historical arcs, individual press files, and creative philosophy documentation." },
              { title: "Collection Launches", desc: "Bespoke countdown landing modules built exclusively for capsule drops and seasonal collection arrivals." },
              { title: "Global Buyers", desc: "Integrated global checkout framework covering real-time compliance pipelines for seamless international commerce delivery." },
              { title: "Fashion Editorials", desc: "Bespoke media features pairing fashion critics, stylists, and creatives to present depth behind garments." },
              { title: "Secure Commerce", desc: "Encrypted verification chains covering supply management, product authentication, and secure settlement." },
              { title: "Digital Fashion Presence", desc: "High-tier optimized architectural interfaces delivering lightning fast response matrices across any consumer viewport." }
            ].map((f, i) => (
              <div key={i} className="p-6 border border-hairline bg-bone/20 hover:bg-bone/40 transition-colors duration-300">
                <h3 className="font-display text-lg text-black mb-2">{f.title}</h3>
                <p className="text-xs text-ink-soft leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Spotlight Integration Section */}
      <Section className="bg-bone/50 border-y border-hairline relative overflow-hidden">
        <div className="absolute right-[-10%] bottom-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
        <Container className="max-w-4xl text-center">
          <span className="text-[10px] font-mono tracking-[0.4em] text-gold uppercase bg-black px-3 py-1 border border-white/10 rounded-sm">Synergy Pipeline</span>
          <h2 className="font-display text-4xl md:text-6xl mt-6 tracking-tight uppercase">Spotlight Talent Integration</h2>
          <p className="text-ink-soft text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto mt-6">
            Winners of our prestigious national **Adorzia Spotlight Fall 2026** talent hunt receive direct, guaranteed distribution allocation on our digital marketplace platform, paired with full-stack manufacturing mentorship, global launch visibility, and strategic capital distribution.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-16 h-[1px] bg-gold" />
          </div>
        </Container>
      </Section>

      {/* Testimonials / Future Voices */}
      <Section className="bg-white">
        <Container>
          <div className="mb-14 text-center">
            <Eyebrow>The Council Sentiment</Eyebrow>
            <h2 className="font-display text-4xl md:text-5xl mt-2">Future Voices</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-hairline p-8 bg-bone/10 relative">
              <span className="text-6xl font-display text-gold/20 absolute top-4 left-4 pointer-events-none">“</span>
              <p className="text-sm italic text-ink-soft leading-relaxed font-light relative z-10 pt-4">
                "Adorzia's marketplace approach protects the artistic integrity of independent houses. It represents exactly what a digital luxury platform should be — architectural, focused, clean, and deeply rooted in product storytelling."
              </p>
              <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between text-xs">
                <span className="font-medium text-black">Strategic Advisory Council</span>
                <span className="text-ink-soft/60 font-mono">Evaluation Note</span>
              </div>
            </div>

            <div className="border border-hairline p-8 bg-bone/10 relative">
              <span className="text-6xl font-display text-gold/20 absolute top-4 left-4 pointer-events-none">“</span>
              <p className="text-sm italic text-ink-soft leading-relaxed font-light relative z-10 pt-4">
                "By matching local premium production capabilities with global logistics systems, this ecosystem allows emerging Pakistani design graduates to present couture directly on the world's primary stages without compromise."
              </p>
              <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between text-xs">
                <span className="font-medium text-black">Fashion Pedagogy & Design Mentor</span>
                <span className="text-ink-soft/60 font-mono">Advisory Panel</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Luxury Metrics Strip */}
      <section className="bg-black text-white border-y border-white/10 py-16">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <span className="font-display text-4xl md:text-5xl text-gold block mb-1 font-light">100+</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-white/50">Emerging Designers</span>
            </div>
            <div>
              <span className="font-display text-4xl md:text-5xl text-gold block mb-1 font-light">Global</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-white/50">Distribution Reach</span>
            </div>
            <div>
              <span className="font-display text-4xl md:text-5xl text-gold block mb-1 font-light">Curated</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-white/50">Exclusivity Access</span>
            </div>
            <div>
              <span className="font-display text-4xl md:text-5xl text-gold block mb-1 font-light">Incubated</span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-white/50">Ecosystem Framework</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Behind the Platform Section */}
      <Section className="bg-white border-b border-hairline">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <Eyebrow>The Architecture</Eyebrow>
              <h2 className="font-display text-4xl md:text-5xl mt-2 tracking-tight">Behind the Platform</h2>
            </div>
            <p className="text-ink-soft text-sm font-light leading-relaxed">
              Adorzia Marketplace is not merely lines of code; it is an expansion node of our real physical ecosystem. We operate complete physical multi-floor fashion coworking studios across major metropolitan sectors, coupled with direct material supply lines, elite production mentorship, and structured private institutional investor networks.
            </p>
            <ul className="space-y-3 font-light text-xs text-black pt-2">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-gold rounded-full" /> Physical 2-Floor Coworking Design Studios
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-gold rounded-full" /> Complete Sample Room Production Infrastructure
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-gold rounded-full" /> Direct Strategic Board Investor Access
              </li>
            </ul>
          </div>
          <div className="bg-bone aspect-video md:aspect-[4/3] overflow-hidden border border-hairline relative">
            <img src={d2} alt="Physical production design studio overview" className="w-full h-full object-cover filter contrast-[1.02] brightness-[0.95]" />
          </div>
        </Container>
      </Section>

      {/* Countdown Section */}
      <section className="bg-bone/40 py-20 text-center border-b border-hairline relative">
        <Container className="max-w-xl">
          <span className="text-[10px] font-mono tracking-[0.3em] text-gold uppercase block mb-6">// Global Synchronicity Timer //</span>
          <div className="flex justify-center gap-6 md:gap-10">
            {[
              { label: "Days", val: timeLeft.days },
              { label: "Hrs", val: timeLeft.hours },
              { label: "Min", val: timeLeft.minutes },
              { label: "Sec", val: timeLeft.seconds }
            ].map((unit, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-display text-4xl md:text-6xl text-black font-light tracking-tight tabular-nums">
                  {String(unit.val).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase font-mono tracking-widest text-ink-soft/60 mt-1">{unit.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Early Access / Waitlist CTA */}
      <section id="waitlist-section" className="bg-black text-white py-24 md:py-32 relative overflow-hidden">
        <Container className="max-w-2xl text-center relative z-20">
          <span className="text-xs uppercase tracking-[0.4em] text-gold font-medium mb-4 block">Limited Dossier Access</span>
          <h2 className="font-display text-3xl md:text-5xl text-white tracking-wide uppercase">Request Early Invitation</h2>
          <p className="text-white/50 text-xs md:text-sm font-light leading-relaxed max-w-md mx-auto mt-4 mb-10">
            Get notified instantly when Adorzia Marketplace goes live. Access early private collection drops and lookbook privileges.
          </p>
          
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL ADDRESS" 
              required
              className="bg-white/5 text-white border border-white/20 px-4 py-3.5 text-xs tracking-wider placeholder:text-white/30 focus:outline-none focus:border-gold focus:bg-white/[0.08] transition-all duration-300 flex-grow uppercase font-mono" 
            />
            <button 
              type="submit" 
              className="bg-gold text-black hover:bg-white transition-all duration-500 font-medium uppercase tracking-widest text-xs py-3.5 px-8 font-mono shrink-0"
            >
              Secure Entry
            </button>
          </form>
        </Container>
      </section>

      {/* Final Cinematic Closing Banner */}
      <section className="bg-black text-white h-[60vh] min-h-[400px] flex items-center justify-center text-center border-t border-white/10 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
        <Container className="relative z-20">
          <span className="text-[10px] font-mono tracking-[0.5em] text-gold uppercase block mb-6">Adorzia Studio Manifesto</span>
          <h2 className="font-display text-5xl md:text-8xl text-white tracking-tighter uppercase font-extralight select-none animate-pulse" style={{ animationDuration: '6s' }}>
            Where <br/><span className="italic font-light tracking-wide text-white/90">Visionaries Rise</span>
          </h2>
        </Container>
      </section>
    </SiteLayout>
  );
}