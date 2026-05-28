import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { SiteLayout, Container, Section, Eyebrow } from "@/components/site/SiteLayout";
import { Testimonials } from "@/components/site/Testimonials";
import { PartnerLogos } from "@/components/site/PartnerLogos";
import { Timeline } from "@/components/site/Timeline";
import {
  getSiteSettings,
  listFeaturedDesigners,
} from "@/lib/public-data.functions";
import heroHome from "@/assets/hero-banner-coworking-studio 1 .png";
import studio from "@/assets/hero-banner-coworking-studio-2.png";
import spotlight from "@/assets/fashion-icon.png";
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
      { title: "Adorzia — Collaborative Fashion House & Marketplace" },
      {
        name: "description",
        content:
          "Adorzia is a collaborative fashion house, coworking studio, curated marketplace, and global Spotlight programme for emerging designers.",
      },
      { name: "keywords", content: "fashion incubator, emerging designers, fashion studio, designer marketplace, fashion spotlight, creative entrepreneurship, fashion incubation" },
      { property: "og:title", content: "Adorzia — Where emerging designers become houses" },
      {
        property: "og:description",
        content: "Studio. Marketplace. Spotlight. Built for the next generation of fashion.",
      },
      { property: "og:image", content: heroHome },
      { property: "og:url", content: "https://adorzia.com" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Adorzia — Fashion Incubation Studio" },
      {
        name: "twitter:description",
        content: "Studio. Marketplace. Spotlight. Built for the next generation of fashion.",
      },
      { name: "twitter:image", content: heroHome },
      { rel: "canonical", href: "https://adorzia.com" } as never,
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
  { id: "f1", slug: "atelier-noir", name: "Atelier Noir", tagline: "Tailored luxury streetwear", portrait_url: d1, cover_url: d1, location: "Karachi" },
  { id: "f2", slug: "house-of-vellum", name: "House of Vellum", tagline: "Sculptural minimalist menswear", portrait_url: d2, cover_url: d2, location: "Lahore" },
  { id: "f3", slug: "studio-iris", name: "Studio Iris", tagline: "Avant-garde luxury drapery", portrait_url: d3, cover_url: d3, location: "Islamabad" },
] as const;

function Home() {
  const settings = useSuspenseQuery(settingsQO).data;
  const featured = useSuspenseQuery(featuredQO).data;
  const designers = featured.length ? featured : FALLBACK_DESIGNERS;

  // Hero carousel state with completely dedicated copy variants per slide
  const slides = [
    { 
      image: heroHome, 
      eyebrow: "Fashion house ecosystem & creative commerce",
      title: (
        <>
          Where <span className="text-[#bb9457] block sm:inline">emerging designers</span> become the houses of tomorrow.
        </>
      ),
      subtitle: "Adorzia provides shared physical infrastructure, premium marketplace curation, and industrial scaling pathways for global independent micro-studios.",
      ctaPrimary: { label: "Apply to Spotlight", to: "/spotlight" },
      ctaSecondary: { label: "Discover Marketplace", to: "/marketplace" },
      label: "Adorzia Editorial" 
    },
    { 
      image: studio, 
      eyebrow: "Industrial Infrastructure & Shared Space",
      title: (
        <>
          The <span className="text-[#bb9457] block sm:inline">Atelier Workspace</span> engineered for raw production.
        </>
      ),
      subtitle: "Unlock heavy machinery, fully operational pattern benches, advanced garment tailoring rooms, and a physical community library built to scale your workflow.",
      ctaPrimary: { label: "Explore Studio", to: "/for-creatives" },
      ctaSecondary: { label: "Book a Residency", to: "/for-creatives" },
      label: "The Atelier Workspace" 
    },
    { 
      image: spotlight, 
      eyebrow: "Global Showcase & Venture Support",
      title: (
        <>
          Step into the <span className="text-[#bb9457] block sm:inline">Spotlight Program</span> and launch your brand.
        </>
      ),
      subtitle: "Submit your design manifesto, secure dedicated non-equity capitalization grants, and position your collections directly in front of tier-one international buyers.",
      ctaPrimary: { label: "Submit Portfolio", to: "/spotlight" },
      ctaSecondary: { label: "View Prize Details", to: "/spotlight" },
      label: "Spotlight Runway" 
    }
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Application Countdown Engine
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 8, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000); // Extended slightly to let users comfortably read distinct copies
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, []);

  const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
  const nextIndex = (currentIndex + 1) % slides.length;

  // Featured designers scroll state
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const primaryDesigner = designers?.[0];
  const carouselDesigners = designers?.slice(1) || [];
  const repeatedDesigners = [...carouselDesigners, ...carouselDesigners, ...carouselDesigners];

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const totalScrollable = scrollWidth - clientWidth;
      if (totalScrollable > 0) {
        setScrollProgress((scrollLeft / totalScrollable) * 100);
      }
    }
  };

  const scrollDeck = (direction: "next" | "prev") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 344;
      scrollContainerRef.current.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Geometric custom styles for injection
  const geometricStyles = {
    backgroundImage: `
      linear-gradient(30deg, #432818 12%, transparent 12.5%, transparent 87%, #432818 87.5%, #432818),
      linear-gradient(150deg, #432818 12%, transparent 12.5%, transparent 87%, #432818 87.5%, #432818),
      linear-gradient(30deg, #432818 12%, transparent 12.5%, transparent 87%, #432818 87.5%, #432818),
      linear-gradient(150deg, #432818 12%, transparent 12.5%, transparent 87%, #432818 87.5%, #432818),
      linear-gradient(60deg, rgba(153, 88, 42, 0.1) 25%, transparent 25.5%, transparent 75%, rgba(153, 88, 42, 0.1) 75.5%, rgba(153, 88, 42, 0.1)),
      linear-gradient(60deg, rgba(153, 88, 42, 0.1) 25%, transparent 25.5%, transparent 75%, rgba(153, 88, 42, 0.1) 75.5%, rgba(153, 88, 42, 0.1))
    `,
    backgroundSize: "80px 140px",
    backgroundPosition: "0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px"
  };

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-black text-[#ffe6a7] min-h-screen flex items-center">
        {/* Full Screen Background Banners Carousel */}
        <div className="absolute inset-0 z-0">
          {/* Dark high-end multi-layered overlay system */}
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(187,148,87,0.1),transparent_50%)] z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
          
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-35 scale-100" : "opacity-0 scale-105"
              }`}
            />
          ))}
        </div>

        {/* Elegant structural lines overlay */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none z-10 mix-blend-screen">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-elegant-lines" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="#bb9457" strokeWidth="0.5" />
                <path d="M 40 6 L 74 40 L 40 74 L 6 40 Z" fill="none" stroke="#bb9457" strokeWidth="0.25" strokeOpacity="0.5" />
                <line x1="40" y1="0" x2="40" y2="80" stroke="#bb9457" strokeWidth="0.25" strokeOpacity="0.3" />
                <line x1="0" y1="40" x2="80" y2="40" stroke="#bb9457" strokeWidth="0.25" strokeOpacity="0.3" />
                <circle cx="40" cy="40" r="1" fill="#bb9457" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-elegant-lines)" />
          </svg>
        </div>

        <div className="absolute -top-40 left-0 w-[700px] h-[700px] bg-[#bb9457]/5 blur-[150px] rounded-full pointer-events-none z-10" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-black/60 blur-[180px] rounded-full pointer-events-none z-10" />

        <Container className="relative z-20 grid lg:grid-cols-12 gap-16 lg:gap-24 py-24 lg:py-32 items-center w-full">
          {/* Main Copy Area - Automatically changes structural content based on currentIndex */}
          <div className="lg:col-span-7 order-2 lg:order-1 min-h-[480px] flex flex-col justify-center">
            <div className="inline-flex self-start items-center gap-3 border border-white/10 bg-white/[0.03] backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg transition-transform duration-500 hover:scale-102">
              <span className="w-2 h-2 rounded-full bg-[#bb9457] animate-pulse" />
              <Eyebrow>
                <span className="text-xs uppercase tracking-[0.25em] text-white font-medium transition-all duration-500">
                  {currentIndex === 0 && settings?.hero_eyebrow ? settings.hero_eyebrow : slides[currentIndex].eyebrow}
                </span>
              </Eyebrow>
            </div>

            <h1 className="mt-8 font-display text-4xl md:text-6xl lg:text-[4.8rem] xl:text-[5.5rem] leading-[1.0] tracking-tight max-w-4xl text-white transition-all duration-700 ease-in-out">
              {slides[currentIndex].title}
            </h1>

            <p className="mt-8 max-w-xl text-base md:text-lg text-white/70 leading-relaxed font-light transition-all duration-700 ease-in-out">
              {currentIndex === 0 && settings?.hero_subtitle ? settings.hero_subtitle : slides[currentIndex].subtitle}
            </p>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <Link
                to={slides[currentIndex].ctaPrimary.to}
                className="inline-flex items-center justify-center bg-[#bb9457] text-black font-semibold px-9 py-4 rounded-full text-[11px] uppercase tracking-[0.25em] transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-[0_12px_30px_rgba(187,148,87,0.25)]"
              >
                {slides[currentIndex].ctaPrimary.label}
              </Link>

              <Link
                to={slides[currentIndex].ctaSecondary.to}
                className="inline-flex items-center justify-center border-2 border-[#bb9457] text-[#bb9457] font-semibold px-9 py-[14px] rounded-full text-[11px] uppercase tracking-[0.25em] transition-all duration-300 hover:bg-[#bb9457] hover:text-black hover:scale-105"
              >
                {slides[currentIndex].ctaSecondary.label}
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl border-t border-white/10 pt-8">
              <div className="group cursor-default">
                <div className="font-display text-3xl md:text-4xl text-white font-light group-hover:text-[#bb9457] transition-colors duration-300">
                  100+
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/40 font-medium">
                  Designers
                </div>
              </div>

              <div className="group cursor-default">
                <div className="font-display text-3xl md:text-4xl text-white font-light group-hover:text-[#bb9457] transition-colors duration-300">
                  Global
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/40 font-medium">
                  Marketplace
                </div>
              </div>

              <div className="group cursor-default">
                <div className="font-display text-3xl md:text-4xl text-white font-light group-hover:text-[#bb9457] transition-colors duration-300">
                  2026
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/40 font-medium">
                  Spotlight Launch
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Card & Controls Side Frame */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex items-center justify-center">
            <div className="relative w-full max-w-[400px] lg:max-w-none px-4 sm:px-10 lg:px-0">
              <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-[2.5rem] border border-white/15 bg-black/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
                {slides.map((slide, index) => (
                  <img
                    key={index}
                    src={slide.image}
                    alt={slide.label}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      index === currentIndex 
                        ? "opacity-100 scale-100 z-10" 
                        : "opacity-0 scale-110 z-0"
                    }`}
                  />
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.4),transparent_75%)] z-20" />

                <div className="absolute bottom-8 left-8 right-8 z-30 transform transition-all duration-500">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-[#bb9457] font-semibold block mb-1">
                    Active Blueprint
                  </span>
                  <h3 className="text-xl font-display text-white tracking-wide">
                    {slides[currentIndex].label}
                  </h3>
                </div>
              </div>

              {/* Deck Navigation Buttons */}
              <button 
                onClick={() => setCurrentIndex(prevIndex)}
                className="absolute -left-14 top-16 hidden xl:block w-32 aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-white/10 shadow-2xl transition-all duration-700 hover:-translate-y-2 hover:-rotate-2 group z-30"
                aria-label="Previous slide"
              >
                <img src={slides[prevIndex].image} alt="Previous preview" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
              </button>

              <button 
                onClick={() => setCurrentIndex(nextIndex)}
                className="absolute -right-14 bottom-16 hidden xl:block w-36 aspect-[3/4] overflow-hidden rounded-[1.5rem] border border-white/10 shadow-2xl transition-all duration-700 hover:translate-y-2 hover:rotate-2 group z-30"
                aria-label="Next slide"
              >
                <img src={slides[nextIndex].image} alt="Next preview" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
              </button>

              {/* Progress Bullet Trackers */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-[3px] rounded-full transition-all duration-500 ease-out ${index === currentIndex ? "w-12 bg-[#bb9457]" : "w-3 bg-white/20 hover:bg-white/40"}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

     {/* ========================= Start Section 10: Why Adorzia Exists ========================= */}
<section className="bg-white text-black py-36 relative overflow-hidden border-b border-black/5">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04),transparent_70%)] pointer-events-none" />
  
  <Container className="text-center max-w-5xl mx-auto relative z-10">
    <div className="text-[#6b7280] tracking-[0.4em] mb-8">
      <Eyebrow>Our Manifesto</Eyebrow>
    </div>

    <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight leading-[1.15] text-black">
      “The world doesn’t need{" "}
      <span className="italic font-serif font-normal text-[#432818]">
        more brands
      </span>.
      <br />
      It needs original{" "}
      <span className="font-normal">fashion houses</span>.”
    </h2>

    <div className="w-24 h-[1px] bg-black/20 mx-auto mt-12" />
  </Container>
</section>
{/* ========================== End Section 10: Why Adorzia Exists ========================== */}

     {/* ========================= Start Philosophy Section ========================= */}
<Section className="relative overflow-hidden border-b border-white/10 bg-black text-white">

  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/images/fashion-dark-editorial.jpg"
      alt="Adorzia Philosophy Background"
      className="w-full h-full object-cover opacity-30"
    />
    <div className="absolute inset-0 bg-black/75" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_70%)]" />
  </div>

  <Container className="relative z-10">
    <div className="grid md:grid-cols-12 gap-10 items-center">

      <div className="md:col-span-4">
        <div className="text-[#c6a15b] tracking-[0.35em] uppercase">
          <Eyebrow>The Adorzia Philosophy</Eyebrow>
        </div>
      </div>

      <p className="md:col-span-8 font-display text-2xl md:text-4xl leading-[1.25] tracking-[-0.01em] text-white/90">
        We believe the future of fashion belongs to the makers — those willing
        to challenge convention, build a vocabulary of their own, and operate
        as both artist and entrepreneur.
      </p>

    </div>
  </Container>
</Section>
{/* ========================== End Philosophy Section ========================== */}

     {/* ========================= Start Ecosystem Pillars Section ========================= */}
<Section className="border-b border-black/5 bg-white text-[#432818]">
  <Container>

    <div className="flex items-end justify-between mb-16">
      <div className="text-[#99582a]">
        <Eyebrow>Three pillars</Eyebrow>
      </div>

      <div className="hidden md:block font-display text-3xl text-[#432818]">
        A complete ecosystem
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-12 md:gap-8">
      {[
        {
          img: studio,
          eyebrow: "01 — Studio",
          title: "Fashion Coworking",
          body:
            "A working atelier with mannequins, sewing stations, fabric library, and shared resources for emerging brands.",
          to: "/for-creatives",
        },
        {
          img: craft,
          eyebrow: "02 — Marketplace",
          title: "Curated Commerce",
          body:
            "A digital showroom for our designers — profiles, collections, and signature pieces presented with editorial care.",
          to: "/marketplace",
        },
        {
          img: spotlight,
          eyebrow: "03 — Spotlight",
          title: "Annual Programme",
          body:
            "Submit your collection. Compete for cash prizes, investment, free studio time, and a marketplace placement.",
          to: "/spotlight",
        },
      ].map((p) => (
        <Link key={p.title} to={p.to} className="group">

          <div className="aspect-[4/5] overflow-hidden bg-[#f8f8f8] mb-6 rounded-2xl border border-black/10 shadow-sm">
            <img
              src={p.img}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>

          <div className="text-[#99582a]">
            <Eyebrow>{p.eyebrow}</Eyebrow>
          </div>

          <h3 className="mt-4 font-display text-3xl text-[#432818] group-hover:text-[#6f1d1b] transition-colors">
            {p.title}
          </h3>

          <p className="mt-3 text-sm text-[#432818]/80 leading-relaxed">
            {p.body}
          </p>

          <div className="mt-5 text-[11px] uppercase tracking-[0.28em] border-b border-[#432818] inline-block pb-1 group-hover:text-[#99582a] group-hover:border-[#99582a] transition-colors">
            Discover →
          </div>

        </Link>
      ))}
    </div>

  </Container>
</Section>
{/* ========================== End Ecosystem Pillars Section ========================== */}

   {/* ========================= Start Fashion Entrepreneurship Process Section ========================= */}
<section
  style={geometricStyles}
  className="relative overflow-hidden bg-black text-white py-36 border-b border-white/10"
>

  {/* Cinematic Background Image */}
  <div className="absolute inset-0">
    <img
      src="/images/editorial-fashion-dark.jpg"
      alt="Fashion Background"
      className="w-full h-full object-cover opacity-20 scale-105"
    />

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/80" />

    {/* Luxury Gradient */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(187,148,87,0.12),transparent_45%)]" />

    {/* Soft Bottom Fade */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
  </div>

  <Container className="relative z-10">

    {/* Heading */}
    <div className="max-w-4xl mb-24">
      <div className="text-[#bb9457] tracking-[0.35em] uppercase mb-5">
        <Eyebrow>Ecosystem Pipeline</Eyebrow>
      </div>

      <h2 className="font-display text-4xl md:text-6xl leading-[1.05] tracking-tight text-white">
        The Fashion <span className="text-[#bb9457] italic">Entrepreneurship</span> Process
      </h2>

      <p className="mt-6 text-[#ffe6a7]/60 max-w-2xl text-sm md:text-base leading-relaxed">
        A structured journey designed to transform independent designers into globally positioned fashion houses.
      </p>
    </div>

    {/* Timeline */}
    <div className="relative">

      {/* Connecting Line */}
      <div className="absolute top-[34px] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#bb9457]/30 to-transparent hidden lg:block" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 relative z-10">

        {[
          {
            step: "01",
            title: "Apply",
            desc: "Submit your creative portfolio or active brand manifesto to the Spotlight board."
          },
          {
            step: "02",
            title: "Selected Designers",
            desc: "Our global selection panel selects visionaries for incubator cohorts."
          },
          {
            step: "03",
            title: "Studio Access",
            desc: "Unlock shared heavy production machinery and workspace infrastructure."
          },
          {
            step: "04",
            title: "Brand Development",
            desc: "Refine patterns, tech-packs, merchandising plans, and legal equity models."
          },
          {
            step: "05",
            title: "Marketplace Launch",
            desc: "Your collections launch natively on our curated editorial commerce engine."
          },
          {
            step: "06",
            title: "Global Exposure",
            desc: "Direct distribution routes to retailers in Paris, London, and Dubai."
          }
        ].map((item, i) => (
          <div
            key={i}
            className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-500 hover:border-[#bb9457]/40 hover:bg-white/[0.05] hover:-translate-y-1"
          >

            {/* Step Number */}
            <div className="w-16 h-16 rounded-full bg-black/70 border border-white/10 flex items-center justify-center font-mono text-sm font-semibold text-[#bb9457] transition-all duration-500 group-hover:border-[#bb9457] group-hover:bg-[#6f1d1b]/40 mb-8 shadow-[0_0_30px_rgba(187,148,87,0.08)]">
              {item.step}
            </div>

            {/* Title */}
            <h4 className="font-display text-xl tracking-wide text-white group-hover:text-[#bb9457] transition-colors duration-300">
              {item.title}
            </h4>

            {/* Description */}
            <p className="text-sm text-[#ffe6a7]/65 leading-relaxed mt-4">
              {item.desc}
            </p>

          </div>
        ))}
      </div>
    </div>
  </Container>
</section>
{/* ========================== End Fashion Entrepreneurship Process Section ========================== */}

    {/* Section 15: Editorial Fashion Quote Break 1 */}
<div className="bg-[#6f1d1b] text-center py-20 border-b border-white/10">
  <p className="font-serif italic text-2xl md:text-3xl text-[#ffe6a7] tracking-wide">
    “Craftsmanship is the new luxury.”
  </p>
</div>

     {/* Section 1: Designer Success Stories */}
<Section className="border-b border-hairline bg-white">
  <Container>
    <div className="mb-16">
      <div className="text-[#99582a]"><Eyebrow>Incubator Impact</Eyebrow></div>
      <h2 className="font-display text-4xl md:text-5xl mt-2 text-[#432818]">
        Designer Success Stories
      </h2>
    </div>

    <div className="grid lg:grid-cols-2 gap-12">
      {[
        {
          title: "From university graduate to stocked designer",
          tag: "Case Study 01",
          desc: "Built their first comprehensive commercial capsule through the Adorzia physical coworking spaces inside 6 months.",
          timeline: ["Month 1: Techpack Architecture", "Month 3: Sample Prototyping", "Month 6: Runway Launch"],
          stat: "+240% Revenue Milestone"
        },
        {
          title: "Preserving heritage craft through technical structure",
          tag: "Case Study 02",
          desc: "Bridging classic regional hand-weaving techniques with global minimalist silhouettes, driving instant global orders.",
          timeline: ["Month 1: Artisan Integration", "Month 3: Pattern Grading", "Month 6: Market Curation"],
          stat: "Sold Out Open-Edition Capsule"
        }
      ].map((story, i) => (
        <div
          key={i}
          className="border border-white/10 p-10 rounded-[2rem] bg-[#6f1d1b] flex flex-col justify-between hover:shadow-xl transition-all duration-500 hover:border-[#bb9457]"
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#ffe6a7] font-semibold">
              {story.tag}
            </span>

            <h3 className="font-display text-2xl md:text-3xl mt-4 text-white leading-tight">
              {story.title}
            </h3>

            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              {story.desc}
            </p>

            <div className="mt-8 pt-8 border-t border-white/10">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/50 block mb-4">
                Studio Journey Timeline
              </span>

              <div className="space-y-2">
                {story.timeline.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bb9457]" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="font-mono text-xs font-semibold text-[#ffe6a7]">
              {story.stat}
            </span>

            <span className="text-xs uppercase tracking-widest font-semibold text-white border-b border-white/40 pb-0.5 hover:text-[#ffe6a7] hover:border-[#ffe6a7] cursor-pointer transition-colors">
              Read Case Study →
            </span>
          </div>
        </div>
      ))}
    </div>
  </Container>
</Section>

      {/* Section 7: Fashion Disciplines Grid - START */}
<section className="bg-black text-white py-32 border-b border-white/5">
  <Container>
    <div className="text-center max-w-2xl mx-auto mb-20">
      <div className="text-[#bb9457]"><Eyebrow>Creative Breadth</Eyebrow></div>
      <h2 className="font-display text-4xl md:text-5xl mt-2 text-[#ffe6a7]">Cultivating All Disciplines</h2>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { name: "Couture", count: "12 Houses" },
        { name: "Streetwear", count: "24 Labels" },
        { name: "Luxury Menswear", count: "16 Ateliers" },
        { name: "Jewelry", count: "08 Designers" },
        { name: "Accessories", count: "14 Creators" },
        { name: "Textile Design", count: "19 Masters" },
        { name: "Footwear", count: "06 Studios" },
        { name: "Heritage Craftsmanship", count: "32 Artisans" }
      ].map((disc, idx) => (
        <div
          key={idx}
          className="group relative aspect-square border border-white/10 rounded-2xl bg-white/[0.02] p-8 flex flex-col justify-between hover:bg-[#6f1d1b] transition-all duration-500 hover:border-[#bb9457]"
        >
          <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center font-mono text-[10px] text-[#ffe6a7]/40 group-hover:text-white group-hover:border-white">
            {idx + 1}
          </div>

          <div>
            <h4 className="font-display text-xl md:text-2xl text-white">{disc.name}</h4>
            <p className="text-[11px] uppercase tracking-widest text-[#bb9457] mt-1 group-hover:text-[#ffe6a7]">
              {disc.count}
            </p>
          </div>
        </div>
      ))}
    </div>
  </Container>
</section>
{/* Section 7: Fashion Disciplines Grid - END */}

     {/* Section 3: Spotlight Prize Showcase */}
<section 
  className="bg-white text-neutral-800 py-24 relative overflow-hidden border-b border-neutral-100"
>
  {/* Subtle Ambient Depth Layer Instead of Radial Colors */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(0,0,0,0.01),transparent_70%)] pointer-events-none" />
  
  <Container className="relative z-10">
    {/* Clean Centered Header Structure */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <div className="inline-flex items-center gap-2 border border-neutral-200 bg-neutral-50 px-4 py-1.5 rounded-full mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-500 font-bold">Annual Talent Grants</span>
      </div>
      <h2 className="font-display text-4xl md:text-5xl tracking-tight text-neutral-950 font-light uppercase">
        The Spotlight Prize Showcase
      </h2>
    </div>

    {/* Structural Grid Layout */}
    <div className="grid lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
      
      {/* Featured Grand Prize Card - High Contrast Luxury Minimalist */}
      <div className="lg:col-span-4 bg-neutral-950 text-white p-8 rounded-[2rem] flex flex-col justify-between shadow-sm relative overflow-hidden">
        <div>
          <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase">Grand Prize</span>
          <div className="mt-4 font-display text-3xl md:text-4xl text-white tracking-tight font-light">
            300,000 PKR
          </div>
          <p className="mt-3 text-xs text-neutral-400 leading-relaxed font-light">
            Direct non-equity cash injection for baseline collection fabrication, material provisioning, and structural sample deployment.
          </p>
        </div>
        <div>
          <div className="w-full h-[1px] bg-white/10 my-5" />
          <div className="text-[10px] uppercase tracking-wider text-neutral-300 flex items-center gap-2 font-light">
            <span>★ Equity Funding Pool Backing</span>
          </div>
        </div>
      </div>

      {/* Grid Ecosystem List - Transparent Clean Framing */}
      <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
        {[
          { title: "Investment Opportunity", desc: "Direct route presentation to angel networks and structural seed venture capital panels." },
          { title: "Marketplace Placement", desc: "Immediate top-tier collection curation index natively within our premier commerce application." },
          { title: "Executive Mentorship", desc: "One-on-one strategy architecture with industry leaders, design educators, and trade counsel." },
          { title: "Studio Infrastructure Access", desc: "Comprehensive structural workspace reservations across premium workspace nodes." },
          { title: "Media Production Curation", desc: "High-end editorial lookup captures, profile publication syndication, and narrative promotion." },
          { title: "Retail Supply Pipelines", desc: "Established domestic and global transport paths mapped to direct premium buyers." }
        ].map((prize, idx) => (
          <div 
            key={idx} 
            className="border border-neutral-100 bg-neutral-50/50 p-6 rounded-2xl hover:border-neutral-300 hover:bg-white transition-all duration-300"
          >
            <h4 className="font-display text-sm text-neutral-950 font-medium tracking-wide uppercase">{prize.title}</h4>
            <p className="mt-1.5 text-xs text-neutral-500 leading-relaxed font-light">{prize.desc}</p>
          </div>
        ))}
      </div>

    </div>
  </Container>
</section>

     {/* Section 8: Studio Facilities Showcase - START */}
<Section className="border-b border-white/10 bg-[#0b0b0b]">
  <Container>
    
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
      <div className="max-w-xl">
        <div className="text-[#bb9457]">
          <Eyebrow>Industrial Infrastructure</Eyebrow>
        </div>

        <h2 className="font-display text-4xl md:text-5xl mt-2 text-white">
          Studio Facilities Showcase
        </h2>

        <p className="text-white/60 mt-4 leading-relaxed">
          A fully equipped ecosystem built for design, prototyping, and production — where ideas move from sketch to runway.
        </p>
      </div>
    </div>

  </Container>
</Section>
{/* Section 8: Studio Facilities Showcase - END */}

      {/* Projection / roadmap */}
      <Section className="border-t border-hairline">
        <Container>
          <Timeline
            eyebrow="The road ahead"
            title="A house being built season by season."
            items={[
              { period: "2024", title: "Studio opens", body: "Our flagship atelier launches with sixteen founding members and a full fabric library." },
              { period: "2025", title: "Marketplace goes live", body: "Twenty-four curated designers, six editorial collections, and our first international press cycle." },
              { period: "2026", title: "Spotlight, globally", body: "Open call expanded to every continent, with €25,000 in cash prizes and an investor day." },
              { period: "2027", title: "Second studio", body: "A second Adorzia studio opens, plus retail residencies in three flagship cities." },
              { period: "2028", title: "Adorzia Capital", body: "A dedicated emerging-fashion fund formalises the investment introductions made through Spotlight." },
            ]}
          />
        </Container>
      </Section>

      {/* Testimonials */}
      <Section className="border-t border-hairline bg-bone">
        <Container>
          <Testimonials
            title="Trusted by designers, partners, and press."
            items={[
              { quote: "Adorzia is what a fashion incubator should always have been — equal parts atelier, gallery, and operator.", name: "Catherine Vey", role: "Editor-in-Chief, Vey Quarterly" },
              { quote: "The most discerning curation of emerging talent we have seen in years.", name: "Mara Eliasson", role: "Retail Strategist, Stockholm" },
              { quote: "A year in the Adorzia studio is worth a decade of figuring it out alone.", name: "Tomás Vinheiro", role: "Marketplace designer" },
            ]}
          />
        </Container>
      </Section>

      {/* Partners */}
      <Section className="border-t border-hairline">
        <Container>
          <PartnerLogos />
        </Container>
      </Section>
    </SiteLayout>
  );
}