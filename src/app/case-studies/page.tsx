import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CostOfInactionCalculator } from "@/components/calculator/cost-of-inaction";
import { caseStudies, caseStudyAggregates } from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case studies — finance automation outcomes Ordron has delivered",
  description:
    "Selected client outcomes across logistics, manufacturing, construction, legal and financial services. AP, AR, reporting, procurement and AI automation, with the numbers to back it.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Ordron case studies",
    description:
      "How Ordron has cut finance cycle times and returned hours to mid-market teams across seven industries.",
    url: "/case-studies",
    type: "website",
  },
};

export default function CaseStudiesIndexPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {/* Hero */}
        <Section tone="surface" size="md">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-32 h-96"
            style={{
              backgroundImage:
                "radial-gradient(at 50% 20%, rgba(0,171,255,0.12), transparent 65%)",
            }}
          />
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>Work we have shipped</Eyebrow>
              <h1 className="mt-5 text-balance">
                Finance automation outcomes, with the numbers attached.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Selected client outcomes across logistics, manufacturing,
                construction, legal and financial services. Client names are
                held back on request. Industries, platforms and results are
                not.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  href={siteConfig.ctas.scorecard.href}
                  variant="primary"
                  size="md"
                >
                  Score your own finance stack
                </Button>
                <Button
                  href={siteConfig.ctas.healthCheck.href}
                  variant="ghost"
                  size="md"
                >
                  Book a Health Check
                </Button>
              </div>
            </div>

            <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                {
                  v: String(caseStudyAggregates.totalCaseStudies),
                  l: "Case studies",
                },
                {
                  v: String(caseStudyAggregates.industriesCovered),
                  l: "Industries",
                },
                {
                  v: caseStudyAggregates.topManualReduction,
                  l: "Top manual-work cut",
                },
                {
                  v: caseStudyAggregates.topHoursReturned,
                  l: "Hrs / month returned",
                },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl border border-line bg-surface p-5 text-center"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    {s.l}
                  </dt>
                  <dd className="mt-2 font-display text-3xl font-semibold text-ink numeric">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </Section>

        {/* Case study grid */}
        <Section tone="surface-2" size="md">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>All case studies</Eyebrow>
              <h2 className="mt-4 text-balance">
                Real finance teams, real platforms, real numbers.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Pick the one closest to your industry or your stack. Each case
                study includes the challenge, the exact automation Ordron
                shipped, and the measured impact after go-live.
              </p>
            </div>

            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/case-studies/${c.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:shadow-soft"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Badge tone="brand">{c.industry}</Badge>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        className="shrink-0 text-ink-faint transition-colors group-hover:text-[color:var(--ordron-blue)]"
                        aria-hidden
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

                    <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">
                      {c.cardTitle}
                    </h3>

                    <p className="mt-3 text-[13px] uppercase tracking-[0.12em] text-[color:var(--ordron-blue)]">
                      {c.headlineStat}
                    </p>

                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                      {c.summary}
                    </p>

                    <p className="mt-5 text-xs uppercase tracking-[0.14em] text-ink-muted">
                      {c.companyDescriptor}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-[color:var(--ordron-blue)]">
                      Read the case study
                      <span aria-hidden>→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        {/* Cost of inaction — contextual to the reader */}
        <Section tone="surface" size="md">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Numbers for your team</Eyebrow>
              <h2 className="mt-4 text-balance">
                What would a result like these look like for you?
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Drop your platform and team size into the calculator below. You
                get an annual cost of manual finance, likely payback on a
                typical Ordron project, and the three automations that move
                the needle on your stack.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-6xl">
              <CostOfInactionCalculator
                variant="hero"
                source="case-studies-index"
                eyebrow="Calculator"
                heading="Your stack, your number."
                intro="Full written breakdown emailed on request."
              />
            </div>
          </Container>
        </Section>

        {/* How we talk about clients */}
        <Section tone="surface-2" size="sm">
          <Container width="narrow">
            <div className="rounded-3xl border border-line bg-surface p-8 sm:p-12">
              <h3 className="text-ink">A note on names.</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                We publish industry, company size signal, platforms and
                outcomes. We hold the client name back by default and will only
                name a client with their written permission. The numbers
                quoted are the numbers the client saw, not aspirational
                projections. Where we could not evidence a figure, we removed
                it.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={siteConfig.ctas.healthCheck.href}
                  variant="primary"
                  size="md"
                >
                  Ask for a reference call
                </Button>
                <Button href="/platforms" variant="ghost" size="md">
                  Browse by platform
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* Closing CTA */}
        <Section tone="ink" size="md" className="text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(at 15% 100%, rgba(0,171,255,0.25), transparent 55%)",
            }}
          />
          <Container className="relative">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div className="max-w-2xl">
                <h2 className="text-balance text-white">
                  Want numbers like these for your finance team?
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/72">
                  The 5-minute Scorecard surfaces the biggest drag across the
                  platforms you run. The Health Check goes deeper and gives you
                  a written report with specific automations named, whether
                  you engage Ordron or not.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:gap-4">
                <Button
                  href={siteConfig.ctas.scorecard.href}
                  variant="primary"
                  size="lg"
                >
                  Take the Scorecard
                </Button>
                <Button
                  href={siteConfig.ctas.healthCheck.href}
                  variant="inverse"
                  size="lg"
                >
                  Book a Health Check
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
