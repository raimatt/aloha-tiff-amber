import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AdminLayout from './components/admin/AdminLayout'
import AdminRoute from './components/admin/AdminRoute'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Policy from './pages/Policy'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminProductForm from './pages/AdminProductForm'

export default function App() {
  return (
    <Routes>
      {/* Public routes — customer Navbar + Footer */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
      </Route>

      {/* Admin login — no layout */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin routes — AdminLayout + auth guard */}
      <Route path="/admin" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
      <Route path="/admin/products/new" element={<AdminRoute><AdminLayout><AdminProductForm /></AdminLayout></AdminRoute>} />
      <Route path="/admin/products/:id/edit" element={<AdminRoute><AdminLayout><AdminProductForm /></AdminLayout></AdminRoute>} />
    </Routes>
  )
}
