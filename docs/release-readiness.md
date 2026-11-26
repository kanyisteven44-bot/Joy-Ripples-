# Guest website readiness — 26 November 2026

## Verified in this pass

- Clear direct navigation for Home, Dining, Catering, Gatherings, Gallery and Contact. Experiences remain linked from Home and the footer.
- Four service shortcuts on Home and a grouped footer on every main page.
- All page links, anchors, image paths, scripts, unique IDs and main headings checked with `python scripts/check-site.py`.
- General, cart and catering enquiry recipients and message encoding checked with `node scripts/check-enquiries.cjs`.
- Invalid visible cart quantities block the WhatsApp handoff. Editing a general enquiry or cart form hides the previous handoff link.
- Phone-sized browser checks at 320 and 390 CSS pixel iframe widths covered navigation, Home/Catering/Contact overflow, guest estimates and cart access. This is browser emulation, not a physical-device certification.
- Custom missing-page screen and direct-call fallback when JavaScript is unavailable.

## What the website currently does

It presents the resort and prepares WhatsApp enquiries for visitors to review and send. It does not process payments, confirm bookings, check live availability or create a resort-managed order record. Cart selections are stored locally on the visitor's device; guest contact and event fields are not stored by these scripts.

## Outstanding resort approval

The catalogue is a sample. Research-based estimate prices are not official Joy Ripples prices. A customer-ready operational menu requires approved dishes, variants, prices, ingredients and availability. Catering requires confirmed inclusions, service areas, minimums and fees. Accurate visiting information needs a verified location/map link and opening hours. Accommodation needs room photographs and details. Booking, deposit and cancellation terms must come from the resort.

These gaps prevent calling the website fully ready for taking confirmed orders or bookings. It remains a live enquiry website pending approved business content.

## 26 November: camping and stay journeys

Added dedicated accommodation, camping and team-building pages; consistent nine-link navigation; six homepage shortcuts; regional arrival guidance with entrance-pin request; camping and directions enquiry types. One clearly labelled stock bedroom image is illustrative only. No official star rating or unverified room facility is claimed.

Checks: all 11 HTML pages pass local links, headings, IDs and asset checks; contact/cart/catering WhatsApp preparation regression checks pass for both recipients; browser confirms camping preselection and helper text; ten phone iframe layouts (320/390 px for home, stay, camping, team building and contact) have no horizontal overflow. Expanded phone navigation reaches all pages. No WhatsApp messages sent.

Still needed from the resort: exact entrance pin, opening hours, actual room photos/details, approved menu and prices, package inclusions, tent availability and site facilities, booking/deposit/cancellation terms.
