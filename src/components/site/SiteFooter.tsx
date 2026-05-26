import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline mt-24">
      <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl tracking-[0.2em] uppercase">Adorzia</div>
          <p className="mt-4 text-sm text-ink-soft max-w-sm leading-relaxed">
            A fashion incubator nurturing the next generation of designers — through coworking,
            curation, and our annual Spotlight programme.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-4">Explore</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-gold">About</Link></li>
            <li><Link to="/for-creatives" className="hover:text-gold">For Creatives</Link></li>
            <li><Link to="/for-partners" className="hover:text-gold">For Partners</Link></li>
            <li><Link to="/marketplace" className="hover:text-gold">Marketplace</Link></li>
            <li><Link to="/spotlight" className="hover:text-gold">Spotlight</Link></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-4">Connect</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gold">Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-gold">LinkedIn</a></li>
            <li><Link to="/admin/login" className="text-ink-soft/60 hover:text-gold">Admin</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-hairline">
        <div className="mx-auto max-w-[1500px] px-6 md:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs uppercase tracking-[0.25em] text-ink-soft">
          <div>© {new Date().getFullYear()} Adorzia — All rights reserved</div>
          <div>Studio · Marketplace · Spotlight</div>
        </div>
      </div>
    </footer>
  );
}
