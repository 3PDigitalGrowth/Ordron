import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { getCtaSlot, type CtaSlot } from "./cta-config";

/**
 * MDX component registry for the blog template.
 *
 * Spec §3 components are exported here and merged into the
 * `next-mdx-remote/rsc` runtime via the `components` prop in
 * `BlogTemplate`. The agent uses these inline in the post body.
 *
 * The `<CTA>` component is slot-based per spec v2: agent picks
 * `slot="primary" | "secondary" | "inline-form"` and the template
 * pulls headline, body, button label and destination from
 * `cta-config.ts`. No agent-supplied copy is rendered.
 *
 * Heading and prose overrides exist so the markdown body inherits
 * the editorial typography spec (§6) without crashing through
 * Tailwind defaults.
 *
 * Unknown JSX components fail safely: MDX will render the children
 * as fragments rather than crash the build.
 */

// ----- Inline editorial blocks (used inside MDX body) ---------------

type KeyTakeawaysProps = {
  items?: string[];
  children?: ReactNode;
};

export function KeyTakeaways({ items, children }: KeyTakeawaysProps) {
  const list = items ?? [];
  return (
    <aside
      aria-label="Key takeaways"
      className="not-prose my-10 rounded-2xl border border-line bg-surface-2 p-6 sm:p-8"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-deep">
        Key takeaways
      </p>
      {list.length > 0 ? (
        <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-ink">
          {list.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 text-[15px] leading-relaxed text-ink">
          {children}
        </div>
      )}
    </aside>
  );
}

type CalloutProps = {
  type?: "info" | "warning" | "tip";
  children?: ReactNode;
};

const calloutStyles: Record<NonNullable<CalloutProps["type"]>, string> = {
  info: "border-brand/30 bg-brand/5 text-ink",
  warning: "border-[color:var(--ordron-amber)]/40 bg-[color:var(--ordron-amber)]/10 text-ink",
  tip: "border-teal/40 bg-mint text-ink",
};

const calloutLabel: Record<NonNullable<CalloutProps["type"]>, string> = {
  info: "Note",
  warning: "Watch out",
  tip: "Tip",
};

export function Callout({ type = "info", children }: CalloutProps) {
  return (
    <div
      role="note"
      className={cn(
        "not-prose my-8 rounded-2xl border-l-4 px-5 py-4 sm:px-6 sm:py-5",
        calloutStyles[type],
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">
        {calloutLabel[type]}
      </p>
      <div className="mt-1.5 text-[15px] leading-relaxed [&>p]:m-0 [&>p+p]:mt-2">
        {children}
      </div>
    </div>
  );
}

type ComparisonTableProps = {
  headers: string[];
  rows: Array<Array<string | number>>;
  caption?: string;
};

export function ComparisonTable({
  headers,
  rows,
  caption,
}: ComparisonTableProps) {
  return (
    <figure className="not-prose my-10 -mx-1 sm:mx-0">
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="w-full border-collapse text-left text-[14px]">
          <thead>
            <tr className="bg-surface-2">
              {headers.map((header, i) => (
                <th
                  key={i}
                  scope="col"
                  className="px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-muted"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className={cn(
                  "border-t border-line-soft",
                  ri % 2 === 1 && "bg-surface-2/40",
                )}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="px-4 py-3 text-ink/90 align-top leading-relaxed"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="mt-3 text-[13px] text-ink-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

type StatsProps = {
  items: Array<{ value: string; label: string }>;
};

export function Stats({ items }: StatsProps) {
  return (
    <div
      className={cn(
        "not-prose my-10 grid gap-4 rounded-2xl border border-line bg-surface-2 p-6 sm:p-8",
        items.length === 2 && "sm:grid-cols-2",
        items.length === 3 && "sm:grid-cols-3",
        items.length >= 4 && "sm:grid-cols-2 lg:grid-cols-4",
      )}
    >
      {items.map((item, i) => (
        <div key={i} className="flex flex-col">
          <span className="font-display text-[34px] font-semibold leading-none text-brand-deep numeric">
            {item.value}
          </span>
          <span className="mt-2 text-[13px] uppercase tracking-[0.08em] text-ink-muted">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

type CaseStudyProps = {
  industry: string;
  metric: string;
  metricLabel?: string;
  quote?: string;
  author?: string;
  number?: number;
  children?: ReactNode;
};

export function CaseStudy({
  industry,
  metric,
  metricLabel,
  quote,
  author,
  number,
  children,
}: CaseStudyProps) {
  return (
    <section className="not-prose my-10 rounded-2xl border border-line bg-surface p-6 shadow-soft sm:p-8">
      <div className="flex items-baseline gap-3">
        {typeof number === "number" && (
          <span className="font-display text-[14px] font-semibold text-brand-deep numeric">
            #{String(number).padStart(2, "0")}
          </span>
        )}
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          {industry}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap items-baseline gap-3">
        <span className="font-display text-[44px] font-semibold leading-none text-brand-deep numeric">
          {metric}
        </span>
        {metricLabel && (
          <span className="text-[14px] text-ink-muted">{metricLabel}</span>
        )}
      </div>
      {children && (
        <div className="mt-4 text-[15px] leading-relaxed text-ink">
          {children}
        </div>
      )}
      {quote && (
        <figure className="mt-5 border-l-2 border-brand/40 pl-4">
          <blockquote className="text-[16px] italic leading-relaxed text-ink/90">
            {`"${quote}"`}
          </blockquote>
          {author && (
            <figcaption className="mt-2 text-[13px] text-ink-muted">
              {author}
            </figcaption>
          )}
        </figure>
      )}
    </section>
  );
}

// ----- Slot-based CTA (spec v2) -------------------------------------

type CTAProps = {
  slot: CtaSlot;
  className?: string;
};

export function CTA({ slot, className }: CTAProps) {
  const config = getCtaSlot(slot);

  if (config.variant === "form") {
    // Inline form variant: posts the email then redirects to the
    // configured destination (Roadmap booking page). Wired as a
    // standard form submission to keep this an RSC-safe component.
    return (
      <aside
        className={cn(
          "not-prose my-12 overflow-hidden rounded-2xl border border-line bg-surface shadow-soft",
          className,
        )}
      >
        <div className="grid gap-0 sm:grid-cols-[1.1fr_1fr]">
          <div className="bg-brand-gradient p-6 text-white sm:p-8">
            {config.eyebrow && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
                {config.eyebrow}
              </p>
            )}
            <h3 className="mt-2 font-display text-[24px] font-semibold leading-tight text-white">
              {config.headline}
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-white/85">
              {config.body}
            </p>
          </div>
          <form
            method="post"
            action={config.href}
            className="flex flex-col justify-center gap-3 p-6 sm:p-8"
          >
            {config.formFields?.map((field) => (
              <label key={field.name} className="block">
                <span className="sr-only">{field.label}</span>
                <input
                  type={field.name === "email" ? "email" : "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="h-12 w-full rounded-full border border-line bg-surface px-5 text-[15px] text-ink placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
              </label>
            ))}
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-full bg-teal px-6 text-[15px] font-medium text-white transition-colors hover:bg-teal/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              {config.buttonLabel}
            </button>
            <p className="text-[12px] text-ink-muted">
              No spam. One email with the booking link.
            </p>
          </form>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "not-prose my-12 overflow-hidden rounded-2xl border border-line bg-brand-gradient p-7 text-white sm:p-9",
        className,
      )}
    >
      {config.eyebrow && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/80">
          {config.eyebrow}
        </p>
      )}
      <h3 className="mt-2 font-display text-[26px] font-semibold leading-tight text-white">
        {config.headline}
      </h3>
      <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-white/85">
        {config.body}
      </p>
      <Link
        href={config.href}
        className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-[15px] font-medium text-brand-deep transition-colors hover:bg-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {config.buttonLabel}
        <span aria-hidden="true" className="ml-2">
          {"\u2192"}
        </span>
      </Link>
    </aside>
  );
}

// ----- Prose overrides (markdown body) -----------------------------

type AnchorProps = ComponentPropsWithoutRef<"a">;

function MdxAnchor({ href = "", children, ...rest }: AnchorProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  if (isInternal) {
    return (
      <Link
        href={href}
        className="text-brand-deep underline decoration-brand/40 underline-offset-[3px] hover:decoration-brand"
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brand-deep underline decoration-brand/40 underline-offset-[3px] hover:decoration-brand"
      {...rest}
    >
      {children}
    </a>
  );
}

/**
 * MDX component map. Passed to `<MDXRemote components={...} />`
 * inside `BlogTemplate`. Uppercase keys are inline JSX components
 * the agent uses by name. Lowercase keys override the rendered
 * markdown elements so prose inherits Ordron typography rather
 * than the browser defaults.
 */
export const mdxComponents = {
  // Editorial blocks (spec §3)
  KeyTakeaways,
  Callout,
  ComparisonTable,
  Stats,
  CaseStudy,
  CTA,

  // Markdown overrides
  a: MdxAnchor,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      className="mt-14 scroll-mt-28 font-display text-[28px] font-semibold leading-tight text-ink sm:text-[32px]"
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      className="mt-10 scroll-mt-28 font-display text-[22px] font-semibold leading-snug text-ink sm:text-[24px]"
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4
      {...props}
      className="mt-8 scroll-mt-28 font-display text-[18px] font-semibold leading-snug text-ink"
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      {...props}
      className="mt-5 text-[17px] leading-[1.7] text-ink/90 sm:text-[18px]"
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      {...props}
      className="mt-5 list-disc space-y-2 pl-6 text-[17px] leading-[1.7] text-ink/90 marker:text-brand sm:text-[18px]"
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      {...props}
      className="mt-5 list-decimal space-y-2 pl-6 text-[17px] leading-[1.7] text-ink/90 marker:font-semibold marker:text-brand-deep sm:text-[18px]"
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      className="mt-7 border-l-4 border-brand/40 pl-5 text-[18px] italic leading-relaxed text-ink/90"
    />
  ),
  hr: () => <hr className="my-12 border-t border-line-soft" />,
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      {...props}
      className="rounded bg-surface-3 px-1.5 py-0.5 font-mono text-[0.92em] text-ink"
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      {...props}
      className="mt-6 overflow-x-auto rounded-xl bg-ink p-5 text-[14px] leading-relaxed text-white"
    />
  ),
};
