"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import type {
  AutomationCategory,
  PlatformAutomation,
  PlatformHub,
} from "@/data/platforms";
import { Reveal } from "./motion";

type Props = {
  platform: PlatformHub;
};

/** Map functional category to the cluster guide slug (if any). */
const CATEGORY_GUIDE: Record<AutomationCategory, string | null> = {
  "Accounts Payable": "ap-automation-australia",
  "Accounts Receivable": "ar-automation-australia",
  Reconciliations: "bank-reconciliation-automation",
  "Month-end close": "month-end-close-automation",
  Reporting: null,
  Operations: null,
};

const CATEGORY_ORDER: AutomationCategory[] = [
  "Accounts Payable",
  "Accounts Receivable",
  "Reconciliations",
  "Month-end close",
  "Reporting",
  "Operations",
];

export function PlatformAutomations({ platform }: Props) {
  const grouped = groupByCategory(platform.automations);

  return (
    <Section tone="surface-2" size="md" id="automations">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>What we&rsquo;ve shipped</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-balance">
              10 automations we&rsquo;ve built on {platform.name}.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              Grouped by where they sit in your finance month. Each one is a
              named build Ordron has shipped, not a capability slide. Tap a
              card to see what it actually does.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-14">
          {CATEGORY_ORDER.filter((c) => grouped[c]?.length).map((category) => {
            const items = grouped[category]!;
            const guideSlug = CATEGORY_GUIDE[category];
            return (
              <section key={category} aria-labelledby={`cat-${slugify(category)}`}>
                <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                  <h3
                    id={`cat-${slugify(category)}`}
                    className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl"
                  >
                    {category}
                  </h3>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted numeric tabular-nums">
                    {items.length} automation{items.length === 1 ? "" : "s"}
                  </span>
                </div>

                <ul className="mt-6 flex flex-col gap-3">
                  {items.map((a, idx) => (
                    <AutomationCard
                      key={`${category}-${idx}`}
                      automation={a}
                      guideSlug={guideSlug}
                      index={idx}
                    />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function AutomationCard({
  automation,
  guideSlug,
  index,
}: {
  automation: PlatformAutomation;
  guideSlug: string | null;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <Reveal as="li" delay={index * 0.04} amount={0.2}>
      <article
        className={`overflow-hidden rounded-2xl border bg-surface transition-all duration-300 ${
          open
            ? "border-[color:var(--ordron-blue)]/40 shadow-soft"
            : "border-line hover:border-[color:var(--ordron-blue)]/25"
        }`}
      >
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition-colors sm:px-7"
        >
          <div className="min-w-0 flex-1">
            <h4 className="font-display text-[17px] font-semibold tracking-tight text-ink sm:text-lg">
              {automation.title}
            </h4>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
              {automation.category}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden rounded-full bg-[color:var(--ordron-amber)]/15 px-3 py-1 text-xs font-semibold text-[color:#9B6A10] numeric tabular-nums sm:inline-flex">
              {automation.timeSaved}
            </span>
            <span
              aria-hidden
              className={`grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft transition-transform duration-300 ${
                open ? "rotate-180 bg-[color:var(--ordron-blue)]/10 text-[color:var(--ordron-blue)]" : ""
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 5l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={reduce ? {} : { height: "auto", opacity: 1 }}
              exit={reduce ? {} : { height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-line bg-surface-2 px-5 py-5 sm:px-7 sm:py-6">
                <p className="text-[15px] leading-relaxed text-ink-soft">
                  {automation.description}
                </p>
                <div className="mt-5 flex flex-col items-start gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--ordron-amber)]/15 px-3 py-1 text-xs font-semibold text-[color:#9B6A10] numeric tabular-nums sm:hidden">
                    {automation.timeSaved}
                  </span>
                  {guideSlug ? (
                    <Link
                      href={`/guides/${guideSlug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--ordron-blue-deep)] hover:underline"
                    >
                      Read more about {guideLabel(automation.category)}
                      <span aria-hidden>→</span>
                    </Link>
                  ) : (
                    <span className="text-xs text-ink-muted">
                      Built once, runs on your schedule.
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </Reveal>
  );
}

function groupByCategory(items: PlatformAutomation[]) {
  return items.reduce<Partial<Record<AutomationCategory, PlatformAutomation[]>>>(
    (acc, a) => {
      const bucket = acc[a.category] ?? [];
      bucket.push(a);
      acc[a.category] = bucket;
      return acc;
    },
    {},
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function guideLabel(c: AutomationCategory) {
  switch (c) {
    case "Accounts Payable":
      return "AP automation";
    case "Accounts Receivable":
      return "AR automation";
    case "Reconciliations":
      return "reconciliation automation";
    case "Month-end close":
      return "month-end close automation";
    default:
      return "related guides";
  }
}
