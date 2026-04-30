import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

import { escapeHtml, sendSubmissionEmails } from "@/lib/transactional-email";
import { siteConfig } from "@/lib/site";
/*
  Automation Diagnostic email-unlock handler.

  For the scaffold we log each unlock to a JSONL file inside .data so
  Alex can audit captures during QA. The ESP integration (Mailchimp,
  ConvertKit, HubSpot, whichever the client picks) gets swapped in here
  later without touching the front-end.
*/

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type UnlockBody = {
  email?: unknown;
  name?: unknown;
  company?: unknown;
  total?: unknown;
  band?: unknown;
  pillars?: unknown;
};

export async function POST(request: Request) {
  let body: UnlockBody;
  try {
    body = (await request.json()) as UnlockBody;
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }

  const record = {
    email,
    name: typeof body.name === "string" ? body.name.trim() : null,
    company: typeof body.company === "string" ? body.company.trim() : null,
    total: typeof body.total === "number" ? body.total : null,
    band: typeof body.band === "string" ? body.band : null,
    pillars: Array.isArray(body.pillars) ? body.pillars : null,
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent"),
    source: "homepage-scorecard",
  };

  try {
    const dataDir = path.join(process.cwd(), ".data");
    await fs.mkdir(dataDir, { recursive: true });
    await fs.appendFile(
      path.join(dataDir, "scorecard-unlocks.jsonl"),
      JSON.stringify(record) + "\n",
      "utf8",
    );
  } catch (err) {
    console.error("[scorecard-unlock] failed to write log", err);
    // We still return success to the client: the lead has given us
    // their email, and we can recover it from logs even if disk write
    // fails. Connecting an ESP here is the next step.
  }

  const pillarsText =
    record.pillars != null
      ? JSON.stringify(record.pillars, null, 2)
      : "(not provided)";

  const adminRows = [
    { label: "Form", value: "Finance Automation Diagnostic (Scorecard unlock)" },
    { label: "Email", value: email },
    ...(record.name ? [{ label: "Name", value: record.name }] : []),
    ...(record.company ? [{ label: "Company", value: record.company }] : []),
    ...(record.total != null
      ? [{ label: "Total score", value: String(record.total) }]
      : []),
    ...(record.band ? [{ label: "Band", value: record.band }] : []),
    { label: "Source", value: record.source },
    { label: "Submitted (UTC)", value: record.submittedAt },
    ...(record.userAgent
      ? [{ label: "User agent", value: record.userAgent.slice(0, 500) }]
      : []),
  ];

  const pillarsBlock = `
    <p style="margin:20px 0 8px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#687B89;">Pillar breakdown (JSON)</p>
    <pre style="margin:0;padding:14px 16px;background:#F7F9FB;border:1px solid #E5EAF0;border-radius:14px;font-size:12px;line-height:1.45;white-space:pre-wrap;word-break:break-word;">${escapeHtml(pillarsText)}</pre>
  `;

  await sendSubmissionEmails({
    logContext: "scorecard-unlock",
    formTitle: "Finance Automation Diagnostic",
    adminSubject: `[Ordron] Scorecard unlock: ${email}`,
    adminRows,
    adminDetailHtml: pillarsBlock,
    userEmail: email,
    userSubject: "Your Finance Automation Diagnostic is unlocked",
    userFirstNameSource: record.name,
    userLeadText:
      "Thank you for completing the Finance Automation Diagnostic. Your email is confirmed and your pillar breakdown remains available on the page where you unlocked it.",
    userLeadHtml: `
      <p style="margin:0;">Thank you for completing the Finance Automation Diagnostic. Your email is confirmed.</p>
      <p style="margin:16px 0 0;">Return to the tab where you unlocked your results to review pillar-by-pillar detail whenever you need it.</p>
    `,
    userNextSteps: [
      "Share the results with your finance lead if they were not the person at the keyboard.",
      `If you want a written plan for your stack and team, book the Finance Automation Roadmap: ${siteConfig.url}/health-check`,
    ],
  });

  return NextResponse.json({ ok: true });
}
