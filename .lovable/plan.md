# Adorzia — Build Plan

A premium, white-themed editorial site for a fashion incubator, plus a secure admin dashboard. Designers and content are admin-managed in v1; marketplace is showcase-only (no checkout).

## Design language

- **Aesthetic**: editorial luxury (Vogue / The Row / SSENSE). White background, generous whitespace, large hero imagery, restrained motion.
- **Typography**: serif display (e.g. Cormorant / Instrument Serif) for headings + clean sans (Inter) for body. Wide tracking on small caps labels.
- **Palette**: pure white background, near-black ink (#0A0A0A), warm neutral accents, single muted gold for hover/accent.
- **Layout**: asymmetric editorial grids, oversized imagery, thin hairline dividers, minimal nav.

## Pages (public)

1. **Home** — full-bleed hero, mission line, three pillars (Studio / Marketplace / Spotlight), featured designers strip, Spotlight CTA, footer.
2. **About** — story, vision, founders/team grid, values, press.
3. **For Creatives** — studio coworking, marketplace placement, Spotlight, application CTA.
4. **For Partners** — sponsorship, investment, brand collaboration tiers, inquiry CTA.
5. **Spotlight Event** — what it is, prizes (cash, investment, studio access, marketplace placement), timeline, jury, application form.
6. **Contact** — contact form + studio details.
7. **Marketplace (bonus, showcase only)** — `/marketplace` designer index + `/marketplace/$slug` designer profile with collections and product gallery. Linked from Home and For Creatives.

Each route owns its `head()` metadata (title, description, og:*).

## Admin dashboard (`/admin`)

Email/password login (Lovable Cloud auth). Single admin role — anyone authenticated has access. Sections:

- **Designers**: create/edit profiles, upload cover + portrait, manage collections and products.
- **Spotlight applications**: list, view, mark status (new / shortlisted / rejected / winner), export.
- **Contact inquiries**: list and mark resolved.
- **Partner inquiries**: same.
- **Site content** (light): editable home hero copy + featured designers selection.

## Data model (Lovable Cloud)

Tables:
- `designers` (slug, name, bio, portrait_url, cover_url, instagram, featured, published)
- `collections` (designer_id, title, year, description, cover_url, order)
- `products` (collection_id, name, description, price_display, images[], order)
- `spotlight_applications` (name, email, phone, brand_name, portfolio_url, instagram, concept_statement, lookbook_urls[], status, created_at)
- `contact_inquiries` (name, email, subject, message, resolved, created_at)
- `partner_inquiries` (company, contact_name, email, interest_type, message, resolved, created_at)
- `site_settings` (singleton: hero_eyebrow, hero_title, hero_subtitle)

Storage buckets: `designers` (public), `collections` (public), `spotlight-lookbooks` (private, admin-readable).

RLS:
- Public SELECT on `designers`/`collections`/`products` where `published = true`, and `site_settings`.
- Public INSERT on the three inquiry/application tables (rate-limit via server fn).
- All other ops gated to authenticated users.

## Backend (TanStack Start server functions)

- `submitContactInquiry`, `submitPartnerInquiry`, `submitSpotlightApplication` — public server fns that validate with Zod, insert via `supabaseAdmin`, then trigger Resend emails.
- Admin CRUD fns protected with `requireSupabaseAuth`.

## Emails (Resend via connector)

- Contact form → confirmation to submitter + notification to admin inbox.
- Partner inquiry → confirmation + notification.
- Spotlight application → branded confirmation to applicant + notification with summary to admin.

Templates as React Email components in `src/lib/email-templates/`, all sharing an editorial white/serif layout.

## Tech & structure

- TanStack Start file-based routes under `src/routes/`, admin under `src/routes/_authenticated/admin/...` with login at `/admin/login`.
- Shared components in `src/components/` (SiteHeader, SiteFooter, EditorialHero, SectionLabel, DesignerCard, ProductGrid, AdminLayout, AdminTable).
- Tokens (colors, fonts, radii) defined in `src/styles.css`.
- TanStack Query for all reads; `useSuspenseQuery` + loaders.
- Image optimization via responsive `<img>` + lazy loading; storage URLs.
- Sitemap, robots, per-route metadata, JSON-LD Organization on Home.

## Setup steps (in order)

1. Enable Lovable Cloud.
2. Migrations: create tables, RLS, storage buckets + policies.
3. Connect Resend; create email templates and send helpers.
4. Build shared layout (header, footer, typography tokens).
5. Build the 6 public pages + marketplace routes with seeded placeholder content + AI-generated editorial imagery.
6. Build admin auth + dashboard CRUD screens.
7. Wire forms → server fns → DB + Resend.
8. SEO pass (titles, descriptions, sitemap, robots, JSON-LD).
9. Responsive QA (desktop / tablet / mobile).

## Out of scope (v1)

- Designer self-registration and self-serve dashboards.
- Cart, checkout, payments.
- Role-based permissions beyond "authenticated = admin".
- Multi-language.

## Open assumptions

- "Applications" for Spotlight = standard fields (brand, portfolio link, concept statement, lookbook image uploads, Instagram). I'll build this set; easy to extend later.
- Admin email for notifications will be requested as a secret/setting during build.
