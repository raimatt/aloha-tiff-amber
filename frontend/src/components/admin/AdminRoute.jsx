import { Navigate } from "react-router-dom"
import { isLoggedIn } from "../../services/auth"

export default function AdminRoute({ children }) {
    return (isLoggedIn() ? children : <Navigate to="/admin/login" replace />)
}