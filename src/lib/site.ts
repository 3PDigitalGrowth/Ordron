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
  abn: "TBD",
  email: "hello@ordron.com",
  nav: [
    { label: "Services", href: "/services" },
    { label: "Platforms", href: "/platforms" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
  ],
  ctas: {
    scorecard: {
      label: "Take the Scorecard",
      href: "/scorecard",
    },
    healthCheck: {
      label: "Book a Health Check",
      href: "/health-check",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
