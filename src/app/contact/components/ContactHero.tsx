import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FadeIn } from "@/app/platforms/[slug]/components/motion";
import { ContactBreadcrumb } from "./ContactBreadcrumb";

/**
 * Deliberately quiet hero. No image, no gradient wash, no animated
 * statistics. Contact is a utility surface, so the page earns trust
 * by staying out of the way and letting the real CTAs do the work
 * further down.
 */
export function ContactHero() {
  return (
    <Section tone="surface" size="lg">
      <Container width="narrow">
        <ContactBreadcrumb />
        <FadeIn>
          <Eyebrow>Contact</Eyebrow>
        </FadeIn>
        <FadeIn delay={0.06} as="h1">
          <span className="mt-5 block text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Get in touch with Ordron.
          </span>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="mt-6 max-w-[640px] text-pretty text-lg leading-relaxed text-ink-soft sm:text-xl">
            Most conversations start with the 5-minute diagnostic or a
            60-minute Roadmap call. For everything else, use the form or
            reach us directly below.
          </p>
        </FadeIn>
      </Container>
    </Section>
  );
}
