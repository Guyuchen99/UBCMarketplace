import { Input } from "@heroui/react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export function ConfirmPasswordInput({
  register,
  errors,
  password,
  showConfirmPassword,
  setShowConfirmPassword,
  disabled = false,
}) {
  return (
    <div className="w-full">
      <Input
        type={showConfirmPassword ? "text" : "password"}
        label="Confirm Password"
        labelPlacement="outside"
        variant="bordered"
        placeholder="Please confirm your password"
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
        isDisabled={disabled}
        endContent={
          <button type="button" onClick={setShowConfirmPassword}>
            {showConfirmPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
          </button>
        }
        {...register("confirmPassword", {
          required: { value: true, message: "Required" },
          validate: {
            containSamePassword: (confirmPassword) => {
              if (confirmPassword !== password) {
                return "Passwords do not match";
              }
            },
          },
        })}
      />
    </div>
  );
}
