import { addToast, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { LuTriangleAlert } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { deleteAccount } from "../../redux/auth/authSlice.js";

export function DeleteAccountModal({ openDeleteAccountModal, setOpenDeleteAccountModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleDelete(onClose) {
    dispatch(deleteAccount()).then((res) => {
      if (res?.payload?.success) {
        navigate("/", { replace: true });
        onClose();
        addToast({ title: "Success", description: res.payload.message, color: "success" });
      } else {
        onClose();
        addToast({ title: "Error", description: res.payload?.message, color: "danger" });
      }
    });
  }

  return (
    <Modal className="h-[22rem] w-72 py-5" isOpen={openDeleteAccountModal} onOpenChange={setOpenDeleteAccountModal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-rose-100 p-3">
                <LuTriangleAlert className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-center text-xl font-bold">Are you sure?</h3>
            </ModalHeader>

            <ModalBody className="flex items-center justify-center text-center text-sm text-gray-600">
              <p>This action cannot be undone. All data associated with this account will be lost.</p>
            </ModalBody>

            <ModalFooter className="flex flex-col items-center justify-center gap-4">
              <Button color="danger" className="w-full" onPress={() => handleDelete(onClose)}>
                Delete Account
              </Button>

              <Button onPress={onClose} className="w-[60%] bg-gray-200">
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
