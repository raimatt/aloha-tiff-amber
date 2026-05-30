import { useNavigate } from "react-router-dom"

import { logout } from "../../services/auth"

export default function AdminLayout({ children }) {
    const navigate = useNavigate()

    return (
        <div>
            <div className="fixed z-10 w-full px-6 py-4 border-b border-(--border) bg-(--secondary)">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h1 className="text-lg sm:text-xl md:text-3xl font-light tracking-wide whitespace-nowrap">
                            Aloha, Tiff Amber
                        </h1>
                        <span className="text-xs font-medium tracking-[0.15em] uppercase px-3 py-1 rounded-full bg-(--primary) text-(--primary-foreground)">Admin</span>
                    </div>

                    <button className="btn-outline text-center p-4 cursor-pointer" onClick={() => {
                        logout()
                        navigate("/admin/login")
                    }}>
                        Logout
                    </button>
                </div>
            </div>

            <main className="pt-(--nav-height)">
                {children}
            </main>
        </div>
    )
}