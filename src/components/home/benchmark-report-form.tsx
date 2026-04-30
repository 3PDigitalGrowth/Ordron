"use client";

import { useState, type FormEvent } from "react";

type BenchmarkMode = "early-access" | "live";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; email: string }
  | { status: "error"; message: string };

const roleOptions = [
  "CFO / Finance Director",
  "Finance Manager / Controller",
  "Business Owner / Practice Principal",
  "Other",
] as const;

export function BenchmarkReportForm({ mode }: { mode: BenchmarkMode }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<(typeof roleOptions)[number]>(
    roleOptions[0],
  );
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.status === "submitting") return;

    setState({ status: "submitting" });

    try {
      const response = await fetch("/api/lead-magnet-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          magnetId: "benchmark-2026",
          email,
          role,
          source: `homepage-benchmark-${mode}`,
        }),
      });

      if (!response.ok) {
        setState({
          status: "error",
          message: "That did not go through. Try again in a moment.",
        });
        return;
      }

      setState({ status: "success", email });
    } catch {
      setState({
        status: "error",
        message: "Network hiccup. Try again in a moment.",
      });
    }
  }

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-teal/30 bg-teal/5 p-5"
      >
        <p className="font-display text-base font-semibold text-ink">
          You&apos;re on the list.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          We&apos;ll send the benchmark report to{" "}
          <span className="font-semibold text-ink">{state.email}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_240px]">
        <label htmlFor="benchmark-email" className="sr-only">
          Work email
        </label>
        <input
          id="benchmark-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com.au"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-12 rounded-full border border-line bg-surface px-5 text-[15px] text-ink placeholder:text-ink-faint focus:border-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40"
        />

        <label htmlFor="benchmark-role" className="sr-only">
          Your role
        </label>
        <select
          id="benchmark-role"
          value={role}
          onChange={(event) =>
            setRole(event.target.value as (typeof roleOptions)[number])
          }
          className="h-12 rounded-full border border-line bg-surface px-5 text-[15px] text-ink focus:border-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40"
        >
          {roleOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#00ABFF] px-6 text-[14px] font-semibold text-white shadow-ink transition-colors hover:bg-[#0096e0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
      >
        {state.status === "submitting"
          ? "Sending..."
          : mode === "live"
            ? "Send me the Benchmark Report"
            : "Register for early access"}
      </button>

      <p className="text-xs leading-relaxed text-ink-muted">
        One email. Delivered as a PDF. Unsubscribes in a click.
      </p>

      {state.status === "error" ? (
        <p className="text-xs font-semibold text-[color:#b23a2f]">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
