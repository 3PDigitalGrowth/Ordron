import Image from "next/image";
import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  tone?: "ink" | "light";
  priority?: boolean;
};

/*
  Uses the supplied Ordron logo (public/brand/ordron-logo.png).
  For dark surfaces we invert to white using a CSS filter so the mark
  stays visible; a proper white-variant asset can replace this later.
*/

export function Wordmark({
  className,
  tone = "ink",
  priority,
}: WordmarkProps) {
  return (
    <span
      className={cn("inline-flex items-center", className)}
      aria-label="Ordron"
    >
      <Image
        src="/brand/ordron-logo.png"
        alt="Ordron"
        width={500}
        height={179}
        priority={priority}
        className={cn(
          "h-9 w-auto sm:h-10",
          tone === "light" && "brightness-0 invert",
        )}
      />
    </span>
  );
}
