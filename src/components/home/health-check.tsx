import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

type Step = {
  number: string;
  title: string;
  duration: string;
  detail: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Book",
    duration: "2 min",
    detail:
      "Answer a short form about your tech stack and team size. Pick a time that suits you.",
  },
  {
    number: "02",
    title: "Discover",
    duration: "60 min",
    detail:
      "We map your current workflows, identify pain points and assess automation readiness on a single video call.",
  },
  {
    number: "03",
    title: "Deliver",
    duration: "48 hrs",
    detail:
      "You receive a branded Automation Roadmap report with a prioritised roadmap and ROI projections on the top 3 opportunities.",
  },
  {
    number: "04",
    title: "Decide",
    duration: "30 min",
    detail:
      "Follow-up call to walk through findings. You take the report whether you engage Ordron or not.",
  },
];

const deliverables = [
  "Workflow map with manual bottlenecks flagged",
  "Platform-specific automations from the 130-framework library",
  "Time and cost savings estimate per automation",
  "Prioritised quick-wins-first implementation roadmap",
  "ROI projection for the top 3 opportunities",
  "Recommended next step with indicative project scope",
];

export function HealthCheck() {
  return (
    <Section tone="mint" size="md" id="health-check" className="text-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/40 blur-3xl"
      />
      <Container className="relative">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-20">
          <div>
            <Eyebrow>The Ordron Automation Roadmap</Eyebrow>
            <h2 className="mt-4 text-balance">
              A proper diagnostic, not a sales call with a certificate at the
              end.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              60 minutes of focused workflow mapping plus a written report with
              prioritised opportunities and ROI projections. You keep the
              report whether you engage us or not. That is why it converts when
              people are ready, and builds trust when they are not.
            </p>

            <ol className="mt-10 space-y-3">
              {steps.map((s) => (
                <li
                  key={s.number}
                  className="flex items-center gap-4 rounded-2xl bg-white/70 p-4 shadow-soft backdrop-blur"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink font-display text-sm font-semibold text-white">
                    {s.number}
                  </span>
                  <div className="flex min-w-0 flex-1 items-baseline justify-between gap-4">
                    <div>
                      <p className="font-display text-lg font-semibold text-ink">
                        {s.title}
                      </p>
                      <p className="mt-0.5 text-[14.5px] text-ink-soft">
                        {s.detail}
                      </p>
                    </div>
                    <span className="hidden shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ordron-teal)] sm:block">
                      {s.duration}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside className="rounded-[28px] bg-surface p-8 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              What you walk away with
            </p>
            <h3 className="mt-3 text-xl">Your Automation Roadmap report</h3>
            <ul className="mt-5 space-y-3">
              {deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[15px] text-ink-soft">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    className="mt-1 shrink-0 text-[color:var(--ordron-teal)]"
                    aria-hidden
                  >
                    <path
                      d="m3.5 9.5 3.5 3.5 8-8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 border-t border-line-soft pt-6">
              <Button
                href={siteConfig.ctas.healthCheck.href}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Book your Roadmap
              </Button>
              <p className="mt-3 text-center text-xs text-ink-muted">
                60 minutes. Written report. Yours to keep.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
