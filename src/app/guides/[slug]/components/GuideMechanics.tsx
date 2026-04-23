import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Guide } from "@/data/guides";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

type Props = {
  guide: Guide;
};

export function GuideMechanics({ guide }: Props) {
  const steps = guide.howAutomationActuallyWorks;
  const functionLabel = guide.category.toLowerCase();

  return (
    <Section id="how-it-works" tone="surface-2" size="md">
      <Container>
        <div className="max-w-[760px]">
          <Reveal>
            <Eyebrow>The mechanics</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl">
              How {functionLabel} automation actually works
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[620px] text-pretty text-lg leading-relaxed text-ink-soft">
              The teaching core of the guide. Each step is a mechanism, not an
              outcome. Read it as the architecture of a working pipeline, not
              a list of features.
            </p>
          </Reveal>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={0.05 + (i % 2) * 0.05} as="li">
              <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-float">
                <div className="flex items-center gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-sm font-semibold text-white numeric tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-pretty font-display text-xl font-semibold leading-snug text-ink">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
