import { Eyebrow } from "./SiteLayout";

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  image?: string;
  initials?: string;
};

export function TeamGrid({
  eyebrow,
  title,
  intro,
  members,
  columns = 3,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  members: TeamMember[];
  columns?: 2 | 3 | 4;
}) {
  const colClass =
    columns === 2 ? "md:grid-cols-2" : columns === 4 ? "md:grid-cols-4" : "md:grid-cols-3";
  return (
    <div>
      <div className="grid md:grid-cols-12 gap-10 mb-14">
        <div className="md:col-span-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-[1.05]">{title}</h2>
        </div>
        {intro && (
          <p className="md:col-span-7 md:col-start-6 text-ink-soft leading-relaxed text-lg self-end">
            {intro}
          </p>
        )}
      </div>
      <div className={`grid sm:grid-cols-2 ${colClass} gap-x-8 gap-y-14`}>
        {members.map((m) => (
          <article key={m.name}>
            <div className="aspect-[4/5] bg-bone overflow-hidden">
              {m.image ? (
                <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center font-display text-6xl text-ink/40">
                  {m.initials ?? m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
              )}
            </div>
            <h3 className="mt-5 font-display text-2xl">{m.name}</h3>
            <div className="eyebrow mt-1 text-gold">{m.role}</div>
            {m.bio && <p className="mt-3 text-sm text-ink-soft leading-relaxed">{m.bio}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}
