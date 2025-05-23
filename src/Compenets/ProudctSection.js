"use client";
import React, { useEffect, useState } from "react";
import ProductAPIs from "@/utils/ProductAPIs";
import ProductItem from "./ProductItem";

const ProudctSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getLatestProducts();
  }, []);

  const getLatestProducts = () => {
    ProductAPIs.getLatestProducts().then((res) => {
      setProducts(res.data.data);
      console.log(res)
    });
  };

  return (
    <div className="mx-8 my-6">
      <h1 className="text-5xl max-sm:hidden max-sm:mx-12 flex justify-center items-center font-extrabold text-center tracking-wide bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text my-6">
        ✨ Discover Our Latest Products ✨
      </h1>
      <h1 className="text-5xl sm:hidden max-sm:mx-12 flex justify-center items-center font-extrabold text-center tracking-wide bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text my-6">
        Discover Our Latest Products 
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => {
          return <ProductItem key={index} product={product} />;
        })}
      </div>
    </div>
  );
};

export default ProudctSection;
