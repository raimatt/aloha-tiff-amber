import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'

import { Menu, X } from 'lucide-react'

import { NAV_LINKS } from '../../constants/navLinks'

// Shared active/inactive styling for every nav link (desktop + mobile).
// Kept as a function so both renders pass the same className logic in.
const linkClass = (isActive) =>
    `text-label tracking-widest ${
        isActive
            ? 'text-(--foreground) font-semibold'
            : 'text-(--muted-foreground) hover:text-(--foreground)'
    }`

// One row renderer, reused by the desktop list and the mobile dropdown.
// `matchPrefix` lets SHOP stay highlighted on every /products/* child route;
// for plain links we let NavLink compute isActive itself.
function NavItem({ link, pathname, onClick }) {
    const { to, label, matchPrefix } = link

    if (matchPrefix) {
        const isActive = pathname.startsWith(matchPrefix)
        return (
            <li>
                <NavLink to={to} onClick={onClick} className={linkClass(isActive)}>
                    {label}
                </NavLink>
            </li>
        )
    }

    return (
        <li>
            <NavLink
                to={to}
                onClick={onClick}
                className={({ isActive }) => linkClass(isActive)}
            >
                {label}
            </NavLink>
        </li>
    )
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const { pathname } = useLocation()

    const closeMenu = () => setIsOpen(false)

    return (
        <nav className="fixed z-10 w-full px-6 py-4 border-b border-(--border)/50 bg-(--background)/80 backdrop-blur-md">
            <ul className="flex items-center justify-between">
                <li>
                    <h1>
                        <NavLink
                            to="/"
                            className="text-lg sm:text-xl md:text-3xl font-light tracking-wide whitespace-nowrap"
                        >
                            Aloha, Tiff Amber
                        </NavLink>
                    </h1>
                </li>

                {/* Desktop links — the whole list hides on mobile, so the empty
                    <li> wrappers don't sit in the row eating up horizontal space
                    with their gap-10 between them. Mobile uses the dropdown below. */}
                <ul className="hidden md:flex gap-10 px-2">
                    {NAV_LINKS.map((link) => (
                        <NavItem key={link.to} link={link} pathname={pathname} />
                    ))}
                </ul>

                <button
                    className="md:hidden"
                    aria-label="Toggle Menu"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    {isOpen
                        ? <X className="text-(--foreground) cursor-pointer" />
                        : <Menu className="text-(--foreground) cursor-pointer" />}
                </button>
            </ul>

            {/* Mobile dropdown — same NAV_LINKS, closes menu on tap. */}
            {isOpen && (
                <div className="md:hidden flex items-center justify-center p-4 mt-4 border-t border-(--border)/50">
                    <ul className="flex flex-col items-center pt-4 gap-8">
                        {NAV_LINKS.map((link) => (
                            <NavItem
                                key={link.to}
                                link={link}
                                pathname={pathname}
                                onClick={closeMenu}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    )
}
