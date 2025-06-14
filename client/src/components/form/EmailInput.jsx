import { Input } from "@heroui/react";

export function EmailInput({ register, errors, disabled = false, readOnly = false, largerText = false }) {
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
        isReadOnly={readOnly}
        classNames={{
          inputWrapper: `${readOnly ? "!border-none !shadow-none !cursor-default p-0" : ""}`,
          label: `${readOnly ? "!text-gray-400" : ""} ${largerText ? "!text-lg mt-2.5" : ""}`,
          input: `${readOnly ? "placeholder:!text-black" : ""} ${largerText ? "!text-lg" : ""}`,
        }}
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
