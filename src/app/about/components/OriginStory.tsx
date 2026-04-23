import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "./motion";

export function OriginStory() {
  return (
    <Section tone="surface-2" size="md" id="origin">
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>The origin</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-balance">
                Why finance automation, and why Australia.
              </h2>
            </Reveal>

            <div className="mt-8 space-y-6 text-[17px] leading-[1.7] text-ink-soft">
              <Reveal delay={0.1}>
                <p>
                  For most of 2024 we kept meeting the same finance team.
                  Mid-market Australian business, somewhere between $10M and
                  $50M in revenue, good staff, lean structure. Every month
                  the same manual workflow ran the same way it had the month
                  before, because nobody had the time to rebuild it. The
                  controller knew exactly what needed fixing. She just could
                  not get there through the close.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <p>
                  The market around those teams had given up on them.
                  Enterprise RPA was priced for ASX 200 balance sheets.
                  Generic automation consultancies did not know a BAS from a
                  timetable. Point-solution bots handled the easy invoices
                  and fell over the moment a chart of accounts got
                  interesting. The gap was structural, not a positioning
                  insight.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p>
                  Late 2024 we stopped saying yes to everything else. We
                  said yes to finance automation specifically, for
                  Australian mid-market, with finance controls at the core.
                  The 130-framework library is the evidence that the
                  decision paid off. Every project contributed another
                  reusable automation pattern, which means the next client
                  gets the previous client&rsquo;s work for free. Today that
                  library runs across 13 finance platforms for Australian
                  teams from accounting practices through to mid-market
                  enterprises.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.1} className="lg:pt-20">
            <aside className="relative overflow-hidden rounded-[28px] border border-line bg-surface p-8 shadow-soft sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[color:var(--ordron-blue)]/8"
              />
              <div className="relative space-y-7">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Founded
                  </p>
                  <p className="mt-2 font-display text-[28px] font-semibold leading-none text-ink numeric tabular-nums">
                    Sydney, 2025
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                    Incorporated as Ordron Pty Ltd, ABN 75 695 388 893.
                  </p>
                </div>
                <div className="h-px bg-line" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Frameworks shipped
                  </p>
                  <p className="mt-2 font-display text-[40px] font-semibold leading-none text-ink numeric tabular-nums">
                    130
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                    Named, reusable finance automations across the library.
                  </p>
                </div>
                <div className="h-px bg-line" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Platforms covered
                  </p>
                  <p className="mt-2 font-display text-[40px] font-semibold leading-none text-ink numeric tabular-nums">
                    13
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                    Xero, MYOB, NetSuite, SAP, Dynamics, QuickBooks and the
                    rest of the AU finance stack.
                  </p>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
