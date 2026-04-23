import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Guide } from "@/data/guides";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

type Props = {
  guide: Guide;
};

/**
 * Anchors for the in-guide jump nav. The id values match the
 * section containers below in the page so the anchors resolve.
 */
const ANCHORS: Array<{ id: string; label: string }> = [
  { id: "the-problem", label: "The problem" },
  { id: "where-the-hours-go", label: "Where the hours go" },
  { id: "cost-of-inaction", label: "The cost of inaction" },
  { id: "how-it-works", label: "How it works" },
  { id: "platform-notes", label: "Platform specifics" },
  { id: "faqs", label: "FAQs" },
];

export function GuideWhatItCovers({ guide }: Props) {
  return (
    <Section tone="surface-2" size="sm">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-16">
          <Reveal>
            <Eyebrow>What this guide covers</Eyebrow>
            <p className="mt-5 max-w-[720px] text-pretty text-lg leading-relaxed text-ink-soft sm:text-xl">
              {guide.whatItCovers}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <nav
              aria-label="Jump to section"
              className="rounded-2xl border border-line bg-surface p-6 shadow-soft"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Jump to section
              </p>
              <ul className="mt-4 space-y-2.5">
                {ANCHORS.map((a) => (
                  <li key={a.id}>
                    <a
                      href={`#${a.id}`}
                      className="group flex items-center justify-between text-[15px] font-medium text-ink hover:text-[color:var(--ordron-blue)]"
                    >
                      <span>{a.label}</span>
                      <span
                        aria-hidden
                        className="text-ink-faint transition-colors group-hover:text-[color:var(--ordron-blue)]"
                      >
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
