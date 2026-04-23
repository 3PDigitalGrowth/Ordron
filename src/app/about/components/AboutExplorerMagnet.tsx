import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "./motion";

/**
 * AboutExplorerMagnet
 *
 * In-body magnet card pointing About page visitors to the full
 * automation explorer at /guide/automations. Not gated: the
 * explorer is an on-site artefact, so the card links directly
 * rather than collecting an email. Visual vocabulary matches the
 * MegaMenuLeadMagnet card (teal tag pill, rounded body, border
 * CTA) at body-scale rather than nav-scale.
 */
export function AboutExplorerMagnet() {
  return (
    <Section tone="surface-2" size="md" id="explorer-magnet">
      <Container width="narrow">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-line bg-surface p-8 shadow-soft sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(at 90% 0%, rgba(6,181,156,0.10), transparent 55%)",
              }}
            />
            <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.25fr)_auto]">
              <div>
                <span className="inline-flex items-center rounded-full bg-teal/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-teal">
                  What we have built
                </span>
                <h2 className="mt-4 text-balance font-display text-[28px] font-semibold leading-[1.15] text-ink sm:text-[32px]">
                  Explore every framework Ordron has shipped.
                </h2>
                <p className="mt-4 max-w-[520px] text-[16px] leading-[1.65] text-ink-soft">
                  130 named automations across 13 finance platforms. Filter
                  by the platform you run, filter by the job you are trying
                  to finish, see the hours each workflow returns. No form,
                  no email gate, just the library.
                </p>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Interactive · 5 min browse
                </p>
              </div>

              <Link
                href="/guide/automations"
                className="inline-flex h-13 items-center justify-center self-start rounded-full border border-teal bg-white px-8 text-base font-semibold text-teal transition-all duration-200 hover:-translate-y-px hover:bg-teal hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-teal"
              >
                Open the explorer
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
