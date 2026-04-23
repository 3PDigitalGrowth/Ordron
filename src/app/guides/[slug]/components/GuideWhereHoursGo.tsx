import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Guide } from "@/data/guides";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

type Props = {
  guide: Guide;
};

export function GuideWhereHoursGo({ guide }: Props) {
  const items = guide.whereTheHoursGo;

  return (
    <Section id="where-the-hours-go" tone="surface-2" size="md">
      <Container>
        <div className="max-w-[760px]">
          <Reveal>
            <Eyebrow>Where the hours go</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl">
              The {items.length} workflows costing you the most time
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[600px] text-pretty text-lg leading-relaxed text-ink-soft">
              Hours do not leak evenly. They cluster in a handful of named
              workflows, and automation pays back fastest when it targets the
              clusters rather than spreading thin across the whole function.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={0.05 + (i % 2) * 0.05} as="li">
              <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-pretty font-display text-xl font-semibold leading-snug text-ink">
                    {item.title}
                  </h3>
                  {item.typicalHours ? (
                    <span className="shrink-0 rounded-full bg-[color:var(--ordron-blue)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--ordron-blue)]">
                      {item.typicalHours}
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
