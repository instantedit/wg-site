# Membership ($20 / month)

Created 2026-11-19 in the **Workin Gamerz GoHighLevel sub-account** (location `6DzF4A6xK76V23h6mdwW`),
charged through the Stripe account connected there (live mode).

- Product: Payments > Products > "Workin Gamerz Membership", recurring $20.00 USD monthly, no trial or setup fee.
- Payment link: Payments > Payment Links > "Workin Gamerz Membership" (Live mode, button text "Become a member").
- Public URL: https://link.fastpaydirect.com/payment-link/6aff914921a48a3872d27b4f

The homepage `#membership` section links to `site.membershipUrl` in `lib/content.ts`
(`NEXT_PUBLIC_MEMBERSHIP_URL` overrides it; an empty value hides the section).

Perks shown in the card come from `membership.perks` in `lib/content.ts`. They are the supporter perks
from the approved Events mockup and need Nevan's confirmation. Members appear under Payments > Subscriptions.
