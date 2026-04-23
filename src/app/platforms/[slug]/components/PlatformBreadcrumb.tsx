import Link from "next/link";
import type { PlatformHub } from "@/data/platforms";

type Props = {
  platform: PlatformHub;
};

/**
 * Home > Platforms > [Platform name]
 * Visual breadcrumb only. The matching JSON-LD BreadcrumbList is
 * emitted from the page route alongside the Service schema.
 */
export function PlatformBreadcrumb({ platform }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
        <li>
          <Link href="/" className="hover:text-[color:var(--ordron-blue)]">
            Home
          </Link>
        </li>
        <li aria-hidden className="text-ink-faint">
          /
        </li>
        <li>
          <Link
            href="/platforms"
            className="hover:text-[color:var(--ordron-blue)]"
          >
            Platforms
          </Link>
        </li>
        <li aria-hidden className="text-ink-faint">
          /
        </li>
        <li className="text-ink">{platform.name}</li>
      </ol>
    </nav>
  );
}
