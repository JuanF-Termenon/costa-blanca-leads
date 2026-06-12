<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Costa Blanca Leads — Session Context

## Goal
Build and polish a SaaS landing page + interactive demo for selling SEO-optimized websites to real estate agencies in Costa Blanca (Calpe, Benidorm, Altea, etc.)

## Constraints & Preferences
- Solo founder building MVP; must look professional to show prospects immediately
- Landing page copy must sell "leads/contacts/visibility" not "websites/SEO"
- One-time payment pricing: Inicio 790€, Profesional 1.490€, Premium 2.990€ (crossed-out original prices)
- Must work 24/7 from Vercel without user's PC
- Properties written in Spanish in demo-properties.ts, auto-translated at build time

## Tech Stack
- Next.js 16.2.9 (Turbopack), React, TypeScript
- Resend (email via API), WhatsApp API (pending SIM)
- Vercel hosting, Geist fonts, Lucide icons
- App Router, server components, client components where needed
- i18n: 5 locales (es/en/de/fr/ru) via flat dictionaries + property translation overrides
- Auto-translation: Google Translate on Vercel build (prebuild script), DeepL locally with API key

## Completed Features

### Landing Page (/)
- Hero: "Convierte Google en una fuente constante de compradores para tu inmobiliaria"
- Benefits section (4 cards: Aparece en Google, Contactos al momento, SEO sin esfuerzo, Resultados reales)
- Demo preview (3 property cards from demo-properties.ts)
- "Asi funciona" section (3 steps: Elegimos tu zona, Creamos tu web, Recibe contactos)
- ROI block (cost vs value comparison)
- Pricing: 3 one-time plans cards (Inicio 790€, Profesional 1.490€, Premium 2.990€) with crossed-out prices
- FAQ (7 questions)
- Contact section → "Agenda tu demo de 15 minutos"
- Footer

### Demo Page (/demo)
- 14 properties (10 venta, 4 alquiler) with `purpose` field
- Filter tabs (Todas/Comprar/Alquilar) with real-time search
- Property modal with 3 contact methods (Telefono/Email/WhatsApp)
- Contact methods include property ref, title, location, price, and direct link to /demo?ref=CBL-XXX
- Back button (←) in header to return to landing page
- Auto-opens modal when URL has ?ref=CBL-XXX parameter

### Pricing
- Three plans: Inicio (790€, original 1.290€), Profesional (1.490€, original 2.490€), Premium (2.990€, original 4.990€)
- One-time payment, no monthly fees
- All plans include Google Maps, SEO optimization, responsive design, hosting 1 year
- Launch tag per card ("precio de lanzamiento · pago único")
- Translated in all 5 languages

### Auto-Translation (@ build time)
- `prebuild` script runs `scripts/translate-properties.mjs` before `next build`
- On Vercel: uses `@vitalets/google-translate-api` (Vercel IP not rate-limited)
- Locally: requires `DEEPL_API_KEY` env var (DeepL) to translate; without key, just reports pending items
- Only translates properties whose text still matches Spanish (detects already-translated)
- Batches title+location+desc in a single API call per property per language
- Property types use manual overrides (not auto-translated) for accuracy
- Script: `npm run translate-props`

### Property Localization
- `src/lib/property-translations.ts`: per-locale overrides for title/location/type/desc
- `localizeProperty(property, locale)` merges overrides with Spanish originals
- Missing locales gracefully fall back to Spanish
- English fully translated; DE/FR/RU auto-translated on Vercel deploy
- Property type names translated in all 5 languages via MANUAL_TYPES map

### Booking Flow
- Section: "Agenda tu demo de 15 minutos"
- Two options:
  1. WhatsApp button → pre-filled text: "Hola, quiero agendar una videollamada de 15 minutos para ver la demo. ¿Cuando podriamos hacerla?"
  2. Form: name, email, phone (required + regex validation: spanish numbers), preferred_time (required)
- API /api/contact sends email via Resend to user + attempts WhatsApp if configured
- Email subject: "Demo: [name] - [phone]"
- Form success: "Te escribo en breve para concretar el dia y la hora de la videollamada."
- All CTAs → #agenda-tu-demo

### Hidden Phone Number
- Floating WhatsApp button on landing page only (hidden on /demo)
- API /api/whatsapp redirects to wa.me — number never exposed in client code
- Property modal WhatsApp also goes through /api/whatsapp?text=...
- Server-only env var: WHATSAPP_PHONE (not NEXT_PUBLIC_)

### Dark Mode + Language Switcher
- ThemeContext + LangContext in Providers (client component, persisted to localStorage)
- 5 languages: es/en/de/fr/ru via flat Record<string, string> dictionaries
- `getTranslator(locale)` falls back to Spanish for missing keys
- Dark mode via `@custom-variant dark` in globals.css (Tailwind v4)

### Other Pages
- Custom 404 (/not-found.tsx)
- Error boundary (/error.tsx)

### Code Quality
- Build passes with zero errors
- Pre-existing lint warnings (not blockers): img→Image, a→Link, ref in render, setState in effect

## Environment Variables (Vercel)
- `RESEND_API_KEY` — Resend API key for email
- `CONTACT_EMAIL` — email where leads arrive (jf.termenon@gmail.com)
- `WHATSAPP_PHONE` — 34691157183 (server-side, for wa.me redirects)
- `DEEPL_API_KEY` — optional, for local translation (not needed on Vercel)
- (Pending) `WHATSAPP_PHONE_NUMBER_ID` + `WHATSAPP_ACCESS_TOKEN` + `WHATSAPP_TO` — for WhatsApp Business API

## WhatsApp Business API (Blocked)
- Blocked until user gets a prepaid SIM card for the Business API number
- Once set up, leads can also arrive by WhatsApp automatically
- Need Meta Developer app → obtain phone number ID + access token

## Key Architecture Decisions
- `Property` interface in `src/lib/demo-properties.ts` includes `purpose: "venta" | "alquiler"`
- Properties written in Spanish; translations in `property-translations.ts` with fallback to Spanish
- `getTranslator()` in translations/index.ts falls back to Spanish dict for missing keys
- `localizeProperty()` in property-translations.ts falls back to property's Spanish fields
- Auto-translation: Vercel build uses Google, local with DeepL key, no API calls otherwise
- Properties live in same file as interface, exported as default array
- `DemoPropertyCard` client component — card + modal, uses `useLang()` + `localizeProperty()`
- `DemoPropertyGrid` client component — filter tabs + search, localized filtering
- `DemoPageContent` client component — wraps /demo with search state, receives `initialRef` from server component
- `WhatsAppButton` client component — uses `usePathname` to hide on /demo
- `ContactForm` client component — booking form, sends to /api/contact
- Layout is server component + WhatsAppButton added directly
- API contact route uses Resend directly (no lazy singleton) for reliable sending

## Relevant Files
- `src/app/page.tsx` — Main landing page (client, uses useLang)
- `src/app/demo/page.tsx` — Demo page shell (reads searchParams.ref)
- `src/app/layout.tsx` — Root layout with metadata, WhatsAppButton
- `src/app/api/contact/route.ts` — POST handler (email via Resend)
- `src/app/api/whatsapp/route.ts` — GET handler (redirects to wa.me)
- `src/app/not-found.tsx`, `src/app/error.tsx` — Error pages
- `src/components/demo-property-card.tsx` — Property card + modal with contact tabs
- `src/components/demo-property-grid.tsx` — Filtered/searchable grid with DualRangeSlider
- `src/components/demo-page-content.tsx` — Full /demo page with search state
- `src/components/whatsapp-button.tsx` — Floating wa.me button (hidden on /demo)
- `src/components/contact-form.tsx` — Booking form with phone regex validation
- `src/components/theme-toggle.tsx` — Moon/Sun dark mode toggle
- `src/components/language-switcher.tsx` — Globe dropdown (5 locales)
- `src/lib/providers.tsx` — ThemeContext, LangContext, Providers, useTheme/useLang hooks
- `src/lib/demo-properties.ts` — Property type + 14 demo properties (Spanish source)
- `src/lib/property-translations.ts` — Localized property overrides (auto-generated by prebuild)
- `src/lib/notifications.ts` — Resend + WhatsApp API send helpers
- `src/lib/translations/` — index.ts + es.ts|en.ts|de.ts|fr.ts|ru.ts (page copy dictionaries)
- `scripts/translate-properties.mjs` — Auto-translation script (prebuild)
- `.env.local` — Local env vars
- `.vercel/project.json` — Vercel project (costa-blanca-leads)

## Workflow: Adding a Property
1. Add property in Spanish to `src/lib/demo-properties.ts` (follow existing format)
2. Optionally add manual type overrides in `scripts/translate-properties.mjs` MANUAL_TYPES if new type
3. Push to git → Vercel builds → prebuild translates to EN/DE/FR/RU → deploy
4. To test locally: `$env:DEEPL_API_KEY="key"` then `npm run translate-props`

## Next Steps
1. Get prepaid SIM for WhatsApp Business API number
2. Set up Meta Developer app → obtain WHATSAPP_PHONE_NUMBER_ID + WHATSAPP_ACCESS_TOKEN
3. Add env vars to Vercel + WHATSAPP_TO for WhatsApp lead forwarding
4. Present to prospects via https://costa-blanca-leads.vercel.app
