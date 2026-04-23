import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { PlatformHub } from "@/data/platforms";
import { Reveal } from "./motion";

type Props = {
  platform: PlatformHub;
};

export function PlatformContext({ platform }: Props) {
  return (
    <Section tone="surface-2" size="md">
      <Container>
        {/* Intentional asymmetry: narrow text column, wider pull-quote column. */}
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-24">
          <Reveal>
            <Eyebrow>Context</Eyebrow>
            <h2 className="mt-4 text-balance">
              Why {platform.name} matters for mid-market finance.
            </h2>
            <p className="mt-6 text-[16px] leading-[1.75] text-ink-soft">
              {platform.whyPlatformMatters}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:pt-16">
            <figure className="relative rounded-[28px] border border-line bg-surface p-8 shadow-soft sm:p-12 lg:ml-6">
              <span
                aria-hidden
                className="absolute -top-4 left-8 font-display text-7xl leading-none text-[color:var(--ordron-blue)]/20"
              >
                &ldquo;
              </span>
              <blockquote className="font-display text-2xl font-medium leading-snug text-ink sm:text-[1.75rem]">
                {platform.name} is the ledger. The hours live in the gaps
                between {platform.name} and everything else in your stack. The
                job is to close those gaps, not to replace {platform.name}.
              </blockquote>
              <figcaption className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Ordron build principle
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
