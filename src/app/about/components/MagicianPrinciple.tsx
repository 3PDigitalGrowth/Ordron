import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "./motion";

export function MagicianPrinciple() {
  return (
    <Section tone="surface-2" size="md" id="principle">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line"
      />
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>The Ordron principle</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-balance">
                Make the manual work disappear.
              </h2>
            </Reveal>

            <div className="mt-7 space-y-5 text-[17px] leading-[1.7] text-ink-soft">
              <Reveal delay={0.1}>
                <p>
                  The finance teams that get the most out of automation do
                  not talk about the automation. They talk about what they
                  are doing with the time it gave them back. The dashboards
                  stop being the point. The bot stops being the story. The
                  controller does not mention the tool in her status update
                  because the tool is just how the work gets done now.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>
                  That is the bar Ordron builds to. The best engagements
                  end with a finance leader saying something like,{" "}
                  <em className="not-italic font-semibold text-ink">
                    I don&rsquo;t know when this got easier, it just did
                  </em>
                  . That sentence is the shortest possible spec for what
                  we are trying to make true.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={0.12} className="lg:pt-8">
            <figure className="relative overflow-hidden rounded-[28px] border border-line bg-surface p-10 shadow-soft sm:p-12">
              <span
                aria-hidden
                className="absolute left-8 top-6 font-display text-[72px] font-semibold leading-none text-[color:var(--ordron-blue)]/20"
              >
                &ldquo;
              </span>
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-[color:var(--ordron-blue)]/8"
              />
              <blockquote className="relative">
                <p className="font-display text-[22px] font-medium leading-[1.35] text-ink sm:text-[24px]">
                  If the finance team is still talking about the bot a
                  month after go-live, the work is not finished.
                </p>
              </blockquote>
              <figcaption className="relative mt-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[color:var(--ordron-blue)]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Ordron build principle
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
