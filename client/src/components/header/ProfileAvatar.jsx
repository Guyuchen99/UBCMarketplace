import { addToast, Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/authSlice";

export function ProfileAvatar({ user }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser()).then((data) => {
      if (data?.payload?.success) {
        addToast({ title: "Success", description: data?.payload?.message, color: "success" });
      }
    });
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          name={user?.username?.charAt(0)?.toUpperCase()}
          src="https://images.unsplash.com/broken"
          className="bg-white text-2xl font-extrabold text-ubc-blue hover:border-2 hover:border-cyan-500 aria-expanded:scale-100 aria-expanded:border-2 aria-expanded:border-cyan-500 aria-expanded:opacity-100"
          showFallback
        />
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem key="profile" showDivider className="h-14">
          <p className="font-semibold">{`Logged in as ${user?.username}`}</p>
        </DropdownItem>
        <DropdownItem key="settings">Account Settings</DropdownItem>
        <DropdownItem key="mailbox">Mailbox</DropdownItem>
        <DropdownItem key="sell">Sell Items</DropdownItem>
        <DropdownItem key="request" showDivider>
          Request Items
        </DropdownItem>
        <DropdownItem key="logout" onClick={handleLogout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
