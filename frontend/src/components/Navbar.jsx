import { NavLink } from 'react-router-dom'
import { useState } from 'react'

import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const [ isOpen, setIsOpen ] = useState(false)

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
                <div className="flex text-xs font-medium text-(--muted-foreground) gap-10 px-2">
                    <li>
                        <NavLink 
                            to="/"
                            className={({ isActive }) => 
                                `hidden md:flex tracking-widest transition-colors ${
                                    isActive 
                                    ? 'text-(--foreground) font-semibold' 
                                    : 'text-(--muted-foreground) hover:text-(--foreground)'
                                }`
                            }
                        >
                            HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/products/:category"
                            className={({ isActive }) => 
                                `hidden md:flex tracking-widest transition-colors ${
                                    isActive 
                                    ? 'text-(--foreground) font-semibold' 
                                    : 'text-(--muted-foreground) hover:text-(--foreground)'
                                }`
                            }
                        >
                            SHOP
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/about"
                            className={({ isActive }) => 
                                `hidden md:flex tracking-widest transition-colors ${
                                    isActive 
                                    ? 'text-(--foreground) font-semibold' 
                                    : 'text-(--muted-foreground) hover:text-(--foreground)'
                                }`
                            }
                        >
                            ABOUT
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/policy"
                            className={({ isActive }) => 
                                `hidden md:flex tracking-widest transition-colors ${
                                    isActive 
                                    ? 'text-(--foreground) font-semibold' 
                                    : 'text-(--muted-foreground) hover:text-(--foreground)'
                                }`
                            }
                        >
                            POLICY
                        </NavLink>
                    </li>
                    <button className="md:hidden" onClick={() => setIsOpen(prev => !prev)}>
                        {isOpen ? <X className="text-black cursor-pointer"/> : <Menu className="text-black cursor-pointer"/>}
                    </button>
                </div>
            </ul>
            {isOpen && 
                <div className="md:hidden flex items-center justify-center p-4 mt-4 text-xs font-medium text-(--muted-foreground) border-t border-(--border)/50">
                    <ul className="flex flex-col items-center pt-4 gap-8">
                        <li>
                            <NavLink 
                                to="/"
                                onClick={() => setIsOpen(false)}
                                    className={({ isActive }) => 
                                    `tracking-widest transition-colors ${
                                        isActive
                                        ? 'text-(--foreground) font-semibold' 
                                        : 'text-(--muted-foreground) hover:text-(--foreground)'
                                    }`
                                }
                            >
                                HOME
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/products/:category"
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => 
                                    `tracking-widest transition-colors ${
                                        isActive 
                                        ? 'text-(--foreground) font-semibold' 
                                        : 'text-(--muted-foreground) hover:text-(--foreground)'
                                    }`
                                }
                            >
                                SHOP
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/about"
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => 
                                    `tracking-widest transition-colors ${
                                        isActive 
                                        ? 'text-(--foreground) font-semibold' 
                                        : 'text-(--muted-foreground) hover:text-(--foreground)'
                                    }`
                                }
                            >
                                ABOUT
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/policy"
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) => 
                                    `tracking-widest transition-colors ${
                                        isActive 
                                        ? 'text-(--foreground) font-semibold' 
                                        : 'text-(--muted-foreground) hover:text-(--foreground)'
                                    }`
                                }
                            >
                                POLICY
                            </NavLink>
                        </li>
                    </ul>
                </div>
            }
        </nav>
    )
}