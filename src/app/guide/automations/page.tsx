import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { AutomationsMatrix } from "@/components/art/automations-matrix";
import { AutomationExplorer } from "@/components/guide/automation-explorer";
import { LeadMagnetCard } from "@/components/lead-magnets/lead-magnet-card";
import { LeadMagnetRibbon } from "@/components/lead-magnets/lead-magnet-ribbon";
import { CostOfInactionCalculator } from "@/components/calculator/cost-of-inaction";
import {
  automations,
  financeFunctions,
} from "@/lib/automations";
import { platforms } from "@/lib/platforms";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Automation catalogue: 130 finance automations across 13 platforms",
  description:
    "The full catalogue of finance automations Ordron has built across Xero, MYOB, NetSuite, SAP, Dynamics and more. Filter by platform, filter by finance function, or search by keyword.",
  alternates: { canonical: "/guide/automations" },
  openGraph: {
    title: "Ordron automation catalogue",
    description:
      "130 named automations across 13 finance platforms. Search, filter and shortlist before you book a Health Check.",
    url: "/guide/automations",
    type: "website",
  },
};

const howToRead: { title: string; body: string }[] = [
  {
    title: "What an automation means here",
    body: "A named, repeatable workflow Ordron has built on a real platform, with measurable hours returned and a clear owner. Not a pilot, not a demo.",
  },
  {
    title: "How hours returned is measured",
    body: "Bands are drawn from Ordron engagements after go-live. They are hours returned per week to the finance team, not projected savings from a vendor deck.",
  },
  {
    title: "Where pre-requisites get called out",
    body: "Some workflows need clean supplier master data or a defined chart of accounts before they are worth starting. Those are flagged honestly in the Health Check, not buried in a footnote.",
  },
];

export default function AutomationsHubPage() {
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
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
              <div>
                <Eyebrow>130 automations, 13 platforms</Eyebrow>
                <h1 className="mt-5 text-balance">
                  The full catalogue of finance work we have automated.
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                  Filter by the platform you run. Filter by the job you are
                  trying to finish. Every entry names the hours it returns
                  and the pre-requisites we insist on before we start.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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

              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="rounded-[28px] border border-line bg-surface p-6 shadow-soft sm:p-8">
                  <AutomationsMatrix className="w-full" />
                </div>
              </div>
            </div>

            <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { v: String(automations.length), l: "Named automations" },
                { v: String(platforms.length), l: "Platforms covered" },
                { v: String(financeFunctions.length), l: "Finance functions" },
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

        {/* Explorer */}
        <Section tone="surface-2" size="md">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>Browse the catalogue</Eyebrow>
              <h2 className="mt-4 text-balance">
                Search, filter, and shortlist before you book.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                130 workflows is too many to read in one sitting. Use the
                platform row if you already know your stack. Use the function
                row if you know the pain. Use the search box for anything
                specific you have in mind.
              </p>
            </div>

            <div className="mt-14">
              <AutomationExplorer />
            </div>
          </Container>
        </Section>

        {/* Primary soft magnet */}
        <Section tone="surface" size="md">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Take it with you</Eyebrow>
              <h2 className="mt-4 text-balance">
                The full catalogue as a reference document.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                The same 130 automations, indexed by platform, team size and
                finance function. Hours returned per workflow. Pre-requisites
                called out. Share it with your controller before a Health Check.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-5xl">
              <LeadMagnetCard
                id="platforms-13x130"
                source="guide-automations"
              />
            </div>
          </Container>
        </Section>

        {/* How to read */}
        <Section tone="surface-2" size="md">
          <Container width="narrow">
            <div className="max-w-2xl">
              <Eyebrow>How to read this</Eyebrow>
              <h2 className="mt-4 text-balance">
                Three things the catalogue is not.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                A wishlist. A vendor brochure. A projection. Every line is
                drawn from real engagements, with the numbers the client saw
                after go-live.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {howToRead.map((b, i) => (
                <div
                  key={b.title}
                  className="rounded-2xl border border-line bg-surface p-6"
                >
                  <p className="font-display text-3xl font-semibold text-[color:var(--ordron-blue-deep)] numeric">
                    0{i + 1}
                  </p>
                  <p className="mt-4 font-display text-base font-semibold text-ink">
                    {b.title}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                    {b.body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Cross-links */}
        <Section tone="surface" size="md">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>Other ways in</Eyebrow>
              <h2 className="mt-4 text-balance">
                If the catalogue is not the right shape for your question.
              </h2>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              <CrossLinkCard
                eyebrow="Platform hubs"
                title="Browse by platform."
                body="Thirteen dedicated hubs, one per platform. The ten automations we have built on each, in context."
                href="/platforms"
                cta="Open the platforms hub"
              />
              <CrossLinkCard
                eyebrow="Proof"
                title="See what it looks like shipped."
                body="Twelve anonymised case studies. Real platforms, real industries, measured hours returned and cycle-time cuts."
                href="/case-studies"
                cta="Read the case studies"
              />
              <CrossLinkCard
                eyebrow="Diagnose first"
                title="Score your own stack."
                body="Five minutes, ten questions, a pillar-by-pillar view of where your finance team is losing time today."
                href={siteConfig.ctas.scorecard.href}
                cta="Take the Scorecard"
              />
            </div>
          </Container>
        </Section>

        {/* Cost of inaction */}
        <Section tone="surface-2" size="md">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Put a number on it</Eyebrow>
              <h2 className="mt-4 text-balance">
                What is the shortlist actually worth to you?
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Four inputs. The calculator returns your annual cost of
                manual finance, a likely payback window, and the three
                automations on your stack that move the needle first.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-6xl">
              <CostOfInactionCalculator
                variant="hero"
                source="guide-automations"
                eyebrow="Calculator"
                heading="Your stack, your number."
                intro="Change the platform to see the three named automations shift. Full written breakdown emailed on request."
              />
            </div>
          </Container>
        </Section>

        {/* Secondary soft magnet ribbon */}
        <Section tone="surface" size="sm">
          <Container width="narrow">
            <LeadMagnetRibbon
              id="readiness-checklist"
              source="guide-automations-footer"
              teaser="Before you book anything, answer fifteen yes/no statements about your finance operation. If the answer to ten of them is no, automation is not the first move."
            />
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
                  Shortlist three. We will tell you which one to start with.
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/72">
                  The Scorecard surfaces the biggest drag on your finance team
                  in five minutes. The Health Check goes deeper and gives you
                  a written report with specific automations named, whether
                  you engage Ordron or not.
                </p>
                <p className="mt-4 text-sm text-white/55">
                  {automations.length} automations listed. {platforms.length}{" "}
                  platforms covered. Ask if your stack is not on the list.
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

type CrossLinkProps = {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
};

function CrossLinkCard({ eyebrow, title, body, href, cta }: CrossLinkProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-all hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:shadow-soft"
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h3 className="mt-4 font-display text-xl font-semibold text-ink">
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{body}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-[color:var(--ordron-blue)] group-hover:text-[color:var(--ordron-blue-deep)]">
        {cta}
        <span
          aria-hidden
          className="transition-transform group-hover:translate-x-0.5"
        >
          →
        </span>
      </span>
    </Link>
  );
}
