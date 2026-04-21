import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

export default function Layout({ children }) {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="min-h-screen grid grid-rows-[1fr_auto]">
        <main className="pt-(--nav-height)">
          <div className="banner-notice">
            This site is currently in progress — new features coming soon.
          </div>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
