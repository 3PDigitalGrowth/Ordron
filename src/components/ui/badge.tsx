import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "brand" | "teal" | "amber";
};

const tones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "bg-surface-3 text-ink border-line",
  brand: "bg-white text-brand-deep border-[color:var(--ordron-blue)]/20",
  teal: "bg-mint text-[color:var(--ordron-teal)] border-[color:var(--ordron-teal)]/20",
  amber:
    "bg-[#FFF6E6] text-[color:#9B6A10] border-[color:var(--ordron-amber)]/30",
};

export function Badge({
  className,
  tone = "neutral",
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-tight",
        tones[tone],
        className,
      )}
      {...rest}
    />
  );
}
