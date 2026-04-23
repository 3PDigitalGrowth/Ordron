import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GUIDE_BLURBS, type PlatformHub } from "@/data/platforms";
import { Reveal } from "./motion";

type Props = {
  platform: PlatformHub;
};

export function PlatformRelatedGuides({ platform }: Props) {
  const guides = platform.relatedGuideSlugs
    .map((slug) => ({
      slug,
      ...GUIDE_BLURBS[slug],
    }))
    .filter((g): g is { slug: string; label: string; blurb: string } =>
      Boolean(g.label && g.blurb),
    );

  if (guides.length === 0) return null;

  return (
    <Section tone="surface-2" size="md">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Go deeper</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-balance">
              Related automation guides.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              The pillar guides unpack each function across every platform,
              not just {platform.name}. Useful when you are benchmarking or
              briefing the rest of the leadership team.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {guides.map((g, i) => (
            <Reveal key={g.slug} as="li" delay={i * 0.06} amount={0.25}>
              <Link
                href={`/guides/${g.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:shadow-soft"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ordron-blue-deep)]">
                    Guide
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    aria-hidden
                    className="shrink-0 text-ink-faint transition-colors group-hover:text-[color:var(--ordron-blue)]"
                  >
                    <path
                      d="M4 10h12m0 0-5-5m5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink">
                  {g.label}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                  {g.blurb}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
