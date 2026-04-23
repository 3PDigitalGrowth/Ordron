import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS, type PlatformHub } from "@/data/platforms";
import { PlatformBreadcrumb } from "./PlatformBreadcrumb";
import { FadeIn } from "./motion";

type Props = {
  platform: PlatformHub;
  heroImageSrc?: string;
};

export function PlatformHero({ platform, heroImageSrc }: Props) {
  return (
    <Section tone="surface" size="md" className="pt-10 sm:pt-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-32 h-[520px] opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(at 20% 25%, rgba(0,171,255,0.14), transparent 60%)",
        }}
      />
      <Container className="relative">
        <PlatformBreadcrumb platform={platform} />

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <FadeIn>
              <Eyebrow>{CATEGORY_LABELS[platform.category]}</Eyebrow>
            </FadeIn>
            <FadeIn delay={0.05} as="h1">
              <span className="mt-5 block text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
                {platform.name} automation, built for Australian finance teams.
              </span>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="mt-6 max-w-[560px] text-pretty text-lg leading-relaxed text-ink-soft">
                {platform.tagline}
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/health-check" variant="primary" size="lg">
                  Book your Roadmap
                </Button>
                <Button href="/scorecard" variant="ghost" size="lg">
                  Find your automation quick wins
                </Button>
              </div>
              <p className="mt-4 max-w-[480px] text-sm text-ink-muted">
                60 minutes. Written report. Yours to keep. Or start with the
                5-minute diagnostic for instant results.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.15} className="relative">
            <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface-2 shadow-soft">
              {heroImageSrc ? (
                <Image
                  src={heroImageSrc}
                  alt={`${platform.name} running on a laptop in an Australian finance office, used as the hero image for the ${platform.name} automation hub`}
                  width={1024}
                  height={576}
                  priority
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="aspect-[16/9] w-full bg-gradient-to-br from-surface to-surface-2" />
              )}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,26,36,0) 55%, rgba(10,26,36,0.45) 100%)",
                }}
              />

              {/* Floating hero stat (glassmorphism 2.0) */}
              <div className="absolute bottom-5 left-5 right-5 sm:left-6 sm:right-auto sm:bottom-6 sm:max-w-[280px]">
                <div className="rounded-2xl border border-white/40 bg-white/80 p-5 shadow-float backdrop-blur-md">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    {platform.heroStat.label}
                  </p>
                  <p className="mt-2 font-display text-5xl font-semibold leading-none text-ink numeric tabular-nums">
                    {platform.heroStat.value}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
