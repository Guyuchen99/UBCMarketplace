import { Checkbox } from "@heroui/react";

export function CheckBox({ children, register, disabled = false }) {
  return (
    <Checkbox color="primary" classNames={{ label: "text-sm" }} isDisabled={disabled} {...register}>
      {children}
    </Checkbox>
  );
}
