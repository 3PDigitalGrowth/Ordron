import Link from "next/link";
import { cn } from "@/lib/utils";
import { navCtas } from "./nav-config";

const primaryClass =
  "inline-flex items-center justify-center rounded-full bg-teal px-5 h-10 text-sm font-medium text-white transition-colors duration-150 hover:bg-teal/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

const secondaryClass =
  "inline-flex items-center justify-center rounded-full border border-teal/70 bg-transparent px-5 h-10 text-sm font-medium text-teal transition-colors duration-150 hover:bg-teal/10 hover:border-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal";

type CtaProps = {
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
};

export function NavPrimaryCta({ className, fullWidth, onClick }: CtaProps) {
  return (
    <Link
      href={navCtas.primary.href}
      onClick={onClick}
      className={cn(primaryClass, fullWidth && "w-full h-12 text-base", className)}
    >
      {navCtas.primary.label}
    </Link>
  );
}

export function NavSecondaryCta({ className, fullWidth, onClick }: CtaProps) {
  return (
    <Link
      href={navCtas.secondary.href}
      onClick={onClick}
      className={cn(secondaryClass, fullWidth && "w-full h-12 text-base", className)}
    >
      {navCtas.secondary.label}
    </Link>
  );
}
