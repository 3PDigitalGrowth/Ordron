import Link from "next/link";
import type { LeadMagnetCard } from "./nav-config";

type Props = {
  card: LeadMagnetCard;
  onNavigate?: () => void;
};

export function MegaMenuLeadMagnet({ card, onNavigate }: Props) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-line bg-surface p-5 shadow-soft">
      <span className="inline-flex w-fit items-center rounded-full bg-teal/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-teal">
        {card.tag}
      </span>
      <h3 className="mt-3 font-display text-[17px] font-semibold leading-snug text-ink">
        {card.heading}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">
        {card.description}
      </p>
      <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-faint">
        {card.meta}
      </p>
      <Link
        href={card.ctaHref}
        onClick={onNavigate}
        role="menuitem"
        className="mt-auto inline-flex h-10 items-center justify-center rounded-full border border-teal/70 px-4 text-[13px] font-medium text-teal transition-colors duration-150 hover:bg-teal hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
      >
        {card.ctaLabel}
      </Link>
    </div>
  );
}
