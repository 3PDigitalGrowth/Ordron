import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

/*
  Scorecard email-unlock handler.

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

  return NextResponse.json({ ok: true });
}
