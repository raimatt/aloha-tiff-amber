import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { isLoggedIn, login } from "../services/auth";

export default function AdminLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    if (isLoggedIn()) {
        return <Navigate to="/admin" replace />
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-(--background) px-10">
            <div className="w-full max-w-md p-8 bg-(--card) border border-(--border) rounded-sm shadow-sm">
                <h1 className="heading-section text-(--foreground) text-center">Sign In</h1>
                <div className="divider-gold mt-4 mb-12"></div>
                <form onSubmit={async (e) => {
                    e.preventDefault()
                    setError(null)

                    const credentials = {email, password}

                    setLoading(true)

                    try {
                        await login(credentials)
                        navigate("/admin")
                    } catch (err) {
                        setError(err.message)
                        setPassword("")
                    } finally {
                        setLoading(false)
                    }
                }}>
                    <div className="flex flex-col gap-6 mb-12">
                        <div>
                            <input type="text" required value={email} placeholder="Email" onChange={e => {
                                setEmail(e.target.value)
                            }} className="w-full border-b border-(--border) bg-transparent focus:outline-none pb-1" />
                        </div>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} required value={password} placeholder="Password" onChange={e => {
                                setPassword(e.target.value)
                            }} className="w-full border-b border-(--border) bg-transparent focus:outline-none pb-1 pr-16" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute right-0 bottom-1 text-xs text-(--muted-foreground) hover:text-(--foreground) cursor-pointer"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                    </div>
                    <div className="text-center">
                        <button type="submit" disabled={loading} className={`btn-primary cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>{loading ? "Signing in..." : "Login"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}