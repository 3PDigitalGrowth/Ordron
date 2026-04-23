"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useHealthCheckDialog } from "./health-check-dialog";

/*
  Drop-in replacement for the old <Button href="/health-check"> usage.

  Kept visually identical to the shared Button primitive so nothing in
  the page design shifts; it just becomes a <button> that opens the
  booking dialog instead of a link to a route that doesn't exist.
*/

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "md" | "lg";

type HealthCheckButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  source?: string;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold tracking-tight transition-all duration-200 " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand disabled:opacity-50 disabled:pointer-events-none " +
  "whitespace-nowrap";

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base min-h-[52px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[#00ABFF] text-white shadow-ink " +
    "hover:bg-[#0096e0] hover:-translate-y-px active:translate-y-0",
  secondary:
    "bg-ink text-white " +
    "hover:bg-[#11293b] hover:-translate-y-px active:translate-y-0",
  ghost:
    "bg-transparent text-ink border border-ink/10 " +
    "hover:bg-ink/5 hover:border-ink/20",
  inverse:
    "bg-white text-ink " +
    "hover:bg-white/90 hover:-translate-y-px active:translate-y-0",
};

export function HealthCheckButton({
  children = "Book your Roadmap",
  variant = "primary",
  size = "md",
  source,
  className,
  onClick,
  type,
  ...rest
}: HealthCheckButtonProps) {
  const { open } = useHealthCheckDialog();

  return (
    <button
      type={type ?? "button"}
      className={cn(base, sizes[size], variants[variant], className)}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) open(source);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
