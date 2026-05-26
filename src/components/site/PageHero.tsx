import type { ReactNode } from "react";
import { Container } from "./SiteLayout";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="border-b border-hairline">
      <Container className="grid md:grid-cols-12 gap-10 md:gap-16 py-20 md:py-32 items-end">
        <div className="md:col-span-7">
          {eyebrow && <div className="eyebrow mb-6">{eyebrow}</div>}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.015em]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-8 max-w-xl text-base md:text-lg text-ink-soft leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
        {image && (
          <div className="md:col-span-5">
            <div className="aspect-[3/4] overflow-hidden bg-bone">
              <img
                src={image}
                alt={imageAlt ?? ""}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
