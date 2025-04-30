import Image from "next/image";
import React, { useLayoutEffect } from "react";
import { BiSolidCategory } from "react-icons/bi";
import Link from "next/link";

const ProductItem = ({ product }) => {
  // console.log(product)

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <Link href={`/product-details/${product.id}`}>
      <div className="flex flex-col justify-center max-sm:mx-6 cursor-pointer rounded-3xl bg-white dark:bg-gray-900 shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out border-2 border-transparent hover:border-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 p-2">
        {product?.banner?.url && (
          <Image
            src={product.banner.url}
            priority
            alt="product-details"
            width={400}
            height={350}
            className="h-[180px] rounded-t-3xl object-cover max-sm:w-full"
          />
        )}

        <div className="flex items-center justify-between p-4">
          <div className="flex flex-col justify-start">
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white line-clamp-1">
              {product.title}
            </h2>
            <span className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
              <BiSolidCategory className="text-blue-500" />
              {product.category}
            </span>
          </div>
          <span className="text-blue-600 dark:text-blue-400 font-extrabold text-xl">
            {product.price}$
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
