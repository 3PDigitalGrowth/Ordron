import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { escapeHtml, sendSubmissionEmails } from "@/lib/transactional-email";

/*
  Contact page submission handler.

  1. Validate (rate limit, honeypot, time trap, field rules).
  2. Log to .data/contact-submissions.jsonl.
  3. Send branded admin + user emails via Resend when RESEND_API_KEY is set.
*/

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_NAME = 200;
const MAX_COMPANY = 200;
const MAX_MESSAGE = 5000;
const MIN_MESSAGE = 10;
/** Any submission under this many ms from form mount is almost
 * certainly a bot auto-filling the page, so we drop it silently. */
const MIN_TIME_ON_PAGE_MS = 2000;

const RATE_LIMIT_OPTS = {
  limit: 5,
  windowMs: 60 * 60 * 1000,
};

type ContactBody = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  company_url?: unknown;
  startedAt?: unknown;
};

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function optionalStr(value: unknown): string | null {
  const trimmed = str(value);
  return trimmed.length > 0 ? trimmed : null;
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  // Rate limit per IP before doing any real work.
  const ip = getClientIp(request);
  const limit = checkRateLimit(`contact:${ip}`, RATE_LIMIT_OPTS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "rate-limited" },
      {
        status: 429,
        headers: {
          "retry-after": Math.max(
            1,
            Math.ceil((limit.resetAt - Date.now()) / 1000),
          ).toString(),
        },
      },
    );
  }

  // Honeypot. Pretend success without any side effects so the bot
  // never learns the field is a trap.
  const honeypot = str(body.company_url);
  if (honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Time trap. Same "silent accept" idea: don't tip off the bot.
  const startedAt =
    typeof body.startedAt === "number" ? body.startedAt : null;
  if (startedAt !== null) {
    const elapsed = Date.now() - startedAt;
    if (elapsed < MIN_TIME_ON_PAGE_MS) {
      return NextResponse.json({ ok: true });
    }
  }

  const name = str(body.name);
  const email = str(body.email);
  const company = str(body.company);
  const message = str(body.message);

  if (!name) {
    return NextResponse.json({ error: "missing-name" }, { status: 400 });
  }
  if (name.length > MAX_NAME) {
    return NextResponse.json({ error: "name-too-long" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }
  if (company.length > MAX_COMPANY) {
    return NextResponse.json(
      { error: "company-too-long" },
      { status: 400 },
    );
  }
  if (message.length < MIN_MESSAGE) {
    return NextResponse.json({ error: "missing-message" }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE) {
    return NextResponse.json(
      { error: "message-too-long" },
      { status: 400 },
    );
  }

  const record = {
    name,
    email,
    company: optionalStr(body.company),
    message,
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent"),
    referer: request.headers.get("referer"),
    ip,
    source: "contact-page",
  };

  try {
    const dataDir = path.join(process.cwd(), ".data");
    await fs.mkdir(dataDir, { recursive: true });
    await fs.appendFile(
      path.join(dataDir, "contact-submissions.jsonl"),
      JSON.stringify(record) + "\n",
      "utf8",
    );
  } catch (err) {
    console.error("[contact] failed to write log", err);
    // Keep going: the client's submission is still worth dispatching
    // via email if we can.
  }

  const adminRows = [
    { label: "Form", value: "Contact page" },
    { label: "Name", value: name },
    { label: "Email", value: email },
    ...(record.company ? [{ label: "Company", value: record.company }] : []),
    { label: "Message", value: message },
    { label: "Submitted (UTC)", value: record.submittedAt },
    { label: "IP", value: ip },
    ...(record.referer
      ? [{ label: "Referer", value: record.referer }]
      : []),
    ...(record.userAgent
      ? [{ label: "User agent", value: record.userAgent.slice(0, 500) }]
      : []),
  ];

  await sendSubmissionEmails({
    logContext: "contact",
    formTitle: "Contact form",
    adminSubject: `[Ordron] Contact: ${name}${company ? ` (${company})` : ""}`,
    adminRows,
    userEmail: email,
    userSubject: "We received your message",
    userFirstNameSource: name,
    userLeadText:
      "Thanks for getting in touch. We received your message and will reply from our team inbox. A copy of what you sent is at the end of this email for your records.",
    userLeadHtml: `
      <p style="margin:0;">Thanks for getting in touch. We received your message and will reply from our team inbox.</p>
      <p style="margin:16px 0 0;">For your records, here is what you sent:</p>
      <div style="margin:14px 0 0;padding:16px 18px;background:#F7F9FB;border-radius:14px;border:1px solid #E5EAF0;font-size:15px;line-height:1.55;color:#0B1825;white-space:pre-wrap;">${escapeHtml(message)}</div>
    `,
    userNextSteps: [
      "We read every message. Expect a reply within one Australian business day, often sooner.",
      "If your matter is urgent, email hello@ordron.com with your company name in the subject line.",
    ],
  });

  return NextResponse.json({ ok: true });
}
