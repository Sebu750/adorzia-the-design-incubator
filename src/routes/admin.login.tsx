import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — Adorzia" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Welcome back.");
      window.location.href = "/admin";
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <div className="font-display text-3xl tracking-[0.25em] uppercase">Adorzia</div>
          <div className="eyebrow mt-3">Admin Sign in</div>
        </div>
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="eyebrow block mb-3">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b border-ink bg-transparent py-3 outline-none focus:border-gold" />
          </div>
          <div>
            <label className="eyebrow block mb-3">Password</label>
            <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-b border-ink bg-transparent py-3 outline-none focus:border-gold" />
          </div>
          <button disabled={loading} className="w-full border border-ink bg-ink text-cream px-7 py-4 text-[11px] uppercase tracking-[0.28em] hover:bg-cream hover:text-ink transition-colors disabled:opacity-50">
            {loading ? "…" : "Sign in"}
          </button>
        </form>
        <a href="/" className="mt-8 block text-center eyebrow text-ink-soft hover:text-ink">← Back to site</a>
      </div>
    </div>
  );
}

// Helper used by _authenticated layout to redirect.
export function loginRedirect() {
  throw redirect({ to: "/admin/login" });
}
