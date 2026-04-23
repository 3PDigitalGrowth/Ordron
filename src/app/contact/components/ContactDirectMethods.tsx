import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/app/platforms/[slug]/components/motion";

/*
  Note on partnerships@ordron.com: when this ships, the address may
  not yet be provisioned on the domain. If it bounces, route-forward
  partnerships@ -> hello@ at the mail provider level and leave this
  markup alone. Keeping the published address stable matters more for
  referral partners than the plumbing behind it.
*/

type Method = {
  eyebrow: string;
  label: string;
  value: string;
  href?: string;
  sub: string;
  icon: ReactNode;
};

const methods: Method[] = [
  {
    eyebrow: "General enquiries",
    label: "Email",
    value: "hello@ordron.com",
    href: "mailto:hello@ordron.com",
    sub: "We respond within one business day.",
    icon: <MailIcon />,
  },
  {
    eyebrow: "Partnerships and referrals",
    label: "For partners",
    value: "partnerships@ordron.com",
    href: "mailto:partnerships@ordron.com",
    sub: "Accounting firms, advisors, and referral partners.",
    icon: <HandshakeIcon />,
  },
  {
    eyebrow: "Office",
    label: "Based in",
    value: "Sydney, NSW",
    sub: "Australia-wide delivery. Remote-first, in person on request.",
    icon: <PinIcon />,
  },
];

export function ContactDirectMethods() {
  return (
    <Section tone="surface" size="md">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Everything else</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl">
              Reach us directly
            </h2>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {methods.map((m, i) => (
            <Reveal
              key={m.value}
              as="li"
              delay={0.05 + i * 0.05}
              amount={0.2}
            >
              <div className="flex h-full flex-col gap-5 rounded-2xl border border-line bg-surface-2 p-7">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--ordron-mint)] text-[color:var(--ordron-teal)]">
                  {m.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    {m.eyebrow}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink-faint">
                    {m.label}
                  </p>
                  {m.href ? (
                    <a
                      href={m.href}
                      className="mt-1.5 block break-words font-display text-xl font-semibold text-ink underline-offset-4 transition-colors hover:text-[color:var(--ordron-teal)] hover:underline sm:text-2xl"
                    >
                      {m.value}
                    </a>
                  ) : (
                    <p className="mt-1.5 font-display text-xl font-semibold text-ink sm:text-2xl">
                      {m.value}
                    </p>
                  )}
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                    {m.sub}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function MailIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.5 4.5h13v9h-13z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m2.5 5 6.5 5 6.5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.5 9.5 6 6l2 2 2-2 3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 12.5 8 14.5 10 12.5 12 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
    >
      <path
        d="M9 2.5c-3 0-5.25 2.3-5.25 5.2 0 3.8 5.25 8.3 5.25 8.3s5.25-4.5 5.25-8.3c0-2.9-2.25-5.2-5.25-5.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle
        cx="9"
        cy="7.5"
        r="1.75"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
