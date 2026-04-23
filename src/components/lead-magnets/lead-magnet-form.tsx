"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { LeadMagnet } from "@/lib/lead-magnets";

type Props = {
  magnet: LeadMagnet;
  source: string;
  layout?: "inline" | "stacked";
  className?: string;
};

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string; href?: string }
  | { status: "error"; message: string };

/**
 * Thin client form that POSTs to /api/lead-magnet-request and renders
 * the correct success state for the three delivery modes. All three
 * presentation components wrap this.
 */
export function LeadMagnetForm({
  magnet,
  source,
  layout = "inline",
  className,
}: Props) {
  const baseId = useId();
  const id = (suffix: string) => `${baseId}-${suffix}`;

  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.status === "submitting") return;

    setState({ status: "submitting" });

    try {
      const res = await fetch("/api/lead-magnet-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          magnetId: magnet.id,
          email: email.trim(),
          name: name.trim() || null,
          company: company.trim() || null,
          source,
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setState({
          status: "error",
          message:
            data?.error === "invalid-email"
              ? "That email does not look right. Try again?"
              : data?.error === "company-required"
                ? "Company name is required for this one."
                : "Something went wrong. Try again in a moment?",
        });
        return;
      }

      const data = (await res.json()) as {
        delivery:
          | { mode: "instant"; downloadUrl: string }
          | { mode: "emailed" }
          | { mode: "on-site"; href: string };
      };

      if (data.delivery.mode === "instant") {
        setState({
          status: "success",
          message: "Your download is ready.",
          href: data.delivery.downloadUrl,
        });
      } else if (data.delivery.mode === "on-site") {
        setState({
          status: "success",
          message: "Opening now.",
          href: data.delivery.href,
        });
      } else {
        setState({
          status: "success",
          message: "Check your inbox in the next sixty seconds.",
        });
      }
    } catch {
      setState({
        status: "error",
        message: "Network hiccup. Try again in a moment?",
      });
    }
  }

  if (state.status === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-[color:var(--ordron-teal)]/25 bg-[color:var(--ordron-mint)]/60 p-5 text-sm text-ink",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <p className="font-display text-base font-semibold text-ink">
          {state.message}
        </p>
        {state.href ? (
          <Link
            href={state.href}
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--ordron-blue-deep)] hover:underline"
          >
            Open {magnet.formatLabel.toLowerCase()}
            <span aria-hidden>→</span>
          </Link>
        ) : (
          <p className="mt-1 text-ink-soft">
            We send from hello@ordron.com. Unsubscribe in one click.
          </p>
        )}
      </div>
    );
  }

  const isInline = layout === "inline";

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-2.5", className)}
      noValidate
    >
      <div
        className={cn(
          "grid gap-2.5",
          isInline ? "sm:grid-cols-2" : "sm:grid-cols-1",
        )}
      >
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11 rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:border-ink focus:outline-none"
          aria-label="Your name"
          id={id("name")}
          autoComplete="given-name"
        />
        <input
          type="text"
          placeholder={
            magnet.requireCompany ? "Company (required)" : "Company (optional)"
          }
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required={magnet.requireCompany}
          className="h-11 rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:border-ink focus:outline-none"
          aria-label="Your company"
          id={id("company")}
          autoComplete="organization"
        />
      </div>
      <div
        className={cn(
          "flex flex-col gap-2",
          isInline ? "sm:flex-row" : "sm:flex-col",
        )}
      >
        <input
          type="email"
          required
          placeholder="you@company.com.au"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 flex-1 rounded-lg border border-line bg-surface px-4 text-[15px] text-ink focus:border-ink focus:outline-none"
          aria-label="Work email"
          id={id("email")}
          autoComplete="email"
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={state.status === "submitting"}
          className={isInline ? "sm:w-auto" : ""}
        >
          {state.status === "submitting" ? "Sending..." : magnet.ctaLabel}
        </Button>
      </div>
      {state.status === "error" ? (
        <p className="text-xs font-semibold text-[color:#b23a2f]" role="alert">
          {state.message}
        </p>
      ) : (
        <p className="text-xs leading-relaxed text-ink-muted">
          One email. Unsubscribes in one click. No sales call, no drip
          sequence unless you ask for it.
        </p>
      )}
    </form>
  );
}
