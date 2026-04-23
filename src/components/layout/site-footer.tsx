import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Wordmark } from "@/components/brand/wordmark";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { footerPlatforms } from "@/lib/platforms";

const footerNav = [
  {
    heading: "Automation guides",
    links: [
      {
        label: "Finance automation in AU",
        href: "/finance-automation-australia",
      },
      {
        label: "Accounts Payable",
        href: "/guides/accounts-payable-automation",
      },
      {
        label: "Accounts Receivable",
        href: "/guides/accounts-receivable-automation",
      },
      {
        label: "Reconciliations",
        href: "/guides/reconciliations-automation",
      },
      {
        label: "Month-End Close",
        href: "/guides/month-end-close-automation",
      },
    ],
  },
  {
    heading: "Platforms",
    links: [
      ...footerPlatforms.map((p) => ({
        label: p.shortLabel,
        href: `/platforms/${p.slug}`,
      })),
      { label: "All platforms", href: "/platforms" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-surface-ink text-white">
      <Container className="py-20">
        <div className="flex flex-col gap-14 lg:flex-row lg:gap-20">
          <div className="max-w-sm">
            <Wordmark tone="light" />
            <p className="mt-5 text-[15px] leading-relaxed text-white/72">
              Finance automation infrastructure for Australian mid-market
              businesses. 130 frameworks, 13 platforms, built in Sydney.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={siteConfig.ctas.scorecard.href} variant="inverse">
                {siteConfig.ctas.scorecard.label}
              </Button>
              <Button
                href={siteConfig.ctas.healthCheck.href}
                variant="primary"
              >
                {siteConfig.ctas.healthCheck.label}
              </Button>
            </div>
          </div>

          <div className="grid flex-1 gap-10 sm:grid-cols-3">
            {footerNav.map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
                  {col.heading}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[15px] text-white/80 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p className="numeric">
            &copy; {new Date().getFullYear()} Ordron Pty Ltd. Sydney, NSW.
            ABN {siteConfig.abn}.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/security" className="hover:text-white">
              Security
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
