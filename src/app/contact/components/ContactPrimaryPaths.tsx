import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

/**
 * Re-surface the two real conversion paths. Someone on the Contact
 * page may still be deciding between "send a message", "run the
 * diagnostic", or "book the call", so we give them the clearest
 * visual signal for each. The Roadmap card carries the primary
 * visual weight (solid primary button, filled surface, teal accent
 * rule); the Diagnostic card uses the outline ghost button pattern
 * to sit a half-step back.
 */
export function ContactPrimaryPaths() {
  return (
    <Section tone="surface-2" size="md">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>The fastest way in</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl">
              Most people start here
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-soft">
              Two ways to find out whether Ordron is a fit, neither of
              them a sales call.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Diagnostic card, lower-commitment path */}
          <Reveal delay={0.05}>
            <article className="flex h-full flex-col justify-between rounded-3xl border border-line bg-surface p-8 sm:p-10">
              <div>
                <Eyebrow>5 minutes</Eyebrow>
                <h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
                  Find your automation quick wins
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">
                  Ten questions across four pillars. Instant score, no
                  sales call. Tells you where your finance hours are
                  actually going.
                </p>
              </div>
              <div className="mt-8">
                <Button href="/scorecard" variant="ghost" size="lg">
                  Start the diagnostic
                </Button>
              </div>
            </article>
          </Reveal>

          {/* Roadmap card, higher-commitment path, visually heavier */}
          <Reveal delay={0.12}>
            <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-[color:var(--ordron-teal)]/35 bg-surface-3 p-8 shadow-soft sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-[color:var(--ordron-teal)]"
              />
              <div>
                <Eyebrow>60 minutes</Eyebrow>
                <h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
                  Book your Roadmap
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">
                  One hour on Zoom or on site. Written report inside 48
                  hours naming the automations, priority order, and ROI
                  projections. Yours to keep whether you engage Ordron
                  or not.
                </p>
              </div>
              <div className="mt-8">
                <Button href="/health-check" variant="primary" size="lg">
                  Book the Roadmap
                </Button>
              </div>
            </article>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
