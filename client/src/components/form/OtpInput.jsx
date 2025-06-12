import { Button, InputOtp } from "@heroui/react";
import { useController } from "react-hook-form";

export function OtpInput({ control, errors, disabled = false }) {
  // Hook Up OTP Input to React Hook Form
  const { field: opt } = useController({
    name: "otp",
    control,
    defaultValue: "",
    rules: {
      required: { value: true, message: "Required" },
      validate: (opt) => {
        if (opt.length !== 6) {
          return "Must be 6 digits";
        }
      },
    },
  });

  function handleSendingVerification() {
    console.log("Sending code to email...");
    alert("Verification code sent to your email!");
  }

  return (
    <div className="w-full">
      <p className={`text-small ${errors.otp ? "!text-danger" : ""}`}>Verification Code (6 digits)</p>
      <div className="relative flex items-center justify-between">
        <InputOtp
          length={6}
          variant="bordered"
          errorMessage={errors.otp?.message}
          isInvalid={!!errors.otp}
          isDisabled={disabled}
          classNames={{
            segment: errors.otp ? "border-danger !text-danger" : "",
            errorMessage: "pl-1 text-tiny font-normal !text-danger",
          }}
          {...opt}
        />
        <Button
          type="button"
          color="default"
          variant="bordered"
          className="absolute right-0 top-2 w-[25%] border-foreground-200"
          onPressEnd={handleSendingVerification}
          isDisabled={disabled}
          disableRipple
        >
          Send Code
        </Button>
      </div>
    </div>
  );
}
