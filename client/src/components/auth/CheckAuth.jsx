import { Navigate, useLocation } from "react-router";

export function CheckAuth({ children, authenticated, user }) {
  const location = useLocation();

  if (authenticated && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  if (authenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
    return <Navigate to="/unauthorized" />;
  }

  if (authenticated && user?.role === "admin" && location.pathname === "/") {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}
