/**
 * Canonical list of the 13 finance platforms Ordron automates.
 * Consumed by the homepage Platforms section, the /platforms hub,
 * the site footer, and eventually each /platforms/<slug> hub page.
 *
 * Slugs are locked in and must not change — they are the public URL
 * path segment under /platforms/ and are referenced from the strategy
 * document as the programmatic SEO anchor.
 */

export type Platform = {
  /** Full product name as it appears in body copy. */
  name: string;
  /** Short label for tiles, nav, and footer lists. */
  shortLabel: string;
  /** URL slug. Full URL is `/platforms/${slug}`. */
  slug: string;
  /** One-line descriptor for tiles. */
  detail: string;
  /**
   * Ordron's focus area for this platform, in plain terms.
   * Used on the /platforms hub grouping.
   */
  focus:
    | "accounting"
    | "erp"
    | "capture"
    | "expense"
    | "ops"
    | "reporting"
    | "practice";
};

export const platforms: Platform[] = [
  {
    name: "Xero",
    shortLabel: "Xero",
    slug: "xero-automation",
    detail: "AP, AR, GL, bank",
    focus: "accounting",
  },
  {
    name: "MYOB",
    shortLabel: "MYOB",
    slug: "myob-automation",
    detail: "AP, AR, payroll",
    focus: "accounting",
  },
  {
    name: "QuickBooks",
    shortLabel: "QuickBooks",
    slug: "quickbooks-automation",
    detail: "SMB AP and GL",
    focus: "accounting",
  },
  {
    name: "NetSuite",
    shortLabel: "NetSuite",
    slug: "netsuite-automation",
    detail: "ERP AP, AR, close",
    focus: "erp",
  },
  {
    name: "SAP",
    shortLabel: "SAP",
    slug: "sap-automation",
    detail: "Mid-market ERP",
    focus: "erp",
  },
  {
    name: "Dynamics 365",
    shortLabel: "Dynamics",
    slug: "dynamics-automation",
    detail: "F&O and Business Central",
    focus: "erp",
  },
  {
    name: "Hubdoc",
    shortLabel: "Hubdoc",
    slug: "hubdoc-automation",
    detail: "Document capture",
    focus: "capture",
  },
  {
    name: "Dext",
    shortLabel: "Dext",
    slug: "dext-automation",
    detail: "Receipts and bills",
    focus: "capture",
  },
  {
    name: "SAP Concur",
    shortLabel: "Concur",
    slug: "concur-automation",
    detail: "Expense management",
    focus: "expense",
  },
  {
    name: "Excel",
    shortLabel: "Excel",
    slug: "excel-automation",
    detail: "Models and workbooks",
    focus: "ops",
  },
  {
    name: "Bank feeds",
    shortLabel: "Bank",
    slug: "bank-automation",
    detail: "Portals and feeds",
    focus: "ops",
  },
  {
    name: "Outlook",
    shortLabel: "Outlook",
    slug: "outlook-automation",
    detail: "Email-driven workflow",
    focus: "ops",
  },
  {
    name: "Power BI",
    shortLabel: "Power BI",
    slug: "power-bi-automation",
    detail: "Reporting layer",
    focus: "reporting",
  },
  {
    name: "Ignition",
    shortLabel: "Ignition",
    slug: "ignition-automation",
    detail: "Practice management",
    focus: "practice",
  },
];

/**
 * Short list surfaced in the site footer. Intentionally the four
 * platforms with the highest AU search volume plus an "All platforms"
 * catch-all link rendered separately.
 */
export const footerPlatforms: Platform[] = platforms.slice(0, 4);

/** Platforms grouped for the /platforms hub. Order locked. */
export const platformGroups: {
  id: Platform["focus"];
  heading: string;
  summary: string;
  platforms: Platform[];
}[] = [
  {
    id: "accounting",
    heading: "Accounting platforms",
    summary:
      "The core ledger. Where month-end actually lives and where most manual hours go.",
    platforms: platforms.filter((p) => p.focus === "accounting"),
  },
  {
    id: "erp",
    heading: "Mid-market ERPs",
    summary:
      "For businesses that have outgrown an accounting package but are not ready for a full ERP rebuild.",
    platforms: platforms.filter((p) => p.focus === "erp"),
  },
  {
    id: "capture",
    heading: "Document capture",
    summary:
      "OCR and data extraction layers that feed your ledger without hand-keying.",
    platforms: platforms.filter((p) => p.focus === "capture"),
  },
  {
    id: "expense",
    heading: "Expense",
    summary:
      "Employee expense and corporate card workflows, reconciled to the GL without spreadsheets.",
    platforms: platforms.filter((p) => p.focus === "expense"),
  },
  {
    id: "ops",
    heading: "Finance operations",
    summary:
      "The tools that sit around the ledger: spreadsheets, banks, and inboxes.",
    platforms: platforms.filter((p) => p.focus === "ops"),
  },
  {
    id: "reporting",
    heading: "Reporting",
    summary:
      "Dashboards that pull from the stack above, not from a manual export.",
    platforms: platforms.filter((p) => p.focus === "reporting"),
  },
  {
    id: "practice",
    heading: "Practice management",
    summary:
      "Proposal-to-invoice and client lifecycle platforms that sit above the ledger for Australian accounting practices.",
    platforms: platforms.filter((p) => p.focus === "practice"),
  },
];

export function getPlatformBySlug(slug: string): Platform | undefined {
  return platforms.find((p) => p.slug === slug);
}
