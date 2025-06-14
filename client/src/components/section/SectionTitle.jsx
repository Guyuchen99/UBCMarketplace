import { Link } from "react-router";

export function SectionTitle({ title }) {
  return (
    <div className="mb-5 mt-7 flex w-full items-center justify-between px-10">
      <h2 className="text-2xl font-bold text-ubc-blue">{title}</h2>
      <Link to="/product-listings" className="text-md cursor-pointer text-ubc-blue hover:text-cyan-500 hover:underline">
        View More →
      </Link>
    </div>
  );
}
