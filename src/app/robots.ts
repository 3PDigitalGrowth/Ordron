import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Allow general crawling, block API routes (form handlers and
 * pre-launch JSONL endpoints have no public value to a crawler), and
 * point at the canonical sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
