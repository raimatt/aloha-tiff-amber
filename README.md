# 🌺 Aloha, Tiff Amber

A production MERN e-commerce platform for a real jewelry business. Features a custom design system, JWT-secured admin dashboard, Cloudinary image uploads, and full product CRUD — deployed on Vercel and Render.

**Live:** [alohatiffamber.com](https://alohatiffamber.com)

---

## 🚀 Tech Stack

### Frontend
- React 19 + Vite
- React Router
- Tailwind CSS 4 (custom design system)

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

- 30+ products across 6 categories with dynamic fetching and category filtering
- JWT-secured admin dashboard with full product CRUD (create, edit, delete)
- Cloudinary image upload pipeline — admins upload photos, URLs stored in MongoDB
- IP-based rate limiting and origin-restricted CORS on all API routes
- Custom Tailwind CSS 4 design system with reusable component tokens and animations
- Fully responsive mobile layout with accessible keyboard navigation

---

## 📁 Project Structure

```
aloha-tiff-amber/
├── frontend/   # React + Vite
└── backend/    # Express + Mongoose
```

---

## ⚠️ Deployment Notes

The backend runs on Render's free tier and may spin down after inactivity — the first request after a cold start can be slow. This is expected behavior.

---

## 🔮 In Progress

- Admin dashboard frontend (login, product form, dashboard table)
- Email request flow (Request button → admin notification + customer receipt)
