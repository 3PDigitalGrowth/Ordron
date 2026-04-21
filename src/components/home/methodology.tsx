import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";

type Stage = {
  number: string;
  title: string;
  summary: string;
  detail: string;
  features: string[];
  art: React.ReactNode;
};

const stages: Stage[] = [
  {
    number: "01",
    title: "Database-first architecture",
    summary:
      "Your data gets a proper home before any bot touches it.",
    detail:
      "We stand up a centralised, isolated database on Azure so every automation writes against a controlled source of truth. No shared VMs. No scraping production.",
    features: [
      "Azure-hosted virtual machines",
      "Client data isolation and encryption",
      "Full audit trail on every transaction",
    ],
    art: (
      <svg viewBox="0 0 200 140" className="h-auto w-full" aria-hidden>
        <defs>
          <linearGradient id="db-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00ABFF" />
            <stop offset="100%" stopColor="#004584" />
          </linearGradient>
        </defs>
        <ellipse
          cx="100"
          cy="30"
          rx="54"
          ry="14"
          fill="url(#db-grad)"
          opacity="0.95"
        />
        <rect
          x="46"
          y="30"
          width="108"
          height="30"
          fill="url(#db-grad)"
          opacity="0.85"
        />
        <ellipse
          cx="100"
          cy="60"
          rx="54"
          ry="14"
          fill="#0B1825"
          opacity="0.9"
        />
        <rect
          x="46"
          y="60"
          width="108"
          height="30"
          fill="url(#db-grad)"
          opacity="0.7"
        />
        <ellipse
          cx="100"
          cy="90"
          rx="54"
          ry="14"
          fill="#0B1825"
          opacity="0.9"
        />
        <rect
          x="46"
          y="90"
          width="108"
          height="20"
          fill="url(#db-grad)"
          opacity="0.55"
        />
        <ellipse cx="100" cy="110" rx="54" ry="14" fill="#0B1825" />
        <circle cx="72" cy="40" r="3" fill="#DBF0ED" />
        <circle cx="72" cy="70" r="3" fill="#DBF0ED" opacity="0.85" />
        <circle cx="72" cy="100" r="3" fill="#DBF0ED" opacity="0.7" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Automation layer",
    summary:
      "Rules, APIs, OCR and Python stitched into the workflow you already run.",
    detail:
      "We favour APIs where they exist, fall back to RPA where they do not, and wire in Python and OCR for the 20 percent that neither handle well. Exceptions always route to a human.",
    features: [
      "API and RPA hybrid model",
      "OCR for document-heavy workflows",
      "Human-in-the-loop by design",
    ],
    art: (
      <svg viewBox="0 0 200 140" className="h-auto w-full" aria-hidden>
        <g stroke="#00ABFF" strokeWidth="1.5" fill="none">
          <path d="M20 70h40M140 70h40M100 20v20M100 100v20" />
        </g>
        <g>
          <rect
            x="60"
            y="40"
            width="80"
            height="60"
            rx="14"
            fill="#FFFFFF"
            stroke="#00ABFF"
            strokeWidth="1.5"
          />
          <circle cx="86" cy="70" r="10" fill="#DBF0ED" />
          <path
            d="M78 70h6l2-4 4 8 2-4h6"
            stroke="#004584"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
          <rect x="108" y="62" width="24" height="4" rx="2" fill="#00ABFF" />
          <rect
            x="108"
            y="72"
            width="16"
            height="4"
            rx="2"
            fill="#AAB9C8"
          />
        </g>
        <g fill="#004584">
          <rect x="10" y="64" width="14" height="12" rx="3" />
          <rect x="176" y="64" width="14" height="12" rx="3" />
          <rect x="94" y="10" width="14" height="12" rx="3" />
          <rect x="94" y="118" width="14" height="12" rx="3" />
        </g>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Ordron Control Panel",
    summary:
      "Real-time visibility for you, not a black box built on top of your data.",
    detail:
      "Every automation streams its status into a custom dashboard so finance leaders can see what ran, what failed, what needs approval and what saved the team time this week.",
    features: [
      "Live automation status",
      "Exceptions queued with owners",
      "Time-saved and ROI reporting",
    ],
    art: (
      <svg viewBox="0 0 200 140" className="h-auto w-full" aria-hidden>
        <rect
          x="10"
          y="12"
          width="180"
          height="116"
          rx="14"
          fill="#FFFFFF"
          stroke="#E5EAF0"
        />
        <rect x="22" y="26" width="60" height="8" rx="4" fill="#0B1825" />
        <rect
          x="22"
          y="40"
          width="40"
          height="6"
          rx="3"
          fill="#AAB9C8"
        />
        <rect
          x="22"
          y="60"
          width="78"
          height="58"
          rx="10"
          fill="#F7F9FB"
        />
        <path
          d="M30 100c10-4 18-16 28-12s18 16 30 6"
          fill="none"
          stroke="#00ABFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect x="110" y="60" width="36" height="26" rx="8" fill="#DBF0ED" />
        <circle cx="128" cy="73" r="6" fill="#06B59C" />
        <rect x="152" y="60" width="36" height="26" rx="8" fill="#FFF6E6" />
        <path
          d="M164 73h12"
          stroke="#9B6A10"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <rect
          x="110"
          y="92"
          width="78"
          height="26"
          rx="8"
          fill="#00ABFF"
          opacity="0.12"
        />
        <rect x="118" y="102" width="50" height="6" rx="3" fill="#004584" />
      </svg>
    ),
  },
];

export function Methodology() {
  return (
    <Section tone="ink" size="lg" id="how-ordron-builds" className="text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(at 85% 0%, rgba(0,171,255,0.25), transparent 60%)",
        }}
      />
      <Container className="relative">
        <div className="max-w-2xl">
          <Eyebrow className="text-white/70">
            How Ordron builds
          </Eyebrow>
          <h2 className="mt-4 text-balance text-white">
            Finance automation that respects the controls finance actually
            needs.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/72">
            The usual automation shop starts with a bot and hopes the rest
            works itself out. We start with the data, build the automations
            on top, and make the whole thing visible to you through a control
            panel. That is why the projects stay working after we hand them
            over.
          </p>
        </div>

        <ol className="mt-16 grid gap-6 lg:grid-cols-3">
          {stages.map((stage) => (
            <li
              key={stage.number}
              className="flex h-full flex-col rounded-[28px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-[color:var(--ordron-blue)]">
                  STAGE {stage.number}
                </span>
              </div>
              <div className="mt-4 rounded-2xl bg-white/[0.04] p-4">
                {stage.art}
              </div>
              <h3 className="mt-6 text-white">{stage.title}</h3>
              <p className="mt-2 text-[15px] text-white/72">{stage.summary}</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">
                {stage.detail}
              </p>
              <ul className="mt-5 space-y-2 border-t border-white/10 pt-5">
                {stage.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[14px] text-white/75"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      className="mt-1 shrink-0 text-[color:var(--ordron-teal)]"
                      aria-hidden
                    >
                      <path
                        d="m3 8.5 3 3 7-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-14 max-w-3xl text-center text-[15px] text-white/60">
          Not enterprise RPA pricing. Not a point-solution bot. Custom finance
          infrastructure, delivered turnkey, priced for the mid-market.
        </p>
      </Container>
    </Section>
  );
}
