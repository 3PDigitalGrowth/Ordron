import type { Platform } from "@/lib/platforms";

type Props = {
  focus: Platform["focus"];
  size?: number;
  className?: string;
};

/**
 * PlatformGroupGlyph
 *
 * Abstract glyph per platform focus group (accounting, ERP, capture,
 * expense, ops, reporting). Used in the platform filter pills on the
 * `/guide/automations` hub so each platform has a visual anchor without
 * pulling in vendor logos.
 */
export function PlatformGroupGlyph({ focus, size = 18, className }: Props) {
  const Glyph = GLYPHS[focus];
  return <Glyph size={size} className={className} />;
}

type GlyphProps = { size: number; className?: string };

function base({ size, className }: GlyphProps) {
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

function Accounting(props: GlyphProps) {
  // Ledger book spine
  return (
    <svg {...base(props)}>
      <path d="M4 4h10a2 2 0 0 1 2 2v10H6a2 2 0 0 1-2-2V4z" />
      <path d="M4 14h10" />
      <path d="M7 4v10" />
    </svg>
  );
}

function Erp(props: GlyphProps) {
  // Stacked layers
  return (
    <svg {...base(props)}>
      <path d="M10 3 3 6.5 10 10l7-3.5L10 3z" />
      <path d="M3 10.5 10 14l7-3.5" />
      <path d="M3 14 10 17.5 17 14" />
    </svg>
  );
}

function Capture(props: GlyphProps) {
  // Scanner / document with beam
  return (
    <svg {...base(props)}>
      <rect x="4" y="3" width="12" height="14" rx="1.5" />
      <path d="M4 9h12" />
      <path d="M7 6h4" />
      <path d="M7 12h6" />
      <path d="M7 15h4" />
    </svg>
  );
}

function Expense(props: GlyphProps) {
  // Card / wallet
  return (
    <svg {...base(props)}>
      <rect x="3" y="6" width="14" height="10" rx="1.5" />
      <path d="M3 10h14" />
      <path d="M13 13h2" />
    </svg>
  );
}

function Ops(props: GlyphProps) {
  // Settings / node graph
  return (
    <svg {...base(props)}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="14" cy="14" r="2" />
      <circle cx="14" cy="6" r="2" />
      <path d="M8 6h4" />
      <path d="M14 8v4" />
      <path d="M7.4 7.4 12.6 12.6" />
    </svg>
  );
}

function Reporting(props: GlyphProps) {
  // Line chart with dot
  return (
    <svg {...base(props)}>
      <path d="M3 16V4" />
      <path d="M3 16h14" />
      <path d="m6 13 3-4 3 2 4-5" />
      <circle cx="16" cy="6" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

const GLYPHS: Record<Platform["focus"], (p: GlyphProps) => React.ReactElement> = {
  accounting: Accounting,
  erp: Erp,
  capture: Capture,
  expense: Expense,
  ops: Ops,
  reporting: Reporting,
};
