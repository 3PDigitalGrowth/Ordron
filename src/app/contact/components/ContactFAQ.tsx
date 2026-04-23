"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

export type ContactFaq = {
  question: string;
  answer: string;
};

type Props = {
  faqs: readonly ContactFaq[];
};

/**
 * Mirrors the accordion pattern used on the cluster guide pages.
 * Takes a plain FAQ array so the page route can keep a single source
 * of truth that powers both this UI and the FAQPage JSON-LD.
 */
export function ContactFAQ({ faqs }: Props) {
  return (
    <Section id="faqs" tone="surface-2" size="md">
      <Container width="narrow">
        <div>
          <Reveal>
            <Eyebrow>Common questions</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl">
              Before you write
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[640px] text-pretty text-lg leading-relaxed text-ink-soft">
              The questions people actually ask on the first call,
              answered plainly.
            </p>
          </Reveal>
        </div>

        <ul className="mt-10 flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} as="li" delay={i * 0.04} amount={0.2}>
              <FaqCard faq={faq} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function FaqCard({ faq }: { faq: ContactFaq }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <article
      className={`overflow-hidden rounded-2xl border bg-surface transition-all duration-300 ${
        open
          ? "border-[color:var(--ordron-teal)]/40 shadow-soft"
          : "border-line hover:border-[color:var(--ordron-teal)]/25"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition-colors sm:px-7"
      >
        <h3 className="font-display text-[17px] font-semibold leading-snug tracking-tight text-ink sm:text-lg">
          {faq.question}
        </h3>
        <span
          aria-hidden
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition-transform duration-300 ${
            open
              ? "rotate-180 bg-[color:var(--ordron-teal)]/10 text-[color:var(--ordron-teal)]"
              : ""
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
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
