/**
 * Platform hub data
 * ------------------------------------------------------------------
 * Source of truth for every /platforms/[slug] page. Each entry in
 * `platformHubs` renders a full hub via src/app/platforms/[slug]/page.tsx.
 *
 * Data shape (see `PlatformHub` below):
 *   - slug                  URL segment. Locked once shipped. Must match
 *                           the slugs in src/lib/platforms.ts so the index
 *                           grid, homepage trust strip, and calculator
 *                           dropdown line up.
 *   - name                  Display name (e.g. "Xero").
 *   - fullName              Long-form name for meta / body (e.g.
 *                           "Microsoft Dynamics 365").
 *   - category              Platform classification. Drives the hero
 *                           eyebrow via CATEGORY_LABELS below.
 *   - tagline               One-line positioning under the h1.
 *   - heroStat              { value, label } block surfaced in the hero.
 *   - automations           Exactly 10 automation objects. Each needs a
 *                           title, a plain-English description (2-3
 *                           sentences), a timeSaved range (e.g.
 *                           "8 to 14 hrs/wk"), and a category string
 *                           ("Accounts Payable", "Accounts Receivable",
 *                           "Reconciliations", "Month-end close",
 *                           "Reporting", "Operations"). Category is used
 *                           to group the list visually on the page.
 *   - whyPlatformMatters    ~100-word paragraph, AU mid-market voice.
 *                           First sentence must include the platform
 *                           name so the keyword lands in the first 100
 *                           words of body copy.
 *   - commonPainPoints      3-4 specific, CFO-recognisable pains.
 *   - ordronApproach        ~80-word paragraph.
 *   - relatedCaseStudySlugs Slugs from src/lib/case-studies.ts. The hub
 *                           gracefully falls back if none resolve.
 *   - relatedGuideSlugs     Slugs from the /guides/[slug] taxonomy (AP,
 *                           AR, reconciliations, month-end). Pages land
 *                           in a later block. Links are rendered anyway.
 *   - searchTerms           AU-focused keyword list for SEO JSON-LD and
 *                           internal copy audits.
 *
 * Adding a new platform
 * ------------------------------------------------------------------
 * 1. Mirror the slug in src/lib/platforms.ts (already locked in for all
 *    13 platforms).
 * 2. Add a new PlatformHub entry to `platformHubs` below.
 * 3. Generate a hero image at public/platforms/<slug-without-suffix>-hero.jpg
 *    using the prompt pattern from the Xero entry.
 * 4. Run the build: generateStaticParams picks up the new slug
 *    automatically and pre-renders the hub.
 *
 * The route /platforms/[slug] returns notFound() for slugs that exist
 * in src/lib/platforms.ts but are not yet populated here. That lets the
 * other 12 platforms 404 gracefully until Block 2B populates them.
 */

export type PlatformCategory =
  | "accounting"
  | "erp"
  | "document-capture"
  | "expense"
  | "finance-ops"
  | "reporting"
  | "practice-management";

export type PlatformAutomation = {
  title: string;
  /** Human-readable range, e.g. "8 to 14 hrs/wk" or "2 days/month". */
  timeSaved: string;
  /** 2 to 3 sentences in plain Australian English. */
  description: string;
  /** Functional grouping used to cluster automations on the page. */
  category: AutomationCategory;
};

export type AutomationCategory =
  | "Accounts Payable"
  | "Accounts Receivable"
  | "Reconciliations"
  | "Month-end close"
  | "Reporting"
  | "Operations";

export type PlatformHub = {
  slug: string;
  name: string;
  fullName: string;
  category: PlatformCategory;
  tagline: string;
  heroStat: { value: string; label: string };
  automations: PlatformAutomation[];
  whyPlatformMatters: string;
  commonPainPoints: string[];
  ordronApproach: string;
  relatedCaseStudySlugs: string[];
  relatedGuideSlugs: string[];
  searchTerms: string[];
};

/** Sentence-case eyebrow shown above the platform hero h1. */
export const CATEGORY_LABELS: Record<PlatformCategory, string> = {
  accounting: "Accounting platform",
  erp: "Enterprise resource planning",
  "document-capture": "Document capture platform",
  expense: "Expense platform",
  "finance-ops": "Finance operations platform",
  reporting: "Reporting platform",
  "practice-management": "Practice management platform",
};

/** Short descriptor used for the related guides block. */
export const GUIDE_BLURBS: Record<string, { label: string; blurb: string }> = {
  "ap-automation-australia": {
    label: "Accounts payable automation",
    blurb:
      "How mid-market AP actually gets automated in Australia. Intake, coding, approvals, posting, exception paths.",
  },
  "ar-automation-australia": {
    label: "Accounts receivable automation",
    blurb:
      "Invoicing, collections, remittance matching and aged-debtor surfacing without the chase-up spreadsheet.",
  },
  "bank-reconciliation-automation": {
    label: "Bank reconciliation automation",
    blurb:
      "Rule-based and ML-assisted bank reconciliation across the main AU business banks, with exception review.",
  },
  "month-end-close-automation": {
    label: "Month-end close automation",
    blurb:
      "Close checklists, automated accruals, reporting packs and a defensible five-day close for mid-market AU teams.",
  },
};

export const platformHubs: PlatformHub[] = [
  {
    slug: "xero-automation",
    name: "Xero",
    fullName: "Xero",
    category: "accounting",
    tagline:
      "The accounting platform most Australian finance teams run on. Also the one most of them have outgrown without noticing.",
    heroStat: {
      value: "10",
      label: "named automations shipped on Xero",
    },
    automations: [
      {
        title: "AP invoice intake and coding",
        timeSaved: "8 to 14 hrs/wk",
        description:
          "A dedicated inbox receives every supplier invoice, OCR extracts the line-level data, and a trained coding model writes the draft bill into Xero with supplier, GL code and tracking category attached. Finance reviews only the exceptions, not every line.",
        category: "Accounts Payable",
      },
      {
        title: "Two-way PO matching in Xero",
        timeSaved: "4 to 6 hrs/wk",
        description:
          "Incoming bills are matched against the existing purchase order and receiving record inside Xero, with tolerances for unit price and quantity set at the account level. Matched invoices auto-approve within policy; mismatches route to a named owner with the variance surfaced.",
        category: "Accounts Payable",
      },
      {
        title: "Bill approval routing with audit trail",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Approvers receive a single, mobile-friendly link with the invoice, the proposed coding, and the historical context for the same supplier. Every approval, reject and edit writes back to Xero with an audit trail that stands up to an external review.",
        category: "Accounts Payable",
      },
      {
        title: "Recurring invoice automation for AR",
        timeSaved: "6 to 10 hrs/wk",
        description:
          "Recurring customers, subscription fees and usage-based billing are issued from a single source of truth, not spreadsheets. Each invoice posts to Xero on the right date with the right tracking, and a remittance-ready PDF goes to the client automatically.",
        category: "Accounts Receivable",
      },
      {
        title: "Aged receivables collections workflow",
        timeSaved: "5 to 8 hrs/wk",
        description:
          "Overdue invoices trigger a staged email sequence written in your brand voice, not a generic template. Payments, partial payments and disputes are tracked against the invoice inside Xero, and the aged-debtors report stays accurate without a Thursday-afternoon clean up.",
        category: "Accounts Receivable",
      },
      {
        title: "Bank reconciliation with ML-assisted matching",
        timeSaved: "4 to 7 hrs/wk",
        description:
          "Bank statement lines are matched against Xero invoices, bills and manual journals using a model trained on your own reconciliation history, not a generic rule set. Confident matches reconcile automatically; anything under threshold routes to a human review queue.",
        category: "Reconciliations",
      },
      {
        title: "Credit card and expense reconciliation",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Corporate card feeds, employee receipts and Xero Expenses submissions reconcile against the right GL accounts and tracking categories, with duplicate claims flagged before they post. The month-end card clear-down becomes a review, not an investigation.",
        category: "Reconciliations",
      },
      {
        title: "Month-end accruals and journal automation",
        timeSaved: "1 to 2 days/month",
        description:
          "Recurring accruals, prepayment releases and inter-entity journals are generated and posted to Xero against a checklist, with balances reconciled before they land. The senior accountant reviews and signs off rather than builds from scratch each month.",
        category: "Month-end close",
      },
      {
        title: "Management reporting pack from Xero",
        timeSaved: "2 to 3 days/month",
        description:
          "A scheduled reporting pack compiles P&L by tracking category, budget variances, and cash-flow forecast directly from Xero into a branded board pack. Commentary fields are pre-populated with the same phrasing your CFO already uses.",
        category: "Reporting",
      },
      {
        title: "Xero to data warehouse sync",
        timeSaved: "1 to 2 days/month",
        description:
          "A structured copy of every transaction, contact and tracking category is written to your own Azure-hosted database on a nightly schedule. Power BI, dashboards and finance models pull from that warehouse, not from Xero directly, which keeps reports fast and your data portable.",
        category: "Reporting",
      },
    ],
    whyPlatformMatters:
      "Xero is the finance system of record for a huge share of Australian mid-market businesses, and that is exactly why it is usually where the hours leak. Teams onboard onto Xero when they are small, keep adding manual workarounds as they grow, and end up with a chart of accounts, a tracking taxonomy and a reconciliation process that works at ten staff but quietly breaks at fifty. Xero's own automation primitives (bank rules, repeating invoices, approvals) solve the easy cases. The hard cases, the ones that consume genuine finance hours, live in the gaps between Xero and everything else in your stack.",
    commonPainPoints: [
      "Bill coding is still a manual step for most invoices, even with Hubdoc or Dext sitting in front of Xero.",
      "Bank reconciliation takes a finance person half a day each week, because Xero's suggested matches miss anything unusual.",
      "The aged-debtors report is only trusted once someone has spent Friday cleaning it up.",
      "Management reporting is compiled by exporting Xero to Excel, then re-pivoting the same numbers every month.",
    ],
    ordronApproach:
      "Ordron treats Xero as the ledger, not the platform. We build a database-first automation layer next to it: a structured copy of your transactions in Azure, OCR and coding models tuned to your own chart of accounts, and a Control Panel your team actually logs into. Xero stays the single source of truth for the numbers. The repetitive work, the coding, the matching, the chasing, happens in the automation layer, with exceptions routed to a named owner.",
    relatedCaseStudySlugs: [
      "freight-xero-ar",
      "manufacturing-multi-system-flows",
      "logistics-legacy-erp-rpa",
    ],
    relatedGuideSlugs: [
      "ap-automation-australia",
      "ar-automation-australia",
      "bank-reconciliation-automation",
      "month-end-close-automation",
    ],
    searchTerms: [
      "xero automation",
      "xero automation australia",
      "xero ap automation",
      "xero ar automation",
      "xero bank reconciliation automation",
      "xero accounts payable automation",
      "xero month-end automation",
      "xero reporting automation",
      "automate xero",
      "xero finance automation",
    ],
  },
];

export function getPlatformHubBySlug(slug: string): PlatformHub | undefined {
  return platformHubs.find((p) => p.slug === slug);
}
