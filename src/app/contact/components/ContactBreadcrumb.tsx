import Link from "next/link";

/**
 * Home > Contact. Visual breadcrumb only, the matching BreadcrumbList
 * JSON-LD is emitted from the page route.
 */
export function ContactBreadcrumb() {
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
        <li className="text-ink">Contact</li>
      </ol>
    </nav>
  );
}
