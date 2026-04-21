import { cn } from "@/lib/utils";

type HeroDashboardProps = {
  className?: string;
};

/*
  Illustrative "Ordron Control Panel" composition.
  Built as an SVG so it looks like product UI, not an AI image.
  Three stacked cards:
    1. AP queue (automation status rows)
    2. Month-end close progress ring
    3. Weekly time-saved sparkline
*/

export function HeroDashboard({ className }: HeroDashboardProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <svg
        viewBox="0 0 640 520"
        className="h-auto w-full"
        role="img"
        aria-label="Illustrative Ordron finance automation dashboard"
      >
        <defs>
          <linearGradient id="hero-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E6F6FF" />
            <stop offset="100%" stopColor="#F7FBFF" />
          </linearGradient>
          <linearGradient id="card-soft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FBFDFF" />
          </linearGradient>
          <linearGradient id="progress-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00ABFF" />
            <stop offset="100%" stopColor="#004584" />
          </linearGradient>
          <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00ABFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00ABFF" stopOpacity="0" />
          </linearGradient>
          <filter id="card-shadow" x="-5%" y="-5%" width="110%" height="120%">
            <feDropShadow
              dx="0"
              dy="14"
              stdDeviation="18"
              floodColor="#004584"
              floodOpacity="0.12"
            />
          </filter>
        </defs>

        {/* background panel */}
        <rect width="640" height="520" rx="28" fill="url(#hero-bg)" />
        <g stroke="#C8DEF1" strokeOpacity="0.5">
          <line x1="0" y1="130" x2="640" y2="130" />
          <line x1="0" y1="260" x2="640" y2="260" />
          <line x1="0" y1="390" x2="640" y2="390" />
        </g>

        {/* floating mint accent */}
        <circle cx="60" cy="450" r="90" fill="#DBF0ED" opacity="0.9" />
        <circle cx="580" cy="90" r="60" fill="#00ABFF" opacity="0.08" />

        {/* Card 1: AP queue */}
        <g filter="url(#card-shadow)">
          <rect
            x="40"
            y="40"
            width="420"
            height="220"
            rx="20"
            fill="url(#card-soft)"
            stroke="#E5EAF0"
          />
          {/* header */}
          <text
            x="64"
            y="74"
            fill="#0B1825"
            fontFamily="Sora, system-ui"
            fontWeight="600"
            fontSize="14"
          >
            Accounts payable queue
          </text>
          <text
            x="64"
            y="92"
            fill="#687B89"
            fontFamily="Commissioner, system-ui"
            fontSize="11"
          >
            Automated coding and approvals · Xero · Today
          </text>
          <g transform="translate(404, 58)">
            <rect width="40" height="22" rx="11" fill="#DBF0ED" />
            <circle cx="12" cy="11" r="4" fill="#06B59C" />
            <text
              x="20"
              y="14.5"
              fill="#07856F"
              fontFamily="Commissioner, system-ui"
              fontWeight="600"
              fontSize="10"
            >
              Live
            </text>
          </g>

          {/* rows */}
          {[
            { y: 118, v: "Telstra", meta: "GL 6-210 · Matched PO 4821", amt: "$ 1,842.00", tone: "ok" },
            { y: 156, v: "AWS AU", meta: "GL 6-300 · Auto-coded", amt: "$ 4,210.55", tone: "ok" },
            { y: 194, v: "Officeworks", meta: "Needs approval · Paul R.", amt: "$ 318.90", tone: "pending" },
            { y: 232, v: "StreetFleet", meta: "Duplicate flagged", amt: "$ 2,204.10", tone: "flag" },
          ].map((r) => (
            <g key={r.y}>
              <rect
                x="64"
                y={r.y - 14}
                width="372"
                height="30"
                rx="10"
                fill="#F7F9FB"
              />
              <circle
                cx="80"
                cy={r.y + 1}
                r="5"
                fill={
                  r.tone === "ok"
                    ? "#06B59C"
                    : r.tone === "pending"
                    ? "#F5B754"
                    : "#E06B6B"
                }
              />
              <text
                x="96"
                y={r.y + 4}
                fill="#0B1825"
                fontFamily="Commissioner, system-ui"
                fontWeight="600"
                fontSize="12"
              >
                {r.v}
              </text>
              <text
                x="96"
                y={r.y + 19}
                fill="#687B89"
                fontFamily="Commissioner, system-ui"
                fontSize="10.5"
              >
                {r.meta}
              </text>
              <text
                x="424"
                y={r.y + 5}
                fill="#0B1825"
                fontFamily="Commissioner, system-ui"
                fontWeight="600"
                fontSize="12"
                textAnchor="end"
              >
                {r.amt}
              </text>
            </g>
          ))}
        </g>

        {/* Card 2: Month-end ring */}
        <g filter="url(#card-shadow)" transform="translate(480, 40)">
          <rect
            width="140"
            height="220"
            rx="20"
            fill="url(#card-soft)"
            stroke="#E5EAF0"
          />
          <text
            x="20"
            y="34"
            fill="#0B1825"
            fontFamily="Sora, system-ui"
            fontWeight="600"
            fontSize="12"
          >
            Month-end
          </text>
          <text
            x="20"
            y="50"
            fill="#687B89"
            fontFamily="Commissioner, system-ui"
            fontSize="10"
          >
            Close progress
          </text>

          {/* ring */}
          <g transform="translate(70, 130)">
            <circle cx="0" cy="0" r="46" stroke="#E5EAF0" strokeWidth="10" fill="none" />
            <circle
              cx="0"
              cy="0"
              r="46"
              stroke="url(#progress-ring)"
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="289"
              strokeDashoffset="62"
              transform="rotate(-90)"
            />
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fill="#0B1825"
              fontFamily="Sora, system-ui"
              fontWeight="600"
              fontSize="22"
            >
              78%
            </text>
          </g>
          <text
            x="70"
            y="200"
            textAnchor="middle"
            fill="#687B89"
            fontFamily="Commissioner, system-ui"
            fontSize="10.5"
          >
            Day 2 of 2
          </text>
        </g>

        {/* Card 3: Weekly time saved sparkline */}
        <g filter="url(#card-shadow)" transform="translate(40, 288)">
          <rect
            width="580"
            height="196"
            rx="20"
            fill="url(#card-soft)"
            stroke="#E5EAF0"
          />
          <text
            x="24"
            y="36"
            fill="#0B1825"
            fontFamily="Sora, system-ui"
            fontWeight="600"
            fontSize="14"
          >
            Weekly manual hours removed
          </text>
          <text
            x="24"
            y="54"
            fill="#687B89"
            fontFamily="Commissioner, system-ui"
            fontSize="11"
          >
            Rolling 12 weeks · AP, AR and reconciliations
          </text>

          <g transform="translate(24, 78)">
            <text
              x="0"
              y="0"
              fill="#0B1825"
              fontFamily="Sora, system-ui"
              fontWeight="600"
              fontSize="30"
              className="numeric"
            >
              142
            </text>
            <text
              x="70"
              y="-2"
              fill="#06B59C"
              fontFamily="Commissioner, system-ui"
              fontWeight="600"
              fontSize="12"
            >
              hrs / wk
            </text>
            <text
              x="70"
              y="14"
              fill="#687B89"
              fontFamily="Commissioner, system-ui"
              fontSize="10.5"
            >
              + 18% vs last qtr
            </text>
          </g>

          {/* sparkline */}
          <g transform="translate(24, 100)">
            <path
              d="M0,60 C20,52 40,58 60,48 S100,30 120,34 160,40 180,30 220,14 240,20 280,28 300,18 340,6 360,12 400,18 420,10 460,16 480,8 520,12 532,4"
              fill="none"
              stroke="#00ABFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M0,60 C20,52 40,58 60,48 S100,30 120,34 160,40 180,30 220,14 240,20 280,28 300,18 340,6 360,12 400,18 420,10 460,16 480,8 520,12 532,4 L532,70 L0,70 Z"
              fill="url(#spark-fill)"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
