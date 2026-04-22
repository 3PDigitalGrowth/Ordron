import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CostOfInactionCalculator } from "@/components/calculator/cost-of-inaction";

export function CostOfInaction() {
  return (
    <Section tone="surface-2" size="md" id="cost-of-inaction">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
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
            The exact number for your team is probably higher or lower. Plug in
            four inputs below and see. We show the working so you can defend
            the answer to a CFO.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-6xl">
          <CostOfInactionCalculator
            variant="hero"
            source="homepage"
            eyebrow="Cost of inaction calculator"
            heading="Your team, your platform, your number."
            intro="Four inputs. Headline annual waste. Likely payback. Top three automations for your stack. Full written breakdown emailed on request."
          />
        </div>
      </Container>
    </Section>
  );
}
