import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getDashboardCounts } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Overview,
});

function Overview() {
  const getCounts = useServerFn(getDashboardCounts);
  const { data: counts } = useQuery({
    queryKey: ["admin", "counts"],
    queryFn: () => getCounts(),
  });

  const maxCount = Math.max(
    counts?.designers ?? 0,
    counts?.spotlight ?? 0,
    counts?.contact ?? 0,
    counts?.partner ?? 0,
    1
  );

  return (
    <div>
      <div className="eyebrow">Overview</div>
      <h1 className="mt-4 font-display text-4xl">Welcome back.</h1>
      <p className="mt-3 text-ink-soft">Manage your site content from the sections on the left.</p>
      
      {/* Stats Cards */}
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Designers", count: counts?.designers ?? 0, to: "/admin/designers", icon: "✦" },
          { label: "Spotlight", count: counts?.spotlight ?? 0, to: "/admin/applications", icon: "◈" },
          { label: "Contact", count: counts?.contact ?? 0, to: "/admin/contact", icon: "◉" },
          { label: "Partners", count: counts?.partner ?? 0, to: "/admin/partners", icon: "◆" },
        ].map((stat) => (
          <Link 
            key={stat.label} 
            to={stat.to} 
            className="group border border-hairline p-6 hover:border-gold transition-all duration-300 block"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-2xl text-gold">{stat.icon}</div>
              <div className="font-display text-4xl text-ink group-hover:text-gold transition-colors">
                {stat.count}
              </div>
            </div>
            <div className="font-display text-xl">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Visual Bar Graph */}
      <div className="mt-12 border border-hairline p-8">
        <div className="eyebrow mb-8">Activity Overview</div>
        <div className="flex items-end gap-6 h-48">
          {[
            { label: "Designers", count: counts?.designers ?? 0, color: "bg-gold" },
            { label: "Spotlight", count: counts?.spotlight ?? 0, color: "bg-ink" },
            { label: "Contact", count: counts?.contact ?? 0, color: "bg-gold/60" },
            { label: "Partners", count: counts?.partner ?? 0, color: "bg-ink/60" },
          ].map((bar) => {
            const height = maxCount > 0 ? (bar.count / maxCount) * 100 : 0;
            return (
              <div key={bar.label} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full relative group">
                  <div 
                    className={`${bar.color} rounded-t transition-all duration-700 ease-out hover:opacity-80`}
                    style={{ height: `${Math.max(height, 2)}%`, minHeight: "4px" }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-display text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.count}
                  </div>
                </div>
                <div className="text-xs text-ink-soft text-center">{bar.label}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 pt-6 border-t border-hairline grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            { label: "Total Designers", value: counts?.designers ?? 0 },
            { label: "Spotlight Apps", value: counts?.spotlight ?? 0 },
            { label: "Contact Messages", value: counts?.contact ?? 0 },
            { label: "Partner Inquiries", value: counts?.partner ?? 0 },
          ].map((item) => (
            <div key={item.label}>
              <div className="text-ink-soft text-xs">{item.label}</div>
              <div className="font-display text-2xl mt-1">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
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
