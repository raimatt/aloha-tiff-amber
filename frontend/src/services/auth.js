const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const TOKEN_KEY = "admin_token"

export const login = async ({username, password}) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error("Invalid login credentials.")
        }
        
        const { token } = await response.json()

        localStorage.setItem(TOKEN_KEY, token)
        clearSessionExpired()
    } catch (error) {
        console.error("Error:", error);
        throw error
    }
}

export const logout = () => {
    clearSessionExpired()
    return localStorage.removeItem(TOKEN_KEY)
}

// Powers the "session expired" notice on the login page. Read is non-destructive
// (StrictMode-safe); the flag is cleared on login/logout instead.
const SESSION_EXPIRED_KEY = "session_expired"

export const markSessionExpired = () => {
    sessionStorage.setItem(SESSION_EXPIRED_KEY, "1")
}

export const wasSessionExpired = () => {
    return sessionStorage.getItem(SESSION_EXPIRED_KEY) === "1"
}

const clearSessionExpired = () => {
    sessionStorage.removeItem(SESSION_EXPIRED_KEY)
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

// Decode the JWT payload to read `exp` (no signature check; the server does that).
const decodeToken = (token) => {
    try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
        return JSON.parse(atob(base64))
    } catch {
        return null
    }
}

export const isLoggedIn = () => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) return false

    const payload = decodeToken(token)
    if (!payload || !payload.exp || payload.exp * 1000 <= Date.now()) {
        localStorage.removeItem(TOKEN_KEY)
        markSessionExpired()
        return false
    }
    return true
}
