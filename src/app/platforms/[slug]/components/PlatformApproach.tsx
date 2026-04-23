import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { PlatformHub } from "@/data/platforms";
import { Reveal } from "./motion";

type Props = {
  platform: PlatformHub;
};

const STEPS = [
  {
    step: "01",
    title: "Database-first",
    body: "Every transaction, contact and tracking category writes to a structured Azure-hosted database you own. The platform stays the ledger; your data is never vendor-locked.",
  },
  {
    step: "02",
    title: "Automation layer",
    body: "OCR, coding models, matching rules and approval workflows run next to the platform, tuned to your chart of accounts and approval thresholds.",
  },
  {
    step: "03",
    title: "Control Panel",
    body: "Your team logs into one interface to review exceptions, see throughput, and audit every automated action, with a named owner for every exception path.",
  },
];

export function PlatformApproach({ platform }: Props) {
  return (
    <Section tone="surface-2" size="md">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>The approach</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-balance">
              How Ordron automates on {platform.name}.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[16px] leading-[1.75] text-ink-soft">
              {platform.ordronApproach}
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08} as="li" amount={0.2}>
              <article className="relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:shadow-soft sm:p-8">
                <span
                  aria-hidden
                  className="font-display text-sm font-semibold text-[color:var(--ordron-blue)] numeric tabular-nums"
                >
                  STEP {s.step}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {s.body}
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
