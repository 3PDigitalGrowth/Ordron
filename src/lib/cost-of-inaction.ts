/**
 * Cost of Inaction calculator.
 *
 * Reproduces the strategy document's "$104k annual waste" model in a
 * transparent, input-driven way. Every assumption is a named constant
 * below so the results page can show the working to a CFO-literate
 * reader. Change the constants here and every surface that renders
 * the calculator updates in lock-step.
 *
 * Anchors (from Ordron_Profile_Plan_Perform_Final.pdf, p.17):
 *   - 300 invoices/week, 5 FTE finance, 10-day close -> ~$104k/year
 *   - Ordron's typical project: $10,000
 *   - Payback period on the above: ~5 weeks
 */

import { platforms, type Platform } from "./platforms";

/* -------------------------------------------------------------- Assumptions */

export const ASSUMPTIONS = {
  /** Blended hourly rate for AU mid-market finance staff (AUD). */
  blendedRate: 55,
  /** Blended hourly rate for a Controller / CFO (AUD). */
  seniorRate: 125,
  /** Minutes a human spends processing one bill end-to-end, manually. */
  minutesPerInvoice: 4,
  /** Share of invoices that require some rework. */
  errorRate: 0.03,
  /** Minutes to rework one bill once an error is caught. */
  minutesPerRework: 30,
  /** Target days to close the month (best-practice benchmark). */
  targetCloseDays: 2,
  /** Senior hours consumed per extra day of close drag. */
  seniorHoursPerExtraCloseDay: 2,
  /** Annual turnover / burnout cost premium applied per FTE when
   *  the team is already working 10+ manual AP hours per week. */
  burnoutPerFte: 3_000,
  /** Typical Ordron project investment (AUD). */
  typicalProjectCost: 10_000,
  /** Share of each waste stream automation typically eliminates. */
  capture: {
    ap: 0.8,
    close: 0.7,
    rework: 0.9,
    burnout: 0.5,
  },
  /** Working weeks per year (accounts for leave). */
  workingWeeks: 50,
  /** Closes per year. */
  closesPerYear: 12,
} as const;

/* ------------------------------------------------------------------ Inputs */

export type CalculatorInputs = {
  /** Finance headcount, including seniors. Integer, 1-200. */
  teamSize: number;
  /** Average supplier bills + AR invoices processed per week. Integer, 0-5000. */
  weeklyInvoices: number;
  /** Working days taken to close the month today. Integer, 1-30. */
  closeDays: number;
  /** Platform slug from lib/platforms.ts, or "other" for generic. */
  platformSlug: string | "other";
};

export const DEFAULT_INPUTS: CalculatorInputs = {
  teamSize: 5,
  weeklyInvoices: 300,
  closeDays: 10,
  platformSlug: "xero-automation",
};

/* ----------------------------------------------------------------- Outputs */

export type WasteBreakdown = {
  /** Manual bill / invoice processing. */
  manualAp: number;
  /** Delayed month-end close (senior-time drag). */
  closeDrag: number;
  /** Rework from data-entry errors. */
  rework: number;
  /** Turnover / burnout premium on an overloaded team. */
  burnout: number;
};

export type AutomationRecommendation = {
  id: string;
  name: string;
  pillar: "ap" | "close" | "rework" | "ar";
  hoursSavedWeekly: string;
  blurb: string;
};

export type CalculationResult = {
  inputs: CalculatorInputs;
  breakdown: WasteBreakdown;
  /** Sum of the four waste streams. */
  totalAnnualWaste: number;
  /** Waste Ordron-style automation typically removes. */
  automatedSavings: number;
  /** Payback period on a typical Ordron project, in whole weeks. */
  paybackWeeks: number;
  /** Weekly equivalent of the captured savings. */
  weeklyCapturedSavings: number;
  /** Three prioritised automations for this platform and usage profile. */
  automations: AutomationRecommendation[];
  /** Resolved platform metadata, or null if "other". */
  platform: Platform | null;
};

/* --------------------------------------------------------- Platform catalogue */

/**
 * Minimal automation catalogue keyed by platform slug.
 * Three named automations per major platform, generic fallback for
 * the rest. These are drawn from the 130-framework library teaser on
 * p.23 of the strategy document.
 */
const PLATFORM_AUTOMATIONS: Record<string, AutomationRecommendation[]> = {
  "xero-automation": [
    {
      id: "xero-ap-capture",
      name: "Email-to-bill invoice capture with OCR and GL coding",
      pillar: "ap",
      hoursSavedWeekly: "8 to 14",
      blurb:
        "Supplier bills arriving in a shared inbox are captured, extracted, coded against your supplier rules, and posted into Xero as draft bills. Humans only touch exceptions.",
    },
    {
      id: "xero-bank-rec",
      name: "Bank reconciliation matching rules",
      pillar: "close",
      hoursSavedWeekly: "4 to 8",
      blurb:
        "Custom rule library plus learned matching brings your bank feed reconciliation to single-digit clicks a day, even with thousands of transactions.",
    },
    {
      id: "xero-debtor",
      name: "Automated debtor reminder sequences",
      pillar: "ar",
      hoursSavedWeekly: "3 to 5",
      blurb:
        "Tailored follow-up cadences per customer segment, pulling live aged-receivables data from Xero. Escalates to the AR lead only on overdue thresholds.",
    },
  ],
  "myob-automation": [
    {
      id: "myob-ap-capture",
      name: "Supplier invoice ingestion into MYOB AccountRight",
      pillar: "ap",
      hoursSavedWeekly: "7 to 12",
      blurb:
        "Bills arrive by email or portal, get extracted and coded against your MYOB job and category structure, then post as draft entries for approval.",
    },
    {
      id: "myob-pay-run",
      name: "Payroll run exception automation",
      pillar: "close",
      hoursSavedWeekly: "3 to 6",
      blurb:
        "Timesheet import from your rostering tool, auto-calculation of allowances, and pre-run exception flagging so pay runs clear in hours, not days.",
    },
    {
      id: "myob-ar-reminder",
      name: "AR statement and reminder sequencing",
      pillar: "ar",
      hoursSavedWeekly: "2 to 4",
      blurb:
        "Aged-receivables pulled from MYOB, matched to customer-specific follow-up cadences, with a weekly escalation summary for the Finance Manager.",
    },
  ],
  "quickbooks-automation": [
    {
      id: "qb-ap-capture",
      name: "Bill capture to QuickBooks Online",
      pillar: "ap",
      hoursSavedWeekly: "6 to 10",
      blurb:
        "OCR and GL coding layer that turns PDF and emailed bills into QBO draft bills, honouring your chart of accounts and class structure.",
    },
    {
      id: "qb-bank-rec",
      name: "Rules-driven bank feed reconciliation",
      pillar: "close",
      hoursSavedWeekly: "3 to 6",
      blurb:
        "Custom matching rules that resolve the long tail of unmatched transactions QBO's native reconciliation leaves behind.",
    },
    {
      id: "qb-ar-collect",
      name: "Automated receivables collection workflow",
      pillar: "ar",
      hoursSavedWeekly: "2 to 4",
      blurb:
        "Live aged-receivables in Slack or email, with automatic reminder sends and payment-link injection for overdue customers.",
    },
  ],
  "netsuite-automation": [
    {
      id: "ns-three-way",
      name: "Three-way PO, GRN, and invoice matching",
      pillar: "ap",
      hoursSavedWeekly: "10 to 18",
      blurb:
        "End-to-end match of purchase order, goods receipt, and supplier invoice in NetSuite, with exception routing to procurement only when documents disagree.",
    },
    {
      id: "ns-intercompany",
      name: "Intercompany journal automation",
      pillar: "close",
      hoursSavedWeekly: "5 to 9",
      blurb:
        "Scheduled generation, posting and elimination of intercompany entries across subsidiaries. Cuts a day to two off close for multi-entity groups.",
    },
    {
      id: "ns-revrec",
      name: "Revenue recognition schedule automation",
      pillar: "close",
      hoursSavedWeekly: "3 to 6",
      blurb:
        "Contract-driven revenue schedules built from your order data, with automatic journal posting and a clean audit trail.",
    },
  ],
  "sap-automation": [
    {
      id: "sap-ap",
      name: "SAP vendor invoice automation",
      pillar: "ap",
      hoursSavedWeekly: "10 to 16",
      blurb:
        "Invoice capture, matching and posting into S/4HANA or ECC, with exception queueing for AP and three-way match where the PO exists.",
    },
    {
      id: "sap-close",
      name: "Period-end closing cockpit automation",
      pillar: "close",
      hoursSavedWeekly: "6 to 10",
      blurb:
        "Scheduled execution and dependency handling of SAP closing tasks, with a real-time close cockpit on top.",
    },
    {
      id: "sap-ar",
      name: "Customer dunning and cash-application automation",
      pillar: "ar",
      hoursSavedWeekly: "4 to 7",
      blurb:
        "Automated dunning runs plus rules-driven cash application that clears the long tail of unmatched receipts without manual keying.",
    },
  ],
  "dynamics-automation": [
    {
      id: "dyn-ap",
      name: "Dynamics 365 AP invoice automation",
      pillar: "ap",
      hoursSavedWeekly: "8 to 14",
      blurb:
        "Vendor invoice capture into Dynamics 365 Finance or Business Central, with workflow routing and posting against your dimension structure.",
    },
    {
      id: "dyn-bank-rec",
      name: "Electronic bank reconciliation assistant",
      pillar: "close",
      hoursSavedWeekly: "3 to 6",
      blurb:
        "Rule-driven matching layer that clears the residue bank reconciliation leaves in Dynamics, with exceptions routed to the reconciler.",
    },
    {
      id: "dyn-ar",
      name: "Customer statement and collection automation",
      pillar: "ar",
      hoursSavedWeekly: "2 to 4",
      blurb:
        "Segmented statement runs and automated collection follow-ups with escalation triggers into Dynamics CRM or Teams.",
    },
  ],
};

const GENERIC_AUTOMATIONS: AutomationRecommendation[] = [
  {
    id: "generic-ap",
    name: "Bill capture and coding against your chart of accounts",
    pillar: "ap",
    hoursSavedWeekly: "6 to 12",
    blurb:
      "OCR and rules layer that turns emailed or uploaded bills into draft entries in whichever platform you run, posted only after approval.",
  },
  {
    id: "generic-bank-rec",
    name: "Bank reconciliation automation",
    pillar: "close",
    hoursSavedWeekly: "3 to 7",
    blurb:
      "Custom matching rules and a reconciliation dashboard that clears the tail of unmatched transactions your native platform leaves behind.",
  },
  {
    id: "generic-ar",
    name: "AR reminder and cash-application sequencing",
    pillar: "ar",
    hoursSavedWeekly: "2 to 5",
    blurb:
      "Segmented debtor follow-ups driven by live aged-receivables, with cash application automation clearing the majority of receipts.",
  },
];

/* ---------------------------------------------------------------- Selection */

/**
 * Pick the three automations most likely to move the needle for this
 * combination of platform and usage profile.
 */
export function pickAutomations(
  inputs: CalculatorInputs,
): AutomationRecommendation[] {
  const library =
    PLATFORM_AUTOMATIONS[inputs.platformSlug] ?? GENERIC_AUTOMATIONS;

  const prioritised = [...library].sort((a, b) => {
    const score = (rec: AutomationRecommendation) => {
      if (rec.pillar === "ap" && inputs.weeklyInvoices >= 100) return 0;
      if (
        rec.pillar === "close" &&
        inputs.closeDays > ASSUMPTIONS.targetCloseDays + 2
      ) {
        return 1;
      }
      if (rec.pillar === "ar" && inputs.teamSize >= 3) return 2;
      if (rec.pillar === "rework") return 3;
      return 4;
    };
    return score(a) - score(b);
  });

  return prioritised.slice(0, 3);
}

/* -------------------------------------------------------------- Calculation */

export function calculate(raw: Partial<CalculatorInputs>): CalculationResult {
  const inputs: CalculatorInputs = {
    teamSize: clamp(raw.teamSize ?? DEFAULT_INPUTS.teamSize, 1, 200),
    weeklyInvoices: clamp(
      raw.weeklyInvoices ?? DEFAULT_INPUTS.weeklyInvoices,
      0,
      5000,
    ),
    closeDays: clamp(raw.closeDays ?? DEFAULT_INPUTS.closeDays, 1, 30),
    platformSlug: raw.platformSlug ?? DEFAULT_INPUTS.platformSlug,
  };

  const a = ASSUMPTIONS;

  const manualApHoursPerWeek =
    (inputs.weeklyInvoices * a.minutesPerInvoice) / 60;
  const manualAp = manualApHoursPerWeek * a.blendedRate * a.workingWeeks;

  const extraCloseDays = Math.max(0, inputs.closeDays - a.targetCloseDays);
  const closeDrag =
    extraCloseDays *
    a.seniorHoursPerExtraCloseDay *
    a.seniorRate *
    a.closesPerYear;

  const errorsPerWeek = inputs.weeklyInvoices * a.errorRate;
  const rework =
    errorsPerWeek *
    (a.minutesPerRework / 60) *
    a.blendedRate *
    a.workingWeeks;

  const burnout =
    manualApHoursPerWeek > 10 ? inputs.teamSize * a.burnoutPerFte : 0;

  const breakdown: WasteBreakdown = {
    manualAp: round(manualAp),
    closeDrag: round(closeDrag),
    rework: round(rework),
    burnout: round(burnout),
  };

  const totalAnnualWaste =
    breakdown.manualAp +
    breakdown.closeDrag +
    breakdown.rework +
    breakdown.burnout;

  const automatedSavings = round(
    breakdown.manualAp * a.capture.ap +
      breakdown.closeDrag * a.capture.close +
      breakdown.rework * a.capture.rework +
      breakdown.burnout * a.capture.burnout,
  );

  const weeklyCapturedSavings = automatedSavings / 52;
  const paybackWeeks =
    weeklyCapturedSavings > 0
      ? Math.max(1, Math.round(a.typicalProjectCost / weeklyCapturedSavings))
      : 0;

  const platform =
    platforms.find((p) => p.slug === inputs.platformSlug) ?? null;

  return {
    inputs,
    breakdown,
    totalAnnualWaste,
    automatedSavings,
    paybackWeeks,
    weeklyCapturedSavings: round(weeklyCapturedSavings),
    automations: pickAutomations(inputs),
    platform,
  };
}

/* ------------------------------------------------------------------ Helpers */

function clamp(n: number, lo: number, hi: number): number {
  if (!Number.isFinite(n)) return lo;
  return Math.max(lo, Math.min(hi, Math.round(n)));
}

function round(n: number): number {
  return Math.round(n / 100) * 100;
}

/** Format AUD without decimals, with thousands separators. */
export function formatAud(n: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(n);
}
