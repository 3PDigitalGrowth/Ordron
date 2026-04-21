import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type AsLinkProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type AsButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
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

export function Button(props: AsLinkProps | AsButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(base, sizes[size], variants[variant], className);

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AsLinkProps;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  const { ...buttonRest } = rest as AsButtonProps;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
