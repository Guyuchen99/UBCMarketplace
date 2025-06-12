import { addToast, Form } from "@heroui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { BackButton } from "../../components/form/BackButton.jsx";
import { ConfirmPasswordInput } from "../../components/form/ConfirmPasswordInput.jsx";
import { EmailInput } from "../../components/form/EmailInput.jsx";
import { OtpInput } from "../../components/form/OtpInput.jsx";
import { PasswordInput } from "../../components/form/PasswordInput.jsx";
import { SubmitButton } from "../../components/form/SubmitButton.jsx";
import { UsernameInput } from "../../components/form/UsernameInput.jsx";

import { registerUser } from "../../redux/auth/authSlice.js";

export function AuthRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register, // Register Input Elements to React Hook Form
    control, // Hook Up Controlled Inputs to the Form
    watch, // Watch Specific Inputs Value
    trigger, // Trigger Input Validation Manually
    handleSubmit, // Handle Submission of the Form
    formState: { errors }, // Track Validation Errors
  } = useForm();

  const password = watch("password"); // Provide the Newest Value of the Password

  const [afterFirstSubmit, setAfterFirstSubmit] = useState(false);

  useEffect(() => {
    if (afterFirstSubmit) {
      trigger("confirmPassword"); // Revalidate when Password Changes
    }
  }, [password, afterFirstSubmit, trigger]);

  function onSubmit(data) {
    console.log("Sending login data to backend:", data);
    setLoading(true);

    dispatch(registerUser(data)).then((data) => {
      if (data?.payload?.success) {
        navigate("/auth/login");
        setLoading(false);
        addToast({ title: "Success", description: data?.payload?.message, color: "success" });
      } else {
        setLoading(false);
        addToast({ title: "Error", description: data?.payload?.message, color: "error" });
      }
    });
  }

  function onError(errors) {
    console.log(errors);

    setAfterFirstSubmit(true);
  }

  return (
    <>
      <h2 className="mt-5 text-center text-2xl font-bold text-ubc-blue">Create your account</h2>

      <div className="mt-10 w-full max-w-lg px-10">
        <Form onSubmit={handleSubmit(onSubmit, onError)} className="w-full space-y-2">
          <UsernameInput register={register} errors={errors} disabled={loading} />

          <EmailInput register={register} errors={errors} disabled={loading} />
          <OtpInput control={control} errors={errors} disabled={loading} />

          <PasswordInput
            register={register}
            errors={errors}
            showPassword={showPassword}
            setShowPassword={() => setShowPassword(!showPassword)}
            requireValidate={true}
            disabled={loading}
          />

          <ConfirmPasswordInput
            register={register}
            errors={errors}
            password={password}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={loading}
          />

          <div className="flex w-full gap-5">
            <SubmitButton defaultText="Register" loadingText="Registering..." loading={loading} />
            <BackButton>Back</BackButton>
          </div>
        </Form>
      </div>
    </>
  );
}
