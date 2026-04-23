import Link from "next/link";
import type { Guide } from "@/data/guides";

type Props = {
  guide: Guide;
};

/**
 * Home > Guides > [Guide title]
 * Visual breadcrumb only. The matching JSON-LD BreadcrumbList is
 * emitted from the page route alongside the Article schema.
 */
export function GuideBreadcrumb({ guide }: Props) {
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
            href="/guides"
            className="hover:text-[color:var(--ordron-blue)]"
          >
            Guides
          </Link>
        </li>
        <li aria-hidden className="text-ink-faint">
          /
        </li>
        <li className="text-ink">{guide.category}</li>
      </ol>
    </nav>
  );
}
