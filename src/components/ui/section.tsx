import { cn } from "@/lib/utils";
import type { ElementType, HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  tone?: "surface" | "surface-2" | "surface-3" | "ink" | "mint";
  size?: "sm" | "md" | "lg";
};

const tones: Record<NonNullable<SectionProps["tone"]>, string> = {
  surface: "bg-surface text-ink",
  "surface-2": "bg-surface-2 text-ink",
  "surface-3": "bg-surface-3 text-ink",
  ink: "bg-surface-ink text-white",
  mint: "bg-mint text-ink",
};

const sizes: Record<NonNullable<SectionProps["size"]>, string> = {
  sm: "py-16 sm:py-20",
  md: "py-20 sm:py-28",
  lg: "py-28 sm:py-36",
};

export function Section({
  as: Tag = "section",
  tone = "surface",
  size = "md",
  className,
  ...rest
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "relative w-full overflow-hidden",
        tones[tone],
        sizes[size],
        className,
      )}
      {...rest}
    />
  );
}
