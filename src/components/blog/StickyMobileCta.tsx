import Link from "next/link";
import { ctaSlots } from "./cta-config";

/**
 * Sticky mobile bar pinned to the bottom on viewports under `lg`.
 * Always renders the primary slot for consistency with the bottom
 * CTA band and the inline blog CTAs.
 */
export function StickyMobileCta() {
  const primary = ctaSlots.primary;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-surface/85 lg:hidden"
      role="region"
      aria-label="Conversion shortcut"
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-3">
        <p className="text-[13px] font-medium leading-snug text-ink">
          {primary.headline}
          <span className="block text-[11.5px] font-normal text-ink-muted">
            {primary.body}
          </span>
        </p>
        <Link
          href={primary.href}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-teal px-4 text-[13.5px] font-medium text-white transition-colors hover:bg-teal/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        >
          {primary.buttonLabel}
        </Link>
      </div>
    </div>
  );
}
