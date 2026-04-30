import { Resend } from "resend";

import { siteConfig } from "@/lib/site";

/** Escape text for HTML email bodies. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const COL = {
  ink: "#0B1825",
  inkSoft: "rgba(11, 24, 37, 0.72)",
  steel: "#687B89",
  blue: "#00ABFF",
  teal: "#06B59C",
  mint: "#DBF0ED",
  line: "#E5EAF0",
  surface: "#F7F9FB",
  white: "#FFFFFF",
} as const;

const DEFAULT_FROM = "Ordron <hello@ordron.com>";
const DEFAULT_REPLY_TO = "hello@ordron.com";
const DEFAULT_ADMIN =
  "hello@ordron.com,alex@3pdigital.com.au";

export type DetailRow = { label: string; value: string };

export type SubmissionEmailPayload = {
  logContext: string;
  /** e.g. "Contact form", "Finance Automation Diagnostic" */
  formTitle: string;
  adminSubject: string;
  adminRows: DetailRow[];
  /** Trusted HTML only (pre-escaped), inserted below the detail table. */
  adminDetailHtml?: string;
  userEmail: string;
  userSubject: string;
  /** Full name for "Hi {first}" */
  userFirstNameSource: string | null;
  /** Plain text paragraphs for multipart/alternative (no HTML). */
  userLeadText: string;
  /** Trusted HTML (pre-sanitised phrases only; use <p> wrappers). */
  userLeadHtml: string;
  userNextSteps: string[];
};

function parseAdminRecipients(): string[] {
  const raw = process.env.ORDRON_ADMIN_EMAILS ?? DEFAULT_ADMIN;
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function emailFooterHtml(): string {
  const url = siteConfig.url;
  const mail = siteConfig.email;
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;border-top:1px solid ${COL.line};">
      <tr>
        <td style="padding-top:22px;font-size:13px;line-height:1.65;color:${COL.steel};">
          <strong style="color:${COL.ink};">${escapeHtml(siteConfig.name)}</strong><br/>
          Sydney, NSW · Australia · ABN ${escapeHtml(siteConfig.abn)}<br/>
          <a href="mailto:${escapeHtml(mail)}" style="color:${COL.blue};text-decoration:none;font-weight:600;">${escapeHtml(mail)}</a>
          &nbsp;·&nbsp;
          <a href="${escapeHtml(url)}" style="color:${COL.blue};text-decoration:none;">${escapeHtml(url.replace(/^https?:\/\//, ""))}</a>
        </td>
      </tr>
    </table>
  `;
}

function userGreeting(nameSource: string | null): string {
  if (!nameSource?.trim()) return "Hello";
  const first = nameSource.trim().split(/\s+/)[0];
  return `Hi ${first}`;
}

function buildDetailRowsTable(rows: DetailRow[]): string {
  const body = rows
    .map(
      (r) => `
    <tr>
      <td style="padding:12px 16px 12px 0;border-bottom:1px solid ${COL.line};font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${COL.steel};vertical-align:top;width:168px;">${escapeHtml(r.label)}</td>
      <td style="padding:12px 0;border-bottom:1px solid ${COL.line};font-size:15px;line-height:1.55;color:${COL.ink};vertical-align:top;white-space:pre-wrap;">${r.value}</td>
    </tr>`,
    )
    .join("");

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${body}
    </table>
  `;
}

function adminRowsToText(rows: DetailRow[]): string {
  return rows.map((r) => `${r.label}: ${r.value.replace(/\n/g, " ")}`).join("\n");
}

function wrapAdminEmail(formTitle: string, innerHtml: string): string {
  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COL.surface};margin:0;padding:0;">
  <tr>
    <td align="center" style="padding:36px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;border-collapse:separate;">
        <tr>
          <td style="background:${COL.ink};border-radius:20px 20px 0 0;padding:26px 28px 22px;">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.16em;color:${COL.teal};">ORDRON</div>
            <h1 style="margin:10px 0 0;font-size:22px;font-weight:600;line-height:1.25;color:${COL.white};font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">New submission</h1>
            <p style="margin:8px 0 0;font-size:15px;line-height:1.5;color:rgba(255,255,255,0.78);font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${escapeHtml(formTitle)}</p>
          </td>
        </tr>
        <tr>
          <td style="background:${COL.white};border:1px solid ${COL.line};border-top:0;border-radius:0 0 20px 20px;padding:28px 28px 32px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
            ${innerHtml}
            ${emailFooterHtml()}
            <p style="margin:18px 0 0;font-size:12px;line-height:1.5;color:${COL.steel};">
              Replies to this notification go to <a href="mailto:${escapeHtml(DEFAULT_REPLY_TO)}" style="color:${COL.blue};">${escapeHtml(DEFAULT_REPLY_TO)}</a>.
              The lead's email is in the summary above.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function wrapUserEmail(greeting: string, leadHtml: string, steps: string[]): string {
  const stepsList = steps
    .map(
      (s) =>
        `<li style="margin:0 0 10px;font-size:15px;line-height:1.55;color:${COL.inkSoft};">${escapeHtml(s)}</li>`,
    )
    .join("");

  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COL.surface};margin:0;padding:0;">
  <tr>
    <td align="center" style="padding:36px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;border-collapse:separate;">
        <tr>
          <td style="height:4px;background:${COL.teal};border-radius:20px 20px 0 0;font-size:0;line-height:0;">&nbsp;</td>
        </tr>
        <tr>
          <td style="background:${COL.white};border:1px solid ${COL.line};border-top:0;border-radius:0 0 20px 20px;padding:32px 28px 32px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.16em;color:${COL.blue};">ORDRON</div>
            <h1 style="margin:12px 0 0;font-size:24px;font-weight:600;line-height:1.3;color:${COL.ink};font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">${escapeHtml(greeting)}</h1>
            <div style="margin:18px 0 0;font-size:16px;line-height:1.65;color:${COL.inkSoft};">
              ${leadHtml}
            </div>
            <div style="margin:26px 0 0;padding:20px 22px;background:${COL.mint};border-radius:16px;border:1px solid rgba(6,181,156,0.22);">
              <p style="margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${COL.teal};">What happens next</p>
              <ul style="margin:0;padding:0 0 0 20px;">${stepsList}</ul>
            </div>
            <p style="margin:22px 0 0;font-size:15px;line-height:1.65;color:${COL.inkSoft};">
              Need to reach us before we get back to you? Email
              <a href="mailto:${escapeHtml(siteConfig.email)}" style="color:${COL.blue};font-weight:600;text-decoration:none;">${escapeHtml(siteConfig.email)}</a>
              or visit
              <a href="${escapeHtml(siteConfig.url + "/contact")}" style="color:${COL.blue};font-weight:600;text-decoration:none;">our contact page</a>.
            </p>
            ${emailFooterHtml()}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

/**
 * Sends a branded admin notification (all Ordron admins) and a user confirmation.
 * From address and reply-to default to hello@ordron.com.
 */
export async function sendSubmissionEmails(
  payload: SubmissionEmailPayload,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL ?? DEFAULT_FROM;
  const replyTo = process.env.CONTACT_REPLY_TO_EMAIL ?? DEFAULT_REPLY_TO;
  const adminTo = parseAdminRecipients();

  if (!apiKey) {
    console.warn(
      `[${payload.logContext}] RESEND_API_KEY not set, transactional emails skipped`,
    );
    return;
  }

  const resend = new Resend(apiKey);

  const adminInner = `
    ${buildDetailRowsTable(
      payload.adminRows.map((r) => ({
        ...r,
        value: escapeHtml(r.value),
      })),
    )}
    ${payload.adminDetailHtml ?? ""}
  `;

  const adminHtml = wrapAdminEmail(payload.formTitle, adminInner);
  const adminText = [
    `Form: ${payload.formTitle}`,
    "",
    adminRowsToText(payload.adminRows),
    payload.adminDetailHtml
      ? `\n\nAdditional detail (see HTML version for formatting).`
      : "",
    "",
    `${siteConfig.name} · ${siteConfig.email} · ${siteConfig.url}`,
  ].join("\n");

  const greeting = userGreeting(payload.userFirstNameSource);
  const userHtml = wrapUserEmail(
    greeting,
    payload.userLeadHtml,
    payload.userNextSteps,
  );
  const userText = [
    `${greeting},`,
    "",
    payload.userLeadText,
    "",
    "What happens next",
    ...payload.userNextSteps.map((s) => `• ${s}`),
    "",
    `Need us sooner? ${siteConfig.email} · ${siteConfig.url}/contact`,
    "",
    `${siteConfig.name} · Sydney, NSW · ${siteConfig.email}`,
  ].join("\n");

  try {
    await resend.emails.send({
      from,
      to: adminTo,
      replyTo,
      subject: payload.adminSubject,
      text: adminText,
      html: adminHtml,
    });
  } catch (err) {
    console.error(
      `[${payload.logContext}] admin transactional email failed`,
      err,
    );
  }

  try {
    await resend.emails.send({
      from,
      to: payload.userEmail,
      replyTo,
      subject: payload.userSubject,
      text: userText,
      html: userHtml,
    });
  } catch (err) {
    console.error(
      `[${payload.logContext}] user transactional email failed`,
      err,
    );
  }
}
