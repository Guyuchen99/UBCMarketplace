import { Input } from "@heroui/react";

export function UsernameInput({ register, errors, disabled = false }) {
  return (
    <div className="w-full">
      <Input
        type="text"
        label="Username"
        labelPlacement="outside"
        variant="bordered"
        placeholder="Please enter your username"
        errorMessage={errors.username?.message}
        isInvalid={!!errors.username}
        isDisabled={disabled}
        {...register("username", {
          required: { value: true, message: "Required" },
          pattern: {
            value: /^[A-Za-z0-9\s]+$/,
            message: "Only letters, numbers, and spaces are allowed",
          },
          minLength: {
            value: 2,
            message: "Must be at least 2 characters",
          },
          maxLength: {
            value: 30,
            message: "Must be under 30 characters",
          },
        })}
      />
    </div>
  );
}
