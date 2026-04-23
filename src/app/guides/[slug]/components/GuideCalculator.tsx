import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CostOfInactionCalculator } from "@/components/calculator/cost-of-inaction";
import type { Guide } from "@/data/guides";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

type Props = {
  guide: Guide;
};

/**
 * Function-framed wrapper around the Cost of Inaction calculator.
 * No `defaultPlatformSlug` is passed because guides span platforms;
 * the calculator's platform chips still let the reader switch to the
 * stack that matches theirs. `gateLevel="light"` keeps the headline
 * and breakdown visible, gating only the top-three automations plus
 * the emailed PDF roadmap, matching the pattern on the platform hubs.
 */
export function GuideCalculator({ guide }: Props) {
  const functionLabel = guide.category.toLowerCase();

  const heading =
    guide.category === "Accounts payable"
      ? "What manual AP is costing your team in dollars."
      : guide.category === "Accounts receivable"
        ? "What slow AR is costing you in working capital."
        : guide.category === "Reconciliations"
          ? "What manual reconciliation is costing you per month."
          : "What a 10-day close is costing you in management capacity.";

  const intro =
    guide.category === "Accounts payable"
      ? "Team size, invoice volume and close time. The headline and breakdown are always visible. Enter your email to unlock the top three AP automations for your stack and the PDF roadmap."
      : guide.category === "Accounts receivable"
        ? "Team size, invoice volume and close time. The headline and breakdown are always visible. Enter your email to unlock the top three AR automations for your stack and the PDF roadmap."
        : guide.category === "Reconciliations"
          ? "Team size, invoice volume and close time. The headline and breakdown are always visible. Enter your email to unlock the top three reconciliation automations for your stack and the PDF roadmap."
          : "Team size, invoice volume and close time. The headline and breakdown are always visible. Enter your email to unlock the top three close automations for your stack and the PDF roadmap.";

  return (
    <Section id="cost-of-inaction" tone="surface" size="md">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Eyebrow>Cost of inaction</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl">
              {heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              Slide in your team size, invoice volume and close duration. The
              calculator applies the same $55/hour blended rate used across
              this guide and translates the leaks into a dollar figure for{" "}
              {functionLabel} specifically.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="mx-auto mt-12 max-w-6xl">
          <CostOfInactionCalculator
            variant="hero"
            source={`guide:${guide.slug}`}
            eyebrow={`${guide.category} calculator`}
            heading={heading}
            intro={intro}
          />
        </Reveal>
      </Container>
    </Section>
  );
}
