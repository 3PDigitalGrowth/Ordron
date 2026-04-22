/**
 * Canonical list of Ordron case studies.
 *
 * Source: anonymised composites of real Ordron engagements. Client
 * names are intentionally removed. Industry, size signal, platforms
 * and quantified outcomes are preserved. These are the facts that
 * matter to a finance leader reading the page; the brand name of
 * the client does not.
 *
 * Slugs are the URL path segment under /case-studies/ and must not
 * change once a case study is published.
 */

export type CaseStudyTagKind =
  | "Accounts Payable"
  | "Accounts Receivable"
  | "Reporting"
  | "Reconciliation"
  | "Document capture"
  | "Procurement"
  | "Operations"
  | "RPA"
  | "AI / NLP"
  | "Risk & compliance"
  | "Legacy systems"
  | "Dashboards"
  | "Mobile";

export type CaseStudyIndustry =
  | "Logistics"
  | "Distribution"
  | "Manufacturing"
  | "Construction"
  | "Industrial Services"
  | "Legal"
  | "Financial Services";

export type CaseStudyStat = {
  /** The headline value, e.g., "85%", "160+ hours", "4 hrs → 15 min". */
  value: string;
  /** Short supporting label, one line. */
  label: string;
};

export type CaseStudy = {
  /** URL slug. Full URL is `/case-studies/${slug}`. */
  slug: string;
  /** Full title used on the detail page. */
  title: string;
  /** Title used on the index card. Shorter. */
  cardTitle: string;
  /** Industry taxonomy label. */
  industry: CaseStudyIndustry;
  /** One-line anonymised descriptor of the client. */
  companyDescriptor: string;
  /** Category tags shown on the card. */
  tags: CaseStudyTagKind[];
  /** Platforms involved, in plain names. */
  platforms: string[];
  /**
   * Optional platform slug to preselect in the embedded Cost of Inaction
   * calculator on the detail page. Must match a slug in `platforms.ts`.
   */
  calculatorPlatformSlug?: string;
  /** Headline stat for the top of the card and detail hero. */
  headlineStat: string;
  /** Supporting summary for the card and detail hero. */
  summary: string;
  /** SEO meta title. */
  metaTitle: string;
  /** SEO meta description. */
  metaDescription: string;
  /** Long-form challenge section. */
  challenge: string[];
  /** Long-form solution section. Lead paragraph + bullets. */
  solution: {
    lead: string;
    bullets: string[];
  };
  /** Impact section: headline stat tiles + supporting narrative bullets. */
  impact: {
    stats: CaseStudyStat[];
    bullets: string[];
  };
  /** Related case study slugs. */
  relatedSlugs: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "logistics-ap-ocr",
    title: "National logistics provider: AP OCR and SharePoint filing",
    cardTitle: "AP OCR and SharePoint filing",
    industry: "Logistics",
    companyDescriptor:
      "National logistics provider operating across multiple depots, with a SharePoint-centric AP process.",
    tags: ["Accounts Payable", "Document capture", "RPA"],
    platforms: ["SharePoint", "Native AP"],
    headlineStat: "AP cycle: 4 hours to 15 minutes per batch",
    summary:
      "OCR and workflow logic plugged into an existing SharePoint-based AP process. No new software, 100% automated filing.",
    metaTitle:
      "Case study: National logistics provider cuts AP cycle from 4 hours to 15 minutes",
    metaDescription:
      "How Ordron automated AP filing with OCR inside an existing SharePoint workflow. 100% elimination of manual invoice downloads and renaming, no new software.",
    challenge: [
      "Finance staff manually downloaded every supplier invoice during each AP run, renamed each one by hand, then filed it into a SharePoint folder based on cost centre.",
      "Naming conventions drifted between depots, which broke downstream reporting and made audit lookups painful.",
      "The finance team spent hours sorting invoices after each AP cycle, instead of reviewing or analysing them.",
    ],
    solution: {
      lead:
        "Ordron automated the Accounts Payable filing process using OCR and workflow logic, without introducing any new software.",
      bullets: [
        "Extracted vendor, department and cost category from every invoice via OCR.",
        "Automatically renamed each invoice against the existing naming convention.",
        "Filed invoices to the correct SharePoint folder per cost centre, without human handling.",
        "Integrated into the existing AP run. No new platform, no retraining.",
      ],
    },
    impact: {
      stats: [
        { value: "4 hrs → 15 min", label: "AP cycle per batch" },
        { value: "100%", label: "Manual downloads eliminated" },
        { value: "0", label: "New software introduced" },
      ],
      bullets: [
        "Audit traceability improved because every file followed the same naming rule.",
        "Finance staff moved off data entry and into exception review and analysis.",
        "Reporting delays caused by inconsistent filing disappeared.",
      ],
    },
    relatedSlugs: ["manufacturing-invoice-hub", "freight-xero-ar"],
  },

  {
    slug: "freight-xero-ar",
    title: "Mid-sized freight operator: Xero AR and reconciliation",
    cardTitle: "Xero AR and reconciliation",
    industry: "Logistics",
    companyDescriptor:
      "Mid-sized freight operator with hundreds of recurring clients, running AR on Xero.",
    tags: ["Accounts Receivable", "Reconciliation", "Dashboards"],
    platforms: ["Xero"],
    calculatorPlatformSlug: "xero-automation",
    headlineStat: "80% reduction in AR reconciliation time",
    summary:
      "Auto-coded GL tags, automated bank reconciliation and real-time aged-receivables visibility in Xero.",
    metaTitle:
      "Case study: Mid-sized freight operator cuts AR reconciliation time 80% with Xero automation",
    metaDescription:
      "How Ordron built smart-mapping and automated bank reconciliation inside Xero for a freight operator, giving the CFO real-time aged-receivables visibility.",
    challenge: [
      "Every invoice required a manual GL tag before it posted.",
      "Bank reconciliation against AR records took several hours each week.",
      "The CFO had no visibility into aged receivables until month-end closed.",
    ],
    solution: {
      lead:
        "Ordron implemented a smart-mapping and reconciliation layer directly against Xero.",
      bullets: [
        "Analysed historical invoice patterns and tagging behaviour to build the coding model.",
        "Auto-assigned GL codes and customer references as invoices posted.",
        "Automated bank reconciliation and flagged anomalies for human review.",
        "Surfaced live aged-receivables status in a CFO dashboard.",
      ],
    },
    impact: {
      stats: [
        { value: "80%", label: "Less time on reconciliation" },
        { value: "Real-time", label: "Aged receivables visibility" },
        { value: ">95%", label: "Coding accuracy on AR invoices" },
      ],
      bullets: [
        "AR coding stayed consistent across clients without manual review.",
        "Anomalies surfaced in hours, not at month-end.",
        "The CFO moved from reactive cash-flow management to forward-looking decisions.",
      ],
    },
    relatedSlugs: [
      "distribution-ondemand-reporting",
      "logistics-legacy-erp-rpa",
    ],
  },

  {
    slug: "distribution-ondemand-reporting",
    title: "Distribution group: on-demand finance reporting",
    cardTitle: "On-demand finance reporting",
    industry: "Distribution",
    companyDescriptor:
      "Large distribution group running Xero, a transport management system, and multiple spreadsheet exports.",
    tags: ["Reporting", "Dashboards", "Operations"],
    platforms: ["Xero", "TMS", "Excel"],
    calculatorPlatformSlug: "xero-automation",
    headlineStat: "Reporting: overnight lag to on-demand",
    summary:
      "Daily management packs compiled automatically from Xero, a TMS and spreadsheet exports, delivered before 8 a.m.",
    metaTitle:
      "Case study: Distribution group moves from overnight reporting to on-demand",
    metaDescription:
      "How Ordron compiled daily management packs from Xero, a transport management system and Excel exports — delivered to department heads before 8 a.m.",
    challenge: [
      "Daily performance reports were compiled by hand each morning.",
      "Data was pulled separately from Xero, the transport management system, and a set of spreadsheets.",
      "Reports were only available the next morning, after manual consolidation.",
      "Management decisions lagged reality by a full day.",
    ],
    solution: {
      lead:
        "Ordron built an on-demand reporting automation that connected every data source behind the daily pack.",
      bullets: [
        "Connected Xero, the TMS and the relevant Excel exports through a single pipeline.",
        "Ran scheduled and trigger-based workflows to compile, clean and reconcile data automatically.",
        "Delivered daily PDF and email summaries to department heads before 8 a.m.",
        "Kept a self-service on-demand view available for ad-hoc requests.",
      ],
    },
    impact: {
      stats: [
        { value: "Overnight → on-demand", label: "Reporting cycle" },
        { value: "Before 8 a.m.", label: "Daily pack delivery" },
        { value: "Multi-system", label: "Single source of truth" },
      ],
      bullets: [
        "Analysts stopped doing repetitive data merging and moved onto analysis.",
        "Executives made day-to-day decisions against fresh numbers, not yesterday's export.",
        "The reporting format stabilised across departments for the first time.",
      ],
    },
    relatedSlugs: ["manufacturing-invoice-hub", "construction-ops-visibility"],
  },

  {
    slug: "manufacturing-invoice-hub",
    title: "National manufacturer: automated invoice and reporting hub",
    cardTitle: "Automated invoice and reporting hub",
    industry: "Manufacturing",
    companyDescriptor:
      "National manufacturer processing thousands of supplier invoices monthly through shared inboxes.",
    tags: ["Accounts Payable", "Document capture", "Dashboards"],
    platforms: ["Email ingestion", "OCR", "ERP"],
    headlineStat: "75% of invoices processed automatically",
    summary:
      "Email intake, OCR extraction, PO matching, auto-approval under preset rules, and a live spend dashboard.",
    metaTitle:
      "Case study: National manufacturer automates 75% of supplier invoices",
    metaDescription:
      "How Ordron built an email-to-ledger invoice hub for a national manufacturer: OCR, PO matching, auto-approval, and a live spend dashboard. Reporting cycle cut from 10 days to 24 hours.",
    challenge: [
      "Thousands of supplier invoices each month arrived into shared inboxes.",
      "Approvals stalled for days and duplicate invoices slipped through the cracks.",
      "Regional managers had minimal transparency into what was being spent where.",
      "The accounts team carried most of the load as data entry.",
    ],
    solution: {
      lead:
        "Ordron built an automated invoice hub that handled intake, extraction, matching, approval and reporting end-to-end.",
      bullets: [
        "Email ingestion captured every supplier invoice on arrival.",
        "OCR extracted the line-level data required to match it to a PO.",
        "An intelligent match layer connected invoices to existing POs and auto-approved anything within preset rules.",
        "Exceptions were routed to a named owner with an SLA, not to a shared inbox.",
        "A live dashboard surfaced spend by vendor and cost centre.",
      ],
    },
    impact: {
      stats: [
        { value: "75%", label: "Invoices auto-processed" },
        { value: "10 days → 24 hrs", label: "Reporting cycle" },
        { value: "Named owner", label: "Per exception path" },
      ],
      bullets: [
        "Duplicate payments dropped toward zero once email intake centralised.",
        "Finance redeployed from data entry into analysis and supplier negotiation.",
        "Regional managers gained a real-time view of their own cost centres.",
      ],
    },
    relatedSlugs: ["logistics-ap-ocr", "distribution-ondemand-reporting"],
  },

  {
    slug: "construction-ops-visibility",
    title: "Construction supply group: operations visibility platform",
    cardTitle: "Operations visibility platform",
    industry: "Construction",
    companyDescriptor:
      "Large construction-supply group operating across multiple depots, with dispersed finance, logistics and project teams.",
    tags: ["Operations", "Dashboards", "Reporting"],
    platforms: ["Warehouse system", "Time-tracking", "ERP"],
    headlineStat: "70% reduction in manual data prep",
    summary:
      "Live cross-department dashboard with threshold alerts, replacing spreadsheet-and-email reporting across depots.",
    metaTitle:
      "Case study: Construction supply group cuts manual data prep by 70%",
    metaDescription:
      "How Ordron connected a construction-supply group's warehouse, time-tracking and ERP systems into a single live dashboard with threshold alerts.",
    challenge: [
      "Deliveries, staff hours and purchase orders lived in separate spreadsheets and emails.",
      "There was no consolidated view of project progress across depots.",
      "Data lag between logistics, finance and project management caused rework and missed signals.",
      "Every depot reported in a slightly different format.",
    ],
    solution: {
      lead:
        "Ordron built a central visibility platform that unified the operating data the business already had.",
      bullets: [
        "Connected warehouse, time-tracking and ERP systems through APIs.",
        "Built live dashboards displaying delivery status, labour hours and material costs.",
        "Configured threshold alerts for abnormal material usage, without manual review.",
        "Standardised the reporting format across every depot.",
      ],
    },
    impact: {
      stats: [
        { value: "70%", label: "Less manual data prep" },
        { value: "Days → hours", label: "Cross-team reporting cycle" },
        { value: "Proactive", label: "Resource-utilisation alerts" },
      ],
      bullets: [
        "Management started spotting under-utilised resources early, not at month-end.",
        "Finance, logistics and project teams worked off the same numbers for the first time.",
        "Alerts replaced spreadsheet archaeology when material usage spiked.",
      ],
    },
    relatedSlugs: ["industrial-mobile-procurement", "manufacturing-invoice-hub"],
  },

  {
    slug: "industrial-mobile-procurement",
    title: "Industrial contractor: mobile procurement workflow",
    cardTitle: "Mobile procurement workflow",
    industry: "Industrial Services",
    companyDescriptor:
      "Mechanical-services contractor with technicians working across remote job sites.",
    tags: ["Procurement", "Mobile", "Operations"],
    platforms: ["Mobile app", "ERP"],
    headlineStat: "Approval time: 2 days to under 2 hours",
    summary:
      "Field app with photo and GPS stamps, threshold-based approval routing, and nightly ERP sync.",
    metaTitle:
      "Case study: Industrial contractor cuts procurement approval from 2 days to 2 hours",
    metaDescription:
      "How Ordron built a mobile procurement workflow with photo and GPS capture, threshold-based approval routing and nightly ERP sync for a mechanical-services contractor.",
    challenge: [
      "Technicians bought materials on remote job sites without pre-approval.",
      "Receipts and purchase orders were stored inconsistently across multiple systems.",
      "Finance spent days each month reconciling site spend back to jobs.",
    ],
    solution: {
      lead:
        "Ordron designed and built a mobile procurement workflow app for the field team.",
      bullets: [
        "Field teams submitted purchase requests with photo and GPS stamps.",
        "Requests routed automatically to project or finance approvers based on amount thresholds.",
        "Approved transactions pushed into the client ERP each night.",
        "Every transaction carried a full audit trail tied to its job and site.",
      ],
    },
    impact: {
      stats: [
        { value: "2 days → 2 hrs", label: "Procurement approval time" },
        { value: "90%", label: "Fewer missing receipts" },
        { value: "Full audit trail", label: "Across every site" },
      ],
      bullets: [
        "Purchasing discipline returned without slowing crews down on site.",
        "Monthly reconciliation became routine instead of investigative.",
        "Compliance posture improved because every transaction had evidence attached.",
      ],
    },
    relatedSlugs: [
      "construction-ops-visibility",
      "financial-services-risk-ai",
    ],
  },

  {
    slug: "legal-ai-contracts",
    title: "Legal services firm: AI document intelligence",
    cardTitle: "AI document intelligence",
    industry: "Legal",
    companyDescriptor:
      "Legal services firm handling thousands of contracts and compliance documents each month.",
    tags: ["AI / NLP", "Document capture", "Risk & compliance"],
    platforms: ["Document management platform"],
    headlineStat: "75% faster document processing",
    summary:
      "NLP-driven extraction of dates, clauses and financial terms, with AI-assisted validation flagging anomalies for human review.",
    metaTitle:
      "Case study: Legal services firm cuts document processing time 75% with AI",
    metaDescription:
      "How Ordron deployed NLP-driven extraction and AI-assisted validation inside a legal firm's existing document management platform, cutting review time by 75%.",
    challenge: [
      "Staff manually pulled dates, clauses and financial terms out of thousands of contracts each month.",
      "Extraction was slow, inconsistent and expensive to scale.",
      "Review backlogs grew as document volume grew, with no path to keep up.",
    ],
    solution: {
      lead:
        "Ordron deployed an AI-powered document intelligence system inside the firm's existing stack.",
      bullets: [
        "Used natural language processing to automatically identify and extract key terms.",
        "Integrated directly into the firm's document management platform, not a parallel tool.",
        "Ran an AI-assisted validation workflow that flagged anomalies for human review.",
        "Kept human sign-off on anything outside the confidence threshold.",
      ],
    },
    impact: {
      stats: [
        { value: "75%", label: "Faster document processing" },
        { value: "Validation on every", label: "Document, not a sample" },
        { value: "Human-in-the-loop", label: "For anything outside threshold" },
      ],
      bullets: [
        "Compliance accuracy improved because validation ran on every document, not a sample.",
        "Senior staff shifted out of admin and into negotiation and client advisory work.",
        "The firm handled rising document volumes without a proportional headcount rise.",
      ],
    },
    relatedSlugs: ["financial-services-risk-ai", "manufacturing-invoice-hub"],
  },

  {
    slug: "financial-services-risk-ai",
    title: "Financial services firm: AI risk detection",
    cardTitle: "AI risk detection",
    industry: "Financial Services",
    companyDescriptor:
      "Financial services firm with a heavy compliance-monitoring burden on transaction flows.",
    tags: ["AI / NLP", "Risk & compliance", "Dashboards"],
    platforms: ["Compliance dashboards", "Transaction systems"],
    headlineStat: "65% reduction in manual monitoring",
    summary:
      "Machine-learning anomaly detection on transaction patterns, integrated with live compliance dashboards.",
    metaTitle:
      "Case study: Financial services firm cuts manual compliance monitoring by 65%",
    metaDescription:
      "How Ordron trained machine-learning models on a financial services firm's historical transaction patterns and fed anomaly alerts into live compliance dashboards.",
    challenge: [
      "Compliance relied on manual review of client transactions.",
      "Detecting anomalies took hours of human time each day.",
      "Response times lagged, and oversight gaps carried real regulatory risk.",
    ],
    solution: {
      lead:
        "Ordron implemented an AI-based risk detection system trained on the firm's own transaction history.",
      bullets: [
        "Deployed machine learning models on historical transaction patterns.",
        "Flagged unusual activity in real time: large transfers, inconsistent client data, off-pattern behaviour.",
        "Integrated alerts into the firm's compliance dashboards for triage.",
        "Kept final investigation decisions with the compliance team.",
      ],
    },
    impact: {
      stats: [
        { value: "65%", label: "Less manual monitoring" },
        { value: "Real-time", label: "Risk alerts to compliance" },
        { value: "Faster", label: "Regulatory response times" },
      ],
      bullets: [
        "Risks were detected earlier, strengthening both compliance posture and client trust.",
        "Compliance staff moved off routine checks and into higher-value investigations.",
        "Audit conversations became straightforward because the evidence was already there.",
      ],
    },
    relatedSlugs: ["legal-ai-contracts", "industrial-mobile-procurement"],
  },

  {
    slug: "logistics-legacy-erp-rpa",
    title: "Family-owned logistics operator: legacy ERP bridge",
    cardTitle: "Legacy ERP bridge",
    industry: "Logistics",
    companyDescriptor:
      "Family-owned logistics operator running a twenty-year-old ERP with no APIs, alongside Xero.",
    tags: ["RPA", "Legacy systems", "Reporting"],
    platforms: ["Legacy ERP", "Xero", "Google Sheets"],
    calculatorPlatformSlug: "xero-automation",
    headlineStat: "160+ hours per month saved",
    summary:
      "RPA bot that drives a legacy ERP interface, validates with SQL, and syncs clean data into Xero and reporting dashboards — without replacing the ERP.",
    metaTitle:
      "Case study: Family-owned logistics operator bridges a 20-year-old ERP with RPA",
    metaDescription:
      "How Ordron replaced 40+ hours of manual re-keying a week with an RPA workflow that drives a legacy ERP, validates via SQL and syncs into Xero and reporting dashboards.",
    challenge: [
      "A twenty-year-old ERP with no APIs and limited vendor support.",
      "Staff were re-keying invoice and job data into the ERP, then exporting it into Xero.",
      "More than 40 hours each week were burned on manual entry.",
      "Double-entry errors were frequent, and ERP replacement had been priced out.",
    ],
    solution: {
      lead:
        "Ordron implemented an RPA workflow that made the legacy ERP behave like a modern system, without replacing it.",
      bullets: [
        "Automated login and navigation of the ERP interface, the way a user would drive it.",
        "Extracted required reports and validated them with SQL checks.",
        "Synced clean data into Xero and Google Sheets dashboards.",
        "Left the legacy ERP in place. No ripping, no replacing.",
      ],
    },
    impact: {
      stats: [
        { value: "85%", label: "Less manual entry" },
        { value: "160+ hrs / month", label: "Back to the business" },
        { value: "<1%", label: "Error rate" },
      ],
      bullets: [
        "The business modernised reporting while keeping its existing ERP investment.",
        "Double-entry errors stopped because the bot and the SQL check were the single source of truth.",
        "The team got the ERP replacement benefit without the ERP replacement cost.",
      ],
    },
    relatedSlugs: ["freight-xero-ar", "distribution-ondemand-reporting"],
  },
];

export const caseStudyIndustries: CaseStudyIndustry[] = [
  "Logistics",
  "Distribution",
  "Manufacturing",
  "Construction",
  "Industrial Services",
  "Legal",
  "Financial Services",
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getRelatedCaseStudies(slug: string): CaseStudy[] {
  const current = getCaseStudyBySlug(slug);
  if (!current) return [];
  return current.relatedSlugs
    .map((s) => getCaseStudyBySlug(s))
    .filter((c): c is CaseStudy => Boolean(c));
}

/**
 * Aggregate headline metrics shown on the /case-studies hero strip.
 * Values are factual across the case studies above.
 */
export const caseStudyAggregates = {
  totalCaseStudies: caseStudies.length,
  industriesCovered: caseStudyIndustries.length,
  topManualReduction: "85%",
  topHoursReturned: "160+",
} as const;
