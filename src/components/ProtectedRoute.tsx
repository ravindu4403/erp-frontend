import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");

  // Must have all three: token, username, AND authenticated in current session
  if (!token || !username || isAuthenticated !== "true") {
    // Clear any existing data
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("loginSuccess");
    sessionStorage.removeItem("isAuthenticated");
    
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the protected component
  return <>{children}</>;
}

export default ProtectedRoute;