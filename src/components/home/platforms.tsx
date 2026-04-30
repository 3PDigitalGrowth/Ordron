import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { platforms } from "@/lib/platforms";

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

        <div className="mt-10 rounded-[28px] border border-line bg-surface/70 p-6 text-center shadow-soft sm:p-8">
          <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">
            Not sure which automations apply to your stack?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            The 5-minute diagnostic maps the top three for your platform and
            team size.
          </p>
          <div className="mt-5">
            <Button href="/scorecard" variant="primary" size="md">
              Find your automation quick wins
            </Button>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] text-ink-soft">
            Running something else? If it has an API or a structured interface,
            we can usually automate against it. Read the full AU pillar guide:{" "}
            <Link
              href="/finance-automation-australia"
              className="font-semibold text-[color:var(--ordron-blue-deep)] hover:underline"
            >
              Finance automation in Australia
            </Link>
            .
          </p>
          <Button href="/platforms" variant="ghost" size="md">
            See all platforms
          </Button>
        </div>
      </Container>
    </Section>
  );
}
