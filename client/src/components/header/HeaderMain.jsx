import logo from "../../assets/logo.png";

import { Button } from "@heroui/react";
import { useEffect } from "react";
import { LuUser } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link } from "react-router";

import { UserSavedListDrawer } from "../../pages/user/UserSavedList";
import { ProfileAvatar } from "./ProfileAvatar";
import { SearchBar } from "./SearchBar";

export function HeaderMain() {
  const { user, authenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isMac = navigator.userAgent.includes("Mac");

      if ((isMac && e.metaKey && e.key === "k") || (!isMac && e.ctrlKey && e.key === "k")) {
        const nativeInput = document.querySelector("input[type='search']");
        if (nativeInput) {
          nativeInput.focus(); // Focus Searchbar on Cmd+K or Ctrl+K
        }
      }

      if (e.key === "Escape") {
        const input = document.querySelector("input[type='search']");
        if (input === document.activeElement) {
          input.blur(); // Unfocus Searchbar on Escape
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex h-[120px] w-full items-center justify-between">
      <Link to="/" className="ml-4 min-w-32">
        <img src={logo} alt="UBC Marketplace Logo" className="h-28" />
      </Link>

      <SearchBar />

      {authenticated ? (
        <div className="mx-8 flex items-center justify-center gap-3">
          <UserSavedListDrawer />

          <ProfileAvatar user={user} />
        </div>
      ) : (
        <Link to="/auth/login">
          <Button
            type="button"
            radius="large"
            variant="solid"
            className="mx-8 w-24 bg-white shadow hover:border-2 hover:border-cyan-500"
            startContent={<LuUser className="-mr-1 h-4 w-4" />}
          >
            Login
          </Button>
        </Link>
      )}
    </div>
  );
}
