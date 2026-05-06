type Props = {
  name: string;
};

/**
 * Author bio strip. Spec §4 calls for "small avatar, name, one-line
 * title". The Ordron site does not currently maintain individual
 * author profiles; everything ships under the Ordron team byline.
 * If we add named contributors later, swap the constant lookup below
 * for a real author registry.
 */
const AUTHOR_DETAILS: Record<string, { role: string; bio: string; initials: string }> = {
  Ordron: {
    role: "Finance automation team, Sydney",
    bio: "Ordron builds the finance automation infrastructure that runs AP, AR, reconciliations and reporting on autopilot for Australian mid-market businesses.",
    initials: "OR",
  },
  "3P Digital": {
    role: "SEO operator",
    bio: "3P Digital ships the editorial calendar that keeps the Ordron Insights catalogue current.",
    initials: "3P",
  },
};

const FALLBACK_AUTHOR = AUTHOR_DETAILS.Ordron;

export function AuthorBio({ name }: Props) {
  const details = AUTHOR_DETAILS[name] ?? FALLBACK_AUTHOR;

  return (
    <section className="mt-16 flex items-start gap-5 rounded-2xl border border-line bg-surface-2 p-6 sm:p-7">
      <div
        aria-hidden="true"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-display text-[15px] font-semibold text-white"
      >
        {details.initials}
      </div>
      <div className="flex flex-col">
        <p className="font-display text-[16px] font-semibold text-ink">{name}</p>
        <p className="text-[13px] uppercase tracking-[0.08em] text-ink-muted">
          {details.role}
        </p>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-soft">
          {details.bio}
        </p>
      </div>
    </section>
  );
}
