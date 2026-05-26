import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { listAdminDesigners, upsertDesigner, deleteDesigner } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin/designers")({
  component: DesignersPage,
});

type Designer = {
  id: string; slug: string; name: string; tagline: string | null; bio: string | null;
  portrait_url: string | null; cover_url: string | null; instagram: string | null;
  website: string | null; location: string | null; featured: boolean; published: boolean;
  display_order: number;
};

const empty = { slug: "", name: "", tagline: "", bio: "", portrait_url: "", cover_url: "", instagram: "", website: "", location: "", featured: false, published: true, display_order: 0 };

function DesignersPage() {
  const list = useServerFn(listAdminDesigners);
  const save = useServerFn(upsertDesigner);
  const del = useServerFn(deleteDesigner);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin", "designers"], queryFn: () => list() });
  const [editing, setEditing] = useState<Partial<Designer> & typeof empty | null>(null);

  const m = useMutation({
    mutationFn: (d: typeof empty & { id?: string }) => save({ data: d }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "designers"] }); setEditing(null); toast.success("Saved"); },
    onError: (e: Error) => toast.error(e.message),
  });
  const d = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "designers"] }); toast.success("Deleted"); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="eyebrow">Designers</div>
          <h1 className="mt-3 font-display text-4xl">Marketplace roster</h1>
        </div>
        <button onClick={() => setEditing({ ...empty })} className="border border-ink bg-ink text-cream px-5 py-3 text-[11px] uppercase tracking-[0.28em] hover:bg-cream hover:text-ink">+ New designer</button>
      </div>

      {q.isLoading && <p className="text-ink-soft">Loading…</p>}

      <div className="border border-hairline divide-y divide-hairline">
        {(q.data ?? []).map((row) => (
          <div key={row.id} className="p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              {row.portrait_url && <img src={row.portrait_url} alt="" className="h-14 w-14 object-cover" />}
              <div className="min-w-0">
                <div className="font-display text-xl truncate">{row.name}</div>
                <div className="text-xs text-ink-soft truncate">/{row.slug} · {row.published ? "Published" : "Draft"}{row.featured ? " · Featured" : ""}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setEditing({ ...empty, ...row })} className="eyebrow border-b border-ink pb-0.5">Edit</button>
              <button onClick={() => { if (confirm(`Delete ${row.name}?`)) d.mutate(row.id); }} className="eyebrow border-b border-destructive text-destructive pb-0.5">Delete</button>
            </div>
          </div>
        ))}
        {q.data?.length === 0 && <div className="p-6 text-ink-soft text-sm">No designers yet.</div>}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-ink/40 z-50 flex items-start justify-center overflow-auto py-10 px-4" onClick={() => setEditing(null)}>
          <div className="bg-background w-full max-w-2xl p-8 border border-hairline" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <div className="font-display text-2xl">{editing.id ? "Edit designer" : "New designer"}</div>
              <button onClick={() => setEditing(null)} className="text-2xl">×</button>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); m.mutate(editing as typeof empty & { id?: string }); }}>
              <div className="grid grid-cols-2 gap-4">
                <In label="Name" v={editing.name} on={(v) => setEditing({ ...editing!, name: v })} required />
                <In label="Slug" v={editing.slug} on={(v) => setEditing({ ...editing!, slug: v })} required />
                <In label="Tagline" v={editing.tagline} on={(v) => setEditing({ ...editing!, tagline: v })} />
                <In label="Location" v={editing.location} on={(v) => setEditing({ ...editing!, location: v })} />
                <In label="Instagram" v={editing.instagram} on={(v) => setEditing({ ...editing!, instagram: v })} />
                <In label="Website" v={editing.website} on={(v) => setEditing({ ...editing!, website: v })} />
                <In label="Portrait image URL" v={editing.portrait_url} on={(v) => setEditing({ ...editing!, portrait_url: v })} />
                <In label="Cover image URL" v={editing.cover_url} on={(v) => setEditing({ ...editing!, cover_url: v })} />
              </div>
              <div>
                <label className="eyebrow block mb-2">Bio</label>
                <textarea rows={4} value={editing.bio ?? ""} onChange={(e) => setEditing({ ...editing!, bio: e.target.value })} className="w-full border border-hairline p-3" />
              </div>
              <div className="flex gap-6 items-center">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing!, published: e.target.checked })} /> Published</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing!, featured: e.target.checked })} /> Featured on home</label>
                <label className="flex items-center gap-2 text-sm">Order <input type="number" value={editing.display_order} onChange={(e) => setEditing({ ...editing!, display_order: parseInt(e.target.value) || 0 })} className="w-20 border border-hairline p-1" /></label>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="submit" disabled={m.isPending} className="border border-ink bg-ink text-cream px-5 py-3 text-[11px] uppercase tracking-[0.28em]">{m.isPending ? "Saving…" : "Save"}</button>
                <button type="button" onClick={() => setEditing(null)} className="border border-ink px-5 py-3 text-[11px] uppercase tracking-[0.28em]">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function In({ label, v, on, required }: { label: string; v: string | null | undefined; on: (s: string) => void; required?: boolean }) {
  return (
    <div>
      <label className="eyebrow block mb-2">{label}</label>
      <input value={v ?? ""} required={required} onChange={(e) => on(e.target.value)} className="w-full border border-hairline p-2" />
    </div>
  );
}
