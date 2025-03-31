'use client'
import ProductAPIs from '@/utils/ProductAPIs'
import React, { useEffect, useState } from 'react'

const ProductDetails = ({params}) => {

    const newParam = React.use(params)
    const getProductDetails = () => {
        ProductAPIs.getProductById(newParam.productID).then((res) => {
            console.log(res.data.data)
        })
    }
    useEffect(() => {
        getProductDetails();
    },[newParam.productID])

  return (
    <div>
        {newParam.productID}
    </div>
  )
}

export default ProductDetails
