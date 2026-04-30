import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const LAST_UPDATED = "April 2026";

export const metadata: Metadata = {
  title: "Privacy Policy | Ordron",
  description:
    "How Ordron collects, uses, stores and protects personal information under the Australian Privacy Act 1988 and the Australian Privacy Principles.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy | Ordron",
    description:
      "How Ordron handles personal information under the Privacy Act 1988 (Cth) and the Australian Privacy Principles.",
    url: "/privacy",
    type: "website",
  },
};

const sections: { id: string; heading: string }[] = [
  { id: "who-we-are", heading: "Who we are" },
  { id: "what-we-collect", heading: "What we collect" },
  { id: "how-we-collect", heading: "How we collect it" },
  { id: "how-we-use", heading: "How we use it" },
  { id: "disclosure", heading: "Who we share it with" },
  { id: "storage-security", heading: "Storage and security" },
  { id: "overseas", heading: "Overseas disclosure" },
  { id: "cookies", heading: "Cookies and analytics" },
  { id: "your-rights", heading: "Your rights" },
  { id: "complaints", heading: "Complaints" },
  { id: "changes", heading: "Changes to this policy" },
  { id: "contact", heading: "Contact us" },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        {/* Hero */}
        <Section tone="surface" size="md">
          <Container width="narrow">
            <Eyebrow>Privacy</Eyebrow>
            <h1 className="mt-5 text-balance">Privacy Policy</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Ordron Pty Ltd (ABN {siteConfig.abn}) is an Australian
              business based in Sydney. This policy explains how we collect,
              use, store and protect personal information, in line with the
              Privacy Act 1988 (Cth) and the Australian Privacy Principles.
            </p>
            <p className="mt-3 text-sm text-ink-muted">
              Last updated: {LAST_UPDATED}.
            </p>
          </Container>
        </Section>

        {/* TOC */}
        <Section tone="surface-2" size="sm" className="border-y border-line">
          <Container width="narrow">
            <nav aria-label="On this page" className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                On this page
              </p>
              <ul className="flex flex-wrap gap-2">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-[color:var(--ordron-blue)]/30 hover:text-ink"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </Section>

        {/* Body */}
        <Section tone="surface" size="md">
          <Container width="narrow">
            <article className="prose-policy space-y-12">
              <PolicySection id="who-we-are" heading="Who we are">
                <p>
                  Ordron Pty Ltd trades as Ordron and operates from Sydney,
                  New South Wales. We provide finance automation services to
                  Australian mid-market businesses. In this policy, "we",
                  "us" and "our" refer to Ordron Pty Ltd (ABN {siteConfig.abn}).
                </p>
                <p>
                  We are bound by the Privacy Act 1988 (Cth) and the
                  Australian Privacy Principles (APPs) issued by the Office
                  of the Australian Information Commissioner (OAIC).
                </p>
              </PolicySection>

              <PolicySection
                id="what-we-collect"
                heading="What we collect"
              >
                <p>
                  We only collect personal information that is reasonably
                  necessary to deliver our services and respond to enquiries.
                  Depending on how you interact with us, that may include:
                </p>
                <ul>
                  <li>
                    Name, business email address, company name and role,
                    submitted through forms on this website (Roadmap booking,
                    Diagnostic, lead magnet downloads, contact form).
                  </li>
                  <li>
                    Information you choose to share about your finance
                    operations, such as your accounting platform, team size,
                    invoice volume and current workflow pain points.
                  </li>
                  <li>
                    Records of communications between us, including emails,
                    meeting notes and call recordings (where you have
                    consented).
                  </li>
                  <li>
                    Standard technical information collected automatically,
                    such as IP address, browser type, device type, referring
                    URL and pages visited.
                  </li>
                </ul>
                <p>
                  We do not knowingly collect sensitive information (as
                  defined in the Privacy Act) through this website. Please
                  do not include sensitive information in form submissions.
                </p>
              </PolicySection>

              <PolicySection
                id="how-we-collect"
                heading="How we collect it"
              >
                <p>
                  We collect personal information directly from you when you:
                </p>
                <ul>
                  <li>
                    Submit a form on this website, including the Finance
                    Automation Roadmap booking form, the Finance Automation
                    Diagnostic, lead magnet request forms or the contact
                    form.
                  </li>
                  <li>
                    Email us at hello@ordron.com or partnerships@ordron.com.
                  </li>
                  <li>
                    Engage us as a client, supplier or referral partner.
                  </li>
                </ul>
                <p>
                  We also collect limited technical information automatically
                  when you visit this website, through cookies and analytics
                  tools. See "Cookies and analytics" below.
                </p>
              </PolicySection>

              <PolicySection id="how-we-use" heading="How we use it">
                <p>We use personal information to:</p>
                <ul>
                  <li>
                    Respond to enquiries, prepare quotes and deliver the
                    services you have requested.
                  </li>
                  <li>
                    Send the lead magnet, diagnostic result or report you
                    have asked for.
                  </li>
                  <li>
                    Schedule and run Roadmap calls and any follow-up
                    conversations.
                  </li>
                  <li>
                    Send occasional updates about Ordron's work, where you
                    have asked to receive them. You can unsubscribe at any
                    time.
                  </li>
                  <li>
                    Operate, secure and improve this website and our
                    services.
                  </li>
                  <li>Meet our legal, tax and regulatory obligations.</li>
                </ul>
                <p>
                  We do not sell personal information. We do not use your
                  information for automated decision-making that has a legal
                  or similarly significant effect on you.
                </p>
              </PolicySection>

              <PolicySection
                id="disclosure"
                heading="Who we share it with"
              >
                <p>
                  We share personal information only where it is necessary to
                  run our business or where we are required to. That may
                  include:
                </p>
                <ul>
                  <li>
                    Trusted service providers who help us operate the
                    business: hosting, email, calendar scheduling, customer
                    relationship management, analytics and payment platforms.
                    These providers are contractually required to protect
                    your information and to use it only for the purposes we
                    engage them for.
                  </li>
                  <li>
                    Professional advisors such as lawyers, accountants and
                    auditors, where reasonably necessary.
                  </li>
                  <li>
                    Australian government agencies or law enforcement, where
                    we are required to by law.
                  </li>
                </ul>
                <p>
                  We do not disclose personal information to third parties
                  for their own marketing purposes.
                </p>
              </PolicySection>

              <PolicySection
                id="storage-security"
                heading="Storage and security"
              >
                <p>
                  We store personal information in cloud services operated
                  by reputable providers. We use access controls, encryption
                  in transit and at rest where supported, and the principle
                  of least privilege within our team. Records that are no
                  longer required are securely deleted or de-identified.
                </p>
                <p>
                  No system is perfectly secure. If we become aware of an
                  eligible data breach involving your personal information,
                  we will notify you and the OAIC in line with the
                  Notifiable Data Breaches scheme.
                </p>
              </PolicySection>

              <PolicySection id="overseas" heading="Overseas disclosure">
                <p>
                  Some of the service providers we use may store or process
                  personal information outside Australia. The countries this
                  most commonly involves are the United States and member
                  states of the European Union. Where we engage providers
                  located overseas, we take reasonable steps to ensure they
                  handle personal information consistently with the
                  Australian Privacy Principles.
                </p>
              </PolicySection>

              <PolicySection
                id="cookies"
                heading="Cookies and analytics"
              >
                <p>
                  This website uses cookies and similar technologies for
                  three purposes: keeping the site working, remembering
                  preferences such as form state, and measuring how the
                  site is used so we can improve it.
                </p>
                <p>
                  We use privacy-aware analytics to understand which pages
                  are visited and how the site performs. Where used,
                  analytics data is aggregated and not used to identify
                  individual visitors. You can disable cookies in your
                  browser at any time. Some site features may not work as
                  expected if cookies are disabled.
                </p>
              </PolicySection>

              <PolicySection id="your-rights" heading="Your rights">
                <p>
                  Under the Privacy Act 1988 (Cth) and the Australian
                  Privacy Principles, you have the right to:
                </p>
                <ul>
                  <li>
                    Ask what personal information we hold about you and
                    request a copy.
                  </li>
                  <li>
                    Ask us to correct personal information that is
                    inaccurate, incomplete or out of date.
                  </li>
                  <li>
                    Ask us to delete personal information we are not
                    required to keep.
                  </li>
                  <li>
                    Withdraw consent for marketing communications at any
                    time, by clicking unsubscribe in any email or by emailing
                    us.
                  </li>
                </ul>
                <p>
                  To make any of these requests, email{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-semibold text-[color:var(--ordron-blue-deep)] underline-offset-2 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                  . We will respond within 30 days. We may need to verify
                  your identity before acting on a request.
                </p>
              </PolicySection>

              <PolicySection id="complaints" heading="Complaints">
                <p>
                  If you believe we have mishandled your personal
                  information, please contact us first at{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-semibold text-[color:var(--ordron-blue-deep)] underline-offset-2 hover:underline"
                  >
                    {siteConfig.email}
                  </a>{" "}
                  so we can investigate and respond. We aim to acknowledge
                  complaints within five business days and resolve them
                  within 30 days.
                </p>
                <p>
                  If you are not satisfied with our response, you can lodge
                  a complaint with the Office of the Australian Information
                  Commissioner at{" "}
                  <a
                    href="https://www.oaic.gov.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[color:var(--ordron-blue-deep)] underline-offset-2 hover:underline"
                  >
                    oaic.gov.au
                  </a>
                  .
                </p>
              </PolicySection>

              <PolicySection
                id="changes"
                heading="Changes to this policy"
              >
                <p>
                  We may update this policy from time to time. The current
                  version will always be available at this URL, and the
                  "Last updated" date at the top will reflect the most
                  recent change. Material changes will be communicated to
                  active clients directly.
                </p>
              </PolicySection>

              <PolicySection id="contact" heading="Contact us">
                <p>
                  Questions or requests about this policy or your personal
                  information can be sent to:
                </p>
                <p>
                  Ordron Pty Ltd
                  <br />
                  ABN {siteConfig.abn}
                  <br />
                  {siteConfig.address.line1}, {siteConfig.address.postcode},{" "}
                  {siteConfig.address.country}
                  <br />
                  Email:{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-semibold text-[color:var(--ordron-blue-deep)] underline-offset-2 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </p>
              </PolicySection>
            </article>
          </Container>
        </Section>

        {/* Closing CTA */}
        <Section tone="surface-2" size="md">
          <Container width="narrow">
            <div className="rounded-[28px] border border-line bg-surface p-8 shadow-soft sm:p-10">
              <Eyebrow>Ready when you are</Eyebrow>
              <h2 className="mt-4 text-balance">
                Take the next step on your finance automation
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Run the 5-minute diagnostic for a quick read on where you
                stand, or book the Roadmap to walk away with a written plan.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  href={siteConfig.ctas.healthCheck.href}
                  variant="primary"
                  size="md"
                >
                  {siteConfig.ctas.healthCheck.label}
                </Button>
                <Button
                  href={siteConfig.ctas.scorecard.href}
                  variant="ghost"
                  size="md"
                >
                  {siteConfig.ctas.scorecard.label}
                </Button>
              </div>
              <p className="mt-4 text-xs text-ink-muted">
                Questions about this policy?{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-[color:var(--ordron-blue-deep)] underline-offset-2 hover:underline"
                >
                  Contact us
                </Link>
                .
              </p>
            </div>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}

function PolicySection({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <h2
        id={`${id}-heading`}
        className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[28px]"
      >
        {heading}
      </h2>
      <div className="mt-4 space-y-4 text-[16px] leading-[1.7] text-ink-soft [&_li]:leading-[1.7] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
