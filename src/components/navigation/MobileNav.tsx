"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  isDropdownActive,
  isFlatActive,
  navDropdowns,
  navFlatLinks,
  type DropdownKey,
} from "./nav-config";
import { NavPrimaryCta, NavSecondaryCta } from "./nav-ctas";

export function MobileNav() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [expandedKey, setExpandedKey] = useState<DropdownKey | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setExpandedKey(null);
  }, []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    if (!drawer) return;
    const firstFocusable = drawer.querySelector<HTMLElement>(
      "a, button:not([aria-hidden='true'])",
    );
    firstFocusable?.focus();
  }, [open]);

  return (
    <div className="flex items-center lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
      >
        <HamburgerIcon open={open} reduceMotion={!!reduceMotion} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-drawer"
            id="mobile-nav-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
            className="fixed left-0 right-0 top-[72px] z-40 max-h-[calc(100dvh-72px)] overflow-y-auto border-b border-line-soft bg-surface shadow-soft"
          >
            <div className="flex flex-col gap-2 px-5 py-4">
              <nav
                aria-label="Primary mobile"
                className="flex flex-col divide-y divide-line-soft"
              >
                {/* Home */}
                <MobileFlatLink
                  link={navFlatLinks[0]}
                  active={isFlatActive(navFlatLinks[0], pathname)}
                  onNavigate={close}
                />

                {/* Dropdown accordions */}
                {(Object.keys(navDropdowns) as DropdownKey[]).map((key) => (
                  <MobileAccordion
                    key={key}
                    dropdownKey={key}
                    expanded={expandedKey === key}
                    active={isDropdownActive(key, pathname)}
                    onToggle={() =>
                      setExpandedKey((prev) => (prev === key ? null : key))
                    }
                    reduceMotion={!!reduceMotion}
                    onNavigate={close}
                  />
                ))}

                {/* Remaining flat links (About) */}
                {navFlatLinks.slice(1).map((link) => (
                  <MobileFlatLink
                    key={link.label}
                    link={link}
                    active={isFlatActive(link, pathname)}
                    onNavigate={close}
                  />
                ))}
              </nav>

              <div className="mt-4 flex flex-col gap-3 border-t border-line-soft pt-4">
                <NavPrimaryCta fullWidth onClick={close} />
                <NavSecondaryCta fullWidth onClick={close} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type MobileFlatLinkProps = {
  link: { label: string; href: string };
  active: boolean;
  onNavigate: () => void;
};

function MobileFlatLink({ link, active, onNavigate }: MobileFlatLinkProps) {
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className={cn(
        "flex min-h-[44px] items-center py-3 text-[16px] font-medium transition-colors",
        active ? "text-teal" : "text-ink hover:text-teal",
      )}
    >
      {link.label}
    </Link>
  );
}

type MobileAccordionProps = {
  dropdownKey: DropdownKey;
  expanded: boolean;
  active: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
  onNavigate: () => void;
};

function MobileAccordion({
  dropdownKey,
  expanded,
  active,
  onToggle,
  reduceMotion,
  onNavigate,
}: MobileAccordionProps) {
  const def = navDropdowns[dropdownKey];
  const panelId = `mobile-panel-${dropdownKey}`;

  return (
    <div>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          "flex min-h-[44px] w-full items-center justify-between py-3 text-[16px] font-medium transition-colors",
          active ? "text-teal" : "text-ink hover:text-teal",
        )}
      >
        <span>{def.label}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 10 6"
          className={cn(
            "h-2 w-3 text-ink-muted transition-transform duration-200",
            expanded && "rotate-180",
          )}
        >
          <path
            d="M1 1l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={panelId}
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={
              reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }
            }
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pb-3">
              {def.columns
                .filter((column) => !column.hiddenOnMobile)
                .map((column, ci) => (
                  <div key={`${column.title}-${ci}`} className="py-2">
                    <h3 className="px-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-teal">
                      {column.title}
                    </h3>
                    {column.kind === "links" ? (
                      <ul className="mt-1">
                        {column.links.map((link, li) => (
                          <li key={`${link.label}-${li}`}>
                            <Link
                              href={link.href}
                              onClick={onNavigate}
                              className="flex min-h-[44px] items-center px-1 py-2 text-[14px] text-ink/85 transition-colors hover:text-teal"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href={column.seeAll.href}
                            onClick={onNavigate}
                            className="mt-1 flex min-h-[44px] items-center border-t border-line-soft px-1 py-2 text-[13px] font-medium text-teal transition-colors hover:text-ink"
                          >
                            {column.seeAll.label}
                            <span aria-hidden="true" className="ml-1">
                              {"\u2192"}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    ) : (
                      <div className="mt-1 flex flex-col">
                        {column.cards.map((card, fi) => (
                          <Link
                            key={`${card.heading}-${fi}`}
                            href={card.href}
                            onClick={onNavigate}
                            className="group flex min-h-[44px] flex-col border-l-2 border-transparent px-2 py-2 transition-colors hover:border-teal/50"
                          >
                            <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                              {card.eyebrow}
                            </span>
                            <span className="text-[14px] font-semibold leading-snug text-ink">
                              {card.heading}
                            </span>
                            <span className="mt-0.5 text-[12.5px] italic leading-relaxed text-ink-soft">
                              {card.description}
                            </span>
                          </Link>
                        ))}
                        <Link
                          href={column.seeAll.href}
                          onClick={onNavigate}
                          className="mt-1 flex min-h-[44px] items-center border-t border-line-soft px-1 py-2 text-[13px] font-medium text-teal transition-colors hover:text-ink"
                        >
                          {column.seeAll.label}
                          <span aria-hidden="true" className="ml-1">
                            {"\u2192"}
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type HamburgerIconProps = {
  open: boolean;
  reduceMotion: boolean;
};

function HamburgerIcon({ open, reduceMotion }: HamburgerIconProps) {
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.2 };
  return (
    <span aria-hidden="true" className="relative block h-4 w-5">
      <motion.span
        className="absolute left-0 block h-[2px] w-full rounded-full bg-current"
        style={{ top: "2px" }}
        animate={open ? { top: "7px", rotate: 45 } : { top: "2px", rotate: 0 }}
        transition={transition}
      />
      <motion.span
        className="absolute left-0 block h-[2px] w-full rounded-full bg-current"
        style={{ top: "7px" }}
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={transition}
      />
      <motion.span
        className="absolute left-0 block h-[2px] w-full rounded-full bg-current"
        style={{ top: "12px" }}
        animate={
          open ? { top: "7px", rotate: -45 } : { top: "12px", rotate: 0 }
        }
        transition={transition}
      />
    </span>
  );
}
