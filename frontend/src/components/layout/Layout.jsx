import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="min-h-screen grid grid-rows-[1fr_auto]">
        <main className="pt-(--nav-height)">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}
