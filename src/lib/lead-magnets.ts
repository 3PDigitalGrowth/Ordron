/**
 * Lead magnet registry.
 *
 * Single source of truth for every gated asset on the site. Pages import
 * a magnet by `id` and hand it to one of the three presentation
 * components in `src/components/lead-magnets/`.
 *
 * Adding the 14th magnet = one entry here + a PDF upload under /public.
 * No new pages, components, or routes.
 */

export type CommitmentRung =
  | "checklist"
  | "guide"
  | "playbook"
  | "calculator"
  | "scorecard"
  | "health-check";

export type LeadMagnet = {
  id: string;
  title: string;
  /** Short label used on buttons ("Get the guide"). */
  ctaLabel: string;
  /** One-line editorial summary for cards and ribbons. */
  description: string;
  /** Two-to-three line description used in asides and long-form cards. */
  longDescription: string;
  /**
   * Delivery mode.
   *   - `pdf`: stored under /public, path returned on successful capture.
   *   - `emailed`: no instant download, the ESP sends the asset.
   *   - `on-site`: interactive artefact (calculator, scorecard) that lives
   *     at an internal URL rather than a PDF.
   */
  delivery:
    | { type: "pdf"; path: string }
    | { type: "emailed" }
    | { type: "on-site"; href: string };
  /** Point-form highlights of what's inside (3-5 items). */
  highlights: string[];
  /** Small descriptor that appears above the title (e.g. "PDF, 18 pages"). */
  formatLabel: string;
  /** Conversion-ladder rung. Drives visual weight and copy. */
  commitmentRung: CommitmentRung;
  /**
   * Whether to require company name in addition to email.
   * Tier 3+ magnets (playbooks, calculators) use this.
   */
  requireCompany?: boolean;
};

export const leadMagnets: LeadMagnet[] = [
  {
    id: "platforms-13x130",
    title: "13 Platforms, 130 Automations: the AU finance stack guide",
    ctaLabel: "Email me the guide",
    description:
      "The named automations Ordron has shipped across every finance platform we support, with hours returned per workflow.",
    longDescription:
      "A practitioner's catalogue. For each of the 13 finance platforms we cover, you get the 10 specific automations we have built on it, the typical hours returned per week, and the pre-requisites before the work is worth starting.",
    delivery: { type: "emailed" },
    highlights: [
      "130 named automations, one row each",
      "Hours-returned range per workflow, from real engagements",
      "Pre-requisites and dependencies called out honestly",
      "Indexed by platform, by team size, and by finance function",
    ],
    formatLabel: "PDF guide, 42 pages",
    commitmentRung: "guide",
    requireCompany: true,
  },
  {
    id: "readiness-checklist",
    title: "Finance Automation Readiness Checklist",
    ctaLabel: "Download the checklist",
    description:
      "Fifteen yes/no statements across AP, AR, reconciliations and reporting. Two-minute read, one-page print.",
    longDescription:
      "If you cannot answer yes to at least ten of these, you are not yet ready for automation and the Automation Roadmap will tell you what to fix first. A brutal, useful filter before you spend money on tooling.",
    delivery: { type: "emailed" },
    highlights: [
      "Fifteen statements across the four finance pillars",
      "Scoring key included on the second page",
      "Print-ready one-pager for your leadership team",
      "Maps directly to the Automation Diagnostic pillars",
    ],
    formatLabel: "PDF checklist, 2 pages",
    commitmentRung: "checklist",
  },
  {
    id: "benchmark-2026",
    title: "2026 Australian Finance Team Benchmark Report",
    ctaLabel: "Register for early access",
    description:
      "Month-end close, invoice throughput, manual hours and automation coverage benchmarks for Australian mid-market finance teams.",
    longDescription:
      "A benchmark report comparing Australian mid-market finance operations across eight core metrics, including close speed, invoices per FTE, manual hours and automation coverage.",
    delivery: { type: "emailed" },
    highlights: [
      "Peer benchmarks for $10M to $50M Australian businesses",
      "Month-end close and invoice throughput comparison points",
      "Manual hours and automation coverage indicators",
      "Early-access delivery when the report publishes",
    ],
    formatLabel: "PDF report, 2026",
    commitmentRung: "guide",
  },
  {
    id: "cost-of-inaction",
    title: "Cost of Inaction Calculator",
    ctaLabel: "Open the calculator",
    description:
      "Four inputs. Your annual cost of manual finance, your likely payback period, the top three automations for your stack.",
    longDescription:
      "An interactive calculator with every assumption shown. The on-screen headline updates as you move the sliders. An email unlocks the full breakdown and the platform-specific roadmap.",
    delivery: { type: "on-site", href: "/cost-of-inaction" },
    highlights: [
      "Four inputs, ninety seconds to a number",
      "Every assumption named, not a black box",
      "Full line-by-line breakdown emailed on request",
      "Platform-aware automation recommendations",
    ],
    formatLabel: "Interactive, on-site",
    commitmentRung: "calculator",
  },
  {
    id: "month-end-close",
    title: "Month-End Close Acceleration Guide",
    ctaLabel: "Email me the guide",
    description:
      "How AU mid-market finance teams cut their close from ten working days to two, without new headcount.",
    longDescription:
      "A detailed walk-through of the close acceleration playbook Ordron uses in Automation Roadmap engagements. Covers reconciliation readiness, journal automation, variance commentary, and the controller checklist.",
    delivery: { type: "emailed" },
    highlights: [
      "The close bottleneck map for mid-market AU businesses",
      "Automation-ready vs. not-yet-ready reconciliations",
      "Journal templates and variance-commentary triggers",
      "A two-day close controller checklist",
    ],
    formatLabel: "PDF playbook, 28 pages",
    commitmentRung: "playbook",
    requireCompany: true,
  },
];

export function getLeadMagnet(id: string): LeadMagnet | undefined {
  return leadMagnets.find((m) => m.id === id);
}

/**
 * Narrow helper for page authors. Throws at build time if a bad id is
 * referenced from a page, which catches copy-paste mistakes early.
 */
export function requireLeadMagnet(id: string): LeadMagnet {
  const m = getLeadMagnet(id);
  if (!m) {
    throw new Error(
      `Unknown lead magnet id "${id}". Known ids: ${leadMagnets.map((x) => x.id).join(", ")}`,
    );
  }
  return m;
}
