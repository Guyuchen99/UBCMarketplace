import { useEffect, useState } from "react";
import banner from "../../assets/banner.png";

export function Banner() {
  const [isShort, setIsShort] = useState(false);

  useEffect(() => {
    const checkHeight = () => {
      setIsShort(window.innerHeight <= 700);
    };

    checkHeight();
    window.addEventListener("resize", checkHeight);

    return () => window.removeEventListener("resize", checkHeight);
  }, []);

  return (
    <div
      className="w-full bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundPosition: "63% 0%",
        marginTop: "164px",
        minHeight: "436px",
        height: "calc(100vh - 164px)",
      }}
    >
      <div className="flex h-full max-w-[37rem] flex-col items-start justify-start px-10 text-white">
        <h2 className={`text-5xl font-extrabold leading-tight sm:text-7xl ${isShort ? "my-10" : "my-16"}`}>
          <span className="block">UBC</span>
          <span className="block">Marketplace</span>
        </h2>

        <div className="space-y-4 text-base font-medium leading-relaxed sm:text-lg">
          <p>
            A campus-based e-commerce platform where UBC students can buy, sell, and trade used items like textbooks,
            furniture, and clothing.
          </p>
          <p>This allows verified UBC students to thrift with a trusted environment.</p>
        </div>
      </div>
    </div>
  );
}
