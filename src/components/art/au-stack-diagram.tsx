import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * AuStackDiagram
 *
 * Hero visual for the /finance-automation-australia pillar page.
 * Flat vector illustration of the Australian mid-market finance stack,
 * with four horizontal layers (capture, ledger, reconciliation,
 * reporting) connected through an Ordron orchestration spine. Palette
 * is brand-native. No photoreal imagery, no hero people.
 */
export function AuStackDiagram({ className }: Props) {
  return (
    <svg
      viewBox="0 0 720 560"
      role="img"
      aria-labelledby="au-stack-title au-stack-desc"
      className={cn("block h-auto w-full select-none", className)}
    >
      <title id="au-stack-title">
        The Australian mid-market finance automation stack
      </title>
      <desc id="au-stack-desc">
        Four horizontal layers, capture through reporting, connected by a
        central Ordron orchestration spine with a database of record.
      </desc>

      <defs>
        <linearGradient id="au-stack-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F7F9FB" />
          <stop offset="100%" stopColor="#EFEFEF" />
        </linearGradient>
        <linearGradient id="au-stack-spine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00ABFF" />
          <stop offset="100%" stopColor="#004584" />
        </linearGradient>
        <linearGradient id="au-stack-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F7F9FB" />
        </linearGradient>
        <filter
          id="au-stack-shadow"
          x="-5%"
          y="-5%"
          width="110%"
          height="115%"
        >
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="8"
            floodColor="#0B1825"
            floodOpacity="0.08"
          />
        </filter>
      </defs>

      {/* background */}
      <rect width="720" height="560" rx="28" fill="url(#au-stack-bg)" />

      {/* faint dotted field */}
      <g opacity="0.35">
        {Array.from({ length: 14 }).map((_, row) =>
          Array.from({ length: 18 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={40 + col * 38}
              cy={40 + row * 36}
              r="1.1"
              fill="#C8CFD3"
            />
          )),
        )}
      </g>

      {/* central spine */}
      <rect
        x="340"
        y="60"
        width="40"
        height="440"
        rx="20"
        fill="url(#au-stack-spine)"
        opacity="0.95"
      />
      <text
        x="360"
        y="48"
        textAnchor="middle"
        fontFamily="Sora, system-ui"
        fontSize="12"
        fontWeight="600"
        letterSpacing="2"
        fill="#004584"
      >
        ORDRON
      </text>
      <text
        x="360"
        y="520"
        textAnchor="middle"
        fontFamily="Sora, system-ui"
        fontSize="11"
        fontWeight="600"
        letterSpacing="1.4"
        fill="#687B89"
      >
        AZURE DATABASE OF RECORD
      </text>
      <rect
        x="312"
        y="492"
        width="96"
        height="12"
        rx="6"
        fill="#0B1825"
        opacity="0.08"
      />

      {/* layer labels on left gutter */}
      {[
        { y: 96, label: "Capture" },
        { y: 208, label: "Ledger" },
        { y: 320, label: "Reconciliation" },
        { y: 432, label: "Reporting" },
      ].map((l) => (
        <text
          key={l.label}
          x="32"
          y={l.y + 4}
          fontFamily="Sora, system-ui"
          fontSize="11"
          fontWeight="700"
          letterSpacing="1.8"
          fill="#0B1825"
          opacity="0.55"
        >
          {l.label.toUpperCase()}
        </text>
      ))}

      {/* connecting flow arrows into spine */}
      {[96, 208, 320, 432].map((y) => (
        <g key={`flow-${y}`}>
          <path
            d={`M 248 ${y} H 330`}
            stroke="#AAB9C8"
            strokeWidth="1.5"
            strokeDasharray="3 4"
            fill="none"
          />
          <path
            d={`M 320 ${y - 4} l 8 4 l -8 4`}
            stroke="#AAB9C8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d={`M 390 ${y} H 472`}
            stroke="#AAB9C8"
            strokeWidth="1.5"
            strokeDasharray="3 4"
            fill="none"
          />
          <path
            d={`M 464 ${y - 4} l 8 4 l -8 4`}
            stroke="#AAB9C8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      ))}

      {/* left column: source systems */}
      <LayerCard
        x={108}
        y={72}
        width={140}
        title="Dext · Hubdoc"
        caption="OCR + extraction"
      />
      <LayerCard
        x={108}
        y={184}
        width={140}
        title="Xero · MYOB"
        caption="General ledger"
      />
      <LayerCard
        x={108}
        y={296}
        width={140}
        title="Bank feeds"
        caption="Portals + direct feed"
      />
      <LayerCard
        x={108}
        y={408}
        width={140}
        title="Excel · Power BI"
        caption="Operational reports"
      />

      {/* right column: outbound destinations */}
      <LayerCard
        x={472}
        y={72}
        width={140}
        title="Concur · cards"
        caption="Expense intake"
      />
      <LayerCard
        x={472}
        y={184}
        width={140}
        title="NetSuite · SAP"
        caption="Mid-market ERP"
      />
      <LayerCard
        x={472}
        y={296}
        width={140}
        title="Outlook · Teams"
        caption="Exception routing"
      />
      <LayerCard
        x={472}
        y={408}
        width={140}
        title="Board · CFO pack"
        caption="48-hr close"
      />

      {/* ordron callout */}
      <g filter="url(#au-stack-shadow)">
        <rect
          x="288"
          y="244"
          width="144"
          height="72"
          rx="16"
          fill="url(#au-stack-card)"
          stroke="#E5EAF0"
        />
      </g>
      <text
        x="360"
        y="266"
        textAnchor="middle"
        fontFamily="Sora, system-ui"
        fontSize="10"
        fontWeight="700"
        letterSpacing="1.5"
        fill="#00ABFF"
      >
        130 AUTOMATIONS
      </text>
      <text
        x="360"
        y="287"
        textAnchor="middle"
        fontFamily="Sora, system-ui"
        fontSize="15"
        fontWeight="600"
        fill="#0B1825"
      >
        Orchestration
      </text>
      <text
        x="360"
        y="304"
        textAnchor="middle"
        fontFamily="Commissioner, system-ui"
        fontSize="11"
        fill="#687B89"
      >
        API first, RPA where needed
      </text>

      {/* audit-trail ticks down the spine */}
      {[120, 168, 248, 352, 400].map((y) => (
        <circle
          key={`tick-${y}`}
          cx="360"
          cy={y}
          r="3.5"
          fill="#FFFFFF"
          stroke="#00ABFF"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

function LayerCard({
  x,
  y,
  width,
  title,
  caption,
}: {
  x: number;
  y: number;
  width: number;
  title: string;
  caption: string;
}) {
  const height = 48;
  return (
    <g filter="url(#au-stack-shadow)">
      <rect
        x={x}
        y={y - height / 2}
        width={width}
        height={height}
        rx="12"
        fill="url(#au-stack-card)"
        stroke="#E5EAF0"
      />
      <text
        x={x + 16}
        y={y - 4}
        fontFamily="Sora, system-ui"
        fontSize="13"
        fontWeight="600"
        fill="#0B1825"
      >
        {title}
      </text>
      <text
        x={x + 16}
        y={y + 13}
        fontFamily="Commissioner, system-ui"
        fontSize="11"
        fill="#687B89"
      >
        {caption}
      </text>
    </g>
  );
}
