import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FaqGrid, type FaqGridItem } from "@/components/ui/faq-grid";

const items: FaqGridItem[] = [
  {
    question: "Is this just ChatGPT wrapped up in a service?",
    answer:
      "No. ChatGPT is a language model. Ordron builds real infrastructure that reads your documents, calls your systems, posts entries to your ledger, and routes exceptions to the right person. We use AI where it actually helps (OCR, classification, anomaly detection) and rules where rules are safer.",
  },
  {
    question:
      "We already use what is built into Xero, MYOB or QuickBooks. Why do we need you?",
    answer:
      "Platform-native automation is great for the 60 percent of workflows that fit the platform's model. The other 40 percent is where the hours go: cross-system data moves, exception handling, custom reporting, approvals that sit outside the tool. That is where Ordron sits.",
  },
  {
    question: "Can we DIY this with UiPath or Power Automate?",
    answer:
      "Yes, if you have internal developer capacity and are prepared to own it forever. Most mid-market finance teams do not. We deliver the same outcome as a turnkey project, without needing to run the roadmap internally.",
  },
  {
    question: "How is this different from ApprovalMax or Lightyear?",
    answer:
      "Point solutions like those solve one workflow extremely well. Ordron builds infrastructure that coordinates across AP, AR, reconciliations, reporting and whatever else is manual, so the automations compound over time rather than sitting in silos.",
  },
  {
    question: "How long until we actually see results?",
    answer:
      "Most quick-win projects deliver a working automation within 4 to 6 weeks from kickoff. Full infrastructure builds run 8 to 12 weeks depending on scope. The Automation Roadmap call produces a firm timeline with milestones before you commit to any build.",
  },
  {
    question: "Will this disrupt our month-end close?",
    answer:
      "No. We build and test every automation in a staging environment that mirrors your live systems. Nothing goes near your production ledger until you have signed off on test results. Month-end cadence continues as usual through the build phase.",
  },
  {
    question: "What about data security and audit trails?",
    answer:
      "Each client gets isolated, encrypted infrastructure on Azure. Every automated action is logged with inputs, outputs and the source system, so your auditors can trace exactly what ran, when, and why. We can brief your IT lead directly during the Automation Roadmap session.",
  },
  {
    question: "What does a project cost?",
    answer:
      "Most projects sit between $5,000 and $50,000 depending on scope, with partnerships from around $1,600 per month for ongoing work. We never quote before the Automation Roadmap because the Roadmap is what produces the scope and the ROI to justify the spend.",
  },
];

export function Faq() {
  return (
    <Section tone="surface" size="md" id="faq">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="mt-4 text-balance">
            Straight answers to the objections we hear most often.
          </h2>
        </div>

        <FaqGrid className="mt-12" items={items} accent="blue" />
      </Container>
    </Section>
  );
}
