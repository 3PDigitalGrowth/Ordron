import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

import { getLeadMagnet } from "@/lib/lead-magnets";

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

  return NextResponse.json({ ok: true, delivery });
}
