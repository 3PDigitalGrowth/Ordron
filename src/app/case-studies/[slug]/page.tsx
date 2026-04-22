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
import { siteConfig } from "@/lib/site";

type PageParams = { slug: string };

export function generateStaticParams(): PageParams[] {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) {
    return {
      title: "Case study not found",
    };
  }
  return {
    title: study.metaTitle,
    description: study.metaDescription,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title: study.title,
      description: study.summary,
      url: `/case-studies/${study.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const related = getRelatedCaseStudies(slug);

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
            <nav
              aria-label="Breadcrumb"
              className="mb-6 text-sm text-ink-muted"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link
                    href="/"
                    className="hover:text-[color:var(--ordron-blue)]"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden className="text-ink-faint">
                  /
                </li>
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
                <li className="text-ink">{study.cardTitle}</li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="brand">{study.industry}</Badge>
                {study.tags.slice(0, 3).map((t) => (
                  <Badge key={t} tone="neutral">
                    {t}
                  </Badge>
                ))}
              </div>

              <h1 className="mt-6 text-balance">{study.title}</h1>

              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                {study.summary}
              </p>

              <p className="mt-6 text-sm uppercase tracking-[0.14em] text-ink-muted">
                {study.companyDescriptor}
              </p>

              <p className="mt-10 font-display text-3xl font-semibold tracking-tight text-[color:var(--ordron-blue)] sm:text-4xl">
                {study.headlineStat}
              </p>
            </div>

            {/* Client profile panel */}
            <dl className="mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-line bg-surface p-5">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Industry
                </dt>
                <dd className="mt-2 font-display text-base font-semibold text-ink">
                  {study.industry}
                </dd>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-5">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Platforms involved
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink">
                  {study.platforms.join(", ")}
                </dd>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-5">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Automation focus
                </dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {study.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-ink-soft"
                    >
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Container>
        </Section>

        {/* Challenge */}
        <Section tone="surface-2" size="md">
          <Container width="narrow">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-16">
              <div>
                <Eyebrow>The challenge</Eyebrow>
                <h2 className="mt-4 text-balance">Where hours were going.</h2>
              </div>
              <div>
                <ul className="space-y-5">
                  {study.challenge.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex gap-4 rounded-2xl border border-line bg-surface p-5"
                    >
                      <span
                        aria-hidden
                        className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFF6E6] text-xs font-semibold text-[#9B6A10]"
                      >
                        {idx + 1}
                      </span>
                      <p className="text-[15px] leading-relaxed text-ink-soft">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>

        {/* Solution */}
        <Section tone="surface" size="md">
          <Container width="narrow">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-16">
              <div>
                <Eyebrow>The solution</Eyebrow>
                <h2 className="mt-4 text-balance">What Ordron shipped.</h2>
              </div>
              <div>
                <p className="text-[17px] leading-relaxed text-ink">
                  {study.solution.lead}
                </p>
                <ul className="mt-8 space-y-3">
                  {study.solution.bullets.map((b, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 rounded-2xl border border-line bg-surface-2 p-5"
                    >
                      <span
                        aria-hidden
                        className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--ordron-blue)] text-white"
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          aria-hidden
                        >
                          <path
                            d="M1.5 5.5 4 8l5.5-5.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <p className="text-[15px] leading-relaxed text-ink">
                        {b}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </Section>

        {/* Impact */}
        <Section tone="surface-2" size="md">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>The impact</Eyebrow>
              <h2 className="mt-4 text-balance">
                What changed after go-live.
              </h2>
            </div>

            <dl className="mt-12 grid gap-5 sm:grid-cols-3">
              {study.impact.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-line bg-surface p-8"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    {s.label}
                  </dt>
                  <dd className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl numeric">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-10 space-y-3">
              {study.impact.bullets.map((b, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 rounded-2xl border border-line bg-surface p-5"
                >
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--ordron-teal)]/15 text-[color:var(--ordron-teal)]"
                  >
                    <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden>
                      <path
                        d="M1.5 5.5 4 8l5.5-5.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <p className="text-[15px] leading-relaxed text-ink">{b}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        {/* Cost of inaction calculator — platform-aware where possible */}
        <Section tone="surface" size="md">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>What about your team?</Eyebrow>
              <h2 className="mt-4 text-balance">
                Get your own annual cost of manual finance.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                {study.calculatorPlatformSlug
                  ? `Pre-populated for the platform in this case study. Change it if your stack is different.`
                  : `Drop your platform and team size in below. You get a headline number, likely payback, and the three automations that would move the needle on your stack.`}
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-6xl">
              <CostOfInactionCalculator
                variant="hero"
                source={`case-study-${study.slug}`}
                eyebrow="Calculator"
                heading="Your stack, your number."
                intro="Full written breakdown emailed on request."
                defaultPlatformSlug={study.calculatorPlatformSlug}
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
                <h2 className="mt-4 text-balance">
                  Similar stacks, similar outcomes.
                </h2>
              </div>

              <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/case-studies/${c.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:shadow-soft"
                    >
                      <Badge tone="brand">{c.industry}</Badge>
                      <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">
                        {c.cardTitle}
                      </h3>
                      <p className="mt-3 text-[13px] uppercase tracking-[0.12em] text-[color:var(--ordron-blue)]">
                        {c.headlineStat}
                      </p>
                      <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                        {c.summary}
                      </p>
                      <span className="mt-auto pt-6 text-sm font-semibold text-ink group-hover:text-[color:var(--ordron-blue)]">
                        Read the case study →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
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
                  Want a result like this for your finance team?
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/72">
                  The Health Check is the shortest path to a named automation
                  plan on your platform. You get a written report with
                  specific workflows, the hours they remove, and a payback
                  estimate, whether you engage Ordron or not.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:gap-4">
                <Button
                  href={siteConfig.ctas.healthCheck.href}
                  variant="primary"
                  size="lg"
                >
                  Book a Health Check
                </Button>
                <Button
                  href={siteConfig.ctas.scorecard.href}
                  variant="inverse"
                  size="lg"
                >
                  Take the Scorecard
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
