import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { requireLeadMagnet } from "@/lib/lead-magnets";
import { LeadMagnetForm } from "./lead-magnet-form";

type Props = {
  id: string;
  source: string;
  /** Optional override for the left-hand teaser copy. */
  teaser?: string;
  className?: string;
};

/**
 * LeadMagnetRibbon
 *
 * Horizontal ribbon variant. Sits between the main narrative and the
 * closing ink CTA. Lower visual weight than the inline card, but
 * heavier than a sidebar.
 */
export function LeadMagnetRibbon({
  id,
  source,
  teaser,
  className,
}: Props) {
  const magnet = requireLeadMagnet(id);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[24px] border border-line bg-surface-2 shadow-soft",
        className,
      )}
    >
      <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-12 lg:p-10">
        <div>
          <Eyebrow>{magnet.formatLabel}</Eyebrow>
          <h3 className="mt-3 text-balance font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
            {magnet.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            {teaser ?? magnet.description}
          </p>
        </div>
        <div>
          <LeadMagnetForm magnet={magnet} source={source} layout="inline" />
        </div>
      </div>
    </div>
  );
}
