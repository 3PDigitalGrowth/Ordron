import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Guide } from "@/data/guides";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

type Props = {
  guide: Guide;
};

export function GuideProblem({ guide }: Props) {
  const { heading, bodyParagraphs, keyStatOrCallout } = guide.theProblemSection;

  return (
    <Section id="the-problem" tone="surface" size="md">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>The problem</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                {heading}
              </h2>
            </Reveal>
          </div>
          <div className="space-y-6">
            {bodyParagraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 + i * 0.05}>
                <p className="text-pretty text-lg leading-relaxed text-ink-soft">
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.05 + bodyParagraphs.length * 0.05}>
              <blockquote className="mt-2 border-l-2 border-[color:var(--ordron-blue)] bg-surface-2 px-6 py-5">
                <p className="text-pretty font-display text-xl font-medium leading-snug text-ink">
                  {keyStatOrCallout}
                </p>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
