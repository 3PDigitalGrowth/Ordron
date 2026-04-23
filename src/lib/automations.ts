/**
 * Canonical catalogue of the 130 automations Ordron has built across
 * the 13 finance platforms. Ten entries per platform, sourced from the
 * Ordron services document.
 *
 * Consumed by:
 *   - `/guide/automations` (the cross-cutting hub)
 *   - future `/platforms/<platform-slug>/<automation-slug>` detail pages
 *   - any future per-platform automation checklists
 *
 * Slugs are locked in the shape `<platform-slug-root>-<automation-root>`
 * and should not change once the detail pages ship.
 */

import { platforms, type Platform } from "./platforms";

/**
 * The finance function taxonomy. A single automation belongs to exactly
 * one function so the `/guide/automations` filter logic stays clean.
 * When an automation touches two (e.g. capture + coding), we assign
 * the function that best describes the outcome the finance team cares
 * about.
 */
export type FinanceFunction =
  | "ap"
  | "ar"
  | "reconciliation"
  | "close"
  | "reporting"
  | "expenses"
  | "exceptions"
  | "payments"
  | "sync"
  | "inbox";

export type FinanceFunctionMeta = {
  id: FinanceFunction;
  label: string;
  /** Short descriptor for the filter legend. */
  blurb: string;
};

export const financeFunctions: FinanceFunctionMeta[] = [
  {
    id: "ap",
    label: "Accounts payable",
    blurb: "Invoice capture, coding, posting, approvals.",
  },
  {
    id: "ar",
    label: "Accounts receivable",
    blurb: "Invoice generation, dunning, cash application.",
  },
  {
    id: "reconciliation",
    label: "Reconciliation",
    blurb: "Bank, GL, intercompany, statement matching.",
  },
  {
    id: "close",
    label: "Month-end close",
    blurb: "Journals, checklists, close orchestration.",
  },
  {
    id: "reporting",
    label: "Reporting",
    blurb: "Dashboards, refresh, scheduled distribution.",
  },
  {
    id: "expenses",
    label: "Expenses",
    blurb: "Receipts, claims, policy checks, reimbursement.",
  },
  {
    id: "exceptions",
    label: "Exceptions",
    blurb: "Human-in-the-loop queues and review routing.",
  },
  {
    id: "payments",
    label: "Payments and treasury",
    blurb: "Payment runs, remittance, cash position.",
  },
  {
    id: "sync",
    label: "Integration and sync",
    blurb: "Platform-to-platform data flow and pipelines.",
  },
  {
    id: "inbox",
    label: "Inbox and approvals",
    blurb: "Email triage, structured approvals, escalation.",
  },
];

export const financeFunctionMap: Record<FinanceFunction, FinanceFunctionMeta> =
  Object.fromEntries(financeFunctions.map((f) => [f.id, f])) as Record<
    FinanceFunction,
    FinanceFunctionMeta
  >;

/** Typical hours returned per week by a single automation, from live engagements. */
export type HoursBand = "2-5" | "5-10" | "10-20" | "20+";

export type Automation = {
  /** Stable id, e.g. "xero-01". */
  id: string;
  /** Detail slug, joined with the platform to build the URL. */
  slug: string;
  /** References `Platform.slug` in `platforms.ts`. */
  platformSlug: Platform["slug"];
  /** Short title from the services document, lightly edited for Ordron voice. */
  title: string;
  /** One sentence describing the outcome the finance team gets. */
  summary: string;
  function: FinanceFunction;
  hoursBand: HoursBand;
  /**
   * The URL the hub card links to.
   *
   * Today every card points at the parent platform hub because the
   * 130 detail pages have not been built yet. The canonical future URL
   * is `/platforms/<platformSlug>/<slug>` and can be swapped in a single
   * place once those pages ship.
   */
  detailHref: string;
};

/**
 * The 130 automations, ten per platform.
 *
 * Titles and summaries are editorial, not marketing. Keep them CFO-literate,
 * short, and in Ordron voice: Australian English, no em dashes, no banned
 * phrases, numbers over adjectives.
 */
const rawAutomations: Array<Omit<Automation, "detailHref">> = [
  // Xero
  {
    id: "xero-01",
    platformSlug: "xero-automation",
    slug: "invoice-email-capture",
    title: "Capture invoices from email into Xero bills",
    summary:
      "Shared inbox ingestion, OCR, supplier matching, and a draft bill in Xero within minutes of receipt.",
    function: "ap",
    hoursBand: "10-20",
  },
  {
    id: "xero-02",
    platformSlug: "xero-automation",
    slug: "bill-coding-rules",
    title: "Automate bill coding and GL allocation",
    summary:
      "Supplier and category rules drive GL coding on capture, with a confidence threshold before the bill posts.",
    function: "ap",
    hoursBand: "5-10",
  },
  {
    id: "xero-03",
    platformSlug: "xero-automation",
    slug: "bank-reconciliation-matching",
    title: "Auto-match bank transactions to bills and invoices",
    summary:
      "Rules-based matching with an exception queue for anything that does not reconcile cleanly.",
    function: "reconciliation",
    hoursBand: "10-20",
  },
  {
    id: "xero-04",
    platformSlug: "xero-automation",
    slug: "ar-invoice-generation",
    title: "Generate and send AR invoices on schedule",
    summary:
      "Scheduled AR runs pull from source records, produce invoices, and send them through the correct channel per client.",
    function: "ar",
    hoursBand: "5-10",
  },
  {
    id: "xero-05",
    platformSlug: "xero-automation",
    slug: "debtor-reminder-sequences",
    title: "Automated debtor reminders by overdue age",
    summary:
      "Aged debt drives a tiered reminder sequence, with internal escalation before anything gets sent externally.",
    function: "ar",
    hoursBand: "5-10",
  },
  {
    id: "xero-06",
    platformSlug: "xero-automation",
    slug: "payment-cash-application",
    title: "Match payments and apply cash to receivables",
    summary:
      "Remittance parsing, payer identification and application across split payments and part receipts.",
    function: "payments",
    hoursBand: "5-10",
  },
  {
    id: "xero-07",
    platformSlug: "xero-automation",
    slug: "month-end-journals",
    title: "Prepare and post month-end journals",
    summary:
      "Recurring accrual, prepayment and depreciation journals prepared, reviewed and posted against a controller checklist.",
    function: "close",
    hoursBand: "5-10",
  },
  {
    id: "xero-08",
    platformSlug: "xero-automation",
    slug: "exception-queue",
    title: "Exception queue for unmatched transactions",
    summary:
      "A single review queue for items the rules cannot resolve, with audit trail and assignment to an owner.",
    function: "exceptions",
    hoursBand: "2-5",
  },
  {
    id: "xero-09",
    platformSlug: "xero-automation",
    slug: "report-refresh",
    title: "Refresh reports and export to dashboards",
    summary:
      "Scheduled pulls from Xero into your reporting layer, with variance flags before the pack goes out.",
    function: "reporting",
    hoursBand: "2-5",
  },
  {
    id: "xero-10",
    platformSlug: "xero-automation",
    slug: "sync-to-external",
    title: "Sync Xero data to external tools",
    summary:
      "Controlled pipelines from Xero to Power BI, spreadsheets or a central database, refreshed on a schedule.",
    function: "sync",
    hoursBand: "2-5",
  },

  // MYOB
  {
    id: "myob-01",
    platformSlug: "myob-automation",
    slug: "document-to-system",
    title: "Document-to-system automation for bills",
    summary:
      "Email and scan capture, extraction, validation and draft bill creation into MYOB without hand-keying.",
    function: "ap",
    hoursBand: "10-20",
  },
  {
    id: "myob-02",
    platformSlug: "myob-automation",
    slug: "payroll-timesheet-handoff",
    title: "Payroll handoff from timesheets into MYOB",
    summary:
      "Approved time and HR data pushed into MYOB payroll with validation before the pay run.",
    function: "sync",
    hoursBand: "5-10",
  },
  {
    id: "myob-03",
    platformSlug: "myob-automation",
    slug: "bank-reconciliation",
    title: "Automated bank reconciliation with exceptions",
    summary:
      "Rule-based matching, with unresolved items routed into a named review queue rather than an email thread.",
    function: "reconciliation",
    hoursBand: "10-20",
  },
  {
    id: "myob-04",
    platformSlug: "myob-automation",
    slug: "report-preparation",
    title: "Prepare and refresh recurring reports",
    summary:
      "MYOB data pulled on schedule into templates, with variance commentary triggers before distribution.",
    function: "reporting",
    hoursBand: "2-5",
  },
  {
    id: "myob-05",
    platformSlug: "myob-automation",
    slug: "sync-adjacent-tools",
    title: "Sync MYOB with CRM, project and spreadsheet tools",
    summary:
      "Controlled pipelines replacing copy-paste between MYOB and the adjacent systems your team already runs.",
    function: "sync",
    hoursBand: "2-5",
  },
  {
    id: "myob-06",
    platformSlug: "myob-automation",
    slug: "ap-approval-routing",
    title: "AP approval routing and escalation",
    summary:
      "Bills above threshold routed to the correct approver with SLA escalation if action stalls.",
    function: "ap",
    hoursBand: "5-10",
  },
  {
    id: "myob-07",
    platformSlug: "myob-automation",
    slug: "gl-coding-rules",
    title: "Automated GL coding from supplier rules",
    summary:
      "Coding applied on capture using supplier and category rules, with human review on low-confidence items.",
    function: "ap",
    hoursBand: "5-10",
  },
  {
    id: "myob-08",
    platformSlug: "myob-automation",
    slug: "ar-overdue-sequences",
    title: "Overdue AR reminder and follow-up sequences",
    summary:
      "Tiered follow-ups by aging bucket, with a hold on reminders when a payment plan or dispute is logged.",
    function: "ar",
    hoursBand: "5-10",
  },
  {
    id: "myob-09",
    platformSlug: "myob-automation",
    slug: "month-end-close-checklist",
    title: "Month-end close checklist and journal support",
    summary:
      "Orchestrated close tasks, journal preparation and status tracking against a two-day close target.",
    function: "close",
    hoursBand: "5-10",
  },
  {
    id: "myob-10",
    platformSlug: "myob-automation",
    slug: "supplier-statement-reconciliation",
    title: "Reconcile supplier statements against MYOB",
    summary:
      "Statement ingestion, matching against posted bills, and a clear variance report before payment run.",
    function: "reconciliation",
    hoursBand: "2-5",
  },

  // QuickBooks
  {
    id: "quickbooks-01",
    platformSlug: "quickbooks-automation",
    slug: "timesheet-to-finance",
    title: "Timesheet-to-finance pipeline",
    summary:
      "Approved hours from QuickBooks Time flow into billing and payroll with no re-keying.",
    function: "sync",
    hoursBand: "5-10",
  },
  {
    id: "quickbooks-02",
    platformSlug: "quickbooks-automation",
    slug: "cost-coding-from-time",
    title: "Cost coding from time entries to GL",
    summary:
      "Time entries mapped to GL categories using project and activity rules on the way in.",
    function: "ap",
    hoursBand: "2-5",
  },
  {
    id: "quickbooks-03",
    platformSlug: "quickbooks-automation",
    slug: "invoice-from-timesheets",
    title: "Generate invoices from approved timesheets",
    summary:
      "Project milestones and approved time produce client invoices without a manual compile step.",
    function: "ar",
    hoursBand: "5-10",
  },
  {
    id: "quickbooks-04",
    platformSlug: "quickbooks-automation",
    slug: "payroll-validated-inputs",
    title: "Validated payroll inputs from QuickBooks Time",
    summary:
      "Pay run inputs checked against leave balances, rates and cost centres before they hit payroll.",
    function: "sync",
    hoursBand: "2-5",
  },
  {
    id: "quickbooks-05",
    platformSlug: "quickbooks-automation",
    slug: "sync-to-reporting",
    title: "Sync QuickBooks data to reporting tools",
    summary:
      "Scheduled pipelines into Power BI, Tableau or a central database, replacing manual exports.",
    function: "sync",
    hoursBand: "2-5",
  },
  {
    id: "quickbooks-06",
    platformSlug: "quickbooks-automation",
    slug: "ap-invoice-capture",
    title: "AP invoice capture from email and portal",
    summary:
      "Supplier invoices from email and supplier portals captured, coded and drafted as bills.",
    function: "ap",
    hoursBand: "10-20",
  },
  {
    id: "quickbooks-07",
    platformSlug: "quickbooks-automation",
    slug: "bank-reconciliation-queue",
    title: "Bank reconciliation with exception queue",
    summary:
      "Rule-based matching with anything unresolved routed into a named review queue with an owner.",
    function: "reconciliation",
    hoursBand: "5-10",
  },
  {
    id: "quickbooks-08",
    platformSlug: "quickbooks-automation",
    slug: "expense-receipt-capture",
    title: "Capture and code employee expense receipts",
    summary:
      "Employee submissions captured, coded against policy, and posted without an approvals backlog.",
    function: "expenses",
    hoursBand: "2-5",
  },
  {
    id: "quickbooks-09",
    platformSlug: "quickbooks-automation",
    slug: "ar-collections-followups",
    title: "AR reminder and collections sequences",
    summary:
      "Aged debt drives tiered follow-ups with internal escalation before anything external goes out.",
    function: "ar",
    hoursBand: "5-10",
  },
  {
    id: "quickbooks-10",
    platformSlug: "quickbooks-automation",
    slug: "operational-reporting-refresh",
    title: "Monthly operational reporting refresh",
    summary:
      "QuickBooks data pulled on schedule into your management pack with variance flags before sign-off.",
    function: "reporting",
    hoursBand: "2-5",
  },

  // NetSuite
  {
    id: "netsuite-01",
    platformSlug: "netsuite-automation",
    slug: "ap-capture-and-post",
    title: "AP invoice capture, extraction and posting",
    summary:
      "Invoices from email, portals and scanned PDFs captured, validated and posted into NetSuite AP.",
    function: "ap",
    hoursBand: "20+",
  },
  {
    id: "netsuite-02",
    platformSlug: "netsuite-automation",
    slug: "multi-step-approvals",
    title: "Multi-step approval routing for bills and POs",
    summary:
      "Approval paths by cost centre, amount and category, with SLA escalation if an approver goes quiet.",
    function: "ap",
    hoursBand: "5-10",
  },
  {
    id: "netsuite-03",
    platformSlug: "netsuite-automation",
    slug: "gl-coding-and-matching",
    title: "Automated GL coding and supplier matching",
    summary:
      "Rules engine applied on capture, with a confidence threshold before coded items post.",
    function: "ap",
    hoursBand: "10-20",
  },
  {
    id: "netsuite-04",
    platformSlug: "netsuite-automation",
    slug: "bank-statement-matching",
    title: "Bank and statement-to-ledger matching",
    summary:
      "Statement ingestion, matching against NetSuite activity, and exceptions routed for review.",
    function: "reconciliation",
    hoursBand: "10-20",
  },
  {
    id: "netsuite-05",
    platformSlug: "netsuite-automation",
    slug: "ap-exception-queue",
    title: "Exception queue for AP items requiring review",
    summary:
      "One named review queue for held bills, with an audit trail from capture through to posting.",
    function: "exceptions",
    hoursBand: "5-10",
  },
  {
    id: "netsuite-06",
    platformSlug: "netsuite-automation",
    slug: "sync-to-reporting",
    title: "Sync NetSuite data to Power BI and dashboards",
    summary:
      "Controlled pipelines from NetSuite into your reporting layer, refreshed on schedule with row counts.",
    function: "sync",
    hoursBand: "5-10",
  },
  {
    id: "netsuite-07",
    platformSlug: "netsuite-automation",
    slug: "close-orchestration",
    title: "Month-end close task orchestration",
    summary:
      "Close tasks run on a schedule with dependencies, sign-offs and journal support baked in.",
    function: "close",
    hoursBand: "10-20",
  },
  {
    id: "netsuite-08",
    platformSlug: "netsuite-automation",
    slug: "intercompany-processing",
    title: "Intercompany transaction processing and reconciliation",
    summary:
      "Intercompany postings generated on both sides, reconciled and variance-flagged before close.",
    function: "reconciliation",
    hoursBand: "5-10",
  },
  {
    id: "netsuite-09",
    platformSlug: "netsuite-automation",
    slug: "ar-dunning",
    title: "Automated AR dunning by aging bucket",
    summary:
      "Tiered reminders by aging, with disputes and payment plans held out of the sequence.",
    function: "ar",
    hoursBand: "5-10",
  },
  {
    id: "netsuite-10",
    platformSlug: "netsuite-automation",
    slug: "ap-ar-dashboards",
    title: "AP and AR visibility dashboards on NetSuite",
    summary:
      "Live dashboards on held bills, aged debt, supplier risk and close progress, fed from NetSuite.",
    function: "reporting",
    hoursBand: "2-5",
  },

  // SAP
  {
    id: "sap-01",
    platformSlug: "sap-automation",
    slug: "rpa-invoice-entry",
    title: "RPA invoice extraction and entry into SAP",
    summary:
      "Where the API does not reach, attended and unattended RPA drives SAP transaction screens under audit.",
    function: "ap",
    hoursBand: "20+",
  },
  {
    id: "sap-02",
    platformSlug: "sap-automation",
    slug: "po-invoice-approvals",
    title: "Approval workflows for POs, invoices and journals",
    summary:
      "Structured routing with SLA escalation, auditable against SAP approval rules.",
    function: "ap",
    hoursBand: "5-10",
  },
  {
    id: "sap-03",
    platformSlug: "sap-automation",
    slug: "data-extraction-reporting",
    title: "Extract SAP data for downstream reporting",
    summary:
      "Controlled extracts into Power BI, Tableau or a reporting mart, replacing manual SAP exports.",
    function: "reporting",
    hoursBand: "5-10",
  },
  {
    id: "sap-04",
    platformSlug: "sap-automation",
    slug: "reconciliation-support",
    title: "Bank, intercompany and GL reconciliation support",
    summary:
      "Matching rules and exception queues across bank, intercompany and GL reconciliations.",
    function: "reconciliation",
    hoursBand: "10-20",
  },
  {
    id: "sap-05",
    platformSlug: "sap-automation",
    slug: "blocked-invoice-handling",
    title: "Exception handling for blocked invoices",
    summary:
      "Clear escalation for blocked invoices, with root cause captured for supplier master updates.",
    function: "exceptions",
    hoursBand: "2-5",
  },
  {
    id: "sap-06",
    platformSlug: "sap-automation",
    slug: "automated-report-generation",
    title: "Automated report generation from SAP exports",
    summary:
      "Scheduled pulls from SAP into a reporting template, distributed with variance commentary.",
    function: "reporting",
    hoursBand: "2-5",
  },
  {
    id: "sap-07",
    platformSlug: "sap-automation",
    slug: "three-way-match",
    title: "Three-way match automation",
    summary:
      "Goods receipt, PO and invoice matched on the fly with exceptions routed for a named owner.",
    function: "ap",
    hoursBand: "10-20",
  },
  {
    id: "sap-08",
    platformSlug: "sap-automation",
    slug: "gl-coding-rpa",
    title: "GL coding rules engine via RPA",
    summary:
      "Coding applied to incoming documents before they hit SAP, with review on low-confidence matches.",
    function: "ap",
    hoursBand: "5-10",
  },
  {
    id: "sap-09",
    platformSlug: "sap-automation",
    slug: "month-end-journals",
    title: "Month-end journal creation and posting",
    summary:
      "Recurring and accrual journals prepared, reviewed and posted against a controller checklist.",
    function: "close",
    hoursBand: "5-10",
  },
  {
    id: "sap-10",
    platformSlug: "sap-automation",
    slug: "sap-external-sync",
    title: "Sync SAP data to BI, CRM and operations tools",
    summary:
      "Controlled pipelines between SAP and adjacent systems, replacing file-based handovers.",
    function: "sync",
    hoursBand: "5-10",
  },

  // Dynamics 365
  {
    id: "dynamics-01",
    platformSlug: "dynamics-automation",
    slug: "ap-ingestion",
    title: "Invoice ingestion into Dynamics AP",
    summary:
      "Document capture, extraction and posting into the Dynamics AP module with supplier matching.",
    function: "ap",
    hoursBand: "10-20",
  },
  {
    id: "dynamics-02",
    platformSlug: "dynamics-automation",
    slug: "approval-routing",
    title: "Approval routing for invoices and expenses",
    summary:
      "Approval paths by cost centre, amount and category, with escalation on breach of SLA.",
    function: "ap",
    hoursBand: "5-10",
  },
  {
    id: "dynamics-03",
    platformSlug: "dynamics-automation",
    slug: "bank-reconciliation",
    title: "Bank reconciliation and exception handling",
    summary:
      "Rule-based matching with a named review queue for anything that does not reconcile cleanly.",
    function: "reconciliation",
    hoursBand: "5-10",
  },
  {
    id: "dynamics-04",
    platformSlug: "dynamics-automation",
    slug: "ar-debtor-followup",
    title: "AR invoice generation and debtor follow-up",
    summary:
      "Scheduled AR runs and tiered reminder sequences, with disputes held out of the flow.",
    function: "ar",
    hoursBand: "5-10",
  },
  {
    id: "dynamics-05",
    platformSlug: "dynamics-automation",
    slug: "gl-coding-validation",
    title: "GL coding and validation on document entry",
    summary:
      "Coding rules applied on capture with a confidence threshold before anything posts.",
    function: "ap",
    hoursBand: "5-10",
  },
  {
    id: "dynamics-06",
    platformSlug: "dynamics-automation",
    slug: "power-bi-sync",
    title: "Sync Dynamics data to Power BI dashboards",
    summary:
      "Controlled pipelines from Dynamics into Power BI, refreshed on schedule with row-count checks.",
    function: "sync",
    hoursBand: "2-5",
  },
  {
    id: "dynamics-07",
    platformSlug: "dynamics-automation",
    slug: "close-checklist",
    title: "Month-end close checklist automation",
    summary:
      "Close tasks orchestrated against a two-day target with dependencies and sign-offs visible.",
    function: "close",
    hoursBand: "5-10",
  },
  {
    id: "dynamics-08",
    platformSlug: "dynamics-automation",
    slug: "intercompany-reconciliation",
    title: "Intercompany transaction and reconciliation",
    summary:
      "Postings generated on both sides, reconciled, and variance-flagged before month-end lock.",
    function: "reconciliation",
    hoursBand: "5-10",
  },
  {
    id: "dynamics-09",
    platformSlug: "dynamics-automation",
    slug: "expense-reimbursement",
    title: "Expense claim processing and reimbursement triggers",
    summary:
      "Claims validated against policy, coded, and pushed to reimbursement once approved.",
    function: "expenses",
    hoursBand: "2-5",
  },
  {
    id: "dynamics-10",
    platformSlug: "dynamics-automation",
    slug: "finance-visibility-dashboards",
    title: "Custom finance visibility dashboards",
    summary:
      "Live views across AP, AR, close progress and cash, built over Dynamics data.",
    function: "reporting",
    hoursBand: "2-5",
  },

  // Hubdoc
  {
    id: "hubdoc-01",
    platformSlug: "hubdoc-automation",
    slug: "ocr-validation-layer",
    title: "Validation layer for OCR output",
    summary:
      "Low-confidence extractions flagged before they leave Hubdoc, with a single review queue.",
    function: "exceptions",
    hoursBand: "2-5",
  },
  {
    id: "hubdoc-02",
    platformSlug: "hubdoc-automation",
    slug: "exception-routing",
    title: "Exception routing for misread documents",
    summary:
      "Misreads and incomplete documents routed to a named owner with clear next-steps.",
    function: "exceptions",
    hoursBand: "2-5",
  },
  {
    id: "hubdoc-03",
    platformSlug: "hubdoc-automation",
    slug: "field-level-checks",
    title: "Field checks against supplier master data",
    summary:
      "ABN, bank and address cross-checked against supplier master before anything posts downstream.",
    function: "ap",
    hoursBand: "2-5",
  },
  {
    id: "hubdoc-04",
    platformSlug: "hubdoc-automation",
    slug: "downstream-posting",
    title: "Downstream posting to Xero or MYOB on validation",
    summary:
      "Documents that pass validation post automatically to Xero or MYOB, with an audit trail.",
    function: "sync",
    hoursBand: "5-10",
  },
  {
    id: "hubdoc-05",
    platformSlug: "hubdoc-automation",
    slug: "review-queue",
    title: "Human-in-the-loop review queue",
    summary:
      "Flagged documents held in a structured review queue, not in an email thread.",
    function: "exceptions",
    hoursBand: "2-5",
  },
  {
    id: "hubdoc-06",
    platformSlug: "hubdoc-automation",
    slug: "supplier-coding-rules",
    title: "Supplier-specific coding rules post-capture",
    summary:
      "Per-supplier GL and tax coding applied automatically after capture, before posting.",
    function: "ap",
    hoursBand: "2-5",
  },
  {
    id: "hubdoc-07",
    platformSlug: "hubdoc-automation",
    slug: "duplicate-detection",
    title: "Duplicate invoice detection before posting",
    summary:
      "Invoices checked against prior bills on invoice number, supplier and amount before they post.",
    function: "ap",
    hoursBand: "2-5",
  },
  {
    id: "hubdoc-08",
    platformSlug: "hubdoc-automation",
    slug: "approval-threshold",
    title: "Approval routing above threshold value",
    summary:
      "Documents above a configurable value routed to the correct approver before downstream posting.",
    function: "ap",
    hoursBand: "2-5",
  },
  {
    id: "hubdoc-09",
    platformSlug: "hubdoc-automation",
    slug: "audit-trail",
    title: "Audit trail from capture to ledger entry",
    summary:
      "Every document linked from capture through to the ledger entry it created.",
    function: "exceptions",
    hoursBand: "2-5",
  },
  {
    id: "hubdoc-10",
    platformSlug: "hubdoc-automation",
    slug: "monthly-capture-reconciliation",
    title: "Reconcile documents captured against bills posted",
    summary:
      "A monthly control check showing captured vs posted, flagging anything stuck in between.",
    function: "reconciliation",
    hoursBand: "2-5",
  },

  // Dext
  {
    id: "dext-01",
    platformSlug: "dext-automation",
    slug: "coding-validation",
    title: "Validate Dext coding against GL rules",
    summary:
      "Dext coding suggestions checked against your GL rules, with low-confidence items flagged.",
    function: "ap",
    hoursBand: "2-5",
  },
  {
    id: "dext-02",
    platformSlug: "dext-automation",
    slug: "threshold-approvals",
    title: "Approval routing triggered by value threshold",
    summary:
      "Bills above threshold routed for approval after capture, before they post to the ledger.",
    function: "ap",
    hoursBand: "2-5",
  },
  {
    id: "dext-03",
    platformSlug: "dext-automation",
    slug: "receipt-to-ledger",
    title: "Receipt-to-ledger flow on confidence pass",
    summary:
      "Receipts that clear a confidence threshold post automatically, with the rest held for review.",
    function: "expenses",
    hoursBand: "5-10",
  },
  {
    id: "dext-04",
    platformSlug: "dext-automation",
    slug: "duplicate-detection",
    title: "Duplicate detection before downstream posting",
    summary:
      "Repeat receipts and bills blocked before they reach the ledger, with an audit of what was stopped.",
    function: "expenses",
    hoursBand: "2-5",
  },
  {
    id: "dext-05",
    platformSlug: "dext-automation",
    slug: "exception-queue",
    title: "Exception queue for items needing review",
    summary:
      "A single review queue for items needing human coding correction or follow-up.",
    function: "exceptions",
    hoursBand: "2-5",
  },
  {
    id: "dext-06",
    platformSlug: "dext-automation",
    slug: "policy-compliance",
    title: "Audit trail and policy compliance checks",
    summary:
      "Policy violations flagged on submission, with the audit trail captured before any reimbursement.",
    function: "expenses",
    hoursBand: "2-5",
  },
  {
    id: "dext-07",
    platformSlug: "dext-automation",
    slug: "spend-dashboards",
    title: "Spend category dashboards from Dext data",
    summary:
      "Live spend views by category, cost centre and employee, built over Dext submissions.",
    function: "reporting",
    hoursBand: "2-5",
  },
  {
    id: "dext-08",
    platformSlug: "dext-automation",
    slug: "missing-receipt-reminders",
    title: "Missing receipt chasing for employees",
    summary:
      "Automated reminders when a card transaction lands without a matching receipt.",
    function: "expenses",
    hoursBand: "2-5",
  },
  {
    id: "dext-09",
    platformSlug: "dext-automation",
    slug: "month-end-receipt-reconciliation",
    title: "Month-end reconciliation of submitted vs approved",
    summary:
      "A monthly control check on submitted vs approved items, flagging anything stuck in between.",
    function: "reconciliation",
    hoursBand: "2-5",
  },
  {
    id: "dext-10",
    platformSlug: "dext-automation",
    slug: "sync-to-ledger",
    title: "Sync approved Dext data to Xero or MYOB",
    summary:
      "Approved items post to the ledger on the same day, with no manual export step.",
    function: "sync",
    hoursBand: "2-5",
  },

  // Concur
  {
    id: "concur-01",
    platformSlug: "concur-automation",
    slug: "receipt-extraction",
    title: "Receipt extraction and auto-coding on submission",
    summary:
      "Receipts captured, extracted and coded against policy as soon as an employee submits.",
    function: "expenses",
    hoursBand: "5-10",
  },
  {
    id: "concur-02",
    platformSlug: "concur-automation",
    slug: "policy-check",
    title: "Policy check automation on claims",
    summary:
      "Claims tested against policy before approval, with violations flagged to the approver.",
    function: "expenses",
    hoursBand: "2-5",
  },
  {
    id: "concur-03",
    platformSlug: "concur-automation",
    slug: "approval-routing",
    title: "Approval routing by cost centre and amount",
    summary:
      "Claims routed to the correct approver with escalation on breach of SLA.",
    function: "expenses",
    hoursBand: "2-5",
  },
  {
    id: "concur-04",
    platformSlug: "concur-automation",
    slug: "reimbursement-trigger",
    title: "Reimbursement trigger on approval",
    summary:
      "Approved claims kick off a payment workflow with no manual re-entry.",
    function: "payments",
    hoursBand: "2-5",
  },
  {
    id: "concur-05",
    platformSlug: "concur-automation",
    slug: "missing-receipt-reminders",
    title: "Missing receipt chasing for employees",
    summary:
      "Automated reminders when a card transaction lands without a matching receipt.",
    function: "expenses",
    hoursBand: "2-5",
  },
  {
    id: "concur-06",
    platformSlug: "concur-automation",
    slug: "spend-dashboards",
    title: "Real-time spend category dashboards",
    summary:
      "Live spend views by category, department and employee, fed from Concur data.",
    function: "reporting",
    hoursBand: "2-5",
  },
  {
    id: "concur-07",
    platformSlug: "concur-automation",
    slug: "gl-coding-on-submission",
    title: "GL coding rules applied on submission",
    summary:
      "Coding applied on submission using your GL rules, with a confidence threshold before it posts.",
    function: "expenses",
    hoursBand: "2-5",
  },
  {
    id: "concur-08",
    platformSlug: "concur-automation",
    slug: "exception-queue",
    title: "Exception queue for claims needing review",
    summary:
      "Claims needing finance review routed into a single queue rather than scattered emails.",
    function: "exceptions",
    hoursBand: "2-5",
  },
  {
    id: "concur-09",
    platformSlug: "concur-automation",
    slug: "monthly-expense-refresh",
    title: "Monthly expense reporting refresh",
    summary:
      "Scheduled refresh of the expense management pack, distributed on the same day each month.",
    function: "reporting",
    hoursBand: "2-5",
  },
  {
    id: "concur-10",
    platformSlug: "concur-automation",
    slug: "sync-to-accounting",
    title: "Sync approved expense data to accounting",
    summary:
      "Approved items post to the ledger without manual entry, with a daily control check on totals.",
    function: "sync",
    hoursBand: "2-5",
  },

  // Excel
  {
    id: "excel-01",
    platformSlug: "excel-automation",
    slug: "spreadsheet-to-system",
    title: "Push validated spreadsheet data into accounting",
    summary:
      "Controlled pipelines from a workbook into the ledger, with validation before anything posts.",
    function: "sync",
    hoursBand: "5-10",
  },
  {
    id: "excel-02",
    platformSlug: "excel-automation",
    slug: "data-pipelines-between-files",
    title: "Replace copy-paste between files",
    summary:
      "Named pipelines between workbooks, with versioning and a log of who changed what.",
    function: "sync",
    hoursBand: "5-10",
  },
  {
    id: "excel-03",
    platformSlug: "excel-automation",
    slug: "reconciliation-matching",
    title: "Automated reconciliation with exception flags",
    summary:
      "Matching rules applied in a workbook, with exceptions surfaced in a single named tab.",
    function: "reconciliation",
    hoursBand: "5-10",
  },
  {
    id: "excel-04",
    platformSlug: "excel-automation",
    slug: "report-refresh-templates",
    title: "Refresh and populate report templates",
    summary:
      "Source data pulled on schedule into your report template, with variance commentary triggers.",
    function: "reporting",
    hoursBand: "2-5",
  },
  {
    id: "excel-05",
    platformSlug: "excel-automation",
    slug: "close-checklist-tracking",
    title: "Month-end close checklist with status",
    summary:
      "Close tasks tracked in a shared workbook with status, owners and a visible critical path.",
    function: "close",
    hoursBand: "2-5",
  },
  {
    id: "excel-06",
    platformSlug: "excel-automation",
    slug: "single-source-data-feeds",
    title: "Single-source data feeds replacing version chaos",
    summary:
      "One controlled feed into every template that needs the same number, not five different copies.",
    function: "sync",
    hoursBand: "2-5",
  },
  {
    id: "excel-07",
    platformSlug: "excel-automation",
    slug: "audit-trail",
    title: "Audit trail for spreadsheet-led processes",
    summary:
      "Who changed what, when, and why, captured alongside the workbook for audit.",
    function: "exceptions",
    hoursBand: "2-5",
  },
  {
    id: "excel-08",
    platformSlug: "excel-automation",
    slug: "formula-validation",
    title: "Formula validation and error detection",
    summary:
      "Input files checked for broken formulas, inconsistent ranges and hard-coded overrides.",
    function: "exceptions",
    hoursBand: "2-5",
  },
  {
    id: "excel-09",
    platformSlug: "excel-automation",
    slug: "report-distribution",
    title: "Automated distribution of refreshed reports",
    summary:
      "Refreshed report packs distributed on schedule to the right stakeholders, from a single run.",
    function: "reporting",
    hoursBand: "2-5",
  },
  {
    id: "excel-10",
    platformSlug: "excel-automation",
    slug: "logic-migration",
    title: "Migrate spreadsheet logic into controlled automation",
    summary:
      "Recurring spreadsheet logic rebuilt in a controlled platform with tests and a real audit trail.",
    function: "sync",
    hoursBand: "5-10",
  },

  // Bank feeds
  {
    id: "bank-01",
    platformSlug: "bank-automation",
    slug: "statement-download",
    title: "Automated statement download and ingestion",
    summary:
      "Statements pulled from the bank portal and fed into your reconciliation workflow on schedule.",
    function: "payments",
    hoursBand: "5-10",
  },
  {
    id: "bank-02",
    platformSlug: "bank-automation",
    slug: "aba-payment-file",
    title: "Payment file creation and ABA upload",
    summary:
      "Approved payment batches converted into ABA files and uploaded to the bank portal under audit.",
    function: "payments",
    hoursBand: "5-10",
  },
  {
    id: "bank-03",
    platformSlug: "bank-automation",
    slug: "remittance-matching",
    title: "Extract remittance advice and match to suppliers",
    summary:
      "Remittance parsing from email and portal, with matching against open supplier balances.",
    function: "payments",
    hoursBand: "5-10",
  },
  {
    id: "bank-04",
    platformSlug: "bank-automation",
    slug: "bank-to-ledger",
    title: "Bank-to-ledger reconciliation with exceptions",
    summary:
      "Rule-based matching between bank feed and ledger, with exceptions routed for review.",
    function: "reconciliation",
    hoursBand: "10-20",
  },
  {
    id: "bank-05",
    platformSlug: "bank-automation",
    slug: "cash-position-dashboard",
    title: "Cash position dashboard from aggregated feeds",
    summary:
      "A live cash position view across accounts and entities, refreshed from feed data.",
    function: "reporting",
    hoursBand: "2-5",
  },
  {
    id: "bank-06",
    platformSlug: "bank-automation",
    slug: "payment-run-preparation",
    title: "Prepare and validate payment runs",
    summary:
      "Payment batches compiled, cross-checked against open bills, and held until approved.",
    function: "payments",
    hoursBand: "5-10",
  },
  {
    id: "bank-07",
    platformSlug: "bank-automation",
    slug: "payment-run-approval",
    title: "Approval workflow for payment runs",
    summary:
      "Payment runs routed for structured approval with an audit trail before any upload.",
    function: "payments",
    hoursBand: "2-5",
  },
  {
    id: "bank-08",
    platformSlug: "bank-automation",
    slug: "statement-to-forecast",
    title: "Statement-to-forecast reconciliation",
    summary:
      "Actuals reconciled against the cash forecast with variance flagging for treasury.",
    function: "reconciliation",
    hoursBand: "2-5",
  },
  {
    id: "bank-09",
    platformSlug: "bank-automation",
    slug: "multi-bank-aggregation",
    title: "Multi-bank feed aggregation into a central layer",
    summary:
      "Feeds from every bank and entity aggregated into a single data layer for reconciliation.",
    function: "sync",
    hoursBand: "2-5",
  },
  {
    id: "bank-10",
    platformSlug: "bank-automation",
    slug: "unusual-transaction-alerts",
    title: "Alerts for unmatched or unusual transactions",
    summary:
      "Rules flag unmatched or out-of-pattern transactions the day they hit the feed.",
    function: "exceptions",
    hoursBand: "2-5",
  },

  // Outlook
  {
    id: "outlook-01",
    platformSlug: "outlook-automation",
    slug: "shared-inbox-triage",
    title: "Classify shared inbox traffic by type",
    summary:
      "Inbound email triaged into invoice, remittance, query and approval, with routing per class.",
    function: "inbox",
    hoursBand: "5-10",
  },
  {
    id: "outlook-02",
    platformSlug: "outlook-automation",
    slug: "invoice-extraction",
    title: "Extract invoices from email attachments",
    summary:
      "Attachments captured, extracted and routed to AP without leaving the inbox thread behind.",
    function: "ap",
    hoursBand: "10-20",
  },
  {
    id: "outlook-03",
    platformSlug: "outlook-automation",
    slug: "structured-approval",
    title: "Structured approval emails with one-click response",
    summary:
      "Approvers get a structured email and one-click response, recorded against the underlying item.",
    function: "inbox",
    hoursBand: "5-10",
  },
  {
    id: "outlook-04",
    platformSlug: "outlook-automation",
    slug: "approval-chasing",
    title: "Automated follow-up on pending approvals",
    summary:
      "Approvals past SLA chased automatically, with escalation to the next approver when needed.",
    function: "inbox",
    hoursBand: "2-5",
  },
  {
    id: "outlook-05",
    platformSlug: "outlook-automation",
    slug: "remittance-extraction",
    title: "Extract remittance advice and match to AR",
    summary:
      "Remittance detail parsed from emails and matched to open AR, with exceptions flagged.",
    function: "ar",
    hoursBand: "5-10",
  },
  {
    id: "outlook-06",
    platformSlug: "outlook-automation",
    slug: "exception-routing",
    title: "Route unmatched items to a review queue",
    summary:
      "Unmatched items routed out of the inbox into a single named review queue with an owner.",
    function: "exceptions",
    hoursBand: "2-5",
  },
  {
    id: "outlook-07",
    platformSlug: "outlook-automation",
    slug: "sla-escalation",
    title: "SLA-style escalation on inactioned items",
    summary:
      "Items not actioned within threshold escalated up a clear chain, not left in a queue.",
    function: "inbox",
    hoursBand: "2-5",
  },
  {
    id: "outlook-08",
    platformSlug: "outlook-automation",
    slug: "inbox-dashboard",
    title: "Inbox volume and response dashboard",
    summary:
      "A live view of inbox volume, response time and exception rate for the finance team.",
    function: "reporting",
    hoursBand: "2-5",
  },
  {
    id: "outlook-09",
    platformSlug: "outlook-automation",
    slug: "auto-acknowledgement",
    title: "Auto-acknowledge supplier invoice receipt",
    summary:
      "Suppliers get a structured acknowledgement on invoice receipt, with a reference the AP team can quote.",
    function: "inbox",
    hoursBand: "2-5",
  },
  {
    id: "outlook-10",
    platformSlug: "outlook-automation",
    slug: "monthly-inbox-analytics",
    title: "Monthly inbox analytics pack",
    summary:
      "A monthly pack on inbox volumes, response times and exception rates for the finance leader.",
    function: "reporting",
    hoursBand: "2-5",
  },

  // Power BI
  {
    id: "power-bi-01",
    platformSlug: "power-bi-automation",
    slug: "source-system-extraction",
    title: "Automated data extraction from source systems",
    summary:
      "Controlled pipelines from Xero, MYOB, NetSuite, SAP and banks into the reporting layer.",
    function: "sync",
    hoursBand: "5-10",
  },
  {
    id: "power-bi-02",
    platformSlug: "power-bi-automation",
    slug: "scheduled-refresh",
    title: "Scheduled report refresh",
    summary:
      "Reports refreshed on schedule with row-count checks, replacing manual pulls the night before.",
    function: "reporting",
    hoursBand: "2-5",
  },
  {
    id: "power-bi-03",
    platformSlug: "power-bi-automation",
    slug: "ap-ar-dashboards",
    title: "AP and AR tracking dashboards",
    summary:
      "Live dashboards on held bills, aged debt and supplier risk, fed from source system data.",
    function: "reporting",
    hoursBand: "2-5",
  },
  {
    id: "power-bi-04",
    platformSlug: "power-bi-automation",
    slug: "close-progress-dashboard",
    title: "Month-end close progress dashboard",
    summary:
      "A live view of close tasks by status, owner and blocker, visible to the controller on day one.",
    function: "close",
    hoursBand: "2-5",
  },
  {
    id: "power-bi-05",
    platformSlug: "power-bi-automation",
    slug: "kpi-alerts",
    title: "KPI alert workflows on threshold breach",
    summary:
      "Stakeholders notified when a tracked KPI moves outside tolerance, not a week later.",
    function: "reporting",
    hoursBand: "2-5",
  },
  {
    id: "power-bi-06",
    platformSlug: "power-bi-automation",
    slug: "spend-exception-monitoring",
    title: "Spend and exception monitoring dashboards",
    summary:
      "Live views on spend trends and exception rates, used by finance and operations together.",
    function: "reporting",
    hoursBand: "2-5",
  },
  {
    id: "power-bi-07",
    platformSlug: "power-bi-automation",
    slug: "executive-pack-automation",
    title: "Executive finance pack automation",
    summary:
      "The monthly executive pack compiled, formatted and distributed on the same day each month.",
    function: "reporting",
    hoursBand: "2-5",
  },
  {
    id: "power-bi-08",
    platformSlug: "power-bi-automation",
    slug: "cash-treasury-dashboard",
    title: "Cash flow and treasury visibility dashboard",
    summary:
      "A live treasury view across accounts, entities and forecasts, refreshed from feed data.",
    function: "reporting",
    hoursBand: "2-5",
  },
  {
    id: "power-bi-09",
    platformSlug: "power-bi-automation",
    slug: "cross-system-consolidation",
    title: "Cross-system consolidation from finance and ops tools",
    summary:
      "Pulls from Xero, MYOB, bank, and operations tools consolidated in one reporting layer.",
    function: "sync",
    hoursBand: "5-10",
  },
  {
    id: "power-bi-10",
    platformSlug: "power-bi-automation",
    slug: "variance-analysis-report",
    title: "Variance analysis against prior period",
    summary:
      "Variance tables auto-populated against prior period data, with commentary triggers on threshold breach.",
    function: "reporting",
    hoursBand: "2-5",
  },
];

/** The full list, with the runtime-only `detailHref` attached. */
export const automations: Automation[] = rawAutomations.map((a) => ({
  ...a,
  detailHref: `/platforms/${a.platformSlug}`,
}));

/** Grouped by platform slug, preserving declaration order. */
export const automationsByPlatform: Record<string, Automation[]> =
  automations.reduce<Record<string, Automation[]>>((acc, a) => {
    (acc[a.platformSlug] ??= []).push(a);
    return acc;
  }, {});

/** Grouped by finance function, preserving declaration order. */
export const automationsByFunction: Record<FinanceFunction, Automation[]> =
  automations.reduce(
    (acc, a) => {
      acc[a.function].push(a);
      return acc;
    },
    Object.fromEntries(
      financeFunctions.map((f) => [f.id, [] as Automation[]]),
    ) as Record<FinanceFunction, Automation[]>,
  );

/** Automations for a given platform, or an empty array if none match. */
export function getAutomationsForPlatform(slug: string): Automation[] {
  return automationsByPlatform[slug] ?? [];
}

/** Resolve a platform slug back to a Platform for rendering chips and badges. */
export function getPlatformForAutomation(a: Automation): Platform | undefined {
  return platforms.find((p) => p.slug === a.platformSlug);
}

/** Runtime sanity check used in a lightweight test if we add one later. */
export const automationCounts = {
  total: automations.length,
  perPlatform: Object.fromEntries(
    platforms.map((p) => [p.slug, automationsByPlatform[p.slug]?.length ?? 0]),
  ) as Record<string, number>,
};
