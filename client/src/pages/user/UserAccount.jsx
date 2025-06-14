import { addToast, Avatar, Button, Card, CardBody, CardHeader, Form } from "@heroui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { EmailInput } from "../../components/form/EmailInput.jsx";
import { UsernameInput } from "../../components/form/UsernameInput.jsx";
import { ChangePasswordModal } from "../../components/modal/ChangePasswordModal.jsx";
import { DeleteAccountModal } from "../../components/modal/DeleteAccountModal.jsx";
import { getProfile, updateAccount } from "../../redux/auth/authSlice.js";

export function UserAccount() {
  const [edit, setEdit] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { username: user?.username, email: user?.email } });

  function onSubmit(data) {
    dispatch(updateAccount(data)).then((res) => {
      if (res?.payload?.success) {
        dispatch(getProfile());
        setEdit(false);
        addToast({ title: "Success", description: res.payload.message, color: "success" });
      } else {
        addToast({ title: "Error", description: res.payload?.message, color: "danger" });
      }
    });
  }

  function handleEdit() {
    setEdit(true);
  }

  function handleCancel() {
    reset({ username: user.username, email: user.email });
    setEdit(false);
  }

  return (
    <>
      <section className="w-full">
        <div className="mt-[164px] h-[calc(100vh_-_164px)] min-h-[636px] w-full">
          <div className="flex h-full flex-col items-center justify-evenly px-10 text-black">
            <h2 className="mx-auto text-3xl font-bold">My Account</h2>

            <Card className="h-60 w-[80%] max-w-2xl">
              <CardBody className="p-0">
                <div className="flex h-full w-full">
                  <div className="min-w-42 flex w-[35%] flex-col items-center justify-evenly space-y-2 bg-gradient-to-t from-white to-sky-100">
                    <Avatar
                      name={user?.username?.charAt(0)?.toUpperCase()}
                      src="https://images.unsplash.com/broken"
                      className="mb-2 h-28 w-28 bg-white text-7xl font-extrabold text-black shadow"
                      showFallback
                    />
                    <button className="text-md cursor-pointer font-medium text-cyan-500">Change Photo</button>
                  </div>

                  <div className="flex-1 rounded-lg px-5 py-5">
                    <Form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-2">
                      <div className="flex w-full items-center">
                        <FaUser className="mr-6 h-5 w-5 text-black" />
                        <UsernameInput key={edit} register={register} errors={errors} readOnly={!edit} largerText />
                      </div>

                      <div className="flex w-full items-center">
                        <FaEnvelope className="mr-6 h-5 w-5 text-black" />
                        <EmailInput key={edit} register={register} errors={errors} readOnly largerText />
                      </div>

                      {edit ? (
                        <div className="flex items-center gap-5 self-end">
                          <Button type="button" color="danger" variant="solid" onPress={handleCancel}>
                            Cancel
                          </Button>

                          <Button type="submit" color="success">
                            Save Changes
                          </Button>
                        </div>
                      ) : (
                        <Button type="button" className="self-end bg-cyan-400" onPress={handleEdit}>
                          Edit
                        </Button>
                      )}
                    </Form>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="h-60 w-[80%] max-w-2xl">
              <CardHeader>
                <h2 className="mx-auto mt-2 text-xl font-bold">Account Settings</h2>
              </CardHeader>
              <CardBody className="space-y-4 px-4">
                <Button
                  variant="light"
                  className="justify-start bg-gray-50 text-left font-medium hover:bg-gray-100"
                  onPress={() => setOpenChangePasswordModal(true)}
                >
                  Change Password
                </Button>

                <Button variant="light" className="justify-start bg-gray-50 text-left font-medium hover:bg-gray-100">
                  Notification Preferences
                </Button>

                <Button
                  variant="light"
                  className="justify-start bg-gray-50 text-left font-medium text-rose-500 hover:bg-gray-100"
                  onPress={() => setOpenDeleteAccountModal(true)}
                >
                  Delete Account
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <ChangePasswordModal
        openChangePasswordModal={openChangePasswordModal}
        setOpenChangePasswordModal={setOpenChangePasswordModal}
      />

      <DeleteAccountModal
        openDeleteAccountModal={openDeleteAccountModal}
        setOpenDeleteAccountModal={setOpenDeleteAccountModal}
      />
    </>
  );
}
