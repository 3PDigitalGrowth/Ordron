export const siteConfig = {
  name: "Ordron",
  description:
    "Finance automation infrastructure for Australian mid-market businesses.",
  url: "https://ordron.com",
  locale: "en-AU",
  address: {
    line1: "Sydney, NSW",
    postcode: "2059",
    country: "Australia",
  },
  abn: "75 695 388 893",
  email: "hello@ordron.com",
  nav: [
    { label: "Platforms", href: "/platforms" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "About", href: "/about" },
  ],
  ctas: {
    scorecard: {
      label: "Find your automation quick wins",
      href: "/scorecard",
    },
    healthCheck: {
      label: "Book your Roadmap",
      href: "/health-check",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
