import { Input } from "@heroui/react";

export function EmailInput({ register, errors, disabled = false }) {
  return (
    <div className="w-full">
      <Input
        type="text"
        label="Email"
        labelPlacement="outside"
        variant="bordered"
        placeholder="Please enter your email"
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        isDisabled={disabled}
        {...register("email", {
          required: { value: true, message: "Required" },
          pattern: {
            value: /^.+@(?:[a-zA-Z0-9-]+\.)*ubc\.ca$/,
            message: "Must be a valid UBC email",
          },
        })}
      />
    </div>
  );
}
