import Image from "next/image";
import {
  siXero,
  siMyob,
  siQuickbooks,
  siSap,
} from "simple-icons";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

/*
 * Monochrome platform marks for the "Built for Australian finance teams"
 * strip. Renders at a uniform 24x24 viewBox in `currentColor` so the set
 * inherits the ink treatment of its parent (text-ink-faint → hover text-ink).
 *
 * Where a vendor's mark is shipped in the `simple-icons` catalogue we use
 * it verbatim. For platforms not in that catalogue (Microsoft products,
 * NetSuite, SAP Concur, Hubdoc, Dext, Ignition) we render restrained
 * custom glyphs that read as marks at this size rather than attempting to
 * reproduce each vendor's registered logomark. "Bank feeds" is a category
 * and is represented with a generic bank glyph.
 *
 * Trademarks referenced are the property of their respective owners.
 * The marks are used to identify the platforms Ordron automates for
 * Australian finance teams and do not imply endorsement.
 */

type SimpleIcon = { title: string; path: string };

function SimpleIconGlyph({ icon }: { icon: SimpleIcon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className="h-full w-auto"
    >
      <path d={icon.path} fill="currentColor" />
    </svg>
  );
}

function XeroMark() {
  return <SimpleIconGlyph icon={siXero as SimpleIcon} />;
}

function MyobMark() {
  return <SimpleIconGlyph icon={siMyob as SimpleIcon} />;
}

function QuickBooksMark() {
  return <SimpleIconGlyph icon={siQuickbooks as SimpleIcon} />;
}

function SapMark() {
  return <SimpleIconGlyph icon={siSap as SimpleIcon} />;
}

function GlyphFrame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className="h-full w-auto"
    >
      {children}
    </svg>
  );
}

function NetSuiteMark() {
  return (
    <GlyphFrame>
      <path
        fill="currentColor"
        d="M3.5 3h3.75l9.5 12V3H20.5v18h-3.75l-9.5-12v12H3.5z"
      />
    </GlyphFrame>
  );
}

function DynamicsMark() {
  return (
    <GlyphFrame>
      <path
        fill="currentColor"
        d="M4 2h7.25a8.75 8.75 0 0 1 0 17.5H4zm3.5 3.25v11H11a5.5 5.5 0 0 0 0-11z"
      />
      <circle cx="19.25" cy="19.25" r="2.25" fill="currentColor" />
    </GlyphFrame>
  );
}

function HubdocMark() {
  return (
    <Image
      src="/brand-logos/hubdoc.png"
      alt=""
      width={96}
      height={96}
      className="h-full w-auto opacity-60 grayscale transition-opacity duration-150 group-hover:opacity-100"
    />
  );
}

function DextMark() {
  return (
    <Image
      src="/brand-logos/dext.png"
      alt=""
      width={96}
      height={96}
      className="h-full w-auto opacity-60 grayscale transition-opacity duration-150 group-hover:opacity-100"
    />
  );
}

function ConcurMark() {
  return (
    <GlyphFrame>
      <path
        fill="currentColor"
        d="M12 2.5a9.5 9.5 0 1 0 9.45 10.5H18.3A6.3 6.3 0 1 1 12 5.7a6.25 6.25 0 0 1 5.2 2.8l2.6-1.9A9.45 9.45 0 0 0 12 2.5z"
      />
    </GlyphFrame>
  );
}

function ExcelMark() {
  return (
    <Image
      src="/brand-logos/excel.png"
      alt=""
      width={96}
      height={96}
      className="h-full w-auto opacity-60 grayscale transition-opacity duration-150 group-hover:opacity-100"
    />
  );
}

function OutlookMark() {
  return (
    <GlyphFrame>
      <rect
        x="2.5"
        y="5"
        width="19"
        height="14"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m3.5 6.5 8.5 7 8.5-7"
      />
    </GlyphFrame>
  );
}

function PowerBiMark() {
  return (
    <Image
      src="/brand-logos/power-bi.png"
      alt=""
      width={96}
      height={96}
      className="h-full w-auto opacity-60 grayscale transition-opacity duration-150 group-hover:opacity-100"
    />
  );
}

function IgnitionMark() {
  return (
    <Image
      src="/brand-logos/ignition.png"
      alt=""
      width={96}
      height={96}
      className="h-full w-auto opacity-60 grayscale transition-opacity duration-150 group-hover:opacity-100"
    />
  );
}

function BankMark() {
  return (
    <GlyphFrame>
      <path
        fill="currentColor"
        d="m12 2.5 10 5v1.75H2V7.5zm-8.5 8.5h2.5v8h-2.5zm5 0h2.5v8H8.5zm5 0h2.5v8H13.5zm5 0H21v8h-2.5zM2 21.5h20V23H2z"
      />
    </GlyphFrame>
  );
}

const LOGO_MAP: Record<
  string,
  { glyph: ComponentType; label: string; isRealMark: boolean }
> = {
  "xero-automation": { glyph: XeroMark, label: "Xero", isRealMark: true },
  "myob-automation": { glyph: MyobMark, label: "MYOB", isRealMark: true },
  "quickbooks-automation": {
    glyph: QuickBooksMark,
    label: "QuickBooks",
    isRealMark: true,
  },
  "sap-automation": { glyph: SapMark, label: "SAP", isRealMark: true },
  "netsuite-automation": {
    glyph: NetSuiteMark,
    label: "NetSuite",
    isRealMark: false,
  },
  "dynamics-automation": {
    glyph: DynamicsMark,
    label: "Dynamics 365",
    isRealMark: false,
  },
  "hubdoc-automation": {
    glyph: HubdocMark,
    label: "Hubdoc",
    isRealMark: false,
  },
  "dext-automation": { glyph: DextMark, label: "Dext", isRealMark: false },
  "concur-automation": {
    glyph: ConcurMark,
    label: "SAP Concur",
    isRealMark: false,
  },
  "excel-automation": { glyph: ExcelMark, label: "Excel", isRealMark: false },
  "bank-automation": {
    glyph: BankMark,
    label: "Bank feeds",
    isRealMark: false,
  },
  "outlook-automation": {
    glyph: OutlookMark,
    label: "Outlook",
    isRealMark: false,
  },
  "power-bi-automation": {
    glyph: PowerBiMark,
    label: "Power BI",
    isRealMark: false,
  },
  "ignition-automation": {
    glyph: IgnitionMark,
    label: "Ignition",
    isRealMark: false,
  },
};

type PlatformLogoProps = {
  slug: string;
  label?: string;
  className?: string;
};

export function PlatformLogo({ slug, label, className }: PlatformLogoProps) {
  const entry = LOGO_MAP[slug];
  if (!entry) return null;

  const Glyph = entry.glyph;
  const accessibleLabel = label ?? entry.label;

  return (
    <span
      role="img"
      aria-label={accessibleLabel}
      className={cn(
        "inline-flex h-6 items-center sm:h-7",
        className,
      )}
    >
      <Glyph />
    </span>
  );
}

export function isPlatformLogoSupported(slug: string): boolean {
  return slug in LOGO_MAP;
}
