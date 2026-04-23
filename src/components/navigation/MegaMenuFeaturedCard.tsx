import Link from "next/link";
import type { FeaturedCard } from "./nav-config";

type Props = {
  card: FeaturedCard;
  onNavigate?: () => void;
};

/**
 * Editorial entry used in column 3 of the Results dropdown.
 *
 * Deliberately visually distinct from both a flat link list and the
 * lead-magnet card: no border, no shadow, italicised blurb. Reads as
 * a "signature win" callout, not a navigational link.
 */
export function MegaMenuFeaturedCard({ card, onNavigate }: Props) {
  return (
    <Link
      href={card.href}
      role="menuitem"
      onClick={onNavigate}
      className="group -mx-2 flex flex-col rounded border-l-2 border-transparent px-2 py-1.5 transition-colors duration-150 hover:border-teal/50 focus-visible:border-teal/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
        {card.eyebrow}
      </span>
      <span className="mt-1 text-[14px] font-semibold leading-snug text-ink">
        {card.heading}
      </span>
      <span className="mt-1 text-[12.5px] italic leading-relaxed text-ink-soft">
        {card.description}
      </span>
      <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-teal transition-colors group-hover:text-ink">
        Read case study
        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-0.5"
        >
          {"\u2192"}
        </span>
      </span>
    </Link>
  );
}
