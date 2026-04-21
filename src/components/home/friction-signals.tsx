import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

type Signal = {
  title: string;
  summary: string;
  markers: string[];
  icon: React.ReactNode;
};

/*
  These four pillars match the scorecard structure (Manual Workload,
  System Disconnects, Errors and Delays, Scalability). The markers
  under each are pulled directly from the scorecard questions so the
  homepage primes visitors for the self-assessment.
*/

const signals: Signal[] = [
  {
    title: "Manual workload",
    summary: "Hours lost to repetitive, rules-based finance work.",
    markers: [
      "10 or more hours per week on data entry and reconciliations",
      "Copy-paste between email, PDFs and the accounting system",
      "Heavy spreadsheet reliance for core reporting",
    ],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" aria-hidden>
        <path
          d="M6 8h16M6 14h10M6 20h13"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "System disconnects",
    summary:
      "Multiple tools that do not speak to each other, forcing double-handling.",
    markers: [
      "5 or more platforms in the finance stack",
      "Exports and re-imports between CRM, billing and ledger",
      "Approvals happening in inboxes, not workflows",
    ],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="20" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
        <circle
          cx="14"
          cy="20"
          r="3.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M10.5 10.5 12.5 17M17.5 10.5l-2 6.5M11.5 8h5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Errors, delays and risk",
    summary:
      "Rework, missed payments, audit exposure and key-person dependencies.",
    markers: [
      "Month-end close running past 8 days",
      "Weekly exceptions creating rework loops",
      "Critical tasks only one team member understands",
    ],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" aria-hidden>
        <path
          d="M14 5 4 23h20L14 5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M14 12v5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="14" cy="20" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Scalability and operational maturity",
    summary:
      "Processes that only work because volume is still manageable and the team is still there.",
    markers: [
      "Volume doubling would require new headcount",
      "Reporting only runs because one person builds it",
      "No documented workflow for AP, AR or close",
    ],
    icon: (
      <svg viewBox="0 0 28 28" fill="none" aria-hidden>
        <path
          d="M5 22h18M7 22V10M13 22V5M19 22v-8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function FrictionSignals() {
  return (
    <Section tone="surface-2" size="md" id="friction-signals">
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-20">
          <div className="max-w-2xl">
            <Eyebrow>Four signals that finance needs automation</Eyebrow>
            <h2 className="mt-4 text-balance">
              If more than one of these is true, the return on automating it is
              almost certainly bigger than the cost.
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-ink-soft lg:text-right">
            The Ordron Scorecard scores each of the four pillars below, so you
            know where the pain is concentrated before we ever get on a call.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {signals.map((s) => (
            <article
              key={s.title}
              className="flex h-full flex-col rounded-[28px] border border-line bg-surface p-7 shadow-soft"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--ordron-blue)]/10 text-brand-deep">
                <span className="h-6 w-6">{s.icon}</span>
              </span>
              <h3 className="mt-5 text-xl">{s.title}</h3>
              <p className="mt-2 text-[15px] text-ink-soft">{s.summary}</p>
              <ul className="mt-5 space-y-2.5 border-t border-line-soft pt-5">
                {s.markers.map((m) => (
                  <li
                    key={m}
                    className="flex items-start gap-3 text-[14.5px] text-ink-soft"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--ordron-blue)]" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[28px] border border-line bg-surface p-7 sm:flex-row sm:p-8">
          <div>
            <p className="font-display text-xl font-semibold text-ink">
              Score yourself across all four pillars in 5 minutes.
            </p>
            <p className="mt-1 text-[15px] text-ink-muted">
              10 questions. Instant score. No sales call required.
            </p>
          </div>
          <Button
            href={siteConfig.ctas.scorecard.href}
            variant="primary"
            size="lg"
          >
            Take the Scorecard
          </Button>
        </div>
      </Container>
    </Section>
  );
}
