import Link from "next/link";

/**
 * Home > About
 * Visual breadcrumb only. The matching BreadcrumbList JSON-LD
 * is emitted from the page route alongside the Organization
 * and Person schemas.
 */
export function AboutBreadcrumb() {
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
        <li className="text-ink">About</li>
      </ol>
    </nav>
  );
}
