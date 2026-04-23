import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import type { Guide } from "@/data/guides";
import { GuideBreadcrumb } from "./GuideBreadcrumb";
import { FadeIn } from "@/app/platforms/[slug]/components/motion";

type Props = {
  guide: Guide;
  heroImageSrc?: string;
};

export function GuideHero({ guide, heroImageSrc }: Props) {
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
        <GuideBreadcrumb guide={guide} />

        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <FadeIn>
              <Eyebrow>{guide.eyebrow}</Eyebrow>
            </FadeIn>
            <FadeIn delay={0.05} as="h1">
              <span className="mt-5 block text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
                {guide.title}
              </span>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="mt-6 max-w-[560px] text-pretty text-lg leading-relaxed text-ink-soft">
                {guide.heroTagline}
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
                  alt={`Editorial hero image for the ${guide.category.toLowerCase()} automation guide, set in an Australian finance workspace.`}
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

              {/* Floating editorial pull-quote card (glassmorphism 2.0) */}
              <div className="absolute bottom-5 left-5 right-5 sm:left-6 sm:right-auto sm:bottom-6 sm:max-w-[300px]">
                <div className="rounded-2xl border border-white/40 bg-white/85 p-5 shadow-float backdrop-blur-md">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Read time
                  </p>
                  <p className="mt-2 font-display text-2xl font-semibold leading-tight text-ink">
                    8 to 10 minutes
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
                    A pillar guide for finance leaders scoping{" "}
                    {guide.category.toLowerCase()} automation before briefing a
                    vendor.
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
