import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getGuideBySlug, guides, type Guide } from "@/data/guides";
import { caseStudies } from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";
import { GuideHero } from "./components/GuideHero";
import { GuideWhatItCovers } from "./components/GuideWhatItCovers";
import { GuideProblem } from "./components/GuideProblem";
import { GuideWhereHoursGo } from "./components/GuideWhereHoursGo";
import { GuideCalculator } from "./components/GuideCalculator";
import { GuideMechanics } from "./components/GuideMechanics";
import { GuidePlatformNotes } from "./components/GuidePlatformNotes";
import { GuideMistakes } from "./components/GuideMistakes";
import { GuideGoodLooksLike } from "./components/GuideGoodLooksLike";
import { GuideRelatedPlatforms } from "./components/GuideRelatedPlatforms";
import { GuideRelatedCaseStudies } from "./components/GuideRelatedCaseStudies";
import { GuideFaqs } from "./components/GuideFaqs";
import { GuideFinalCta } from "./components/GuideFinalCta";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Pre-render one page per entry in the `guides` data file.
 * Slugs missing from that file resolve via notFound().
 */
export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

/**
 * Rough spoken-word count across the body fields. Used for the
 * Article JSON-LD `wordCount` property. Intentionally approximate,
 * a small drift over/under does not affect Google's treatment.
 */
function estimateWordCount(guide: Guide): number {
  const bits: string[] = [
    guide.heroTagline,
    guide.whatItCovers,
    guide.theProblemSection.heading,
    ...guide.theProblemSection.bodyParagraphs,
    guide.theProblemSection.keyStatOrCallout,
    ...guide.whereTheHoursGo.flatMap((w) => [w.title, w.description]),
    guide.costOfInactionCallout,
    ...guide.howAutomationActuallyWorks.flatMap((s) => [s.title, s.description]),
    ...guide.platformSpecificNotes.map((n) => n.note),
    ...guide.commonMistakes.flatMap((m) => [m.title, m.description]),
    ...guide.whatGoodLooksLike.flatMap((p) => [p.title, p.description]),
    ...guide.faqs.flatMap((f) => [f.question, f.answer]),
  ];
  return bits.join(" ").split(/\s+/).filter(Boolean).length;
}

function guideDescription(guide: Guide): string {
  const base = `Ordron's guide to automating ${guide.category.toLowerCase()} for Australian finance teams. How it works, what good looks like, and the platform-specific differences.`;
  return base.slice(0, 154);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    return {
      title: "Guide not found | Ordron",
      robots: { index: false, follow: true },
    };
  }

  const title = `${guide.category} automation in Australia | Ordron`;
  const description = guideDescription(guide);
  const heroImage = `/guides/${guide.slug}-hero.jpg`;

  return {
    title,
    description,
    alternates: { canonical: `/guides/${guide.slug}` },
    keywords: guide.searchTerms,
    openGraph: {
      title,
      description,
      url: `/guides/${guide.slug}`,
      type: "article",
      images: [
        {
          url: heroImage,
          width: 1024,
          height: 576,
          alt: `${guide.category} automation guide cover image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const heroImage = `/guides/${guide.slug}-hero.jpg`;

  const relatedCaseStudies = guide.relatedCaseStudySlugs
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const baseUrl = siteConfig.url;
  const pageUrl = `${baseUrl}/guides/${guide.slug}`;
  // Publish date is locked to the initial ship month so Article
  // schema reports a stable `datePublished` on every subsequent
  // rebuild. `dateModified` updates to the build day.
  const datePublished = "2026-04-23";
  const dateModified = new Date().toISOString().slice(0, 10);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guideDescription(guide),
    mainEntityOfPage: pageUrl,
    url: pageUrl,
    image: `${baseUrl}${heroImage}`,
    datePublished,
    dateModified,
    wordCount: estimateWordCount(guide),
    inLanguage: "en-AU",
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
    },
    about: {
      "@type": "Thing",
      name: `${guide.category} automation for Australian finance teams`,
    },
    keywords: guide.searchTerms.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${baseUrl}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.category,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((f) => ({
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
        <GuideHero guide={guide} heroImageSrc={heroImage} />
        <GuideWhatItCovers guide={guide} />
        <GuideProblem guide={guide} />
        <GuideWhereHoursGo guide={guide} />
        <GuideCalculator guide={guide} />
        <GuideMechanics guide={guide} />
        <GuidePlatformNotes guide={guide} />
        <GuideMistakes guide={guide} />
        <GuideGoodLooksLike guide={guide} />
        <GuideRelatedPlatforms guide={guide} />
        <GuideRelatedCaseStudies guide={guide} caseStudies={relatedCaseStudies} />
        <GuideFaqs guide={guide} />
        <GuideFinalCta guide={guide} />
      </main>
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
