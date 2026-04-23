import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

/*
  Automation Roadmap booking handler.

  Pre-launch we log each submission to a JSONL file inside .data so we
  can audit captures during QA. Resend (or whichever ESP the client
  settles on) gets wired in here once the site is ready to ship; this
  file is the only place that has to change to start sending real email
  notifications, and the dialog component never has to be touched.
*/

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type BookingBody = {
  name?: unknown;
  workEmail?: unknown;
  phone?: unknown;
  company?: unknown;
  role?: unknown;
  revenue?: unknown;
  platform?: unknown;
  pain?: unknown;
  window?: unknown;
  source?: unknown;
};

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function optionalStr(value: unknown): string | null {
  const trimmed = str(value);
  return trimmed.length > 0 ? trimmed : null;
}

export async function POST(request: Request) {
  let body: BookingBody;
  try {
    body = (await request.json()) as BookingBody;
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const name = str(body.name);
  const workEmail = str(body.workEmail);
  const company = str(body.company);
  const role = str(body.role);
  const revenue = str(body.revenue);
  const pain = str(body.pain);

  if (!name) {
    return NextResponse.json({ error: "missing-name" }, { status: 400 });
  }
  if (!EMAIL_RE.test(workEmail)) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }
  if (!company) {
    return NextResponse.json({ error: "missing-company" }, { status: 400 });
  }
  if (!role) {
    return NextResponse.json({ error: "missing-role" }, { status: 400 });
  }
  if (!revenue) {
    return NextResponse.json({ error: "missing-revenue" }, { status: 400 });
  }
  if (pain.length < 10) {
    return NextResponse.json({ error: "missing-pain" }, { status: 400 });
  }

  const record = {
    name,
    workEmail,
    phone: optionalStr(body.phone),
    company,
    role,
    revenue,
    platform: optionalStr(body.platform),
    window: optionalStr(body.window),
    pain,
    source: optionalStr(body.source) ?? "unknown",
    submittedAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent"),
    referer: request.headers.get("referer"),
  };

  try {
    const dataDir = path.join(process.cwd(), ".data");
    await fs.mkdir(dataDir, { recursive: true });
    await fs.appendFile(
      path.join(dataDir, "health-check-bookings.jsonl"),
      JSON.stringify(record) + "\n",
      "utf8",
    );
  } catch (err) {
    console.error("[health-check-booking] failed to write log", err);
    // Still return success to the client; the lead submitted in good
    // faith. When Resend is wired in, this try/catch also fires the
    // notification emails and failure handling gets tightened up.
  }

  return NextResponse.json({ ok: true });
}
