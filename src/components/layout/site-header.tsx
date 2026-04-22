import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-surface/85 backdrop-blur-md">
      <Container className="flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className="flex items-center rounded-full p-1 -ml-1"
          aria-label="Ordron home"
        >
          <Wordmark priority />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            href={siteConfig.ctas.scorecard.href}
            variant="ghost"
            size="md"
            className="hidden sm:inline-flex"
          >
            {siteConfig.ctas.scorecard.label}
          </Button>
          <Button
            href={siteConfig.ctas.healthCheck.href}
            variant="primary"
            size="md"
          >
            {siteConfig.ctas.healthCheck.label}
          </Button>
        </div>
      </Container>
    </header>
  );
}
