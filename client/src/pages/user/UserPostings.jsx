import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";

import { useState } from "react";
import { LuArrowDownUp } from "react-icons/lu";

import { PostingCard } from "../../components/posting/PostingCard";
import { PostingFilter } from "../../components/posting/PostingFilter";
import clothing from "../../data/clothing.json";

const sortOptions = [
  { id: "latest", label: "Latest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
];

export function UserPostings() {
  const [sort, setSort] = useState("latest");

  function handleSortBy(key) {
    setSort(key);
  }

  return (
    <section className="w-full">
      <div className="mt-[164px] h-[calc(100vh_-_164px)] min-h-[636px] w-full">
        <div className="grid grid-cols-1 gap-6 bg-ubc-bg-primary p-8 md:grid-cols-[200px_1fr] md:p-6">
          <PostingFilter filters={null} handleFilter={null} />

          <div className="flex flex-col rounded-lg border bg-white px-4 shadow-sm">
            <div className="flex items-center justify-between border-b px-2 py-4">
              <h2 className="text-lg font-extrabold">My Postings</h2>

              <div className="flex items-center gap-3">
                <span className="text-black">{clothing?.length} Products</span>

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

            <div className="grid grid-cols-1 gap-4 px-4 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {clothing && clothing.length > 0
                ? clothing.map((product) => <PostingCard key={product.id} product={product} primary={true} />)
                : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
