# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Aloha, Tiff Amber" is a jewelry e-commerce storefront for a small business that makes handmade Tahitian pearl jewelry. Frontend is deployed on Vercel; backend on Render (free tier — expect cold starts).

**No payment processing.** The site's purpose is to showcase products. Instead of a buy button, items have a **Request button** that sends an email to the admin (with item + customer details) and a receipt to the customer.

**Planned features (not yet built):**
- Admin dashboard for adding/managing products
- Email request flow (Request button → email to admin + customer receipt)

## Commands

### Frontend (`frontend/`)
```bash
npm run dev       # Vite dev server with HMR
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

### Backend (`backend/`)
```bash
npm run dev       # Nodemon auto-reloading server (port 5000)
npm start         # Production server
node seed.js      # Clear and reseed MongoDB with test products
```

## Architecture

**Monorepo structure** with separate `frontend/` and `backend/` directories, each with their own `package.json`. They are deployed independently.

### Frontend

- **React 19 + Vite + Tailwind CSS 4** (zero-config, no `tailwind.config.js`)
- `src/main.jsx` → `App.jsx` wraps all routes in a shared `Layout` (Navbar + Footer)
- Routes: `/` Home, `/products/:category`, `/product/:id`, `/about`, `/policy`
- API calls go through `src/services/api.js`, which reads `VITE_API_URL` (defaults to `http://localhost:5000/api`)
- No global state — components use local `useState`/`useEffect`
- Custom design tokens and component classes (`.btn-primary`, `.card-product`, `.heading-hero`, etc.) are defined in `src/index.css` using `@layer components`, not in a config file
- Fonts: Cormorant Garamond (display) and Jost (body), loaded via Google Fonts in `index.html`

### Backend

- **Express 5 + Mongoose** connecting to MongoDB Atlas
- Single model: `models/Product.js` — fields: `name`, `price`, `description`, `category` (enum), `images[]`, `inStock`
- Routes in `backend/routes/products.js`: `GET /api/products`, `GET /api/products/category/:category`, `GET /api/products/:id`
- Config via `.env` (`MONGODB_URI`, `PORT`)

### Environment Variables

| Variable | Location | Purpose |
|---|---|---|
| `MONGODB_URI` | `backend/.env` | MongoDB Atlas connection string |
| `PORT` | `backend/.env` | Server port (default 5000) |
| `VITE_API_URL` | `frontend/.env` | Backend base URL |

For local dev, set `VITE_API_URL=http://localhost:5000/api` in `frontend/.env`.

## Working Style

This project is developed in a **senior/junior dev collaboration** model:

- **Fix/clean existing code first** before adding new features
- **Don't add new features** unless explicitly asked
- **Keep coding style consistent** — match the patterns already present in the codebase
- **Add comments to all changes** so the developer can understand what was updated and why
- **Reduce repetition** — look for duplicated logic or structure that can be consolidated without changing behavior
- After code cleanup is done, **guide and teach** rather than just handing over solutions — explain concepts in simple terms, point toward the answer, and let the developer implement

## Frontend Design Skill

This project uses the **`frontend-design` Claude skill** (from https://github.com/anthropics/skills). Use `/frontend-design` before building or reviewing UI to get design guidance in simple terms. This skill should be used to:
- Explain design decisions before the developer implements them
- Review new UI before it's merged, checking for consistency with the existing design system
- Teach frontend design patterns in plain language

## Frontend Design Conventions

Custom utility classes are defined in `src/index.css` under `@layer components`. Always use these instead of raw Tailwind when they exist:

- **Typography:** `.heading-hero`, `.heading-section`, `.text-label`, `.text-body`
- **Buttons:** `.btn-primary`, `.btn-outline`
- **Cards:** `.card-product`
- **Dividers:** `.divider-gold`

When building new UI, use these classes first. If a new pattern is needed repeatedly, add it to `index.css` rather than repeating inline Tailwind chains.
