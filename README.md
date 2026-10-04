# Global Max Networks — Next.js + TypeScript + Tailwind

A Next.js (App Router) site for Global Max Networks (Private) Limited, a diversified Sri
Lankan company (est. 2022) offering visa consultancy, education guidance, airline ticketing,
digital marketing, media (Vettri TV), and real estate services — with a job portal and
matrimonial platform in development.

## Fonts

Loaded in `app/layout.tsx` via `next/font/google` (no external `<link>` tags needed):

- **Space Grotesk** → `--font-display` (headlines)
- **Inter** → `--font-body` (paragraph text)
- **IBM Plex Mono** → `--font-mono` (eyebrows, labels, stats)

## Colors

Defined in `tailwind.config.ts` under `theme.extend.colors.gm`, matched to the real logo:

| Token | Hex | Used for |
|---|---|---|
| `gm-maroon` | `#992529` | Primary brand color — headlines, buttons, accents |
| `gm-maroon-dark` | `#7A1D20` | Hover states |
| `gm-green` | `#2F7649` | Secondary accent |
| `gm-green-dark` | `#255C39` | Hover states |
| `gm-ink` | `#201B1B` | Dark section backgrounds, primary text |
| `gm-paper` | `#FFFFFF` | Light section backgrounds |
| `gm-paper-2` | `#F4F1EB` | Alternate light section background |

These are sampled directly from the pixels in `public/logo.jpeg` (averaged across the
maroon and green regions), so they should match your logo closely. If you get a
higher-resolution or vector version of the logo later, you can re-sample for more precision.

## Structure

```
app/
  layout.tsx        — fonts + <html>/<body> shell + metadata
  page.tsx           — composes all sections
  globals.css        — Tailwind directives + soft-text/line variables
components/
  types.ts           — Service + UpcomingPlatform data (edit this to change services)
  Header.tsx          — sticky nav with logo (client component)
  Hero.tsx            — headline, service-lines panel, scrolling facts ticker
  ImageSlider.tsx      — auto-swiping image carousel (autoplay, swipe, arrows, dots)
  ServicesGrid.tsx     — six core services + "coming soon" platforms
  About.tsx            — About Us, Vision, key facts
  Stats.tsx            — established/visa-services/service-line figures
  DirectorMessage.tsx  — Director's Message from S. Surenthiran, Founder & Director
  WhyChooseUs.tsx       — six reasons to choose Global Max
  ContactCTA.tsx        — contact CTA band
  Footer.tsx            — sitemap, subscribe form, logo (client component)
public/
  logo.jpeg           — the real Global Max logo, used in Header and Footer
  slides/              — placeholder slide images for the ImageSlider (swap for real photos)
  images/
    company-portrait.png — branded vector illustration (globe/pin/people), portrait orientation
    company-building.png — branded vector illustration of an office building, landscape orientation
```

## Image slider

`ImageSlider.tsx` is self-contained — no external carousel library. It:

- Auto-advances every 4 seconds (`intervalMs` prop, default `4000`)
- Pauses on hover/mouse-over, and respects `prefers-reduced-motion` (autoplay disabled)
- Supports touch swipe (left/right) on mobile
- Has arrow buttons and clickable dot indicators
- Takes a `slides` prop — an array of `{ src, alt, caption? }` — so you can swap in real
  photos any time:

```tsx
<ImageSlider
  slides={[
    { src: "/slides/office.jpg", alt: "Global Max office", caption: "Our Jaffna office" },
    { src: "/slides/team.jpg", alt: "Global Max team", caption: "Meet the team" },
  ]}
  intervalMs={5000}
/>
```

Drop your own images into `public/slides/` (or anywhere under `public/`) and reference them
by path — no need to touch the component itself unless you want to change the default set.

## Run it

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Admin account and password recovery

Admin sign-in cookies expire when the browser session ends, with a 12-hour maximum
token lifetime. Five consecutive incorrect passwords temporarily lock the account
for 15 minutes. Password recovery uses one-time links that expire after 15 minutes.

Configure these server-side environment variables to enable email recovery:

| Variable | Purpose |
|---|---|
| `APP_URL` | Public base URL of this app (for example `https://globalmax.example`) |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_FROM_EMAIL` | Sender address verified in Resend |

For local development, `APP_URL` can use `http://localhost:3000`. Never commit
provider keys or passwords; set them in `.env.local` locally and in the deployment
platform's secret environment-variable settings in production.

Run the unit tests with:

```bash
npm test
```

Use `npm run test:watch` while developing to rerun tests as files change.

## Customizing

- **Services** — edit `SERVICES` and `UPCOMING` in `components/types.ts`.
- **Copy** — About Us, Vision, Mission, and "why choose us" text live as plain strings in
  their respective component files, sourced from the company's About Us document.
- **Palette** — change the hex values in `tailwind.config.ts` under `colors.gm`.
- **Logo** — replace `public/logo.jpeg` with a higher-resolution or transparent-background
  version if you have one; it's referenced directly in `Header.tsx` and `Footer.tsx`.
- **Illustrations** — `public/images/company-portrait.png` and `company-building.png` are
  brand-colored vector illustrations (not real photos). Swap them for actual photography
  whenever you have it — no code changes needed beyond the file path.