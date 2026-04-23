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
  "accounts-payable-automation": {
    label: "Accounts payable automation",
    blurb:
      "How mid-market AP actually gets automated in Australia. Intake, coding, approvals, posting, exception paths.",
  },
  "accounts-receivable-automation": {
    label: "Accounts receivable automation",
    blurb:
      "Invoicing, collections, remittance matching and aged-debtor surfacing without the chase-up spreadsheet.",
  },
  "reconciliations-automation": {
    label: "Reconciliations automation",
    blurb:
      "Rule-based and ML-assisted reconciliations across the main AU business banks, cards and inter-entity accounts.",
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
      "accounts-payable-automation",
      "accounts-receivable-automation",
      "reconciliations-automation",
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
  {
    slug: "myob-automation",
    name: "MYOB",
    fullName: "MYOB",
    category: "accounting",
    tagline:
      "The Australian SME incumbent. Still runs a large slice of mid-market trades, construction, logistics and services. Also where the heaviest legacy workarounds live.",
    heroStat: {
      value: "10",
      label: "named automations shipped on MYOB",
    },
    automations: [
      {
        title: "Fortnightly payroll reconciliation against the bank feed",
        timeSaved: "2 to 3 days/fortnight",
        description:
          "Payroll runs from MYOB are matched line by line against the bank feed clearing, with ATO PAYG and super contributions reconciled separately. The three-day manual reconciliation becomes a 30-minute review, and variances are surfaced with the specific employee, run and account already identified.",
        category: "Reconciliations",
      },
      {
        title: "Timesheet to payroll automation for labour-heavy teams",
        timeSaved: "6 to 10 hrs/fortnight",
        description:
          "Field and site timesheets from paper, mobile apps or spreadsheet submissions are validated against award rules, allowances and job codes, then written into MYOB payroll with penalty and overtime calculated. Construction, trades and services teams stop rebuilding payroll from scratch every fortnight.",
        category: "Operations",
      },
      {
        title: "Payroll exception review and approval routing",
        timeSaved: "3 to 5 hrs/fortnight",
        description:
          "Every payroll-adjacent change (new employee, rate change, termination, large variance) routes to the named finance lead before it posts to MYOB. Approvals, rejects and edits carry a full audit trail, and nothing touches the ATO file without a human sign-off.",
        category: "Accounts Payable",
      },
      {
        title: "AP invoice intake with MYOB-specific coding rules",
        timeSaved: "7 to 12 hrs/wk",
        description:
          "Supplier invoices land in a dedicated inbox, OCR lifts the line-level data, and a coding model trained on your own MYOB chart of accounts writes the draft bill with supplier, GL, job and category attached. Your AP clerk reviews exceptions, not every invoice, and MYOB's thinner API is handled by a bridging layer so nothing gets re-keyed.",
        category: "Accounts Payable",
      },
      {
        title: "Sales order sync from CRM or ERP into MYOB",
        timeSaved: "4 to 8 hrs/wk",
        description:
          "Orders raised in the sales or operations system flow into MYOB as the matching invoice or purchase, with customer, GST treatment and tracking already set. The Friday variance between what the sales team booked and what finance has in MYOB stops appearing.",
        category: "Operations",
      },
      {
        title: "Project and job cost sync for construction and services",
        timeSaved: "1 to 2 days/month",
        description:
          "Labour hours, materials and sub-contractor costs are mapped against the MYOB job or project in near real time, so WIP and margin are accurate before the invoice goes out. Site-heavy businesses get the job-level visibility MYOB alone does not give them.",
        category: "Operations",
      },
      {
        title: "Bank reconciliation with MYOB-specific rule libraries",
        timeSaved: "4 to 7 hrs/wk",
        description:
          "Bank statement lines reconcile against MYOB invoices, bills and journals using rules tuned to your own transaction history, not MYOB's default match list. Confident matches reconcile automatically, and anything below threshold routes to a queue with the likely match already suggested.",
        category: "Reconciliations",
      },
      {
        title: "Multi-entity bank reconciliation across MYOB files",
        timeSaved: "1 to 2 days/month",
        description:
          "For groups running more than one MYOB company file, reconciliation runs as a single workflow across every entity and every account. Inter-entity settlements are matched on both sides, and the consolidated position is available before the finance lead opens MYOB.",
        category: "Reconciliations",
      },
      {
        title: "Month-end reporting pipeline from MYOB to Power BI or Excel",
        timeSaved: "2 to 3 days/month",
        description:
          "P&L by tracking category, budget variance and cash position are compiled from clean MYOB data into a scheduled board pack, without the manual export-to-Excel step. Commentary fields pre-populate in the CFO's own phrasing, so the review is the work, not the rebuild.",
        category: "Reporting",
      },
      {
        title: "MYOB data mirror to an Azure-hosted database",
        timeSaved: "1 to 2 days/month",
        description:
          "Every transaction, contact, job and tracking category is mirrored nightly to your own Azure database. Reporting, dashboards and finance models pull from the mirror, not from MYOB's reporting layer, which keeps analytics fast, queryable and portable even as MYOB versions change.",
        category: "Reporting",
      },
    ],
    whyPlatformMatters:
      "MYOB is still the ledger of record for a large share of Australian mid-market businesses, especially in trades, construction, logistics and services where the team has been on it for ten or fifteen years. That longevity is why the automation opportunity is bigger on MYOB than on newer platforms. Teams have layered manual workarounds on top of every quirk, the spreadsheets have multiplied, and MYOB's API coverage has never been as wide as Xero's, so most integrations are partial. The hours leak in payroll reconciliation, inter-system re-keying and month-end reporting, and they compound quietly as the business grows.",
    commonPainPoints: [
      "MYOB payroll reconciliation against the bank feed is a three-day manual exercise every fortnight, and it never gets cleaner.",
      "The sales team enters orders in one system, finance re-enters them in MYOB, and by Friday the variance nobody can explain is already built in.",
      "Month-end close is held together by one person who knows where every MYOB quirk lives, and when she is on leave the close wobbles.",
      "Management reporting is built by exporting MYOB to Excel, then re-pivoting the same numbers every month before they land in a board pack.",
    ],
    ordronApproach:
      "Ordron treats MYOB as the ledger and builds a controlled database layer alongside it. Because MYOB's API coverage is patchier than Xero's, we lean on RPA bridges where MYOB does not expose the data natively, and we write the structured copy to your own Azure database so reporting and reconciliation run on clean data. Payroll-adjacent automations always route exceptions to a named finance lead before they post, because the exposure is too high to leave unsupervised.",
    relatedCaseStudySlugs: [
      "logistics-legacy-erp-rpa",
      "transport-ops-workflow",
      "manufacturing-multi-system-flows",
    ],
    relatedGuideSlugs: [
      "accounts-payable-automation",
      "accounts-receivable-automation",
      "reconciliations-automation",
      "month-end-close-automation",
    ],
    searchTerms: [
      "myob automation",
      "myob automation australia",
      "myob payroll automation",
      "myob ap automation",
      "myob bank reconciliation automation",
      "myob accounts payable automation",
      "myob month-end automation",
      "myob reporting automation",
      "automate myob",
      "myob finance automation",
    ],
  },
  {
    slug: "quickbooks-automation",
    name: "QuickBooks",
    fullName: "QuickBooks",
    category: "accounting",
    tagline:
      "The international challenger in the Australian market. Common in businesses with a US or UK parent, in cross-border professional services, and in firms whose founder set it up a decade ago.",
    heroStat: {
      value: "10",
      label: "named automations shipped on QuickBooks",
    },
    automations: [
      {
        title: "Multi-currency AP with automated FX reconciliation",
        timeSaved: "1 to 2 days/month",
        description:
          "USD, GBP and EUR supplier bills are captured, translated at the posting-day rate and reconciled against the bank settlement in AUD, with the realised FX gain or loss posted to QuickBooks automatically. The month-end FX wrestle stops being a spreadsheet exercise.",
        category: "Reconciliations",
      },
      {
        title: "Cross-border bill capture and coding for US and EU suppliers",
        timeSaved: "6 to 10 hrs/wk",
        description:
          "Foreign-currency supplier invoices are read, matched against the supplier profile and coded against the right QuickBooks GL, with GST handled correctly on imports and reverse-charge scenarios flagged. AP clerks stop hand-translating and hand-coding every foreign bill.",
        category: "Accounts Payable",
      },
      {
        title: "Consolidation reporting for QB AU to QB US parent roll-ups",
        timeSaved: "3 to 5 days/month",
        description:
          "A structured copy of the QuickBooks AU ledger is mapped to the parent's QuickBooks US chart and posting rules, with inter-company entries tagged on both sides. Consolidation that used to take six days of manual reconciliation runs as a single pipeline and balances the first time.",
        category: "Month-end close",
      },
      {
        title: "Inter-company reconciliation for US or UK parent structures",
        timeSaved: "1 to 2 days/month",
        description:
          "Inter-company invoices, recharges and loan movements are matched automatically between the AU entity and the parent, with variances surfaced by counterparty and period. Finance stops chasing the same differences into month two.",
        category: "Reconciliations",
      },
      {
        title: "BAS preparation automation from QuickBooks data",
        timeSaved: "1 to 2 days/quarter",
        description:
          "GST, PAYG and the full BAS worksheet are compiled directly from QuickBooks transactions, with Australian-specific tax codes applied on top of QuickBooks' US-native architecture. The quarterly scramble against the ATO deadline becomes a review.",
        category: "Month-end close",
      },
      {
        title: "Australian tax handling on QuickBooks to HubSpot or Salesforce sync",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Sales orders and deals sync from HubSpot or Salesforce into QuickBooks with GST, ABN and withholding handled correctly, rather than being quietly dropped by third-party connectors built for the US market. The CRM and the ledger finally agree on revenue.",
        category: "Operations",
      },
      {
        title: "AR project billing automation for professional services",
        timeSaved: "6 to 9 hrs/wk",
        description:
          "Time, milestones and recoverable expenses are issued from a single source of truth against the right engagement, in the right currency, with the right GST treatment. Each invoice posts to QuickBooks on the right date, and the client receives a clean remittance-ready PDF.",
        category: "Accounts Receivable",
      },
      {
        title: "AR collections for international clients on AUD invoices",
        timeSaved: "4 to 7 hrs/wk",
        description:
          "Overdue invoices to offshore clients trigger a staged email sequence in the firm's voice, with payment links priced correctly for the client's timezone and currency. Partial payments and disputes are tracked against the QuickBooks invoice, and the aged-debtors view stays accurate without a Friday clean up.",
        category: "Accounts Receivable",
      },
      {
        title: "Bank reconciliation for AU accounts feeding QuickBooks",
        timeSaved: "4 to 6 hrs/wk",
        description:
          "CBA, NAB, ANZ, Westpac and Macquarie statement lines match against QuickBooks invoices, bills and journals using rules trained on your own reconciliation history. Confident matches reconcile automatically, and anything Australian-bank-specific (BPAY, PayID, direct debits) is handled natively, not as a mystery transaction.",
        category: "Reconciliations",
      },
      {
        title: "QuickBooks to Power BI or Excel reporting pipelines",
        timeSaved: "2 to 3 days/month",
        description:
          "Revenue, margin, cash and AR aging are compiled from clean QuickBooks data into a scheduled pack that reconciles back to the ledger. Parent-company reports use the same source so the numbers the AU CFO sees are the numbers the US CFO sees.",
        category: "Reporting",
      },
    ],
    whyPlatformMatters:
      "QuickBooks carries a specific profile in the Australian market: businesses with a US or UK parent that report upward into QuickBooks, professional services firms that have been on it for a decade, and cross-border operators whose suppliers, clients or capital sit offshore. That profile is exactly where Xero and MYOB start to creak, because they are built for domestic first. The automation opportunities on QuickBooks concentrate in multi-currency AP, cross-border reconciliation, BAS localisation on top of a US-native architecture, and consolidation reporting. Third-party app marketplace connectors rarely handle Australian tax correctly, which pushes most of this work into custom bridging logic.",
    commonPainPoints: [
      "We run QuickBooks in AUD but half our suppliers invoice us in USD, and every month-end turns into a manual FX reconciliation.",
      "Our parent reports in QuickBooks US and we run QuickBooks AU, so consolidation takes six days and the numbers never match the first time.",
      "Every CRM connector we try handles Australian GST or BAS incorrectly, and we end up re-working the sales data by hand before it lands.",
      "BAS preparation is a quarterly scramble because QuickBooks was not built for Australian tax treatment in the first place.",
    ],
    ordronApproach:
      "Ordron favours API-first on QuickBooks Online, where the coverage is solid, and falls back to RPA on QuickBooks Desktop. The biggest lift on QuickBooks AU deployments is making Australian tax, BAS and bank handling work correctly inside a US-native architecture, so we build the localisation layer directly rather than relying on third-party marketplace apps that frequently get it wrong. Cross-border reconciliation runs through the controlled database layer, so AU and parent-entity numbers reconcile back to one source.",
    relatedCaseStudySlugs: [
      "advisory-excel-to-enterprise",
      "financial-services-risk-ai",
      "asset-mgmt-data-integration",
    ],
    relatedGuideSlugs: [
      "accounts-payable-automation",
      "accounts-receivable-automation",
      "reconciliations-automation",
      "month-end-close-automation",
    ],
    searchTerms: [
      "quickbooks automation",
      "quickbooks automation australia",
      "quickbooks online automation",
      "quickbooks multi-currency automation",
      "quickbooks bas automation",
      "quickbooks ap automation",
      "quickbooks ar automation",
      "quickbooks reporting automation",
      "automate quickbooks",
      "quickbooks finance automation",
    ],
  },
  {
    slug: "netsuite-automation",
    name: "NetSuite",
    fullName: "Oracle NetSuite",
    category: "erp",
    tagline:
      "The mid-market step-up ERP that quietly accumulates SuiteScript debt three years post go-live. The automation opportunity is bigger in dollar terms than any accounting platform.",
    heroStat: {
      value: "10",
      label: "named automations shipped on NetSuite",
    },
    automations: [
      {
        title: "AP invoice intake and coding into NetSuite",
        timeSaved: "10 to 16 hrs/wk",
        description:
          "Supplier invoices land in a dedicated inbox, line-level data is extracted via OCR, and a coding model tuned to your NetSuite chart of accounts, subsidiaries and classes posts draft bills with vendor, GL code and department attached. Finance reviews the exceptions, not every line.",
        category: "Accounts Payable",
      },
      {
        title: "Procurement approval through NetSuite's approval layer",
        timeSaved: "6 to 10 hrs/wk",
        description:
          "Purchase requisitions are captured, coded against the right subsidiary and department, and routed through NetSuite's native approval layer with supporting documents attached. Approvers act from a single mobile link, and the approved PO posts straight into NetSuite with a reviewable audit trail.",
        category: "Accounts Payable",
      },
      {
        title: "AR collections against NetSuite customer records",
        timeSaved: "5 to 8 hrs/wk",
        description:
          "Overdue invoices trigger a staged email sequence against the right NetSuite customer record, with contact escalation, partial-payment tracking and dispute flags written back to the customer's transaction history. The aged-debtors report stays accurate without a Friday clean-up.",
        category: "Accounts Receivable",
      },
      {
        title: "Revenue recognition for subscription and project billings",
        timeSaved: "1 to 2 days/month",
        description:
          "Subscription fees, milestone invoices and usage-based billings are recognised against the right period and project inside NetSuite, with deferred revenue schedules maintained and released automatically. Revenue movements reconcile to the deferred balance each month without a manual rebuild.",
        category: "Accounts Receivable",
      },
      {
        title: "Multi-currency journals and FX revaluation",
        timeSaved: "1 day/month",
        description:
          "Multi-currency transactions, inter-entity loan movements and month-end FX revaluation journals are generated against the right subsidiary, posted at the correct rate, and reconciled against NetSuite's own currency tables. Finance reviews the variance, not the calculation.",
        category: "Reconciliations",
      },
      {
        title: "Bank reconciliation with NetSuite-specific rule libraries",
        timeSaved: "4 to 7 hrs/wk",
        description:
          "Bank statement lines reconcile against NetSuite bills, deposits and manual journals using a rule library built from your own matching history, not a generic pack. Confident matches auto-reconcile inside NetSuite; anything under threshold routes to a finance reviewer with the proposed match surfaced.",
        category: "Reconciliations",
      },
      {
        title: "Multi-entity consolidation at month-end close",
        timeSaved: "3 to 5 days/month",
        description:
          "Consolidation across three, four or more NetSuite subsidiaries runs on a structured checklist rather than in a spreadsheet, with eliminations, currency translation and management adjustments applied in sequence. The consolidated pack lands on day three of close, not day nine.",
        category: "Month-end close",
      },
      {
        title: "Inter-company elimination journals",
        timeSaved: "1 to 2 days/month",
        description:
          "Inter-company sales, recharges and loan interest are matched across subsidiaries, eliminations are posted against a standing policy, and unmatched balances surface as named exceptions with both sides of the transaction visible. Month-end inter-company becomes a review.",
        category: "Month-end close",
      },
      {
        title: "Fixed asset schedules and depreciation",
        timeSaved: "1 day/month",
        description:
          "Fixed asset additions, disposals and impairments are captured at the point of acquisition, depreciation schedules run against the right method and life, and the monthly journal posts to NetSuite under a reviewed schedule. Capex reporting reconciles to the asset register without a side spreadsheet.",
        category: "Month-end close",
      },
      {
        title: "NetSuite to Power BI reporting pipeline",
        timeSaved: "2 to 3 days/month",
        description:
          "A structured copy of every NetSuite transaction, customer and subsidiary writes to an Azure-hosted database on a nightly schedule, and Power BI dashboards pull from that warehouse rather than from NetSuite directly. Board packs, management packs and ad-hoc queries stop requiring a re-export at the start of each month.",
        category: "Reporting",
      },
    ],
    whyPlatformMatters:
      "NetSuite is the step-up ERP for Australian businesses that have outgrown Xero or MYOB but are not ready for SAP, and that positioning is exactly where the hours leak. Most NetSuite deployments we see are three or four years post go-live, carrying an accumulated layer of SuiteScript customisation written by a consultant who is no longer on the phone. Month-end runs into double digits because consolidation across three or four entities still depends on Excel. The team pays enterprise licence fees for NetSuite and then exports to a spreadsheet to do the real reporting work. That gap is where automation earns its keep.",
    commonPainPoints: [
      "Our NetSuite close runs to twelve days. Most of that is consolidation across four entities that should be automated and isn't.",
      "We're paying for NetSuite's full ERP functionality, but the team still exports to Excel for half their reporting.",
      "Bank reconciliation is matched by a NetSuite consultant once a quarter at $400 an hour. There has to be a better way.",
      "Every SuiteScript customisation we added in year one now blocks the automation we want to add in year three.",
    ],
    ordronApproach:
      "Ordron starts with a SuiteScript audit. Layering automation on top of poorly maintained customisation compounds fragility, so we map what already runs inside NetSuite before we add anything. Where NetSuite's native APIs and SuiteTalk will carry the workload, we use them. Where customisation has become a bottleneck, we move the relevant workflow out of NetSuite into a controlled Azure-hosted database, run the logic there under audit, and sync clean results back. The consultant bill drops, and the close drops with it.",
    relatedCaseStudySlugs: [
      "enterprise-ap-idu",
      "intelligent-invoice-multisplit",
      "manufacturing-multi-system-flows",
    ],
    relatedGuideSlugs: [
      "accounts-payable-automation",
      "reconciliations-automation",
      "month-end-close-automation",
    ],
    searchTerms: [
      "netsuite automation",
      "netsuite automation australia",
      "netsuite month-end automation",
      "netsuite consolidation automation",
      "netsuite ap automation",
      "netsuite ar automation",
      "netsuite bank reconciliation automation",
      "netsuite reporting automation",
      "suitescript automation",
      "netsuite power bi integration",
    ],
  },
  {
    slug: "sap-automation",
    name: "SAP Finance",
    fullName: "SAP Finance",
    category: "erp",
    tagline:
      "The seven-figure ERP you inherited from an SI and can't replace. The automation opportunity is every clickpath SAP doesn't expose an API for.",
    heroStat: {
      value: "10",
      label: "named automations shipped on SAP Finance",
    },
    automations: [
      {
        title: "RPA against SAP AP screens for invoice posting",
        timeSaved: "10 to 16 hrs/wk",
        description:
          "A bot drives the SAP AP posting screens the way a clerk does, taking OCR-extracted supplier invoice data, mapping it to the right vendor, cost centre and GL account, and posting the document inside SAP under a named service user. Errors return a reason code, not a failed keystroke.",
        category: "Accounts Payable",
      },
      {
        title: "Purchase requisition to purchase order workflow",
        timeSaved: "6 to 10 hrs/wk",
        description:
          "Purchase requisitions are captured and coded against the right plant, cost centre and GL account, routed through an email-driven approval flow, and posted into SAP as a PO with the supporting documentation attached. Approvers see the full context on a single mobile link rather than logging into SAP.",
        category: "Accounts Payable",
      },
      {
        title: "Vendor master data management",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "New vendor requests, bank detail changes and tax registration updates are captured in a controlled form, validated against ABN and bank data, and written into the SAP vendor master under a named approval. The fraud exposure on manual vendor changes drops, and the audit trail sits outside SAP if it's ever needed.",
        category: "Accounts Payable",
      },
      {
        title: "AR cash application against SAP",
        timeSaved: "4 to 7 hrs/wk",
        description:
          "Incoming customer payments are matched against open SAP AR invoices using a model trained on your remittance history, with partial payments, credit notes and short-pays routed to a review queue. Confident matches apply automatically inside SAP; the clerk handles exceptions, not every line.",
        category: "Accounts Receivable",
      },
      {
        title: "Intercompany reconciliation across SAP company codes",
        timeSaved: "1 to 2 days/month",
        description:
          "Intercompany sales, recharges and loans are matched across SAP company codes, balances agreed under a standing policy, and imbalances flagged as named exceptions with both sides of the transaction surfaced. Month-end intercompany reconciliation becomes a review, not an investigation.",
        category: "Reconciliations",
      },
      {
        title: "Treasury and daily cash position automation",
        timeSaved: "4 to 6 hrs/wk",
        description:
          "Bank statement data from every operating account is pulled in, categorised, and applied against SAP's treasury view daily. The treasurer gets a cash position report at 9 a.m. that reconciles to SAP without a manual export, and variance alerts surface before they become a problem.",
        category: "Reconciliations",
      },
      {
        title: "Month-end close checklist automation",
        timeSaved: "2 to 3 days/month",
        description:
          "Close tasks, dependencies and sign-offs run under a structured checklist with automated upstream and downstream triggers. Depreciation, accruals, intercompany and reporting steps fire in sequence, and SAP postings are made against a reviewed schedule rather than a Monday morning scramble.",
        category: "Month-end close",
      },
      {
        title: "Automated variance analysis from SAP data",
        timeSaved: "1 to 2 days/month",
        description:
          "Actuals pulled from SAP are matched against budget and prior-year under a standing variance threshold, commentary fields are pre-populated with the phrasing your CFO already uses, and the variance pack lands on day two of close. Senior finance reviews exceptions rather than builds the pack.",
        category: "Month-end close",
      },
      {
        title: "Fixed asset and depreciation schedule automation",
        timeSaved: "1 day/month",
        description:
          "Asset additions, disposals, impairments and depreciation schedules run outside SAP against a controlled register, with monthly depreciation journals posted back into SAP under a reviewed policy. The fixed asset reconciliation becomes a five-minute check, not a half-day exercise.",
        category: "Month-end close",
      },
      {
        title: "SAP to Power BI reporting pipeline without waiting for BW",
        timeSaved: "3 to 5 days/month",
        description:
          "A structured copy of SAP transactional data writes to an Azure-hosted database on a nightly schedule, and management reporting runs on Power BI against that database. New reports ship in days rather than waiting for a six-week SAP BW change project, and numbers reconcile back to SAP.",
        category: "Reporting",
      },
    ],
    whyPlatformMatters:
      "SAP Finance in the Australian mid-market concentrates in manufacturing, logistics and resource-adjacent businesses, where it was implemented years ago by a systems integrator and is now being maintained by a lean finance team who inherited it. SAP is heavy, rigid, and in most cases untouchable at the architectural layer. That is exactly why the automation opportunity is real. Every day finance clerks drive SAP screens for workflows that would be a single API call on a modern platform, and every month-end is held up waiting for reports that SAP could deliver in 2017 but cannot deliver in 2024. We automate around those gaps without touching SAP.",
    commonPainPoints: [
      "SAP gives me exactly the report I asked for in 2017 and nothing else. Every new request is a six-week change project.",
      "Our AP clerks spend half their day clicking through SAP screens that could be a single API call if SAP exposed one.",
      "We paid seven figures for SAP and our close still takes ten days. Nobody's ever been able to tell me why.",
      "The SI who built this is no longer on the phone, and our internal team can't safely change the config.",
    ],
    ordronApproach:
      "SAP is where RPA earns its keep. Many of the workflows that plague SAP users are clickpath-heavy and API-light, so automation runs as attended or unattended RPA against the same screens a finance clerk drives. Where SAP's APIs and BAPIs exist we use them, and where they don't we drive the UI. Critically, we keep the data model documented outside SAP in a controlled Azure database, so reporting and analytics don't depend on SAP's own reporting layer. Governance and audit trail are tighter here because SAP customers are always audited.",
    relatedCaseStudySlugs: [
      "logistics-legacy-erp-rpa",
      "manufacturing-multi-system-flows",
      "enterprise-ap-idu",
    ],
    relatedGuideSlugs: [
      "accounts-payable-automation",
      "reconciliations-automation",
      "month-end-close-automation",
    ],
    searchTerms: [
      "sap automation",
      "sap automation australia",
      "sap finance automation",
      "sap rpa automation",
      "sap ap automation",
      "sap month-end automation",
      "sap reporting automation",
      "sap power bi integration",
      "sap mid-market automation",
      "automate sap",
    ],
  },
  {
    slug: "dynamics-automation",
    name: "Dynamics 365",
    fullName: "Microsoft Dynamics 365",
    category: "erp",
    tagline:
      "Two ERPs inside one Microsoft ecosystem. The automation opportunity is making Power Automate, Power BI and Dynamics behave like a single system, not three tools.",
    heroStat: {
      value: "10",
      label: "named automations across Business Central and F&O",
    },
    automations: [
      {
        title: "AP automation through Dynamics approvals and Power Automate",
        timeSaved: "10 to 14 hrs/wk",
        description:
          "Supplier invoices are captured, OCR-extracted and drafted inside Dynamics, then routed through the native approval layer backed by Power Automate flows that carry context, thresholds and escalation. Approvers act from a mobile link or Teams message, and approved bills post to Dynamics with an audit trail.",
        category: "Accounts Payable",
      },
      {
        title: "Procurement approval workflow automation",
        timeSaved: "5 to 8 hrs/wk",
        description:
          "Purchase requisitions are captured against the right dimension and legal entity, routed through Power Automate with threshold-based escalation, and posted to Dynamics as a PO once approved. Site staff raise requests from a mobile form, finance sees the approval chain in one place, and SharePoint holds the supporting documents.",
        category: "Accounts Payable",
      },
      {
        title: "Expense management feeding into the Dynamics GL",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Expense claims from Concur or Dynamics' native expense module are coded against the right dimension set, card reconciliation is applied, and the GL journal posts into Dynamics under a reviewed policy. The month-end expense accrual becomes a scheduled step rather than a manual exercise.",
        category: "Accounts Payable",
      },
      {
        title: "AR collections against Dynamics customer data",
        timeSaved: "5 to 8 hrs/wk",
        description:
          "Overdue Dynamics invoices trigger a staged email and Teams sequence written in your brand voice, with contact escalation, partial-payment tracking and dispute flags against the customer record. The aged-debtors dashboard stays accurate without a weekly clean-up.",
        category: "Accounts Receivable",
      },
      {
        title: "Revenue recognition for project and subscription businesses",
        timeSaved: "1 to 2 days/month",
        description:
          "Project billings, milestone invoices and subscription fees are recognised against the correct period inside Dynamics, with deferred revenue schedules maintained and released automatically. Revenue balances reconcile to the deferred ledger each month under a reviewed policy.",
        category: "Accounts Receivable",
      },
      {
        title: "Bank and card reconciliation against Dynamics",
        timeSaved: "4 to 7 hrs/wk",
        description:
          "Bank and corporate card feeds reconcile against Dynamics entries using a rule library trained on your own matching history, with partial matches, timing differences and unmatched items routed to a review queue. Monthly reconciliation runs in minutes rather than days.",
        category: "Reconciliations",
      },
      {
        title: "Inter-company elimination in Dynamics F&O",
        timeSaved: "1 day/month",
        description:
          "Inter-company sales, charges and loan interest are matched across Dynamics legal entities, eliminations are posted under a standing policy, and unmatched balances surface as named exceptions in the month-end pack. The inter-company review becomes a ten-minute exercise.",
        category: "Month-end close",
      },
      {
        title: "Microsoft 365 approvals synced back to Dynamics",
        timeSaved: "4 to 6 hrs/wk",
        description:
          "Approvals that run in Outlook, Teams and SharePoint are captured, matched against the relevant Dynamics transaction, and the decision is written back with an audit trail. Finance stops chasing approvers in email, and approval history lives where the transaction lives.",
        category: "Operations",
      },
      {
        title: "Azure-hosted data layer for complex reporting",
        timeSaved: "2 to 3 days/month",
        description:
          "A structured copy of every Dynamics transaction, customer and dimension writes to an Azure database on a nightly schedule, with lineage and validation enforced at the pipeline layer. Power BI, finance models and executive dashboards pull from that database rather than direct from Dynamics.",
        category: "Reporting",
      },
      {
        title: "Power BI data modelling and dashboard automation",
        timeSaved: "3 to 5 days/month",
        description:
          "Power BI data models are built on a documented semantic layer, not ad-hoc imports, and scheduled refreshes reconcile back to Dynamics at every load. Board packs, management packs and operational dashboards run against a single trusted model, and new reports ship in days rather than weeks.",
        category: "Reporting",
      },
    ],
    whyPlatformMatters:
      "Microsoft Dynamics 365 covers two distinct platforms that Australian mid-market businesses run: Dynamics 365 Business Central in the upper-SMB and lower mid-market, and Dynamics 365 Finance and Operations in the full mid-market. Ordron's work spans both. Businesses running Dynamics are almost always Microsoft-stack companies, so the automation story has to fit inside the broader Microsoft ecosystem: Power Automate, Power BI, Azure, Outlook, Teams and SharePoint. That is actually an advantage because Dynamics-native automation is strong. The problem we see most often is that every component is installed and licensed, and none of them behave like a system.",
    commonPainPoints: [
      "We're running Business Central plus Power Automate plus Power BI and it all works in pieces. Nothing works as a system.",
      "Our Dynamics 365 F&O rollout was supposed to reduce manual work. Eighteen months in, the team is doing more manual work, not less.",
      "I know Power Automate can do half of this, but we don't have anyone internally who can build it properly.",
      "Our Power BI reports don't reconcile to Dynamics because the data model underneath was never built.",
    ],
    ordronApproach:
      "On Dynamics, Ordron's job is to make the Microsoft stack actually behave like a stack. Power Automate gets used for what it's good at, Power BI gets a proper data model underneath it, Azure hosts the controlled data layer, and Microsoft 365 picks up the approval and document workflow. API-first wherever Dynamics exposes one, which is most places. RPA is reserved for legacy bolt-ons that never got migrated. The result is the Microsoft ecosystem the CFO was sold two years ago, behaving the way it was supposed to.",
    relatedCaseStudySlugs: [
      "construction-ops-visibility",
      "industrial-mobile-procurement",
      "manufacturing-multi-system-flows",
    ],
    relatedGuideSlugs: [
      "accounts-payable-automation",
      "accounts-receivable-automation",
      "month-end-close-automation",
    ],
    searchTerms: [
      "dynamics 365 automation",
      "dynamics automation australia",
      "business central automation",
      "dynamics 365 finance and operations automation",
      "power automate finance",
      "power bi finance automation",
      "dynamics ap automation",
      "dynamics month-end automation",
      "dynamics power bi integration",
      "microsoft stack finance automation",
    ],
  },
  {
    slug: "hubdoc-automation",
    name: "Hubdoc",
    fullName: "Hubdoc",
    category: "document-capture",
    tagline:
      "Xero-tied bill and receipt capture that stops at ingestion. The automation opportunity is the coding, approval, multi-entity routing and archive queryability on top.",
    heroStat: {
      value: "10",
      label: "named automations shipped on Hubdoc",
    },
    automations: [
      {
        title: "Hubdoc-to-Xero auto-coding with supplier rule libraries",
        timeSaved: "6 to 10 hrs/wk",
        description:
          "Documents captured in Hubdoc are coded against a supplier rule library built from your own historical Xero bills, with GL code, tracking category and due date assigned before the bill lands in Xero. Finance reviews exceptions, not every line.",
        category: "Accounts Payable",
      },
      {
        title: "Field-staff receipt and supplier docket capture",
        timeSaved: "4 to 6 hrs/wk",
        description:
          "Drivers, field technicians and site staff submit receipts and supplier dockets from a mobile form, with GPS and job reference captured at source. The documents land in Hubdoc already tagged to the right entity, cost centre and job, not a shared inbox.",
        category: "Accounts Payable",
      },
      {
        title: "Supplier bill approval workflow post-Hubdoc capture",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Captured bills route through a staged approval flow with the supplier, amount, PO match and history in one view. Approvers act from a mobile link, and the approval writes back to the bill record before it posts to Xero.",
        category: "Accounts Payable",
      },
      {
        title: "Duplicate detection across Hubdoc submissions",
        timeSaved: "2 to 3 hrs/wk",
        description:
          "Incoming Hubdoc documents are fingerprinted against the captured archive, so the same invoice submitted twice (once to the shared inbox, once by the supplier portal) is flagged before it posts. The false-positive rate stays low because the fingerprint is tuned to your supplier mix.",
        category: "Accounts Payable",
      },
      {
        title: "OCR quality check between Hubdoc and Xero",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Hubdoc's extracted fields are validated against the underlying document image before the bill posts to Xero, with mismatches on supplier ABN, total, GST and date routed to a review queue. The 10 to 15 per cent Hubdoc misreads are caught at source, not in audit.",
        category: "Reconciliations",
      },
      {
        title: "Multi-entity Hubdoc routing",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Documents captured into a single Hubdoc instance are routed to the correct entity, trust or subsidiary based on ABN, supplier and line context, with ambiguous cases surfaced for a finance lead. The weekly sort between three or four entities becomes a review.",
        category: "Operations",
      },
      {
        title: "Exception routing for items that fail auto-coding",
        timeSaved: "2 to 4 hrs/wk",
        description:
          "Bills that fall outside the coding model's confidence threshold route to a named owner with the proposed coding, the historical context for the same supplier and the full document attached. Nobody is scrolling through Hubdoc trying to find what needs attention.",
        category: "Operations",
      },
      {
        title: "Hubdoc archive extraction and querying",
        timeSaved: "2 to 3 days on first build",
        description:
          "Three years of Hubdoc captured documents are mirrored into an Azure-hosted database with extracted fields, document images and links back to the Xero bill. Supplier spend, duplicate exposure and category trends become a query, not a scroll through folders.",
        category: "Reporting",
      },
      {
        title: "Hubdoc to Power BI reporting on volumes and exceptions",
        timeSaved: "1 to 2 days/month",
        description:
          "A live dashboard surfaces Hubdoc volumes by source, processing times, exception rates and auto-coding accuracy. Finance sees which suppliers need a rule update and which capture paths are leaking, instead of finding out at month-end.",
        category: "Reporting",
      },
      {
        title: "Email-to-Hubdoc integration improvements",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "The supplier email inbox that feeds Hubdoc is enhanced with pre-classification, so marketing noise, supplier queries and genuine bills are separated before Hubdoc ingests them. The capture workflow stops carrying the triage burden.",
        category: "Operations",
      },
    ],
    whyPlatformMatters:
      "Hubdoc is the Xero-owned capture layer sitting in front of a very large share of Australian finance teams. It does one thing well, which is pull supplier bills and receipts out of inboxes, scans and folders, and feed them into Xero. The automation opportunity is not in what Hubdoc already does. It is in what happens after Hubdoc: the coding, the approval, the multi-entity routing, the exception handling, and the three years of captured documents sitting in a Hubdoc archive nobody has ever queried. Most Hubdoc deployments use a fraction of what the wider AP workflow could be if the layers above capture were built properly.",
    commonPainPoints: [
      "Hubdoc grabs the bills but my team still codes every single one manually against our supplier rules.",
      "We've got three years of Hubdoc data and no way to query it for anything useful.",
      "Receipts from drivers go into Hubdoc and disappear. Nobody knows what's been processed until month-end.",
      "We run three entities through one Hubdoc and half the routing decisions are made manually because the rules never got built.",
    ],
    ordronApproach:
      "Ordron keeps Hubdoc in place for what it does well (ingestion and scanning) and builds the coding, approval and exception layers on top. OCR quality checks sit between Hubdoc and Xero to catch the 10 to 15 per cent of documents Hubdoc misreads. Historical Hubdoc data gets mirrored into the controlled database layer, so three years of captured bills become queryable data rather than a folder you click through. Multi-entity routing runs against explicit rules, not a team member's memory.",
    relatedCaseStudySlugs: [
      "logistics-ap-ocr",
      "freight-xero-ar",
      "industrial-mobile-procurement",
    ],
    relatedGuideSlugs: [
      "accounts-payable-automation",
      "month-end-close-automation",
    ],
    searchTerms: [
      "hubdoc automation",
      "hubdoc xero automation",
      "hubdoc coding automation",
      "hubdoc bill approval automation",
      "hubdoc multi-entity automation",
      "hubdoc receipt capture automation",
      "hubdoc exception automation",
      "hubdoc archive querying",
      "hubdoc power bi",
      "automate hubdoc",
    ],
  },
  {
    slug: "dext-automation",
    name: "Dext",
    fullName: "Dext (formerly ReceiptBank)",
    category: "document-capture",
    tagline:
      "Rich capture and extraction, but underused across practice portfolios. The automation opportunity is the per-client configuration work, and separating the exceptions that matter from the 90 per cent that do not.",
    heroStat: {
      value: "10",
      label: "named automations shipped on Dext",
    },
    automations: [
      {
        title: "Dext-to-ledger auto-coding with learned rules",
        timeSaved: "5 to 8 hrs/wk",
        description:
          "Captured bills are coded against a rule library learned from each client's own ledger history, so Xero or MYOB receive draft bills with supplier, GL code and tax treatment already applied. Finance reviews exceptions, not every line.",
        category: "Accounts Payable",
      },
      {
        title: "Multi-client Dext configuration for practices",
        timeSaved: "1 to 2 hrs per new client",
        description:
          "New client onboardings in Dext are provisioned from a template library keyed to the practice's service tier, entity type and ledger platform, so the twenty-step configuration walk becomes a parameterised run. The practice onboards a client in minutes, not a half-day.",
        category: "Operations",
      },
      {
        title: "Exception identification and routing",
        timeSaved: "4 to 6 hrs/wk",
        description:
          "The 500 bills captured this month are triaged automatically, and the 50 that actually need a human (unusual supplier, amount outside policy, tax mismatch) are surfaced with the context a senior needs to make a decision. The rest post without review.",
        category: "Accounts Payable",
      },
      {
        title: "Cross-client Dext data to Power BI for AP analytics",
        timeSaved: "1 to 2 days/month",
        description:
          "For practices running many clients, a single Power BI view surfaces AP volumes, supplier concentration, GST anomalies and late-capture exposure across the full client book. The principal sees portfolio risk, not one client at a time.",
        category: "Reporting",
      },
      {
        title: "Supplier bill approval workflow automation",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Dext-captured bills route through a staged approval chain that reflects the client's own policy (amount thresholds, category limits, named approvers), with approvals collected by mobile link and written back to Dext and the ledger together.",
        category: "Accounts Payable",
      },
      {
        title: "Duplicate detection across Dext uploads",
        timeSaved: "2 to 3 hrs/wk",
        description:
          "Documents submitted twice, once by the supplier portal and once by the client's shared inbox, are fingerprinted before they post. The duplicate payment exposure Dext alone does not catch is shut down at ingestion.",
        category: "Accounts Payable",
      },
      {
        title: "Receipt and expense categorisation automation",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Receipts and credit card slips captured through Dext are categorised against the right GL and policy, with card reconciliation applied before the journal posts. Month-end card clear-down becomes a review, not a reconstruction.",
        category: "Accounts Payable",
      },
      {
        title: "Dext to payment run with ABA file generation",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Approved bills captured in Dext feed directly into a controlled payment run, with ABA files generated, approved and routed to the bank portal under a two-person approval. The payment step stops being a manual export from Dext to a separate AP tool.",
        category: "Accounts Payable",
      },
      {
        title: "Dext archive querying and historical data extraction",
        timeSaved: "2 to 3 days on first build",
        description:
          "Years of Dext captured documents are mirrored into a queryable database, with images, extracted fields and links back to the original ledger transaction. Audit queries and compliance pulls become a SQL call, not a folder search.",
        category: "Reporting",
      },
      {
        title: "Compliance and audit trail reporting from Dext data",
        timeSaved: "1 to 2 days/quarter",
        description:
          "Compliance views, GST sampling, BAS support and end-of-year audit packs are compiled directly from clean Dext data, with source documents attached and approvers named on every transaction. External audits take days off because the evidence is already assembled.",
        category: "Reporting",
      },
    ],
    whyPlatformMatters:
      "Dext (formerly ReceiptBank) is the leading document capture platform for Australian accounting practices and SME finance teams, with richer extraction and deeper integration than Hubdoc. That extra capability is also what makes it underused: most deployments run on defaults, repeat the same configuration work for every new client, and leave finance leads reviewing every captured bill instead of only the outliers. In a practice with 40 clients on Dext, multiply every hour of repeated configuration by 40 to see the real cost. In a direct SME deployment, the cost is finance seniors spending their day clicking approve on bills that should have posted themselves.",
    commonPainPoints: [
      "Dext captures the data but we're still clicking approve on every invoice like nothing happened.",
      "Our practice has 40 clients on Dext. Every one needs the same configuration work and we do it from scratch each time.",
      "Dext tells me 500 supplier bills came in this month. I have no idea which 50 are actually outliers that need my attention.",
      "We've never used Dext's payment run export, so AP still runs through a separate ABA generation step in the bank portal.",
    ],
    ordronApproach:
      "Dext has solid API coverage, so Ordron builds API-first on top. For practices running across many client files, the biggest lift is eliminating the configuration that gets repeated for every new client onboarding, and the second biggest is isolating the cross-client exceptions that need practice attention. For direct SME users, the lift is intelligent exception handling so the finance lead is only looking at things that actually need attention, plus closing the loop into payment runs and compliance reporting.",
    relatedCaseStudySlugs: [
      "advisory-excel-to-enterprise",
      "manufacturing-invoice-hub",
      "logistics-ap-ocr",
    ],
    relatedGuideSlugs: [
      "accounts-payable-automation",
      "month-end-close-automation",
    ],
    searchTerms: [
      "dext automation",
      "dext receipt bank automation",
      "dext accounting practice automation",
      "dext multi-client automation",
      "dext ap automation",
      "dext exception automation",
      "dext aba automation",
      "dext power bi",
      "dext compliance automation",
      "automate dext",
    ],
  },
  {
    slug: "concur-automation",
    name: "SAP Concur",
    fullName: "SAP Concur",
    category: "expense",
    tagline:
      "Enterprise-grade expense platform running inside Australian mid-market businesses without a Concur admin. The automation opportunity is making Concur behave out of the box the way the licence implies.",
    heroStat: {
      value: "10",
      label: "named automations shipped on SAP Concur",
    },
    automations: [
      {
        title: "Policy exception triage automation",
        timeSaved: "8 to 12 hrs/wk",
        description:
          "Concur-flagged policy exceptions are triaged against your own approval history, so routine out-of-policy spend auto-approves and genuine outliers (unusual supplier, duplicate claim, spend pattern change) escalate to the right reviewer with context. The finance manager sees the 20 exceptions that matter, not the 780 that don't.",
        category: "Operations",
      },
      {
        title: "Concur to GL integration automation",
        timeSaved: "1 to 2 days/month",
        description:
          "Concur expense data posts to SAP, NetSuite or Dynamics on a scheduled pipeline rather than a month-end export-and-import, with dimension coding, tax treatment and period assignment applied on the way in. The month-end expense integration step stops being a manual job.",
        category: "Month-end close",
      },
      {
        title: "Approval workflow automation with escalation paths",
        timeSaved: "4 to 6 hrs/wk",
        description:
          "Approvals run through a structured chain with context, escalation timers and SLA tracking, so claims that sit unattended in Concur for three days get escalated automatically. The five-day claim cycle drops to hours.",
        category: "Accounts Payable",
      },
      {
        title: "Corporate card reconciliation against Concur entries",
        timeSaved: "4 to 6 hrs/wk",
        description:
          "Corporate card feeds match against Concur claim lines using a model tuned to your card mix, with unmatched items, duplicate claims and missing receipts surfaced before month-end. Card clear-down becomes a review.",
        category: "Reconciliations",
      },
      {
        title: "Multi-currency expense handling with automated FX",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Expenses submitted in foreign currency are captured at the transaction rate, reconciled against the card statement rate, and translated to reporting currency using your treasury rate, all without human intervention. Variance and exposure are surfaced monthly.",
        category: "Reconciliations",
      },
      {
        title: "Policy compliance reporting and analytics",
        timeSaved: "1 to 2 days/month",
        description:
          "Policy breach patterns, frequent offenders, category drift and merchant concentration are tracked in a live view, so the expense policy itself becomes a data conversation rather than an anecdote. Updates land based on the evidence.",
        category: "Reporting",
      },
      {
        title: "Receipt OCR quality check layered on top of Concur",
        timeSaved: "2 to 4 hrs/wk",
        description:
          "Concur's extracted fields are validated against the underlying receipt image before the claim posts, with mismatches on merchant, amount, GST or date flagged for review. The misreads Concur ships with stop propagating into the GL.",
        category: "Accounts Payable",
      },
      {
        title: "Travel and expense policy enforcement at booking",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Out-of-policy travel bookings, category limits and client-billable rules are enforced at the point of booking and capture, not at the approval step. The expense that would breach policy is flagged before it is incurred, not three weeks later in review.",
        category: "Operations",
      },
      {
        title: "Concur to Power BI reporting pipelines",
        timeSaved: "1 to 2 days/month",
        description:
          "Expense spend, policy compliance, approval cycle times and claim-to-reimbursement latency flow into a live Power BI dashboard the CFO can trust against Concur. Leadership sees the picture, not just a claim queue.",
        category: "Reporting",
      },
      {
        title: "Automated month-end expense accrual processing",
        timeSaved: "1 day/month",
        description:
          "Unprocessed expense claims at period end are accrued against the right GL and cost centre using historical run rate, with the accrual released and reconciled once the claim lands. Month-end stops waiting on a clean Concur queue.",
        category: "Month-end close",
      },
    ],
    whyPlatformMatters:
      "SAP Concur is the dominant enterprise expense management platform in Australia, used mostly by businesses over 200 staff where expense policy complexity justifies the licensing cost. The problem we see most often is that the mid-market businesses running Concur do not have a Concur admin to make the workflow actually behave. Policy exceptions default to human review at scale, GL posting runs as a manual export-and-import at month-end, approvals stall until someone chases them. Concur does expense capture well. The surrounding workflow, triage, approval routing and GL integration, is where the hours leak, and where automation earns back most of the licence cost.",
    commonPainPoints: [
      "Concur flags 800 policy exceptions a month. My finance manager spends two days reviewing the 780 that are fine and missing the 20 that matter.",
      "Getting Concur expense data into our general ledger is a manual export-and-import every month-end.",
      "Approval delays in Concur add five days to every expense claim because approvers ignore the email and only act when chased.",
      "Our corporate card reconciliation against Concur is a spreadsheet exercise, not a workflow.",
    ],
    ordronApproach:
      "Ordron's Concur work is connective: making Concur behave inside a broader finance stack it was not tuned to when the SI implemented it. Policy exception triage runs on your own historical data, so routine flags auto-approve and genuine outliers escalate with context. Concur to SAP, NetSuite or Dynamics GL posting runs as a scheduled integration rather than a manual export. Approval chains are escalation-aware, so five-day claim cycles become five hours. Receipt capture and card reconciliation are closed into a single loop.",
    relatedCaseStudySlugs: [
      "enterprise-ap-idu",
      "industrial-mobile-procurement",
      "manufacturing-multi-system-flows",
    ],
    relatedGuideSlugs: [
      "accounts-payable-automation",
      "month-end-close-automation",
    ],
    searchTerms: [
      "concur automation",
      "sap concur automation",
      "concur expense automation",
      "concur policy exception automation",
      "concur gl integration",
      "concur approval automation",
      "concur card reconciliation",
      "concur power bi",
      "concur multi-currency automation",
      "automate concur",
    ],
  },
  {
    slug: "excel-automation",
    name: "Excel",
    fullName: "Microsoft Excel",
    category: "finance-ops",
    tagline:
      "The shadow platform every finance team actually runs. The automation opportunity is either retiring the fragile high-stakes Excel or hardening the Excel that legitimately belongs in Excel.",
    heroStat: {
      value: "10",
      label: "named automations shipped on Excel",
    },
    automations: [
      {
        title: "Excel to Power BI migration for standardised reporting",
        timeSaved: "2 to 3 days/month",
        description:
          "Standardised finance reports currently rebuilt in Excel each month are migrated onto Power BI models backed by a single data source, so the same numbers land in the same place on schedule. Excel stays for the analysis layer, not the reporting layer.",
        category: "Reporting",
      },
      {
        title: "Board pack automation",
        timeSaved: "2 to 3 days/quarter",
        description:
          "The 40-tab quarterly board pack is rebuilt as a templated output from clean source data, so the person-risk on the one operator who knows how it fits together is removed. Commentary and narrative stay human, the numbers stop being manual.",
        category: "Reporting",
      },
      {
        title: "Month-end reconciliation model automation",
        timeSaved: "1 to 2 days/month",
        description:
          "Fragile Excel reconciliation models built years ago by a contractor are rebuilt as documented, audited workflows with the same logic and clearer evidence trails. The recon still runs, and if the contractor never comes back, the business still closes.",
        category: "Month-end close",
      },
      {
        title: "Excel model documentation and hardening",
        timeSaved: "1 to 2 days per model",
        description:
          "Excel models that legitimately belong in Excel (ad-hoc modelling, scenario work, exploratory analysis) get documented, validated, version-controlled and error-checked. The model stays in Excel but stops being the single point of failure.",
        category: "Operations",
      },
      {
        title: "Bank reconciliation model automation",
        timeSaved: "4 to 6 hrs/wk",
        description:
          "Bank reconciliation models running in Excel are rebuilt against a controlled database with learned matching rules, with confident matches auto-reconciling and exceptions routed to a review queue. The Friday-morning reconciliation session drops to an exception review.",
        category: "Reconciliations",
      },
      {
        title: "Intercompany reconciliation automation",
        timeSaved: "1 to 2 days/month",
        description:
          "Intercompany matrices currently maintained in an Excel workbook are run as scheduled reconciliations against the controlled ledger data, with imbalances surfaced by counterparty and period. The month-end intercompany reconciliation becomes a review, not an exercise.",
        category: "Reconciliations",
      },
      {
        title: "Revenue reporting automation",
        timeSaved: "2 to 3 days/month",
        description:
          "Revenue cuts currently reproduced in Excel (by segment, by customer, by tracking category) are automated as scheduled outputs that reconcile back to the ledger. The revenue-by-segment pivot stops being a manual rebuild each month.",
        category: "Reporting",
      },
      {
        title: "Variance analysis automation against budget data",
        timeSaved: "1 day/month",
        description:
          "Actual-to-budget variance work currently sitting in a spreadsheet is generated against standing thresholds, with commentary pre-populated in the phrasing your finance team already uses. Month-end variance review becomes a review, not a rebuild.",
        category: "Month-end close",
      },
      {
        title: "Data validation and error detection across Excel workflows",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Running Excel workflows get automated error detection: broken links, stale pivot sources, dimension mismatches, duplicate rows and off-pattern values are flagged before the file is sent on. The errors audit usually catches are caught at source.",
        category: "Operations",
      },
      {
        title: "Excel-to-ledger sync automation",
        timeSaved: "4 to 6 hrs/wk",
        description:
          "Excel-based journals, accrual schedules and adjustments are synced back into Xero, MYOB, NetSuite or Dynamics under a controlled workflow with approval and audit trail, rather than keyed in by hand. The manual loop between Excel and the ledger closes.",
        category: "Reconciliations",
      },
    ],
    whyPlatformMatters:
      "Excel isn't a platform, it's the shadow platform every Australian mid-market finance team actually runs on. The board pack lives in Excel. Month-end close lives in Excel. The reconciliations the ERP can't do live in Excel. Ordron's Excel work starts from a decision tree, not a migration bias: should this workflow be in Excel at all, and if it should, how do we make it safe enough to run the business against? The fragile high-stakes Excel gets retired into a controlled database with audit trails and validation. The Excel that genuinely belongs in Excel (ad-hoc modelling, exploratory analysis) gets hardened with documentation, version control and error detection but stays where it is.",
    commonPainPoints: [
      "Our board pack is a 40-tab Excel file that one person rebuilds from scratch every quarter. If she leaves, we're in serious trouble.",
      "The reconciliation model we use for month-end was built in 2019 by a contractor. Nobody alive understands how it works, but we run it every month.",
      "We're exporting from Xero to Excel to Power BI and back to Xero. Each step introduces errors and we don't catch them until audit.",
      "We know Excel is the wrong answer for half this work, but nobody has the time to move it anywhere else.",
    ],
    ordronApproach:
      "Ordron's Excel work starts with a decision: retire or harden. Fragile high-stakes Excel workflows (board pack, month-end reconciliation, intercompany matrices) move into the controlled database layer with proper audit trails, validation and automated reconciliation. Excel workflows that genuinely belong in Excel (ad-hoc modelling, scenario work, exploratory analysis) get hardened with documentation, validation rules, error detection and version control, but stay where they are. The end result is fewer Excel models running the business, and fewer Excel models blowing up in audit.",
    relatedCaseStudySlugs: [
      "advisory-excel-to-enterprise",
      "manufacturing-multi-system-flows",
      "enterprise-ap-idu",
    ],
    relatedGuideSlugs: [
      "accounts-payable-automation",
      "accounts-receivable-automation",
      "reconciliations-automation",
      "month-end-close-automation",
    ],
    searchTerms: [
      "excel automation",
      "excel automation australia",
      "excel board pack automation",
      "excel month-end automation",
      "excel reconciliation automation",
      "excel power bi migration",
      "excel to ledger automation",
      "excel model hardening",
      "excel variance analysis",
      "automate excel finance",
    ],
  },
  {
    slug: "bank-automation",
    name: "Bank feeds",
    fullName: "Australian bank portals and feeds",
    category: "finance-ops",
    tagline:
      "Not a single platform. The collection of Australian bank portals, where API coverage is thin and the automation opportunity is RPA with a clean data layer underneath.",
    heroStat: {
      value: "10",
      label: "named automations across AU bank portals and feeds",
    },
    automations: [
      {
        title: "Bank reconciliation automation with learned matching rules",
        timeSaved: "6 to 10 hrs/wk",
        description:
          "Statement lines match against ledger invoices, bills and journals using a model trained on your own reconciliation history across CBA, NAB, ANZ, Westpac or Macquarie feeds. Confident matches reconcile automatically, and anything under threshold routes to a review queue with the proposed match surfaced.",
        category: "Reconciliations",
      },
      {
        title: "Multi-entity bank reconciliation",
        timeSaved: "1 to 2 days/month",
        description:
          "One automation, multiple entities, multiple accounts. Reconciliation runs on a consolidated view with entity routing handled at the ledger-code layer, so the finance manager reviews exceptions across four entities in a single workflow rather than reconciling each entity by hand.",
        category: "Reconciliations",
      },
      {
        title: "ABA file generation from AP payment runs",
        timeSaved: "4 to 6 hrs/wk",
        description:
          "Approved supplier bills feed directly into a controlled payment run that produces a valid ABA file, ready for upload under a two-person approval. The manual handoff between AP and the bank portal disappears, and the payment evidence sits alongside the bill.",
        category: "Accounts Payable",
      },
      {
        title: "Bank portal RPA for statements and transaction data",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Where a bank does not expose an API, a bot logs into the portal on schedule, downloads the required statements, transaction data and remittance files, and lands them in the controlled data layer under a named service user. The treasurer stops waking up to a download chore.",
        category: "Operations",
      },
      {
        title: "Treasury reporting automation daily",
        timeSaved: "2 to 3 days/month",
        description:
          "Bank data from every operating account feeds a daily treasury report landing before 9 a.m., reconciled against the ledger and categorised by currency, entity and facility. The treasurer walks into a day with a real cash picture, not a question.",
        category: "Reporting",
      },
      {
        title: "Foreign bank portal automation for overseas accounts",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Overseas bank portals (US, UK, EU) are driven through RPA against a controlled session, with statement data, FX rates and cross-border transfers pulled into the same reconciliation layer as the domestic feeds. The AU finance team stops dreading the offshore bank statements.",
        category: "Operations",
      },
      {
        title: "Cash position automation and reporting",
        timeSaved: "1 to 2 days/month",
        description:
          "A live cash position rolls up across operating, tax, payroll, trust and facility accounts, with facility headroom, forward commitments and cover ratios surfaced in one view. Cash planning becomes forward-looking, not a reconstruction of last week.",
        category: "Reporting",
      },
      {
        title: "Automated bank transaction categorisation",
        timeSaved: "4 to 6 hrs/wk",
        description:
          "Transactions landing in the controlled data layer are categorised against your own historical patterns (BPAY, direct debits, PayID, merchant codes, cross-border wires), so the reconciliation step starts from clean data rather than raw feed. The unexplained line that took fifteen minutes to classify takes zero.",
        category: "Reconciliations",
      },
      {
        title: "Exception handling for unmatched transactions",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Unmatched transactions are routed to a review queue with suggested matches, historical context for the same counterparty, and the likely ledger account pre-populated. The weekly \"what is this?\" round on unmatched items becomes a review.",
        category: "Reconciliations",
      },
      {
        title: "Bank fraud and unusual transaction detection",
        timeSaved: "2 to 4 hrs/wk",
        description:
          "Transactions outside your own pattern (amount, counterparty, timing, geography) are flagged in real time to a named reviewer, with the supporting evidence attached. The exposure windows that manual review opens stay closed.",
        category: "Operations",
      },
    ],
    whyPlatformMatters:
      "Bank portals aren't a single platform, they're the collection of Australian bank interfaces every finance team uses: CBA, NAB, ANZ, Westpac, Macquarie, Bendigo, plus any foreign portals an overseas operation adds. Direct API access to Australian banks is still limited. CBA and NAB have the strongest coverage, the rest are patchy, and a large share of treasury, payments and statement handling still involves manual portal work. Bank-side data is also messier than the ledger-side data it is being matched against. Ordron's bank automation is therefore RPA-heavy, and pays extra attention to the reconciliation logic on top, because the underlying feeds carry more noise than the ledger does.",
    commonPainPoints: [
      "Bank reconciliation across our four entity accounts takes a day a week. It's the thing my finance manager hates most about the job.",
      "We're running manual ABA file generation for payment runs because none of our AP automation touches the bank portal.",
      "Treasury reporting is late every month because we're waiting on manual exports from three different bank portals.",
      "When a bank reference changes, we find out by failing a payment, not by a notification we can act on.",
    ],
    ordronApproach:
      "Bank automation pays for itself quickly because the hours lost are large and the processes are repetitive. Ordron uses the major banks' APIs where they exist (CBA and NAB have the broadest coverage; others are more limited) and runs RPA against portals for the rest. The controlled database layer matters extra here: bank data from different sources gets normalised in one place before any reconciliation logic runs against it, so the recon is not fighting format inconsistency on top of matching logic. Fraud and unusual-transaction detection sits on the same data.",
    relatedCaseStudySlugs: [
      "freight-xero-ar",
      "logistics-legacy-erp-rpa",
      "transport-ops-workflow",
    ],
    relatedGuideSlugs: [
      "reconciliations-automation",
      "month-end-close-automation",
    ],
    searchTerms: [
      "bank reconciliation automation",
      "australian bank automation",
      "aba file automation",
      "bank portal rpa",
      "treasury automation australia",
      "cash position automation",
      "cba nab anz westpac automation",
      "bank feed automation",
      "multi-entity bank reconciliation",
      "automate bank reconciliation",
    ],
  },
  {
    slug: "outlook-automation",
    name: "Outlook",
    fullName: "Microsoft Outlook",
    category: "finance-ops",
    tagline:
      "Not a finance platform, but where most finance workflows actually start. The automation opportunity is intercepting inbox-driven work and routing it into systems that can audit it.",
    heroStat: {
      value: "10",
      label: "named automations shipped on Outlook",
    },
    automations: [
      {
        title: "Inbox triage with AI classification",
        timeSaved: "6 to 10 hrs/wk",
        description:
          "Incoming emails to the shared finance inbox are classified into bills, supplier queries, client queries, internal noise and spam using a model trained on your own inbox history. Each class routes into the right downstream system or queue, and the human triage step disappears.",
        category: "Operations",
      },
      {
        title: "Email-to-bill extraction into Hubdoc, Dext or the ledger",
        timeSaved: "5 to 8 hrs/wk",
        description:
          "Supplier invoices attached to incoming emails are extracted, OCR'd and fed into Hubdoc, Dext or directly into the ledger with line-level coding applied before they post. The bill inbox stops being a clearing house.",
        category: "Accounts Payable",
      },
      {
        title: "Approval thread extraction into an audited system",
        timeSaved: "4 to 6 hrs/wk",
        description:
          "Approval threads running in Outlook are captured into an audited approval system, with the decision, the context and the attachments linked to the relevant transaction. 'If you can't find the email, the approval doesn't exist' stops being a compliance risk.",
        category: "Operations",
      },
      {
        title: "Supplier query response automation",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Common supplier queries (payment status, invoice receipt, remittance request) trigger an automated response drawn from the ledger, with escalation to a human for anything non-standard. Repeat queries stop landing on the same person four times.",
        category: "Operations",
      },
      {
        title: "Shared inbox SLA tracking and reporting",
        timeSaved: "1 to 2 days/month",
        description:
          "Every email into the shared inbox carries a classification, a routing decision and an SLA clock, so the finance manager sees which threads are aging, which categories breach SLA and which team member is carrying the load. The 40,000-email problem becomes a manageable queue.",
        category: "Reporting",
      },
      {
        title: "AR collections email automation with escalation",
        timeSaved: "4 to 6 hrs/wk",
        description:
          "Collections cadences run from the shared AR inbox with staged reminders, escalation logic and dispute capture, against the ledger's own aged-debtors state. Overdue invoices trigger correspondence in the firm's voice, and responses are captured back to the customer record.",
        category: "Accounts Receivable",
      },
      {
        title: "Contract and document extraction from attachments",
        timeSaved: "2 to 4 hrs/wk",
        description:
          "Contracts, engagement letters, compliance acknowledgements and supplier statements arriving as email attachments are extracted, classified, stored in SharePoint with the right metadata, and linked back to the client or supplier record. Nothing important is buried in an email thread.",
        category: "Operations",
      },
      {
        title: "Email-driven intercompany workflow automation",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Intercompany recharges, transfer requests and confirmations that run through email threads between entities are captured, matched and posted to the ledger with an audit trail. The cross-entity email chain becomes a workflow.",
        category: "Operations",
      },
      {
        title: "Outlook calendar integration with month-end close",
        timeSaved: "1 to 2 days/month",
        description:
          "The close checklist runs against the team's Outlook calendars with dependencies, sign-offs and blockers visible in one view. The 'who's on leave this close?' question and the 'did X happen before Y?' question stop eating a day.",
        category: "Month-end close",
      },
      {
        title: "Compliance and audit trail capture from email workflows",
        timeSaved: "1 to 2 days/quarter",
        description:
          "Compliance-relevant email correspondence (approvals, contract acknowledgements, regulator communication) is captured into a tamper-evident audit trail with the right metadata, so audits and regulator queries are answered from a structured store rather than an email search.",
        category: "Reporting",
      },
    ],
    whyPlatformMatters:
      "Outlook isn't a finance platform, but it's where most Australian finance workflows actually start. Supplier bills land in a shared inbox. Client invoicing queries come in by email. Approvals run through email threads instead of through the workflow tool that was supposed to handle them. Ordron's Outlook automation intercepts these email-driven workflows at the inbox and routes them into structured systems, so finance gets an audit trail and a process instead of a manual triage of whoever's in the inbox first. Microsoft Graph does most of the heavy lifting, with AI classification separating bills from queries from noise.",
    commonPainPoints: [
      "AP at ap@company.com gets 300 emails a week. One of the team has to sort them into real bills, supplier queries and noise.",
      "Approval threads live in Outlook. If you can't find the email, the approval doesn't exist.",
      "Our shared finance inbox has 40,000 emails in it. We have no idea what's actually been actioned.",
      "Our contract renewals and compliance deadlines live in email. When someone leaves, the knowledge goes with them.",
    ],
    ordronApproach:
      "Outlook automation uses Microsoft Graph API as the primary interface, falling back to RPA only for interface automation Graph does not expose. The goal is to extract the structured finance workflow out of email and route it into systems that can actually track it, while leaving genuine correspondence (supplier queries, client conversations) in the inbox where it belongs. AI classification does the heavy lifting on sorting what belongs where, and every extracted workflow writes back to Outlook as a linked record so nothing is lost.",
    relatedCaseStudySlugs: [
      "logistics-ap-ocr",
      "manufacturing-invoice-hub",
      "enterprise-ap-idu",
    ],
    relatedGuideSlugs: [
      "accounts-payable-automation",
      "accounts-receivable-automation",
    ],
    searchTerms: [
      "outlook automation",
      "microsoft graph finance automation",
      "shared finance inbox automation",
      "email bill extraction",
      "ap email triage automation",
      "outlook approval automation",
      "outlook compliance audit trail",
      "email to ledger automation",
      "outlook ar collections",
      "automate finance inbox",
    ],
  },
  {
    slug: "power-bi-automation",
    name: "Power BI",
    fullName: "Microsoft Power BI",
    category: "reporting",
    tagline:
      "Every mid-market finance team has Power BI. Very few trust the numbers. The automation opportunity lives underneath the dashboards, in the data model and the pipeline.",
    heroStat: {
      value: "10",
      label: "named automations shipped on Power BI",
    },
    automations: [
      {
        title: "Power BI data pipeline automation",
        timeSaved: "2 to 3 days/month",
        description:
          "ETL from Xero, MYOB, NetSuite, Dynamics and the bank feeds into a controlled Azure database runs on a scheduled pipeline with lineage, validation and alerting at every step. The pipeline that currently breaks monthly stops breaking, and stays understandable by whoever is on shift.",
        category: "Reporting",
      },
      {
        title: "Finance reporting automation across packs",
        timeSaved: "2 to 3 days/month",
        description:
          "The month-end pack, the board pack and operational dashboards run from a single semantic model with the same numbers, the same definitions and the same refresh schedule. The fortnightly 'why do these two reports disagree?' meeting disappears.",
        category: "Reporting",
      },
      {
        title: "Data model reconciliation and governance",
        timeSaved: "1 to 2 days/month",
        description:
          "Every Power BI measure reconciles back to the source ledger at every refresh, with reconciliation breaks surfaced before the dashboard updates. The 'three of four numbers don't reconcile to Xero' pattern stops at the model layer, not at audit.",
        category: "Reporting",
      },
      {
        title: "Automated variance analysis and commentary",
        timeSaved: "1 to 2 days/month",
        description:
          "Variance against budget, prior year and forecast is calculated against standing thresholds, with commentary generated in the phrasing your CFO already uses. The month-end commentary step becomes a review, not a rebuild.",
        category: "Month-end close",
      },
      {
        title: "Cross-platform Power BI modelling",
        timeSaved: "2 to 3 days/month",
        description:
          "Data from Xero, MYOB, NetSuite, Dynamics, Excel and bank feeds lands in a single model with dimension mapping, entity alignment and currency translation handled at the data layer. One view, multiple sources, consistent definitions.",
        category: "Reporting",
      },
      {
        title: "Real-time cash position reporting",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Cash balances across every entity, facility and currency refresh intraday into a live Power BI view the treasurer can trust. Forward commitments, drawdowns and headroom are visible without a Monday-morning rebuild.",
        category: "Reporting",
      },
      {
        title: "AR aging and collections dashboards with triggers",
        timeSaved: "4 to 6 hrs/wk",
        description:
          "Aged-debtors views drive collections automation directly: invoices crossing thresholds trigger staged reminder sequences, escalation to a named collector and dashboard-visible follow-up. The dashboard stops being passive.",
        category: "Accounts Receivable",
      },
      {
        title: "Budget vs actual automation with rolling re-forecast",
        timeSaved: "1 to 2 days/month",
        description:
          "Budget, forecast and actuals land in one model with consistent dimensioning, variances calculated automatically and commentary pre-populated. Rolling re-forecasts run on the same model rather than a side spreadsheet.",
        category: "Month-end close",
      },
      {
        title: "Compliance and audit dashboards",
        timeSaved: "1 to 2 days/quarter",
        description:
          "Compliance views (tax exposure, unusual journals, control breaks, missing approvals) run as always-on dashboards against the controlled data layer. Auditors start the year already having seen the control environment, not asking for it.",
        category: "Reporting",
      },
      {
        title: "Executive dashboard automation for CFO and board",
        timeSaved: "1 to 2 days/month",
        description:
          "A board-ready executive dashboard refreshes on schedule with the commentary, the sources and the drill-down path visible to the audience reading it. The CFO stops rebuilding the pack and starts presenting it.",
        category: "Reporting",
      },
    ],
    whyPlatformMatters:
      "Power BI is the dominant reporting platform for Australian mid-market finance teams, especially those on a Microsoft stack. Almost every mid-market business we work with already has it. Almost none are getting the value the licence implies. The gap between 'we have Power BI' and 'our finance reporting runs automatically on Power BI and I trust the numbers' is typically six to twelve months of structured data work: pipelines, data models, reconciliation governance. Ordron's Power BI automation is mostly about that structural layer. The visuals on top become easy once the layer underneath is sound.",
    commonPainPoints: [
      "Our Power BI dashboards look great until I ask a question. Then I find out three of the four numbers don't reconcile to Xero.",
      "We're paying a consultant $180 an hour to maintain Power BI data pipelines that break every month.",
      "Every new report in Power BI takes six weeks to deliver because the data model underneath wasn't built properly in the first place.",
      "Power BI is on, the data is feeding, and nobody on the finance team can explain why the number changed last week.",
    ],
    ordronApproach:
      "Power BI work starts underneath the visualisation layer. Ordron's first step is almost always to audit or rebuild the data model and data pipelines, because Power BI dashboards built on a bad data model compound errors faster than they surface them. The controlled Azure database becomes the single source of truth, Power BI pulls from there with lineage and validation enforced, and every report reconciles back to source systems at every refresh. The consultant bill for pipeline maintenance drops, and the CFO trusts the number.",
    relatedCaseStudySlugs: [
      "asset-mgmt-data-integration",
      "distribution-ondemand-reporting",
      "manufacturing-invoice-hub",
    ],
    relatedGuideSlugs: [
      "reconciliations-automation",
      "month-end-close-automation",
    ],
    searchTerms: [
      "power bi automation",
      "power bi finance automation",
      "power bi australia",
      "power bi data pipeline",
      "power bi board pack automation",
      "power bi reconciliation",
      "power bi cross-platform reporting",
      "power bi executive dashboard",
      "power bi variance analysis",
      "automate power bi finance",
    ],
  },
  {
    slug: "ignition-automation",
    name: "Ignition",
    fullName: "Ignition (formerly Practice Ignition)",
    category: "practice-management",
    tagline:
      "The proposal-to-invoice platform sitting above the ledger in most Australian accounting practices. A practice runs on Ignition, it does not post its month-end through it.",
    heroStat: {
      value: "10",
      label: "named automations shipped on Ignition",
    },
    automations: [
      {
        title: "Ignition to Xero or MYOB reconciliation automation",
        timeSaved: "4 to 6 hrs/wk",
        description:
          "Every Ignition invoice is matched against the corresponding Xero or MYOB invoice, with variances in amount, tax, client or period surfaced by client and engagement. The Friday morning reconciliation session becomes a short review of genuine exceptions.",
        category: "Reconciliations",
      },
      {
        title: "Recurring billing validation and exception handling",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Every scheduled recurring billing run is validated before it fires: active engagement, matching client record, correct amount, correct day. The handful of clients each month whose billing quietly fails to trigger are caught before they turn into a collections problem.",
        category: "Accounts Receivable",
      },
      {
        title: "Client data sync between Ignition and the ledger",
        timeSaved: "2 to 4 hrs/wk",
        description:
          "Client records, contact changes and engagement updates flow cleanly between Ignition and the accounting platform, so the client list in the ledger stays aligned with the client list in the practice. New clients do not appear twice, departed clients do not linger.",
        category: "Operations",
      },
      {
        title: "Proposal to engagement letter automation",
        timeSaved: "2 to 3 hrs/proposal",
        description:
          "Accepted proposals flow automatically into the engagement letter, workflow tool and project folder with the client, service lines and fee structure already carried across. Your team stops retyping the same engagement details into three systems.",
        category: "Operations",
      },
      {
        title: "Practice reporting on client profitability and lifetime value",
        timeSaved: "2 to 3 days/month",
        description:
          "Ignition engagement, fee and renewal data combines with accounting-platform service time to report true profitability, client lifetime value and service mix by partner. The insight the Ignition data has always held finally lands in a report the principal actually uses.",
        category: "Reporting",
      },
      {
        title: "Automated collection workflows for Ignition invoices",
        timeSaved: "3 to 5 hrs/wk",
        description:
          "Overdue Ignition invoices trigger a staged reminder sequence in the practice's voice, with payment options, firm contact details and the correct engagement context included. Partial payments and disputes are tracked against the invoice, so no client chase falls through the cracks.",
        category: "Accounts Receivable",
      },
      {
        title: "Multi-entity practice consolidation",
        timeSaved: "1 to 2 days/month",
        description:
          "For practices running more than one entity (trust structures, separate advisory and compliance entities, multiple offices), Ignition and ledger data consolidates into a single view of revenue, receivables and engagement status across the group.",
        category: "Month-end close",
      },
      {
        title: "Client onboarding workflow from Ignition acceptance to accounting setup",
        timeSaved: "1 to 2 hrs/new client",
        description:
          "When a client accepts their Ignition proposal, the onboarding steps fire automatically: ledger client created, engagement folder opened, compliance checks triggered, welcome communication sent. The principal is not relying on a manager to remember the seven steps for every new engagement.",
        category: "Operations",
      },
      {
        title: "Compliance and engagement letter tracking",
        timeSaved: "1 to 2 days/quarter",
        description:
          "Every engagement letter, scope variation and compliance acknowledgement is tracked against the client record with renewal dates and gaps surfaced ahead of time. The quarterly compliance sweep becomes a review rather than a search through folders.",
        category: "Operations",
      },
      {
        title: "Integration with CRM, project management and workflow tools",
        timeSaved: "4 to 6 hrs/wk",
        description:
          "Ignition feeds into HubSpot or the practice's CRM, the workflow tool (Karbon, FYI, Canopy) and the project management system, with client status, engagement stage and fee information kept consistent across all of them. The team stops updating the same client in four places.",
        category: "Operations",
      },
    ],
    whyPlatformMatters:
      "Ignition sits in a different category from the other platforms on this list because its primary user is an accounting practice running its own business, not a CFO running a finance function. The practice runs its proposals, engagement letters, recurring billing and client management through Ignition, and the accounting platform (Xero, MYOB, sometimes QuickBooks) picks up the invoice and the cash. The gap between the two is where the hours and the revenue leaks live: recurring billing that does not fire, reconciliation that takes a Friday morning, client lifetime value data that never reaches a report. Ignition has solid API coverage, so most of this is a build problem, not a platform problem.",
    commonPainPoints: [
      "Ignition creates the invoice, Xero picks up the invoice, and we spend Friday mornings reconciling the two instead of serving clients.",
      "Recurring billing is supposed to be automatic, but every month there are ten clients whose billing quietly did not fire and we only find out when the cash does not arrive.",
      "We have years of Ignition data on client profitability and lifetime value, and none of it makes it into reporting the principal actually uses.",
      "Engagement letter tracking across the client book lives in a spreadsheet one partner maintains, and nobody trusts it when the quarterly compliance sweep comes around.",
    ],
    ordronApproach:
      "Ordron treats Ignition as the client-facing workflow layer and the accounting platform as the ledger, and builds the automation in the space between them. API-first because Ignition's coverage is strong, with reconciliation, recurring billing validation and practice reporting running through the controlled database layer so the principal has a single source of truth for the practice's own numbers. Exception handling is tuned for practice scale, not corporate scale: the principal reviews what matters, not what does not.",
    relatedCaseStudySlugs: [
      "advisory-excel-to-enterprise",
      "asset-mgmt-data-integration",
      "pe-analytics-ai-ready",
    ],
    relatedGuideSlugs: [
      "accounts-payable-automation",
      "accounts-receivable-automation",
      "reconciliations-automation",
      "month-end-close-automation",
    ],
    searchTerms: [
      "ignition automation",
      "ignition practice automation",
      "practice ignition automation",
      "ignition xero automation",
      "ignition myob automation",
      "ignition recurring billing automation",
      "accounting practice automation australia",
      "practice management automation",
      "automate ignition",
      "ignition reconciliation automation",
    ],
  },
];

export function getPlatformHubBySlug(slug: string): PlatformHub | undefined {
  return platformHubs.find((p) => p.slug === slug);
}
