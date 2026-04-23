import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Guide } from "@/data/guides";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

type Props = {
  guide: Guide;
};

export function GuideGoodLooksLike({ guide }: Props) {
  const items = guide.whatGoodLooksLike;
  const functionLabel = guide.category.toLowerCase();

  return (
    <Section tone="surface" size="md">
      <Container width="narrow">
        <div>
          <Reveal>
            <Eyebrow>The bar</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl">
              What good {functionLabel} automation actually looks like
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[620px] text-pretty text-lg leading-relaxed text-ink-soft">
              The principles an external auditor, a new CFO or an engaged
              operations lead would use to tell whether this is working, or
              whether it is theatre.
            </p>
          </Reveal>
        </div>

        <ol className="mt-10 divide-y divide-line rounded-2xl border border-line bg-surface-2 shadow-soft">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={0.05 + i * 0.04}
              as="li"
              className="flex gap-5 p-6 sm:p-7"
            >
              <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[color:var(--ordron-blue)] text-sm font-semibold text-white numeric tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-pretty font-display text-lg font-semibold leading-snug text-ink sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
