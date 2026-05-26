import { createFileRoute, Outlet, redirect, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    // Only run on client; server has no session
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Overview" },
  { to: "/admin/designers", label: "Designers" },
  { to: "/admin/applications", label: "Spotlight" },
  { to: "/admin/contact", label: "Contact" },
  { to: "/admin/partners", label: "Partners" },
  { to: "/admin/settings", label: "Settings" },
] as const;

function AdminLayout() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.navigate({ to: "/admin/login" });
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <aside className="md:w-64 border-b md:border-b-0 md:border-r border-hairline p-8 md:min-h-screen">
        <Link to="/" className="font-display text-2xl tracking-[0.2em] uppercase">Adorzia</Link>
        <div className="eyebrow mt-1">Admin</div>
        <nav className="mt-10 space-y-2">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="block text-sm py-2 text-ink-soft hover:text-ink"
              activeProps={{ className: "block text-sm py-2 text-ink border-l-2 border-gold pl-3" }}
              activeOptions={{ exact: n.to === "/admin" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mt-12 pt-8 border-t border-hairline text-xs text-ink-soft">
          <div className="truncate">{email}</div>
          <button onClick={logout} className="mt-3 eyebrow border-b border-ink pb-0.5 hover:text-gold hover:border-gold">Sign out</button>
        </div>
      </aside>
      <main className="flex-1 p-8 md:p-12">
        <Outlet />
      </main>
    </div>
  );
}
