import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Scorecard } from "@/components/scorecard/scorecard";
import { Button } from "@/components/ui/button";
import { pillars } from "@/lib/scorecard";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Finance Automation Diagnostic | Ordron",
  description:
    "A 5-minute, 10-question Finance Automation Diagnostic that scores your finance operation across four pillars: manual workload, system disconnects, errors and delays, and scalability.",
  alternates: { canonical: "/scorecard" },
  openGraph: {
    title: "Ordron Finance Automation Diagnostic",
    description:
      "Find your finance automation quick wins across four pillars in 5 minutes. Instant result. No sales call required.",
    url: "/scorecard",
    type: "website",
  },
};

export default function ScorecardPage() {
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
              <Eyebrow>Finance Automation Diagnostic</Eyebrow>
              <h1 className="mt-5 text-balance">
                Where are your finance hours going?
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                10 questions, 5 minutes, one honest score across the four
                pillars that drive finance automation ROI. Your result appears
                the moment you finish. The full pillar-by-pillar breakdown
                unlocks with an email.
              </p>

              <ul className="mt-10 grid gap-3 text-left sm:grid-cols-4">
                {(Object.values(pillars) as (typeof pillars)[keyof typeof pillars][]).map(
                  (p, i) => (
                    <li
                      key={p.id}
                      className="rounded-2xl border border-line bg-surface p-4"
                    >
                      <p className="font-display text-sm font-semibold tracking-[0.14em] text-brand-deep numeric">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-1 font-display text-[15px] font-semibold text-ink">
                        {p.short}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                        {p.description}
                      </p>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </Container>
        </Section>

        {/* Diagnostic */}
        <Section tone="surface-2" size="md" className="pt-0 sm:pt-4">
          <Container width="narrow">
            <Scorecard />
          </Container>
        </Section>

        {/* Trust + Automation Roadmap tee-up */}
        <Section tone="surface" size="md">
          <Container>
            <div className="grid gap-10 rounded-[28px] border border-line bg-surface-2 p-8 sm:p-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-16">
              <div>
                <Eyebrow>What happens next</Eyebrow>
                <h2 className="mt-4 text-balance">
                  The diagnostic clarifies the problem. The roadmap builds the
                  plan.
                </h2>
                <p className="mt-5 text-[15.5px] leading-relaxed text-ink-soft">
                  The Automation Diagnostic is designed to give you a fast,
                  honest read on where your finance friction is concentrated.
                  It does not produce a roadmap. That is deliberate: a real
                  plan needs a look at your actual workflows, systems and
                  volumes. That is what the Automation Roadmap session is for.
                </p>

                <ul className="mt-6 space-y-3">
                  {[
                    "60 minutes of focused workflow mapping",
                    "Written report with prioritised opportunities",
                    "ROI projection on the top 3 automation areas",
                    "You keep the report whether you engage Ordron or not",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[15px] text-ink-soft"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        className="mt-1 shrink-0 text-[color:var(--ordron-teal)]"
                        aria-hidden
                      >
                        <path
                          d="m3.5 9.5 3.5 3.5 8-8"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    href={siteConfig.ctas.healthCheck.href}
                    variant="primary"
                    size="lg"
                  >
                    Book your Roadmap
                  </Button>
                  <p className="mt-3 text-xs text-ink-muted">
                    60 minutes. Written report. Yours to keep.
                  </p>
                </div>
              </div>

              <aside className="rounded-[24px] bg-surface p-7 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Not ready to book yet?
                </p>
                <h3 className="mt-3 text-xl">Ways to keep exploring</h3>
                <ul className="mt-5 space-y-3 text-[15px]">
                  <li>
                    <Link
                      href="/guide/automations"
                      className="group flex items-start justify-between gap-3 rounded-xl border border-line p-4 transition-colors hover:border-[color:var(--ordron-blue)]/30"
                    >
                      <span>
                        <span className="block font-display font-semibold text-ink">
                          Automation explorer
                        </span>
                        <span className="block text-sm text-ink-muted">
                          AP, AR, reconciliations, reporting
                        </span>
                      </span>
                      <Arrow />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/platforms"
                      className="group flex items-start justify-between gap-3 rounded-xl border border-line p-4 transition-colors hover:border-[color:var(--ordron-blue)]/30"
                    >
                      <span>
                        <span className="block font-display font-semibold text-ink">
                          Platform hubs
                        </span>
                        <span className="block text-sm text-ink-muted">
                          Xero, MYOB, NetSuite, SAP + 9 more
                        </span>
                      </span>
                      <Arrow />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/case-studies"
                      className="group flex items-start justify-between gap-3 rounded-xl border border-line p-4 transition-colors hover:border-[color:var(--ordron-blue)]/30"
                    >
                      <span>
                        <span className="block font-display font-semibold text-ink">
                          Case studies
                        </span>
                        <span className="block text-sm text-ink-muted">
                          Real Australian finance teams
                        </span>
                      </span>
                      <Arrow />
                    </Link>
                  </li>
                </ul>
              </aside>
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      className="shrink-0 text-ink-faint transition-colors group-hover:text-[color:var(--ordron-blue)]"
      aria-hidden
    >
      <path
        d="M4 9h10m0 0-4-4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
