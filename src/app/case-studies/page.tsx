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
import {
  caseStudies,
  caseStudiesByIndustry,
  caseStudyAggregates,
} from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case studies — finance automation outcomes Ordron has delivered",
  description:
    "Anonymised outcomes across logistics, distribution, manufacturing, construction, industrial services, legal, financial and professional services. AP, AR, reporting, procurement, custom platforms and AI automation, with the numbers to back it.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Ordron case studies",
    description:
      "How Ordron has cut finance cycle times, returned hours, and modernised reporting for mid-market teams across eight industries.",
    url: "/case-studies",
    type: "website",
  },
};

const topResults: { stat: string; label: string; slug: string }[] = [
  {
    stat: "85%",
    label: "less manual entry, 160+ hrs/mo returned",
    slug: "logistics-legacy-erp-rpa",
  },
  {
    stat: "4 hrs → 15 min",
    label: "AP cycle per batch, no new software",
    slug: "logistics-ap-ocr",
  },
  {
    stat: "80%",
    label: "less time on AR reconciliation in Xero",
    slug: "freight-xero-ar",
  },
  {
    stat: "75%",
    label: "of supplier invoices fully auto-processed",
    slug: "manufacturing-invoice-hub",
  },
  {
    stat: "10 days → 24 hrs",
    label: "reporting cycle across shared inbox intake",
    slug: "manufacturing-invoice-hub",
  },
  {
    stat: "2 days → 2 hrs",
    label: "mobile procurement approval on-site",
    slug: "industrial-mobile-procurement",
  },
  {
    stat: ">95%",
    label: "coding accuracy with IDU on enterprise AP",
    slug: "enterprise-ap-idu",
  },
  {
    stat: "80%+",
    label: "of complex multi-split invoices automated",
    slug: "intelligent-invoice-multisplit",
  },
  {
    stat: "75%",
    label: "faster legal document processing with AI",
    slug: "legal-ai-contracts",
  },
  {
    stat: "65%",
    label: "less manual compliance monitoring",
    slug: "financial-services-risk-ai",
  },
  {
    stat: "2×",
    label: "advisory client capacity, no added headcount",
    slug: "advisory-excel-to-enterprise",
  },
  {
    stat: "70%",
    label: "less manual data prep for asset-manager advisors",
    slug: "asset-mgmt-data-integration",
  },
];

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
                Anonymised outcomes across {caseStudyAggregates.industriesCovered}{" "}
                industries. Client names are held back on request. Industries,
                platforms, the exact automation shipped and the measured results
                are not.
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

        {/* Top-level results strip */}
        <Section tone="surface-2" size="md">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>Results at a glance</Eyebrow>
              <h2 className="mt-4 text-balance">
                Twelve numbers from finance teams that ran the work.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Every figure below is from a real Ordron engagement, measured
                after go-live. Tap a number to read the full case study.
              </p>
            </div>

            <ul className="mt-12 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {topResults.map((r, i) => (
                <li key={`${r.slug}-${i}`} className="h-full">
                  <Link
                    href={`/case-studies/${r.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:shadow-soft"
                  >
                    <p className="font-display text-3xl font-semibold tracking-tight text-[color:var(--ordron-blue-deep)] numeric">
                      {r.stat}
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                      {r.label}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ordron-blue)] transition-transform group-hover:text-[color:var(--ordron-blue-deep)]">
                      Read the case study
                      <span
                        aria-hidden
                        className="transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        {/* Grouped case study library */}
        <Section tone="surface" size="md">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>The full library</Eyebrow>
              <h2 className="mt-4 text-balance">
                Pick the one closest to your industry or your stack.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Each case study spells out the challenge, the exact automation
                Ordron shipped, and the measured impact after go-live. No
                aspirational projections.
              </p>

              <nav
                aria-label="Jump to industry"
                className="mt-8 flex flex-wrap gap-2"
              >
                {caseStudiesByIndustry.map(({ industry, studies }) => (
                  <a
                    key={industry}
                    href={`#${industryAnchor(industry)}`}
                    className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-[color:var(--ordron-blue)]/30 hover:text-ink"
                  >
                    {industry}{" "}
                    <span className="text-ink-muted">({studies.length})</span>
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-14 space-y-20">
              {caseStudiesByIndustry.map(({ industry, studies }) => (
                <section
                  key={industry}
                  id={industryAnchor(industry)}
                  aria-label={`${industry} case studies`}
                  className="scroll-mt-24"
                >
                  <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
                      {industry}
                    </h3>
                    <span className="text-xs uppercase tracking-[0.14em] text-ink-muted">
                      {studies.length}{" "}
                      {studies.length === 1 ? "case study" : "case studies"}
                    </span>
                  </div>

                  <ul className="mt-8 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {studies.map((c) => (
                      <li key={c.slug} className="h-full">
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

                          <h4 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">
                            {c.cardTitle}
                          </h4>

                          <p className="mt-3 font-display text-lg font-semibold tracking-tight text-[color:var(--ordron-blue-deep)]">
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

                          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-[color:var(--ordron-blue)] group-hover:text-[color:var(--ordron-blue-deep)]">
                            Read the case study
                            <span
                              aria-hidden
                              className="transition-transform group-hover:translate-x-0.5"
                            >
                              →
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </Container>
        </Section>

        {/* Cost of inaction — contextual to the reader */}
        <Section tone="surface-2" size="md">
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
        <Section tone="surface" size="sm">
          <Container width="narrow">
            <div className="rounded-3xl border border-line bg-surface-2 p-8 sm:p-12">
              <h3 className="text-ink">A note on names.</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                We publish industry, company size signal, platforms and
                outcomes. We hold the client name back by default and will only
                name a client with their written permission. The numbers
                quoted are the numbers the client saw, not aspirational
                projections. Where we could not evidence a figure, we removed
                it. A reference call is available on request.
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
                <Button
                  href="/finance-automation-australia"
                  variant="ghost"
                  size="md"
                >
                  Read the AU pillar guide
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
                <p className="mt-4 text-sm text-white/55">
                  {caseStudies.length} published case studies.{" "}
                  {caseStudyAggregates.industriesCovered} industries covered.
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

function industryAnchor(industry: string): string {
  return `industry-${industry.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}
