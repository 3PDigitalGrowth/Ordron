"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useHealthCheckDialog } from "@/components/health-check/health-check-dialog";
import {
  MAX_SCORE,
  questions,
  pillars,
  pillarAutomations,
  estimatedAnnualWaste,
  scoreAnswers,
  type PillarId,
  type ScorecardResult,
} from "@/lib/scorecard";

type Stage = "intro" | "question" | "result";

type UnlockState = "locked" | "submitting" | "unlocked" | "error";

/*
  Inline Ordron Finance Automation Health Check Scorecard.

  UX intent (per the strategy doc and client brief):
    - 10 questions, one at a time, to keep cognitive load low
    - Result is shown in two parts:
        1. Visible: overall band + score + per-pillar bars
        2. Blurred until email unlock: pillar commentary, automation
           candidates, indicative annual waste, personalised next step
    - The unlocked block clarifies the problem; it does not solve it.
      The prioritised roadmap is explicitly deferred to the Health Check.
*/

export function Scorecard() {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [unlock, setUnlock] = useState<UnlockState>("locked");
  const topRef = useRef<HTMLDivElement | null>(null);
  const advanceTimer = useRef<number | null>(null);

  const total = Object.keys(answers).length;
  const progress = Math.round((total / questions.length) * 100);

  const result = useMemo<ScorecardResult | null>(() => {
    if (total !== questions.length) return null;
    return scoreAnswers(answers);
  }, [answers, total]);

  const scrollToTop = useCallback(() => {
    if (!topRef.current) return;
    const y = topRef.current.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const cancelPendingAdvance = useCallback(() => {
    if (advanceTimer.current !== null) {
      window.clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  }, []);

  const goNext = useCallback(() => {
    cancelPendingAdvance();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      return;
    }
    setStage("result");
    requestAnimationFrame(scrollToTop);
  }, [currentIndex, scrollToTop, cancelPendingAdvance]);

  const goBack = useCallback(() => {
    cancelPendingAdvance();
    setCurrentIndex((i) => Math.max(0, i - 1));
  }, [cancelPendingAdvance]);

  /*
    Auto-advance on selection. Small delay so the user sees the option
    fill in and register before the view changes. If they re-click or
    change their mind within the delay window we cancel and restart.
  */
  const handleAnswer = useCallback(
    (questionId: number, score: number) => {
      setAnswers((prev) => ({ ...prev, [questionId]: score }));
      cancelPendingAdvance();
      advanceTimer.current = window.setTimeout(() => {
        advanceTimer.current = null;
        goNext();
      }, 280);
    },
    [goNext, cancelPendingAdvance],
  );

  const handleStart = useCallback(() => {
    cancelPendingAdvance();
    setAnswers({});
    setCurrentIndex(0);
    setStage("question");
    setUnlock("locked");
    requestAnimationFrame(scrollToTop);
  }, [scrollToTop, cancelPendingAdvance]);

  const handleReset = useCallback(() => {
    handleStart();
  }, [handleStart]);

  useEffect(() => {
    return () => {
      if (advanceTimer.current !== null) {
        window.clearTimeout(advanceTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    if (stage !== "question") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && answers[questions[currentIndex].id] !== undefined) {
        goNext();
      }
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        goBack();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [stage, currentIndex, answers, goNext, goBack]);

  return (
    <div ref={topRef} className="relative scroll-mt-28">
      {stage === "intro" && <Intro onStart={handleStart} />}
      {stage === "question" && (
        <QuestionStep
          currentIndex={currentIndex}
          answers={answers}
          progress={progress}
          onAnswer={handleAnswer}
          onBack={goBack}
        />
      )}
      {stage === "result" && result && (
        <Result
          result={result}
          unlock={unlock}
          setUnlock={setUnlock}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- Intro */

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="rounded-[28px] border border-line bg-surface p-8 shadow-soft sm:p-12">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="max-w-xl">
          <p className="eyebrow">Before you start</p>
          <h2 className="mt-4 text-balance">
            10 questions. 5 minutes. A clear read on where your finance hours
            are going.
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
            Answer honestly. There are no right answers, only the ones that
            match what your team actually does this week. You will see your
            overall band and a breakdown by pillar straight away.
          </p>
        </div>

        <div className="flex divide-x divide-line-soft rounded-2xl border border-line-soft bg-surface-2 p-2 text-center sm:p-3">
          {[
            { v: "10", l: "Questions" },
            { v: "5", l: "Minutes" },
            { v: "4", l: "Pillars" },
          ].map((s) => (
            <div key={s.l} className="min-w-[92px] px-4 py-1 sm:min-w-[104px]">
              <p className="font-display text-3xl font-semibold leading-none text-ink numeric sm:text-4xl">
                {s.v}
              </p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onStart}
          className="inline-flex h-13 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#00ABFF] px-8 text-base font-semibold tracking-tight text-white shadow-ink transition-all duration-200 hover:-translate-y-px hover:bg-[#0096e0] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"
        >
          Start the Scorecard
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
            <path
              d="M3.5 9h11m0 0-4-4m4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </button>
        <p className="text-sm text-ink-muted">
          No sign-up to start. You only enter your email at the end, and only
          if you want the full breakdown.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- Question step */

function QuestionStep({
  currentIndex,
  answers,
  progress,
  onAnswer,
  onBack,
}: {
  currentIndex: number;
  answers: Record<number, number>;
  progress: number;
  onAnswer: (questionId: number, score: number) => void;
  onBack: () => void;
}) {
  const question = questions[currentIndex];
  const pillar = pillars[question.pillar];
  const selected = answers[question.id];
  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="rounded-[28px] border border-line bg-surface p-6 shadow-soft sm:p-10">
      <ProgressBar
        progress={progress}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
      />

      <div className="mt-8 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-deep">
          {pillar.label}
        </p>
        <p className="font-display text-sm font-semibold text-ink-muted numeric">
          {String(currentIndex + 1).padStart(2, "0")}{" "}
          <span className="text-ink-faint">
            / {String(questions.length).padStart(2, "0")}
          </span>
        </p>
      </div>

      <h3 className="mt-4 text-pretty text-2xl font-semibold leading-tight text-ink sm:text-[28px]">
        {question.prompt}
      </h3>
      {question.helperText && (
        <p className="mt-3 text-[15px] text-ink-muted">{question.helperText}</p>
      )}

      <fieldset className="mt-7 space-y-3">
        <legend className="sr-only">{question.prompt}</legend>
        {question.options.map((option, i) => {
          const active = selected === option.score;
          return (
            <label
              key={`${question.id}-${i}`}
              className={cn(
                "group flex cursor-pointer items-center gap-4 rounded-2xl border bg-surface p-4 transition-all",
                active
                  ? "border-[color:var(--ordron-blue)] bg-[color:var(--ordron-blue)]/[0.06] shadow-soft"
                  : "border-line hover:border-[color:var(--ordron-blue)]/40 hover:bg-surface-2",
              )}
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                value={option.score}
                checked={active}
                onChange={() => onAnswer(question.id, option.score)}
                className="sr-only"
              />
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors",
                  active
                    ? "border-[color:var(--ordron-blue)] bg-[color:var(--ordron-blue)]"
                    : "border-ink-faint/40 bg-surface group-hover:border-[color:var(--ordron-blue)]/60",
                )}
              >
                {active && (
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <path
                      d="m2 6 2.75 2.75L10 3.5"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                )}
              </span>
              <span className="flex-1 text-[15.5px] font-medium text-ink">
                {option.label}
              </span>
              <span
                className={cn(
                  "hidden shrink-0 text-xs font-semibold uppercase tracking-[0.14em] sm:block",
                  active ? "text-brand-deep" : "text-ink-faint",
                )}
              >
                {option.score === 0
                  ? "Low friction"
                  : option.score === 4
                    ? "Severe friction"
                    : `+${option.score}`}
              </span>
            </label>
          );
        })}
      </fieldset>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-line-soft pt-5">
        <button
          type="button"
          onClick={onBack}
          disabled={currentIndex === 0}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-ink/10 px-5 text-sm font-semibold text-ink transition-colors hover:bg-ink/5 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <path
              d="M9 3 5 7l4 4"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          Previous
        </button>
        <p className="text-xs text-ink-faint sm:text-sm">
          {selected === undefined
            ? isLast
              ? "Pick an option to see your result"
              : "Pick an option to continue"
            : isLast
              ? "Scoring your result..."
              : "Moving on..."}
        </p>
      </div>
    </div>
  );
}

function ProgressBar({
  progress,
  currentIndex,
  totalQuestions,
}: {
  progress: number;
  currentIndex: number;
  totalQuestions: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
        <span>Scorecard progress</span>
        <span className="numeric text-ink">
          {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
        </span>
      </div>
      <div
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-[color:var(--ordron-blue)] transition-[width] duration-500"
          style={{
            width: `${Math.max(progress, ((currentIndex + 1) / totalQuestions) * 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Result */

const bandToneMap: Record<
  ScorecardResult["band"]["tone"],
  {
    ring: string;
    chip: string;
    bar: string;
    wash: string;
  }
> = {
  positive: {
    ring: "stroke-[color:var(--ordron-teal)]",
    chip: "bg-[color:var(--ordron-mint)] text-[color:#0B5246]",
    bar: "bg-[color:var(--ordron-teal)]",
    wash: "from-[color:var(--ordron-mint)] to-white",
  },
  neutral: {
    ring: "stroke-[color:var(--ordron-blue)]",
    chip: "bg-[color:var(--ordron-blue)]/10 text-[color:var(--ordron-blue-deep)]",
    bar: "bg-[color:var(--ordron-blue)]",
    wash: "from-[color:var(--ordron-blue)]/10 to-white",
  },
  warning: {
    ring: "stroke-[color:var(--ordron-amber)]",
    chip: "bg-[color:var(--ordron-amber)]/20 text-[color:#7A4A0A]",
    bar: "bg-[color:var(--ordron-amber)]",
    wash: "from-[color:var(--ordron-amber)]/20 to-white",
  },
  urgent: {
    ring: "stroke-[color:#E26A3B]",
    chip: "bg-[color:#FDECE4] text-[color:#8A2D06]",
    bar: "bg-[color:#E26A3B]",
    wash: "from-[color:#FDECE4] to-white",
  },
};

function Result({
  result,
  unlock,
  setUnlock,
  onReset,
}: {
  result: ScorecardResult;
  unlock: UnlockState;
  setUnlock: (s: UnlockState) => void;
  onReset: () => void;
}) {
  const tone = bandToneMap[result.band.tone];
  const unlocked = unlock === "unlocked";
  const { open: openHealthCheck } = useHealthCheckDialog();

  return (
    <div className="flex flex-col gap-6">
      {/* Visible summary */}
      <div
        className={cn(
          "rounded-[28px] border border-line bg-gradient-to-b p-8 shadow-soft sm:p-12",
          tone.wash,
        )}
      >
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,220px)_1fr] lg:gap-14">
          <ScoreRing
            total={result.total}
            max={MAX_SCORE}
            ringClassName={tone.ring}
          />

          <div>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
                tone.chip,
              )}
            >
              {result.band.shortLabel}
            </span>
            <h2 className="mt-4 text-balance text-[clamp(1.625rem,2.6vw,2.125rem)] leading-tight">
              {result.band.headline}
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
              {result.band.summary}
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-line-soft pt-8">
          <div className="flex items-baseline justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Friction by pillar
            </p>
            <p className="text-xs text-ink-faint">Higher % means more friction</p>
          </div>

          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {result.pillarScores.map((p) => (
              <li
                key={p.pillar.id}
                className="rounded-2xl border border-line bg-surface p-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-display text-[15px] font-semibold text-ink">
                    {p.pillar.short}
                  </p>
                  <p className="font-display text-xl font-semibold text-ink numeric">
                    {p.percentage}%
                  </p>
                </div>
                <PillarBarRow percentage={p.percentage} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Blurred unlock */}
      <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface shadow-soft">
        <div
          className={cn(
            "p-8 transition-[filter,opacity] duration-500 sm:p-12",
            !unlocked && "select-none pointer-events-none",
          )}
          style={
            !unlocked
              ? {
                  filter: "blur(7px) saturate(0.95)",
                  opacity: 0.88,
                }
              : undefined
          }
          aria-hidden={!unlocked}
        >
          <UnlockedReport result={result} tone={tone} />
        </div>

        {!unlocked && (
          <UnlockOverlay
            result={result}
            unlock={unlock}
            setUnlock={setUnlock}
          />
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <path
              d="M2 7a5 5 0 0 1 9-3M12 7a5 5 0 0 1-9 3M11 1v3h-3M3 13v-3h3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          Retake the Scorecard
        </button>
        <button
          type="button"
          onClick={() => openHealthCheck("scorecard-result")}
          className="inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#00ABFF] px-8 text-base font-semibold tracking-tight text-white shadow-ink transition-all duration-200 hover:-translate-y-px hover:bg-[#0096e0] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"
        >
          Book your Health Check
        </button>
      </div>
    </div>
  );
}

function PillarBarRow({ percentage }: { percentage: number }) {
  const tone =
    percentage < 33
      ? "bg-[color:var(--ordron-teal)]"
      : percentage < 66
        ? "bg-[color:var(--ordron-blue)]"
        : percentage < 85
          ? "bg-[color:var(--ordron-amber)]"
          : "bg-[color:#E26A3B]";
  return (
    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-line">
      <div
        className={cn("h-full rounded-full transition-[width] duration-700", tone)}
        style={{ width: `${Math.max(percentage, 4)}%` }}
      />
    </div>
  );
}

function ScoreRing({
  total,
  max,
  ringClassName,
}: {
  total: number;
  max: number;
  ringClassName: string;
}) {
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(total / max, 1);
  const dash = circumference * progress;

  return (
    <div className="relative mx-auto h-[220px] w-[220px] shrink-0">
      <svg
        width="220"
        height="220"
        viewBox="0 0 220 220"
        className="-rotate-90"
      >
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="var(--ordron-line)"
          strokeWidth="10"
        />
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          className={ringClassName}
          strokeDasharray={`${dash} ${circumference}`}
          style={{ transition: "stroke-dasharray 900ms ease-out" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Your score
          </p>
          <p className="mt-1 font-display text-6xl font-semibold text-ink numeric leading-none">
            {total}
          </p>
          <p className="mt-1 text-sm text-ink-muted numeric">out of {max}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- Unlocked view */

function UnlockedReport({
  result,
  tone,
}: {
  result: ScorecardResult;
  tone: (typeof bandToneMap)[keyof typeof bandToneMap];
}) {
  const topPillars = [...result.pillarScores]
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);
  const { open: openHealthCheck } = useHealthCheckDialog();

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-deep">
        Your full breakdown
      </p>
      <h3 className="mt-3 text-pretty text-2xl leading-tight sm:text-[28px]">
        Where the Scorecard says your finance team is losing the most time.
      </h3>
      <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-ink-soft">
        Based on your answers, these are the three pillars with the most
        friction. Each pillar lists the automations Ordron most commonly builds
        to address it. The full prioritised roadmap, indicative savings and
        build sequence come from the Health Check.
      </p>

      <ul className="mt-8 space-y-5">
        {topPillars.map((p, index) => {
          const automations = pillarAutomations[p.pillar.id as PillarId];
          return (
            <li
              key={p.pillar.id}
              className="rounded-2xl border border-line bg-surface-2 p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Focus area {index + 1}
                  </p>
                  <p className="mt-2 font-display text-xl font-semibold text-ink">
                    {p.pillar.label}
                  </p>
                  <p className="mt-1.5 text-[14.5px] text-ink-soft">
                    {p.pillar.description}
                  </p>
                </div>
                <p
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1 font-display text-sm font-semibold",
                    tone.chip,
                  )}
                >
                  {p.percentage}% friction
                </p>
              </div>

              <div className="mt-5 border-t border-line-soft pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Automations commonly used to address this
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {automations.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-2.5 text-[14.5px] text-ink-soft"
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
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 grid gap-5 rounded-2xl bg-ink p-7 text-white sm:grid-cols-[1fr_auto] sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60">
            Indicative annual waste range
          </p>
          <p className="mt-2 font-display text-4xl font-semibold text-white numeric">
            {estimatedAnnualWaste(result.total)}
          </p>
          <p className="mt-2 text-sm text-white/72">
            An order-of-magnitude estimate based on your score. Your Health
            Check produces the real number.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openHealthCheck("scorecard-unlocked")}
          className="inline-flex h-13 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-7 text-base font-semibold text-ink transition-all duration-200 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"
        >
          Book your Health Check
        </button>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- Unlock overlay */

function UnlockOverlay({
  result,
  unlock,
  setUnlock,
}: {
  result: ScorecardResult;
  unlock: UnlockState;
  setUnlock: (s: UnlockState) => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setUnlock("submitting");
    try {
      const res = await fetch("/api/scorecard-unlock", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          company,
          total: result.total,
          band: result.band.id,
          pillars: result.pillarScores.map((p) => ({
            id: p.pillar.id,
            raw: p.raw,
            percentage: p.percentage,
          })),
        }),
      });
      if (!res.ok) throw new Error("request-failed");
      setUnlock("unlocked");
    } catch {
      setError("Something went wrong. Please try again.");
      setUnlock("error");
    }
  };

  return (
    <div className="absolute inset-0 grid place-items-center p-6 sm:p-10">
      <div className="w-full max-w-lg rounded-[24px] border border-line bg-surface p-7 shadow-ink sm:p-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--ordron-blue)]/10 text-brand-deep">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
              <path
                d="M3 6V5a4 4 0 1 1 8 0v1M2.5 6h9V15h-9V6Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Full breakdown locked
            </p>
            <p className="font-display text-lg font-semibold text-ink">
              Unlock your pillar-by-pillar summary
            </p>
          </div>
        </div>

        <form className="mt-6 space-y-3" onSubmit={handleSubmit} noValidate>
          <Field
            id="sc-name"
            label="First name"
            value={name}
            onChange={setName}
            placeholder="Aana"
            autoComplete="given-name"
          />
          <Field
            id="sc-company"
            label="Company"
            value={company}
            onChange={setCompany}
            placeholder="Ordron"
            autoComplete="organization"
          />
          <Field
            id="sc-email"
            label="Work email"
            value={email}
            onChange={setEmail}
            placeholder="you@company.com.au"
            type="email"
            required
            autoComplete="email"
          />

          {error && (
            <p className="text-sm text-[color:#8A2D06]" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={unlock === "submitting"}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#00ABFF] px-6 text-base font-semibold text-white shadow-ink transition-all duration-200 hover:-translate-y-px hover:bg-[#0096e0] disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"
          >
            {unlock === "submitting" ? "Unlocking..." : "Unlock my full result"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-ink-muted">
          One email with your result. No sales call, no list sharing. Unsubscribe any time.
        </p>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
        {label}
        {required && <span className="text-[color:#E26A3B]"> *</span>}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5 block h-11 w-full rounded-xl border border-line bg-surface px-4 text-[15px] text-ink placeholder:text-ink-faint focus:border-[color:var(--ordron-blue)] focus:outline-2 focus:outline-offset-2 focus:outline-brand"
      />
    </label>
  );
}
