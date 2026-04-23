import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { ProofPackEmailForm } from "./proof-pack-email-form";

export const metadata: Metadata = {
  title: "The Ordron proof pack — every case study in one PDF",
  description:
    "The proof pack is being finalised. Leave your email and we'll send it the moment it's ready: every Ordron case study, grouped by industry, in a single PDF.",
  alternates: { canonical: "/lead-magnets/case-study-proof-pack" },
  robots: { index: false, follow: true },
};

export default function ProofPackPlaceholderPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Section tone="surface" size="md">
          <Container width="narrow">
            <Eyebrow>Proof pack</Eyebrow>
            <h1 className="mt-5 text-balance">
              Proof pack generating. Enter your email to receive it.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Every Ordron case study is being packaged by industry into a
              single PDF. Logistics, distribution, manufacturing, construction,
              industrial services, legal, financial services and professional
              services, with the numbers attached. Leave your email below and
              we will send it across the moment it is ready.
            </p>

            <div className="mt-10 rounded-2xl border border-line bg-surface-2 p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
                Get the proof pack
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                One email. No marketing drip. The PDF lands in your inbox the
                day it ships.
              </p>
              <div className="mt-5">
                <ProofPackEmailForm />
              </div>
              <p className="mt-4 text-[12px] text-ink-muted">
                17 case studies across 8 industries. Anonymised outcomes, real
                numbers. Your email is used to send the PDF and nothing else.
              </p>
            </div>

            <div className="mt-12 rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-ink">
                Don&apos;t want to wait?
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                The full library is already live. Browse by industry, by
                platform or by outcome, and read any individual case study in
                full.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button href="/case-studies" variant="primary" size="md">
                  Browse all case studies
                </Button>
                <Button href="/scorecard" variant="ghost" size="md">
                  Find your automation quick wins
                </Button>
              </div>
            </div>

            <div className="mt-12 border-t border-line-soft pt-8 text-[14px] leading-relaxed text-ink-soft">
              <p>
                Ready to talk about the numbers for your team? The{" "}
                <Link
                  href="/health-check"
                  className="font-medium text-teal hover:underline"
                >
                  Automation Roadmap
                </Link>{" "}
                is a 60-minute working session that produces a written report
                you keep, whether you engage Ordron or not. Or try the{" "}
                <Link
                  href="/cost-of-inaction"
                  className="font-medium text-teal hover:underline"
                >
                  Cost of Inaction calculator
                </Link>{" "}
                for a first-pass number in two minutes.
              </p>
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
