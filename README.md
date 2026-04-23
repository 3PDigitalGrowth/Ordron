# Ordron

Finance automation infrastructure for Australian mid-market businesses. Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and populate the values you need. No environment variable is required to run the site locally; they only gate the specific integrations listed below.

### Contact form (Resend)

The `/contact` form posts to `/api/contact`, which does three things in order:

1. **Validate** the payload (manual validation, matching the other Ordron capture routes).
2. **Append** the submission to `.data/contact-submissions.jsonl` on disk, so no lead is ever lost if email dispatch fails.
3. **Send** an email via [Resend](https://resend.com) when `RESEND_API_KEY` is configured. A failure here is logged and the handler still returns success, because the on-disk record is enough to recover from.

Environment variables:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key. When unset, submissions are logged to disk only and a warning is logged to the server console. |
| `CONTACT_INBOX_EMAIL` | Destination address for contact notifications. Defaults to `hello@ordron.com`. |
| `CONTACT_FROM_EMAIL` | "From" header on outbound notifications. Must be a verified sender on the Resend domain. Defaults to `Ordron Contact <hello@ordron.com>`. |

### Spam protection

The contact route layers three defences:

- **Honeypot field** (`company_url`). If populated, the handler returns success silently.
- **Time trap.** Submissions under two seconds from form mount are treated as bots and dropped silently.
- **Rate limit.** Five submissions per IP per hour. Implemented in-memory at `src/lib/rate-limit.ts` and shared across other forms. Because state lives in a module-level Map, this resets on every serverless cold start and is not shared across instances. Swap for `@upstash/ratelimit` (or equivalent) when the site graduates to multi-instance production traffic.

## Deployment

Deploy to [Vercel](https://vercel.com/new). Add the environment variables above under Project Settings > Environment Variables.
