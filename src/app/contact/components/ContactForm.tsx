"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
  /** Honeypot. Real users never fill this; bots do. */
  company_url: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

type Status = "idle" | "submitting" | "success" | "error";

const INITIAL: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
  company_url: "",
};

export function ContactForm() {
  const nameId = useId();
  const emailId = useId();
  const companyId = useId();
  const messageId = useId();

  const [values, setValues] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Track when the form first rendered. Any submission under two
  // seconds is overwhelmingly a bot, and we let the server reject it.
  const startedAtRef = useRef<number>(0);
  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  // Focus the success heading when the form swaps out, so screen
  // reader users know the submission succeeded.
  const successRef = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const setField =
    <K extends keyof FormState>(field: K) =>
    (value: FormState[K]) => {
      setValues((v) => ({ ...v, [field]: value }));
      if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(values.email.trim())) {
      next.email = "Please enter a valid email.";
    }
    if (!values.message.trim() || values.message.trim().length < 10) {
      next.message =
        "Even a sentence helps. What are you getting in touch about?";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Honeypot short-circuit. Pretend success so bots don't learn.
    if (values.company_url) {
      setStatus("success");
      return;
    }

    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim() || null,
          message: values.message.trim(),
          company_url: values.company_url,
          startedAt: startedAtRef.current,
        }),
      });

      if (res.status === 429) {
        setStatus("error");
        setSubmitError(
          "Too many messages from this location in the last hour. Try again shortly, or email hello@ordron.com directly.",
        );
        return;
      }

      if (!res.ok) throw new Error("request-failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setSubmitError(
        "Something went wrong sending that. Try again, or email hello@ordron.com directly.",
      );
    }
  };

  return (
    <Section tone="mint" size="md">
      <Container width="narrow">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Or send a message</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl">
              Tell us what you&rsquo;re working on
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-3xl border border-[color:var(--ordron-teal)]/25 bg-surface p-7 shadow-soft sm:p-10">
            {status === "success" ? (
              <SuccessPanel headingRef={successRef} />
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    id={nameId}
                    label="Your name"
                    value={values.name}
                    onChange={setField("name")}
                    placeholder="Aana Mahajan"
                    autoComplete="name"
                    error={errors.name}
                    required
                  />
                  <Field
                    id={emailId}
                    type="email"
                    label="Email"
                    value={values.email}
                    onChange={setField("email")}
                    placeholder="you@company.com.au"
                    autoComplete="email"
                    error={errors.email}
                    required
                  />
                  <div className="sm:col-span-2">
                    <Field
                      id={companyId}
                      label="Company (optional)"
                      value={values.company}
                      onChange={setField("company")}
                      placeholder="Ordron Pty Ltd"
                      autoComplete="organization"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor={messageId} className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      Message
                      <span className="text-[color:#E26A3B]"> *</span>
                    </span>
                    <textarea
                      id={messageId}
                      value={values.message}
                      onChange={(e) => setField("message")(e.target.value)}
                      rows={5}
                      placeholder="Tell us a bit about your finance stack, team size, or the work you want quoted. Short and specific beats long and vague."
                      aria-invalid={errors.message ? true : undefined}
                      aria-describedby={
                        errors.message ? `${messageId}-error` : undefined
                      }
                      required
                      className={cn(
                        "mt-1.5 block w-full rounded-xl border bg-surface px-4 py-3 text-[15px] leading-relaxed text-ink placeholder:text-ink-faint focus:outline-2 focus:outline-offset-2 focus:outline-brand",
                        errors.message
                          ? "border-[color:#E26A3B]"
                          : "border-line focus:border-[color:var(--ordron-teal)]",
                      )}
                    />
                    {errors.message && (
                      <p
                        id={`${messageId}-error`}
                        role="alert"
                        className="mt-1.5 text-xs text-[color:#8A2D06]"
                      >
                        {errors.message}
                      </p>
                    )}
                  </label>
                </div>

                {/* Honeypot. Visually hidden but not display:none, which
                    bots sometimes detect and skip. */}
                <div aria-hidden className="sr-only">
                  <label>
                    Company website
                    <input
                      type="text"
                      name="company_url"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.company_url}
                      onChange={(e) => setField("company_url")(e.target.value)}
                    />
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

                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md text-xs leading-relaxed text-ink-muted">
                    No subscriptions, no drip sequences. Real humans
                    read these and reply within one business day.
                  </p>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex h-13 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[color:var(--ordron-teal)] px-8 text-base font-semibold tracking-tight text-white shadow-ink transition-all duration-200 hover:-translate-y-px hover:bg-[color:var(--ordron-teal)]/90 disabled:opacity-60 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"
                  >
                    {status === "submitting" ? "Sending..." : "Send"}
                    {status !== "submitting" && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        aria-hidden
                      >
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
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- Field */

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  type?: "text" | "email";
  error?: string;
  required?: boolean;
};

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  type = "text",
  error,
  required,
}: FieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
        {label}
        {required && <span className="text-[color:#E26A3B]"> *</span>}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "mt-1.5 block h-12 w-full rounded-xl border bg-surface px-4 text-[15px] text-ink placeholder:text-ink-faint focus:outline-2 focus:outline-offset-2 focus:outline-brand",
          error
            ? "border-[color:#E26A3B]"
            : "border-line focus:border-[color:var(--ordron-teal)]",
        )}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-xs text-[color:#8A2D06]"
        >
          {error}
        </p>
      )}
    </label>
  );
}

/* --------------------------------------------------------- Success view */

function SuccessPanel({
  headingRef,
}: {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div className="px-1 py-2 text-center sm:px-4 sm:py-4">
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
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="mt-5 font-display text-2xl font-semibold text-ink focus:outline-none"
      >
        Thanks. Message received.
      </h3>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
        We&rsquo;ll reply within one business day. In the meantime,{" "}
        <Link
          href="/case-studies"
          className="font-semibold text-[color:var(--ordron-teal)] underline-offset-2 hover:underline"
        >
          see what Ordron has shipped for teams like yours
        </Link>
        .
      </p>
    </div>
  );
}
