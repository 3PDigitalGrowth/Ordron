import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: "narrow" | "default" | "wide";
};

const widths: Record<NonNullable<ContainerProps["width"]>, string> = {
  narrow: "max-w-[960px]",
  default: "max-w-[1140px]",
  wide: "max-w-[1280px]",
};

export function Container({
  width = "default",
  className,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        widths[width],
        className,
      )}
      {...rest}
    />
  );
}
