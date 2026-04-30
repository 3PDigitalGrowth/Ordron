"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type FaqGridItem = {
  question: string;
  answer: string;
  /**
   * Short teaser shown under the question in the collapsed state. Falls back to
   * the first sentence (or first ~160 characters) of `answer` when omitted.
   */
  preview?: string;
};

type Accent = "blue" | "teal";

type Props = {
  items: readonly FaqGridItem[];
  /**
   * Accent colour for the expanded card border, toggle link, and icon.
   * Defaults to the Ordron blue used on the homepage and product pages.
   */
  accent?: Accent;
  className?: string;
};

/**
 * Shared three-column FAQ grid used across the site.
 *
 * Cards collapse to a question + short preview with a toggle that expands the
 * full answer in place. `items-start` keeps collapsed cards compact so one
 * expanded card does not force its row-mates to stretch.
 */
export function FaqGrid({ items, accent = "blue", className }: Props) {
  return (
    <div
      className={cn(
        "grid items-start gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <FaqCard key={item.question} item={item} accent={accent} />
      ))}
    </div>
  );
}

const ACCENT_VAR: Record<Accent, string> = {
  blue: "--ordron-blue",
  teal: "--ordron-teal",
};

function buildPreview(answer: string, explicit?: string): string {
  if (explicit && explicit.trim().length > 0) return explicit.trim();
  const sentences = answer
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (sentences.length === 0) return answer;
  const first = sentences[0];
  if (first.length >= 140) return first;
  const two = `${first} ${sentences[1] ?? ""}`.trim();
  return two.length <= 200 ? two : first;
}

function FaqCard({ item, accent }: { item: FaqGridItem; accent: Accent }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const preview = buildPreview(item.answer, item.preview);
  const accentVar = ACCENT_VAR[accent];

  return (
    <article
      className={cn(
        "group relative flex flex-col rounded-2xl border bg-surface p-6 transition-all duration-300",
        open
          ? "border-[color:var(--accent)]/45 shadow-soft"
          : "border-line hover:border-[color:var(--accent)]/25",
      )}
      style={{ ["--accent" as string]: `var(${accentVar})` }}
    >
      <h3 className="font-display text-[17px] font-semibold leading-snug tracking-tight text-ink sm:text-[17.5px]">
        {item.question}
      </h3>

      <p
        className={cn(
          "mt-3 text-[14.5px] leading-relaxed text-ink-soft",
          !open && "line-clamp-3",
        )}
      >
        {preview}
      </p>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="full"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={reduce ? {} : { height: "auto", opacity: 1 }}
            exit={reduce ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-3 border-t border-line pt-3 text-[14.5px] leading-relaxed text-ink-soft">
              {item.answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "mt-4 inline-flex items-center gap-1.5 self-start rounded-sm text-sm font-semibold tracking-tight",
          "text-[color:var(--accent)] outline-offset-4",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--accent)]",
          "transition-colors hover:text-[color:var(--accent)]/80",
        )}
      >
        <span>{open ? "Show less" : "Read full answer"}</span>
        <span
          aria-hidden
          className={cn(
            "inline-grid h-[18px] w-[18px] place-items-center rounded-full border border-current/40 transition-transform duration-300",
            open ? "rotate-45" : "",
          )}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M5 2v6M2 5h6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
    </article>
  );
}
