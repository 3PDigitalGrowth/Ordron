import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { platforms } from "@/lib/platforms";
import { caseStudies } from "@/lib/case-studies";
import { guides } from "@/data/guides";

/**
 * Single-source sitemap. Static routes are listed by hand. Dynamic
 * routes are derived from the canonical data files so adding a
 * platform, guide or case study requires no sitemap edit.
 *
 * Priorities and changeFrequency reflect editorial value, not perfect
 * crawl tuning. Search engines treat these as hints, not directives.
 */

type Entry = MetadataRoute.Sitemap[number];

function url(path: string): string {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: Entry[] = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: url("/health-check"), lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: url("/scorecard"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/platforms"), lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: url("/case-studies"), lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: url("/finance-automation-australia"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/cost-of-inaction"), lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: url("/guide/automations"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: url("/lead-magnets/case-study-proof-pack"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const platformRoutes: Entry[] = platforms.map((p) => ({
    url: url(`/platforms/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const guideRoutes: Entry[] = guides.map((g) => ({
    url: url(`/guides/${g.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseStudyRoutes: Entry[] = caseStudies.map((c) => ({
    url: url(`/case-studies/${c.slug}`),
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...platformRoutes,
    ...guideRoutes,
    ...caseStudyRoutes,
  ];
}
