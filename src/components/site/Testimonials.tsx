import { Eyebrow } from "./SiteLayout";

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export function Testimonials({
  eyebrow = "Voices",
  title = "What our community says.",
  items,
}: {
  eyebrow?: string;
  title?: string;
  items: Testimonial[];
}) {
  return (
    <div>
      <div className="grid md:grid-cols-12 gap-10 mb-14">
        <div className="md:col-span-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-[1.05]">{title}</h2>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {items.map((t, i) => (
          <figure key={i} className="border-t border-hairline pt-8">
            <div className="font-display text-5xl text-gold leading-none">“</div>
            <blockquote className="mt-4 font-display text-xl leading-[1.4] text-ink">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6">
              <div className="font-display text-lg">{t.name}</div>
              <div className="eyebrow mt-1 text-ink-soft">{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
