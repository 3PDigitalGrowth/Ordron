<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Ordron website: agent rules

This project is the refreshed Ordron marketing site. It is a Next.js 16 App Router
project with Tailwind v4, deployed on Vercel. Aana Mahajan and Laith Alamin are the
client; Alex Frew at 3P Digital is the operator. The strategy document behind this
work is `Ordron_Profile_Plan_Perform_Final.pdf`.

## Voice and copy rules (hard constraints)

These rules are non-negotiable. If a rule is unclear, ask. Do not assume.

1. **Australian English, always.** Use optimise, organisation, recognise, centre,
   behaviour, prioritised, analyse, programme, catalogue, licence (noun) and
   license (verb), enrolment, labour, colour, favour, favourite, travelled,
   cancelled, utilise sparingly. Never American spellings.
2. **No em dashes. Ever.** Use commas, full stops, colons, semicolons, or
   brackets. If you catch an em dash in generated copy, rewrite the sentence.
3. **Do not sound like AI.** Avoid: "unleash", "supercharge", "revolutionise",
   "seamlessly", "empower", "leverage", "robust", "cutting-edge", "world-class",
   "game-changer", "unlock the power of", "in today's fast-paced world",
   "journey", "elevate", "streamline" (overused), "holistic", "synergy".
   Also avoid triplet sentence constructions (e.g. "faster, smarter, stronger")
   where there is no concrete substance behind them.
4. **Specifics over adjectives.** Use numbers, durations, names, dollar figures.
   "Month-end close in 2 days" beats "faster month-end close".
5. **Lead with the customer, not Ordron.** Pain first, capability second,
   proof third, price last.
6. **Short sentences.** If a sentence has two ideas, split it.
7. **CFO-literate.** The reader runs finance operations at a $10M to $50M AU
   business. They understand AP, AR, reconciliations, GL coding, BAS, PAYG,
   month-end close. Do not explain the basics. Do explain automation
   methodology if relevant.
8. **Every CTA resolves to one of two destinations only:** the Scorecard or
   the Health Check. Not "Contact us", not "Learn more", not "Get a quote".
9. **The Health Check is not free. Do not say it is.** Equally, do not
   advertise that it is a paid activity. Commercials are handled in the
   booking conversation, not on the website. Safe framings: "no obligation",
   "fixed scope", "you keep the report whether you engage Ordron or not",
   "one session, one report". Banned on any Health Check surface: "Free",
   "Free report", "No cost", "Complimentary", "On us", "Gratis". Same rule
   applies to the dialog copy, the homepage section, the dedicated Health
   Check page (when built), any ads, and any email copy.

## Brand and design rules

1. **Stay close to ordron.com visually.** The client should not need to rebuild
   their logo or asset library. Keep Ordron Blue `#00ABFF`, Navy `#0B1825`,
   Deep Blue `#004584`, Sora for headings, Commissioner for body, pill-shaped
   CTAs (50px radius), rounded soft cards.
2. **No AI-generated hero people or photorealistic AI art.** The strategy doc
   explicitly removes this from the new site. Use flat vector illustrations in
   brand palette, or clean UI/dashboard mock-ups.
3. **Use `--color-amber` only for cost-of-inaction figures.** Do not apply it
   elsewhere.
4. **Use `--color-teal` and `--color-mint` only for positive / success states**
   (e.g. scorecard low-friction band, "included" ticks).
5. **Container width default is 1140px.** Narrow is 960px. Wide is 1280px.
6. **Respect the Blue Ocean ERRC grid** (see strategy doc p. 16). In practice
   this means: eliminate consultant-dependency language, reduce perceived
   upfront cost and complexity, raise finance-specificity and practitioner
   credibility, create visible Ordron-only assets (Control Panel preview,
   Scorecard, Health Check process card).

## Architecture rules

1. App Router, Server Components by default. Mark Client Components with
   `"use client"` only when interactivity requires it.
2. Design primitives live in `src/components/ui/`. Page sections live in
   `src/components/home/` (or per-route folders for other pages).
3. Illustrations are SVG React components in `src/components/art/` so they can
   be themed and tweaked without round-tripping through raster assets.
4. All copy that appears on the homepage should be reviewable as a block; keep
   large prose in dedicated section components, not scattered in layout files.
5. Client data capture (scorecard email unlock, Health Check booking) routes
   through server actions or route handlers in `src/app/api/` so we can plug
   in the ESP later without touching components.

## Audience priorities

Primary ICP on the homepage: CFO / Finance Director / Head of Finance at a
20 to 200 staff, $10M to $50M AU business.

Secondary ICP, given a slight nod via the "Does this sound like you?" block:
SME owner / accounting firm principal, 5 to 50 staff, $1M to $15M revenue.

## Commit discipline

Do not commit unless explicitly asked. When asked, write concise commits in
Australian English, describing the "why" not just the "what".
