import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { ContactHero } from "./components/ContactHero";
import { ContactPrimaryPaths } from "./components/ContactPrimaryPaths";
import { ContactDirectMethods } from "./components/ContactDirectMethods";
import { ContactForm } from "./components/ContactForm";
import { ContactProof } from "./components/ContactProof";
import { ContactFAQ, type ContactFaq } from "./components/ContactFAQ";

const PAGE_URL = `${siteConfig.url}/contact`;

/**
 * Single source of truth for the FAQ block. The accordion renders
 * from this array, and the FAQPage JSON-LD is built from it. Keeping
 * them in lockstep means the structured data can never drift from
 * what the visitor actually reads.
 */
const faqs: readonly ContactFaq[] = [
  {
    question: "Do I need to be based in Sydney to work with Ordron?",
    answer:
      "No. Ordron is Sydney-based but delivers Australia-wide, remote-first. On-site visits in Sydney and Melbourne on request, and usually included in the project fee.",
  },
  {
    question: "What's the smallest engagement Ordron takes on?",
    answer:
      "Most clients start with a Finance Automation Roadmap, then a single automation project in the $5,000 to $15,000 range. Smaller ad-hoc work is sometimes picked up for existing clients.",
  },
  {
    question:
      "Do you work with accounting practices or only end businesses?",
    answer:
      "Both. Accounting practices running Ignition or managing client ledgers often bring Ordron in as their automation arm, either white-labelled or co-branded, depending on the relationship.",
  },
  {
    question: "How do you charge?",
    answer:
      "Fixed-price projects for defined scope. Monthly retainers for ongoing partnerships. No hourly billing, no hidden fees. Every engagement starts with a written scope and price before any work begins.",
  },
  {
    question: "Is there a referral program?",
    answer:
      "Yes. 5% of the first six months of any engagement sourced from a referral partner, paid monthly as invoices are collected. Email partnerships@ordron.com for details.",
  },
] as const;

export const metadata: Metadata = {
  title:
    "Contact Ordron | Finance automation for Australian mid-market",
  description:
    "Get in touch with Ordron. Book a Roadmap, take the 5-minute diagnostic, or send a message. Sydney-based, Australia-wide delivery.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title:
      "Contact Ordron | Finance automation for Australian mid-market",
    description:
      "Get in touch with Ordron. Book a Roadmap, take the 5-minute diagnostic, or send a message. Sydney-based, Australia-wide delivery.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Ordron",
    description:
      "Book a Roadmap, take the 5-minute diagnostic, or send a message. Sydney-based, Australia-wide delivery.",
  },
};

export default function ContactPage() {
  const baseUrl = siteConfig.url;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: PAGE_URL,
      },
    ],
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Ordron",
    url: PAGE_URL,
    inLanguage: "en-AU",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: baseUrl,
    },
    about: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sydney",
        addressRegion: "NSW",
        addressCountry: "AU",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "General enquiries",
          email: "hello@ordron.com",
          areaServed: "AU",
          availableLanguage: ["en-AU"],
        },
        {
          "@type": "ContactPoint",
          contactType: "Partnerships",
          email: "partnerships@ordron.com",
          areaServed: "AU",
          availableLanguage: ["en-AU"],
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <ContactHero />
        <ContactPrimaryPaths />
        <ContactDirectMethods />
        <ContactForm />
        <ContactProof />
        <ContactFAQ faqs={faqs} />
        <ContactFinalCta />
      </main>
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

/**
 * Dual CTA block. Mirrors the visual treatment of PlatformFinalCta
 * but without the platform-specific copy, so it can live inside this
 * page file without pulling in platform data types.
 */
function ContactFinalCta() {
  return (
    <Section tone="ink" size="md" className="text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(at 15% 100%, rgba(29,158,117,0.22), transparent 55%)",
        }}
      />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-2xl">
            <Eyebrow className="!text-white/70">Ready to start?</Eyebrow>
            <h2 className="mt-4 text-balance text-white">
              Book a 60-minute Roadmap, or find your quick wins in 5
              minutes.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/72">
              Two paths, same first step: know where the finance hours
              are actually going before you commit a dollar to automation.
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row lg:flex-col lg:gap-6">
            <div className="flex flex-col gap-1.5">
              <Button href="/health-check" variant="primary" size="lg">
                Book your Roadmap
              </Button>
              <p className="text-xs text-white/60">
                60 minutes. Written report. Yours to keep.
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <Button href="/scorecard" variant="inverse" size="lg">
                Find your automation quick wins
              </Button>
              <p className="text-xs text-white/60">
                5-minute diagnostic. Instant results.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
