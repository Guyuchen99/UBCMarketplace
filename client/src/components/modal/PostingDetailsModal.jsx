import { Avatar, Button, Chip, Divider, Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/react";
import { FaCommentDots, FaHeart, FaMapMarkerAlt } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";

import { IoMdTime } from "react-icons/io";

import { MakeOfferModal } from "./MakeOfferModal.jsx";
import { MessageSellerModal } from "./MessageSellerModal.jsx";

const tags = ["Textbook", "Biol112", "First-Year"];

export function PostingDetailsModal({ isOpen, onClose, product }) {
  const { isOpen: isMessageOpen, onOpen: onOpenMessage, onClose: onCloseMessage } = useDisclosure();
  const { isOpen: isOfferOpen, onOpen: onOpenOffer, onClose: onCloseOffer } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
        <ModalContent>
          <ModalBody className="rounded-lg bg-white px-6 py-8">
            <div className="grid grid-cols-1 gap-2 bg-white md:grid-cols-[43%_1fr]">
              <div className="overflow-hidden">
                <img
                  src={product?.imageSrc}
                  alt={product?.imageAlt}
                  className="h-full w-full rounded-xl object-cover object-center"
                />
              </div>

              <div className="flex flex-col gap-4 p-4">
                <h1 className="text-3xl font-bold">{product?.name}</h1>
                <h2 className="text-2xl font-bold text-red-500">{product?.price}</h2>
                <p>Description: This is something everyone should have</p>

                <div className="flex gap-2">
                  {tags.map((fruit, index) => (
                    <Chip key={index} variant="flat">
                      {fruit}
                    </Chip>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-1 text-sm text-gray-600">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <IoMdTime />
                    Posted 2 hours ago
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <FaMapMarkerAlt />
                  Pickup Location: UBC Life Building
                </div>

                <Button variant="bordered" className="w-full text-red-500" startContent={<FaHeart />}>
                  Save Posting
                </Button>

                <Divider />

                <h1 className="text-xl">Seller Information:</h1>
                <div className="flex items-center gap-3">
                  <Avatar name="E" className="bg-gray-300 text-gray-800" />
                  <div>
                    <p className="font-semibold">Emily Chen</p>
                    <p className="text-sm text-gray-500">Member since June 2025</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <Button className="w-full" startContent={<FaSackDollar />} onPress={onOpenOffer}>
                      Make Offer
                    </Button>
                    <Button
                      className="w-full bg-ubc-blue text-white"
                      startContent={<FaCommentDots />}
                      onPress={onOpenMessage}
                    >
                      Message
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <MakeOfferModal isOpen={isOfferOpen} onClose={onCloseOffer} product={product} />
      <MessageSellerModal isOpen={isMessageOpen} onClose={onCloseMessage} product={product} />
    </>
  );
}
