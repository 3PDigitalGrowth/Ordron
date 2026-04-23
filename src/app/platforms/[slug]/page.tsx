import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getPlatformHubBySlug } from "@/data/platforms";
import { platforms } from "@/lib/platforms";
import { caseStudies } from "@/lib/case-studies";
import { siteConfig } from "@/lib/site";
import { PlatformHero } from "./components/PlatformHero";
import { PlatformContext } from "./components/PlatformContext";
import { PlatformPainPoints } from "./components/PlatformPainPoints";
import { PlatformAutomations } from "./components/PlatformAutomations";
import { PlatformCalculator } from "./components/PlatformCalculator";
import { PlatformApproach } from "./components/PlatformApproach";
import { PlatformCaseStudies } from "./components/PlatformCaseStudies";
import { PlatformRelatedGuides } from "./components/PlatformRelatedGuides";
import { PlatformFinalCta } from "./components/PlatformFinalCta";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Pre-render a page for every slug in src/lib/platforms.ts (all 13).
 * Slugs that do not yet have a hub entry in src/data/platforms.ts will
 * resolve via notFound() at request time, which matches the product
 * decision to let un-populated platforms 404 gracefully until Block 2B.
 */
export async function generateStaticParams() {
  return platforms.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const platform = getPlatformHubBySlug(slug);
  if (!platform) {
    return {
      title: "Platform not found | Ordron",
      robots: { index: false, follow: true },
    };
  }

  const title = `${platform.name} automation in Australia | Ordron`;
  const description = `Ordron has built ${platform.automations.length} named ${platform.name} automations for Australian finance teams: AP, AR, reconciliations and reporting. Book your automation roadmap.`;

  return {
    title,
    description,
    alternates: { canonical: `/platforms/${platform.slug}` },
    keywords: platform.searchTerms,
    openGraph: {
      title,
      description,
      url: `/platforms/${platform.slug}`,
      type: "website",
      images: [
        {
          url: `/platforms/${baseImageSlug(platform.slug)}-hero.jpg`,
          width: 1024,
          height: 576,
          alt: `${platform.name} automation hub cover image`,
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

export default async function PlatformHubPage({ params }: PageProps) {
  const { slug } = await params;
  const platform = getPlatformHubBySlug(slug);
  if (!platform) notFound();

  const heroImage = `/platforms/${baseImageSlug(platform.slug)}-hero.jpg`;

  const relatedCaseStudies = platform.relatedCaseStudySlugs
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  // Schema.org structured data: Service + BreadcrumbList.
  const baseUrl = siteConfig.url;
  const pageUrl = `${baseUrl}/platforms/${platform.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${platform.name} automation`,
    serviceType: `${platform.name} finance automation`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
      areaServed: {
        "@type": "Country",
        name: "Australia",
      },
    },
    areaServed: { "@type": "Country", name: "Australia" },
    description: `Ordron builds ${platform.automations.length} named finance automations on ${platform.name} for Australian mid-market teams, covering AP, AR, reconciliations and reporting.`,
    url: pageUrl,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${platform.name} automations`,
      itemListElement: platform.automations.map((a, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Service",
          name: a.title,
          description: a.description,
          category: a.category,
        },
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Platforms",
        item: `${baseUrl}/platforms`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: platform.name,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <PlatformHero platform={platform} heroImageSrc={heroImage} />
        <PlatformContext platform={platform} />
        <PlatformPainPoints platform={platform} />
        <PlatformAutomations platform={platform} />
        <PlatformCalculator platform={platform} />
        <PlatformApproach platform={platform} />
        <PlatformCaseStudies
          platform={platform}
          caseStudies={relatedCaseStudies}
        />
        <PlatformRelatedGuides platform={platform} />
        <PlatformFinalCta platform={platform} />
      </main>
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

/**
 * The hero image filename trims the "-automation" suffix that every
 * platform slug carries, so Xero ends up at /platforms/xero-hero.jpg,
 * MYOB at /platforms/myob-hero.jpg, and so on.
 */
function baseImageSlug(slug: string): string {
  return slug.replace(/-automation$/, "");
}
