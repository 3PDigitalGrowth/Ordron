import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { requireLeadMagnet } from "@/lib/lead-magnets";
import { LeadMagnetForm } from "./lead-magnet-form";

type Props = {
  /** Magnet id from `src/lib/lead-magnets.ts`. */
  id: string;
  /** Attribution for the API log. Match page context. */
  source: string;
  /** Override heading if the default does not fit context. */
  headingOverride?: string;
  className?: string;
};

/**
 * LeadMagnetCard
 *
 * Full-bleed magnet card for inline placement in the body of a page.
 * Use when the magnet deserves the reader's full attention for a
 * moment (pillar pages, cluster guide bodies, end of case studies).
 */
export function LeadMagnetCard({
  id,
  source,
  headingOverride,
  className,
}: Props) {
  const magnet = requireLeadMagnet(id);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-line bg-surface shadow-soft",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(at 85% 0%, rgba(0,171,255,0.08), transparent 55%)",
        }}
      />

      <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12 lg:p-12">
        <div className="flex flex-col">
          <Eyebrow>{magnet.formatLabel}</Eyebrow>
          <h3 className="mt-4 text-balance font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
            {headingOverride ?? magnet.title}
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            {magnet.longDescription}
          </p>

          <ul className="mt-6 space-y-2.5">
            {magnet.highlights.map((h) => (
              <li
                key={h}
                className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink"
              >
                <CheckGlyph />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-center rounded-2xl border border-line bg-surface-2 p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ordron-blue-deep)]">
            Get it now
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            We email the asset in under a minute. You keep it whether you
            ever speak to us or not.
          </p>
          <div className="mt-5">
            <LeadMagnetForm magnet={magnet} source={source} layout="stacked" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckGlyph() {
  return (
    <span
      aria-hidden
      className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[color:var(--ordron-teal)]/15 text-[color:var(--ordron-teal)]"
    >
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <path
          d="m2 5.7 2.4 2.3L9 3.2"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
