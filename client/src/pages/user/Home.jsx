import { Banner } from "../../components/section/Banner.jsx";

import { PostingCard } from "../../components/posting/PostingCard.jsx";
import { SectionTitle } from "../../components/section/SectionTitle.jsx";

import clothing from "../../data/clothing.json";
import textbooks from "../../data/textbooks.json";

export function Home() {
  return (
    <>
      <section className="w-full">
        <Banner />
      </section>

      <section
        id="textbooks"
        style={{ minHeight: "calc(100vh - 164px)", scrollMarginTop: "164px" }}
        className="flex w-full flex-col items-start justify-center bg-white"
      >
        <SectionTitle title="Textbook" />

        <div className="mb-10 grid w-full grid-cols-1 gap-x-7 gap-y-7 px-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 xl:gap-y-80">
          {textbooks.map((product) => (
            <PostingCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section
        id="clothing"
        style={{ minHeight: "calc(100vh - 164px)", scrollMarginTop: "164px" }}
        className="flex w-full flex-col items-start justify-center bg-ubc-bg-primary"
      >
        <SectionTitle title="Clothing" />

        <div className="mb-10 grid w-full grid-cols-1 gap-x-7 gap-y-7 px-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 xl:gap-y-80">
          {clothing.map((product) => (
            <PostingCard key={product.id} product={product} primary={true} />
          ))}
        </div>
      </section>
    </>
  );
}
