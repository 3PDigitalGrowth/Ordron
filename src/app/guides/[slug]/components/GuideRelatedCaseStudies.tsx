import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import type { CaseStudy } from "@/lib/case-studies";
import type { Guide } from "@/data/guides";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

type Props = {
  guide: Guide;
  caseStudies: CaseStudy[];
};

export function GuideRelatedCaseStudies({ guide, caseStudies }: Props) {
  const functionLabel = guide.category.toLowerCase();

  return (
    <Section tone="surface" size="md">
      <Container>
        <div className="max-w-[760px]">
          <Reveal>
            <Eyebrow>Proof</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl">
              Australian teams who automated their {functionLabel}
            </h2>
          </Reveal>
        </div>

        {caseStudies.length > 0 ? (
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {caseStudies.slice(0, 3).map((c, i) => (
              <Reveal key={c.slug} as="li" delay={i * 0.08} amount={0.25}>
                <Link
                  href={`/case-studies/${c.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface-2 p-7 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/40 hover:shadow-float"
                >
                  <div className="flex items-center justify-between gap-3">
                    <Badge tone="brand">{c.industry}</Badge>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 20 20"
                      aria-hidden
                      className="shrink-0 text-ink-faint transition-colors group-hover:text-[color:var(--ordron-blue)]"
                    >
                      <path
                        d="M4 10h12m0 0-5-5m5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">
                    {c.cardTitle}
                  </h3>
                  <p className="mt-3 text-[12px] uppercase tracking-[0.12em] text-[color:var(--ordron-blue)]">
                    {c.headlineStat}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                    {c.summary}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal delay={0.1}>
            <div className="mt-12 rounded-3xl border border-line bg-surface-2 p-8 sm:p-12">
              <p className="text-[15px] leading-relaxed text-ink">
                Named case studies for {functionLabel} automation coming
                soon. In the meantime, see{" "}
                <Link
                  href="/case-studies"
                  className="font-semibold text-[color:var(--ordron-blue-deep)] hover:underline"
                >
                  every Ordron case study
                </Link>
                .
              </p>
            </div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
