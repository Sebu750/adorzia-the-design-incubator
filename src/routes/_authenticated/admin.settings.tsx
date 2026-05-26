import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getSiteSettings } from "@/lib/public-data.functions";
import { updateSiteSettings } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const get = useServerFn(getSiteSettings);
  const upd = useServerFn(updateSiteSettings);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin", "settings"], queryFn: () => get() });
  const [s, setS] = useState({ hero_eyebrow: "", hero_title: "", hero_subtitle: "", spotlight_open: true });

  useEffect(() => {
    if (q.data) setS({
      hero_eyebrow: q.data.hero_eyebrow ?? "",
      hero_title: q.data.hero_title ?? "",
      hero_subtitle: q.data.hero_subtitle ?? "",
      spotlight_open: q.data.spotlight_open ?? true,
    });
  }, [q.data]);

  const m = useMutation({
    mutationFn: () => upd({ data: s }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "settings"] }); qc.invalidateQueries({ queryKey: ["site_settings"] }); toast.success("Saved"); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="max-w-2xl">
      <div className="eyebrow">Site settings</div>
      <h1 className="mt-3 font-display text-4xl mb-8">Home page content</h1>
      <form onSubmit={(e) => { e.preventDefault(); m.mutate(); }} className="space-y-6">
        <Field label="Hero eyebrow" v={s.hero_eyebrow} on={(v) => setS({ ...s, hero_eyebrow: v })} />
        <Field label="Hero title" v={s.hero_title} on={(v) => setS({ ...s, hero_title: v })} multiline />
        <Field label="Hero subtitle" v={s.hero_subtitle} on={(v) => setS({ ...s, hero_subtitle: v })} multiline />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={s.spotlight_open} onChange={(e) => setS({ ...s, spotlight_open: e.target.checked })} /> Spotlight applications open</label>
        <button disabled={m.isPending} className="border border-ink bg-ink text-cream px-7 py-4 text-[11px] uppercase tracking-[0.28em]">{m.isPending ? "Saving…" : "Save changes"}</button>
      </form>
    </div>
  );
}

function Field({ label, v, on, multiline }: { label: string; v: string; on: (s: string) => void; multiline?: boolean }) {
  return (
    <div>
      <label className="eyebrow block mb-2">{label}</label>
      {multiline ? (
        <textarea rows={3} value={v} onChange={(e) => on(e.target.value)} className="w-full border border-hairline p-3" />
      ) : (
        <input value={v} onChange={(e) => on(e.target.value)} className="w-full border border-hairline p-2" />
      )}
    </div>
  );
}
