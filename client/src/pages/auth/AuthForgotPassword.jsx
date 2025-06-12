import { addToast, Form } from "@heroui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { BackButton } from "../../components/form/BackButton.jsx";
import { EmailInput } from "../../components/form/EmailInput.jsx";
import { SubmitButton } from "../../components/form/SubmitButton.jsx";

export function AuthForgotPassword() {
  const {
    register, // Register Input Elements to React Hook Form
    handleSubmit, // Handle Submission of the Form
    formState: { errors }, // Track Validation Errors
    reset, // Reset Form State
  } = useForm();

  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    console.log("Sending password reset request:", data);
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Replace this with actual API call

      addToast({
        title: "Success",
        description: "Password reset instructions have been sent to your email.",
        color: "success",
      });

      reset();
    } catch (error) {
      console.error("Password reset failed:", error);

      addToast({
        title: "Error",
        description: "Failed to send reset instructions. Please try again.",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="mt-5 text-center text-2xl font-bold text-ubc-blue">Forgot your password?</h2>

      <p className="relative mt-12 px-10 font-semibold text-ubc-blue">
        Please provide the email address that you used when you signed up for your account.
      </p>

      <div className="mt-24 w-full max-w-lg px-10">
        <Form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-7">
          <EmailInput register={register} errors={errors} disabled={loading} />

          <div className="flex w-full items-center justify-between gap-5">
            <SubmitButton defaultText="Send" loadingText="Sending..." loading={loading} />
            <BackButton>Back</BackButton>
          </div>
        </Form>
      </div>
    </>
  );
}
