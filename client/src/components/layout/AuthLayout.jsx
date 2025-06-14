import logo from "../../assets/logo.png";

import { Link, Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center pb-10">
      <Link to="/">
        <img src={logo} alt="UBC Marketplace Logo" className="mx-auto h-32 w-auto" />
      </Link>

      <Outlet />
    </div>
  );
}
