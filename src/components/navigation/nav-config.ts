/**
 * Nav information architecture for the site header.
 *
 * Single declarative source so the mega menu, the mobile accordion,
 * and the active-state detection all iterate over the same shape.
 *
 * Slugs referenced here are asserted at module load against
 * `src/lib/platforms.ts` so a dropped platform would surface as a
 * build-time error, not a silent 404 in the nav.
 */

import { caseStudies } from "@/lib/case-studies";
import { platforms } from "@/lib/platforms";

export type FlatLink = {
  label: string;
  href: string;
  /** Optional prefix match rule override. Default is exact match. */
  match?: "exact" | "prefix";
};

export type DropdownLink = {
  label: string;
  href: string;
};

/**
 * Featured editorial entry used in column 3 of the Results dropdown.
 * Visually distinct from both a flat link and the lead-magnet card.
 */
export type FeaturedCard = {
  /** Small caption above the heading, e.g. the client descriptor. */
  eyebrow: string;
  /** The "signature win" title of the case study. */
  heading: string;
  /** One-sentence editorial blurb. Italic in the rendered UI. */
  description: string;
  /** Target case study URL. */
  href: string;
};

export type DropdownColumnLinks = {
  kind: "links";
  title: string;
  links: DropdownLink[];
  seeAll: DropdownLink;
  /**
   * If true, this column is omitted in the mobile hamburger accordion.
   * Used on Results to skip the "by outcome" column on mobile so the
   * drawer stays scannable.
   */
  hiddenOnMobile?: boolean;
};

export type DropdownColumnFeatured = {
  kind: "featured";
  title: string;
  cards: FeaturedCard[];
  seeAll: DropdownLink;
  hiddenOnMobile?: boolean;
};

export type DropdownColumn = DropdownColumnLinks | DropdownColumnFeatured;

export type LeadMagnetCard = {
  tag: string;
  heading: string;
  description: string;
  meta: string;
  ctaLabel: string;
  ctaHref: string;
};

export type DropdownKey = "solutions" | "platforms" | "results";

export type DropdownDef = {
  key: DropdownKey;
  label: string;
  columns: DropdownColumn[];
  leadMagnet: LeadMagnetCard;
};

export type NavCta = {
  label: string;
  href: string;
};

/**
 * Flat links rendered alongside the dropdown triggers.
 *
 * Results was previously a flat link pointing at /case-studies. It
 * is now a dropdown (see `navDropdowns.results`) so it is absent here.
 */
export const navFlatLinks: FlatLink[] = [
  { label: "Home", href: "/", match: "exact" },
  { label: "About", href: "/about", match: "exact" },
];

export const navCtas: { primary: NavCta; secondary: NavCta } = {
  secondary: {
    label: "Automation Diagnostic",
    href: "/scorecard",
  },
  primary: {
    label: "Book your Roadmap",
    href: "/health-check",
  },
};

/**
 * Guide slugs this nav links to. Must match the four entries in
 * `src/data/guides.ts`.
 */
const GUIDE_AP = "/guides/accounts-payable-automation";
const GUIDE_AR = "/guides/accounts-receivable-automation";
const GUIDE_RECS = "/guides/reconciliations-automation";
const GUIDE_CLOSE = "/guides/month-end-close-automation";

/**
 * Case study slugs referenced from the Results dropdown. Validated at
 * module load against `src/lib/case-studies.ts` to catch renames.
 */
const CS_LEGACY_ERP = "/case-studies/logistics-legacy-erp-rpa";
const CS_AP_OCR = "/case-studies/logistics-ap-ocr";
const CS_XERO_AR = "/case-studies/freight-xero-ar";
const CS_INVOICE_HUB = "/case-studies/manufacturing-invoice-hub";
const CS_ADVISORY = "/case-studies/advisory-excel-to-enterprise";
const CS_FS_RISK = "/case-studies/financial-services-risk-ai";

export const navDropdowns: Record<DropdownKey, DropdownDef> = {
  solutions: {
    key: "solutions",
    label: "What we solve",
    columns: [
      {
        kind: "links",
        title: "Accounts Payable",
        links: [
          { label: "Invoice capture & OCR", href: GUIDE_AP },
          { label: "Approval workflows", href: GUIDE_AP },
          { label: "Payment processing", href: GUIDE_AP },
          { label: "Supplier reconciliation", href: GUIDE_AP },
        ],
        seeAll: { label: "See all AP automations", href: GUIDE_AP },
      },
      {
        kind: "links",
        title: "Accounts Receivable",
        links: [
          { label: "Invoice generation", href: GUIDE_AR },
          { label: "Debtor reminders", href: GUIDE_AR },
          { label: "Cash application", href: GUIDE_AR },
          { label: "Payment gateway sync", href: GUIDE_AR },
        ],
        seeAll: { label: "See all AR automations", href: GUIDE_AR },
      },
      {
        kind: "links",
        title: "Reconciliations & Close",
        links: [
          { label: "Bank reconciliation", href: GUIDE_RECS },
          { label: "Intercompany reconciliation", href: GUIDE_RECS },
          { label: "Month-end close acceleration", href: GUIDE_CLOSE },
          { label: "Journal automation", href: GUIDE_CLOSE },
        ],
        seeAll: { label: "See all close automations", href: GUIDE_CLOSE },
      },
    ],
    leadMagnet: {
      tag: "FREE GUIDE",
      heading: "The 13 platforms, 130 automations explorer",
      description:
        "See every automation Ordron has built, grouped by the problems they solve. Filter by platform or function.",
      meta: "Interactive · 5 min",
      ctaLabel: "Open the explorer",
      ctaHref: "/guide/automations",
    },
  },
  platforms: {
    key: "platforms",
    label: "Platforms",
    columns: [
      {
        kind: "links",
        title: "Accounting",
        links: [
          { label: "Xero", href: "/platforms/xero-automation" },
          { label: "MYOB", href: "/platforms/myob-automation" },
          { label: "QuickBooks", href: "/platforms/quickbooks-automation" },
          { label: "Ignition", href: "/platforms/ignition-automation" },
        ],
        seeAll: { label: "Compare accounting stacks", href: "/platforms" },
      },
      {
        kind: "links",
        title: "ERP & Enterprise",
        links: [
          { label: "Oracle NetSuite", href: "/platforms/netsuite-automation" },
          { label: "SAP Finance", href: "/platforms/sap-automation" },
          {
            label: "Microsoft Dynamics",
            href: "/platforms/dynamics-automation",
          },
        ],
        seeAll: { label: "ERP automation approach", href: "/platforms" },
      },
      {
        kind: "links",
        title: "Capture, Expense & Ops",
        links: [
          { label: "Hubdoc", href: "/platforms/hubdoc-automation" },
          { label: "Dext", href: "/platforms/dext-automation" },
          { label: "SAP Concur", href: "/platforms/concur-automation" },
          { label: "Finance ops & utilities", href: "/platforms" },
        ],
        seeAll: { label: "View all platforms", href: "/platforms" },
      },
    ],
    leadMagnet: {
      tag: "FREE TOOL",
      heading: "Cost of Inaction Calculator",
      description:
        "Four inputs. See the annual cost of manual finance work in your team and the payback timeline on automation.",
      meta: "Interactive · 2 min",
      ctaLabel: "Run the calculator",
      ctaHref: "/cost-of-inaction",
    },
  },
  results: {
    key: "results",
    label: "Results",
    columns: [
      {
        kind: "links",
        title: "By industry",
        links: [
          { label: "Logistics (5)", href: "/case-studies#industry-logistics" },
          {
            label: "Distribution (3)",
            href: "/case-studies#industry-distribution",
          },
          {
            label: "Manufacturing (2)",
            href: "/case-studies#industry-manufacturing",
          },
          {
            label: "Construction (1)",
            href: "/case-studies#industry-construction",
          },
          {
            label: "Industrial (1)",
            href: "/case-studies#industry-industrial-services",
          },
          { label: "Legal (1)", href: "/case-studies#industry-legal" },
          {
            label: "Financial Services (2)",
            href: "/case-studies#industry-financial-services",
          },
          {
            label: "Professional Services (2)",
            href: "/case-studies#industry-professional-services",
          },
        ],
        seeAll: {
          label: "See all 17 case studies",
          href: "/case-studies",
        },
      },
      {
        kind: "links",
        title: "By outcome",
        hiddenOnMobile: true,
        links: [
          {
            label: "85% less manual entry, 160+ hrs/mo returned",
            href: CS_LEGACY_ERP,
          },
          { label: "4 hours to 15 minutes AP cycle", href: CS_AP_OCR },
          { label: "80% less AR reconciliation in Xero", href: CS_XERO_AR },
          {
            label: "75% of supplier invoices fully auto-processed",
            href: CS_INVOICE_HUB,
          },
          {
            label: "10 days to 24 hours reporting cycle",
            href: CS_INVOICE_HUB,
          },
          { label: "2× advisory client capacity", href: CS_ADVISORY },
        ],
        seeAll: { label: "See all outcomes", href: "/case-studies" },
      },
      {
        kind: "featured",
        title: "Featured case studies",
        cards: [
          {
            eyebrow: "Financial services firm",
            heading: "Full stack build",
            description:
              "Near-zero manual data entry across a HubSpot, Xero and timesheet stack. Now on an ongoing partnership.",
            href: CS_FS_RISK,
          },
          {
            eyebrow: "National logistics operator",
            heading: "Legacy ERP bridge",
            description:
              "RPA bot driving a 20-year-old ERP, feeding clean data into Xero. 160+ hours returned every month.",
            href: CS_LEGACY_ERP,
          },
          {
            eyebrow: "Accounting practice",
            heading: "AP OCR transformation",
            description:
              "From 20 hours a week of manual invoice review to under 2. 800+ invoices processed weekly.",
            href: CS_AP_OCR,
          },
        ],
        seeAll: { label: "All case studies", href: "/case-studies" },
      },
    ],
    leadMagnet: {
      tag: "CASE STUDY PACK",
      heading: "The proof pack",
      description:
        "Every Ordron case study packaged by industry. One PDF, ready to share with your leadership team.",
      meta: "17 case studies",
      ctaLabel: "Download the proof pack",
      ctaHref: "/lead-magnets/case-study-proof-pack",
    },
  },
};

/**
 * Build-time assertion: every `/platforms/<slug>` link in the nav
 * must resolve against the canonical platforms list. If somebody
 * renames a slug, Next.js will surface this as a module-load error.
 *
 * The same assertion pattern applies to case study slugs below, which
 * are validated against `src/lib/case-studies.ts` so a renamed case
 * study immediately breaks the build instead of silently 404-ing from
 * the Results dropdown.
 */
const platformSlugs = new Set(platforms.map((p) => p.slug));
const caseStudySlugs = new Set(caseStudies.map((c) => c.slug));

function assertKnownSlug(href: string, label: string) {
  if (href.startsWith("/platforms/")) {
    const slug = href.replace(/^\/platforms\//, "");
    if (!platformSlugs.has(slug)) {
      throw new Error(
        `nav-config: platform slug "${slug}" (from "${label}") does not exist in src/lib/platforms.ts`,
      );
    }
  }
  if (href.startsWith("/case-studies/")) {
    // Strip any hash fragment; case study detail URLs never carry one.
    const slug = href.replace(/^\/case-studies\//, "").split("#")[0];
    if (!caseStudySlugs.has(slug)) {
      throw new Error(
        `nav-config: case study slug "${slug}" (from "${label}") does not exist in src/lib/case-studies.ts`,
      );
    }
  }
}

for (const def of Object.values(navDropdowns)) {
  for (const column of def.columns) {
    assertKnownSlug(column.seeAll.href, column.seeAll.label);
    if (column.kind === "links") {
      for (const link of column.links) {
        assertKnownSlug(link.href, link.label);
      }
    } else {
      for (const card of column.cards) {
        assertKnownSlug(card.href, card.heading);
      }
    }
  }
  assertKnownSlug(def.leadMagnet.ctaHref, def.leadMagnet.ctaLabel);
}

export function isDropdownActive(
  key: DropdownKey,
  pathname: string | null,
): boolean {
  if (!pathname) return false;
  if (key === "solutions") {
    return pathname.startsWith("/guides/") || pathname === "/guide/automations";
  }
  if (key === "platforms") {
    return pathname === "/platforms" || pathname.startsWith("/platforms/");
  }
  if (key === "results") {
    return pathname === "/case-studies" || pathname.startsWith("/case-studies/");
  }
  return false;
}

export function isFlatActive(link: FlatLink, pathname: string | null): boolean {
  if (!pathname) return false;
  if (link.match === "prefix") return pathname.startsWith(link.href);
  return pathname === link.href;
}
