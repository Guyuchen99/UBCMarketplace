import { Accordion, AccordionItem, Checkbox } from "@heroui/react";

const filterOptions = {
  Trending: [
    { id: "recently-posted", label: "Recently Posted" },
    { id: "most-viewed", label: "Most Viewed" },
    { id: "request", label: "Requests" },
    { id: "free", label: "Free Stuff" },
  ],
  Textbooks: [
    { id: "cs", label: "Computer Science" },
    { id: "engineering", label: "Engineering" },
    { id: "math-stats", label: "Math & Stats" },
    { id: "arts-humanities", label: "Arts & Humanities" },
    { id: "business", label: "Business" },
    { id: "life-sciences", label: "Life Sciences" },
    { id: "other-courses", label: "Other Courses" },
  ],
  Clothing: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "shoes", label: "Shoes" },
  ],
  Electronics: [
    { id: "laptops", label: "Laptops" },
    { id: "phones", label: "Phones" },
    { id: "tablets", label: "Tablets" },
    { id: "headphones", label: "Headphones" },
    { id: "calculators", label: "Calculators" },
    { id: "monitors", label: "Monitors" },
    { id: "cables", label: "Chargers & Cables" },
  ],
  Kitchenware: [
    { id: "microwaves", label: "Microwaves" },
    { id: "toasters", label: "Toasters" },
    { id: "cookware", label: "Cookware" },
    { id: "utensils", label: "Utensils" },
    { id: "dishes", label: "Dishes" },
    { id: "kettles", label: "Kettles" },
    { id: "mini-fridges", label: "Mini Fridges" },
  ],
  Entertainment: [
    { id: "board-games", label: "Board Games" },
    { id: "video-games", label: "Video Games" },
    { id: "instruments", label: "Instruments" },
  ],
  "Dorm Essentials": [
    { id: "bedding", label: "Mattress & Bedding" },
    { id: "storage", label: "Storage" },
    { id: "desk-supplies", label: "Desk Supplies" },
    { id: "lamps", label: "Lamps" },
  ],
  "Room Sublet": [
    { id: "studio", label: "Studio" },
    { id: "1-bedroom", label: "1-Bedroom" },
    { id: "shared-room", label: "Shared Room" },
    { id: "on-campus", label: "On-Campus" },
    { id: "off-campus", label: "Off-Campus" },
  ],
};

export function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <h2 className="mb-4 ml-2 text-xl font-bold">Filters</h2>

      <Accordion>
        {Object.entries(filterOptions).map(([category, options]) => (
          <AccordionItem
            key={category}
            title={category}
            className="[&_[data-slot=content]]:pb-4 [&_[data-slot=trigger][data-open=true]]:py-1"
          >
            <div className="space-y-2">
              {options.map((option) => (
                <Checkbox
                  key={option.id}
                  color="secondary"
                  className="cursor-pointer py-0 pl-2"
                  checked={filters?.[category]?.includes(option.id) || false}
                  onCheckedChange={() => handleFilter(category, option.id)}
                >
                  {option.label}
                </Checkbox>
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
