// Navbar and Footer are siblings inside components/layout/, so they resolve
// relative to this file rather than through the old src-root path.
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen grid grid-rows-[1fr_auto]">
        <main className="pt-18">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}