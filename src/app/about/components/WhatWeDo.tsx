import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "./motion";

const STATS: { value: string; label: string; sub: string }[] = [
  {
    value: "130+",
    label: "Automation frameworks",
    sub: "Named, reusable, proven on live engagements.",
  },
  {
    value: "13",
    label: "Finance platforms",
    sub: "From Xero and MYOB through to NetSuite and SAP.",
  },
  {
    value: "100%",
    label: "Client retention on partnerships",
    sub: "Every ongoing automation partnership still running.",
  },
];

export function WhatWeDo() {
  return (
    <Section tone="surface" size="md" id="what-we-do">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>What we do</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-balance">
              Finance automation infrastructure, not bots.
            </h2>
          </Reveal>

          <div className="mt-7 space-y-5 text-[17px] leading-[1.7] text-ink-soft">
            <Reveal delay={0.1}>
              <p>
                Most finance automation on the market is a point-solution
                bot glued to a vendor dashboard. It handles the easy
                invoices, produces a chart for the monthly board pack, and
                reintroduces every manual step the moment anything unusual
                shows up. The controller is still doing the work. The work
                just has a different reporting line.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                Ordron builds the other thing. A database-first
                architecture where your transactional data lands in an
                Azure environment you own. An automation layer tuned to
                your chart of accounts, your approval thresholds, your AU
                compliance obligations. A Control Panel where exceptions
                route to a named human with an audit trail attached.
                Infrastructure, not a subscription.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} as="li" amount={0.2}>
              <article className="relative h-full overflow-hidden rounded-3xl border border-line bg-surface-2 p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:shadow-soft">
                <p className="font-display text-[52px] font-semibold leading-none text-ink numeric tabular-nums">
                  {s.value}
                </p>
                <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
                  {s.label}
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                  {s.sub}
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
