import { Eyebrow } from "./SiteLayout";

const DEFAULT_PARTNERS = [
  "Maison Verre",
  "Atelier 9",
  "House Lumen",
  "Noir & Co.",
  "Studio Hélio",
  "Vellum Press",
  "Boulevard 21",
  "Forme Studio",
  "Argent Group",
  "Editorial Six",
];

export function PartnerLogos({
  eyebrow = "Partners & press",
  title = "Trusted by leading houses, foundations, and editors.",
  partners = DEFAULT_PARTNERS,
}: {
  eyebrow?: string;
  title?: string;
  partners?: string[];
}) {
  return (
    <div>
      <div className="grid md:grid-cols-12 gap-10 mb-12">
        <div className="md:col-span-5">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h2 className="md:col-span-7 font-display text-3xl md:text-4xl leading-[1.15]">{title}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border-t border-l border-hairline">
        {partners.map((p) => (
          <div
            key={p}
            className="border-r border-b border-hairline aspect-[5/2] flex items-center justify-center px-4 text-center"
          >
            <span className="font-display text-xl md:text-2xl tracking-[0.04em] text-ink/80 hover:text-gold transition-colors">
              {p}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
