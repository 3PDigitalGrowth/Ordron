import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Guide } from "@/data/guides";
import { getPlatformBySlug } from "@/lib/platforms";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

type Props = {
  guide: Guide;
};

export function GuidePlatformNotes({ guide }: Props) {
  const notes = guide.platformSpecificNotes
    .map((n) => {
      const platform = getPlatformBySlug(n.platformSlug);
      return platform ? { ...n, platform } : null;
    })
    .filter((n): n is NonNullable<typeof n> => n !== null);

  const functionLabel = guide.category.toLowerCase();

  return (
    <Section id="platform-notes" tone="surface" size="md">
      <Container>
        <div className="max-w-[760px]">
          <Reveal>
            <Eyebrow>Platform specifics</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl">
              How {functionLabel} automation differs by platform
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[620px] text-pretty text-lg leading-relaxed text-ink-soft">
              The mechanics are the same. The platform-level realities are
              not. Where Xero stops, where MYOB breaks, where NetSuite and
              SAP need a different approach.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {notes.map((n, i) => (
            <Reveal
              key={n.platformSlug}
              delay={0.04 + (i % 3) * 0.04}
              as="li"
            >
              <Link
                href={`/platforms/${n.platformSlug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface-2 p-7 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/40 hover:shadow-float"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-display text-xl font-semibold text-ink">
                    {n.platform.name}
                  </p>
                  <span
                    aria-hidden
                    className="text-ink-faint transition-colors group-hover:text-[color:var(--ordron-blue)]"
                  >
                    →
                  </span>
                </div>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-soft">
                  {n.note}
                </p>
                <p className="mt-6 text-[13px] font-semibold text-[color:var(--ordron-blue-deep)] group-hover:text-[color:var(--ordron-blue)]">
                  See {functionLabel} on {n.platform.name}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
