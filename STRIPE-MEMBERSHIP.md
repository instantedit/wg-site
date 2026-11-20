# Membership ($20 / month)

The homepage membership section is built but hidden. It appears when `NEXT_PUBLIC_MEMBERSHIP_URL`
is set on Vercel (Production) to a Stripe Payment Link, followed by a redeploy.

The plan must live in the **Workin Gamerz (Nevan) Stripe account**, not InstantEdit's:
product "Workin Gamerz Membership", recurring price $20.00 USD per month, then a Payment Link for that price.

Perks shown in the card come from `membership.perks` in `lib/content.ts`. They are the supporter perks
from the approved Events mockup and need Nevan's confirmation before launch.
