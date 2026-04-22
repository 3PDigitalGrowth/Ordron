import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { CostOfInactionCalculator } from "@/components/calculator/cost-of-inaction";
import { ASSUMPTIONS, formatAud } from "@/lib/cost-of-inaction";
import { platforms } from "@/lib/platforms";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Cost of Inaction Calculator — what manual finance is costing your team",
  description:
    "Four inputs, a defensible number. See your finance team's annual cost of manual work, your likely payback period on automation, and the top three automations for your platform. No obligation, you keep the report.",
  alternates: { canonical: "/cost-of-inaction" },
  openGraph: {
    title: "The Ordron Cost of Inaction Calculator",
    description:
      "Four inputs. Annual $ waste. Payback period. Top three automations. Emailed on request.",
    url: "/cost-of-inaction",
    type: "website",
  },
};

type PageProps = {
  searchParams: Promise<{ platform?: string }>;
};

export default async function CostOfInactionPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const requested = params.platform;
  const defaultPlatformSlug =
    requested && platforms.some((p) => p.slug === requested)
      ? requested
      : undefined;

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {/* Hero + calculator */}
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
              <Eyebrow>Cost of Inaction Calculator</Eyebrow>
              <h1 className="mt-5 text-balance">
                Find out exactly what manual finance is costing your team.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                Four inputs. A defensible annual number. The likely payback
                period on a typical {formatAud(ASSUMPTIONS.typicalProjectCost)}{" "}
                automation project. The top three automations for your
                platform. Emailed in full on request. No obligation to proceed.
              </p>
            </div>

            <div className="mx-auto mt-14 max-w-6xl">
              <CostOfInactionCalculator
                variant="hero"
                source="cost-of-inaction-page"
                defaultPlatformSlug={defaultPlatformSlug}
                eyebrow="Your numbers"
                heading="Plug in your team's reality."
                intro="Every assumption below is shown. Every number is defensible. The report emailed to you walks the working line by line."
              />
            </div>
          </Container>
        </Section>

        {/* Methodology */}
        <Section tone="surface-2" size="md">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
              <div>
                <Eyebrow>How the numbers are built</Eyebrow>
                <h2 className="mt-4 text-balance">
                  No black box. Every assumption named.
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                  CFOs do not sign off on a number they cannot defend. The
                  calculator above uses four constants, all drawn from
                  mid-market Australian finance benchmarks. The email report
                  walks each one with the working and cites the source.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                  Change our assumptions to yours and the totals move. Ordron
                  does the same exercise in the Health Check, only with your
                  actual workflow shadowed for sixty minutes first.
                </p>
              </div>

              <dl className="grid gap-3 sm:grid-cols-2">
                {[
                  {
                    label: "Blended finance rate",
                    value: `${formatAud(ASSUMPTIONS.blendedRate)}/hr`,
                    hint: "AU mid-market, across juniors and seniors.",
                  },
                  {
                    label: "Minutes per manual invoice",
                    value: `${ASSUMPTIONS.minutesPerInvoice} min`,
                    hint: "Capture, code, approve, post, file.",
                  },
                  {
                    label: "Target close",
                    value: `${ASSUMPTIONS.targetCloseDays} days`,
                    hint: "Best-practice mid-market benchmark.",
                  },
                  {
                    label: "Senior time per extra close day",
                    value: `${ASSUMPTIONS.seniorHoursPerExtraCloseDay} hr @ ${formatAud(ASSUMPTIONS.seniorRate)}/hr`,
                    hint: "Controller / CFO drag, not whole-team idle.",
                  },
                  {
                    label: "Error rate",
                    value: `${Math.round(ASSUMPTIONS.errorRate * 100)}% of invoices`,
                    hint: "Requires rework at 30 minutes per error.",
                  },
                  {
                    label: "Typical Ordron project",
                    value: formatAud(ASSUMPTIONS.typicalProjectCost),
                    hint: "Scope is fixed before work begins.",
                  },
                ].map((a) => (
                  <div
                    key={a.label}
                    className="rounded-2xl border border-line bg-surface p-5"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      {a.label}
                    </dt>
                    <dd className="mt-2 font-display text-2xl font-semibold text-ink numeric">
                      {a.value}
                    </dd>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                      {a.hint}
                    </p>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </Section>

        {/* Where it goes from here */}
        <Section tone="surface" size="md">
          <Container width="narrow">
            <div className="max-w-2xl">
              <Eyebrow>What happens after the number</Eyebrow>
              <h2 className="mt-4 text-balance">
                The calculator is the beginning, not the answer.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Ballpark numbers tell you whether to bother. A real answer
                needs sixty minutes with your workflows. The Health Check does
                exactly that, with a written report and a prioritised roadmap
                delivered within 48 hours.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Run the calculator",
                  body: "Get your annual cost and your likely payback period in ninety seconds.",
                },
                {
                  step: "2",
                  title: "Take the 10-question Scorecard",
                  body: "Precise score across four pillars. Band. Top three fixes with business impact.",
                },
                {
                  step: "3",
                  title: "Book a Health Check",
                  body: "Sixty-minute diagnostic, 48-hour report, and a prioritised roadmap you keep.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="rounded-2xl border border-line bg-surface-2 p-6"
                >
                  <p className="font-display text-sm font-semibold text-[color:var(--ordron-blue)] numeric">
                    STEP {s.step}
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold text-ink">
                    {s.title}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                    {s.body}
                  </p>
                </div>
              ))}
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
                  Already know the number is too big to ignore?
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/72">
                  Book a Health Check. Sixty minutes. A written report within
                  48 hours. A prioritised roadmap with ROI projections on the
                  top three automations for your stack. Fixed scope. You keep
                  the report whether you engage Ordron or not.
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
