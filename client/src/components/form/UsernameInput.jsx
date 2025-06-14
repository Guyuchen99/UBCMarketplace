import { Input } from "@heroui/react";

export function UsernameInput({ register, errors, disabled = false, readOnly = false, largerText = false }) {
  console.log("here");
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
        isReadOnly={readOnly}
        classNames={{
          inputWrapper: `${readOnly ? "!border-none !shadow-none !cursor-default p-0" : ""}`,
          label: `${readOnly ? "!text-gray-400" : ""} ${largerText ? "!text-lg mt-2" : ""}`,
          input: `${readOnly ? "placeholder:!text-black" : ""} ${largerText ? "!text-lg" : ""}`,
        }}
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

// import { Input } from "@heroui/react";

// /**
//  * Controlled wrapper.  ───────────────────────────────────────────────
//  * Accepts `field` from RHF's Controller   → supplies value/onChange/onBlur.
//  * Passes back validation error for styling.
//  */
// export function UsernameInput({
//   field, // { value, onChange, onBlur, name, ref }
//   error,
//   readOnly = false,
//   largerText = false,
// }) {
//   return (
//     <div className="w-full">
//       <Input
//         {...field} /* makes the component controlled */
//         type="text"
//         label="Username"
//         labelPlacement="outside"
//         variant="bordered"
//         placeholder="Please enter your username"
//         isReadOnly={readOnly}
//         errorMessage={error?.message}
//         isInvalid={!!error}
//         classNames={{
//           inputWrapper: `${readOnly ? "!border-none !shadow-none !cursor-default p-0" : ""}`,
//           label: `${readOnly ? "!text-gray-400" : ""} ${largerText ? "!text-lg mt-2" : ""}`,
//           input: `${readOnly ? "placeholder:!text-black" : ""} ${largerText ? "!text-lg" : ""}`,
//         }}
//       />
//     </div>
//   );
// }
