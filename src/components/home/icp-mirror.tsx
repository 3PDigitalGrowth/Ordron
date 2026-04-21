import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site";

type Profile = {
  tag: string;
  title: string;
  context: string;
  quotes: string[];
  triggers: string[];
};

const profiles: Profile[] = [
  {
    tag: "CFO or finance director",
    title: "You run finance at a growing mid-market business.",
    context:
      "20 to 200 staff. $10M to $50M revenue. The team is good, but manual workflows are quietly draining time and creating risk that audit will eventually surface.",
    quotes: [
      "My team spends 20 hours a week on invoice matching alone.",
      "Month-end close takes 10 days. It should take 2.",
      "I know automation exists. I don't trust a chatbot with my ledger.",
    ],
    triggers: ["Staff turnover", "Audit finding", "Growth spurt", "System upgrade"],
  },
  {
    tag: "Owner or practice principal",
    title: "You are the finance department at your own business.",
    context:
      "5 to 50 staff. $1M to $15M revenue. You wear the CFO hat after hours because there is no budget to hire one, and the manual work keeps finding its way back to you.",
    quotes: [
      "I am going through 800 invoices a week just to find the errors.",
      "I cannot afford an ops person but I need one yesterday.",
      "I tried ChatGPT but it cannot actually touch my Xero data.",
    ],
    triggers: ["BAS season", "Staff leaves", "Client growth", "Error incident"],
  },
];

export function IcpMirror() {
  return (
    <Section tone="surface" size="md" id="who-this-is-for">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Who this is for</Eyebrow>
          <h2 className="mt-4 text-balance">
            Does this sound like the job you are doing today?
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Ordron is built for two audiences. Both spend more time on manual
            finance work than the business realises, and both are one decent
            automation project away from getting their week back.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {profiles.map((p) => (
            <article
              key={p.tag}
              className="flex h-full flex-col rounded-[28px] border border-line bg-surface p-8 shadow-soft"
            >
              <Badge tone="brand">{p.tag}</Badge>
              <h3 className="mt-5 text-pretty">{p.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                {p.context}
              </p>

              <ul className="mt-6 space-y-3">
                {p.quotes.map((q) => (
                  <li
                    key={q}
                    className="rounded-2xl border border-line-soft bg-surface-2 p-4 text-[15px] italic text-ink-soft"
                  >
                    &ldquo;{q}&rdquo;
                  </li>
                ))}
              </ul>

              <div className="mt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Usually triggered by
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {p.triggers.map((t) => (
                    <li key={t}>
                      <Badge tone="neutral">{t}</Badge>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-8">
                <Button
                  href={siteConfig.ctas.scorecard.href}
                  variant="primary"
                  size="md"
                >
                  Start with the Scorecard
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
