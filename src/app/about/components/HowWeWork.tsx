import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "./motion";

type Principle = {
  number: string;
  title: string;
  body: string;
};

const PRINCIPLES: Principle[] = [
  {
    number: "01",
    title: "Practitioner, not vendor",
    body: "We build, we deploy, we maintain. We do not sell licences and disappear into a partner directory. When an automation breaks at 9pm on the 30th of June, it is our phone that rings.",
  },
  {
    number: "02",
    title: "Finance controls, not just code",
    body: "Every automation routes exceptions to a named owner. Every transaction writes an audit trail. Governance is built in, not bolted on after the auditor asks a question.",
  },
  {
    number: "03",
    title: "Database-first",
    body: "Your data gets a proper home in an Azure database you own, before any automation touches it. The platform stays the ledger; your data is never vendor-locked.",
  },
  {
    number: "04",
    title: "Partnership over project",
    body: "Our best clients treat us as their fractional automation team. Ship once and leave is a failure mode, not a deliverable. Most engagements run for years, not weeks.",
  },
  {
    number: "05",
    title: "AU context, not generic playbooks",
    body: "We know AU tax, AU banks, AU payroll, AU compliance. We have built for Australian mid-market specifically, not a global template adapted on the way past.",
  },
  {
    number: "06",
    title: "Plain language",
    body: "If we cannot explain what we are doing in a sentence, we have not thought hard enough about it. Automation is not complicated enough to justify the jargon vendors wrap it in.",
  },
];

export function HowWeWork() {
  return (
    <Section tone="surface-2" size="md" id="principles">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>How we work</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-balance">
              The six principles we build by.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink-soft">
              Earned, not printed. Each principle is a line we hold at the
              door of every engagement. If we cannot hold to it, we say so
              before we sign.
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.number} delay={i * 0.06} as="li" amount={0.2}>
              <article className="relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:shadow-soft sm:p-8">
                <span
                  aria-hidden
                  className="font-display text-sm font-semibold text-[color:var(--ordron-blue)] numeric tabular-nums"
                >
                  {p.number}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-ink-soft">
                  {p.body}
                </p>
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-[color:var(--ordron-blue)]/8"
                />
              </article>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
