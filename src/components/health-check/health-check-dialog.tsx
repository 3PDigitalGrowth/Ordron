"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/*
  Health Check booking dialog.

  One modal, one provider, one hook. The modal is mounted once near the
  root so any "Book a Health Check" CTA can trigger it via
  useHealthCheckDialog().open(). The client never renders an email link
  or a dead route; the form is the destination.

  On submit we POST to /api/health-check-booking, which logs the booking
  to a JSONL file while the site is pre-launch. Resend (or whichever ESP
  the client picks) is wired in behind that route once we're done.
*/

type SubmitState = "idle" | "submitting" | "success" | "error";

type HealthCheckContextValue = {
  open: (source?: string) => void;
  close: () => void;
};

const HealthCheckDialogContext = createContext<HealthCheckContextValue | null>(
  null,
);

export function useHealthCheckDialog() {
  const ctx = useContext(HealthCheckDialogContext);
  if (!ctx) {
    throw new Error(
      "useHealthCheckDialog must be used inside <HealthCheckDialogProvider>",
    );
  }
  return ctx;
}

export function HealthCheckDialogProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | undefined>();

  const open = useCallback((src?: string) => {
    setSource(src);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<HealthCheckContextValue>(
    () => ({ open, close }),
    [open, close],
  );

  return (
    <HealthCheckDialogContext.Provider value={value}>
      {children}
      <HealthCheckDialog isOpen={isOpen} onClose={close} source={source} />
    </HealthCheckDialogContext.Provider>
  );
}

/* ------------------------------------------------------------ Dialog shell */

function HealthCheckDialog({
  isOpen,
  onClose,
  source,
}: {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}) {
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const { documentElement, body } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;
    const firstFocusable = dialogRef.current.querySelector<HTMLElement>(
      "[data-autofocus]",
    );
    firstFocusable?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/60 backdrop-blur-sm animate-hc-fade"
      />
      <div
        ref={dialogRef}
        className="relative z-10 flex max-h-[92vh] w-full max-w-[560px] flex-col overflow-hidden rounded-t-[28px] bg-surface shadow-ink sm:rounded-[28px] animate-hc-pop"
      >
        <DialogHeader titleId={titleId} descId={descId} onClose={onClose} />
        <div className="flex-1 overflow-y-auto">
          <HealthCheckForm source={source} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}

function DialogHeader({
  titleId,
  descId,
  onClose,
}: {
  titleId: string;
  descId: string;
  onClose: () => void;
}) {
  return (
    <div className="relative border-b border-line bg-gradient-to-b from-[color:var(--ordron-mint)] to-surface px-7 pt-7 pb-6 sm:px-9 sm:pt-9">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-deep">
        The Ordron Health Check
      </p>
      <h2 id={titleId} className="mt-2 font-display text-[26px] font-semibold leading-tight text-ink sm:text-[28px]">
        Book your Health Check.
      </h2>
      <p id={descId} className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
        60 minutes of workflow mapping, a written report within 48 hours,
        and a prioritised automation roadmap. Fixed scope, no obligation to
        proceed afterwards.
      </p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-white/70 text-ink transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
          <path
            d="m3 3 8 8M11 3l-8 8"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}

/* -------------------------------------------------------------- Form body */

const roles = [
  "CFO / Finance Director",
  "Head of Finance / Financial Controller",
  "Finance Manager",
  "Founder / CEO / Managing Director",
  "Operations / COO",
  "Other",
];

const revenueBands = [
  "Under $5M",
  "$5M to $10M",
  "$10M to $25M",
  "$25M to $50M",
  "$50M to $100M",
  "$100M+",
];

const platforms = [
  "Xero",
  "MYOB",
  "NetSuite",
  "SAP",
  "Microsoft Dynamics 365",
  "QuickBooks",
  "Sage Intacct",
  "Oracle",
  "Other / Mixed",
];

const windows = [
  "ASAP (this week)",
  "Within 2 weeks",
  "Within a month",
  "Just exploring",
];

type FormState = {
  name: string;
  workEmail: string;
  phone: string;
  company: string;
  role: string;
  revenue: string;
  platform: string;
  pain: string;
  window: string;
};

const EMPTY: FormState = {
  name: "",
  workEmail: "",
  phone: "",
  company: "",
  role: "",
  revenue: "",
  platform: "",
  pain: "",
  window: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function HealthCheckForm({
  source,
  onClose,
}: {
  source?: string;
  onClose: () => void;
}) {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [state, setState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const setField = <K extends keyof FormState>(key: K) =>
    (v: FormState[K]) => {
      setValues((prev) => ({ ...prev, [key]: v }));
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(values.workEmail.trim())) {
      next.workEmail = "Please enter a valid work email.";
    }
    if (!values.company.trim()) next.company = "Please enter your company.";
    if (!values.role) next.role = "Pick the option that best describes you.";
    if (!values.revenue) next.revenue = "Select the closest revenue band.";
    if (!values.pain.trim() || values.pain.trim().length < 10) {
      next.pain = "Even a sentence helps. What's chewing the most time?";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setState("submitting");
    try {
      const res = await fetch("/api/health-check-booking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...values,
          name: values.name.trim(),
          workEmail: values.workEmail.trim(),
          phone: values.phone.trim() || null,
          company: values.company.trim(),
          pain: values.pain.trim(),
          source: source ?? "unknown",
        }),
      });
      if (!res.ok) throw new Error("request-failed");
      setState("success");
    } catch {
      setState("error");
      setSubmitError(
        "Something went wrong sending that. Try again, or email hello@ordron.com directly.",
      );
    }
  };

  if (state === "success") {
    return <SuccessPanel values={values} onClose={onClose} />;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="px-7 pb-8 pt-7 sm:px-9 sm:pb-10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Your name"
          value={values.name}
          onChange={setField("name")}
          placeholder="Aana Mahajan"
          autoComplete="name"
          error={errors.name}
          required
          autoFocus
        />
        <Field
          label="Work email"
          type="email"
          value={values.workEmail}
          onChange={setField("workEmail")}
          placeholder="you@company.com.au"
          autoComplete="email"
          error={errors.workEmail}
          required
        />
        <Field
          label="Company"
          value={values.company}
          onChange={setField("company")}
          placeholder="Ordron Pty Ltd"
          autoComplete="organization"
          error={errors.company}
          required
        />
        <Field
          label="Phone (optional)"
          value={values.phone}
          onChange={setField("phone")}
          placeholder="04xx xxx xxx"
          autoComplete="tel"
        />
        <Select
          label="Your role"
          value={values.role}
          onChange={setField("role")}
          options={roles}
          placeholder="Select your role"
          error={errors.role}
          required
        />
        <Select
          label="Annual revenue"
          value={values.revenue}
          onChange={setField("revenue")}
          options={revenueBands}
          placeholder="Select a band"
          error={errors.revenue}
          required
        />
        <Select
          label="Primary finance platform"
          value={values.platform}
          onChange={setField("platform")}
          options={platforms}
          placeholder="Select a platform"
        />
        <Select
          label="Ideal timing"
          value={values.window}
          onChange={setField("window")}
          options={windows}
          placeholder="When suits?"
        />
      </div>

      <div className="mt-5">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            What&rsquo;s chewing the most finance time right now?
            <span className="text-[color:#E26A3B]"> *</span>
          </span>
          <textarea
            value={values.pain}
            onChange={(e) => setField("pain")(e.target.value)}
            rows={3}
            placeholder="Manual invoice entry, reconciliations, month-end close, reporting..."
            className={cn(
              "mt-1.5 block w-full rounded-xl border bg-surface px-4 py-3 text-[15px] leading-relaxed text-ink placeholder:text-ink-faint focus:outline-2 focus:outline-offset-2 focus:outline-brand",
              errors.pain
                ? "border-[color:#E26A3B]"
                : "border-line focus:border-[color:var(--ordron-blue)]",
            )}
          />
          {errors.pain && (
            <p className="mt-1.5 text-xs text-[color:#8A2D06]">{errors.pain}</p>
          )}
        </label>
      </div>

      {submitError && (
        <p
          role="alert"
          className="mt-5 rounded-xl border border-[color:#FDECE4] bg-[color:#FDECE4] p-3 text-sm text-[color:#8A2D06]"
        >
          {submitError}
        </p>
      )}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-ink-muted">
          We reply within one business day to confirm a time. We do not share
          your details or add you to a list.
        </p>
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex h-13 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#00ABFF] px-8 text-base font-semibold tracking-tight text-white shadow-ink transition-all duration-200 hover:-translate-y-px hover:bg-[#0096e0] disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"
        >
          {state === "submitting" ? "Sending..." : "Request my Health Check"}
          {state !== "submitting" && (
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
          )}
        </button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------ Success view */

function SuccessPanel({
  values,
  onClose,
}: {
  values: FormState;
  onClose: () => void;
}) {
  return (
    <div className="px-7 pb-10 pt-8 text-center sm:px-10">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[color:var(--ordron-mint)] text-[color:var(--ordron-teal)]">
        <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden>
          <path
            d="m5 13.5 5 5 11-11"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-ink">
        Thanks, {values.name.split(" ")[0] || "friend"}. Request received.
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">
        Someone from Ordron will reply to{" "}
        <span className="font-semibold text-ink">{values.workEmail}</span> within
        one business day with two or three time options. If you&rsquo;d rather
        book straight away, email{" "}
        <a
          href="mailto:hello@ordron.com"
          className="font-semibold text-[color:var(--ordron-blue-deep)] underline-offset-2 hover:underline"
        >
          hello@ordron.com
        </a>
        .
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-ink/10 bg-surface px-6 text-sm font-semibold text-ink transition-colors hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"
      >
        Back to browsing
      </button>
    </div>
  );
}

/* ------------------------------------------------------------ Field + Select */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  autoComplete,
  error,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
        {label}
        {required && <span className="text-[color:#E26A3B]"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        data-autofocus={autoFocus ? "" : undefined}
        className={cn(
          "mt-1.5 block h-11 w-full rounded-xl border bg-surface px-4 text-[15px] text-ink placeholder:text-ink-faint focus:outline-2 focus:outline-offset-2 focus:outline-brand",
          error
            ? "border-[color:#E26A3B]"
            : "border-line focus:border-[color:var(--ordron-blue)]",
        )}
      />
      {error && (
        <p className="mt-1.5 text-xs text-[color:#8A2D06]">{error}</p>
      )}
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  required,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
        {label}
        {required && <span className="text-[color:#E26A3B]"> *</span>}
      </span>
      <div className="relative mt-1.5">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "block h-11 w-full appearance-none rounded-xl border bg-surface px-4 pr-10 text-[15px] text-ink focus:outline-2 focus:outline-offset-2 focus:outline-brand",
            error
              ? "border-[color:#E26A3B]"
              : "border-line focus:border-[color:var(--ordron-blue)]",
            !value && "text-ink-faint",
          )}
        >
          <option value="" disabled>
            {placeholder ?? "Select an option"}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="text-ink">
              {o}
            </option>
          ))}
        </select>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          aria-hidden
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
        >
          <path
            d="m3 5 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-[color:#8A2D06]">{error}</p>
      )}
    </label>
  );
}
