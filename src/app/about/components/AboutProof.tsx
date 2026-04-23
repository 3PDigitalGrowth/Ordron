import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import {
  caseStudyAggregates,
  getCaseStudyBySlug,
  type CaseStudy,
} from "@/lib/case-studies";
import { Reveal } from "./motion";

const FEATURED_SLUGS = [
  "logistics-legacy-erp-rpa",
  "manufacturing-invoice-hub",
  "manufacturing-multi-system-flows",
  "enterprise-ap-idu",
] as const;

export function AboutProof() {
  const featured: CaseStudy[] = FEATURED_SLUGS.map((s) =>
    getCaseStudyBySlug(s),
  ).filter((c): c is CaseStudy => Boolean(c));

  return (
    <Section tone="surface" size="md" id="proof">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Proof</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-balance">
                Work we have shipped.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[17px] leading-[1.7] text-ink-soft">
                Four engagements, anonymised, with numbers pulled from
                post-go-live measurement. The full library runs to{" "}
                {caseStudyAggregates.totalCaseStudies} studies across{" "}
                {caseStudyAggregates.industriesCovered} industries.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--ordron-blue-deep)] hover:text-[color:var(--ordron-blue)]"
            >
              See all {caseStudyAggregates.totalCaseStudies} case studies
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.06} as="li" amount={0.15}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface-2 p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:shadow-soft"
              >
                <span className="inline-flex w-fit items-center rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  {study.industry}
                </span>
                <p className="mt-5 font-display text-[28px] font-semibold leading-[1.1] text-ink numeric tabular-nums">
                  {primaryStat(study)}
                </p>
                <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                  {primaryLabel(study)}
                </p>
                <h3 className="mt-6 font-display text-[17px] font-semibold leading-snug text-ink">
                  {study.cardTitle}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-ink-soft">
                  {study.summary}
                </p>
                <span className="mt-auto pt-6 text-[13px] font-semibold text-[color:var(--ordron-blue-deep)] transition-colors group-hover:text-[color:var(--ordron-blue)]">
                  Read the case study →
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/** Pick the strongest stat tile for the card hero number. */
function primaryStat(study: CaseStudy): string {
  return study.impact.stats[0]?.value ?? study.headlineStat;
}

function primaryLabel(study: CaseStudy): string {
  return study.impact.stats[0]?.label ?? "Impact";
}
