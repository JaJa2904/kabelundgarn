# kabelundgarn.de

Professional multilingual website for the embroidery business Kabel und Garn, Augsburg.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- Route-based i18n: `/de` (default) and `/en`
- Server Actions for contact form
- Optimized for self-hosting (Hetzner): `output: 'standalone'` in `next.config.js`

## Brand Assets

**Korrektes Logo:** `Design/LOGO_Ausgebessert_FINAL_280126.eps`  
→ Als SVG exportieren und in `public/` ablegen (siehe **`public/LOGO_ANLEITUNG.md`**).

- `logo.svg` – Primär-Logo (z. B. für helle Hintergründe)
- `logo-white.svg` – für dunklen Hintergrund (#000000), wird in Header und Footer verwendet
- `stroke-pattern.svg` – Hero-Hintergrund (5–8 % Deckkraft)
- `stroke-divider.svg` – Trennlinien zwischen Sektionen

Logo-Proportionen nicht verzerren; Abstände über `.logo-wrap` in `globals.css`.

Favicon and OpenGraph image are generated from the app (`app/icon.tsx`, `app/opengraph-image.tsx`). Replace with logo-derived assets if desired.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000); the app redirects to `/de`.

## Build & Production (e.g. Hetzner)

```bash
npm run build
npm run start
```

Standalone output is in `.next/standalone` (copy `public/` and `.next/static` next to it for deployment).

## SEO

- Metadata and hreflang for `/de` and `/en`
- JSON-LD LocalBusiness on homepage
- Target keywords: Stickerei Augsburg, Textilveredelung Augsburg, B2B Stickerei Augsburg, Siebdruck Augsburg

## Contact Form

Submissions are logged server-side in the Server Action `app/actions/contact.ts`. Add your email provider (e.g. Resend, Nodemailer) there for live delivery.

### File attachments (optional)

The contact form supports an optional file upload. Files are uploaded to S3-compatible storage (e.g. Cloudflare R2, Hetzner Object Storage, MinIO) via a presigned URL; only the resulting file URL (or object key) is sent with the form submission.

**Environment variables** (copy from `.env.example` to `.env.local`):

| Variable | Description |
|----------|-------------|
| `S3_ENDPOINT` | S3-compatible endpoint (e.g. `https://<accountid>.r2.cloudflarestorage.com`) |
| `S3_REGION` | Region, use `auto` for R2 |
| `S3_ACCESS_KEY_ID` | Access key |
| `S3_SECRET_ACCESS_KEY` | Secret key |
| `S3_BUCKET_NAME` | Bucket name |
| `PUBLIC_FILE_BASE_URL` | Optional: public base URL for uploaded files (e.g. CDN URL) |

If these are not set, the upload API returns 503 and uploads will fail. Allowed types: PNG, JPEG, WebP, PDF, SVG. Max size: 10 MB (enforced client-side; server validates type only).

## Project Structure

```
/app
  /[locale]        – de, en routes
    layout.tsx      – header, main, footer
    page.tsx        – homepage
    it-services/
    impressum/
    datenschutz/
  actions/contact.ts
  api/upload-url/route.ts   – presigned upload URL for attachments
  globals.css
  icon.tsx, opengraph-image.tsx
/components
/lib
  translations.ts
  getTranslations.ts
  s3.ts                     – S3 client and presigned URL helpers
/public
  logo.svg, logo-white.svg
  stroke-pattern.svg, stroke-divider.svg
middleware.ts      – locale redirect
```
