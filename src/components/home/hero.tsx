import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { HeroDashboard } from "@/components/art/hero-dashboard";
import { siteConfig } from "@/lib/site";

const platformLogos = [
  "Xero",
  "MYOB",
  "QuickBooks",
  "NetSuite",
  "SAP",
  "Dynamics",
];

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
        <div className="grid items-center gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,700px)] xl:gap-16">
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
              Ordron builds the finance automation infrastructure that runs AP,
              AR, reconciliations and reporting on autopilot. 130 frameworks
              across 13 finance platforms, delivered for Australian mid-market
              businesses.
            </p>

            <div className="mt-9 flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center">
              <Button
                href={siteConfig.ctas.scorecard.href}
                variant="primary"
                size="lg"
              >
                Take the 5-minute Scorecard
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
              <Button
                href={siteConfig.ctas.healthCheck.href}
                variant="ghost"
                size="lg"
              >
                Book a Health Check
              </Button>
            </div>

            <p className="mt-5 text-sm text-ink-muted">
              10 questions. 5 minutes. Instant score. No sales call required.
            </p>
          </div>

          <div className="relative xl:-mr-10 2xl:-mr-16">
            <HeroDashboard />
          </div>
        </div>

        {/* trust strip */}
        <div className="mt-16 border-t border-line pt-10 sm:mt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Built for Australian finance teams running on
          </p>
          <ul className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-3">
            {platformLogos.map((name) => (
              <li
                key={name}
                className="font-display text-base font-semibold text-ink-faint transition-colors hover:text-ink sm:text-lg"
              >
                <Link
                  href={`/platforms/${name.toLowerCase()}-automation`}
                  className="tracking-tight"
                >
                  {name}
                </Link>
              </li>
            ))}
            <li className="font-display text-base font-semibold text-ink-faint sm:text-lg">
              + 7 more
            </li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}
