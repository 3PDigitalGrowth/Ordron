import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found | Ordron",
  description:
    "The page you are looking for is not on this site. Try the homepage, the platforms hub, or our case studies.",
  robots: { index: false, follow: true },
};

const escapeRoutes: { href: string; label: string; sub: string }[] = [
  {
    href: "/",
    label: "Home",
    sub: "Start at the top.",
  },
  {
    href: "/platforms",
    label: "Platforms",
    sub: "Xero, MYOB, NetSuite, SAP and ten more.",
  },
  {
    href: "/case-studies",
    label: "Case studies",
    sub: "Real Australian finance teams, real numbers.",
  },
  {
    href: "/guide/automations",
    label: "Automation explorer",
    sub: "All 130 automations, grouped by AP, AR, recs and reporting.",
  },
  {
    href: "/cost-of-inaction",
    label: "Cost of Inaction Calculator",
    sub: "What manual finance is costing you each year.",
  },
  {
    href: "/contact",
    label: "Contact",
    sub: "Send us a message or book a Roadmap call.",
  },
];

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Section tone="surface" size="md">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-32 h-96"
            style={{
              backgroundImage:
                "radial-gradient(at 50% 20%, rgba(0,171,255,0.12), transparent 65%)",
            }}
          />
          <Container width="narrow" className="relative">
            <div className="text-center">
              <Eyebrow>404</Eyebrow>
              <h1 className="mt-5 text-balance">
                That page is not on this site
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                The link may be old, the URL may be mistyped, or we may
                have moved the page. Either way, here are the most useful
                places to land instead.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  href={siteConfig.ctas.healthCheck.href}
                  variant="primary"
                  size="lg"
                >
                  {siteConfig.ctas.healthCheck.label}
                </Button>
                <Button
                  href={siteConfig.ctas.scorecard.href}
                  variant="ghost"
                  size="lg"
                >
                  {siteConfig.ctas.scorecard.label}
                </Button>
              </div>
            </div>

            <ul className="mx-auto mt-16 grid gap-3 sm:grid-cols-2">
              {escapeRoutes.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-[color:var(--ordron-blue)]/30 hover:shadow-soft"
                  >
                    <span>
                      <span className="block font-display font-semibold text-ink">
                        {r.label}
                      </span>
                      <span className="mt-1 block text-sm text-ink-muted">
                        {r.sub}
                      </span>
                    </span>
                    <Arrow />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}

function Arrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className="mt-1 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-[color:var(--ordron-blue)]"
    >
      <path
        d="M3.75 9h10.5m0 0L10 4.5M14.25 9 10 13.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
