## Kapucak Eshop

Modern e‑commerce store built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, **Prisma**, and **PostgreSQL**, featuring Stripe/PayPal payments and transactional emails.

### Demo

- **Production**: `https://kapucak-eshop.vercel.app/`

---

### Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **UI**: React 19, Tailwind CSS 4, shadcn-based components, Radix UI primitives
- **State / Forms**: React Hook Form + Zod validation
- **Auth**: NextAuth v5 (with `@auth/prisma-adapter`)
- **Database**: PostgreSQL (Neon) + Prisma ORM
- **Payments**: Stripe, PayPal, Cash on Delivery
- **File Uploads**: UploadThing
- **Email**: React Email (`@react-email/components`, `react-email`) + Resend

---

### Features

- **Product catalog** with categories, brands, ratings, and reviews
- **Shopping cart & checkout** with shipping address flow
- **Multiple payment methods** (`PayPal`, `Stripe`, `CashOnDelivery`)
- **Order management** with payment and delivery status
- **Transactional emails** (e.g. purchase receipt)
- **Type-safe backend & frontend** via Zod schemas and shared TypeScript types

---

### Project Structure

High-level directories:

- `app/` – Next.js App Router routes, layouts, and API routes
- `app/(root)/email/` – React Email templates (e.g. purchase receipt)
- `components/` – Reusable UI components (e.g. shared header, footer)
- `lib/` – Utilities, constants, business logic, validators
- `types/` – Shared TypeScript types inferred from Zod/Prisma
- `prisma/` – Prisma schema, migrations, and generated types (after `prisma generate`)

---

### Getting Started (Local Development)

#### 1. Install dependencies

```bash
npm install
```

#### 2. Configure environment variables

Create a `.env` file in the project root (do **not** commit real secrets to git in production). At minimum, you will need:

```bash
DATABASE_URL="postgresql://<user>:<password>@<host>/<db>?sslmode=require"

NEXTAUTH_SECRET="your_generated_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_URL_INTERNAL="http://localhost:3000"

NEXT_PUBLIC_APP_NAME="Kapucak Eshop"
NEXT_PUBLIC_APP_DESCRIPTION="A modern ecommerce store built with Next.js and Tailwind CSS"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"

PAYMENT_METHODS="'PayPal', 'Stripe', 'CashOnDelivery';"
DEFAULT_PAYMENT_METHOD="'PayPal';"

PAYPAL_API_URL="https://api-m.sandbox.paypal.com"
PAYPAL_CLIENT_ID="<paypal_client_id>"
PAYPAL_APP_SECRET="<paypal_client_secret>"

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="<stripe_publishable_key>"
STRIPE_SECRET_KEY="<stripe_secret_key>"
STRIPE_WEBHOOK_SECRET="<stripe_webhook_secret>"

UPLOADTHING_TOKEN="<uploadthing_token>"
UPLOADTHING_SECRET="<uploadthing_secret>"
UPLOADTHING_APP_ID="<uploadthing_app_id>"

RESEND_API_KEY="<resend_api_key>"
SENDER_EMAIL="<your_sender_email>"
```

> **Note**: The repository’s local `.env` currently contains real keys; in a production setup you should rotate these, move them to a secure secret store, and commit only a `.env.example` without actual secrets.

#### 3. Database & Prisma

1. Ensure your `DATABASE_URL` points to a reachable PostgreSQL instance.
2. Run migrations and generate the Prisma client:

```bash
npx prisma migrate dev
npx prisma generate
```

3. (Optional) Inspect data with Prisma Studio:

```bash
npx prisma studio
```

#### 4. Run the development server

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

### NPM Scripts

- **`npm run dev`**: Start the Next.js development server
- **`npm run build`**: Create a production build
- **`npm run start`**: Start the production server (after `npm run build`)
- **`npm run lint`**: Run ESLint across the project
- **`npm run test`**: Run Jest test suite
- **`npm run test:watch`**: Run Jest in watch mode
- **`postinstall`** (automatic): `prisma generate`

---

### Core Concepts & Modules

- **App layout**: `app/(root)/layout.tsx` defines the global layout (header, footer, metadata) and imports global styles as well as `APP_NAME`, `APP_DESCRIPTION`, and `SERVER_URL` constants.
- **Configuration & constants**: `lib/constants/index.ts` exposes app-level config such as:
  - App name, description, server URL
  - Default and available payment methods
  - Pagination size and form default values
  - Sender email and user roles
- **Types**: `types/index.ts` defines shared types (`Product`, `Cart`, `Order`, `Review`, etc.) by inferring from Zod schemas and Prisma-generated types. This keeps the API and UI type-safe and consistent.
- **Email templates**: `app/(root)/email/*` uses `@react-email/components` to render rich, responsive transactional emails that can be sent via Resend.

---

### Testing

This project uses **Jest** with TypeScript support (`ts-jest`).

Run the test suite:

```bash
npm test
```

Or in watch mode:

```bash
npm run test:watch
```

---

### Linting & Formatting

Run ESLint:

```bash
npm run lint
```

Tailwind CSS 4 is wired in via `@tailwindcss/postcss` and global styles are imported in `app/(root)/layout.tsx`. Use standard Tailwind and shadcn patterns for building UI components.

---

### Deployment

1. Ensure all required environment variables are configured in your hosting provider (e.g. Vercel, Render, Fly.io).
2. Build the app:

```bash
npm run build
```

3. Start the production server:

```bash
npm run start
```

The project is optimized for deployment on platforms like Vercel (including edge-friendly features and environment variable usage). For Vercel, configure environment variables in the project settings and use the default Next.js build settings.

Production demo: `https://kapucak-eshop.vercel.app/`

