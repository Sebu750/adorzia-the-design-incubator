import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout, Container, Section, Eyebrow } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { submitSpotlightApplication } from "@/lib/inquiries.functions";
import spotlight from "@/assets/spotlight.jpg";

export const Route = createFileRoute("/spotlight")({
  head: () => ({
    meta: [
      { title: "Spotlight — Adorzia" },
      { name: "description", content: "Adorzia Spotlight: an annual open call for emerging designers. Cash prizes, investment introductions, free studio access, and a permanent marketplace placement." },
      { property: "og:title", content: "Adorzia Spotlight — Apply Now" },
      { property: "og:description", content: "An annual open call. Cash prizes, investment, free studio access, marketplace placement." },
      { property: "og:image", content: spotlight },
    ],
  }),
  component: Spotlight,
});

function Spotlight() {
  const submit = useServerFn(submitSpotlightApplication);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", brand_name: "", location: "", instagram: "", portfolio_url: "", concept_statement: "",
  });
  const m = useMutation({
    mutationFn: () => submit({ data: { ...form, lookbook_urls: [] } }),
    onSuccess: () => {
      toast.success("Application received. Watch your inbox for confirmation.");
      setForm({ name: "", email: "", phone: "", brand_name: "", location: "", instagram: "", portfolio_url: "", concept_statement: "" });
    },
    onError: (e: Error) => toast.error(e.message || "Could not submit"),
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Spotlight 2026 — applications open"
        title={<>Submit your<br/>collection.<br/>Be discovered.</>}
        subtitle="Our annual open call for the most distinct emerging voices in fashion."
        image={spotlight}
        imageAlt="A model walking the Spotlight runway"
      />

      <Section className="border-b border-hairline">
        <Container>
          <Eyebrow>What winners receive</Eyebrow>
          <div className="mt-12 grid md:grid-cols-4 gap-10">
            {[
              { n: "€25,000", t: "Cash prize", b: "Grand prize unrestricted cash to fund your next production run." },
              { n: "Investment", t: "Introductions", b: "Curated intros to Adorzia's network of fashion-focused investors." },
              { n: "12 months", t: "Studio access", b: "A full year of free, 24/7 access to the Adorzia coworking atelier." },
              { n: "Marketplace", t: "Permanent placement", b: "A dedicated profile and collection on the Adorzia marketplace." },
            ].map((x) => (
              <div key={x.t} className="border-t border-hairline pt-8">
                <div className="font-display text-3xl text-gold">{x.n}</div>
                <h3 className="mt-3 font-display text-xl">{x.t}</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">{x.b}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-b border-hairline">
        <Container>
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4"><Eyebrow>Timeline</Eyebrow></div>
            <div className="md:col-span-8">
              <ol className="space-y-8">
                {[
                  ["Applications open", "Now — March 31"],
                  ["Jury review", "April"],
                  ["Shortlist announced", "Early May"],
                  ["Runway showcase + winners", "June, Adorzia Studio"],
                ].map(([t, d]) => (
                  <li key={t} className="grid grid-cols-12 items-baseline gap-6 border-b border-hairline pb-6">
                    <div className="col-span-7 font-display text-2xl">{t}</div>
                    <div className="col-span-5 text-right eyebrow">{d}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="apply">
        <Container>
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <Eyebrow>Application</Eyebrow>
              <h2 className="mt-6 font-display text-4xl md:text-5xl">Apply now.</h2>
              <p className="mt-6 text-ink-soft leading-relaxed">
                Tell us about your work. We read every submission carefully — there is no fee to apply.
              </p>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); m.mutate(); }}
              className="md:col-span-8 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <F label="Your name" v={form.name} on={(v) => setForm({ ...form, name: v })} required />
                <F label="Email" type="email" v={form.email} on={(v) => setForm({ ...form, email: v })} required />
                <F label="Brand name" v={form.brand_name} on={(v) => setForm({ ...form, brand_name: v })} />
                <F label="Location" v={form.location} on={(v) => setForm({ ...form, location: v })} />
                <F label="Instagram handle" v={form.instagram} on={(v) => setForm({ ...form, instagram: v })} />
                <F label="Portfolio / lookbook URL" v={form.portfolio_url} on={(v) => setForm({ ...form, portfolio_url: v })} />
                <F label="Phone (optional)" v={form.phone} on={(v) => setForm({ ...form, phone: v })} />
              </div>
              <div>
                <label className="eyebrow block mb-3">Concept statement (50+ words)</label>
                <textarea
                  required
                  rows={7}
                  value={form.concept_statement}
                  onChange={(e) => setForm({ ...form, concept_statement: e.target.value })}
                  className="w-full border-b border-ink bg-transparent py-3 outline-none focus:border-gold resize-none"
                />
              </div>
              <button
                disabled={m.isPending}
                className="inline-flex items-center border border-ink bg-ink text-cream px-7 py-4 text-[11px] uppercase tracking-[0.28em] hover:bg-cream hover:text-ink transition-colors disabled:opacity-50"
              >
                {m.isPending ? "Submitting…" : "Submit application"}
              </button>
            </form>
          </div>
        </Container>
      </Section>
    </SiteLayout>
  );
}

function F({ label, v, on, type = "text", required }: { label: string; v: string; on: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="eyebrow block mb-3">{label}</label>
      <input type={type} required={required} value={v} onChange={(e) => on(e.target.value)} className="w-full border-b border-ink bg-transparent py-3 outline-none focus:border-gold" />
    </div>
  );
}
