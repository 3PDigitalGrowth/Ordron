import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { CostOfInactionCalculator } from "@/components/calculator/cost-of-inaction";
import { platformGroups, platforms } from "@/lib/platforms";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Platforms we automate — Xero, MYOB, NetSuite and 10 more",
  description:
    "Ordron has built 130 named automations across 13 finance platforms. Pick the platform you run and see the specific AP, AR, reconciliation and reporting automations we deliver on it.",
  alternates: { canonical: "/platforms" },
  openGraph: {
    title: "Platforms Ordron automates",
    description:
      "13 finance platforms, 130 named automations, built in Australia.",
    url: "/platforms",
    type: "website",
  },
};

export default function PlatformsPage() {
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
              <Eyebrow>13 platforms, 130 automations</Eyebrow>
              <h1 className="mt-5 text-balance">
                We automate the finance stack you already run.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Ordron has built 130 named automations across the 13 platforms
                below. Pick the one your team uses. Each hub lists the specific
                workflows we have shipped there, with the hours and errors they
                remove.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  href={siteConfig.ctas.scorecard.href}
                  variant="primary"
                  size="md"
                >
                  Start with the 5-minute Scorecard
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
                { v: "13", l: "Platforms" },
                { v: "130", l: "Named automations" },
                { v: "100%", l: "Client retention" },
                { v: "AU", l: "Sydney-built" },
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

        {/* Grouped platforms */}
        <Section tone="surface-2" size="md">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>Every platform we support</Eyebrow>
              <h2 className="mt-4 text-balance">
                Grouped by where it sits in your finance stack.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Each platform below opens its own automation hub with the
                specific workflows we have built on it, typical time-saved
                ranges, and the implementation path.
              </p>
            </div>

            <div className="mt-14 space-y-14">
              {platformGroups
                .filter((g) => g.platforms.length > 0)
                .map((group) => (
                  <section key={group.id} aria-labelledby={`grp-${group.id}`}>
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-12">
                      <div>
                        <h3 id={`grp-${group.id}`} className="text-ink">
                          {group.heading}
                        </h3>
                        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                          {group.summary}
                        </p>
                      </div>

                      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {group.platforms.map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={`/platforms/${p.slug}`}
                              className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:shadow-soft"
                            >
                              <div className="min-w-0">
                                <p className="font-display text-lg font-semibold tracking-tight text-ink">
                                  {p.name}
                                </p>
                                <p className="mt-0.5 truncate text-xs text-ink-muted">
                                  {p.detail}
                                </p>
                              </div>
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
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                ))}
            </div>
          </Container>
        </Section>

        {/* Cost of inaction — contextual to platform selection */}
        <Section tone="surface" size="md">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Cost of inaction</Eyebrow>
              <h2 className="mt-4 text-balance">
                What is your current platform costing you?
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Pick the platform you run below. The calculator returns your
                annual cost of manual finance, likely payback on a typical
                Ordron project, and the three specific automations that move
                the needle on that stack.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-6xl">
              <CostOfInactionCalculator
                variant="hero"
                source="platforms-hub"
                eyebrow="Calculator"
                heading="Your platform, your numbers."
                intro="Change the platform to see the named automations shift. Full written breakdown emailed on request."
              />
            </div>
          </Container>
        </Section>

        {/* What "platform coverage" actually means */}
        <Section tone="surface-2" size="md">
          <Container width="narrow">
            <div className="max-w-2xl">
              <Eyebrow>What coverage means</Eyebrow>
              <h2 className="mt-4 text-balance">
                Platform support without the asterisks.
              </h2>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {[
                {
                  t: "Native API wherever possible",
                  d: "We prefer documented APIs over screen-scraping. When the platform exposes it, we use it.",
                },
                {
                  t: "RPA where the API does not reach",
                  d: "For bank portals, legacy ERPs and older interfaces, we run attended and unattended RPA against the same controls a human would use.",
                },
                {
                  t: "Database-first architecture",
                  d: "Every automation writes to your own Azure-hosted database first, then pushes to the platform. You keep the data even if the vendor changes.",
                },
                {
                  t: "Human-in-the-loop by default",
                  d: "Nothing posts to your ledger without an exception path and an audit trail. Automation does not mean unsupervised.",
                },
              ].map((b) => (
                <div
                  key={b.t}
                  className="rounded-2xl border border-line bg-surface p-6"
                >
                  <p className="font-display text-base font-semibold text-ink">
                    {b.t}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                    {b.d}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Not listed */}
        <Section tone="surface" size="sm">
          <Container width="narrow">
            <div className="rounded-3xl border border-line bg-surface-2 p-8 sm:p-12">
              <h3 className="text-ink">Running something that is not listed?</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                If your platform has an API or a structured interface, we can
                usually automate against it. Ordron has built custom integrations
                into HubSpot, Salesforce, Jira, Monday, and a handful of legacy
                ERPs the accounting platforms above do not cover. Tell us what
                you run and we will tell you honestly whether automation makes
                sense.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={siteConfig.ctas.healthCheck.href}
                  variant="primary"
                  size="md"
                >
                  Ask about your platform
                </Button>
                <Button
                  href={siteConfig.ctas.scorecard.href}
                  variant="ghost"
                  size="md"
                >
                  Take the Scorecard first
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
                  Not sure which platform is costing you the most hours?
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/72">
                  The 5-minute Scorecard surfaces the biggest drag on your
                  finance team across every platform you run. The Health Check
                  goes deeper and gives you a written report with specific
                  automations named, whether you engage Ordron or not.
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

            <p className="mt-10 text-sm text-white/60">
              We list {platforms.length} platforms publicly. If you run
              something else that has an API or a structured interface, ask.
              Prefer the long read first?{" "}
              <Link
                href="/finance-automation-australia"
                className="font-semibold text-white/90 hover:text-white hover:underline"
              >
                Finance automation in Australia
              </Link>
              .
            </p>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
