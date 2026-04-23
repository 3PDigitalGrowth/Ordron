import Link from "next/link";
import type { DropdownColumn } from "./nav-config";
import { MegaMenuFeaturedCard } from "./MegaMenuFeaturedCard";

type Props = {
  column: DropdownColumn;
  onNavigate?: () => void;
};

const columnHeader =
  "text-[11px] font-semibold uppercase tracking-[0.1em] text-teal";

const linkItem =
  "block py-1.5 text-[13px] font-normal text-ink/85 transition-colors duration-100 hover:text-teal focus-visible:text-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal rounded";

const seeAllItem =
  "mt-auto block border-t border-line-soft pt-3 text-[12px] font-medium text-teal transition-colors duration-100 hover:text-ink focus-visible:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal rounded";

export function MegaMenuColumn({ column, onNavigate }: Props) {
  return (
    <div className="flex h-full flex-col">
      <h3 className={columnHeader}>{column.title}</h3>

      {column.kind === "links" ? (
        <ul role="none" className="mt-3 space-y-0.5">
          {column.links.map((link, i) => (
            <li key={`${link.label}-${i}`} role="none">
              <Link
                href={link.href}
                role="menuitem"
                onClick={onNavigate}
                className={linkItem}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div role="none" className="mt-3 flex flex-col gap-3">
          {column.cards.map((card, i) => (
            <MegaMenuFeaturedCard
              key={`${card.heading}-${i}`}
              card={card}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}

      <Link
        href={column.seeAll.href}
        role="menuitem"
        onClick={onNavigate}
        className={seeAllItem}
      >
        {column.seeAll.label}
        <span aria-hidden="true" className="ml-1">
          {"\u2192"}
        </span>
      </Link>
    </div>
  );
}
