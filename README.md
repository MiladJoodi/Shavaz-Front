# Shavaz Front

A **Persian (RTL)** e-commerce storefront for beauty and personal care products. Built with **Next.js** (App Router) and **Tailwind CSS**, with client-side state for the shopping cart and mock authentication for demos.

**Live demo:** [Shavaz.netlify.app](https://Shavaz.netlify.app)

---

## Features

- **Home** — hero slider, featured sections, categories, brands, and best sellers
- **Catalog** — product listing, category pages, and product detail (`[slug]`)
- **Cart & checkout** — cart with persistence; checkout flow (UI)
- **Blog** — posts and single-article pages
- **Auth (demo)** — login and register with simulated API (no real backend)
- **Profile** — user profile when “logged in”
- **Static pages** — about, contact, 404
- **RTL layout** — `dir="rtl"`, `lang="fa"`, [Vazirmatn](https://fonts.google.com/specimen/Vazirmatn) font

---

## Tech Stack

| Area            | Choice |
|-----------------|--------|
| Framework       | [Next.js 15](https://nextjs.org/) (App Router) |
| UI              | [React 19](https://react.dev/) |
| Styling         | [Tailwind CSS 3](https://tailwindcss.com/) |
| Forms & validation | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/) |
| State           | [Zustand](https://zustand-demo.pmnd.rs/) (with `persist` for cart & auth) |
| Carousels       | [Swiper](https://swiperjs.com/), [Embla](https://www.embla-carousel.com/), [react-slick](https://react-slick.neostack.com/) |
| Icons           | [Lucide React](https://lucide.dev/) |
| Language        | TypeScript |

The app is configured for **static export** (`output: "export"` in `next.config.mjs`), so it deploys as static HTML/JS/CSS (e.g. Vercel, Netlify, any static host).

---

## Project Structure (overview)

```
app/                 # Routes (App Router): home, products, cart, blog, auth, etc.
components/          # UI: header, footer, sliders, product cards, shared widgets
data/                # Local mock data (products, categories, blog, …)
hooks/               # e.g. scroll listeners
lib/                 # helpers (e.g. class names, price formatting)
stores/              # Zustand: cart + auth
types/               # Shared TypeScript types
utils/               # Utilities (e.g. Persian numbers, shimmer)
```

---

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm**, **pnpm**, or **yarn**

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production build (static export)

```bash
npm run build
```

Output is written to the `out/` directory. For a quick local check of the static build:

```bash
npx serve out
```

---

## Scripts

| Command        | Description |
|----------------|-------------|
| `npm run dev`  | Start Next.js in development mode |
| `npm run build`| Create optimized production build (static export) |
| `npm run start`| Run production server (not used for static `out/`; use a static file server for `out`) |
| `npm run lint` | Run ESLint via Next.js |

---

## Configuration Notes

- **Images:** `images.unoptimized: true` in `next.config.mjs` is typical for static export; images are not processed by the Next.js image optimization server.
- **Data:** Product and content data live under `data/` for the demo. Replacing this with a real API would be the next integration step.
- **Auth:** Login/register are **mocked** in `stores/auth-store.ts` (no real credentials or server).

---

## License

This project is **private** (`"private": true` in `package.json`). Use and distribution follow your team or organization’s policy.

---

## Author

Project links and contact were listed in earlier versions of this repo; see git history or project maintainers for details.
