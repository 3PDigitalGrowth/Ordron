import { cn } from "@/lib/utils";
import { requireLeadMagnet } from "@/lib/lead-magnets";
import { LeadMagnetForm } from "./lead-magnet-form";

type Props = {
  id: string;
  source: string;
  className?: string;
};

/**
 * LeadMagnetAside
 *
 * Compact vertical variant. Lives in a sidebar column on long-form
 * content (pillar pages, cluster guides) with `position: sticky`
 * applied by the parent when appropriate.
 */
export function LeadMagnetAside({ id, source, className }: Props) {
  const magnet = requireLeadMagnet(id);

  return (
    <aside
      aria-label={magnet.title}
      className={cn(
        "rounded-2xl border border-line bg-surface p-6 shadow-soft",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--ordron-blue-deep)]">
        {magnet.formatLabel}
      </p>
      <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink">
        {magnet.title}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
        {magnet.description}
      </p>

      <ul className="mt-4 space-y-2">
        {magnet.highlights.slice(0, 3).map((h) => (
          <li
            key={h}
            className="flex items-start gap-2 text-[13px] leading-relaxed text-ink-soft"
          >
            <span
              aria-hidden
              className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--ordron-blue)]"
            />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <LeadMagnetForm magnet={magnet} source={source} layout="stacked" />
      </div>
    </aside>
  );
}
