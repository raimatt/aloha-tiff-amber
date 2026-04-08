import Navbar from './components/Navbar'
import Footer from './components/Footer'

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