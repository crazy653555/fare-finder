# Flight Price Notifier v1

## Build
- Replace the placeholder home page with a responsive dark landing page using the requested bilingual copy, exact three feature cards, sign-in header action, and 2026 footer.
- Add separate sign-in and sign-up pages using email and password, clear validation and error states, and redirects into `/app` after success.
- Add a protected `/app` screen that greets the signed-in user by email, shows the bilingual dashboard placeholder, and signs out safely.
- Keep authentication session state synchronized across navigation and refreshes.

## Visual direction
- Near-black interface with restrained violet accents, Inter typography, crisp borders, and subtle entrance motion.
- Use a compact aviation-inspired visual language that stays professional and readable on mobile.

## Technical details
- Use Lovable Cloud authentication only; enable email/password and immediate signup confirmation for this v1.
- Use the managed protected-route pattern for `/app`; do not create profiles, subscriptions, or any custom database tables.
- Add unique metadata for the landing, sign-in, sign-up, and app pages.
- Verify signup/sign-in/sign-out paths, protected access, desktop/mobile layout, and final build health.

## Out of scope
- Route subscriptions, target prices, fare data, payments, and custom data tables.
