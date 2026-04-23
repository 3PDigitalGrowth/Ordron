import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { HealthCheckButton } from "@/components/health-check/health-check-button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Finance Automation Roadmap | Ordron",
  description:
    "A 60-minute workflow diagnostic, a written report within 48 hours, and a prioritised automation roadmap for your finance team. Fixed scope. No obligation. You keep the report.",
  alternates: { canonical: "/health-check" },
  openGraph: {
    title: "The Ordron Finance Automation Roadmap",
    description:
      "60 minutes. Written report. Prioritised automation roadmap. No obligation.",
    url: "/health-check",
    type: "website",
  },
};

const steps = [
  {
    number: "01",
    title: "Book",
    duration: "2 min",
    detail:
      "Short form captures your tech stack, team size and the finance workflow chewing the most hours. We confirm a time within one business day.",
  },
  {
    number: "02",
    title: "Discover",
    duration: "60 min",
    detail:
      "One video call. We map your current finance workflows end to end, surface the manual bottlenecks and assess automation readiness across your stack.",
  },
  {
    number: "03",
    title: "Deliver",
    duration: "48 hrs",
    detail:
      "A branded PDF report lands in your inbox within two business days. Prioritised roadmap, ROI projections on the top three opportunities, recommended next step.",
  },
  {
    number: "04",
    title: "Decide",
    duration: "30 min",
    detail:
      "Follow-up call to walk you through the findings and answer questions. You keep the report and act on it however you choose.",
  },
];

const deliverables = [
  {
    title: "Current workflow map",
    body: "Your AP, AR, reconciliation and reporting processes laid out step by step, with the manual bottlenecks flagged against where the hours actually go.",
  },
  {
    title: "Platform-specific automations",
    body: "Named automations drawn from our 130-framework library, matched to the platforms you already run (Xero, MYOB, NetSuite, Dext, and ten more).",
  },
  {
    title: "Time and cost savings per automation",
    body: "Conservative hour ranges and dollar figures for each opportunity. No waffle, no theoretical ROI, just what it is worth to your P&L this year.",
  },
  {
    title: "Prioritised implementation roadmap",
    body: "Quick wins first. Each automation ordered by payback period so you can see what to ship in week one, month one and quarter one.",
  },
  {
    title: "ROI projection for the top three",
    body: "Detailed projection for the three highest-value opportunities. Assumptions shown in full so your team can pressure-test the numbers.",
  },
  {
    title: "Recommended next step",
    body: "Indicative scope and pricing if you want Ordron to build any of it. If you do not, the report still stands on its own as a working roadmap.",
  },
];

const forYou = [
  "Your finance team is spending 15+ hours a week on manual invoice, bill or reconciliation work",
  "Month-end close takes longer than five working days and errors creep in when you rush it",
  "You run a known platform (Xero, MYOB, QuickBooks, NetSuite, SAP, Dynamics) or an older system that needs to keep working",
  "Your revenue sits between $10M and $50M and your headcount is outgrowing the processes that got you here",
  "You are weighing up hiring another finance person versus automating the work they would be doing",
];

const notForYou = [
  "You are looking for ChatGPT prompts, DIY tutorials or a Xero plug-in you could install yourself",
  "You want to replace your finance team rather than give them back their week",
  "You need enterprise-scale RPA with a six-figure implementation budget",
  "You want a sales pitch that skips the diagnostic",
];

const triggers = [
  {
    title: "A finance staff member just resigned",
    body: "Before you backfill, find out which of their hours a system could absorb.",
  },
  {
    title: "An audit flagged controls or timing issues",
    body: "Automation closes gaps and produces the audit trail the auditor wanted in the first place.",
  },
  {
    title: "Revenue has jumped faster than headcount can keep up",
    body: "Scale the ledger without scaling the team. Automation buys you the next 12 months.",
  },
  {
    title: "A platform upgrade is on the table",
    body: "Before you switch systems, map what is actually broken. Sometimes it is the process, not the platform.",
  },
];

const faqs = [
  {
    q: "How much does the Automation Roadmap cost?",
    a: "Commercials for the Automation Roadmap are settled in the booking conversation, not on this page. The session has a fixed scope, there is no obligation to engage Ordron afterwards, and you keep the written report whether or not you go on to build anything with us.",
  },
  {
    q: "Is this a sales call with a certificate at the end?",
    a: "No. The report stands on its own. About half our Automation Roadmap clients go on to a paid project, and half use the report to either do the work internally or with another provider. We would rather you have a roadmap you trust than a vendor you do not.",
  },
  {
    q: "What does the 60-minute call actually cover?",
    a: "Your top three finance workflows in detail. Who does what, in which system, in what order, and where the time goes. We also walk your current tech stack and any prior automation attempts. It is a diagnostic, not a demo.",
  },
  {
    q: "Who should be on the call?",
    a: "Whoever runs the work and whoever signs off. Usually that is a CFO or Financial Controller plus a hands-on AP or AR lead. Two to three people is ideal. Any more and the conversation slows.",
  },
  {
    q: "How long until we see results if we proceed?",
    a: "Quick-win automations typically ship in two to four weeks. Larger pieces (custom dashboards, database builds, cross-platform workflows) run four to twelve weeks. The report tells you which bucket each opportunity falls into before you commit.",
  },
  {
    q: "What if we are already using some automation?",
    a: "Most finance teams at your size have a mix of working automations and half-finished ones. The Automation Roadmap is especially useful here; we map what you already have, surface what is duplicated or under-used, and only recommend new builds where the ROI is obvious.",
  },
  {
    q: "Do you share our data or add us to a list?",
    a: "No. The booking form captures the information needed to prepare for your call. It is not sold, shared, or used to enrol you in a nurture sequence without your consent.",
  },
];

export default function HealthCheckPage() {
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
                "radial-gradient(at 50% 20%, rgba(0,171,255,0.14), transparent 65%)",
            }}
          />
          <Container className="relative">
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>Finance Automation Roadmap</Eyebrow>
              <h1 className="mt-5 text-balance">
                Book your automation roadmap
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                One 60-minute workflow diagnostic. A written report within 48
                hours. A prioritised automation roadmap with ROI projections
                on the top three opportunities. You keep the report whether
                you engage Ordron or not.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <HealthCheckButton
                  variant="primary"
                  size="lg"
                  source="health-check-hero"
                >
                  Book your Roadmap
                </HealthCheckButton>
                <Button
                  href={siteConfig.ctas.scorecard.href}
                  variant="ghost"
                  size="lg"
                >
                  Find your automation quick wins first
                </Button>
              </div>
              <p className="mt-5 text-xs text-ink-muted">
                60 minutes. Written report. Yours to keep.
              </p>
            </div>

            <dl className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { v: "60 min", l: "Diagnostic call" },
                { v: "48 hrs", l: "Report turnaround" },
                { v: "130", l: "Framework library" },
                { v: "13", l: "Platforms covered" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl border border-line bg-surface p-5 text-center"
                >
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    {s.l}
                  </dt>
                  <dd className="mt-2 font-display text-2xl font-semibold text-ink numeric sm:text-3xl">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </Section>

        {/* What it is */}
        <Section tone="surface-2" size="md">
          <Container>
            <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-start lg:gap-20">
              <div>
                <Eyebrow>What the Automation Roadmap is</Eyebrow>
                <h2 className="mt-4 text-balance">
                  A diagnostic you would pay a consultant to run, packaged as
                  one session.
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                  The Automation Roadmap exists because most finance teams
                  know something is slowing them down, but cannot quantify it
                  precisely enough to act. The goal of the session is to
                  leave you with a document specific enough to take to your
                  exec team, your board, or another provider, and act on.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                  It is not a sales call with a report stapled to the end. It
                  is a working diagnostic that stands on its own. About half
                  our Automation Roadmap participants go on to a paid
                  engagement with Ordron. Half do not. Both are fine outcomes
                  for us.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    "Fixed scope",
                    "One session, one report",
                    "No obligation to proceed",
                    "You keep the report",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        className="shrink-0 text-[color:var(--ordron-teal)]"
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
                      <span className="text-[14.5px] font-semibold text-ink">
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="rounded-[28px] border border-line bg-surface p-8 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  What you walk away with
                </p>
                <h3 className="mt-2 text-xl">The Automation Roadmap report</h3>
                <ul className="mt-5 space-y-4">
                  {deliverables.slice(0, 4).map((d) => (
                    <li key={d.title} className="flex items-start gap-3">
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
                      <div>
                        <p className="font-display text-[15px] font-semibold text-ink">
                          {d.title}
                        </p>
                        <p className="mt-1 text-[14px] leading-relaxed text-ink-soft">
                          {d.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 border-t border-line-soft pt-6">
                  <HealthCheckButton
                    variant="primary"
                    size="md"
                    source="health-check-what-is"
                    className="w-full"
                  >
                    Book your Roadmap
                  </HealthCheckButton>
                  <p className="mt-3 text-center text-xs text-ink-muted">
                    60 minutes. Written report. Yours to keep.
                  </p>
                </div>
              </aside>
            </div>
          </Container>
        </Section>

        {/* The full deliverable */}
        <Section tone="surface" size="md">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>The report in full</Eyebrow>
              <h2 className="mt-4 text-balance">
                Six sections. Written in plain English. Numbers you can defend.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Every Automation Roadmap report follows the same structure
                so it is straightforward to read, share internally and
                action. No boilerplate, no vendor fluff; just the parts of
                your finance operation where automation has a measurable
                payback.
              </p>
            </div>

            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {deliverables.map((d, i) => (
                <li
                  key={d.title}
                  className="rounded-2xl border border-line bg-surface-2 p-6"
                >
                  <p className="font-display text-xs font-semibold tracking-[0.14em] text-brand-deep numeric">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-lg text-ink">{d.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                    {d.body}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        {/* 4-step process */}
        <Section tone="mint" size="md" className="text-ink">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/40 blur-3xl"
          />
          <Container className="relative">
            <div className="max-w-2xl">
              <Eyebrow>How it runs</Eyebrow>
              <h2 className="mt-4 text-balance">
                Four steps. Roughly a fortnight start to finish.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                From the time you submit the booking form to the follow-up
                call, an Automation Roadmap takes around 10 to 14 working
                days. Most of that window is Ordron writing the report. Your
                time commitment is the 60-minute diagnostic plus a 30-minute
                follow-up if you want one.
              </p>
            </div>

            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <li
                  key={s.number}
                  className="rounded-2xl bg-white/80 p-6 shadow-soft backdrop-blur"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink font-display text-sm font-semibold text-white">
                      {s.number}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ordron-teal)]">
                      {s.duration}
                    </span>
                  </div>
                  <p className="mt-5 font-display text-lg font-semibold text-ink">
                    {s.title}
                  </p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                    {s.detail}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        {/* Who it's for */}
        <Section tone="surface" size="md">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>Who the Automation Roadmap is for</Eyebrow>
              <h2 className="mt-4 text-balance">
                Built for the finance leader who already knows manual work is
                costing them, but wants the specifics.
              </h2>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <div className="rounded-[28px] border border-line bg-surface-2 p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--ordron-mint)] text-[color:var(--ordron-teal)]">
                    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden>
                      <path
                        d="m3.5 9.5 3.5 3.5 8-8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                  <h3 className="text-ink">You should book if</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {forYou.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-soft"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--ordron-blue)]"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[28px] border border-line bg-surface-2 p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-3 text-ink-muted">
                    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                      <path
                        d="m3 3 8 8M11 3l-8 8"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <h3 className="text-ink">The Automation Roadmap is not for you if</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {notForYou.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-soft"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-faint"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[14px] leading-relaxed text-ink-muted">
                  If any of these sound like you, the{" "}
                  <Link
                    href={siteConfig.ctas.scorecard.href}
                    className="font-semibold text-[color:var(--ordron-blue-deep)] underline-offset-2 hover:underline"
                  >
                    5-minute automation diagnostic
                  </Link>{" "}
                  is probably the better starting point.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* Trigger events */}
        <Section tone="surface-2" size="md">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>When finance leaders book</Eyebrow>
              <h2 className="mt-4 text-balance">
                Four moments when an Automation Roadmap tends to land best.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                You do not need a trigger to book an Automation Roadmap, but
                these are the four that tend to drive the highest-value
                engagements. Each one has a built-in deadline the automation
                work slots into.
              </p>
            </div>

            <ul className="mt-12 grid gap-4 sm:grid-cols-2">
              {triggers.map((t) => (
                <li
                  key={t.title}
                  className="rounded-2xl border border-line bg-surface p-6"
                >
                  <h3 className="text-ink">{t.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                    {t.body}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        {/* FAQ */}
        <Section tone="surface" size="md">
          <Container width="narrow">
            <div className="max-w-2xl">
              <Eyebrow>Questions finance leaders ask</Eyebrow>
              <h2 className="mt-4 text-balance">
                The honest answers to what you are about to ask anyway.
              </h2>
            </div>

            <ul className="mt-12 divide-y divide-line rounded-[28px] border border-line bg-surface">
              {faqs.map((f, i) => (
                <li key={f.q}>
                  <details className="group p-6 sm:p-8" open={i === 0}>
                    <summary className="flex cursor-pointer items-start justify-between gap-6 font-display text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                      <span>{f.q}</span>
                      <span
                        aria-hidden
                        className="mt-1 shrink-0 text-ink-muted transition-transform group-open:rotate-45"
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18">
                          <path
                            d="M9 3v12M3 9h12"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                      {f.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
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
                  Ready to see where the hours are actually going?
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/72">
                  Book one 60-minute session. Get a written roadmap back within
                  two business days. Act on it however you want. If the
                  automation diagnostic is a better fit first, start there and
                  come back once you have a score you want explained.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:gap-4">
                <HealthCheckButton
                  variant="primary"
                  size="lg"
                  source="health-check-closing"
                >
                  Book your Roadmap
                </HealthCheckButton>
                <Button
                  href={siteConfig.ctas.scorecard.href}
                  variant="inverse"
                  size="lg"
                >
                  Find your automation quick wins
                </Button>
              </div>
            </div>
            <p className="mt-10 text-sm text-white/60">
              60 minutes. Written report. Yours to keep. Fixed scope, no
              obligation to proceed.
            </p>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
