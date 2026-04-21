import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

type WasteItem = {
  label: string;
  amount: string;
  detail: string;
  icon: React.ReactNode;
};

const wasteItems: WasteItem[] = [
  {
    label: "Manual invoice processing",
    amount: "$52,000",
    detail: "20 hours per week at $50 per hour",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect
          x="4"
          y="3"
          width="16"
          height="18"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 8h8M8 12h8M8 16h5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Month-end close delays",
    amount: "$24,000",
    detail: "8 extra days of closing costs each cycle",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 7.5v5l3 2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Data entry errors and rework",
    amount: "$13,000",
    detail: "5 hours per week of exception handling",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3 3 20h18L12 3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M12 10v4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Staff overtime and burnout",
    amount: "$15,000",
    detail: "Turnover cost plus recruitment drag",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M4.5 20c1.2-3.8 4.1-6 7.5-6s6.3 2.2 7.5 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function CostOfInaction() {
  return (
    <Section tone="surface-2" size="md" id="cost-of-inaction">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-20">
          <div className="max-w-xl">
            <Eyebrow>The cost of doing nothing</Eyebrow>
            <h2 className="mt-4 text-balance">
              Every year a mid-market finance team loses around{" "}
              <span className="relative whitespace-nowrap">
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1 h-3 bg-[color:var(--ordron-amber)]/55"
                />
                <span className="relative numeric">$104,000</span>
              </span>{" "}
              to manual work.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Finance teams absorb the cost quietly. Hours here, reworked
              invoices there, another late month-end close. It adds up to an
              operational tax on growth that nobody sees on the P&amp;L until it
              is too expensive to ignore.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={siteConfig.ctas.scorecard.href}
                variant="primary"
                size="md"
              >
                See what you are losing
              </Button>
              <Button
                href="/insights/cost-of-manual-finance"
                variant="ghost"
                size="md"
              >
                How the numbers are calculated
              </Button>
            </div>
          </div>

          <div className="rounded-[28px] border border-line bg-surface p-6 shadow-soft sm:p-8">
            <ul className="divide-y divide-line-soft">
              {wasteItems.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[color:var(--ordron-amber)]/15 text-[color:#9B6A10]">
                    <span className="h-5 w-5">{item.icon}</span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold text-ink">
                      {item.label}
                    </p>
                    <p className="text-sm text-ink-muted">{item.detail}</p>
                  </div>
                  <p className="font-display text-xl font-semibold text-ink numeric">
                    {item.amount}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl bg-ink p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                Conservative annual waste
              </p>
              <p className="mt-2 font-display text-4xl font-semibold text-white numeric">
                $104,000+
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/72">
                Ordron&rsquo;s typical project sits around{" "}
                <span className="font-semibold text-white">$10,000</span>.
                Payback period is roughly{" "}
                <span className="font-semibold text-white">5 weeks</span>.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
