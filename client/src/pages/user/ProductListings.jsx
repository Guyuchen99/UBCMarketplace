import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";

import { ProductFilter } from "../../components/product/ProductFilter";

import { useState } from "react";
import { LuArrowDownUp } from "react-icons/lu";

import { ProductCard } from "../../components/product/ProductCard";
import clothing from "../../data/clothing.json";

const sortOptions = [
  { id: "latest", label: "Latest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
];

export function ProductListings() {
  const [sort, setSort] = useState("latest");

  function handleSortBy(key) {
    setSort(key);
  }

  return (
    <section className="w-full">
      <div className="mt-[164px] h-[calc(100vh_-_164px)] min-h-[636px] w-full">
        <div className="grid grid-cols-1 gap-6 bg-ubc-bg-primary p-8 md:grid-cols-[200px_1fr] md:p-6">
          <ProductFilter filters={null} handleFilter={null} />

          <div className="w-full rounded-lg bg-white shadow-md">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-extrabold">All Products</h2>

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

            <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {clothing && clothing.length > 0
                ? clothing.map((product) => <ProductCard key={product.id} product={product} primary={true} />)
                : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
