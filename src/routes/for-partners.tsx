import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout, Container, Section, Eyebrow } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { submitPartnerInquiry } from "@/lib/inquiries.functions";
import spotlight from "@/assets/spotlight.jpg";

export const Route = createFileRoute("/for-partners")({
  head: () => ({
    meta: [
      { title: "For Partners — Adorzia" },
      { name: "description", content: "Sponsorship, investment, and brand collaboration with Adorzia — supporting the next generation of fashion houses." },
      { property: "og:title", content: "For Partners — Adorzia" },
      { property: "og:description", content: "Sponsor, invest, or collaborate with the next generation of fashion houses." },
      { property: "og:image", content: spotlight },
    ],
  }),
  component: ForPartners,
});

function ForPartners() {
  const submit = useServerFn(submitPartnerInquiry);
  const [form, setForm] = useState({
    company: "",
    contact_name: "",
    email: "",
    phone: "",
    interest_type: "Sponsorship",
    message: "",
  });
  const m = useMutation({
    mutationFn: () => submit({ data: form }),
    onSuccess: () => {
      toast.success("Inquiry sent. We'll respond within 3 business days.");
      setForm({ company: "", contact_name: "", email: "", phone: "", interest_type: "Sponsorship", message: "" });
    },
    onError: (e: Error) => toast.error(e.message || "Could not submit"),
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="For partners"
        title={<>Sponsor, invest,<br/>or build with the<br/>next generation.</>}
        subtitle="Adorzia partners with brands, foundations, and investors who want to shape the future of fashion — not just spectate it."
        image={spotlight}
        imageAlt="The Spotlight runway"
      />

      <Section className="border-b border-hairline">
        <Container>
          <Eyebrow>Ways to partner</Eyebrow>
          <div className="mt-12 grid md:grid-cols-3 gap-10">
            {[
              { t: "Sponsorship", b: "Underwrite Spotlight, individual prize categories, or studio resources. Visibility across our editorial channels, runway, and member events." },
              { t: "Investment", b: "Get first-look access to vetted emerging designers, alongside our curation team. Convertible notes, equity, and revenue-share structures available." },
              { t: "Brand collaboration", b: "Commission capsules with our designers. Material partnerships. Retail residencies. Editorial collaborations with established houses." },
            ].map((p) => (
              <div key={p.t} className="border border-hairline p-10">
                <h3 className="font-display text-3xl">{p.t}</h3>
                <p className="mt-5 text-sm text-ink-soft leading-relaxed">{p.b}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Inquiry */}
      <Section>
        <Container>
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <Eyebrow>Start a conversation</Eyebrow>
              <h2 className="mt-6 font-display text-4xl md:text-5xl">Tell us what you have in mind.</h2>
              <p className="mt-6 text-ink-soft leading-relaxed">
                Whether you're scoping a sponsorship, exploring an investment thesis, or building a capsule — we'll come back to you within three business days.
              </p>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); m.mutate(); }}
              className="md:col-span-7 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <Field label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} required />
                <Field label="Contact name" value={form.contact_name} onChange={(v) => setForm({ ...form, contact_name: v })} required />
                <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                <Field label="Phone (optional)" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              </div>
              <div>
                <label className="eyebrow block mb-3">Interest</label>
                <select
                  value={form.interest_type}
                  onChange={(e) => setForm({ ...form, interest_type: e.target.value })}
                  className="w-full border-b border-ink bg-transparent py-3 outline-none focus:border-gold"
                >
                  {["Sponsorship", "Investment", "Brand collaboration", "Other"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="eyebrow block mb-3">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border-b border-ink bg-transparent py-3 outline-none focus:border-gold resize-none"
                />
              </div>
              <button
                disabled={m.isPending}
                className="inline-flex items-center border border-ink bg-ink text-cream px-7 py-4 text-[11px] uppercase tracking-[0.28em] hover:bg-cream hover:text-ink transition-colors disabled:opacity-50"
              >
                {m.isPending ? "Sending…" : "Send inquiry"}
              </button>
            </form>
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="eyebrow block mb-3">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border-b border-ink bg-transparent py-3 outline-none focus:border-gold"
      />
    </div>
  );
}
