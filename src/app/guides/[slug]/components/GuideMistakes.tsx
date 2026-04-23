import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Guide } from "@/data/guides";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

type Props = {
  guide: Guide;
};

export function GuideMistakes({ guide }: Props) {
  const items = guide.commonMistakes;
  const functionLabel = guide.category.toLowerCase();
  const countWord = items.length === 4 ? "Four" : String(items.length);

  return (
    <Section tone="surface-2" size="md">
      <Container>
        <div className="max-w-[760px]">
          <Reveal>
            <Eyebrow>Watch-outs</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl">
              {countWord} mistakes finance teams make trying to automate{" "}
              {functionLabel}
            </h2>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={0.05 + (i % 2) * 0.05} as="li">
              <article className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7 shadow-soft">
                <div className="flex items-center gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--ordron-amber)]/20 text-sm font-semibold text-[color:#9B6A10] numeric tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-pretty font-display text-xl font-semibold leading-snug text-ink">
                    {item.title}
                  </h3>
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
