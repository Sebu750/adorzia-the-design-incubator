import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout, Container, Section, Eyebrow } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { submitContactInquiry } from "@/lib/inquiries.functions";
import craft from "@/assets/craft.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Adorzia — Get in Touch" },
      { name: "description", content: "Get in touch with the Adorzia team — studio enquiries, marketplace, press, and partnerships." },
      { name: "keywords", content: "contact adorzia, fashion studio contact, designer inquiries, partnership inquiries" },
      { property: "og:title", content: "Contact — Adorzia" },
      { property: "og:description", content: "Reach out about studio membership, the marketplace, Spotlight, or partnerships." },
      { property: "og:image", content: craft },
      { property: "og:url", content: "https://adorzia.com/contact" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact — Adorzia" },
      { rel: "canonical", href: "https://adorzia.com/contact" } as never,
    ],
  }),
  component: Contact,
});

function Contact() {
  const submit = useServerFn(submitContactInquiry);
  const [f, setF] = useState({ name: "", email: "", subject: "", message: "" });
  const m = useMutation({
    mutationFn: () => submit({ data: f }),
    onSuccess: () => { toast.success("Message sent. We'll be in touch soon."); setF({ name: "", email: "", subject: "", message: "" }); },
    onError: (e: Error) => toast.error(e.message || "Could not send"),
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title={<>Say hello.</>}
        subtitle="For studio enquiries, marketplace applications, press, partnerships, or anything else — write to us."
        image={craft}
        imageAlt="Atelier detail"
      />

      <Section>
        <Container>
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-5 space-y-10">
              <div>
                <Eyebrow>Studio</Eyebrow>
                <p className="mt-3 font-display text-2xl">Adorzia Atelier<br/>Clayton Quareter<br/>Karachi, Pakistan</p>
              </div>
              <div>
                <Eyebrow>Email</Eyebrow>
                <p className="mt-3 text-lg"><a href="mailto:sayhi@adorzia.com" className="border-b border-ink hover:text-gold hover:border-gold">sayhi@adorzia.com</a></p>
              </div>
              <div>
                <Eyebrow>Hours</Eyebrow>
                <p className="mt-3 text-ink-soft">Members 24/7 · Visitors by appointment</p>
              </div>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); m.mutate(); }}
              className="md:col-span-7 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <F label="Your name" v={f.name} on={(v) => setF({ ...f, name: v })} required />
                <F label="Email" type="email" v={f.email} on={(v) => setF({ ...f, email: v })} required />
              </div>
              <F label="Subject" v={f.subject} on={(v) => setF({ ...f, subject: v })} />
              <div>
                <label className="eyebrow block mb-3">Message</label>
                <textarea
                  required
                  rows={7}
                  value={f.message}
                  onChange={(e) => setF({ ...f, message: e.target.value })}
                  className="w-full border-b border-ink bg-transparent py-3 outline-none focus:border-gold resize-none"
                />
              </div>
              <button
                disabled={m.isPending}
                className="inline-flex items-center border border-ink bg-ink text-cream px-7 py-4 text-[11px] uppercase tracking-[0.28em] hover:bg-cream hover:text-ink transition-colors disabled:opacity-50"
              >
                {m.isPending ? "Sending…" : "Send message"}
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
