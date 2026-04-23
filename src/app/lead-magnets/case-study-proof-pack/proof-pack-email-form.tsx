"use client";

import { useState, type FormEvent } from "react";

/**
 * Placeholder email capture for the proof pack.
 *
 * Block 6 will replace this with a real ESP-backed handler and a gated
 * PDF download. For now it just acknowledges the submission client-side
 * so the CTA in the Results mega-menu resolves to something useful
 * instead of a 404.
 */
export function ProofPackEmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xl border border-teal/30 bg-teal/5 p-5"
      >
        <p className="font-display text-[15px] font-semibold text-ink">
          You&apos;re on the list.
        </p>
        <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">
          The proof pack will land at{" "}
          <span className="font-medium text-ink">{email}</span> as soon as it
          ships. You can close this tab.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="proof-pack-email" className="sr-only">
        Work email
      </label>
      <input
        id="proof-pack-email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@company.com.au"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 flex-1 rounded-full border border-line bg-surface px-5 text-[15px] text-ink placeholder:text-ink-faint focus:border-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/40"
      />
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center rounded-full bg-teal px-6 text-[14px] font-semibold text-white transition-colors hover:bg-teal/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
      >
        Notify me when it&apos;s ready
      </button>
    </form>
  );
}
