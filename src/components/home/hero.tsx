import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HeroDashboard } from "@/components/art/hero-dashboard";
import { PlatformLogo } from "@/components/brand/platform-logo";
import { siteConfig } from "@/lib/site";
import { platforms } from "@/lib/platforms";

export function Hero() {
  return (
    <Section tone="surface" size="lg" className="pt-14 sm:pt-20">
      {/* faint dotted backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 30%, rgba(0,171,255,0.12), transparent 55%)",
        }}
      />

      <Container width="wide">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,660px)] xl:gap-16">
          <div>
            <Eyebrow>For CFOs and finance leaders</Eyebrow>
            <h1
              className="mt-5 max-w-[640px] text-balance"
              style={{ fontSize: "clamp(2.25rem, 4.2vw, 3.25rem)" }}
            >
              Stop losing{" "}
              <span className="relative inline-block">
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1 h-3 bg-[color:var(--ordron-amber)]/55"
                />
                <span className="relative numeric">$104,000</span>
              </span>{" "}
              a year to manual finance work.
            </h1>
            <p className="mt-6 max-w-[560px] text-pretty text-lg leading-relaxed text-ink-soft">
              Automate the AP, AR, reconciliations and reporting work draining
              your team. Built on 130 proven frameworks, tuned to your stack,
              delivered turnkey for Australian mid-market businesses.
            </p>

            <div className="mt-9 flex flex-col items-start gap-3">
              <Button
                href={siteConfig.ctas.scorecard.href}
                variant="primary"
                size="lg"
              >
                Find your automation quick wins
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M3.75 9h10.5m0 0L10 4.5M14.25 9 10 13.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
              <p className="text-sm text-ink-muted">
                5-minute diagnostic. Instant results.
              </p>
              <Link
                href={siteConfig.ctas.healthCheck.href}
                className="inline-flex items-center text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
              >
                Or book a full Roadmap diagnostic <span aria-hidden>→</span>
              </Link>
            </div>

          </div>

          <div className="relative xl:-mr-10 2xl:-mr-16 lg:self-center">
            <HeroDashboard />
          </div>
        </div>

        {/* trust strip */}
        <div className="mt-16 border-t border-line pt-10 sm:mt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Built for Australian finance teams running on
          </p>
          <ul className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-5">
            {platforms.map((p) => (
              <li
                key={p.slug}
                className="text-ink-faint transition-colors hover:text-ink"
              >
                <Link
                  href={`/platforms/${p.slug}`}
                  aria-label={`${p.name} automation`}
                  title={p.name}
                  className="group inline-flex items-center rounded-sm outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--ordron-blue)]"
                >
                  <PlatformLogo slug={p.slug} label={p.name} />
                </Link>
              </li>
            ))}
            <li className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink">
              <Link href="/platforms" className="inline-flex items-center gap-1">
                See all platforms
                <span aria-hidden>→</span>
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
