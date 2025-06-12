import { Input } from "@heroui/react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

export function PasswordInput({
  register,
  errors,
  showPassword,
  setShowPassword,
  requireValidate = false,
  disabled = false,
}) {
  return (
    <div className="w-full">
      <Input
        type={showPassword ? "text" : "password"}
        label="Password"
        labelPlacement="outside"
        variant="bordered"
        placeholder="Please enter your password"
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        isDisabled={disabled}
        endContent={
          <button type="button" onClick={setShowPassword}>
            {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
          </button>
        }
        {...register("password", {
          required: { value: true, message: "Required" },
          ...(requireValidate && {
            minLength: {
              value: 10,
              message: "Must be at least 10 characters",
            },
            validate: {
              containLowerCase: (password) => {
                if (!password.match(/[a-z]/)) {
                  return "Must include at least 1 lowercase letter";
                }
              },
              containUpperCase: (password) => {
                if (!password.match(/[A-Z]/)) {
                  return "Must include at least 1 uppercase letter";
                }
              },
              containNumber: (password) => {
                if (!password.match(/[0-9]/)) {
                  return "Must include at least 1 number";
                }
              },
            },
          }),
        })}
      />
    </div>
  );
}
