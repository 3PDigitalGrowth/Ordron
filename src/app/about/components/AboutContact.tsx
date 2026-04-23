import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { siteConfig } from "@/lib/site";
import { Reveal } from "./motion";

type Card = {
  href: string;
  external?: boolean;
  eyebrow: string;
  title: string;
  body: string;
  meta: string;
};

const CARDS: Card[] = [
  {
    href: "/scorecard",
    eyebrow: "Diagnostic",
    title: "Find your automation quick wins",
    body: "Ten questions across AP, AR, reconciliations and reporting. Instant pillar-by-pillar scoring, no consultant on the line.",
    meta: "5 minutes · on-site",
  },
  {
    href: "/health-check",
    eyebrow: "Roadmap",
    title: "Book your Roadmap",
    body: "Sixty-minute review of how your finance team actually runs. Written report inside 48 hours, yours to keep whether you engage Ordron or not.",
    meta: "60 minutes · written report",
  },
  {
    href: `mailto:${siteConfig.email}`,
    external: true,
    eyebrow: "General enquiries",
    title: "Partnership, press, or something else",
    body: `Email the team directly at ${siteConfig.email}. We read everything and reply inside one business day.`,
    meta: "Direct email",
  },
];

export function AboutContact() {
  return (
    <Section tone="surface" size="md" id="contact">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Say hello</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-balance">
              How to get in touch.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink-soft">
              Three ways in, depending on where you are. None of them
              commit you to anything beyond the door you choose to open.
            </p>
          </Reveal>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {CARDS.map((c, i) => {
            const card = (
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface-2 p-8 transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:bg-surface hover:shadow-soft">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ordron-blue-deep)]">
                  {c.eyebrow}
                </span>
                <h3 className="mt-3 font-display text-[20px] font-semibold leading-snug text-ink">
                  {c.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-ink-soft">
                  {c.body}
                </p>
                <span className="mt-auto pt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  {c.meta}
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-6 right-7 text-[color:var(--ordron-blue)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  →
                </span>
              </article>
            );

            return (
              <Reveal key={c.href} delay={i * 0.06} as="li" amount={0.2}>
                {c.external ? (
                  <a href={c.href} className="block h-full">
                    {card}
                  </a>
                ) : (
                  <Link href={c.href} className="block h-full">
                    {card}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </ol>

        <Reveal delay={0.2}>
          <p className="mt-14 text-center text-[13px] leading-relaxed text-ink-muted">
            Ordron Pty Ltd. Sydney, NSW. ABN 75 695 388 893.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
