import {
  Avatar,
  AvatarGroup,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from "@heroui/react";

export function MakeOfferModal({ isOpen, onClose, product }) {
  const totalOffers = 6;
  const lastOfferPrice = 15;
  const askingPrice = product?.price ?? 30;

  const minOffer = Math.ceil(lastOfferPrice) + 1;

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center" size="xl">
      <ModalContent>
        <ModalHeader className="px-6 pt-6 text-xl font-bold">Make an Offer</ModalHeader>

        <ModalBody className="px-6 pb-6 pt-2">
          <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
            <p className="mb-1 font-medium">How it works:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                The seller listed this item for <strong>{askingPrice}</strong>.
              </li>
              <li>Your offer must be:</li>
              <ul className="list-disc pl-5">
                <li>
                  <strong>At least $1 more</strong> than the last offer price.
                </li>
                <li>
                  <strong>A whole dollar amounts</strong> with no cents
                </li>
                <li>
                  It <strong>can be higher</strong> than the seller's listed price if you wish to increase your chances
                  of acceptance.
                </li>
              </ul>
              <li>The seller can accept, reject, or wait for more offers.</li>
            </ul>
          </div>

          <div className="mb-2 flex items-center justify-between">
            <AvatarGroup isBordered max={3}>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
            </AvatarGroup>
            <span className="text-sm text-gray-700">
              {totalOffers} user{totalOffers !== 1 ? "s" : ""} have made an offer
            </span>
          </div>

          <div className="mb-4 text-sm font-medium text-gray-800">
            Last Offer Price: <span className="font-semibold text-black">${lastOfferPrice}</span>
          </div>

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">Your Offer Price ($)</label>
            <Input type="number" placeholder="Enter a whole number" variant="bordered" min={minOffer} step={1} />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium text-gray-700">Message to Seller (Optional)</label>
            <Textarea placeholder="Example: I'm very interested in this item!" minRows={3} variant="bordered" />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="light" onClick={onClose}>
              Cancel
            </Button>
            <Button color="primary" className="bg-blue-600 text-white">
              Send Offer
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
