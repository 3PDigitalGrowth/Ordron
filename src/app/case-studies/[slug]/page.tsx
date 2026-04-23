import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  getCaseStudyBySlug,
  getRelatedCaseStudies,
} from "@/lib/case-studies";
import { getPlatformBySlug } from "@/lib/platforms";
import { siteConfig } from "@/lib/site";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  { params }: CaseStudyPageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: "Case study not found" };

  return {
    title: study.metaTitle,
    description: study.metaDescription,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title: study.metaTitle,
      description: study.metaDescription,
      url: `/case-studies/${study.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const related = getRelatedCaseStudies(study.slug);
  const calculatorPlatform = study.calculatorPlatformSlug
    ? getPlatformBySlug(study.calculatorPlatformSlug)
    : undefined;

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
                "radial-gradient(at 20% 20%, rgba(0,171,255,0.12), transparent 65%)",
            }}
          />
          <Container className="relative">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                <li>
                  <Link
                    href="/case-studies"
                    className="hover:text-[color:var(--ordron-blue)]"
                  >
                    Case studies
                  </Link>
                </li>
                <li aria-hidden className="text-ink-faint">
                  /
                </li>
                <li className="text-ink">{study.industry}</li>
              </ol>
            </nav>

            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="brand">{study.industry}</Badge>
                  {study.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h1 className="mt-6 text-balance">{study.title}</h1>

                <p className="mt-5 text-[15px] uppercase tracking-[0.14em] text-[color:var(--ordron-blue)]">
                  {study.headlineStat}
                </p>

                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
                  {study.summary}
                </p>

                <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
                  {study.companyDescriptor}
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button
                    href={siteConfig.ctas.healthCheck.href}
                    variant="primary"
                    size="md"
                  >
                    Book your Roadmap
                  </Button>
                  <Button
                    href={siteConfig.ctas.scorecard.href}
                    variant="ghost"
                    size="md"
                  >
                    Find your automation quick wins
                  </Button>
                </div>
              </div>

              {/* At a glance panel */}
              <aside
                aria-label="At a glance"
                className="h-max rounded-3xl border border-line bg-surface-2 p-6 sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  At a glance
                </p>

                <dl className="mt-5 space-y-5 text-sm">
                  <div>
                    <dt className="text-ink-muted">Industry</dt>
                    <dd className="mt-1 font-medium text-ink">
                      {study.industry}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-muted">Platforms involved</dt>
                    <dd className="mt-1 font-medium text-ink">
                      {study.platforms.join(", ")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-muted">Headline outcome</dt>
                    <dd className="mt-1 font-medium text-ink">
                      {study.headlineStat}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-muted">Focus areas</dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {study.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-medium text-ink-soft"
                        >
                          {t}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>
          </Container>
        </Section>

        {/* Challenge */}
        <Section tone="surface-2" size="md">
          <Container width="narrow">
            <div className="grid gap-10 md:grid-cols-[180px_minmax(0,1fr)]">
              <div>
                <Eyebrow>01 · Challenge</Eyebrow>
                <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  Where they started.
                </h2>
              </div>
              <ul className="space-y-4">
                {study.challenge.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-4 rounded-2xl border border-line bg-surface p-5"
                  >
                    <span
                      aria-hidden
                      className="mt-1 h-5 w-5 shrink-0 rounded-full bg-[#FFF6E6] ring-1 ring-[color:var(--ordron-amber)]/30"
                    />
                    <p className="text-[15px] leading-relaxed text-ink">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        {/* Solution */}
        <Section tone="surface" size="md">
          <Container width="narrow">
            <div className="grid gap-10 md:grid-cols-[180px_minmax(0,1fr)]">
              <div>
                <Eyebrow>02 · Solution</Eyebrow>
                <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  What Ordron shipped.
                </h2>
              </div>
              <div>
                <p className="text-[17px] leading-relaxed text-ink">
                  {study.solution.lead}
                </p>

                <ul className="mt-8 space-y-3">
                  {study.solution.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        aria-hidden
                        className="mt-0.5 shrink-0 text-[color:var(--ordron-blue)]"
                      >
                        <path
                          d="M4.5 10.5l3.25 3.25L15.5 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                      <span className="text-[15px] leading-relaxed text-ink-soft">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 rounded-2xl border border-line bg-surface-2 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Platforms involved
                  </p>
                  <p className="mt-2 text-[15px] text-ink">
                    {study.platforms.join(" · ")}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Impact */}
        <Section tone="surface-2" size="md">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>03 · Impact</Eyebrow>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                What changed after go-live.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Every figure below is a number the client saw, not an
                aspirational projection.
              </p>
            </div>

            <dl className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {study.impact.stats.map((s, i) => (
                <div
                  key={`${s.label}-${i}`}
                  className="rounded-2xl border border-[color:var(--ordron-teal)]/30 bg-mint p-6"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ordron-teal)]">
                    {s.label}
                  </dt>
                  <dd className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink numeric">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              {study.impact.bullets.map((b, i) => (
                <li
                  key={i}
                  className="rounded-2xl border border-line bg-surface p-6"
                >
                  <span
                    aria-hidden
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--ordron-blue)]/10 text-[13px] font-semibold text-[color:var(--ordron-blue)] numeric"
                  >
                    {i + 1}
                  </span>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink">
                    {b}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        {/* Cost of Inaction (contextual) */}
        <Section tone="surface" size="md">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>What it could look like for you</Eyebrow>
              <h2 className="mt-4 text-balance">
                Run the numbers for your own finance stack.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                {calculatorPlatform
                  ? `Pre-set to ${calculatorPlatform.name}. Change platform and team size to match yours.`
                  : "Pick your platform and team size. The calculator returns an annual cost of manual finance and a likely payback window."}
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-6xl">
              <CostOfInactionCalculator
                variant="hero"
                source={`case-study:${study.slug}`}
                defaultPlatformSlug={study.calculatorPlatformSlug}
                eyebrow="Calculator"
                heading="Your stack, your number."
                intro="Full written breakdown emailed on request."
              />
            </div>
          </Container>
        </Section>

        {/* Related case studies */}
        {related.length > 0 && (
          <Section tone="surface-2" size="md">
            <Container>
              <div className="max-w-2xl">
                <Eyebrow>Related case studies</Eyebrow>
                <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  Closest pattern matches.
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                  Different industries, similar shape of problem.
                </p>
              </div>

              <ul className="mt-10 grid gap-5 md:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/case-studies/${r.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:shadow-soft"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <Badge tone="brand">{r.industry}</Badge>
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
                        {r.cardTitle}
                      </h3>
                      <p className="mt-3 text-[12px] uppercase tracking-[0.12em] text-[color:var(--ordron-blue)]">
                        {r.headlineStat}
                      </p>
                      <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                        {r.summary}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link
                  href="/case-studies"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-[color:var(--ordron-blue)]"
                >
                  <span aria-hidden>←</span>
                  Back to all case studies
                </Link>
              </div>
            </Container>
          </Section>
        )}

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
                  Want a result like this one?
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/72">
                  The automation diagnostic takes five minutes and surfaces
                  where your stack is leaking hours. The Automation Roadmap
                  goes deeper and gives you a written report with specific
                  automations named, whether you engage Ordron or not.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:gap-4">
                <Button
                  href={siteConfig.ctas.scorecard.href}
                  variant="inverse"
                  size="lg"
                >
                  Find your automation quick wins
                </Button>
                <Button
                  href={siteConfig.ctas.healthCheck.href}
                  variant="primary"
                  size="lg"
                >
                  Book your Roadmap
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
