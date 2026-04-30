import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BenchmarkReportForm } from "./benchmark-report-form";

type BenchmarkMode = "early-access" | "live";

const mode: BenchmarkMode =
  process.env.NEXT_PUBLIC_BENCHMARK_MODE === "live" ? "live" : "early-access";

const benchmarkPreviewAvailable = existsSync(
  path.join(
    process.cwd(),
    "public",
    "lead-magnets",
    "benchmark-report-preview.png",
  ),
);

const teaserStats = [
  {
    value: "7.2 days",
    label: "Median month-end close for $10-50M businesses",
  },
  {
    value: "182",
    label: "Invoices processed per FTE per week (top quartile)",
  },
  {
    value: "31%",
    label: "Of finance time spent on work that could be automated",
  },
];

export function BenchmarkReport() {
  const isLive = mode === "live";

  return (
    <Section tone="surface-3" size="md" id="benchmark-report">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(360px,480px)] lg:gap-16">
          <div>
            <Eyebrow>THE 2026 BENCHMARK</Eyebrow>
            <h2 className="mt-4 text-balance">
              {isLive
                ? "How does your finance team compare to Australian peers?"
                : "The 2026 Australian Finance Team Benchmark Report"}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              {isLive
                ? "We've aggregated diagnostic data from hundreds of mid-market finance operations across Australia. See where your team lands on month-end close speed, invoices processed per FTE, manual hours per week, and four other core metrics."
                : "We're aggregating data from Australian mid-market finance operations across eight core metrics. Register now and we'll send you the full report the day it publishes."}
            </p>

            <div className="mt-8 max-w-2xl">
              <BenchmarkReportForm mode={mode} />
            </div>

            {isLive ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {teaserStats.map((stat) => (
                  <div key={stat.label} className="border-t border-line pt-4">
                    <p className="font-display text-3xl font-semibold text-ink numeric">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-sm font-medium text-ink-muted">
                Expected publication: Q3 2026
              </p>
            )}
          </div>

          <BenchmarkPreview available={benchmarkPreviewAvailable} />
        </div>
      </Container>
    </Section>
  );
}

function BenchmarkPreview({ available }: { available: boolean }) {
  if (available) {
    return (
      <Image
        src="/lead-magnets/benchmark-report-preview.png"
        alt="Preview of the 2026 Australian Finance Team Benchmark Report dashboard"
        width={960}
        height={720}
        className="h-auto w-full rounded-[28px] shadow-float"
      />
    );
  }

  return (
    <div className="rounded-[28px] border border-line bg-surface p-6 shadow-soft">
      <div className="rounded-2xl border border-line-soft bg-surface-2 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Benchmark preview
        </p>
        <div className="mt-6 space-y-5">
          {[
            "Month-end close (days)",
            "Invoices per FTE / week",
            "Manual hours / week",
            "Automation coverage %",
          ].map((label, index) => (
            <div key={label}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <p className="text-xs font-medium text-ink-soft">{label}</p>
                <p className="text-[11px] text-ink-faint">Peer range</p>
              </div>
              <div className="space-y-1.5">
                <PreviewBar width={[44, 62, 38, 70][index]} tone="teal" />
                <PreviewBar width={[68, 54, 64, 42][index]} tone="muted" />
                <PreviewBar width={[82, 76, 78, 88][index]} tone="ink" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-[11px] text-ink-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-teal" />
            Your team
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ink-muted" />
            Peer median
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-ink" />
            Top quartile
          </span>
        </div>
      </div>
    </div>
  );
}

function PreviewBar({
  width,
  tone,
}: {
  width: number;
  tone: "teal" | "muted" | "ink";
}) {
  const toneClass =
    tone === "teal"
      ? "bg-teal"
      : tone === "ink"
        ? "bg-ink"
        : "bg-ink-muted";

  return (
    <div className="h-2.5 rounded-full bg-line-soft">
      <div className={`h-full rounded-full ${toneClass}`} style={{ width: `${width}%` }} />
    </div>
  );
}
