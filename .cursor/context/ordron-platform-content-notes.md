# Ordron Platform Hub Content — Raw Notes for Cursor

These are the raw, domain-specific ingredients for each of the 13 platform hub pages. Hand this document to Cursor alongside each batch prompt. Cursor's job is to polish, structure, and expand this into full `platforms.ts` entries following the Xero reference template. Cursor must not invent automation claims beyond what is written here. Every automation must be grounded in Ordron's actual build experience described below.

Rules applied throughout:
- Australian English
- No em dashes
- Sentence case
- No marketing clichés
- Real specifics over generic language
- Blended rate reference: $55/hour
- Australian mid-market context throughout
- Case study matches drawn from Ordron's existing 17 published case studies

---

## 1. XERO (already populated as reference)

Status: complete, do not regenerate. Use as the quality and structure benchmark for all other platforms.

---

## 2. MYOB (`myob-automation`)

**Category:** Accounting

**Position statement:**
MYOB is the Australian SME incumbent. Most businesses running MYOB today started on it ten or fifteen years ago and have built their entire finance workflow around it. The platform is stronger in payroll and trades-adjacent industries (construction, services, logistics) than it is in modern digital-native businesses, and it carries a heavier legacy footprint than Xero. That legacy footprint is exactly where the automation opportunity lives. MYOB teams tend to have more manual workarounds, more spreadsheet reliance, and older integration patterns than their Xero counterparts.

**Three pain points in a CFO's voice:**
- "Our MYOB payroll reconciliation against the bank feed is a three-day manual exercise every fortnight. It never gets cleaner."
- "The sales team enters orders in one system, finance re-enters them in MYOB, and by Friday we've got variance we can't explain."
- "Month-end close is held together by one person who knows where every MYOB quirk lives. When she's on leave we're in trouble."

**Automation themes to prioritise in the 10:**
1. Payroll reconciliation automation (fortnightly and monthly cycles against bank feed)
2. AP invoice capture with MYOB-specific GL coding rules
3. Inter-system sync between MYOB and CRM or ERP layers (common pain in Australian construction and services)
4. Timesheet-to-payroll automation for labour-heavy businesses
5. Bank feed reconciliation with MYOB-specific rule libraries
6. Month-end reporting automation (pulling clean data out of MYOB into Power BI or Excel)

**Case study matches:**
- Any of the logistics case studies with legacy ERP overlap, because the MYOB profile is similar
- `advisory-excel-to-enterprise` if it involves MYOB transitions
- `transport-ops-workflow`
- `manufacturing-multi-system-flows`

**Ordron's approach on MYOB:**
MYOB's API coverage is patchier than Xero's, so Ordron leans more heavily on RPA bridges for the parts MYOB doesn't expose natively. The database-first architecture becomes especially important here because it lets finance teams report and reconcile against clean data without waiting for MYOB's own reporting layer. Human-in-the-loop controls matter more on MYOB because of the payroll exposure, so every payroll-adjacent automation routes exceptions to a finance lead before it posts.

---

## 3. QUICKBOOKS (`quickbooks-automation`)

**Category:** Accounting

**Position statement:**
QuickBooks is the international challenger in the Australian market. It tends to run in businesses with a US parent, businesses serving international clients, or professional services firms that have been on QuickBooks for a decade because a founder set it up that way. In Australia it is less dominant than Xero or MYOB, but it carries specific automation opportunities that Xero doesn't: multi-currency handling, US-native tool integrations, cross-border AP. QuickBooks Online has stronger API coverage than QuickBooks Desktop, and Ordron has worked across both.

**Three pain points in a CFO's voice:**
- "We're running QuickBooks in AUD but half our suppliers invoice us in USD. Every month-end turns into a manual FX reconciliation."
- "Our parent company reports in QuickBooks US. We're using QuickBooks AU. Consolidation takes six days and the numbers never match the first time."
- "I know there are integrations for our CRM and QuickBooks, but every app we try handles AU tax or BAS incorrectly."

**Automation themes to prioritise in the 10:**
1. Multi-currency AP handling with automated FX reconciliation
2. Cross-border bill capture and coding (US suppliers, EU suppliers)
3. BAS preparation automation pulled out of QuickBooks data
4. QuickBooks to CRM sync (HubSpot, Salesforce) with AU-specific tax handling
5. Inter-company reconciliation for businesses with a US or UK parent
6. Bank reconciliation for AU accounts feeding into QuickBooks
7. AR automation for professional services (project billing)
8. QuickBooks to Excel or Power BI reporting automation

**Case study matches:**
- `advisory-excel-to-enterprise`
- `financial-services-risk-ai`
- Any case study involving cross-border operations or professional services
- `asset-mgmt-data-integration`

**Ordron's approach on QuickBooks:**
QuickBooks Online's API is solid so Ordron favours API-first automation wherever possible. For QuickBooks Desktop, RPA is the primary lever. The biggest lift on QuickBooks AU deployments is handling Australian tax and BAS correctly inside a US-native architecture, so Ordron builds localisation logic on top of QuickBooks rather than relying on third-party app marketplace integrations which frequently get AU tax wrong.

---

## 4. NETSUITE (`netsuite-automation`)

**Category:** ERP

**Position statement:**
NetSuite is the step-up platform for Australian businesses that have outgrown an accounting package but aren't ready for SAP or Oracle. It sits in the mid-market sweet spot: $30M to $200M revenue, multi-entity, multi-currency, multi-location. Companies on NetSuite usually have a dedicated finance ops team, a full month-end close process, and audit-grade reporting requirements. The automation opportunities here are larger in dollar terms than accounting platform automations because the workflows are bigger and the manual workarounds are more entrenched.

**Three pain points in a CFO's voice:**
- "Our NetSuite month-end close runs to twelve days. Most of that is consolidation across four entities that should be automated and isn't."
- "We're paying for NetSuite's full ERP functionality but the team still exports to Excel for half their reporting."
- "Bank reconciliation is matched by a NetSuite consultant once a quarter at $400 an hour. There has to be a better way."

**Automation themes to prioritise in the 10:**
1. Multi-entity consolidation automation for month-end close
2. NetSuite to Power BI or Tableau reporting pipelines (replacing Excel exports)
3. Inter-company elimination automation
4. Complex multi-currency journal automation
5. Automated procurement approval workflows through NetSuite's approval layer
6. Fixed asset depreciation and schedule automation
7. Bank reconciliation with NetSuite-specific rule libraries
8. Revenue recognition automation for subscription or project businesses
9. SuiteScript-based automation for NetSuite-specific workflow customisation
10. AR collections automation with NetSuite's customer records

**Case study matches:**
- `enterprise-ap-idu`
- `intelligent-invoice-multisplit`
- `manufacturing-multi-system-flows`
- `financial-services-risk-ai`

**Ordron's approach on NetSuite:**
NetSuite is deep, configurable, and often over-customised. Ordron starts with an audit of existing SuiteScript and customisations before adding anything, because layering automation on top of poorly-maintained customisations creates compound fragility. Where possible, automation uses NetSuite's native APIs and SuiteTalk. Where native customisation has become a bottleneck, Ordron moves selected workflows out of NetSuite into the controlled database layer, then syncs clean results back.

---

## 5. SAP FINANCE (`sap-automation`)

**Category:** ERP

**Position statement:**
SAP Finance in the Australian mid-market sits mostly in manufacturing, logistics, and resource-adjacent businesses. It's a heavy platform, usually implemented years ago by a systems integrator, and now being maintained by a lean finance team who inherited it. The automation opportunities here are about working around SAP's rigidity, not replacing it. The goal is to give finance teams the speed they'd have on a modern platform without having to replatform SAP, which is a decade-long conversation most mid-market businesses can't afford.

**Three pain points in a CFO's voice:**
- "SAP gives me exactly the report I asked for in 2017 and nothing else. Every new request is a six-week change project."
- "Our AP clerks spend half their day clicking through SAP screens that could be a single API call if SAP exposed one."
- "We paid seven figures for SAP and our close still takes ten days. Nobody's ever been able to tell me why."

**Automation themes to prioritise in the 10:**
1. SAP screen-scraping RPA for repetitive AP and AR clicking workflows (where APIs aren't exposed)
2. Alternative reporting pipelines (SAP data out to Power BI without waiting for SAP BW)
3. Vendor master data management automation
4. Purchase requisition to purchase order workflow automation
5. Month-end close process automation (checklist, dependencies, sign-offs)
6. Intercompany reconciliation automation
7. Automated variance analysis pulled from SAP data
8. Procurement approval automation (email-driven through to SAP posting)
9. Treasury and cash position automation
10. Fixed asset and depreciation schedule automation

**Case study matches:**
- `manufacturing-multi-system-flows`
- `logistics-legacy-erp-rpa`
- `enterprise-ap-idu`
- `intelligent-invoice-multisplit`

**Ordron's approach on SAP:**
SAP is where RPA earns its keep. Many of the workflows that plague SAP users are clickpath-heavy and API-light, so automation runs as attended or unattended RPA against the same screens a human operates. Ordron uses SAP's APIs and BAPIs wherever they exist, falls back to RPA for the rest, and critically keeps the data model documented outside SAP so reporting and analytics don't depend on SAP's own reporting layer. Governance and audit trail matter more here than on any other platform because SAP customers are almost always audited.

---

## 6. MICROSOFT DYNAMICS 365 (`dynamics-automation`)

**Category:** ERP

**Position statement:**
Dynamics covers two quite different platforms that Australian mid-market businesses might be running: Dynamics 365 Business Central (the upper-SMB and lower-mid-market play) and Dynamics 365 Finance and Operations (the full ERP for larger mid-market). Ordron's work spans both. Businesses running Dynamics are usually Microsoft-stack companies, so automation strategy has to fit inside a broader Microsoft ecosystem (Power Automate, Power BI, Azure, Outlook, SharePoint). That's actually an advantage because Dynamics-native automation tools are strong.

**Three pain points in a CFO's voice:**
- "We're running Business Central plus Power Automate plus Power BI and it all works in pieces. Nothing works as a system."
- "Our Dynamics 365 F&O rollout was supposed to reduce manual work. Eighteen months in the team is doing more manual work, not less."
- "I know Power Automate can do half of this but we don't have anyone internally who can build it properly."

**Automation themes to prioritise in the 10:**
1. Power Automate workflow automation layered on top of Business Central or F&O
2. Dynamics to Power BI reporting pipelines with proper data modelling
3. AP automation through Dynamics' native approval workflow plus Power Automate
4. Expense management automation (Concur or native Dynamics) feeding into GL
5. Inter-company elimination automation
6. Procurement approval workflow automation
7. AR collections automation with Dynamics customer data
8. Revenue recognition for project and subscription businesses
9. Azure-hosted data layer for complex reporting requirements
10. Microsoft 365 to Dynamics sync (Outlook, Teams, SharePoint approvals into GL posting)

**Case study matches:**
- `manufacturing-multi-system-flows`
- `construction-ops-visibility`
- `industrial-mobile-procurement`
- `enterprise-ap-idu`

**Ordron's approach on Dynamics:**
On Dynamics, Ordron's job is often to make the Microsoft stack actually work as a stack. Power Automate gets used well, Power BI gets proper data modelling, Azure hosts the controlled data layer, and the result is a Microsoft ecosystem that delivers what Microsoft sold the CFO on two years ago. API-first wherever possible because Dynamics has decent API coverage. RPA reserved for legacy bolt-ons.

---

## 7. HUBDOC (`hubdoc-automation`)

**Category:** Document capture

**Position statement:**
Hubdoc is the Xero-owned document capture layer, used mostly by Xero shops for supplier bill capture and receipt collection. It's good at what it does but it's a component, not a system. The automation opportunity on Hubdoc is about making it feed cleanly into the accounting workflow rather than being a separate inbox that needs human attention. Most Hubdoc deployments underuse the platform because the full workflow (capture, code, approve, post) is only partially automated.

**Three pain points in a CFO's voice:**
- "Hubdoc grabs the bills but my team still codes every single one manually against our supplier rules."
- "We've got three years of Hubdoc data and no way to query it for anything useful."
- "Receipts from drivers go into Hubdoc and disappear. Nobody knows what's been processed until month-end."

**Automation themes to prioritise in the 10:**
1. Hubdoc-to-Xero auto-coding with supplier rule libraries
2. Receipt and expense capture workflow for field staff (drivers, trades)
3. Supplier bill approval workflow automation post-Hubdoc capture
4. Duplicate detection across Hubdoc submissions
5. Hubdoc historical data extraction and querying (turning the Hubdoc archive into queryable data)
6. Exception routing (Hubdoc items that fail auto-coding go to a human with full context)
7. Hubdoc to Power BI reporting on capture volumes, processing times, exception rates
8. Multi-entity Hubdoc routing (which entity does this bill belong to)
9. Email-to-Hubdoc integration improvements
10. Mobile capture UX improvements for field staff using Hubdoc

**Case study matches:**
- `logistics-ap-ocr`
- `manufacturing-invoice-hub`
- `freight-xero-ar`
- `industrial-mobile-procurement`

**Ordron's approach on Hubdoc:**
Hubdoc is a useful capture layer but not a complete workflow. Ordron's approach is to keep Hubdoc in place for what it does well (ingestion) and build the coding, approval, and exception-handling layers on top. OCR quality checks sit between Hubdoc and Xero to catch the 10-15% that Hubdoc misreads. Historical Hubdoc data gets mirrored into the controlled database for queryability.

---

## 8. DEXT (`dext-automation`)

**Category:** Document capture

**Position statement:**
Dext (formerly ReceiptBank) is the leading document capture and data extraction platform for Australian accounting practices and SME finance teams. It does richer extraction than Hubdoc and has stronger integration depth, but it's also underused by most deployments. The automation opportunity is similar to Hubdoc: make Dext's output flow cleanly through the full AP cycle rather than ending at "bills are in the system now, go code them."

**Three pain points in a CFO's voice:**
- "Dext captures the data but we're still clicking approve on every invoice like nothing happened."
- "Our accounting practice has 40 clients on Dext. Every one needs the same configuration work and we do it from scratch each time."
- "Dext tells me 500 supplier bills came in this month. I have no idea which 50 are actually outliers that need my attention."

**Automation themes to prioritise in the 10:**
1. Dext-to-accounting-ledger auto-coding with learned rules
2. Multi-client Dext configuration automation (for accounting practices)
3. Exception identification and routing (surface the 10% that need human attention)
4. Dext data to Power BI for AP analytics across clients or business units
5. Supplier bill approval workflow automation
6. Duplicate detection across Dext uploads
7. Receipt and expense categorisation automation
8. Integration with AP payment runs (Dext captured bills to ABA file generation)
9. Dext archive querying and historical data extraction
10. Compliance and audit trail reporting from Dext data

**Case study matches:**
- `logistics-ap-ocr`
- `freight-xero-ar`
- `manufacturing-invoice-hub`
- `advisory-excel-to-enterprise`

**Ordron's approach on Dext:**
Dext has solid API coverage so Ordron builds API-first automation layered on top. For accounting practices running Dext across many clients, the biggest lift is eliminating the configuration work that gets repeated for every new client onboarding. For direct SME users, the lift is making exception handling intelligent so the finance lead is only looking at things that actually need attention.

---

## 9. SAP CONCUR (`concur-automation`)

**Category:** Expense management

**Position statement:**
Concur is the dominant enterprise expense management platform in Australia, used mostly by businesses over 200 staff where expense policy complexity justifies the licensing cost. Concur does expense capture well but its workflow, approval routing, and GL integration often leave significant manual work in place. Ordron's Concur work tends to be about making Concur play well with the broader finance stack (SAP, NetSuite, Dynamics) and about automating the policy exception handling that defaults to human review.

**Three pain points in a CFO's voice:**
- "Concur flags 800 policy exceptions a month. My finance manager spends two days reviewing the 780 that are fine and missing the 20 that matter."
- "Getting Concur expense data into our general ledger is a manual export-and-import every month-end."
- "Approval delays in Concur add five days to every expense claim because approvers ignore the email and only act when chased."

**Automation themes to prioritise in the 10:**
1. Policy exception triage automation (auto-approve routine exceptions, escalate genuine outliers)
2. Concur to general ledger integration automation (SAP, NetSuite, Dynamics GL posting)
3. Approval workflow automation with escalation paths
4. Corporate card reconciliation automation against Concur entries
5. Multi-currency expense handling with automated FX
6. Policy compliance reporting and analytics
7. Receipt capture and OCR quality checking layered on top of Concur's capture
8. Travel and expense policy enforcement automation
9. Concur to Power BI or Tableau reporting pipelines
10. Automated month-end expense accrual processing

**Case study matches:**
- `enterprise-ap-idu`
- `industrial-mobile-procurement`
- `manufacturing-multi-system-flows`

**Ordron's approach on Concur:**
Concur is an enterprise-grade platform running inside mid-market businesses that often can't afford a full-time Concur admin. Ordron's work here is to make Concur functionally behave like it should out of the box, which is to say: capture the expense, validate the policy, route intelligently, and post cleanly. Most of that requires connective automation layered on top of Concur because Concur's native workflow rules are not fine-grained enough for most Australian mid-market policies.

---

## 10. EXCEL (`excel-automation`)

**Category:** Finance ops

**Position statement:**
Excel isn't a platform, it's the shadow platform that every finance team actually runs. Month-end close lives in Excel. Board reporting lives in Excel. The reconciliations the ERP can't do live in Excel. Ordron's Excel work is usually about replacing fragile high-stakes Excel workflows with proper automation, or hardening Excel workflows that genuinely need to stay in Excel. Either way, the automation opportunity is significant because Excel tends to hide the biggest manual workloads in any finance team.

**Three pain points in a CFO's voice:**
- "Our board pack is a 40-tab Excel file that one person rebuilds from scratch every quarter. If she leaves we're in serious trouble."
- "The reconciliation model we use for month-end was built in 2019 by a contractor. Nobody alive understands how it works, but we run it every month."
- "We're exporting from Xero to Excel to Power BI and back to Xero. Each step introduces errors and we don't catch them until audit."

**Automation themes to prioritise in the 10:**
1. Excel to Power BI migration for standardised reporting
2. Board pack automation (dynamic Excel or replace with Power BI)
3. Month-end reconciliation model automation (replace fragile Excel with audited workflows)
4. Excel model documentation and hardening for models that must stay
5. Bank reconciliation model automation
6. Intercompany reconciliation automation
7. Revenue reporting automation
8. Variance analysis automation against budget data
9. Data validation and error-detection across Excel workflows
10. Excel-to-accounting-ledger sync automation (closing the manual loop)

**Case study matches:**
- `advisory-excel-to-enterprise`
- `manufacturing-multi-system-flows`
- `enterprise-ap-idu`

**Ordron's approach on Excel:**
Excel work starts with a decision tree: should this workflow be in Excel at all? Many shouldn't. Ordron's default is to move fragile high-stakes Excel workflows into the controlled database layer with proper audit trails and validation. The Excel workflows that legitimately belong in Excel (genuinely ad-hoc modelling, exploratory analysis) get hardened with documentation, version control, and validation but stay in Excel.

---

## 11. BANK PORTALS AND FEEDS (`bank-automation`)

**Category:** Finance ops

**Position statement:**
Bank portals aren't a single platform, they're the collection of Australian bank interfaces that every finance team uses: CBA, NAB, ANZ, Westpac, Macquarie, Bendigo, various foreign bank portals for businesses with overseas operations. Direct API access to Australian banks is still limited, which means bank reconciliation, payment runs, and treasury reporting still involve manual portal work for many finance teams. Ordron's bank automation is heavy on RPA because of this API gap, and heavy on reconciliation logic because bank-side data is often messier than the ledger-side data it's being matched to.

**Three pain points in a CFO's voice:**
- "Bank reconciliation across our four entity accounts takes a day a week. It's the thing my finance manager hates most about the job."
- "We're running manual ABA file generation for payment runs because none of our AP automation touches the bank portal."
- "Treasury reporting is late every month because we're waiting on manual exports from three different bank portals."

**Automation themes to prioritise in the 10:**
1. Bank reconciliation automation with learned matching rules
2. Multi-entity bank reconciliation (single automation, multiple entities, multiple accounts)
3. ABA file generation automation from AP payment runs
4. Bank portal RPA for downloading statements and transaction data
5. Treasury reporting automation pulling from bank data daily
6. Foreign bank portal automation for businesses with overseas accounts
7. Cash position automation and reporting
8. Automated bank transaction categorisation
9. Exception handling for unmatched transactions
10. Bank fraud and unusual transaction detection

**Case study matches:**
- `freight-xero-ar`
- `logistics-legacy-erp-rpa`
- `transport-ops-workflow`

**Ordron's approach on bank automation:**
Australian bank API coverage is still limited, so bank automation is RPA-heavy. Ordron uses the major banks' APIs where they exist (CBA and NAB have the strongest coverage, others are more limited) and runs RPA against bank portals for the rest. The controlled database layer becomes especially valuable here because bank data from different sources gets normalised in one place before any reconciliation logic runs against it.

---

## 12. OUTLOOK (`outlook-automation`)

**Category:** Finance ops

**Position statement:**
Outlook isn't a finance platform, but it's where most Australian finance workflows actually start. Supplier bills land in a shared inbox. Client invoicing queries come in by email. Approvals run through email threads instead of through the workflow tool that was supposed to handle them. Ordron's Outlook automation is about intercepting these email-driven workflows at the inbox and routing them into structured systems, rather than leaving them to be triaged manually by whoever's in the shared inbox first.

**Three pain points in a CFO's voice:**
- "AP at ap@company.com gets 300 emails a week. One of the team has to sort them into real bills, supplier queries, and noise."
- "Approval threads live in Outlook. If you can't find the email, the approval doesn't exist."
- "Our shared finance inbox has 40,000 emails in it. We have no idea what's actually been actioned."

**Automation themes to prioritise in the 10:**
1. Inbox triage automation (sort bills, queries, noise with AI classification)
2. Email-to-bill extraction feeding Hubdoc, Dext, or direct to ledger
3. Approval workflow extraction from email threads into audited approval system
4. Supplier query response automation
5. Shared inbox SLA tracking and reporting
6. AR collections email automation with escalation logic
7. Contract and document extraction from email attachments
8. Email-driven intercompany workflow automation
9. Integration of Outlook calendars with month-end close process automation
10. Compliance and audit trail capture from email-based workflows

**Case study matches:**
- `logistics-ap-ocr`
- `manufacturing-invoice-hub`
- `enterprise-ap-idu`

**Ordron's approach on Outlook:**
Outlook automation uses Microsoft Graph API as the primary interface, falling back to RPA only for complex UI automation that Graph doesn't expose. The goal is to extract the structured finance workflow out of email and route it into systems that can actually audit and track it, while leaving genuine correspondence (supplier queries, client conversations) in the inbox where it belongs. AI classification does the heavy lifting on sorting what belongs where.

---

## 13. POWER BI (`power-bi-automation`)

**Category:** Reporting

**Position statement:**
Power BI is the dominant reporting platform for Australian mid-market finance teams, especially those on a Microsoft stack. Almost every mid-market business has Power BI in place. Very few are using it to its full capability. The gap between "we have Power BI" and "our finance reporting runs automatically on Power BI and I trust the numbers" is typically 6 to 12 months of structured data work. Ordron's Power BI automation is mostly about that structural layer: the data pipelines feeding Power BI, the data modelling underneath the dashboards, and the governance making sure the numbers in Power BI reconcile to the source systems.

**Three pain points in a CFO's voice:**
- "Our Power BI dashboards look great until I ask a question. Then I find out three of the four numbers don't reconcile to Xero."
- "We're paying a consultant $180 an hour to maintain Power BI data pipelines that break every month."
- "Every new report in Power BI takes six weeks to deliver because the data model underneath wasn't built properly in the first place."

**Automation themes to prioritise in the 10:**
1. Power BI data pipeline automation (ETL from accounting platforms to Power BI)
2. Finance reporting automation (month-end pack, board pack, operational dashboards)
3. Data model reconciliation and governance
4. Automated variance analysis and commentary
5. Cross-platform Power BI (data from Xero, MYOB, NetSuite, Dynamics, Excel all in one model)
6. Real-time cash position reporting
7. AR aging and collections dashboards with automation triggers
8. Budget vs actual automation with commentary generation
9. Compliance and audit dashboards
10. Executive dashboard automation for CFO and board reporting

**Case study matches:**
- `asset-mgmt-data-integration`
- `distribution-ondemand-reporting`
- `financial-services-risk-ai`
- `manufacturing-invoice-hub`

**Ordron's approach on Power BI:**
Power BI work starts underneath the visualisation layer. Ordron's first step is almost always to audit or build the data model and data pipelines, because Power BI dashboards built on a bad data model compound errors faster than they surface them. Azure data services do most of the heavy lifting. The controlled database layer becomes the single source of truth that feeds Power BI, which means numbers in reports always reconcile back to source systems.

---

## 14. IGNITION (`ignition-automation`)

**Category:** Practice management

**Position statement:**
Ignition (formerly Practice Ignition) is the proposal-to-invoice platform used by Australian accounting practices, bookkeepers, and professional services firms. It sits above the accounting ledger and handles the client-facing workflow: proposals, engagement letters, recurring billing, client management. Ordron's Ignition work concentrates on firms running Ignition alongside their accounting stack and wanting the two to work as a system rather than two separate tools. Ignition automation is different from the other platform hubs because Ignition's primary user is a practice, not a CFO.

**Three pain points in a practice principal's voice:**
- "Ignition creates the invoice, Xero gets the invoice, and then we spend Friday mornings reconciling the two."
- "Recurring billing in Ignition is supposed to be automatic. Somehow every month we've got 10 clients whose billing didn't fire correctly."
- "I've got great data in Ignition about client lifetime value. None of it makes it into any reporting I can actually use."

**Automation themes to prioritise in the 10:**
1. Ignition to Xero or MYOB reconciliation automation
2. Recurring billing validation and exception handling
3. Client data sync between Ignition and accounting platform
4. Proposal to engagement automation
5. Practice reporting on client profitability, lifetime value, engagement metrics
6. Automated collection workflows for Ignition invoices
7. Multi-entity practice consolidation (for practices with multiple entities or trusts)
8. Client onboarding workflow automation from Ignition acceptance through to accounting setup
9. Compliance and engagement letter tracking
10. Integration with CRM, project management, and workflow tools

**Case study matches:**
- `advisory-excel-to-enterprise`
- `asset-mgmt-data-integration`
- `financial-services-risk-ai`

**Ordron's approach on Ignition:**
Ignition sits in a different category from the other platforms because its primary user is an accounting practice running its own business, not a CFO running a finance function. Ordron's approach is to treat Ignition as the client-facing workflow layer and make it flow cleanly into whatever accounting platform the practice uses. API-first because Ignition has solid API coverage. The biggest automation opportunity is almost always in the reconciliation and exception handling between Ignition and the ledger.

---

## How to use this document

This goes to Cursor as an input file alongside the Batch prompts. Cursor's job is to:

1. Read the Xero entry in `src/data/platforms.ts` as the structural reference.
2. Read the corresponding section in this document for each platform it's generating.
3. Produce the `platforms.ts` entry using this raw content as the factual base, polished into Xero-matching structure.
4. Never invent automation claims beyond what's described here. If in doubt, write fewer automations rather than made-up ones.
5. Generate hero images following the visual direction in each section plus the `ordron-build-standards` rule.

Write nothing that claims work Ordron hasn't done. The position statements above reflect real Ordron experience. The pain points are representative of what Ordron's client base actually says. The automation themes map to Ordron's real build history across these platforms.
