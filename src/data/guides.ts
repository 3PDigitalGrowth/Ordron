/**
 * Cluster guide data
 * ------------------------------------------------------------------
 * Source of truth for every /guides/[slug] page. One entry in
 * `guides` renders a full pillar guide via src/app/guides/[slug]/page.tsx.
 *
 * Each guide is a function-level pillar (AP, AR, Reconciliations,
 * Month-end close) with a distinct editorial frame so the four guides
 * do not read as structural clones of each other.
 *
 * Slugs are locked in and must match:
 *   - GUIDE_BLURBS in src/data/platforms.ts
 *   - CATEGORY_GUIDE in src/app/platforms/[slug]/components/PlatformAutomations.tsx
 * so the related-guides links on all 13 platform hubs resolve.
 */

export type GuideCategory =
  | "Accounts payable"
  | "Accounts receivable"
  | "Reconciliations"
  | "Month-end close";

export type GuideHoursLeak = {
  title: string;
  description: string;
  /** Optional typical-hours range, e.g. "5 to 9 hrs/wk" or "1 to 2 days/month". */
  typicalHours?: string;
};

export type GuideAutomationStep = {
  title: string;
  description: string;
};

export type GuidePlatformNote = {
  /** Must match a slug in src/lib/platforms.ts. */
  platformSlug: string;
  note: string;
};

export type GuideMistake = {
  title: string;
  description: string;
};

export type GuidePrinciple = {
  title: string;
  description: string;
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideProblemSection = {
  heading: string;
  bodyParagraphs: string[];
  keyStatOrCallout: string;
};

export type Guide = {
  slug: string;
  title: string;
  category: GuideCategory;
  /** Short editorial label shown above the hero h1. */
  eyebrow: string;
  /** Sub-headline under the hero h1. One sentence. */
  heroTagline: string;
  /** 60 to 90 word "what this guide covers" preamble. */
  whatItCovers: string;
  theProblemSection: GuideProblemSection;
  whereTheHoursGo: GuideHoursLeak[];
  costOfInactionCallout: string;
  howAutomationActuallyWorks: GuideAutomationStep[];
  platformSpecificNotes: GuidePlatformNote[];
  commonMistakes: GuideMistake[];
  whatGoodLooksLike: GuidePrinciple[];
  faqs: GuideFaq[];
  /** Platform slugs cross-linked from the "go deeper" block. */
  relatedPlatformSlugs: string[];
  /** Case study slugs cross-linked from the "proof" block. */
  relatedCaseStudySlugs: string[];
  searchTerms: string[];
};

export const guides: Guide[] = [
  {
    slug: "accounts-payable-automation",
    title: "Accounts payable automation for Australian finance teams",
    category: "Accounts payable",
    eyebrow: "Automation guide",
    heroTagline:
      "Intake, coding, approval, posting and exception handling as one pipeline, not five bolted-on tools. Built for the Australian mid-market.",
    whatItCovers:
      "This guide is for Australian finance leaders scoping AP automation before they brief a vendor or sign a contract. It covers the full AP pipeline: how supplier invoices land, how they are coded, how they get approved, how they post, and how exceptions are handled. The focus is on AP as a flow, because that is where the compounding cost lives. You will finish knowing what the mechanics look like, what good looks like, and where your current AP is probably leaking hours you have not measured.",
    theProblemSection: {
      heading:
        "Why AP is still the biggest manual drag in Australian finance teams",
      bodyParagraphs: [
        "AP is the hardest finance function to pretend is fine. The volume is unavoidable, the variance is high, and the penalty for a missed detail, duplicate paid, late payment or wrong coding, compounds across supplier relationships and audit. Most Australian mid-market teams have stitched together a partial AP setup over the years: a Hubdoc or Dext layer at the front, the accounting platform at the back, and a human in the middle doing three things that should be automated and one thing that genuinely needs a human.",
        "The trap is thinking of AP as a single step that can be outsourced to a tool. AP is a pipeline. The moment one stage is unreliable, the whole pipeline reverts to manual review. A capable AP team will tell you the work is not coding one invoice, it is triaging the batch: which of these 80 invoices need a human, which can post now, which are waiting on PO receipts, which look like a duplicate of something paid last week. That triage is the real AP job, and it is what automation has to do, not just read the invoice.",
      ],
      keyStatOrCallout:
        "A five-person AP team processing 1,500 invoices a month at a $55 blended rate burns roughly $104,000 a year on work that should be a review exercise, not a data-entry exercise.",
    },
    whereTheHoursGo: [
      {
        title: "Re-keying bill header and line data from PDF to the ledger",
        description:
          "Even with Hubdoc or Dext in front of the ledger, the coding step is typically still manual. Suppliers drift across 40 PDF templates, and the capture layer never nails GL code, tracking category and job reference together. Finance opens the PDF anyway, confirms the vendor, corrects the category, and only then posts.",
        typicalHours: "6 to 12 hrs/wk",
      },
      {
        title: "Chasing approvers on bills that have sat in a queue for a week",
        description:
          "Approval chase-up is the most consistently underestimated AP cost. A bill enters the workflow, the approver ignores the email, finance notices on Friday, messages, waits, re-escalates. Every recurring bill drags the same cycle every month. Time to approval, not time to code, is what blows out payment runs.",
        typicalHours: "3 to 6 hrs/wk",
      },
      {
        title:
          "Matching bills to POs and receiving records across disconnected systems",
        description:
          "Two-way and three-way matching breaks when the PO lives in the ERP, the bill lives in the ledger, and the receiving record lives in a warehouse system. AP rebuilds the match by hand, tolerance-checking price and quantity against an email from operations, and posts against a GL code someone copied from last month.",
        typicalHours: "4 to 8 hrs/wk",
      },
      {
        title: "Duplicate detection done from memory on a Tuesday afternoon",
        description:
          "Supplier duplicates are the silent AP cost. The same invoice arrives twice, once as a PDF, once as a resend, sometimes under a subtly different reference. Without learned matching across supplier plus amount plus reference plus date, duplicates slip through, and clawing a duplicate payment back is always more expensive than preventing it.",
        typicalHours: "1 to 3 hrs/wk",
      },
      {
        title: "Month-end AP cut-off and accruals built by hand",
        description:
          "Bills that should have posted before month-end but are still in the inbox, bills received early but relating to next month, accruals for goods received not invoiced. Every one of these is done manually in most AP setups, usually by the senior accountant, usually on the night before close, usually with a spreadsheet.",
        typicalHours: "1 to 2 days/month",
      },
    ],
    costOfInactionCallout:
      "If five AP leaks above each cost eight hours a week across a mid-market team, that is roughly 2,080 hours a year at $55 blended. Around $104,000 of finance capacity sitting inside a function that should be a review cycle, not a production line.",
    howAutomationActuallyWorks: [
      {
        title: "Intake: a single entry point for every supplier invoice",
        description:
          "Every supplier is directed to one AP email address or portal, and every channel (PDFs attached to emails, forwarded from operations, uploaded from a supplier portal, captured from Hubdoc or Dext) lands in the same queue. The goal at intake is not to read the invoice yet; it is to make sure no invoice enters the business through a path the automation cannot see. Shared inboxes with 40,000 emails are replaced by a structured intake log.",
      },
      {
        title: "OCR and line-level extraction tuned to your supplier mix",
        description:
          "An OCR layer pulls header fields (supplier, invoice number, date, total, tax) and line-level detail (description, amount, tax treatment) across the 30 to 50 supplier templates that cover most of your spend. The quality bar is not 100% accuracy on every supplier; it is a known confidence score per field, so the system knows what it is confident enough to post and what needs human review.",
      },
      {
        title: "Coding by a trained classifier, not a fixed rule table",
        description:
          "Supplier plus description plus historical coding pattern feeds a classifier trained on your own chart of accounts, tracking categories and job references. The output is a proposed bill with GL, tracking and job pre-filled to a confidence threshold. Rules still handle the trivial cases (utilities always hit the utilities code). The classifier earns its keep on the long tail where rules would need constant maintenance.",
      },
      {
        title:
          "Matching to PO and receiving records, with tolerance surfaced, not hidden",
        description:
          "Where POs exist, the incoming bill is matched against the open PO and the receiving record, with unit-price and quantity tolerances set at the account or supplier level. Matches inside tolerance auto-post. Mismatches route to a named owner (not a shared inbox) with the variance itemised: price delta, quantity delta, which line failed, and the last five bills from the same supplier for context.",
      },
      {
        title:
          "Approval routing with audit trail, on the device the approver actually uses",
        description:
          "Approvers receive a mobile-friendly link with the invoice image, the proposed coding, the historical context for the supplier, and a single tap to approve or reject. Delegation of authority is enforced in the workflow, not in an email thread. Every approval, edit and rejection writes back to the ledger with identity, timestamp and IP that stands up to an external audit.",
      },
      {
        title: "Exception handling as a first-class stage, not an afterthought",
        description:
          "Exceptions (failed match, missing PO, likely duplicate, unexpected supplier, over-threshold amount) go to a named owner with a reason code and an SLA. The exception queue is the CFO's single dashboard into AP health: how many, which type, whose desk, how old. Unresolved exceptions are the leading indicator of where AP is breaking next, well before they show up as a late payment or a duplicated spend.",
      },
    ],
    platformSpecificNotes: [
      {
        platformSlug: "xero-automation",
        note: "Xero's native AP is strong at the bottom of the pipeline (bill posting, bank payment) and thin at the top (intake, coding, matching). Automation layers in front of Xero: dedicated intake, OCR, trained coder, PO matching where a PO exists. Xero stays the ledger. Approvals write back with a full audit trail so nothing escapes the Xero approvals timeline.",
      },
      {
        platformSlug: "myob-automation",
        note: "MYOB AP automation does more lifting via RPA than Xero equivalents because MYOB's API coverage is patchier. A bridging layer mirrors bills into MYOB against the coding rules the business already uses, and payroll-adjacent AP (contractors on PAYG, ABA file generation) routes exceptions to a finance lead before posting.",
      },
      {
        platformSlug: "netsuite-automation",
        note: "NetSuite AP is usually over-customised three years in. Automation sits alongside SuiteScript rather than replacing it, using SuiteTalk where possible and RPA where SuiteScript has become a bottleneck. Multi-entity bills (bill in one entity, payment from another) are handled end-to-end, including the inter-company recharge posting.",
      },
      {
        platformSlug: "sap-automation",
        note: "SAP AP is clickpath-heavy and API-light in the mid-market. Automation runs as RPA against the same MIRO and FB60 screens the AP clerks use, with BAPI calls where they are exposed. The data model is mirrored outside SAP so reporting, duplicate detection and exception routing do not depend on SAP's own reporting layer.",
      },
      {
        platformSlug: "concur-automation",
        note: "SAP Concur handles the expense side of AP, not the supplier invoice side. The automation opportunity is the policy-exception triage (800 flagged, 780 fine, 20 that matter) and the GL posting from Concur into the accounting or ERP back end. Without that, Concur is capture, not close-to-GL.",
      },
      {
        platformSlug: "hubdoc-automation",
        note: "Hubdoc captures well, codes partially. The full AP pipeline layers coding, approval, matching and exception handling on top of Hubdoc's output, and mirrors the Hubdoc archive into a queryable data layer. Otherwise three years of Hubdoc data is a write-only system nobody can report against.",
      },
    ],
    commonMistakes: [
      {
        title: "Buying an AP tool before fixing the supplier master",
        description:
          "Every AP automation project fails the same way if the supplier master is dirty. Duplicate suppliers, missing ABNs, inconsistent naming (the same supplier across three records) turn automated coding into automated mis-coding. Clean the supplier master first. It is a one-week job and it is the single cheapest improvement in the whole project.",
      },
      {
        title: "Automating intake without automating exception handling",
        description:
          "OCR and auto-coding get most of the headlines. Exception handling gets most of the value. If the automation cannot decide what to do with a mismatch, a missing PO, or a suspected duplicate, finance reviews every invoice anyway, just more efficiently. Design the exception paths before you design the happy path.",
      },
      {
        title: "Treating approval routing as an email workflow",
        description:
          "Approvals in an email inbox are not a workflow, they are a suggestion. Approvers ignore emails, escalations get lost, and the audit trail is a search string through Outlook. Approvals belong in an auditable workflow surface, on the device the approver actually uses, with delegation enforced in the system rather than through a reminder text.",
      },
      {
        title: "Measuring AP automation success by volume, not by exception rate",
        description:
          "Processing 95% of invoices automatically is not the win if the 5% exceptions take more human hours than the old fully-manual process did. The right metric is exception rate and exception resolution time, not headline throughput. Track the exception queue on day one, not as a reporting afterthought.",
      },
    ],
    whatGoodLooksLike: [
      {
        title: "Every invoice enters through one logged intake path",
        description:
          "Shared inboxes, supplier portals and forwarded PDFs funnel into one queue with a unique ID per invoice. No invoice is invisible to the automation.",
      },
      {
        title: "Every exception has a named owner and an SLA",
        description:
          "Exception categories are defined in advance (missing PO, over-tolerance, duplicate suspected, unknown supplier) and each has a human owner with a response time. No exception sits in a shared inbox.",
      },
      {
        title: "Audit trail is a by-product, not a separate project",
        description:
          "Every action on every invoice (received, coded, approved, posted, paid) writes to an immutable log with identity and timestamp. External audit becomes a query, not a scramble.",
      },
      {
        title:
          "Duplicate detection runs on supplier, amount, reference and date, not just invoice number",
        description:
          "Learned fuzzy matching catches the resends and the near-duplicates that exact-match logic misses. The cost of a daily detection run is trivial against a single prevented duplicate payment.",
      },
      {
        title:
          "The CFO has one dashboard with three numbers: volume, exception rate, time-to-pay",
        description:
          "Not a 40-widget dashboard nobody opens. Three numbers that show whether AP is healthy, drifting or broken, with drill-down only when a number moves.",
      },
    ],
    faqs: [
      {
        question:
          "How long does AP automation usually take to implement for a mid-market finance team?",
        answer:
          "A typical mid-market AP automation engagement goes live inside 8 to 12 weeks. The first 2 weeks are supplier master clean-up and process mapping. The next 4 to 6 weeks build the intake, OCR, coder and approval workflow against your existing ledger. The final 2 to 4 weeks run in parallel with manual processing, tune the confidence thresholds against your own data, and cut over once the exception rate is stable.",
      },
      {
        question:
          "We already run Hubdoc or Dext. Does AP automation replace them or build on top?",
        answer:
          "Build on top. Hubdoc and Dext are capture layers, not full AP pipelines. Keep them for ingestion and use the automation layer above them for coding, matching, approval routing and exception handling. Historical Hubdoc or Dext data is mirrored into a queryable store so three years of invoice history becomes a resource rather than a write-only archive.",
      },
      {
        question:
          "What happens to an invoice that does not match an open PO or has a price variance outside tolerance?",
        answer:
          "It routes to a named exception owner, not to a shared inbox. The exception entry shows the invoice, the PO it tried to match against, the specific variance (price delta, quantity delta, missing receipting), the last five bills from the same supplier, and a recommended action. The owner resolves it inside a defined SLA. Nothing that failed a match posts silently.",
      },
      {
        question:
          "How do approval thresholds and delegation of authority actually get enforced?",
        answer:
          "The delegation of authority matrix is configured in the workflow layer, not in email. A bill over $5,000 routes to the GM. A bill over $50,000 routes to the CFO plus the GM. Leave coverage routes automatically to the delegate for the period. Every approval carries the identity, the threshold it was approved under, and the timestamp, which means the DOA is both enforceable and auditable.",
      },
      {
        question: "Can AP automation realistically catch duplicate invoices?",
        answer:
          "Yes, and catching duplicates is usually one of the first payback items. Learned matching runs on supplier plus amount plus reference plus date plus line-level fingerprints, not just invoice number. Most mid-market teams prevent one to three duplicate payments a year at five-figure sums, and the ROI math works on duplicate prevention alone for most mid-market volumes.",
      },
      {
        question:
          "What is the minimum invoice volume at which AP automation starts to make sense?",
        answer:
          "Roughly 200 invoices a month is where the business case becomes obvious. Below that, the manual process still fits in one person's workload. Above that, especially above 500 a month, the finance team is always triaging rather than reviewing, and automation is less about hours saved and more about capacity that would otherwise require a hire.",
      },
      {
        question:
          "How does automated AP fare under external audit or SOX-style review?",
        answer:
          "Better than manual, if it is built right. Every action (capture, extraction, coding, approval, posting) writes an immutable audit entry with identity, timestamp and the system component that performed it. Segregation of duties is configured in the workflow. External auditors typically prefer automated AP because the evidence is complete and queryable rather than scattered through inboxes.",
      },
    ],
    relatedPlatformSlugs: [
      "xero-automation",
      "myob-automation",
      "netsuite-automation",
      "sap-automation",
      "concur-automation",
      "hubdoc-automation",
    ],
    relatedCaseStudySlugs: [
      "logistics-ap-ocr",
      "manufacturing-invoice-hub",
      "enterprise-ap-idu",
    ],
    searchTerms: [
      "accounts payable automation australia",
      "ap automation",
      "ap automation australia",
      "invoice automation australia",
      "ap pipeline automation",
      "accounts payable software australia",
      "ap workflow automation",
      "ap process automation",
      "supplier invoice automation",
      "ap coding automation",
    ],
  },

  {
    slug: "accounts-receivable-automation",
    title: "Accounts receivable automation for Australian finance teams",
    category: "Accounts receivable",
    eyebrow: "Automation guide",
    heroTagline:
      "Closing the gap between billed and banked. Remittance matching, collections and aged-debtor visibility without the Friday clean-up.",
    whatItCovers:
      "This guide is for Australian finance leaders who already know AR matters and want to know what automating it actually means. It reframes the work: the value is not faster invoicing, it is faster cash conversion. You will learn where the AR hours hide (mostly in matching and chasing, rarely in sending), what the mechanics of AR automation look like end-to-end, how AR differs on Xero vs MYOB vs NetSuite vs QuickBooks, and what good AR looks like once the chase-up spreadsheet is retired.",
    theProblemSection: {
      heading:
        "Why AR automation is a cash problem, not a cost problem",
      bodyParagraphs: [
        "AR is the one finance function where automation ROI is a DSO calculation, not a labour calculation. Every day an invoice sits unpaid ties up cash that could be working somewhere else. Most mid-market teams have a decent handle on sending invoices: the accounting platform will issue a recurring invoice, a tracking tool will log it, an email will hit the client. The mismatch between the number of tools that help you issue an invoice and the number that help you match the payment is the first symptom that AR is being treated backwards.",
        "The second symptom is the chase-up spreadsheet. Every finance team keeps one, in some form: a weekly view of aged debtors, built by hand, updated on Thursday, out of date by Monday. The chase-up spreadsheet exists because the accounting platform cannot be trusted to age debtors correctly without a human pass. That trust problem is what AR automation has to solve. Not more reminder emails; a collections surface the CFO can believe on a Tuesday morning without asking anyone to refresh it.",
      ],
      keyStatOrCallout:
        "A $30M AU business running 60-day DSO instead of 45-day DSO has around $1.2M tied up in working capital that should be sitting in the operating account. That is the number AR automation moves, and it dwarfs the hours-saved figure.",
    },
    whereTheHoursGo: [
      {
        title: "Matching remittances against multi-invoice lump-sum payments",
        description:
          "A client pays $47,812.30. It covers seven invoices, one short-paid by $112 because of a disputed freight charge, plus an earlier credit. The accounting platform offers one auto-match against the wrong invoice. Finance opens the client's remittance PDF, reconciles by hand, writes the short-pay up as a credit note, and moves on. This is the single most common AR time-sink.",
        typicalHours: "5 to 9 hrs/wk",
      },
      {
        title: "Chasing overdue invoices with templates that never get personalised",
        description:
          "Collections belongs to the most senior person in AR because every email requires judgement: which client can get a firm reminder, which client needs a soft touch, which client's issue is actually a dispute. The template everyone keeps meaning to improve stays in draft, and every follow-up takes five minutes of thought that should have been a workflow decision.",
        typicalHours: "3 to 6 hrs/wk",
      },
      {
        title: "Reconciling disputed invoices back into the AR ledger",
        description:
          "A dispute (wrong price, missing line, unauthorised service) usually lives in email, not in the ledger. The invoice still shows as overdue, the collections process keeps running on it, and the client stops trusting the statement. Reconciling disputes into the AR ledger with credit notes, partial adjustments and a status field is one of the least automated steps in most mid-market setups.",
        typicalHours: "2 to 4 hrs/wk",
      },
      {
        title: "Rebuilding the aged-debtors report for the Thursday cash meeting",
        description:
          "The accounting platform produces an aged-debtors report. Nobody trusts it. Finance exports it, cross-references against the disputes spreadsheet, adjusts for in-flight payments, and hand-builds the Thursday meeting pack. By Friday the report is stale. The rebuild cycle is the clearest symptom that AR visibility is not automated, just formatted.",
        typicalHours: "2 to 3 hrs/wk",
      },
      {
        title: "Billing for project, milestone or usage-based revenue",
        description:
          "Recurring billing is easy to automate. Project and milestone billing is where the hours hide: calculating the invoice amount from a timesheet plus expenses plus milestone event, applying the right discount and tax, issuing in the right currency, logging it against the engagement. This is the step most mid-market AR teams still do manually every fortnight.",
        typicalHours: "1 to 2 days/month",
      },
    ],
    costOfInactionCallout:
      "15 days of DSO on a $30M AU business is roughly $1.2M in working capital. Before a single finance hour is counted, the cash-conversion prize is the reason AR automation pays back first.",
    howAutomationActuallyWorks: [
      {
        title: "One source of truth for invoice issuance, whatever the billing model",
        description:
          "Recurring, project, milestone, usage and fixed-fee billing all issue from the same billing layer, against the same engagement record. The ledger is the destination, not the source. This is the step that eliminates the 'was this already invoiced' question, which is the root cause of most AR exceptions downstream.",
      },
      {
        title: "Remittance capture and structured matching",
        description:
          "Client remittances arrive as PDFs, as CSV attachments, as portal exports or as bank references. A capture layer turns each into structured rows (invoice reference, amount paid, short-pay reason). Matching runs against the open AR ledger with tolerance for reference drift and partial payments. The output is a clean set of reconciled items and a queue of genuine unknowns, not a spreadsheet.",
      },
      {
        title:
          "Collections as a staged, personalised sequence, not a blanket template",
        description:
          "Each client has a profile: payment history, relationship tier, dispute history, days-overdue pattern. The collections sequence varies by profile (a long-standing client on a one-off late payment gets a different note to a serial offender), and the content is written in the firm's voice. Exceptions escalate to a human, not to a template.",
      },
      {
        title:
          "Dispute tracking as a first-class status on the invoice, not a shadow spreadsheet",
        description:
          "Disputes are logged against the invoice with a reason, an owner, an age and a resolution path (full credit, partial credit, accepted). The collections automation sees the dispute status and suppresses chase-up until it resolves. The aged-debtors view shows disputed and genuinely-overdue separately. The shadow spreadsheet retires.",
      },
      {
        title: "Live aged-debtors view with drill-down, refreshed without human input",
        description:
          "The Thursday report becomes a Tuesday-morning dashboard. Each AR number is traceable to the invoice, the client, the dispute status and the last action taken. The CFO stops asking for the report because the report is always current. Forecasting moves from 'what did we collect last month' to 'what are we likely to collect next fortnight'.",
      },
      {
        title:
          "Exception handling: unmatched remittances, orphan payments and silent short-pays",
        description:
          "Payments that cannot be matched automatically (wrong reference, unknown client, suspected chargeback) route to a named owner with the bank transaction, the likely candidates, and the client history attached. Short-pays under threshold auto-write to a reason code; short-pays above threshold escalate. Orphan payments do not sit in suspense for three months.",
      },
    ],
    platformSpecificNotes: [
      {
        platformSlug: "xero-automation",
        note: "Xero handles invoice issuance cleanly, including recurring invoices. The gap is remittance matching on lump-sum payments and aged-debtor trust. Automation layers a structured remittance capture, staged collections and a live aged view alongside Xero, with reconciled entries written back to the ledger and disputes flagged against the invoice record.",
      },
      {
        platformSlug: "myob-automation",
        note: "MYOB AR carries the same recurring-invoice capability as Xero but with a patchier API, so remittance capture and aged-debtor reporting rely on a bridging layer into a controlled data store. Collections sequences run off the bridge rather than directly against MYOB, which keeps the AR workflow stable when MYOB versions change.",
      },
      {
        platformSlug: "netsuite-automation",
        note: "NetSuite AR is deep and usually under-used. Automation sits on top of NetSuite's customer records and uses SuiteTalk for invoice events. Multi-entity AR (invoice one entity, receipt in another) is handled end-to-end, and project-based billing (SuiteProjects or custom modules) ties into the same issuance pipeline, so billing does not drift between AR and PSA.",
      },
      {
        platformSlug: "quickbooks-automation",
        note: "QuickBooks AR in Australia almost always involves a cross-border angle: offshore clients on AUD invoices, project billing in USD or GBP, consolidation up to a parent entity. Automation handles the currency, the GST treatment on cross-border work, and the matching of remittances that settle in a different currency to the invoice, which is where manual QuickBooks AR usually breaks.",
      },
      {
        platformSlug: "ignition-automation",
        note: "Ignition is the AR entry point for Australian practices and professional services firms: proposal, engagement letter, recurring billing. Automation reconciles Ignition-issued invoices against the accounting ledger (Xero, MYOB, QuickBooks) so the Friday reconciliation stops, and exceptions (failed recurring, partial payments, plan changes) route to a practice owner rather than sitting in a shared inbox.",
      },
    ],
    commonMistakes: [
      {
        title: "Automating sending before automating matching",
        description:
          "Most teams start with 'send invoices faster' and leave matching for later. This is the wrong order. Issuance is rarely the bottleneck; matching remittances is. Automating issuance first produces more invoices that then still need to be matched manually on the way back in, which is the opposite of cash-conversion progress.",
      },
      {
        title: "Treating all clients the same in collections",
        description:
          "A generic reminder sequence damages relationships with long-standing clients and has no teeth on serial late-payers. AR automation that does not segment the client base by payment history and relationship tier ends up being turned off by the CFO inside a quarter because it caused a customer complaint.",
      },
      {
        title: "Letting disputes live in email",
        description:
          "If a dispute is not a structured status on the invoice, the collections automation keeps chasing it and the aged-debtors report keeps showing it. The highest-leverage AR fix for many mid-market teams is moving disputes out of email threads and into the invoice record, before any other automation is switched on.",
      },
      {
        title: "Measuring AR automation by invoices sent, not by DSO",
        description:
          "Number of invoices issued automatically is an activity metric. Days sales outstanding is the business metric. If DSO does not move, the automation is not working, regardless of how many invoices it sent. Track DSO weekly from day one and wire the reporting layer to show it alongside collections actions taken.",
      },
    ],
    whatGoodLooksLike: [
      {
        title:
          "Every invoice type (recurring, project, milestone, usage) issues from one layer",
        description:
          "The billing system, not the ledger, owns issuance. The ledger receives the invoice and the eventual payment. Billing logic sits in one place, auditable and versioned.",
      },
      {
        title:
          "Remittances are captured and matched as structured data, not as PDF attachments",
        description:
          "Lump-sum payments are reconciled to their underlying invoices automatically. Unknowns route to a named owner with the likely candidates surfaced.",
      },
      {
        title: "Disputes are a status on the invoice, with reason, owner and age",
        description:
          "Collections suppress disputed invoices. Aged-debtor reports split disputed and genuinely-overdue. Nobody chases a disputed invoice by accident.",
      },
      {
        title: "Collections sequences adapt to the client, not the calendar",
        description:
          "Long-standing clients on rare slips get a soft touch. Persistent late-payers get the firm reminder. Escalations to a human happen on judgement triggers, not on day counts alone.",
      },
      {
        title: "The aged-debtors view is live, and the CFO trusts it",
        description:
          "Tuesday numbers are Tuesday numbers. Forecasting moves from retrospective to forward-looking because the underlying data is current.",
      },
    ],
    faqs: [
      {
        question:
          "Will automated collections damage relationships with long-standing clients?",
        answer:
          "Only if automation is set up without client segmentation, which is the most common mistake. Well-designed AR segments clients by payment history and relationship tier, applies a soft sequence to rare slips, and escalates to a human on judgement triggers (dispute raised, uncharacteristic delay, large balance). The goal is to remove the routine chase-ups a human should never have been doing, not to replace relationship work.",
      },
      {
        question:
          "How does automation handle a client who pays a lump sum across multiple invoices, short-paying one?",
        answer:
          "The remittance capture layer parses the client's remittance advice and allocates against each open invoice. Where the client short-pays one invoice (for example a freight-charge dispute), the automation either writes a reason-coded credit note where it is below threshold, or it routes to a named owner with the dispute context. Either way, the bulk of the payment reconciles automatically and only the short-pay needs human attention.",
      },
      {
        question:
          "Does AR automation work for project-based or milestone billing, or only recurring invoicing?",
        answer:
          "Both, but they are different mechanics. Recurring is mostly scheduler and tax rules; project and milestone billing combines timesheets, expenses and milestone events into an invoice calculation step before issuance. Both feed the same matching and collections pipeline once the invoice is out the door.",
      },
      {
        question: "How long before we see a DSO impact?",
        answer:
          "Typically 60 to 90 days from go-live. The first 30 days are bedding in the issuance and matching changes, so the clock starts on the invoices issued post-cutover. DSO improvements usually land in the 5 to 15 day range for mid-market teams, depending on how disciplined the pre-automation process was.",
      },
      {
        question:
          "What happens to payments that arrive without a reference or with the wrong reference?",
        answer:
          "They route to an unmatched-payment queue with the bank transaction, the payor name, the amount and a list of likely candidates (based on amount, client name fuzzy-match and recent invoices). A named owner resolves them inside an SLA. They do not sit in a suspense account for three months, which is the default state in most manual AR setups.",
      },
      {
        question:
          "Can AR automation cope with clients paying across different portals and bank accounts?",
        answer:
          "Yes, and in most mid-market setups this is exactly why automation is needed. The remittance capture layer normalises inputs from multiple portals, bank feeds and client remittances into a single structured queue before matching. The more fragmented your inbound payment paths are, the higher the automation payoff tends to be.",
      },
      {
        question:
          "How is remittance matching different from what the accounting platform already offers?",
        answer:
          "Accounting platforms match one payment to one invoice reasonably well. They break on lump-sum payments, partial payments, short-pays and any remittance that arrives as a PDF rather than structured data. Remittance matching automation reads the client's remittance advice as data, allocates against multiple invoices, handles the short-pay as a reason-coded adjustment, and writes the clean reconciliation back.",
      },
    ],
    relatedPlatformSlugs: [
      "xero-automation",
      "myob-automation",
      "netsuite-automation",
      "quickbooks-automation",
      "ignition-automation",
    ],
    relatedCaseStudySlugs: [
      "freight-xero-ar",
      "distribution-ondemand-reporting",
      "logistics-legacy-erp-rpa",
    ],
    searchTerms: [
      "accounts receivable automation australia",
      "ar automation",
      "ar automation australia",
      "collections automation",
      "remittance matching automation",
      "accounts receivable software australia",
      "ar workflow automation",
      "dso reduction automation",
      "invoice matching automation",
      "aged debtors automation",
    ],
  },

  {
    slug: "reconciliations-automation",
    title: "Reconciliations automation for Australian finance teams",
    category: "Reconciliations",
    eyebrow: "Automation guide",
    heroTagline:
      "Rule-based matching, ML-assisted exceptions, and an audit trail an external reviewer signs off. Not just auto-match everything.",
    whatItCovers:
      "This guide is for finance leaders planning reconciliation automation across bank, intercompany, corporate cards and multi-entity accounts. It starts with why most reconciliation automation fails (too much match, too little exception handling), walks through the mechanics (rules, learned matching, exception routing, audit trail), and lays out how reconciliations differ platform by platform. You will finish knowing what defensible reconciliation automation looks like, and why the audit-trail layer is the step most vendors skip.",
    theProblemSection: {
      heading:
        "Why reconciliation automation is a trust problem before it is a speed problem",
      bodyParagraphs: [
        "Reconciliation is the one finance function where automation can make things worse. A badly designed auto-matcher will clear the reconciliation dashboard and hide breaks inside apparent matches. The team stops looking at the 80% that matched, and the 20% exception queue becomes the only reliable reconciliation surface. If that queue has no owner, no SLA and no audit trail, the reconciliation is theatre.",
        "Done well, reconciliation automation does three jobs: it handles trivial matches with rules any auditor can read, it handles the harder matches with learned matching against the team's own historical decisions, and it routes everything else to a named human with candidate matches surfaced. The third job is where the value lives. Most reconciliation failures come back to a weak exception path, not to a weak matching engine.",
      ],
      keyStatOrCallout:
        "A mid-market team running four company-file bank reconciliations plus intercompany and card reconciliations typically burns one to two finance days per week on reconciliation. At $55 blended, that is roughly $50,000 to $100,000 a year, most of it spent on the long tail.",
    },
    whereTheHoursGo: [
      {
        title: "Bank reconciliation on statement lines the native rules do not catch",
        description:
          "Xero bank rules and MYOB matching engines handle the top 60% of statement lines cleanly. The remaining 40% (unusual references, one-off suppliers, multi-invoice payments, reversals, BPAY references that drifted) consumes most of the reconciliation time because the team works them by hand, and the rules never quite absorb the pattern.",
        typicalHours: "4 to 8 hrs/wk",
      },
      {
        title:
          "Intercompany reconciliation across entities that should net to zero",
        description:
          "Groups with multiple entities run the same intercompany recharge, loan, shared-service invoice or cost allocation across two or three ledgers. Left alone, these never net to zero at month-end because one side posts a day late or rounds differently. Finance rebuilds the reconciliation by hand, usually in a spreadsheet, every close.",
        typicalHours: "1 to 2 days/month",
      },
      {
        title: "Corporate card reconciliation against expense submissions",
        description:
          "Card feed plus expense submissions plus receipts plus GL coding is a four-source reconciliation. Duplicates slip through (same expense on the card and on a submitted receipt). Missing receipts stall the month-end card clear-down. The monthly card clear-down becomes an investigation every time a statement comes in.",
        typicalHours: "3 to 5 hrs/wk",
      },
      {
        title: "FX reconciliation on multi-currency AP and AR",
        description:
          "USD, EUR and GBP bills and invoices carry posting-day FX and settlement-day FX. The realised gain or loss has to post against the right account with the right period. Manual FX reconciliation is a spreadsheet with date-lookups, rarely automated, almost always cited as a month-end pain.",
        typicalHours: "1 to 2 days/month",
      },
      {
        title: "Cleared-cheque and direct-debit timing differences",
        description:
          "Direct debits, standing orders, cheque clearances and BPAY batches cross period ends routinely. Finance manually marks items in transit at 11pm on the 30th, then reverses them on the 1st. Every reconciliation drifts slightly until someone does a tidy-up pass, usually at quarter-end.",
        typicalHours: "2 to 4 hrs/wk",
      },
    ],
    costOfInactionCallout:
      "Reconciliation is the leak that hides. The hours are spread across the week and the risk is concealed inside auto-matches nobody re-inspects. For a mid-market team, the typical 40 to 80 hours a month of reconciliation work is one full-time-equivalent, year round.",
    howAutomationActuallyWorks: [
      {
        title:
          "Rules for the trivial cases, written in plain language the auditor can read",
        description:
          "Recurring rent, standing utilities, known direct debits and scheduled payroll clearing reconcile against hard rules that a human can inspect and sign off. Rules are the foundation, not the ceiling. The goal is to get 50 to 70% of lines through the rule layer so the learned layer only has to handle the interesting cases, not the boilerplate.",
      },
      {
        title: "Learned matching against the team's own reconciliation history",
        description:
          "For the harder cases, a matching model trains on the team's historical reconciliations: which supplier, which amount, which reference pattern, which account. The model surfaces candidate matches with a confidence score. High-confidence matches auto-reconcile. Mid-confidence matches post with a 'for review' flag. Low-confidence routes to exception. Thresholds are transparent and adjustable.",
      },
      {
        title: "Exception routing with context, not just unmatched line items",
        description:
          "An exception line shows the bank transaction, the three candidate ledger entries, the supplier history, the likely reason for the miss, and a suggested action. The exception owner approves, overrides or escalates in one action. Over time, overrides feed back into the learned layer, so the model improves on exactly the cases this team sees.",
      },
      {
        title: "Intercompany matching runs both sides at once",
        description:
          "Intercompany reconciliation is a two-sided problem. The automation reconciles the AR side and the AP side of the same transaction in one pass, flags the break if it exists, and proposes the adjusting journal. Intercompany eliminations at consolidation become a review exercise rather than a rebuild.",
      },
      {
        title: "Multi-entity, multi-account reconciliation as a single workflow",
        description:
          "Groups with four entities and nine bank accounts run reconciliation as one pipeline, not four or nine. Consolidated exceptions route to a single queue with entity tagging. The group-level cash position is available before any one entity's reconciliation is complete, which changes the rhythm of intra-month cash reporting.",
      },
      {
        title: "Audit trail on every action, immutable by design",
        description:
          "Every match, every override, every reject writes an entry with identity, timestamp, confidence score, and the rule or model version. External audit moves from 'produce evidence for this reconciliation' to 'query the log'. This is the step most reconciliation automation skips, and it is the reason badly-built automation fails its first external review.",
      },
    ],
    platformSpecificNotes: [
      {
        platformSlug: "xero-automation",
        note: "Xero bank rules catch the easy 60%. Reconciliation automation on Xero concentrates on the remaining 40%: unusual references, multi-invoice payments, the BPAY batches that span invoices, and intercompany lines. The learned layer sits alongside Xero, proposes matches, and writes confirmed reconciliations back through the Xero API with full audit.",
      },
      {
        platformSlug: "myob-automation",
        note: "MYOB's reconciliation surface is more rigid than Xero's. Automation handles the MYOB-specific quirks (multi-file reconciliation, payroll clearing against bank, intercompany between MYOB files) through a bridging layer that normalises the data into a controlled store before any matching runs. The MYOB file stays authoritative, but is not asked to do work it was not built for.",
      },
      {
        platformSlug: "netsuite-automation",
        note: "NetSuite has stronger native reconciliation than accounting platforms, but tends to depend on SuiteScript customisations that nobody maintains. Automation audits the existing SuiteScript, replaces brittle parts with rules and learned matching, and handles multi-entity intercompany at scale through SuiteTalk, with the audit trail captured outside NetSuite for portability.",
      },
      {
        platformSlug: "sap-automation",
        note: "SAP reconciliation is dense and report-heavy. Automation sits around SAP rather than inside it, pulling posting data out via BAPIs where available and RPA where not, matching in a controlled data layer, and writing adjusting entries back into SAP. Audit evidence is captured in the controlled layer because SAP's own audit outputs are hard to query directly.",
      },
      {
        platformSlug: "bank-automation",
        note: "Australian bank API coverage is patchy (CBA and NAB the strongest, others thinner). Bank reconciliation automation uses APIs where they exist and RPA where they do not, normalises transactions across banks into a single feed, and runs all matching against the single feed rather than per-bank. Multi-bank groups stop running nine reconciliations and start running one.",
      },
      {
        platformSlug: "excel-automation",
        note: "The reconciliations that live in Excel usually live there for a reason: the ledger cannot do them. Automation keeps the legitimate Excel reconciliations (ad-hoc, exploratory, one-off), hardens them with validation and documentation, and migrates the recurring high-stakes Excel reconciliations into the controlled layer with proper audit. The fragile 40-tab reconciliation model retires first.",
      },
    ],
    commonMistakes: [
      {
        title: "Auto-matching too aggressively and hiding breaks",
        description:
          "If the confidence threshold is set too low, the automation clears the reconciliation dashboard but slots the wrong bank line against the wrong invoice. The break is hidden inside an apparent match. The fix is conservative thresholds early, with every match below threshold visible as 'for review', not 'reconciled'.",
      },
      {
        title: "Skipping the audit trail until the external auditor asks for it",
        description:
          "An auto-match with no record of the rule or model version that produced it is an unauditable match. External review will demand evidence of how each reconciliation was made, and the team will retrofit an audit log under pressure. Build the audit trail on day one.",
      },
      {
        title: "Treating the exception queue as a dumping ground",
        description:
          "If exceptions land in a shared queue with no owner and no SLA, the queue grows until someone marks everything as 'reviewed' in a Friday push. The exception queue needs named owners, categorised reason codes and an SLA, or the whole automation reverts to theatre.",
      },
      {
        title:
          "Automating reconciliation without first cleaning the chart of accounts",
        description:
          "If the chart of accounts has duplicate codes, inconsistent tracking, or accounts that mean different things across entities, no matching engine will work reliably. Reconciliation automation that follows a chart clean-up is a different animal from reconciliation automation built on top of a messy chart.",
      },
    ],
    whatGoodLooksLike: [
      {
        title: "Every rule is human-readable and versioned",
        description:
          "An auditor can read the rule set. Rule changes are logged with identity and timestamp. Nobody is surprised by a match the system made.",
      },
      {
        title:
          "Confidence thresholds are explicit and tuned to the team's risk appetite",
        description:
          "High-confidence auto-reconciles. Mid-confidence posts with review flag. Low-confidence routes to exception. Thresholds are adjusted based on actual performance, not on defaults.",
      },
      {
        title: "Exception queue has named owners, reason codes and an SLA",
        description:
          "Every exception type routes to a named human. Reason codes cluster common patterns for process improvement. Old exceptions trigger escalation, not silent accumulation.",
      },
      {
        title:
          "Multi-entity and multi-account reconciliation runs as one workflow",
        description:
          "Groups reconcile the group, not each ledger in turn. Cash position is visible at group level before any one ledger is fully reconciled.",
      },
      {
        title: "Audit trail is complete, queryable and immutable",
        description:
          "Every match, override and reject logs identity, timestamp, rule or model version, and confidence. External audit is a query, not a reconstruction.",
      },
    ],
    faqs: [
      {
        question: "Is ML-assisted reconciliation defensible under external audit?",
        answer:
          "Yes, when the audit trail is built in. The auditor does not need to understand the model; they need to see the confidence score, the thresholds, which rule or model version produced the match, and the identity and timestamp of any human override. ML-assisted reconciliation is more auditable than heuristic manual matching because every decision is logged, not held in someone's head.",
      },
      {
        question:
          "What confidence threshold should we set for auto-reconciliation?",
        answer:
          "Start conservatively. Most mid-market teams begin at a confidence above 0.95 for auto-reconcile, 0.75 to 0.95 for 'post for review', and below 0.75 for exception. After 60 to 90 days of actual data, tune the thresholds against the team's own error rate. A conservative start with steady tuning always outperforms an aggressive start followed by a post-audit tightening.",
      },
      {
        question: "What happens to unmatched transactions at period end?",
        answer:
          "They sit in a named exceptions account with full context: the bank line, the candidate ledger entries, the likely reason for the miss, the owner assigned. They do not age silently. At period end, every unmatched item has either resolved, escalated, or been formally deferred with a reason. Nothing is hidden inside a suspense balance.",
      },
      {
        question:
          "Can the same automation handle multiple entities and multiple currencies?",
        answer:
          "Yes, and it is usually where the automation pays for itself for groups. Multi-entity reconciliation runs as a single workflow across every entity and account. Multi-currency handling applies posting-day FX on initial match and settlement-day FX on clearing, with the realised gain or loss posted to the right account in the right period. Both are configuration rather than bespoke build.",
      },
      {
        question:
          "How is this different from Xero's bank rules (or MYOB's equivalent)?",
        answer:
          "Bank rules are deterministic, platform-scoped, and do not learn. They catch the easy cases. Reconciliation automation is the layer above: it includes the platform rules as a first pass, adds learned matching for the harder cases, handles multi-entity and multi-currency, routes exceptions to named owners with context, and maintains an immutable audit trail. Bank rules are a component inside reconciliation automation, not a substitute for it.",
      },
      {
        question:
          "What about bank transactions the bank itself has coded poorly or inconsistently?",
        answer:
          "Bank-side data is normalised before any matching runs. The reconciliation layer captures the original transaction description verbatim and applies standardisation (BPAY reference extraction, payor name fuzzy-match, batch-payment expansion) to produce a clean record for matching. The original transaction is preserved for audit. Poorly coded bank lines stop being a reason to abandon auto-match.",
      },
    ],
    relatedPlatformSlugs: [
      "xero-automation",
      "myob-automation",
      "netsuite-automation",
      "sap-automation",
      "bank-automation",
      "excel-automation",
    ],
    relatedCaseStudySlugs: [
      "freight-xero-ar",
      "manufacturing-multi-system-flows",
      "logistics-legacy-erp-rpa",
    ],
    searchTerms: [
      "reconciliations automation australia",
      "bank reconciliation automation",
      "reconciliation automation australia",
      "intercompany reconciliation automation",
      "multi-entity reconciliation",
      "ml reconciliation",
      "automated bank matching",
      "corporate card reconciliation automation",
      "fx reconciliation automation",
      "audit-ready reconciliation",
    ],
  },

  {
    slug: "month-end-close-automation",
    title: "Month-end close automation for Australian finance teams",
    category: "Month-end close",
    eyebrow: "Automation guide",
    heroTagline:
      "Close as choreography, not a checklist. Cutting mid-market close from 10 days to 5 by automating the sequencing, not just the tasks.",
    whatItCovers:
      "This guide is for finance leaders trying to shorten a 10-day close to a 5-day close. It argues that close length is driven by task dependencies and sign-off bottlenecks, not by individual task duration. Automating any one close step saves hours but does not shorten close. Automating the choreography (what triggers what, who signs off, what happens when step seven fails) is what moves close timelines. You will finish knowing what orchestrated close looks like, platform by platform, and what good looks like at five days or better.",
    theProblemSection: {
      heading:
        "Why month-end close is an orchestration problem, not a task list",
      bodyParagraphs: [
        "Most close automation projects fail the same way. A team picks a set of slow close tasks, automates each one, and celebrates the hours saved. Close still takes ten days. Close length is not set by task duration; it is set by the dependency chain and the sign-off pattern. If the bank reconciliation is waiting on the last card-coding decision, and the consolidated reporting is waiting on intercompany elimination, and the board pack is waiting on commentary from the CFO who is waiting on the revenue number, no single-task automation changes the calendar.",
        "A well-orchestrated close is different. Each close task has a defined trigger, a named owner, an SLA, and a downstream dependency map. When task A completes, task B fires automatically. When task C fails, the right people know inside an hour, not on Tuesday at the stand-up. Sign-offs happen inside the workflow, not over email. The close calendar compresses because the idle time between tasks compresses, not because any single task got faster.",
      ],
      keyStatOrCallout:
        "A typical mid-market $30M AU business runs close at 8 to 12 days. The task work inside close is usually 3 to 4 days of actual effort. The other 5 to 8 days is waiting, clarifying, re-working and sign-off. Orchestration is what closes that gap.",
    },
    whereTheHoursGo: [
      {
        title:
          "Waiting on upstream finance tasks to complete before close can start",
        description:
          "Close does not start on day 1. It starts when AP cut-off has happened, when bank transactions have cleared, when card feeds have landed, when payroll has posted. Teams that start close on day 1 without that groundwork spend days 1 to 3 chasing prerequisites rather than closing. The idle time is invisible until someone maps the dependency chain.",
        typicalHours: "1 to 2 days/month",
      },
      {
        title: "Manual accruals, prepayment releases and recurring journals",
        description:
          "Recurring accruals (GRNI, utilities, rent, bonus accrual) and prepayment releases are the most automatable close work, and the work most frequently left manual. Each is a formulaic calculation plus a journal posting, yet each is typically rebuilt from a spreadsheet every month because the team never quite got around to automating it.",
        typicalHours: "1 to 2 days/month",
      },
      {
        title: "Intercompany elimination and consolidation",
        description:
          "Groups with multiple entities run an elimination exercise every close. Without automation this is a spreadsheet, with formulas that break quietly when the chart of accounts changes. Finance rebuilds it, re-checks it, and lives with a one-day delay on consolidated reports even when individual entities have closed.",
        typicalHours: "1 to 3 days/month",
      },
      {
        title: "Commentary generation for the board pack",
        description:
          "The board pack is often waiting not on the numbers but on the commentary. Variance analysis, explanation of unusual items, forward-looking commentary, prior-period comparisons: each needs human judgement, but most of the supporting drafting is data plus template work that can be pre-populated before the human arrives.",
        typicalHours: "1 to 2 days/month",
      },
      {
        title: "Sign-offs chased through email at the end of close",
        description:
          "The final days of close are typically spent waiting on sign-offs. CFO signs the consolidated P&L; MD signs the board pack; controller signs the reconciliations. Each handoff is an email with an attachment. Each wait is a day. The hand-off mechanism, not the review depth, is what blows out the close calendar.",
        typicalHours: "2 to 3 days/month",
      },
    ],
    costOfInactionCallout:
      "A 10-day close vs a 5-day close is five days of management attention, board visibility and forward-looking capacity. On a $30M AU business, the real cost is not labour, it is running forward with last month's numbers.",
    howAutomationActuallyWorks: [
      {
        title: "A dependency-mapped close checklist, not a task list",
        description:
          "Every close task has a trigger (what must be complete before this starts), a duration estimate, a named owner and a downstream dependency. The close becomes a directed graph, not a list. When a task completes, its dependants fire automatically. The critical path is visible in real time, so the CFO knows on day 2 whether close is running on, behind or ahead of schedule.",
      },
      {
        title: "Prerequisites automated to the day-0 line",
        description:
          "AP cut-off, card feed landing, bank transaction clearance and payroll posting are automated to happen on day 0. Close does not start on day 1 into a chase-up; it starts on day 1 with every prerequisite already complete. This alone typically saves 1 to 2 days of close elapsed time.",
      },
      {
        title:
          "Recurring journals and accruals posted against a template, with variance called out",
        description:
          "Monthly accruals (GRNI, utilities, rent), prepayment releases and recurring depreciation post against a versioned template with the calculation visible. Variance against the prior month is called out automatically so the accountant reviews the delta, not the base value. Templates are the audit trail.",
      },
      {
        title: "Intercompany eliminations run on both sides at once",
        description:
          "Every intercompany transaction posts with a matching elimination entry in the consolidation layer. The consolidation is not a rebuild; it is the result of entries that have carried their own elimination tag since posting. The manual elimination spreadsheet retires. Group-level consolidated numbers are available as soon as the individual entities close.",
      },
      {
        title: "Commentary pre-population on variance and prior-period comparison",
        description:
          "The board pack commentary is partially drafted before the CFO opens it: variance lines above threshold are surfaced with their drivers, prior-period comparisons are calculated, unusual items are flagged with their GL context. The CFO edits, refines and adds judgement. Commentary writing is an edit, not a first draft.",
      },
      {
        title: "Sign-off inside the workflow, not in email",
        description:
          "Reconciliations, journals and reporting packs all carry a sign-off state inside the close workflow. The controller signs off the bank reconciliations in the same surface where the exceptions live. The CFO signs off the consolidated P&L with the drill-down inline. Sign-off latency compresses from days of email tag to hours of in-workflow approvals.",
      },
    ],
    platformSpecificNotes: [
      {
        platformSlug: "xero-automation",
        note: "Xero mid-market close compresses from 10 to 12 days down to 5 to 6 days with orchestration plus automated accruals, intercompany tags and pre-populated commentary. Xero stays the ledger; the close choreography layer sits alongside it, with reconciliation and journal state synced both ways. The board pack pulls from a data mirror so it is never blocked on Xero's reporting performance.",
      },
      {
        platformSlug: "myob-automation",
        note: "MYOB close automation leans on the controlled data layer more heavily than Xero because MYOB's API coverage is thinner. Multi-file consolidation (a common MYOB pattern for trades, construction and services groups) runs out of the data layer, not out of MYOB. Payroll-adjacent close tasks route to a named finance lead before posting, given the PAYG and super exposure.",
      },
      {
        platformSlug: "netsuite-automation",
        note: "NetSuite close benefits most from orchestration because the platform already has the primitives (period locking, intercompany journals, elimination modules) but they are rarely orchestrated end-to-end. Automation layers the dependency graph and sign-off workflow on top of NetSuite's native close surface, rather than replicating it. SuiteTalk drives the integration. Twelve-day NetSuite closes routinely compress to 6 or 7.",
      },
      {
        platformSlug: "sap-automation",
        note: "SAP close is long because the platform is rigid, not because the work is hard. Orchestration automation runs adjacent to SAP, pulling posting data through BAPIs and pushing journals back, with the choreography layer outside SAP where it can change without a change request. The audit trail remains complete because every SAP-side action is still logged by SAP.",
      },
      {
        platformSlug: "dynamics-automation",
        note: "Dynamics 365 close automation is typically a Power Automate plus Business Central or F&O combination. Power Automate handles the choreography (triggers, approvals, sign-offs), Business Central or F&O is the ledger, Power BI is the reporting. Getting these three to behave as a system rather than three separate pieces is the primary lift; once they do, close compresses quickly.",
      },
      {
        platformSlug: "power-bi-automation",
        note: "Power BI's role in close is the board pack, not the ledger. Automated close pushes clean data to the Power BI semantic model on each major close milestone, with refresh state tied to close state so the board pack is never showing stale numbers. Commentary pre-population runs against the same model, so the variance commentary and the chart in the deck reconcile to the same source.",
      },
    ],
    commonMistakes: [
      {
        title: "Automating individual close tasks without automating the sequencing",
        description:
          "Faster accruals do not shorten close if close is still waiting on the sequence. Without a dependency graph, the automated step sits idle until the prerequisite completes, and total elapsed time does not change. Map the dependency graph before automating any single task.",
      },
      {
        title: "Running close automation without a close owner",
        description:
          "Orchestrated close needs a named close owner who sees the dependency graph in real time and intervenes when a task runs late. Without an owner, the automation shows a red light that nobody watches. Orchestration is a human responsibility supported by automation, not a replacement for one.",
      },
      {
        title:
          "Rebuilding the intercompany spreadsheet after the eliminations are automated",
        description:
          "Teams automate intercompany eliminations and then keep the legacy spreadsheet for reassurance. Running both means the spreadsheet eventually diverges from the automated output, nobody knows which is right, and the automation effectively regresses. Retire the spreadsheet the month after the automation proves stable.",
      },
      {
        title: "Leaving sign-offs in email",
        description:
          "If sign-offs happen in email, close is bottlenecked on inbox refresh rates. Orchestrated close moves sign-offs into the workflow surface, with alerts, escalation and delegation. The email sign-off is the single most common reason a technically-fast close still takes ten days.",
      },
    ],
    whatGoodLooksLike: [
      {
        title: "Close runs against a dependency graph, not a checklist",
        description:
          "Every task has a trigger, an owner, an SLA and a downstream dependant. The critical path is visible in real time.",
      },
      {
        title: "Day 0 work completes before day 1",
        description:
          "AP cut-off, card feeds, bank clearance and payroll posting are automated to complete before close starts. Day 1 is a clean starting line, not a chase-up.",
      },
      {
        title:
          "Recurring accruals, eliminations and revaluations run against versioned templates",
        description:
          "Variance against prior month is surfaced automatically. Reviews focus on deltas and judgement, not on rebuilding the base calculation.",
      },
      {
        title:
          "Sign-offs happen inside the workflow, with alerts, escalation and delegation",
        description:
          "No sign-off waits on an email. No controller or CFO holds up the critical path because they were in a meeting.",
      },
      {
        title: "The CFO has a real-time close state view with an ETA",
        description:
          "Day 2, day 3, day 4 close state are visible with a projected completion date. If close is going to miss, the CFO knows on day 3, not day 9.",
      },
    ],
    faqs: [
      {
        question: "What is a realistic close target for a $30M AU business?",
        answer:
          "Five to six working days is a realistic target with orchestrated close, automated recurring journals and in-workflow sign-offs. Three days is possible for a single-entity business with a clean chart of accounts and disciplined cut-off. Ten to twelve days, still common, almost always reflects idle time between steps rather than slow tasks. The target worth aiming for is the one that compresses idle time, not the one that shaves minutes off a fast task.",
      },
      {
        question: "Can close still be automated if we keep posting manual journals?",
        answer:
          "Yes, and most orchestrated closes retain manual journals for judgement entries. The automation handles the recurring formulaic entries (accruals, prepayments, depreciation, recurring intercompany) and leaves the judgement entries (provision adjustments, write-offs, classification decisions) to the accountant. The split is a feature, not a limitation.",
      },
      {
        question:
          "How do automated accruals handle items that can only be known after period end?",
        answer:
          "Items that are genuinely post-period-end (large invoices received after cut-off, year-end bonus decisions, final revenue adjustments) remain manual journal entries by design. The automation posts a best-estimate accrual on day 0 and the controller trues it up when the real number is known. The true-up is a journal flagged against the original, which keeps the audit trail clean.",
      },
      {
        question: "Does close automation replace the existing close checklist?",
        answer:
          "It absorbs it. The checklist becomes the dependency graph, with the same tasks, the same owners, the same sign-offs, but with triggers and dependencies explicit. Teams typically keep the checklist format for the first month of orchestrated close as a familiar surface, then move fully to the graph view once the rhythm is established.",
      },
      {
        question:
          "How do sign-offs and segregation of duties work under automated close?",
        answer:
          "More robustly than under manual close. Segregation of duties is configured in the workflow: the preparer cannot sign off, the reviewer cannot post, the CFO signs off consolidated but not individual reconciliations. Every sign-off writes identity, timestamp and delegation state. The audit trail is stronger than an email-based sign-off chain, which is the external auditor's typical preference.",
      },
      {
        question:
          "What happens if one task in the dependency chain fails during close?",
        answer:
          "The failure is surfaced to the close owner inside the SLA window, with the failed task, the downstream dependants it blocks, and the projected impact on close end-date. The owner makes a call: rerun, skip-with-risk, escalate. The decision is logged. Downstream tasks that can run independently continue; dependants hold. The alternative (silent failures discovered on day 7) stops being possible.",
      },
      {
        question: "Is a five-day close realistic without a full ERP?",
        answer:
          "Yes, especially on Xero and Business Central where the ledger is clean and the API coverage is good. Five-day close on MYOB is achievable but typically requires the controlled data layer to carry more of the weight. What matters is the orchestration, the recurring-journal automation and the in-workflow sign-offs, not which ledger is underneath.",
      },
    ],
    relatedPlatformSlugs: [
      "xero-automation",
      "myob-automation",
      "netsuite-automation",
      "sap-automation",
      "dynamics-automation",
      "power-bi-automation",
    ],
    relatedCaseStudySlugs: [
      "manufacturing-multi-system-flows",
      "distribution-ondemand-reporting",
      "enterprise-ap-idu",
    ],
    searchTerms: [
      "month-end close automation",
      "close automation australia",
      "five day close",
      "close orchestration",
      "intercompany consolidation automation",
      "automated accruals",
      "close checklist automation",
      "month end close australia",
      "close cycle reduction",
      "consolidation automation",
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

/** Category label to short UI string mapping used for cross-link copy. */
export const GUIDE_SHORT_NAME: Record<GuideCategory, string> = {
  "Accounts payable": "AP",
  "Accounts receivable": "AR",
  Reconciliations: "reconciliations",
  "Month-end close": "month-end close",
};
