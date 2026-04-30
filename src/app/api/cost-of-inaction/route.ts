import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

import {
  calculate,
  formatAud,
  type CalculatorInputs,
} from "@/lib/cost-of-inaction";
import { escapeHtml, sendSubmissionEmails } from "@/lib/transactional-email";
import { siteConfig } from "@/lib/site";
/*
  Cost of Inaction lead capture.

  The calculator shows headline numbers on-screen without asking for an
  email. This endpoint receives the email the user gives us in exchange
  for the full written breakdown. We recompute server-side so the log
  reflects the real numbers the user saw, not whatever the client sent.

  Also sends admin + user transactional email via Resend when
  RESEND_API_KEY is configured (same pattern as other capture routes).
*/

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RequestBody = {
  email?: unknown;
  name?: unknown;
  company?: unknown;
  source?: unknown;
  inputs?: {
    teamSize?: unknown;
    weeklyInvoices?: unknown;
    closeDays?: unknown;
    platformSlug?: unknown;
  };
};

function toNumber(v: unknown): number | undefined {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && v.trim() !== "") {
    const n = Number(v);
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

export async function POST(request: Request) {
  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }

  const rawInputs: Partial<CalculatorInputs> = {
    teamSize: toNumber(body.inputs?.teamSize),
    weeklyInvoices: toNumber(body.inputs?.weeklyInvoices),
    closeDays: toNumber(body.inputs?.closeDays),
    platformSlug:
      typeof body.inputs?.platformSlug === "string"
        ? body.inputs.platformSlug
        : undefined,
  };

  const result = calculate(rawInputs);

  const referer = request.headers.get("referer");

  const record = {
    email,
    name: typeof body.name === "string" ? body.name.trim() : null,
    company: typeof body.company === "string" ? body.company.trim() : null,
    source: typeof body.source === "string" ? body.source : "unknown",
    inputs: result.inputs,
    totalAnnualWaste: result.totalAnnualWaste,
    automatedSavings: result.automatedSavings,
    paybackWeeks: result.paybackWeeks,
    automations: result.automations.map((a) => a.id),
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent"),
    referer,
  };

  try {
    const dataDir = path.join(process.cwd(), ".data");
    await fs.mkdir(dataDir, { recursive: true });
    await fs.appendFile(
      path.join(dataDir, "cost-of-inaction-requests.jsonl"),
      JSON.stringify(record) + "\n",
      "utf8",
    );
  } catch (err) {
    console.error("[cost-of-inaction] failed to write log", err);
    // Still succeed: we have the lead in memory from the request;
    // ESP integration recovery happens when the connector lands.
  }

  const inputsJson = JSON.stringify(record.inputs, null, 2);

  const savingsLine = `${formatAud(result.automatedSavings)} modelled annual capture`;
  const wasteLine = `${formatAud(result.totalAnnualWaste)} modelled annual manual cost`;

  const adminRows = [
    {
      label: "Form",
      value:
        "Cost of Inaction calculator · email unlock (full breakdown + roadmap)",
    },
    { label: "Email", value: email },
    ...(record.name ? [{ label: "Name", value: record.name }] : []),
    ...(record.company ? [{ label: "Company", value: record.company }] : []),
    { label: "Source / embed", value: record.source },
    ...(referer ? [{ label: "Referer", value: referer }] : []),
    { label: "Modelled annual manual cost", value: wasteLine },
    { label: "Modelled annual capture (automation)", value: savingsLine },
    { label: "Modelled payback (weeks)", value: String(result.paybackWeeks) },
    {
      label: "Suggested automation IDs",
      value: record.automations.join(", ") || "(none)",
    },
    { label: "Submitted (UTC)", value: record.submittedAt },
    ...(record.userAgent
      ? [{ label: "User agent", value: record.userAgent.slice(0, 500) }]
      : []),
  ];

  const inputsBlock = `
    <p style="margin:20px 0 8px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#687B89;">Calculator inputs (JSON)</p>
    <pre style="margin:0;padding:14px 16px;background:#F7F9FB;border:1px solid #E5EAF0;border-radius:14px;font-size:12px;line-height:1.45;white-space:pre-wrap;word-break:break-word;">${escapeHtml(inputsJson)}</pre>
  `;

  await sendSubmissionEmails({
    logContext: "cost-of-inaction",
    formTitle: "Cost of Inaction · calculator unlock",
    adminSubject: `[Ordron] Calculator unlock: ${email}`,
    adminRows,
    adminDetailHtml: inputsBlock,
    userEmail: email,
    userSubject: "Thank you for unlocking your Cost of Inaction breakdown",
    userFirstNameSource: record.name,
    userLeadText:
      `Thank you for unlocking the full Cost of Inaction breakdown on ${siteConfig.url.replace(/^https?:\/\//, "")}. The modelled savings you saw are specific to the inputs you entered. You can connect with our team at any time to discuss what it would take to realise those savings in your environment. Email hello@ordron.com or use the contact page on the site.`,
    userLeadHtml: `
      <p style="margin:0;">Thank you for unlocking the full <strong>Cost of Inaction</strong> breakdown. The headline figures you saw on the calculator stay on that page: this message is your confirmation that we have your details and your inputs.</p>
      <p style="margin:16px 0 0;">The modelled savings are specific to what you entered. If you want to pressure-test the assumptions or talk through what it would take to <strong>achieve those savings</strong> in production, you are welcome to reach out whenever it suits you.</p>
    `,
    userNextSteps: [
      "Reply to this email or write to hello@ordron.com to speak with a practitioner about your numbers and your stack.",
      `Explore the Finance Automation Roadmap if you want a structured session and written plan: ${siteConfig.url}/health-check`,
      "Keep the calculator tab open if you need the exact dollar figures for an internal paper; we do not attach a PDF to this message.",
    ],
  });

  return NextResponse.json({ ok: true, result });
}
