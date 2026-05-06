import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { platforms } from "@/lib/platforms";
import { caseStudies } from "@/lib/case-studies";
import { guides } from "@/data/guides";
import { getAllPosts } from "@/lib/blog";

/**
 * XML sitemap at `/sitemap.xml` (Next.js MetadataRoute). Declared in
 * `robots.ts` as the canonical sitemap for crawlers.
 *
 * Static routes are listed explicitly. Dynamic routes come from
 * `platforms`, `guides` and `case-studies` so new hubs do not need a
 * sitemap edit. Priorities and changeFrequency are hints only.
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
    { url: url("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.85 },
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

  // Drafts are excluded by `getAllPosts`, so unpublished editor
  // previews never make it into the sitemap.
  const blogRoutes: Entry[] = getAllPosts().map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const entries: Entry[] = [
    ...staticRoutes,
    ...platformRoutes,
    ...guideRoutes,
    ...caseStudyRoutes,
    ...blogRoutes,
  ];

  entries.sort((a, b) => a.url.localeCompare(b.url, "en-AU"));

  return entries;
}
