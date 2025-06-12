import { Button } from "@heroui/react";
import { useNavigate } from "react-router";

export function BackButton({ children }) {
  const navigate = useNavigate(); // Programmatic Navigation

  return (
    <Button
      type="button"
      color="default"
      variant="flat"
      className="mt-4 w-full"
      onPressEnd={() => navigate(-1)}
      disableRipple
    >
      {children}
    </Button>
  );
}
