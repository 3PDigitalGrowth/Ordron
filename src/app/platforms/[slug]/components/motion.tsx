"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveal
 *
 * Subtle scroll-triggered reveal used across the platform hub. Respects
 * prefers-reduced-motion by falling back to a plain wrapper.
 */
export function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
  as = "div",
  once = true,
  amount = 0.35,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
  once?: boolean;
  amount?: number;
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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
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
