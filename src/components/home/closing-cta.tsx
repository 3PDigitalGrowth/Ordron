import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import Link from "next/link";

export function ClosingCta() {
  return (
    <Section tone="ink" size="md" id="closing" className="text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(at 15% 100%, rgba(0,171,255,0.25), transparent 55%)",
        }}
      />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-2xl">
            <h2 className="text-balance text-white">
              Start with the diagnostic. Finish with a finance team that gets
              its week back.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/72">
              Five minutes now to see where your hours are going. Sixty
              minutes with Ordron to get a report that tells you what to do
              about it. Then it is up to you.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-stretch">
            <Button
              href={siteConfig.ctas.scorecard.href}
              variant="inverse"
              size="lg"
            >
              Find your automation quick wins
            </Button>
            <p className="text-sm text-white/60">
              5-minute diagnostic. Instant results.
            </p>
            <Link
              href={siteConfig.ctas.healthCheck.href}
              className="inline-flex items-center text-sm font-semibold text-white/68 transition-colors hover:text-white"
            >
              Or book a full Roadmap diagnostic <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
