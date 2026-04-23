import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";

type FaqItem = {
  q: string;
  a: string;
};

const items: FaqItem[] = [
  {
    q: "Is this just ChatGPT wrapped up in a service?",
    a: "No. ChatGPT is a language model. Ordron builds real infrastructure that reads your documents, calls your systems, posts entries to your ledger, and routes exceptions to the right person. We use AI where it actually helps (OCR, classification, anomaly detection) and rules where rules are safer.",
  },
  {
    q: "We already use what is built into Xero, MYOB or QuickBooks. Why do we need you?",
    a: "Platform-native automation is great for the 60 percent of workflows that fit the platform's model. The other 40 percent is where the hours go: cross-system data moves, exception handling, custom reporting, approvals that sit outside the tool. That is where Ordron sits.",
  },
  {
    q: "Can we DIY this with UiPath or Power Automate?",
    a: "Yes, if you have internal developer capacity and are prepared to own it forever. Most mid-market finance teams do not. We deliver the same outcome as a turnkey project, without needing to run the roadmap internally.",
  },
  {
    q: "How is this different from ApprovalMax or Lightyear?",
    a: "Point solutions like those solve one workflow extremely well. Ordron builds infrastructure that coordinates across AP, AR, reconciliations, reporting and whatever else is manual, so the automations compound over time rather than sitting in silos.",
  },
  {
    q: "What about data security and audit trails?",
    a: "Each client gets isolated, encrypted infrastructure on Azure. Every automated action is logged with inputs, outputs and the source system, so your auditors can trace exactly what ran, when, and why. We can brief your IT lead directly during the Automation Roadmap session.",
  },
  {
    q: "What does a project cost?",
    a: "Most projects sit between $5,000 and $50,000 depending on scope, with partnerships from around $1,600 per month for ongoing work. We never quote before the Automation Roadmap because the Roadmap is what produces the scope and the ROI to justify the spend.",
  },
];

export function Faq() {
  return (
    <Section tone="surface" size="md" id="faq">
      <Container width="narrow">
        <div className="text-center">
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="mt-4 text-balance">
            Straight answers to the objections we hear most often.
          </h2>
        </div>

        <dl className="mt-12 divide-y divide-line">
          {items.map((item) => (
            <details
              key={item.q}
              className="group py-5"
              name="faq"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-lg font-semibold text-ink marker:hidden">
                <span className="flex-1">{item.q}</span>
                <span
                  aria-hidden
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-ink-muted transition-all group-open:rotate-45 group-open:border-[color:var(--ordron-blue)] group-open:text-[color:var(--ordron-blue)]"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M7 2v10M2 7h10"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <dd className="mt-3 max-w-[680px] text-[15.5px] leading-relaxed text-ink-soft">
                {item.a}
              </dd>
            </details>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
