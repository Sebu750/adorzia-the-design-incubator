import { Eyebrow } from "./SiteLayout";

export type TimelineItem = {
  period: string;
  title: string;
  body?: string;
};

export function Timeline({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: TimelineItem[];
}) {
  return (
    <div className="grid md:grid-cols-12 gap-10">
      <div className="md:col-span-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-4xl md:text-5xl leading-[1.05]">{title}</h2>
      </div>
      <ol className="md:col-span-8 relative border-l border-hairline pl-8 space-y-12">
        {items.map((it, i) => (
          <li key={i} className="relative">
            <span className="absolute -left-[37px] top-2 h-3 w-3 rounded-full bg-gold ring-4 ring-background" />
            <div className="eyebrow text-gold">{it.period}</div>
            <h3 className="mt-2 font-display text-2xl md:text-3xl">{it.title}</h3>
            {it.body && <p className="mt-3 text-ink-soft leading-relaxed max-w-2xl">{it.body}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}
