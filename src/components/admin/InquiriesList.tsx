import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { listAdminInquiries, updateInquiryStatus } from "@/lib/admin.functions";

type Kind = "contact" | "partner" | "spotlight";

export function InquiriesList({ kind, title }: { kind: Kind; title: string }) {
  const list = useServerFn(listAdminInquiries);
  const upd = useServerFn(updateInquiryStatus);
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["admin", "inq", kind], queryFn: () => list({ data: { kind } }) });
  const [open, setOpen] = useState<string | null>(null);

  const m = useMutation({
    mutationFn: (vars: { id: string; resolved?: boolean; status?: string }) =>
      upd({ data: { kind, ...vars } }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "inq", kind] }); toast.success("Updated"); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <div className="eyebrow">{kind}</div>
      <h1 className="mt-3 font-display text-4xl mb-8">{title}</h1>

      {q.isLoading && <p className="text-ink-soft">Loading…</p>}
      <div className="border border-hairline divide-y divide-hairline">
        {(q.data ?? []).map((row: Record<string, unknown>) => {
          const id = row.id as string;
          const isOpen = open === id;
          const date = new Date(row.created_at as string).toLocaleDateString();
          return (
            <div key={id} className="p-5">
              <button className="w-full text-left flex justify-between items-start gap-4" onClick={() => setOpen(isOpen ? null : id)}>
                <div className="min-w-0">
                  <div className="font-display text-xl truncate">
                    {kind === "partner" ? (row.company as string) : (row.name as string)}
                    {kind === "spotlight" && row.brand_name ? ` — ${row.brand_name}` : ""}
                  </div>
                  <div className="text-xs text-ink-soft mt-1">{row.email as string} · {date}</div>
                </div>
                <div className="eyebrow whitespace-nowrap">
                  {kind === "spotlight" ? (row.status as string) : (row.resolved ? "Resolved" : "Open")}
                </div>
              </button>
              {isOpen && (
                <div className="mt-5 pl-1 text-sm space-y-3 text-ink-soft">
                  {kind === "contact" && <>
                    {row.subject as string && <div><span className="eyebrow">Subject</span><div>{row.subject as string}</div></div>}
                    <div className="whitespace-pre-wrap">{row.message as string}</div>
                    <button onClick={() => m.mutate({ id, resolved: !row.resolved })} className="eyebrow border-b border-ink pb-0.5">Mark {row.resolved ? "open" : "resolved"}</button>
                  </>}
                  {kind === "partner" && <>
                    <div><span className="eyebrow">Contact</span><div>{row.contact_name as string}{row.phone ? ` · ${row.phone}` : ""}</div></div>
                    <div><span className="eyebrow">Interest</span><div>{row.interest_type as string || "—"}</div></div>
                    <div className="whitespace-pre-wrap">{row.message as string}</div>
                    <button onClick={() => m.mutate({ id, resolved: !row.resolved })} className="eyebrow border-b border-ink pb-0.5">Mark {row.resolved ? "open" : "resolved"}</button>
                  </>}
                  {kind === "spotlight" && <>
                    <div className="grid grid-cols-2 gap-3">
                      <div><span className="eyebrow">Brand</span><div>{row.brand_name as string || "—"}</div></div>
                      <div><span className="eyebrow">Location</span><div>{row.location as string || "—"}</div></div>
                      <div><span className="eyebrow">Instagram</span><div>{row.instagram as string || "—"}</div></div>
                      <div><span className="eyebrow">Portfolio</span><div className="truncate">{(row.portfolio_url as string) ? <a className="underline" target="_blank" rel="noreferrer" href={row.portfolio_url as string}>{row.portfolio_url as string}</a> : "—"}</div></div>
                    </div>
                    <div><span className="eyebrow">Concept</span><div className="whitespace-pre-wrap mt-1">{row.concept_statement as string}</div></div>
                    <div className="flex gap-2 pt-2">
                      {["new", "shortlisted", "winner", "rejected"].map((s) => (
                        <button key={s} onClick={() => m.mutate({ id, status: s })} className={`eyebrow border border-hairline px-3 py-1 ${row.status === s ? "bg-ink text-cream" : "hover:border-ink"}`}>{s}</button>
                      ))}
                    </div>
                  </>}
                </div>
              )}
            </div>
          );
        })}
        {q.data?.length === 0 && <div className="p-6 text-ink-soft text-sm">Nothing yet.</div>}
      </div>
    </div>
  );
}
