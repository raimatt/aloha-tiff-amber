import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'

import { Menu, X } from 'lucide-react'

import { NAV_LINKS } from '../../constants/navLinks'

const linkClass = (isActive) =>
    `text-label tracking-widest ${
        isActive
            ? 'text-(--foreground) font-semibold'
            : 'text-(--muted-foreground) hover:text-(--foreground)'
    }`

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
            <div className="flex items-center justify-between">
                <h1>
                    <NavLink
                        to="/"
                        className="text-lg sm:text-xl md:text-3xl font-light tracking-wide whitespace-nowrap"
                    >
                        Aloha, Tiff Amber
                    </NavLink>
                </h1>

                {/* Desktop links — the whole list hides on mobile. */}
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
            </div>

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
