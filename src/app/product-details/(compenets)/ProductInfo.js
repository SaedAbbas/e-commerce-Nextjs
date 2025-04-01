import React from 'react'
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { GoVerified } from "react-icons/go";

const ProductInfo = ({ productDetails }) => {
  return (
    <div className="col-span-1 w-full max-md:flex max-md:flex-col max-md:items-center max-md:my-4">
      <h1 className="text-2xl font-semibold my-4 text-gray-800">{productDetails.title}</h1>
      <h3 className="text-xl text-gray-600">{productDetails.category}</h3>
      <p className="text-gray-500 max-md:text-center max-md:px-4 mt-2">{productDetails.description}</p>
      
      <div className="flex items-center text-3xl mt-4">
        {!productDetails.instantDelivery ? (
          <>
            <RiVerifiedBadgeFill className="text-green-500 mr-2 text-3xl" />
            <h3 className="text-sm font-bold my-4">eligible for instant</h3>
          </>
        ) : (
          <GoVerified className="text-gray-500" />
        )}
      </div>

      <div className="flex justify-between items-center max-md:flex-row-reverse max-md:gap-4 mt-4">
        <span className="text-xl font-semibold text-gray-800">{productDetails.price} $</span>
        <button className="px-4 py-2 cursor-pointer bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductInfo;
