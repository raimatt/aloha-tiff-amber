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
    } catch (error) {
        console.error("Error:", error);
        throw error
    }
}

export const logout = () => {
    return localStorage.removeItem(TOKEN_KEY)
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

export const isLoggedIn = () => {
    return !!localStorage.getItem(TOKEN_KEY)
}
