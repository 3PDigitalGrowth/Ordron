import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";

type CaseStudy = {
  sector: string;
  tag: string;
  headline: string;
  metric: string;
  metricLabel: string;
  summary: string;
  art: React.ReactNode;
};

const cases: CaseStudy[] = [
  {
    sector: "Accounting practice",
    tag: "Invoice processing",
    headline:
      "From 20 hours a week of manual invoice review to under 2.",
    metric: "90%",
    metricLabel: "time saved",
    summary:
      "We built an OCR layer that reads 800+ supplier invoices a week, codes them against historical rules and routes exceptions to the right reviewer. The client now spends review time on the 10 percent that genuinely need a human.",
    art: (
      <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden>
        <rect width="240" height="120" rx="14" fill="#F7F9FB" />
        <g transform="translate(18,18)">
          <rect width="60" height="84" rx="8" fill="#FFFFFF" stroke="#E5EAF0" />
          <rect x="10" y="12" width="40" height="5" rx="2.5" fill="#0B1825" />
          <rect x="10" y="22" width="30" height="4" rx="2" fill="#AAB9C8" />
          <rect x="10" y="34" width="40" height="4" rx="2" fill="#E5EAF0" />
          <rect x="10" y="42" width="40" height="4" rx="2" fill="#E5EAF0" />
          <rect x="10" y="50" width="40" height="4" rx="2" fill="#E5EAF0" />
          <rect x="10" y="58" width="28" height="4" rx="2" fill="#E5EAF0" />
          <rect x="10" y="68" width="18" height="6" rx="3" fill="#00ABFF" />
        </g>
        <path
          d="M84 60h28"
          stroke="#00ABFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 4"
        />
        <g transform="translate(118,18)">
          <rect
            width="104"
            height="84"
            rx="10"
            fill="#FFFFFF"
            stroke="#E5EAF0"
          />
          <rect x="12" y="14" width="52" height="6" rx="3" fill="#0B1825" />
          <rect x="12" y="26" width="36" height="4" rx="2" fill="#AAB9C8" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(12,${40 + i * 10})`}>
              <rect width="80" height="7" rx="3.5" fill="#F7F9FB" />
              <circle cx="4.5" cy="3.5" r="2" fill={i === 2 ? "#F5B754" : "#06B59C"} />
              <rect x="12" width="40" height="3" rx="1.5" fill="#0B1825" opacity="0.7" />
              <rect x="58" width="18" height="3" rx="1.5" fill="#AAB9C8" />
            </g>
          ))}
        </g>
      </svg>
    ),
  },
  {
    sector: "Financial services firm",
    tag: "Full stack build",
    headline:
      "Near-zero manual data entry across a HubSpot, Xero and timesheet stack.",
    metric: "Ongoing",
    metricLabel: "partnership",
    summary:
      "HubSpot and Xero integration with a centralised database, automated timesheeting and a custom dashboard. The client now runs operations with near-zero manual data entry, and Ordron is embedded on a monthly partnership.",
    art: (
      <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden>
        <rect width="240" height="120" rx="14" fill="#F7F9FB" />
        <g>
          <circle cx="50" cy="60" r="22" fill="#FFFFFF" stroke="#E5EAF0" />
          <rect x="38" y="54" width="24" height="3" rx="1.5" fill="#0B1825" />
          <rect x="38" y="60" width="18" height="3" rx="1.5" fill="#AAB9C8" />
          <rect x="38" y="66" width="14" height="3" rx="1.5" fill="#AAB9C8" />
        </g>
        <g>
          <circle cx="120" cy="60" r="22" fill="#00ABFF" />
          <text
            x="120"
            y="64"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="Sora, system-ui"
            fontWeight="600"
            fontSize="14"
          >
            O
          </text>
        </g>
        <g>
          <circle cx="190" cy="60" r="22" fill="#FFFFFF" stroke="#E5EAF0" />
          <rect x="178" y="54" width="24" height="3" rx="1.5" fill="#0B1825" />
          <rect x="178" y="60" width="18" height="3" rx="1.5" fill="#AAB9C8" />
          <rect x="178" y="66" width="14" height="3" rx="1.5" fill="#AAB9C8" />
        </g>
        <path
          d="M72 60h26M142 60h26"
          stroke="#00ABFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <g opacity="0.6" stroke="#004584" fill="none" strokeWidth="1.2">
          <path d="M50 38V20" />
          <path d="M120 38V14" />
          <path d="M190 38V20" />
          <path d="M50 82v18" />
          <path d="M120 82v24" />
          <path d="M190 82v18" />
        </g>
      </svg>
    ),
  },
  {
    sector: "SME operations",
    tag: "Systems integration",
    headline:
      "CRM, accounting and project tools unified through an automation layer.",
    metric: "Zero",
    metricLabel: "manual re-entry",
    summary:
      "Connected a previously disconnected toolset so that project, billing and accounting data moves through a unified automation layer. Manual data entry across departments was eliminated as part of the engagement.",
    art: (
      <svg viewBox="0 0 240 120" className="h-auto w-full" aria-hidden>
        <rect width="240" height="120" rx="14" fill="#F7F9FB" />
        <g transform="translate(24,24)">
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={c * 50}
                y={r * 24}
                width="44"
                height="18"
                rx="6"
                fill={r === 1 && c === 1 ? "#00ABFF" : "#FFFFFF"}
                stroke="#E5EAF0"
              />
            )),
          )}
        </g>
        <g transform="translate(24,24)">
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3].map((c) =>
              r === 1 && c === 1 ? null : (
                <circle
                  key={`d-${r}-${c}`}
                  cx={c * 50 + 22}
                  cy={r * 24 + 9}
                  r="2.5"
                  fill="#AAB9C8"
                />
              ),
            ),
          )}
        </g>
        <g stroke="#00ABFF" strokeWidth="1.4" fill="none">
          <path d="M68 42H92" />
          <path d="M118 42h24" />
          <path d="M92 30v24" />
        </g>
      </svg>
    ),
  },
];

export function Proof() {
  return (
    <Section tone="surface" size="md" id="proof">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>Proof on the ground</Eyebrow>
            <h2 className="mt-4 text-balance">
              Real Australian finance teams. Real numbers. Real automation that
              stayed working.
            </h2>
          </div>
          <p className="text-[15px] text-ink-muted">
            Names withheld until case studies are approved for publication.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {cases.map((c) => (
            <article
              key={c.sector}
              className="flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-surface shadow-soft"
            >
              <div className="border-b border-line-soft p-4">{c.art}</div>
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center gap-2">
                  <Badge tone="neutral">{c.sector}</Badge>
                  <Badge tone="brand">{c.tag}</Badge>
                </div>
                <h3 className="mt-4 text-xl">{c.headline}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {c.summary}
                </p>
                <div className="mt-auto pt-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-4xl font-semibold text-brand-deep numeric">
                      {c.metric}
                    </span>
                    <span className="text-[15px] text-ink-muted">
                      {c.metricLabel}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-[28px] bg-ink p-8 text-white sm:p-10">
          <div className="grid gap-8 sm:grid-cols-3 sm:gap-10">
            {[
              { v: "130+", l: "Automation frameworks" },
              { v: "13", l: "Finance platforms supported" },
              { v: "100%", l: "Client retention on partnerships" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-5xl font-semibold text-white numeric">
                  {s.v}
                </p>
                <p className="mt-2 text-sm text-white/70">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
