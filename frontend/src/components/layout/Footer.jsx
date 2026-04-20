import { Link } from 'react-router-dom'

// Footer moved from components/ → components/layout/, so the relative path
// to src/assets/ gains one more "../" hop.
import instagramLogo from '../../assets/ig-logo.svg'

export default function Footer() {
    return (
        <div className="bg-(--foreground) text-(--background) px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    {/* Dropped `font-display` — not a class in this zero-config Tailwind 4
                        setup. <h1> already inherits the display font from index.css. */}
                    <h1 className="text-2xl font-light mb-4">Aloha, Tiff Amber</h1>
                    <p className="text-body opacity-70">Handcrafted jewelry inspired by island life. Each piece is made with love and aloha spirit.</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-label mb-4 opacity-70">QUICK LINKS</p>
                    <div className="flex flex-col space-y-3">
                        {/* /products/all replaces the literal ":category" placeholder
                            that didn't route anywhere. */}
                        <Link to="/products/all" className="text-body opacity-70 hover:opacity-100 cursor-pointer transition-opacity">Shop All</Link>
                        <Link to="/about" className="text-body opacity-70 hover:opacity-100 cursor-pointer transition-opacity">About</Link>
                        <Link to="/policy" className="text-body opacity-70 hover:opacity-100 cursor-pointer transition-opacity">Policy</Link>
                    </div>
                </div>
                <div className="flex flex-col">
                    {/* Added `mb-4` so this column's label aligns with the QUICK LINKS
                        column on the same row. */}
                    <p className="text-label mb-4 opacity-70">GET IN TOUCH</p>
                    {/* gap-3 keeps the copy and logo from butting up against each other. */}
                    <div className="flex items-center gap-3">
                        <p className="text-body opacity-70">Follow us on Instagram</p>
                        <a
                            href="https://www.instagram.com/alohatiffamber/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={instagramLogo}
                                alt="Instagram"
                                className="w-12 h-12 opacity-70 hover:opacity-100 transition-opacity"
                            />
                        </a>
                    </div>
                </div>
            </div>
            <div className="divider-gold mt-12 mb-6 opacity-30"></div>
            {/* Dropped `text-body` — it sets text-sm, which was fighting the explicit
                text-xs on the same element. Copyright is fine as plain small text. */}
            <p className="text-center text-xs opacity-50">
                © 2026 Aloha, Tiff Amber. All rights reserved.
            </p>
        </div>
    )
}