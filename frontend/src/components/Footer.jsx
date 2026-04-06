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
                    <ul className="space-y-3">
                        <li className="text-body opacity-70 hover:opacity-100 cursor-pointer transition-opacity">Shop All</li>
                        <li className="text-body opacity-70 hover:opacity-100 cursor-pointer transition-opacity">About</li>
                        <li className="text-body opacity-70 hover:opacity-100 cursor-pointer transition-opacity">Contact</li>
                    </ul>
                </div>
                <div className="flex flex-col">
                    <p className="text-label mb-4 opacity-70">GET IN TOUCH</p>
                    <ul className="space-y-3">
                        <li className="text-body opacity-70">alohatiffamber@gmail.com</li>
                        <li className="text-body opacity-70">Follow us on Instagram</li>
                    </ul>
                </div>
            </div>
            <div className="divider-gold mt-12 mb-6 opacity-30"></div>
            <p className="text-center text-body opacity-50 text-xs">
                © 2026 Aloha, Tiff Amber. All rights reserved.
            </p>
        </div>
    )
}