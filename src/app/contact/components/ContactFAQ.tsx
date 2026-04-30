import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FaqGrid, type FaqGridItem } from "@/components/ui/faq-grid";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

export type ContactFaq = {
  question: string;
  answer: string;
};

type Props = {
  faqs: readonly ContactFaq[];
};

export function ContactFAQ({ faqs }: Props) {
  const items: FaqGridItem[] = faqs.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  return (
    <Section id="faqs" tone="surface-2" size="md">
      <Container>
        <div>
          <Reveal>
            <Eyebrow>Common questions</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl">
              Before you write
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[640px] text-pretty text-lg leading-relaxed text-ink-soft">
              The questions people actually ask on the first call,
              answered plainly.
            </p>
          </Reveal>
        </div>

        <FaqGrid className="mt-10" items={items} accent="teal" />
      </Container>
    </Section>
  );
}
