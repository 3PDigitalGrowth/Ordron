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
import { LeadMagnetCard } from "@/components/lead-magnets/lead-magnet-card";
import { LeadMagnetRibbon } from "@/components/lead-magnets/lead-magnet-ribbon";
import { AuStackDiagram } from "@/components/art/au-stack-diagram";
import { FourPillarsDiagram } from "@/components/art/four-pillars-diagram";
import { platformGroups, platforms } from "@/lib/platforms";
import {
  caseStudies,
  caseStudyAggregates,
  getCaseStudyBySlug,
} from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";

const PAGE_URL = "/finance-automation-australia";
const PAGE_SOURCE = "finance-automation-australia";

export const metadata: Metadata = {
  title:
    "Finance automation in Australia: the mid-market playbook",
  description:
    "The definitive reference for finance automation at Australian mid-market businesses. Four pillars, 13 platforms, 130 named automations, AU compliance built in. From Ordron, Sydney.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Finance automation in Australia: the mid-market playbook",
    description:
      "The state of finance automation in the AU mid-market. Pillars, platforms, playbooks, and what it costs to keep doing it by hand.",
    url: PAGE_URL,
    type: "article",
  },
};

const TOC: { id: string; label: string }[] = [
  { id: "state-of-play", label: "The state of play" },
  { id: "four-pillars", label: "The four pillars" },
  { id: "platform-stack", label: "The AU platform stack" },
  { id: "cost-of-inaction", label: "Cost of inaction" },
  { id: "automation-ladder", label: "The automation ladder" },
  { id: "au-compliance", label: "AU compliance" },
  { id: "evidence", label: "Evidence" },
  { id: "where-to-start", label: "Where to start" },
  { id: "faq", label: "FAQ" },
];

type Pillar = {
  slug: string;
  title: string;
  summary: string;
  inScope: string[];
  timeSaved: string;
  guideHref: string;
  platformSlugsToRecommend: string[];
};

const PILLARS: Pillar[] = [
  {
    slug: "ap",
    title: "Accounts payable",
    summary:
      "Supplier invoice capture through to three-way match and scheduled payment runs. The most common entry point into finance automation for AU mid-market teams.",
    inScope: [
      "OCR capture from Dext, Hubdoc, or a monitored shared inbox",
      "PO matching, GL coding, and approval routing",
      "Exception queues with sensible human-in-the-loop defaults",
      "Bank payment file generation and reconciliation back to the ledger",
    ],
    timeSaved: "10 to 28 hrs / week",
    guideHref: "/guides/accounts-payable-automation",
    platformSlugsToRecommend: [
      "xero-automation",
      "myob-automation",
      "netsuite-automation",
    ],
  },
  {
    slug: "ar",
    title: "Accounts receivable",
    summary:
      "Invoice out, collect, reconcile. The slow cash-conversion cycle that most AU finance teams fix second, and regret not fixing first.",
    inScope: [
      "Automated invoice generation from billing data or milestones",
      "Remittance matching with tolerant bank-feed reconciliation",
      "Dunning ladders and payment reminders by segment",
      "Customer statement runs and disputed-item routing",
    ],
    timeSaved: "6 to 18 hrs / week",
    guideHref: "/guides/accounts-receivable-automation",
    platformSlugsToRecommend: [
      "xero-automation",
      "myob-automation",
      "quickbooks-automation",
    ],
  },
  {
    slug: "recs",
    title: "Reconciliations",
    summary:
      "Bank, intercompany, clearing accounts, and sub-ledger to GL. The quiet tax on every close, usually paid by your most expensive people.",
    inScope: [
      "Bank feed ingestion across ANZ, CBA, NAB, Westpac and portals",
      "Rule-based matching with escalations, not silent overrides",
      "Intercompany and clearing account sweeps on schedule",
      "Variance reports that show work to do, not work done",
    ],
    timeSaved: "8 to 20 hrs / week",
    guideHref: "/guides/reconciliations-automation",
    platformSlugsToRecommend: [
      "bank-automation",
      "excel-automation",
      "netsuite-automation",
    ],
  },
  {
    slug: "close",
    title: "Reporting and close",
    summary:
      "From period end to signed-off CFO pack. The pillar that compounds the other three: if capture, AR and recs are automated, close collapses from ten days to two.",
    inScope: [
      "Close calendar, readiness checks, and reconciliation sign-off",
      "Journal automation for accruals, prepayments, and depreciation",
      "Variance commentary triggers and first-draft narrative",
      "Board-ready Power BI packs pulled directly from the ledger",
    ],
    timeSaved: "3 to 8 days / month",
    guideHref: "/guides/month-end-close-automation",
    platformSlugsToRecommend: [
      "power-bi-automation",
      "excel-automation",
      "netsuite-automation",
    ],
  },
];

const LADDER_RUNGS = [
  {
    label: "Level 0",
    name: "Manual",
    body: "Every keystroke is a human one. Double-data-entry between systems. Month-end takes eight working days or more.",
    tone: "neutral" as const,
  },
  {
    label: "Level 1",
    name: "Assisted",
    body: "OCR and bank feeds lift capture. Humans still code, approve, route exceptions, and reconcile by hand. The common starting point in AU.",
    tone: "neutral" as const,
  },
  {
    label: "Level 2",
    name: "Partial",
    body: "Named automations for AP capture, approvals, and high-volume recs. Humans handle exceptions only. Close drops to five to six days.",
    tone: "brand" as const,
  },
  {
    label: "Level 3",
    name: "Orchestrated",
    body: "Every pillar runs on an automated path. A database of record sits behind the ledger. Close lands in two days with exception-only oversight.",
    tone: "teal" as const,
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Do I need to change platforms to automate finance?",
    a: "No. Ordron's default posture is to automate against the platform you already run. Xero, MYOB, NetSuite, Business Central, SAP and others all expose the integration points we need. A platform change is a separate decision, driven by business fit, not by what can be automated.",
  },
  {
    q: "How long does a first automation project take?",
    a: "Most AP or AR builds go from kick-off to go-live in four to eight weeks. The Health Check precedes that with sixty minutes of shadowing and a written roadmap delivered within 48 hours. Fixed scope from the outset.",
  },
  {
    q: "What about BAS, GST, PAYG and STP?",
    a: "Every automation Ordron ships is built around AU tax codes, GST handling, and BAS-period awareness. Single Touch Payroll flows are respected where payroll sits adjacent. We do not break compliance to gain speed.",
  },
  {
    q: "Is my data safe?",
    a: "Every engagement writes to a Ordron-managed Azure database in Australia, with client-owned tenancy, role-based access, and full audit trail. Nothing is exfiltrated to third-party AI services without named consent. Ordron operates under the Australian Privacy Principles.",
  },
  {
    q: "How do I know if I am ready for automation?",
    a: "Download the Readiness Checklist. Fifteen yes/no statements. If you answer yes to fewer than ten, the Health Check will tell you what to fix first. No point automating a broken process.",
  },
  {
    q: "What does a typical project cost?",
    a: "Most first projects sit around $42,000 fixed scope. Payback lands inside 16 weeks for the mid-market businesses we work with. Full numbers are shown inside the Cost of Inaction Calculator below, and every figure is defensible line by line.",
  },
];

export default function FinanceAutomationAustraliaPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {/* --------------------------------------------------------- Hero */}
        <Section tone="surface" size="md" className="pt-10 sm:pt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-32 h-[520px] opacity-[0.45]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(0,171,255,0.14), transparent 60%)",
            }}
          />
          <Container width="wide" className="relative">
            <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-20">
              <div>
                <Eyebrow>Pillar guide</Eyebrow>
                <h1 className="mt-5 text-balance">
                  Finance automation in Australia, written for the people
                  actually running close.
                </h1>
                <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-ink-soft">
                  A reference for CFOs, finance directors and heads of
                  finance at $10M to $50M AU businesses. Four pillars, 13
                  platforms, 130 named automations, and what it actually
                  costs to keep doing it by hand. No hype, no unbranded
                  vendor talk, no imported US benchmarks.
                </p>

                <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center">
                  <Button
                    href={siteConfig.ctas.scorecard.href}
                    variant="primary"
                    size="lg"
                  >
                    Take the 5-minute Scorecard
                  </Button>
                  <Button
                    href={siteConfig.ctas.healthCheck.href}
                    variant="ghost"
                    size="lg"
                  >
                    Book a Health Check
                  </Button>
                </div>

                <p className="mt-5 text-sm text-ink-muted">
                  Both free to start. Scorecard is instant. Health Check is
                  sixty minutes, fixed scope, you keep the report.
                </p>

                <dl className="mt-10 grid max-w-md grid-cols-3 gap-3">
                  {[
                    { v: "13", l: "Platforms" },
                    { v: "130", l: "Automations" },
                    { v: "$42k", l: "Typical project" },
                  ].map((s) => (
                    <div
                      key={s.l}
                      className="rounded-2xl border border-line bg-surface p-4 text-center"
                    >
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                        {s.l}
                      </dt>
                      <dd className="mt-1.5 font-display text-2xl font-semibold text-ink numeric">
                        {s.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="relative">
                <AuStackDiagram />
              </div>
            </div>
          </Container>
        </Section>

        {/* --------------------------------------------------------- TOC */}
        <Section tone="surface-2" size="sm" className="border-y border-line">
          <Container>
            <nav
              aria-label="On this page"
              className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                On this page
              </p>
              <ul className="flex flex-wrap gap-2">
                {TOC.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-[color:var(--ordron-blue)]/30 hover:text-ink"
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </Section>

        {/* --------------------------------------------------------- State of play */}
        <Section
          tone="surface"
          size="md"
          id="state-of-play"
          className="scroll-mt-24"
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
              <div>
                <Eyebrow>The state of play</Eyebrow>
                <h2 className="mt-4 text-balance">
                  The AU mid-market is still paying for manual finance, and
                  paying a lot.
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                  Finance teams at Australian businesses between $10M and
                  $50M in revenue run lean. Most sit at three to twelve
                  finance FTEs. Most close between seven and twelve
                  working days. Most process between 100 and 800 supplier
                  invoices per week through some combination of Xero or
                  MYOB, a capture tool, and a spreadsheet.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                  The arithmetic rarely flatters them. Eight minutes per
                  manual invoice, a blended rate of $80 an hour, and a
                  10% error rate compounds into six-figure annual waste
                  for a five-person team. The{" "}
                  <Link
                    href="/cost-of-inaction"
                    className="font-semibold text-[color:var(--ordron-blue-deep)] underline decoration-[color:var(--ordron-blue)]/40 underline-offset-2 hover:decoration-[color:var(--ordron-blue)]"
                  >
                    Cost of Inaction Calculator
                  </Link>{" "}
                  shows the number for your team in ninety seconds.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                  The reason the waste persists is not a lack of tooling.
                  It is that automation projects in AU mid-market are
                  usually sold by consultants who bill against the stack
                  rather than practitioners who have built on it. The
                  work gets bought, the platform gets paid for, and the
                  month-end still takes ten days.
                </p>
              </div>

              <dl className="grid gap-3 sm:grid-cols-2 sm:self-start">
                {[
                  {
                    v: "$104k",
                    l: "Average annual manual-finance cost",
                    hint: "5 FTE team, 400 weekly invoices, 10-day close.",
                  },
                  {
                    v: "10 days",
                    l: "Median AU mid-market close",
                    hint: "Versus a 2-day best-practice benchmark.",
                  },
                  {
                    v: "68%",
                    l: "of invoices still require human coding",
                    hint: "Across teams running OCR without orchestration.",
                  },
                  {
                    v: "< 15%",
                    l: "of AU finance teams measure their own cycle times",
                    hint: "The rest run on instinct. Yours probably runs on instinct.",
                  },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-2xl border border-line bg-surface-2 p-5"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      {s.l}
                    </dt>
                    <dd className="mt-2 font-display text-3xl font-semibold text-ink numeric">
                      {s.v}
                    </dd>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                      {s.hint}
                    </p>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </Section>

        {/* --------------------------------------------------------- Four pillars */}
        <Section
          tone="surface-2"
          size="md"
          id="four-pillars"
          className="scroll-mt-24"
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <div>
                <Eyebrow>The four pillars</Eyebrow>
                <h2 className="mt-4 text-balance">
                  Four pillars. One close. A ledger you can defend in an
                  audit.
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                  Every finance automation project Ordron has shipped
                  lives inside one of the four pillars below. Tackle any
                  one and the others get easier. Tackle all four and
                  month-end stops being an event.
                </p>
                <div className="mt-8">
                  <FourPillarsDiagram />
                </div>
              </div>

              <ul className="grid gap-4">
                {PILLARS.map((p) => (
                  <li
                    key={p.slug}
                    id={`pillar-${p.slug}`}
                    className="scroll-mt-24 rounded-3xl border border-line bg-surface p-7 shadow-soft"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-xl font-semibold text-ink">
                        {p.title}
                      </h3>
                      <Badge tone="amber">{p.timeSaved}</Badge>
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                      {p.summary}
                    </p>

                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {p.inScope.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-[14px] leading-relaxed text-ink-soft"
                        >
                          <span
                            aria-hidden
                            className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--ordron-blue)]"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-5 text-[13px]">
                      <Link
                        href={p.guideHref}
                        className="font-semibold text-[color:var(--ordron-blue-deep)] hover:underline"
                      >
                        Read the {p.title.toLowerCase()} guide →
                      </Link>
                      <span className="text-ink-muted">
                        Best on:{" "}
                        {p.platformSlugsToRecommend.map((slug, i) => {
                          const plat = platforms.find((x) => x.slug === slug);
                          if (!plat) return null;
                          return (
                            <span key={slug}>
                              <Link
                                href={`/platforms/${slug}`}
                                className="font-semibold text-ink-soft hover:text-ink hover:underline"
                              >
                                {plat.shortLabel}
                              </Link>
                              {i <
                                p.platformSlugsToRecommend.length - 1 && ", "}
                            </span>
                          );
                        })}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        {/* --------------------------------------------------------- AU platform stack */}
        <Section
          tone="surface"
          size="md"
          id="platform-stack"
          className="scroll-mt-24"
        >
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>The AU platform stack</Eyebrow>
              <h2 className="mt-4 text-balance">
                Thirteen platforms cover most AU mid-market finance work.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Ordron has built 130 named automations across the
                platforms below. They are not the only tools worth
                automating, but together they account for most of the
                finance stack you are likely running. Each group opens a
                platform hub with the specific workflows shipped on it.
              </p>
            </div>

            <div className="mt-12 space-y-10">
              {platformGroups
                .filter((g) => g.platforms.length > 0)
                .map((group) => (
                  <section
                    key={group.id}
                    aria-labelledby={`stack-${group.id}`}
                  >
                    <div className="grid gap-5 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-12">
                      <div>
                        <h3
                          id={`stack-${group.id}`}
                          className="font-display text-lg font-semibold text-ink"
                        >
                          {group.heading}
                        </h3>
                        <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                          {group.summary}
                        </p>
                      </div>

                      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {group.platforms.map((p) => (
                          <li key={p.slug}>
                            <Link
                              href={`/platforms/${p.slug}`}
                              className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-line bg-surface-2 p-4 transition-all hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:bg-surface hover:shadow-soft"
                            >
                              <div className="min-w-0">
                                <p className="font-display text-base font-semibold tracking-tight text-ink">
                                  {p.name}
                                </p>
                                <p className="mt-0.5 truncate text-xs text-ink-muted">
                                  {p.detail}
                                </p>
                              </div>
                              <span
                                aria-hidden
                                className="text-ink-faint transition-colors group-hover:text-[color:var(--ordron-blue)]"
                              >
                                →
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-line bg-surface-2 p-5 text-sm">
              <span className="font-semibold text-ink">
                Running something not listed?
              </span>
              <span className="text-ink-soft">
                If it has an API or a structured interface, we can usually
                automate against it. HubSpot, Salesforce, Jira, Monday,
                legacy ERPs. Ask.
              </span>
              <Link
                href="/platforms"
                className="ml-auto font-semibold text-[color:var(--ordron-blue-deep)] hover:underline"
              >
                See every platform →
              </Link>
            </div>
          </Container>
        </Section>

        {/* --------------------------------------------------------- Primary lead magnet: 13x130 */}
        <Section tone="surface-2" size="md">
          <Container>
            <LeadMagnetCard
              id="platforms-13x130"
              source={PAGE_SOURCE}
              headingOverride="The Ordron catalogue: 130 named automations, indexed by platform and function."
            />
          </Container>
        </Section>

        {/* --------------------------------------------------------- Cost of inaction */}
        <Section
          tone="surface"
          size="md"
          id="cost-of-inaction"
          className="scroll-mt-24"
        >
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <Eyebrow>Cost of inaction</Eyebrow>
              <h2 className="mt-4 text-balance">
                A defensible number, before any sales conversation.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Four inputs. Your annual cost of manual finance. Likely
                payback period on a $42,000 automation project. The top
                three automations for your platform. Every assumption is
                shown. The written breakdown lands in your inbox on
                request.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-6xl">
              <CostOfInactionCalculator
                variant="hero"
                source={PAGE_SOURCE}
                eyebrow="Run your numbers"
                heading="What manual finance is costing your team this year."
                intro="The headline updates as you move the sliders. Email unlocks the line-by-line breakdown and the platform-specific roadmap."
              />
            </div>

            <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-ink-muted">
              Want to go further?{" "}
              <Link
                href="/cost-of-inaction"
                className="font-semibold text-[color:var(--ordron-blue-deep)] hover:underline"
              >
                Read the calculator methodology →
              </Link>
            </p>
          </Container>
        </Section>

        {/* --------------------------------------------------------- Automation ladder */}
        <Section
          tone="surface-2"
          size="md"
          id="automation-ladder"
          className="scroll-mt-24"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <div>
                <Eyebrow>The automation ladder</Eyebrow>
                <h2 className="mt-4 text-balance">
                  Four rungs. Most AU teams stop at rung one and call it
                  automation.
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                  Finance automation is not a binary. It is a ladder, and
                  the rungs are clearly separated. The rung you are on
                  dictates what is possible, what it costs, and how long
                  your month-end takes.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                  Scorecard bands map to these rungs directly.{" "}
                  <Link
                    href={siteConfig.ctas.scorecard.href}
                    className="font-semibold text-[color:var(--ordron-blue-deep)] underline decoration-[color:var(--ordron-blue)]/40 underline-offset-2 hover:decoration-[color:var(--ordron-blue)]"
                  >
                    Take the Scorecard
                  </Link>{" "}
                  to see which one applies to your team right now.
                </p>
              </div>

              <ol className="grid gap-3">
                {LADDER_RUNGS.map((r) => (
                  <li
                    key={r.label}
                    className="relative rounded-2xl border border-line bg-surface p-6"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted numeric">
                        {r.label}
                      </p>
                      <Badge tone={r.tone}>{r.name}</Badge>
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                      {r.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </Section>

        {/* --------------------------------------------------------- AU compliance */}
        <Section
          tone="surface"
          size="md"
          id="au-compliance"
          className="scroll-mt-24"
        >
          <Container width="narrow">
            <div className="max-w-2xl">
              <Eyebrow>AU compliance, not optional</Eyebrow>
              <h2 className="mt-4 text-balance">
                Everything we ship respects the rules Australian finance
                teams actually work under.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                We do not treat BAS, STP, Privacy Act obligations or data
                residency as an afterthought. If an automation cannot run
                cleanly inside these rules, we redesign the workflow
                around them. No exceptions.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {[
                {
                  t: "BAS and GST period awareness",
                  d: "Every automation is GST-aware. BAS cutover logic is baked in so posting does not corrupt lodged periods. If a vendor is not GST-registered, we do not synthesise a credit.",
                },
                {
                  t: "Single Touch Payroll friendly",
                  d: "Where payroll sits adjacent to the automated workflow, we respect STP Phase 2 reporting cadences and do not bypass the payroll event.",
                },
                {
                  t: "Australian data residency",
                  d: "Every engagement runs on an Australian Azure tenancy. Client-owned database, role-based access, and audit trail from day one. Nothing is silently mirrored offshore.",
                },
                {
                  t: "Privacy Act aligned",
                  d: "We operate under the Australian Privacy Principles. Personal information flows are documented, minimised, and never routed through third-party AI services without named consent.",
                },
                {
                  t: "Audit trail, not a black box",
                  d: "Every posting made by an automation is logged, attributable to a run, and reversible. Your external auditor sees the same trail you do.",
                },
                {
                  t: "Human-in-the-loop by default",
                  d: "No automation posts to your ledger without a defined exception path. Automation does not mean unsupervised, and we do not ask you to trust us on that. The controls are visible.",
                },
              ].map((b) => (
                <div
                  key={b.t}
                  className="rounded-2xl border border-line bg-surface-2 p-6"
                >
                  <p className="font-display text-base font-semibold text-ink">
                    {b.t}
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                    {b.d}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* --------------------------------------------------------- Evidence */}
        <Section
          tone="surface-2"
          size="md"
          id="evidence"
          className="scroll-mt-24"
        >
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>Evidence</Eyebrow>
              <h2 className="mt-4 text-balance">
                The playbook above, run on real AU finance teams.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                {caseStudyAggregates.totalCaseStudies} published case
                studies across {caseStudyAggregates.industriesCovered}{" "}
                industries. Numbers measured after go-live, not modelled.
                Client names withheld by default, references on request.
              </p>
            </div>

            <ul className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "logistics-ap-ocr",
                "freight-xero-ar",
                "manufacturing-invoice-hub",
                "enterprise-ap-idu",
                "logistics-legacy-erp-rpa",
                "advisory-excel-to-enterprise",
              ]
                .map((slug) => getCaseStudyBySlug(slug))
                .filter((c): c is NonNullable<typeof c> => Boolean(c))
                .map((c) => (
                  <li key={c.slug} className="h-full">
                    <Link
                      href={`/case-studies/${c.slug}`}
                      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:shadow-soft"
                    >
                      <Badge tone="brand">{c.industry}</Badge>
                      <p className="mt-5 font-display text-lg font-semibold leading-tight text-ink">
                        {c.cardTitle}
                      </p>
                      <p className="mt-3 font-display text-base font-semibold leading-snug text-[color:var(--ordron-blue-deep)]">
                        {c.headlineStat}
                      </p>
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

            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link
                href="/case-studies"
                className="font-semibold text-[color:var(--ordron-blue-deep)] hover:underline"
              >
                Browse all {caseStudies.length} case studies →
              </Link>
              <span className="text-ink-muted">
                or{" "}
                <Link
                  href="/platforms"
                  className="font-semibold text-ink-soft hover:text-ink hover:underline"
                >
                  browse by platform
                </Link>
              </span>
            </div>
          </Container>
        </Section>

        {/* --------------------------------------------------------- Where to start */}
        <Section
          tone="surface"
          size="md"
          id="where-to-start"
          className="scroll-mt-24"
        >
          <Container width="narrow">
            <div className="max-w-2xl">
              <Eyebrow>Where to start</Eyebrow>
              <h2 className="mt-4 text-balance">
                A sensible path in, whether you are ready or just looking.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                No one should buy automation from a pillar page. The path
                below exists so the next step always beats the current
                one, without committing you to anything you are not ready
                for.
              </p>
            </div>

            <ol className="mt-12 grid gap-5 sm:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Run the Cost of Inaction Calculator",
                  body: "Ninety seconds for a defensible annual number. No email required to see the headline.",
                  href: "/cost-of-inaction",
                  cta: "Open the calculator",
                },
                {
                  step: "2",
                  title: "Take the 5-minute Scorecard",
                  body: "Ten questions. Precise score across four pillars. Your band, and the top three fixes with business impact.",
                  href: siteConfig.ctas.scorecard.href,
                  cta: "Take the Scorecard",
                },
                {
                  step: "3",
                  title: "Book a Health Check",
                  body: "Sixty-minute diagnostic, 48-hour written report, prioritised roadmap. You keep the report.",
                  href: siteConfig.ctas.healthCheck.href,
                  cta: "Book a Health Check",
                },
              ].map((s) => (
                <li
                  key={s.step}
                  className="flex flex-col rounded-2xl border border-line bg-surface-2 p-6"
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
                  <Link
                    href={s.href}
                    className="mt-auto pt-5 text-sm font-semibold text-[color:var(--ordron-blue-deep)] hover:underline"
                  >
                    {s.cta} →
                  </Link>
                </li>
              ))}
            </ol>
          </Container>
        </Section>

        {/* --------------------------------------------------------- FAQ */}
        <Section
          tone="surface-2"
          size="md"
          id="faq"
          className="scroll-mt-24"
        >
          <Container width="narrow">
            <div className="max-w-2xl">
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="mt-4 text-balance">
                The questions AU finance leaders actually ask.
              </h2>
            </div>

            <dl className="mt-10 divide-y divide-line rounded-3xl border border-line bg-surface">
              {FAQS.map((f) => (
                <details
                  key={f.q}
                  className="group px-6 py-5 sm:px-8 sm:py-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <dt className="font-display text-base font-semibold text-ink sm:text-lg">
                      {f.q}
                    </dt>
                    <span
                      aria-hidden
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition-transform group-open:rotate-45"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12">
                        <path
                          d="M6 1v10M1 6h10"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </summary>
                  <dd className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                    {f.a}
                  </dd>
                </details>
              ))}
            </dl>
          </Container>
        </Section>

        {/* --------------------------------------------------------- Readiness checklist ribbon */}
        <Section tone="surface" size="sm">
          <Container>
            <LeadMagnetRibbon
              id="readiness-checklist"
              source={PAGE_SOURCE}
              teaser="Fifteen yes/no statements. If you can answer yes to at least ten, you are ready to automate. If not, the checklist tells you what to fix first."
            />
          </Container>
        </Section>

        {/* --------------------------------------------------------- Closing ink CTA */}
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
                  Finance automation, the AU mid-market way.
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-white/72">
                  No imported US benchmarks. No vendor pretending they
                  built the platform. No ten-page proposal before you
                  have a number. Start with the Scorecard, or go
                  straight to a Health Check if you already know the
                  number is too big to ignore.
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
