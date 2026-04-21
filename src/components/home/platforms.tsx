import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";

type Platform = {
  name: string;
  slug: string;
  shortLabel: string;
  detail: string;
};

const platforms: Platform[] = [
  { name: "Xero", slug: "xero-automation", shortLabel: "Xero", detail: "AP, AR, GL, bank" },
  { name: "MYOB", slug: "myob-automation", shortLabel: "MYOB", detail: "AP, AR, payroll" },
  { name: "QuickBooks", slug: "quickbooks-automation", shortLabel: "QuickBooks", detail: "SMB AP and GL" },
  { name: "NetSuite", slug: "netsuite-automation", shortLabel: "NetSuite", detail: "ERP AP, AR, close" },
  { name: "SAP", slug: "sap-automation", shortLabel: "SAP", detail: "Mid-market ERP" },
  { name: "Dynamics 365", slug: "dynamics-automation", shortLabel: "Dynamics", detail: "F&O and BC" },
  { name: "Hubdoc", slug: "hubdoc-automation", shortLabel: "Hubdoc", detail: "Document capture" },
  { name: "Dext", slug: "dext-automation", shortLabel: "Dext", detail: "Receipts and bills" },
  { name: "SAP Concur", slug: "concur-automation", shortLabel: "Concur", detail: "Expense" },
  { name: "Excel", slug: "excel-automation", shortLabel: "Excel", detail: "Model and workbook" },
  { name: "Bank feeds", slug: "bank-automation", shortLabel: "Bank", detail: "Portals and feeds" },
  { name: "Outlook", slug: "outlook-automation", shortLabel: "Outlook", detail: "Email workflow" },
  { name: "Power BI", slug: "power-bi-automation", shortLabel: "Power BI", detail: "Reporting layer" },
];

export function Platforms() {
  return (
    <Section tone="surface-2" size="md" id="platforms">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:items-end lg:gap-20">
          <div className="max-w-2xl">
            <Eyebrow>13 platforms, 130 automations</Eyebrow>
            <h2 className="mt-4 text-balance">
              We work with the finance stack you already run, not the one a
              vendor wants to sell you.
            </h2>
          </div>
          <p className="text-[15px] leading-relaxed text-ink-soft lg:text-right">
            Each platform has its own automation hub. Click through to see
            the named automations we have built there.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {platforms.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/platforms/${p.slug}`}
                className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-[color:var(--ordron-blue)]/30 hover:shadow-soft"
              >
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold tracking-tight text-ink">
                    {p.shortLabel}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-ink-muted">
                    {p.detail}
                  </p>
                </div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  className="shrink-0 text-ink-faint transition-colors group-hover:text-[color:var(--ordron-blue)]"
                  aria-hidden
                >
                  <path
                    d="M4 10h12m0 0-5-5m5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] text-ink-soft">
            Running something else? If it has an API or a structured interface,
            we can usually automate against it.
          </p>
          <Button href="/platforms" variant="ghost" size="md">
            See all platforms
          </Button>
        </div>
      </Container>
    </Section>
  );
}
