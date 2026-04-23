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
  | "Mobile"
  | "Custom software"
  | "Data integration";

export type CaseStudyIndustry =
  | "Logistics"
  | "Distribution"
  | "Manufacturing"
  | "Construction"
  | "Industrial Services"
  | "Legal"
  | "Financial Services"
  | "Professional Services";

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
      "How Ordron compiled daily management packs from Xero, a transport management system and Excel exports, delivered to department heads before 8 a.m.",
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
    relatedSlugs: ["legal-ai-contracts", "asset-mgmt-data-integration"],
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
      "RPA bot that drives a legacy ERP interface, validates with SQL, and syncs clean data into Xero and reporting dashboards, without replacing the ERP.",
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
    relatedSlugs: ["freight-xero-ar", "manufacturing-multi-system-flows"],
  },

  {
    slug: "manufacturing-multi-system-flows",
    title: "Mid-sized manufacturer: multi-system data flows",
    cardTitle: "Multi-system data flows",
    industry: "Manufacturing",
    companyDescriptor:
      "Mid-sized manufacturer running finance in Xero, a custom inventory tracker and Excel forecasting models.",
    tags: ["Reporting", "RPA", "Dashboards", "Data integration"],
    platforms: ["Xero", "Custom inventory", "Excel", "SQL"],
    calculatorPlatformSlug: "xero-automation",
    headlineStat: "Monthly close cycle cut by 80%",
    summary:
      "Hybrid RPA and rule-based transforms consolidate Xero, a custom inventory tracker and Excel forecasts into a single SQL-backed reporting layer.",
    metaTitle:
      "Case study: Mid-sized manufacturer cuts monthly close cycle by 80% with multi-system data flows",
    metaDescription:
      "How Ordron used RPA and rule-based transformations to unify Xero, a custom inventory tracker and Excel forecasting into a single SQL-backed reporting layer for a mid-sized manufacturer.",
    challenge: [
      "Finance lived in Xero, inventory lived in a custom tracker with no API, and forecasting lived in Excel.",
      "Staff copied data between systems by hand, which kept forecasts out of step with the finance numbers.",
      "Monthly management packs took two to three days to compile.",
      "Production planning was always working off slightly stale data.",
    ],
    solution: {
      lead:
        "Ordron designed a hybrid automation workflow that unified the three sources without rebuilding any of them.",
      bullets: [
        "RPA drove the custom inventory tracker where no API existed, on a schedule.",
        "Rule-based transformations aligned finance and operations data against a shared definition.",
        "Consolidated data landed in a SQL hub that fed automated dashboards.",
        "Exceptions were surfaced so the team could investigate mismatches instead of hunt for them.",
      ],
    },
    impact: {
      stats: [
        { value: "80%", label: "Faster monthly reporting cycle" },
        { value: "Eliminated", label: "Finance / ops mismatches" },
        { value: "Real-time", label: "Production planning signal" },
      ],
      bullets: [
        "Production planning and finance stopped arguing about whose spreadsheet was right.",
        "The monthly pack became a review exercise, not a data-wrangling exercise.",
        "Adding a new data source became a configuration change, not a rebuild.",
      ],
    },
    relatedSlugs: [
      "manufacturing-invoice-hub",
      "distribution-ondemand-reporting",
      "logistics-legacy-erp-rpa",
    ],
  },

  {
    slug: "enterprise-ap-idu",
    title:
      "Enterprise finance team: AP automation with intelligent document understanding",
    cardTitle: "Enterprise AP with IDU",
    industry: "Distribution",
    companyDescriptor:
      "Large enterprise finance team processing high monthly invoice volumes across multiple cost centres.",
    tags: ["Accounts Payable", "Document capture", "AI / NLP", "RPA"],
    platforms: ["Native AP", "ERP", "Intelligent Document Understanding"],
    headlineStat: ">95% coding accuracy, 65% faster invoice processing",
    summary:
      "RPA combined with intelligent document understanding reads, PO-matches and codes supplier invoices, routing only exceptions to humans.",
    metaTitle:
      "Case study: Enterprise AP automation, >95% coding accuracy with intelligent document understanding",
    metaDescription:
      "How Ordron combined RPA and intelligent document understanding to cut invoice processing time by 65%, achieve >95% coding accuracy and free finance staff from data entry.",
    challenge: [
      "Finance relied on manual invoice entry, reconciliations and reporting.",
      "Headcount costs were high, coding errors were common, and the process did not scale.",
      "Month-end slipped regularly because exceptions piled up without a named owner.",
    ],
    solution: {
      lead:
        "Ordron implemented an automation stack that combined RPA with intelligent document understanding, tuned to the organisation's chart of accounts.",
      bullets: [
        "Invoices were read automatically, with line-level extraction across multiple layouts.",
        "Each invoice was matched against the existing PO set and coded to the correct accounts.",
        "Exceptions were flagged to a human queue with reason codes, not dumped into a shared inbox.",
        "Throughput was preserved through volume spikes without adding headcount.",
      ],
    },
    impact: {
      stats: [
        { value: "65%", label: "Faster invoice processing" },
        { value: ">95%", label: "Coding accuracy" },
        { value: "Reduced", label: "Finance headcount needs" },
      ],
      bullets: [
        "Finance staff moved out of data entry and into analysis and supplier work.",
        "Exception rates dropped as the system learned the organisation's own patterns.",
        "Close stopped being blocked by invoice backlog.",
      ],
    },
    relatedSlugs: [
      "manufacturing-invoice-hub",
      "intelligent-invoice-multisplit",
      "logistics-ap-ocr",
    ],
  },

  {
    slug: "transport-ops-workflow",
    title: "Transport operator: daily operations workflow automation",
    cardTitle: "Daily ops workflow automation",
    industry: "Logistics",
    companyDescriptor:
      "Transport and logistics operator running multi-cost-centre resource allocation and compliance-sensitive incident reporting.",
    tags: ["Operations", "RPA", "Risk & compliance", "Dashboards"],
    platforms: ["Ops systems", "ERP", "Mobile"],
    headlineStat: "40% less manual admin, compliance reporting tightened",
    summary:
      "Digital incident capture and automated driver-and-resource allocation across cost centres, with real-time manager visibility.",
    metaTitle:
      "Case study: Transport operator cuts daily admin by 40% with ops workflow automation",
    metaDescription:
      "How Ordron automated daily resource allocation and incident reporting for a transport operator, cutting admin by 40% and improving compliance reporting accuracy.",
    challenge: [
      "Daily driver and resource allocation was run manually, across multiple cost centres.",
      "Incident reporting was paper-and-email, slow, inconsistent, and a compliance risk.",
      "Managers did not have real-time visibility of what was happening on the road.",
    ],
    solution: {
      lead:
        "Ordron built automation workflows that replaced the manual admin without disrupting dispatch.",
      bullets: [
        "Captured and classified incidents digitally at source, with required fields enforced.",
        "Automated daily driver and resource allocation across cost centres.",
        "Routed exceptions and escalations to the right manager automatically.",
        "Gave dispatch and compliance a live picture instead of end-of-day spreadsheets.",
      ],
    },
    impact: {
      stats: [
        { value: "40%", label: "Less manual admin time" },
        { value: "Tightened", label: "Compliance reporting accuracy" },
        { value: "Real-time", label: "Manager visibility" },
      ],
      bullets: [
        "Resource allocation became faster and more consistent across cost centres.",
        "Compliance reporting stopped being a month-end scramble.",
        "Managers moved from firefighting to forward planning.",
      ],
    },
    relatedSlugs: [
      "industrial-mobile-procurement",
      "logistics-legacy-erp-rpa",
      "construction-ops-visibility",
    ],
  },

  {
    slug: "intelligent-invoice-multisplit",
    title:
      "Multi-supplier operator: intelligent invoices with multi-department cost splits",
    cardTitle: "Intelligent invoices with cost splits",
    industry: "Distribution",
    companyDescriptor:
      "Multi-supplier operator processing thousands of invoices monthly with complex multi-department cost allocations.",
    tags: ["Accounts Payable", "Document capture", "AI / NLP"],
    platforms: ["Intelligent Document Understanding", "ERP"],
    headlineStat: "80%+ of complex invoices auto-processed",
    summary:
      "Custom-trained OCR and intelligent document understanding classifies invoices by supplier and department, splits costs across cost centres, and posts directly to the GL.",
    metaTitle:
      "Case study: Multi-supplier operator automates 80%+ of complex invoices with cost-split coding",
    metaDescription:
      "How Ordron used custom-trained OCR and intelligent document understanding to automate 80%+ of complex multi-department invoice splits, replacing ongoing SaaS with a one-time build.",
    challenge: [
      "Off-the-shelf tools handled simple invoices but failed on anything that needed a multi-department cost split.",
      "Manual intervention crept back in for the exact invoices that cost the most to process by hand.",
      "Ongoing SaaS costs did not track with the value actually being automated.",
    ],
    solution: {
      lead:
        "Ordron deployed intelligent document understanding with custom-trained OCR tuned to the operator's supplier mix.",
      bullets: [
        "Classified invoices automatically by supplier and department profile.",
        "Split costs across multiple cost centres against configurable rules.",
        "Posted results directly into the accounting system, with audit trail.",
        "Scaled to new suppliers and invoice formats without vendor dependency.",
      ],
    },
    impact: {
      stats: [
        { value: "80%+", label: "Invoices fully automated" },
        { value: "~5%", label: "Manual intervention rate" },
        { value: "One-time build", label: "Instead of recurring SaaS" },
      ],
      bullets: [
        "Complex multi-split invoices stopped being a manual bottleneck.",
        "The finance team could onboard new suppliers without a vendor ticket.",
        "Automation economics moved from subscription to a defined build cost.",
      ],
    },
    relatedSlugs: [
      "enterprise-ap-idu",
      "manufacturing-invoice-hub",
      "logistics-ap-ocr",
    ],
  },

  {
    slug: "events-logistics-platform",
    title: "Events logistics operator: custom coordination platform",
    cardTitle: "Custom events coordination platform",
    industry: "Logistics",
    companyDescriptor:
      "Events logistics operator coordinating staff, vehicles and equipment across large setups.",
    tags: ["Custom software", "Operations", "Mobile", "Dashboards"],
    platforms: ["Custom web app", "Mobile"],
    headlineStat: "40% faster project delivery",
    summary:
      "Centralised booking and scheduling, automated inventory tracking and a mobile field interface replacing spreadsheet-and-email coordination.",
    metaTitle:
      "Case study: Events logistics operator lifts project delivery speed 40% with a custom platform",
    metaDescription:
      "How Ordron built a custom coordination platform for an events logistics operator: centralised scheduling, automated inventory tracking and a mobile field interface.",
    challenge: [
      "Equipment, staff and deliveries were tracked across spreadsheets and email threads.",
      "As project scale grew, miscommunication and missed inventory became the norm.",
      "Clients had no live view of setup progress, which ate into trust at the point of delivery.",
    ],
    solution: {
      lead:
        "Ordron built a custom web application that replaced the spreadsheet coordination layer, without throwing away what worked.",
      bullets: [
        "Centralised booking and scheduling of staff, vehicles and equipment.",
        "Automated inventory tracking for event materials, with real-time availability.",
        "Mobile interface for on-site staff to log deliveries and resolve issues at source.",
        "Live progress view for clients, without the back-and-forth email chain.",
      ],
    },
    impact: {
      stats: [
        { value: "40%", label: "Faster project delivery" },
        { value: "Eliminated", label: "Manual coordination errors" },
        { value: "Live", label: "Client visibility of setup" },
      ],
      bullets: [
        "Coordination effort across staff, vehicles and equipment collapsed into a single workflow.",
        "On-site teams resolved issues without waiting on office callbacks.",
        "Project profitability improved as missing-inventory rework disappeared.",
      ],
    },
    relatedSlugs: [
      "construction-ops-visibility",
      "industrial-mobile-procurement",
      "transport-ops-workflow",
    ],
  },

  {
    slug: "advisory-excel-to-enterprise",
    title:
      "Financial advisory firm: from Excel models to an enterprise platform",
    cardTitle: "Excel models to an enterprise platform",
    industry: "Professional Services",
    companyDescriptor:
      "Mid-sized financial advisory firm running client deliverables inside complex, long-lived Excel models.",
    tags: ["Custom software", "Operations", "Legacy systems", "Dashboards"],
    platforms: ["Excel", "Cloud application"],
    calculatorPlatformSlug: "excel-automation",
    headlineStat: "2x client capacity without adding headcount",
    summary:
      "Secure cloud application that preserves the spreadsheet logic, adds multi-user access and role permissions, and automates consolidation.",
    metaTitle:
      "Case study: Financial advisory firm doubles client capacity without added headcount by retiring Excel bottlenecks",
    metaDescription:
      "How Ordron translated a financial advisory firm's Excel-based client workflow into a secure cloud platform with multi-user access, role permissions and automated consolidation.",
    challenge: [
      "Complex Excel models worked for a smaller book, but broke as client volume grew.",
      "No version control and no meaningful multi-user access made collaboration painful.",
      "Manual consolidation across spreadsheets created silent errors with real commercial impact.",
    ],
    solution: {
      lead:
        "Ordron built a custom enterprise application that kept the firm's hard-earned model logic and retired the spreadsheet fragility.",
      bullets: [
        "Translated critical Excel workflows into a secure, cloud-based application.",
        "Introduced multi-user access with role-based permissions on every record.",
        "Automated data consolidation across models, with validated inputs.",
        "Preserved the domain logic the firm had refined over years.",
      ],
    },
    impact: {
      stats: [
        { value: "2×", label: "Client capacity without extra staff" },
        { value: "Eliminated", label: "Spreadsheet-driven errors" },
        { value: "Centralised", label: "Source of truth for client data" },
      ],
      bullets: [
        "Advisor collaboration became concurrent instead of sequential.",
        "Onboarding new clients stopped depending on cloning a fragile workbook.",
        "The firm could grow the book without growing the headcount in lock-step.",
      ],
    },
    relatedSlugs: [
      "asset-mgmt-data-integration",
      "pe-analytics-ai-ready",
      "manufacturing-multi-system-flows",
    ],
  },

  {
    slug: "asset-mgmt-data-integration",
    title: "Regional asset manager: custom data integration platform",
    cardTitle: "Custom data integration platform",
    industry: "Financial Services",
    companyDescriptor:
      "Regional asset management firm with client and market data fragmented across external APIs, internal spreadsheets and third-party systems.",
    tags: ["Data integration", "Reporting", "Dashboards", "Operations"],
    platforms: ["Market data APIs", "Excel", "Cloud database"],
    headlineStat: "70% less manual data prep",
    summary:
      "External market APIs, internal Excel and third-party sources unified into a single validated cloud database with real-time advisor dashboards.",
    metaTitle:
      "Case study: Regional asset manager cuts manual data prep 70% with a custom data integration platform",
    metaDescription:
      "How Ordron unified a regional asset manager's market APIs, Excel sheets and third-party feeds into a single validated cloud database, surfaced as real-time advisor dashboards.",
    challenge: [
      "Critical client and market data lived across market feeds, client spreadsheets and third-party APIs.",
      "Advisors aggregated it by hand, which caused integrity issues and delays.",
      "Reporting lagged the underlying data, and the book was running faster than the process.",
    ],
    solution: {
      lead:
        "Ordron delivered a custom integration layer that pulled, standardised and served the data the advisors already needed.",
      bullets: [
        "Pulled data automatically from external APIs and internal Excel sources on schedule.",
        "Standardised and validated every field before storing in a secure cloud database.",
        "Exposed a real-time dashboard and automated reports to the advisor team.",
        "Built so new providers could be added without a rebuild.",
      ],
    },
    impact: {
      stats: [
        { value: "70%", label: "Less manual data prep" },
        { value: "Real-time", label: "Advisor access to client data" },
        { value: "Scalable", label: "For additional data providers" },
      ],
      bullets: [
        "Advisors stopped starting every client meeting with a reconciliation pass.",
        "Data integrity issues became rare and surfaced fast when they did appear.",
        "The firm could onboard new data providers without re-engineering the pipeline.",
      ],
    },
    relatedSlugs: [
      "advisory-excel-to-enterprise",
      "pe-analytics-ai-ready",
      "financial-services-risk-ai",
    ],
  },

  {
    slug: "pe-analytics-ai-ready",
    title: "Private equity analytics provider: AI-ready portfolio platform",
    cardTitle: "AI-ready portfolio platform",
    industry: "Professional Services",
    companyDescriptor:
      "Private equity analytics provider building a portfolio management platform with a clear AI roadmap and no premature bets.",
    tags: ["Custom software", "AI / NLP", "Data integration", "Dashboards"],
    platforms: ["Custom application", "Cloud"],
    headlineStat: "Lean MVP live, modular AI roadmap in place",
    summary:
      "Modular, API-first architecture that delivers a lean MVP now and treats AI capabilities as plug-in modules for later.",
    metaTitle:
      "Case study: Private equity analytics provider ships a lean, AI-ready portfolio platform",
    metaDescription:
      "How Ordron designed a modular, API-first platform that shipped a lean MVP for a PE analytics provider while leaving a clear AI roadmap — predictive analytics and NLP as plug-in modules.",
    challenge: [
      "The team wanted the platform future-proofed for AI, but not loaded up with features that might go obsolete before they were used.",
      "Investors expected an AI story without being sold vapourware.",
      "A classic trade-off: ship something practical now, or build for a future that had not arrived yet.",
    ],
    solution: {
      lead:
        "Ordron built the application with a modular, API-first design so the AI story could land incrementally.",
      bullets: [
        "Core system delivered the immediate MVP that users needed on day one.",
        "AI capabilities were scoped as optional plug-in modules, not baked into the core.",
        "Examples in the roadmap included predictive analytics and NLP-driven insights.",
        "Architecture was designed to evolve with AI advances, without a rebuild.",
      ],
    },
    impact: {
      stats: [
        { value: "Lean MVP", label: "Launched on time" },
        { value: "Modular", label: "AI roadmap for investors" },
        { value: "Upgrade-friendly", label: "Architecture" },
      ],
      bullets: [
        "The client launched quickly with a product users could actually use.",
        "Future investors had a concrete, credible AI integration story.",
        "AI modules could be added on evidence, not on hype.",
      ],
    },
    relatedSlugs: [
      "advisory-excel-to-enterprise",
      "asset-mgmt-data-integration",
      "legal-ai-contracts",
    ],
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
  "Professional Services",
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

/** Case studies grouped by industry, used on the /case-studies index page. */
export const caseStudiesByIndustry: {
  industry: CaseStudyIndustry;
  studies: CaseStudy[];
}[] = caseStudyIndustries
  .map((industry) => ({
    industry,
    studies: caseStudies.filter((c) => c.industry === industry),
  }))
  .filter((group) => group.studies.length > 0);

/**
 * Aggregate headline metrics shown on the /case-studies hero strip.
 * Values are factual across the case studies above.
 */
export const caseStudyAggregates = {
  totalCaseStudies: caseStudies.length,
  industriesCovered: caseStudiesByIndustry.length,
  topManualReduction: "85%",
  topHoursReturned: "160+",
} as const;
