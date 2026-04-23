import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { caseStudies } from "@/lib/case-studies";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

/*
  Deliberately numeric-only. When the About page ships it will carry
  the longer-form narrative and client quotes, so we keep this block
  bare: three stats, three one-line contexts. That way a visitor who
  navigates About -> Contact (or vice versa) never feels like they
  are reading the same module twice.
*/

type ProofStat = {
  value: string;
  context: string;
};

const stats: ProofStat[] = [
  {
    value: "85%",
    context: "Less manual entry. Logistics, 160+ hours saved per month.",
  },
  {
    value: "10 days to 2",
    context: "Month-end cycle. Manufacturing.",
  },
  {
    value: "80%",
    context: "Less time on AR reconciliation. Freight.",
  },
];

export function ContactProof() {
  return (
    <Section tone="surface" size="md">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>In case it helps</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl">
              Some recent outcomes
            </h2>
          </Reveal>
        </div>

        <dl className="mt-12 grid gap-5 md:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.context} as="div" delay={0.05 + i * 0.05}>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-[color:var(--ordron-teal)]/25 bg-[color:var(--ordron-mint)] p-7">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Outcome
                </dt>
                <dd className="flex flex-col gap-3">
                  <span className="font-display text-3xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-4xl">
                    {s.value}
                  </span>
                  <span className="text-[14px] leading-relaxed text-ink-soft">
                    {s.context}
                  </span>
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <div className="mt-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--ordron-teal)] underline-offset-4 hover:underline"
          >
            See all {caseStudies.length} case studies
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              aria-hidden
              fill="none"
            >
              <path
                d="M3 7h8m0 0-3-3m3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
