import { Input, Kbd } from "@heroui/react";
import { MdSearch } from "react-icons/md";

export function SearchBar() {
  return (
    <Input
      classNames={{
        base: "max-w-md",
        inputWrapper:
          "!bg-white hover:!ring-[3px] hover:!ring-cyan-500 hover:!ring-offset-0 data-[focus=true]:!ring-[3px] data-[focus=true]:!ring-cyan-500 data-[focus=true]:!ring-offset-0",
      }}
      type="search"
      size="lg"
      placeholder="Type to search..."
      startContent={<MdSearch size={18} />}
      endContent={
        <Kbd keys={["command"]} className="bg-ubc-bg-primary shadow-none">
          K
        </Kbd>
      }
    />
  );
}
