import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

export function CheckAuth({ children }) {
  const { authenticated, user } = useSelector((s) => s.auth);
  const location = useLocation();

  console.log(authenticated, location, user);

  if (
    authenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/forgot-password"))
  ) {
    return <Navigate to="/" replace />;
  }

  if (
    !authenticated &&
    !(
      location.pathname === "/" ||
      location.pathname.includes("/postings") ||
      location.pathname.includes("/login") ||
      location.pathname.includes("/register") ||
      location.pathname.includes("/forgot-password")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // if (authenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
  //   return <Navigate to="/unauthorized" />;
  // }

  // if (authenticated && user?.role === "admin" && location.pathname === "/") {
  //   return <Navigate to="/admin/dashboard" />;
  // }

  return children;
}
