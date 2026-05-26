import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Overview,
});

function Overview() {
  return (
    <div>
      <div className="eyebrow">Overview</div>
      <h1 className="mt-4 font-display text-4xl">Welcome back.</h1>
      <p className="mt-3 text-ink-soft">Manage your site content from the sections on the left.</p>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          ["Designers", "Add and manage marketplace designers", "/admin/designers"],
          ["Spotlight applications", "Review submissions", "/admin/applications"],
          ["Contact inquiries", "Read and resolve messages", "/admin/contact"],
          ["Partner inquiries", "Sponsor + investor inquiries", "/admin/partners"],
          ["Site settings", "Hero copy and toggles", "/admin/settings"],
        ].map(([t, b, to]) => (
          <Link key={t} to={to} className="border border-hairline p-6 hover:border-ink transition-colors block">
            <div className="font-display text-2xl">{t}</div>
            <div className="mt-2 text-sm text-ink-soft">{b}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
