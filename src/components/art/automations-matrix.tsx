import { cn } from "@/lib/utils";

type Props = {
  /** Rows correspond to platforms. Defaults to 13. */
  rows?: number;
  /** Columns correspond to automations per platform. Defaults to 10. */
  cols?: number;
  className?: string;
  /**
   * If set, these row+col pairs render in the accent brand blue to
   * show the "live" cells. Used on the hero to hint at selection.
   */
  highlights?: Array<{ row: number; col: number }>;
};

/**
 * AutomationsMatrix
 *
 * Editorial hero visual for `/guide/automations`. Renders a 13x10 grid
 * of dots that reads instantly as "13 platforms x 10 automations".
 * Dots are SVG circles in brand palette. No raster assets, no AI art.
 */
export function AutomationsMatrix({
  rows = 13,
  cols = 10,
  className,
  highlights = [
    { row: 0, col: 3 },
    { row: 3, col: 6 },
    { row: 6, col: 1 },
    { row: 9, col: 8 },
    { row: 12, col: 4 },
  ],
}: Props) {
  const gap = 22;
  const radius = 5;
  const padX = 24;
  const padY = 24;
  const width = padX * 2 + (cols - 1) * gap;
  const height = padY * 2 + (rows - 1) * gap;

  const highlightKey = (r: number, c: number) => `${r}-${c}`;
  const highlightSet = new Set(highlights.map((h) => highlightKey(h.row, h.col)));

  const dots: Array<{ r: number; c: number; cx: number; cy: number; on: boolean }> = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      dots.push({
        r,
        c,
        cx: padX + c * gap,
        cy: padY + r * gap,
        on: highlightSet.has(highlightKey(r, c)),
      });
    }
  }

  const total = rows * cols;

  return (
    <figure
      className={cn("relative", className)}
      aria-label={`Grid of ${total} dots, ${rows} rows by ${cols} columns, representing ${rows} platforms and ${cols} automations per platform`}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
        role="img"
        aria-hidden
        className="block"
      >
        <defs>
          <radialGradient id="ordron-matrix-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,171,255,0.18)" />
            <stop offset="100%" stopColor="rgba(0,171,255,0)" />
          </radialGradient>
          <linearGradient id="ordron-matrix-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ABFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#00ABFF" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#00ABFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width={width} height={height} fill="url(#ordron-matrix-glow)" />

        <rect
          x="0"
          y={height / 2 - gap}
          width={width}
          height={gap * 2}
          fill="url(#ordron-matrix-sweep)"
        />

        {dots.map((d) => (
          <circle
            key={`${d.r}-${d.c}`}
            cx={d.cx}
            cy={d.cy}
            r={d.on ? radius + 0.5 : radius - 1.2}
            fill={d.on ? "#00ABFF" : "rgba(11, 24, 37, 0.18)"}
          />
        ))}

        <text
          x={width - 14}
          y={height - 10}
          textAnchor="end"
          fontFamily="var(--font-display), system-ui, sans-serif"
          fontWeight={600}
          fontSize={12}
          letterSpacing="0.14em"
          fill="rgba(11, 24, 37, 0.58)"
        >
          {rows} × {cols} = {total}
        </text>

        <text
          x={14}
          y={18}
          fontFamily="var(--font-display), system-ui, sans-serif"
          fontWeight={600}
          fontSize={11}
          letterSpacing="0.18em"
          fill="rgba(0, 69, 132, 0.75)"
        >
          AUTOMATION CATALOGUE
        </text>
      </svg>
    </figure>
  );
}
