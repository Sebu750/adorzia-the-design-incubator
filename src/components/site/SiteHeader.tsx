import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/for-creatives", label: "For Creatives" },
  { to: "/for-partners", label: "For Partners" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/spotlight", label: "Spotlight" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75 border-b border-hairline">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-5 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-[0.2em] uppercase">
          Adorzia
        </Link>
        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[11px] uppercase tracking-[0.28em] text-ink-soft hover:text-ink transition-colors"
              activeProps={{ className: "text-ink" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button
          aria-label="Menu"
          className="lg:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-hairline bg-background">
          <nav className="px-6 py-6 flex flex-col gap-5">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.25em] text-ink-soft"
                activeProps={{ className: "text-ink" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
