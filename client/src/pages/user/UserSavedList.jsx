import { Avatar, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, useDisclosure } from "@heroui/react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router";

export function UserSavedListDrawer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const savedItems = [];

  return (
    <>
      <Avatar
        classNames={{ base: "bg-white shadow hover:border-2 hover:border-cyan-500" }}
        icon={<FaHeart className="h-5 w-5 text-rose-500" />}
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="right" size="sm">
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="text-xl font-bold">My Saved List</DrawerHeader>

              <DrawerBody className="flex flex-col items-center justify-start px-6 text-black">
                {savedItems.length === 0 ? (
                  <>
                    <FaHeart className="h-12 w-12 text-gray-400" />
                    <h2 className="text-xl font-semibold text-black">No saved items yet</h2>
                    <p className="text-gray-500">Start saving items you're interested in!</p>
                    <Link to="/product-listings" className="mt-4">
                      <Button size="lg" className="bg-ubc-blue text-white">
                        Browse Products
                      </Button>
                    </Link>
                  </>
                ) : (
                  <div className="w-full">
                    <p className="text-gray-500">Saved items will appear here.</p>
                  </div>
                )}
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
