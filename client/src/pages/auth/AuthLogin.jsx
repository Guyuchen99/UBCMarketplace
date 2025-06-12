import { addToast, Form } from "@heroui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

import { CheckBox } from "../../components/form/CheckBox.jsx";
import { EmailInput } from "../../components/form/EmailInput.jsx";
import { PasswordInput } from "../../components/form/PasswordInput.jsx";
import { SubmitButton } from "../../components/form/SubmitButton.jsx";

import { loginUser } from "../../redux/auth/authSlice.js";

export function AuthLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register, // Register Input Elements to React Hook Form
    setValue, // Set Input Value Programmatically
    handleSubmit, // Handle Submission of the Form
    formState: { errors }, // Track Validation Errors
  } = useForm();

  useEffect(() => {
    const savedEmail = localStorage.getItem("UBCMarketplaceEmail");
    if (savedEmail) {
      setValue("email", savedEmail); // Pre-Fill Email Input
      setValue("rememberMe", true); // Check Remember Me
    }
  }, [setValue]);

  function onSubmit(data) {
    setLoading(true);

    if (data.rememberMe) {
      localStorage.setItem("UBCMarketplaceEmail", data.email); // Save Email
    } else {
      localStorage.removeItem("UBCMarketplaceEmail"); // Clear Saved Email
    }

    dispatch(loginUser(data)).then((data) => {
      if (data?.payload?.success) {
        navigate("/");
        setLoading(false);
        addToast({ title: "Success", description: data?.payload?.message, color: "success" });
      } else {
        setLoading(false);
        addToast({ title: "Error", description: data?.payload?.message, color: "error" });
      }
    });
  }

  return (
    <>
      <h2 className="mt-5 text-center text-2xl font-bold text-ubc-blue">Sign in to your account</h2>

      <div className="mt-10 w-full max-w-lg px-10">
        <Form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-7">
          <EmailInput register={register} errors={errors} disabled={loading} />

          <PasswordInput
            register={register}
            errors={errors}
            showPassword={showPassword}
            setShowPassword={() => setShowPassword(!showPassword)}
            disabled={loading}
          />

          <div className="flex w-full items-center justify-between gap-5">
            <CheckBox register={register("rememberMe")} disabled={loading}>
              Remember Me
            </CheckBox>

            <Link to="/auth/forgot-password" className="text-sm font-semibold text-form-violet hover:underline">
              Forgot Password?
            </Link>
          </div>

          <SubmitButton defaultText="Sign In" loadingText="Signing In..." loading={loading} />
        </Form>

        <p className="mt-10 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-sm font-semibold text-form-violet hover:underline">
            Register Now
          </Link>
        </p>
      </div>
    </>
  );
}
