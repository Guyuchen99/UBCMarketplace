import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { ConfirmPasswordInput } from "../../components/form/ConfirmPasswordInput.jsx";
import { PasswordInput } from "../../components/form/PasswordInput.jsx";
import { updateAccount } from "../../redux/auth/authSlice";

export function ChangePasswordModal({ openChangePasswordModal, setOpenChangePasswordModal }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [afterFirstSubmit, setAfterFirstSubmit] = useState(false);

  const dispatch = useDispatch();

  const {
    register,
    watch,
    trigger,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  useEffect(() => {
    if (afterFirstSubmit) {
      trigger("confirmPassword");
    }
  }, [password, afterFirstSubmit, trigger]);

  function handleCancel(onClose) {
    reset();
    setAfterFirstSubmit(false);
    onClose();
  }

  function onSubmit(data, onClose) {
    dispatch(updateAccount(data)).then((res) => {
      if (res?.payload?.success) {
        handleCancel(onClose);
        addToast({ title: "Success", description: res.payload.message, color: "success" });
      } else {
        addToast({ title: "Error", description: res.payload?.message, color: "danger" });
      }
    });
  }

  function onError(errors) {
    console.log(errors);
    setAfterFirstSubmit(true);
  }

  return (
    <Modal className="h-96 w-96 py-5" isOpen={openChangePasswordModal} onOpenChange={setOpenChangePasswordModal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="mx-auto pt-5">
              <h3 className="text-center text-xl font-bold">Change Your Password</h3>
            </ModalHeader>

            <ModalBody className="mb-1 flex items-center justify-evenly text-center text-sm text-gray-600">
              <PasswordInput
                register={register}
                errors={errors}
                showPassword={showPassword}
                setShowPassword={() => setShowPassword(!showPassword)}
                requireValidate={true}
              />

              <ConfirmPasswordInput
                register={register}
                errors={errors}
                password={password}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </ModalBody>

            <ModalFooter className="flex items-center justify-center gap-4">
              <Button
                color="success"
                className="w-full"
                onPress={handleSubmit((data) => onSubmit(data, onClose), onError)}
              >
                Update Password
              </Button>

              <Button onPress={() => handleCancel(onClose)} className="w-full bg-gray-200">
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
