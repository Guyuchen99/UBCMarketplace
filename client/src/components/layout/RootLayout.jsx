import { Outlet } from "react-router";
import { HeaderMain } from "../../components/header/HeaderMain.jsx";
import { HeaderNavbar } from "../../components/header/HeaderNavbar.jsx";

export function RootLayout() {
  return (
    <>
      <header className="fixed top-0 z-[50] flex w-screen flex-col items-center justify-center bg-ubc-bg-primary">
        <HeaderMain />
        <HeaderNavbar />
      </header>
      <Outlet />
    </>
  );
}
