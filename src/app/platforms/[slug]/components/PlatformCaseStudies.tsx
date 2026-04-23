import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import type { CaseStudy } from "@/lib/case-studies";
import type { PlatformHub } from "@/data/platforms";
import { Reveal } from "./motion";

type Props = {
  platform: PlatformHub;
  caseStudies: CaseStudy[];
};

export function PlatformCaseStudies({ platform, caseStudies }: Props) {
  return (
    <Section tone="surface" size="md">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Proof</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-balance">
              {platform.name} work we&rsquo;ve shipped.
            </h2>
          </Reveal>
        </div>

        {caseStudies.length > 0 ? (
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.slice(0, 3).map((c, i) => (
              <Reveal key={c.slug} as="li" delay={i * 0.08} amount={0.25}>
                <Link
                  href={`/case-studies/${c.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-surface-2 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:shadow-soft"
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
                Named case studies for {platform.name} coming soon. In the
                meantime, see how we&rsquo;ve automated finance operations
                across{" "}
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
