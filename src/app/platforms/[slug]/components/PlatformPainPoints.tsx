import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { PlatformHub } from "@/data/platforms";
import { Reveal } from "./motion";

type Props = {
  platform: PlatformHub;
};

export function PlatformPainPoints({ platform }: Props) {
  const { commonPainPoints, name } = platform;
  const count = commonPainPoints.length;

  return (
    <Section tone="surface" size="md">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Where the hours go</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-balance">
              The {numberWord(count)} signals that {name} is costing you more
              than it should.
            </h2>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2">
          {commonPainPoints.map((point, i) => (
            <Reveal key={i} delay={i * 0.08} as="li" amount={0.25}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-line bg-surface-2 p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:shadow-soft sm:p-9">
                <div className="flex items-start gap-5">
                  <span
                    aria-hidden
                    className="shrink-0 font-display text-4xl font-semibold text-[color:var(--ordron-blue)]/30 numeric tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[17px] font-medium leading-relaxed text-ink">
                    {point}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function numberWord(n: number): string {
  const map: Record<number, string> = {
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
  };
  return map[n] ?? String(n);
}
