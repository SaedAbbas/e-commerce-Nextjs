"use client";
import BreadCrumb from "@/Compenets/BreadCrumb";
import ProductAPIs from "@/utils/ProductAPIs";
import React, { useEffect, useState } from "react";
import ProductInfo from "../_compenets/ProductInfo";
import Image from "next/image";
import ProductItem from "@/Compenets/ProductItem";
import { usePathname } from "next/navigation";

const ProductDetails = ({ params }) => {
  const [productDetails, setProductDetails] = useState({});
  const [category, setCategory] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);

  const path = usePathname();

  const newParam = React.use(params);
    
  const getProductDetails = () => {
    ProductAPIs.getProductById(newParam.productID).then((res) => {
      setProductDetails(res?.data?.data[0]);
      setCategory(res?.data?.data[0].category);
    //   console.log(res.data.data[0]);
    });
  };

  const getSimilarProducts = async () => {
    const res = await ProductAPIs.getProductsByCategory(category);
    console.log(res.data.data);
    if(res)
    setSimilarProducts(res?.data?.data);
  };

  useEffect(() => {
    if(newParam.productID)
    getProductDetails();
  }, [newParam.productID]);

  useEffect(() => {
    if(category)
    getSimilarProducts();
  }, [category]);

  return (
    <div className="w-4/5 mx-auto my-8 max-md:w-full px-4">
      <BreadCrumb path={path} />
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
        {productDetails?.banner?.url ? (
          <Image
            src={productDetails.banner.url}
            alt="product-details"
            priority
            width={500}
            height={300}
            className="rounded-xl h-[300px] max-md:w-full object-cover col-span-1"
          />
        ): (<div className="w-[500px] h-[300px] bg-slate-200 animate-pulse rounded-xl"></div>)}
        <ProductInfo productDetails={productDetails} />
      </div>
      <h1 className="text-5xl max-sm:hidden mt-36 max-sm:mx-12 flex justify-center items-center font-extrabold text-center tracking-wide bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text my-6">
        ✨ Similar Products ✨
      </h1>
      <h1 className="text-5xl sm:hidden mt-36 max-sm:mx-12 flex justify-center items-center font-extrabold text-center tracking-wide bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text my-6">
        Similar Products
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {similarProducts.length > 0 ? (
          similarProducts
            .filter((product) => productDetails.title !== product.title) 
            .map((product,index) => (
              <ProductItem key={index} product={product} />
            )) 
        ) : (
          <>There are no products with the same category</> 
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
