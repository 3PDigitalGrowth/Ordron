import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CostOfInactionCalculator } from "@/components/calculator/cost-of-inaction";
import type { PlatformHub } from "@/data/platforms";
import { Reveal } from "./motion";

type Props = {
  platform: PlatformHub;
};

/**
 * Wrapper around the reusable Cost of Inaction calculator, pre-filtered
 * to this platform. The underlying component already handles:
 *   - platform dropdown (defaultPlatformSlug drives the initial value)
 *   - blurred breakdown + email gate
 *   - top-three-automations recommendation
 *
 * We pass the platform name into the heading and intro so the module
 * reads as platform-specific, not generic.
 */
export function PlatformCalculator({ platform }: Props) {
  return (
    <Section tone="surface" size="md">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>Cost of inaction</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-balance">
              What {platform.name} is costing your team in manual work.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              Slide in your team size, invoice volume and close duration. The
              headline number is always visible. Enter your email to unlock
              the full line-by-line breakdown and the top three automations
              for {platform.name}.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mx-auto mt-12 max-w-6xl">
          <CostOfInactionCalculator
            variant="hero"
            source={`platform-hub:${platform.slug}`}
            defaultPlatformSlug={platform.slug}
            eyebrow={`${platform.name} calculator`}
            heading={`The ${platform.name} hours, in dollars.`}
            intro={`Pre-set to ${platform.name}. Change team size and volume to match yours. Full written breakdown emailed on request.`}
          />
        </Reveal>
      </Container>
    </Section>
  );
}
