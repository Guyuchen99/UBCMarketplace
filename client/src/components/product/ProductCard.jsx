import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { FaHeart } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";

export function ProductCard({ product, primary = false }) {
  const gradientClass = primary
    ? "bg-gradient-to-tr from-white to-sky-200"
    : "bg-gradient-to-tr from-ubc-bg-primary to-sky-200";

  return (
    <Card key={product.id} radius="lg" shadow="sm" className={`group relative ${gradientClass}`}>
      <CardBody className="relative overflow-visible pt-4">
        <Image
          alt={product.imageAlt}
          className="aspect-square h-72 w-full object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80 xl:h-96"
          radius="sm"
          shadow="sm"
          src={product.imageSrc}
          width="100%"
        />
        {/* <button className="absolute right-2 top-2 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <FaHeart className="h-5 w-5 text-gray-300" />
        </button> */}
      </CardBody>

      <CardFooter className="flex items-start justify-between px-4 pt-0 text-small">
        <div className="w-full">
          <h3 className="text-base font-medium text-black">
            <a href={product.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <h4 className="mt-1 text-sm text-ubc-blue">May 26, 2025</h4>
          <h4 className="mt-5 text-sm text-ubc-blue">
            <span className="flex w-full items-center gap-1">
              <MdLocationPin />
              {product.location}
            </span>
          </h4>
        </div>
        <p className="text-base font-medium">{product.price}</p>
      </CardFooter>
    </Card>
  );
}

// import { Card, CardBody, CardFooter, Image } from "@heroui/react";
// import { FaHeart } from "react-icons/fa";
// import { MdLocationPin } from "react-icons/md";

// export function ProductCard({ product, primary = false }) {
//   const gradientClass = primary
//     ? "bg-gradient-to-tr from-white to-sky-200"
//     : "bg-gradient-to-tr from-ubc-bg-primary to-sky-200";

//   return (
//     <Card key={product.id} radius="lg" shadow="sm" className={`group relative ${gradientClass}`}>
//       <CardBody className="relative overflow-visible bg-red-200 p-0">
//         <Image
//           alt={product.imageAlt}
//           className="aspect-square h-72 w-full object-cover group-hover:opacity-75 lg:aspect-auto lg:h-96"
//           radius="none"
//           shadow="sm"
//           src={product.imageSrc}
//           width="100%"
//         />
//         {/* <button className="absolute right-2 top-2 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white">
//           <FaHeart className="h-5 w-5 text-gray-300" />
//         </button> */}
//       </CardBody>

//       <CardFooter className="flex items-start justify-between px-4 pt-4 text-small">
//         <div className="w-full">
//           <h3 className="text-base font-medium text-black">
//             <a href={product.href}>
//               <span aria-hidden="true" className="absolute inset-0" />
//               {product.name}
//             </a>
//           </h3>
//           <h4 className="mt-1 text-sm text-ubc-blue">May 26, 2025</h4>
//           <h4 className="mt-5 text-sm text-ubc-blue">
//             <span className="flex w-full items-center gap-1">
//               <MdLocationPin />
//               {product.location}
//             </span>
//           </h4>
//         </div>
//         <p className="text-base font-medium">{product.price}</p>
//       </CardFooter>
//     </Card>
//   );
// }
