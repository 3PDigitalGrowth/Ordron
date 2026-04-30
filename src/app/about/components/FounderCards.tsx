import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "./motion";

type TeamMember = {
  name: string;
  role: string;
  photo: string;
  photoAlt: string;
  linkedin?: string;
  bio: readonly string[];
};

const LEADERS: TeamMember[] = [
  {
    name: "Laith Alamin",
    role: "Co-founder",
    photo: "/about/laith.jpg",
    photoAlt:
      "Portrait of Laith Alamin, co-founder and chief executive of Ordron, who sets technical direction and partnerships for the company.",
    linkedin: "https://www.linkedin.com/in/laith-alamin/",
    bio: [
      "Laith founded Ordron to build finance automation as engineering work, not slideware. His background spans engineering and process design: repeatable workflows that still behave when approvals, exceptions, and audit questions pile up.",
      "He owns strategy, partnerships, and technical direction across builds. Clients get clarity on what will run in production, not only what sounded simple in a discovery call.",
    ],
  },
  {
    name: "Aana Mahajan",
    role: "Co-founder & CEO",
    photo: "/about/aana.jpg",
    photoAlt:
      "Portrait of Aana Mahajan, co-founder and chief executive of Ordron, who leads operations, delivery and client engagements.",
    linkedin: "https://www.linkedin.com/in/aana-mahajan/",
    bio: [
      "Aana leads Ordron day to day. Her background in operations, finance systems, and strategic communications means she reads a scope the way the client reads it, not the way engineers want to write it. She owns business development, delivery governance, and the uncomfortable conversations most agencies avoid: pricing, scope creep, when to say no to a project.",
      "Clients meet Aana before they meet anyone else on the team. Ordron engagements feel consistent because she holds the standard at the door, not at the post-mortem. If a piece of work is not going to serve the client's finance team on a random Tuesday in nine months, she will tell you in the first call.",
    ],
  },
  {
    name: "Yazan Alamin",
    role: "Automation & AI Engineer",
    photo: "/about/yazan.png",
    photoAlt:
      "Portrait of Yazan Alamin, automation and AI engineer at Ordron, in professional attire against a timber slat wall.",
    bio: [
      "Yazan Alamin supports Ordron's mission to deliver practical, intelligent automation that creates real operational value. As an Automation & AI Engineer, he contributes across planning, process design, and implementation, helping transform complex workflows into efficient, scalable systems.",
      "Yazan brings a strong foundation in industrial automation, with hands-on experience in mapping processes and building automation across both physical and software environments. This background gives him a structured, systems-focused approach to identifying inefficiencies and improving how businesses operate. He has also worked with AI technologies, applying them where they add meaningful, practical value.",
      "At Ordron, Yazan works closely on solution design and delivery, ensuring systems are clear, reliable, and built to support day-to-day operations. His practical mindset and adaptability strengthen Ordron's ability to deliver automation that is both technically sound and commercially effective.",
    ],
  },
];

export function FounderCards() {
  return (
    <Section tone="surface" size="md" id="team">
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Leadership</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-balance">The people behind Ordron.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[17px] leading-[1.7] text-ink-soft">
              Laith holds product direction and how automation behaves under real
              finance controls. Aana holds how engagements are scoped, sold, and
              delivered. Yazan carries solution design through to builds that stay
              maintainable past go-live. You work with people who ship, not a
              revolving cast.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-12 lg:gap-16">
          {LEADERS.map((leader, index) => (
            <Reveal key={leader.name} delay={0.08 + index * 0.04}>
              <article className="overflow-hidden rounded-[28px] border border-line bg-surface-2 shadow-soft">
                <div className="grid items-stretch gap-0 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface-3 md:aspect-auto md:min-h-[520px]">
                    <Image
                      src={leader.photo}
                      alt={leader.photoAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 42vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(10,26,36,0) 65%, rgba(10,26,36,0.22) 100%)",
                      }}
                    />
                  </div>

                  <div className="flex flex-col justify-center p-9 sm:p-12 lg:p-14">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-[32px] font-semibold leading-tight tracking-tight text-ink sm:text-[36px]">
                          {leader.name}
                        </h3>
                        <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-[color:var(--ordron-blue-deep)]">
                          {leader.role}
                        </p>
                      </div>
                      {leader.linkedin ? (
                        <a
                          href={leader.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${leader.name} on LinkedIn`}
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ink-muted transition-colors hover:border-[color:var(--ordron-blue)] hover:text-[color:var(--ordron-blue)]"
                        >
                          <LinkedInGlyph />
                        </a>
                      ) : null}
                    </div>

                    <div className="mt-7 space-y-5 text-[16px] leading-[1.7] text-ink-soft">
                      {leader.bio.map((para) => (
                        <p key={para.slice(0, 40)}>{para}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function LinkedInGlyph() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
