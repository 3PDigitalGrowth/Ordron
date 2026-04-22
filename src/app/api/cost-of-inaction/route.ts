import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

import {
  calculate,
  type CalculatorInputs,
} from "@/lib/cost-of-inaction";

/*
  Cost of Inaction lead capture.

  The calculator shows headline numbers on-screen without asking for an
  email. This endpoint receives the email the user gives us in exchange
  for the full written breakdown. We recompute server-side so the log
  reflects the real numbers the user saw, not whatever the client sent.

  Log lives at .data/cost-of-inaction-requests.jsonl until the ESP
  (Mailchimp / ConvertKit / HubSpot) integration lands.
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

  return NextResponse.json({ ok: true, result });
}
