import { Card, CardBody, CardFooter, Image, useDisclosure } from "@heroui/react";
import { MdLocationPin } from "react-icons/md";

import { PostingDetailsModal } from "../modal/PostingDetailsModal.jsx";

export function PostingCard({ product, primary = false }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const gradientClass = primary
    ? "bg-gradient-to-tr from-white to-sky-200"
    : "bg-gradient-to-tr from-ubc-bg-primary to-sky-200";

  return (
    <>
      <div onClick={onOpen} className="cursor-pointer">
        <Card key={product.id} radius="lg" shadow="sm" className={`group relative ${gradientClass}`}>
          <CardBody className="relative overflow-visible pt-4">
            <Image
              alt={product.imageAlt}
              className="aspect-square h-72 w-full object-cover transition-transform duration-200 ease-in-out hover:scale-105 lg:h-80 xl:h-[23rem]"
              radius="sm"
              shadow="sm"
              src={product.imageSrc}
              width="100%"
              isZoomed
            />
          </CardBody>

          <CardFooter className="flex items-start justify-between px-4 pt-0 text-small">
            <div className="w-full">
              <h3 className="text-base font-medium text-black">{product.name}</h3>
              <h4 className="mt-1 text-sm text-ubc-blue">May 26, 2025</h4>
              <h4 className="mt-5 text-sm text-ubc-blue">
                <span className="flex w-full items-center gap-1">
                  <MdLocationPin />
                  {product.location}
                </span>
              </h4>
            </div>
            <p className="text-base font-medium">{product.price}</p>
          </CardFooter>
        </Card>
      </div>

      <PostingDetailsModal isOpen={isOpen} onClose={onClose} product={product} />
    </>
  );
}
