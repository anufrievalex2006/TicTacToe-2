import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const hasToken = !!localStorage.getItem('token');
    if (hasToken)
        return children;
    return <Navigate to="/login" replace></Navigate>;
}