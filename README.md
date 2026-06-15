# 🌺 Aloha, Tiff Amber

A production MERN e-commerce platform for a real jewelry business. Customers browse handmade Tahitian pearl jewelry and send purchase or availability requests (the site has no checkout), while the owner manages inventory through a JWT-secured admin dashboard. Features a custom design system, Cloudinary image uploads, and full product CRUD — deployed on Vercel and Render.

**Live:** [alohatiffamber.com](https://alohatiffamber.com)

---

## 🚀 Tech Stack

### Frontend
- React 19 + Vite
- React Router
- Tailwind CSS 4 (custom design system)
- FormSubmit (customer request emails)

### Backend
- Node.js + Express 5
- MongoDB + Mongoose
- JWT + bcrypt (admin auth)
- Cloudinary + multer (image uploads)
- express-rate-limit

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 📦 Features

- **Customer request flow** (lead capture in place of checkout): a validated modal form with live quantity/price totals, honeypot spam protection, and automated email confirmations to both owner and customer via FormSubmit
- **Out-of-stock inquiry path** — out-of-stock pieces stay requestable with a dedicated "ask about availability" form
- **Multi-image product gallery** — up to 6 images per product, with thumbnail navigation on the storefront
- 30+ products across 6 categories with dynamic fetching and category filtering
- **JWT-secured admin dashboard** with full product CRUD and multi-image Cloudinary uploads
- **Session-expiry handling** — admins are automatically logged out and prompted to sign in again when their token expires
- IP-based rate limiting and origin-restricted CORS on API routes
- Custom Tailwind CSS 4 design system with reusable tokens, animations, and a responsive, accessible layout

---

## 📁 Project Structure

```
aloha-tiff-amber/
├── frontend/   # React + Vite
└── backend/    # Express + Mongoose
```

---

## 🔮 Roadmap

- **Self-hosted email flow** — replace the FormSubmit relay with a Nodemailer + Gmail backend route for branded admin notifications and customer receipts
- Order/request history view for the admin dashboard
