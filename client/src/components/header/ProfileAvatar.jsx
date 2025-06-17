import { addToast, Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../../redux/auth/authSlice";

export function ProfileAvatar({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser()).then((data) => {
      if (data?.payload?.success) {
        navigate("/", { replace: true });
        addToast({ title: "Success", description: data?.payload?.message, color: "success" });
      }
    });
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          name={user?.username?.charAt(0)?.toUpperCase()}
          src="https://images.unsplash.com/broken"
          className="bg-white shadow text-2xl font-extrabold text-black hover:border-2 hover:border-cyan-500 aria-expanded:scale-100 aria-expanded:border-2 aria-expanded:border-cyan-500 aria-expanded:opacity-100"
          showFallback
        />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="profile" textValue={`Logged in as ${user?.username}`} showDivider className="h-14">
          <p className="font-semibold">{`Logged in as ${user?.username}`}</p>
        </DropdownItem>
        <DropdownItem key="account" onClick={() => navigate("/account")}>
          Account Settings
        </DropdownItem>
        <DropdownItem key="mailbox" onClick={() => navigate("/my-mailbox")}>
          Mailbox
        </DropdownItem>
        <DropdownItem key="mailbox" onClick={() => navigate("/my-postings")}>
          Postings
        </DropdownItem>
        <DropdownItem key="mailbox" showDivider onClick={() => navigate("/my-requests")}>
          Requests
        </DropdownItem>
        <DropdownItem key="logout" onClick={handleLogout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
