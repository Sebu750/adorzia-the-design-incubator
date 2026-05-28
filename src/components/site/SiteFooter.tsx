import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#6f1d1b] text-cream mt-12">
      {/* ========================= CINEMATIC BACKGROUND CANVAS START ========================= */}
      {/* Dynamic Animated Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(187,148,87,0.08),transparent_60%)] pointer-events-none z-0 animate-[ambientBreathe_12s_ease-in-out_infinite_alternate]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.4),transparent_70%)] pointer-events-none z-0" />
      
      {/* Elegant Minimalist Art Deco Line Lattice */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none z-0 mix-blend-screen">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="adorzia-elegant-lines" width="80" height="80" patternUnits="userSpaceOnUse">
              <path 
                d="M 40 0 L 80 40 L 40 80 L 0 40 Z" 
                fill="none" 
                stroke="#bb9457" 
                strokeWidth="0.5" 
              />
              <line x1="40" y1="0" x2="40" y2="80" stroke="#bb9457" strokeWidth="0.25" strokeOpacity="0.3" />
              <line x1="0" y1="40" x2="80" y2="40" stroke="#bb9457" strokeWidth="0.25" strokeOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#adorzia-elegant-lines)" />
        </svg>
      </div>

      {/* Top Border Accent Laser Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
      {/* ========================= CINEMATIC BACKGROUND CANVAS END ========================= */}

      {/* Main Grid Interface */}
      <div className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-10 py-12 grid gap-8 sm:grid-cols-2 md:grid-cols-12">
        
        {/* Brand Core Manifesto Pillar */}
        <div className="md:col-span-12 lg:col-span-4 flex flex-col justify-between gap-4">
          <div>
            <div className="font-display text-2xl tracking-[0.2em] uppercase text-white font-light cursor-default">
              Adorzia
            </div>
            <p className="mt-3 text-xs text-cream/70 max-w-sm leading-relaxed font-light">
              A collaborative fashion house and marketplace empowering the next generation of designers through shared physical workspace infrastructure.
            </p>
          </div>
        </div>

        {/* Navigation Deck: Column 1 */}
        <div className="sm:col-span-1 md:col-span-3 lg:col-span-2 lg:col-start-6">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#bb9457] font-semibold mb-3">
            Explore
          </div>
          <ul className="space-y-2 text-xs font-light text-cream/80">
            {["About", "For Creatives", "For Partners", "Marketplace", "Spotlight"].map((item) => (
              <li key={item}>
                <Link 
                  to={`/${item.toLowerCase().replace(" ", "-")}`} 
                  className="transition-all duration-300 hover:text-white tracking-wide block"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Deck: Column 2 */}
        <div className="sm:col-span-1 md:col-span-3 lg:col-span-2">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#bb9457] font-semibold mb-3">
            Connect
          </div>
          <ul className="space-y-2 text-xs font-light text-cream/80">
            <li>
              <Link to="/contact" className="transition-all duration-300 hover:text-white tracking-wide block">
                Contact
              </Link>
            </li>
            <li>
              <a href="https://instagram.com/adorziaofficial" target="_blank" rel="noreferrer" className="transition-all duration-300 hover:text-white tracking-wide block">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://facebook.com/adorzia" target="_blank" rel="noreferrer" className="transition-all duration-300 hover:text-white tracking-wide block">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/company/adorzia" target="_blank" rel="noreferrer" className="transition-all duration-300 hover:text-white tracking-wide block">
                LinkedIn
              </a>
            </li>
            <li>
              <Link to="/admin/login" className="text-cream/30 text-[10px] transition-colors duration-300 hover:text-[#bb9457] block pt-1">
                ...
              </Link>
            </li>
          </ul>
        </div>

        {/* Ecosystem Footprint Block */}
        <div className="sm:col-span-2 md:col-span-6 lg:col-span-4">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#bb9457] font-semibold mb-3">
            Ecosystem Ateliers
          </div>
          <p className="text-xs text-cream/60 leading-relaxed font-light mb-3">
            Karachi · Lahore · Islamabad
          </p>
          <div className="h-[1px] w-full bg-gradient-to-r from-[#bb9457]/30 to-transparent" />
        </div>

      </div>

      {/* Sub-Footer Base Interface */}
      <div className="border-t border-white/5 bg-black/10 relative z-10">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[9px] uppercase tracking-[0.25em] text-cream/40 font-medium">
          <div>
            © {new Date().getFullYear()} Adorzia. All rights reserved.
          </div>
          <div className="flex gap-x-3 items-center text-cream/50">
            <span className="hover:text-[#bb9457] transition-colors duration-300 cursor-default">Studio</span>
            <span className="text-[#bb9457]/20">·</span>
            <span className="hover:text-[#bb9457] transition-colors duration-300 cursor-default">Marketplace</span>
            <span className="text-[#bb9457]/20">·</span>
            <span className="hover:text-[#bb9457] transition-colors duration-300 cursor-default">Spotlight</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ambientBreathe {
          0% { transform: scale(1) translate(0px, 0px); opacity: 0.7; }
          100% { transform: scale(1.05) translate(10px, -5px); opacity: 0.9; }
        }
      `}</style>
    </footer>
  );
}