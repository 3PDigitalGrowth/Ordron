import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { Guide } from "@/data/guides";
import { FaqGrid, type FaqGridItem } from "@/components/ui/faq-grid";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

type Props = {
  guide: Guide;
};

export function GuideFaqs({ guide }: Props) {
  const items: FaqGridItem[] = guide.faqs.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  return (
    <Section id="faqs" tone="surface-2" size="md">
      <Container>
        <div>
          <Reveal>
            <Eyebrow>Questions worth asking</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl">
              Frequently asked questions about {guide.category.toLowerCase()}{" "}
              automation
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[640px] text-pretty text-lg leading-relaxed text-ink-soft">
              The questions a CFO types into Google when scoping the work,
              not the questions a vendor would prefer to be asked.
            </p>
          </Reveal>
        </div>

        <FaqGrid className="mt-10" items={items} accent="blue" />
      </Container>
    </Section>
  );
}
