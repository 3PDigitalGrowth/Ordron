import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { HealthCheckButton } from "@/components/health-check/health-check-button";
import { siteConfig } from "@/lib/site";

export function ClosingCta() {
  return (
    <Section tone="ink" size="md" id="closing" className="text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(at 15% 100%, rgba(0,171,255,0.25), transparent 55%)",
        }}
      />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-2xl">
            <h2 className="text-balance text-white">
              Start with the Scorecard. Finish with a finance team that gets
              its week back.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/72">
              Five minutes now to see where your hours are going. Sixty
              minutes with Ordron to get a report that tells you what to do
              about it. Then it is up to you.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:gap-4">
            <Button
              href={siteConfig.ctas.scorecard.href}
              variant="primary"
              size="lg"
            >
              Take the 5-minute Scorecard
            </Button>
            <HealthCheckButton variant="inverse" size="lg" source="closing-cta">
              Book a Health Check
            </HealthCheckButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}
