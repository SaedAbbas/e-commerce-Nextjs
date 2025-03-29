import Image from 'next/image'
import React from 'react'
import { BiSolidCategory } from "react-icons/bi";


const ProductItem = ({product}) => {
    
    // console.log(product)

  return (
    <div className="flex flex-col justify-center max-sm:mx-12 cursor-pointer rounded-3xl bg-white dark:bg-gray-900 shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out border-2 border-transparent hover:border-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 p-2">
    <Image 
      src={product.banner.url} 
      alt={product.title} 
      width={400} 
      height={350} 
      className="h-[180px] rounded-t-3xl object-cover max-sm:w-full"
    />
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
  
  )
}

export default ProductItem
