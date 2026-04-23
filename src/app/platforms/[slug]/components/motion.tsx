"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealTag = "div" | "section" | "li" | "article" | "header";

/**
 * Reveal
 *
 * Scroll-triggered reveal used across the platform hub. Uses an explicit
 * `useInView` ref (not `whileInView`) so we can add a hydration safety
 * fallback: if the IntersectionObserver somehow never reports the element
 * as visible (a known React 19 + framer-motion v12 edge case where last-in-
 * row cards end up stuck at opacity 0), a timer flips it to visible after
 * 600 ms so content is never permanently hidden.
 *
 * Respects `prefers-reduced-motion` by rendering a plain tag.
 */
export function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
  as = "div",
  once = true,
  amount = 0.15,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: RevealTag;
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<Element | null>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once,
    amount,
    margin: "0px 0px -40px 0px",
  });
  const [forceShown, setForceShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setForceShown(true), 600);
    return () => clearTimeout(t);
  }, []);

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const shown = inView || forceShown;
  // Framer's motion[as] narrows ref to the specific element type (e.g.
  // HTMLDivElement) per tag, but we need a single shared ref across all
  // supported tags. The motion component reliably accepts an Element ref
  // at runtime; the cast is purely to quiet the per-tag ref narrowing.
  const Component = motion[as] as unknown as React.ComponentType<
    HTMLMotionProps<"div">
  >;

  return (
    <Component
      {...{ ref: ref as unknown as React.Ref<HTMLDivElement> }}
      className={className}
      initial={{ opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

/**
 * FadeIn
 *
 * Immediate on-load fade+rise. Used in the hero where scroll-trigger
 * is not appropriate (content is above the fold).
 */
export function FadeIn({
  children,
  delay = 0,
  y = 18,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "h1" | "p";
}) {
  const reduce = useReducedMotion();
  const Component = motion[as] as (
    props: HTMLMotionProps<"div">,
  ) => React.ReactElement;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
