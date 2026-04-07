import { Link } from 'react-router-dom'

import instagramLogo from '../assets/ig-logo.svg'

export default function Footer() {
    return (
        <div className="bg-(--foreground) text-(--background) px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h1 className="font-display text-2xl font-light mb-4">Aloha, Tiff Amber</h1>
                    <p className="text-body opacity-70">Handcrafted jewelry inspired by island life. Each piece is made with love and aloha spirit.</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-label mb-4 opacity-70">QUICK LINKS</p>
                    <div className="flex flex-col space-y-3">
                        <Link to="/products/:category" className="text-body opacity-70 hover:opacity-100 cursor-pointer transition-opacity">Shop All</Link>
                        <Link to="/about" className="text-body opacity-70 hover:opacity-100 cursor-pointer transition-opacity">About</Link>
                        <Link to="/policy" className="text-body opacity-70 hover:opacity-100 cursor-pointer transition-opacity">Policy</Link>
                    </div>
                </div>
                <div className="flex flex-col">
                    <p className="text-label mb-4 opacity-70">GET IN TOUCH</p>
                    <div className="flex items-center">
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
            <p className="text-center text-body opacity-50 text-xs">
                © 2026 Aloha, Tiff Amber. All rights reserved.
            </p>
        </div>
    )
}