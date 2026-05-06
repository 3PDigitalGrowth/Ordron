import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ctaSlots } from "./cta-config";

/**
 * Full-width branded band rendered above the site footer on every
 * blog detail page. Always uses the primary slot from `cta-config`
 * so the conversion message stays consistent with Ordron policy.
 */
export function BottomCtaBand() {
  const primary = ctaSlots.primary;
  const secondary = ctaSlots.secondary;

  return (
    <section className="mt-24 bg-ink-gradient text-white">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
              {primary.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-[34px] font-semibold leading-tight text-white sm:text-[42px]">
              {primary.headline}
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/80 sm:text-[17px]">
              {primary.body}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <Link
              href={primary.href}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-[15px] font-medium text-brand-deep transition-colors hover:bg-mint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {primary.buttonLabel}
            </Link>
            <Link
              href={secondary.href}
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 px-6 text-[15px] font-medium text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {secondary.buttonLabel}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
