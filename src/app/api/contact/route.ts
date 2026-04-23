import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { Resend } from "resend";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

/*
  Contact page submission handler.

  Three behaviours layered together:

  1. Validate. Reject malformed, too-short, or honeypot-tripped
     payloads. Matches the manual-validation style used by the other
     Ordron capture routes (scorecard-unlock, health-check-booking)
     so we don't drag in a new runtime dependency.

  2. Log. Append the submission to .data/contact-submissions.jsonl
     for QA and recovery. Same pattern as the other routes, so a
     missed Resend dispatch never means a lost lead.

  3. Send. If RESEND_API_KEY is configured, dispatch a plain notice
     email to CONTACT_INBOX_EMAIL with the user's details and a
     Reply-To header set to their address. A failure here logs and
     continues; the visitor always sees success as long as we have
     their data on disk.
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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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

  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.CONTACT_INBOX_EMAIL ?? "hello@ordron.com";

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const fromAddress =
        process.env.CONTACT_FROM_EMAIL ?? "Ordron Contact <hello@ordron.com>";
      await resend.emails.send({
        from: fromAddress,
        to: inbox,
        replyTo: email,
        subject: `Contact form: ${name}${company ? ` (${company})` : ""}`,
        text: [
          `From: ${name} <${email}>`,
          company ? `Company: ${company}` : null,
          "",
          message,
          "",
          `Submitted: ${record.submittedAt}`,
          `IP: ${ip}`,
        ]
          .filter(Boolean)
          .join("\n"),
        html: `
          <table role="presentation" style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;line-height:1.55;color:#1a2230;">
            <tr><td><strong>From:</strong> ${escapeHtml(name)} &lt;<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>&gt;</td></tr>
            ${company ? `<tr><td><strong>Company:</strong> ${escapeHtml(company)}</td></tr>` : ""}
            <tr><td style="padding-top:14px;white-space:pre-wrap;">${escapeHtml(message)}</td></tr>
            <tr><td style="padding-top:18px;font-size:12px;color:#66727f;">Submitted ${record.submittedAt} &middot; IP ${escapeHtml(ip)}</td></tr>
          </table>
        `,
      });
    } catch (err) {
      console.error("[contact] resend dispatch failed", err);
      // Don't fail the request: we already saved it to disk.
    }
  } else {
    console.warn(
      "[contact] RESEND_API_KEY not set, submission logged to .data only",
    );
  }

  return NextResponse.json({ ok: true });
}
