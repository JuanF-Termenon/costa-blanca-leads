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
- Pricing: 1.290€ tachado → 790€ lanzamiento (no mostrar 990€ intermedio)
- Must work 24/7 from Vercel without user's PC

## Tech Stack
- Next.js 16.2.9 (Turbopack), React, TypeScript
- Resend (email via API), WhatsApp API (pending SIM)
- Vercel hosting, Geist fonts, Lucide icons
- App Router, server components, client components where needed

## Completed Features

### Landing Page (/)
- Hero: "Convierte Google en una fuente constante de compradores para tu inmobiliaria"
- Benefits section (4 cards: Aparece en Google, Contactos al momento, SEO sin esfuerzo, Resultados reales)
- Demo preview (3 property cards from demo-properties.ts)
- "Asi funciona" section (3 steps: Elegimos tu zona, Creamos tu web, Recibe contactos)
- ROI block (cost vs value comparison)
- Pricing: Basico 79€, Profesional 149€ (mas popular), Premium 249€
- FAQ (7 questions)
- Contact section → renamed to "Agenda tu demo de 15 minutos"
- Footer

### Demo Page (/demo)
- 14 properties (10 venta, 4 alquiler) with `purpose` field
- Filter tabs (Todas/Comprar/Alquilar) with real-time search
- Property modal with 3 contact methods (Telefono/Email/WhatsApp)
- Contact methods include property ref, title, location, price, and direct link to /demo?ref=CBL-XXX
- Back button (←) in header to return to landing page
- Auto-opens modal when URL has ?ref=CBL-XXX parameter

### Booking Flow (replaces old contact form)
- Section: "Agenda tu demo de 15 minutos"
- Two options:
  1. WhatsApp button → pre-filled text: "Hola, quiero agendar una videollamada de 15 minutos para ver la demo. ¿Cuando podriamos hacerla?"
  2. Form: name, email, phone (required + regex validation: spanish numbers), preferred_time (required)
- API /api/contact sends email via Resend to user + attempts WhatsApp if configured
- Email subject: "Demo: [name] - [phone]"
- Form success: "Te escribo en breve para concretar el dia y la hora de la videollamada."
- All old CTAs (#contacto) changed to #agenda-tu-demo

### Hidden Phone Number
- Floating WhatsApp button on landing page only (hidden on /demo)
- API /api/whatsapp redirects to wa.me — number never exposed in client code
- Property modal WhatsApp also goes through /api/whatsapp?text=...
- Server-only env var: WHATSAPP_PHONE (not NEXT_PUBLIC_)

### Other Pages
- Custom 404 (/not-found.tsx)
- Error boundary (/error.tsx)

### Code Quality
- Zero lint warnings, zero build errors
- Removed: unused SVGs, unused colorMap, dead links, mockup browser chrome

## Environment Variables (Vercel)
- `RESEND_API_KEY` — Resend API key for email
- `CONTACT_EMAIL` — email where leads arrive (jf.termenon@gmail.com)
- `WHATSAPP_PHONE` — 34691157183 (server-side, for wa.me redirects)
- (Pending) `WHATSAPP_PHONE_NUMBER_ID` + `WHATSAPP_ACCESS_TOKEN` + `WHATSAPP_TO` — for WhatsApp Business API

## WhatsApp Business API (Blocked)
- Blocked until user gets a prepaid SIM card for the Business API number
- Once set up, leads can also arrive by WhatsApp automatically
- Need Meta Developer app → obtain phone number ID + access token

## Key Architecture Decisions
- `Property` interface in `src/lib/demo-properties.ts` includes `purpose: "venta" | "alquiler"`
- Properties live in same file as interface, exported as default array
- `DemoPropertyCard` client component — card + modal, used in landing preview and /demo
- `DemoPropertyGrid` client component — filter tabs + search, used only in /demo
- `DemoPageContent` client component — wraps /demo with search state, receives `initialRef` from server component
- `WhatsAppButton` client component — uses `usePathname` to hide on /demo
- `ContactForm` client component — booking form, sends to /api/contact
- Layout is server component + WhatsAppButton added directly
- API contact route uses Resend directly (no lazy singleton) for reliable sending

## Relevant Files
- `src/app/page.tsx` — Main landing page
- `src/app/demo/page.tsx` — Demo page shell (passes searchParams.ref as initialRef)
- `src/app/layout.tsx` — Root layout with metadata, WhatsAppButton
- `src/app/api/contact/route.ts` — POST handler (sends email via Resend)
- `src/app/api/whatsapp/route.ts` — GET handler (redirects to wa.me)
- `src/app/not-found.tsx`, `src/app/error.tsx` — Error pages
- `src/components/demo-property-card.tsx` — Property card + modal with contact tabs
- `src/components/demo-property-grid.tsx` — Filtered/searchable grid
- `src/components/demo-page-content.tsx` — Full /demo page with search state
- `src/components/whatsapp-button.tsx` — Floating wa.me button (hidden on /demo)
- `src/components/contact-form.tsx` — Booking form with phone regex validation
- `src/lib/demo-properties.ts` — Property type + 14 demo properties
- `src/lib/notifications.ts` — Resend + WhatsApp API send helpers
- `.env.local` — Local env vars
- `.vercel/project.json` — Vercel project (costa-blanca-leads)

## Next Steps
1. Get prepaid SIM for WhatsApp Business API number
2. Set up Meta Developer app → obtain WHATSAPP_PHONE_NUMBER_ID + WHATSAPP_ACCESS_TOKEN
3. Add those env vars to Vercel, plus WHATSAPP_TO with user's personal number
4. Present to prospects via https://costa-blanca-leads.vercel.app
