import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * FourPillarsDiagram
 *
 * Compact illustration for the "four pillars" section of the pillar
 * page. Four rounded tiles, each a finance pillar (AP, AR,
 * Reconciliation, Reporting), connected to a central "Close" hub.
 */
export function FourPillarsDiagram({ className }: Props) {
  return (
    <svg
      viewBox="0 0 480 360"
      role="img"
      aria-labelledby="four-pillars-title"
      className={cn("block h-auto w-full select-none", className)}
    >
      <title id="four-pillars-title">
        The four pillars of finance automation, converging on a two-day
        close.
      </title>

      <defs>
        <linearGradient id="pillars-hub" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00ABFF" />
          <stop offset="100%" stopColor="#004584" />
        </linearGradient>
        <linearGradient id="pillars-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F7F9FB" />
        </linearGradient>
        <filter
          id="pillars-shadow"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
        >
          <feDropShadow
            dx="0"
            dy="5"
            stdDeviation="7"
            floodColor="#0B1825"
            floodOpacity="0.1"
          />
        </filter>
      </defs>

      {/* connector lines */}
      {[
        { x1: 120, y1: 72, x2: 218, y2: 160 },
        { x1: 360, y1: 72, x2: 262, y2: 160 },
        { x1: 120, y1: 288, x2: 218, y2: 200 },
        { x1: 360, y1: 288, x2: 262, y2: 200 },
      ].map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="#AAB9C8"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
      ))}

      {/* central hub */}
      <g filter="url(#pillars-shadow)">
        <circle cx="240" cy="180" r="58" fill="url(#pillars-hub)" />
      </g>
      <text
        x="240"
        y="170"
        textAnchor="middle"
        fontFamily="Sora, system-ui"
        fontSize="10"
        fontWeight="700"
        letterSpacing="1.6"
        fill="#FFFFFF"
        opacity="0.8"
      >
        CLOSE IN
      </text>
      <text
        x="240"
        y="192"
        textAnchor="middle"
        fontFamily="Sora, system-ui"
        fontSize="28"
        fontWeight="700"
        fill="#FFFFFF"
      >
        2 days
      </text>
      <text
        x="240"
        y="210"
        textAnchor="middle"
        fontFamily="Commissioner, system-ui"
        fontSize="10"
        fill="#FFFFFF"
        opacity="0.85"
      >
        from ten
      </text>

      {/* four pillar tiles */}
      <Pillar x={40} y={34} title="Accounts Payable" stat="85% less manual entry" />
      <Pillar
        x={280}
        y={34}
        title="Accounts Receivable"
        stat="80% less reconciliation"
      />
      <Pillar
        x={40}
        y={250}
        title="Reconciliations"
        stat=">95% match rate"
      />
      <Pillar
        x={280}
        y={250}
        title="Reporting & Close"
        stat="48-hr CFO pack"
      />
    </svg>
  );
}

function Pillar({
  x,
  y,
  title,
  stat,
}: {
  x: number;
  y: number;
  title: string;
  stat: string;
}) {
  return (
    <g filter="url(#pillars-shadow)">
      <rect
        x={x}
        y={y}
        width="160"
        height="76"
        rx="14"
        fill="url(#pillars-card)"
        stroke="#E5EAF0"
      />
      <text
        x={x + 18}
        y={y + 30}
        fontFamily="Sora, system-ui"
        fontSize="13"
        fontWeight="600"
        fill="#0B1825"
      >
        {title}
      </text>
      <text
        x={x + 18}
        y={y + 52}
        fontFamily="Sora, system-ui"
        fontSize="13"
        fontWeight="600"
        fill="#004584"
      >
        {stat}
      </text>
    </g>
  );
}
