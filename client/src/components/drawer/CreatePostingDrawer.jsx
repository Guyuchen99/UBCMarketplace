import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";

const categories = ["Clothing", "Textbooks", "Kitchenware", "Electronics"];
const availableTags = ["Used", "New", "Popular", "Free Pickup", "Limited Edition"];

export function CreatePostingDrawer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);

  function handleImageChange(e) {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 4) {
      alert("You can upload a maximum of 4 images.");
      return;
    }
    setImages((prev) => [...prev, ...files]);
  }

  function handleRemoveImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function handleTagSelect(e) {
    const value = e.target.value;
    setTags((prev) => (prev.includes(value) ? prev.filter((tag) => tag !== value) : [...prev, value]));
  }

  function handleSubmit() {
    if (images.length < 1) {
      alert("Please upload at least one image.");
      return;
    }

    alert("Form is valid and ready to submit.");
  }

  return (
    <>
      <Button variant="bordered" size="sm" onPress={onOpen}>
        <LuPlus className="h-4 w-4" />
        <span>Create Posting</span>
      </Button>

      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="right" size="sm">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="text-xl font-semibold">Add New Product</DrawerHeader>

              <DrawerBody className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Upload Image(s)</label>
                  <div className="rounded-lg border border-dashed p-6 text-center text-sm text-gray-500">
                    <label className="flex cursor-pointer flex-col items-center gap-2">
                      <FaCloudUploadAlt className="text-3xl text-gray-400" />
                      <p className="text-sm font-medium">Click to upload (1–5 images)</p>
                      <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`upload-${index}`}
                          className="h-20 w-20 rounded object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute right-0 top-0 rounded bg-red-500 px-1 text-xs text-white"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <Input label="Title" placeholder="Enter product title" variant="bordered" />
                <Textarea label="Description" placeholder="Enter product description" variant="bordered" minRows={3} />
                <Select label="Category" variant="bordered" placeholder="Category">
                  {categories.map((category) => (
                    <SelectItem key={category}>{category}</SelectItem>
                  ))}
                </Select>
                <Input type="number" label="Price" placeholder="Enter product price" variant="bordered" />
                <Input label="Location" placeholder="Enter your location" variant="bordered" />

                <div>
                  <label className="mb-1 block text-sm font-medium">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagSelect({ target: { value: tag } })}
                        className={`rounded-full border px-3 py-1 text-sm ${
                          tags.includes(tag)
                            ? "border-cyan-500 bg-cyan-500 text-white"
                            : "border-gray-300 bg-white text-gray-700"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </DrawerBody>

              <DrawerFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Add
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
