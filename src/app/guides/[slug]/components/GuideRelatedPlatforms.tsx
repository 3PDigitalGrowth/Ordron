import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Guide } from "@/data/guides";
import { getPlatformHubBySlug } from "@/data/platforms";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

type Props = {
  guide: Guide;
};

/**
 * Cross-link block: pushes the reader from the function-level guide
 * into the matching platform hubs. Uses getPlatformHubBySlug so each
 * card gets a real tagline; slugs that exist in src/lib/platforms.ts
 * but have no populated hub yet are filtered out quietly.
 */
export function GuideRelatedPlatforms({ guide }: Props) {
  const hubs = guide.relatedPlatformSlugs
    .map((slug) => getPlatformHubBySlug(slug))
    .filter((h): h is NonNullable<typeof h> => Boolean(h));

  if (hubs.length === 0) return null;

  const functionLabel = guide.category.toLowerCase();

  return (
    <Section tone="surface-2" size="md">
      <Container>
        <div className="max-w-[760px]">
          <Reveal>
            <Eyebrow>Go deeper</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl">
              {guide.category} automation on your platform
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[620px] text-pretty text-lg leading-relaxed text-ink-soft">
              The guide you just read is function-first. Each platform hub is
              platform-first: the 10 named automations we ship on that
              platform, the integration pattern, and how {functionLabel}{" "}
              specifically plays out there.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {hubs.map((h, i) => (
            <Reveal key={h.slug} as="li" delay={i * 0.05} amount={0.25}>
              <Link
                href={`/platforms/${h.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/40 hover:shadow-float"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ordron-blue-deep)]">
                    Platform hub
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
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-ink">
                  {h.name}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-ink-soft">
                  {h.tagline}
                </p>
                <p className="mt-5 text-[13px] font-semibold text-[color:var(--ordron-blue-deep)] group-hover:text-[color:var(--ordron-blue)]">
                  See {functionLabel} on {h.name}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
