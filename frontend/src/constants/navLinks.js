// Top-nav + mobile-nav link list.
// Shared so desktop and mobile menus never drift out of sync.
// `matchPrefix` lets a link stay "active" across child routes
// (e.g. SHOP stays highlighted on /products/bracelets).
export const NAV_LINKS = [
    { to: "/", label: "HOME" },
    { to: "/products/all", label: "SHOP", matchPrefix: "/products" },
    { to: "/about", label: "ABOUT" },
    { to: "/policy", label: "POLICY" },
]
