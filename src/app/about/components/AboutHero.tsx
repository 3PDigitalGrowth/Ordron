import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { AboutBreadcrumb } from "./AboutBreadcrumb";
import { FadeIn } from "./motion";

export function AboutHero() {
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
        <AboutBreadcrumb />

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <FadeIn>
              <Eyebrow>About Ordron</Eyebrow>
            </FadeIn>
            <FadeIn delay={0.05} as="h1">
              <span className="mt-5 block text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
                Built by engineers who got tired of watching finance teams do
                the same manual work every month.
              </span>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="mt-6 max-w-[560px] text-pretty text-lg leading-relaxed text-ink-soft">
                Ordron designs custom finance automation infrastructure for
                Australian mid-market businesses. 130 frameworks across 13
                platforms. Sydney-built, database-first, human-in-the-loop by
                default.
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
              <Image
                src="/about/hero.jpg"
                alt="Morning light across a timber desk in Ordron's Sydney working space, eucalyptus visible through the window, representing the calm end-state finance automation delivers."
                width={1024}
                height={576}
                priority
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(10,26,36,0) 55%, rgba(10,26,36,0.55) 100%)",
                }}
              />

              <figure className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[340px]">
                <blockquote className="rounded-2xl border border-white/40 bg-white/85 p-5 shadow-float backdrop-blur-md">
                  <p className="font-display text-[17px] font-medium leading-snug text-ink">
                    &ldquo;The test isn&rsquo;t whether the automation
                    works. It&rsquo;s whether the team&rsquo;s week got
                    quieter.&rdquo;
                  </p>
                  <figcaption className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Aana Mahajan, Ordron
                  </figcaption>
                </blockquote>
              </figure>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}
