import { NextResponse } from "next/server";

/**
 * Lead intake for every wizard and the newsletter. Upserts the contact in GoHighLevel
 * (LeadConnector API v2) and writes the full answer set into a contact note.
 *
 * Env (see .env.local.example):
 *   GHL_PRIVATE_TOKEN  Private Integration token for the Workin Gamerz sub-account (GHL_API_KEY also works)
 *   GHL_LOCATION_ID  that sub-account's location id
 * Without both, the route runs in demo mode: it logs the lead and answers { delivered: false }.
 */

const GHL = "https://services.leadconnectorhq.com";

type LeadBody = { intent?: string; tags?: string[]; page?: string; data?: Record<string, unknown>; website_hp?: string };

const str = (v: unknown) => (Array.isArray(v) ? v.join(", ") : v == null ? "" : String(v)).trim();
const splitName = (full: string) => {
  const parts = full.trim().split(/\s+/);
  return { firstName: parts[0] ?? "", lastName: parts.slice(1).join(" ") };
};

const ghlEnv = () => ({ key: process.env.GHL_PRIVATE_TOKEN || process.env.GHL_API_KEY, locationId: process.env.GHL_LOCATION_ID });

/** Reports whether the CRM connection is configured (no secrets). */
export async function GET() {
  const { key, locationId } = ghlEnv();
  return NextResponse.json({ configured: Boolean(key && locationId) }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  let body: LeadBody;
  try {
    body = (await req.json()) as LeadBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
  // Honeypot: bots fill the hidden field, humans never see it.
  if (body.website_hp) return NextResponse.json({ ok: true, delivered: false });

  const data = body.data ?? {};
  const email = str(data.email).toLowerCase();
  const phone = str(data.phone);
  if (!email && !phone) return NextResponse.json({ ok: false, error: "Email or phone required" }, { status: 400 });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });

  const intent = (body.intent ?? "contact").replace(/[^a-z0-9-]/gi, "").toLowerCase();
  const tags = Array.from(new Set(["website", `wg-${intent}`, ...(body.tags ?? []).map((t) => `wg-${str(t).toLowerCase().replace(/\s+/g, "-")}`)]));
  const { firstName, lastName } = splitName(str(data.name));
  const note = [`Workin Gamerz website: ${intent}`, body.page ? `Page: ${body.page}` : "", ...Object.entries(data).filter(([k]) => !["name", "email", "phone"].includes(k)).map(([k, v]) => `${k.replace(/_/g, " ")}: ${str(v)}`)]
    .filter(Boolean)
    .join("\n");

  const { key, locationId } = ghlEnv();
  if (!key || !locationId) {
    console.log("[lead:demo]", JSON.stringify({ intent, tags, email, phone, firstName, lastName, note }, null, 2));
    return NextResponse.json({ ok: true, delivered: false });
  }

  const headers = { Authorization: `Bearer ${key}`, Version: "2021-07-28", "Content-Type": "application/json", Accept: "application/json" };
  const payload: Record<string, unknown> = {
    locationId,
    firstName,
    lastName,
    source: `workingamerz.com${body.page ?? ""}`,
    tags,
  };
  if (email) payload.email = email;
  if (phone) payload.phone = phone;
  if (str(data.company)) payload.companyName = str(data.company);
  if (str(data.website)) payload.website = str(data.website);

  try {
    const res = await fetch(`${GHL}/contacts/upsert`, { method: "POST", headers, body: JSON.stringify(payload) });
    const json = (await res.json().catch(() => ({}))) as { contact?: { id?: string }; message?: string };
    if (!res.ok) {
      console.error("[lead:ghl]", res.status, json.message);
      return NextResponse.json({ ok: false, error: "CRM rejected the lead" }, { status: 502 });
    }
    const id = json.contact?.id;
    if (id) await fetch(`${GHL}/contacts/${id}/notes`, { method: "POST", headers, body: JSON.stringify({ body: note }) }).catch(() => undefined);
    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    console.error("[lead:ghl]", e);
    return NextResponse.json({ ok: false, error: "CRM unreachable" }, { status: 502 });
  }
}
