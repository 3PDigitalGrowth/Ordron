"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { siteConfig } from "@/lib/site";
import { platforms } from "@/lib/platforms";
import {
  ASSUMPTIONS,
  DEFAULT_INPUTS,
  calculate,
  formatAud,
  type AutomationRecommendation,
  type CalculatorInputs,
} from "@/lib/cost-of-inaction";

/**
 * CostOfInactionCalculator
 *
 * Reusable, interactive calculator. Headline numbers are always clear
 * and live-updating as the sliders move. The breakdown and the top
 * three automations sit behind a blur overlay until the user trades
 * an email for the full written report - the shifting numbers behind
 * the blur are the proof point that makes the email ask easy.
 *
 * Three variants:
 *   - `card`: self-contained card (homepage, cluster guides, blog posts)
 *   - `hero`: full-bleed presentation with large numbers (dedicated page)
 *   - `compact`: tight sidebar/aside rendering (future use)
 *
 * The same calculation runs server-side in /api/cost-of-inaction so the
 * logged lead record matches what the user saw.
 */

type Variant = "card" | "hero" | "compact";

/**
 * Gate aggressiveness:
 *   - "full" (default): blur both the line-by-line breakdown and the top
 *     three automations until the email is captured. Use on the standalone
 *     /cost-of-inaction page and the /platforms index where the calculator
 *     is effectively the whole page.
 *   - "light": always show the headline cost and the "Where the waste
 *     lives" breakdown; only gate the "Top three automations" deep dive
 *     plus the emailed PDF roadmap. Use on long-form platform hub pages
 *     where the calculator is one section and hiding core output before
 *     the user has scanned the page creates premature friction.
 */
type GateLevel = "full" | "light";

type Props = {
  variant?: Variant;
  /** Override the starting platform (e.g. on /platforms/xero-automation). */
  defaultPlatformSlug?: string;
  /** Attribution string written into the API log. */
  source: string;
  /** Optional eyebrow label above the calculator heading. */
  eyebrow?: string;
  /** Optional heading. Falls back to a sensible default. */
  heading?: string;
  /** Optional sub-copy under the heading. */
  intro?: string;
  /** How much of the results column to gate behind the email capture. */
  gateLevel?: GateLevel;
  className?: string;
};

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

export function CostOfInactionCalculator({
  variant = "card",
  defaultPlatformSlug,
  source,
  eyebrow = "Cost of inaction calculator",
  heading = "See exactly what manual finance is costing your team.",
  intro = "Slide the four inputs. The headline updates live. Enter your email to unlock the line-by-line breakdown and the prioritised roadmap.",
  gateLevel = "full",
  className,
}: Props) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    ...DEFAULT_INPUTS,
    platformSlug: defaultPlatformSlug ?? DEFAULT_INPUTS.platformSlug,
  });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });

  const result = useMemo(() => calculate(inputs), [inputs]);

  const baseId = useId();
  const id = (suffix: string) => `${baseId}-${suffix}`;

  const unlocked = submit.status === "success";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submit.status === "submitting") return;

    setSubmit({ status: "submitting" });
    try {
      const res = await fetch("/api/cost-of-inaction", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || null,
          company: company.trim() || null,
          source,
          inputs,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setSubmit({
          status: "error",
          message:
            data?.error === "invalid-email"
              ? "That email does not look right. Try again?"
              : "Something went wrong. Try again in a moment?",
        });
        return;
      }

      setSubmit({ status: "success" });
    } catch {
      setSubmit({
        status: "error",
        message: "Network hiccup. Try again in a moment?",
      });
    }
  }

  const isHero = variant === "hero";
  const isCompact = variant === "compact";

  const wrapperClass = cn(
    "relative overflow-hidden",
    isHero
      ? "rounded-[32px] border border-line bg-surface shadow-soft"
      : isCompact
        ? "rounded-[24px] border border-line bg-surface p-6"
        : "rounded-[28px] border border-line bg-surface shadow-soft",
    className,
  );

  return (
    <div className={wrapperClass}>
      <div
        className={cn(
          "grid gap-0",
          isHero
            ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
            : isCompact
              ? ""
              : "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]",
        )}
      >
        {/* Inputs */}
        <div
          className={cn(
            "flex flex-col gap-7",
            isHero ? "p-8 sm:p-12" : isCompact ? "" : "p-6 sm:p-8 lg:p-10",
          )}
        >
          {!isCompact ? (
            <header>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h3 className="mt-3 text-balance text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                {heading}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {intro}
              </p>
            </header>
          ) : null}

          <div className="flex flex-col gap-6">
            <SliderField
              id={id("team")}
              label="Finance team size"
              hint="FTEs in finance and accounting"
              min={1}
              max={30}
              step={1}
              value={inputs.teamSize}
              suffix={inputs.teamSize === 1 ? "person" : "people"}
              onChange={(v) => setInputs((s) => ({ ...s, teamSize: v }))}
            />
            <SliderField
              id={id("invoices")}
              label="Invoices per week"
              hint="Bills in plus AR invoices out"
              min={0}
              max={1500}
              step={10}
              value={inputs.weeklyInvoices}
              suffix="per week"
              onChange={(v) =>
                setInputs((s) => ({ ...s, weeklyInvoices: v }))
              }
            />
            <SliderField
              id={id("close")}
              label="Working days to close the month"
              hint="From period end to signed-off reports"
              min={1}
              max={20}
              step={1}
              value={inputs.closeDays}
              suffix={inputs.closeDays === 1 ? "day" : "days"}
              onChange={(v) => setInputs((s) => ({ ...s, closeDays: v }))}
            />

            <PlatformChips
              value={inputs.platformSlug}
              onChange={(v) => setInputs((s) => ({ ...s, platformSlug: v }))}
            />
          </div>

          <p className="text-xs leading-relaxed text-ink-muted">
            All dollar figures in AUD. Assumes a blended finance rate of{" "}
            <strong className="font-semibold text-ink">
              {formatAud(ASSUMPTIONS.blendedRate)}/hour
            </strong>{" "}
            and {ASSUMPTIONS.workingWeeks} working weeks per year.
            <EligibilityNote inputs={inputs} />
          </p>
        </div>

        {/* Results */}
        <div
          className={cn(
            "flex flex-col gap-6 border-t border-line bg-surface-2 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10",
            isHero && "sm:p-12",
          )}
        >
          {/* Always-clear headline */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Your annual cost of manual finance
            </p>
            <p
              className={cn(
                "mt-2 font-display font-semibold text-ink numeric tabular-nums",
                isHero ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl",
              )}
            >
              {formatAud(result.totalAnnualWaste)}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Ordron-style automation typically captures{" "}
              <strong className="font-semibold text-ink numeric tabular-nums">
                {formatAud(result.automatedSavings)}
              </strong>{" "}
              of that per year. On a typical{" "}
              {formatAud(ASSUMPTIONS.typicalProjectCost)} project, payback
              lands at roughly{" "}
              <strong className="font-semibold text-ink numeric tabular-nums">
                {result.paybackWeeks} week{result.paybackWeeks === 1 ? "" : "s"}
              </strong>
              .
            </p>
          </div>

          {/* Gated content: breakdown + automations, overlaid email gate */}
          <GatedDetail
            unlocked={unlocked}
            result={result}
            platformLabel={result.platform?.name ?? "your platform"}
            submitState={submit}
            email={email}
            name={name}
            company={company}
            setEmail={setEmail}
            setName={setName}
            setCompany={setCompany}
            onSubmit={onSubmit}
            idPrefix={id("gate")}
            gateLevel={gateLevel}
          />

          {unlocked ? (
            <div className="rounded-2xl bg-ink p-5 text-white animate-hc-fade">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
                Next step
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                Ready to see which of these automations actually apply to
                your workflows? The 60-minute Automation Roadmap walks your
                stack in detail and leaves you with a written roadmap. You
                keep the report whether you engage Ordron or not.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Button
                  href={siteConfig.ctas.healthCheck.href}
                  variant="inverse"
                  size="md"
                >
                  Book your Roadmap
                </Button>
                <Button
                  href={siteConfig.ctas.scorecard.href}
                  variant="ghost"
                  size="md"
                  className="text-white border-white/20 hover:bg-white/10 hover:border-white/40"
                >
                  Find your automation quick wins
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ Slider input */

type SliderFieldProps = {
  id: string;
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  value: number;
  /** Short suffix next to the big number (e.g. "people", "per week"). */
  suffix?: string;
  onChange: (v: number) => void;
};

function SliderField({
  id,
  label,
  hint,
  min,
  max,
  step,
  value,
  suffix,
  onChange,
}: SliderFieldProps) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
        </label>
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-2xl font-semibold text-ink numeric tabular-nums">
            {value.toLocaleString("en-AU")}
          </span>
          {suffix ? (
            <span className="text-xs font-medium text-ink-muted">
              {suffix}
            </span>
          ) : null}
        </div>
      </div>
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 overflow-hidden rounded-full"
        >
          <div
            className="h-full rounded-full bg-[color:var(--ordron-blue)]/90 transition-[width] duration-75"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="range-slider relative z-10"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
      </div>
      <div className="flex items-center justify-between text-[11px] text-ink-faint">
        <span className="numeric tabular-nums">
          {min.toLocaleString("en-AU")}
        </span>
        <span>{hint}</span>
        <span className="numeric tabular-nums">
          {max.toLocaleString("en-AU")}
          {value === max ? "+" : ""}
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- Platform chips */

function PlatformChips({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const options = [
    ...platforms.map((p) => ({ value: p.slug, label: p.shortLabel })),
    { value: "other", label: "Something else" },
  ];

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold text-ink">
          Current platform
        </span>
        <span className="text-[11px] text-ink-faint">
          Changes the named automations shown
        </span>
      </div>
      <div
        role="radiogroup"
        aria-label="Current platform"
        className="mt-3 flex flex-wrap gap-1.5"
      >
        {options.map((o) => {
          const selected = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(o.value)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                selected
                  ? "border-[color:var(--ordron-blue)] bg-[color:var(--ordron-blue)] text-white shadow-ink"
                  : "border-line bg-surface text-ink hover:border-ink/25 hover:bg-ink/5",
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------ Gated detail region */

type GatedDetailProps = {
  unlocked: boolean;
  result: ReturnType<typeof calculate>;
  platformLabel: string;
  submitState: SubmitState;
  email: string;
  name: string;
  company: string;
  setEmail: (v: string) => void;
  setName: (v: string) => void;
  setCompany: (v: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  idPrefix: string;
  gateLevel: GateLevel;
};

function GatedDetail({
  unlocked,
  result,
  platformLabel,
  submitState,
  email,
  name,
  company,
  setEmail,
  setName,
  setCompany,
  onSubmit,
  idPrefix,
  gateLevel,
}: GatedDetailProps) {
  const gateBreakdown = gateLevel === "full" && !unlocked;
  const gateAutomations = !unlocked;

  // Full-gate behaviour: single blur surface covering breakdown + automations,
  // email card floats in the centre. Kept intact so /cost-of-inaction and the
  // /platforms index render exactly as before.
  if (gateLevel === "full") {
    return (
      <div className="relative">
        <div
          className={cn(
            "flex flex-col gap-6 transition-[filter,opacity] duration-500",
            gateBreakdown && "blur-[6px] select-none",
          )}
          aria-hidden={gateBreakdown}
          inert={gateBreakdown}
        >
          <BreakdownList result={result} />
          <AutomationsList automations={result.automations} />
        </div>

        {!unlocked ? (
          <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
            <EmailGateCard
              state={submitState}
              email={email}
              name={name}
              company={company}
              setEmail={setEmail}
              setName={setName}
              setCompany={setCompany}
              onSubmit={onSubmit}
              idPrefix={idPrefix}
              platformLabel={platformLabel}
            />
          </div>
        ) : null}
      </div>
    );
  }

  // Light-gate behaviour (platform hub embeds): breakdown is always readable,
  // only the automations deep dive + emailed PDF sits behind the email gate.
  return (
    <div className="flex flex-col gap-6">
      <BreakdownList result={result} />

      <div className="relative">
        <div
          className={cn(
            "transition-[filter,opacity] duration-500",
            gateAutomations && "blur-[6px] select-none",
          )}
          aria-hidden={gateAutomations}
          inert={gateAutomations}
        >
          <AutomationsList automations={result.automations} />
        </div>

        {!unlocked ? (
          <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
            <EmailGateCard
              state={submitState}
              email={email}
              name={name}
              company={company}
              setEmail={setEmail}
              setName={setName}
              setCompany={setCompany}
              onSubmit={onSubmit}
              idPrefix={idPrefix}
              platformLabel={platformLabel}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function BreakdownList({
  result,
}: {
  result: ReturnType<typeof calculate>;
}) {
  const items = [
    { label: "Manual invoice processing", value: result.breakdown.manualAp },
    { label: "Month-end close drag", value: result.breakdown.closeDrag },
    { label: "Data entry errors and rework", value: result.breakdown.rework },
    { label: "Burnout and turnover risk", value: result.breakdown.burnout },
  ].filter((i) => i.value > 0);

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
        Where the waste lives
      </p>
      <ul className="mt-3 divide-y divide-line-soft rounded-xl border border-line bg-surface">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-baseline justify-between gap-4 px-4 py-3"
          >
            <span className="text-sm text-ink-soft">{item.label}</span>
            <span className="font-display text-base font-semibold text-ink numeric tabular-nums">
              {formatAud(item.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AutomationsList({
  automations,
}: {
  automations: AutomationRecommendation[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
        Top three automations for your stack
      </p>
      <ul className="mt-3 space-y-3">
        {automations.map((a) => (
          <AutomationRow key={a.id} automation={a} />
        ))}
      </ul>
    </div>
  );
}

function AutomationRow({
  automation,
}: {
  automation: AutomationRecommendation;
}) {
  return (
    <li className="rounded-xl border border-line bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold leading-snug text-ink">
          {automation.name}
        </p>
        <span className="shrink-0 rounded-full bg-[color:var(--ordron-amber)]/15 px-2.5 py-1 text-xs font-semibold text-[color:#9B6A10] numeric tabular-nums">
          {automation.hoursSavedWeekly} hrs/wk
        </span>
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
        {automation.blurb}
      </p>
    </li>
  );
}

function EligibilityNote({ inputs }: { inputs: CalculatorInputs }) {
  if (inputs.weeklyInvoices * ASSUMPTIONS.minutesPerInvoice < 600) {
    return (
      <>
        {" "}Below ten manual AP hours per week we drop the burnout premium,
        which is why the total might look lower than you expect.
      </>
    );
  }
  return null;
}

/* ------------------------------------------------------- Email gate (card) */

type EmailGateProps = {
  state: SubmitState;
  email: string;
  name: string;
  company: string;
  setEmail: (v: string) => void;
  setName: (v: string) => void;
  setCompany: (v: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  idPrefix: string;
  platformLabel: string;
};

function EmailGateCard({
  state,
  email,
  name,
  company,
  setEmail,
  setName,
  setCompany,
  onSubmit,
  idPrefix,
  platformLabel,
}: EmailGateProps) {
  const formRef = useRef<HTMLFormElement>(null);

  // Stop the inert blurred content from swallowing clicks that should
  // reach the floating form.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const stop = (e: Event) => e.stopPropagation();
    form.addEventListener("click", stop);
    return () => form.removeEventListener("click", stop);
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className={cn(
        "w-full max-w-md rounded-2xl border border-line bg-surface p-5 shadow-float",
        "sm:p-6 animate-hc-pop",
      )}
    >
      <div className="flex items-center gap-2.5">
        <LockGlyph />
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ordron-blue-deep)]">
          Unlock your breakdown
        </p>
      </div>
      <p className="mt-3 text-base font-display font-semibold leading-snug text-ink">
        See every line, plus the prioritised roadmap for {platformLabel}.
      </p>
      <p className="mt-2 text-xs leading-relaxed text-ink-muted">
        One email. Unsubscribes in a click. You keep the report either way.
      </p>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-10 rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:border-ink focus:outline-none"
          aria-label="Your name"
          id={`${idPrefix}-name`}
          autoComplete="given-name"
        />
        <input
          type="text"
          placeholder="Company (optional)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="h-10 rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:border-ink focus:outline-none"
          aria-label="Your company"
          id={`${idPrefix}-company`}
          autoComplete="organization"
        />
      </div>
      <div className="mt-2.5 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          required
          placeholder="you@company.com.au"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 flex-1 rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:border-ink focus:outline-none"
          aria-label="Work email"
          id={`${idPrefix}-email`}
          autoComplete="email"
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={state.status === "submitting"}
          className="sm:w-auto"
        >
          {state.status === "submitting" ? "Unlocking..." : "Unlock"}
        </Button>
      </div>
      {state.status === "error" ? (
        <p className="mt-2 text-xs font-semibold text-[color:#b23a2f]">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}

function LockGlyph() {
  return (
    <span
      aria-hidden
      className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[color:var(--ordron-blue)]/12 text-[color:var(--ordron-blue-deep)]"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect
          x="2.5"
          y="6"
          width="9"
          height="6.5"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M4.5 6V4.5a2.5 2.5 0 0 1 5 0V6"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    </span>
  );
}
