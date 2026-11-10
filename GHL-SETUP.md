# Connecting the site to GoHighLevel

Every wizard (Leagues finder, company play, Get Involved application, partner inquiry, contact) and the
Events newsletter post to `/api/lead`, which upserts a contact in a GoHighLevel sub-account and writes
the answers into a contact note.

## 1. Create the Workin Gamerz sub-account in GHL
The MCP connection in Claude currently points at the InstantEdit agency location, so WG needs its own
sub-account (or decide to collect WG leads in an existing one).

## 2. Create a Private Integration token
Sub-account > Settings > Private Integrations > New. Scopes needed: `contacts.write`, `contacts.readonly`.
Copy the token once; GHL does not show it again.

## 3. Copy the Location ID
Sub-account > Settings > Business Profile > Location ID.

## 4. Add both to the environment
Locally: copy `.env.local.example` to `.env.local` and fill in `GHL_API_KEY` and `GHL_LOCATION_ID`.
On Vercel: Project > Settings > Environment Variables, same two names, then redeploy.

Until both are set the route runs in demo mode: it logs the lead to the server console and the wizard
shows "Preview mode: this submission was logged but not sent to the CRM yet."

## What lands in GHL
- Contact: first/last name (split from the full name), email, phone, company name, website, source
  `workingamerz.com/<page>`.
- Tags: `website`, `wg-<intent>` and one `wg-` tag per wizard, so workflows can trigger on them:
  `wg-league-interest`, `wg-company`, `wg-get-involved`, `wg-partner`, `wg-contact`, `wg-newsletter`.
- Note: every other answer (games, availability, roles, budget, message...) as `field: value` lines.

To map answers into GHL custom fields instead of a note, create the fields in the sub-account and
extend `payload.customFields` in `app/api/lead/route.ts` with `{ key: "contact.<fieldKey>", field_value }`.
