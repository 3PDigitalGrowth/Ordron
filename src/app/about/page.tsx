import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteConfig } from "@/lib/site";
import { AboutHero } from "./components/AboutHero";
import { OriginStory } from "./components/OriginStory";
import { WhatWeDo } from "./components/WhatWeDo";
import { MagicianPrinciple } from "./components/MagicianPrinciple";
import { FounderCards } from "./components/FounderCards";
import { HowWeWork } from "./components/HowWeWork";
import { AboutProof } from "./components/AboutProof";
import { AboutExplorerMagnet } from "./components/AboutExplorerMagnet";
import { AboutContact } from "./components/AboutContact";
import { AboutFinalCta } from "./components/AboutFinalCta";

const PAGE_URL = "/about";

const AANA_LINKEDIN = "https://www.linkedin.com/in/aana-mahajan/";

export const metadata: Metadata = {
  title: "About Ordron | Finance automation for Australian mid-market",
  description:
    "Ordron builds custom finance automation infrastructure for Australian mid-market businesses. Sydney-founded, 130 frameworks, 13 platforms. Meet the team.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "About Ordron | Finance automation for Australian mid-market",
    description:
      "Sydney-built finance automation infrastructure for Australian mid-market. 130 frameworks, 13 platforms, the team and principles behind every engagement.",
    url: PAGE_URL,
    type: "website",
    images: [
      {
        url: "/about/hero.jpg",
        width: 1024,
        height: 576,
        alt: "Morning light across a timber desk in Ordron's Sydney working space.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ordron",
    description:
      "Sydney-built finance automation for Australian mid-market. 130 frameworks, 13 platforms, the team and principles behind every engagement.",
  },
};

export default function AboutPage() {
  const baseUrl = siteConfig.url;
  const pageUrl = `${baseUrl}${PAGE_URL}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "About", item: pageUrl },
    ],
  };

  const aanaSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${pageUrl}#aana`,
    name: "Aana Mahajan",
    jobTitle: "Founder",
    worksFor: { "@id": `${baseUrl}#organization` },
    sameAs: [AANA_LINKEDIN],
    image: `${baseUrl}/about/aana.jpg`,
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}#organization`,
    name: siteConfig.name,
    url: baseUrl,
    logo: `${baseUrl}/brand/ordron-logo.png`,
    image: `${baseUrl}/about/hero.jpg`,
    description:
      "Ordron designs and builds custom finance automation infrastructure for Australian mid-market businesses. 130 named automation frameworks across 13 finance platforms.",
    foundingDate: "2025",
    founders: [{ "@id": `${pageUrl}#aana` }],
    legalName: "Ordron Pty Ltd",
    taxID: "75 695 388 893",
    areaServed: { "@type": "Country", name: "Australia" },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sydney",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
    email: siteConfig.email,
    sameAs: [AANA_LINKEDIN],
  };

  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <AboutHero />
        <OriginStory />
        <WhatWeDo />
        <MagicianPrinciple />
        <FounderCards />
        <HowWeWork />
        <AboutProof />
        <AboutExplorerMagnet />
        <AboutContact />
        <AboutFinalCta />
      </main>
      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aanaSchema) }}
      />
    </>
  );
}
