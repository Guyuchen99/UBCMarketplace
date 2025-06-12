const categories = [
  { name: "Trending", href: "#trending" },
  { name: "Textbooks", href: "#textbooks" },
  { name: "Clothing", href: "#clothing" },
  { name: "Electronics", href: "#electronics" },
  { name: "Kitchenware", href: "#kitchenware" },
  { name: "Entertainment", href: "#entertainment" },
  { name: "Dorm Essentials", href: "#dorm" },
  { name: "Requests", href: "#requests" },
  { name: "Free Stuff", href: "#free" },
  { name: "Room Sublet", href: "#sublet" },
];

export function HeaderNavbar() {
  return (
    <div className="w-full overflow-x-auto bg-ubc-blue scrollbar-hide">
      <nav className="inline-flex w-full min-w-max text-sm font-semibold text-white">
        {categories.map((category, index) => (
          <a
            key={category.name}
            href={category.href}
            className={`flex-1 whitespace-nowrap px-3 py-3 text-center hover:bg-cyan-600 ${
              index !== categories.length - 1 ? "border-r border-white" : ""
            }`}
          >
            {category.name}
          </a>
        ))}
      </nav>
    </div>
  );
}
