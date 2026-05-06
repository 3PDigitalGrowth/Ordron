"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  isDropdownActive,
  isFlatActive,
  navDropdowns,
  navFlatLinks,
  type DropdownKey,
} from "./nav-config";
import { MegaMenuDropdown } from "./MegaMenuDropdown";
import { NavPrimaryCta, NavSecondaryCta } from "./nav-ctas";

const HOVER_CLOSE_DELAY_MS = 120;

export function MegaMenu() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const [openKey, setOpenKey] = useState<DropdownKey | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Record<DropdownKey, HTMLDivElement | null>>({
    solutions: null,
    platforms: null,
    results: null,
    insights: null,
  });
  const triggerRefs = useRef<Record<DropdownKey, HTMLButtonElement | null>>({
    solutions: null,
    platforms: null,
    results: null,
    insights: null,
  });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const baseId = useId();

  const panelIdFor = useCallback(
    (key: DropdownKey) => `${baseId}-panel-${key}`,
    [baseId],
  );

  const triggerIdFor = useCallback(
    (key: DropdownKey) => `${baseId}-trigger-${key}`,
    [baseId],
  );

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const close = useCallback(() => {
    clearCloseTimer();
    setOpenKey(null);
  }, [clearCloseTimer]);

  const open = useCallback(
    (key: DropdownKey) => {
      clearCloseTimer();
      setOpenKey(key);
    },
    [clearCloseTimer],
  );

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      setOpenKey(null);
    }, HOVER_CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  // Escape key closes and returns focus to the active trigger.
  useEffect(() => {
    if (!openKey) return;
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        const trigger = triggerRefs.current[openKey!];
        close();
        trigger?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openKey, close]);

  // Outside click closes.
  useEffect(() => {
    if (!openKey) return;
    function onPointerDown(event: MouseEvent) {
      const root = rootRef.current;
      if (!root) return;
      if (!root.contains(event.target as Node)) {
        close();
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [openKey, close]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  // Close the panel when the route changes (user navigates).
  useEffect(() => {
    setOpenKey(null);
  }, [pathname]);

  const activeFlags = useMemo(
    () => ({
      solutions: isDropdownActive("solutions", pathname),
      platforms: isDropdownActive("platforms", pathname),
      results: isDropdownActive("results", pathname),
      insights: isDropdownActive("insights", pathname),
    }),
    [pathname],
  );

  function handleTriggerKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    key: DropdownKey,
  ) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      open(key);
      requestAnimationFrame(() => {
        const panel = panelRefs.current[key];
        const firstLink = panel?.querySelector<HTMLAnchorElement>(
          'a[role="menuitem"]',
        );
        firstLink?.focus();
      });
    } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      const keys: DropdownKey[] = [
        "solutions",
        "platforms",
        "results",
        "insights",
      ];
      const idx = keys.indexOf(key);
      const nextIdx =
        event.key === "ArrowRight"
          ? (idx + 1) % keys.length
          : (idx - 1 + keys.length) % keys.length;
      triggerRefs.current[keys[nextIdx]]?.focus();
    }
  }

  function handlePanelKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!openKey) return;
    const panel = panelRefs.current[openKey];
    if (!panel) return;
    const items = Array.from(
      panel.querySelectorAll<HTMLAnchorElement>('a[role="menuitem"]'),
    );
    if (items.length === 0) return;

    const activeIdx = items.indexOf(document.activeElement as HTMLAnchorElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIdx = activeIdx < 0 ? 0 : (activeIdx + 1) % items.length;
      items[nextIdx]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIdx = activeIdx <= 0 ? items.length - 1 : activeIdx - 1;
      items[nextIdx]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      items[items.length - 1]?.focus();
    } else if (event.key === "Tab") {
      // Keep focus inside the panel while it is open.
      if (event.shiftKey && activeIdx === 0) {
        event.preventDefault();
        items[items.length - 1]?.focus();
      } else if (!event.shiftKey && activeIdx === items.length - 1) {
        event.preventDefault();
        items[0]?.focus();
      }
    }
  }

  const dropdownKeys: DropdownKey[] = [
    "solutions",
    "platforms",
    "results",
    "insights",
  ];

  return (
    <div
      ref={rootRef}
      className="flex flex-1 items-center justify-end gap-8"
      onMouseLeave={scheduleClose}
      onMouseEnter={clearCloseTimer}
      onKeyDown={handlePanelKeyDown}
    >
      <nav aria-label="Primary" className="flex items-center gap-6">
        {/* Home link (first flat link) */}
        <FlatNavLink
          label={navFlatLinks[0].label}
          href={navFlatLinks[0].href}
          active={isFlatActive(navFlatLinks[0], pathname)}
          reduceMotion={!!reduceMotion}
          onFocus={close}
        />

        {/* Dropdown triggers */}
        {dropdownKeys.map((key) => {
          const def = navDropdowns[key];
          const isOpen = openKey === key;
          const active = activeFlags[key];
          const triggerId = triggerIdFor(key);
          return (
            <div
              key={key}
              className="relative"
              onMouseEnter={() => open(key)}
              onMouseLeave={scheduleClose}
            >
              <button
                ref={(el) => {
                  triggerRefs.current[key] = el;
                }}
                id={triggerId}
                type="button"
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-controls={panelIdFor(key)}
                onClick={() => (isOpen ? close() : open(key))}
                onFocus={() => open(key)}
                onKeyDown={(event) => handleTriggerKeyDown(event, key)}
                className={cn(
                  "relative inline-flex items-center gap-1 py-1 text-[15px] font-medium transition-colors duration-150",
                  isOpen || active
                    ? "text-ink"
                    : "text-ink-soft hover:text-ink",
                )}
              >
                <span>{def.label}</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 10 6"
                  className={cn(
                    "h-1.5 w-2.5 transition-transform duration-150",
                    isOpen && "rotate-180",
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
                {(isOpen || active) && (
                  <motion.span
                    layoutId="navUnderline"
                    aria-hidden="true"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 500, damping: 40 }
                    }
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-teal"
                  />
                )}
              </button>
            </div>
          );
        })}

        {/* Remaining flat links (About) */}
        {navFlatLinks.slice(1).map((link) => (
          <FlatNavLink
            key={link.label}
            label={link.label}
            href={link.href}
            active={isFlatActive(link, pathname)}
            reduceMotion={!!reduceMotion}
            onFocus={close}
          />
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <NavSecondaryCta />
        <NavPrimaryCta />
      </div>

      {dropdownKeys.map((key) => (
        <MegaMenuDropdown
          key={`panel-${key}`}
          ref={(el) => {
            panelRefs.current[key] = el;
          }}
          def={navDropdowns[key]}
          panelId={panelIdFor(key)}
          triggerId={triggerIdFor(key)}
          open={openKey === key}
          onNavigate={close}
        />
      ))}
    </div>
  );
}

type FlatNavLinkProps = {
  label: string;
  href: string;
  active: boolean;
  reduceMotion: boolean;
  onFocus?: () => void;
};

function FlatNavLink({
  label,
  href,
  active,
  reduceMotion,
  onFocus,
}: FlatNavLinkProps) {
  return (
    <div className="relative">
      <Link
        href={href}
        onFocus={onFocus}
        className={cn(
          "inline-flex py-1 text-[15px] font-medium transition-colors duration-150",
          active ? "text-ink" : "text-ink-soft hover:text-ink",
        )}
      >
        {label}
      </Link>
      {active && (
        <motion.span
          layoutId="navUnderline"
          aria-hidden="true"
          transition={
            reduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 500, damping: 40 }
          }
          className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-teal"
        />
      )}
    </div>
  );
}
