"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { FinanceFunctionIcon } from "@/components/art/finance-function-icons";
import { PlatformGroupGlyph } from "@/components/art/platform-group-glyph";
import {
  type Automation,
  type FinanceFunction,
  automations as allAutomations,
  financeFunctions,
} from "@/lib/automations";
import { platforms as allPlatforms } from "@/lib/platforms";

type PlatformFilter = "all" | string;
type FunctionFilter = "all" | FinanceFunction;

type Props = {
  /** Optional default platform slug to preselect. */
  initialPlatform?: PlatformFilter;
  /** Optional default function to preselect. */
  initialFunction?: FunctionFilter;
};

/**
 * AutomationExplorer
 *
 * The interactive index for `/guide/automations`. Three filters:
 *   1. Free-text search against title + summary.
 *   2. Platform pill (13 platforms + "All platforms").
 *   3. Finance function pill (10 functions + "All functions").
 *
 * 130 rows is small enough that filtering runs synchronously in a
 * single `useMemo` pass; we intentionally do not pull in a search
 * library at this scale.
 */
export function AutomationExplorer({
  initialPlatform = "all",
  initialFunction = "all",
}: Props) {
  const [query, setQuery] = useState("");
  const [platformFilter, setPlatformFilter] =
    useState<PlatformFilter>(initialPlatform);
  const [functionFilter, setFunctionFilter] =
    useState<FunctionFilter>(initialFunction);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allAutomations.filter((a) => {
      if (platformFilter !== "all" && a.platformSlug !== platformFilter) {
        return false;
      }
      if (functionFilter !== "all" && a.function !== functionFilter) {
        return false;
      }
      if (q.length > 0) {
        const haystack = `${a.title} ${a.summary}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, platformFilter, functionFilter]);

  const platformCounts = useMemo(() => {
    const map: Record<string, number> = { all: allAutomations.length };
    for (const p of allPlatforms) {
      map[p.slug] = allAutomations.filter((a) => a.platformSlug === p.slug).length;
    }
    return map;
  }, []);

  const functionCounts = useMemo(() => {
    const map: Record<string, number> = { all: allAutomations.length };
    for (const f of financeFunctions) {
      map[f.id] = allAutomations.filter((a) => a.function === f.id).length;
    }
    return map;
  }, []);

  const hasFilters =
    query.trim().length > 0 ||
    platformFilter !== "all" ||
    functionFilter !== "all";

  const resetAll = () => {
    setQuery("");
    setPlatformFilter("all");
    setFunctionFilter("all");
  };

  return (
    <div className="space-y-10">
      {/* Search + reset row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block flex-1">
          <span className="sr-only">Search automations</span>
          <SearchGlyph className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="search"
            role="searchbox"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 130 automations by keyword, e.g. reconciliation, approval, payroll"
            className="w-full rounded-full border border-line bg-surface py-3.5 pl-11 pr-4 text-[15px] text-ink shadow-soft transition-colors placeholder:text-ink-muted focus:border-[color:var(--ordron-blue)]/40 focus:outline-none"
          />
        </label>
        <button
          type="button"
          onClick={resetAll}
          disabled={!hasFilters}
          className={cn(
            "rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors",
            hasFilters
              ? "border-line bg-surface text-ink-soft hover:text-ink"
              : "cursor-not-allowed border-line-soft bg-surface-2 text-ink-muted",
          )}
        >
          Reset filters
        </button>
      </div>

      {/* Platform filter */}
      <fieldset aria-label="Filter by platform">
        <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
          By platform
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          <FilterPill
            selected={platformFilter === "all"}
            onClick={() => setPlatformFilter("all")}
            count={platformCounts.all}
          >
            All platforms
          </FilterPill>
          {allPlatforms.map((p) => (
            <FilterPill
              key={p.slug}
              selected={platformFilter === p.slug}
              onClick={() => setPlatformFilter(p.slug)}
              count={platformCounts[p.slug] ?? 0}
              icon={<PlatformGroupGlyph focus={p.focus} size={14} />}
            >
              {p.shortLabel}
            </FilterPill>
          ))}
        </div>
      </fieldset>

      {/* Function filter */}
      <fieldset aria-label="Filter by finance function">
        <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
          By finance function
        </legend>
        <div className="mt-4 flex flex-wrap gap-2">
          <FilterPill
            selected={functionFilter === "all"}
            onClick={() => setFunctionFilter("all")}
            count={functionCounts.all}
          >
            All functions
          </FilterPill>
          {financeFunctions.map((f) => (
            <FilterPill
              key={f.id}
              selected={functionFilter === f.id}
              onClick={() => setFunctionFilter(f.id)}
              count={functionCounts[f.id] ?? 0}
              icon={<FinanceFunctionIcon id={f.id} size={14} />}
            >
              {f.label}
            </FilterPill>
          ))}
        </div>
      </fieldset>

      {/* Result count */}
      <div
        className="flex items-baseline justify-between border-t border-line pt-6"
        aria-live="polite"
      >
        <p className="text-sm text-ink-soft">
          Showing{" "}
          <span className="font-display font-semibold text-ink numeric">
            {filtered.length}
          </span>{" "}
          of{" "}
          <span className="font-display font-semibold text-ink numeric">
            {allAutomations.length}
          </span>{" "}
          automations.
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={resetAll}
            className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ordron-blue)] hover:text-[color:var(--ordron-blue-deep)]"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results grid */}
      {filtered.length === 0 ? (
        <EmptyState onReset={resetAll} />
      ) : (
        <ul className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <li key={a.id} className="h-full">
              <AutomationCard automation={a} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

type PillProps = {
  selected: boolean;
  onClick: () => void;
  count: number;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

function FilterPill({ selected, onClick, count, icon, children }: PillProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-all",
        selected
          ? "border-[color:var(--ordron-blue)] bg-[color:var(--ordron-blue)]/10 text-[color:var(--ordron-blue-deep)]"
          : "border-line bg-surface text-ink-soft hover:border-[color:var(--ordron-blue)]/30 hover:text-ink",
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[11px] font-semibold numeric",
          selected
            ? "bg-[color:var(--ordron-blue)]/15 text-[color:var(--ordron-blue-deep)]"
            : "bg-surface-2 text-ink-muted",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function AutomationCard({ automation }: { automation: Automation }) {
  const platform = allPlatforms.find((p) => p.slug === automation.platformSlug);
  const fn = financeFunctions.find((f) => f.id === automation.function);

  return (
    <Link
      href={automation.detailHref}
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:shadow-soft"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--ordron-blue-deep)]">
          {platform?.shortLabel ?? automation.platformSlug}
        </span>
        {fn && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
            <FinanceFunctionIcon id={fn.id} size={14} />
            {fn.label}
          </span>
        )}
      </div>

      <h4 className="mt-4 font-display text-[17px] font-semibold leading-snug text-ink">
        {automation.title}
      </h4>

      <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
        {automation.summary}
      </p>

      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Hours returned / week
          </p>
          <p className="mt-1 font-display text-lg font-semibold tracking-tight text-ink numeric">
            {automation.hoursBand}
          </p>
        </div>
        <span
          aria-hidden
          className="text-ink-faint transition-colors group-hover:text-[color:var(--ordron-blue)]"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 10h12m0 0-5-5m5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-3xl border border-line bg-surface-2 p-10 text-center">
      <p className="font-display text-xl font-semibold text-ink">
        Nothing matches those filters.
      </p>
      <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-ink-soft">
        Try a broader search term, drop the function filter, or ask us directly.
        If the workflow is not in the catalogue, it usually means we have not
        shipped it yet, not that it cannot be done.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
      >
        Reset the filters
      </button>
    </div>
  );
}

function SearchGlyph({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden
    >
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m13.5 13.5 3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
