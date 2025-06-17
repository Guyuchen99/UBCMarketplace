import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Tab, Tabs } from "@heroui/react";
import { useState } from "react";
import { LuArrowDownUp, LuPlus } from "react-icons/lu";
import { PostingCard } from "../../components/posting/PostingCard";

import { CreatePostingDrawer } from "../../components/drawer/CreatePostingDrawer";
import { PostingFilter } from "../../components/posting/PostingFilter";
import clothing from "../../data/clothing.json";

const sortOptions = [
  { id: "latest", label: "Latest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
];

export function Postings() {
  const [sort, setSort] = useState("latest");
  const [selectedTab, setSelectedTab] = useState("all-products");

  function handleSortBy(key) {
    setSort(key);
  }

  return (
    <section className="w-full">
      <div className="mt-[164px] h-[calc(100vh_-_164px)] min-h-[636px] w-full">
        <div className="grid grid-cols-1 gap-6 bg-ubc-bg-primary p-8 md:grid-cols-[200px_1fr] md:p-6">
          <PostingFilter filters={null} handleFilter={null} />

          <div className="flex flex-col rounded-lg border bg-white px-4 shadow-sm">
            <div className="flex items-center justify-between border-b">
              <Tabs
                selectedKey={selectedTab}
                onSelectionChange={(key) => setSelectedTab(key)}
                variant="underlined"
                aria-label="Product Tabs"
                classNames={{
                  tabList: "gap-6 p-0 py-2",
                  cursor: "w-full bg-cyan-400 !translate-y-2",
                  tab: "max-w-fit px-2 h-12",
                  tabContent: "group-data-[selected=true]:text-[#06b6d4]",
                }}
              >
                <Tab
                  key="all-products"
                  className=""
                  title={
                    <div className="flex items-center space-x-2">
                      <span>All Products</span>
                      <Chip size="sm" variant="faded">
                        {clothing?.length ?? 0}
                      </Chip>
                    </div>
                  }
                />
                <Tab
                  key="requests"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>All Requests</span>
                      <Chip size="sm" variant="faded">
                        {clothing?.length && 0}
                      </Chip>
                    </div>
                  }
                />
              </Tabs>

              <div className="flex items-center gap-3 pr-2">
                <CreatePostingDrawer />

                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered" size="sm" className="flex items-center gap-1">
                      <LuArrowDownUp className="h-4 w-4" />
                      <span>Sort by</span>
                    </Button>
                  </DropdownTrigger>

                  <DropdownMenu onAction={handleSortBy}>
                    {sortOptions.map((option) => (
                      <DropdownItem key={option.id}>{option.label}</DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>

            <div className="py-2">
              {selectedTab === "all-products" && (
                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {clothing?.map((product) => (
                    <PostingCard key={product.id} product={product} primary={true} />
                  ))}
                </div>
              )}

              {selectedTab === "requests" && <div className="p-8 text-center text-gray-500">No requests yet.</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
