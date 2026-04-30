import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

import { getLeadMagnet } from "@/lib/lead-magnets";
import { escapeHtml, sendSubmissionEmails } from "@/lib/transactional-email";
import { siteConfig } from "@/lib/site";
/*
  Lead magnet capture.

  Shared endpoint for every gated asset registered in
  `src/lib/lead-magnets.ts`. Writes the lead to a JSONL log until the
  ESP integration lands. The response tells the client how to fulfil
  the download (instant PDF, on-site asset, or "check your inbox").
*/

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RequestBody = {
  magnetId?: unknown;
  email?: unknown;
  name?: unknown;
  company?: unknown;
  role?: unknown;
  source?: unknown;
};

export async function POST(request: Request) {
  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const magnetId =
    typeof body.magnetId === "string" ? body.magnetId.trim() : "";
  const magnet = getLeadMagnet(magnetId);
  if (!magnet) {
    return NextResponse.json({ error: "unknown-magnet" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }

  const company =
    typeof body.company === "string" ? body.company.trim() : "";
  if (magnet.requireCompany && company.length === 0) {
    return NextResponse.json({ error: "company-required" }, { status: 400 });
  }

  const record = {
    magnetId,
    email,
    name: typeof body.name === "string" ? body.name.trim() : null,
    company: company || null,
    role: typeof body.role === "string" ? body.role.trim() : null,
    source: typeof body.source === "string" ? body.source : "unknown",
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent"),
  };

  try {
    const dataDir = path.join(process.cwd(), ".data");
    await fs.mkdir(dataDir, { recursive: true });
    await fs.appendFile(
      path.join(dataDir, "lead-magnet-requests.jsonl"),
      JSON.stringify(record) + "\n",
      "utf8",
    );
  } catch (err) {
    console.error("[lead-magnet] failed to write log", err);
  }

  // What the client should tell the user next.
  let delivery:
    | { mode: "instant"; downloadUrl: string }
    | { mode: "emailed" }
    | { mode: "on-site"; href: string };

  if (magnet.delivery.type === "pdf") {
    delivery = { mode: "instant", downloadUrl: magnet.delivery.path };
  } else if (magnet.delivery.type === "on-site") {
    delivery = { mode: "on-site", href: magnet.delivery.href };
  } else {
    delivery = { mode: "emailed" };
  }

  const deliverySummary =
    delivery.mode === "instant"
      ? `Instant PDF (${delivery.downloadUrl})`
      : delivery.mode === "on-site"
        ? `On-site (${siteConfig.url}${delivery.href})`
        : "Emailed PDF (manual fulfilment)";

  const adminRows = [
    { label: "Form", value: "Lead magnet request" },
    { label: "Magnet title", value: magnet.title },
    { label: "Magnet ID", value: magnetId },
    { label: "Delivery mode", value: deliverySummary },
    { label: "Email", value: email },
    ...(record.name ? [{ label: "Name", value: record.name }] : []),
    ...(record.company ? [{ label: "Company", value: record.company }] : []),
    ...(record.role ? [{ label: "Role", value: record.role }] : []),
    { label: "Source / page", value: record.source },
    { label: "Submitted (UTC)", value: record.submittedAt },
    ...(record.userAgent
      ? [{ label: "User agent", value: record.userAgent.slice(0, 500) }]
      : []),
  ];

  const userNextSteps =
    delivery.mode === "instant"
      ? [
          "If the download did not start, return to the site and submit the form again with the same email.",
          "Forward the file to your finance lead if they own the automation conversation.",
        ]
      : delivery.mode === "on-site"
        ? [
            `Open your resource here: ${siteConfig.url}${delivery.href}`,
            "Bookmark the page if you plan to revisit your inputs or results.",
          ]
        : [
            "We will send the PDF to this address from our team. Most messages arrive within a few minutes.",
            "If nothing appears, check spam and promotions folders, then email hello@ordron.com.",
          ];

  const userSubject =
    delivery.mode === "instant"
      ? `Your download: ${magnet.title}`
      : delivery.mode === "on-site"
        ? `Next step: ${magnet.title}`
        : `Request received: ${magnet.title}`;

  await sendSubmissionEmails({
    logContext: "lead-magnet",
    formTitle: `Lead magnet · ${magnet.title}`,
    adminSubject: `[Ordron] Lead magnet (${magnetId}): ${email}`,
    adminRows,
    userEmail: email,
    userSubject,
    userFirstNameSource: record.name,
    userLeadText: `Thank you for requesting "${magnet.title}". ${delivery.mode === "instant" ? "Use the download on the confirmation page if your browser blocked the file." : delivery.mode === "on-site" ? "Use the link on the site to open your resource." : "We will email the asset to this address from our team."}`,
    userLeadHtml: `
      <p style="margin:0;">Thank you for requesting <strong>${escapeHtml(magnet.title)}</strong>.</p>
      <p style="margin:14px 0 0;">${
        delivery.mode === "instant"
          ? "Your browser should have started the download. If it did not, go back to the site and request the file again."
          : delivery.mode === "on-site"
            ? `Continue on site: <a href="${escapeHtml(siteConfig.url + delivery.href)}" style="color:#00ABFF;font-weight:600;text-decoration:none;">${escapeHtml(siteConfig.url + delivery.href)}</a>`
            : "We will email the PDF from our team inbox. No attachment is included in this confirmation on purpose."
      }</p>
    `,
    userNextSteps,
  });

  return NextResponse.json({ ok: true, delivery });
}
