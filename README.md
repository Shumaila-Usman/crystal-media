# Crystal Media

Luxury influencer marketing, public relations, and talent management agency website for Pakistan.

A complete Next.js application with public marketing site, creator directory, blog, contact forms, and admin dashboard — all in a single project.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** MongoDB Atlas + Mongoose
- **Images:** Cloudinary
- **Email:** Gmail SMTP via Nodemailer
- **Auth:** JWT sessions (jose) + bcrypt
- **Animation:** Framer Motion, GSAP, Lenis
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts (admin dashboard)

## Getting Started

### 1. Install dependencies

```bash
cd crystal-media
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `AUTH_SECRET` | Random secret for JWT sessions (32+ chars) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD_HASH` | bcrypt hash of admin password |
| `CLOUDINARY_*` | Cloudinary credentials |
| `SMTP_*` | Gmail App Password SMTP settings |
| `CONTACT_RECEIVER_EMAIL` | Where inquiry emails are sent |
| `NEXT_PUBLIC_*` | Public site URL, social links, analytics |

### 3. Generate admin password hash

```bash
node -e "const bcrypt=require('bcryptjs');bcrypt.hash('your-password',12).then(console.log)"
```

Paste the output into `ADMIN_PASSWORD_HASH`.

### 4. Seed the database

```bash
npm run dev
```

Then in another terminal:

```bash
curl -X POST http://localhost:3000/api/seed
```

This populates talents, services, packages, testimonials, blog posts, FAQs, and site settings.

### 5. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.
Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin dashboard.

## Project Structure

```
src/
├── app/                  # Pages and API routes
│   ├── admin/            # Protected admin dashboard
│   ├── api/              # Backend API routes
│   ├── blog/             # Blog pages
│   ├── services/         # Service pages
│   ├── talents/          # Creator directory
│   └── ...               # Other public pages
├── components/
│   ├── admin/            # Admin UI components
│   ├── forms/            # Contact & inquiry forms
│   ├── layout/           # Navbar, Footer, Providers
│   ├── motion/           # Animations & loaders
│   ├── sections/         # Homepage sections
│   └── talent/           # Creator cards & directory
├── data/                 # Seed & fallback content
├── lib/                  # Database, auth, email, utils
├── models/               # Mongoose schemas
└── types/                # TypeScript interfaces
```

## Key Features

### Public Site
- Cinematic homepage with campaign inquiry form
- Searchable creator directory with filters
- Service detail pages with SEO
- Blog with categories and search
- Package proposals
- Testimonials
- Location pages (Lahore, Karachi, Islamabad, Pakistan)
- Contact page with creator preselection
- Crystal intro loader (once per session)
- Smooth scrolling, scroll reveals, animated counters

### Admin Dashboard (`/admin`)
- Dashboard with stats and inquiry trends
- CRUD for talents, brands, services, packages
- Blog post management (draft/published)
- Testimonial management
- FAQ management
- Inquiry management with status tracking & CSV export
- Site settings (contact info, stats, SEO, social links)
- Cloudinary image uploads

### Without Database
The site works with seeded fallback data when MongoDB is not configured. Connect MongoDB for full CMS functionality.

## Cloudinary Setup

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Copy Cloud Name, API Key, and API Secret to `.env.local`
3. Uploads from admin dashboard go to the `crystal-media` folder

## Gmail SMTP Setup

1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account → Security → App Passwords
3. Generate an app password for "Mail"
4. Set `SMTP_USER` to your Gmail address
5. Set `SMTP_APP_PASSWORD` to the generated app password

## Adding the Logo

Place your logo at:

```
public/brand/crystal-media-logo.png
```

The `BrandLogo` component will automatically detect and use it. Until then, a text-based "Crystal Media" placeholder is shown.

## Replacing Creator Images

Creator photos should be placed as WebP files. The placeholder cards show the expected filename (e.g., `ayesha-khan.webp`). Upload via the admin dashboard or replace centrally in `src/data/seed.ts`.

## Production Build

```bash
npm run build
npm start
```

## Deployment

Deploy to Vercel, Railway, or any Node.js hosting:

1. Set all environment variables in your hosting dashboard
2. Ensure MongoDB Atlas allows connections from your server IP (or use `0.0.0.0/0` for cloud hosting)
3. Run the seed endpoint once after deployment
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain

## License

Private — Crystal Media © 2026
