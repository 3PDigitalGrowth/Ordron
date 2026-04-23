import type { FinanceFunction } from "@/lib/automations";

type IconProps = {
  className?: string;
  size?: number;
};

/**
 * FinanceFunctionIcon
 *
 * Minimal line icons, one per finance function in `src/lib/automations.ts`.
 * Drawn on a 20x20 viewBox, stroked in `currentColor` so the caller
 * controls colour via Tailwind text utilities.
 */
export function FinanceFunctionIcon({
  id,
  className,
  size = 18,
}: IconProps & { id: FinanceFunction }) {
  const Icon = ICON_MAP[id];
  return <Icon className={className} size={size} />;
}

function baseProps(size: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };
}

function ApIcon({ className, size = 18 }: IconProps) {
  // Document with a down-arrow: bill into the ledger
  return (
    <svg {...baseProps(size, className)}>
      <path d="M5 3h7l3 3v11H5z" />
      <path d="M12 3v3h3" />
      <path d="M10 9v5m0 0-2-2m2 2 2-2" />
    </svg>
  );
}

function ArIcon({ className, size = 18 }: IconProps) {
  // Outgoing invoice with an up-arrow
  return (
    <svg {...baseProps(size, className)}>
      <path d="M5 3h7l3 3v11H5z" />
      <path d="M12 3v3h3" />
      <path d="M10 14V9m0 0-2 2m2-2 2 2" />
    </svg>
  );
}

function ReconciliationIcon({ className, size = 18 }: IconProps) {
  // Two horizontal flows meeting: match
  return (
    <svg {...baseProps(size, className)}>
      <path d="M3 7h8l2 2-2 2" />
      <path d="M17 13H9l-2-2 2-2" />
    </svg>
  );
}

function CloseIcon({ className, size = 18 }: IconProps) {
  // Calendar with a tick: month-end close
  return (
    <svg {...baseProps(size, className)}>
      <rect x="3" y="4" width="14" height="13" rx="1.5" />
      <path d="M3 8h14" />
      <path d="M7 3v3M13 3v3" />
      <path d="m7.5 12 2 2L13 11" />
    </svg>
  );
}

function ReportingIcon({ className, size = 18 }: IconProps) {
  // Bar chart
  return (
    <svg {...baseProps(size, className)}>
      <path d="M3 17h14" />
      <path d="M6 14V9" />
      <path d="M10 14V5" />
      <path d="M14 14v-6" />
    </svg>
  );
}

function ExpensesIcon({ className, size = 18 }: IconProps) {
  // Receipt with a zig-zag bottom
  return (
    <svg {...baseProps(size, className)}>
      <path d="M5 3h10v14l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5V3z" />
      <path d="M8 7h4M8 10h4" />
    </svg>
  );
}

function ExceptionsIcon({ className, size = 18 }: IconProps) {
  // Alert triangle
  return (
    <svg {...baseProps(size, className)}>
      <path d="m10 3 8 14H2z" />
      <path d="M10 9v3" />
      <circle cx="10" cy="14.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PaymentsIcon({ className, size = 18 }: IconProps) {
  // Bank / building
  return (
    <svg {...baseProps(size, className)}>
      <path d="M3 8 10 4l7 4" />
      <path d="M4 8v7m4-7v7m4-7v7m4-7v7" />
      <path d="M3 17h14" />
    </svg>
  );
}

function SyncIcon({ className, size = 18 }: IconProps) {
  // Circular two-arrow sync
  return (
    <svg {...baseProps(size, className)}>
      <path d="M4 10a6 6 0 0 1 10-4.5L16 7" />
      <path d="M16 3v4h-4" />
      <path d="M16 10a6 6 0 0 1-10 4.5L4 13" />
      <path d="M4 17v-4h4" />
    </svg>
  );
}

function InboxIcon({ className, size = 18 }: IconProps) {
  // Envelope with a tray line
  return (
    <svg {...baseProps(size, className)}>
      <rect x="3" y="5" width="14" height="11" rx="1.5" />
      <path d="m3 7 7 5 7-5" />
    </svg>
  );
}

const ICON_MAP: Record<
  FinanceFunction,
  (props: IconProps) => React.ReactElement
> = {
  ap: ApIcon,
  ar: ArIcon,
  reconciliation: ReconciliationIcon,
  close: CloseIcon,
  reporting: ReportingIcon,
  expenses: ExpensesIcon,
  exceptions: ExceptionsIcon,
  payments: PaymentsIcon,
  sync: SyncIcon,
  inbox: InboxIcon,
};
