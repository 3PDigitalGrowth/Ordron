import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { Container } from "@/components/ui/container";
import { MegaMenu } from "@/components/navigation/MegaMenu";
import { MobileNav } from "@/components/navigation/MobileNav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-surface/85 backdrop-blur-md">
      <Container className="flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className="flex items-center rounded-full p-1 -ml-1"
          aria-label="Ordron home"
        >
          <Wordmark priority />
        </Link>

        <div className="hidden flex-1 md:flex">
          <MegaMenu />
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
