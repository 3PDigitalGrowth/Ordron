/*
  Ordron Finance Automation Diagnostic.

  Content is lifted directly from the working draft supplied by the
  client. Scoring follows the document's 0 to 4 points per answer
  model, with the four result bands from section 6.

  Question to pillar mapping follows the "Why this matters" reasoning
  in the source doc. Because the four pillars contain different numbers
  of questions, pillar results are normalised to a 0 to 100 percentage
  of friction so they can be compared visually.
*/

export type PillarId =
  | "manual-workload"
  | "system-disconnects"
  | "errors-delays-risk"
  | "scalability";

export type Pillar = {
  id: PillarId;
  label: string;
  short: string;
  description: string;
};

export const pillars: Record<PillarId, Pillar> = {
  "manual-workload": {
    id: "manual-workload",
    label: "Manual workload",
    short: "Manual workload",
    description:
      "How much time is being lost to repetitive, rules-based finance work.",
  },
  "system-disconnects": {
    id: "system-disconnects",
    label: "System disconnects",
    short: "System disconnects",
    description:
      "Tools that don't speak to each other, creating double-handling and visibility gaps.",
  },
  "errors-delays-risk": {
    id: "errors-delays-risk",
    label: "Errors, delays and risk",
    short: "Errors and risk",
    description:
      "Rework, missed payments, approval bottlenecks and audit exposure.",
  },
  scalability: {
    id: "scalability",
    label: "Scalability and operational maturity",
    short: "Scalability",
    description:
      "Whether the current process can grow without more headcount or fragility.",
  },
};

export type Option = {
  label: string;
  score: 0 | 1 | 2 | 3 | 4;
};

export type Question = {
  id: number;
  pillar: PillarId;
  prompt: string;
  helperText?: string;
  options: Option[];
};

export const questions: Question[] = [
  {
    id: 1,
    pillar: "manual-workload",
    prompt:
      "How many hours per week does your team spend on manual data entry, reconciliation, or moving information between systems?",
    helperText: "Include anything that isn't pushed or pulled automatically.",
    options: [
      { label: "0 to 5 hours", score: 0 },
      { label: "5 to 10 hours", score: 1 },
      { label: "10 to 20 hours", score: 2 },
      { label: "20 to 40 hours", score: 3 },
      { label: "40+ hours", score: 4 },
    ],
  },
  {
    id: 2,
    pillar: "system-disconnects",
    prompt:
      "How many different tools or platforms are involved in your finance process today?",
    helperText:
      "Count accounting, billing, CRM, expense, document capture, payroll, reporting.",
    options: [
      { label: "1 to 2", score: 0 },
      { label: "3 to 4", score: 1 },
      { label: "5 to 6", score: 2 },
      { label: "7 to 8", score: 3 },
      { label: "9 or more", score: 4 },
    ],
  },
  {
    id: 3,
    pillar: "manual-workload",
    prompt:
      "How often does your team copy information from email, PDFs, spreadsheets, or portals into your accounting system manually?",
    options: [
      { label: "Never", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
      { label: "Constantly", score: 4 },
    ],
  },
  {
    id: 4,
    pillar: "errors-delays-risk",
    prompt: "How long does your month-end close usually take?",
    options: [
      { label: "1 to 2 days", score: 0 },
      { label: "3 to 4 days", score: 1 },
      { label: "5 to 7 days", score: 2 },
      { label: "8 to 10 days", score: 3 },
      { label: "10+ days", score: 4 },
    ],
  },
  {
    id: 5,
    pillar: "errors-delays-risk",
    prompt:
      "How often do errors, mismatches, or missing information delay finance work?",
    options: [
      { label: "Almost never", score: 0 },
      { label: "Occasionally", score: 1 },
      { label: "Monthly", score: 2 },
      { label: "Weekly", score: 3 },
      { label: "Daily", score: 4 },
    ],
  },
  {
    id: 6,
    pillar: "system-disconnects",
    prompt:
      "Are supplier invoices, approvals, and payment runs handled through a structured workflow, or mostly through inboxes and follow-ups?",
    options: [
      { label: "Fully structured and automated", score: 0 },
      { label: "Mostly structured", score: 1 },
      { label: "Mixed", score: 2 },
      { label: "Mostly manual", score: 3 },
      { label: "Fully manual or inbox-driven", score: 4 },
    ],
  },
  {
    id: 7,
    pillar: "manual-workload",
    prompt:
      "How reliant is your team on spreadsheets to reconcile, track, or report on core finance activity?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Slightly", score: 1 },
      { label: "Moderately", score: 2 },
      { label: "Heavily", score: 3 },
      { label: "Critically", score: 4 },
    ],
  },
  {
    id: 8,
    pillar: "scalability",
    prompt:
      "Do you have real-time visibility over AP, AR, cash position, and exceptions, or does someone need to build reports manually?",
    options: [
      { label: "Full real-time visibility", score: 0 },
      { label: "Mostly visible", score: 1 },
      { label: "Partial visibility", score: 2 },
      { label: "Limited visibility", score: 3 },
      { label: "Manual reporting only", score: 4 },
    ],
  },
  {
    id: 9,
    pillar: "scalability",
    prompt:
      "If transaction volume doubled in the next 6 to 12 months, could your current finance process cope without adding headcount?",
    options: [
      { label: "Definitely yes", score: 0 },
      { label: "Probably yes", score: 1 },
      { label: "Not sure", score: 2 },
      { label: "Probably not", score: 3 },
      { label: "Definitely not", score: 4 },
    ],
  },
  {
    id: 10,
    pillar: "scalability",
    prompt:
      "Are there important finance tasks that only work because one specific team member knows how to manage them?",
    options: [
      { label: "Not at all", score: 0 },
      { label: "Slightly", score: 1 },
      { label: "Somewhat", score: 2 },
      { label: "Significantly", score: 3 },
      { label: "Completely", score: 4 },
    ],
  },
];

export const MAX_SCORE = questions.length * 4;

export type BandId =
  | "low-friction"
  | "moderate-opportunity"
  | "strong-case"
  | "high-value";

export type Band = {
  id: BandId;
  label: string;
  shortLabel: string;
  range: [number, number];
  tone: "positive" | "neutral" | "warning" | "urgent";
  headline: string;
  summary: string;
  cta: string;
};

export const bands: Band[] = [
  {
    id: "low-friction",
    label: "Low visible friction",
    shortLabel: "Low friction",
    range: [0, 10],
    tone: "positive",
    headline: "Your finance operation already shows structure and maturity.",
    summary:
      "There may still be targeted opportunities to improve efficiency, reporting speed, or process control, but the foundations are in good shape.",
    cta: "Explore what an Automation Roadmap would still surface",
  },
  {
    id: "moderate-opportunity",
    label: "Moderate automation opportunity",
    shortLabel: "Moderate opportunity",
    range: [11, 20],
    tone: "neutral",
    headline:
      "Your team is likely losing time to avoidable manual work and disconnected systems.",
    summary:
      "A focused review would likely uncover practical improvement opportunities and a clear plan to release hours back to the team.",
    cta: "Book your Roadmap to pinpoint the opportunities",
  },
  {
    id: "strong-case",
    label: "Strong case for an Automation Roadmap",
    shortLabel: "Strong case",
    range: [21, 30],
    tone: "warning",
    headline:
      "Your score suggests clear manual process drag and visibility gaps across finance workflows.",
    summary:
      "An Ordron Automation Roadmap would help pinpoint where automation creates the fastest return, and in what order to sequence the work.",
    cta: "Book your Automation Roadmap",
  },
  {
    id: "high-value",
    label: "High-value finance automation opportunity",
    shortLabel: "High-value opportunity",
    range: [31, 40],
    tone: "urgent",
    headline:
      "Your finance process is heavily dependent on manual work, fragmented systems and exception handling.",
    summary:
      "There is likely a strong case for immediate improvement through an Automation Roadmap, with fast payback on the first two or three wins.",
    cta: "Book your Roadmap now",
  },
];

export type PillarScore = {
  pillar: Pillar;
  raw: number;
  max: number;
  percentage: number;
};

export type ScorecardResult = {
  total: number;
  max: number;
  band: Band;
  pillarScores: PillarScore[];
};

export function scoreAnswers(
  answers: Record<number, number>,
): ScorecardResult {
  const total = questions.reduce(
    (sum, q) => sum + (answers[q.id] ?? 0),
    0,
  );

  const band =
    bands.find((b) => total >= b.range[0] && total <= b.range[1]) ??
    bands[bands.length - 1];

  const pillarScores: PillarScore[] = (
    Object.values(pillars) as Pillar[]
  ).map((pillar) => {
    const pillarQuestions = questions.filter((q) => q.pillar === pillar.id);
    const raw = pillarQuestions.reduce(
      (sum, q) => sum + (answers[q.id] ?? 0),
      0,
    );
    const max = pillarQuestions.length * 4;
    const percentage = max === 0 ? 0 : Math.round((raw / max) * 100);
    return { pillar, raw, max, percentage };
  });

  return { total, max: MAX_SCORE, band, pillarScores };
}

/*
  Pillar-specific automation candidates. These are used in the unlocked
  result block to clarify the problem rather than solve it. The full
  prioritised roadmap is explicitly deferred to the Automation Roadmap
  session so the diagnostic "motivates the next step" rather than doing
  the next step.
*/

export const pillarAutomations: Record<PillarId, string[]> = {
  "manual-workload": [
    "OCR-based supplier invoice capture and GL coding",
    "Automated bank reconciliation with learning classifiers",
    "Scheduled reporting pack generation from the ledger",
    "Portal-to-ledger data sync (no copy-paste)",
  ],
  "system-disconnects": [
    "Two-way CRM to ledger integration",
    "Billing platform to GL reconciliation bot",
    "Structured approval workflow outside the inbox",
    "Centralised data layer across finance tools",
  ],
  "errors-delays-risk": [
    "Month-end close checklist with variance alerts",
    "Duplicate invoice and payment detection",
    "Exception queue with owner assignment and SLA",
    "Automated three-way match on AP",
  ],
  scalability: [
    "Real-time Ordron Control Panel for finance leadership",
    "Documented, repeatable workflow runbooks",
    "Key-person risk reduction through standardisation",
    "Capacity modelling before volume growth hits",
  ],
};

/*
  Simple indicative annual waste estimate, scaled to the total score.
  Used only in the blurred-unlock block as a "rough order of magnitude",
  not a binding figure. The Automation Roadmap produces the real number.
*/

export function estimatedAnnualWaste(total: number): string {
  if (total <= 10) return "$10,000 to $25,000";
  if (total <= 20) return "$25,000 to $60,000";
  if (total <= 30) return "$60,000 to $120,000";
  return "$120,000+";
}
