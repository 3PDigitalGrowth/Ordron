import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import type { Guide } from "@/data/guides";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

type Props = {
  guide: Guide;
};

export function GuideFinalCta({ guide }: Props) {
  const functionLabel = guide.category.toLowerCase();

  return (
    <Section tone="ink" size="md" className="text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(at 15% 100%, rgba(0,171,255,0.25), transparent 55%)",
        }}
      />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow className="!text-white/70">Next step</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl">
                Ready to see where {functionLabel} is costing you the most?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg leading-relaxed text-white/72">
                Book a Roadmap and we shadow your {functionLabel} workflows
                for an hour, then deliver a written report inside 48 hours
                naming the top three automations for your team. Or run the
                5-minute diagnostic first, your call.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="flex flex-col gap-5 sm:flex-row lg:flex-col lg:gap-6">
              <div className="flex flex-col gap-1.5">
                <Button href="/health-check" variant="primary" size="lg">
                  Book your Roadmap
                </Button>
                <p className="text-xs text-white/60">
                  60 minutes. Written report. Yours to keep.
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <Button href="/scorecard" variant="inverse" size="lg">
                  Find your automation quick wins
                </Button>
                <p className="text-xs text-white/60">
                  5-minute diagnostic. Instant results.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
