import { Avatar, Button, Form, Input, Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { FaPaperPlane } from "react-icons/fa";

export function MessageSellerModal({ isOpen, onClose, product }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center" size="xl">
      <ModalContent>
        <ModalHeader className="flex items-center justify-between px-6 pt-4">
          <div className="flex items-center gap-3">
            <Avatar name="E" className="bg-gray-300 text-gray-800" />
            <div>
              <p className="font-semibold">Chat with Emily Chen</p>
            </div>
          </div>
        </ModalHeader>

        <ModalBody className="bg-white px-6 py-4">
          <div className="flex items-center gap-3 border-b py-3">
            <img src={product?.imageSrc} alt={product?.imageAlt} className="h-12 w-12 rounded-md object-cover" />
            <div>
              <p className="font-semibold">{product?.name}</p>
              <p className="text-sm font-medium text-red-500">{product?.price}</p>
            </div>
          </div>

          <div className="min-h-[200px] py-4 text-center text-sm text-gray-400">Start a conversation with Emily</div>

          <Form>
            <div className="flex w-full items-center gap-2 border-t pb-1 pt-4">
              <Input
                isClearable
                className="w-full"
                placeholder="Type your message here..."
                variant="bordered"
                size="sm"
              />
              <Button
                type="submit"
                size="sm"
                className="bg-blue-500 text-white"
                startContent={<FaPaperPlane className="h-5 w-5" />}
              >
                Send
              </Button>
            </div>
          </Form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
