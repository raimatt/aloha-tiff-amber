import { useNavigate } from "react-router-dom"
import { ExternalLink } from "lucide-react"

import { logout } from "../../services/auth"

export default function AdminLayout({ children }) {
    const navigate = useNavigate()

    return (
        <div>
            <div className="fixed z-10 w-full px-4 sm:px-6 py-4 border-b border-(--border) bg-(--secondary)">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <h1 className="text-base sm:text-xl md:text-3xl font-light tracking-wide truncate">
                            Aloha, Tiff Amber
                        </h1>
                        <span className="text-xs font-medium tracking-[0.15em] uppercase px-3 py-1 rounded-full bg-(--primary) text-(--primary-foreground)">Admin</span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View site"
                            className="btn-outline text-center px-3 py-2 sm:px-5 sm:py-3 cursor-pointer whitespace-nowrap flex items-center gap-2"
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span className="hidden sm:inline">View Site</span>
                        </a>
                        <button className="btn-outline text-center px-3 py-2 sm:px-5 sm:py-3 cursor-pointer whitespace-nowrap" onClick={() => {
                            logout()
                            navigate("/admin/login")
                        }}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <main className="pt-(--nav-height)">
                {children}
            </main>
        </div>
    )
}